import React from "react";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div 
      className="w-full bg-bone/75 flex items-center absolute"
      style={{
        height: "var(--navbar-height)",
        paddingLeft: "var(--navbar-padding)",
        paddingRight: "var(--navbar-padding)",
        gap: "var(--navbar-gap)",
      }}
    >
      <div 
        className="relative flex-shrink-0"
        style={{
          width: "var(--navbar-logo-width)",
          height: "var(--navbar-logo-height)",
        }}
      >
        <Image 
          alt="logo-ibl" 
          src="/images/LOGO_1.svg" 
          fill 
          className="object-contain" 
          priority
        />
      </div>
      <h1 
        className="font-hollywood"
        style={{ fontSize: "var(--navbar-font-size)" }}
      >
        IBL 2K26
      </h1>
    </div>
  );
};
