import { motion } from "framer-motion";

const NAME = "Raha";

// Decorative star positions around the name (percent of container)
const STARS = [
  { x: 8, y: 18, size: 3, delay: 0.2 },
  { x: 22, y: 8, size: 2, delay: 0.4 },
  { x: 38, y: 22, size: 2.5, delay: 0.6 },
  { x: 55, y: 6, size: 3, delay: 0.8 },
  { x: 72, y: 18, size: 2, delay: 1.0 },
  { x: 88, y: 10, size: 2.5, delay: 1.2 },
  { x: 12, y: 78, size: 2.5, delay: 1.4 },
  { x: 30, y: 88, size: 3, delay: 1.6 },
  { x: 50, y: 92, size: 2, delay: 1.8 },
  { x: 68, y: 82, size: 2.5, delay: 2.0 },
  { x: 84, y: 90, size: 3, delay: 2.2 },
  { x: 95, y: 50, size: 2, delay: 2.4 },
  { x: 4, y: 50, size: 2, delay: 2.5 },
];

export function Constellation() {
  return (
    <section className="relative editorial-section px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 flex flex-col items-center text-center"
      >
        <p className="kicker mb-4">Interlude</p>
        <span className="rule rule-center mb-6" />
        <h3
          className="text-3xl sm:text-4xl italic"
          style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontWeight: 500 }}
        >
          Even the stars know your name
        </h3>
      </motion.div>

      {/* Name in the night sky */}
      <div className="relative mx-auto w-full max-w-2xl h-56 sm:h-72 flex items-center justify-center">
        {/* Soft cosmic glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(circle, var(--rose-glow) 0%, transparent 70%)" }}
        />

        {/* Surrounding stars */}
        {STARS.map((s, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: [0, 1, 0.85], scale: [0, 1.4, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: s.delay, ease: "easeOut" }}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              boxShadow: "0 0 8px white, 0 0 16px var(--gold)",
            }}
          />
        ))}

        {/* The name — letter-by-letter constellation reveal */}
        <h2
          aria-label={NAME}
          className="relative z-10 text-[clamp(4rem,18vw,9rem)] leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            color: "var(--ivory)",
            letterSpacing: "0.02em",
            textShadow:
              "0 0 18px oklch(0.85 0.14 25 / 0.7), 0 0 40px oklch(0.72 0.19 10 / 0.45)",
          }}
        >
          {NAME.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(14px)", scale: 0.6 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.4 + i * 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              className="inline-block"
              style={{ transformOrigin: "bottom center" }}
            >
              {ch}
            </motion.span>
          ))}
        </h2>

        {/* Underline shimmer */}
        <motion.span
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
          className="absolute bottom-6 sm:bottom-8 h-px w-40 sm:w-56 origin-left"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold) 70%, transparent)",
            boxShadow: "0 0 8px var(--gold)",
          }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.4, duration: 1 }}
        className="mt-10 text-center text-xl italic text-white/70"
        style={{ fontFamily: "var(--font-hand)" }}
      >
        — written across the night sky, just for you.
      </motion.p>
    </section>
  );
}
