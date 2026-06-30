/**
 * Open Recruitment Backend for IBL 2K26 (ITS Basketball League)
 * Deploy this script as a Google Apps Script Web App.
 *
 * Requirements Met:
 * 1. Google Drive structure: Parent Folder > Subdivisi > Candidate Folder (Nama - NIM) > files
 * 2. Google Spreadsheet: 1 Spreadsheet, separate tabs per division, automatically managed
 * 3. CORS-compliant doPost entrypoint for Next.js frontend integration
 */

// --- CONFIGURATION ---
// IMPORTANT: Paste your Spreadsheet ID and Parent Drive Folder ID here.
// If PARENT_FOLDER_ID is blank, a new folder "IBL 2K26 Oprec - Pendaftar" will be created in your root Drive.
var SPREADSHEET_ID = "1_Vfxb8PDrgg2eFsNQlZXBBOMgqKGqhoyUg52kGKALP8";
var PARENT_FOLDER_ID = "1tHOOJXFDu1S-hwdvB4pWo8aj1orP0bUY";
// Folder Google Drive untuk backup CSV pendaftaran (share sebagai Editor ke akun yang deploy GAS).
var BACKUP_FOLDER_ID = "1oHm0-oiUksJ5K6cNmXqhb8hbGQm_h-0B";
var BACKUP_CSV_NAME = "backup_pendaftaran_IBL_2K26.csv";

