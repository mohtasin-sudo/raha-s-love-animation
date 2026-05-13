import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLowPower } from "@/hooks/use-low-power";

const COLORS = ["#ff6b9d", "#ffd166", "#f78ca0", "#ffafbd", "#ffffff", "#ff9ec7", "#ffc4e1"];
const SHAPES = ["■", "●", "▲", "♥", "✦"];

type Piece = { id: number; x: number; color: string; rot: number; delay: number; dur: number; shape: string; size: number };

function makeBurst(n: number): Piece[] {
  return Array.from({ length: n }, (_, i) => ({
    id: Date.now() + i,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rot: Math.random() * 720 - 360,
    delay: Math.random() * 0.5,
    dur: 2.5 + Math.random() * 2.5,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    size: 10 + Math.random() * 14,
  }));
}

export function ConfettiFinale() {
  const isMobile = useIsMobile();
  const lowPower = useLowPower();
  const initialN = lowPower ? 18 : isMobile ? 35 : 80;
  const burstN = lowPower ? 28 : isMobile ? 55 : 120;
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(makeBurst(initialN));
  }, [initialN]);

  const burst = () => setPieces(makeBurst(burstN));

  return (
    <section className="relative px-6 py-32 text-center overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        <AnimatePresence>
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              initial={{ y: -30, x: `${p.x}vw`, opacity: 1, rotate: 0, scale: 0 }}
              animate={{ y: "115vh", rotate: p.rot, opacity: [1, 1, 0], scale: 1 }}
              transition={{ duration: p.dur, delay: p.delay, ease: [0.4, 0, 0.6, 1] }}
              className="absolute top-0 block leading-none"
              style={{ color: p.color, fontSize: p.size, left: 0, ...(lowPower ? null : { textShadow: `0 0 6px ${p.color}` }) }}
            >
              {p.shape}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 flex flex-col items-center"
      >
        <p className="kicker mb-4">Final Page</p>
        <span className="rule rule-center mb-6" />
        <h3
          className="text-5xl sm:text-7xl italic"
          style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontWeight: 500, letterSpacing: "-0.01em" }}
        >
          Forever begins today
        </h3>
      </motion.div>

      <motion.button
        onClick={burst}
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="relative rounded-full px-12 py-6 text-lg font-medium uppercase tracking-[0.3em] transition-all"
        style={{
          background: "linear-gradient(135deg, var(--rose), var(--rose-glow), var(--gold))",
          backgroundSize: "200% 200%",
          color: "var(--night)",
          boxShadow: "var(--shadow-glow)",
          fontFamily: "var(--font-display)",
        }}
      >
        🎉 Make another wish
      </motion.button>

      {/* Signature */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="mt-24"
      >
        <div className="mx-auto mb-8 h-px w-32 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        <p className="text-base italic text-white/60" style={{ fontFamily: "var(--font-serif)" }}>
          Quietly yours —
        </p>
        <p
          className="mt-3 text-3xl sm:text-5xl shimmer-text"
          style={{ fontFamily: "var(--font-script)" }}
        >
          A Silent Admirer
        </p>
        <p
          className="mt-6 text-[10px] uppercase tracking-[0.5em] text-white/40"
          style={{ fontFamily: "var(--font-display)" }}
        >
          a film crafted with 💖 just for raha
        </p>
        <p className="mt-2 text-[10px] tracking-[0.3em] text-white/30">— fin —</p>
      </motion.div>

      {/* Subtle "Tahmid" watermark — present but not loud */}
      <motion.div
        className="relative mt-16 select-none"
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{
            fontFamily: "'Pinyon Script', cursive",
            fontSize: "clamp(6rem, 22vw, 14rem)",
            color: "var(--gold)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            filter: "blur(0.5px)",
            opacity: 0.068,
          }}
        >
          Tahmid
        </div>

        <p
          className="relative text-[9px] tracking-[0.45em] uppercase"
          style={{
            color: "oklch(0.85 0.06 70)",
            fontFamily: "var(--font-display)",
            opacity: 0.45,
          }}
        >
          ✦ t a h m i d ✦
        </p>
      </motion.div>
    </section>
  );
}
