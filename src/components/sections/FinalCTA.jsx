import { MessageCircle } from "lucide-react";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { whatsappLink } from "../../lib/whatsapp";

export default function FinalCTA() {
  return (
    <section id="contato" aria-labelledby="cta-title" className="relative isolate overflow-hidden px-5 py-28 sm:px-8 md:py-40">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[70%] w-[min(1100px,140%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.28),rgb(6_182_212/0.08)_55%,transparent)] blur-2xl" />
        <div className="bg-grid absolute inset-0 opacity-60" />
      </div>

      <Reveal className="crop-marks mx-auto max-w-5xl px-2 py-12 text-center sm:px-10 sm:py-16">
        <p className="font-serif text-xl text-muted italic lg:text-2xl">
          <span aria-hidden="true" className="text-violet-soft">“</span>E agora, por onde eu começo?<span aria-hidden="true" className="text-violet-soft">”</span>
        </p>
        <h2 id="cta-title" className="type-h1 mx-auto mt-6 max-w-[18ch]">
          Pronto para transformar sua ideia em uma experiência digital?
        </h2>
        <p className="mx-auto mt-6 max-w-xl type-lead text-muted">
          Conte um pouco sobre seu projeto e vamos entender o que faz sentido para sua marca.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="#briefing" size="lg" arrow className="w-full sm:w-auto">
            Iniciar meu projeto
          </Button>
          <Button href="#projetos" variant="secondary" size="lg" className="w-full sm:w-auto">
            Ver projetos novamente
          </Button>
        </div>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <MessageCircle aria-hidden="true" className="size-4" />
          Prefere conversar direto? Chame no WhatsApp
        </a>
      </Reveal>
    </section>
  );
}
