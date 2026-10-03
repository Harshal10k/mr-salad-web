import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import MenuHeader from '../components/MenuHeader';
import MenuCard from '../components/MenuCard';
import MenuSearch from '../components/MenuSearch';
import { categories as categoryData, CREATE_YOUR_SALAD_DATA } from '../data/categories';

// Build a flat list of sections: each category from categories.js + the custom salad section
const ALL_SECTIONS = [
  ...categoryData,
  {
    id: CREATE_YOUR_SALAD_DATA.id,
    number: CREATE_YOUR_SALAD_DATA.number,
    name: CREATE_YOUR_SALAD_DATA.name,
    rawName: 'Create Your Salad',
    tagline: CREATE_YOUR_SALAD_DATA.tagline,
    items: [],
    isCustomSalad: true,
  },
];

function MenuPage() {
  useEffect(() => {
    document.title = 'Mr. Salad — The Menu';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [activeCat, setActiveCat] = useState(
    searchParams.get('cat') || ALL_SECTIONS[0]?.rawName || ''
  );

  // Refs: section id → DOM node
  const sectionRefs = useRef({});
  const isScrollingTo = useRef(false);
  const catNavRef = useRef(null); // sticky category nav
  const tabRefs = useRef({});    // per-tab button nodes

  // The navbar auto-hides on scroll, so the cat-nav pins to top-0.
  // Offset for jump-scrolling = only the sticky cat-nav's own height.
  const getScrollOffset = useCallback(() => {
    return catNavRef.current ? catNavRef.current.offsetHeight : 0;
  }, []);

  // ── SCROLL ACTIVE TAB INTO VIEW ──────────────────────────────
  useEffect(() => {
    const btn = tabRefs.current[activeCat];
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeCat]);

  // ── SCROLL SPY ──────────────────────────────────────────────
  useEffect(() => {
    const observers = [];
    ALL_SECTIONS.forEach((sec) => {
      const el = sectionRefs.current[sec.rawName];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (isScrollingTo.current) return;
          if (entry.isIntersecting) setActiveCat(sec.rawName);
        },
        { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // ── CLICK-TO-SCROLL ──────────────────────────────────────────
  const scrollToSection = useCallback((rawName) => {
    const el = sectionRefs.current[rawName];
    if (!el) return;
    setActiveCat(rawName);
    isScrollingTo.current = true;
    const offset = getScrollOffset();
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    setTimeout(() => { isScrollingTo.current = false; }, 900);
  }, [getScrollOffset]);

  // ── INITIAL SCROLL to ?cat= param ───────────────────────────
  useEffect(() => {
    const cat = searchParams.get('cat');
    if (!cat) return;
    // Find matching section by rawName or menuCat
    const match = ALL_SECTIONS.find(
      (s) => s.rawName === cat || s.menuCat === cat || s.id === cat.toLowerCase()
    );
    if (match) {
      setTimeout(() => scrollToSection(match.rawName), 150);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── FILTER by search (across all sections) ───────────────────
  const searchLower = search.toLowerCase();

  return (
    <main className="min-h-screen bg-brand-cream pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <MenuHeader />

        {/* Search */}
        <div className="mb-0 mt-2">
          <MenuSearch value={search} onChange={setSearch} />
        </div>

        {/* ── STICKY CATEGORY NAV (wrapped for right-fade affordance) ── */}
        <div className="relative sticky top-0 z-20 mt-6">
          <nav
            ref={catNavRef}
            aria-label="Menu categories"
            className="flex items-center gap-0 overflow-x-auto no-scrollbar bg-brand-cream border-b border-brand-black/10 shadow-sm"
          >
            {ALL_SECTIONS.map((sec) => {
              const isActive = activeCat === sec.rawName;
              return (
                <button
                  key={sec.id}
                  ref={(el) => { tabRefs.current[sec.rawName] = el; }}
                  onClick={() => scrollToSection(sec.rawName)}
                  className={`
                    relative shrink-0 px-5 py-3.5 text-[11px] font-bold tracking-[0.16em] uppercase
                    transition-colors duration-200 whitespace-nowrap cursor-pointer
                    ${isActive ? 'text-brand-green' : 'text-brand-black/38 hover:text-brand-black/65'}
                  `}
                >
                  {sec.rawName}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-green rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right-edge fade: pointer-events-none so it doesn't block taps */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-brand-cream to-transparent"
          />
        </div>

        {/* ── CATEGORY SECTIONS ── */}
        <div className="space-y-20 pt-12 pb-24">
          {ALL_SECTIONS.map((sec) => {
            // Filter items by search
            const items = sec.isCustomSalad
              ? []
              : (sec.items || []).filter(
                  (i) => !searchLower || i.name.toLowerCase().includes(searchLower)
                );

            // Hide section if search active and no items (except custom salad)
            if (searchLower && !sec.isCustomSalad && items.length === 0) return null;

            return (
              <section
                key={sec.id}
                ref={(el) => { sectionRefs.current[sec.rawName] = el; }}
                id={`section-${sec.id}`}
              >
                {/* Section heading */}
                <div className="flex items-baseline justify-between mb-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-sans text-xs text-brand-black/25 font-semibold tabular-nums">
                      {sec.number}
                    </span>
                    <h2 className="font-display text-3xl md:text-[2.4rem] font-black tracking-tight text-brand-black uppercase leading-none">
                      {sec.name}
                    </h2>
                  </div>
                  <span className="hidden sm:block text-[11px] text-brand-black/30 font-sans tracking-wide italic">
                    {sec.tagline}
                  </span>
                </div>

                {/* Custom salad builder panel */}
                {sec.isCustomSalad ? (
                  <CustomSaladPanel />
                ) : items.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                    {items.map((item) => (
                      <MenuCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-brand-black/30 py-8">No items in this category.</p>
                )}
              </section>
            );
          })}
        </div>

      </div>
    </main>
  );
}

// ── CREATE YOUR SALAD panel ─────────────────────────────────
function CustomSaladPanel() {
  const { base, proteins, veggies, note } = CREATE_YOUR_SALAD_DATA;
  return (
    <div className="rounded-2xl border border-brand-black/8 bg-brand-white p-6 md:p-8 space-y-6">
      <p className="text-sm text-brand-black/50 font-sans max-w-lg">
        Build your own salad — pick a base, choose proteins and veggies. Each addition is priced separately.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Base */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-black/30 mb-3">Base</p>
          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-brand-cream border border-brand-black/8">
            <span className="text-sm font-semibold text-brand-black">{base.name}</span>
            <span className="text-sm font-bold text-brand-green">₹{base.price}</span>
          </div>
        </div>

        {/* Proteins */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-black/30 mb-3">
            Proteins <span className="font-normal text-brand-black/25">+₹{proteins.price} each</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {proteins.items.map((p) => (
              <span key={p.name} className="text-xs px-2.5 py-1 rounded-full bg-brand-cream border border-brand-black/8 text-brand-black/65 font-medium">
                {p.name}
              </span>
            ))}
          </div>
        </div>

        {/* Veggies */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-black/30 mb-3">
            Veggies <span className="font-normal text-brand-black/25">+₹{veggies.price} each</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {veggies.items.map((v) => (
              <span key={v} className="text-xs px-2.5 py-1 rounded-full bg-brand-cream border border-brand-black/8 text-brand-black/65 font-medium">
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[11px] text-brand-black/30 italic">{note}</p>
    </div>
  );
}

export default MenuPage;
