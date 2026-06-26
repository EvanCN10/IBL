import React from "react";
import Image from "next/image";

export const FormSuccessScreen = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden select-none z-10">
      {/* Header Banner */}
      <div className="bg-[#AC1F1A] border-[3px] border-black px-6 py-1.5 rounded-[10px] shadow-[4px_4px_0px_0px_#000] inline-flex justify-center items-center z-10">
        <h2 className="font-hollywood text-[42px] text-white tracking-wider uppercase leading-none">
          FORM TERSUBMIT!
        </h2>
      </div>

      {/* GOOD LUCK Text Graphic */}
      <div className="flex flex-col items-center gap-2 mt-12 font-crosner text-[#FBF5EC] text-7xl md:text-[100px] font-black uppercase tracking-wider relative z-10 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="flex items-center gap-3 select-none relative">
          <span>G</span>
          
          {/* Basketball 1 with Flame */}
          <div className="relative w-20 h-20 md:w-[104px] md:h-[104px] mx-1 mt-2">
            {/* Flame SVG overlay */}
            <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 w-14 h-14 z-10 animate-pulse">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 17 7.5 17 11.5C17 14.5 14.5 17 12 17C9.5 17 7 14.5 7 11.5C7 7.5 12 2 12 2Z" fill="#AC1F1A" />
                <path d="M12 6C12 6 15 10 15 13C15 15 13.5 16.5 12 16.5C10.5 16.5 9 15 9 13C9 10 12 6 12 6Z" fill="#E65100" />
                <path d="M12 9C12 9 13.5 11.5 13.5 13.5C13.5 14.8 12.8 15.8 12 15.8C11.2 15.8 10.5 14.8 10.5 13.5C10.5 11.5 12 9 12 9Z" fill="#FFB300" />
              </svg>
            </div>
            <Image src="/images/Basketball.svg" alt="O" fill className="object-contain" />
          </div>

          {/* Basketball 2 with Flame */}
          <div className="relative w-20 h-20 md:w-[104px] md:h-[104px] mx-1 mt-2">
            {/* Flame SVG overlay */}
            <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 w-14 h-14 z-10 animate-pulse">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 17 7.5 17 11.5C17 14.5 14.5 17 12 17C9.5 17 7 14.5 7 11.5C7 7.5 12 2 12 2Z" fill="#AC1F1A" />
                <path d="M12 6C12 6 15 10 15 13C15 15 13.5 16.5 12 16.5C10.5 16.5 9 15 9 13C9 10 12 6 12 6Z" fill="#E65100" />
                <path d="M12 9C12 9 13.5 11.5 13.5 13.5C13.5 14.8 12.8 15.8 12 15.8C11.2 15.8 10.5 14.8 10.5 13.5C10.5 11.5 12 9 12 9Z" fill="#FFB300" />
              </svg>
            </div>
            <Image src="/images/Basketball.svg" alt="O" fill className="object-contain" />
          </div>

          <span>D</span>
        </div>
        <div className="text-[80px] md:text-[116px] tracking-[10px] text-[#FBF5EC] -mt-4">LUCK</div>
      </div>
    </div>
  );
};
