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
            className="relative mb-20 sm:mb-28 max-w-[12rem] rounded-2xl border px-4 py-3 pointer-events-auto"
            style={{
              background: "var(--paper)",
              borderColor: "oklch(0.85 0.04 70 / 0.7)",
              color: "var(--ink)",
              boxShadow: "0 12px 30px -12px oklch(0 0 0 / 0.5)",
              fontFamily: "var(--font-serif)",
            }}
          >
            <p className="text-[0.95rem] leading-snug italic">
              psst… keep scrolling, there's more for you ↓
            </p>
            {/* Bubble tail */}
            <span
              className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 border-b border-r"
              style={{
                background: "var(--paper)",
                borderColor: "oklch(0.85 0.04 70 / 0.7)",
              }}
            />
            {/* Close */}
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
                background: "var(--ivory)",
                borderColor: "oklch(0.85 0.04 70 / 0.7)",
                color: "var(--ink-soft)",
              }}
            >
              ×
            </button>
          </motion.div>

          {/* Mascot */}
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
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
