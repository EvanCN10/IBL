"use client";

import React from "react";
import Image from "next/image";

export const RegistHeroSection = () => {
  return (
    <section className="relative w-full flex flex-col items-center pt-[10%] md:pt-24 z-30 px-4">
      {/* Decorative scribbles */}
      <div className="absolute top-[10%] left-[5%] md:left-[15%] w-[15%] max-w-[150px] -z-10 pointer-events-none">
        <Image src="/images/registration/lightning-left.png" alt="Lightning Left" width={200} height={200} className="w-full h-auto" />
      </div>
      <div className="absolute top-[25%] right-[5%] md:right-[15%] w-[15%] max-w-[150px] -z-10 pointer-events-none">
        <Image src="/images/registration/lightning-right.png" alt="Lightning Right" width={200} height={200} className="w-full h-auto" />
      </div>
      <div className="absolute top-[35%] left-[2%] md:left-[10%] w-[20%] max-w-[200px] -z-10 pointer-events-none">
        <Image src="/images/registration/ball-left.png" alt="Ball Left" width={200} height={200} className="w-full h-auto" />
      </div>

      {/* Teal Banner / Title */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-[928px]">
        <div className="relative w-[82%] max-w-[763px] flex items-center justify-center">
          <Image 
            src="/images/registration/text-ornament.svg" 
            alt="Teal Banner" 
            width={763} 
            height={288} 
            className="w-full h-auto drop-shadow-2xl" 
          />
          {/* Overlay text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-[1%]">
             <h1 className="text-[28px] sm:text-[40px] md:text-[50px] lg:text-[68px] font-black text-white text-center leading-[1] drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]" style={{ fontFamily: 'var(--font-hollywood), Impact, sans-serif', letterSpacing: '4px', WebkitTextStroke: '2px rgba(0,0,0,0.1)' }}>
               OPEN TEAM<br/>REGISTRATION
             </h1>
          </div>
        </div>
      </div>
    </section>
  );
};
