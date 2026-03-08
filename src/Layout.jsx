import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { getCart } from "./components/data";
import { ShoppingCart, Search, Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", page: "Home" },
  {
    label: "Shop BMW",
    page: "Shop",
    sub: ["E Series", "F Series", "G Series", "All BMW"],
    subLinks: ["?brand=BMW&chassis=E", "?brand=BMW&chassis=F", "?brand=BMW&chassis=G", "?brand=BMW"],
  },
  {
    label: "Other Brands",
    page: "Shop",
    sub: ["Mercedes", "Audi", "Porsche", "Volkswagen"],
  },
  {
    label: "Performance",
    page: "Shop",
    sub: ["Engine", "Exhaust", "Suspension", "Intake", "Brakes"],
  },
  { label: "Sale", page: "Shop", params: "?sale=true" },
  { label: "About", page: "About" },
  { label: "Contact", page: "Contact" },
];

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [hoveredNav, setHoveredNav] = useState(null);

  const [cartCount, setCartCount] = useState(() =>
    getCart().reduce((sum, item) => sum + (item.quantity || 1), 0)
  );

  useEffect(() => {
    const update = () => {
      setCartCount(getCart().reduce((sum, item) => sum + (item.quantity || 1), 0));
    };
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      window.location.href = createPageUrl("Shop") + `?search=${encodeURIComponent(searchVal)}`;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Announcement Bar */}
      <div className="bg-black border-b border-neutral-800 text-center py-2.5 px-4">
        <p className="text-xs tracking-widest uppercase text-neutral-300 font-medium">
          FREE SHIPPING ON ORDERS OVER $150 · USE CODE <span className="text-white font-bold">BIMMERBARN</span> FOR 5% OFF
        </p>
      </div>

      {/* Header */}
      <header className="bg-black border-b border-neutral-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Search - Desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-xs">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search car parts..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 text-white text-sm pl-9 pr-4 py-2 rounded focus:outline-none focus:border-neutral-500 placeholder:text-neutral-500"
                />
              </form>
            </div>

            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex-shrink-0 flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
              <div className="text-center">
                <span className="text-xl sm:text-2xl font-black tracking-[0.12em] uppercase text-white">
                  BIMMER<span className="text-neutral-400">BARN</span>
                </span>
              </div>
            </Link>

            {/* Right icons */}
            <div className="flex items-center gap-3 flex-1 justify-end">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden text-neutral-400 hover:text-white p-1"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link to={createPageUrl("Cart")} className="relative text-neutral-400 hover:text-white p-1">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-neutral-400 hover:text-white p-1"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          {searchOpen && (
            <div className="md:hidden pb-3">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search car parts..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 text-white text-sm pl-9 pr-4 py-2.5 rounded focus:outline-none focus:border-neutral-500 placeholder:text-neutral-500"
                />
              </form>
            </div>
          )}
        </div>

        {/* Desktop Nav Bar */}
        <div className="hidden md:block border-t border-neutral-800 bg-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <nav className="flex items-center justify-center gap-0">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setHoveredNav(link.label)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <Link
                    to={createPageUrl(link.page) + (link.params || "")}
                    className={`flex items-center gap-1 px-5 py-3.5 text-sm font-medium tracking-wide uppercase transition-colors ${
                      currentPageName === link.page ? "text-white" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {link.sub && <ChevronDown className="w-3 h-3" />}
                  </Link>
                  {link.sub && hoveredNav === link.label && (
                    <div className="absolute top-full left-0 w-52 bg-neutral-950 border border-neutral-800 shadow-2xl z-50">
                      {link.sub.map((item, idx) => (
                        <Link
                          key={item}
                          to={
                            link.subLinks
                              ? createPageUrl("Shop") + link.subLinks[idx]
                              : link.label === "Other Brands"
                              ? createPageUrl("Shop") + `?brand=${item}`
                              : createPageUrl("Shop") + `?category=${item.toLowerCase()}`
                          }
                          className="block px-5 py-3 text-sm text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors border-b border-neutral-800/50 last:border-0"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-neutral-800 bg-black">
            <nav className="max-w-7xl mx-auto px-4 py-2 space-y-0">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={createPageUrl(link.page)}
                  onClick={() => setMobileOpen(false)}
                  className="block px-2 py-3.5 text-sm font-medium uppercase tracking-wide text-neutral-400 hover:text-white border-b border-neutral-800/50 last:border-0 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Page content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 mt-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <p className="text-xl font-black tracking-[0.12em] uppercase text-white mb-4">
                BIMMER<span className="text-neutral-500">BARN</span>
              </p>
              <p className="text-neutral-500 text-sm leading-relaxed">
                BMW performance specialists. OEM, M Performance & aftermarket parts. Other Euro brands coming soon.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-5">Shop</h4>
              <div className="space-y-3">
                <Link to={createPageUrl("Shop") + "?brand=BMW"} className="block text-neutral-300 hover:text-white text-sm transition-colors font-semibold">BMW (Primary)</Link>
                {["Mercedes", "Audi", "Porsche", "Volkswagen"].map((b) => (
                  <Link key={b} to={createPageUrl("Shop") + `?brand=${b}`} className="block text-neutral-500 hover:text-white text-sm transition-colors">
                    {b}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-5">Categories</h4>
              <div className="space-y-3">
                {["Engine", "Exhaust", "Suspension", "Intake", "Brakes", "Wheels & Tires"].map((c) => (
                  <Link key={c} to={createPageUrl("Shop")} className="block text-neutral-500 hover:text-white text-sm transition-colors">
                    {c}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-5">Help</h4>
              <div className="space-y-3">
                <Link to={createPageUrl("About")} className="block text-neutral-500 hover:text-white text-sm transition-colors">About Us</Link>
                <Link to={createPageUrl("Contact")} className="block text-neutral-500 hover:text-white text-sm transition-colors">Contact</Link>
                <p className="text-neutral-500 text-sm">bimmerbarnperformance@gmail.com</p>
                <p className="text-neutral-500 text-sm">(778) 988-4107</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-neutral-600 text-xs">© {new Date().getFullYear()} Bimmer Barn. All rights reserved.</p>
            <p className="text-neutral-600 text-xs">Euro Performance Specialists</p>
          </div>
        </div>
      </footer>
    </div>
  );
}