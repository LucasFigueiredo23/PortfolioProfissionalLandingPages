import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import { problems } from "../../data/content";
import { Icon } from "../../lib/icons";

export default function ProblemSection() {
  return (
    <Section id="problema" labelledBy="problema-title">
      <SectionHeader
        id="problema-title"
        question="Por que meu site não traz clientes?"
        title="Seu site pode estar afastando clientes sem você perceber."
        description="Quase nunca é um problema só. São detalhes que, somados, fazem o visitante desistir antes de chamar."
      />

      <div className="mt-14 lg:grid lg:grid-cols-12 lg:gap-8">
        <ul className="grid sm:grid-cols-2 sm:gap-x-10 lg:col-span-8 lg:col-start-5">
          {problems.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 70} className="group flex gap-4 border-t border-line py-6">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.02] text-muted transition-colors duration-300 group-hover:border-red-400/30 group-hover:text-red-300">
                <Icon name={p.icon} className="size-4" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="type-h3 text-[1.0625rem]">{p.title}</h3>
                <p className="mt-1 text-[0.9375rem] text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
