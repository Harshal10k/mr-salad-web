import React from 'react';

/**
 * VegBadge component:
 * Unified visual treatment for dietary indication.
 * Small bordered pill containing a colored dot and subtle uppercase label:
 * - Green dot + "VEG" for vegetarian
 * - Red/brown dot + "NON-VEG" for non-vegetarian
 */
export default function VegBadge({ isVeg, className = '' }) {
  const isVegetarian = Boolean(isVeg);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs select-none shadow-2xs ${
        isVegetarian
          ? 'bg-brand-white/95 border-emerald-600/30 text-emerald-800'
          : 'bg-brand-white/95 border-rose-600/30 text-rose-800'
      } ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
          isVegetarian ? 'bg-emerald-600' : 'bg-rose-600'
        }`}
      />
      <span>{isVegetarian ? 'VEG' : 'NON-VEG'}</span>
    </span>
  );
}
