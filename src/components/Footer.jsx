import React from 'react';
import { BRAND, ZOMATO_URL, SWIGGY_URL, getWhatsAppEnquiryUrl } from '../config/brand';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer id="contact" className="relative bg-brand-black text-brand-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Studio Location */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-white font-black text-xs">
                S
              </span>
              <span className="font-display text-lg font-black tracking-wider uppercase text-white">
                MR. SALAD
              </span>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3 font-semibold">
              The Diet Studio
            </p>
            <p className="text-xs text-white/70 leading-relaxed">
              Wholesome salads, superfood smoothie bowls, and clean meals prepared without deep frying.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/60">
              <strong className="text-white block">STUDIO LOCATION</strong>
              {BRAND.addressLine1}, {BRAND.city}
              <div className="mt-1">
                <a
                  href={BRAND.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green hover:underline text-[11px] inline-flex items-center gap-1 font-semibold"
                >
                  View on Google Maps ↗
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              CONTACT
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <a
                  href={`https://wa.me/${BRAND.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  WhatsApp: <strong>{BRAND.whatsappDisplay}</strong> ↗
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Phone: <strong>{BRAND.phone}</strong>
                </a>
              </li>
              <li>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Instagram: <strong>@{BRAND.instagramHandle}</strong> ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Food Order External Links */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              ORDER INDIVIDUAL MEALS
            </h4>
            <p className="text-[11px] text-white/50 mb-3">
              One-off food orders are delivered via partner apps:
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={ZOMATO_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E23744]" />
                  Order on Zomato ↗
                </a>
              </li>
              <li>
                <a
                  href={SWIGGY_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#FC8019]" />
                  Order on Swiggy ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Subscriptions */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              WELLNESS SUBSCRIPTIONS
            </h4>
            <p className="text-[11px] text-white/50 mb-3">
              Enquire directly for the 26-Day plan or weekly meal subscriptions:
            </p>
            <div className="space-y-2.5">
              <button
                onClick={() => scrollTo('subscription')}
                className="w-full text-left py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/90 border border-white/10 transition-colors"
              >
                View 26-Day Schedule ↓
              </button>
              <a
                href={getWhatsAppEnquiryUrl('subscription')}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2.5 px-4 rounded-xl bg-brand-green hover:bg-brand-green/80 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                Subscribe / Enquire ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Mr. Salad — The Diet Studio. All rights reserved.</p>
          <p className="text-[11px]">
            Zero direct online ordering on website · Powered by Zomato, Swiggy & WhatsApp Concierge
          </p>
        </div>
      </div>
    </footer>
  );
}
