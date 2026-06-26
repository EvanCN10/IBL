import React from "react";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="w-full h-[91px] bg-bone/75 z-100 mx-auto flex items-center gap-[12px] p-10 fixed">
      <Image alt="logo-ibl" src="/images/LOGO_1.svg" width={72.6} height={76} />
      <h1 className="font-hollywood text-[24px]">IBL 2K26</h1>
    </div>
  );
};
