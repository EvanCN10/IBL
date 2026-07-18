"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Background Assets & Layout Components
import Texture from "@/public/images/announcement/Texture.svg";
import TwoSixSection from "@/components/sections/Announcement/TwoSixSection";
import PageScaleWrapper from "@/components/sections/Announcement/PageScaleWrapper";
import HeightSpacer from "@/components/sections/Announcement/HeightSpacer";
import PlayersAnimationResult from "@/components/sections/Announcement/result/PlayersAnimationResult";

// Result Section Components (for customization)
import LolosSection from "@/components/sections/Announcement/result/LolosSection";
import TidakLolosSection from "@/components/sections/Announcement/result/TidakLolosSection";
import TidakTerdaftarSection from "@/components/sections/Announcement/result/TidakTerdaftarSection";

function ResultContent() {
  const searchParams = useSearchParams();
  const nrp = searchParams.get("nrp") || "";
  const status = searchParams.get("status") || "";
  const urlName = searchParams.get("name") || searchParams.get("urlName") || "";
  const subdivisi = searchParams.get("subdivisi") || "";
  const cpName = searchParams.get("cpName") || "";
  const cpPhone = searchParams.get("cpPhone") || "";

  if (status === "lolos") {
    return (
      <LolosSection
        nrp={nrp}
        urlName={urlName}
        subdivisi={subdivisi}
        cpName={cpName}
        cpPhone={cpPhone}
      />
    );
  }

  if (status === "tidak_terdaftar") {
    return (
      <TidakTerdaftarSection
        nrp={nrp}
        cpName={cpName}
        cpPhone={cpPhone}
      />
    );
  }

  return <TidakLolosSection nrp={nrp} urlName={urlName} />;
}

export default function ResultPage() {
  return (
    <div className="min-h-dvh bg-bone relative w-full overflow-x-hidden overflow-y-auto">
      {/* Invisible spacer to push page height dynamically on large screens */}
      <HeightSpacer />

      {/* === LAYER 1: Players & TwoSix (z-5 di root saat large screen) === */}
      <PageScaleWrapper zIndex={5}>
        <div className="relative min-h-full flex flex-col items-center w-full">
          {/* TwoSix — DOM pertama di dalam wrapper = z paling bawah di atas texture */}
          <TwoSixSection />
          <PlayersAnimationResult />
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

      {/* === LAYER 3: Result Cards (z-30 di root saat large screen) === */}
      <PageScaleWrapper zIndex={30}>
        <div className="relative min-h-full flex flex-col items-center w-full">
          {/* Center layout container, positioned exactly where LandingSection is */}
          <div className="absolute top-[152px] left-1/2 -translate-x-1/2 flex flex-col items-center z-[100] w-full max-w-[90vw] sm:w-auto sm:max-w-none">
            <Suspense fallback={<div className="font-drowner text-2xl text-muted-foreground animate-pulse">Loading Result...</div>}>
              <ResultContent />
            </Suspense>
          </div>
        </div>
      </PageScaleWrapper>
    </div>
  );
}
