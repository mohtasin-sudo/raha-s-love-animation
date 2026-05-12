import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import mascot from "@/assets/scroll-mascot.png";

export function ScrollMascot() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2200);
    const onScroll = () => {
      if (window.scrollY > 120) setShow(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="mascot"
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
          className="fixed bottom-0 left-3 sm:left-6 z-[120] flex items-end gap-2 sm:gap-3 pointer-events-none"
        >
          {/* Speech bubble */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 220, damping: 16 }}
            className="relative mb-20 sm:mb-28 max-w-[13rem] pointer-events-auto"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <div
              className="rounded-[14px] border px-4 py-3 backdrop-blur-md"
              style={{
                background: "oklch(0.18 0.02 60 / 0.78)",
                borderColor: "oklch(0.74 0.10 75 / 0.45)",
                color: "var(--ivory)",
                boxShadow: "0 18px 40px -18px oklch(0 0 0 / 0.7)",
              }}
            >
              <span
                className="block mb-1 text-[9px] tracking-[0.32em] uppercase"
                style={{ fontFamily: "var(--font-sans)", color: "var(--gold)" }}
              >
                A whisper
              </span>
              <p className="text-[0.95rem] leading-snug italic" style={{ color: "var(--ivory-soft)" }}>
                there's more below — keep going
                <span className="ml-1" style={{ color: "var(--gold)" }}>↓</span>
              </p>
            </div>
            <span
              className="absolute -bottom-1.5 left-8 h-3 w-3 rotate-45 border-b border-r"
              style={{
                background: "oklch(0.18 0.02 60 / 0.78)",
                borderColor: "oklch(0.74 0.10 75 / 0.45)",
              }}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShow(false);
                setDismissed(true);
              }}
              aria-label="Dismiss"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full text-xs leading-none border"
              style={{
                background: "var(--night)",
                borderColor: "oklch(0.74 0.10 75 / 0.5)",
                color: "var(--gold)",
              }}
            >
              ×
            </button>
          </motion.div>

          {/* Mascot + visual scroll cue */}
          <motion.button
            type="button"
            onClick={handleClick}
            aria-label="Scroll down"
            initial={{ y: 80 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="pointer-events-auto relative block"
          >
            <img
              src={mascot}
              alt=""
              loading="lazy"
              width={160}
              height={160}
              className="h-32 w-32 sm:h-40 sm:w-40 select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)]"
              draggable={false}
            />

            {/* Soft pulse ring on the ground */}
            <span
              aria-hidden
              className="absolute left-1/2 bottom-2 -translate-x-1/2 h-3 w-20 rounded-full"
              style={{
                background: "radial-gradient(ellipse, oklch(0.74 0.10 75 / 0.55), transparent 70%)",
                animation: "pulse-ring 2.2s ease-out infinite",
              }}
            />

            {/* Floating downward chevrons next to the cat */}
            <div
              aria-hidden
              className="absolute -right-1 top-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5"
              style={{ color: "var(--gold)" }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block text-xl leading-none"
                  animate={{ opacity: [0.1, 1, 0.1], y: [0, 6, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                  style={{ filter: "drop-shadow(0 0 8px oklch(0.74 0.10 75 / 0.8))" }}
                >
                  ⌄
                </motion.span>
              ))}
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
