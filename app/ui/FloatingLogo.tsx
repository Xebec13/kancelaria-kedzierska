"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface FloatingLogoProps {
  count?: number;
  opacity?: number;
}

const FloatingLogo = ({ count = 10, opacity = 0.05 }: FloatingLogoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".floating-item");

    items.forEach((item, i) => {
      const scale = Math.random() * 0.5 + 0.3; // Mniejsze skale dla elegancji

      item.animate(
        [
          {
            transform: `translate3d(${(i / count) * 100}vw, -10vh, 0) rotate(0deg) scale(${scale})`,
            opacity: 0,
          },
          {
            opacity: opacity,
            offset: 0.2,
          },
          {
            transform: `translate3d(${(i / count) * 100 + (Math.random() * 10 - 5)}vw, 110vh, 0) rotate(${Math.random() * 360}deg) scale(${scale})`,
            opacity: 0,
            offset: 1,
          },
        ],
        {
          duration: Math.random() * 40000 + 20000, // Bardzo powolny ruch (20-60 sekund)
          iterations: Infinity,
          delay: -(Math.random() * 20000),
        }
      );
    });
  }, [count, opacity]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" ref={containerRef}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="floating-item absolute top-[-10vh] left-0 w-8 h-8 lg:w-12 lg:h-12"
        >
          {/* Używamy Twojego logo.svg jako dryfującego elementu */}
          <div className="relative w-full h-full opacity-40">
            <Image 
              src="/logo-6.svg" 
              alt="logo" 
              fill 
              className="object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingLogo;