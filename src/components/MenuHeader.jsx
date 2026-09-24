import React from 'react';

const MenuHeader = () => (
  <div className="text-center py-10 md:py-16">
    <p className="font-mono text-xs tracking-[0.25em] uppercase text-brand-green mb-3">
      The Diet Studio
    </p>
    <h1
      className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-brand-black leading-[0.95]"
    >
      THE MENU
    </h1>
    <p className="mt-4 text-base md:text-lg text-brand-black/55 font-sans max-w-md mx-auto">
      Explore our salads, bowls, juices and everyday favourites.
    </p>
  </div>
);

export default MenuHeader;
