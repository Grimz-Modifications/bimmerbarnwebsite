// ================================================================
// BIMMER BARN — data.js
// This is the single file to edit for products, categories & brands.
// Cart functions (localStorage) live at the bottom — don't touch those.
// ================================================================


// ----------------------------------------------------------------
// PRODUCTS — Add/edit/remove products here.
//
// Fields:
//   id            → unique string, increment for each new product
//   name          → product title
//   description   → shown on product detail page
//   price         → regular price (number)
//   sale_price    → set to null if not on sale, otherwise a lower number
//   category      → must match a key in CATEGORIES below
//   brand_compatibility → array, e.g. ["BMW"] or ["BMW","Mercedes"]
//   model_compatibility → plain text, e.g. "F30 · F80 M3"
//   image_url     → any image URL (Unsplash, your own CDN, etc.)
//   in_stock      → true | false
//   featured      → true = shows on homepage featured section
//   part_number   → SKU / OEM part number
//   manufacturer  → brand that makes the part (e.g. "Dinan", "KW")
// ----------------------------------------------------------------
export const PRODUCTS = [

  // --- ENGINE ---
  { id: "1", name: "Dinan Stage 1 Performance Tune",            price: 749,   sale_price: null,   category: "engine",       brand_compatibility: ["BMW"], model_compatibility: "F30 335i · F32 435i · F10 535i",  in_stock: true,  featured: true,  part_number: "DIN-N55-S1",        manufacturer: "Dinan",            image_url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=600&fit=crop&q=80",  description: "ECU software calibration for N55 engines. Increases power output and throttle response. Plug-and-play installation." },
  { id: "8", name: "Vargas Turbo N54 Upgrade Kit",              price: 4200,  sale_price: null,   category: "engine",       brand_compatibility: ["BMW"], model_compatibility: "E90/E92 335i · E89 Z4 35i",         in_stock: true,  featured: false, part_number: "VTS-N54-TK",        manufacturer: "Vargas Turbo",     image_url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=600&fit=crop&q=80",  description: "Drop-in turbo upgrade for N54. Supports up to 650whp. Includes all necessary hardware and instructions." },

  // --- EXHAUST ---
  { id: "2", name: "Active Autowerke Catback Exhaust",          price: 1295,  sale_price: 1099,   category: "exhaust",      brand_compatibility: ["BMW"], model_compatibility: "E90 · E92 · E93 M3",                in_stock: true,  featured: true,  part_number: "AA-E9X-CB",         manufacturer: "Active Autowerke", image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop&q=80",  description: "Stainless steel catback exhaust system with aggressive tone and improved flow. Bolt-on fitment for E9x M3." },

  // --- SUSPENSION ---
  { id: "3", name: "KW Variant 3 Coilover Kit",                 price: 2199,  sale_price: null,   category: "suspension",   brand_compatibility: ["BMW"], model_compatibility: "F80 M3 · F82 M4",                   in_stock: true,  featured: true,  part_number: "KW-V3-F8X",         manufacturer: "KW Suspension",    image_url: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=600&h=600&fit=crop&q=80",  description: "Independently adjustable rebound and compression damping. Lowers ride height and dramatically improves handling." },

  // --- INTAKE ---
  { id: "4", name: "Burger Motorsports BMS Intake",             price: 299,   sale_price: 249,    category: "intake",       brand_compatibility: ["BMW"], model_compatibility: "E90/E92 335i · E60 535i · E89 Z4",   in_stock: true,  featured: false, part_number: "BMS-N55-CAI",       manufacturer: "BMS",              image_url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=600&fit=crop&q=80",  description: "High-flow cold air intake for N54/N55 engines. Easy install with no cutting or modification required." },

  // --- BRAKES ---
  { id: "5", name: "Brembo GT Big Brake Kit",                   price: 3499,  sale_price: null,   category: "brakes",       brand_compatibility: ["BMW"], model_compatibility: "E46 M3 · E90 M3",                   in_stock: true,  featured: false, part_number: "BRB-GT-380",        manufacturer: "Brembo",           image_url: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=600&h=600&fit=crop&q=80",  description: "6-piston front calipers with 380mm rotors. Massive stopping power upgrade for track and street use." },

  // --- EXTERIOR ---
  { id: "6", name: "M Performance Carbon Mirror Caps",          price: 389,   sale_price: 319,    category: "exterior",     brand_compatibility: ["BMW"], model_compatibility: "F80 M3 · F82 M4 · F87 M2",          in_stock: true,  featured: true,  part_number: "BMW-51-M-MIRRORCAP",manufacturer: "BMW M Performance",image_url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=600&fit=crop&q=80",  description: "Genuine BMW M Performance carbon fiber mirror caps. Direct OEM replacement with aggressive styling." },

  // --- WHEELS & TIRES ---
  { id: "7", name: "Apex Arc-8 Wheels 18x10",                   price: 1850,  sale_price: null,   category: "wheels_tires", brand_compatibility: ["BMW"], model_compatibility: "E46 · E90 · E92 · F30",             in_stock: false, featured: false, part_number: "ARC8-18X10-SB",     manufacturer: "Apex",             image_url: "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=600&h=600&fit=crop&q=80",  description: "Forged monoblock construction, extreme lightweight. Available in Satin Black. Square or staggered setups." },

];


// ----------------------------------------------------------------
// CATEGORIES — keys must match product `category` field above.
// Add new ones here if you add new product categories.
// ----------------------------------------------------------------
export const CATEGORIES = [
  { key: "all",          label: "All" },
  { key: "engine",       label: "Engine" },
  { key: "suspension",   label: "Suspension" },
  { key: "exhaust",      label: "Exhaust" },
  { key: "intake",       label: "Intake" },
  { key: "brakes",       label: "Brakes" },
  { key: "exterior",     label: "Exterior" },
  { key: "interior",     label: "Interior" },
  { key: "wheels_tires", label: "Wheels & Tires" },
  { key: "lighting",     label: "Lighting" },
  { key: "electronics",  label: "Electronics" },
];


// ----------------------------------------------------------------
// BRANDS — shown as filter pills in the Shop page.
// Add new brands here as you expand beyond BMW.
// ----------------------------------------------------------------
export const BRANDS = ["All", "BMW", "Mercedes", "Audi", "Porsche", "VW"];


// ================================================================
// CART HELPERS — localStorage based. No need to edit these.
// ================================================================
export const getCart = () => { try { return JSON.parse(localStorage.getItem("bb_cart") || "[]"); } catch { return []; } };
export const saveCart = (items) => localStorage.setItem("bb_cart", JSON.stringify(items));

export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.product_id === product.id);
  if (existing) { existing.quantity = (existing.quantity || 1) + quantity; }
  else { cart.push({ product_id: product.id, product_name: product.name, price: product.sale_price || product.price, quantity, image_url: product.image_url || "" }); }
  saveCart(cart);
  return [...cart];
}

export function updateCartItem(productId, quantity) {
  const cart = getCart().map((i) => i.product_id === productId ? { ...i, quantity } : i);
  saveCart(cart);
  return [...cart];
}

export function removeFromCart(productId) {
  const cart = getCart().filter((i) => i.product_id !== productId);
  saveCart(cart);
  return [...cart];
}