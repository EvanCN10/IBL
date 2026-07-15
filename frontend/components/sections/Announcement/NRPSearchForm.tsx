"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import VideoLoadingOverlay from "./VideoLoadingOverlay";

export default function NRPSearchForm() {
  const router = useRouter();
  const [nrp, setNrp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusResult, setStatusResult] = useState<"lolos" | "tidak_lolos">("tidak_lolos");

  const handleSearch = async () => {
    const trimmedNrp = nrp.trim();
    if (!trimmedNrp) return;

    setIsLoading(true);

    try {
      // Mockup check: NRP ending with even digit is "lolos", odd is "tidak_lolos"
      // TODO: replace with real API call (e.g., fetch(`/api/announcement/check?nrp=${trimmedNrp}`))
      const lastChar = trimmedNrp.charAt(trimmedNrp.length - 1);
      const isEven = !isNaN(parseInt(lastChar)) && parseInt(lastChar) % 2 === 0;
      const mockStatus = isEven ? "lolos" : "tidak_lolos";
      setStatusResult(mockStatus);
    } catch (err) {
      console.error("Failed to fetch NRP status:", err);
      setStatusResult("tidak_lolos");
    }
  };

  const handleVideoEnd = () => {
    router.push(
      `/announcement/result?nrp=${encodeURIComponent(nrp.trim())}&status=${statusResult}`
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10 w-full sm:w-auto justify-center min-h-[96px] sm:min-h-[88px]">
        <div className="text-center sm:text-left w-full sm:w-auto">
          <h1 className="font-drowner text-[24px] sm:text-[30px] md:text-[36px] tracking-wider mb-2 sm:mb-0 leading-none">
            Masukkan NRP
          </h1>
          <input
            type="tel"
            value={nrp}
            onChange={(e) => {
              const value = e.target.value;
              // Hanya menerima angka (0-9) dan panjangnya maksimal 10 karakter
              if (/^\d*$/.test(value) && value.length <= 10) {
                setNrp(value);
              }
            }}
            onKeyDown={handleKeyDown}
            className="bg-white w-full sm:w-[248px] h-[40px] sm:h-[44px] text-[18px] sm:text-[24px] border-1 border-gray-300 shadow-xl font-medium text-muted-foreground px-2 hover:border-bone active:border-bone mt-2 sm:mt-1"
            placeholder="502xxxxxxx"
          />
        </div>
        <div className="pt-0 sm:pt-[44px]">
          <Button onClick={handleSearch}>Cari</Button>
        </div>
      </div>

      {isLoading && <VideoLoadingOverlay onVideoEnd={handleVideoEnd} />}
    </>
  );
}
