/**
 * src/data/content.js
 * Textos das seções. Edite aqui sem mexer nos componentes.
 * Os ícones são nomes do lucide-react (https://lucide.dev/icons).
 */

export const trustItems = [
  { icon: "MonitorSmartphone", label: "100% responsivo" },
  { icon: "Smartphone", label: "Mobile first" },
  { icon: "PenTool", label: "Design sob medida" },
  { icon: "Gauge", label: "Foco em performance" },
  { icon: "Search", label: "SEO técnico" },
];

export const problems = [
  { icon: "Copy", title: "Visual genérico", text: "Parece com outros mil sites e não fica na memória de ninguém." },
  { icon: "Shuffle", title: "Informação mal organizada", text: "O visitante precisa procurar o que deveria estar na cara." },
  { icon: "MousePointerClick", title: "CTA perdido", text: "O botão de contato some no meio do texto, ou nem existe." },
  { icon: "Smartphone", title: "Experiência ruim no celular", text: "Texto pequeno, botão apertado e página que escapa para o lado." },
  { icon: "Hourglass", title: "Carregamento lento", text: "Cada segundo de espera é alguém fechando a aba." },
  { icon: "Fingerprint", title: "Falta de identidade", text: "Nada ali parece com a sua marca de verdade." },
];

export const beforeAfterPoints = [
  { title: "Hierarquia", text: "Uma mensagem principal, não dez competindo." },
  { title: "Tipografia", text: "Fontes escolhidas para a marca, com escala clara." },
  { title: "CTA", text: "Uma ação óbvia, visível desde a primeira tela." },
  { title: "Organização", text: "Conteúdo na ordem em que o cliente pensa." },
  { title: "Identidade", text: "Cores, ritmo e linguagem que só a sua marca tem." },
  { title: "Responsividade", text: "Layout próprio para o celular, não uma versão espremida." },
];

export const differentials = [
  { icon: "Compass", title: "Estratégia antes do código", text: "A estrutura nasce do objetivo do negócio. Antes de desenhar, eu entendo quem compra e por quê." },
  { icon: "PenTool", title: "Design exclusivo", text: "Nada de trocar as cores de um template. Layout, tipografia e ritmo são pensados para a sua marca." },
  { icon: "Sparkles", title: "Motion com propósito", text: "Animação só onde ajuda: guiar o olhar, mostrar o que mudou e deixar a navegação mais clara." },
  { icon: "Gauge", title: "Performance", text: "Código enxuto, imagens otimizadas e nenhuma biblioteca sem motivo. Página leve abre mais rápido." },
  { icon: "Smartphone", title: "Mobile first", text: "O layout começa no celular, onde está a maior parte do seu público, e depois cresce para telas maiores." },
  { icon: "Search", title: "SEO ready", text: "HTML semântico, metatags, Open Graph e dados estruturados para o Google entender a página." },
];

export const services = [
  { icon: "Compass", title: "Estratégia", text: "Briefing, objetivo e arquitetura da página antes de qualquer pixel." },
  { icon: "LayoutTemplate", title: "UI/UX", text: "Wireframe, layout e hierarquia pensados para levar a leitura até o contato." },
  { icon: "CodeXml", title: "Desenvolvimento", text: "Implementação responsiva, semântica e acessível." },
  { icon: "Sparkles", title: "Animações", text: "Microinterações e motion que ajudam a navegação, sem exagero." },
  { icon: "Gauge", title: "Performance", text: "Imagens, fontes e código otimizados para carregar rápido." },
  { icon: "Rocket", title: "Deploy", text: "Publicação, domínio e configuração final para a página ir ao ar." },
];

export const processSteps = [
  { title: "Briefing", text: "Uma conversa para entender o negócio, o público e o que a página precisa resolver." },
  { title: "Estratégia", text: "Defino a estrutura, a ordem das seções e o caminho do visitante até o contato." },
  { title: "UI/UX", text: "Layout, tipografia e hierarquia. Você aprova o visual antes de eu começar a programar." },
  { title: "Desenvolvimento", text: "A página ganha vida: responsiva, rápida, acessível e com as animações no lugar certo." },
  { title: "Revisão", text: "Ajustes com base no seu feedback, nas rodadas combinadas na proposta." },
  { title: "Deploy", text: "Publicação no seu domínio, testes finais em celular e computador, e entrega." },
];

export const comparison = [
  ["Estrutura pré-definida", "Estrutura pensada para o seu objetivo"],
  ["Visual compartilhado com outros sites", "Identidade própria"],
  ["Limitações do tema", "Flexibilidade para cada seção"],
  ["Componentes prontos", "Experiência sob medida"],
  ["Você adapta o conteúdo ao layout", "O layout nasce do seu conteúdo"],
];

