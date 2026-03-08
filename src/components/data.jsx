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

  // ============================================================
  // E CHASSIS (E46, E90, E92, E9X, E60, etc.)
  // ============================================================

  // --- ENGINE ---
  { id: "e1",  name: "Bimmer Barn Performance N54 Custom Tune",           price: 749,   sale_price: null,  category: "engine",       brand_compatibility: ["BMW"], model_compatibility: "E90 335i · E92 335i · E60 535i",   in_stock: true,  featured: false,  part_number: "BBP-N54-CUSTOM",         manufacturer: "Bimmer Barn Performance",            image_url: "https://69acd969fa9e210ee0f0d661.imgix.net/dyno%20graph.jpg",  description: "ECU software calibration for all N54 engines. Increases power output and throttle response. Plug-and-play remote installation." },
  { id: "e2",  name: "Vargas Turbo N54 Upgrade Kit",             price: 4200,  sale_price: null,  category: "engine",       brand_compatibility: ["BMW"], model_compatibility: "E90/E92 335i · E89 Z4 35i",        in_stock: true,  featured: false, part_number: "VTS-N54-TK",         manufacturer: "Vargas Turbo",     image_url: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=600&h=600&fit=crop&q=80",  description: "Drop-in turbo upgrade for N54. Supports up to 650whp. Includes all necessary hardware and instructions." },

  // --- EXHAUST ---
  { id: "e3",  name: "Active Autowerke Catback Exhaust",         price: 1295,  sale_price: 1099,  category: "exhaust",      brand_compatibility: ["BMW"], model_compatibility: "E90 · E92 · E93 M3",               in_stock: true,  featured: true,  part_number: "AA-E9X-CB",          manufacturer: "Active Autowerke", image_url: "https://69acd969fa9e210ee0f0d661.imgix.net/IMG_5014small.webp",  description: "Stainless steel catback exhaust system with aggressive tone and improved flow. Bolt-on fitment for E9x M3." },
  { id: "e4", name: "Eisenmann Race Exhaust E46 M3",            price: 1850,  sale_price: null,  category: "exhaust",      brand_compatibility: ["BMW"], model_compatibility: "E46 M3",                           in_stock: true,  featured: false, part_number: "EIS-E46-RACE",       manufacturer: "Eisenmann",        image_url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&h=600&fit=crop&q=80",  description: "Quad-tip race exhaust for E46 M3. Deep, aggressive S54 sound with improved flow." },

  // --- SUSPENSION ---
  { id: "e5",  name: "KW Variant 3 Coilover Kit — E9X",         price: 2199,  sale_price: null,  category: "suspension",   brand_compatibility: ["BMW"], model_compatibility: "E90 · E92 · E93",                  in_stock: true,  featured: true,  part_number: "KW-V3-E9X",          manufacturer: "KW Suspension",    image_url: "https://images.unsplash.com/photo-1558618047-f4e60cde054e?w=600&h=600&fit=crop&q=80",  description: "Independently adjustable rebound and compression damping. Lowers ride height and dramatically improves handling." },
  { id: "e6", name: "Bilstein PSS10 Coilover Kit — E46",        price: 1599,  sale_price: 1399, category: "suspension",   brand_compatibility: ["BMW"], model_compatibility: "E46 328i · 330i · M3",             in_stock: true,  featured: false, part_number: "BIL-PSS10-E46",      manufacturer: "Bilstein",         image_url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=600&fit=crop&q=80",  description: "10-way adjustable damping with OEM-quality ride. Ideal street/track balance for E46." },

  // --- INTAKE ---
  { id: "e7",  name: "Burger Motorsports BMS Intake — N54",      price: 134.99,   sale_price: 129.99,   category: "intake",       brand_compatibility: ["BMW"], model_compatibility: "E90/E92 335i · E60 535i · E89 Z4", in_stock: true,  featured: false, part_number: "BMS-N54-CAI",        manufacturer: "BMS",              image_url: "https://69acd969fa9e210ee0f0d661.imgix.net/dual_cone_intake_DCI_BMS_BMW_n54_air_filter_33-2367_13717556961.webp",  description: "High-flow cold air intake for N54 engines. Easy install with no cutting or modification required." },

  // --- BRAKES ---
  { id: "e8",  name: "Brembo GT Big Brake Kit — E46/E90",        price: 3499,  sale_price: null,  category: "brakes",       brand_compatibility: ["BMW"], model_compatibility: "E46 M3 · E90 M3",                  in_stock: true,  featured: false, part_number: "BRB-GT-380",         manufacturer: "Brembo",           image_url: "https://cdn11.bigcommerce.com/s-43370/images/stencil/1280x1280/products/24159/80222/1M2.8008A2__00968.1639698430.jpg?c=2",  description: "6-piston front calipers with 380mm rotors. Massive stopping power upgrade for track and street use." },

  // --- EXTERIOR ---
  { id: "e9", name: "E46 M3 Carbon Fiber Hood",                 price: 899,   sale_price: 749,   category: "exterior",     brand_compatibility: ["BMW"], model_compatibility: "E46 M3",                           in_stock: true,  featured: false, part_number: "CF-HOOD-E46M3",      manufacturer: "Seibon",           image_url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=600&fit=crop&q=80",  description: "OEM-style carbon fiber hood for E46 M3. Significant weight savings over stock steel hood." },

  // --- WHEELS & TIRES ---
  { id: "e10",  name: "Apex Arc-8 Wheels 18x10",                  price: 1850,  sale_price: null,  category: "wheels_tires", brand_compatibility: ["BMW"], model_compatibility: "E46 · E90 · E92",                  in_stock: false, featured: false, part_number: "ARC8-18X10-SB",     manufacturer: "Apex",             image_url: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?w=600&h=600&fit=crop&q=80",  description: "Forged monoblock construction, extreme lightweight. Available in Satin Black. Square or staggered setups." },


  // ============================================================
  // F CHASSIS (F30, F32, F80, F82, F87, F10, etc.)
  // ============================================================

  // --- ENGINE ---
  { id: "f1", name: "Dinan Stage 2 Tune — F30 N55",             price: 1299,  sale_price: null,  category: "engine",       brand_compatibility: ["BMW"], model_compatibility: "F30 335i · F32 435i",              in_stock: true,  featured: false, part_number: "DIN-N55-S2",         manufacturer: "Dinan",            image_url: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&h=600&fit=crop&q=80",  description: "Stage 2 ECU tune for F-chassis N55. Includes upgraded VRSF charge pipe. Gains up to 80whp over stock." },
  { id: "f2", name: "Pure Stage 2 Turbo — F80 M3 S55",          price: 3800,  sale_price: null,  category: "engine",       brand_compatibility: ["BMW"], model_compatibility: "F80 M3 · F82 M4 · F87 M2 Comp",   in_stock: true,  featured: true,  part_number: "PURE-S55-STG2",      manufacturer: "Pure Turbos",      image_url: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=600&h=600&fit=crop&q=80",  description: "Drop-in upgraded turbos for S55. Supports 600+whp. Best power-per-dollar for F8X platform." },

  // --- EXHAUST ---
  { id: "f3", name: "VRSF Catless Downpipes — F30 N55",         price: 499,   sale_price: 449,   category: "exhaust",      brand_compatibility: ["BMW"], model_compatibility: "F30 335i · F32 435i · F10 535i",   in_stock: true,  featured: false, part_number: "VRSF-DP-N55",        manufacturer: "VRSF",             image_url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&h=600&fit=crop&q=80",  description: "3\" catless downpipes for N55 F-chassis. Significant power gains and aggressive exhaust note." },
  { id: "f4", name: "Akrapovic Titanium Exhaust — F80 M3",      price: 4200,  sale_price: null,  category: "exhaust",      brand_compatibility: ["BMW"], model_compatibility: "F80 M3 · F82 M4",                  in_stock: true,  featured: false, part_number: "AKR-F8X-TI",         manufacturer: "Akrapovic",        image_url: "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?w=600&h=600&fit=crop&q=80",  description: "Full titanium slip-on system for F8X M3/M4. Weight savings of 7kg over OEM. Incredible sound." },

  // --- SUSPENSION ---
  { id: "3b", name: "KW Variant 3 Coilover Kit — F80 M3/M4",   price: 2599,  sale_price: null,  category: "suspension",   brand_compatibility: ["BMW"], model_compatibility: "F80 M3 · F82 M4",                  in_stock: true,  featured: true,  part_number: "KW-V3-F8X",          manufacturer: "KW Suspension",    image_url: "https://images.unsplash.com/photo-1558618047-f4e60cde054e?w=600&h=600&fit=crop&q=80",  description: "Independently adjustable rebound and compression damping for F8X platform. Lowers ride height 10–30mm." },
  { id: "f5", name: "Eibach Pro-Street Coilovers — F30",        price: 1199,  sale_price: 1049, category: "suspension",   brand_compatibility: ["BMW"], model_compatibility: "F30 320i · 328i · 335i",            in_stock: true,  featured: false, part_number: "EIB-PS-F30",         manufacturer: "Eibach",           image_url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=600&fit=crop&q=80",  description: "Height and damping adjustable coilover for F30. Great daily driver upgrade with sport bias." },

  // --- INTAKE ---
  { id: "f6", name: "VRSF High Flow Intake — F80 M3 S55",      price: 349,   sale_price: null,  category: "intake",       brand_compatibility: ["BMW"], model_compatibility: "F80 M3 · F82 M4 · F87 M2 Comp",   in_stock: true,  featured: false, part_number: "VRSF-INT-S55",       manufacturer: "VRSF",             image_url: "https://images.unsplash.com/photo-1635591222813-98e55e748d2e?w=600&h=600&fit=crop&q=80",  description: "High-flow dual cone intake kit for S55. Significant intake sound improvement and modest power gains." },

  // --- EXTERIOR ---
  { id: "6",  name: "M Performance Carbon Mirror Caps",         price: 389,   sale_price: 319,   category: "exterior",     brand_compatibility: ["BMW"], model_compatibility: "F80 M3 · F82 M4 · F87 M2",        in_stock: true,  featured: true,  part_number: "BMW-51-M-MIRRORCAP", manufacturer: "BMW M Performance",image_url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=600&fit=crop&q=80",  description: "Genuine BMW M Performance carbon fiber mirror caps. Direct OEM replacement with aggressive styling." },
  { id: "f7", name: "Carbon Fiber Front Lip — F30 M Sport",     price: 549,   sale_price: null,  category: "exterior",     brand_compatibility: ["BMW"], model_compatibility: "F30 M Sport · F32 M Sport",        in_stock: true,  featured: false, part_number: "CF-LIP-F30MSP",      manufacturer: "3D Design",        image_url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=600&fit=crop&q=80",  description: "Dry carbon fiber front lip spoiler for F30/F32 M Sport bumpers. OEM fitment with aggressive look." },

  // --- BRAKES ---
  { id: "f8", name: "StopTech Sport Brake Pads — F80 M3",       price: 189,   sale_price: null,  category: "brakes",       brand_compatibility: ["BMW"], model_compatibility: "F80 M3 · F82 M4",                  in_stock: true,  featured: false, part_number: "STP-309-F8X",        manufacturer: "StopTech",         image_url: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=600&h=600&fit=crop&q=80",  description: "Street/track compound brake pads for F8X. Low dust, high temp, excellent modulation." },

  // --- WHEELS & TIRES ---
  { id: "f9", name: "Apex EC-7 Wheels 19x9.5 — F30/F80",       price: 1650,  sale_price: null,  category: "wheels_tires", brand_compatibility: ["BMW"], model_compatibility: "F30 · F32 · F80 M3 · F82 M4",      in_stock: true,  featured: false, part_number: "EC7-19X95-GM",       manufacturer: "Apex",             image_url: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?w=600&h=600&fit=crop&q=80",  description: "Flow-formed 19x9.5 +22mm offset wheels for F-chassis. Gunmetal finish. Fitment for stock and widebody." },


  // ============================================================
  // G CHASSIS (G20, G80, G82, G87, G30, etc.)
  // ============================================================

  // --- ENGINE ---
  { id: "g1", name: "Bootmod3 Stage 1 Tune — G20 B58",          price: 599,   sale_price: null,  category: "engine",       brand_compatibility: ["BMW"], model_compatibility: "G20 330i/M340i · G30 540i",        in_stock: true,  featured: true,  part_number: "BM3-B58-S1",         manufacturer: "ProTuning Freaks", image_url: "https://images.unsplash.com/photo-1621963566-99ebb78f4c36?w=600&h=600&fit=crop&q=80",  description: "Remote flash ECU tune for B58 G-chassis. Stage 1 adds ~80whp on 93 octane. OTA updates included." },
  { id: "g2", name: "Pure Stage 1 Turbos — G80 M3 S58",         price: 4500,  sale_price: null,  category: "engine",       brand_compatibility: ["BMW"], model_compatibility: "G80 M3 · G82 M4 · G87 M2",         in_stock: true,  featured: false, part_number: "PURE-S58-STG1",      manufacturer: "Pure Turbos",      image_url: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&h=600&fit=crop&q=80",  description: "Upgraded drop-in turbos for S58 platform. Supports 650+whp with supporting mods. Warranty-friendly." },

  // --- EXHAUST ---
  { id: "g3", name: "VRSF Downpipes — G80 M3 S58",              price: 799,   sale_price: 699,   category: "exhaust",      brand_compatibility: ["BMW"], model_compatibility: "G80 M3 · G82 M4 · G87 M2",         in_stock: true,  featured: false, part_number: "VRSF-DP-S58",        manufacturer: "VRSF",             image_url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&h=600&fit=crop&q=80",  description: "Catless or high-flow cat downpipes for S58. Significant power gains and raw exhaust note." },
  { id: "g4", name: "Akrapovic Slip-On Exhaust — G80 M3",        price: 3600,  sale_price: null,  category: "exhaust",      brand_compatibility: ["BMW"], model_compatibility: "G80 M3 Competition · G82 M4",      in_stock: true,  featured: false, part_number: "AKR-G8X-SO",         manufacturer: "Akrapovic",        image_url: "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?w=600&h=600&fit=crop&q=80",  description: "Titanium slip-on exhaust for G8X. Race-grade sound, 4kg weight savings. No tune required." },

  // --- SUSPENSION ---
  { id: "g5", name: "KW Variant 4 Coilovers — G80 M3 xDrive",   price: 3299,  sale_price: null,  category: "suspension",   brand_compatibility: ["BMW"], model_compatibility: "G80 M3 xDrive · G82 M4 xDrive",    in_stock: true,  featured: false, part_number: "KW-V4-G8X",          manufacturer: "KW Suspension",    image_url: "https://images.unsplash.com/photo-1558618047-f4e60cde054e?w=600&h=600&fit=crop&q=80",  description: "4-way adjustable coilovers for G8X xDrive. Works with factory active suspension system." },
  { id: "g6", name: "H&R Sport Springs — G20 330i/M340i",        price: 299,   sale_price: 269,   category: "suspension",   brand_compatibility: ["BMW"], model_compatibility: "G20 330i · M340i",                 in_stock: true,  featured: false, part_number: "HR-SPR-G20",         manufacturer: "H&R",              image_url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=600&fit=crop&q=80",  description: "Lowering springs for G20. Drops ~25mm front and rear. Retains factory shock absorbers." },

  // --- INTAKE ---
  { id: "g7", name: "Eventuri Carbon Intake — G80 M3 S58",       price: 1299,  sale_price: null,  category: "intake",       brand_compatibility: ["BMW"], model_compatibility: "G80 M3 · G82 M4 · G87 M2",         in_stock: true,  featured: false, part_number: "EVN-S58-INT",        manufacturer: "Eventuri",         image_url: "https://images.unsplash.com/photo-1635591222813-98e55e748d2e?w=600&h=600&fit=crop&q=80",  description: "Full carbon fiber intake system for S58. Dramatically improves induction sound and airflow." },
  { id: "g8", name: "BMS Intake — G20 B58 M340i/340i",           price: 329,   sale_price: null,  category: "intake",       brand_compatibility: ["BMW"], model_compatibility: "G20 M340i · G30 M550i",            in_stock: true,  featured: false, part_number: "BMS-B58-INT",        manufacturer: "BMS",              image_url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=600&fit=crop&q=80",  description: "Dual cone high-flow intake for B58 G-chassis. Easy plug-and-play install, improved throttle response." },

  // --- EXTERIOR ---
  { id: "g9", name: "M Performance Carbon Trunk Spoiler — G80",  price: 699,   sale_price: null,  category: "exterior",     brand_compatibility: ["BMW"], model_compatibility: "G80 M3",                           in_stock: true,  featured: false, part_number: "BMW-M-TRNK-G80",     manufacturer: "BMW M Performance",image_url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=600&fit=crop&q=80",  description: "Genuine OEM M Performance carbon fiber trunk spoiler for G80 M3. Adds downforce and aggressive styling." },

  // --- BRAKES ---
  { id: "g10",name: "Brembo GT-R Big Brake Kit — G80 M3",        price: 4299,  sale_price: null,  category: "brakes",       brand_compatibility: ["BMW"], model_compatibility: "G80 M3 · G82 M4",                  in_stock: true,  featured: false, part_number: "BRB-GTR-G8X",        manufacturer: "Brembo",           image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop&q=80",  description: "6-piston front big brake kit for G8X. 405mm rotors. Full race-spec stopping power." },

  // --- WHEELS & TIRES ---
  { id: "g11",name: "Apex SM-10RS Wheels 19x10 — G80/G82",       price: 2100,  sale_price: null,  category: "wheels_tires", brand_compatibility: ["BMW"], model_compatibility: "G80 M3 · G82 M4 · G87 M2",         in_stock: true,  featured: false, part_number: "SM10RS-19X10-SB",    manufacturer: "Apex",             image_url: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?w=600&h=600&fit=crop&q=80",  description: "Forged monoblock SM-10RS for G-chassis. Ultra-lightweight, track-focused. Center-lock aesthetic." },

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