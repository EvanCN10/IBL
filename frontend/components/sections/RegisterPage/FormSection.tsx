"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Dropdown from "@/components/ui/Dropdown";
import RadioGroup from "@/components/ui/RadioGroup";
import { FORM_LABELS, DROPDOWN_OPTIONS, RADIO_OPTIONS } from "@/constants/registerForm";
import { RegisterFormData, StepData, UploadData } from "@/types/register";

const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='1' result='noise'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const initialStepData = (): StepData => ({
  shortAnswer1: "",
  shortAnswer2: "",
  shortAnswer3: "",
  longAnswer1: "",
  longAnswer2: "",
  dropdownVal: "",
  radioVal: "",
});

const initialUploadData = (): UploadData => ({
  cv: "",
  ktm: "",
  twibbon: "",
  buktiFollow: "",
  portofolio: "",
});

interface UploadSlotProps {
  title: string;
  value: string;
  onChange: (fileName: string) => void;
  className?: string;
}

const UploadSlot: React.FC<UploadSlotProps> = ({ title, value, onChange, className = "" }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file.name);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-2 select-none cursor-pointer group hover:bg-[#D1EAE5]/20 transition-all duration-300 ease-out ${className}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <h4 className="font-crosner text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-normal text-black uppercase tracking-widest mb-1 sm:mb-2 lg:mb-3 group-hover:-translate-y-0.5 group-hover:scale-103 transition-all duration-300 ease-out">
        {title}
      </h4>
      <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5">
        {/* Green Circle Icon */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full bg-[#D1EAE5] flex items-center justify-center border border-[#864B4D] group-hover:bg-[#2B918E] group-hover:border-black group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out">
          {/* Cloud Upload Icon */}
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#2B918E] group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-300 ease-out"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        
        {value ? (
          <span className="font-body text-[10px] sm:text-xs text-gray-700 font-semibold bg-white border border-gray-300 rounded px-2 py-0.5 max-w-[140px] sm:max-w-[180px] truncate shadow-sm group-hover:border-gray-400 group-hover:shadow-md transition-all duration-300">
            {value}
          </span>
        ) : (
          <div className="flex flex-col items-center">
            <span className="font-body text-[9px] sm:text-xs text-gray-500">Drop your files here</span>
            <span className="font-body text-[9px] sm:text-xs text-[#2B918E] group-hover:text-[#1e6664] underline font-semibold transition-colors duration-300">
              or click to upload
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const FormSectionBackdrop = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <Image
      src="/images/star bg.png"
      alt=""
      fill
      sizes="100vw"
      priority
      className="object-fill"
    />
    <div className="absolute inset-x-0 top-0 h-[35%] w-full">
      <Image
        src="/images/Sinar Atas.svg"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-fill object-top"
      />
    </div>
  </div>
);

export const FormSection = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    informasiUmum: initialStepData(),
    subdivisi1: initialStepData(),
    subdivisi2: initialStepData(),
    uploadBerkas: initialUploadData(),
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Helper to get active step's config
  const getStepConfig = () => {
    switch (step) {
      case 1:
        return { type: "form" as const, key: "informasiUmum" as const, title: "INFORMASI UMUM" };
      case 2:
        return { type: "form" as const, key: "subdivisi1" as const, title: "SUBDIVISI 1" };
      case 3:
        return { type: "form" as const, key: "subdivisi2" as const, title: "SUBDIVISI 2" };
      case 4:
        return { type: "upload" as const, key: "uploadBerkas" as const, title: "UPLOAD BERKAS" };
      default:
        return { type: "form" as const, key: "informasiUmum" as const, title: "INFORMASI UMUM" };
    }
  };

  const { type: currentType, key: currentKey, title: currentTitle } = getStepConfig();
  const currentData = formData[currentKey];

  const updateField = (field: keyof StepData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentKey]: {
        ...prev[currentKey as "informasiUmum" | "subdivisi1" | "subdivisi2"],
        [field]: value,
      },
    }));
  };

  const updateUploadField = (field: keyof UploadData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      uploadBerkas: {
        ...prev.uploadBerkas,
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      informasiUmum: initialStepData(),
      subdivisi1: initialStepData(),
      subdivisi2: initialStepData(),
      uploadBerkas: initialUploadData(),
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden select-none">
        <FormSectionBackdrop />
        
        {/* Header Banner */}
        <div className="bg-[#AC1F1A] border-[3px] border-black px-6 py-1.5 rounded-[10px] shadow-[4px_4px_0px_0px_#000] inline-flex justify-center items-center z-10">
          <h2 className="font-hollywood text-[42px] text-white tracking-wider uppercase leading-none">
            FORM TERSUBMIT!
          </h2>
        </div>

        {/* GOOD LUCK Text Graphic */}
        <div className="flex flex-col items-center gap-2 mt-12 font-crosner text-[#FBF5EC] text-7xl md:text-[100px] font-black uppercase tracking-wider relative z-10 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-3 select-none relative">
            <span>G</span>
            
            {/* Basketball 1 with Flame */}
            <div className="relative w-20 h-20 md:w-[104px] md:h-[104px] mx-1 mt-2">
              {/* Flame SVG overlay */}
              <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 w-14 h-14 z-10 animate-pulse">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12 2 17 7.5 17 11.5C17 14.5 14.5 17 12 17C9.5 17 7 14.5 7 11.5C7 7.5 12 2 12 2Z" fill="#AC1F1A" />
                  <path d="M12 6C12 6 15 10 15 13C15 15 13.5 16.5 12 16.5C10.5 16.5 9 15 9 13C9 10 12 6 12 6Z" fill="#E65100" />
                  <path d="M12 9C12 9 13.5 11.5 13.5 13.5C13.5 14.8 12.8 15.8 12 15.8C11.2 15.8 10.5 14.8 10.5 13.5C10.5 11.5 12 9 12 9Z" fill="#FFB300" />
                </svg>
              </div>
              <Image src="/images/Basketball.svg" alt="O" fill className="object-contain" />
            </div>

            {/* Basketball 2 with Flame */}
            <div className="relative w-20 h-20 md:w-[104px] md:h-[104px] mx-1 mt-2">
              {/* Flame SVG overlay */}
              <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 w-14 h-14 z-10 animate-pulse">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12 2 17 7.5 17 11.5C17 14.5 14.5 17 12 17C9.5 17 7 14.5 7 11.5C7 7.5 12 2 12 2Z" fill="#AC1F1A" />
                  <path d="M12 6C12 6 15 10 15 13C15 15 13.5 16.5 12 16.5C10.5 16.5 9 15 9 13C9 10 12 6 12 6Z" fill="#E65100" />
                  <path d="M12 9C12 9 13.5 11.5 13.5 13.5C13.5 14.8 12.8 15.8 12 15.8C11.2 15.8 10.5 14.8 10.5 13.5C10.5 11.5 12 9 12 9Z" fill="#FFB300" />
                </svg>
              </div>
              <Image src="/images/Basketball.svg" alt="O" fill className="object-contain" />
            </div>

            <span>D</span>
          </div>
          <div className="text-[80px] md:text-[116px] tracking-[10px] text-[#FBF5EC] -mt-4">LUCK</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative select-none">
      <FormSectionBackdrop />
      {currentType === "form" ? (
        <div className="w-full h-full relative z-10">
          {/* Header Title Bubble */}
          <div
            className="absolute left-1/2 z-20 -translate-x-1/2 -rotate-3"
            style={{
              top: step === 1 ? "4%" : "5.5%",
            }}
          >
            <h2 className="double-font-header text-[44px] tracking-widest uppercase text-center leading-[0.9] select-none">
              {currentTitle === "INFORMASI UMUM" ? (
                <>INFORMASI<br/>UMUM</>
              ) : (
                currentTitle
              )}
            </h2>
          </div>

          {/* Form Card/Grid Container */}
          <div
            className="absolute left-1/2 z-10 -translate-x-1/2"
            style={{
              top: "16.5%",
              width: "54%",
              height: "70%",
            }}
          >
            <div 
              className="w-full h-full border-2 border-black shadow-[10px_10px_0px_0px_#000] rounded-xl px-10 py-5 flex flex-col gap-3 relative"
              style={{
                backgroundColor: "#EFE8DE",
                backgroundImage: noiseBg,
              }}
            >

              {/* Form Fields List */}
              <div className="flex flex-col gap-2">
                <InputField
                  label={FORM_LABELS.shortAnswer}
                  value={(currentData as StepData).shortAnswer1}
                  onChange={(val) => updateField("shortAnswer1", val)}
                />
                <InputField
                  label={FORM_LABELS.shortAnswer}
                  value={(currentData as StepData).shortAnswer2}
                  onChange={(val) => updateField("shortAnswer2", val)}
                />
                <InputField
                  label={FORM_LABELS.shortAnswer}
                  value={(currentData as StepData).shortAnswer3}
                  onChange={(val) => updateField("shortAnswer3", val)}
                />
                
                <div className="flex flex-col w-full text-left">
                  <label className="font-bold text-[14px] text-[#2D2D2D] mb-1 font-sans">
                    {FORM_LABELS.longAnswer}
                  </label>
                  <textarea
                    value={(currentData as StepData).longAnswer1}
                    onChange={(e) => updateField("longAnswer1", e.target.value)}
                    placeholder="Content"
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 font-body text-[14px] text-gray-800 placeholder-gray-400 outline-none focus:border-gray-500 transition-colors shadow-inner min-h-[56px] resize-y"
                  />
                </div>

                <div className="flex flex-col w-full text-left">
                  <label className="font-bold text-[14px] text-[#2D2D2D] mb-1 font-sans">
                    {FORM_LABELS.longAnswer}
                  </label>
                  <textarea
                    value={(currentData as StepData).longAnswer2}
                    onChange={(e) => updateField("longAnswer2", e.target.value)}
                    placeholder="Content"
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 font-body text-[14px] text-gray-800 placeholder-gray-400 outline-none focus:border-gray-500 transition-colors shadow-inner min-h-[56px] resize-y"
                  />
                </div>

                <Dropdown
                  label={FORM_LABELS.dropdown}
                  options={DROPDOWN_OPTIONS}
                  selected={(currentData as StepData).dropdownVal}
                  onSelect={(val) => updateField("dropdownVal", val)}
                />

                <RadioGroup
                  label={FORM_LABELS.radio}
                  options={RADIO_OPTIONS}
                  selected={(currentData as StepData).radioVal}
                  onChange={(val) => updateField("radioVal", val)}
                />
              </div>
            </div>
          </div>

          {/* Navigation & Step Indicator Row */}
          <div
            className="absolute left-1/2 z-20 flex h-16 -translate-x-1/2 items-center justify-between px-4"
            style={{
              top: "89%",
              width: "74%",
            }}
          >
            <div className="w-40 flex justify-start">
              {step > 1 ? (
                <Button onClick={handleBack}>BACK</Button>
              ) : (
                <div className="w-40 h-12" />
              )}
            </div>

            {/* Basketball Indicators */}
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3, 4].map((s) => {
                const isActive = s === step;
                return (
                  <div
                    key={s}
                    onClick={() => setStep(s)}
                    className="relative cursor-pointer transition-all duration-300 ease-out filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1.00)]"
                    style={{
                      width: isActive ? "56px" : "36px",
                      height: isActive ? "56px" : "36px",
                    }}
                  >
                    <Image
                      src="/images/Basketball.svg"
                      alt={`Step ${s}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                );
              })}
            </div>

            <div className="w-40 flex justify-end">
              <Button onClick={handleNext}>
                {step === 4 ? "SUBMIT" : "NEXT"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Step 4 - UPLOAD BERKAS grid container with slanted lines */
        <div className="w-full h-full relative z-10">
          {/* Header Title Bubble for Upload Berkas */}
          <div
            className="absolute left-1/2 z-20 -translate-x-1/2 -rotate-3"
            style={{
              top: "4%",
            }}
          >
            <h2 className="double-font-header text-[44px] tracking-widest uppercase text-center leading-[0.9] select-none">
              UPLOAD<br/>BERKAS
            </h2>
          </div>

          {/* Slanted border outer box */}
          <div
            style={{
              width: "54%",
              height: "70%",
              top: "16.5%",
              left: "50%",
              transform: "translateX(-50%)",
              position: "absolute",
              border: "12px solid transparent",
              backgroundImage: `${noiseBg}, linear-gradient(#EFE8DE, #EFE8DE), linear-gradient(to bottom, #F4631E, #B93310, #7E0202)`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, padding-box, border-box",
            }}
            className="rounded-[16px] overflow-hidden flex flex-col shadow-[10px_10px_0px_0px_#000]"
          >

            {/* Slanted Dividers */}
            <div className="absolute top-[33.33%] -left-4 -right-4 h-[8px] bg-[#B93310] origin-center rotate-[3deg] pointer-events-none z-10" />
            <div className="absolute top-[66.66%] -left-4 -right-4 h-[8px] bg-[#B93310] origin-center -rotate-[3deg] pointer-events-none z-10" />
            {/* Vertical Divider 1 (Row 1) - Slanted right */}
            <div 
              className="absolute left-1/2 w-[8px] bg-[#B93310] origin-center pointer-events-none z-10"
              style={{
                top: "-4px",
                height: "calc(33.33% + 8px)",
                marginLeft: "-4px",
                transform: "rotate(-6deg)",
              }}
            />
            {/* Vertical Divider 2 (Row 2) - Slanted left */}
            <div 
              className="absolute left-1/2 w-[8px] bg-[#B93310] origin-center pointer-events-none z-10"
              style={{
                top: "calc(33.33% - 4px)",
                height: "calc(33.33% + 8px)",
                marginLeft: "-4px",
                transform: "rotate(6deg)",
              }}
            />

            {/* Row 1 - CV & KTM */}
            <div className="flex h-1/3 relative z-20">
              <UploadSlot
                title="CV"
                value={formData.uploadBerkas.cv}
                onChange={(v) => updateUploadField("cv", v)}
                className="w-1/2"
              />
              <UploadSlot
                title="KTM"
                value={formData.uploadBerkas.ktm}
                onChange={(v) => updateUploadField("ktm", v)}
                className="w-1/2"
              />
            </div>

            {/* Row 2 - TWIBBON & BUKTI FOLLOW */}
            <div className="flex h-1/3 relative z-20">
              <UploadSlot
                title="TWIBBON"
                value={formData.uploadBerkas.twibbon}
                onChange={(v) => updateUploadField("twibbon", v)}
                className="w-1/2"
              />
              <UploadSlot
                title="BUKTI FOLLOW"
                value={formData.uploadBerkas.buktiFollow}
                onChange={(v) => updateUploadField("buktiFollow", v)}
                className="w-1/2"
              />
            </div>

            {/* Row 3 - PORTOFOLIO */}
            <div className="flex h-1/3 relative z-20">
              <UploadSlot
                title="PORTOFOLIO"
                value={formData.uploadBerkas.portofolio}
                onChange={(v) => updateUploadField("portofolio", v)}
                className="w-full"
              />
            </div>
          </div>

          {/* Navigation & Step Indicator Row */}
          <div
            className="absolute left-1/2 z-20 flex h-16 -translate-x-1/2 items-center justify-between px-4"
            style={{
              top: "89%",
              width: "74%",
            }}
          >
            <div className="w-40 flex justify-start">
              <Button onClick={handleBack}>BACK</Button>
            </div>

            {/* Basketball Indicators */}
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3, 4].map((s) => {
                const isActive = s === step;
                return (
                  <div
                    key={s}
                    onClick={() => setStep(s)}
                    className="relative cursor-pointer transition-all duration-300 ease-out filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1.00)]"
                    style={{
                      width: isActive ? "56px" : "36px",
                      height: isActive ? "56px" : "36px",
                    }}
                  >
                    <Image
                      src="/images/Basketball.svg"
                      alt={`Step ${s}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                );
              })}
            </div>

            <div className="w-40 flex justify-end">
              <Button onClick={handleNext}>SUBMIT</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
