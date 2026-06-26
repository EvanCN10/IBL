"use client";

import React from "react";
import Image from "next/image";
import orangKanan from "@/public/images/orang kanan.svg";
import orangKiri from "@/public/images/orang kiri.svg";
import vectorHitam from "@/public/images/vector hitam.svg";
import vectorBiru from "@/public/images/vector biru.svg";
import { motion } from "framer-motion";

export const LandingSection = () => {
  return (
    <div className="relative w-[1440px] flex items-center">
      {/* Vector Hitam */}
      <motion.div
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="absolute z-2 top-0"
      >
        <Image src={vectorHitam} alt="" />
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="absolute z-1 top-0 " 
      >
        <Image src={vectorBiru} alt=""/>
      </motion.div>

      {/* Orang */}
      <div className="flex absolute gap-[7px] top-[341px] justify-center w-full z-5">
        <Image src={orangKiri} alt="orang-kanan" />
        <Image src={orangKanan} alt="orang-kanan" />
      </div>

      {/* Logo IBL */}
      <div className="flex absolute top-[719px] gap-[47px] w-full justify-center">
        <Image
          src="/images/IBL.svg"
          alt="Deskripsi gambar"
          width={666}
          height={199}
          priority
        />
        <Image
          src="/images/2K26.svg" // Ganti dengan path gambar aslimu nanti
          alt="Deskripsi gambar"
          width={666}
          height={199}
        />
      </div>
    </div>
  );
};
