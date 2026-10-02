import { Star } from "lucide-react";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { testimonials, showTestimonialsPlaceholder } from "../../data/content";

/** Só depoimentos reais. Sem nenhum ainda, mostra um espaço honesto (ou some, se preferir). */
export default function Testimonials() {
  if (!testimonials.length && !showTestimonialsPlaceholder) return null;

  return (
    <Section id="depoimentos" labelledBy="depoimentos-title">
      <SectionHeader id="depoimentos-title" question="Quem já trabalhou com você?" title="Depoimentos" />

      {testimonials.length ? (
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 70}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-6">
                <div className="flex gap-0.5 text-amber-300" role="img" aria-label={`${t.rating} de 5 estrelas`}>
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} aria-hidden="true" className="size-4" fill={s < t.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 font-serif text-lg leading-relaxed italic">“{t.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  {t.photo && <img src={t.photo} alt="" loading="lazy" className="size-10 rounded-full object-cover" />}
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      ) : (
        <Reveal className="mt-14 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="crop-marks p-8 sm:p-12 lg:col-span-8 lg:col-start-5">
            <p className="font-serif text-2xl leading-snug italic sm:text-3xl">Seus próximos projetos podem aparecer aqui.</p>
            <p className="mt-4 max-w-lg text-muted">
              Este espaço fica vazio até existir um depoimento real. Prefiro assim a inventar elogios.
            </p>
            <Button href="#briefing" arrow className="mt-8">
              Começar o meu
            </Button>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
