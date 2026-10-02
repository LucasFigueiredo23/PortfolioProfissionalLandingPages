import { cn } from "../../lib/cn";

/**
 * Wrapper padrão de seção: espaçamento vertical, largura máxima e
 * uma linha de topo com marcas "+" nas bordas (o grid de projeto aparecendo).
 */
export default function Section({ id, labelledBy, divider = true, className, containerClassName, children }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-24 md:py-32", className)}>
      {divider && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0">
          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <div className="h-px bg-line" />
            <span className="absolute -top-[5px] left-5 text-[10px] leading-none text-white/30 sm:left-8">+</span>
            <span className="absolute -top-[5px] right-5 text-[10px] leading-none text-white/30 sm:right-8">+</span>
          </div>
        </div>
      )}
      <div className={cn("mx-auto max-w-6xl px-5 sm:px-8", containerClassName)}>{children}</div>
    </section>
  );
}
