import React from "react";
import Image from "next/image";

export const Navbar = () => {
  return (
    <header className="w-full h-[91px] bg-bone/75 z-[100] mx-auto flex items-center gap-[12px] p-10 fixed">
      <Image alt="Logo IBL 2K26" src="/images/LOGO_1.svg" width={72.6} height={76} />
      <span className="font-hollywood text-[24px]">IBL 2K26</span>
    </header>
  );
};
