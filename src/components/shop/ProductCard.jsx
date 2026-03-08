import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Package } from "lucide-react";

export default function ProductCard({ product }) {
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const savings = hasDiscount ? (product.price - product.sale_price).toFixed(2) : null;

  return (
    <Link
  to={`/ProductDetail?id=${product.id}`}
  reloadDocument
  >
      {/* Image */}
      <div className="relative overflow-hidden bg-neutral-900" style={{ aspectRatio: "1/1" }}>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-14 h-14 text-neutral-700" />
          </div>
        )}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-white text-black text-[10px] font-black tracking-widest px-2 py-1 uppercase">
            SAVE ${savings}
          </div>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-neutral-400 font-bold text-xs tracking-widest uppercase">OUT OF STOCK</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        {product.manufacturer && (
          <p className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase mb-1">
            {product.manufacturer}
          </p>
        )}
        <h3 className="text-white text-xs sm:text-sm font-semibold leading-snug line-clamp-2 group-hover:text-neutral-300 transition-colors">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-white font-bold text-sm">
            ${(product.sale_price || product.price).toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-neutral-600 text-xs line-through">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}