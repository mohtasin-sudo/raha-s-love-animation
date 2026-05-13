import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const lines = [
  "Today is your day, Raha.",
  "Not close, not strangers — somewhere in between.",
  "Just enough to wish you well, quietly.",
  "So tonight, no name. Just a small title…",
  "A Silent Admirer.",
];

export function CinematicIntro({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [closing, setClosing] = useState(false);
  // Keep onDone stable across parent re-renders so the timer chain isn't restarted
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    // ~85ms per character + 1.4s buffer — scales with text length so longer lines linger
    const durations = lines.map((l) =>
      Math.min(7500, Math.max(2600, l.length * 85 + 1400)),
    );
    let acc = 600; // small initial delay
    durations.forEach((d, i) => {
      const showAt = acc;
      timers.push(setTimeout(() => setStep(i + 1), showAt));
      acc += d;
    });
    timers.push(setTimeout(() => setClosing(true), acc + 400));
    timers.push(setTimeout(() => onDoneRef.current(), acc + 1600));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black"
      >
        {/* Curtains */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: closing ? "-100%" : 0 }}
          transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
          className="absolute inset-y-0 left-0 w-1/2 z-10"
          style={{
            background:
              "repeating-linear-gradient(90deg, oklch(0.16 0.10 10) 0 14px, oklch(0.10 0.08 5) 14px 28px)",
            boxShadow: "inset -30px 0 80px rgba(0,0,0,0.8)",
          }}
        />
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: closing ? "100%" : 0 }}
          transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
          className="absolute inset-y-0 right-0 w-1/2 z-10"
          style={{
            background:
              "repeating-linear-gradient(90deg, oklch(0.16 0.10 10) 0 14px, oklch(0.10 0.08 5) 14px 28px)",
            boxShadow: "inset 30px 0 80px rgba(0,0,0,0.8)",
          }}
        />

        {/* Letterbox bars */}
        <div className="absolute top-0 inset-x-0 h-12 sm:h-16 bg-black z-20" />
        <div className="absolute bottom-0 inset-x-0 h-12 sm:h-16 bg-black z-20" />

        {/* Spotlight glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.45 0.18 15 / 0.4), transparent 70%)" }}
        />

        {/* Text — single fixed slot */}
        <div className="relative z-30 flex h-32 w-full items-center justify-center px-6">
          <AnimatePresence mode="wait">
            {step > 0 && step <= lines.length && (
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 30, filter: "blur(16px)", letterSpacing: "0.3em" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.02em" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="text-center text-[clamp(1.2rem,4vw,2.4rem)] italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "oklch(0.95 0.05 35)",
                  textShadow: "0 0 30px oklch(0.85 0.15 25 / 0.5)",
                }}
              >
                {lines[step - 1]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}
