import React from "react";

interface WhatsAppContactProps {
    contactName: string;
    phoneNumber: string; // e.g., "6281234567890"
}

export default function WhatsAppContact({ contactName, phoneNumber }: WhatsAppContactProps) {
    // Pre-fill message for convenience
    const textMessage = encodeURIComponent("Halo, saya ingin konfirmasi kelulusan IBL2K26.");
    const waLink = `https://wa.me/${phoneNumber}?text=${textMessage}`;

    return (
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

            {/* WhatsApp Button (Functional Link) */}
            <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
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
                    textDecoration: "none",
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
                <span className="tracking-wide">
                    {phoneNumber} ({contactName})
                </span>
            </a>
        </>
    );
}
