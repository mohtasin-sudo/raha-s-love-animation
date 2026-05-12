import { motion, AnimatePresence } from "framer-motion";

export function StartGate({ onStart }: { onStart: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="gate"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-[10px] uppercase tracking-[0.6em] text-white/40 mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          A film for Raha
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-10 text-4xl sm:text-6xl shimmer-text"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Press play with your heart
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="group relative rounded-full border border-white/30 px-10 py-4 text-sm uppercase tracking-[0.4em] text-white backdrop-blur"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="relative z-10">▶  Begin the film</span>
          <span
            className="absolute inset-0 rounded-full opacity-60 blur-xl"
            style={{ background: "radial-gradient(circle, oklch(0.72 0.19 10 / 0.6), transparent 70%)" }}
          />
        </motion.button>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-8 text-xs italic text-white/40"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          🎧 best with sound on
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
