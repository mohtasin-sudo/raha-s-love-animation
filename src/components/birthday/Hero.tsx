import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Stars } from "./Stars";
import { useIsMobile } from "@/hooks/use-mobile";

const NAME = "Raha";

export function Hero() {
  const isMobile = useIsMobile();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useTransform(my, [-300, 300], [8, -8]);
  const tiltY = useTransform(mx, [-300, 300], [-8, 8]);

  useEffect(() => {
    if (isMobile) return;
    let raf = 0;
    let lx = 0, ly = 0;
    const onMove = (e: MouseEvent) => {
      lx = e.clientX - window.innerWidth / 2;
      ly = e.clientY - window.innerHeight / 2;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          mx.set(lx);
          my.set(ly);
          raf = 0;
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mx, my, isMobile]);

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
      <Stars count={isMobile ? 24 : 60} />

      {/* Soft warm glow, single, restrained */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
        />
      </div>

      {/* Editorial masthead */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mb-10 flex flex-col items-center gap-4"
      >
        <span className="kicker">Vol. 01 · A Birthday Note</span>
        <span className="rule" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, letterSpacing: "0.4em" }}
        animate={{ opacity: 1, letterSpacing: "0.04em" }}
        transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
        className="mb-3 text-xl sm:text-2xl italic"
        style={{ fontFamily: "var(--font-serif)", color: "var(--ivory-soft)", fontWeight: 300 }}
      >
        Happy Birthday,
      </motion.h2>

      <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}>
        <h1
          className="relative text-[clamp(4.5rem,20vw,11rem)] leading-[0.9]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "-0.02em", color: "var(--ivory)" }}
          aria-label={`Happy Birthday ${NAME}`}
        >
          {NAME.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.9 + i * 0.14, ease: [0.2, 0.8, 0.2, 1] }}
              className="inline-block"
              style={{ transformOrigin: "bottom center" }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.2 }}
        className="mt-12 max-w-md text-lg sm:text-xl italic"
        style={{ fontFamily: "var(--font-serif)", color: "var(--ivory-soft)" }}
      >
        Hope your day is as kind to you as you deserve.
      </motion.p>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" })}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3 }}
        aria-label="Scroll for more"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
        style={{ color: "var(--ivory-soft)" }}
      >
        <span
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ fontFamily: "var(--font-sans)", color: "var(--gold)" }}
        >
          Scroll for more
        </span>
        <motion.span
          aria-hidden
          className="block h-10 w-[1px]"
          style={{ background: "linear-gradient(180deg, var(--gold), transparent)" }}
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          aria-hidden
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-base"
          style={{ color: "var(--gold)" }}
        >
          ▾
        </motion.span>
      </motion.button>
    </section>
  );
}
