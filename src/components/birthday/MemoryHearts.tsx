import { motion } from "framer-motion";

const wishes = [
  { icon: "🌱", text: "Wishing you a calm, easy year." },
  { icon: "✨", text: "May good news find you often." },
  { icon: "📚", text: "Hope your dreams keep moving forward." },
  { icon: "🌙", text: "Rest well. You've earned it." },
  { icon: "☕", text: "Small joys, every single day." },
  { icon: "🕊️", text: "Be happy, Raha. That's the whole wish." },
];

export function MemoryHearts() {
  return (
    <section className="relative editorial-section px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <p className="kicker mb-4">Chapter Two · Wishes</p>
        <span className="rule rule-center mb-6" />
        <h3
          className="text-4xl sm:text-5xl italic"
          style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontWeight: 500 }}
        >
          A few wishes for your year
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
            className="group relative rounded-sm border p-8 overflow-hidden"
            style={{
              background: "oklch(0.20 0.02 60 / 0.45)",
              borderColor: "var(--rule)",
              boxShadow: "0 20px 50px -20px oklch(0 0 0 / 0.5)",
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
                className="text-base sm:text-lg leading-relaxed"
                style={{ fontFamily: "var(--font-serif)", color: "oklch(0.97 0.03 30)", fontWeight: 400 }}
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
