import React from "react";
import ThankYouDesktop from "@/public/images/announcement/THANKYOU DESKTOP.svg";
import ResultTicket from "../ResultTicket";

interface TidakLolosSectionProps {
  nrp: string;
  urlName?: string;
}

export default function TidakLolosSection({ nrp, urlName }: TidakLolosSectionProps) {
  const displayName = urlName || "(nama)";

  return (
    <ResultTicket
      isLolos={false}
      stickerSrc={ThankYouDesktop}
      stickerAlt="Thank You!"
      stickerClass="w-[320px] sm:w-[350px] h-auto flex items-center justify-center mb-[-36px] z-10 relative"
      ticketMarginBottomClass=""
      contentStyle={{
        width: "71.65%",
        height: "30.85%",
        fontSize: "14px",
        lineHeight: "15px",
        letterSpacing: "0.08em",
        opacity: 0.8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        top: "52.9%",
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
    </ResultTicket>
  );
}
