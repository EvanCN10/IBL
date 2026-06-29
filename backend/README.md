# Dokumentasi Backend Oprec Staff IBL 2K26

Backend ini dikembangkan menggunakan **Google Apps Script (GAS)** untuk mengintegrasikan form pendaftaran frontend (Next.js) ke ekosistem Google Workspace panitia secara gratis, aman, dan tanpa biaya server (VPS).

---

## 🔗 Link Aset Google Workspace (Kepanitiaan)
Berikut adalah link aset Google yang telah terhubung ke backend:
* **Google Spreadsheet (Database Respon)**: 
  👉 [IBL 2K26 - Database Pendaftaran Staff](https://docs.google.com/spreadsheets/d/1_Vfxb8PDrgg2eFsNQlZXBBOMgqKGqhoyUg52kGKALP8/edit?usp=sharing)
* **Google Drive (Penyimpanan Berkas)**: 
  👉 [IBL 2K26 - Berkas Pendaftaran Staff](https://drive.google.com/drive/folders/1tHOOJXFDu1S-hwdvB4pWo8aj1orP0bUY?usp=sharing)

---

## 🛠️ Yang Telah Dikerjakan (Proses Sistem)

1. **Google Apps Script (`backend/code.js`)**:
   * **doPost(e) Entrypoint**: Menerima request POST data pendaftar yang dikirim oleh frontend.
   * **Penyimpanan Berkas di Google Drive**: Mengambil berkas (CV, KTM, Twibbon, Bukti Follow, Portofolio) dalam format Base64 dari frontend, men-decode, dan mengunggahnya ke folder Drive panitia dengan struktur:
     `Parent Folder` > `Nama Subdivisi` > `[Nama Pendaftar] - [NIM]` > `berkas`
     *(Jika pendaftar memilih 2 subdivisi, berkas akan disimpan di folder kedua divisi tersebut agar memudahkan penilaian masing-masing koordinator divisi).*
   * **Pencatatan Google Spreadsheet**: Mengelola tab sheet otomatis per divisi di Spreadsheet utama. Jika tab baru dibuat, script otomatis mengisi kolom header awal beserta **kolom dinamis** untuk seluruh pertanyaan divisi dan studi kasus.

2. **Frontend Next.js Integration**:
   * **Pembacaan Berkas Base64**: Menambahkan pembacaan file dengan `FileReader` di frontend agar berkas biner di-encode menjadi string base64 sebelum dikirim ke API.
   * **Render Pertanyaan Dinamis**: Menambahkan database pertanyaan di [questions.ts](../frontend/constants/questions.ts) (dieksport dari `All Divisi Pemberkasan.xlsx`). Halaman pendaftaran secara dinamis merender input pertanyaan divisi & studi kasus sesuai subdivisi pilihan calon pendaftar.
   * **Visual Feedback**: Menambahkan status loading (`isSubmitting`) dan error handling (`submitError`) pada tombol navigasi form.
   * **Konfigurasi Git & Env**: Memasukkan file `.env` ke Git agar tim Anda bisa langsung mengunduh repositori dan menjalankannya tanpa perlu mengonfigurasi API Web App berulang kali.

---

## 🚀 Panduan Deployment Ulang (Jika Diperlukan)
Jika Anda perlu mengganti akun Google atau mendeploy ulang script:
1. Buka [script.google.com](https://script.google.com/) dan buat project baru bernama `IBL 2K26 - Backend Oprec Staff`.
2. Salin isi seluruh kode dari file [code.js](code.js) ke dalam editor script.
3. Klik ikon **Save** (`Ctrl + S`).
4. Klik tombol **Deploy** di kanan atas -> pilih **New deployment** -> Klik gerigi pilih **Web app**.
5. Atur konfigurasi:
   * **Execute as**: `Me (email-kamu@gmail.com)`
   * **Who has access**: `Anyone` *(Penting agar pendaftar bisa submit).*
6. Klik **Deploy** dan berikan otorisasi akses (Klik *Advanced* -> *Go to IBL 2K26 - Backend Oprec Staff (unsafe)* -> *Allow*).
7. Salin **Web app URL** yang muncul dan masukkan ke file `.env` di frontend.
