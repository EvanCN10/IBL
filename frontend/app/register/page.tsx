"use client";

import React from "react";
import { LandingSection } from "@/components/sections/RegisterPage/LandingSection";
import { MidSection } from "@/components/sections/RegisterPage/MidSection";
import { FormSection } from "@/components/sections/RegisterPage/FormSection";
import { useScaleRatio } from "@/lib/hooks/useScaleRatio";

export default function Register() {
  const scale = useScaleRatio(1440);

  return (
    <main
      className="w-full relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/Full_Page_Desktop.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        aspectRatio: "2880 / 6646",
      }}
    >
      <div
        className="absolute top-0 left-1/2"
        style={{
          width: "1440px",
          height: "3323px",
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        <LandingSection />
        <MidSection />
        <FormSection />
      </div>
    </main>
  );
}

