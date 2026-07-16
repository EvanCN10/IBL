"use client";

import React from "react";
import Image from "next/image";
import TicketCongrats from "@/public/images/announcement/Ticket_Congrats.svg";

interface ResultTicketProps {
    headerText?: string;
    stickerSrc: any;
    stickerAlt: string;
    stickerClass?: string; // e.g., "w-[260px] sm:w-[280px] mb-[-40px] z-10 relative"
    ticketMarginBottomClass?: string; // e.g., "mb-28" or ""
    contentStyle: React.CSSProperties;
    children: React.ReactNode;
    footerNode?: React.ReactNode;
}

export default function ResultTicket({
    headerText,
    stickerSrc,
    stickerAlt,
    stickerClass = "w-[320px] sm:w-[350px] h-auto flex items-center justify-center mb-[-36px] z-10 relative",
    ticketMarginBottomClass = "",
    contentStyle,
    children,
    footerNode,
}: ResultTicketProps) {
    return (
        <div className="flex flex-col items-center justify-center select-none max-w-full">
            {/* Dynamic Sticker */}
            <div className={stickerClass}>
                <Image
                    src={stickerSrc}
                    alt={stickerAlt}
                    className="w-full h-auto"
                    priority
                />
            </div>

            {/* Ticket wrapper using exact aspect ratio of the SVG (575x363) */}
            <div className={`relative w-[575px] max-w-full aspect-[575/363] z-0 ${ticketMarginBottomClass}`}>
                <Image
                    src={TicketCongrats}
                    alt="Ticket Congrats"
                    fill
                    className="object-contain"
                    priority
                />

                {/* Conditional Ticket Header Title */}
                {headerText && (
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
                        {headerText}
                    </div>
                )}

                {/* Text content area */}
                <div
                    className="absolute font-drowner text-black px-6 z-10"
                    style={{
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        ...contentStyle,
                    }}
                >
                    {children}
                </div>

                {/* Render optional footer node (e.g. WhatsApp contact button) */}
                {footerNode}
            </div>
        </div>
    );
}
