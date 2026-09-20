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

  // Text is fully visible until 50% scroll, then fades out completely by 75% (and restores on scroll up)
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 0.75], [1, 1, 0]);

  // CTAs removed — no longer needed

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-brand-cream"
      style={{ height: '260vh' }}
    >
      {/* Sticky viewport container (pinned to screen) */}
      <div className="sticky top-0 h-screen w-full bg-brand-cream">

        {/* ── LAYER 1: BLACK TEXT (STATIONARY ON CREAM BACKGROUND) ── */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute top-0 inset-x-0 z-0 flex flex-col items-center text-center pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 px-4 pointer-events-none"
        >
          {/* Eyebrow / Subtitle */}
          <div className="flex flex-col items-center mb-3 sm:mb-4">
            <p className="max-w-xl px-6 text-center font-mono text-xs leading-[1.2] md:text-sm text-brand-black/75 font-medium">
              The Diet Studio
            </p>
            <p className="max-w-xl px-6 text-center font-mono text-[10px] md:text-xs text-brand-black/45 mt-0.5">
              MR. SALAD
            </p>
          </div>

          {/* Headline */}
          <h1 className="max-w-[22ch] px-4 text-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95] text-brand-black">
            GOOD FOOD.<br /> GOOD ENERGY.
          </h1>

          {/* Space after text before video starts */}
          <div className="h-16 sm:h-20 md:h-28 lg:h-32" />
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
          <div className="absolute inset-0 z-[1] bg-black/25 pointer-events-none" />

          {/* ── LAYER 3: WHITE TEXT (INSIDE VIDEO CONTAINER, COUNTER-TRANSLATED) ── */}
          {/* Because this is inside the video container with overflow-hidden, */}
          {/* it is ONLY revealed where the video card overlaps the screen! */}
          {/* Above the video card edge = Layer 1 (Black text) is visible. */}
          {/* Inside the video card = Layer 3 (White text) is visible! */}
          <motion.div
            style={{
              y: innerTextY,
              opacity: textOpacity,
            }}
            className="absolute top-0 inset-x-0 z-10 flex flex-col items-center text-center pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 px-4 pointer-events-none"
          >
            {/* Eyebrow / Subtitle */}
            <div className="flex flex-col items-center mb-3 sm:mb-4">
              <p className="max-w-xl px-6 text-center font-mono text-xs leading-[1.2] md:text-sm text-white/85 font-medium">
                The Diet Studio
              </p>
              <p className="max-w-xl px-6 text-center font-mono text-[10px] md:text-xs text-white/55 mt-0.5">
                MR. SALAD
              </p>
            </div>

            {/* Headline */}
            <h1 className="max-w-[22ch] px-4 text-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95] text-white drop-shadow-md">
              GOOD FOOD.<br /> GOOD ENERGY.
            </h1>

            <div className="h-16 sm:h-20 md:h-28 lg:h-32" />
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;