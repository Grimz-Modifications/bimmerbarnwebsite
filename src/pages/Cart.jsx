import React, { useState, useEffect } from "react";
import { getCart, saveCart, updateCartItem, removeFromCart } from "../components/data";
import { ShoppingCart, Trash2, Package, ArrowLeft, Minus, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Cart() {
  const [cartItems, setCartItems] = useState(getCart());

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleUpdate = (productId, quantity) => {
    const updated = updateCartItem(productId, quantity);
    setCartItems(updated);
    window.dispatchEvent(new Event("storage"));
  };

  const handleRemove = (productId) => {
    const updated = removeFromCart(productId);
    setCartItems(updated);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-neutral-950 border-b border-neutral-800 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-black tracking-widest uppercase text-white flex items-center gap-3">
            <ShoppingCart className="w-6 h-6" /> YOUR CART
          </h1>
          <p className="text-neutral-500 text-sm mt-1">{cartItems.length} {cartItems.length === 1 ? "item" : "items"}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10">
        {cartItems.length === 0 ? (
          <div className="py-32 text-center">
            <Package className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
            <p className="text-neutral-400 font-bold uppercase tracking-widest text-lg">Your cart is empty</p>
            <p className="text-neutral-600 text-sm mt-2">Browse our catalog and add items to get started</p>
            <Link to={createPageUrl("Shop")} className="mt-8 inline-flex items-center gap-2 bg-white text-black text-xs font-black tracking-widest uppercase px-8 py-3.5 hover:bg-neutral-200 transition-colors">
              <ArrowLeft className="w-4 h-4" /> SHOP PARTS
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              {cartItems.map((item) => (
                <div key={item.product_id} className="flex items-center gap-4 bg-neutral-950 border border-neutral-800 p-4">
                  <div className="w-20 h-20 bg-neutral-900 flex-shrink-0 overflow-hidden">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-neutral-700" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={createPageUrl("ProductDetail") + `?id=${item.product_id}`}
                      className="text-white text-sm font-semibold hover:text-neutral-300 transition-colors line-clamp-2"
                    >
                      {item.product_name}
                    </Link>
                    <p className="text-white font-bold text-sm mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center border border-neutral-700">
                    <button onClick={() => handleUpdate(item.product_id, Math.max(1, (item.quantity || 1) - 1))} className="px-3 py-2 text-neutral-500 hover:text-white hover:bg-neutral-900 transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-2 text-white text-sm font-bold min-w-[36px] text-center">{item.quantity || 1}</span>
                    <button onClick={() => handleUpdate(item.product_id, (item.quantity || 1) + 1)} className="px-3 py-2 text-neutral-500 hover:text-white hover:bg-neutral-900 transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-white font-bold text-sm w-20 text-right">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                  <button onClick={() => handleRemove(item.product_id)} className="text-neutral-600 hover:text-white transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div>
              <div className="bg-neutral-950 border border-neutral-800 p-6 sticky top-24">
                <h3 className="text-white font-black text-sm tracking-widest uppercase mb-6">ORDER SUMMARY</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Subtotal</span>
                    <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Shipping</span>
                    <span className="text-neutral-400">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-neutral-800 pt-3 flex justify-between">
                    <span className="text-white font-bold uppercase tracking-wide">Total</span>
                    <span className="text-white font-black text-xl">${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  to={createPageUrl("Checkout")}
                  className="mt-6 w-full bg-white text-black text-xs font-black tracking-widest uppercase py-4 flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                >
                  PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}