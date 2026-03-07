import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Package, Check, Truck, Shield, Minus, Plus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const products = await base44.entities.Product.filter({ id: productId });
      return products[0];
    },
    enabled: !!productId,
  });

  const addToCartMutation = useMutation({
    mutationFn: (item) => base44.entities.CartItem.create(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Added to cart!");
    },
  });

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-neutral-900 animate-pulse" />
            <div className="space-y-4">
              <div className="h-6 w-1/3 bg-neutral-900 animate-pulse" />
              <div className="h-10 w-2/3 bg-neutral-900 animate-pulse" />
              <div className="h-24 bg-neutral-900 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <p className="text-neutral-500 text-xs font-bold tracking-widest uppercase mb-3">
                {product.manufacturer}
              </p>
            )}
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase leading-tight">
              {product.name}
            </h1>

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

            {/* Description */}
            {product.description && (
              <p className="mt-6 text-neutral-400 leading-relaxed text-sm border-t border-neutral-800 pt-6">
                {product.description}
              </p>
            )}

            {/* Stock status */}
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
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 py-3 text-white font-bold min-w-[48px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() =>
                  addToCartMutation.mutate({
                    product_id: product.id,
                    product_name: product.name,
                    price: product.sale_price || product.price,
                    quantity,
                    image_url: product.image_url || "",
                  })
                }
                disabled={product.in_stock === false || addToCartMutation.isPending}
                className="flex-1 bg-white text-black text-sm font-black tracking-widest uppercase py-4 hover:bg-neutral-200 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                {addToCartMutation.isPending ? "ADDING..." : "ADD TO CART"}
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