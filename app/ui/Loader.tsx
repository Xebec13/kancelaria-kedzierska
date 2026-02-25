"use client";

import { motion, AnimatePresence, Variants } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface LoaderProps {
  children: React.ReactNode;
}

/**
 * ANIMATION VARIANTS
 */
const quillVariants: Variants = {
  initial: { opacity: 0, x: 500, y: -50, rotate: -80 },
  animate: {
    opacity: 1, x: 0, y: 0, rotate: -20,
    transition: { duration: 2, ease: [0, 0.55, 0.45, 1] }
  }
};

const textContainerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { delay: 1.5, staggerChildren: 0.2, delayChildren: 1.5 } 
  }
};

const textItemVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const lineVariants: Variants = {
  initial: { scaleX: 0 },
  animate: { 
    scaleX: 1, 
    transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } 
  }
};

export const Loader = ({ children }: LoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-inherit text-inherit"
          >
            <div className="flex flex-col lg:flex-row items-center gap-5 p-3">
              {/* BRAND ICON */}
              <motion.div
                variants={quillVariants}
                initial="initial"
                animate="animate"
                className="relative size-10 lg:size-15"
              >
                <Image src="/logo-6.svg" alt="Logo" fill className="object-contain opacity-80" priority />
              </motion.div>

              {/* BRAND TEXT */}
              <motion.div 
                variants={textContainerVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col items-center"
              >
                <motion.p 
                  variants={textItemVariants}
                  className="font-cinzel whitespace-nowrap text-xl lg:text-3xl leading-tight tracking-widest text-orange-300"
                >
                  Paulina Kędzierska
                </motion.p>
                
                <motion.div 
                  variants={lineVariants}
                  style={{ originX: 1 }}
                  className="my-1.5 h-0.5 w-full bg-orange-300 opacity-50"
                />
                
                <motion.p 
                  variants={textItemVariants}
                  className="font-sans text-base lg:text-lg uppercase font-light tracking-widest leading-tight opacity-80"
                >
                  Notariusz w Warszawie
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT REVEAL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {!isLoading && children}
      </motion.div>
    </>
  );
};