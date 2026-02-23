"use client";

import { motion, useScroll, useTransform, Variants } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.1,
      ease: [0.5, 1, 0.3, 1],
      staggerChildren: 0.4,
      when: "beforeChildren",
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.95]);

  return (
    <section ref={containerRef} id="hero" className="relative h-[300vh] bg-stone-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* WRAPPER POZYCJI I SKALI (Parallax) */}
        <motion.div
          style={{ scale: imgScale }}
          className="absolute bottom-1/2 left-1/2 size-1/4 min-h-100 min-w-3xs -translate-x-1/2 translate-y-1/2 will-change-transform lg:bottom-1/5 lg:left-1/9 lg:size-full lg:max-h-1/2 lg:max-w-sm lg:translate-0"
        >
          {/* KONTENER WIZUALNY (To jest Twoje "całe pudełko", które rotuje i wchodzi) */}
          <motion.div
            initial={{ opacity: 0, rotate: 15, y: 30 }}
            animate={{ opacity: 1, rotate: 0, y: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative size-full overflow-hidden bg-orange-300/30"
          >
            <div
              className="absolute inset-0 scale-110 bg-center bg-cover blur-[5px]"
              style={{ backgroundImage: "url('/pk-wood-bg.png')" }}
            />
            <Image
              src="/pk-notariusz.png"
              alt="Paulina Kędzierska"
              sizes="(max-width: 1024px) 100vw, 30vw"
              fill
              className="relative z-10 object-contain"
              priority
            />
          </motion.div>
        </motion.div>

        {/* TYTUŁ SVG (PARALLAX + REVEAL) */}
        <motion.div
          style={{ y }} // Parallax działa niezależnie
          initial={{
            opacity: 0,
            clipPath: "inset(0 100% 0 0)" // Maska zasłania napis od prawej (100%)
          }}
          animate={{
            opacity: 1,
            clipPath: "inset(0 0% 0 0)" // Maska odsłania wszystko (0%)
          }}
          transition={{
            duration: 3, // Długi, elegancki reveal
            delay: 0.5,    // Startuje, gdy zdjęcie już niemal skończy swój obrót
            ease: [0.16, 1, 0.3, 1]
          }}
          className="absolute bottom-0 left-5 size-full max-w-[98%] opacity-95 mix-blend-plus-lighter pointer-events-none"
        >
          <Image
            src="/title-9.svg"
            alt="Paulina Kędzierska"
            fill
            className="object-contain object-bottom"
            priority
          />
        </motion.div>
      </div>

      {/* FOOTER REVEAL */}
      <div className="flex h-[200vh] items-end justify-end">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true,}}
          className="grid h-[40%] w-full max-w-[55%] grid-cols-3 auto-rows-fr  p-3"
        >
          <motion.div variants={itemVariants} className="col-span-2 text-xl">
            <h1 className="text-orange-300 font-display uppercase tracking-tight">Paulina Kędzierska</h1>
          </motion.div>

          <motion.div variants={itemVariants} className="font-light">
            <h2 className="text-base text-orange-300">Notariusz</h2>
            <h3 className="text-base text-orange-300 opacity-70">Warszawa | Praga Południe | Saska</h3>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-3 flex self-center justify-self-center gap-4 row-start-2">
            <button className="cursor-pointer border border-orange-300 px-6 py-2 text-xs font-bold uppercase tracking-widest text-orange-300 transition-colors hover:bg-orange-300 hover:text-black">
              123 456 789
            </button>
            <button className="cursor-pointer border border-orange-300 px-6 py-2 text-xs font-bold uppercase tracking-widest text-orange-300 transition-colors hover:bg-orange-300 hover:text-black">
              mail@mail
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}