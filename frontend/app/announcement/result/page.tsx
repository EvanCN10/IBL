"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LolosSection from "@/components/sections/Announcement/result/LolosSection";
import TidakLolosSection from "@/components/sections/Announcement/result/TidakLolosSection";

function ResultContent() {
  const searchParams = useSearchParams();
  const nrp = searchParams.get("nrp") || "";
  const status = searchParams.get("status") || "";

  if (status === "lolos") {
    return <LolosSection nrp={nrp} />;
  }

  return <TidakLolosSection nrp={nrp} />;
}

export default function ResultPage() {
  return (
    <div className="min-h-screen bg-bone flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div className="font-drowner text-2xl text-muted-foreground animate-pulse">Loading Result...</div>}>
        <ResultContent />
      </Suspense>
    </div>
  );
}
