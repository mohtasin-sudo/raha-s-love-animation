import { useState } from "react";
import { motion } from "framer-motion";

export function Cake() {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const allOut = candles.every((c) => !c);

  const blow = (i: number) =>
    setCandles((c) => c.map((v, idx) => (idx === i ? false : v)));

  return (
    <section className="relative px-6 py-20 text-center">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-2 text-2xl sm:text-3xl"
        style={{ fontFamily: "var(--font-script)", color: "var(--gold)" }}
      >
        Make a wish
      </motion.h3>
      <p className="mb-10 text-sm text-muted-foreground">
        {allOut ? "Wish made ✨ Keep it close to your heart." : "Tap each candle to blow it out"}
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mx-auto w-fit"
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
              <div className="relative mb-1 h-6 w-3">
                {lit && (
                  <span
                    className="absolute -top-5 left-1/2 -translate-x-1/2 animate-flicker"
                    style={{
                      width: 12,
                      height: 18,
                      background:
                        "radial-gradient(ellipse at 50% 80%, #fff 0%, var(--gold) 40%, var(--rose) 80%, transparent 100%)",
                      borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                      filter: "drop-shadow(0 0 8px var(--gold))",
                    }}
                  />
                )}
              </div>
              <div
                className="h-12 w-2.5 rounded-sm"
                style={{
                  background: `repeating-linear-gradient(180deg, var(--rose) 0 6px, var(--rose-glow) 6px 12px)`,
                }}
              />
            </button>
          ))}
        </div>

        {/* Cake tiers */}
        <div className="mt-1">
          <div
            className="mx-auto h-16 w-48 rounded-t-lg"
            style={{
              background: "linear-gradient(180deg, oklch(0.92 0.08 25), oklch(0.78 0.15 20))",
              boxShadow: "inset 0 -6px 0 oklch(0.65 0.18 15)",
            }}
          />
          <div
            className="mx-auto h-20 w-64"
            style={{
              background: "linear-gradient(180deg, oklch(0.88 0.10 20), oklch(0.7 0.16 15))",
              boxShadow: "inset 0 -8px 0 oklch(0.55 0.18 10)",
            }}
          />
          <div
            className="mx-auto h-3 w-72 rounded-b-xl"
            style={{ background: "oklch(0.45 0.15 10)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
