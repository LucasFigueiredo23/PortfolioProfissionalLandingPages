import Reveal from "./Reveal";

/**
 * Cabeçalho de seção em duas vozes:
 * à esquerda, a pergunta do visitante (serifada itálica);
 * à direita, a resposta (título + descrição).
 */
export default function SectionHeader({ id, question, title, description, children }) {
  return (
    <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
      {question && (
        <Reveal className="lg:col-span-4">
          <p className="max-w-xs font-serif text-xl leading-snug text-muted italic lg:pt-1.5 lg:text-[1.625rem]">
            <span aria-hidden="true" className="mr-0.5 text-violet-soft">“</span>
            {question}
            <span aria-hidden="true" className="text-violet-soft">”</span>
          </p>
        </Reveal>
      )}
      <Reveal className="lg:col-span-8" delay={90}>
        <h2 id={id} className="type-h2 max-w-3xl">
          {title}
        </h2>
        {description && <p className="mt-5 max-w-2xl type-lead text-muted">{description}</p>}
        {children}
      </Reveal>
    </div>
  );
}
