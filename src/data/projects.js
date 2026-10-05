/**
 * src/data/projects.js
 * Para adicionar um projeto, copie um objeto da lista e edite os campos.
 *
 * - category: precisa ser uma das `categories` abaixo (o filtro usa esse texto).
 * - image: caminho de uma imagem em /public (ex.: "/projects/pantoja.webp").
 *          Sem imagem, o card desenha uma prévia com `preview.variant`.
 * - preview.variant: "store" | "schedule" | "institutional"
 * - liveUrl: link do site no ar. Vazio = o botão "Ver projeto" não aparece.
 * - caseUrl: link para um case externo (Behance, Notion...). Vazio = abre o case no modal.
 * - published: false esconde o projeto sem precisar apagar.
 * - case.result: só resultados reais. Sem números? Diga isso com honestidade.
 */

export const categories = ["SaaS / Tech", "E-commerce", "Serviços", "Infoprodutos", "Institucional"];

export const projects = [
  {
    id: "pantoja-imports",
    published: true,
    title: "Pantoja Imports",
    category: "E-commerce",
    status: "No ar",
    description:
      "Vitrine de iPhones feita para apresentar os aparelhos e levar o cliente direto para a conversa no WhatsApp.",
    tags: ["Vitrine", "WhatsApp", "UI/UX"],
    technologies: ["React", "Tailwind", "Responsivo"],
    image: "/projects/pantoja-imports-escuro.jpg",
    preview: { variant: "store", url: "pantoja-imports.lucasfigueiredo-bsilva.workers.dev", accent: "#22D3EE" },
    liveUrl: "https://pantoja-imports.lucasfigueiredo-bsilva.workers.dev/",
    caseUrl: "",
    case: {
      context:
        "Uma loja de iPhones que vendia pelo Instagram e pelo WhatsApp, sem um lugar próprio para mostrar os aparelhos disponíveis.",
      goal:
        "Criar uma vitrine bonita e fluida, sem login e sem carrinho, que apresente os produtos e leve o cliente para a conversa.",
      strategy:
        "Cada produto termina em uma ação: chamar no WhatsApp ou seguir no Instagram. A página não tenta ser uma loja virtual; ela encurta o caminho até o atendimento.",
      design:
        "Fotos reais tiradas dos próprios aparelhos, sem imagens oficiais da Apple, para mostrar exatamente o que o cliente vai receber. O hero fica tipográfico até as fotos definitivas ficarem prontas.",
      development:
        "Interface responsiva, com links contextualizados para WhatsApp e Instagram em cada produto.",
      result: "Site no ar. Os resultados entram aqui quando existirem dados reais.",
    },
  },
  {
    id: "amaria-pijamas",
    published: true,
    title: "Amaria Pijamas",
    category: "E-commerce",
    status: "No ar",
    description:
      "Loja de pijamas com cara de perfil do Instagram: a cliente escolhe o modelo e o pedido chega pronto no WhatsApp.",
    tags: ["Moda", "WhatsApp", "UI/UX"],
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/projects/amaria-pijamas.jpg",
    preview: { variant: "store", url: "amariapijamas.lucasfigueiredo-bsilva.workers.dev", accent: "#E3A1AE" },
    liveUrl: "https://amariapijamas.lucasfigueiredo-bsilva.workers.dev/",
    caseUrl: "",
    case: {
      context:
        "Uma loja de pijamas que vende pelo Instagram (@_amariapijamas) e fecha os pedidos no WhatsApp, sem um catálogo próprio para mostrar os modelos.",
      goal:
        "Um catálogo simples, sem cadastro e sem carrinho, em que a cliente encontra o pijama, confere o tamanho e chama a loja.",
      strategy:
        "A página imita o perfil do Instagram que a cliente já conhece: bio, destaques que viram filtros (lançamentos, short doll, longos, kits, infantil) e um feed de pijamas. O botão \"Quero esse!\" abre o WhatsApp com o modelo e o tamanho já escritos na mensagem.",
      design:
        "Vinho, rosa e creme da marca, com Playfair Display e uma fonte cursiva para o \"conforto com amor\". Tabela de medidas e perguntas frequentes para tirar as dúvidas antes da conversa.",
      development:
        "HTML, CSS e JavaScript puro, sem framework. Os produtos ficam numa lista no próprio código, fácil de editar: nome, preço, tecido, tamanhos, fotos e selo.",
      result: "Site no ar. Faltam as fotos reais dos pijamas e os dados finais da loja. Ainda sem métricas.",
    },
  },
  {
    id: "portfolio-recrutadores",
    published: true,
    title: "Portfólio pessoal",
    category: "Institucional",
    status: "No ar",
    description:
      "Meu portfólio para recrutadores, com foco em back-end e algoritmos e uma simulação de rotas que roda no navegador.",
    tags: ["Portfólio", "Algoritmos", "Acessibilidade"],
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/projects/portfolio-recrutadores.jpg",
    preview: { variant: "institutional", url: "portfolioprofissional.lucasfigueiredo-bsilva.workers.dev", accent: "#C4A1E8" },
    liveUrl: "https://portfolioprofissional.lucasfigueiredo-bsilva.workers.dev/",
    caseUrl: "",
    case: {
      context:
        "Procurando estágio em desenvolvimento, eu precisava de um lugar que mostrasse o meu lado de back-end, banco de dados e algoritmos, e não só telas bonitas.",
      goal:
        "Que um recrutador entenda em poucos segundos quem eu sou, o que estou construindo e como falar comigo.",
      strategy:
        "Em vez de contar, mostrar: o topo traz uma simulação de rotas de coleta (vizinho mais próximo seguido de 2-opt) que roda no navegador, ligada ao projeto real de coleta de lixo de Castanhal. Depois vêm projetos, stack, sobre e contato.",
      design:
        "Tema escuro por padrão, com opção de tema claro. Tipografia grande no nome, fonte mono para dados e um traçado de ruas no fundo que conversa com o projeto de rotas.",
      development:
        "HTML, CSS e JavaScript puro, sem framework. A simulação é desenhada em SVG e recalculada a cada sorteio. Tem link para pular ao conteúdo e o tema escolhido fica salvo.",
      result: "Site no ar e em uso nas candidaturas de estágio. Ainda sem métricas.",
    },
  },
  {
    id: "letivo",
    published: true,
    title: "Letivo",
    category: "SaaS / Tech",
    status: "Em desenvolvimento",
    description:
      "Web app de horários escolares com front-end acessível, feito em equipe para organizar a semana da turma.",
    tags: ["Web app", "Acessibilidade", "Equipe"],
    technologies: ["PHP", "Twig", "JavaScript"],
    image: "",
    preview: { variant: "schedule", url: "letivo.app", accent: "#34D399" },
    liveUrl: "",
    caseUrl: "",
    case: {
      context:
        "Horários da turma espalhados em mensagens e prints, sem um lugar único e fácil de consultar.",
      goal:
        "Um site simples e acessível onde a turma veja, por dia, qual disciplina e qual professor tem aula.",
      strategy:
        "Versão 1.0 focada em uma turma (um professor e uma disciplina por dia). Expandir para outras turmas e escolas só depois de validar o básico.",
      design:
        "Grade mensal em quadradinhos coloridos para mostrar dias com e sem aula, sempre acompanhados de texto, para não depender só da cor.",
      development:
        "Back-end em PHP com Twig como motor de templates, reconstruído do zero parte por parte. Projeto feito em equipe de três pessoas.",
      result: "Projeto acadêmico em desenvolvimento. Ainda sem métricas.",
    },
  },
  {
    // Mude `published` para true quando o projeto puder ser mostrado.
    id: "semed-castanhal",
    published: false,
    title: "SEMED Castanhal",
    category: "Institucional",
    status: "Em desenvolvimento",
    description:
      "Landing page institucional para a Secretaria Municipal de Educação, com informação clara para pais, alunos e professores.",
    tags: ["Institucional", "Setor público", "Acessibilidade"],
    technologies: ["React", "Tailwind"],
    image: "",
    preview: { variant: "institutional", url: "semed.castanhal.pa.gov.br", accent: "#60A5FA" },
    liveUrl: "",
    caseUrl: "",
    case: {
      context: "A secretaria se comunica principalmente pelo Instagram e por um site antigo.",
      goal: "Reunir as informações mais procuradas em uma página moderna, acessível e fácil de atualizar.",
      strategy: "Organizar o conteúdo pelas dúvidas de quem acessa: matrícula, calendário, unidades e notícias.",
      design: "Visual limpo, institucional e acessível, usando a comunicação atual da secretaria como base.",
      development: "Página responsiva com foco em acessibilidade e desempenho em conexões lentas.",
      result: "Projeto em desenvolvimento.",
    },
  },
];
