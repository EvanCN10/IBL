"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Dropdown from "@/components/ui/Dropdown";
import RadioGroup from "@/components/ui/RadioGroup";
import { FORM_LABELS, DROPDOWN_OPTIONS, RADIO_OPTIONS } from "@/constants/registerForm";
import { RegisterFormData, StepData, UploadData } from "@/types/register";

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
    <div className={`p-6 flex flex-col items-center justify-center gap-2 select-none ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <h4 className="font-crosner text-2xl text-black uppercase tracking-wider mb-1">
        {title}
      </h4>
      <div 
        onClick={handleClick}
        className="cursor-pointer flex flex-col items-center justify-center gap-1.5"
      >
        {/* Green Circle Icon */}
        <div className="w-12 h-12 rounded-full bg-[#D1EAE5] flex items-center justify-center border border-[#864B4D] hover:bg-[#bde0da] transition-colors">
          {/* Cloud Upload Icon */}
          <svg
            className="w-6 h-6 text-[#2B918E]"
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
          <span className="font-body text-xs text-gray-700 font-semibold bg-white border border-gray-300 rounded px-2.5 py-1 max-w-[180px] truncate shadow-sm">
            {value}
          </span>
        ) : (
          <div className="flex flex-col items-center">
            <span className="font-body text-xs text-gray-500">Drop your files here</span>
            <span className="font-body text-xs text-[#2B918E] underline font-semibold">
              or click to upload
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

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
      <div className="w-full flex flex-col items-center justify-center py-12 px-4 relative select-none">
        
        {/* Header Banner */}
        <div className="bg-[#AC1F1A] border-4 border-black px-10 py-2.5 rounded-[20px] shadow-[4px_4px_0px_0px_#000] inline-flex justify-center items-center z-10">
          <h2 className="font-hollywood text-3xl md:text-4xl text-white tracking-wider uppercase">
            FORM TERSUBMIT!
          </h2>
        </div>

        {/* GOOD LUCK Text Graphic */}
        <div className="flex flex-col items-center gap-2 mt-12 font-crosner text-[#FBF5EC] text-7xl md:text-[100px] font-black uppercase tracking-wider relative drop-shadow-[4px_4px_0px_rgba(0,0,0,0.25)]">
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
    <div className="w-full flex flex-col items-center justify-start py-20 px-4 select-none">
      <div className="w-full max-w-[800px] flex flex-col items-center relative">
        
        {/* Form Card/Grid Container */}
        {currentType === "form" ? (
          <div className="w-full bg-bone border-2 border-black shadow-[10px_10px_0px_0px_#000] rounded-xl p-8 pt-12 pb-12 flex flex-col gap-6 relative">
            {/* Header Title Bubble */}
            <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-[#AC1F1A] border-4 border-black px-10 py-2.5 rounded-[20px] shadow-[4px_4px_0px_0px_#000] inline-flex justify-center items-center">
                <h2 className="font-hollywood text-3xl md:text-4xl text-white tracking-wider uppercase">
                  {currentTitle}
                </h2>
              </div>
            </div>

            {/* Form Fields List */}
            <div className="flex flex-col gap-5 mt-4">
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
                  className="w-full bg-white border border-gray-300 rounded-md py-2.5 px-4 font-body text-[14px] text-gray-800 placeholder-gray-400 outline-none focus:border-gray-500 transition-colors shadow-inner min-h-[100px] resize-y"
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
                  className="w-full bg-white border border-gray-300 rounded-md py-2.5 px-4 font-body text-[14px] text-gray-800 placeholder-gray-400 outline-none focus:border-gray-500 transition-colors shadow-inner min-h-[100px] resize-y"
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
        ) : (
          /* Step 4 - UPLOAD BERKAS grid container with slanted lines */
          <div className="w-full relative">
            {/* Header Title Bubble */}
            <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-[#AC1F1A] border-4 border-black px-10 py-2.5 rounded-[20px] shadow-[4px_4px_0px_0px_#000] inline-flex justify-center items-center">
                <h2 className="font-hollywood text-3xl md:text-4xl text-white tracking-wider uppercase">
                  {currentTitle}
                </h2>
              </div>
            </div>

            {/* Slanted border outer box */}
            <div className="w-full border-4 border-[#864B4D] bg-[#864B4D] rounded-xl overflow-hidden relative flex flex-col h-[520px] shadow-[10px_10px_0px_0px_#000] pt-6">
              
              {/* Row 1 - CV & KTM */}
              <div className="flex h-1/3 border-b-4 border-[#864B4D] relative bg-[#EFE8DE]">
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
                {/* Slanted vertical line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-1.5 bg-[#864B4D] origin-center rotate-[4deg] pointer-events-none" />
              </div>

              {/* Row 2 - TWIBBON & BUKTI FOLLOW */}
              <div className="flex h-1/3 border-b-4 border-[#864B4D] relative bg-[#EFE8DE]">
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
                {/* Slanted vertical line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-1.5 bg-[#864B4D] origin-center -rotate-[4deg] pointer-events-none" />
              </div>

              {/* Row 3 - PORTOFOLIO */}
              <div className="flex h-1/3 bg-[#EFE8DE] relative">
                <UploadSlot
                  title="PORTOFOLIO"
                  value={formData.uploadBerkas.portofolio}
                  onChange={(v) => updateUploadField("portofolio", v)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation & Step Indicator Row */}
        <div className="w-full flex items-center justify-between mt-8 px-4 h-16">
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
                  className="relative transition-all duration-300 ease-out filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1.00)]"
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
    </div>
  );
};
