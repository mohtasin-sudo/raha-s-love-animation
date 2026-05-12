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

        {/* Constellation lines connecting stars (behind the name) */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {[
            ["8,18", "22,8", "38,22", "55,6", "72,18", "88,10"],
            ["12,78", "30,88", "50,92", "68,82", "84,90"],
          ].map((pts, idx) => (
            <motion.polyline
              key={idx}
              points={pts.join(" ")}
              fill="none"
              stroke="oklch(0.85 0.14 70 / 0.55)"
              strokeWidth="0.18"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.4, delay: 1.8 + idx * 0.3, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 2px oklch(0.88 0.16 60 / 0.8))" }}
            />
          ))}
        </svg>

        {/* Shooting star */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute h-px w-24"
          style={{
            top: "20%",
            left: "-10%",
            background:
              "linear-gradient(90deg, transparent, white, oklch(0.88 0.18 70))",
            boxShadow: "0 0 12px white",
            transformOrigin: "left center",
            rotate: "18deg",
          }}
          initial={{ x: 0, opacity: 0 }}
          whileInView={{ x: ["0vw", "120vw"], opacity: [0, 1, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 3.2, ease: "easeOut" }}
        />

        {/* Decorative orbit ring around the name */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 sm:h-72 sm:w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            border: "1px dashed oklch(0.85 0.14 70 / 0.35)",
            boxShadow: "inset 0 0 30px oklch(0.85 0.18 25 / 0.15)",
          }}
          initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 360 }}
          viewport={{ once: true }}
          transition={{
            opacity: { duration: 1, delay: 1.6 },
            scale: { duration: 1.2, delay: 1.6, ease: "easeOut" },
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* The name — script with shimmer + ornaments */}
        <div className="relative z-10 flex items-center gap-3">
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="text-2xl"
            style={{ color: "var(--gold)", filter: "drop-shadow(0 0 8px var(--gold))" }}
          >
            ✶
          </motion.span>

          <motion.h2
            aria-label={NAME}
            className="relative text-[clamp(4.5rem,20vw,10rem)] leading-none"
            initial={{ backgroundPosition: "0% 50%" }}
            whileInView={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            viewport={{ once: true }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
            style={{
              fontFamily: "'Pinyon Script', cursive",
              fontWeight: 400,
              background:
                "linear-gradient(110deg, oklch(0.95 0.08 30) 0%, oklch(0.88 0.16 60) 30%, oklch(0.92 0.18 80) 50%, oklch(0.85 0.18 25) 70%, oklch(0.95 0.08 30) 100%)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter:
                "drop-shadow(0 0 18px oklch(0.85 0.18 25 / 0.6)) drop-shadow(0 0 40px oklch(0.78 0.18 10 / 0.35))",
              paddingBottom: "0.1em",
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
          </motion.h2>

          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="text-2xl"
            style={{ color: "var(--gold)", filter: "drop-shadow(0 0 8px var(--gold))" }}
          >
            ✶
          </motion.span>
        </div>

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
