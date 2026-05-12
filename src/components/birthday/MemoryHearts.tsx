import { motion } from "framer-motion";

const wishes = [
  { icon: "🌹", text: "You're my favorite hello and hardest goodbye." },
  { icon: "✨", text: "May your year sparkle as much as your smile." },
  { icon: "🎶", text: "You are the song my heart hums all day." },
  { icon: "🌙", text: "Sweet dreams, big wishes — all of them yours." },
  { icon: "💝", text: "Forever grateful the universe made you, Raha." },
];

export function MemoryHearts() {
  return (
    <section className="px-6 py-20">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center text-3xl sm:text-4xl shimmer-text"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Little wishes, just for you
      </motion.h3>

      <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
        {wishes.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
            whileHover={{ scale: 1.04, rotate: -1 }}
            className="rounded-2xl border p-6 backdrop-blur-md"
            style={{
              background: "oklch(0.30 0.10 320 / 0.45)",
              borderColor: "oklch(0.82 0.14 25 / 0.35)",
              boxShadow: "0 10px 40px oklch(0.72 0.19 10 / 0.2)",
            }}
          >
            <div className="mb-3 text-3xl">{w.icon}</div>
            <p className="text-base sm:text-lg" style={{ fontFamily: "var(--font-script)" }}>
              {w.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
