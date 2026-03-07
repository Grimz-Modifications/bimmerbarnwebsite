import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "../components/home/HeroSection";
import TrustBar from "../components/home/TrustBar";
import BrandShowcase from "../components/home/BrandShowcase";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PromoSection from "../components/home/PromoSection";
import CategoryGrid from "../components/home/CategoryGrid";

export default function Home() {
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => base44.entities.Product.filter({ featured: true }),
    initialData: [],
  });

  const { data: allProducts } = useQuery({
    queryKey: ["products-home"],
    queryFn: () => base44.entities.Product.list("-created_date", 8),
    initialData: [],
  });

  return (
    <div className="bg-black">
      <HeroSection />
      <TrustBar />
      <BrandShowcase />
      <FeaturedProducts products={featuredProducts.length > 0 ? featuredProducts : allProducts} isLoading={isLoading} />
      <PromoSection />
      <CategoryGrid />

      {/* Bottom CTA */}
      <section className="bg-neutral-950 border-t border-neutral-800 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-3">EURO SPECIALISTS</p>
          <p className="text-neutral-300 text-base leading-relaxed">
            Experts in <strong className="text-white">BMW OEM, M Performance, and Aftermarket Car Parts</strong>.
            Explore Performance Tuning Modifications, Carbon Fiber Exterior Enhancements, Interior Accessories, and More.
          </p>
        </div>
      </section>
    </div>
  );
}