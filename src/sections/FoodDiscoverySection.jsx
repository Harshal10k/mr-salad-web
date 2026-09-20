import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import categories from '../data/categories';

const FoodDiscoverySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollSectionRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll tracking for desktop category transitions
  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    if (isMobile) return;
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      // Map 0 -> 1 progress into 6 category indices
      const index = Math.min(categories.length - 1, Math.max(0, Math.floor(progress * categories.length)));
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, isMobile]);

  const scrollToCategory = (idx) => {
    if (isMobile) {
      const el = document.getElementById(`mobile-cat-${idx}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (scrollSectionRef.current) {
      const top = scrollSectionRef.current.offsetTop;
      const height = scrollSectionRef.current.offsetHeight;
      const targetScroll = top + (idx / categories.length) * (height - window.innerHeight);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const activeCategory = categories[activeIndex];

  return (
    <section className="relative w-full bg-brand-green text-brand-cream selection:bg-brand-wood selection:text-brand-white">
      
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. SECTION INTRO: WHAT'S ON YOUR PLATE?                      */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="relative min-h-[70vh] md:min-h-[85vh] flex flex-col justify-between px-6 sm:px-12 md:px-20 lg:px-24 pt-28 md:pt-36 pb-16 border-b border-brand-cream/10">
        
        {/* Subtle decorative editorial watermark */}
        <div className="absolute top-12 right-6 md:right-16 select-none pointer-events-none opacity-5 font-mono text-[10vw] md:text-[8vw] leading-none text-brand-cream font-bold">
          02
        </div>

        {/* Eyebrow Label */}
        <div className="mb-8 md:mb-12">
          <p className="font-mono text-xs md:text-sm tracking-[0.25em] text-brand-wood uppercase font-medium">
            Food Discovery
          </p>
        </div>

        {/* Oversized Headline */}
        <div className="max-w-6xl">
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.92] uppercase text-brand-cream">
            WHAT&apos;S<br />
            ON YOUR<br />
            PLATE?
          </h2>
        </div>

        {/* Supporting Text & Divider */}
        <div className="pt-12 md:pt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div className="space-y-1 text-brand-cream/75 font-mono text-sm md:text-base leading-relaxed">
            <p>Fresh food.</p>
            <p>Simple choices.</p>
            <p className="text-brand-cream font-medium">Made for your everyday.</p>
          </div>

          <div className="flex items-center gap-3 text-xs md:text-sm font-mono text-brand-cream/40 uppercase tracking-widest">
            <span>Scroll to discover</span>
            <span className="inline-block animate-pulse">↓</span>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. MINIMAL TYPOGRAPHIC CATEGORY NAVIGATION                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        aria-label="Category Navigation"
        className="sticky top-0 z-30 w-full bg-brand-green/95 backdrop-blur-md border-b border-brand-cream/10 px-6 sm:px-12 md:px-20 lg:px-24 py-4 md:py-5"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-6 md:gap-10">
          <span className="hidden md:inline-block font-mono text-xs uppercase tracking-[0.2em] text-brand-cream/40 shrink-0">
            Categories ({categories.length})
          </span>

          <div className="flex items-center gap-6 sm:gap-8 md:gap-10 whitespace-nowrap">
            {categories.map((cat, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(idx)}
                  className={`group relative text-xs md:text-sm uppercase tracking-[0.15em] font-mono transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive ? 'text-brand-cream font-bold' : 'text-brand-cream/50 hover:text-brand-cream/80'
                  }`}
                >
                  <span className={`text-[10px] ${isActive ? 'text-brand-wood' : 'text-brand-cream/30'}`}>
                    {cat.number}
                  </span>
                  <span>{cat.rawName}</span>

                  {/* Minimal indicator underline */}
                  {isActive && (
                    <motion.div
                      layoutId="cat-nav-active"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-brand-wood"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. CATEGORY SCROLL EXPERIENCE                                */}
      {/* ───────────────────────────────────────────────────────────── */}

      {/* ── DESKTOP PINNED / EDITORIAL LAYOUT (lg+) ── */}
      <div
        ref={scrollSectionRef}
        className="hidden lg:block relative w-full"
        style={{ height: `${categories.length * 90}vh` }}
      >
        {/* Sticky viewport frame */}
        <div className="sticky top-[61px] h-[calc(100vh-61px)] w-full flex items-center px-12 md:px-20 lg:px-24 overflow-hidden">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Editorial Category Typography & Details */}
            <div className="col-span-5 flex flex-col justify-between py-6 min-h-[480px]">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  {/* Category Number */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xl text-brand-wood font-medium tracking-wider">
                      {activeCategory.number}
                    </span>
                    <span className="h-[1px] w-8 bg-brand-wood/40" />
                    <span className="font-mono text-xs uppercase tracking-widest text-brand-cream/50">
                      {activeCategory.tagline}
                    </span>
                  </div>

                  {/* Category Name Headline */}
                  <h3 className="text-6xl xl:text-7xl font-black tracking-tight leading-[0.95] text-brand-cream uppercase">
                    {activeCategory.name}
                  </h3>

                  {/* Editorial Description */}
                  <p className="text-lg text-brand-cream/80 leading-relaxed max-w-md font-sans">
                    {activeCategory.description}
                  </p>

                  {/* Authentic Menu Samples from menu.json */}
                  <div className="pt-2">
                    <p className="font-mono text-xs uppercase tracking-widest text-brand-cream/40 mb-2">
                      Featured In This Category
                    </p>
                    <div className="flex flex-wrap gap-2 max-w-md">
                      {activeCategory.sampleItemNames.map((itemName) => (
                        <span
                          key={itemName}
                          className="font-mono text-xs px-2.5 py-1 bg-brand-cream/5 border border-brand-cream/10 rounded-sm text-brand-cream/70"
                        >
                          {itemName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Editorial CTA */}
                  <div className="pt-6">
                    <a
                      href="/menu"
                      className="group inline-flex items-center gap-3 text-base font-bold font-mono tracking-wider uppercase text-brand-cream hover:text-brand-wood transition-colors"
                    >
                      <span>{activeCategory.cta}</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-2 text-brand-wood" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots at bottom of left column */}
              <div className="flex items-center gap-2 pt-8">
                {categories.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => scrollToCategory(i)}
                    aria-label={`Jump to ${c.name}`}
                    className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                      i === activeIndex ? 'w-8 bg-brand-wood' : 'w-2 bg-brand-cream/20 hover:bg-brand-cream/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Large Editorial Food Photography / Visual */}
            <div className="col-span-7 relative h-[65vh] xl:h-[70vh] rounded-2xl overflow-hidden bg-brand-dark/40 border border-brand-cream/10 shadow-2xl">
              
              {/* Image Stack with Cross-fade and subtle 1.03 -> 1.0 scale */}
              {categories.map((cat, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <motion.div
                    key={cat.id}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 1.03,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                    transition={{
                      opacity: { duration: 0.5, ease: 'easeInOut' },
                      scale: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
                    }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={cat.image}
                      alt={`Mr. Salad ${cat.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Subtle cinematic vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Minimal photo tag */}
                    <div className="absolute bottom-6 right-6 font-mono text-xs uppercase tracking-widest text-brand-cream/60 px-3 py-1 bg-brand-dark/60 backdrop-blur-sm border border-brand-cream/10 rounded-sm">
                      MR. SALAD · {cat.number}
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* ── MOBILE VERTICAL EXPERIENCE (< lg) ── */}
      <div className="block lg:hidden px-6 sm:px-12 py-12 space-y-20">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            id={`mobile-cat-${idx}`}
            className="flex flex-col space-y-6 pt-6 border-t border-brand-cream/10 first:border-none"
          >
            {/* Header: Number & Tagline */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-lg text-brand-wood font-bold">
                {cat.number}
              </span>
              <span className="h-[1px] w-6 bg-brand-wood/40" />
              <span className="font-mono text-xs uppercase tracking-wider text-brand-cream/50">
                {cat.tagline}
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-5xl sm:text-6xl font-black tracking-tight leading-[0.95] text-brand-cream uppercase">
              {cat.name}
            </h3>

            {/* Large Visual Image */}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-brand-dark/40 border border-brand-cream/10 shadow-lg">
              <img
                src={cat.image}
                alt={`Mr. Salad ${cat.name}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-brand-cream/70 px-2.5 py-1 bg-brand-dark/70 backdrop-blur-sm border border-brand-cream/10 rounded-sm">
                MR. SALAD
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-brand-cream/80 leading-relaxed font-sans">
              {cat.description}
            </p>

            {/* Sample Items */}
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-widest text-brand-cream/40">
                Popular Choices
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cat.sampleItemNames.map((name) => (
                  <span
                    key={name}
                    className="font-mono text-xs px-2 py-0.5 bg-brand-cream/5 border border-brand-cream/10 rounded-sm text-brand-cream/70"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="/menu"
                className="group inline-flex items-center gap-2.5 text-sm font-bold font-mono tracking-wider uppercase text-brand-cream hover:text-brand-wood transition-colors"
              >
                <span>{cat.cta}</span>
                <ArrowRight className="w-4 h-4 text-brand-wood transition-transform group-hover:translate-x-1.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 4. TRANSITION TO NEXT SECTION / FINALE                        */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="relative border-t border-brand-cream/10 px-6 sm:px-12 md:px-20 lg:px-24 py-28 md:py-36 flex flex-col items-center text-center overflow-hidden">
        
        {/* Subtle background ambient graphic */}
        <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center select-none">
          <span className="font-mono text-[18vw] font-black text-brand-cream leading-none">
            MENU
          </span>
        </div>

        <div className="relative z-10 max-w-4xl flex flex-col items-center">
          <p className="font-mono text-xs md:text-sm tracking-[0.25em] text-brand-wood uppercase font-medium mb-6">
            The Complete Selection
          </p>

          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.92] text-brand-cream uppercase mb-12">
            FIND YOUR<br />
            FAVOURITE.
          </h2>

          <a
            href="/menu"
            className="group inline-flex items-center gap-4 px-8 md:px-12 py-5 bg-brand-cream text-brand-green font-mono font-bold text-sm md:text-base tracking-[0.15em] uppercase rounded-full hover:bg-brand-wood hover:text-brand-white transition-all duration-300 shadow-xl"
          >
            <span>VIEW FULL MENU</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
          </a>
        </div>
      </div>

    </section>
  );
};

export default FoodDiscoverySection;
