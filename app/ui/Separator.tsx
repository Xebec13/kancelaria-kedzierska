"use client";

import { motion, Variants } from "motion/react";

interface SeparatorProps {
  className?: string;
  delay?: number;
}

const lineVariants: Variants = {
  initial: { scaleX: 0 },
  animate: (custom: number) => ({
    scaleX: 1,
    transition: { 
      delay: custom || 0,
      duration: 1, 
      ease: [0.65, 0, 0.35, 1] 
    },
  }),
};

export const Separator = ({ className, delay = 0 }: SeparatorProps) => {
  return (
    <motion.div
      variants={lineVariants}
      custom={delay}
      initial="initial"
      animate="animate" // Zmieniamy na animate dla niezawodności w Hero
      style={{ originX: 1 }}
      className={`min-h-0.5 w-full mx-auto bg-current ${className || ""}`}
    />
  );
};