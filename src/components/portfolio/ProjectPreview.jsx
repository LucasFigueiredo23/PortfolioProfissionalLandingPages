/**
 * Prévias desenhadas em código para os projetos sem screenshot.
 * Tudo em unidades cqw: escala com o tamanho do card.
 * Quando tiver um print real, coloque em /public e preencha `image` no projeto.
 */
export default function ProjectPreview({ variant = "store", accent = "#8B5CF6" }) {
  const Variant = variants[variant] || Store;
  return (
    <div aria-hidden="true" className="aspect-[16/10] overflow-hidden" style={{ "--accent": accent }}>
      <Variant />
    </div>
  );
}

const bar = "block rounded-full bg-white/15";

function Store() {
  return (
    <div className="h-full bg-[#0b0d10] p-[4cqw]">
      <div className="flex items-center justify-between">
        <span className="text-[2cqw] font-extrabold tracking-[-0.04em]">Pantoja Imports</span>
        <span className="rounded-full bg-[var(--accent)] px-[1.6cqw] py-[0.6cqw] text-[1.3cqw] font-bold text-[#04161a]">WhatsApp</span>
      </div>
      <p className="mt-[3.5cqw] max-w-[60%] text-[4.2cqw] leading-[1] font-extrabold tracking-[-0.05em]">iPhones prontos para você.</p>
      <div className="mt-[3.5cqw] grid grid-cols-4 gap-[1.8cqw]">
        {["15", "14", "13", "12"].map((m) => (
          <div key={m} className="rounded-[1.4cqw] border border-white/[0.07] bg-white/[0.03] p-[1.6cqw]">
            <div className="mx-auto aspect-[1/2] w-[52%] rounded-[1.6cqw] border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.02] p-[0.8cqw]">
              <div className="grid w-[48%] grid-cols-2 gap-[0.4cqw] rounded-[0.8cqw] bg-black/50 p-[0.5cqw]">
                <i className="aspect-square rounded-full bg-white/30" />
                <i className="aspect-square rounded-full bg-white/30" />
                <i className="aspect-square rounded-full bg-white/30" />
              </div>
            </div>
            <p className="mt-[1.4cqw] text-[1.3cqw] font-semibold">iPhone {m}</p>
            <i className={`${bar} mt-[0.8cqw] h-[0.7cqw] w-[60%]`} />
          </div>
        ))}
      </div>
      <div className="mt-[3cqw] flex items-center justify-between border-t border-white/[0.07] pt-[2.4cqw]">
        <span className="text-[1.3cqw] text-white/55">Fotos reais dos aparelhos</span>
        <span className="flex gap-[1cqw]">
          <span className="rounded-full border border-white/15 px-[1.6cqw] py-[0.5cqw] text-[1.2cqw]">Instagram</span>
          <span className="rounded-full border border-white/15 px-[1.6cqw] py-[0.5cqw] text-[1.2cqw]">WhatsApp</span>
        </span>
      </div>
    </div>
  );
}

function Fashion() {
  return (
    <div className="grid h-full grid-cols-[1.1fr_1fr] bg-[#0c0b0d]">
      <div className="relative flex flex-col justify-between p-[4cqw]">
        <span className="text-[1.6cqw] font-semibold tracking-[0.02em] text-white/70">Hooper Zone</span>
        <p className="text-[11cqw] leading-[0.8] font-extrabold tracking-[-0.08em]">
          HZ<span className="text-[var(--accent)]">.</span>
        </p>
        <div>
          <p className="text-[1.8cqw] font-semibold">Nova coleção</p>
          <span className="mt-[1.5cqw] inline-block rounded-full border border-white/30 px-[2cqw] py-[0.8cqw] text-[1.3cqw] font-semibold">
            Ver peças →
          </span>
        </div>
      </div>
      <div className="grid grid-rows-[1.3fr_1fr] gap-[1.2cqw] p-[1.2cqw] pl-0">
        <div className="rounded-[1.2cqw] bg-[radial-gradient(circle_at_40%_35%,color-mix(in_oklab,var(--accent)_45%,transparent),transparent_60%),linear-gradient(160deg,#2a2730,#121114)]" />
        <div className="grid grid-cols-2 gap-[1.2cqw]">
          <div className="rounded-[1.2cqw] bg-[linear-gradient(200deg,#24232a,#141317)]" />
          <div className="rounded-[1.2cqw] bg-[linear-gradient(140deg,#1f1e24,#2c2a33)]" />
        </div>
      </div>
    </div>
  );
}

