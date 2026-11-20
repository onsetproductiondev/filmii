"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Send, X } from "lucide-react";
import { useSound } from "@/components/fx/SoundProvider";

interface EquipmentRequestModalProps {
  open: boolean;
  kit: string | null; // e.g. "CAMERAS" – pre-fills the "gear needed" field
  onClose: () => void;
}

const fieldClass =
  "w-full py-3 bg-transparent border-b border-neutral-700 rounded-none text-white font-sans text-sm placeholder-neutral-500 focus:outline-none focus:border-[#E50914] px-0 transition-colors";
const labelClass = "block text-neutral-300 text-xs uppercase tracking-wider font-semibold";

export default function EquipmentRequestModal({ open, kit, onClose }: EquipmentRequestModalProps) {
  // The dialog only exists while open, so its form starts fresh (and pre-filled) every time
  return <AnimatePresence>{open && <RequestDialog kit={kit} onClose={onClose} />}</AnimatePresence>;
}

function RequestDialog({ kit, onClose }: { kit: string | null; onClose: () => void }) {
  const { playHoverSound, playShutterSound } = useSound();
  const [form, setForm] = useState({ name: "", phone: "", email: "", gear: kit ?? "", dates: "", details: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock page scroll while open + close on Escape
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playShutterSound();
    setIsSubmitting(true);
    // TODO: connect to your real backend / email service here
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end md:items-center justify-center md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Equipment request form"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.9 }}
        className="relative z-10 w-full md:max-w-xl max-h-[92dvh] overflow-y-auto overscroll-contain bg-[#0A0A0A] border border-white/10 rounded-t-3xl md:rounded-2xl p-6 sm:p-8 shadow-[0_0_80px_rgba(229,9,20,0.15)]"
      >
        <button
          type="button"
          onClick={() => {
            playHoverSound();
            onClose();
          }}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 border border-white/15 text-white hover:text-[#E50914] hover:border-[#E50914]/50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#E50914] text-white mx-auto flex items-center justify-center">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-display text-4xl text-white uppercase tracking-wider">REQUEST SENT</h3>
            <p className="text-neutral-300 font-sans text-sm max-w-sm mx-auto font-light leading-relaxed">
              Thanks! Our team will get back to you shortly with availability and rental rates.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white font-sans font-semibold text-xs uppercase tracking-wider"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 font-sans text-sm">
            <div className="pr-10">
              <span className="text-[11px] font-mono text-[#E50914] uppercase tracking-[0.2em] font-semibold block mb-1">
                EQUIPMENT / REQUEST
              </span>
              <h3 className="font-display text-3xl sm:text-4xl tracking-wider text-white uppercase leading-none">
                REQUEST EQUIPMENT
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label htmlFor="eq-name" className={labelClass}>YOUR NAME *</label>
                <input id="eq-name" required type="text" placeholder="Your name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldClass} />
              </div>
              <div className="space-y-1">
                <label htmlFor="eq-phone" className={labelClass}>PHONE / WHATSAPP *</label>
                <input id="eq-phone" required type="tel" placeholder="+91 98765 43210" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} className={fieldClass} />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="eq-email" className={labelClass}>EMAIL ADDRESS *</label>
              <input id="eq-email" required type="email" placeholder="you@example.com" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} className={fieldClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label htmlFor="eq-gear" className={labelClass}>GEAR NEEDED</label>
                <input id="eq-gear" type="text" placeholder="e.g. ARRI Alexa Mini LF + Cooke S4" value={form.gear}
                  onChange={(e) => setForm({ ...form, gear: e.target.value })} className={fieldClass} />
              </div>
              <div className="space-y-1">
                <label htmlFor="eq-dates" className={labelClass}>RENTAL DATES</label>
                <input id="eq-dates" type="text" placeholder="e.g. 12 – 15 Dec" value={form.dates}
                  onChange={(e) => setForm({ ...form, dates: e.target.value })} className={fieldClass} />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="eq-details" className={labelClass}>PROJECT DETAILS</label>
              <textarea id="eq-details" rows={3} placeholder="Tell us what you're shooting, location, crew size..."
                value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })}
                className={`${fieldClass} resize-none`} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={playHoverSound}
              className="w-full py-4 px-8 rounded-full bg-[#E50914] hover:bg-red-700 disabled:opacity-60 text-white font-mono text-[13px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              {isSubmitting ? <span>SENDING...</span> : (<><span>SEND REQUEST</span><Send className="w-4 h-4" /></>)}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}