import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import categories from '../data/categories';

const FoodDiscoverySection = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ── Scroll track refs ─────────────────────────────────────────
  const desktopScrollRef = useRef(null); // lg+ pinned track
  const mobileScrollRef  = useRef(null); // <lg pinned track
  const navRef           = useRef(null);
  const tabButtonRefs    = useRef({});   // per-category nav button

  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef     = useRef(null);
  const isFirstMount         = useRef(true); // skip tab-center on initial render

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => () => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
  }, []);

  // ── Desktop scroll progress ───────────────────────────────────
  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopScrollRef,
    offset: ['start start', 'end end'],
  });

  // ── Mobile scroll progress ────────────────────────────────────
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileScrollRef,
    offset: ['start start', 'end end'],
  });

  // Drive activeIndex from desktop scroll
  useEffect(() => {
    if (isMobile) return;
    const unsub = desktopProgress.on('change', (p) => {
      if (isProgrammaticScroll.current) return;
      setActiveIndex(Math.min(categories.length - 1, Math.max(0, Math.floor(p * categories.length))));
    });
    return unsub;
  }, [desktopProgress, isMobile]);

  // Drive activeIndex from mobile scroll
  useEffect(() => {
    if (!isMobile) return;
    const unsub = mobileProgress.on('change', (p) => {
      if (isProgrammaticScroll.current) return;
      setActiveIndex(Math.min(categories.length - 1, Math.max(0, Math.floor(p * categories.length))));
    });
    return unsub;
  }, [mobileProgress, isMobile]);

  // ── Scroll active tab into center view ───────────────────────
  // Uses container-only scrollLeft math so the page window is never moved.
  // Skipped on initial mount so the browser doesn't jump down to the tab strip.
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const button    = tabButtonRefs.current[activeIndex];
    const container = navRef.current; // the <nav> itself is the scroll container
    if (!button || !container) return;
    // Center the active button inside the nav strip without touching window scroll
    const targetLeft = button.offsetLeft - container.clientWidth / 2 + button.clientWidth / 2;
    container.scrollTo({ left: targetLeft, behavior: 'smooth' });
  }, [activeIndex]);

  // ── Jump to category ─────────────────────────────────────────
  const scrollToCategory = (idx) => {
    setActiveIndex(idx);
    isProgrammaticScroll.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 900);

    const trackRef = isMobile ? mobileScrollRef : desktopScrollRef;
    if (!trackRef.current) return;

    const rect            = trackRef.current.getBoundingClientRect();
    const sectionDocTop   = rect.top + window.scrollY;
    const totalScrollable = Math.max(0, trackRef.current.offsetHeight - window.innerHeight);
    const targetProgress  = (idx + 0.5) / categories.length;
    window.scrollTo({ top: sectionDocTop + targetProgress * totalScrollable, behavior: 'smooth' });
  };

  const navigateToCategory = (cat) =>
    navigate(`/menu?cat=${encodeURIComponent(cat.menuCat)}`);

  const navigateToMenu = () => navigate('/menu');

  const activeCategory = categories[activeIndex];

  return (
    <section
      id="food-discovery"
      className="relative w-full bg-brand-green text-brand-cream selection:bg-brand-wood selection:text-brand-white"
    >

      {/* ─────────────────────────────────────────────────────── */}
      {/* 1. SECTION INTRO                                        */}
      {/* ─────────────────────────────────────────────────────── */}
      <div className="relative min-h-[70vh] md:min-h-[85vh] flex flex-col justify-between px-6 sm:px-12 md:px-20 lg:px-24 pt-28 md:pt-36 pb-16 border-b border-brand-cream/10">

        <div className="absolute top-12 right-6 md:right-16 select-none pointer-events-none opacity-5 font-sans text-[10vw] md:text-[8vw] leading-none text-brand-cream font-bold">
          02
        </div>

        <div className="mb-8 md:mb-12">
          <p className="font-sans text-xs md:text-sm tracking-[0.25em] text-brand-wood uppercase font-medium">
            Food Discovery
          </p>
        </div>

        <div className="max-w-6xl">
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.92] uppercase text-brand-cream">
            WHAT&apos;S<br />
            ON YOUR<br />
            PLATE?
          </h2>
        </div>

        <div className="pt-12 md:pt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div className="space-y-1 text-brand-cream/75 font-sans text-sm md:text-base leading-relaxed">
            <p>Fresh food.</p>
            <p>Simple choices.</p>
            <p className="text-brand-cream font-medium">Made for your everyday.</p>
          </div>
          <div className="flex items-center gap-3 text-xs md:text-sm font-sans text-brand-cream/40 uppercase tracking-widest">
            <span>Scroll to discover</span>
            <span className="inline-block animate-pulse">↓</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────── */}
      {/* 2. STICKY TAB STRIP                                     */}
      {/* ─────────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        aria-label="Category Navigation"
        className="sticky top-0 z-30 w-full bg-brand-green/95 backdrop-blur-md border-b border-brand-cream/10 px-6 sm:px-12 md:px-20 lg:px-24 py-4 md:py-5"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-6 md:gap-10">
          <span className="hidden md:inline-block font-sans text-xs uppercase tracking-[0.2em] text-brand-cream/40 shrink-0">
            Categories ({categories.length})
          </span>
          <div className="flex items-center gap-6 sm:gap-8 md:gap-10 whitespace-nowrap">
            {categories.map((cat, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={cat.id}
                  ref={(el) => { tabButtonRefs.current[idx] = el; }}
                  onClick={() => scrollToCategory(idx)}
                  className={`group relative text-xs md:text-sm uppercase tracking-[0.15em] font-sans transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive ? 'text-brand-cream font-bold' : 'text-brand-cream/50 hover:text-brand-cream/80'
                  }`}
                >
                  <span className={`text-[10px] ${isActive ? 'text-brand-wood' : 'text-brand-cream/30'}`}>
                    {cat.number}
                  </span>
                  <span>{cat.rawName}</span>
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

      {/* ─────────────────────────────────────────────────────── */}
      {/* 3a. DESKTOP PINNED SCROLL TRACK (lg+)                  */}
      {/* ─────────────────────────────────────────────────────── */}
      <div
        ref={desktopScrollRef}
        className="hidden lg:block relative w-full"
        style={{ height: `${categories.length * 90}vh` }}
      >
        <div className="sticky top-[61px] h-[calc(100vh-61px)] w-full flex items-center px-12 md:px-20 lg:px-24 overflow-hidden">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: text */}
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
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-xl text-brand-wood font-medium tracking-wider">
                      {activeCategory.number}
                    </span>
                    <span className="h-[1px] w-8 bg-brand-wood/40" />
                    <span className="font-sans text-xs uppercase tracking-widest text-brand-cream/50">
                      {activeCategory.tagline}
                    </span>
                  </div>

                  <h3 className="text-6xl xl:text-7xl font-black tracking-tight leading-[0.95] text-brand-cream uppercase">
                    {activeCategory.name}
                  </h3>

                  <p className="text-lg text-brand-cream/80 leading-relaxed max-w-md font-sans">
                    {activeCategory.description}
                  </p>

                  <div className="pt-2">
                    <p className="font-sans text-xs uppercase tracking-widest text-brand-cream/40 mb-2">
                      Featured In This Category
                    </p>
                    <div className="flex flex-wrap gap-2 max-w-md">
                      {activeCategory.sampleItemNames.map((itemName) => (
                        <span
                          key={itemName}
                          className="font-sans text-xs px-2.5 py-1 bg-brand-cream/5 border border-brand-cream/10 rounded-sm text-brand-cream/70"
                        >
                          {itemName}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => navigateToCategory(activeCategory)}
                      className="group inline-flex items-center gap-3 text-base font-bold font-sans tracking-wider uppercase text-brand-cream hover:text-brand-wood transition-colors"
                    >
                      <span>{activeCategory.cta}</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-2 text-brand-wood" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
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

            {/* Right: image crossfade */}
            <div className="col-span-7 relative h-[65vh] xl:h-[70vh] rounded-2xl overflow-hidden bg-brand-dark/40 border border-brand-cream/10 shadow-2xl">
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
                      scale:   { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
                    }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={cat.image}
                      alt={`Mr. Salad ${cat.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-black/20 pointer-events-none" />
                    <div className="absolute bottom-6 right-6 font-sans text-xs uppercase tracking-widest text-brand-cream/60 px-3 py-1 bg-brand-dark/60 backdrop-blur-sm border border-brand-cream/10 rounded-sm">
                      MR. SALAD · {cat.number}
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────── */}
      {/* 3b. MOBILE PINNED SCROLL TRACK (< lg)                  */}
      {/* ─────────────────────────────────────────────────────── */}
      <div
        ref={mobileScrollRef}
        className="block lg:hidden relative w-full"
        style={{ height: `${categories.length * 100}svh` }}
      >
        {/* Sticky viewport — svh keeps it correct under Safari's collapsible toolbar */}
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col">

          {/* Full-bleed image stack — crossfades behind content */}
          <div className="absolute inset-0">
            {categories.map((cat, idx) => {
              const isActive = idx === activeIndex;
              return (
                <motion.div
                  key={cat.id}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale:   isActive ? 1 : 1.04,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                  transition={{
                    opacity: { duration: 0.55, ease: 'easeInOut' },
                    scale:   { duration: 0.8,  ease: [0.25, 1, 0.5, 1] },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={cat.image}
                    alt={`Mr. Salad ${cat.name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Gradient overlay so text is legible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/70 to-brand-green/20 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>

          {/* Foreground content — crossfades with AnimatePresence */}
          <div className="relative z-10 flex flex-col justify-end h-full px-6 sm:px-10 pb-14 pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                {/* Number + tagline */}
                <div className="flex items-center gap-3">
                  <span className="font-sans text-base text-brand-wood font-bold tracking-wider">
                    {activeCategory.number}
                  </span>
                  <span className="h-[1px] w-5 bg-brand-wood/40" />
                  <span className="font-sans text-[11px] uppercase tracking-wider text-brand-cream/50">
                    {activeCategory.tagline}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-4xl sm:text-5xl font-black tracking-tight leading-[0.95] text-brand-cream uppercase">
                  {activeCategory.name}
                </h3>

                {/* Description — 2 lines max */}
                <p className="text-sm text-brand-cream/75 leading-relaxed font-sans line-clamp-2 max-w-sm">
                  {activeCategory.description}
                </p>

                {/* Sample chips — max 4, one row */}
                <div className="flex flex-wrap gap-1.5">
                  {activeCategory.sampleItemNames.slice(0, 4).map((name) => (
                    <span
                      key={name}
                      className="font-sans text-[11px] px-2.5 py-0.5 bg-brand-cream/8 border border-brand-cream/15 rounded-sm text-brand-cream/70 whitespace-nowrap"
                    >
                      {name}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => navigateToCategory(activeCategory)}
                  className="group inline-flex items-center gap-2 text-sm font-bold font-sans tracking-wider uppercase text-brand-cream hover:text-brand-wood transition-colors pt-1"
                >
                  <span>{activeCategory.cta}</span>
                  <ArrowRight className="w-4 h-4 text-brand-wood transition-transform group-hover:translate-x-1.5" />
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex items-center gap-2 mt-8">
              {categories.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => scrollToCategory(i)}
                  aria-label={`Jump to ${c.name}`}
                  className={`h-1 transition-all duration-300 rounded-full cursor-pointer ${
                    i === activeIndex ? 'w-6 bg-brand-wood' : 'w-1.5 bg-brand-cream/20 hover:bg-brand-cream/40'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────── */}
      {/* 4. FINALE                                               */}
      {/* ─────────────────────────────────────────────────────── */}
      <div className="relative border-t border-brand-cream/10 px-6 sm:px-12 md:px-20 lg:px-24 py-28 md:py-36 flex flex-col items-center text-center overflow-hidden">

        <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center select-none">
          <span className="font-sans text-[18vw] font-black text-brand-cream leading-none">MENU</span>
        </div>

        <div className="relative z-10 max-w-4xl flex flex-col items-center">
          <p className="font-sans text-xs md:text-sm tracking-[0.25em] text-brand-wood uppercase font-medium mb-6">
            The Complete Selection
          </p>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.92] text-brand-cream uppercase mb-12">
            FIND YOUR<br />
            FAVOURITE.
          </h2>
          <button
            onClick={navigateToMenu}
            className="group inline-flex items-center gap-4 px-8 md:px-12 py-5 bg-brand-cream text-brand-green font-sans font-bold text-sm md:text-base tracking-[0.15em] uppercase rounded-full hover:bg-brand-wood hover:text-brand-white transition-all duration-300 shadow-xl"
          >
            <span>VIEW FULL MENU</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>

    </section>
  );
};

export default FoodDiscoverySection;
