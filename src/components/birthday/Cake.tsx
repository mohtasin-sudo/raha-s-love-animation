import { useState } from "react";
import { motion } from "framer-motion";

export function Cake() {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const allOut = candles.every((c) => !c);

  const blow = (i: number) =>
    setCandles((c) => c.map((v, idx) => (idx === i ? false : v)));

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
          Chapter Three
        </p>
        <h3
          className="text-4xl sm:text-5xl gold-text italic"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Make a wish
        </h3>
        <p className="mt-3 text-sm text-white/60" style={{ fontFamily: "var(--font-hand)", fontSize: "1.25rem" }}>
          {allOut ? "✨ wish made — keep it close to your heart" : "tap each candle to blow it out"}
        </p>
      </motion.div>

      {/* Glow stage */}
      <div className="relative mx-auto w-fit">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background: allOut
              ? "radial-gradient(circle, oklch(0.55 0.10 280 / 0.4), transparent 70%)"
              : "radial-gradient(circle, oklch(0.85 0.18 60 / 0.5), transparent 70%)",
            transition: "background 1.2s",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.7 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, type: "spring" }}
          className="relative"
        >
          {/* Candles */}
          <div className="flex items-end justify-center gap-3 sm:gap-5">
            {candles.map((lit, i) => (
              <button
                key={i}
                onClick={() => blow(i)}
                className="group flex flex-col items-center"
                aria-label={`Candle ${i + 1}`}
              >
                <div className="relative mb-1 h-7 w-3">
                  {lit ? (
                    <span
                      className="absolute -top-6 left-1/2 -translate-x-1/2 animate-flicker"
                      style={{
                        width: 14,
                        height: 22,
                        background:
                          "radial-gradient(ellipse at 50% 80%, #fff 0%, var(--gold) 35%, var(--rose) 75%, transparent 100%)",
                        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                        filter: "drop-shadow(0 0 12px var(--gold)) drop-shadow(0 0 20px var(--rose))",
                      }}
                    />
                  ) : (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] opacity-60">💨</span>
                  )}
                </div>
                <div
                  className="h-14 w-2.5 rounded-sm"
                  style={{
                    background: `repeating-linear-gradient(180deg, var(--rose) 0 6px, var(--rose-glow) 6px 12px)`,
                    boxShadow: "0 0 6px oklch(0.72 0.19 10 / 0.4)",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Cake tiers with frosting drip */}
          <div className="mt-1">
            <div
              className="mx-auto h-16 w-48 rounded-t-lg relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, oklch(0.94 0.05 25), oklch(0.82 0.13 20))",
                boxShadow: "inset 0 -8px 0 oklch(0.65 0.18 15)",
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 flex justify-around">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-3 w-3 rounded-b-full" style={{ background: "oklch(0.97 0.03 30)" }} />
                ))}
              </div>
            </div>
            <div
              className="mx-auto h-20 w-64 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, oklch(0.90 0.10 20), oklch(0.74 0.16 15))",
                boxShadow: "inset 0 -10px 0 oklch(0.55 0.18 10)",
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 flex justify-around">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="h-4 w-4 rounded-b-full" style={{ background: "oklch(0.97 0.03 30)" }} />
                ))}
              </div>
            </div>
            <div
              className="mx-auto h-3 w-72 rounded-b-2xl"
              style={{ background: "linear-gradient(180deg, oklch(0.45 0.15 10), oklch(0.28 0.12 10))" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
