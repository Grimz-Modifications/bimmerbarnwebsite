import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export default function Contact() {
  const urlParams = new URLSearchParams(window.location.search);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: urlParams.get("subject") || "",
    vehicle_info: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your own form submission (Formspree, EmailJS, etc.)
    // e.g. fetch("https://formspree.io/f/YOUR_ID", { method: "POST", body: JSON.stringify(form) })
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white uppercase tracking-widest">MESSAGE SENT</h2>
          <p className="text-neutral-500 mt-4 leading-relaxed text-sm">
            Thank you for reaching out. Our team will get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  const field = "w-full bg-neutral-900 border border-neutral-700 text-white text-sm px-4 py-3 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600";

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-neutral-950 border-b border-neutral-800 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-black tracking-widest uppercase text-white">GET IN TOUCH</h1>
          <p className="text-neutral-500 text-sm mt-1">Our team of BMW specialists is ready to help</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-white font-black text-lg uppercase tracking-widest mb-6">CONTACT INFO</h2>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "EMAIL", val: "bimmerbarnperformance@gmail.com" },
                  { icon: Phone, label: "PHONE", val: "(778) 988-4107" },
                  { icon: MapPin, label: "LOCATION", val: "Serving enthusiasts nationwide" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 border-b border-neutral-900 pb-6">
                    <item.icon className="w-5 h-5 text-neutral-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-neutral-500 text-[10px] tracking-widest uppercase font-bold">{item.label}</p>
                      <p className="text-white text-sm mt-1">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-neutral-950 border border-neutral-800 p-6">
              <p className="text-neutral-500 text-[10px] tracking-widest uppercase font-bold mb-2">HOURS</p>
              <p className="text-white text-sm">Mon–Fri: 9AM – 6PM MST</p>
              <p className="text-neutral-500 text-sm mt-1">Sat: 10AM – 4PM MST</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-500 text-[10px] tracking-widest uppercase font-bold block mb-2">NAME *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder="Your name" />
                </div>
                <div>
                  <label className="text-neutral-500 text-[10px] tracking-widest uppercase font-bold block mb-2">EMAIL *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} placeholder="you@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-500 text-[10px] tracking-widest uppercase font-bold block mb-2">PHONE</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} placeholder="(000) 000-0000" />
                </div>
                <div>
                  <label className="text-neutral-500 text-[10px] tracking-widest uppercase font-bold block mb-2">VEHICLE</label>
                  <input value={form.vehicle_info} onChange={(e) => setForm({ ...form, vehicle_info: e.target.value })} className={field} placeholder="Year/Make/Model" />
                </div>
              </div>
              <div>
                <label className="text-neutral-500 text-[10px] tracking-widest uppercase font-bold block mb-2">SUBJECT</label>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={field} placeholder="What's this about?" />
              </div>
              <div>
                <label className="text-neutral-500 text-[10px] tracking-widest uppercase font-bold block mb-2">MESSAGE *</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${field} min-h-[140px] resize-none`}
                  placeholder="Tell us about your project or what parts you're looking for..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black text-xs font-black tracking-widest uppercase py-4 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                SEND MESSAGE
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-neutral-600 text-xs text-center">
                Note: Connect a form service (e.g. Formspree) in the handleSubmit function to receive emails.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}