import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS, addToCart } from "@/components/data";
import { ArrowLeft, Package, Check, Truck, Shield, Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  // Search by Slug first, then ID number
  const product = PRODUCTS.find((p) => 
    (p.slug && p.slug === slug) || String(p.id) === String(slug)
  );

  // --- SEO & Tab Title Logic ---
  useEffect(() => {
    window.scrollTo(0, 0);

    if (product) {
      // 1. Set the Tab Title (e.g., "E46 M3 Oil Filter | Bimmer Barn Performance")
      document.title = `${product.name} | Bimmer Barn Performance`;

      // 2. Dynamically update the meta description for Google
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        const shortDesc = product.description 
          ? product.description.substring(0, 150) + "..." 
          : `High-quality ${product.name} for your BMW.`;
        metaDescription.setAttribute("content", shortDesc);
      }
    }

    // Cleanup: Reset to default title when user leaves the page
    return () => {
      document.title = "Bimmer Barn Performance | BMW Parts & Gear";
    };
  }, [slug, product]);

  const handleAddToCart = () => {
    if (!product) return;
    setAdding(true);
    addToCart(product, quantity);
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
          <Link to="/" className="mt-6 inline-flex items-center gap-2 text-neutral-500 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount = product.sale_price && product.sale_price < product.price;

  return (
    <>
      {/* SEO Schema for Google Rankings - Helps with Price/Stock display in search */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "image": [product.image_url],
          "description": product.description,
          "brand": { "@type": "Brand", "name": product.manufacturer || "Bimmer Barn" },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": product.sale_price || product.price,
            "availability": product.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "url": window.location.href
          }
        })}
      </script>

      <div className="bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-neutral-950 border border-neutral-800 aspect-square overflow-hidden">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-24 h-24 text-neutral-700" />
                </div>
              )}
            </div>

            <div>
              {product.manufacturer && (
                <p className="text-neutral-500 text-xs font-bold tracking-widest uppercase mb-3">{product.manufacturer}</p>
              )}
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase leading-tight">{product.name}</h1>
              
              <div className="mt-6 flex items-baseline gap-3">
                {hasDiscount ? (
                  <>
                    <span className="text-white text-3xl font-black">${product.sale_price.toFixed(2)}</span>
                    <span className="text-neutral-600 text-lg line-through">${product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-white text-3xl font-black">${product.price.toFixed(2)}</span>
                )}
              </div>

              {product.description && (
                <div className="mt-6 border-t border-neutral-800 pt-6">
                   <p className="text-neutral-400 leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="mt-8 flex items-center gap-3">
                <div className="flex items-center border border-neutral-700">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-neutral-400 hover:text-white transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 py-3 text-white font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-neutral-400 hover:text-white transition-colors">
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

              {/* Trust Badges */}
              <div className="mt-12 grid grid-cols-2 gap-4 border-t border-neutral-900 pt-8">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-neutral-500" />
                  <span className="text-xs text-neutral-400 font-bold uppercase tracking-tighter">Fast Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-neutral-500" />
                  <span className="text-xs text-neutral-400 font-bold uppercase tracking-tighter">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}