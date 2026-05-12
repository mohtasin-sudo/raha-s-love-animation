import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Hero } from "@/components/birthday/Hero";
import { FloatingHearts } from "@/components/birthday/FloatingHearts";
import { CinematicIntro } from "@/components/birthday/CinematicIntro";
import { ScrollMascot } from "@/components/birthday/ScrollMascot";
import { StartGate } from "@/components/birthday/StartGate";

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
  const [started, setStarted] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const handleIntroDone = useCallback(() => setIntroDone(true), []);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Prime the audio element so it's instantly ready on tap
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.loop = true;
    a.muted = false;
    a.defaultMuted = false;
    a.volume = 0.85;
    try { a.load(); } catch {}
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

  // Begin tap = user gesture → unlocks unmuted audio + starts intro
  const handleBegin = useCallback(() => {
    const a = audioRef.current;
    if (a) {
      a.muted = false;
      a.defaultMuted = false;
      a.play().catch(() => {
        setTimeout(() => a.play().catch(() => {}), 50);
      });
    }
    setStarted(true);
  }, []);

  return (
    <main className="relative film-grain vignette">
      <audio ref={audioRef} src={musicSrc} preload="auto" loop playsInline />

      {!started && <StartGate onStart={handleBegin} />}
      {started && !introDone && <CinematicIntro onDone={handleIntroDone} />}
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
