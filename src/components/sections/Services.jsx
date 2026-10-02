import { Check } from "lucide-react";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { services } from "../../data/content";
import { Icon } from "../../lib/icons";

/** Escopo como uma ficha técnica: lista, não mais um grid de cards. */
export default function Services() {
  return (
    <Section id="servicos" labelledBy="servicos-title">
      <SectionHeader
        id="servicos-title"
        question="O que exatamente eu recebo?"
        title="O que está incluído no projeto"
        description="Do primeiro briefing até a página no ar. Você não precisa contratar cada parte separado."
      />

      <div className="mt-14 lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8 lg:col-start-5">
        <ul>
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 40}
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 border-t border-line py-6 last:border-b"
            >
              <Icon name={s.icon} className="mt-1 size-5 text-muted transition-colors duration-300 group-hover:text-cyan" strokeWidth={1.75} />
              <div className="sm:grid sm:grid-cols-[11rem_1fr] sm:gap-6">
                <h3 className="type-h3">{s.title}</h3>
                <p className="mt-1 text-muted sm:mt-0.5">{s.text}</p>
              </div>
              <span className="mt-1 grid size-6 place-items-center rounded-full border border-line text-emerald-300" aria-label="Incluído">
                <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
              </span>
            </Reveal>
          ))}
        </ul>
          <Reveal className="mt-8">
            <Button href="#briefing" variant="secondary" arrow>
              Montar meu escopo
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
