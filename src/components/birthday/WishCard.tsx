import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const message =
  "Raha, every moment with you feels like a soft melody — gentle, warm, unforgettable. On your special day, I wish you endless laughter, dreams that bloom like wildflowers, and a year wrapped in love. Thank you for being the most beautiful chapter in my story.";

export function WishCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(message.slice(0, i));
      if (i >= message.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section ref={ref} className="relative px-6 py-32">
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <p className="text-[10px] uppercase tracking-[0.6em] text-white/40 mb-2"
          style={{ fontFamily: "var(--font-display)" }}>
          Chapter One
        </p>
        <h2 className="text-4xl sm:text-5xl gold-text" style={{ fontFamily: "var(--font-display)" }}>
          A letter for you
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 80, rotate: -3, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, rotate: -1.2, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, type: "spring" }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        className="mx-auto max-w-xl rounded-[2rem] border p-8 sm:p-12 backdrop-blur-md relative"
        style={{
          background:
            "linear-gradient(145deg, oklch(0.97 0.03 60 / 0.97), oklch(0.92 0.05 30 / 0.92))",
          borderColor: "oklch(0.84 0.14 25 / 0.6)",
          boxShadow: "var(--shadow-glow), inset 0 0 60px oklch(0.95 0.06 40 / 0.3)",
          color: "var(--ink)",
        }}
      >
        {/* Wax seal */}
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-full text-2xl shadow-lg"
          style={{
            background: "radial-gradient(circle at 30% 30%, oklch(0.55 0.20 15), oklch(0.35 0.18 10))",
            boxShadow: "0 6px 20px oklch(0.35 0.18 10 / 0.6)",
          }}
        >
          💌
        </div>

        <h3
          className="mb-8 mt-2 text-center text-4xl sm:text-5xl"
          style={{ fontFamily: "var(--font-script)", color: "oklch(0.35 0.15 10)" }}
        >
          To my dearest Raha,
        </h3>
        <p
          className="min-h-[12rem] text-center text-xl leading-relaxed sm:text-2xl"
          style={{ fontFamily: "var(--font-hand)", color: "var(--ink)" }}
        >
          {typed}
          <span className="inline-block w-0.5 h-6 bg-current align-middle ml-0.5 animate-pulse" />
        </p>
        <div
          className="mt-10 text-right text-2xl"
          style={{ fontFamily: "var(--font-script)", color: "oklch(0.35 0.15 10)" }}
        >
          — yours, always 💕
        </div>
      </motion.div>
    </section>
  );
}
