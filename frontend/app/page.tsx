"use client";

import React from "react";
import { HeroSection } from "@/components/sections/MainPage/HeroSection";
import { AboutSection } from "@/components/sections/MainPage/AboutSection";
import { ThemeSection } from "@/components/sections/MainPage/ThemeSection";
import { CountdownSection } from "@/components/sections/MainPage/CountdownSection";
import { TimelineSection } from "@/components/sections/MainPage/TimelineSection";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center">
      {/* 1. Hero Section (GET TO KNOW IBL) */}
      <HeroSection />

      {/* 2. About Section */}
      <AboutSection />

      {/* 3. Theme Section (3 Pilar) */}
      <ThemeSection />

      {/* 4. Countdown Section (Scoreboard) */}
      <CountdownSection />

      {/* 5. Timeline Section */}
      <TimelineSection />
    </main>
  );
}