// --- DIVISION QUESTIONS DATABASE ---
// Extracted from All Divisi Pemberkasan.xlsx to automatically create headers
var DIVISION_DATA = {
  "UIUX": {
    "questions": [
      "Menurutmu, apa perbedaan UI dan UX? Dan kenapa keduanya sama-sama penting dalam pengembangan website?",
      "Berikan contoh sebuah website yang menurutmu punya user experience yang baik atau buruk. Jelaskan alasannya!",
      "Saat membuat desain web, mana yang lebih kamu prioritaskan: estetika atau usability? Jelaskan."
    ],
    "cases": [
      "Website lomba basket menampilkan banyak informasi dalam satu halaman (skor, jadwal, leaderboard, statistik tim), tetapi pengguna sering kesulitan menemukan informasi yang mereka cari dengan cepat. Sebagai UI/UX designer, bagaimana kamu menyusun ulang tampilan agar informasi lebih mudah dipahami?"
    ]
  },
  "Front-End": {
    "questions": [
      "Ceritakan pengalamanmu mendevelop website. Tech stack apa yang paling kamu kuasai dan sering kamu gunakan (misalnya React, Next.js, Tailwind CSS)?",
      "Website IBL mayoritas akan diakses penonton melalui HP. Bagaimana pendekatan teknismu untuk memastikan komponen yang rumit tetap 100% responsif dan nyaman dilihat di berbagai ukuran layar?",
      "Di IBL, kita akan banyak coding bareng dalam satu repository. Ceritakan pengalamanmu menggunakan Git/GitHub. Apa yang kamu lakukan jika terjadi merge conflict dengan branch temanmu?",
      "Bagaimana caramu bekerja sama dengan desainer UI/UX? Jika kamu menerima desain Figma yang animasinya atau layout-nya secara teknis sangat sulit/berat untuk di-code dengan deadline mepet, apa yang akan kamu lakukan?",
      "Mengerjakan website event sering kali berhadapan dengan deadline yang sangat ketat dan revisi mendadak menjelang hari H. Ceritakan pengalaman terberatmu saat ngoding di bawah tekanan dan bagaimana kamu menyelesaikannya."
    ],
    "cases": [
      "Menjelang opening IBL, halaman Gallery dan Roster tim sangat lambat saat dibuka karena harus memuat puluhan foto pemain dan dokumentasi pertandingan beresolusi tinggi. Sebagai Front-End, langkah teknis apa saja yang akan kamu terapkan untuk mempercepat loading time halaman tersebut tanpa merusak kualitas foto secara drastis?",
      "Kita memiliki halaman 'Live Score' dan 'Jadwal Pertandingan' yang datanya bisa berubah sewaktu-waktu dari backend saat pertandingan berlangsung. Bagaimana caramu merancang komponen UI tersebut agar bisa meng-update data skor secara berkala (atau real-time) tanpa membuat website menjadi lag atau harus terus-menerus di-refresh manual oleh user?"
    ]
  },
  "Back-End": {
    "questions": [
      "Ceritakan pengalamanmu mendevelop website. Tech stack apa yang paling kamu kuasai dan sering kamu gunakan (misalnya React, Next.js, Tailwind CSS)?",
      "Di IBL, kita akan banyak coding bareng dalam satu repository. Ceritakan pengalamanmu menggunakan Git/GitHub. Apa yang kamu lakukan jika terjadi merge conflict dengan branch temanmu?"
    ],
    "cases": [
      "Apabila finance tidak punya uang yang cukup untuk membeli VPS (Virtual Private Server) untuk bulan-bulan kedepan, apa yang akan kamu lakukan dengan kondisi tersebut? -Hikari XD"
    ]
  },
  "MedPro": {
    "questions": [
      "Apa yang kamu ketahui terkait divisi SMM?",
      "Apa yang kamu ketaui tentang subdivisi Meda Production dan apa motivasimu mendaftar subdivisi ini?",
      "Apa bidang yang kamu minati (lapangan atau editing)? jelaskan kenapa",
      "Sebutkan pengalaman yang kamu miliki pada subdivisi Media Production? Untuk editing, sebutkan juga software yang biasa dipakai, contoh : After Effect, Premiere Pro, Capcut, dll.",
      "Apakah kamu memiliki perlengkapan yang mendukung pekerjaan pada subdivisi Media Production? Sebutkan setiap perlengkapan yang mendukung, contoh : lighting Yongnuo, Camera Sony a6400, Lensa G Master, Laptop untuk editing dll."
    ],
    "cases": [
      "Kamu ditugaskan mengedit video recap yang harus di-upload besok pagi. Tapi sampai malam ini footage dari tim lapangan belum lengkap. Apa yang kamu lakukan?",
      "Dalam sebuah project, kamu ditugaskan di bidang yang bukan keahlianmu (misalnya kamu ahli di bidang editing tapi diminta dokumentasi). Bagaimana caramu menyikapinya?"
    ]
  },
  "CnD": {
    "questions": [
      "Apa yang kamu ketahui tentang subdivisi creative branding dan apa perannya dalam event IBL2K26?",
      "Software apa saja yang pernah kamu gunakan? Dan jika kamu diminta untuk mempelajari aplikasi baru apakah kamu berkenan?",
      "Jelaskan workflow kamu dalam memproses request design yang masuk dan durasi pengerjaannya",
      "Apa yang kamu ketahui terkait divisi SMM"
    ],
    "cases": [
      "Apa yang akan kamu lakukan saat ada salah satu file design tidak sengaja terhapus dan tidak ada back up filenya?",
      "Ada salah satu staff yang mendadak menghilang dan tidak dapat dihubungi sedangkan staff tersebut masih memiliki tanggungjawab salah satu project yang tengat waktu pengerjaannya sudah dekat, apa yang akan kamu lakukan?",
      "Apa yang akan kamu lakukan jika kamu sedang dihadapkan dengan kesibukan atau deadline akademik yang bersamaan dengan deadline request design yang harus dibuat?"
    ]
  },
  "Branding": {
    "questions": [
      "Apa yang kamu ketahui tentang Divisi SMM?",
      "Apa yang kamu ketahui tentang Sub-Divisi Branding?",
      "Mengapa kamu ingin masuk Sub-Divisi Branding?",
      "Apakah kamu memiliki pengalaman di Branding? Jika iya, Ceritakan pengalamannya!",
      "Menurutmu, apa yang membuat sebuah konten bisa menarik audiens? Ceritakan proses kamu dalam membuat konten media sosial yang efektif"
    ],
    "cases": [
      "Subdivisi Branding IBL 2026 mengalami penurunan kualitas dan konsistensi konten akibat kurangnya koordinasi dan perencanaan internal. Jika kamu menjadi bagian dari tim tersebut, langkah strategis apa yang akan kamu lakukan untuk meningkatkan kualitas konten dan efektivitas kerja tim?",
      "Jika terjadi revisi atau perubahan konsep secara mendadak saat konten sudah siap dipublikasikan, bagaimana sikap dan langkah yang akan kamu ambil sebagai bagian dari Subdivisi Branding?"
    ]
  },
  "Public Relations": {
    "questions": [
      "Apa yang kamu ketahui terkait divisi Public Relation?",
      "Pengalaman dan kelebihan apa yang kamu miliki dan membuatmu merasa pantas berada di Public Relation?",
      "Bagaimana cara kamu untuk selalu aktif 24/7 saat menjadi bagian dari Public Relation?",
      "Bagaimana menurutmu lingkungan kerja yang baik ? dan jelaskan bagaimana caramu untuk membangun lingkungan kerja yang baik tersebut!",
      "Seberapa besar komitmenmu untuk menjadi bagian dari Public Relation?"
    ],
    "cases": [
      "Pada babak perempat final, pertandingan sengit mempertemukan Departemen A dan Departemen B. Di kuarter keempat, terjadi friksi fisik antar pemain di lapangan yang memicu ketegangan di area suporter. Laga sempat dihentikan 15 menit. Setelah laga usai, akun menfess kampus (seperti ITS Menfess) ramai oleh saling sindir dan provokasi antar suporter kedua departemen, bahkan mulai membawa narasi negatif yang menyerang kredibilitas panitia IBL karena dianggap tidak tegas. Sebagai seorang PR, apa langkah pertama yang akan kamu lakukan dalam 1 jam pertama setelah provokasi di media sosial mulai memuncak?",
      "Karena keterbatasan izin peminjaman lapangan di ITS, panitia terpaksa memadatkan jadwal pertandingan di babak penentuan. Akibatnya, ada beberapa departemen yang harus bermain back-to-back (dua hari berturut-turut), padahal di saat bersamaan sedang minggu UTS/tugas besar yang padat. Beberapa kapten tim mulai protes dan mengkritik panitia IBL egois dan tidak memikirkan kondisi fisik serta akademik para pemain. Bagaimana PR merespons kritik terbuka dari para pemain ini agar tidak berkembang menjadi sentimen negatif bahwa IBL adalah kompetisi yang \"tidak ramah mahasiswa\"?",
      "Di tengah pertandingan krusial, kapten tim dari Departemen X merasa wasit terus memberikan keputusan yang merugikan timnya. Puncaknya, saat Center andalan mereka terkena foul kelima (FO), kapten tim menginstruksikan seluruh pemainnya untuk duduk di pinggir lapangan dan menolak melanjutkan pertandingan (walk out tidak resmi). Penonton di tribun mulai riuh, dan situasi di sekitar lapangan menjadi sangat tegang. Di saat pertandingan terhenti dan suasana tribun memanas, bagaimana cara kamu mendatangi bangku pemain Departemen X untuk melakukan negosiasi cepat agar mereka mau kembali ke lapangan demi menjaga kondusivitas acara?"
    ]
  },
  "SnL": {
    "questions": [
      "Apa yang kamu ketahui tentang Sub-divisi SNL",
      "Apa motivasi dan alasan kamu mendaftar sub-divisi SNL",
      "Apakah kamu memiliki pengalaman sebelumnya di divisi ini? Apabila iya, jelaskan kendala dan solusi yang kamu lakukan!",
      "Apakah kamu mengerti alur peminjaman dan perizinan tempat yang ada di ITS?Jelaskan!",
      "Sebutkan kesibukan mu dalam waktu rentang 2 bulan kedepan",
      "Berikan skala prioritas dengan rentang 1-10 untuk IBL 2026"
    ],
    "cases": [
      "Apa yang kamu lakukan sebagai SNL untuk mengatasi kasus cuaca yang mendadak hujan pada hari-h terhadap supporter yang sedang kamu  antar menuju venue lapangan?",
      "Di suasana yg hectic dan panas, Jika peserta atau penonton acara melanggar peraturan atau terlibat dalam perilaku yang membahayakan, bagaimana Anda menangani situasi tersebut?",
      "Apabila pada saat hari-H terdapat kericuhan antar suporter dan antar panitia, bagaimana cara kamu menyikapinya ?"
    ]
  },
  "Logistics": {
    "questions": [
      "Apa yang kamu ketahui tentang sub divisi logistic ? Apakah kamu memiliki pengalaman menjadi panitia subdivisi logistic sebelumnya?",
      "Apa alasan kamu untuk masuk sub divisi logistic?",
      "Inovasi apa yang bisa kamu give apa bila kamu diterima pada IBL 2026?",
      "Apa rencana cadangan kamu jika ada kerusakan atau kekurangan pada perlengkapan selama acara?",
      "Berdasarkan Pengalamanmu yang kamu miliki, sebutkan kendala yang kamu alami dan bagaimana cara kamu mengatasi kendala tersebut sebagai panitia sub divisi logistic?",
      "Berdasarkan kelebihan dan kekurangan yang kamu miliki, sebutkan alasan mengapa kami harus menerima kamu sebagai staff subdivisi logistic IBL 2026?",
      "Seberapa besar komitmen kamu untuk menjadi bagian dari sub divisi Logistik? Jika suatu saat kamu tidak dapat memenuhi komitmen yang telah kamu sepakati, bagaimana kamu mempertanggungjawabkan hal tersebut?",
      "apakah kamu mempunyai mobil atau pickup yang bisa dipinjam saat berlangsungnya IBL?",
      "apakah kamu bisa menyetir mobil/pickup, kalau bisa manual atau matic?"
    ],
    "cases": [
      "kamu diberi tugas menjadi operator untuk mengoprasikan Audio,Proyektor,Score board akan tetapi ada salah satu komponen audio yang rusak, Proyektor yang awalnya bisa namun tiba- tiba mati, dan Kabel serta Score Board mengalami kerusakan dan Kabelnya terputus bagaimana solusimu agar tetap bisa melaksanakan event dengan baik dan bagaimana caramu berkoordinasi dengan yang lain?",
      "Apabila sudah melakukan penyewaan vendor, tetapi saat hari h pelakasanaan, vendor tersebut melakukan pemutusan kontrak secara sepihak. Bagaimana caramu mengatasi permasalahan tersebut dan apa tindakanmu untuk menunjukan profesionalitas sebagai seorang staf logistic yang berkewajiban untuk memenuhi kebutuhan perlengkapan",
      "Jika saat Pengembalian barang milik vendor terdapat kerusakan dikarenakan kesengajaan atau ketidaksengajaan panitia atau peserta , apa yang akan kamu lakukan untuk bertanggung jawab kepada vendor atas kerusakan yang diperbuat dan bagaimana caramu untuk memastikan hal tidak terjadi lagi"
    ]
  },
  "Medical": {
    "questions": [
      "Apa yang kamu ketahui tentang subdivisi medical?",
      "Mengapa kamu memilih subdivisi medical?jelaskan alasannya!",
      "Apakah kamu memiliki pengalaman di bidang medical?sebutkan dan jelaskan!",
      "Menurutmu, apa tugas dan kewajiban subdivisi medical?sebutkan dan jelaskan!",
      "Apa yang kamu ketahui tentang pertolongan pertama?Jelaskan!",
      "Sebutkan obat-obat yang kamu ketahui dan jelaskan fungsi masing-masing obat tersebut.",
      "Bagaimana sikapmu saat ada pemain yang menolak untuk diberikan bantuan medis padahal ia sangat membutuhkannya?"
    ],
    "cases": [
      "Apa yang kamu lakukan Ketika di akhir pertandingan terjadi kerusuhan dan hal tersebut memakan korban? Bagaimana cara kamu menangapi nya ditengah kerusuhan yang terjadi?Jelaskan alur koordinasi dan komunikasimu pada saat hal tersebut terjadi!",
      "Seorang pemain tabrakan keras di dada dan bahu, lalu jatuh terempas ke lantai sampai tulang selangkanya (tulang di bawah leher) patah dan menonjol ke atas. Akibat benturan itu, si pemain juga mengeluh dadanya sangat sesak dan susah bernapas. Sebagai tim medis, apa yang akan kamu lakukan untuk menolong pemain ini dan bagaimana cara menanganinya agar tulang yang patah tidak makin parah serta sesak napasnya bisa teratasi?",
      "seorang pemain melakukan lompatan untuk melakukan lay-up dan mendarat dengan posisi yang kurang baik. Ketika mencoba berlari kembali untuk bertahan, ia tiba-tiba merasakan nyeri hebat pada otot paha belakang (hamstring) disertai sensasi seperti tertarik atau robek, lalu terjatuh ke lapangan dan tidak mampu melanjutkan permainan. Area paha belakang mulai terasa nyeri, kaku, dan sedikit membengkak. Sebagai tim medis yang bertugas di lapangan, apa yang akan kamu lakukan untuk menangani pemain tersebut? Jelaskan langkah-langkah pertolongan pertama yang perlu dilakukan untuk mengurangi nyeri dan mencegah cedera semakin parah, serta bagaimana menentukan apakah pemain dapat kembali bermain atau harus dirujuk untuk pemeriksaan dan penanganan lebih lanjut."
    ]
  },
  "Consumption": {
    "questions": [
      "Apa yang kamu ketahui tentang tugas dan kewajiban subdivisi konsumsi? Menurutmu, apa saja kebutuhan konsumsi utama untuk pemain, panitia, wasit, dan official selama IBL berlangsung?",
      "Ceritakan pengalamanmu di bidang konsumsi (jika ada), baik di event sekolah, kampus, organisasi, atau kegiatan lainnya. Apa peran yang kamu ambil dan kendala apa yang pernah kamu hadapi?",
      "Apa motivasi kamu mendaftar di subdivisi konsumsi IBL 2026? Menurutmu, kontribusi apa yang bisa kamu berikan di subdivisi konsumsi IBL 2026?",
      "Apakah kamu memiliki kendaraan pribadi yang bisa digunakan untuk mendukung mobilitas selama kegiatan IBL 2026? Jika ada, sebutkan jenisnya (motor/mobil). Dan apakah kamu siap jika harus mobilisasi cepat untuk kebutuhan konsumsi di lapangan?"
    ],
    "cases": [
      "Dalam sebuah acara IBL 2026 subdivisi konsumsi memiliki peran penting untuk memastikan seluruh kebutuhan makan dan minum pemain, panitia, wasit, dan official terpenuhi dengan baik dan tepat waktu. Bayangkan kamu berada di posisi sebagai bagian dari tim konsumsi. Kamu diminta untuk mengurus proses pemesanan konsumsi untuk seluruh rangkaian pertandingan. Coba jelaskan secara lengkap bagaimana alur pemesanan konsumsi yang akan kamu lakukan, mulai dari tahap awal seperti pengumpulan data kebutuhan, perhitungan jumlah porsi, pemilihan dan koordinasi dengan vendor, hingga proses pemesanan, konfirmasi, sampai akhirnya makanan diterima di lokasi dan siap didistribusikan ke pihak-pihak yang membutuhkan.",
      "Dalam pelaksanaan acara Basketball League, seluruh konsumsi sudah disiapkan berdasarkan data panitia yang ter-plotting pada hari tersebut. Jumlah konsumsi yang tersedia terbatas dan hanya cukup untuk pihak yang sudah terdaftar. Namun, saat distribusi berlangsung, tiba-tiba ada seorang panitia yang datang dan mengaku sedang bertugas di lapangan. Setelah dicek, namanya tidak tercantum dalam daftar penerima konsumsi hari itu. Ia tetap meminta konsumsi dengan alasan kontribusinya dalam membantu jalannya acara. Bagaimana cara kamu menyikapi situasi tersebut sebagai bagian dari subdivisi konsumsi, mengingat jumlah konsumsi yang tersedia terbatas dan harus diprioritaskan untuk pihak yang sudah terdata?"
    ]
  },
  "Fundraising": {
    "questions": [
      "Apa yang kamu ketahui tentang fundraising?",
      "Apa motivasimu menjadi staff Fundraising?",
      "Menurut kamu, karakter seperti apa yang penting dimiliki anggota fundraising?",
      "Apa kamu mempunyai ide atau inovasi penjualan untuk Fundraising IBL 2026?",
      "Apa kamu memiliki pengalaman di bidang yang sama dengan fundraising sebelumnya? Jika iya, apa kendala yang kamu lewati?",
      "Apakah kamu mempunyai basic skill mendesain (poster dll), jawab iya atau tidak"
    ],
    "cases": [
      "Divisi Fundrise merencanakan danusan selama seminggu untuk menambah dana acara. Target keuntungan Rp2.000.000, tetapi setelah 5 hari berjalan baru terkumpul Rp750.000. Waktu sudah mepet, sementara kebutuhan dana tetap harus terpenuhi.\nPertanyaan: Apa langkah strategis yang akan kamu ambil dalam sisa waktu 2 hari agar target bisa dikejar atau minimal mendekati target, tanpa mengganggu jadwal kuliah dan kerja tim?",
      "Divisi Fundrise sudah memesan PDH panitia ke sebuah vendor dengan DP 50%. Vendor menjanjikan PDH selpuisi H-7, tetapi sampai H-3 belum ada kabar dan ketika dihubungi vendor sulit direspons. Padahal PDH sangat penting dipakai saat acara berlangsung.\nPertanyaan: Apa yang akan kamu lakukan untuk memastikan PDH tetap tersedia saat hari H? Bagaimana kamu mengantisipasi risiko agar tim tidak tertipu vendor?"
    ]
  },
  "Ticketing": {
    "questions": [
      "Apa yang kamu ketahui dari subdivisi ticketing? dan berikan alasan/motivasi kenapa ingin masuk subdivisi ticketing",
      "Apakah kamu memiliki pengalaman pada subdivisi ticketing sebelumnya? Jika ada jelaskan",
      "Karakter seperti apa yang dibutuhkan untuk mengoptimalkan kinerja sebagai staff subdivisi ticketing?",
      "Jika kamu menghilang tanpa kabar, apakah konsekuensi yang akan kamu lakukan dan apa yang kamu lakukan jika teman staff mu yang lain mendadak hilang tanpa kabar"
    ],
    "cases": [
      "bagaimana cara kamu meminimalisir dan cara menangani kerusuhan di gor",
      "Apa yang kamu lakukan untuk mencegah orang masuk dengan curang dan bagaimana solusi nya"
    ]
  },
  "Sponsorship": {
    "questions": [
      "Apa yang kamu ketahui tentang divisi sponsorship? Sebutkanmotivasi dan alasamu mendaftar di divisi ini",
      "Apakah kamu memiliki pengalaman di bidang sponsorship? Jika ada, ceritakan pengalaman dan kontribusi yang kamu berikan",
      "Jika sponsor mengatakan bahwa eksposur media sosialtidak lagi menarik bagi mereka, benefit alternatif apa yang akan kamu tawarkan?",
      "Jika sponsor meminta jaminan bahwa acara akan mencapai target jumlah peserta tertentu, padahal kamu tidak bisa memastikan hal tersebut, apa yang akan kamu lakukan?",
      "Apa yang akan kamu lakukan apabila target sponsorship yang diberikan terasa terlalu tinggi dan sulit dicapai?",
      "Apakah kamu memiliki relasi atau koneksi dengan pihak perusahaan yang berpotensi menjadi sponsor? Jika ya, sebutkan perusahaan dan bentuk relasinya"
    ],
    "cases": [
      "Selama tiga tahun terakhir, sponsor A selalu mendukung acara dengan nominal Rp10.000.000. Tahun ini, sponsor B menawarkan Rp 25.000.000 tetapi meminta posisi sponsor utama yang biasanya diberikan kepada sponsor A. Bagaimana kamu menyikapi situasi tersebut?",
      "Lima hari sebelum acara, sponsor utama yang menyumbang 50% dari total pendanaan tiba-tiba membatalkan kerja sama karena perubahan kebijakan internal perusahaan. Padahal seluruh anggaran acara telah disusun berdasarkan komitmen sponsor tersebut. Bagaimana cara kamu menangani situasi ini dan langkah apa yang akan kamu ambil?"
    ]
  },
  "Ceremonial": {
    "questions": [
      "Ceritakan pengalaman kamu dalam mengatur atau membantu sebuah event",
      "Apa motivasi kamu mendaftar sub divisi event ceremonial?",
      "Menurut kamu, apa hal paling penting dari kompetisi basket? jelaskan!",
      "Menurutmu, mengapa opening dan closing ceremonial penting dalam sebuah kompetisi basket?",
      "Menurut Anda, apa peran dan tanggung jawab utama Divisi Ceremonial dalam sebuah kompetisi basket?",
      "Apakah kamu memahami aturan umum bola basket seperti foul, traveling, double dribble, shot clock, dan sebagainya?"
    ],
    "cases": [
      "Jika terdapat pemain yang tiba-tiba mengundurkan diri dari rangkaian acara simbolis, apa tindakan yang akan kamu lakukan?",
      "Pada saat awarding, terjadi kesalahan dalam penyebutan juara. Bagaimana cara kamu menangani situasi tersebut agar acara tetap kondusif?"
    ]
  },
  "Competition": {
    "questions": [
      "Ceritakan pengalaman kamu dalam mengatur atau membantu sebuah event",
      "Apa motivasi kamu mendaftar ke sub divisi event competition?",
      "Apakah kamu memahami aturan umum bola basket seperti foul, traveling, double dribble, shot clock, dan sebagainya? Jika ya, jelaskan secara singkat yang kamu ketahui.",
      "Sejauh mana pemahaman kamu mengenai perangkat dan teknis pertandingan basket, seperti scoresheet, scoreboard, shot clock, timer pertandingan, serta alur koordinasi dengan wasit dan petugas meja? Jelaskan yang kamu ketahui, kemudian ceritakan apakah kamu memiliki pengalaman terkait hal tersebut.",
      "Sejauh mana pemahaman kamu mengenai statistik dalam pertandingan basket dan alur pencatatan statistik selama pertandingan berlangsung? Jelaskan yang kamu ketahui, kemudian ceritakan apakah kamu memiliki pengalaman terkait hal tersebut."
    ],
    "cases": [
      "Usai pertandingan berakhir, panitia mendapat informasi bahwa dua kelompok suporter berencana melakukan tawuran di lokasi lain setelah meninggalkan venue. Mereka beralasan bahwa masalah tersebut merupakan urusan pribadi dan tidak lagi berkaitan dengan event. Namun jika terjadi insiden, besar kemungkinan nama kompetisi akan dikaitkan dengan kejadian tersebut. Sebagai panitia, apa yang akan kamu lakukan setelah menerima informasi tersebut?",
      "Beberapa hari sebelum pertandingan, salah satu tim mengajukan permohonan perubahan jadwal ke hari lain karena sebagian besar pemainnya harus mengikuti kegiatan akademik wajib dari ITS sehingga jumlah pemain yang tersedia tidak memenuhi batas minimal pertandingan. Secara teknis, permintaan tersebut memenuhi syarat pergantian jadwal. Namun, pertandingan tersebut menentukan jalannya bracket dan hasilnya dibutuhkan untuk pelaksanaan pertandingan di hari berikutnya. Sebagai panitia, bagaimana kamu akan menyikapi permintaan tersebut dan apa saja pertimbangan yang akan kamu gunakan dalam mengambil keputusan?"
    ]
  },
  "Damen": {
    "questions": [
      "Apa yang kamu ketahui tentang divisi Data Management di IBL 2K26?",
      "Apa saja tugas Data Management di IBL 2K26 yang kamu ketahui? Sebutkan!",
      "Mengapa kamu memilih divisi Data Management? jelaskan alasannya!",
      "Apa motivasi kamu mendaftar di divisi Data Management IBL 2026? Menurutmu, kontribusi apa yang bisa kamu berikan di divisi Data Management IBL 2026?",
      "Jika diterima di divisi Data Management, komitmen apa yang akan kamu give untuk mendukung keberhasilan IBL 2K26?",
      "Menurutmu, apa tantangan terbesar yang mungkin dihadapi oleh divisi Data Management selama berlangsungnya IBL 2K26?",
      "Inovasi apa yang bisa kamu give apa bila kamu diterima pada divisi Data Management IBL 2026?",
      "Seberapa exicted kamu untuk masuk ke divisi Data Management (kasih opsi skala 1-5)"
    ],
    "cases": [
      "H-1 pertandingan, ditemukan beberapa data peserta yang terduplikasi dan terdapat data yang belum lengkap, sementara divisi Event membutuhkan data tersebut untuk menyusun jadwal pertandingan. Apa yang akan kamu lakukan?",
      "Kamu mendapat jadwal jaga registrasi pada hari pertandingan bersama 1 staff lainnya. Namun, saat hari-H salah satu staff yang bertugas tidak dapat hadir dan sulit dihubungi. Sementara proses registrasi pemain, coach, assistant coach, dan official harus tetap berjalan lancar. Apa yang akan kamu lakukan?"
    ]
  }
};

