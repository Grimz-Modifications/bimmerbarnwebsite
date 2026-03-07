import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function PromoSection() {
  return (
    <section className="bg-black py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Carbon Fiber Banner */}
          <div className="relative overflow-hidden group" style={{ aspectRatio: "16/7" }}>
            <img
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&h=400&fit=crop&q=90"
              alt="Carbon Fiber Parts"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-8">
              <p className="text-neutral-400 text-xs tracking-widest uppercase mb-2">PREMIUM STYLING</p>
              <h3 className="text-white font-black text-2xl sm:text-3xl uppercase leading-tight">
                CARBON FIBER
                <br />
                <span className="text-neutral-400">PARTS</span>
              </h3>
              <Link
                to={createPageUrl("Shop") + "?category=exterior"}
                className="mt-5 inline-block bg-white text-black text-xs font-bold tracking-widest uppercase px-6 py-2.5 hover:bg-neutral-200 transition-colors w-fit"
              >
                SHOP NOW
              </Link>
            </div>
          </div>

          {/* Performance Banner */}
          <div className="relative overflow-hidden group" style={{ aspectRatio: "16/7" }}>
            <img
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&h=400&fit=crop&q=90"
              alt="Performance Parts"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-8">
              <p className="text-neutral-400 text-xs tracking-widest uppercase mb-2">BEST MODS</p>
              <h3 className="text-white font-black text-2xl sm:text-3xl uppercase leading-tight">
                PERFORMANCE
                <br />
                <span className="text-neutral-400">UPGRADES</span>
              </h3>
              <Link
                to={createPageUrl("Shop") + "?category=engine"}
                className="mt-5 inline-block bg-white text-black text-xs font-bold tracking-widest uppercase px-6 py-2.5 hover:bg-neutral-200 transition-colors w-fit"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}