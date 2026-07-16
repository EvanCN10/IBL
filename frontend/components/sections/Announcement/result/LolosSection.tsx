import React from "react";
import Image from "next/image";
import CongratsDesktop from "@/public/images/announcement/CONGRATS DESKTOP.svg";
import TicketCongrats from "@/public/images/announcement/Ticket_Congrats.svg";

interface LolosSectionProps {
  nrp: string;
  urlName?: string;
}

export default function LolosSection({ nrp, urlName }: LolosSectionProps) {
  const displayName = urlName || "(nama)";

  return (
    <div className="flex flex-col items-center justify-center select-none max-w-full">
      {/* Congrats sticker */}
      <div className="w-[320px] sm:w-[350px] h-auto flex items-center justify-center mb-[-36px] z-10 relative">
        <Image
          src={CongratsDesktop}
          alt="Congratulations!"
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Ticket wrapper using exact aspect ratio of the SVG (575x363) */}
      <div className="relative w-[575px] max-w-full aspect-[575/363] z-0">
        <Image
          src={TicketCongrats}
          alt="Ticket Congrats"
          fill
          className="object-contain"
          priority
        />

        {/* Ticket Header Title */}
        <div
          className="absolute font-hollywood text-center select-none uppercase"
          style={{
            fontFamily: "var(--font-hollywood), sans-serif",
            fontSize: "30px",
            lineHeight: "1.15",
            width: "259px",
            height: "34px",
            letterSpacing: "-0.02em",
            background: "linear-gradient(180deg, #390100 30.77%, #770202 65.87%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            WebkitTextStroke: "1px #FFFFFF",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.67)",
            top: "19.7%", // Mathematically centered on the orange header stripe
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          WELCOME TO THE TEAM
        </div>

        {/* Text content area - centered exactly over the white box of Ticket_Congrats */}
        <div
          className="absolute flex flex-col justify-center items-center text-center font-drowner text-black px-6 z-10"
          style={{
            width: "80.1%", // Mathematically maps to the 461px white box width in the SVG
            height: "44.9%", // Mathematically maps to the 163px white box height in the SVG
            fontFamily: "var(--font-drowner), sans-serif",
            fontSize: "16px",
            lineHeight: "1.4",
            top: "52.9%", // Mathematically centered in the white box
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <p className="mb-2">Hi, {displayName}</p>
          <p className="mb-2">
            Anda telah berhasil lolos Open Recruitment Staff IBL2K26.
          </p>
          <p>Selamat datang di keluarga besar IBL2K26!</p>
        </div>
      </div>
    </div>
  );
}

