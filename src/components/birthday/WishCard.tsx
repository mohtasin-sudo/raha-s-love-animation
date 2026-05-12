import { motion } from "framer-motion";

export function WishCard() {
  const message =
    "Raha, every moment with you feels like a soft melody — gentle, warm, unforgettable. On your special day, I wish you endless laughter, dreams that bloom, and a year wrapped in love. Thank you for being you.";

  return (
    <section className="relative px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 60, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, type: "spring" }}
        className="mx-auto max-w-xl rounded-3xl border p-8 sm:p-12 backdrop-blur-md"
        style={{
          background:
            "linear-gradient(145deg, oklch(0.96 0.04 20 / 0.95), oklch(0.92 0.06 30 / 0.9))",
          borderColor: "oklch(0.82 0.14 25 / 0.5)",
          boxShadow: "var(--shadow-glow)",
          color: "var(--night)",
        }}
      >
        <div className="mb-4 text-center text-3xl">💌</div>
        <h3
          className="mb-6 text-center text-3xl sm:text-4xl"
          style={{ fontFamily: "var(--font-script)" }}
        >
          To my dearest Raha,
        </h3>
        <p
          className="text-center text-lg leading-relaxed sm:text-xl"
          style={{ fontFamily: "var(--font-script)" }}
        >
          {message}
        </p>
        <div className="mt-8 text-right text-xl" style={{ fontFamily: "var(--font-script)" }}>
          — yours, always 💕
        </div>
      </motion.div>
    </section>
  );
}
