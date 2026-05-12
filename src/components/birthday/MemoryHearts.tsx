import { motion } from "framer-motion";

const wishes = [
  { icon: "🌹", text: "You're my favorite hello and hardest goodbye." },
  { icon: "✨", text: "May your year sparkle as much as your smile." },
  { icon: "🎶", text: "You are the song my heart hums all day." },
  { icon: "🌙", text: "Sweet dreams, big wishes — all of them yours." },
  { icon: "💝", text: "Forever grateful the universe made you, Raha." },
  { icon: "☕", text: "Mornings, coffees, forevers — I want them all with you." },
];

export function MemoryHearts() {
  return (
    <section className="relative px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <p className="text-[10px] uppercase tracking-[0.6em] text-white/40 mb-2"
          style={{ fontFamily: "var(--font-display)" }}>
          Chapter Two
        </p>
        <h3
          className="text-4xl sm:text-6xl shimmer-text italic"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Little wishes, just for you
        </h3>
      </motion.div>

      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
        {wishes.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60, scale: 0.85, rotate: i % 2 ? -3 : 3 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: i % 2 ? -1 : 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: i * 0.12, type: "spring" }}
            whileHover={{ scale: 1.06, rotate: 0, y: -6 }}
            className="group relative rounded-3xl border p-7 backdrop-blur-md overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, oklch(0.30 0.10 320 / 0.55), oklch(0.22 0.10 340 / 0.45))",
              borderColor: "oklch(0.84 0.14 25 / 0.4)",
              boxShadow: "0 20px 60px oklch(0.10 0.06 300 / 0.5)",
            }}
          >
            <div
              className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"
              style={{
                background: "linear-gradient(135deg, var(--rose) 0%, var(--gold) 100%)",
                filter: "blur(20px)",
                opacity: 0.3,
              }}
            />
            <div className="relative z-10">
              <div className="mb-3 text-4xl animate-heartbeat" style={{ animationDelay: `${i * 0.2}s` }}>
                {w.icon}
              </div>
              <p
                className="text-xl sm:text-2xl leading-snug"
                style={{ fontFamily: "var(--font-hand)", color: "oklch(0.97 0.03 30)" }}
              >
                {w.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
