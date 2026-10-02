import Reveal from "../ui/Reveal";
import { technologies } from "../../data/content";
import { Icon } from "../../lib/icons";

/** Discreto de propósito: tecnologia é prova de capacidade, não argumento de venda. */
export default function TechStack() {
  return (
    <section aria-labelledby="tech-title" className="pb-8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-8 lg:col-start-5">
          <h2 id="tech-title" className="text-sm font-medium text-muted">
            Ferramentas do dia a dia
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {technologies.map((t) => (
              <li
                key={t.label}
                className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm text-fg/80 transition-colors hover:border-line-strong hover:text-fg"
              >
                <Icon name={t.icon} className="size-4 text-muted" strokeWidth={1.75} />
                {t.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