/**
 * Handle incoming POST requests from the client.
 */
function doPost(e) {
  var output;
  try {
    // Parse input
    var postData = JSON.parse(e.postData.contents);
    
    var nama = postData.nama || "Pendaftar";
    var nim = postData.nim || "0000000000";
    var whatsapp = postData.whatsapp || "";
    var lineId = postData.lineId || "";
    var departemen = postData.departemen || "";
    var angkatan = postData.angkatan || "";
    var subdivisi1 = postData.subdivisi1 || "";
    var subdivisi2 = postData.subdivisi2 || "";
    
    var answers1 = postData.answers1 || [];
    var answers2 = postData.answers2 || [];
    var filesData = postData.files || {};
    
    // 1. Process files in Google Drive
    // Get parent folder
    var parentFolder;
    if (PARENT_FOLDER_ID) {
      parentFolder = DriveApp.getFolderById(PARENT_FOLDER_ID);
    } else {
      var folders = DriveApp.getFoldersByName("IBL 2K26 Oprec - Pendaftar");
      if (folders.hasNext()) {
        parentFolder = folders.next();
      } else {
        parentFolder = DriveApp.createFolder("IBL 2K26 Oprec - Pendaftar");
      }
    }
    
    var fileUrls = {};
    var divisions = [];
    if (subdivisi1) divisions.push({ name: subdivisi1, answers: answers1 });
    if (subdivisi2 && subdivisi2 !== subdivisi1) divisions.push({ name: subdivisi2, answers: answers2 });
    
    // Upload files for each chosen division
    // If they apply for two divisions, we put folders under both divisions.
    // To save script execution time, we can save file Blobs created once.
    var uploadedFiles = {}; // key: fileKey (e.g. cv), value: fileUrl
    
    for (var i = 0; i < divisions.length; i++) {
      var divName = divisions[i].name;
      
      // Get or create subdivision folder
      var divFolder = getOrCreateSubFolder(parentFolder, divName);
      // Get or create pendaftar folder inside subdivision folder
      var candidateFolderName = nama + " - " + nim;
      var candidateFolder = getOrCreateSubFolder(divFolder, candidateFolderName);
      
      var divFileUrls = {};
      
      // Save each file inside the candidate folder
      var fileKeys = ["cv", "ktm", "twibbon", "buktiFollow", "portofolio"];
      for (var f = 0; f < fileKeys.length; f++) {
        var key = fileKeys[f];
        var fileData = filesData[key];
        
        if (fileData && fileData.base64 && fileData.name) {
          try {
            var decodedData = Utilities.base64Decode(fileData.base64);
            var blob = Utilities.newBlob(decodedData, fileData.mimeType || "application/octet-stream", fileData.name);
            var newFile = candidateFolder.createFile(blob);
            divFileUrls[key] = newFile.getUrl();
          } catch (fileErr) {
            divFileUrls[key] = "Error uploading file: " + fileErr.message;
          }
        } else {
          divFileUrls[key] = "Not uploaded";
        }
      }
      
      uploadedFiles[divName] = divFileUrls;
    }
    
    // 2. Process Spreadsheet response logging
    var ss;
    if (SPREADSHEET_ID) {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } else {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }
    
    var timestamp = new Date();
    
    // Log submission to spreadsheet for each chosen division
    for (var i = 0; i < divisions.length; i++) {
      var divName = divisions[i].name;
      var answers = divisions[i].answers;
      var currentDivFileUrls = uploadedFiles[divName] || {};
      
      // Get or create division tab
      var sheet = ss.getSheetByName(divName);
      if (!sheet) {
        sheet = ss.insertSheet(divName);
      }
      
      // Get current headers
      var headers = [];
      if (sheet.getLastColumn() > 0) {
        headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      }
      
      // If sheet is new or empty, initialize baseline headers
      if (headers.length === 0) {
        headers = [
          "Timestamp", "Nama Lengkap", "NIM", "Departemen", "Angkatan", 
          "No WhatsApp", "ID Line", "Pilihan Subdivisi 1", "Pilihan Subdivisi 2"
        ];
        
        // Add question columns for this division from database
        var dbData = DIVISION_DATA[divName];
        if (dbData) {
          var questions = dbData.questions || [];
          for (var q = 0; q < questions.length; q++) {
            headers.push("Divisi Q: " + questions[q]);
          }
          var cases = dbData.cases || [];
          for (var c = 0; c < cases.length; c++) {
            headers.push("Study Case: " + cases[c]);
          }
        }
        
        // Add file links columns
        headers.push("Link CV", "Link KTM", "Link Twibbon", "Link Bukti Follow", "Link Portofolio");
        
        // Write headers to sheet
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        sheet.setFrozenRows(1);
      }
      
      // Map candidate values to header columns
      var newRowValues = new Array(headers.length);
      for (var col = 0; col < headers.length; col++) {
        newRowValues[col] = ""; // default empty
      }
      
      // Helper function to find or append a header
      function getHeaderColIndex(headerName) {
        var idx = headers.indexOf(headerName);
        if (idx !== -1) return idx;
        
        // If header not found in existing headers list, append it dynamically
        headers.push(headerName);
        sheet.getRange(1, headers.length).setValue(headerName);
        // Expand the row values array length to fit new column
        newRowValues.push("");
        return headers.length - 1;
      }
      
      // Map baseline details
      newRowValues[getHeaderColIndex("Timestamp")] = timestamp;
      newRowValues[getHeaderColIndex("Nama Lengkap")] = nama;
      newRowValues[getHeaderColIndex("NIM")] = nim;
      newRowValues[getHeaderColIndex("Departemen")] = departemen;
      newRowValues[getHeaderColIndex("Angkatan")] = angkatan;
      newRowValues[getHeaderColIndex("No WhatsApp")] = whatsapp;
      newRowValues[getHeaderColIndex("ID Line")] = lineId;
      newRowValues[getHeaderColIndex("Pilihan Subdivisi 1")] = subdivisi1;
      newRowValues[getHeaderColIndex("Pilihan Subdivisi 2")] = subdivisi2;
      
      // Map candidates answers by matching question text or index
      for (var a = 0; a < answers.length; a++) {
        var item = answers[a];
        if (item && item.question) {
          var prefix = item.isStudyCase ? "Study Case: " : "Divisi Q: ";
          var colIdx = getHeaderColIndex(prefix + item.question);
          newRowValues[colIdx] = item.answer;
        }
      }
      
      // Map file links
      newRowValues[getHeaderColIndex("Link CV")] = currentDivFileUrls["cv"] || "";
      newRowValues[getHeaderColIndex("Link KTM")] = currentDivFileUrls["ktm"] || "";
      newRowValues[getHeaderColIndex("Link Twibbon")] = currentDivFileUrls["twibbon"] || "";
      newRowValues[getHeaderColIndex("Link Bukti Follow")] = currentDivFileUrls["buktiFollow"] || "";
      newRowValues[getHeaderColIndex("Link Portofolio")] = currentDivFileUrls["portofolio"] || "";
      
      // Append the mapped row to sheet
      sheet.appendRow(newRowValues);
    }

    // 3. Catat ringkasan ke sheet master "Semua Form" (satu baris per pendaftar, lintas divisi).
    // Link berkas diambil dari folder subdivisi pertama (file yang diupload identik di tiap divisi).
    var masterFileUrls = (divisions.length > 0 && uploadedFiles[divisions[0].name]) ? uploadedFiles[divisions[0].name] : {};
    logToMasterSheet(ss, timestamp, nama, nim, departemen, angkatan, whatsapp, lineId, subdivisi1, subdivisi2, masterFileUrls);

    // 4. Backup data pendaftar ke file CSV di folder Drive backup (best-effort).
    backupToCsv({
      "Timestamp": timestamp,
      "Nama Lengkap": nama,
      "NIM": nim,
      "Departemen": departemen,
      "Angkatan": angkatan,
      "No WhatsApp": whatsapp,
      "ID Line": lineId,
      "Pilihan Subdivisi 1": subdivisi1,
      "Pilihan Subdivisi 2": subdivisi2,
      "answers1": answers1,
      "answers2": answers2,
      "Link CV": masterFileUrls["cv"] || "",
      "Link KTM": masterFileUrls["ktm"] || "",
      "Link Twibbon": masterFileUrls["twibbon"] || "",
      "Link Bukti Follow": masterFileUrls["buktiFollow"] || "",
      "Link Portofolio": masterFileUrls["portofolio"] || ""
    });

    var responseObj = {
      status: "success",
      message: "Pendaftaran berhasil dicatat dan berkas diunggah.",
      fileUrls: uploadedFiles
    };
    
    output = ContentService.createTextOutput(JSON.stringify(responseObj))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    var errResponse = {
      status: "error",
      message: "Terjadi kesalahan backend: " + err.message
    };
    output = ContentService.createTextOutput(JSON.stringify(errResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  return output;
}

/**
 * Helper function to find or create a subdirectory inside a folder.
 */
function getOrCreateSubFolder(parentFolder, folderName) {
  var folders = parentFolder.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    return parentFolder.createFolder(folderName);
  }
}

/**
 * Catat satu baris ringkasan pendaftar ke sheet master "Semua Form"
 * (menampung seluruh pendaftar lintas divisi). Sheet dibuat otomatis bila belum ada.
 */
function logToMasterSheet(ss, timestamp, nama, nim, departemen, angkatan, whatsapp, lineId, subdivisi1, subdivisi2, fileUrls) {
  var sheetName = "Semua Form";
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  var headers = [
    "Timestamp", "Nama Lengkap", "NIM", "Departemen", "Angkatan",
    "No WhatsApp", "ID Line", "Pilihan Subdivisi 1", "Pilihan Subdivisi 2",
    "Link CV", "Link KTM", "Link Twibbon", "Link Bukti Follow", "Link Portofolio"
  ];

  if (sheet.getLastColumn() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }

  var row = [
    timestamp, nama, nim, departemen, angkatan,
    whatsapp, lineId, subdivisi1, subdivisi2,
    fileUrls["cv"] || "", fileUrls["ktm"] || "", fileUrls["twibbon"] || "",
    fileUrls["buktiFollow"] || "", fileUrls["portofolio"] || ""
  ];
  sheet.appendRow(row);
}

/**
 * Backup data pendaftar ke file CSV di folder Drive backup (best-effort).
 * File dibuat otomatis pada submit pertama. Kegagalan backup TIDAK membatalkan
 * submit utama (penyimpanan Drive + Spreadsheet tetap sukses).
 *
 * Skema CSV = baseline + SELURUH pertanyaan semua divisi + link berkas, agar
 * seluruh aktivitas tercatat. Jawaban divisi yang tidak dipilih otomatis "-".
 */
function backupToCsv(rowData) {
  try {
    if (!BACKUP_FOLDER_ID) return;
    var folder = DriveApp.getFolderById(BACKUP_FOLDER_ID);

    // Susun daftar kolom: baseline + seluruh pertanyaan tiap divisi + link berkas.
    var baselineHeaders = [
      "Timestamp", "Nama Lengkap", "NIM", "Departemen", "Angkatan",
      "No WhatsApp", "ID Line", "Pilihan Subdivisi 1", "Pilihan Subdivisi 2"
    ];
    var divisionHeaders = [];
    for (var divName in DIVISION_DATA) {
      var db = DIVISION_DATA[divName];
      var qs = db.questions || [];
      for (var q = 0; q < qs.length; q++) {
        divisionHeaders.push(divName + " | Divisi Q: " + qs[q]);
      }
      var cs = db.cases || [];
      for (var c = 0; c < cs.length; c++) {
        divisionHeaders.push(divName + " | Study Case: " + cs[c]);
      }
    }
    var fileHeaders = ["Link CV", "Link KTM", "Link Twibbon", "Link Bukti Follow", "Link Portofolio"];
    var headers = baselineHeaders.concat(divisionHeaders).concat(fileHeaders);

    // Peta nilai: default "-" untuk kolom yang tidak diisi.
    var valueMap = {};
    for (var i = 0; i < headers.length; i++) valueMap[headers[i]] = "-";

    // Nilai baseline
    valueMap["Timestamp"] = rowData["Timestamp"];
    valueMap["Nama Lengkap"] = rowData["Nama Lengkap"];
    valueMap["NIM"] = rowData["NIM"];
    valueMap["Departemen"] = rowData["Departemen"];
    valueMap["Angkatan"] = rowData["Angkatan"];
    valueMap["No WhatsApp"] = rowData["No WhatsApp"];
    valueMap["ID Line"] = rowData["ID Line"];
    valueMap["Pilihan Subdivisi 1"] = rowData["Pilihan Subdivisi 1"];
    valueMap["Pilihan Subdivisi 2"] = rowData["Pilihan Subdivisi 2"];

    // Isi jawaban subdivisi 1 & 2 ke kolom divisi terkait
    fillAnswerColumns(valueMap, rowData["Pilihan Subdivisi 1"], rowData["answers1"] || []);
    fillAnswerColumns(valueMap, rowData["Pilihan Subdivisi 2"], rowData["answers2"] || []);

    // Link berkas
    valueMap["Link CV"] = rowData["Link CV"];
    valueMap["Link KTM"] = rowData["Link KTM"];
    valueMap["Link Twibbon"] = rowData["Link Twibbon"];
    valueMap["Link Bukti Follow"] = rowData["Link Bukti Follow"];
    valueMap["Link Portofolio"] = rowData["Link Portofolio"];

    // Susun baris CSV sesuai urutan header
    var line = headers.map(function (h) { return csvEscape(valueMap[h]); }).join(",") + "\n";

    var existing = folder.getFilesByName(BACKUP_CSV_NAME);
    if (existing.hasNext()) {
      var csvFile = existing.next();
      var prev = csvFile.getBlob().getDataAsString();
      csvFile.setContent(prev + line);
    } else {
      var headerLine = headers.map(csvEscape).join(",") + "\n";
      // BOM di awal supaya Excel membaca UTF-8 dengan benar.
      folder.createFile(BACKUP_CSV_NAME, String.fromCharCode(0xFEFF) + headerLine + line, "text/csv");
    }
  } catch (err) {
    Logger.log("[backupToCsv] gagal: " + err.message);
  }
}

/**
 * Isi jawaban sebuah subdivisi ke kolom divisi terkait di valueMap.
 * Kolom divisi diberi prefix nama divisi untuk menghindari tabrakan pertanyaan
 * yang sama antar divisi.
 */
function fillAnswerColumns(valueMap, divName, answers) {
  if (!divName || divName === "Tidak Memilih") return;
  for (var a = 0; a < answers.length; a++) {
    var item = answers[a];
    if (item && item.question) {
      var prefix = item.isStudyCase ? (divName + " | Study Case: ") : (divName + " | Divisi Q: ");
      var col = prefix + item.question;
      if (valueMap.hasOwnProperty(col)) {
        valueMap[col] = item.answer || "-";
      }
    }
  }
}

/**
 * Escape nilai untuk format CSV: bungkus dengan kutip ganda bila mengandung
 * koma, kutip, atau baris baru; kutip ganda di dalam nilai digandakan.
 */
function csvEscape(value) {
  if (value === null || value === undefined) return "";
  var s = String(value);
  if (/[",\n\r]/.test(s)) {
    s = '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}
