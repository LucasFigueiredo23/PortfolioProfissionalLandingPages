import { useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import { beforeAfterPoints } from "../../data/content";

/**
 * Comparador antes/depois. Arraste com mouse ou dedo; no teclado, use as setas
 * (o controle é um <input type="range"> de verdade, acessível).
 */
export default function BeforeAfter() {
  const [pos, setPos] = useState(42);
  const areaRef = useRef(null);
  const dragging = useRef(false);

  const setFromPointer = (clientX) => {
    const rect = areaRef.current.getBoundingClientRect();
    const value = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, value)));
  };

  return (
    <Section id="transformacao" labelledBy="transformacao-title">
      <SectionHeader
        id="transformacao-title"
        question="Na prática, o que muda?"
        title="A mesma empresa, duas primeiras impressões."
        description="Arraste para comparar. O conteúdo é o mesmo; o que muda é a forma como ele é organizado e apresentado."
      />

      <Reveal className="mt-12">
        <div
          ref={areaRef}
          className="@container relative aspect-[4/5] touch-pan-y overflow-hidden rounded-[1.75rem] border border-line-strong select-none sm:aspect-[16/10]"
          style={{ "--pos": `${pos}%` }}
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            setFromPointer(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && setFromPointer(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <AfterMock />
          <div className="absolute inset-0 [clip-path:inset(0_calc(100%_-_var(--pos))_0_0)]">
            <BeforeMock />
          </div>

          <span className="pointer-events-none absolute bottom-4 left-4 z-[1] rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            Antes: genérico
          </span>
          <span className="pointer-events-none absolute right-4 bottom-4 z-[1] rounded-full bg-fg px-3 py-1 text-xs font-semibold text-ink">
            Depois: sob medida
          </span>

          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={Math.round(pos)}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Comparar versão genérica e versão sob medida"
            aria-valuetext={`${Math.round(pos)}% da versão genérica visível`}
            className="ba-input absolute inset-0 z-10 size-full cursor-ew-resize opacity-0"
          />

          {/* Alça */}
          <div className="ba-line pointer-events-none absolute inset-y-0 left-[var(--pos)] w-px -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.2)]">
            <div className="ba-handle absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-xl">
              <MoveHorizontal aria-hidden="true" className="size-5" />
            </div>
          </div>


        </div>
      </Reveal>

      <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {beforeAfterPoints.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 60} className="border-t border-line pt-4">
            <dt className="font-semibold">{item.title}</dt>
            <dd className="mt-1 text-[0.9375rem] text-muted">{item.text}</dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}

/* Versão "template genérico": tudo centralizado, fonte padrão, CTA escondido. */
function BeforeMock() {
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-[#e9e9ec] font-[Times_New_Roman,serif] text-[#333]">
      <div className="flex items-center justify-between bg-[#3b5b8c] px-[3cqw] py-[1.6cqw] text-white">
        <span className="border border-white/60 px-[1.5cqw] text-[2.2cqw] @lg:text-[1.6cqw]">LOGO</span>
        <span className="hidden gap-[1.4cqw] text-[1.25cqw] underline @lg:flex">
          {["Início", "Quem somos", "Serviços", "Produtos", "Galeria", "Notícias", "Contato"].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </span>
        <span className="text-[3cqw] @lg:hidden">≡</span>
      </div>
      <div className="px-[5cqw] pt-[5cqw] text-center">
        <p className="text-[5cqw] @lg:text-[3.2cqw]">Bem-vindo ao site da Torra Norte!</p>
        <p className="mx-auto mt-[2cqw] max-w-[90%] text-[2.8cqw] leading-snug @lg:text-[1.5cqw]">
          Somos uma empresa comprometida com a qualidade e a excelência em tudo o que fazemos, sempre buscando
          oferecer os melhores produtos e serviços aos nossos clientes com dedicação e respeito.
        </p>
        <div className="relative mx-auto mt-[3cqw] aspect-[16/7] w-[85%] border border-[#bbb] bg-[#d4d4d8] @lg:w-[60%]">
          <span className="absolute inset-0 grid place-items-center text-[2.6cqw] text-[#888] @lg:text-[1.6cqw]">IMAGEM</span>
        </div>
        <p className="mt-[2.5cqw] text-[2.6cqw] text-[#1a0dab] underline @lg:text-[1.4cqw]">Clique aqui para saber mais</p>
        <div className="mt-[3cqw] grid grid-cols-3 gap-[2cqw]">
          {[1, 2, 3].map((n) => (
            <div key={n} className="border border-[#bbb] bg-white p-[1.5cqw] text-[2.4cqw] @lg:text-[1.3cqw]">
              Serviço {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Versão sob medida: hierarquia, CTA claro, identidade.
   Texto à direita de propósito: com a alça no meio, a comparação mostra
   o texto genérico de um lado e o texto sob medida do outro. */
function AfterMock() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex flex-col bg-[#0f0d0b] text-[#f5efe6]">
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_20%,rgb(194_120_62/0.28),transparent_60%)]" />
      <div className="relative flex items-center justify-between px-[5cqw] py-[4cqw] @lg:py-[2.4cqw]">
        <span className="text-[4cqw] font-extrabold tracking-[-0.04em] @lg:text-[1.9cqw]">torra norte</span>
        <span className="rounded-full bg-[#f5efe6] px-[2.6cqw] py-[1.2cqw] text-[3cqw] font-bold text-[#1a1410] @lg:px-[2.2cqw] @lg:py-[1cqw] @lg:text-[1.35cqw]">
          Pedir no WhatsApp
        </span>
      </div>

      <div className="relative grid flex-1 grid-cols-[0.85fr_1fr] gap-[5cqw] px-[5cqw] pb-[16cqw] @lg:grid-cols-[1fr_1.15fr] @lg:pb-[8cqw]">
        {/* Foto do produto */}
        <div className="relative overflow-hidden rounded-[3cqw] @lg:rounded-[2cqw]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,#7a4a2a,#2a1a10_72%)]" />
          <div className="absolute top-[22%] left-1/2 aspect-square w-[58%] -translate-x-1/2 rounded-full border-[0.8cqw] border-[#f5efe6]/80 bg-[radial-gradient(circle,#3a2414_45%,#5c3a22)] @lg:w-[46%] @lg:border-[0.6cqw]" />
          <div className="absolute right-[7%] bottom-[6%] left-[7%] rounded-[1.6cqw] bg-black/45 p-[2.4cqw] backdrop-blur @lg:p-[1.6cqw]">
            <p className="text-[2.6cqw] font-semibold @lg:text-[1.4cqw]">Torra da semana</p>
            <p className="text-[2.2cqw] text-[#f5efe6]/60 @lg:text-[1.2cqw]">Chocolate e castanha</p>
          </div>
        </div>

        {/* Mensagem + ação */}
        <div className="flex flex-col justify-center">
          <p className="text-[3cqw] text-[#d9a273] @lg:text-[1.4cqw]">Cafés especiais de Castanhal</p>
          <div className="relative">
            <p className="mt-[2cqw] text-[8.4cqw] leading-[0.92] font-extrabold tracking-[-0.055em] @lg:mt-[1.4cqw] @lg:text-[5.4cqw]">
              Café fresco, torrado toda semana.
            </p>
            {/* Cota: o espaço também é desenhado */}
            <div className="spec-v absolute top-0 -left-[3cqw] h-full">
              <span className="spec-tag !left-auto !right-[1.6cqw] !translate-x-0">H1</span>
            </div>
          </div>
          <p className="mt-[3cqw] text-[3.2cqw] leading-snug text-[#f5efe6]/70 @lg:mt-[2cqw] @lg:text-[1.55cqw]">
            Grãos selecionados, torra média e entrega em casa.
          </p>
          <span className="mt-[4cqw] self-start rounded-full bg-[#d9a273] px-[3.4cqw] py-[2cqw] text-[3.2cqw] font-bold text-[#1a1410] @lg:mt-[2.6cqw] @lg:px-[2.4cqw] @lg:py-[1.2cqw] @lg:text-[1.55cqw]">
            Escolher meu café →
          </span>
        </div>
      </div>
    </div>
  );
}
