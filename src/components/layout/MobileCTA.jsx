import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import Button from "../ui/Button";
import { whatsappLink } from "../../lib/whatsapp";
import { cn } from "../../lib/cn";

/**
 * Barra fixa no rodapé (só no celular). Aparece depois do hero e some
 * quando o visitante já está no CTA final, no formulário ou no footer.
 */
export default function MobileCTA({ hidden }) {
  const [pastHero, setPastHero] = useState(false);
  const [nearContact, setNearContact] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const targets = ["contato", "briefing", "rodape"].map((id) => document.getElementById(id)).filter(Boolean);
    const visible = new Set();

    const heroObs = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), { rootMargin: "-40% 0px 0px 0px" });
    const contactObs = new IntersectionObserver((entries) => {
      for (const e of entries) e.isIntersecting ? visible.add(e.target) : visible.delete(e.target);
      setNearContact(visible.size > 0);
    });

    if (hero) heroObs.observe(hero);
    targets.forEach((t) => contactObs.observe(t));
    return () => {
      heroObs.disconnect();
      contactObs.disconnect();
    };
  }, []);

  const show = pastHero && !nearContact && !hidden;

  return (
    <div
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/85 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl transition-[transform,opacity] duration-500 ease-out-expo md:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      )}
    >
      <div className="flex gap-2">
        <Button href="#briefing" arrow className="flex-1">
          Solicitar orçamento
        </Button>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp"
          className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong bg-white/[0.04] text-fg transition-colors active:bg-white/10"
        >
          <MessageCircle aria-hidden="true" className="size-5" />
        </a>
      </div>
    </div>
  );
}
