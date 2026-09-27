import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import categories, { CREATE_YOUR_SALAD_DATA } from '../data/categories';
import MenuCard from '../components/MenuCard';
import ItemDetailModal from '../components/ItemDetailModal';
import { ZOMATO_URL, SWIGGY_URL, getWhatsAppEnquiryUrl } from '../config/brand';
import menuData from '../data/menu.json';

export default function FullMenuSection() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState('salads');
  const [search, setSearch] = useState('');

  // All nav items including regular categories + Create Your Salad
  const navItems = useMemo(() => [
    ...categories.map((c) => ({ id: c.id, name: c.name })),
    { id: CREATE_YOUR_SALAD_DATA.id, name: CREATE_YOUR_SALAD_DATA.name },
  ], []);

  // IntersectionObserver to highlight active category in sticky nav
  useEffect(() => {
    const sectionIds = navItems.map((n) => `menu-cat-${n.id}`);
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveCategory(id.replace('menu-cat-', ''));
          }
        },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [navItems]);

  const scrollToCategory = (id) => {
    setActiveCategory(id);
    const el = document.getElementById(`menu-cat-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filterItems = (items) => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    );
  };

  return (
    <section id="menu" className="relative bg-brand-cream text-brand-black pt-16 md:pt-24 pb-20">
      {/* ── SECTION HEADER ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-black/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-green font-semibold">
              The Diet Studio
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] text-brand-black mt-2 uppercase">
              THE MENU
            </h2>
            <p className="mt-3 text-base sm:text-lg text-brand-black/60 font-medium">
              Know what you&apos;re eating.
            </p>
          </div>

          {/* Quick External Order Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-brand-black/40 uppercase tracking-wider hidden lg:inline">
              Order on:
            </span>
            <a
              href={ZOMATO_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#E23744] text-white hover:opacity-90 transition-opacity shadow-xs"
            >
              Zomato <span className="opacity-70 leading-none">↗</span>
            </a>
            <a
              href={SWIGGY_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#FC8019] text-white hover:opacity-90 transition-opacity shadow-xs"
            >
              Swiggy <span className="opacity-70 leading-none">↗</span>
            </a>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 max-w-md">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search salad, bowl, snack..."
              className="w-full bg-brand-white border border-brand-black/15 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-brand-green transition-colors text-brand-black placeholder:text-brand-black/35 shadow-xs"
            />
            <svg
              className="w-4 h-4 text-brand-black/35 absolute left-3.5 top-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-3 text-xs text-brand-black/40 hover:text-brand-black"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── STICKY CATEGORY NAVIGATION ── */}
      <div className="sticky top-0 z-30 bg-brand-cream/95 backdrop-blur-md border-y border-brand-black/10 py-1 shadow-xs">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center overflow-x-auto no-scrollbar gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToCategory(item.id)}
                  className={`relative px-3 sm:px-4 py-3 text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-colors duration-200 rounded-lg ${
                    isActive
                      ? 'text-brand-green bg-brand-green/10'
                      : 'text-brand-black/50 hover:text-brand-black hover:bg-brand-black/5'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryPill"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-brand-green rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CATEGORY SECTIONS ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mt-12 space-y-20">
        {categories.map((category) => {
          const categoryFilteredItems = filterItems(category.items);

          return (
            <div
              key={category.id}
              id={`menu-cat-${category.id}`}
              className="scroll-mt-24"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 mb-8 border-b border-brand-black/10">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs font-bold text-brand-green tracking-wider">
                    {category.number}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-brand-black uppercase">
                    {category.name}
                  </h3>
                </div>
                <div className="text-xs text-brand-black/50 font-medium">
                  {category.tagline} · {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
                </div>
              </div>

              {/* Items Grid */}
              {categoryFilteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryFilteredItems.map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      onOpen={(it) => setSelectedItem(it)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-brand-white rounded-2xl p-8 border border-brand-black/5 text-center">
                  <p className="text-sm text-brand-black/50">
                    {search ? `No items found matching "${search}" in ${category.name}.` : 'Items coming soon in this collection.'}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* ── CREATE YOUR SALAD SUBSECTION ── */}
        <div
          id={`menu-cat-${CREATE_YOUR_SALAD_DATA.id}`}
          className="scroll-mt-24 pt-4"
        >
          <div className="bg-brand-white rounded-3xl border border-brand-black/12 p-6 sm:p-8 lg:p-12 shadow-sm">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-black/10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs font-bold text-brand-green tracking-wider">
                    {CREATE_YOUR_SALAD_DATA.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold uppercase tracking-wider">
                    Studio Experience
                  </span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-brand-black uppercase">
                  {CREATE_YOUR_SALAD_DATA.name}
                </h3>
                <p className="mt-2 text-base text-brand-black/70 font-medium max-w-xl">
                  {CREATE_YOUR_SALAD_DATA.subtitle}
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <span className="text-[11px] font-mono text-brand-black/40 uppercase">
                  Studio Reference Price
                </span>
                <span className="font-display text-2xl sm:text-3xl font-black text-brand-black">
                  Starting @ ₹{CREATE_YOUR_SALAD_DATA.base.price}
                </span>
                <span className="text-[10px] text-brand-black/40 italic mt-0.5">
                  Confirm current rates upon enquiry
                </span>
              </div>
            </div>

            {/* 3 Step Visual Experience */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* STEP 1: BASE */}
              <div className="bg-brand-cream/60 rounded-2xl p-5 border border-brand-black/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-brand-green uppercase">
                      STEP 01
                    </span>
                    <span className="text-xs font-bold text-brand-black">
                      ₹{CREATE_YOUR_SALAD_DATA.base.price}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-brand-black mb-1">
                    Fresh Salad Base
                  </h4>
                  <p className="text-xs text-brand-black/60 leading-relaxed mb-4">
                    Crisp assorted salad leaves, shredded carrots, and seasonal house dressing base.
                  </p>
                </div>
                <div className="pt-3 border-t border-brand-black/5 text-[11px] text-brand-black/40">
                  Included in starting price
                </div>
              </div>

              {/* STEP 2: PROTEINS */}
              <div className="bg-brand-cream/60 rounded-2xl p-5 border border-brand-black/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-brand-green uppercase">
                      STEP 02: PROTEIN
                    </span>
                    <span className="text-xs font-bold text-brand-black">
                      +₹{CREATE_YOUR_SALAD_DATA.proteins.price}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-brand-black mb-1">
                    Choose Your Protein
                  </h4>
                  <p className="text-xs text-brand-black/60 leading-relaxed mb-3">
                    Select your clean protein booster:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {CREATE_YOUR_SALAD_DATA.proteins.items.map((p) => (
                      <span
                        key={p.name}
                        className="px-2 py-1 rounded-md bg-brand-white border border-brand-black/8 text-[11px] font-semibold text-brand-black/80"
                      >
                        {p.name} {p.nonVeg && <span className="text-red-500 font-bold">•</span>}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-brand-black/5 text-[11px] text-brand-black/40 mt-3">
                  High-protein whole food options
                </div>
              </div>

              {/* STEP 3: VEGGIES */}
              <div className="bg-brand-cream/60 rounded-2xl p-5 border border-brand-black/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-brand-green uppercase">
                      STEP 03: VEGGIES
                    </span>
                    <span className="text-xs font-bold text-brand-black">
                      +₹{CREATE_YOUR_SALAD_DATA.veggies.price}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-brand-black mb-1">
                    Add Crunchy Veggies
                  </h4>
                  <p className="text-xs text-brand-black/60 leading-relaxed mb-3">
                    Mix and match garden-fresh vegetables:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {CREATE_YOUR_SALAD_DATA.veggies.items.map((veg) => (
                      <span
                        key={veg}
                        className="px-2 py-1 rounded-md bg-brand-white border border-brand-black/8 text-[11px] font-semibold text-brand-black/80"
                      >
                        {veg}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-brand-black/5 text-[11px] text-brand-black/40 mt-3">
                  Washed & freshly prepped daily
                </div>
              </div>
            </div>

            {/* Informational Callout — No Cart, External Contact */}
            <div className="mt-8 pt-6 border-t border-brand-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-brand-black/60 max-w-xl text-center sm:text-left">
                Custom salad boxes can be customized for group diets, corporate wellness, or special orders. Chat directly with the Mr. Salad team.
              </p>
              <a
                href={getWhatsAppEnquiryUrl('custom_salad')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-green text-white hover:bg-brand-dark transition-colors shadow-xs whitespace-nowrap"
              >
                Enquire via WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── DETAIL MODAL ── */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          addOns={selectedItem.category === 'Bowls' ? menuData.addOns : []}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
}
