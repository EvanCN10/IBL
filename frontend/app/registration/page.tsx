"use client";

import React from "react";
import { RegistHeroSection } from "@/components/sections/RegistrationPage/RegistHeroSection";
import { GuidebookSection } from "@/components/sections/RegistrationPage/GuidebookSection";
import { RegisterNowSection } from "@/components/sections/RegistrationPage/RegisterNowSection";

export default function RegistrationPage() {
  return (
    <main className="w-full flex flex-col items-center">
      {/* 1. Header/Hero Registration */}
      <RegistHeroSection />

      {/* 2. Guidebook Ticket Card */}
      <GuidebookSection />

      {/* 3. Register Now Clipboard Card */}
      <RegisterNowSection />
    </main>
  );
}
