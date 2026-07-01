"use client";

import React from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, type Transition } from "framer-motion";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { FormNavigation } from "./FormNavigation";
import { FormSuccessScreen } from "./FormSuccessScreen";
import { FormStepFields } from "./FormStepFields";
import { UploadStep } from "./UploadStep";
import { PortfolioReminderModal } from "./PortfolioReminderModal";
import { SubmitLoadingScreen } from "./SubmitLoadingScreen";
import { ValidationErrorToast } from "./ValidationErrorToast";
import { noiseBg } from "@/constants/registerStyles";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { StepData } from "@/types/register";

// Direct imports for background graphics to preserve native dimensions
import starBg from "@/public/images/star bg.webp";
import sinarAtas from "@/public/images/Sinar Atas.svg";

// Direct imports for title text SVGs
import infoUmumText from "@/public/texts/form/Informasi Umum.svg";
import subdivisi2Text from "@/public/texts/form/Subdivisi 2.svg";
import subdivisi3Text from "@/public/texts/form/Subdivisi 3.svg";
import uploadBerkasText from "@/public/texts/form/Upload Berkas.svg";

const getTitleSvg = (step: number) => {
  switch (step) {
    case 1:
      return infoUmumText;
    case 2:
      // Fallback: Using infoUmumText for Pertanyaan General until new SVG is available
      return infoUmumText;
    case 3:
      return subdivisi2Text;
    case 4:
      return subdivisi3Text;
    case 5:
      return uploadBerkasText;
    default:
      return infoUmumText;
  }
};

/*
  DecoLayer — lapisan gambar dekoratif (starBg / sinarAtas).
  Desktop: tetap memakai framer-motion (entrance + breathing) seperti semula.
  Mobile: dirender sebagai <Image> polos + lazy (tanpa GPU compositing layer,
  tanpa decode di critical path) untuk meredam crash jetsam WebKit yang
  "kadang bisa kadang engga" akibat halaman ini berada tepat di batas memori.
*/
const DecoLayer = ({
  isDesktop,
  breathAnimate,
  breathTransition,
  src,
  className,
  initial,
  transition,
}: {
  isDesktop: boolean;
  breathAnimate: { scale: number | number[] };
  breathTransition: Transition;
  src: StaticImageData;
  className: string;
  initial: { opacity: number; scale: number };
  transition: Transition;
}) =>
  isDesktop ? (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={transition}
      className={className}
    >
      <motion.div animate={breathAnimate} transition={breathTransition}>
        <Image src={src} alt="" priority />
      </motion.div>
    </motion.div>
  ) : (
    <div className={className}>
      <Image src={src} alt="" loading="lazy" />
    </div>
  );

const TitleHeader = ({ step, style }: { step: number; style?: React.CSSProperties }) => {  const svgSrc = getTitleSvg(step);
  return (
    <div
      className="absolute left-1/2 z-20 -translate-x-1/2 -rotate-3"
      style={{
        top: step === 1 ? "1677px" : step === 5 ? "1629px" : "1677px",
        ...style,
      }}
    >
      <Image src={svgSrc} alt="Title Header" priority />
    </div>
  );
};

