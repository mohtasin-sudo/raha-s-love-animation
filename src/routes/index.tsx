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

  // Auto-start music on load; fall back to muted autoplay if blocked
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.loop = true;
    a.volume = 0.85;
    a.play().catch(() => {
      // Browser blocked unmuted autoplay — try muted, then ask for a tap
      a.muted = true;
      setNeedsUnmute(true);
      a.play().catch(() => {});
    });

    const resume = () => {
      a.muted = false;
      setMuted(false);
      setNeedsUnmute(false);
      a.play().catch(() => {});
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
    if (a.muted || a.paused) {
      window.addEventListener("pointerdown", resume, { once: true });
      window.addEventListener("keydown", resume, { once: true });
    }
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
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
      v = Math.min(0.65, v + 0.04);
      a.volume = v;
      if (v >= 0.65) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, [introDone]);

  return (
    <main className="relative film-grain vignette">
      <audio ref={audioRef} src={musicSrc} preload="auto" />

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
