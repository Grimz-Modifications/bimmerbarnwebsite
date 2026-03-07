import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";

const categories = [
  { key: "all", label: "All Categories" },
  { key: "engine", label: "Engine" },
  { key: "suspension", label: "Suspension" },
  { key: "exhaust", label: "Exhaust" },
  { key: "intake", label: "Intake" },
  { key: "brakes", label: "Brakes" },
  { key: "exterior", label: "Exterior" },
  { key: "interior", label: "Interior" },
  { key: "wheels_tires", label: "Wheels & Tires" },
  { key: "lighting", label: "Lighting" },
  { key: "electronics", label: "Electronics" },
];

const brands = [
  { key: "all", label: "All Brands" },
  { key: "BMW", label: "BMW" },
  { key: "Audi", label: "Audi" },
  { key: "VW", label: "Volkswagen" },
  { key: "Porsche", label: "Porsche" },
  { key: "Mercedes", label: "Mercedes" },
];

export default function ShopFilters({ filters, onFilterChange }) {
  const hasActiveFilters = filters.category !== "all" || filters.brand !== "all" || filters.search;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <Input
          placeholder="Search parts, part numbers..."
          value={filters.search || ""}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="pl-11 bg-zinc-900/60 border-zinc-800 text-white placeholder:text-zinc-500 rounded-xl h-12 focus:border-blue-500 focus:ring-blue-500/20"
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
        </div>

        <Select value={filters.category} onValueChange={(val) => onFilterChange({ ...filters, category: val })}>
          <SelectTrigger className="w-44 bg-zinc-900/60 border-zinc-800 text-zinc-300 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            {categories.map(c => (
              <SelectItem key={c.key} value={c.key} className="text-zinc-300 focus:bg-zinc-800 focus:text-white">{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.brand} onValueChange={(val) => onFilterChange({ ...filters, brand: val })}>
          <SelectTrigger className="w-44 bg-zinc-900/60 border-zinc-800 text-zinc-300 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            {brands.map(b => (
              <SelectItem key={b.key} value={b.key} className="text-zinc-300 focus:bg-zinc-800 focus:text-white">{b.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange({ category: "all", brand: "all", search: "" })}
            className="text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4 mr-1" /> Clear
          </Button>
        )}
      </div>
    </div>
  );
}