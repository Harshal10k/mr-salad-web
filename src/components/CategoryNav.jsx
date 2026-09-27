import React, { useRef } from 'react';

const CategoryNav = ({ categories, active, onSelect }) => {
  const navRef = useRef(null);

  return (
    <nav
      ref={navRef}
      className="flex items-center gap-0 overflow-x-auto no-scrollbar border-b border-brand-black/10 mb-6"
      aria-label="Menu categories"
    >
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`
              relative shrink-0 px-5 py-3 text-xs font-semibold tracking-widest uppercase
              transition-colors duration-200 whitespace-nowrap
              ${isActive
                ? 'text-brand-green'
                : 'text-brand-black/45 hover:text-brand-black/75'
              }
            `}
          >
            {cat}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-green rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default CategoryNav;
