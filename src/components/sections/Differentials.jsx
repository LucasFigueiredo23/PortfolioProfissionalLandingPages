import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import SpotlightCard from "../ui/SpotlightCard";
import { differentials } from "../../data/content";
import { Icon } from "../../lib/icons";

export default function Differentials() {
  return (
    <Section id="diferenciais" labelledBy="diferenciais-title">
      <SectionHeader
        id="diferenciais-title"
        question="Por que eu deveria escolher você?"
        title="Seis compromissos em todo projeto."
        description="Não são extras. É o padrão de qualquer página que sai daqui."
      />

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {differentials.map((item, i) => (
          <Reveal as="li" key={item.title} delay={(i % 3) * 70}>
            <SpotlightCard className="group h-full rounded-2xl border border-line bg-surface/60 p-6 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-line-strong sm:p-7">
              <div className="flex items-start justify-between">
                <span className="text-sm font-semibold text-muted tabular-nums transition-colors duration-300 group-hover:text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid size-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-fg/80 transition-[transform,color,border-color] duration-500 ease-out-expo group-hover:-rotate-6 group-hover:border-violet/40 group-hover:text-violet-soft">
                  <Icon name={item.icon} className="size-[18px]" strokeWidth={1.75} />
                </span>
              </div>
              <h3 className="mt-10 type-h3">{item.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{item.text}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
