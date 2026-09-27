import React from 'react';

const MenuSearch = ({ value, onChange }) => (
  <div className="relative mb-8 max-w-sm">
    <svg
      className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-black/30 pointer-events-none"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
    <input
      id="menu-search"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search the menu..."
      className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-brand-black/10 rounded-xl
        placeholder:text-brand-black/30 text-brand-black
        focus:outline-none focus:border-brand-green/50 focus:ring-2 focus:ring-brand-green/10
        transition-all duration-200"
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-black/30 hover:text-brand-black/60 transition-colors"
        aria-label="Clear search"
      >
        ✕
      </button>
    )}
  </div>
);

export default MenuSearch;
