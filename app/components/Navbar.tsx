"use client";

import { motion, AnimatePresence, Variants } from "motion/react";
import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "O Kancelarii", href: "#about", key: "about" },
  { label: "Czynności", href: "#tasks", key: "tasks" },
  { label: "Opłaty", href: "#fees", key: "fees" },
  { label: "Kontakt", href: "#contact", key: "contact" },
];

// --- VARIANTS ---

const itemRevealVariants: Variants = {
  hidden: { y: "-100%" },
  visible: (custom: number) => ({
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.3, 1, 0.3, 1],
      delay: 0.3 + custom * 0.3, // Startuje po pół sekundy, potem schodkowo
    },
  }),
};

const sidebarVariants: Variants = {
  hidden: { x: "100%" },
  visible: { 
    x: 0,
    transition: { type: "spring", damping: 25, stiffness: 200 }
  },
  exit: { 
    x: "100%",
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="fixed flex items-center justify-end top-0 right-0 py-3 px-5 lg:py-5 lg:px-10 z-60">
        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex items-center space-x-8 text-sm font-semibold uppercase tracking-widest text-stone-200">
          {navItems.map((item, i) => (
            <div key={item.key} className="overflow-hidden py-1">
              <motion.li
                custom={i}
                initial="hidden"
                animate="visible"
                variants={itemRevealVariants}
                className="cursor-pointer hover:text-orange-300 transition-colors duration-300"
              >
                <Link href={item.href}>{item.label}</Link>
              </motion.li>
            </div>
          ))}
        </ul>

        {/* HAMBURGER BUTTON WRAPPER */}
        <div className="lg:hidden overflow-hidden py-1">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemRevealVariants}
            custom={4} // Hamburger wjeżdża ostatni
            onClick={toggleMenu}
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
            className="flex flex-col justify-center items-end gap-1.5 p-1 size-10 cursor-pointer group relative z-70 backdrop-blur-sm border-2 border-orange-300/20"
          >
            {/* MASKI BORDERA (Bracket Reveal z Hero) */}
            <motion.div 
              initial={{ scaleY: 1 }}
              animate={{ scaleY: (isBtnHovered || isOpen) ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-1 -left-0.5 w-[calc(100%+4px)] h-[calc(100%-8px)] bg-stone-950 z-10 pointer-events-none origin-center"
            />
            <motion.div 
              initial={{ scaleX: 1 }}
              animate={{ scaleX: (isBtnHovered || isOpen) ? 0 : 1 }}
              transition={{ duration: 0.3, delay: (isBtnHovered || isOpen) ? 0.2 : 0 }}
              className="absolute left-1 -top-0.5 h-[calc(100%+4px)] w-[calc(100%-12px)] bg-stone-950 z-10 pointer-events-none origin-center"
            />

            {/* KRESKI HAMBURGERA */}
            <motion.div 
              animate={isOpen ? { rotate: 45, y: 8, backgroundColor: "#fafaf9" } : { rotate: 0, y: 0, backgroundColor: "#fafaf9" }}
              className="w-full h-0.5 relative z-20"
            />
            <motion.div 
              animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0, backgroundColor: "#fafaf9" }}
              className="w-3/4 h-0.5 relative z-20"
            />
            <motion.div 
              animate={isOpen ? { rotate: -45, y: -8, width: "100%", backgroundColor: "#fafaf9" } : { rotate: 0, y: 0, width: "50%", backgroundColor: "#fafaf9" }}
              className="h-0.5 relative z-20"
            />
          </motion.div>
        </div>
      </nav>

      {/* MOBILE OVERLAY SYSTEM */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={toggleMenu}
              className="fixed inset-0 bg-stone-950/60 backdrop-blur-md z-40"
            />

            <motion.aside
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-screen w-full max-w-2/3 md:max-w-1/2 bg-stone-900 z-50 shadow-2xl flex flex-col pt-32 px-10 pb-10 border-l border-stone-800"
            >
              <nav>
                <ul className="flex flex-col space-y-8">
                  {navItems.map((item) => (
                    <li key={item.key} className="overflow-hidden group/item">
                      <Link
                        href={item.href}
                        onClick={toggleMenu}
                        className="text-stone-200 text-4xl font-light uppercase tracking-tighter transition-all hover:text-orange-300 block"
                      >
                        <span className="inline-block transition-transform duration-300 group-hover/item:translate-x-4">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="mt-auto border-t border-stone-800 pt-8">
                <p className="text-stone-500 uppercase tracking-widest text-xs mb-4">Kontakt</p>
                <p className="text-stone-300 text-sm">p.kedzierska@notariusze.waw.pl</p>
                <p className="text-stone-300 text-sm mt-2">123 456 789</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}