export const FormSection = () => {
  const {
    step,
    goToStep,
    isSubmitted,
    isSubmitting,
    submitError,
    currentType,
    currentData,
    formData,
    updateField,
    updateUploadField,
    removeUploadField,
    rawFiles,
    showPortfolioModal,
    dismissPortfolioModal,
    handleNext,
    handleBack,
    clearError,
  } = useRegistrationForm();

  // Loop "breathing" (scale [1,1.04,1] repeat: Infinity) pada starBg & sinarAtas
  // hanya aktif di desktop. Pada layar kecil loop tak terhingga ini dimatikan untuk
  // meringankan beban compositing/GPU di WebKit (Sari/iOS WKWebView).
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const breathAnimate = isDesktop ? { scale: [1, 1.04, 1] } : { scale: 1 };
  const breathTransition = isDesktop
    ? { duration: 3.5, ease: "easeInOut" as const, repeat: Infinity, repeatType: "loop" as const }
    : { duration: 0 };

  if (isSubmitted) {
    return (
      <div className="absolute top-0 left-0 w-[1440px] h-[3323px] select-none pointer-events-none">
        {/* Background graphics (no-wrap next/image with imported dimensions) */}
        <DecoLayer
          isDesktop={isDesktop}
          breathAnimate={breathAnimate}
          breathTransition={breathTransition}
          src={starBg}
          className="absolute top-[1345px] left-0 z-0 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
        />
        <DecoLayer
          isDesktop={isDesktop}
          breathAnimate={breathAnimate}
          breathTransition={breathTransition}
          src={sinarAtas}
          className="absolute top-[1432px] left-[-156px] z-0 pointer-events-none"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.05 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full relative z-10 pointer-events-auto"
        >
          <FormSuccessScreen />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 w-[1440px] h-[3323px] select-none pointer-events-none">
      {/* Background graphics (no-wrap next/image with imported dimensions) */}
      <DecoLayer
        isDesktop={isDesktop}
        breathAnimate={breathAnimate}
        breathTransition={breathTransition}
        src={starBg}
        className="absolute top-[1345px] left-0 z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 60, damping: 14 }}
      />
      <DecoLayer
        isDesktop={isDesktop}
        breathAnimate={breathAnimate}
        breathTransition={breathTransition}
        src={sinarAtas}
        className="absolute top-[1472px] left-0 z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.05 }}
      />

      {/* Form Content container to enable input pointer-events */}
      <div className="w-full h-full relative z-10 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-auto z-30"
          style={{
            top: "1677px",
            width: currentType === "form" ? "778px" : "863px",
            height: currentType === "form" ? "917px" : "1396px",
          }}
        >
          {currentType === "form" ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 14,
                opacity: { duration: 0.3 }
              }}
              className="w-full h-full relative"
            >
              {/* Header Title Bubble */}
              <TitleHeader step={step} style={{ top: step === 1 ? "0px" : step === 5 ? "-48px" : "0px" }} />

              {/* Form Card/Grid Container (Figma top: 1843px, relative: 166px) */}
              <div
                className="absolute"
                style={{
                  top: "166px",
                  width: "778px",
                  height: "751px",
                }}
              >
                <div
                  className="w-full h-[1230px] border-none flex flex-col relative overflow-y-auto"
                  style={{
                    backgroundColor: "#EFE8DE",
                    backgroundImage: noiseBg,
                    borderWidth: "calc(var(--form-font-size) * 0.14)",
                    boxShadow:
                      "calc(var(--form-font-size) * 0.71) calc(var(--form-font-size) * 0.71) 0px 0px #000",
                    paddingLeft: "var(--form-card-padding-x)",
                    paddingRight: "var(--form-card-padding-x)",
                    paddingTop: "var(--form-card-padding-y)",
                    paddingBottom: "var(--form-card-padding-y)",
                    gap: "var(--form-card-gap)",
                  }}
                >
                  <FormStepFields
                    step={step}
                    formData={formData}
                    currentData={currentData as StepData}
                    updateField={updateField}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 14,
                opacity: { duration: 0.3 }
              }}
              className="w-full h-full relative"
            >
              {/* Header Title Bubble for Upload Berkas */}
              <TitleHeader step={step} style={{ top: step === 1 ? "0px" : step === 5 ? "-48px" : "0px" }} />

              <UploadStep
                  formData={formData}
                  uploadData={formData.uploadBerkas}
                  rawFiles={rawFiles}
                  updateUploadField={updateUploadField}
                  removeUploadField={removeUploadField}
                  submitError={submitError}
                  style={{ top: "166px" }}
                />
            </motion.div>
          )}
        </motion.div>

        {/* Navigation & Step Indicator Row */}
        <FormNavigation
          step={step}
          goToStep={goToStep}
          handleNext={handleNext}
          handleBack={handleBack}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Pengingat portofolio untuk divisi SMM/Website */}
      <PortfolioReminderModal open={showPortfolioModal} onClose={dismissPortfolioModal} />

      {/* Loading screen saat submit pendaftaran */}
      {isSubmitting && <SubmitLoadingScreen />}

      {/* Popup modal validasi error (auto-dismiss 3 detik) */}
      <ValidationErrorToast message={submitError} onDismiss={clearError} />
    </div>
  );
};
