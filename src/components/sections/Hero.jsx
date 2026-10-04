import { MapPin } from "lucide-react";
import Button from "../ui/Button";
import HeroVisual from "./HeroVisual";
import { personalInfo } from "../../data/personal";

export default function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {personalInfo.available && (
          <p className="load-in mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1.5 pr-4 pl-3 text-sm text-muted">
            <span className="pulse-dot size-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Agenda aberta para novos projetos
          </p>
        )}

        <h1 id="hero-title" className="type-display">
          <span className="load-in inline lg:block" style={{ "--d": "60ms" }}>
            Seu negócio merece{" "}
          </span>
          <span className="load-in inline lg:block" style={{ "--d": "160ms" }}>
            mais do que um{" "}
            <span className="strike text-gradient pr-[0.08em] font-serif font-normal tracking-[-0.03em] italic">template.</span>
          </span>
        </h1>

        <div className="mt-12 grid items-start gap-16 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:pt-6">
            <p className="load-in type-lead max-w-md text-muted" style={{ "--d": "320ms" }}>
              Landing pages personalizadas, da estratégia ao código. Design, desenvolvimento front-end, performance e
              experiência no celular pensados para um objetivo:{" "}
              <span className="text-fg">transformar visitantes em clientes.</span>
            </p>

            <div className="load-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "420ms" }}>
              <Button href="#briefing" size="lg" arrow>
                Solicitar orçamento
              </Button>
              <Button href="#projetos" variant="secondary" size="lg">
                Explorar projetos
              </Button>
            </div>

            <p className="load-in mt-8 flex items-center gap-2 type-caption text-muted" style={{ "--d": "520ms" }}>
              <MapPin aria-hidden="true" className="size-3.5" />
              {personalInfo.location}. Projetos presenciais e remotos.
            </p>
          </div>

          <div className="lg:col-span-7">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
