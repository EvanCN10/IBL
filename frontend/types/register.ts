// TypeScript types & interfaces untuk form pendaftaran IBL

export interface StepData {
  shortAnswer1: string;
  shortAnswer2: string;
  shortAnswer3: string;
  longAnswer1: string;
  longAnswer2: string;
  dropdownVal: string;
  radioVal: string;
}

export interface UploadData {
  cv: string;
  ktm: string;
  twibbon: string;
  buktiFollow: string;
  portofolio: string;
}

export interface RegisterFormData {
  informasiUmum: StepData;
  subdivisi1: StepData;
  subdivisi2: StepData;
  uploadBerkas: UploadData;
}

export interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}
