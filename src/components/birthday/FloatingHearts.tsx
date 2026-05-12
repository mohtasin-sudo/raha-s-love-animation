import { useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function FloatingHearts({ count = 18 }: { count?: number }) {
  const isMobile = useIsMobile();
  const n = isMobile ? Math.min(8, Math.round(count / 2.5)) : count;

  const hearts = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 24,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 8,
      })),
    [n],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-[-10vh]"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
            willChange: "transform, opacity",
            ...(isMobile
              ? null
              : { filter: "drop-shadow(0 0 10px oklch(0.82 0.14 25 / 0.7))" }),
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
