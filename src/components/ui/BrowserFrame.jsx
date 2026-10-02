import { Lock } from "lucide-react";
import { cn } from "../../lib/cn";

/** Moldura de navegador para mockups. O conteúdo vira um container (@container) para escalar junto. */
export default function BrowserFrame({ url, className, bodyClassName, children }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[14px] border border-white/10 bg-surface shadow-[0_30px_80px_-24px_rgb(0_0_0/0.8)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-raised px-3 py-2">
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          <i className="size-2 rounded-full bg-white/15" />
          <i className="size-2 rounded-full bg-white/15" />
          <i className="size-2 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto flex min-w-0 max-w-[65%] items-center gap-1.5 rounded-md bg-white/[0.05] px-2.5 py-0.5 text-[11px] leading-4 text-muted">
          <Lock aria-hidden="true" className="size-2.5 shrink-0" />
          <span className="truncate">{url}</span>
        </span>
        <span className="w-[38px] shrink-0" aria-hidden="true" />
      </div>
      <div className={cn("@container relative", bodyClassName)}>{children}</div>
    </div>
  );
}
