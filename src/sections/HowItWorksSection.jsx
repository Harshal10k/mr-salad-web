import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

const StepCard = ({ step, index, containerProgress }) => {
  // Staggered intervals starting well ahead of time across scroll progress [0, 1]
  // Card 0: 0.00 -> 0.22
  // Card 1: 0.18 -> 0.42
  // Card 2: 0.38 -> 0.62
  // Card 3: 0.58 -> 0.82
  const start = index * 0.20;
  const end = Math.min(1, start + 0.24);

  const opacity = useTransform(
    containerProgress,
    [start, end],
    [0.15, 1]
  );

  const y = useTransform(
    containerProgress,
    [start, end],
    [32, 0]
  );

  const scale = useTransform(
    containerProgress,
    [start, end],
    [0.96, 1]
  );

  const shadow = useTransform(
    containerProgress,
    [start, end],
    ['0 1px 2px 0 rgba(0, 0, 0, 0.03)', '0 12px 24px -4px rgba(0, 0, 0, 0.08)']
  );

  const borderColor = useTransform(
    containerProgress,
    [start, end],
    ['rgba(26, 26, 26, 0.06)', 'rgba(30, 58, 47, 0.25)']
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        boxShadow: shadow,
        borderColor,
      }}
      className="bg-brand-white rounded-3xl p-6 sm:p-8 border flex flex-col justify-between transition-colors duration-200"
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
  );
};

export default function HowItWorksSection() {
  const containerRef = useRef(null);

  // Starts even earlier when the section is still 15% below the viewport bottom
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 115%', 'end 70%'],
  });

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative bg-brand-cream text-brand-black py-24 md:py-32 border-t border-brand-black/10"
    >
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

        {/* 4 Steps Grid — Opacity and position tied 1:1 with scroll progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, idx) => (
            <StepCard
              key={step.number}
              step={step}
              index={idx}
              containerProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
