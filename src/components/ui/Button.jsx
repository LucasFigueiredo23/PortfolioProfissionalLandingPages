import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Botão/link com os estados do design system.
 * - Com `href` vira <a> (navegação); sem `href` vira <button> (ação).
 * - variant: "primary" | "secondary" | "ghost"   size: "sm" | "md" | "lg"
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  icon: IconBefore,
  className,
  children,
  ...props
}) {
  const Tag = href ? "a" : "button";
  const external = href?.startsWith("http");

  return (
    <Tag
      href={href}
      type={href ? undefined : props.type || "button"}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn("btn", `btn-${variant}`, size !== "md" && `btn-${size}`, className)}
      {...props}
    >
      {IconBefore && <IconBefore aria-hidden="true" className="size-4" />}
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden="true" className="btn-arrow" strokeWidth={2.25} />}
    </Tag>
  );
}
