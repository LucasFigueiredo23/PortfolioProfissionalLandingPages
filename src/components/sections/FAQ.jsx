import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import { faq } from "../../data/content";
import { whatsappLink } from "../../lib/whatsapp";
import { cn } from "../../lib/cn";

/**
 * Acordeão acessível: botões reais com aria-expanded/aria-controls,
 * cada item abre e fecha sozinho, setas ↑ ↓ / Home / End navegam entre perguntas.
 */
export default function FAQ() {
  const [open, setOpen] = useState(() => new Set([0]));
  const buttons = useRef([]);

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const onKeyDown = (e, i) => {
    const last = faq.length - 1;
    const target = { ArrowDown: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (target === undefined) return;
    e.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <Section id="faq" labelledBy="faq-title">
      <SectionHeader id="faq-title" question="Ficou alguma dúvida?" title="Perguntas frequentes">
        <p className="mt-5 text-muted">
          Não achou a sua?{" "}
          <a href={whatsappLink("Olá, Lucas! Tenho uma dúvida sobre landing pages:")} target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-violet-soft">
            Pergunte no WhatsApp
          </a>
          .
        </p>
      </SectionHeader>

      <Reveal className="mt-12 lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8 lg:col-start-5">
          {faq.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <div key={item.q} className="border-t border-line last:border-b">
                <h3>
                  <button
                    ref={(el) => (buttons.current[i] = el)}
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => toggle(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left text-[1.0625rem] font-semibold tracking-[-0.01em] transition-colors hover:text-fg sm:text-lg"
                  >
                    {item.q}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-out-expo",
                        isOpen ? "rotate-45 border-transparent bg-fg text-ink" : "border-line-strong text-muted group-hover:text-fg"
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="accordion-panel" data-open={isOpen}>
                  <div inert={!isOpen}>
                    <p className="max-w-2xl pr-12 pb-6 text-muted">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
