import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(makeBurst(80));
  }, []);

  const burst = () => setPieces(makeBurst(120));

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
              style={{ color: p.color, fontSize: p.size, left: 0, textShadow: `0 0 6px ${p.color}` }}
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
        className="mb-10"
      >
        <p className="text-[10px] uppercase tracking-[0.6em] text-white/40 mb-2"
          style={{ fontFamily: "var(--font-display)" }}>
          Final Scene
        </p>
        <h3
          className="text-5xl sm:text-7xl shimmer-text italic"
          style={{ fontFamily: "var(--font-display)" }}
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
          With all my love,
        </p>
        <p
          className="mt-3 text-3xl sm:text-5xl shimmer-text"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Coder on Fall in Love
        </p>
        <p
          className="mt-6 text-[10px] uppercase tracking-[0.5em] text-white/40"
          style={{ fontFamily: "var(--font-display)" }}
        >
          a film crafted with 💖 just for raha
        </p>
        <p className="mt-2 text-[10px] tracking-[0.3em] text-white/30">— fin —</p>
      </motion.div>
    </section>
  );
}
