import { useEffect, useRef, useState } from "react";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import { processSteps } from "../../data/content";
import { cn } from "../../lib/cn";

/**
 * Linha do tempo que "enche" conforme a rolagem.
 * O listener de scroll só existe enquanto a seção está visível.
 */
export default function Process() {
  const listRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const value = (anchor - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, value)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        update();
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const total = processSteps.length;

  return (
    <Section id="processo" labelledBy="processo-title">
      <SectionHeader
        id="processo-title"
        question="Como funciona do início ao fim?"
        title="Seis etapas, sem surpresa no meio do caminho."
        description="Você sabe o que está acontecendo em cada fase e aprova o visual antes de qualquer linha de código."
      />

      <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-8">
        <ol ref={listRef} className="relative lg:col-span-8 lg:col-start-5">
          {/* Trilho + preenchimento */}
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[19px] w-px bg-line">
            <div
              className="h-full w-full origin-top bg-gradient-to-b from-violet to-cyan"
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>

          {processSteps.map((step, i) => {
            const reached = progress >= (i + 0.35) / total;
            return (
              <li key={step.title} className="relative grid grid-cols-[40px_1fr] gap-5 pb-12 last:pb-0 sm:gap-8">
                <span
                  className={cn(
                    "relative z-10 grid size-10 place-items-center rounded-full border text-sm font-bold tabular-nums transition-all duration-500 ease-out-expo",
                    reached
                      ? "border-transparent bg-fg text-ink shadow-[0_0_24px_-4px_rgb(139_92_246/0.8)]"
                      : "border-line-strong bg-ink text-muted"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1.5">
                  <h3 className={cn("type-h3 text-[1.375rem] transition-colors duration-500", reached ? "text-fg" : "text-muted")}>{step.title}</h3>
                  <p className="mt-2 max-w-lg text-muted">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
