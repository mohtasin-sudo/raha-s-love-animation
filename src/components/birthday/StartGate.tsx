import { motion, AnimatePresence } from "framer-motion";

export function StartGate({ onStart }: { onStart: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="gate"
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.7 }}
        className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden px-6 text-center"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.18 0.08 15) 0%, oklch(0.06 0.04 10) 70%, #000 100%)",
        }}
      >
        {/* Floating sparkles */}
        {[...Array(14)].map((_, i) => {
          const left = (i * 53) % 100;
          const top = (i * 37) % 100;
          const delay = (i % 7) * 0.4;
          const size = 4 + (i % 3) * 2;
          return (
            <motion.span
              key={i}
              className="pointer-events-none absolute rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                background: "white",
                boxShadow: "0 0 10px white, 0 0 20px var(--gold)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.9, 0.4, 0.9], scale: [0, 1, 0.7, 1] }}
              transition={{ duration: 3.5, delay, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}

        {/* Tiny floating hearts */}
        {["💖", "✨", "🌸", "💫", "🎀"].map((emo, i) => (
          <motion.span
            key={emo}
            className="pointer-events-none absolute text-2xl"
            style={{ left: `${10 + i * 18}%`, bottom: "-10%" }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: "-110vh", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 9 + i,
              delay: i * 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {emo}
          </motion.span>
        ))}

        {/* Soft warm aura behind button */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.19 10 / 0.35), transparent 70%)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Kicker */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative z-10 text-[10px] uppercase tracking-[0.6em] text-white/50 mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          ✦  For  ✦
        </motion.p>

        {/* Raha — hero name */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.85, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.35, duration: 1.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative z-10 leading-none"
          style={{
            fontFamily: "'Pinyon Script', cursive",
            fontSize: "clamp(5.5rem, 22vw, 11rem)",
            background:
              "linear-gradient(135deg, oklch(0.95 0.08 30), oklch(0.85 0.18 25), oklch(0.88 0.16 60), oklch(0.95 0.08 30))",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter:
              "drop-shadow(0 0 28px oklch(0.85 0.18 25 / 0.55)) drop-shadow(0 0 50px oklch(0.78 0.18 10 / 0.35))",
            paddingBottom: "0.1em",
          }}
        >
          Raha
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1, ease: "easeOut" }}
          className="relative z-10 mt-2 mb-3 text-2xl sm:text-3xl italic"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            color: "oklch(0.97 0.05 30)",
            letterSpacing: "0.02em",
          }}
        >
          A little surprise
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="relative z-10 mb-10 text-sm sm:text-base italic text-white/60"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          made just for you 💖
        </motion.p>

        {/* Cute pulsing Begin button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.9, type: "spring", bounce: 0.5 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={onStart}
          aria-label="Begin"
          className="group relative z-10 rounded-full px-8 py-3.5 text-xs font-medium uppercase tracking-[0.35em] text-white"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.19 10), oklch(0.82 0.17 25), oklch(0.78 0.15 60))",
            backgroundSize: "200% 200%",
            boxShadow:
              "0 10px 40px oklch(0.72 0.19 10 / 0.5), 0 0 0 1px rgba(255,255,255,0.2) inset",
            fontFamily: "var(--font-display)",
          }}
        >
          {/* Animated gradient sweep */}
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.19 10), oklch(0.82 0.17 25), oklch(0.78 0.15 60), oklch(0.72 0.19 10))",
              backgroundSize: "300% 300%",
            }}
            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          {/* Pulsing halo */}
          <motion.span
            aria-hidden
            className="absolute -inset-2 rounded-full"
            style={{ boxShadow: "0 0 40px oklch(0.85 0.15 25 / 0.7)" }}
            animate={{ opacity: [0.35, 0.85, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative z-10 flex items-center gap-2">
            <span>Tap to Begin</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              ✨
            </motion.span>
          </span>
        </motion.button>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="relative z-10 mt-8 text-xs italic text-white/50"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          🎧 best with sound on
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
