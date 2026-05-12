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

        {/* Kicker with ornamental rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative z-10 mb-4 flex items-center gap-3"
        >
          <span
            className="block h-px w-10 sm:w-16"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.85 0.14 70 / 0.9))",
            }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.6em] text-white/60"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ✦ For ✦
          </span>
          <span
            className="block h-px w-10 sm:w-16"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.85 0.14 70 / 0.9), transparent)",
            }}
          />
        </motion.div>

        {/* Raha — hero name with ornaments */}
        <div className="relative z-10 flex items-center justify-center">
          {/* Left flourish */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, x: 20, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="hidden sm:block text-3xl mr-2"
            style={{
              fontFamily: "'Pinyon Script', cursive",
              color: "oklch(0.88 0.14 60)",
              textShadow: "0 0 16px oklch(0.85 0.18 25 / 0.6)",
            }}
          >
            ❦
          </motion.span>

          <div className="relative">
            {/* Crown sparkle above */}
            <motion.span
              aria-hidden
              initial={{ opacity: 0, y: 10, scale: 0.6 }}
              animate={{ opacity: [0, 1, 0.7, 1], y: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 1.6, repeat: Infinity, repeatType: "reverse" }}
              className="absolute left-1/2 -top-3 -translate-x-1/2 text-2xl"
              style={{ filter: "drop-shadow(0 0 12px oklch(0.88 0.18 70 / 0.9))" }}
            >
              ✦
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.85, filter: "blur(14px)" }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                opacity: { delay: 0.35, duration: 1.3, ease: [0.2, 0.8, 0.2, 1] },
                y: { delay: 0.35, duration: 1.3, ease: [0.2, 0.8, 0.2, 1] },
                scale: { delay: 0.35, duration: 1.3, ease: [0.2, 0.8, 0.2, 1] },
                filter: { delay: 0.35, duration: 1.3, ease: [0.2, 0.8, 0.2, 1] },
                backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear", delay: 1.5 },
              }}
              className="relative leading-none"
              style={{
                fontFamily: "'Pinyon Script', cursive",
                fontSize: "clamp(5.5rem, 22vw, 11rem)",
                background:
                  "linear-gradient(110deg, oklch(0.95 0.08 30) 0%, oklch(0.85 0.18 25) 25%, oklch(0.92 0.18 80) 50%, oklch(0.85 0.18 25) 75%, oklch(0.95 0.08 30) 100%)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter:
                  "drop-shadow(0 0 28px oklch(0.85 0.18 25 / 0.55)) drop-shadow(0 0 60px oklch(0.78 0.18 10 / 0.35))",
                paddingBottom: "0.1em",
              }}
            >
              Raha
            </motion.h1>

            {/* Underline swash */}
            <motion.svg
              aria-hidden
              viewBox="0 0 200 20"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ delay: 1.3, duration: 1.6, ease: "easeInOut" }}
              className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-[70%] h-3"
              style={{ filter: "drop-shadow(0 0 6px oklch(0.85 0.18 25 / 0.7))" }}
            >
              <motion.path
                d="M5 12 Q 50 2, 100 10 T 195 8"
                stroke="oklch(0.88 0.16 60)"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.3, duration: 1.6, ease: "easeInOut" }}
              />
            </motion.svg>
          </div>

          {/* Right flourish */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, x: -20, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="hidden sm:block text-3xl ml-2 scale-x-[-1]"
            style={{
              fontFamily: "'Pinyon Script', cursive",
              color: "oklch(0.88 0.14 60)",
              textShadow: "0 0 16px oklch(0.85 0.18 25 / 0.6)",
            }}
          >
            ❦
          </motion.span>
        </div>

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

        {/* Pointing hand above the button — universal "click here" cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.6 },
            y: { delay: 1.2, duration: 1.2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative z-10 mb-3 text-4xl sm:text-5xl"
          style={{ filter: "drop-shadow(0 0 12px oklch(0.85 0.18 25 / 0.7))" }}
          aria-hidden
        >
          👇
        </motion.div>

        {/* Cute pulsing Begin button — large, unmistakable */}
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: [1, 1.06, 1] }}
          transition={{
            opacity: { delay: 1.1, duration: 0.9 },
            scale: { delay: 1.6, duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.94 }}
          onClick={onStart}
          aria-label="Tap here to begin"
          className="group relative z-10 rounded-full px-10 sm:px-14 py-5 sm:py-6 text-sm sm:text-base font-bold uppercase tracking-[0.3em] text-white"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.19 10), oklch(0.82 0.17 25), oklch(0.78 0.15 60))",
            backgroundSize: "200% 200%",
            boxShadow:
              "0 14px 50px oklch(0.72 0.19 10 / 0.6), 0 0 0 2px rgba(255,255,255,0.25) inset, 0 0 60px oklch(0.85 0.18 25 / 0.5)",
            fontFamily: "var(--font-display)",
          }}
        >
          {/* Expanding ripple waves — screams "click me" */}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute inset-0 rounded-full border-2 pointer-events-none"
              style={{ borderColor: "oklch(0.88 0.16 30 / 0.7)" }}
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1.6 + i * 0.7,
              }}
            />
          ))}

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
            className="absolute -inset-3 rounded-full"
            style={{ boxShadow: "0 0 60px oklch(0.85 0.15 25 / 0.85)" }}
            animate={{ opacity: [0.4, 0.95, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative z-10 flex items-center gap-2.5">
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              👉
            </motion.span>
            <span>Tap to Begin</span>
            <motion.span
              animate={{ x: [0, 4, 0], rotate: [0, 15, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              ✨
            </motion.span>
          </span>
        </motion.button>

        {/* Helper hint right under the button */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            delay: 1.8,
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 mt-5 text-xs sm:text-sm font-medium tracking-[0.25em] uppercase"
          style={{
            color: "oklch(0.92 0.14 60)",
            fontFamily: "var(--font-display)",
            textShadow: "0 0 12px oklch(0.85 0.18 25 / 0.6)",
          }}
        >
          ✨ tap the button above ✨
        </motion.p>

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
