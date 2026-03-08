import React, { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES, BRANDS } from "../components/data";
import ProductCard from "../components/shop/ProductCard";
import { Search, ChevronDown } from "lucide-react";

export default function Shop() {
  const urlParams = new URLSearchParams(window.location.search);

  const [filters, setFilters] = useState({
    category: urlParams.get("category") || "all",
    brand: urlParams.get("brand") || "All",
    search: urlParams.get("search") || "",
    sale: urlParams.get("sale") === "true",
    chassis: urlParams.get("chassis") || "",
  });
  const [sortBy, setSortBy] = useState("newest");

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (filters.category !== "all") list = list.filter((p) => p.category === filters.category);
    if (filters.brand !== "All") list = list.filter((p) => p.brand_compatibility?.includes(filters.brand));
    if (filters.sale) list = list.filter((p) => p.sale_price && p.sale_price < p.price);
    if (filters.chassis) list = list.filter((p) => p.model_compatibility?.toUpperCase().includes(filters.chassis.toUpperCase()));
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((p) =>
        `${p.name} ${p.description || ""} ${p.part_number || ""} ${p.manufacturer || ""} ${p.model_compatibility || ""}`.toLowerCase().includes(q)
      );
    }
    if (sortBy === "price_asc") list.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price));
    if (sortBy === "price_desc") list.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price));
    return list;
  }, [filters, sortBy]);

  return (
    <div className="bg-black min-h-screen">
      {/* Page Header */}
      <div className="bg-neutral-950 border-b border-neutral-800 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-black tracking-widest uppercase text-white">
            {filters.sale ? "BLOW OUT SALE" : filters.brand !== "All" ? `${filters.brand} PARTS` : filters.category !== "all" ? CATEGORIES.find(c => c.key === filters.category)?.label.toUpperCase() + " PARTS" : "ALL PARTS"}
          </h1>
          <p className="text-neutral-500 text-sm mt-1">{filteredProducts.length} products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search parts..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-700 text-white text-sm pl-9 pr-4 py-2.5 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-500"
            />
          </div>

          {/* Brand pills */}
          <div className="flex flex-wrap gap-2">
            {BRANDS.map((b) => (
              <button
                key={b}
                onClick={() => setFilters({ ...filters, brand: b })}
                className={`px-3 py-1.5 text-xs font-bold tracking-wider uppercase border transition-colors ${
                  filters.brand === b
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-neutral-400 border-neutral-700 hover:border-neutral-500 hover:text-white"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 text-white text-xs px-4 py-2.5 pr-8 appearance-none focus:outline-none focus:border-neutral-500 cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-500 pointer-events-none" />
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilters({ ...filters, category: cat.key })}
              className={`px-3 py-1.5 text-xs font-bold tracking-wider uppercase border transition-colors ${
                filters.category === cat.key
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-neutral-500 border-neutral-800 hover:border-neutral-600 hover:text-neutral-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <p className="text-neutral-500 text-lg font-bold uppercase tracking-widest">No products found</p>
            <p className="text-neutral-600 text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}