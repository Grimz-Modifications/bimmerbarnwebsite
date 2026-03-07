import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const categories = [
  { key: "engine", label: "ENGINE", img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop&q=80" },
  { key: "exhaust", label: "EXHAUST", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80" },
  { key: "suspension", label: "SUSPENSION", img: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=600&h=400&fit=crop&q=80" },
  { key: "brakes", label: "BRAKES", img: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=600&h=400&fit=crop&q=80" },
  { key: "intake", label: "INTAKE", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop&q=80" },
  { key: "wheels_tires", label: "WHEELS & TIRES", img: "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=600&h=400&fit=crop&q=80" },
];

export default function CategoryGrid() {
  return (
    <section className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-xl font-black tracking-widest uppercase text-white mb-8">SHOP BY CATEGORY</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              to={createPageUrl("Shop") + `?category=${cat.key}`}
              className="group relative overflow-hidden bg-neutral-900"
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="w-full h-full object-cover object-center opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white font-black text-lg sm:text-xl tracking-[0.15em] uppercase text-center px-4 drop-shadow-lg">
                  {cat.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}