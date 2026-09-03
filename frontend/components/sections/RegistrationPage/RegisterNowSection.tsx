"use client";

import React from "react";
import Image from "next/image";

export const RegisterNowSection = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center -mt-[6%] sm:-mt-[8%] lg:-mt-[60px] z-30 px-4 pb-32">
      
      <div className="relative w-[84%] max-w-[776px] flex justify-center drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:scale-[1.01] transition-transform duration-300">
        <Image 
          src="/images/registration/clipboard.svg?v=6" 
          alt="Clipboard Background" 
          width={776} 
          height={527} 
          className="w-full h-auto"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center rotate-[3deg] ml-[2%]">
          {/* Invisible clickable area for the button */}
          <a 
            href="/register" 
            className="absolute bottom-[20%] w-[40%] h-[15%] rounded-xl z-20 cursor-pointer"
            aria-label="Register Now"
          />
        </div>
      </div>
    </section>
  );
};
