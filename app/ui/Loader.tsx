"use client";

import { motion, AnimatePresence, Variants } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface LoaderProps {
  children: React.ReactNode;
}

export const Loader = ({ children }: LoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Czas trwania: 2s (pióro) + stagger tekstu + chwila na odczytanie
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const lineVariants: Variants = {
    initial: { scaleX: 0 },
    animate: { 
      scaleX: 1, 
      transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } 
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-9999 flex items-center justify-center bg-neutral-950 text-inherit overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center gap-5 p-3">
              <motion.div
                variants={quillVariants}
                initial="initial"
                animate="animate"
                className="relative size-18"
              >
                <Image src="/logo.svg" alt="Logo" fill className="object-contain" priority />
              </motion.div>

              <motion.div 
                variants={textContainerVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col items-center"
              >
                <motion.h1 
                  variants={textItemVariants}
                  className="font-serif text-3xl md:text-5xl tracking-widest leading-tight whitespace-nowrap"
                >
                  Paulina Kędzierska
                </motion.h1>
                
                <motion.div 
                  variants={lineVariants}
                  style={{ originX: 1 }}
                  className="h-0.5 w-full bg-current my-1.5"
                />
                
                <motion.h2 
                  variants={textItemVariants}
                  className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-sans opacity-70"
                >
                  Notariusz w Warszawie
                </motion.h2>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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