import { Check, Minus } from "lucide-react";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import { comparison } from "../../data/content";

/** Tabela de verdade (semântica), estilizada. Ícone + texto: nunca só a cor. */
export default function Comparison() {
  return (
    <Section id="template-ou-personalizado" labelledBy="comparacao-title">
      <SectionHeader
        id="comparacao-title"
        question="Não dá pra usar um template?"
        title="Template resolve rápido. Projeto personalizado resolve certo."
        description="Template é uma boa ferramenta para começar. A diferença está no que cada um entrega."
      />

      <Reveal className="mt-14 lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="overflow-hidden rounded-3xl border border-line lg:col-span-8 lg:col-start-5">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">Comparação entre template e projeto personalizado</caption>
            <thead>
              <tr>
                <th scope="col" className="px-4 py-5 text-sm font-semibold text-muted sm:px-6">Template</th>
                <th scope="col" className="relative bg-white/[0.04] px-4 py-5 text-sm font-semibold sm:px-6">
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet to-cyan" />
                  Personalizado
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([template, custom]) => (
                <tr key={template} className="border-t border-line">
                  <td className="px-4 py-4 align-top text-[0.9375rem] text-muted sm:px-6">
                    <span className="flex gap-2.5">
                      <Minus aria-hidden="true" className="mt-1 size-4 shrink-0 opacity-60" />
                      {template}
                    </span>
                  </td>
                  <td className="bg-white/[0.04] px-4 py-4 align-top text-[0.9375rem] sm:px-6">
                    <span className="flex gap-2.5">
                      <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-cyan" strokeWidth={2.5} />
                      {custom}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}
