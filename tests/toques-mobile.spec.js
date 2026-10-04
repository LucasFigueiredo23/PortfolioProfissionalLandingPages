import { test, expect } from "@playwright/test";

/*
 * Regressão: no celular, um elemento transparente (o header fixo esticado pelo menu
 * fechado) ficava por cima da tela e engolia toques acima de ~70% da altura.
 * Aqui todo controle visível precisa receber o toque no próprio centro.
 */

const viewports = [
  { width: 390, height: 844 },
  { width: 360, height: 740 },
];
const scrollPositions = { topo: 0, meio: 0.5, fim: 1 };

// Barras fixas que podem legitimamente cobrir conteúdo (navbar, CTA do celular).
// Um overlay mais alto que isso por cima de um controle é exatamente o bug.
const MAX_BAR_HEIGHT = 120;

/**
 * Espera a página assentar: alguns frames para os IntersectionObserver e o React reagirem,
 * depois até não sobrar transição/animação finita rodando (CTA fixa, reveals, menu).
 */
async function settle(page) {
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(r)))));
  await page.waitForFunction(() =>
    document.getAnimations().every((a) => a.playState !== "running" || a.effect?.getTiming().iterations === Infinity)
  );
}

async function scrollToFraction(page, fraction) {
  await page.evaluate((f) => {
    const max = document.documentElement.scrollHeight - innerHeight;
    window.scrollTo({ top: Math.round(max * f), behavior: "instant" });
  }, fraction);
  await settle(page);
}

// Toque cru no centro do elemento. locator.tap() não serve aqui: quando algo
// intercepta, ele rola a página até achar um ponto livre e mascara o bug.
async function tapCenter(page, locator) {
  await expect(locator).toBeVisible();
  const box = await locator.boundingBox();
  await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
}

/**
 * Inspeciona quem recebe o toque na tela atual. Retorna duas listas, ambas devem ficar vazias:
 * - overlays: camadas position: fixed que pegam pontos de uma grade da tela fora das barras
 *   legítimas (overlay fechado, header esticado...). Pega o intruso mesmo sem botão embaixo.
 * - blocked: controles visíveis cujo centro não devolve o próprio controle (ou um filho).
 */
function inspectTouchLayers(page) {
  return page.evaluate((maxBar) => {
    const describe = (el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const id = el.id ? `#${el.id}` : "";
      const cls = typeof el.className === "string" && el.className.trim() ? `.${el.className.trim().split(/\s+/).slice(0, 3).join(".")}` : "";
      const text = (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 30);
      return `${el.tagName.toLowerCase()}${id}${cls} "${text}" [${Math.round(r.width)}x${Math.round(r.height)} pos=${cs.position} z=${cs.zIndex} pe=${cs.pointerEvents}]`;
    };
    const fixedAncestor = (el) => {
      for (; el && el !== document.body; el = el.parentElement) if (getComputedStyle(el).position === "fixed") return el;
      return null;
    };
    // Cobertura aceitável: a barra fixa (baixa e visível) que contém o ponto.
    const isLegitBar = (hit, x, y) => {
      const bar = fixedAncestor(hit);
      if (!bar) return false;
      const cs = getComputedStyle(bar);
      const r = bar.getBoundingClientRect();
      return r.height <= maxBar && cs.visibility === "visible" && Number(cs.opacity) > 0.5 && y >= r.top && y <= r.bottom && x >= r.left && x <= r.right;
    };

    const overlays = new Map();
    for (let y = 2; y < innerHeight; y += 30) {
      for (let x = 2; x < innerWidth; x += (innerWidth - 4) / 4) {
        const hit = document.elementFromPoint(x, y);
        const layer = hit && fixedAncestor(hit);
        if (!layer || isLegitBar(hit, x, y)) continue;
        const key = describe(layer);
        overlays.set(key, (overlays.get(key) || 0) + 1);
      }
    }

    const blocked = [];
    for (const el of document.querySelectorAll("a[href], button, input, select, textarea, summary")) {
      if (!el.checkVisibility({ visibilityProperty: true })) continue;
      // Inativo de propósito (ex.: conteúdo atrás do menu aberto): não precisa receber toque.
      if (el.closest("[inert]")) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      if (x < 0 || x >= innerWidth || y < 0 || y >= innerHeight) continue;

      const hit = document.elementFromPoint(x, y);
      if (hit && (hit === el || el.contains(hit))) continue;
      if (hit && isLegitBar(hit, x, y)) continue;
      blocked.push(`${describe(el)}  ->  coberto por ${hit ? describe(hit) : "nada"}`);
    }

    return { overlays: [...overlays].map(([k, n]) => `${k} pega ${n} pontos da tela`), blocked };
  }, MAX_BAR_HEIGHT);
}

for (const viewport of viewports) {
  test.describe(`toques no celular ${viewport.width}x${viewport.height}`, () => {
    test.use({ viewport, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });

    for (const [name, fraction] of Object.entries(scrollPositions)) {
      test(`todo controle visível recebe o toque (${name})`, async ({ page }) => {
        await page.goto("/");
        await scrollToFraction(page, fraction);
        expect(await inspectTouchLayers(page)).toEqual({ overlays: [], blocked: [] });
      });
    }

    test("tocar e digitar num campo do formulário funciona", async ({ page }) => {
      await page.goto("/");
      const fields = [
        [page.locator('#briefing input[name="name"]'), "Maria Teste"],
        [page.locator('#briefing textarea[name="message"]'), "Quero uma landing page."],
      ];
      for (const [field, text] of fields) {
        // O site usa scroll-behavior: smooth; rola na hora para tocar com o campo parado.
        await field.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
        await settle(page);
        // Os dois campos ficam no centro da tela: dois toques no mesmo ponto em menos de
        // ~300ms viram double-tap (zoom) no Chromium e não geram texto. Espera esse intervalo.
        await page.waitForTimeout(350);
        await tapCenter(page, field);
        await expect(field).toBeFocused();
        await page.keyboard.type(text);
        await expect(field).toHaveValue(text);
      }
    });

    test("menu abre, recebe toques e fecha sem deixar camada por cima", async ({ page }) => {
      await page.goto("/");
      await tapCenter(page, page.getByRole("button", { name: "Abrir menu" }));
      const menu = page.locator("#menu-mobile");
      await expect(menu).toBeVisible();
      await expect(menu.getByRole("link").first()).toBeFocused();
      await settle(page); // links entram com transição escalonada
      await tapCenter(page, menu.getByRole("link", { name: /FAQ/ }));
      await expect(menu).toBeHidden();
      await expect(page.getByRole("button", { name: "Abrir menu" })).toHaveAttribute("aria-expanded", "false");

      await settle(page);
      expect(await inspectTouchLayers(page)).toEqual({ overlays: [], blocked: [] });
    });
  });
}

test.describe("menu no celular deitado 740x360", () => {
  test.use({ viewport: { width: 740, height: 360 }, isMobile: true, hasTouch: true });

  test("botões do fim do menu são alcançáveis rolando o próprio menu", async ({ page }) => {
    await page.goto("/");
    await tapCenter(page, page.getByRole("button", { name: "Abrir menu" }));
    const last = page.locator("#menu-mobile").getByRole("link", { name: "Conversar no WhatsApp" });
    await last.evaluate((el) => el.scrollIntoView({ block: "end", behavior: "instant" }));
    await settle(page);
    const box = await last.boundingBox();
    expect(box.y + box.height).toBeLessThanOrEqual(360);
    // Menu aberto: o fundo escurecido cobre a página de propósito, só os controles importam.
    expect((await inspectTouchLayers(page)).blocked).toEqual([]);
  });
});
