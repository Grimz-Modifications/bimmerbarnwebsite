import React, { useState } from "react";
import { getCart, saveCart } from "../components/data";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, CheckCircle2, Package, Loader2 } from "lucide-react";

// ----------------------------------------------------------------
// OWNER EMAIL — change this to update where orders are sent
// ----------------------------------------------------------------
const OWNER_EMAIL = "https://formspree.io/f/xpqywdbe" ; method="POST";

const field = "w-full bg-neutral-900 border border-neutral-700 text-white text-sm px-4 py-3 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600";
const label = "text-neutral-500 text-[10px] tracking-widest uppercase font-bold block mb-2";

export default function Checkout() {
  const cartItems = getCart();
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  const [form, setForm] = useState({
    // Contact
    first_name: "", last_name: "", email: "", phone: "",
    // Shipping
    address: "", city: "", state: "", zip: "", country: "CA",
    // Billing
    same_as_shipping: true,
    billing_address: "", billing_city: "", billing_state: "", billing_zip: "",
    // Notes
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber] = useState(() => "BB-" + Math.random().toString(36).substring(2, 8).toUpperCase());

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const itemLines = cartItems.map((i) =>
      `• ${i.product_name} (x${i.quantity || 1}) — $${(i.price * (i.quantity || 1)).toFixed(2)}`
    ).join("\n");

    const shipping = `${form.address}, ${form.city}, ${form.state} ${form.zip}, ${form.country}`;
    const billing = form.same_as_shipping
      ? shipping
      : `${form.billing_address}, ${form.billing_city}, ${form.billing_state} ${form.billing_zip}`;

    const body = `
NEW ORDER — ${orderNumber}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER
  Name:    ${form.first_name} ${form.last_name}
  Email:   ${form.email}
  Phone:   ${form.phone || "—"}

SHIP TO
  ${shipping}

BILL TO
  ${billing}

ORDER ITEMS
${itemLines}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER TOTAL:  $${subtotal.toFixed(2)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${form.notes ? `CUSTOMER NOTES:\n${form.notes}` : ""}

Reply to this email to confirm shipping details and payment with the customer.
    `.trim();

    await base44.integrations.Core.SendEmail({
      to: OWNER_EMAIL,
      subject: `[Bimmer Barn] New Order ${orderNumber} — ${form.first_name} ${form.last_name}`,
      body,
    });

    // Also send confirmation to customer
    await base44.integrations.Core.SendEmail({
      from_name: "Bimmer Barn",
      to: form.email,
      subject: `Order Received — ${orderNumber}`,
      body: `Hi ${form.first_name},\n\nWe've received your order (${orderNumber}) and will be in touch shortly to confirm shipping and payment.\n\nItems ordered:\n${itemLines}\n\nTotal: $${subtotal.toFixed(2)}\n\nShip to: ${shipping}\n\nThanks,\nBimmer Barn\nbimmerbarnperformance@gmail.com`,
    });

    // Clear cart
    saveCart([]);
    window.dispatchEvent(new Event("storage"));

    setLoading(false);
    setSubmitted(true);
  };

  // ── Empty cart ──
  if (cartItems.length === 0 && !submitted) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <Package className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
          <p className="text-neutral-400 font-bold uppercase tracking-widest">Your cart is empty</p>
          <Link to={createPageUrl("Shop")} className="mt-6 inline-flex items-center gap-2 bg-white text-black text-xs font-black tracking-widest uppercase px-8 py-3.5 hover:bg-neutral-200 transition-colors">
            <ArrowLeft className="w-4 h-4" /> SHOP PARTS
          </Link>
        </div>
      </div>
    );
  }

  // ── Success ──
  if (submitted) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white uppercase tracking-widest">ORDER PLACED</h2>
          <p className="text-neutral-400 text-sm mt-1 font-mono">{orderNumber}</p>
          <p className="text-neutral-500 mt-5 leading-relaxed text-sm">
            We've received your order and sent you a confirmation to <span className="text-white">{form.email}</span>.<br />
            We'll reach out shortly to confirm payment and shipping.
          </p>
          <Link to={createPageUrl("Shop")} className="mt-8 inline-flex items-center gap-2 bg-white text-black text-xs font-black tracking-widest uppercase px-8 py-3.5 hover:bg-neutral-200 transition-colors">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  // ── Checkout Form ──
  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <div className="bg-neutral-950 border-b border-neutral-800 px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link to={createPageUrl("Cart")} className="text-neutral-500 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black tracking-widest uppercase text-white">CHECKOUT</h1>
            <p className="text-neutral-500 text-sm mt-0.5">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT — Form fields */}
          <div className="lg:col-span-2 space-y-10">

            {/* Contact */}
            <section>
              <h2 className="text-white font-black text-xs tracking-widest uppercase mb-5 pb-3 border-b border-neutral-800">CONTACT INFORMATION</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={label}>FIRST NAME *</label><input required value={form.first_name} onChange={e => set("first_name", e.target.value)} className={field} placeholder="John" /></div>
                <div><label className={label}>LAST NAME *</label><input required value={form.last_name} onChange={e => set("last_name", e.target.value)} className={field} placeholder="Smith" /></div>
                <div><label className={label}>EMAIL *</label><input type="email" required value={form.email} onChange={e => set("email", e.target.value)} className={field} placeholder="john@email.com" /></div>
                <div><label className={label}>PHONE</label><input value={form.phone} onChange={e => set("phone", e.target.value)} className={field} placeholder="(000) 000-0000" /></div>
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="text-white font-black text-xs tracking-widest uppercase mb-5 pb-3 border-b border-neutral-800">SHIPPING ADDRESS</h2>
              <div className="space-y-4">
                <div><label className={label}>STREET ADDRESS *</label><input required value={form.address} onChange={e => set("address", e.target.value)} className={field} placeholder="123 Main St" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={label}>CITY *</label><input required value={form.city} onChange={e => set("city", e.target.value)} className={field} placeholder="British Columbia" /></div>
                  <div><label className={label}>STATE *</label><input required value={form.state} onChange={e => set("state", e.target.value)} className={field} placeholder="BC" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={label}>ZIP CODE *</label><input required value={form.zip} onChange={e => set("zip", e.target.value)} className={field} placeholder="X1X 1X1" /></div>
                  <div><label className={label}>COUNTRY *</label>
                    <select required value={form.country} onChange={e => set("country", e.target.value)} className={field + " cursor-pointer"}>
                      <option value="CA">Canada</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Billing */}
            <section>
              <h2 className="text-white font-black text-xs tracking-widest uppercase mb-5 pb-3 border-b border-neutral-800">BILLING ADDRESS</h2>
              <label className="flex items-center gap-3 cursor-pointer mb-5">
                <input type="checkbox" checked={form.same_as_shipping} onChange={e => set("same_as_shipping", e.target.checked)} className="w-4 h-4 accent-white" />
                <span className="text-neutral-400 text-sm">Same as shipping address</span>
              </label>
              {!form.same_as_shipping && (
                <div className="space-y-4">
                  <div><label className={label}>STREET ADDRESS *</label><input required value={form.billing_address} onChange={e => set("billing_address", e.target.value)} className={field} placeholder="123 Main St" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={label}>CITY *</label><input required value={form.billing_city} onChange={e => set("billing_city", e.target.value)} className={field} placeholder="British Columbia" /></div>
                    <div><label className={label}>STATE *</label><input required value={form.billing_state} onChange={e => set("billing_state", e.target.value)} className={field} placeholder="BC" /></div>
                  </div>
                  <div><label className={label}>ZIP CODE *</label><input required value={form.billing_zip} onChange={e => set("billing_zip", e.target.value)} className={field} placeholder="X1X 1X1" /></div>
                </div>
              )}
            </section>

            {/* Notes */}
            <section>
              <h2 className="text-white font-black text-xs tracking-widest uppercase mb-5 pb-3 border-b border-neutral-800">ORDER NOTES <span className="text-neutral-600 font-normal normal-case tracking-normal">(optional)</span></h2>
              <textarea value={form.notes} onChange={e => set("notes", e.target.value)} className={field + " min-h-[100px] resize-none"} placeholder="Special instructions, questions, vehicle info..." />
            </section>
          </div>

          {/* RIGHT — Order summary */}
          <div>
            <div className="bg-neutral-950 border border-neutral-800 p-6 sticky top-24">
              <h3 className="text-white font-black text-xs tracking-widest uppercase mb-5">ORDER SUMMARY</h3>

              <div className="space-y-3 mb-5">
                {cartItems.map((item) => (
                  <div key={item.product_id} className="flex gap-3 items-start">
                    <div className="w-12 h-12 bg-neutral-900 flex-shrink-0 overflow-hidden">
                      {item.image_url
                        ? <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
                        : <Package className="w-6 h-6 text-neutral-700 m-auto mt-3" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold leading-tight line-clamp-2">{item.product_name}</p>
                      <p className="text-neutral-500 text-xs mt-1">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="text-white text-xs font-bold flex-shrink-0">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-800 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Shipping</span>
                  <span className="text-neutral-400 text-xs">Quoted via email</span>
                </div>
                <div className="border-t border-neutral-800 pt-3 flex justify-between">
                  <span className="text-white font-black uppercase tracking-wide">Total</span>
                  <span className="text-white font-black text-lg">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-neutral-600 text-xs mt-4 leading-relaxed">
                Payment is collected after we confirm your order via email. No card info needed now.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full bg-white text-black text-xs font-black tracking-widest uppercase py-4 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> SENDING...</> : "PLACE ORDER"}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}