import React from 'react';
import { motion } from 'framer-motion';

const VegDot = ({ isVeg }) => (
  <span className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase font-semibold text-brand-black/50">
    <span
      className={`w-2 h-2 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`}
    />
    {isVeg ? 'Veg' : 'Non-Veg'}
  </span>
);

const MenuCard = ({ item, onOpen }) => {
  const hasNutrition = item.cal != null || item.protein != null || item.fat != null || item.carb != null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3 }}
      onClick={() => onOpen(item)}
      className="group flex flex-col justify-between h-full bg-brand-white rounded-2xl border border-brand-black/8 hover:border-brand-black/20 p-4 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(item)}
      aria-label={`View details for ${item.name}`}
    >
      <div>
        {/* Food Image */}
        <div className="relative overflow-hidden rounded-xl bg-brand-cream aspect-[4/3] mb-3.5">
          <img
            src={`/images/${item.image}`}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add('bg-brand-black/5');
            }}
          />
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2 py-1 rounded-md bg-white/90 backdrop-blur-xs shadow-xs text-[10px] font-bold">
              <VegDot isVeg={item.veg} />
            </span>
          </div>
        </div>

        {/* Title & Price */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-base md:text-lg font-bold text-brand-black tracking-tight leading-snug group-hover:text-brand-green transition-colors">
            {item.name}
          </h3>
          <span className="font-display text-base md:text-lg font-black text-brand-black shrink-0">
            ₹{item.price}
          </span>
        </div>

        {/* Short Description */}
        {item.description && (
          <p className="text-xs text-brand-black/55 line-clamp-2 leading-relaxed mb-3">
            {item.description}
          </p>
        )}

        {/* Calories, Protein, Fat, Carbs (Only display if not null) */}
        {hasNutrition && (
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-brand-black/50 font-medium py-1.5 border-t border-brand-black/5">
            {item.cal != null && (
              <span><strong className="text-brand-black/80 font-bold">{item.cal}</strong> kcal</span>
            )}
            {item.protein != null && (
              <span><strong className="text-brand-black/80 font-bold">{item.protein}g</strong> protein</span>
            )}
            {item.fat != null && (
              <span><strong className="text-brand-black/80 font-bold">{item.fat}g</strong> fat</span>
            )}
            {item.carb != null && (
              <span><strong className="text-brand-black/80 font-bold">{item.carb}g</strong> carbs</span>
            )}
          </div>
        )}
      </div>

      {/* Button: VIEW / ORDER ↗ */}
      <div className="mt-4 pt-3 border-t border-brand-black/5 flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-wider uppercase text-brand-green group-hover:text-brand-dark transition-colors flex items-center gap-1">
          VIEW / ORDER <span className="text-xs">↗</span>
        </span>
        <span className="text-[10px] text-brand-black/35 font-medium">Zomato / Swiggy</span>
      </div>
    </motion.article>
  );
};

export default MenuCard;
