import React from "react";
import { PRODUCTS } from "../components/data";
import HeroSection from "../components/home/HeroSection";
import TrustBar from "../components/home/TrustBar";
import BrandShowcase from "../components/home/BrandShowcase";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PromoSection from "../components/home/PromoSection";
import CategoryGrid from "../components/home/CategoryGrid";

export default function Home() {
  const featuredProducts = PRODUCTS.filter((p) => p.featured);
  const recentProducts = PRODUCTS.slice(0, 8);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : recentProducts;

  return (
    <div className="bg-black">
      <HeroSection />
      <TrustBar />
      <BrandShowcase />
      <FeaturedProducts products={displayProducts} isLoading={false} />
      <PromoSection />
      <CategoryGrid />

      {/* Bottom CTA */}
      <section className="bg-neutral-950 border-t border-neutral-800 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-3">BMW SPECIALISTS</p>
          <p className="text-neutral-300 text-base leading-relaxed">
            Experts in <strong className="text-white">BMW OEM, M Performance, and Aftermarket Car Parts</strong>.
            Explore Performance Tuning Modifications, Carbon Fiber Exterior Enhancements, Interior Accessories, and More.
          </p>
        </div>
      </section>
    </div>
  );
}