/**
 * src/data/personal.js
 * Tudo o que é "seu" fica aqui: nome, contatos, redes e configuração do formulário.
 * Campos vazios ("") simplesmente não aparecem no site.
 */

export const personalInfo = {
  name: "Lucas Figueiredo",
  initials: "LF",
  role: "Web Designer & Front-end Developer",
  location: "Castanhal, PA",
  // Mostra o selo "Agenda aberta" no topo da página.
  available: true,

  // 55 + DDD + número, só dígitos.
  whatsapp: "5591992449818",
  email: "lucasfigueiredo.bsilva@gmail.com",
  github: "https://github.com/LucasFigueiredo23",
  linkedin: "https://www.linkedin.com/in/lucas-figueiredo-693731227/",
  instagram: "",
};

export const whatsappMessages = {
  default:
    "Olá, Lucas! Vi seu portfólio e gostaria de conversar sobre uma landing page para o meu projeto.",
};

export const formConfig = {
  // URL que recebe o briefing via POST em JSON (Formspree, Web3Forms, Getform...).
  // Vazio = o formulário monta a mensagem e abre o WhatsApp com tudo preenchido.
  endpoint: "",
  // Campos extras que o serviço exige. Ex. Web3Forms: { access_key: "SUA_CHAVE" }
  extraFields: {},
};
