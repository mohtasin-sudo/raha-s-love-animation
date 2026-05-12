import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function GiftBox() {
  const [opened, setOpened] = useState(false);

  return (
    <section className="relative px-6 py-32 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-[10px] uppercase tracking-[0.6em] text-white/40 mb-2"
          style={{ fontFamily: "var(--font-display)" }}>
          Chapter Four
        </p>
        <h3 className="text-4xl sm:text-5xl shimmer-text italic" style={{ fontFamily: "var(--font-display)" }}>
          A little gift
        </h3>
        <p className="mt-3 text-xl text-white/60" style={{ fontFamily: "var(--font-hand)" }}>
          {opened ? "" : "tap to unwrap"}
        </p>
      </motion.div>

      <div className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80">
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
          style={{
            background: opened
              ? "radial-gradient(circle, var(--gold) 0%, transparent 60%)"
              : "radial-gradient(circle, var(--rose) 0%, transparent 60%)",
            opacity: 0.5,
            transition: "all 1s",
          }}
        />

        <button
          onClick={() => setOpened((o) => !o)}
          className="absolute inset-0 flex items-center justify-center"
          aria-label="Open gift"
        >
          <div className="relative h-48 w-48">
            {/* Box body */}
            <motion.div
              animate={opened ? { y: 20, rotateZ: -2 } : { y: 0, rotateZ: 0 }}
              transition={{ type: "spring", damping: 12 }}
              className="absolute inset-x-0 bottom-0 h-32 rounded-lg"
              style={{
                background: "linear-gradient(180deg, oklch(0.55 0.20 10), oklch(0.38 0.18 5))",
                boxShadow: "0 20px 50px oklch(0.10 0.06 0 / 0.6), inset 0 -10px 20px rgba(0,0,0,0.3)",
              }}
            >
              {/* Vertical ribbon */}
              <div
                className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2"
                style={{ background: "linear-gradient(180deg, var(--gold), oklch(0.65 0.18 75))" }}
              />
            </motion.div>

            {/* Lid */}
            <motion.div
              animate={
                opened
                  ? { y: -120, rotateZ: -25, rotateX: 30, opacity: 0.9 }
                  : { y: 0, rotateZ: 0, rotateX: 0, opacity: 1 }
              }
              transition={{ type: "spring", damping: 10, stiffness: 110 }}
              className="absolute top-12 inset-x-0 h-10 rounded-md"
              style={{
                background: "linear-gradient(180deg, oklch(0.62 0.20 10), oklch(0.45 0.18 5))",
                boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
                transformOrigin: "center bottom",
              }}
            >
              {/* Lid ribbon */}
              <div
                className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2"
                style={{ background: "linear-gradient(180deg, var(--gold), oklch(0.65 0.18 75))" }}
              />
              {/* Bow */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl">🎀</div>
            </motion.div>

            {/* Surprise content */}
            <AnimatePresence>
              {opened && (
                <>
                  {/* Hearts burst */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i / 12) * Math.PI * 2;
                    return (
                      <motion.span
                        key={i}
                        initial={{ x: 0, y: 60, scale: 0, opacity: 1 }}
                        animate={{
                          x: Math.cos(angle) * 140,
                          y: 60 + Math.sin(angle) * 140 - 60,
                          scale: 1,
                          opacity: 0,
                        }}
                        transition={{ duration: 1.6, ease: "easeOut" }}
                        className="absolute left-1/2 top-1/2 text-3xl"
                      >
                        {["❤️","💖","✨","🌹","💕"][i % 5]}
                      </motion.span>
                    );
                  })}
                  {/* Message popping out */}
                  <motion.div
                    initial={{ y: 80, scale: 0, opacity: 0 }}
                    animate={{ y: -30, scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", damping: 12 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 rounded-2xl border px-6 py-4 backdrop-blur-md whitespace-nowrap"
                    style={{
                      background: "linear-gradient(145deg, oklch(0.97 0.03 60 / 0.97), oklch(0.92 0.05 30 / 0.92))",
                      borderColor: "var(--gold)",
                      color: "var(--ink)",
                      boxShadow: "var(--shadow-glow)",
                    }}
                  >
                    <p className="text-2xl" style={{ fontFamily: "var(--font-script)" }}>
                      just a quiet wish ✨
                    </p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>
    </section>
  );
}
