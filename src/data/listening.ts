export interface ListeningItem {
  id: string;
  level: 'Pemula' | 'Menengah' | 'Mahir';
  sentence: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export const LISTENING_ITEMS: ListeningItem[] = [
  {
    id: 'l-01',
    level: 'Pemula',
    sentence: 'My name is Sarah and I am a student.',
    question: 'Apa arti kalimat yang kamu dengar?',
    options: ['Namaku Sarah dan aku seorang guru.', 'Namaku Sarah dan aku seorang siswa.', 'Namaku Sarah dan aku seorang dokter.', 'Namaku Sarah dan aku sedang belajar.'],
    correctIndex: 1,
  },
  {
    id: 'l-02',
    level: 'Pemula',
    sentence: 'I usually wake up at six in the morning.',
    question: 'Apa arti kalimat yang kamu dengar?',
    options: ['Saya biasanya tidur jam enam pagi.', 'Saya biasanya bangun jam enam pagi.', 'Saya biasanya makan jam enam pagi.', 'Saya biasanya pergi jam enam pagi.'],
    correctIndex: 1,
  },
  {
    id: 'l-03',
    level: 'Pemula',
    sentence: 'Can you close the window, please?',
    question: 'Apa yang diminta oleh pembicara?',
    options: ['Membuka jendela', 'Menutup jendela', 'Membersihkan jendela', 'Mengecat jendela'],
    correctIndex: 1,
  },
  {
    id: 'l-04',
    level: 'Pemula',
    sentence: 'This is my favorite restaurant in the city.',
    question: 'Apa arti kalimat yang kamu dengar?',
    options: ['Ini toko favoritku di kota ini.', 'Ini rumah favoritku di kota ini.', 'Ini restoran favoritku di kota ini.', 'Ini sekolah favoritku di kota ini.'],
    correctIndex: 2,
  },
  {
    id: 'l-05',
    level: 'Pemula',
    sentence: 'She is wearing a beautiful blue dress today.',
    question: 'Warna baju yang disebutkan adalah...',
    options: ['Merah', 'Hijau', 'Biru', 'Kuning'],
    correctIndex: 2,
  },
  {
    id: 'l-06',
    level: 'Menengah',
    sentence: 'The meeting has been postponed until next Friday.',
    question: 'Apa yang terjadi pada rapat itu?',
    options: ['Dibatalkan', 'Ditunda sampai Jumat depan', 'Dimajukan', 'Diperpanjang'],
    correctIndex: 1,
  },
  {
    id: 'l-07',
    level: 'Menengah',
    sentence: 'I have been living in this city for almost ten years.',
    question: 'Apa arti kalimat yang kamu dengar?',
    options: ['Saya akan tinggal di kota ini sepuluh tahun.', 'Saya sudah tinggal di kota ini hampir sepuluh tahun.', 'Saya baru tinggal di kota ini.', 'Saya pernah tinggal di kota ini sepuluh tahun lalu.'],
    correctIndex: 1,
  },
  {
    id: 'l-08',
    level: 'Menengah',
    sentence: 'Could you please explain that again? I did not quite understand.',
    question: 'Apa yang diminta oleh pembicara?',
    options: ['Meminta penjelasan ulang', 'Meminta bantuan pekerjaan', 'Meminta izin pulang', 'Meminta maaf'],
    correctIndex: 0,
  },
  {
    id: 'l-09',
    level: 'Menengah',
    sentence: 'The weather forecast says it will be sunny tomorrow.',
    question: 'Menurut ramalan cuaca, bagaimana kondisi besok?',
    options: ['Hujan', 'Berawan', 'Cerah', 'Berangin'],
    correctIndex: 2,
  },
  {
    id: 'l-10',
    level: 'Menengah',
    sentence: 'Our flight was delayed because of bad weather conditions.',
    question: 'Mengapa penerbangan tertunda?',
    options: ['Masalah mesin', 'Cuaca buruk', 'Bandara tutup', 'Tiket habis'],
    correctIndex: 1,
  },
  {
    id: 'l-11',
    level: 'Mahir',
    sentence: 'Despite facing several challenges, the team managed to complete the project on time.',
    question: 'Apa yang berhasil dilakukan tim tersebut?',
    options: ['Membatalkan proyek', 'Menyelesaikan proyek tepat waktu meski ada tantangan', 'Menunda proyek', 'Menambah anggota tim'],
    correctIndex: 1,
  },
  {
    id: 'l-12',
    level: 'Mahir',
    sentence: 'The company announced that it would be expanding its operations to three new countries next year.',
    question: 'Apa yang diumumkan oleh perusahaan?',
    options: ['Akan tutup tahun depan', 'Akan memperluas operasi ke tiga negara baru', 'Akan mengurangi karyawan', 'Akan pindah kantor pusat'],
    correctIndex: 1,
  },
  {
    id: 'l-13',
    level: 'Mahir',
    sentence: 'If I had known about the traffic, I would have left the house earlier.',
    question: 'Apa maksud kalimat ini?',
    options: ['Dia tahu ada macet dan berangkat lebih awal', 'Dia tidak tahu ada macet, jadi tidak berangkat lebih awal', 'Dia sengaja terlambat', 'Dia tidak jadi berangkat'],
    correctIndex: 1,
  },
  {
    id: 'l-14',
    level: 'Mahir',
    sentence: 'The research findings suggest that regular exercise significantly improves mental health.',
    question: 'Apa temuan penelitian yang disebutkan?',
    options: ['Olahraga tidak berpengaruh pada kesehatan', 'Olahraga teratur meningkatkan kesehatan mental secara signifikan', 'Olahraga hanya baik untuk fisik', 'Penelitian belum selesai'],
    correctIndex: 1,
  },
  {
    id: 'l-15',
    level: 'Mahir',
    sentence: 'Although the movie received mixed reviews, it became a huge success at the box office.',
    question: 'Bagaimana kesuksesan film itu di box office?',
    options: ['Gagal total', 'Sukses besar meski ulasan beragam', 'Hanya sukses di negara asalnya', 'Belum dirilis'],
    correctIndex: 1,
  },
];

export const TOTAL_LISTENING_ITEMS = LISTENING_ITEMS.length;
