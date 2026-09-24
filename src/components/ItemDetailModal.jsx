import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZOMATO_URL, SWIGGY_URL } from '../config/brand';

const VegDot = ({ isVeg }) => (
  <span className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-brand-black/60">
    <span className={`w-2.5 h-2.5 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
    {isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
  </span>
);

const NutritionStat = ({ value, unit, label }) => {
  if (value == null) return null;
  return (
    <div className="flex flex-col items-center gap-0.5 bg-brand-cream rounded-2xl px-4 py-3 min-w-[72px] border border-brand-black/5">
      <div className="font-display text-2xl font-black text-brand-black leading-none">
        {value}
      </div>
      <div className="text-[9px] font-bold tracking-widest uppercase text-brand-black/40">
        {unit}
      </div>
      <div className="text-[9px] tracking-widest uppercase text-brand-black/30 mt-0.5">
        {label}
      </div>
    </div>
  );
};

const ItemDetailModal = ({ item, addOns = [], onClose }) => {
  // Close on ESC
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const hasNutrition = item.cal != null || item.protein != null || item.fat != null || item.carb != null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
        onClick={onClose}
      >
        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.32, 0, 0.67, 0] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-brand-white rounded-t-3xl md:rounded-3xl w-full md:max-w-lg overflow-y-auto max-h-[92svh] border border-brand-black/10 shadow-2xl"
        >
          {/* Image */}
          <div className="relative w-full aspect-[4/3] bg-brand-cream overflow-hidden rounded-t-3xl">
            <img
              src={`/images/${item.image}`}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.classList.add('bg-brand-black/5');
              }}
            />
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close item detail"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-6 pt-6 pb-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 className="font-display text-2xl md:text-3xl font-black text-brand-black tracking-tight leading-tight">
                {item.name}
              </h2>
              <span className="font-display text-2xl md:text-3xl font-black text-brand-black shrink-0">
                ₹{item.price}
              </span>
            </div>

            {/* Description */}
            {item.description && (
              <p className="text-sm text-brand-black/60 mb-3 leading-relaxed">
                {item.description}
              </p>
            )}

            <div className="mb-4">
              <VegDot isVeg={item.veg} />
            </div>

            {/* Nutrition Breakdown (only non-nulls) */}
            {hasNutrition && (
              <>
                <div className="h-px bg-brand-black/10 my-4" />
                <p className="text-[10px] tracking-widest uppercase font-bold text-brand-black/40 mb-3">
                  Nutrition Information
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <NutritionStat value={item.cal} unit="Kcal" label="Calories" />
                  <NutritionStat value={item.protein != null ? `${item.protein}g` : null} unit="Protein" label="Protein" />
                  <NutritionStat value={item.fat != null ? `${item.fat}g` : null} unit="Fat" label="Fat" />
                  <NutritionStat value={item.carb != null ? `${item.carb}g` : null} unit="Carbs" label="Carbs" />
                </div>
              </>
            )}

            {/* Add-ons (Bowls, informational) */}
            {addOns && addOns.length > 0 && (
              <>
                <div className="h-px bg-brand-black/10 my-4" />
                <p className="text-[10px] tracking-widest uppercase font-bold text-brand-black/40 mb-3">
                  Available Add-ons (Informational)
                </p>
                <ul className="flex flex-col gap-2 mb-4">
                  {addOns.map((ao) => (
                    <li key={ao.name} className="flex items-center justify-between text-sm text-brand-black/70">
                      <span>{ao.name}</span>
                      <span className="font-semibold text-brand-black">+₹{ao.price}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* External Ordering (Zomato & Swiggy) */}
            <div className="h-px bg-brand-black/10 my-5" />
            <p className="text-xs text-brand-black/50 mb-3">
              We do not take direct online orders on this website. Place your order via our delivery partners:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={ZOMATO_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-[#E23744] text-white hover:opacity-90 transition-opacity shadow-xs"
              >
                Order on Zomato <span className="opacity-70 leading-none">↗</span>
              </a>
              <a
                href={SWIGGY_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-[#FC8019] text-white hover:opacity-90 transition-opacity shadow-xs"
              >
                Order on Swiggy <span className="opacity-70 leading-none">↗</span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ItemDetailModal;
