import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Added useParams
import { PRODUCTS, addToCart } from "../components/data";
import { ArrowLeft, Package, Check, Truck, Shield, Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  // 1. Get the slug from the URL /product/:slug
  const { slug } = useParams();
  
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  // 2. Extract ID from the slug (the part before the first hyphen)
  // If your URL is /product/123-bmw-part, productId becomes "123"
  const productId = slug ? slug.split("-")[0] : null;

  // 3. Find the product using the extracted ID
  const product = PRODUCTS.find((p) => String(p.id) === String(productId));

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/" className="text-blue-500 hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-neutral-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-neutral-900 aspect-square overflow-hidden border border-neutral-800">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-20 h-20 text-neutral-800" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {product.manufacturer && (
              <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-2">
                {product.manufacturer}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-black mb-4 uppercase tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-bold">
                ${(product.sale_price || product.price).toFixed(2)}
              </span>
              {product.sale_price && (
                <span className="text-neutral-500 line-through text-lg">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-neutral-400 leading-relaxed mb-8">
              {product.description || "No description available for this Bimmer Barn part."}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-neutral-800 bg-neutral-900">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:text-blue-500 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:text-blue-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={adding || !product.in_stock}
              className={`w-full py-4 flex items-center justify-center gap-2 font-black uppercase tracking-widest transition-all ${
                product.in_stock 
                ? "bg-white text-black hover:bg-blue-500 hover:text-white" 
                : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
              }`}
            >
              {adding ? (
                <>
                  <Check className="w-5 h-5" /> Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  {product.in_stock ? "Add to Cart" : "Out of Stock"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}