export const technologies = [
  { icon: "Atom", label: "React" },
  { icon: "Braces", label: "JavaScript" },
  { icon: "Wind", label: "Tailwind CSS" },
  { icon: "FileCode", label: "HTML5" },
  { icon: "Palette", label: "CSS3" },
  { icon: "GitBranch", label: "Git" },
  { icon: "Github", label: "GitHub" },
  { icon: "Cloud", label: "Cloudflare" },
];

/**
 * Depoimentos: só reais. Formato:
 * { name: "", role: "Cargo, Empresa", photo: "/depoimentos/nome.webp", text: "", rating: 5 }
 */
export const testimonials = [];
// true = mostra o espaço "Seus próximos projetos podem aparecer aqui" enquanto não houver depoimentos.
// false = esconde a seção inteira até existir o primeiro.
export const showTestimonialsPlaceholder = true;

export const objections = [
  {
    quote: "Já tenho um site.",
    answer:
      "Ótimo, ele continua útil. Uma landing page faz outro trabalho: foca em uma oferta, um público e uma ação. Ela pode viver ao lado do seu site, em campanhas e lançamentos, sem você precisar refazer tudo.",
  },
  {
    quote: "Posso fazer sozinho com um template.",
    answer:
      "Pode, e em alguns casos faz sentido. A diferença é que template é ferramenta e projeto é decisão: aqui cada seção existe porque responde uma dúvida do seu cliente, e o visual nasce da sua marca.",
  },
  {
    quote: "É muito caro.",
    answer:
      "A proposta mostra cada parte do trabalho: estratégia, design, desenvolvimento, revisões e publicação. Você vê pelo que está pagando e pode ajustar o escopo à sua faixa de investimento.",
  },
  {
    quote: "Não sei exatamente o que preciso.",
    answer:
      "Normal, é para isso que existe o briefing. Em uma conversa a gente define objetivo, público e formato. Você sai com clareza, mesmo que decida não fechar.",
  },
];

export const faq = [
  {
    q: "Quanto custa uma landing page?",
    a: "Depende do escopo: quantidade de seções, conteúdo, integrações e prazo. Depois do briefing eu envio uma proposta com valor fechado e tudo o que está incluído. Se quiser, indique uma faixa de investimento no formulário e eu adapto a proposta a ela.",
  },
  {
    q: "Quanto tempo leva?",
    a: "O prazo é definido na proposta, antes de começar. Ele depende do tamanho da página e de quando o conteúdo (textos, fotos, logo) fica pronto. Páginas enxutas saem mais rápido; projetos com mais seções e animações pedem mais tempo.",
  },
  {
    q: "Como funciona o processo?",
    a: "São seis etapas: briefing, estratégia, UI/UX, desenvolvimento, revisão e deploy. Você aprova o layout antes de eu começar a programar, então o resultado final não é surpresa.",
  },
  {
    q: "Posso solicitar alterações?",
    a: "Sim. O processo tem rodadas de revisão combinadas na proposta, tanto no layout quanto na versão final. Mudanças depois da entrega podem entrar em um plano de manutenção.",
  },
  {
    q: "A página funciona no celular?",
    a: "Funciona, e é pensada para ele primeiro. O layout é desenhado no formato do celular e depois expandido para telas maiores, com botões fáceis de tocar e textos legíveis.",
  },
  {
    q: "Você faz integração com WhatsApp?",
    a: "Sim. Botões que abrem a conversa com uma mensagem já escrita, formulários que enviam o briefing direto para o WhatsApp e links para Instagram e outras redes.",
  },
  {
    q: "O domínio e a hospedagem estão incluídos?",
    a: "Eu posso registrar o domínio e cuidar da hospedagem e da publicação para você. Os custos de domínio e hospedagem, quando existirem, aparecem separados na proposta.",
  },
  {
    q: "O site possui SEO?",
    a: "Possui SEO técnico: HTML semântico, título e descrição, Open Graph para compartilhamento, dados estruturados e boa performance. Isso ajuda o Google a entender a página, mas ninguém sério garante a primeira posição.",
  },
  {
    q: "Posso atualizar o conteúdo depois?",
    a: "Pode. O conteúdo fica organizado para que trocas simples, como textos, fotos e preços, sejam rápidas. Se preferir não mexer, eu faço as atualizações para você.",
  },
  {
    q: "Você faz manutenção?",
    a: "Sim. Ofereço manutenção para atualizar conteúdo, fazer ajustes e acompanhar a parte técnica depois que a página está no ar. Valor e frequência são combinados à parte.",
  },
];

export const formOptions = {
  projectType: ["Landing Page", "Site institucional", "Página de vendas", "Redesign", "Outro"],
  goal: ["Gerar contatos e orçamentos", "Vender um produto ou serviço", "Apresentar a marca", "Captar inscrições", "Outro"],
  deadline: ["O quanto antes", "Em até 1 mês", "Em até 2 meses", "Sem prazo definido"],
  budget: ["Até R$1.000", "R$1.000 – R$2.500", "R$2.500 – R$5.000", "R$5.000+", "Ainda não sei"],
};
