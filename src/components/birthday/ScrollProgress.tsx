import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SECTION_LABELS = [
  "Opening",
  "A Wish",
  "Stars",
  "The Cake",
  "Memories",
  "A Gift",
  "Finale",
];

export function ScrollProgress({ total = 7 }: { total?: number }) {
  const [current, setCurrent] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(p);
      setCurrent(Math.min(total, Math.max(1, Math.round(p * (total - 1)) + 1)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [total]);

  const label = SECTION_LABELS[current - 1] ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed top-3 left-1/2 -translate-x-1/2 z-[110] pointer-events-none"
      aria-hidden
    >
      <div
        className="flex items-center gap-3 rounded-full px-3.5 py-1.5 backdrop-blur-md"
        style={{
          background: "oklch(0.12 0.02 30 / 0.55)",
          border: "1px solid oklch(0.74 0.10 75 / 0.35)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
        }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.32em]"
          style={{ color: "var(--gold)", fontFamily: "var(--font-display)" }}
        >
          {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        {/* Tiny dot rail */}
        <div className="flex items-center gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <motion.span
              key={i}
              className="block rounded-full"
              animate={{
                width: i + 1 === current ? 14 : 4,
                opacity: i + 1 === current ? 1 : i + 1 < current ? 0.7 : 0.25,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                height: 4,
                background:
                  i + 1 <= current ? "var(--gold)" : "oklch(0.85 0.05 60 / 0.6)",
              }}
            />
          ))}
        </div>

        <span
          className="text-[10px] italic hidden sm:inline"
          style={{ color: "var(--ivory-soft)", fontFamily: "var(--font-serif)" }}
        >
          {label}
        </span>
      </div>

      {/* Thin progress bar under the chip */}
      <div
        className="mt-1 mx-auto h-[2px] rounded-full overflow-hidden"
        style={{ width: 120, background: "oklch(0.85 0.05 60 / 0.15)" }}
      >
        <motion.div
          className="h-full"
          style={{ background: "var(--gold)", transformOrigin: "left" }}
          animate={{ scaleX: progress }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
