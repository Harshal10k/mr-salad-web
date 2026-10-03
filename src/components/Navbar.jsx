import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ZOMATO_URL, BRAND } from '../config/brand';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Always show if mobile menu drawer is open or near top of page
      if (isOpen || currentScrollY < 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down past threshold -> hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> show
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

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
      <header
        className={`fixed top-0 inset-x-0 z-40 flex justify-center px-4 py-4 pointer-events-none transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          className="pointer-events-auto relative overflow-hidden rounded-xl border border-black/[0.08] bg-white/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] text-brand-black w-full max-w-[320px]"
        >
          {/* Main Bar */}
          <div className="flex h-[46px] items-center justify-between px-3">
            {/* Left: Brand logo */}
            <button
              onClick={() => scrollTo('hero')}
              aria-label="Home"
              className="flex h-7 w-7 items-center justify-center rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 flex-shrink-0 border border-black/5"
            >
              <img
                src="/images/logo.jpg"
                alt="Mr. Salad"
                className="w-full h-full object-cover rounded-full"
              />
            </button>

            {/* Center: Brand name in clean bold uppercase */}
            <button
              onClick={() => scrollTo('hero')}
              className="font-display text-[13px] font-extrabold tracking-[0.14em] uppercase text-brand-black hover:opacity-75 transition-opacity"
            >
              MR. SALAD
            </button>

            {/* Right: Minimal 2-bar burger toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="relative flex h-7 w-7 items-center justify-center rounded-md hover:bg-black/5 transition-colors cursor-pointer"
            >
              <span
                className={`absolute h-[1.75px] w-4 rounded-full bg-brand-black transition-all duration-300 ${
                  isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[36%]'
                }`}
              />
              <span
                className={`absolute h-[1.75px] w-4 rounded-full bg-brand-black transition-all duration-300 ${
                  isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-[36%]'
                }`}
              />
            </button>
          </div>

          {/* Expanded Menu Drawer */}
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
                  onClick={() => { setIsOpen(false); navigate('/menu'); }}
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
