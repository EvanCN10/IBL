"use client";

import React from "react";
import Image from "next/image";
import { RegistHeroSection } from "@/components/sections/RegistrationPage/RegistHeroSection";
import { GuidebookSection } from "@/components/sections/RegistrationPage/GuidebookSection";
import { RegisterNowSection } from "@/components/sections/RegistrationPage/RegisterNowSection";

export default function RegistrationPage() {
  return (
    <main className="w-full flex flex-col items-center relative min-h-screen overflow-hidden" style={{ backgroundColor: '#F1EAD7' }}>
      {/* Background Elements - Stretched full height to prevent hanging at the bottom */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none w-full" style={{ width: '2200px', height: '100%' }}>
        <Image 
          src="/images/registration/full-bg.png" 
          alt="Background"
          fill
          className="object-fill"
          priority
        />
      </div>

      {/* 1. Header/Hero Registration */}
      <RegistHeroSection />

      {/* 2. Guidebook Ticket Card */}
      <GuidebookSection />

      {/* 3. Register Now Clipboard Card */}
      <RegisterNowSection />
    </main>
  );
}
