import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Hero } from "@/components/birthday/Hero";
import { WishCard } from "@/components/birthday/WishCard";
import { Cake } from "@/components/birthday/Cake";
import { Constellation } from "@/components/birthday/Constellation";
import { MemoryHearts } from "@/components/birthday/MemoryHearts";
import { GiftBox } from "@/components/birthday/GiftBox";
import { ConfettiFinale } from "@/components/birthday/Confetti";
import { FloatingHearts } from "@/components/birthday/FloatingHearts";
import { CinematicIntro } from "@/components/birthday/CinematicIntro";

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
    ],
  }),
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(false);
  const [muted, setMuted] = useState(false);
  const [needsUnmute, setNeedsUnmute] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Try autoplay; if blocked (mobile), arm a one-time gesture listener
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.loop = true;
    a.volume = 0.85;

    let started = false;
    const markStarted = () => {
      started = true;
      setNeedsUnmute(false);
    };

    // Attempt 1: unmuted autoplay (works on desktop)
    a.play()
      .then(markStarted)
      .catch(() => {
        // Attempt 2: muted autoplay (works on most mobile)
        a.muted = true;
        a.play()
          .then(() => {
            // Sound is silent until first user gesture — show prompt
            setNeedsUnmute(true);
          })
          .catch(() => setNeedsUnmute(true));
      });

    // First user gesture anywhere → ensure music plays unmuted
    const resume = () => {
      a.muted = false;
      setMuted(false);
      setNeedsUnmute(false);
      // play() must be called inside the gesture handler — synchronous
      a.play().then(markStarted).catch(() => {});
    };
    const opts = { once: true, passive: true } as AddEventListenerOptions;
    window.addEventListener("pointerdown", resume, opts);
    window.addEventListener("touchstart", resume, opts);
    window.addEventListener("click", resume, opts);
    window.addEventListener("keydown", resume, { once: true });

    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("touchstart", resume);
      window.removeEventListener("click", resume);
      window.removeEventListener("keydown", resume);
      void started;
    };
  }, []);

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
    if (!a.muted) a.play().catch(() => {});
  };

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

      {!introDone && <CinematicIntro onDone={() => setIntroDone(true)} />}

      <FloatingHearts count={22} />
      <div className="relative z-10">
        <Hero />
        <WishCard />
        <Constellation />
        <Cake />
        <MemoryHearts />
        <GiftBox />
        <ConfettiFinale />
      </div>

      <button
        onClick={toggleMute}
        aria-label={muted || needsUnmute ? "Unmute music" : "Mute music"}
        className="fixed bottom-4 right-4 z-[150] rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs text-white/80 backdrop-blur hover:bg-black/60"
      >
        {muted || needsUnmute ? "🔇 tap for sound" : "🔊 music"}
      </button>
    </main>
  );
}
