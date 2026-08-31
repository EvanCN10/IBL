import Image from "next/image";

const tickets = [
  {
    src: "/images/timeline/ticket-roadshow-287-1165.svg",
    alt: "Roadshow IBL2K26",
    className: "left-[55%] top-[18%]",
  },
  {
    src: "/images/timeline/ticket-registration-287-1190.svg",
    alt: "Pendaftaran peserta",
    className: "left-[7%] top-[38%]",
  },
  {
    src: "/images/timeline/ticket-technical-287-1215.svg",
    alt: "Technical meeting kompetisi dan supporter",
    className: "left-[55%] top-[58%]",
  },
  {
    src: "/images/timeline/ticket-competition-287-1281.svg",
    alt: "Pelaksanaan kompetisi",
    className: "left-[7%] top-[78%]",
  },
];

const TimelineTicket = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) => (
  <div
    className={`absolute z-20 aspect-[302/94] w-[37.8%] ${className}`}
  >
    <Image
      src={src}
      alt={alt}
      fill
      priority
      className="object-contain"
      sizes="(min-width: 768px) 370px, 82vw"
    />
  </div>
);

export const TimelineSection = () => {
  return (
    <section className="w-full overflow-hidden bg-transparent px-4 py-10 md:px-8 md:py-16">
      <div className="relative mx-auto hidden aspect-[980/760] w-full max-w-[980px] md:block">
        <div className="absolute left-1/2 top-[3%] z-30 aspect-[261/73] w-[42%] -translate-x-1/2">
          <h2 className="sr-only">Timeline</h2>
          <Image
            src="/images/timeline/timeline-title-287-1145.svg"
            alt="Timeline"
            fill
            priority
            className="object-contain"
            sizes="304px"
          />
        </div>

        <svg
          className="absolute inset-0 z-10 hidden h-full w-full md:block"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            d="M55 25.4H49V45.4H44.8M44.8 45.4H49V65.4H55M55 65.4H49V85.4H44.8"
            stroke="#E00000"
            strokeWidth="0.55"
            strokeLinejoin="round"
          />
        </svg>

        {tickets.map((ticket) => (
          <TimelineTicket key={ticket.src} {...ticket} />
        ))}
      </div>

      <div className="relative mx-auto aspect-[390/760] w-full max-w-[390px] md:hidden">
        <div className="absolute left-1/2 top-[2%] z-30 aspect-[261/73] w-[68%] -translate-x-1/2">
          <h2 className="sr-only">Timeline</h2>
          <Image
            src="/images/timeline/timeline-title-287-1145.svg"
            alt="Timeline"
            fill
            priority
            className="object-contain"
            sizes="68vw"
          />
        </div>

        <svg
          className="absolute inset-0 z-10 h-full w-full"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            d="M10 18V88M10 18H18M10 38H18M10 58H18M10 78H18"
            stroke="#E00000"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
        </svg>

        {tickets.map((ticket, index) => (
          <div
            key={ticket.src}
            className="absolute left-[18%] z-20 aspect-[302/94] w-[78%]"
            style={{ top: `${13 + index * 20}%` }}
          >
            <Image
              src={ticket.src}
              alt={ticket.alt}
              fill
              priority
              className="object-contain"
              sizes="78vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
