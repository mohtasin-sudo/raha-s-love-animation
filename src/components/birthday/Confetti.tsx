import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#ff6b9d", "#ffd166", "#f78ca0", "#ffafbd", "#ffffff", "#ff9ec7"];

type Piece = { id: number; x: number; color: string; rot: number; delay: number; dur: number };

function makeBurst(n: number): Piece[] {
  return Array.from({ length: n }, (_, i) => ({
    id: Date.now() + i,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rot: Math.random() * 360,
    delay: Math.random() * 0.4,
    dur: 2 + Math.random() * 2,
  }));
}

export function ConfettiFinale() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(makeBurst(60));
  }, []);

  const burst = () => setPieces(makeBurst(80));

  return (
    <section className="relative px-6 py-24 text-center">
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        <AnimatePresence>
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
              animate={{ y: "110vh", rotate: p.rot + 720, opacity: 0 }}
              transition={{ duration: p.dur, delay: p.delay, ease: "easeIn" }}
              className="absolute top-0 block h-3 w-2 rounded-sm"
              style={{ background: p.color, left: 0 }}
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={burst}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative rounded-full px-10 py-5 text-lg font-semibold transition-all"
        style={{
          background: "linear-gradient(135deg, var(--rose), var(--rose-glow))",
          color: "var(--night)",
          boxShadow: "var(--shadow-glow)",
        }}
      >
        🎉 Make another wish
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-16 text-base text-muted-foreground"
      >
        With all my love,
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-2 text-2xl sm:text-3xl shimmer-text"
        style={{ fontFamily: "var(--font-script)" }}
      >
        Coder on Fall in Love
      </motion.p>
      <p className="mt-3 text-xs tracking-widest text-muted-foreground">
        crafted with 💖 just for Raha
      </p>
    </section>
  );
}
