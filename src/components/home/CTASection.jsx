import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Phone, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-zinc-950 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-blue-900/10 to-zinc-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),transparent_60%)]" />
          
          <div className="relative p-10 sm:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Need Help Finding the Right Parts?
            </h2>
            <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-lg">
              Our Euro specialists are here to help you build the perfect setup for your ride. 
              Get expert advice and custom quotes.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to={createPageUrl("Contact")}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-13 text-base font-semibold">
                  <Mail className="mr-2 w-5 h-5" />
                  Contact Us
                </Button>
              </Link>
              <a href="tel:+15551234567">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-13 text-base font-semibold border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                  <Phone className="mr-2 w-5 h-5" />
                  (555) 123-4567
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}