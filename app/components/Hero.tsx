"use client";

import { motion, useScroll, useTransform, Variants, MotionValue } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Separator } from "@/app/ui/Separator";
import FloatingLogo from "@/app/ui/FloatingLogo";

// --- VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.1,
      ease: [0.3, 1, 0.3, 1],
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

// --- SUB-COMPONENTS ---
const HeroImg = ({ scale }: { scale: MotionValue<number> }) => (
  <motion.div
    style={{ scale }}
    className="absolute top-1/7 left-1/2 size-1/5 min-h-80 min-w-3xs -translate-x-1/2 will-change-transform lg:top-1/4 lg:left-1/9 lg:size-full lg:max-h-1/2 lg:max-w-sm lg:translate-0"
  >
    <motion.div
      initial={{ opacity: 0, rotate: 15, y: 30 }}
      animate={{ opacity: 1, rotate: 0, y: 0 }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="relative size-full overflow-hidden bg-orange-300/30"
    >
      <div
        className="absolute inset-0 scale-110 bg-center bg-contain blur-[5px]"
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
);

const HeroTitle = ({ y }: { y: MotionValue<string> }) => (
  <motion.div
    style={{ y }}
    initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
    animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
    transition={{
      duration: 3,
      delay: 0.5,
      ease: [0.5, 1, 0.3, 1]
    }}
    className="absolute bottom-1/5 lg:bottom-0 lg:left-0 size-full max-w-full opacity-95 mix-blend-plus-darker pointer-events-none"
  >
    <Image
      src="/title-9.svg"
      alt="Paulina Kędzierska"
      fill
      className="object-contain object-bottom px-3 lg:px-10"
      priority
    />
  </motion.div>
);

const HeroContent = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // BAZA: Solidne tło i border stone-500
      className="relative size-full lg:max-w-[55%] bg-stone-950 border-2 border-orange-300/20 group"
    >
      {/* --- MASKI BORDERÓW (Logika z Uiverse) --- */}

      {/* Maska Pionowa (Before): ukrywa lewy i prawy border, zostawiając rogi */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute top-1.5 -left-0.5 w-[calc(100%+4px)] h-[calc(100%-12px)] bg-stone-950 z-10 pointer-events-none origin-center"
      />

      {/* Maska Pozioma (After): ukrywa górę i dół, zostawiając rogi. Ma delay 0.5s jak w oryginale */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: isHovered ? 0.5 : 0 }}
        className="absolute left-1.5 -top-0.5 h-[calc(100%+4px)] w-[calc(100%-12px)] bg-stone-950 z-10 pointer-events-none origin-center"
      />

      {/* --- TREŚĆ (Z-20 aby była nad maskami) --- */}
      <div className="relative  z-20 grid grid-cols-1 lg:grid-cols-3 auto-rows-[minmax(100px,1fr)] md:auto-rows-[minmax(150px,0.5fr)] lg:auto-rows-[minmax(250px,1fr)] py-5 px-7 size-full bg-stone-950/90">
        <FloatingLogo count={20} opacity={0.3} />
        {/* ZŁOTE KOŁO */}
        <motion.div
          className="will-change-[filter,transform] pointer-events-none absolute z-0 size-64 rounded-full bg-orange-300/20 blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            x: mousePos.x - 128,
            y: mousePos.y - 128,
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0,
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.6 }}
        />
        <motion.div variants={itemVariants} className="lg:col-span-2 text-xl">
          <h1 className="font-cinzel text-orange-300 uppercase tracking-widest font-medium">Paulina Kędzierska</h1>
          <h4 className="text-[10px] uppercase text-stone-100 tracking-[0.3em] mt-1 font-light">Kancelaria Notarialna</h4>
        </motion.div>

        <motion.div variants={itemVariants} className="row-start-2 lg:row-start-1 lg:col-start-3 flex flex-col justify-start mx-auto items-center max-w-fit">
          <h2 className="font-cinzel text-base font-light">Notariusz w Warszawie</h2>
          <Separator className="text-orange-300/50" delay={3.5} />
          <h3 className="text-base opacity-70 font-light whitespace-pre-wrap">Praga Południe | Saska Kępa</h3>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-2 row-start-3 lg:row-start-2 overflow-hidden px-1">
          <p className="text-base lg:text-lg leading-snug tracking-wide text-stone-200">
            Wspólnie dopilnujemy Twoich formalności. Zmieniamy język przepisów w konkretne bezpieczeństwo, byś mógł czuć pewność na każdym etapie swojej sprawy.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-3 flex flex-col lg:flex-row self-center justify-self-center gap-4 row-start-4 lg:row-start-3">
          <button className="cursor-pointer border border-stone-500 py-3 px-6 text-xs font-bold uppercase tracking-widest text-stone-300 transition-all hover:bg-orange-300 hover:border-orange-300 hover:text-stone-950">
            123 456 789
          </button>
          <button className="cursor-pointer border border-stone-500 py-3 px-6 text-xs font-bold uppercase tracking-widest text-stone-300 transition-all hover:bg-orange-300 hover:border-orange-300 hover:text-stone-950">
            p.kedzierska@notariusze.waw.pl
          </button>
        </motion.div>
      </div>
    </motion.div>

  );
};
// --- MAIN COMPONENT ---

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
        <HeroImg scale={imgScale} />
        <HeroTitle y={y} />
      </div>
      <div className="flex min-h-[200vh] items-end justify-end relative z-10 overflow-hidden p-1 lg:p-5">
        <HeroContent />
      </div>
    </section>
  );
}