import { useRef } from "react";
import BrowserFrame from "../ui/BrowserFrame";
import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery";
import { cn } from "../../lib/cn";

/**
 * Mockup do hero: uma landing page "sob medida" com cotas de projeto
 * (linhas de medida e anotações), como um arquivo de design aberto.
 */
export default function HeroVisual() {
  const tiltRef = useRef(null);
  const frame = useRef(0);
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const tiltEnabled = finePointer && !reducedMotion;

  const onPointerMove = (e) => {
    if (!tiltEnabled || frame.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      tiltRef.current?.style.setProperty("--ry", `${px * 5}deg`);
      tiltRef.current?.style.setProperty("--rx", `${py * -4}deg`);
    });
  };
  const onPointerLeave = () => {
    tiltRef.current?.style.setProperty("--ry", "0deg");
    tiltRef.current?.style.setProperty("--rx", "0deg");
  };

  return (
    <div
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="load-in relative mx-auto w-full max-w-[680px] pt-8 pb-28 [perspective:1800px] sm:pb-16 lg:max-w-none"
      style={{ "--d": "380ms" }}
    >
      {/* Brilho atrás do mockup */}
      <div className="absolute inset-x-[10%] top-[20%] bottom-[10%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.32),rgb(6_182_212/0.08)_60%,transparent)] blur-2xl" />

      {/* Cota horizontal: largura do layout */}
      <div className="absolute top-0 left-0 w-[86%]">
        <div className="spec-h draw-x" style={{ "--d": "1000ms" }}>
          <span className="spec-tag pop-in" style={{ "--d": "1350ms" }}>
            1440 px
          </span>
        </div>
      </div>

      <div className="float-slow">
        <div
          ref={tiltRef}
          className="relative transition-transform duration-700 ease-out-expo [transform-style:preserve-3d]"
          style={{
            transform: "rotateX(calc(3deg + var(--rx, 0deg))) rotateY(calc(-5deg + var(--ry, 0deg)))",
          }}
        >
          <BrowserFrame url="suamarca.com.br" className="relative w-[86%]">
            <MockPage />
            {/* Reflexo */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.06),transparent_35%)]" />
          </BrowserFrame>

          {/* Celular */}
          <div className="absolute right-0 -bottom-[16%] w-[21%] [transform:translateZ(60px)]">
            <div className="rounded-[clamp(14px,3.4vw,26px)] border border-white/15 bg-[#0c0c0e] p-[5%] shadow-[0_30px_60px_-12px_rgb(0_0_0/0.9)]">
              <div className="@container overflow-hidden rounded-[clamp(10px,2.6vw,20px)] bg-[#101014]">
                <MockPhone />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Anotações (os "floating cards") */}
      <Callout
        className="bottom-0 left-0 sm:bottom-[20%] sm:left-[-3%]"
        delay={1500}
        index="01"
        title="Foco em conversão"
        text="A ação principal aparece já na primeira tela."
      />
      <Callout
        className="hidden sm:block top-[2%] right-[-1%]"
        delay={1650}
        float="float-slower"
        index="02"
        title="Carregamento leve"
        text="Sem biblioteca sobrando."
      />
      <Callout
        className="hidden sm:block bottom-0 left-[36%]"
        delay={1800}
        index="03"
        title="Mobile first"
        text="Desenhado para o polegar."
      />
    </div>
  );
}

