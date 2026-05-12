import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Stars } from "./Stars";

const NAME = "Raha";

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useTransform(my, [-300, 300], [8, -8]);
  const tiltY = useTransform(mx, [-300, 300], [-8, 8]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX - window.innerWidth / 2);
      my.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
      <Stars count={80} />

      {/* Aurora blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full opacity-50 blur-3xl animate-drift"
          style={{ background: "radial-gradient(circle, var(--rose) 0%, transparent 70%)" }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl animate-drift"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)", animationDelay: "-6s" }}
        />
      </div>

      {/* Top ornament */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mb-6 flex items-center gap-3"
      >
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--gold)]" />
        <p
          className="text-[10px] uppercase tracking-[0.7em]"
          style={{ color: "var(--gold)", fontFamily: "var(--font-display)" }}
        >
          For Raha
        </p>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--gold)]" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        animate={{ opacity: 1, letterSpacing: "0.05em" }}
        transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
        className="mb-4 text-2xl sm:text-3xl italic"
        style={{ fontFamily: "var(--font-serif)", color: "oklch(0.92 0.06 30)", fontWeight: 300 }}
      >
        Happy Birthday,
      </motion.h2>

      <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}>
        <h1
          className="relative animate-glow-pulse text-[clamp(5rem,22vw,12rem)] leading-[0.85]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.02em" }}
          aria-label={`Happy Birthday ${NAME}`}
        >
          {NAME.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 120, rotateX: -90, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.1,
                delay: 1.2 + i * 0.18,
                type: "spring",
                stiffness: 90,
                damping: 14,
              }}
              className="shimmer-text inline-block"
              style={{ transformOrigin: "bottom center" }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      {/* Pulse ring around heart */}
      <div className="relative mt-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.6, type: "spring", stiffness: 140 }}
          className="text-6xl animate-heartbeat relative z-10"
        >
          💖
        </motion.div>
        {[0, 1].map((i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{
              borderColor: "var(--rose-glow)",
              animation: `pulse-ring 2.4s ease-out ${i * 1.2 + 3}s infinite`,
            }}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 3 }}
        className="mt-8 max-w-md text-lg sm:text-xl italic"
        style={{ fontFamily: "var(--font-serif)", color: "oklch(0.85 0.03 30)" }}
      >
        Hope your day is as kind to you as you deserve.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0.4, 1] }}
        transition={{ delay: 3.6, duration: 3, repeat: Infinity }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.5em] text-white/50"
      >
        <span>scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}
