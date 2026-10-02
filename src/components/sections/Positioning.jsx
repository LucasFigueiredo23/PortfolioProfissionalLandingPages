import Section from "../ui/Section";
import Reveal from "../ui/Reveal";

const statement = "Não entrego apenas uma página bonita.";

/** Pausa tipográfica. As palavras acendem conforme a rolagem (CSS puro, com fallback). */
export default function Positioning() {
  const words = statement.split(" ");
  return (
    <Section id="posicionamento" labelledBy="posicionamento-title" className="overflow-hidden py-28 md:py-44">
      <p className="mb-8 font-serif text-xl text-muted italic lg:text-[1.625rem]">
        <span aria-hidden="true" className="text-violet-soft">“</span>O que você faz de diferente?<span aria-hidden="true" className="text-violet-soft">”</span>
      </p>

      <h2 id="posicionamento-title" className="scrub-timeline type-display max-w-[14ch]" aria-label={statement}>
        {words.map((word, i) => (
          <span key={i} aria-hidden="true" className="scrub-word" style={{ "--i": i }}>
            {word}{" "}
          </span>
        ))}
      </h2>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-6 lg:col-start-7">
          <p className="type-lead text-muted">
            Cada projeto combina <span className="text-fg">estratégia</span>, <span className="text-fg">design</span> e{" "}
            <span className="text-fg">desenvolvimento</span> para criar uma experiência digital coerente com o negócio,
            do primeiro texto ao último detalhe de interação.
          </p>
          {/* Três camadas, uma medida só */}
          <div aria-hidden="true" className="mt-10 grid grid-cols-3 gap-px text-xs text-muted">
            {["Estratégia", "Design", "Código"].map((label) => (
              <div key={label} className="relative pt-5">
                <div className="spec-h absolute top-0 right-1 left-0" />
                {label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
