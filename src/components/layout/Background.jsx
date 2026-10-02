import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery";

/**
 * Ambientação fixa: brilhos radiais muito sutis + luz que segue o mouse.
 * A luz só existe em desktop e move com transform (GPU), atualizada uma vez por frame.
 */
export default function Background() {
  const spotRef = useRef(null);
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const enabled = finePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      frame = 0;
      if (spotRef.current) spotRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[30vh] left-[-10vw] h-[80vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.14),transparent)]" />
      <div className="absolute top-[20vh] right-[-20vw] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgb(6_182_212/0.07),transparent)]" />
      {enabled && (
        <div
          ref={spotRef}
          className="absolute top-0 left-0 size-[600px] rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.07),transparent)] will-change-transform"
          style={{ transform: "translate3d(-600px,-600px,0)" }}
        />
      )}
    </div>
  );
}
