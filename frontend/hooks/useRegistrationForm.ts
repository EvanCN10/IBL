import { useState } from "react";
import { RegisterFormData, StepData, UploadData, FileData } from "@/types/register";
import { submitRegistration } from "@/lib/api";
import { DIVISION_QUESTIONS } from "../constants/questions";

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
    setSubmitError(null); // Clear errors when user edits
    setFormData((prev) => ({
      ...prev,
      [currentKey]: {
        ...prev[currentKey as "informasiUmum" | "subdivisi1" | "subdivisi2"],
        [field]: value,
      },
    }));
  };

  const updateUploadField = (field: keyof UploadData, value: string, fileData?: FileData) => {
    setSubmitError(null); // Clear errors when user uploads
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
    // STEP 1 VALIDATION
    if (step === 1) {
      const info = formData.informasiUmum;
      if (
        !info.nama?.trim() ||
        !info.nim?.trim() ||
        !info.whatsapp?.trim() ||
        !info.lineId?.trim() ||
        !info.departemen?.trim() ||
        !info.angkatan?.trim() ||
        !info.subdivisi1?.trim() ||
        info.subdivisi1 === "Pilih Subdivisi"
      ) {
        setSubmitError("Mohon lengkapi seluruh informasi umum yang bertanda bintang (*).");
        return;
      }
      setSubmitError(null);
      setStep((s) => s + 1);
      return;
    }

    // STEP 2 VALIDATION
    if (step === 2) {
      const div1 = formData.informasiUmum.subdivisi1;
      if (div1 && div1 !== "Tidak Memilih" && div1 !== "Pilih Subdivisi") {
        const divData = DIVISION_QUESTIONS[div1];
        if (divData) {
          const requiredQuestions = [...(divData.divisionQuestions || []), ...(divData.studyCases || [])];
          for (const q of requiredQuestions) {
            const ans = formData.subdivisi1[q];
            if (!ans || !ans.trim()) {
              setSubmitError("Mohon jawab seluruh pertanyaan subdivisi pilihan 1 (*).");
              return;
            }
          }
        }
      }
      setSubmitError(null);
      setStep((s) => s + 1);
      return;
    }

    // STEP 3 VALIDATION
    if (step === 3) {
      const div2 = formData.informasiUmum.subdivisi2;
      if (div2 && div2 !== "Tidak Memilih" && div2 !== "Pilih Subdivisi") {
        const divData = DIVISION_QUESTIONS[div2];
        if (divData) {
          const requiredQuestions = [...(divData.divisionQuestions || []), ...(divData.studyCases || [])];
          for (const q of requiredQuestions) {
            const ans = formData.subdivisi2[q];
            if (!ans || !ans.trim()) {
              setSubmitError("Mohon jawab seluruh pertanyaan subdivisi pilihan 2 (*).");
              return;
            }
          }
        }
      }
      setSubmitError(null);
      setStep((s) => s + 1);
      return;
    }

    // STEP 4 VALIDATION & SUBMISSION
    if (step === 4) {
      const uploads = formData.uploadBerkas;
      if (!uploads.cv || !uploads.ktm || !uploads.twibbon || !uploads.buktiFollow) {
        setSubmitError("Mohon lengkapi dokumen wajib (*): CV, KTM, Twibbon, dan Bukti Follow.");
        return;
      }

      // Dynamic portfolio check
      const p1 = formData.informasiUmum.subdivisi1;
      const p2 = formData.informasiUmum.subdivisi2;
      const portfolioRequiredDivisions = ["UIUX", "CnD", "MedPro", "Branding", "Front-End", "Back-End"];
      const isPortfolioRequired = portfolioRequiredDivisions.includes(p1) || portfolioRequiredDivisions.includes(p2);

      if (isPortfolioRequired && !uploads.portofolio) {
        setSubmitError("Subdivisi pilihanmu mewajibkan portofolio. Mohon unggah berkas Portofolio (*).");
        return;
      }

      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const gasUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!gasUrl) {
          throw new Error("Backend URL (NEXT_PUBLIC_BACKEND_URL) is not configured");
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
    setSubmitError(null); // Clear validation warning on navigation back
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

