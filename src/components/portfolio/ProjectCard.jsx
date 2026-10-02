import { ArrowRight, ArrowUpRight } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";
import BrowserFrame from "../ui/BrowserFrame";
import ProjectPreview from "./ProjectPreview";
import { cn } from "../../lib/cn";

export default function ProjectCard({ project, featured, index, onOpen }) {
  const { title, category, status, description, technologies, tags, liveUrl, caseUrl, image, preview } = project;
  const caseProps = caseUrl
    ? { href: caseUrl, target: "_blank", rel: "noopener noreferrer" }
    : { onClick: onOpen, type: "button" };
  const CaseTag = caseUrl ? "a" : "button";

  return (
    <SpotlightCard
      as="article"
      aria-labelledby={`${project.id}-title`}
      className={cn(
        "card-in group flex flex-col rounded-[1.75rem] border border-line bg-surface/70 p-3 transition-[border-color,box-shadow] duration-500 hover:border-line-strong sm:p-4",
        featured && "md:col-span-2"
      )}
      style={{
        "--d": `${index * 80}ms`,
        "--accent": preview?.accent || "#8B5CF6",
      }}
    >
      {/* Prévia clicável: abre o case */}
      <CaseTag
        {...caseProps}
        aria-label={`Ver case de ${title}`}
        tabIndex={-1}
        className="relative block overflow-hidden rounded-[1.25rem] text-left"
      >
        <div className="relative overflow-hidden rounded-[1.25rem] bg-ink/60 p-3 sm:p-6">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-90"
            style={{ background: "radial-gradient(60% 70% at 50% 100%, color-mix(in oklab, var(--accent) 30%, transparent), transparent 70%)" }}
          />
          <BrowserFrame
            url={preview?.url}
            className={cn(
              "relative transition-[transform,filter] duration-700 ease-out-expo group-hover:scale-[1.015] group-hover:contrast-[1.08]",
              featured && "md:mx-auto md:max-w-3xl"
            )}
          >
            {image ? (
              <img src={image} alt="" loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
            ) : (
              <ProjectPreview variant={preview?.variant} accent={preview?.accent} />
            )}
          </BrowserFrame>

          {/* Overlay + botão no hover (desktop). No celular o botão abaixo já resolve. */}
          <span className="pointer-events-none absolute inset-0 hidden items-end justify-center bg-gradient-to-t from-ink/70 via-transparent to-transparent pb-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:flex">
            <span className="inline-flex translate-y-2 items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-ink transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
              Ver case <ArrowRight aria-hidden="true" className="size-4" />
            </span>
          </span>
        </div>
      </CaseTag>

      <div className={cn("flex flex-1 flex-col px-2 pt-5 pb-2 sm:px-3", featured && "md:grid md:grid-cols-12 md:gap-8")}>
        <div className={cn(featured && "md:col-span-7")}>
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <span>{category}</span>
            <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
            <span className="rounded-full border border-line px-2 py-0.5 text-xs">{status}</span>
          </p>
          <h3
            id={`${project.id}-title`}
            className="mt-3 text-2xl font-bold tracking-[-0.035em] transition-transform duration-500 ease-out-expo group-hover:translate-x-1 sm:text-[1.75rem]"
          >
            {title}
          </h3>
          <p className="mt-2 max-w-xl text-muted">{description}</p>
        </div>

        <div className={cn("mt-5 flex flex-1 flex-col justify-between gap-5", featured && "md:col-span-5 md:mt-0")}>
          <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologias e tags">
            {[...technologies, ...tags].map((t) => (
              <li key={t} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-xs text-fg/80">
                {t}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <CaseTag {...caseProps} className="btn btn-ghost !min-h-11 !px-0 text-fg">
              <span>Ver case</span>
              <ArrowRight aria-hidden="true" className="btn-arrow" />
            </CaseTag>
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-11 !px-0">
                <span>Ver projeto</span>
                <ArrowUpRight aria-hidden="true" className="btn-arrow" />
              </a>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
