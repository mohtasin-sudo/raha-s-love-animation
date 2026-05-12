import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Hero } from "@/components/birthday/Hero";
import { FloatingHearts } from "@/components/birthday/FloatingHearts";
import { CinematicIntro } from "@/components/birthday/CinematicIntro";
import { ScrollMascot } from "@/components/birthday/ScrollMascot";

const WishCard = lazy(() => import("@/components/birthday/WishCard").then(m => ({ default: m.WishCard })));
const Cake = lazy(() => import("@/components/birthday/Cake").then(m => ({ default: m.Cake })));
const Constellation = lazy(() => import("@/components/birthday/Constellation").then(m => ({ default: m.Constellation })));
const MemoryHearts = lazy(() => import("@/components/birthday/MemoryHearts").then(m => ({ default: m.MemoryHearts })));
const GiftBox = lazy(() => import("@/components/birthday/GiftBox").then(m => ({ default: m.GiftBox })));
const ConfettiFinale = lazy(() => import("@/components/birthday/Confetti").then(m => ({ default: m.ConfettiFinale })));

import musicSrc from "@/assets/birthday-music.mp3";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Raha 💖 — A Cinematic Wish" },
      {
        name: "description",
        content:
          "A cinematic, animated birthday film for Raha — handcrafted with love by Coder on Fall in Love.",
      },
      { property: "og:title", content: "Happy Birthday Raha 💖" },
      {
        property: "og:description",
        content: "A cinematic love-filled birthday experience just for Raha.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Italiana&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Pinyon+Script&family=Caveat:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap",
      },
      { rel: "preload", as: "audio", href: musicSrc },
    ],
  }),
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(false);
  const handleIntroDone = useCallback(() => setIntroDone(true), []);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.loop = true;
    a.volume = 0.85;
    a.defaultMuted = false;
    a.muted = false;
    try { a.load(); } catch {}

    // Try unmuted autoplay first. If the browser blocks it (mobile),
    // fall back to muted autoplay so the film still plays, and silently
    // unmute on the first user interaction — no visible button needed.
    let unlocked = false;
    a.play().catch(() => {
      a.muted = true;
      a.play().catch(() => {});
      const unlock = () => {
        if (unlocked) return;
        unlocked = true;
        a.muted = false;
        a.play().catch(() => {});
      };
      const opts = { once: true, passive: true } as AddEventListenerOptions;
      window.addEventListener("pointerdown", unlock, opts);
      window.addEventListener("touchstart", unlock, opts);
      window.addEventListener("click", unlock, opts);
      window.addEventListener("keydown", unlock, { once: true });
    });
  }, []);

  // Soft volume ramp once intro finishes
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !introDone) return;
    let v = a.volume;
    const id = setInterval(() => {
      v = Math.min(1.0, v + 0.04);
      a.volume = v;
      if (v >= 1.0) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, [introDone]);

  return (
    <main className="relative film-grain vignette">
      <audio ref={audioRef} src={musicSrc} preload="auto" loop playsInline />

      {!introDone && <CinematicIntro onDone={handleIntroDone} />}
      {introDone && <ScrollMascot />}

      <FloatingHearts count={22} />
      <div className="relative z-10">
        <Hero />
        <Suspense fallback={null}>
          <WishCard />
          <Constellation />
          <Cake />
          <MemoryHearts />
          <GiftBox />
          <ConfettiFinale />
        </Suspense>
      </div>
    </main>
  );
}
