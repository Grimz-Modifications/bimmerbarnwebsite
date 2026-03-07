import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";
import ProductCard from "../shop/ProductCard";

export default function FeaturedProducts({ products, isLoading }) {
  return (
    <section className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black tracking-widest uppercase text-white">FEATURED PARTS</h2>
          <Link to={createPageUrl("Shop")} className="text-neutral-500 hover:text-white text-xs tracking-widest uppercase flex items-center gap-1 transition-colors">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-neutral-900 animate-pulse" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            
            if (Array.isArray(products)) {
    products.slice(0, 4).map((product) => (
        // existing code for each product
    ));
} else {
    console.warn('Products array is missing');
}
          </div>
        ) : null}
      </div>
    </section>
  );
}