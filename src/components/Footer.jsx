import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BRAND, ZOMATO_URL, SWIGGY_URL, getWhatsAppEnquiryUrl } from '../config/brand';

export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(''); }
  };

  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="flex flex-col border-t border-brand-black/8 bg-brand-white"
    >

      {/* ── NEWSLETTER STRIP ──────────────────────────────── */}
      <div className="bg-brand-cream border-b border-brand-black/8 py-4 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <p className="text-sm text-brand-black font-medium tracking-tight">
            Get the latest in your inbox
          </p>
          <span className="hidden sm:block w-px h-4 bg-brand-black/12" />
          <p className="text-sm text-brand-black/40 hidden sm:block">
            New menus, seasonal drops &amp; wellness tips.
          </p>
          {subscribed ? (
            <span className="text-xs font-sans font-bold text-brand-green tracking-widest uppercase">
              ✓ You're in!
            </span>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="text-sm px-4 py-1.5 rounded-full border border-brand-black/15 bg-brand-white text-brand-black placeholder:text-brand-black/30 focus:outline-none focus:border-brand-green/50 w-44 sm:w-52 transition-colors"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full border border-brand-black/20 text-brand-black hover:bg-brand-black hover:text-white transition-all duration-200"
              >
                Subscribe <span className="text-[10px]">↗</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── MAIN LINK GRID ────────────────────────────────── */}
      {/* Sits at the TOP of the card body, then flex-1 pushes  */}
      {/* the copyright bar to the very bottom.                 */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 pt-10 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">

          {/* Col 1 — Brand tagline */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/images/logo.jpg"
                alt="Mr. Salad Logo"
                className="w-10 h-10 rounded-full object-cover shadow-sm border border-brand-black/10 flex-shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-brand-black leading-snug">
                  Mr. Salad
                </p>
                <p className="text-xs text-brand-green font-medium">
                  The Diet Studio
                </p>
              </div>
            </div>
            <p className="text-xs text-brand-black/40 leading-relaxed max-w-[26ch]">
              Wholesome salads, superfood bowls &amp; clean meals.
              Zero deep-frying. Delivered fresh daily.
            </p>
            <p className="mt-4 text-[10px] font-sans uppercase tracking-[0.18em] text-brand-black/25">
              Bajaj Nagar, Nagpur
            </p>
          </div>

          {/* Col 2 — Explore */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-black/30 font-sans mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-black/55">
              <li>
                <button onClick={() => navigate('/menu')} className="hover:text-brand-green transition-colors text-left">
                  Menu
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('subscription')} className="hover:text-brand-green transition-colors text-left">
                  26-Day Plan
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('how-it-works')} className="hover:text-brand-green transition-colors text-left">
                  How It Works
                </button>
              </li>
              <li>
                <a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
                  Find Us ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 — Order */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-black/30 font-sans mb-4">
              Order
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-black/55">
              <li>
                <a href={ZOMATO_URL || '#'} target="_blank" rel="noopener noreferrer"
                   className="hover:text-brand-green transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E23744] flex-shrink-0" />
                  Zomato ↗
                </a>
              </li>
              <li>
                <a href={SWIGGY_URL || '#'} target="_blank" rel="noopener noreferrer"
                   className="hover:text-brand-green transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FC8019] flex-shrink-0" />
                  Swiggy ↗
                </a>
              </li>
              <li>
                <a href={getWhatsAppEnquiryUrl('subscription')} target="_blank" rel="noopener noreferrer"
                   className="hover:text-brand-green transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                  Subscribe / Enquire ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-black/30 font-sans mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-black/55">
              <li>
                <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
                  Instagram ↗
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${BRAND.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
                  WhatsApp ↗
                </a>
              </li>
              <li>
                <a href={`tel:${BRAND.phone}`} className="hover:text-brand-green transition-colors">
                  {BRAND.phone}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── COPYRIGHT BAR ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 py-5 border-t border-brand-black/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-brand-black/40 font-sans">
        <span>© {year} Mr. Salad — The Diet Studio</span>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span>Nagpur, Maharashtra</span>
          <span className="w-px h-3 bg-brand-black/12" />
          <span>Zero deep-frying</span>
          <span className="w-px h-3 bg-brand-black/12" />
          <span>Made with <span className="text-red-500">♥</span> by Harshal</span>
        </div>
      </div>

    </footer>
  );
}
