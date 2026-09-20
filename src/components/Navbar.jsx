import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Static navbar — sits at the top of the page and scrolls with content */}
      <header className="relative top-0 inset-x-0 z-50 flex justify-center px-4 py-4 pointer-events-none bg-brand-cream">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          className="pointer-events-auto relative overflow-hidden rounded-2xl border border-black/10 bg-white/90 backdrop-blur-xl shadow-md text-brand-black"
          style={{ width: isOpen ? 'min(92vw, 560px)' : '320px' }}
        >
          {/* Top row — compact pill matching sunday.ai */}
          <div className="flex h-[56px] w-full items-center justify-between px-3.5">
            {/* Left: Logo mark */}
            <a
              href="/"
              aria-label="Home"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-white text-xs font-black transition-transform hover:scale-105"
            >
              S
            </a>

            {/* Center: Brand Name */}
            <a href="/" className="tracking-wider text-xs font-bold uppercase text-brand-black">
              MR. SALAD
            </a>

            {/* Right: Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="relative flex h-8 w-8 items-center justify-center rounded-lg hover:bg-black/5 transition-colors"
            >
              <span className={`absolute h-[2px] w-4 rounded-full bg-brand-black transition-all duration-300 ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[36%]'}`} />
              <span className={`absolute h-[2px] w-4 rounded-full bg-brand-black transition-all duration-300 ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-[36%]'}`} />
            </button>
          </div>

          {/* Expanded dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="flex flex-col gap-2 px-6 pb-6 pt-2 border-t border-black/5 text-brand-black"
              >
                {[
                  { label: 'Menu', href: '#menu' },
                  { label: 'Our Story', href: '#story' },
                  { label: 'Nutrition Studio', href: '#story' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-bold tracking-tight hover:text-brand-green transition-colors py-1"
                  >
                    {label}
                  </a>
                ))}
                <div className="mt-3 pt-3 border-t border-black/10 flex items-center justify-between">
                  <p className="text-xs text-brand-black/60 font-medium">Bajaj Nagar, Nagpur</p>
                  <a
                    href="#order"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-green text-white hover:bg-brand-dark transition-colors shadow-sm"
                  >
                    Order Now
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
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
