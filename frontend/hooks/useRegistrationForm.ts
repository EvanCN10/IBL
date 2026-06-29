import { useState } from "react";
import { RegisterFormData, StepData, UploadData, FileData } from "@/types/register";
import { submitRegistration } from "@/lib/api";

export const initialStepData = (): StepData => ({
  nama: "",
  nim: "",
  whatsapp: "",
  lineId: "",
  departemen: "",
  angkatan: "",
  subdivisi1: "",
  subdivisi2: "",
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
    subdivisi1: {},
    subdivisi2: {},
    uploadBerkas: initialUploadData(),
  });
  const [rawFiles, setRawFiles] = useState<{ [key in keyof UploadData]?: FileData }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentKey]: {
        ...prev[currentKey as "informasiUmum" | "subdivisi1" | "subdivisi2"],
        [field]: value,
      },
    }));
  };

  const updateUploadField = (field: keyof UploadData, value: string, fileData?: FileData) => {
    setFormData((prev) => ({
      ...prev,
      uploadBerkas: {
        ...prev.uploadBerkas,
        [field]: value,
      },
    }));
    if (fileData) {
      setRawFiles((prev) => ({
        ...prev,
        [field]: fileData,
      }));
    }
  };

  const handleNext = async () => {
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const gasUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!gasUrl) {
          throw new Error("Backend URL (NEXT_PUBLIC_BACKEND_URL) is not configured in .env.local");
        }

        const compiledData: RegisterFormData = {
          informasiUmum: {
            nama: formData.informasiUmum.nama || "",
            nim: formData.informasiUmum.nim || "",
            whatsapp: formData.informasiUmum.whatsapp || "",
            lineId: formData.informasiUmum.lineId || "",
            departemen: formData.informasiUmum.departemen || "",
            angkatan: formData.informasiUmum.angkatan || "",
            subdivisi1: formData.informasiUmum.subdivisi1 || "",
            subdivisi2: formData.informasiUmum.subdivisi2 || ""
          },
          subdivisi1: formData.subdivisi1,
          subdivisi2: formData.subdivisi2,
          uploadBerkas: formData.uploadBerkas
        };

        await submitRegistration(gasUrl, compiledData, rawFiles as any);
        setIsSubmitted(true);
      } catch (err: any) {
        console.error("Submission failed:", err);
        setSubmitError(err.message || "Failed to submit. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
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
      subdivisi1: {},
      subdivisi2: {},
      uploadBerkas: initialUploadData(),
    });
    setRawFiles({});
    setIsSubmitted(false);
    setSubmitError(null);
    setIsSubmitting(false);
  };

  return {
    step,
    setStep,
    formData,
    isSubmitted,
    isSubmitting,
    submitError,
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

