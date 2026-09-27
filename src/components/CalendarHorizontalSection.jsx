import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SUBSCRIPTION_SCHEDULE } from '../data/subscriptionData';


export default function CalendarHorizontalSection() {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxScrollX, setMaxScrollX] = useState(0);

  // Split all 26 meals into Row 1 (Days 1–13) and Row 2 (Days 14–26)
  const row1Meals = SUBSCRIPTION_SCHEDULE.slice(0, 13);
  const row2Meals = SUBSCRIPTION_SCHEDULE.slice(13, 26);

  // Vertical scroll progress through the section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Calculate pixel distance to translate based on actual content width vs window width
  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Total horizontal distance to scroll so last card reaches right side nicely with padding
        const dist = Math.max(0, trackWidth - viewportWidth + 80);
        setMaxScrollX(dist);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Map 0 -> 1 scrollYProgress to -maxScrollX translation in pixels
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScrollX]);

  // Update current scroll indicator percentage
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Active day index (1 to 26) roughly based on scroll
  const currentDayEstimate = Math.min(26, Math.max(1, Math.round(scrollProgress * 25) + 1));

  // Render a single square meal card
  const renderCard = (meal, globalIndex) => {
    const dayStr = meal.day < 10 ? `0${meal.day}` : meal.day;

    return (
      <div
        key={meal.day}
        className="group relative bg-brand-white rounded-2xl border border-brand-black/10 hover:border-brand-green/30 p-5 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col overflow-hidden select-none shrink-0"
        style={{
          width: 'clamp(210px, 20vw, 270px)',
          height: 'clamp(210px, 20vw, 270px)',
        }}
      >
        {/* Hover accent line at top */}
        <span className="absolute inset-x-0 top-0 h-[2px] bg-brand-green rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Large watermark day number */}
        <span className="absolute right-3 bottom-1 font-display text-7xl font-black text-brand-black/[0.04] leading-none pointer-events-none group-hover:text-brand-green/[0.07] transition-colors duration-300 select-none">
          {dayStr}
        </span>

        {/* Top row: Day label + Category badge */}
        <div className="relative z-10 flex items-center justify-between mb-auto">
          <span className="font-sans text-[10px] font-bold tracking-[0.15em] uppercase text-brand-black/40">
            Day {dayStr}
          </span>
          <span className="text-[9px] font-sans font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-brand-green/30 text-brand-green bg-brand-green/5">
            {meal.type}
          </span>
        </div>

        {/* Meal Title — centre stage */}
        <div className="relative z-10 flex-1 flex items-center py-3">
          <h4 className="font-display text-[15px] sm:text-base font-bold text-brand-black group-hover:text-brand-green transition-colors duration-300 leading-[1.3] line-clamp-3">
            {meal.title}
          </h4>
        </div>

        {/* Bottom: dot indicators */}
        <div className="relative z-10 flex items-center gap-3 pt-3 border-t border-brand-black/[0.06] text-[9px] font-sans uppercase tracking-wider text-brand-black/35">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
            Fresh
          </span>
          <span className="w-px h-3 bg-brand-black/10" />
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-wood flex-shrink-0" />
            Clean Prep
          </span>
        </div>
      </div>
    );
  };

  return (
    <div ref={targetRef} className="relative h-[380vh] w-full">
      {/* Sticky full-screen container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-6 sm:py-8 bg-brand-white">

        {/* ── FIXED SECTION HEADER (Aligned with site's max-w-7xl content width) ── */}
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex-shrink-0 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span className="font-sans text-xs uppercase tracking-widest text-brand-green font-bold">
                  26 Days · Zero Repetition
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-brand-black uppercase leading-[0.95]">
                26-DAY MEAL CALENDAR
              </h3>
            </div>

            {/* Progress counter & Scroll prompt */}
            <div className="flex items-center gap-5 self-start sm:self-end">
              <div className="flex items-baseline gap-1">
                <span className="font-sans text-base font-black text-brand-green">
                  DAY {currentDayEstimate < 10 ? `0${currentDayEstimate}` : currentDayEstimate}
                </span>
                <span className="font-sans text-xs text-brand-black/40">/ 26</span>
              </div>

              <div className="h-4 w-px bg-brand-black/15" />

              <div className="flex items-center gap-2.5">
                <span className="font-sans text-xs uppercase tracking-wider text-brand-black/50 select-none">
                  SCROLL ↓
                </span>
                {/* Horizontal progress bar */}
                <div className="w-24 h-1.5 bg-brand-black/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-green transition-all duration-150 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(8, scrollProgress * 100))}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FULL-WIDTH HORIZONTAL 2×13 GRID TRACK ── */}
        <div className="flex-1 w-full min-h-0 flex items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex flex-col gap-4 sm:gap-5 pl-5 sm:pl-8 lg:pl-[calc(max(1.25rem,(100vw-80rem)/2+3rem))] pr-16 w-max py-2"
          >
            {/* Row 1: Days 01–13 */}
            <div className="flex gap-4 sm:gap-5">
              {row1Meals.map((meal, idx) => renderCard(meal, idx))}
            </div>

            {/* Row 2: Days 14–26 */}
            <div className="flex gap-4 sm:gap-5">
              {row2Meals.map((meal, idx) => renderCard(meal, idx + 13))}
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM INFO BAR ── */}
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex-shrink-0 pt-3 border-t border-brand-black/5 flex items-center justify-between text-xs text-brand-black/50 font-sans">
          <span className="hidden sm:inline">Row 1: Days 01–13 · Row 2: Days 14–26</span>
          <span className="flex items-center gap-2 text-brand-green font-bold">
            <span>●</span> Monday to Friday Meal Rotations
          </span>
          <span className="hidden sm:inline">Nagpur Local Kitchen · Fresh Daily</span>
        </div>

      </div>
    </div>
  );
}
