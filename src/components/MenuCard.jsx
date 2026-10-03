import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VegBadge from './VegBadge';

const MenuCard = ({ item }) => {
  const [imgError, setImgError] = useState(false);
  const hasNutrition = item.cal != null || item.protein != null || item.fat != null || item.carb != null;
  const imageSrc = item.image
    ? item.image.startsWith('http')
      ? item.image
      : `/images/${item.image}`
    : '';
  const showFallback = imgError || !imageSrc;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.28 }}
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_18px_rgba(0,0,0,0.11)] transition-shadow duration-300"
    >
      {/* ── Food image ─────────────────────────────── */}
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
        {/* Veg / Non-veg badge */}
        <div className="absolute top-2.5 left-2.5">
          <VegBadge isVeg={item.veg} />
        </div>
      </div>

      {/* ── Card body ──────────────────────────────── */}
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

        {/* Description — up to 3 lines */}
        {item.description && (
          <p className="text-[11.5px] text-brand-black/45 leading-relaxed line-clamp-3">
            {item.description}
          </p>
        )}

        {/* Nutrition */}
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

        {/* VIEW / ORDER + platform links */}
        <div className="mt-auto pt-3 border-t border-black/[0.06] flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wider uppercase text-brand-green">
            VIEW / ORDER <span className="text-[10px]">↗</span>
          </span>
          <span className="text-[10px] text-brand-black/28 font-medium">
            Zomato / Swiggy
          </span>
        </div>

      </div>
    </motion.article>
  );
};

export default MenuCard;
