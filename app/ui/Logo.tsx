"use client";

import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
    return (
        <div className={`flex items-center gap-3 ${className || ""}`}>
            <div className="relative size-10">
                <Image 
                    src="/logo.svg" 
                    alt="Logo" 
                    fill 
                    className="object-contain" 
                />
            </div>
            <div className="flex flex-col leading-tight">
                <p className="font-serif text-lg tracking-wider">Paulina Kędzierska</p>
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-70">Kancelaria Notarialna</p>
            </div>
        </div>
    );
}