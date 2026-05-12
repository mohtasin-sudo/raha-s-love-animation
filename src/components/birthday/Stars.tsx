import { useMemo } from "react";
import { useLowPower } from "@/hooks/use-low-power";

export function Stars({ count = 40 }: { count?: number }) {
  const lowPower = useLowPower();
  const n = lowPower ? Math.max(10, Math.round(count / 2.5)) : count;
  const stars = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
      })),
    [n],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            ...(lowPower ? null : { boxShadow: "0 0 6px rgba(255,255,255,0.8)" }),
          }}
        />
      ))}
    </div>
  );
}
