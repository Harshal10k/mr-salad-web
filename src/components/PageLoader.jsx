import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return !sessionStorage.getItem('mrsalad_visited');
      } catch {
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    if (!loading) return;

    // Cap the animation at ~2s - 2.5s
    const timer = setTimeout(() => {
      setLoading(false);
      try {
        sessionStorage.setItem('mrsalad_visited', 'true');
      } catch {
        // Ignore storage exceptions
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-cream pointer-events-none select-none"
          aria-hidden="true"
        >
          {/* 4-dot cluster logo mark in brand green (four circles in square, flower-like pattern) */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 0, delay: 0 },
                { id: 1, delay: 0.15 },
                { id: 2, delay: 0.45 },
                { id: 3, delay: 0.3 },
              ].map((dot) => (
                <motion.div
                  key={dot.id}
                  className="w-4 h-4 rounded-full bg-brand-green shadow-xs"
                  animate={{
                    scale: [0.85, 1.25, 0.85],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: dot.delay,
                  }}
                />
              ))}
            </div>
          </div>

          {/* "MR. SALAD" text beneath it */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-6 flex flex-col items-center"
          >
            <span className="font-display text-lg sm:text-xl font-black tracking-[0.25em] text-brand-black uppercase">
              MR. SALAD
            </span>
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green font-bold mt-1">
              The Diet Studio
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
