import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import Button from "../ui/Button";
import BrowserFrame from "../ui/BrowserFrame";
import ProjectPreview from "./ProjectPreview";

const blocks = [
  ["context", "Contexto", "Qual era o problema?"],
  ["goal", "Objetivo", "O que precisava ser alcançado?"],
  ["strategy", "Estratégia", "Como a experiência foi estruturada?"],
  ["design", "Design", "Quais decisões visuais foram tomadas?"],
  ["development", "Desenvolvimento", "Quais tecnologias foram usadas?"],
];

/**
 * Case em <dialog> nativo: foco preso no modal, ESC fecha, fundo fica inerte.
 * Fecha com animação e devolve o foco para quem abriu.
 */
export default function CaseModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const afterCloseRef = useRef(null);
  const [current, setCurrent] = useState(project);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project) {
      openerRef.current = document.activeElement;
      setCurrent(project);
      if (!dialog.open) dialog.showModal();
    }
  }, [project]);

  const requestClose = (afterClose) => {
    afterCloseRef.current = typeof afterClose === "function" ? afterClose : null;
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      dialog.classList.remove("is-closing");
      dialog.close();
    };
    if (reduce) return finish();
    dialog.classList.add("is-closing");
    setTimeout(finish, 190);
  };

  const handleClosed = () => {
    onClose();
    const next = afterCloseRef.current;
    afterCloseRef.current = null;
    if (next) next();
    else openerRef.current?.focus?.({ preventScroll: true });
  };

  // "Quero algo assim": fecha o case e leva direto ao formulário.
  const goToBriefing = () =>
    requestClose(() => {
      const form = document.getElementById("briefing");
      form?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => form?.querySelector("input")?.focus({ preventScroll: true }), 500);
    });

  const p = current;

  return (
    <dialog
      ref={dialogRef}
      className="case-modal"
      aria-labelledby="case-title"
      onClose={handleClosed}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onClick={(e) => e.target === e.currentTarget && requestClose()}
    >
      {p && (
        <div className="max-h-[inherit] overflow-y-auto overscroll-contain">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-surface/90 px-5 py-4 backdrop-blur-xl sm:px-8">
            <p className="text-sm text-muted">
              {p.category} <span aria-hidden="true" className="mx-1.5 inline-block h-3 w-px translate-y-0.5 bg-line-strong" /> {p.status}
            </p>
            <button
              type="button"
              onClick={() => requestClose()}
              aria-label="Fechar case"
              className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <div className="px-5 pt-8 pb-10 sm:px-8">
            <h2 id="case-title" className="type-h2">{p.title}</h2>
            <p className="mt-3 max-w-2xl type-lead text-muted">{p.description}</p>

            <BrowserFrame url={p.preview?.url} className="mt-8">
              {p.image ? (
                <img src={p.image} alt={`Tela do projeto ${p.title}`} className="aspect-[16/10] w-full object-cover" />
              ) : (
                <ProjectPreview variant={p.preview?.variant} accent={p.preview?.accent} />
              )}
            </BrowserFrame>

            <dl className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-2">
              {blocks.map(([key, label, question]) => (
                <div key={key} className="border-t border-line pt-5">
                  <dt>
                    <span className="block font-semibold">{label}</span>
                    <span className="mt-0.5 block font-serif text-[0.9375rem] text-muted italic">{question}</span>
                  </dt>
                  <dd className="mt-3 text-fg/85">
                    {p.case?.[key]}
                    {key === "development" && (
                      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tecnologias">
                        {p.technologies.map((t) => (
                          <li key={t} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs">{t}</li>
                        ))}
                      </ul>
                    )}
                  </dd>
                </div>
              ))}
              <div className="border-t border-line pt-5 md:col-span-2">
                <dt>
                  <span className="block font-semibold">Resultado</span>
                  <span className="mt-0.5 block font-serif text-[0.9375rem] text-muted italic">Somente resultados reais.</span>
                </dt>
                <dd className="mt-3 rounded-2xl border border-line bg-white/[0.02] p-5 text-fg/85">
                  {p.case?.result || "Projeto demonstrativo."}
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {p.liveUrl ? (
                <Button href={p.liveUrl} size="lg">
                  Visitar projeto <ArrowUpRight aria-hidden="true" className="ml-1 inline size-4" />
                </Button>
              ) : (
                <p className="self-center text-sm text-muted sm:mr-auto">O link público entra aqui assim que o projeto estiver no ar.</p>
              )}
              <Button variant="secondary" size="lg" arrow onClick={goToBriefing}>
                Quero algo assim
              </Button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
