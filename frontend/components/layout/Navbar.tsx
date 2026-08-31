import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="w-full h-[100px] bg-[#FBF5E9] z-[200] flex items-center justify-between px-6 lg:px-16 fixed top-0 left-0 right-0 shadow-sm border-b border-[#1D1D1B]/5">
      
      {/* Left side: Logo (takes up equal space as the right side to balance) */}
      <div className="flex-1 flex justify-start">
        <div className="flex items-center gap-[11px]">
          <Image alt="Logo IBL 2K26" src="/images/LOGO_1.svg" width={82} height={89} className="w-[60px] h-[65px] lg:w-[82px] lg:h-[89px]" />
          <div className="flex flex-col items-start justify-center text-left leading-none font-extrabold text-[18px] lg:text-[20px] text-[#1D1D1B]" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span>IBL</span>
            <span>2K26</span>
          </div>
        </div>
      </div>

      {/* Center: Navigation Links */}
      <nav className="hidden xl:flex items-center justify-center gap-[50px] font-drowner text-[20px] text-[#1D1D1B] tracking-wider shrink-0">
        <Link href="/" className="hover:text-[#7F0303] transition-colors">Home</Link>
        
        <Link href="/registration" className="hover:text-[#7F0303] transition-colors">Registration</Link>
        
        <div className="relative inline-flex">
          <Link href="/schedule" className="hover:text-[#7F0303] transition-colors">Schedule & Result</Link>
          <span className="absolute -top-4 -right-5 text-[12px] font-extrabold text-[#7F0303]" style={{ fontFamily: 'Inter, sans-serif' }}>soon</span>
        </div>
        
        <div className="relative inline-flex">
          <Link href="/teams" className="hover:text-[#7F0303] transition-colors">Teams</Link>
          <span className="absolute -top-4 -right-5 text-[12px] font-extrabold text-[#7F0303]" style={{ fontFamily: 'Inter, sans-serif' }}>soon</span>
        </div>
        
        <div className="relative inline-flex">
          <Link href="/groups" className="hover:text-[#7F0303] transition-colors">Groups & Standings</Link>
          <span className="absolute -top-4 -right-5 text-[12px] font-extrabold text-[#7F0303]" style={{ fontFamily: 'Inter, sans-serif' }}>soon</span>
        </div>
        
        <div className="relative inline-flex">
          <Link href="/leaderboard" className="hover:text-[#7F0303] transition-colors">Leaderboard</Link>
          <span className="absolute -top-4 -right-5 text-[12px] font-extrabold text-[#7F0303]" style={{ fontFamily: 'Inter, sans-serif' }}>soon</span>
        </div>
      </nav>
      
      {/* Right side: Empty balancer (desktop) or Mobile Menu (mobile) */}
      <div className="flex-1 flex justify-end">
        <div className="xl:hidden flex items-center">
          <button className="p-2" aria-label="Menu">
            <div className="w-7 h-0.5 bg-[#1D1D1B] mb-1.5"></div>
            <div className="w-7 h-0.5 bg-[#1D1D1B] mb-1.5"></div>
            <div className="w-7 h-0.5 bg-[#1D1D1B]"></div>
          </button>
        </div>
      </div>

    </header>
  );
};
