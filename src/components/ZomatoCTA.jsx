import React from 'react';
import { ZOMATO_URL } from '../config/brand';

const ZomatoCTA = ({ className = '', size = 'md' }) => {
  const sizeClasses = size === 'sm'
    ? 'px-4 py-2 text-xs'
    : 'px-6 py-3 text-sm';

  return (
    <a
      href={ZOMATO_URL || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full font-semibold tracking-wider uppercase
        bg-brand-green text-white hover:bg-brand-dark transition-colors duration-200 shadow-sm
        ${sizeClasses} ${className}`}
    >
      Order on Zomato
      <span className="text-white/70 text-base leading-none">↗</span>
    </a>
  );
};

export default ZomatoCTA;
