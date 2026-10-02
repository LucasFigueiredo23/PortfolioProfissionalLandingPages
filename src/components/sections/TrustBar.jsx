import { trustItems } from "../../data/content";
import { Icon } from "../../lib/icons";

/** Faixa de confiança logo após o hero. Só afirmações verificáveis, nada de números inventados. */
export default function TrustBar() {
  return (
    <div className="border-y border-line bg-surface/40">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" aria-label="Como os projetos são feitos">
        {trustItems.map((item, i) => (
          <li
            key={item.label}
            className={
              "flex items-center gap-3 px-5 py-5 text-sm font-medium text-fg/90 sm:px-8 lg:justify-center lg:px-4 " +
              (i !== 0 ? "lg:border-l lg:border-line " : "") +
              (i === trustItems.length - 1 ? "col-span-2 sm:col-span-1" : "")
            }
          >
            <Icon name={item.icon} className="size-4 shrink-0 text-cyan" strokeWidth={1.75} />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
