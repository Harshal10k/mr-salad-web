import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const BrandStatementSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section className="relative min-h-[75svh] md:min-h-[90vh] flex items-center bg-brand-cream text-brand-black px-6 py-24 md:py-32 overflow-hidden">
      {/* Subtle organic visual element - abstract shapes hinting at leaves/bowls */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div className="absolute -right-1/4 -top-1/4 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full border-[1px] border-brand-green" />
        <div className="absolute -right-1/3 top-1/4 w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] rounded-full border-[1px] border-brand-green" />
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-start justify-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl"
        >
          <motion.h3 
            variants={itemVariants}
            className="uppercase tracking-[0.2em] text-sm md:text-base font-medium mb-8 text-brand-green"
          >
            THE DIET STUDIO
          </motion.h3>

          <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-bold leading-[0.95] tracking-tighter mb-12">
            <motion.span variants={itemVariants} className="block">EATING WELL</motion.span>
            <motion.span variants={itemVariants} className="block">SHOULDN'T FEEL</motion.span>
            <motion.span variants={itemVariants} className="block text-brand-wood">LIKE A COMPROMISE.</motion.span>
          </h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl font-medium max-w-lg text-brand-black/80 text-balance leading-relaxed"
          >
            Fresh food, satisfying meals and everyday choices made to fit the way you live.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStatementSection;
