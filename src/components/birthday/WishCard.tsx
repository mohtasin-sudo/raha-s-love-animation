import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const message =
  "Some wishes don't need a name on them. Some are quieter than that. Today the sky feels a little softer, the evening a little kinder — as if the world remembered. May this year hold its hands gently around you. May the days you've been waiting for find their way home. May the small things — a song you love, a window of light, a message that arrives at the right hour — keep meeting you, again and again. And somewhere far enough not to matter, someone is folding all of that into a single, steady wish. Be happy, Raha. That is all.";

export function WishCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(message.slice(0, i));
      if (i >= message.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section ref={ref} className="relative editorial-section px-6">
      <div className="measure mb-12 text-center">
        <p className="kicker mb-4">Chapter One · The Letter</p>
        <span className="rule rule-center mb-6" />
        <h2
          className="text-4xl sm:text-5xl"
          style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontWeight: 500, letterSpacing: "-0.01em" }}
        >
          A letter for you
        </h2>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="relative mx-auto max-w-2xl rounded-sm border px-8 py-14 sm:px-16 sm:py-20"
        style={{
          background: "var(--paper)",
          borderColor: "oklch(0.85 0.04 70 / 0.7)",
          boxShadow: "var(--shadow-paper)",
          color: "var(--ink)",
        }}
      >
        <div className="mb-8 flex flex-col items-center gap-3">
          <span
            className="text-[10px] uppercase"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.4em", color: "var(--gold-deep)" }}
          >
            For Raha
          </span>
          <span className="block h-px w-12" style={{ background: "var(--gold-deep)", opacity: 0.6 }} />
        </div>

        <h3
          className="mb-8 text-center text-3xl sm:text-4xl italic"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)", fontWeight: 500 }}
        >
          Dear Raha,
        </h3>

        <p
          className="drop-cap min-h-[14rem] text-left text-[1.15rem] leading-[1.85] sm:text-[1.25rem] sm:leading-[1.9]"
          style={{ fontFamily: "var(--font-serif)", color: "var(--ink)", fontWeight: 400 }}
        >
          {typed}
          <span className="inline-block w-0.5 h-5 bg-current align-middle ml-0.5 animate-pulse" />
        </p>

        <div className="mt-12 flex flex-col items-end gap-2">
          <span className="block h-px w-24" style={{ background: "var(--gold-deep)", opacity: 0.5 }} />
          <span
            className="text-base italic"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink-soft)" }}
          >
            — A Silent Admirer
          </span>
        </div>
      </motion.article>
    </section>
  );
}
