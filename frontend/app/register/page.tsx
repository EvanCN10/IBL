import React from "react";
import Image from "next/image";
import { LandingSection } from "@/components/sections/RegisterPage/LandingSection";
import { MidSection } from "@/components/sections/RegisterPage/MidSection";
import { FormSection } from "@/components/sections/RegisterPage/FormSection";

export default function Register() {
  return (
    <main
      className="w-full flex flex-col"
      style={{
        backgroundImage: "url('/images/Full_Page_Desktop.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        aspectRatio: "2880 / 6646",
      }}
    >
      <LandingSection />
      <MidSection />
      <FormSection />
    </main>
  );
}
