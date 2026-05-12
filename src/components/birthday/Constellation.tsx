import { motion } from "framer-motion";

// Letters as connected dot patterns (5x7 grid scaled)
const LETTERS: Record<string, [number, number][]> = {
  R: [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,0],[2,0],[3,1],[3,2],[2,3],[1,3],[0,3],[1,4],[2,5],[3,6]],
  A: [[0,6],[0,5],[0,4],[0,3],[1,2],[1,1],[2,0],[3,1],[3,2],[4,3],[4,4],[4,5],[4,6],[1,4],[2,4],[3,4]],
  H: [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[1,3],[2,3],[3,3]],
};

const CHARS = ["R","A","H","A"];
const LETTER_W = 5;
const LETTER_H = 7;
const GAP = 1.5;

const allDots: { x: number; y: number; idx: number }[] = [];
let cursor = 0;
CHARS.forEach((ch, ci) => {
  LETTERS[ch].forEach(([x, y]) => {
    allDots.push({ x: ci * (LETTER_W + GAP) + x, y, idx: cursor++ });
  });
});

const totalW = CHARS.length * LETTER_W + (CHARS.length - 1) * GAP;

export function Constellation() {
  return (
    <section className="relative px-6 py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <p className="text-[10px] uppercase tracking-[0.6em] text-white/40 mb-2"
          style={{ fontFamily: "var(--font-display)" }}>
          Interlude
        </p>
        <h3 className="text-3xl sm:text-4xl gold-text italic" style={{ fontFamily: "var(--font-display)" }}>
          Even the stars know your name
        </h3>
      </motion.div>

      <div className="mx-auto w-full max-w-2xl">
        <svg
          viewBox={`-1 -1 ${totalW + 2} ${LETTER_H + 2}`}
          className="w-full h-auto"
          style={{ filter: "drop-shadow(0 0 8px var(--rose-glow))" }}
        >
          {/* Connecting lines between consecutive dots within each letter */}
          {CHARS.map((ch, ci) => {
            const pts = LETTERS[ch];
            return pts.slice(1).map(([x, y], i) => {
              const [px, py] = pts[i];
              const x1 = ci * (LETTER_W + GAP) + px;
              const y1 = py;
              const x2 = ci * (LETTER_W + GAP) + x;
              const y2 = y;
              return (
                <motion.line
                  key={`${ci}-${i}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="var(--gold)"
                  strokeWidth={0.05}
                  strokeOpacity={0.4}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + (ci * pts.length + i) * 0.04 }}
                />
              );
            });
          })}
          {/* Dots */}
          {allDots.map((d) => (
            <motion.circle
              key={d.idx}
              cx={d.x}
              cy={d.y}
              r={0.18}
              fill="white"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: [0, 1, 0.7], scale: [0, 1.6, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: d.idx * 0.04 }}
              style={{ filter: "drop-shadow(0 0 0.3px white) drop-shadow(0 0 0.8px var(--gold))" }}
            />
          ))}
        </svg>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.5, duration: 1 }}
        className="mt-10 text-center text-xl italic text-white/70"
        style={{ fontFamily: "var(--font-hand)" }}
      >
        — written across the night sky, just for you.
      </motion.p>
    </section>
  );
}
