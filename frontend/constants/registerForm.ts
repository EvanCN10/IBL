// Constants untuk halaman pendaftaran IBL
// Menyediakan label form dan daftar divisi yang valid

export const FORM_LABELS = {
  shortAnswer: "Jawaban Pendek",
  longAnswer: "Jawaban Panjang",
  dropdown: "Pilihan Subdivisi 1",
  dropdown2: "Pilihan Subdivisi 2 (Opsional)",
  radio: "Pertanyaan Pilihan",
};

export const DIVISION_LIST = [
  "UIUX",
  "Front-End",
  "Back-End",
  "MedPro",
  "CnD",
  "Branding",
  "Public Relations",
  "SnL",
  "Logistics",
  "Medical",
  "Consumption",
  "Fundraising",
  "Ticketing",
  "Sponsorship",
  "Ceremonial",
  "Competition",
  "Damen"
];

export const DROPDOWN_OPTIONS = [...DIVISION_LIST];

// Opsi kedua bisa kosong jika pendaftar hanya memilih satu divisi
export const DROPDOWN_OPTIONS_2 = ["Tidak Memilih", ...DIVISION_LIST];
