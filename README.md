# Portfólio Lucas Figueiredo — Landing pages sob medida

Landing page do portfólio, feita para vender projetos de landing page personalizados.
React 19 + Vite + Tailwind CSS v4 + lucide-react. Sem bibliotecas de animação: tudo é CSS
e `IntersectionObserver`.

---

## 1. Estrutura do projeto

```
portfolio-lucas/
├─ index.html                  ← SEO: title, description, Open Graph, JSON-LD
├─ .env                        ← URL pública do site (VITE_SITE_URL)
├─ vite.config.js
├─ wrangler.jsonc              ← deploy na Cloudflare Workers
├─ public/
│  ├─ favicon.svg
│  ├─ og-image.png             ← imagem de compartilhamento (1200×630)
│  └─ robots.txt
└─ src/
   ├─ main.jsx                 ← ponto de entrada + fontes
   ├─ App.jsx                  ← ordem das seções
   ├─ index.css                ← cores, tipografia, botões, animações
   ├─ data/                    ← TUDO o que você edita no dia a dia
   │  ├─ personal.js           ← nome, WhatsApp, redes, formulário
   │  ├─ projects.js           ← projetos do portfólio
   │  └─ content.js            ← textos: FAQ, processo, serviços, objeções...
   ├─ lib/
   │  ├─ whatsapp.js           ← gera links do WhatsApp com mensagem
   │  ├─ icons.jsx             ← ícones usados nos dados
   │  └─ cn.js
   ├─ hooks/                   ← useInView, useScrolled, useActiveSection, useMediaQuery
   └─ components/
      ├─ ui/                   ← Button, Reveal, Section, SectionHeader, SpotlightCard, BrowserFrame
      ├─ layout/               ← Navbar, Footer, MobileCTA, Background
      ├─ portfolio/            ← Portfolio, ProjectCard, ProjectPreview, CaseModal
      └─ sections/             ← Hero, HeroVisual, TrustBar, ProblemSection, Positioning,
                                  BeforeAfter, Differentials, Services, Process, Comparison,
                                  TechStack, Testimonials, Objections, FAQ, FinalCTA, ContactForm
```

**Regra de ouro:** para mudar conteúdo, mexa só em `src/data/`. Os componentes leem dali.

---

## 2. Instalação

Precisa do **Node.js 20.19+** (ou 22+).

```bash
npm install
```

## 3. Rodar localmente

```bash
npm run dev       # http://localhost:5173 com recarga automática
npm run build     # gera a pasta dist/ para publicar
npm run preview   # serve a pasta dist/ para testar o build final
```

---

## 4. Alterar informações pessoais

Arquivo: **`src/data/personal.js`**

```js
export const personalInfo = {
  name: "Lucas Figueiredo",
  initials: "LF",
  role: "Web Designer & Front-end Developer",
  location: "Castanhal, PA",
  available: true,            // mostra o selo "Agenda aberta" no hero
  whatsapp: "5591992449818",  // 55 + DDD + número, só dígitos
  email: "lucasfigueiredo.bsilva@gmail.com",
  github: "https://github.com/LucasFigueiredo23",
  linkedin: "https://www.linkedin.com/in/lucas-figueiredo-693731227/",
  instagram: "",
};
```

Campo vazio = o link some do site automaticamente.

O `index.html` também tem o nome e a cidade nos dados estruturados (JSON-LD). Se mudar de
cidade ou cargo, atualize lá também.

---

## 5. Configurar o WhatsApp

1. Em `src/data/personal.js`, preencha `whatsapp` com `55` + DDD + número, só dígitos.
   Ex.: `"5591912345678"`.
2. A mensagem padrão fica em `whatsappMessages.default`, no mesmo arquivo.

Enquanto o número estiver vazio, o WhatsApp abre sem destinatário e o console do navegador
mostra um aviso em modo dev.

Para gerar um link com outra mensagem em qualquer componente:

```js
import { whatsappLink } from "../../lib/whatsapp";
<a href={whatsappLink("Olá! Quero um orçamento de redesign.")}>…</a>
```

---

## 6. Adicionar um projeto novo

Arquivo: **`src/data/projects.js`**

