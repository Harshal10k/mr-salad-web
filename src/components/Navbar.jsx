import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZOMATO_URL, BRAND } from '../config/brand';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Floating Header */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-center px-4 py-3 pointer-events-none">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          className="pointer-events-auto relative overflow-hidden rounded-2xl border border-black/10 bg-brand-white/90 backdrop-blur-xl shadow-md text-brand-black w-full max-w-5xl"
        >
          {/* Main Bar */}
          <div className="flex h-14 items-center justify-between px-4 sm:px-6">
            {/* Left: Brand / Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollTo('hero')}
                aria-label="Home"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-white text-xs font-black transition-transform hover:scale-105"
              >
                S
              </button>
              <button
                onClick={() => scrollTo('hero')}
                className="tracking-wider text-xs sm:text-sm font-bold uppercase text-brand-black hover:text-brand-green transition-colors"
              >
                MR. SALAD
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollTo('menu')}
                className="text-xs font-bold tracking-wider uppercase text-brand-black/70 hover:text-brand-green transition-colors"
              >
                MENU
              </button>
              <button
                onClick={() => scrollTo('subscription')}
                className="text-xs font-bold tracking-wider uppercase text-brand-black/70 hover:text-brand-green transition-colors"
              >
                SUBSCRIPTION
              </button>
              <button
                onClick={() => scrollTo('how-it-works')}
                className="text-xs font-bold tracking-wider uppercase text-brand-black/70 hover:text-brand-green transition-colors"
              >
                HOW IT WORKS
              </button>
              <button
                onClick={() => scrollTo('faq')}
                className="text-xs font-bold tracking-wider uppercase text-brand-black/70 hover:text-brand-green transition-colors"
              >
                FAQ
              </button>
            </nav>

            {/* Right: Zomato CTA (Desktop) & Mobile Hamburger */}
            <div className="flex items-center gap-2">
              {/* Quick Menu Button on Mobile */}
              <button
                onClick={() => scrollTo('menu')}
                className="md:hidden px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-brand-cream text-brand-black border border-brand-black/10"
              >
                MENU
              </button>

              <a
                href={ZOMATO_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-green text-white hover:bg-brand-dark transition-colors shadow-xs"
              >
                <span>ORDER ON ZOMATO</span>
                <span className="opacity-70 leading-none">↗</span>
              </a>

              {/* Mobile Hamburger toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                className="relative flex h-8 w-8 items-center justify-center rounded-lg hover:bg-black/5 transition-colors"
              >
                <span
                  className={`absolute h-[2px] w-4 rounded-full bg-brand-black transition-all duration-300 ${
                    isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[36%]'
                  }`}
                />
                <span
                  className={`absolute h-[2px] w-4 rounded-full bg-brand-black transition-all duration-300 ${
                    isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-[36%]'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Expanded Mobile Menu Drawer */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="flex flex-col gap-2 px-6 pb-6 pt-2 border-t border-black/5 text-brand-black"
              >
                <button
                  onClick={() => scrollTo('menu')}
                  className="text-lg font-bold tracking-tight hover:text-brand-green transition-colors py-1.5 text-left"
                >
                  Menu
                </button>
                <button
                  onClick={() => scrollTo('subscription')}
                  className="text-lg font-bold tracking-tight hover:text-brand-green transition-colors py-1.5 text-left"
                >
                  26-Day Wellness Subscription
                </button>
                <button
                  onClick={() => scrollTo('how-it-works')}
                  className="text-lg font-bold tracking-tight hover:text-brand-green transition-colors py-1.5 text-left"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollTo('testimonials')}
                  className="text-lg font-bold tracking-tight hover:text-brand-green transition-colors py-1.5 text-left"
                >
                  Reviews & Feedback
                </button>
                <button
                  onClick={() => scrollTo('faq')}
                  className="text-lg font-bold tracking-tight hover:text-brand-green transition-colors py-1.5 text-left"
                >
                  FAQ
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="text-lg font-bold tracking-tight hover:text-brand-green transition-colors py-1.5 text-left"
                >
                  Contact & Location
                </button>

                <div className="mt-3 pt-3 border-t border-black/10 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                  <p className="text-xs text-brand-black/60 font-medium">
                    {BRAND.addressLine1}, {BRAND.city}
                  </p>
                  <a
                    href={ZOMATO_URL || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-green text-white hover:bg-brand-dark transition-colors shadow-sm text-center flex items-center justify-center gap-1.5"
                  >
                    Order on Zomato <span className="opacity-70 leading-none">↗</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
