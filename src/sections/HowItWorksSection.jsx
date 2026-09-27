import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'CHOOSE',
    detail: 'Choose a meal or wellness plan from our menu.',
  },
  {
    number: '02',
    title: 'ORDER / CONTACT',
    detail: (
      <>
        <span><strong>Individual meals:</strong> Order via Zomato or Swiggy.</span>
        <br />
        <span className="mt-1 block"><strong>Subscriptions:</strong> Contact us through WhatsApp / phone.</span>
      </>
    ),
  },
  {
    number: '03',
    title: 'WE PREPARE',
    detail: 'Your meal is prepared fresh in Bajaj Nagar. Air-fried / prepared without deep frying.',
  },
  {
    number: '04',
    title: 'ENJOY',
    detail: 'Get your meal delivered fresh and enjoy clean nutrition.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-brand-cream text-brand-black py-20 md:py-28 border-t border-brand-black/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-green font-bold">
            Simple & Transparent
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.93] text-brand-black uppercase mt-2">
            HOW IT WORKS
          </h2>
          <p className="mt-3 text-base text-brand-black/60 max-w-md font-medium">
            From our diet studio kitchen to your table in four simple steps.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-brand-white rounded-3xl p-6 sm:p-8 border border-brand-black/8 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-4xl sm:text-5xl font-black text-brand-green/25 block mb-6">
                  {step.number}
                </span>
                <h3 className="font-display text-xl font-black tracking-tight text-brand-black uppercase mb-3">
                  {step.title}
                </h3>
                <div className="text-xs sm:text-sm text-brand-black/65 leading-relaxed">
                  {step.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
