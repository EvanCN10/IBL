import React from "react";
import Image from "next/image";
import ThankYouDesktop from "@/public/images/announcement/THANKYOU DESKTOP.svg";
import TicketCongrats from "@/public/images/announcement/Ticket_Congrats.svg";

interface TidakLolosSectionProps {
  nrp: string;
  urlName?: string;
}

export default function TidakLolosSection({ nrp, urlName }: TidakLolosSectionProps) {
  const displayName = urlName || "(nama)";

  return (
    <div className="flex flex-col items-center justify-center select-none max-w-full">
      {/* Thank you sticker */}
      <div className="w-[320px] sm:w-[350px] h-auto flex items-center justify-center mb-[-36px] z-10 relative">
        <Image
          src={ThankYouDesktop}
          alt="Thank You!"
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

        {/* Text content area - centered exactly over the white box of Ticket_Congrats */}
        <div
          className="absolute font-drowner text-black px-6 z-10"
          style={{
            width: "71.65%", // Mathematically maps to 412px relative to 575px SVG width
            height: "30.85%", // Mathematically maps to 112px relative to 363px SVG height
            fontFamily: "var(--font-drowner), sans-serif",
            fontSize: "14px",
            lineHeight: "15px",
            letterSpacing: "0.08em",
            color: "#000000",
            opacity: 0.8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            top: "52.9%", // Center of the white slot
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <p className="my-0.5">Hi, {displayName}</p>
          <p className="my-0.5">
            Terima kasih telah mengikuti Open Recruitment Staff IBL2k26.
          </p>
          <p className="my-0.5">
            Mohon maaf, pada kesempatan ini Anda belum dinyatakan lolos.
          </p>
          <p className="my-0.5">
            Keep growing and see you on another opportunity!
          </p>
        </div>
      </div>
    </div>
  );
}
