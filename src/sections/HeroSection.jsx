import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
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
  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Buttons fade out completely by 200px of window scroll
  const buttonOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const buttonPointerEvents = useTransform(scrollY, (y) => (y >= 200 ? 'none' : 'auto'));

  // 'Good Food. Good Energy.' fades away smoothly by 800px scroll
  const headlineOpacity = useTransform(scrollY, [500, 800], [1, 0]);

  // Initial video card offset from screen top (starts below the text + space)
  const initialOffset = isMobile ? 490 : 590;

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

  const renderRotatingBadge = (isDark = false) => (
    <div
      className={`absolute right-4 sm:right-8 md:right-12 lg:right-20 top-20 sm:top-24 md:top-28 pointer-events-none z-10 transition-all duration-300 ${
        isDark ? 'text-white' : 'text-brand-black'
      }`}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 animate-[spin_24s_linear_infinite]"
        >
          <defs>
            <path
              id={isDark ? "badgeCircleDark" : "badgeCircleLight"}
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text
            className={`text-[9.5px] font-sans uppercase tracking-[0.24em] font-bold ${
              isDark ? 'fill-white/80' : 'fill-brand-black/70'
            }`}
          >
            <textPath href={isDark ? "#badgeCircleDark" : "#badgeCircleLight"} startOffset="0%">
              • MR. SALAD • THE DIET STUDIO • NAGPUR •
            </textPath>
          </text>
        </svg>

        {/* Center emblem */}
        <div
          className={`absolute inset-0 m-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border shadow-xs ${
            isDark
              ? 'bg-white/10 border-white/20 text-brand-cream'
              : 'bg-brand-cream border-brand-black/10 text-brand-green'
          }`}
        >
          <span className="text-xs">🥗</span>
        </div>
      </div>
    </div>
  );

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
        <div
          className="absolute top-0 inset-x-0 z-0 flex flex-col items-center text-center pt-20 sm:pt-24 md:pt-28 pb-8 px-4"
        >
          {/* Rotating badge positioned well away from headline to avoid crowding */}
          {renderRotatingBadge(false)}

          {/* Eyebrow, Headline & Supporting Paragraph (Fades away by 800px scroll) */}
          <motion.div style={{ opacity: headlineOpacity }} className="flex flex-col items-center pointer-events-none max-w-6xl mx-auto w-full">
            <div className="flex flex-col items-center mb-3 sm:mb-4">
              <p className="max-w-xl px-6 text-center font-sans text-xs leading-[1.2] md:text-sm text-brand-black/75 font-medium uppercase tracking-widest">
                The Diet Studio
              </p>
              <p className="max-w-xl px-6 text-center font-sans text-[10px] md:text-xs text-brand-black/45 mt-0.5 tracking-wider font-semibold">
                MR. SALAD
              </p>
            </div>

            {/* Headline bumped larger with 'GOOD ENERGY.' strictly on one line */}
            <h1 className="w-full px-2 text-center text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.75rem] font-black tracking-tight leading-[0.94] text-brand-black">
              GOOD FOOD.<br />
              <span className="whitespace-nowrap">GOOD ENERGY.</span>
            </h1>

            {/* Tightened supporting paragraph (max 2 lines, slightly darker) */}
            <p className="max-w-lg px-4 text-center text-sm sm:text-base text-brand-black/80 font-medium leading-snug mt-3 sm:mt-4 line-clamp-2">
              Fresh, calorie-counted salads and clean high-protein meals crafted daily to fuel your wellness routine in Nagpur.
            </p>
          </motion.div>

          {/* Dual CTAs (Fade away by 200px scroll) */}
          <motion.div
            style={{ opacity: buttonOpacity, pointerEvents: buttonPointerEvents }}
            className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <button
              onClick={() => navigate('/menu')}
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
          </motion.div>

          {/* Space after buttons before video starts */}
          <div className="h-28 sm:h-36 md:h-44" />
        </div>

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
            }}
            className="absolute top-0 inset-x-0 z-10 flex flex-col items-center text-center pt-20 sm:pt-24 md:pt-28 pb-8 px-4"
          >
            {/* Rotating badge inside video layer */}
            {renderRotatingBadge(true)}

            {/* Eyebrow, Headline & Supporting Paragraph (Fades away by 800px scroll) */}
            <motion.div style={{ opacity: headlineOpacity }} className="flex flex-col items-center pointer-events-none max-w-6xl mx-auto w-full">
              <div className="flex flex-col items-center mb-3 sm:mb-4">
                <p className="max-w-xl px-6 text-center font-sans text-xs leading-[1.2] md:text-sm text-white/90 font-medium uppercase tracking-widest">
                  The Diet Studio
                </p>
                <p className="max-w-xl px-6 text-center font-sans text-[10px] md:text-xs text-white/60 mt-0.5 tracking-wider font-semibold">
                  MR. SALAD
                </p>
              </div>

              {/* Headline bumped larger with 'GOOD ENERGY.' strictly on one line */}
              <h1 className="w-full px-2 text-center text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.75rem] font-black tracking-tight leading-[0.94] text-white drop-shadow-md">
                GOOD FOOD.<br />
                <span className="whitespace-nowrap">GOOD ENERGY.</span>
              </h1>

              {/* Tightened supporting paragraph (max 2 lines, high-contrast white) */}
              <p className="max-w-lg px-4 text-center text-sm sm:text-base text-white/90 font-medium leading-snug mt-3 sm:mt-4 line-clamp-2 drop-shadow-sm">
                Fresh, calorie-counted salads and clean high-protein meals crafted daily to fuel your wellness routine in Nagpur.
              </p>
            </motion.div>

            {/* Dual CTAs (Fade away by 200px scroll) */}
            <motion.div
              style={{ opacity: buttonOpacity, pointerEvents: buttonPointerEvents }}
              className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              <button
                onClick={() => navigate('/menu')}
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
            </motion.div>

            <div className="h-24 sm:h-32 md:h-40" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;