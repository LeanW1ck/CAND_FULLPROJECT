import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedSection = ({ children, className }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
};

export default AnimatedSection;
