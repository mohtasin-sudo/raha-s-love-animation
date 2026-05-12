import { motion } from "framer-motion";
import { Stars } from "./Stars";

const NAME = "Raha";

export function Hero() {
  const greeting = "Happy Birthday,";

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-20 text-center">
      <Stars count={60} />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mb-4 text-sm uppercase tracking-[0.4em] text-rose-glow/80"
        style={{ color: "var(--rose-glow)" }}
      >
        a wish from my heart
      </motion.p>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="mb-2 text-2xl sm:text-3xl"
        style={{ fontFamily: "var(--font-script)", color: "var(--rose-glow)" }}
      >
        {greeting}
      </motion.h2>

      <h1
        className="relative animate-glow-pulse text-[clamp(4rem,18vw,9rem)] leading-none"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        aria-label={`Happy Birthday ${NAME}`}
      >
        {NAME.split("").map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 60, rotate: -15 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.8 + i * 0.15,
              type: "spring",
              stiffness: 120,
            }}
            className="shimmer-text inline-block"
          >
            {ch}
          </motion.span>
        ))}
      </h1>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 150 }}
        className="mt-6 text-5xl animate-heartbeat"
      >
        💖
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="mt-8 max-w-md text-base sm:text-lg text-muted-foreground"
      >
        Today the stars align a little brighter, just for you.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 text-xs tracking-widest text-muted-foreground"
      >
        ↓ scroll for more love ↓
      </motion.div>
    </section>
  );
}
