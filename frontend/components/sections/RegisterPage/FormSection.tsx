"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FormClosed } from "./FormClosed";

// Direct imports for background graphics to preserve native dimensions
import starBg from "@/public/images/star bg.webp";
import sinarAtas from "@/public/images/Sinar Atas.svg";

export const FormSection = () => {
  return (
    <div className="absolute top-0 left-0 w-[1440px] h-[3323px] select-none pointer-events-none">
      {/* Background graphics (no-wrap next/image with imported dimensions) */}
      <DecoLayer
        isDesktop={isDesktop}
        breathAnimate={breathAnimate}
        breathTransition={breathTransition}
        src={starBg}
        className="absolute top-[1345px] left-0 z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 60, damping: 14 }}
      />
      <DecoLayer
        isDesktop={isDesktop}
        breathAnimate={breathAnimate}
        breathTransition={breathTransition}
        src={sinarAtas}
        className="absolute top-[1472px] left-0 z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.05 }}
      />

      {/* Form Content container to enable input pointer-events */}
      <div className="w-full h-full relative z-10 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-auto z-30"
          style={{
            top: "1677px",
            width: "883px",
          }}
        >
          <FormClosed />
        </motion.div>
      </div>
    </div>
  );
};