Copie um objeto da lista `projects` e edite:

```js
{
  id: "nome-do-projeto",          // único, sem espaços
  published: true,                // false esconde sem apagar
  title: "Nome do Projeto",
  category: "Serviços",           // precisa existir em `categories`
  status: "No ar",                // texto livre: "No ar", "Cliente real", "Em desenvolvimento"...
  description: "Uma frase sobre o que o projeto faz.",
  tags: ["Clínica", "Agendamento"],
  technologies: ["React", "Tailwind"],
  image: "/projects/nome.webp",   // opcional (veja abaixo)
  preview: { variant: "institutional", url: "site.com.br", accent: "#60A5FA" },
  liveUrl: "https://site.com.br", // vazio = sem botão "Ver projeto"
  caseUrl: "",                    // vazio = abre o case no modal
  case: {
    context: "Qual era o problema?",
    goal: "O que precisava ser alcançado?",
    strategy: "Como a experiência foi estruturada?",
    design: "Quais decisões visuais foram tomadas?",
    development: "Quais tecnologias e por quê?",
    result: "Só resultados reais. Sem números? Diga isso.",
  },
}
```

**Imagem do projeto:** salve um print em `public/projects/` (de preferência `.webp`,
1600×1000, abaixo de 200 KB) e coloque o caminho em `image`. Sem imagem, o card desenha
uma prévia em código usando `preview.variant` (`store`, `fashion`, `schedule` ou
`institutional`).

**Filtros:** só aparecem categorias que têm pelo menos um projeto publicado. Para criar
uma categoria nova, adicione o nome em `categories`.

---

## 7. Conectar o formulário de briefing

Arquivo: **`src/data/personal.js`** → `formConfig`

Sem configurar nada, o formulário já funciona: ele valida os campos, monta o briefing e
abre o WhatsApp com tudo preenchido.

Para receber por e-mail, use um serviço de formulário:

**Formspree**
1. Crie um formulário em formspree.io e copie a URL (`https://formspree.io/f/xxxxxx`).
2. Cole em `formConfig.endpoint`.

**Web3Forms**
1. Gere uma access key em web3forms.com.
2. Configure:
   ```js
   export const formConfig = {
     endpoint: "https://api.web3forms.com/submit",
     extraFields: { access_key: "SUA_CHAVE" },
   };
   ```

O envio é um `POST` em JSON com os campos `name`, `email`, `whatsapp`, `projectType`,
`budget`, `message`, `company`, `goal`, `deadline`, `references` e `subject`.
Os estados de "Enviando...", "Mensagem enviada ✓" e "Algo deu errado" já estão prontos.
Existe um campo invisível (honeypot) que barra robôs simples.

---

## 8. Alterar textos das seções

Arquivo: **`src/data/content.js`**

Lá ficam: faixa de confiança, problemas, pontos do antes/depois, diferenciais, serviços,
etapas do processo, tabela template × personalizado, tecnologias, depoimentos, objeções,
FAQ e opções do formulário.

**Revise o FAQ** com seus valores de verdade: prazo, rodadas de revisão, manutenção,
domínio e hospedagem. As respostas atuais são propositalmente genéricas.

**Depoimentos:** adicione em `testimonials` só depoimentos reais. Enquanto a lista estiver
vazia, `showTestimonialsPlaceholder` decide se aparece o espaço "Seus próximos projetos
podem aparecer aqui" (`true`) ou se a seção some (`false`).

**Ícones:** os nomes vêm do lucide.dev. Para usar um ícone novo, importe-o em
`src/lib/icons.jsx` e adicione ao objeto `icons`.

---

## 9. Mudar cores e fontes

Arquivo: **`src/index.css`** → bloco `@theme`

```css
--color-ink: #09090b;      /* fundo */
--color-surface: #111113;  /* superfícies */
--color-raised: #151518;
--color-muted: #a1a1aa;    /* texto secundário */
--color-violet: #8b5cf6;   /* destaque principal */
--color-cyan: #22d3ee;     /* linhas de medida */
```

