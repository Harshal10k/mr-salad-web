import React from 'react';
import { motion } from 'framer-motion';

const USP_ITEMS = [
  {
    title: 'HIGH PROTEIN',
    description: 'Meals designed with protein in mind.',
    // Minimal geometric line icon: clean balanced protein dumbbell/hex
    icon: (
      <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12" />
      </svg>
    ),
  },
  {
    title: 'NO DEEP FRY',
    description: 'Air-fried / prepared without deep frying.',
    // Minimal line icon: clean leaf / air flow (no oil drop / pure clean prep)
    icon: (
      <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'CALORIE COUNTED',
    description: 'Nutrition information clearly shown.',
    // Minimal line icon: clean analytics / measurement scale
    icon: (
      <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'HOME-STYLE',
    description: 'Comforting everyday food.',
    // Minimal line icon: comforting bowl / hearth
    icon: (
      <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

export default function UspStripSection() {
  return (
    <section className="relative z-20 border-y border-brand-black/10 bg-brand-cream/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 md:py-10">
        {/* Desktop: 4 columns in 1 horizontal row | Mobile: 2x2 grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y-0">
          {USP_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="flex flex-col items-start space-y-2 p-2"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-white border border-brand-black/10 flex items-center justify-center shadow-xs">
                {item.icon}
              </div>
              <div>
                <h3 className="font-display text-sm md:text-base font-black tracking-tight text-brand-black uppercase">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-brand-black/60 mt-0.5 leading-snug">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
