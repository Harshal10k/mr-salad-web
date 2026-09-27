import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Ensure autoplay without browser policy restrictions
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => { });
    }
  }, [isMobile]);

  // Overall scroll tracking across the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Initial video card offset from screen top (starts below the text + space)
  const initialOffset = isMobile ? 320 : 380;

  // Video card rises up to cover the full viewport
  const videoTop = useTransform(scrollYProgress, [0, 0.28], [initialOffset, 0]);

  // Inverse translation for the inner white text so it stays locked to screen coordinates
  const innerTextY = useTransform(videoTop, (v) => -v);

  // Video card expansion: starts with side margins & rounded corners, expands to full bleed
  const videoPaddingX = useTransform(scrollYProgress, [0, 0.28], [isMobile ? 12 : 24, 0]);
  const videoRadius = useTransform(scrollYProgress, [0, 0.28], [isMobile ? 14 : 22, 0]);

  // Text is fully visible until 50% scroll, then fades out completely by 75%
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 0.75], [1, 1, 0]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full bg-brand-cream"
      style={{ height: '260vh' }}
    >
      {/* Sticky viewport container (pinned to screen) */}
      <div className="sticky top-0 h-screen w-full bg-brand-cream overflow-hidden">

        {/* ── LAYER 1: BLACK TEXT & BUTTONS (STATIONARY ON CREAM BACKGROUND) ── */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute top-0 inset-x-0 z-0 flex flex-col items-center text-center pt-8 sm:pt-12 md:pt-14 pb-8 px-4"
        >
          {/* Eyebrow / Subtitle */}
          <div className="flex flex-col items-center mb-3 sm:mb-4 pointer-events-none">
            <p className="max-w-xl px-6 text-center font-mono text-xs leading-[1.2] md:text-sm text-brand-black/75 font-medium uppercase tracking-widest">
              The Diet Studio
            </p>
            <p className="max-w-xl px-6 text-center font-mono text-[10px] md:text-xs text-brand-black/45 mt-0.5 tracking-wider font-semibold">
              MR. SALAD
            </p>
          </div>

          {/* Headline */}
          <h1 className="max-w-[22ch] px-4 text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.96] text-brand-black pointer-events-none">
            GOOD FOOD.<br /> GOOD ENERGY.
          </h1>

          {/* Dual CTAs (Clickable) */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 pointer-events-auto">
            <button
              onClick={() => scrollTo('menu')}
              className="px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-brand-green text-white hover:bg-brand-dark transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
            >
              Explore Menu
            </button>
            <button
              onClick={() => scrollTo('subscription')}
              className="px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-transparent text-brand-black border border-brand-black/25 hover:border-brand-black hover:bg-brand-black/5 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Explore 26-Day Plan →
            </button>
          </div>

          {/* Space after buttons before video starts */}
          <div className="h-10 sm:h-14 md:h-16" />
        </motion.div>

        {/* ── LAYER 2: VIDEO CARD (SCROLLS UP OVER LAYER 1 WITH OVERFLOW HIDDEN) ── */}
        <motion.div
          style={{
            top: videoTop,
            left: videoPaddingX,
            right: videoPaddingX,
            borderRadius: videoRadius,
            height: '100svh',
          }}
          className="absolute z-10 overflow-hidden bg-black shadow-2xl"
        >
          {/* Video playing inside */}
          <video
            ref={videoRef}
            key={isMobile ? 'mobile' : 'desktop'}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src={isMobile ? '/videos/mr-salad-hero-mobile.mp4' : '/videos/mr-salad-hero-desktop.mp4'}
              type="video/mp4"
            />
          </video>

          {/* Cinematic dark overlay */}
          <div className="absolute inset-0 z-[1] bg-black/35 pointer-events-none" />

          {/* ── LAYER 3: WHITE TEXT & BUTTONS (INSIDE VIDEO CONTAINER, COUNTER-TRANSLATED) ── */}
          <motion.div
            style={{
              y: innerTextY,
              opacity: textOpacity,
            }}
            className="absolute top-0 inset-x-0 z-10 flex flex-col items-center text-center pt-8 sm:pt-12 md:pt-14 pb-8 px-4"
          >
            {/* Eyebrow / Subtitle */}
            <div className="flex flex-col items-center mb-3 sm:mb-4 pointer-events-none">
              <p className="max-w-xl px-6 text-center font-mono text-xs leading-[1.2] md:text-sm text-white/90 font-medium uppercase tracking-widest">
                The Diet Studio
              </p>
              <p className="max-w-xl px-6 text-center font-mono text-[10px] md:text-xs text-white/60 mt-0.5 tracking-wider font-semibold">
                MR. SALAD
              </p>
            </div>

            {/* Headline */}
            <h1 className="max-w-[22ch] px-4 text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.96] text-white drop-shadow-md pointer-events-none">
              GOOD FOOD.<br /> GOOD ENERGY.
            </h1>

            {/* Dual CTAs (Clickable inside video overlay) */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 pointer-events-auto">
              <button
                onClick={() => scrollTo('menu')}
                className="px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-white text-brand-black hover:bg-brand-cream transition-all duration-200 shadow-lg hover:scale-105 active:scale-95"
              >
                Explore Menu
              </button>
              <button
                onClick={() => scrollTo('subscription')}
                className="px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-black/30 backdrop-blur-md text-white border border-white/40 hover:border-white hover:bg-white/20 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Explore 26-Day Plan →
              </button>
            </div>

            <div className="h-10 sm:h-14 md:h-16" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;