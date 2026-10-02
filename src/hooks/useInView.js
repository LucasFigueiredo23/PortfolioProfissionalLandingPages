import { useEffect, useRef, useState } from "react";

/*
 * Um único IntersectionObserver compartilhado por todos os elementos
 * (em vez de um observer por componente). Dispara uma vez e para de observar.
 */
const callbacks = new WeakMap();
let observer;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) callbacks.get(entry.target)?.();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );
  }
  return observer;
}

export function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const obs = getObserver();
    callbacks.set(el, () => {
      setInView(true);
      obs.unobserve(el);
      callbacks.delete(el);
    });
    obs.observe(el);
    return () => {
      obs.unobserve(el);
      callbacks.delete(el);
    };
  }, []);

  return [ref, inView];
}
