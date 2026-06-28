"use client";

import React from "react";
import Image from "next/image";
import orangKanan from "@/public/images/orang kanan.svg";
import orangKiri from "@/public/images/orang kiri.svg";
import vectorHitam from "@/public/images/vector hitam.svg";
import vectorBiru from "@/public/images/vector biru.svg";
import { motion, Variants } from "framer-motion";

// Stagger parent container for vector entry animations
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

// Vector Hitam: Staggered entrance from top + visible infinite scale breathing
const vectorHitamVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
    scale: 1,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: [1, 1.05, 1],
    transition: {
      opacity: { duration: 0.6, ease: "easeInOut" },
      y: { duration: 0.6, ease: "easeInOut" },
      scale: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  },
};

// Vector Biru: Staggered entrance from top + visible infinite scale breathing (offset duration)
const vectorBiruVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
    scale: 1,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: [1, 1.05, 1],
    transition: {
      opacity: { duration: 0.6, ease: "easeInOut" },
      y: { duration: 0.6, ease: "easeInOut" },
      scale: {
        duration: 5.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  },
};

// Orang Kiri: Spring fade-in from left + visible infinite scale breathing
const orangKiriVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -120,
    scale: 1,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: [1, 1.07, 1],
    transition: {
      opacity: { duration: 0.8, ease: "easeOut" },
      x: { type: "spring", stiffness: 60, damping: 15, delay: 0.2 },
      scale: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  },
};

// Orang Kanan: Spring fade-in from right + visible infinite scale breathing (offset duration)
const orangKananVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 120,
    scale: 1,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: [1, 1.07, 1],
    transition: {
      opacity: { duration: 0.8, ease: "easeOut" },
      x: { type: "spring", stiffness: 60, damping: 15, delay: 0.3 },
      scale: {
        duration: 4.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  },
};


export const LandingSection = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-[1440px] flex items-center"
    >
      {/* Vector Hitam */}
      <motion.div
        variants={vectorHitamVariants}
        className="absolute z-2 top-0"
      >
        <Image src={vectorHitam} alt="Decorative Vector Hitam" />
      </motion.div>

      {/* Vector Biru */}
      <motion.div
        variants={vectorBiruVariants}
        className="absolute z-1 top-0"
      >
        <Image src={vectorBiru} alt="Decorative Vector Biru" />
      </motion.div>

      {/* Orang */}
      <div className="flex absolute gap-[7px] top-[341px] justify-center w-full z-5">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={orangKiriVariants}
          className="flex items-center justify-center"
        >
          <Image src={orangKiri} alt="Ilustrasi pemain basket kiri" />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={orangKananVariants}
          className="flex items-center justify-center"
        >
          <Image src={orangKanan} alt="Ilustrasi pemain basket kanan" />
        </motion.div>
      </div>

      {/* Logo IBL */}
      <div className="flex absolute top-[719px] gap-[47px] w-full justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/texts/IBL.svg"
            alt="IBL"
            width={666}
            height={199}
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <Image
            src="/texts/2K26.svg" // Ganti dengan path gambar aslimu nanti
            alt="2K26"
            width={666}
            height={199}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

