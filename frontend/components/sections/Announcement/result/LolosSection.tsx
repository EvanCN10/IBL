import React from "react";
import CongratsDesktop from "@/public/images/announcement/CONGRATS DESKTOP.svg";
import ResultTicket from "../ResultTicket";
import WhatsAppContact from "../WhatsAppContact";

interface LolosSectionProps {
  nrp: string;
  urlName?: string;
}

export default function LolosSection({ nrp, urlName }: LolosSectionProps) {
  const displayName = urlName || "(nama)";

  return (
    <ResultTicket
      headerText="WELCOME TO THE TEAM"
      stickerSrc={CongratsDesktop}
      stickerAlt="Congratulations!"
      stickerClass="w-[260px] sm:w-[280px] h-auto flex items-center justify-center mb-[-40px] z-10 relative"
      ticketMarginBottomClass="mb-28"
      contentStyle={{
        width: "80.1%",
        height: "44.9%",
        fontSize: "16px",
        lineHeight: "1.4",
      }}
      footerNode={<WhatsAppContact contactName="NAMA" phoneNumber="628000000000" />}
    >
      <p className="mb-2">Hi, {displayName}</p>
      <p className="mb-2">
        Anda telah berhasil lolos Open Recruitment Staff IBL2K26.
      </p>
      <p>Selamat datang di keluarga besar IBL2K26!</p>
    </ResultTicket>
  );
}
