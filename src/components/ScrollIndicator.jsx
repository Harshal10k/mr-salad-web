import React from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-brand-white z-20"
    >
      <span className="text-xs uppercase tracking-[0.2em] font-medium mb-3">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="h-12 w-[1px] bg-brand-white/50 relative overflow-hidden"
      >
        <motion.div 
          animate={{ y: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-1/2 bg-brand-white"
        />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
