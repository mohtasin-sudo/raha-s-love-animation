import { useMemo } from "react";

export function FloatingHearts({ count = 18 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 28,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 8,
      })),
    [count],
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
            filter: "drop-shadow(0 0 10px oklch(0.82 0.14 25 / 0.7))",
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
