# Dokumentasi Backend Oprec Staff IBL 2K26

Backend ini dikembangkan menggunakan **Google Apps Script (GAS)** untuk mengintegrasikan form pendaftaran frontend (Next.js) ke ekosistem Google Workspace panitia secara gratis, aman, dan tanpa biaya server (VPS).

---

## 🔗 Link Aset Google Workspace (Kepanitiaan)
Berikut adalah link aset Google yang telah terhubung ke backend:
* **Google Spreadsheet (Database Respon)**:
  👉 [IBL 2K26 - Database Pendaftaran Staff](https://docs.google.com/spreadsheets/d/1WQ5WGB3Bfoq637RiJk3yLqMh89XR6wMAM3NILxw0yME/edit?usp=sharing)
* **Google Drive (Penyimpanan Berkas)**:
  👉 [IBL 2K26 - Berkas Pendaftaran Staff](https://drive.google.com/drive/folders/1MaUvGb_13QsQly0ub0sOZr91YZzq3Pcf?usp=sharing)
* **Google Drive Backup (Backup CSV Pendaftaran)**:
  👉 [IBL 2K26 - Backup CSV Pendaftaran Staff](https://drive.google.com/drive/folders/1oHm0-oiUksJ5K6cNmXqhb8hbGQm_h-0B?usp=sharing)

---

## 🛠️ Yang Telah Dikerjakan (Proses Sistem)

1. **Google Apps Script (`backend/code.js`)**:
   * **doPost(e) Entrypoint**: Menerima request POST data pendaftar yang dikirim oleh frontend.
   * **Penyimpanan Berkas di Google Drive**: Mengambil berkas (CV, KTM, Twibbon, Bukti Follow, Portofolio) dalam format Base64 dari frontend, men-decode, dan mengunggahnya ke folder Drive panitia dengan struktur:
     `Parent Folder` > `Nama Subdivisi` > `[Nama Pendaftar] - [NRP]` > `berkas`
     *(Jika pendaftar memilih 2 subdivisi, berkas akan disimpan di folder kedua divisi tersebut agar memudahkan penilaian masing-masing koordinator divisi).*
   * **Pencatatan Google Spreadsheet**: Mengelola tab sheet otomatis per divisi di Spreadsheet utama. Jika tab baru dibuat, script otomatis mengisi kolom header awal beserta **kolom dinamis** untuk seluruh pertanyaan divisi dan studi kasus.
   * **Sheet Master "Semua Form"**: Setiap submit juga mencatat satu baris ringkasan pendaftar ke tab `Semua Form` (menampung seluruh pendaftar lintas divisi) — berisi data dasar, pilihan subdivisi, dan link berkas.
   * **Backup CSV Otomatis**: Setiap submit juga menambah satu baris ke file `backup_berkas_pendaftaran_IBL_2K26.csv` di folder Drive backup. Skema CSV mencakup **seluruh pertanyaan & study case dari semua divisi** (diberi prefix nama divisi); kolom divisi yang tidak dipilih otomatis berisi `-`.

2. **Frontend Next.js Integration**:
   * **Pembacaan Berkas Base64**: Menambahkan pembacaan file dengan `FileReader` di frontend agar berkas biner di-encode menjadi string base64 sebelum dikirim ke API.
   * **Render Pertanyaan Dinamis**: Menambahkan database pertanyaan di [questions.ts](../frontend/constants/questions.ts) (dieksport dari `All Divisi Pemberkasan.xlsx`). Halaman pendaftaran secara dinamis merender input pertanyaan divisi & studi kasus sesuai subdivisi pilihan calon pendaftar.
   * **Visual Feedback**: Menambahkan status loading (`isSubmitting`) dan error handling (`submitError`) pada tombol navigasi form.
   * **Konfigurasi Git & Env**: Memasukkan file `.env` ke Git agar tim Anda bisa langsung mengunduh repositori dan menjalankannya tanpa perlu mengonfigurasi API Web App berulang kali.

### ✨ Update Terbaru (Juli 2026)
* **Migrasi Ulang ke Folder Baru**: Mengubah tujuan ID Folder dan Spreadsheet ke direktori resmi terbaru IBL 2K26 (Juli 2026). Serta mengganti nama file csv ke `backup_berkas_pendaftaran_IBL_2K26.csv`.
* **Perbaikan Header "Hal Unik"**: Menghapus penggunaan istilah "Hal Unik" di backend dan mengubah semua kemunculannya di Spreadsheet & CSV menjadi teks pertanyaan panjang sesuai dengan label di frontend form (agar sama dengan pertanyaan aslinya).
* **Fix Validasi Typo Damen**: Memperbaiki typo logika validasi dari "excited" menjadi "exicted" agar cocok dengan format database pertanyaan frontend divisi Data Management.
* **Bug Fix Duplikasi Kolom Damen**: Memperbaiki isu di mana pertanyaan divisi Damen membuat kolom ganda di spreadsheet akibat perubahan teks pertanyaan (dari "give" ke "berikan"). Sheet sekarang menampung jawaban dengan benar dan rapi.
* **Perbaikan UI Modal Peringatan (Error Validation)**: Notifikasi jika pendaftar melewatkan pertanyaan wajib kini muncul sebagai pop-up animasi yang elegan di tengah layar (terlepas dari isu scaling browser) dan akan tertutup otomatis setelah 3 detik berkat implementasi **React Portal**.
* **Standardisasi Istilah**: Memastikan seluruh sistem (Frontend & Backend) menggunakan istilah **NRP** (bukan NIM) secara konsisten.

---

## 🚀 Link Project Google Apps Script (GAS)
Project Apps Script yang aktif dan digunakan bersama dapat diakses langsung oleh tim melalui link berikut:
👉 [Google Apps Script Editor - IBL 2K26 Backend Oprec Staff](https://script.google.com/home/projects/122563B8yc4tnk8yM2fsjxJ2Tuw5zkfkH_X8qySUwjpDMxgOE0nv-MLag/edit)

Berikut adalah URL hasil Deployment untuk dihubungkan ke Frontend (`.env`):
👉 **URL Aplikasi Web**: `https://script.google.com/macros/s/AKfycbx9TSpeSa7EdjJDRIg_JB1Set5OVnV-r6590XtmANQA5h0MGps_BvH2wtyHIYzebHPe/exec`
👉 **Library URL**: `https://script.google.com/macros/library/d/122563B8yc4tnk8yM2fsjxJ2Tuw5zkfkH_X8qySUwjpDMxgOE0nv-MLag/6`

Teman satu tim Anda tidak perlu membuat project baru dari awal, mereka cukup membuka link di atas untuk melihat kode atau melakukan deployment ulang jika diperlukan.

---

## ⚡ Panduan Deploy Ulang (Jika Ada Perubahan Kode)
Jika tim melakukan perubahan pada script backend dan ingin menerapkannya ke web:
1. Klik tombol **Deploy** di kanan atas editor Google Apps Script.
2. Pilih **Manage deployments** (Kelola penerapan).
3. Klik ikon pensil (Edit) di bagian kanan atas, ubah versi ke **New version** (Versi baru).
4. Klik **Deploy** (Terapkan).
*(Penting: Setiap kali kode di Apps Script diubah, Anda HARUS men-deploy ulang dengan membuat versi baru agar perubahan tersebut aktif di URL Web App).*
