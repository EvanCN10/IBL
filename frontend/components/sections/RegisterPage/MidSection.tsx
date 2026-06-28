"use client";

import React from "react";
import OpenRecr from "@/public/texts/OPEN_RECRUITMENT_STAFF.svg";
import TimeCard from "@/public/images/TimeCard.png";
import Jam from "@/public/texts/JAM.svg";
import Menit from "@/public/texts/MENIT.svg";
import Hari from "@/public/texts/HARI.svg";
import { motion } from "framer-motion";

import Image from "next/image";

export const MidSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative top-[1023px] flex flex-col items-center gap-[35px]"
    >
      <Image src={OpenRecr} alt="Open Recruitment Staff" />
      <div className="flex flex-row gap-[50.16px] items-start">
        {/* Column 1: Jam */}
        <div className="flex flex-col items-center gap-[22px]">
          <div className="flex gap-[23.95px]">
            <div className="relative flex justify-center items-center">
              <Image src={TimeCard} alt="" />
              <p
                className="absolute inset-0 flex items-center justify-center text-[60px] font-['crosner'] text-black top-2"
                style={{ fontFamily: "crosner" }}
              >
                1
              </p>
            </div>
            <div className="relative flex justify-center items-center">
              <Image src={TimeCard} alt="" />
              <p
                className="absolute inset-0 flex items-center justify-center text-[60px] font-['crosner'] text-black top-2"
                style={{ fontFamily: "crosner" }}
              >
                2
              </p>
            </div>
          </div>
          <Image src={Hari} alt="Hari" />
        </div>

        {/* Column 2: Menit */}
        <div className="flex flex-col items-center gap-[22px]">
          <div className="flex gap-[23.95px]">
            <div className="relative flex justify-center items-center">
              <Image src={TimeCard} alt="" />
              <p
                className="absolute inset-0 flex items-center justify-center text-[60px] font-['crosner'] text-black top-2"
                style={{ fontFamily: "crosner" }}
              >
                3
              </p>
            </div>
            <div className="relative flex justify-center items-center">
              <Image src={TimeCard} alt="" />
              <p
                className="absolute inset-0 flex items-center justify-center text-[60px] font-['crosner'] text-black top-2"
                style={{ fontFamily: "crosner" }}
              >
                4
              </p>
            </div>
          </div>
          <Image src={Jam} alt="Jam" />
        </div>

        {/* Column 3: Detik */}
        <div className="flex flex-col items-center gap-[22px]">
          <div className="flex gap-[23.95px]">
            <div className="relative flex justify-center items-center">
              <Image src={TimeCard} alt="" />
              <p
                className="absolute inset-0 flex items-center justify-center text-[60px] font-['crosner'] text-black top-2"
                style={{ fontFamily: "crosner" }}
              >
                5
              </p>
            </div>
            <div className="relative flex justify-center items-center">
              <Image src={TimeCard} alt="" />
              <p
                className="absolute inset-0 flex items-center justify-center text-[60px] font-['crosner'] text-black top-2"
                style={{ fontFamily: "crosner" }}
              >
                6
              </p>
            </div>
          </div>
          <Image src={Menit} alt="Menit" />
        </div>
      </div>
    </motion.div>
  );
};