Fontes: Manrope (texto) e Newsreader itálico (a "voz do cliente": perguntas, objeções e o
"template." do título). Ficam hospedadas no próprio site, importadas em `src/main.jsx`.
Para usar só Manrope, troque `--font-serif` pelo mesmo valor de `--font-sans`.

---

## 10. SEO e URL do site

1. Arquivo **`.env`**: troque `VITE_SITE_URL` pelo domínio real, sem barra no final.
   Ele preenche o canonical, o Open Graph e o JSON-LD no build.
2. `public/og-image.png` é a imagem que aparece ao compartilhar o link no WhatsApp e no
   LinkedIn. Pode substituir por outra 1200×630.
3. Depois de publicar, teste o compartilhamento em opengraph.xyz.

---

## 11. Publicar na Cloudflare Workers

O repositório `PortfolioProfissional` já faz deploy automático a cada push na `main`.

1. Em **`wrangler.jsonc`**, deixe `"name"` igual ao nome do Worker que já existe no painel
   da Cloudflare. Nome diferente = Worker novo, com outra URL.
2. No painel: Workers & Pages → seu Worker → Settings → Build:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
3. Faça push. A Cloudflare roda o build e publica a pasta `dist/`.

Se o repositório atual já tiver um `wrangler.toml`/`wrangler.jsonc`, mantenha o seu e só
ajuste `assets.directory` para `"./dist"`.

---

## 12. Acessibilidade (o que já está feito)

- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`) e um H1 só.
- Link "Pular para o conteúdo" para teclado.
- Foco visível em tudo que é clicável.
- Menu mobile com `aria-expanded`, ESC fecha, foco volta ao botão, conteúdo atrás fica `inert`.
- Modal de case em `<dialog>` nativo (foco preso, ESC fecha).
- FAQ com `aria-expanded`/`aria-controls` e navegação por setas, Home e End.
- Comparador antes/depois controlável por teclado (é um `input range` de verdade).
- Formulário com `label` em todo campo, erros ligados por `aria-describedby`, foco no
  primeiro campo com erro.
- Cor nunca é a única informação (ícones + texto na tabela, legenda na prévia do Letivo).
- `prefers-reduced-motion` desliga animações, luz do mouse e inclinação do mockup.

---

## 13. Checklist de responsividade

Teste no DevTools (Ctrl+Shift+M) e num celular de verdade:

- [ ] 320px — nada corta, sem rolagem lateral
- [ ] 375px / 390px / 430px — CTA fixa aparece depois do hero e some no formulário/footer
- [ ] 768px — grid de projetos em 2 colunas, menu ainda é hamburger
- [ ] 1024px — navbar desktop, hero em duas colunas
- [ ] 1280px / 1440px — título do hero em duas linhas
- [ ] 1920px+ — conteúdo centralizado, sem esticar
- [ ] Botões com pelo menos 44px de altura no celular
- [ ] Inputs com 16px de fonte (o iPhone não dá zoom ao focar)
- [ ] Comparador antes/depois funciona com o dedo
- [ ] Modal de case abre como "folha" de baixo para cima no celular

## 14. Checklist de performance

- [ ] Rodar Lighthouse (aba Lighthouse do DevTools, modo celular) na versão publicada
- [ ] Prints dos projetos em `.webp`, até ~200 KB cada
- [ ] Nenhuma biblioteca nova sem necessidade (hoje: só React e lucide-react)
- [ ] Fontes servidas pelo próprio site (já está assim)
- [ ] Animações só com `transform`/`opacity` (já está assim)
- [ ] Um único `IntersectionObserver` para as entradas ao rolar (já está assim)
- [ ] Luz do mouse e inclinação do mockup desligadas no celular (já está assim)

## 15. Checklist de SEO

- [ ] `VITE_SITE_URL` preenchido no `.env`
- [ ] `<title>` e `meta description` revisados no `index.html`
- [ ] `og-image.png` aparece ao colar o link no WhatsApp
- [ ] JSON-LD validado em search.google.com/test/rich-results
- [ ] Site cadastrado no Google Search Console
- [ ] Adicionar `Sitemap: https://SEU-DOMINIO/sitemap.xml` ao `robots.txt` se criar um sitemap
- [ ] Prints dos projetos com `alt` descritivo (o modal já usa o título do projeto)
