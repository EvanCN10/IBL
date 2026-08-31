"use client";

import Image from "next/image";
import Link from "next/link";
import { useCountdown } from "@/lib/hooks/useCountdown";
import ClockPanelDesktop from "@/public/images/countdown/clock-panel-desktop.svg";
import ClockPanelMobile from "@/public/images/countdown/clock-panel-mobile.svg";
import CounterUnitFrameDesktop from "@/public/images/countdown/counter-unit-frame-desktop.svg";
import ScoreboardShellDesktop from "@/public/images/countdown/scoreboard-shell-desktop.svg";
import ScoreboardShellMobile from "@/public/images/countdown/scoreboard-shell-mobile.svg";
import DayText from "@/public/texts/countdown/day.svg";
import MonthText from "@/public/texts/countdown/month.svg";
import OpenRegistText from "@/public/texts/countdown/open-regist.svg";
import RegistTeamSoonText from "@/public/texts/countdown/regist-team-soon.svg";
import type { CountdownTime } from "@/types/register";

const COUNTDOWN_ENABLED = false;
const COUNTDOWN_TARGET = new Date("2026-09-14T18:00:00+07:00");
const ZERO_TIME: CountdownTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
const SCOREBOARD_FONT = { fontFamily: '"DSEG7ClassicMini", monospace' };

const padTwo = (value: number) => String(value).padStart(2, "0");

const CounterUnit = ({
  value,
  label,
  alt,
}: {
  value: string;
  label: typeof DayText;
  alt: string;
}) => (
  <div className="flex w-[clamp(48px,12vw,56px)] shrink-0 flex-col items-center md:w-[clamp(70px,6vw,88px)]">
    <div className="relative z-10 mb-[-4%] h-[clamp(13px,3.5vw,18px)] w-[120%] md:h-[clamp(20px,2vw,28px)] md:w-[125%]">
      <Image src={label} alt={alt} fill className="object-contain" />
    </div>
    <div className="relative aspect-[112/113] w-full overflow-hidden">
      <Image
        src={CounterUnitFrameDesktop}
        alt=""
        className="absolute left-0 top-[-35.4%] h-[135.4%] w-full max-w-none"
        sizes="112px"
      />
      <div className="absolute inset-x-[6%] inset-y-[5%] grid grid-cols-2 place-items-center overflow-hidden">
        {value.split("").map((digit, index) => (
          <span
            key={`${digit}-${index}`}
            className="text-[clamp(1.1rem,3.9vw,2.7rem)] font-bold leading-none text-white drop-shadow-[0_0.07em_0_#5b0a0a] md:text-[clamp(1.45rem,2.7vw,3.4rem)]"
            style={SCOREBOARD_FONT}
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ActiveRegisterCta = () => (
  <div className="flex min-w-0 flex-col items-center pt-[2%] text-center">
    <p className="max-w-[24ch] text-[clamp(0.55rem,2.8vw,0.8rem)] font-black leading-[1.05] text-[#9b0000] drop-shadow-[0.04em_0.06em_0_#f4d8bd] md:text-[clamp(1rem,1.55vw,1.55rem)]">
      Siap bertanding? Klik tombol sebelum waktu pendaftaran berakhir!
    </p>
    <Link
      href="/register"
      className="mt-[6%] rounded-[7px] bg-gradient-to-b from-[#d60000] to-[#850000] px-[clamp(12px,4vw,24px)] py-[clamp(5px,1.8vw,9px)] text-[clamp(0.55rem,2.8vw,0.9rem)] font-extrabold leading-none text-white shadow-[0_0.08em_0_#4a0000] md:px-[clamp(30px,4vw,54px)] md:py-[clamp(10px,1vw,16px)] md:text-[clamp(1rem,1.3vw,1.45rem)]"
    >
      Register Now  
    </Link>
  </div>
);

const Scoreboard = ({
  isClockOn,
  remaining,
  selectedDate,
}: {
  isClockOn: boolean;
  remaining: CountdownTime;
  selectedDate: Date;
}) => {
  const statusText = isClockOn ? OpenRegistText : RegistTeamSoonText;
  const targetDay = padTwo(selectedDate.getDate());
  const targetMonth = padTwo(selectedDate.getMonth() + 1);
  const timerText = `${padTwo(remaining.hours)}:${padTwo(remaining.minutes)}:${padTwo(remaining.seconds)}`;

  return (
    <div className="relative mx-auto aspect-[521/357] w-[92vw] min-w-0 max-w-[430px] md:aspect-[1255/859] md:w-full md:max-w-[980px]">
      <Image
        src={ScoreboardShellDesktop}
        alt=""
        fill
        priority
        className="hidden object-contain md:block"
        sizes="(min-width: 768px) 980px, 0px"
      />
      <Image
        src={ScoreboardShellMobile}
        alt=""
        fill
        priority
        className="object-contain md:hidden"
        sizes="100vw"
      />

      <div className="absolute left-[19.7%] top-[29.8%] aspect-[758/280] w-[60.4%] md:left-[19.8%] md:top-[29.9%]">
        <Image
          src={ClockPanelDesktop}
          alt=""
          fill
          className="hidden object-contain md:block"
          sizes="590px"
        />
        <Image
          src={ClockPanelMobile}
          alt=""
          fill
          className="object-contain md:hidden"
          sizes="315px"
        />
        <Image
          src={statusText}
          alt={isClockOn ? "Open Regist" : "Regist Team Soon"}
          className="absolute left-1/2 top-[7%] w-[60%] -translate-x-1/2 md:top-[5%] md:w-[63%]"
        />
        <span
          className="absolute left-1/2 top-[63%] -translate-x-1/2 -translate-y-1/2 text-[clamp(1.7rem,10vw,4.2rem)] font-bold leading-none text-white drop-shadow-[-0.04em_0.01em_0.04em_#5b0a0a] md:text-[clamp(3.5rem,6.9vw,6.8rem)]"
          style={SCOREBOARD_FONT}
        >
          {timerText}
        </span>
      </div>

      <div className="absolute left-[18%] top-[64.5%] grid w-[64%] grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-[5%] md:left-[19.5%] md:top-[63%] md:w-[61%] md:gap-[7%]">
        <CounterUnit value={targetDay} label={DayText} alt="Day" />
        {isClockOn ? <ActiveRegisterCta /> : <div />}
        <CounterUnit value={targetMonth} label={MonthText} alt="Month" />
      </div>
    </div>
  );
};

export const CountdownSection = () => {
  const { time: remaining } = useCountdown(COUNTDOWN_TARGET);
  const displayTime = COUNTDOWN_ENABLED ? remaining : ZERO_TIME;

  return (
    <section className="w-full min-w-0 max-w-full overflow-hidden bg-transparent px-0 py-6 text-[#1D1D1B] md:px-8 md:py-16">
      <style>
        {`@font-face{font-family:DSEG7ClassicMini;src:url("/fonts/DSEG/DSEG7ClassicMini-Bold.woff2") format("woff2");font-weight:700;font-style:normal;font-display:swap;}`}
      </style>
      <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col items-center gap-8">
        <Scoreboard
          isClockOn={COUNTDOWN_ENABLED}
          remaining={displayTime}
          selectedDate={COUNTDOWN_TARGET}
        />
      </div>
    </section>
  );
};
