import React from "react";
import Image from "next/image";
import { LandingSection } from "@/components/sections/RegisterPage/LandingSection";
import { MidSection } from "@/components/sections/RegisterPage/MidSection";
import { FormSection } from "@/components/sections/RegisterPage/FormSection";

export default function Register() {
  return (
    <main
      className="w-full flex flex-col relative"
      style={{
        backgroundImage: "url('/images/Full_Page_Desktop.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        aspectRatio: "2880 / 6646",
      }}
    >
      {/* Landing Section (y: 0 to 1500 -> 22.57% of 6646) */}
      <div className="w-full flex" style={{ height: "22.57%" }}>
        <LandingSection />
      </div>

      {/* Mid Section (y: 1500 to 4500 -> 45.14% of 6646) */}
      <div className="w-full flex" style={{ height: "45.14%" }}>
        <MidSection />
      </div>

      {/* Form Section (y: 4500 to 6646 -> 32.29% of 6646) */}
      <div className="w-full flex" style={{ height: "32.29%" }}>
        <FormSection />
      </div>
    </main>
  );
}
