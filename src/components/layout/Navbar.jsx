import { useEffect, useRef } from "react";
import Button from "../ui/Button";
import { personalInfo } from "../../data/personal";
import { whatsappLink } from "../../lib/whatsapp";
import { useScrolled } from "../../hooks/useScrolled";
import { useActiveSection } from "../../hooks/useActiveSection";
import { cn } from "../../lib/cn";

const links = [
  { href: "#projetos", label: "Projetos" },
  { href: "#processo", label: "Processo" },
  { href: "#servicos", label: "Serviços" },
  { href: "#faq", label: "FAQ" },
];
const sectionIds = links.map((l) => l.href.slice(1));

export function Logo({ className }) {
  return (
    <a href="#inicio" className={cn("group flex items-center gap-3 rounded-lg", className)} aria-label={`${personalInfo.name}, voltar ao início`}>
      <span className="crop-marks grid size-9 place-items-center text-[13px] font-extrabold tracking-[-0.06em] group-hover:[--c:rgb(34_211_238/0.9)]">
        {personalInfo.initials}
      </span>
      <span className="text-[0.9375rem] font-semibold tracking-[-0.02em]">{personalInfo.name}</span>
    </a>
  );
}

export default function Navbar({ open, setOpen }) {
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Menu mobile: trava a rolagem, fecha com ESC e devolve o foco ao botão.
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, setOpen]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b pt-[env(safe-area-inset-top)] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
          scrolled || open
            ? "border-line bg-ink/80 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl"
            : "border-transparent bg-ink/20 backdrop-blur-[6px]"
        )}
      >
        <nav aria-label="Principal" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3.5 -bottom-px h-px origin-left bg-gradient-to-r from-violet to-cyan transition-transform duration-500 ease-out-expo",
                        isActive ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Button href="#briefing" size="sm" arrow className="hidden md:inline-flex">
              Solicitar orçamento
            </Button>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="relative -mr-2 grid size-11 place-items-center rounded-full md:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-5 rounded bg-fg transition-transform duration-500 ease-out-expo",
                    open ? "top-[5px] rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] rounded bg-fg transition-all duration-500 ease-out-expo",
                    open ? "top-[5px] w-5 -rotate-45" : "top-[10px] w-3.5"
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Menu mobile. Fechado, fica invisível de verdade (visibility) para não capturar toques;
          o painel é absolute para não esticar o header fixo além da barra.
          visibility só transiciona ao fechar (mantém o fade-out); ao abrir vira visível na hora,
          senão o focus() do primeiro link cai num elemento ainda hidden. */}
      <div
        className={cn(
          "fixed inset-0 top-0 -z-10 bg-black/60 backdrop-blur-sm duration-300 md:hidden",
          open ? "visible opacity-100 transition-opacity" : "invisible pointer-events-none opacity-0 transition-[opacity,visibility]"
        )}
        onClick={close}
        aria-hidden="true"
      />
      <div
        id="menu-mobile"
        inert={!open}
        className={cn(
          // Altura limitada à área abaixo da barra: em paisagem o menu rola em vez de cortar os botões.
          "absolute inset-x-0 top-full max-h-[calc(100dvh-4rem-1px-env(safe-area-inset-top,0px))] overflow-y-auto overscroll-contain border-b border-line bg-ink/95 px-5 pt-4 pb-8 backdrop-blur-xl duration-500 ease-out-expo md:hidden",
          open
            ? "visible translate-y-0 opacity-100 transition-[opacity,transform]"
            : "invisible pointer-events-none -translate-y-3 opacity-0 transition-[opacity,transform,visibility]"
        )}
      >
        <ul className="flex flex-col">
          {links.map((link, i) => (
            <li
              key={link.href}
              className={cn("border-b border-line transition-[opacity,transform] duration-500 ease-out-expo", open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0")}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={close}
                className="flex items-center justify-between py-4 text-2xl font-bold tracking-[-0.03em]"
              >
                {link.label}
                <span aria-hidden="true" className="text-base font-normal text-muted">
                  0{i + 1}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-3">
          <Button href="#briefing" size="lg" arrow onClick={close} className="w-full">
            Solicitar orçamento
          </Button>
          <Button href={whatsappLink()} variant="secondary" size="lg" onClick={close} className="w-full">
            Conversar no WhatsApp
          </Button>
        </div>
      </div>
    </header>
  );
}
