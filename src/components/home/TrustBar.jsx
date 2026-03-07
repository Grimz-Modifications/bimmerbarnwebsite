import React from "react";
import { Star, Tag, Truck, MessageCircle } from "lucide-react";

const items = [
  { icon: Star, title: "RATED 4.5 STARS", sub: "HUNDREDS OF POSITIVE REVIEWS" },
  { icon: Tag, title: "PRICE MATCH GUARANTEE", sub: "WE STRIVE TO OUTPERFORM ANY COMPETITOR'S PRICE" },
  { icon: Truck, title: "FAST SHIPPING", sub: "WE DELIVER WORLDWIDE" },
  { icon: MessageCircle, title: "EXPERT ADVICE", sub: "CONTACT US IF YOU NEED ANY HELP" },
];

export default function TrustBar() {
  return (
    <div className="bg-neutral-950 border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-800">
          {items.map((item) => (
            <div key={item.title} className="flex items-center gap-3 px-6 py-5">
              <item.icon className="w-7 h-7 text-neutral-500 flex-shrink-0" />
              <div>
                <p className="text-white text-xs font-bold tracking-wide">{item.title}</p>
                <p className="text-neutral-500 text-[10px] mt-0.5 leading-tight">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}