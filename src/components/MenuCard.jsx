import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VegBadge from './VegBadge';

const MenuCard = ({ item }) => {
  const [imgError, setImgError] = useState(false);

  const hasNutrition =
    item.cal != null || item.protein != null || item.fat != null || item.carb != null;

  const imageSrc = item.image
    ? item.image.startsWith('http')
      ? item.image
      : `/images/${item.image}`
    : '';
  const showFallback = imgError || !imageSrc;

  /* ── Shared image tile (mobile: 112×112, desktop: aspect-[4/3] full-width) ── */
  const ImageTile = ({ mobile }) => (
    <div
      className={
        mobile
          ? // horizontal card: fixed square, shrink-0 so it never collapses
            'relative shrink-0 w-28 h-28 rounded-xl overflow-hidden bg-brand-cream'
          : // vertical card: full-width aspect ratio
            'relative aspect-[4/3] w-full overflow-hidden bg-brand-cream'
      }
    >
      {showFallback ? (
        <div className="w-full h-full flex items-center justify-center bg-brand-cream">
          <img
            src="/images/logo.jpg"
            alt="Mr. Salad"
            className="w-10 h-10 rounded-full object-cover border border-brand-green/20 opacity-50"
          />
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.26 }}
      className="group bg-white rounded-xl overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_18px_rgba(0,0,0,0.11)] transition-shadow duration-300"
    >
      {/* ── MOBILE: horizontal row (< sm) ───────────────────────────────────── */}
      <div className="flex sm:hidden items-start gap-3 p-3">
        <ImageTile mobile />

        {/* Right column */}
        <div className="flex flex-col flex-1 min-w-0 gap-1.5">
          {/* Veg badge */}
          <div>
            <VegBadge isVeg={item.veg} />
          </div>

          {/* Name + Price */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-sans text-[13.5px] font-bold text-brand-black leading-snug tracking-tight line-clamp-2">
              {item.name}
            </h3>
            <span className="font-sans text-[13.5px] font-bold text-brand-black shrink-0 leading-snug">
              ₹{item.price}
            </span>
          </div>

          {/* Description — 2-line clamp */}
          {item.description && (
            <p className="text-[11px] text-brand-black/45 leading-relaxed line-clamp-2">
              {item.description}
            </p>
          )}

          {/* Macros */}
          {hasNutrition && (
            <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 text-[10.5px] font-medium leading-relaxed">
              {item.cal != null && (
                <span style={{ color: '#2d6a2d' }}>
                  <strong>{item.cal}</strong> kcal
                </span>
              )}
              {item.protein != null && (
                <span style={{ color: '#2d6a2d' }}>
                  <strong>{item.protein}g</strong> protein
                </span>
              )}
              {item.fat != null && (
                <span style={{ color: '#c2410c' }}>
                  <strong>{item.fat}g</strong> fat
                </span>
              )}
              {item.carb != null && (
                <span style={{ color: '#1d4ed8' }}>
                  <strong>{item.carb}g</strong> carbs
                </span>
              )}
            </div>
          )}

          {/* VIEW / ORDER */}
          <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between mt-auto">
            <span className="text-[10.5px] font-bold tracking-wider uppercase text-brand-green">
              VIEW / ORDER <span className="text-[9.5px]">↗</span>
            </span>
            <span className="text-[9.5px] text-brand-black/28 font-medium">
              Zomato / Swiggy
            </span>
          </div>
        </div>
      </div>

      {/* ── DESKTOP: vertical card (sm+) ────────────────────────────────────── */}
      <div className="hidden sm:flex flex-col">
        {/* Image with veg badge overlay */}
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-cream">
          {showFallback ? (
            <div className="w-full h-full flex items-center justify-center bg-brand-cream">
              <img
                src="/images/logo.jpg"
                alt="Mr. Salad"
                className="w-12 h-12 rounded-full object-cover border border-brand-green/20 opacity-50"
              />
            </div>
          ) : (
            <img
              src={imageSrc}
              alt={item.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          )}
          <div className="absolute top-2.5 left-2.5">
            <VegBadge isVeg={item.veg} />
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-4 gap-2">
          {/* Name + Price */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-sans text-[14px] font-bold text-brand-black leading-snug tracking-tight">
              {item.name}
            </h3>
            <span className="font-sans text-[14px] font-bold text-brand-black shrink-0 leading-snug">
              ₹{item.price}
            </span>
          </div>

          {/* Description — 3-line clamp */}
          {item.description && (
            <p className="text-[11.5px] text-brand-black/45 leading-relaxed line-clamp-3">
              {item.description}
            </p>
          )}

          {/* Macros */}
          {hasNutrition && (
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] font-medium leading-relaxed">
              {item.cal != null && (
                <span style={{ color: '#2d6a2d' }}>
                  <strong>{item.cal}</strong> kcal
                </span>
              )}
              {item.protein != null && (
                <span style={{ color: '#2d6a2d' }}>
                  <strong>{item.protein}g</strong> protein
                </span>
              )}
              {item.fat != null && (
                <span style={{ color: '#c2410c' }}>
                  <strong>{item.fat}g</strong> fat
                </span>
              )}
              {item.carb != null && (
                <span style={{ color: '#1d4ed8' }}>
                  <strong>{item.carb}g</strong> carbs
                </span>
              )}
            </div>
          )}

          {/* VIEW / ORDER */}
          <div className="mt-auto pt-3 border-t border-black/[0.06] flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider uppercase text-brand-green">
              VIEW / ORDER <span className="text-[10px]">↗</span>
            </span>
            <span className="text-[10px] text-brand-black/28 font-medium">
              Zomato / Swiggy
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default MenuCard;
