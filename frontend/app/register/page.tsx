"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { LandingSection } from "@/components/sections/RegisterPage/LandingSection";
import { MidSection } from "@/components/sections/RegisterPage/MidSection";
import { FormSection } from "@/components/sections/RegisterPage/FormSection";
import { useScaleRatio } from "@/lib/hooks/useScaleRatio";

export default function Register() {
  const [isLoading, setIsLoading] = useState(true);
  const scale = useScaleRatio(1440);

  useEffect(() => {
    let imageLoaded = false;
    let timerFinished = false;

    const checkFinished = () => {
      if (imageLoaded && timerFinished) {
        setIsLoading(false);
      }
    };

    // Preload background image
    const img = new window.Image();
    img.src = "/images/Full_Page_Desktop.webp";
    img.onload = () => {
      imageLoaded = true;
      checkFinished();
    };
    img.onerror = () => {
      imageLoaded = true;
      checkFinished();
    };

    // Minimum delay of 1.2s for smooth loading animation
    const timer = setTimeout(() => {
      timerFinished = true;
      checkFinished();
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!isLoading && (
        <main
          className="w-full relative overflow-hidden"
          style={{
            backgroundImage: "url('/images/Full_Page_Desktop.webp')",
            backgroundSize: "100% auto",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            aspectRatio: "2880 / 6646",
          }}
        >
          <h1 className="sr-only">Open Recruitment Staff IBL 2K26 — Pendaftaran</h1>

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
      )}
    </>
  );
}