function Callout({ className, delay, index, title, text, float = "float-slow" }) {
  return (
    <div className={cn("absolute z-10", className)}>
      <div className="pop-in" style={{ "--d": `${delay}ms` }}>
        <div className={float}>
          <div className="w-[min(46vw,13.5rem)] rounded-xl border border-white/12 bg-raised/90 px-3.5 py-3 shadow-[0_20px_40px_-16px_rgb(0_0_0/0.9)] backdrop-blur-md">
            <p className="flex items-center gap-2 text-[13px] font-semibold tracking-[-0.01em]">
              <span className="rounded bg-cyan px-1 text-[10px] leading-4 font-bold text-[#04161a] tabular-nums">{index}</span>
              {title}
            </p>
            <p className="mt-1 text-xs leading-snug text-muted">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Página fictícia dentro do navegador. Tamanhos em cqw: escala com o mockup. */
function MockPage() {
  return (
    <div className="aspect-[16/10] bg-[#0d0d10] p-[4cqw] text-fg">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-[1cqw] text-[1.7cqw] font-bold tracking-tight">
          <span className="size-[2.2cqw] rounded-full bg-gradient-to-br from-violet to-cyan" />
          Sua marca
        </span>
        <span className="flex gap-[2cqw]">
          <i className="h-[0.7cqw] w-[5cqw] rounded-full bg-white/15" />
          <i className="h-[0.7cqw] w-[5cqw] rounded-full bg-white/15" />
          <i className="h-[0.7cqw] w-[5cqw] rounded-full bg-white/15" />
        </span>
      </div>

      <div className="mt-[5cqw] grid grid-cols-[1.15fr_1fr] gap-[4cqw]">
        <div>
          <span className="inline-block rounded-full border border-white/10 px-[1.4cqw] py-[0.4cqw] text-[1.25cqw] text-muted">
            Feito para o seu cliente
          </span>
          <p className="mt-[2cqw] text-[4.6cqw] leading-[1] font-extrabold tracking-[-0.05em]">
            Sua marca, do jeito certo.
          </p>
          <div className="mt-[2cqw] space-y-[0.9cqw]">
            <i className="block h-[0.8cqw] w-[90%] rounded-full bg-white/12" />
            <i className="block h-[0.8cqw] w-[70%] rounded-full bg-white/12" />
          </div>
          {/* Cota vertical: espaçamento até o botão */}
          <div className="relative mt-[0.6cqw] ml-[3cqw] h-[3.4cqw]">
            <div className="spec-v draw-y h-full" style={{ "--d": "1200ms" }}>
              <span className="spec-tag pop-in !left-[3.2cqw] !translate-x-0 !text-[1.1cqw] !leading-[1.7cqw]" style={{ "--d": "1450ms" }}>
                32
              </span>
            </div>
          </div>
          <span className="mt-[0.6cqw] inline-flex items-center gap-[0.8cqw] rounded-full bg-fg px-[2.2cqw] py-[1.1cqw] text-[1.45cqw] font-bold text-ink shadow-[0_0_3cqw_-0.5cqw_rgb(139_92_246/0.8)]">
            Fale com a gente <span aria-hidden="true">→</span>
          </span>
        </div>
        <div className="relative overflow-hidden rounded-[1.6cqw] border border-white/10 bg-[#141418] [background-image:radial-gradient(circle_at_30%_30%,rgb(139_92_246/0.55),transparent_55%),radial-gradient(circle_at_75%_70%,rgb(34_211_238/0.4),transparent_50%)]">
          <div className="absolute right-[8%] bottom-[10%] left-[8%] rounded-[1cqw] border border-white/10 bg-black/40 p-[1.6cqw] backdrop-blur">
            <i className="block h-[0.7cqw] w-[60%] rounded-full bg-white/30" />
            <i className="mt-[0.8cqw] block h-[0.7cqw] w-[40%] rounded-full bg-white/15" />
          </div>
        </div>
      </div>

      <div className="mt-[3.5cqw] grid grid-cols-3 gap-[2cqw]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-[1cqw] border border-white/[0.07] bg-white/[0.025] p-[1.6cqw]">
            <i className="block size-[2.2cqw] rounded-[0.6cqw] bg-white/10" />
            <i className="mt-[1.2cqw] block h-[0.7cqw] w-[70%] rounded-full bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MockPhone() {
  return (
    <div className="aspect-[9/19] p-[9cqw] text-fg">
      <div className="flex items-center justify-between">
        <span className="size-[9cqw] rounded-full bg-gradient-to-br from-violet to-cyan" />
        <span className="space-y-[2cqw]">
          <i className="block h-[1.6cqw] w-[10cqw] rounded-full bg-white/40" />
          <i className="block h-[1.6cqw] w-[10cqw] rounded-full bg-white/40" />
        </span>
      </div>
      <p className="mt-[14cqw] text-[13cqw] leading-[1] font-extrabold tracking-[-0.05em]">Sua marca, do jeito certo.</p>
      <div className="mt-[6cqw] space-y-[3cqw]">
        <i className="block h-[2.4cqw] w-full rounded-full bg-white/12" />
        <i className="block h-[2.4cqw] w-[75%] rounded-full bg-white/12" />
      </div>
      <span className="mt-[8cqw] block rounded-full bg-fg py-[4.5cqw] text-center text-[5.5cqw] font-bold text-ink">Fale com a gente</span>
      <div className="mt-[8cqw] aspect-square rounded-[6cqw] bg-[#141418] [background-image:radial-gradient(circle_at_30%_30%,rgb(139_92_246/0.55),transparent_55%),radial-gradient(circle_at_75%_70%,rgb(34_211_238/0.4),transparent_50%)]" />
    </div>
  );
}
