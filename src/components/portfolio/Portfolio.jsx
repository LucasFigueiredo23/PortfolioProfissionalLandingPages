import { useMemo, useState } from "react";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import ProjectCard from "./ProjectCard";
import CaseModal from "./CaseModal";
import Button from "../ui/Button";
import { categories, projects } from "../../data/projects";
import { cn } from "../../lib/cn";

const ALL = "Todos";

export default function Portfolio() {
  const [filter, setFilter] = useState(ALL);
  const [openProject, setOpenProject] = useState(null);

  const published = useMemo(() => projects.filter((p) => p.published !== false), []);

  // Só mostra filtros de categorias que têm projeto (evita botões que levam a uma lista vazia).
  const filters = useMemo(() => {
    const counts = Object.fromEntries(categories.map((c) => [c, published.filter((p) => p.category === c).length]));
    return [{ label: ALL, count: published.length }, ...categories.filter((c) => counts[c] > 0).map((c) => ({ label: c, count: counts[c] }))];
  }, [published]);

  const visible = filter === ALL ? published : published.filter((p) => p.category === filter);
  const featureFirst = visible.length % 2 === 1;

  return (
    <Section id="projetos" labelledBy="projetos-title">
      <SectionHeader
        id="projetos-title"
        question="Você já fez algo assim?"
        title="Projetos selecionados"
        description="Trabalhos reais, com contexto honesto: o que já foi entregue, o que ainda está em construção e o que aprendi em cada um."
      />

      <div role="group" aria-label="Filtrar projetos por categoria" className="mt-12 -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map(({ label, count }) => {
          const active = filter === label;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(label)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-300",
                active
                  ? "border-fg bg-fg text-ink"
                  : "border-line-strong text-muted hover:border-white/30 hover:text-fg"
              )}
            >
              {label}
              <span className={cn("text-xs tabular-nums", active ? "text-ink/60" : "text-muted/70")}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "projeto" : "projetos"} em {filter}
      </p>

      {visible.length > 0 ? (
        <div key={filter} className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={featureFirst && i === 0}
              index={i}
              onOpen={() => setOpenProject(project)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-line-strong p-10 text-center">
          <p className="font-semibold">Nenhum projeto nesta categoria por enquanto.</p>
          <p className="mt-2 text-muted">Veja todos os projetos ou conte qual é o seu: ele pode ser o primeiro daqui.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="secondary" onClick={() => setFilter(ALL)}>Ver todos</Button>
            <Button href="#briefing" arrow>Solicitar orçamento</Button>
          </div>
        </div>
      )}

      <CaseModal project={openProject} onClose={() => setOpenProject(null)} />
    </Section>
  );
}
