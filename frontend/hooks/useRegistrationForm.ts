import { useState } from "react";
import { RegisterFormData, StepData, UploadData } from "@/types/register";

export const initialStepData = (): StepData => ({
  shortAnswer1: "",
  shortAnswer2: "",
  shortAnswer3: "",
  longAnswer1: "",
  longAnswer2: "",
  dropdownVal: "",
  radioVal: "",
});

export const initialUploadData = (): UploadData => ({
  cv: "",
  ktm: "",
  twibbon: "",
  buktiFollow: "",
  portofolio: "",
});

export const useRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    informasiUmum: initialStepData(),
    subdivisi1: initialStepData(),
    subdivisi2: initialStepData(),
    uploadBerkas: initialUploadData(),
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  return {
    step,
    setStep,
    formData,
    isSubmitted,
    currentType,
    currentKey,
    currentTitle,
    currentData,
    updateField,
    updateUploadField,
    handleNext,
    handleBack,
    handleReset,
  };
};
