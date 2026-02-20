import Image from "next/image";
import { Separator } from "../ui/Separator";

export default function Hero() {
  return (
    <section id="hero" className="grid min-h-screen pt-15 lg:pt-20 lg:place-items-center px-0 md:px-10 lg:px-30">
      
      {/* WRAPPER GRID */}
      <div className="grid size-full max-h-3/4 grid-flow-row auto-rows-fr lg:max-h-full lg:grid-flow-col lg:auto-cols-fr">
        
        {/* IMAGE CONTAINER */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src="/pk-notariusz-1.png"
            alt="Paulina Kędzierska - Notariusz"
            sizes="(max-width: 768px) 100vw, 50vw"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* CONTENT CONTAINER */}
        <div className="relative flex h-full max-h-1/2 flex-col items-center justify-start gap-5 px-5 py-5 lg:max-h-full lg:justify-center lg:gap-10">
          
          {/* SEO HEADER GROUP */}
          <div className="max-w-fit text-orange-300">
            <h1 className="font-display whitespace-nowrap text-center text-[clamp(1.25rem,2rem+2vw,6rem)] leading-relaxed tracking-tight">
              Paulina Kędzierska
            </h1>
            <Separator className="my-0.5" delay={0.6} />
            <h2 className="text-center text-[clamp(1rem,1.5rem+1.5vw,5rem)] font-light whitespace-nowrap">
              Kancelaria Notarialna
            </h2>
            <h3 className="text-center text-base font-medium opacity-80 md:text-lg lg:text-xl">
              Warszawa | Praga Południe | Saska
            </h3>
          </div>

          {/* DESCRIPTION */}
          <div className="max-w-[90%] px-1.5 text-justify tracking-tight lg:max-w-[85%]">
            <p className="text-base lg:text-xl">
              Zachęcam do zapoznania się z informacjami na stronie kancelarii. 
              W sprawie czynności notarialnych, wymaganych dokumentów oraz opłat 
              proszę o kontakt telefoniczny lub mailowy.
            </p>
          </div>

          {/* CALL TO ACTION */}
          <div className="flex items-center justify-center gap-2">
            <button className="rounded-sm border px-5 py-2 hover:bg-orange-300 hover:text-neutral-900 transition-colors">
              123 456 789
            </button>
            <button className="rounded-sm border px-5 py-2 hover:bg-orange-300 hover:text-neutral-900 transition-colors">
              mail@mail
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}