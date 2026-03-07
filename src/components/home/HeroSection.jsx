import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    bg: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1800&h=900&fit=crop&q=90",
    tag: "BMW SPECIALISTS",
    title: "M PERFORMANCE",
    subtitle: "PARTS & UPGRADES",
    desc: "Shop the latest M Performance components for your BMW. OEM and aftermarket.",
    cta: "SHOP BMW PARTS",
    ctaLink: createPageUrl("Shop") + "?brand=BMW",
  },
  {
    bg: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1800&h=900&fit=crop&q=90",
    tag: "ENGINE PERFORMANCE",
    title: "N54 · N55 · B58",
    subtitle: "TUNING & UPGRADES",
    desc: "Intakes, turbos, intercoolers and more for BMW's most iconic engines.",
    cta: "SHOP ENGINE PARTS",
    ctaLink: createPageUrl("Shop") + "?category=engine",
  },
  {
    bg: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&h=900&fit=crop&q=90",
    tag: "BLOW OUT SALE",
    title: "SAVE BIG ON",
    subtitle: "EURO PARTS",
    desc: "Discounted OEM and aftermarket parts — limited time pricing.",
    cta: "SHOP THE SALE",
    ctaLink: createPageUrl("Shop") + "?sale=true",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[active];

  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ height: "clamp(480px, 80vh, 780px)" }}>
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0"}`}
        >
          <img src={s.bg} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 font-medium mb-4">
              {slide.tag}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[0.95] uppercase">
              {slide.title}
              <br />
              <span className="text-neutral-400">{slide.subtitle}</span>
            </h1>
            <p className="mt-5 text-neutral-400 text-base max-w-sm">
              {slide.desc}
            </p>
            <div className="mt-8">
              <Link
                to={slide.ctaLink}
                className="inline-block bg-white text-black text-sm font-bold tracking-widest uppercase px-8 py-3.5 hover:bg-neutral-200 transition-colors"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => setActive((active - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setActive((active + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-0.5 transition-all duration-300 ${i === active ? "w-8 bg-white" : "w-4 bg-neutral-600"}`}
          />
        ))}
      </div>
    </div>
  );
}