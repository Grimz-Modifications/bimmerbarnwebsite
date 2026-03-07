import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";

const values = [
  { title: "EXPERT KNOWLEDGE", body: "Our team lives and breathes European cars. We know what works, helping you make the right call for your build." },
  { title: "QUALITY FIRST", body: "We only stock parts from trusted manufacturers — OEM and reputable aftermarket brands that meet our strict standards." },
  { title: "COMMUNITY DRIVEN", body: "Born from the car enthusiast community. We're gearheads ourselves and we get what builders actually need." },
  { title: "PERFORMANCE FOCUSED", body: "Every part is selected for its performance potential. From daily drivers to full track builds, we help you go faster." },
];

export default function About() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: "clamp(300px, 50vh, 500px)" }}>
        <img
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1800&h=800&fit=crop&q=90"
          alt="About Bimmer Barn"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">OUR STORY</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
            BUILT BY ENTHUSIASTS
            <br />
            <span className="text-neutral-400">FOR ENTHUSIASTS</span>
          </h1>
        </div>
      </div>

      {/* About text */}
      <div className="bg-neutral-950 border-y border-neutral-800 py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-neutral-400 text-base leading-relaxed">
            Bimmer Barn was founded with one mission — to be the go-to source for premium European performance parts.
            We specialize in <strong className="text-white">BMW OEM, M Performance, and aftermarket upgrades</strong>, with extensive knowledge across Audi, VW, Porsche, and Mercedes platforms.
          </p>
          <p className="text-neutral-500 text-sm mt-5 leading-relaxed">
            We're not just a parts store. We're a team of gearheads who understand that every mod matters, every fitment matters, and every dollar you spend should move the needle.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <h2 className="text-xl font-black tracking-widest uppercase text-white mb-10 text-center">WHY BIMMER BARN</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-800">
          {values.map((v) => (
            <div key={v.title} className="bg-black p-10">
              <h3 className="text-white font-black text-sm tracking-widest uppercase mb-4">{v.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-neutral-950 border-t border-neutral-800 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black uppercase tracking-widest text-white">READY TO BUILD?</h2>
          <p className="text-neutral-500 text-sm mt-4">Browse our catalog or reach out for expert advice.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl("Shop")} className="inline-flex items-center gap-2 bg-white text-black text-xs font-black tracking-widest uppercase px-8 py-4 hover:bg-neutral-200 transition-colors">
              SHOP PARTS <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to={createPageUrl("Contact")} className="inline-flex items-center gap-2 border border-neutral-700 text-neutral-400 text-xs font-black tracking-widest uppercase px-8 py-4 hover:border-neutral-500 hover:text-white transition-colors">
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}