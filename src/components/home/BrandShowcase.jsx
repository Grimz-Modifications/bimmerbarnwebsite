import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";

// BMW chassis/series — primary focus
const bmwSeries = [
  { name: "E SERIES", sub: "E46 · E90 · E92", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop&q=80", query: "?brand=BMW&search=e+series" },
  { name: "F SERIES", sub: "F30 · F80 · F82", img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&h=400&fit=crop&q=80", query: "?brand=BMW&search=f+series" },
  { name: "G SERIES", sub: "G20 · G80 · G82", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop&q=80", query: "?brand=BMW&search=g+series" },
];

// Other brands — future expansion
const otherBrands = [
  { name: "MERCEDES", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&q=80" },
  { name: "AUDI", img: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=600&h=400&fit=crop&q=80" },
  { name: "PORSCHE", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop&q=80" },
  { name: "VOLKSWAGEN", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&h=400&fit=crop&q=80" },
];

export default function BrandShowcase() {
  return (
    <section className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* BMW — Primary */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-black tracking-widest uppercase text-white">SHOP BMW</h2>
            <p className="text-neutral-600 text-xs tracking-widest uppercase mt-1">Our Primary Specialty</p>
          </div>
          <Link to={createPageUrl("Shop") + "?brand=BMW"} className="text-neutral-500 hover:text-white text-xs tracking-widest uppercase flex items-center gap-1 transition-colors">
            All BMW Parts <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
          {bmwSeries.map((s) => (
            <Link
              key={s.name}
              to={createPageUrl("Shop") + s.query}
              className="group relative overflow-hidden bg-neutral-900"
              style={{ aspectRatio: "16/9" }}
            >
              <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-50 group-hover:opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-black text-base tracking-widest">{s.name}</p>
                <p className="text-neutral-400 text-xs tracking-widest mt-0.5">{s.sub}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Other Brands — Coming Soon / Expanding */}
        <div className="border-t border-neutral-800/50 pt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-black tracking-widest uppercase text-neutral-400">OTHER BRANDS</h3>
              <p className="text-neutral-700 text-xs tracking-widest uppercase mt-1">Expanding Soon</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {otherBrands.map((brand) => (
              <Link
                key={brand.name}
                to={createPageUrl("Shop") + `?brand=${brand.name}`}
                className="group relative overflow-hidden aspect-[4/3] bg-neutral-900/50"
              >
                <img src={brand.img} alt={brand.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-25 group-hover:opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-neutral-500 group-hover:text-neutral-300 font-black text-xs tracking-widest transition-colors">{brand.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}