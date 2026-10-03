import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'food-discovery', label: 'Food Discovery' },
  { id: 'subscription', label: '26-Day Plan' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export default function ScrollProgressPill() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (location.pathname !== '/') return;

    let ticking = false;

    const updateActiveSection = () => {
      // Bottom of page -> activate last section ('contact')
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - scrollBottom < 80) {
        setActiveSection(SECTIONS[SECTIONS.length - 1].id);
        ticking = false;
        return;
      }

      // Check which section intersects the anchor line (at 38% viewport height)
      const anchor = window.innerHeight * 0.38;
      let currentId = SECTIONS[0].id;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= anchor) {
          currentId = section.id;
        }
      }

      setActiveSection(currentId);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]);

  // Only render on the home page route
  if (location.pathname !== '/') {
    return null;
  }

  const handleDotClick = (id) => {
    setActiveSection(id);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        aria-label="Section navigation"
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2.5 px-2.5 py-4 rounded-full bg-brand-cream/90 backdrop-blur-md border border-brand-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.08)] pointer-events-auto"
      >
        {SECTIONS.map((sec) => {
          const isActive = sec.id === activeSection;
          return (
            <div key={sec.id} className="relative group flex items-center justify-center">
              <button
                onClick={() => handleDotClick(sec.id)}
                aria-label={`Scroll to ${sec.label}`}
                className={`rounded-full cursor-pointer transition-all duration-300 ease-out ${
                  isActive
                    ? 'w-2 h-6 bg-brand-green shadow-xs'
                    : 'w-2 h-2 bg-brand-black/20 hover:bg-brand-black/45 hover:scale-125'
                }`}
              />

              {/* Tooltip on hover */}
              <div className="pointer-events-none absolute right-full mr-3.5 hidden group-hover:flex items-center">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-sans font-semibold tracking-wider uppercase whitespace-nowrap bg-brand-cream/95 text-brand-black border border-brand-black/10 shadow-md backdrop-blur-xs">
                  {sec.label}
                </span>
              </div>
            </div>
          );
        })}
      </motion.nav>
    </AnimatePresence>
  );
}
