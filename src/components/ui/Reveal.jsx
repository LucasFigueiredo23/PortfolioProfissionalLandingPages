import { useInView } from "../../hooks/useInView";
import { cn } from "../../lib/cn";

/** Entra com fade + leve subida quando aparece na tela. `delay` em ms cria o efeito cascata. */
export default function Reveal({ as: Tag = "div", delay = 0, className, style, children, ...props }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "is-in", className)}
      style={{ "--delay": `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
