import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/birthday/Hero";
import { WishCard } from "@/components/birthday/WishCard";
import { Cake } from "@/components/birthday/Cake";
import { MemoryHearts } from "@/components/birthday/MemoryHearts";
import { ConfettiFinale } from "@/components/birthday/Confetti";
import { FloatingHearts } from "@/components/birthday/FloatingHearts";
import { CinematicIntro } from "@/components/birthday/CinematicIntro";

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
        href: "https://fonts.googleapis.com/css2?family=Italiana&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Pinyon+Script&family=Caveat:wght@400;600&family=Playfair+Display:wght@400;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <main className="relative film-grain vignette">
      {!introDone && <CinematicIntro onDone={() => setIntroDone(true)} />}
      <FloatingHearts count={22} />
      <div className="relative z-10">
        <Hero />
        <WishCard />
        <Cake />
        <MemoryHearts />
        <ConfettiFinale />
      </div>
    </main>
  );
}
