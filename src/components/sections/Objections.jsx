import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import { objections } from "../../data/content";

/** As objeções vêm na "voz do cliente" (serifada) e a resposta, na voz do profissional. */
export default function Objections() {
  return (
    <Section id="objecoes" labelledBy="objecoes-title">
      <SectionHeader
        id="objecoes-title"
        question="Mas e se…?"
        title="Dúvidas que quase todo cliente tem antes de fechar."
      />

      <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:pl-[calc(33.333%+0.67rem)]">
        {objections.map((o, i) => (
          <Reveal key={o.quote} delay={(i % 2) * 80} className="border-t border-line pt-6">
            <h3 className="font-serif text-[1.625rem] leading-tight italic">“{o.quote}”</h3>
            <p className="mt-3 text-muted">{o.answer}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