function Schedule() {
  // 0 = sem aula, 1 = aula, 2 = feriado/fim de semana
  const days = [2, 1, 1, 0, 1, 1, 2, 2, 1, 1, 1, 0, 1, 2, 2, 1, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0, 2, 2, 1, 1, 1, 0, 1, 2];
  const color = ["bg-red-400/70", "bg-[var(--accent)]", "bg-white/10"];
  return (
    <div className="grid h-full grid-cols-[22%_1fr] bg-[#0b0e0d]">
      <div className="border-r border-white/[0.06] p-[2.6cqw]">
        <p className="text-[2cqw] font-extrabold tracking-[-0.04em]">Letivo</p>
        <div className="mt-[3cqw] space-y-[1.6cqw]">
          {["Hoje", "Semana", "Mês", "Turma"].map((l, i) => (
            <p key={l} className={`rounded-[0.8cqw] px-[1.2cqw] py-[0.7cqw] text-[1.3cqw] ${i === 2 ? "bg-white/10 font-semibold" : "text-white/50"}`}>
              {l}
            </p>
          ))}
        </div>
      </div>
      <div className="p-[3cqw]">
        <div className="flex items-end justify-between">
          <p className="text-[2.8cqw] font-extrabold tracking-[-0.04em]">Outubro</p>
          <p className="flex gap-[1.6cqw] text-[1.15cqw] text-white/60">
            <span className="flex items-center gap-[0.5cqw]"><i className="size-[1.1cqw] rounded-[0.3cqw] bg-[var(--accent)]" />Aula</span>
            <span className="flex items-center gap-[0.5cqw]"><i className="size-[1.1cqw] rounded-[0.3cqw] bg-red-400/70" />Sem aula</span>
          </p>
        </div>
        <div className="mt-[2cqw] grid grid-cols-7 gap-[0.9cqw]">
          {days.map((d, i) => (
            <i key={i} className={`aspect-[1.7] rounded-[0.7cqw] ${color[d]}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Institutional() {
  return (
    <div className="h-full bg-[#0b0d12]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-[4cqw] py-[2cqw]">
        <span className="text-[1.8cqw] font-extrabold tracking-[-0.03em]">SEMED</span>
        <span className="flex gap-[2cqw]">
          {[0, 1, 2, 3].map((i) => <i key={i} className={`${bar} h-[0.7cqw] w-[5cqw]`} />)}
        </span>
      </div>
      <div className="m-[3cqw] rounded-[1.6cqw] bg-[linear-gradient(120deg,color-mix(in_oklab,var(--accent)_35%,#0b0d12),#111827)] p-[4cqw]">
        <p className="max-w-[55%] text-[3.6cqw] leading-[1.02] font-extrabold tracking-[-0.04em]">Educação que chega a todos.</p>
        <span className="mt-[2cqw] inline-block rounded-full bg-white px-[2cqw] py-[0.8cqw] text-[1.3cqw] font-bold text-[#0b0d12]">Matrículas</span>
      </div>
      <div className="mx-[3cqw] grid grid-cols-3 gap-[2cqw]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-[1.2cqw] border border-white/[0.07] p-[1.8cqw]">
            <i className={`${bar} h-[0.8cqw] w-[70%]`} />
            <i className={`${bar} mt-[1cqw] h-[0.7cqw] w-[45%] opacity-60`} />
          </div>
        ))}
      </div>
    </div>
  );
}

const variants = { store: Store, fashion: Fashion, schedule: Schedule, institutional: Institutional };
