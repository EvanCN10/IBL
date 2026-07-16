"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LolosSection from "@/components/sections/Announcement/result/LolosSection";
import TidakLolosSection from "@/components/sections/Announcement/result/TidakLolosSection";
import Texture from "@/public/images/announcement/Texture.svg";
import Image from "next/image";
import TwoSixSection from "@/components/sections/Announcement/TwoSixSection";
import PageScaleWrapper from "@/components/sections/Announcement/PageScaleWrapper";
import PlayersAnimationWrapper from "@/components/sections/Announcement/PlayersAnimationWrapper";

function ResultContent() {
  const searchParams = useSearchParams();
  const nrp = searchParams.get("nrp") || "";
  const status = searchParams.get("status") || "";
  const nameParam = searchParams.get("nama") || searchParams.get("name") || "";

  if (status === "lolos") {
    return <LolosSection nrp={nrp} urlName={nameParam} />;
  }

  return <TidakLolosSection nrp={nrp} />;
}

export default function ResultPage() {
  return (
    <div className="h-dvh bg-bone relative w-full overflow-hidden">
      {/* Hide vertical scrollbar on screens >= 1440px */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 1440px) {
              html, body {
                overflow-y: hidden !important;
                height: 100% !important;
              }
            }
          `,
        }}
      />
      {/* === LAYER 1: Players & TwoSix (z-5 di root saat large screen) === */}
      <PageScaleWrapper zIndex={5}>
        <div className="relative min-h-full flex flex-col items-center w-full">
          {/* TwoSix — DOM pertama di dalam wrapper = z paling bawah di atas texture */}
          <TwoSixSection />
          {/* Client animation wrapper for players SVGs */}
          <PlayersAnimationWrapper />
        </div>
      </PageScaleWrapper>

      {/* === LAYER 2: Texture (z-20 di root, absolute — tidak ikut scroll) === */}
      <div className="absolute inset-0 z-[20] pointer-events-none">
        <Image
          src={Texture}
          alt="Background texture"
          fill
          className="object-cover"
        />
      </div>

      {/* === LAYER 3: Result Content (z-30 di root saat large screen) === */}
      <PageScaleWrapper zIndex={30}>
        <div className="relative min-h-full flex flex-col items-center w-full justify-center">
          <Suspense fallback={<div className="font-drowner text-2xl text-muted-foreground animate-pulse">Loading Result...</div>}>
            <ResultContent />
          </Suspense>
        </div>
      </PageScaleWrapper>
    </div>
  );
}

