import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Use useParams instead of URLSearchParams
import { PRODUCTS, addToCart } from "../components/data";
import { ArrowLeft, Package, Check, Truck, Shield, Minus, Plus, ShoppingCart } from "lucide-react";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";

export default function ProductDetail() {
  // 1. Grab the slug from the new Route path="/product/:slug"
  const { slug } = useParams();
  
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  // 2. FAIL-SAFE LOGIC: 
  // We extract the ID from the slug. 
  // If slug is "101-e46-m3-oil-filter", productId becomes "101"
  // If slug is just "101", productId remains "101"
  const productId = slug ? slug.split("-")[0] : null;

  // 3. Find the product by comparing the ID
  const product = PRODUCTS.find((p) => String(p.id) === String(productId));

  // Scroll to top when the product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    setAdding(true);
    addToCart(product, quantity);
    // Dispatch storage event so Layout cart count updates
    window.dispatchEvent(new Event("storage"));
    toast.success("Added to cart!");
    setTimeout(() => setAdding(false), 600);
  };

  if (!product) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
          <p className="text-neutral-400 font-bold uppercase tracking-widest">Product not found</p>
          <Link to={createPageUrl("Shop")} className="mt-6 inline-flex items-center gap-2 text-neutral-500 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount = product.sale_price && product.sale_price < product.price;

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <Link to={createPageUrl("Shop")} className="inline-flex items-center gap-2 text-neutral-500 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-neutral-950 border border-neutral-800 aspect-square overflow-hidden">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-24 h-24 text-neutral-700" />
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.manufacturer && (
              <p className="text-neutral-500 text-xs font-bold tracking-widest uppercase mb-3">{product.manufacturer}</p>
            )}
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase leading-tight">{product.name}</h1>

            {product.model_compatibility && (
              <p className="text-neutral-500 text-sm mt-2">Fits: {product.model_compatibility}</p>
            )}
            {product.part_number && (
              <p className="text-neutral-600 text-xs mt-1">Part #: {product.part_number}</p>
            )}

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              {hasDiscount ? (
                <>
                  <span className="text-white text-3xl font-black">${product.sale_price.toFixed(2)}</span>
                  <span className="text-neutral-600 text-lg line-through">${product.price.toFixed(2)}</span>
                  <span className="bg-white text-black text-xs font-black px-2 py-1 tracking-wider ml-2">
                    SAVE ${(product.price - product.sale_price).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-white text-3xl font-black">${product.price.toFixed(2)}</span>
              )}
            </div>

            {product.description && (
              <p className="mt-6 text-neutral-400 leading-relaxed text-sm border-t border-neutral-800 pt-6">
                {product.description}
              </p>
            )}

            {/* Stock */}
            <div className="mt-6">
              {product.in_stock !== false ? (
                <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium tracking-wide uppercase">
                  <Check className="w-4 h-4 text-white" /> In Stock — Ready to Ship
                </div>
              ) : (
                <p className="text-xs text-neutral-500 font-medium tracking-wide uppercase">Out of Stock</p>
              )}
            </div>

            {/* Qty + Cart */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center border border-neutral-700">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 py-3 text-white font-bold min-w-[48px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.in_stock === false || adding}
                className="flex-1 bg-white text-black text-sm font-black tracking-widest uppercase py-4 hover:bg-neutral-200 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                {adding ? "ADDING..." : "ADD TO CART"}
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-2 gap-3 pt-8 border-t border-neutral-800">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                <div>
                  <p className="text-white text-xs font-bold uppercase tracking-wide">Fast Shipping</p>
                  <p className="text-neutral-600 text-xs">Ships 1-2 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                <div>
                  <p className="text-white text-xs font-bold uppercase tracking-wide">Quality Guaranteed</p>
                  <p className="text-neutral-600 text-xs">OEM & trusted brands</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}