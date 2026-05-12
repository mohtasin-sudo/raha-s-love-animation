import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/birthday/Hero";
import { WishCard } from "@/components/birthday/WishCard";
import { Cake } from "@/components/birthday/Cake";
import { MemoryHearts } from "@/components/birthday/MemoryHearts";
import { ConfettiFinale } from "@/components/birthday/Confetti";
import { FloatingHearts } from "@/components/birthday/FloatingHearts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Raha 💖 — A Wish from the Heart" },
      {
        name: "description",
        content:
          "A handcrafted, animated birthday wish for Raha — made with love by Coder on Fall in Love.",
      },
      { property: "og:title", content: "Happy Birthday Raha 💖" },
      {
        property: "og:description",
        content: "An animated love-filled birthday page just for Raha.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Dancing+Script:wght@500;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <FloatingHearts count={20} />
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
