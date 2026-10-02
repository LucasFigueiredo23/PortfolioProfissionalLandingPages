import { cn } from "../../lib/cn";

/** Superfície com uma luz suave que acompanha o mouse (só aparece em desktop, via :hover). */
export default function SpotlightCard({ as: Tag = "div", className, children, ...props }) {
  const handleMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };
  return (
    <Tag onPointerMove={handleMove} className={cn("spotlight", className)} {...props}>
      {children}
    </Tag>
  );
}
