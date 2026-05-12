import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const lines = [
  { t: "In a world full of moments...", d: 0.2 },
  { t: "one day shines brighter than the rest.", d: 2.4 },
  { t: "A story written in heartbeats —", d: 4.8 },
];

export function CinematicIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 7200);
    const t2 = setTimeout(() => onDone(), 8400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase < 1 && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black"
        >
          {/* Curtains */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ delay: 6.6, duration: 1.4, ease: [0.83, 0, 0.17, 1] }}
            className="absolute inset-y-0 left-0 w-1/2"
            style={{
              background: "linear-gradient(90deg, oklch(0.18 0.10 10), oklch(0.10 0.06 350))",
              boxShadow: "inset -20px 0 60px rgba(0,0,0,0.7)",
            }}
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ delay: 6.6, duration: 1.4, ease: [0.83, 0, 0.17, 1] }}
            className="absolute inset-y-0 right-0 w-1/2"
            style={{
              background: "linear-gradient(270deg, oklch(0.18 0.10 10), oklch(0.10 0.06 350))",
              boxShadow: "inset 20px 0 60px rgba(0,0,0,0.7)",
            }}
          />

          {/* Spotlight */}
          <div
            className="pointer-events-none absolute -top-1/3 left-0 h-[200vh] w-[40vw]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,240,200,0.08), transparent)",
              animation: "spotlight-sweep 6s ease-in-out infinite",
              transformOrigin: "top left",
            }}
          />

          {/* Letterboxing bars */}
          <motion.div
            initial={{ y: "-100%" }} animate={{ y: 0 }} transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 right-0 h-16 bg-black z-10"
          />
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8 }}
            className="absolute bottom-0 left-0 right-0 h-16 bg-black z-10"
          />

          {/* Text reveals */}
          <div className="relative z-20 px-6 text-center">
            {lines.map((l, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [30, 0, 0, -20],
                  filter: ["blur(20px)", "blur(0px)", "blur(0px)", "blur(10px)"],
                }}
                transition={{
                  duration: 2.4,
                  delay: l.d,
                  times: [0, 0.2, 0.85, 1],
                  ease: "easeOut",
                }}
                className="absolute inset-x-0 text-[clamp(1.4rem,4.5vw,2.6rem)] tracking-wide"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  color: "oklch(0.92 0.05 30)",
                  letterSpacing: "0.02em",
                }}
              >
                {l.t}
              </motion.p>
            ))}
          </div>

          {/* Skip */}
          <button
            onClick={onDone}
            className="absolute bottom-6 right-6 z-30 text-xs uppercase tracking-[0.3em] text-white/40 hover:text-white/80"
          >
            skip ›
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
