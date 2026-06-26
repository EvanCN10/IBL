"use client";

import React from "react";
import Image from "next/image";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { FormNavigation } from "./FormNavigation";
import { FormSuccessScreen } from "./FormSuccessScreen";
import { FormStepFields } from "./FormStepFields";
import { UploadStep } from "./UploadStep";
import { noiseBg } from "@/constants/registerStyles";
import { StepData } from "@/types/register";

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
  const {
    step,
    setStep,
    isSubmitted,
    currentType,
    currentTitle,
    currentData,
    formData,
    updateField,
    updateUploadField,
    handleNext,
    handleBack,
  } = useRegistrationForm();

  if (isSubmitted) {
    return (
      <div className="w-full h-full relative select-none">
        <FormSectionBackdrop />
        <FormSuccessScreen />
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
            <h2 
              className="double-font-header tracking-widest uppercase text-center leading-[0.9] select-none"
              style={{ fontSize: "var(--form-title-font-size)" }}
            >
              {currentTitle === "INFORMASI UMUM" ? (
                <>INFORMASI<br/>UMUM</>
              ) : (
                currentTitle
              )}
            </h2>
          </div>

          {/* Form Card/Grid Container */}
          <div
            className="absolute left-1/2 z-30 -translate-x-1/2"
            style={{
              top: "16.5%",
              width: "54%",
              height: "70%",
            }}
          >
            <div 
              className="w-full h-full border border-black rounded-xl flex flex-col relative"
              style={{
                backgroundColor: "#EFE8DE",
                backgroundImage: noiseBg,
                borderWidth: "calc(var(--form-font-size) * 0.14)",
                boxShadow: "calc(var(--form-font-size) * 0.71) calc(var(--form-font-size) * 0.71) 0px 0px #000",
                paddingLeft: "var(--form-card-padding-x)",
                paddingRight: "var(--form-card-padding-x)",
                paddingTop: "var(--form-card-padding-y)",
                paddingBottom: "var(--form-card-padding-y)",
                gap: "var(--form-card-gap)"
              }}
            >
              <FormStepFields currentData={currentData as StepData} updateField={updateField} />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full relative z-10">
          {/* Header Title Bubble for Upload Berkas */}
          <div
            className="absolute left-1/2 z-20 -translate-x-1/2 -rotate-3"
            style={{ top: "4%" }}
          >
            <h2 
              className="double-font-header tracking-widest uppercase text-center leading-[0.9] select-none"
              style={{ fontSize: "var(--form-title-font-size)" }}
            >
              UPLOAD<br/>BERKAS
            </h2>
          </div>

          <UploadStep uploadData={formData.uploadBerkas} updateUploadField={updateUploadField} />
        </div>
      )}

      {/* Navigation & Step Indicator Row */}
      <FormNavigation
        step={step}
        setStep={setStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </div>
  );
};
