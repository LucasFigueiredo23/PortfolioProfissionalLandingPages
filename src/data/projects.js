/**
 * src/data/projects.js
 * Para adicionar um projeto, copie um objeto da lista e edite os campos.
 *
 * - category: precisa ser uma das `categories` abaixo (o filtro usa esse texto).
 * - image: caminho de uma imagem em /public (ex.: "/projects/pantoja.webp").
 *          Sem imagem, o card desenha uma prévia com `preview.variant`.
 * - preview.variant: "store" | "fashion" | "schedule" | "institutional"
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
    status: "Em desenvolvimento",
    description:
      "Vitrine de iPhones feita para apresentar os aparelhos e levar o cliente direto para a conversa no WhatsApp.",
    tags: ["Vitrine", "WhatsApp", "UI/UX"],
    technologies: ["React", "Tailwind", "Responsivo"],
    image: "",
    preview: { variant: "store", url: "pantojaimports.com.br", accent: "#22D3EE" },
    liveUrl: "",
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
      result: "Projeto em desenvolvimento. Os resultados entram aqui quando existirem dados reais.",
    },
  },
  {
    id: "hooper-zone",
    published: true,
    title: "Hooper Zone",
    category: "E-commerce",
    status: "Cliente real",
    description:
      "Landing page para uma marca de streetwear, com a identidade da HZ na frente de tudo e caminho curto até a compra.",
    tags: ["Moda", "Streetwear", "Branding"],
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "",
    preview: { variant: "fashion", url: "hooperzone.com.br", accent: "#A78BFA" },
    liveUrl: "",
    caseUrl: "",
    case: {
      context:
        "Uma marca de roupas streetwear que precisava de presença própria na internet, além das redes sociais.",
      goal:
        "Apresentar a marca e as peças com personalidade, e transformar quem chega pela divulgação em contato de compra.",
      strategy:
        "Página curta e direta: marca, peças em destaque e contato. Quem vem do Instagram encontra a mesma linguagem visual e não se perde.",
      design:
        "Tipografia pesada, contraste alto e fotos grandes. A identidade da HZ conduz o layout, e não o contrário.",
      development: "Página responsiva, leve e pensada primeiro para o celular, onde está quase todo o público da marca.",
      result: "Projeto fechado com cliente real. Métricas de desempenho ainda não publicadas.",
    },
  },
  {
    id: "letivo",
    published: true,
    title: "Letivo",
    category: "SaaS / Tech",
    status: "Projeto acadêmico",
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
