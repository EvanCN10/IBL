import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#FBF5E9] pt-16 pb-8 px-6 lg:px-16 flex flex-col items-center">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 mb-16">
        
        {/* Left Column: Logo & Socials */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            {/* TODO: Ganti src dengan logo IBL Fastbreak Collector yang aslinya */}
            <div className="w-[80px] h-[80px] relative">
              <Image 
                src="/images/LOGO_1.svg" 
                alt="IBL 2K26 Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-drowner text-[22px] tracking-wider text-[#1D1D1B] leading-none mb-1">IBL 2K26</span>
              <span className="text-[#7F0303] font-bold text-[16px] leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>Fastbreak Collector</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            {/* Instagram */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#419D9E] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <span className="text-[14px] font-semibold text-[#1D1D1B]" style={{ fontFamily: 'Inter, sans-serif' }}>@ibl2k26</span>
            </div>
            
            {/* TikTok */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#419D9E] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3"></path>
                </svg>
              </div>
              <span className="text-[14px] font-semibold text-[#1D1D1B]" style={{ fontFamily: 'Inter, sans-serif' }}>@ibl.2026</span>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#419D9E] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <span className="text-[14px] font-semibold text-[#1D1D1B]" style={{ fontFamily: 'Inter, sans-serif' }}>083130030546</span>
            </div>
          </div>
        </div>

        {/* Middle Column: Nav 1 */}
        <div className="flex flex-col gap-8 lg:mt-4">
          <Link href="/" className="font-drowner text-[18px] tracking-wider text-[#1D1D1B] hover:text-[#7F0303] transition-colors">Home</Link>
          <Link href="/registration" className="font-drowner text-[18px] tracking-wider text-[#1D1D1B] hover:text-[#7F0303] transition-colors">Registration</Link>
          <Link href="/schedule" className="font-drowner text-[18px] tracking-wider text-[#1D1D1B] hover:text-[#7F0303] transition-colors">Schedule & Result</Link>
        </div>

        {/* Right Column: Nav 2 */}
        <div className="flex flex-col gap-8 lg:mt-4 lg:pr-12">
          <Link href="/teams" className="font-drowner text-[18px] tracking-wider text-[#1D1D1B] hover:text-[#7F0303] transition-colors">Teams</Link>
          <Link href="/groups" className="font-drowner text-[18px] tracking-wider text-[#1D1D1B] hover:text-[#7F0303] transition-colors">Groups & Standings</Link>
          <Link href="/leaderboard" className="font-drowner text-[18px] tracking-wider text-[#1D1D1B] hover:text-[#7F0303] transition-colors">Leaderboard</Link>
        </div>

      </div>

      {/* Copyright */}
      <div className="w-full text-center">
        <p className="text-[12px] font-medium text-[#1D1D1B]" style={{ fontFamily: 'Inter, sans-serif' }}>
          Copyright &copy; 2026 IBL 2K26, Hak Cipta Dilindungi
        </p>
      </div>
    </footer>
  );
};
