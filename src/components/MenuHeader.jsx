import React from 'react';
import { ZOMATO_URL, SWIGGY_URL } from '../config/brand';

const MenuHeader = () => (
  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 py-8 md:py-12">
    {/* Left: title block */}
    <div>
      <p className="font-sans text-[11px] tracking-[0.28em] font-semibold uppercase text-brand-black/40 mb-2">
        The Diet Studio
      </p>
      <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-brand-black leading-[0.95]">
        THE MENU
      </h1>
      <p className="mt-2.5 text-sm md:text-base text-brand-black/50 font-sans">
        Know what you're eating.
      </p>
    </div>

    {/* Right: order buttons */}
    <div className="flex items-center gap-2 shrink-0">
      <span className="text-[11px] font-semibold tracking-widest uppercase text-brand-black/35 mr-1">
        Order on:
      </span>
      <a
        href={ZOMATO_URL || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase text-white transition-opacity hover:opacity-85"
        style={{ backgroundColor: '#E23744' }}
      >
        Zomato <span className="text-white/70 text-sm leading-none">↗</span>
      </a>
      <a
        href={SWIGGY_URL || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase text-white transition-opacity hover:opacity-85"
        style={{ backgroundColor: '#FC8019' }}
      >
        Swiggy <span className="text-white/70 text-sm leading-none">↗</span>
      </a>
    </div>
  </div>
);

export default MenuHeader;
