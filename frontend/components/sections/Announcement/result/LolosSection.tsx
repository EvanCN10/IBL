import React from "react";
import CongratsDesktop from "@/public/images/announcement/CONGRATS DESKTOP.svg";
import ResultTicket from "../ResultTicket";

interface LolosSectionProps {
  nrp: string;
  urlName?: string;
}

export default function LolosSection({ nrp, urlName }: LolosSectionProps) {
  const displayName = urlName || "(nama)";

  return (
    <ResultTicket
      isLolos={true}
      stickerSrc={CongratsDesktop}
      stickerAlt="Congratulations!"
      stickerClass="w-[260px] sm:w-[280px] h-auto flex items-center justify-center mb-[-40px] z-10 relative"
      ticketMarginBottomClass="mb-28"
      contentStyle={{
        width: "80.1%",
        height: "44.9%",
        fontSize: "16px",
        lineHeight: "1.4",
        top: "52.9%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
      footerNode={
        <>
          {/* Konfirmasi ke contact person di bawah ini: */}
          <p
            className="absolute font-drowner text-black select-none text-center"
            style={{
              fontFamily: "var(--font-drowner), sans-serif",
              width: "303px",
              height: "36px",
              top: "102%",
              left: "calc(50% - 303px/2 + 28.78px)", // Figma formula
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "18px",
              letterSpacing: "0.08em",
              opacity: 0.8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Konfirmasi ke contact person di bawah ini:
          </p>

          {/* WhatsApp Button */}
          <button
            className="font-drowner absolute flex items-center justify-center gap-2.5 hover:opacity-90 active:translate-y-0.5 active:shadow-[6px_6px_0px_#000] transition-all select-none cursor-pointer"
            style={{
              width: "350px",
              height: "32px",
              left: "calc(50% - 350px/2 + 28.78px)", // Figma formula
              top: "114%",
              backgroundColor: "#25D366",
              border: "2px solid #000000",
              boxShadow: "8px 8px 0px #000000",
              borderRadius: "100px",
              color: "#FFFFFF",
              fontSize: "14px",
              lineHeight: "1",
              padding: "10px",
              fontFamily: "var(--font-drowner), sans-serif",
            }}
          >
            {/* Tabler Icons / brand-whatsapp */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 flex-shrink-0"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
              <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
            </svg>
            <span className="tracking-wide">NOMOR (NAMA)</span>
          </button>
        </>
      }
    >
      <p className="mb-2">Hi, {displayName}</p>
      <p className="mb-2">
        Anda telah berhasil lolos Open Recruitment Staff IBL2K26.
      </p>
      <p>Selamat datang di keluarga besar IBL2K26!</p>
    </ResultTicket>
  );
}
