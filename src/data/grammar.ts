export interface GrammarExample {
  en: string;
  id: string;
}

export interface GrammarQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface GrammarTopic {
  id: string;
  title: string;
  level: 'Dasar' | 'Menengah' | 'Lanjut';
  summary: string;
  explanation: string[];
  examples: GrammarExample[];
  quiz: GrammarQuizQuestion[];
}

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'g-01',
    title: 'Simple Present Tense',
    level: 'Dasar',
    summary: 'Digunakan untuk kebiasaan, fakta umum, dan kejadian rutin.',
    explanation: [
      'Rumus: Subjek + Verb-1 (+s/es untuk he/she/it) untuk kalimat positif.',
      'Untuk kalimat negatif: Subjek + do/does + not + Verb-1.',
      'Untuk kalimat tanya: Do/Does + Subjek + Verb-1?',
      'Tense ini dipakai untuk kebiasaan sehari-hari, jadwal tetap, dan fakta yang selalu benar.',
    ],
    examples: [
      { en: 'She works at a hospital.', id: 'Dia bekerja di sebuah rumah sakit.' },
      { en: 'I do not drink coffee.', id: 'Saya tidak minum kopi.' },
      { en: 'Does he play football every Sunday?', id: 'Apakah dia bermain sepak bola setiap hari Minggu?' },
      { en: 'The sun rises in the east.', id: 'Matahari terbit di timur.' },
    ],
    quiz: [
      {
        question: 'She ___ to school every day.',
        options: ['go', 'goes', 'going', 'gone'],
        correctIndex: 1,
      },
      {
        question: 'Kalimat negatif yang benar untuk "They like tea" adalah...',
        options: ['They doesn\'t like tea.', 'They not like tea.', 'They don\'t like tea.', 'They isn\'t like tea.'],
        correctIndex: 2,
      },
      {
        question: 'Pilih kalimat tanya yang benar.',
        options: ['Does she plays piano?', 'Do she play piano?', 'Does she play piano?', 'Is she play piano?'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'g-02',
    title: 'Simple Past Tense',
    level: 'Dasar',
    summary: 'Digunakan untuk menceritakan kejadian yang sudah selesai di masa lalu.',
    explanation: [
      'Rumus: Subjek + Verb-2 (bentuk kedua, beraturan +ed atau tidak beraturan).',
      'Kalimat negatif: Subjek + did + not + Verb-1.',
      'Kalimat tanya: Did + Subjek + Verb-1?',
      'Biasanya disertai keterangan waktu seperti yesterday, last week, in 2020.',
    ],
    examples: [
      { en: 'I visited my grandmother last week.', id: 'Saya mengunjungi nenek saya minggu lalu.' },
      { en: 'She did not finish her homework.', id: 'Dia tidak menyelesaikan PR-nya.' },
      { en: 'Did you watch the movie yesterday?', id: 'Apakah kamu menonton film itu kemarin?' },
      { en: 'They went to Bali two years ago.', id: 'Mereka pergi ke Bali dua tahun lalu.' },
    ],
    quiz: [
      {
        question: 'Bentuk kedua (Verb-2) dari "go" adalah...',
        options: ['goed', 'went', 'gone', 'going'],
        correctIndex: 1,
      },
      {
        question: 'We ___ pizza last night.',
        options: ['eat', 'eats', 'ate', 'eaten'],
        correctIndex: 2,
      },
      {
        question: 'Kalimat tanya yang benar untuk "He called you"...',
        options: ['Did he call you?', 'Did he called you?', 'Does he call you?', 'Was he call you?'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'g-03',
    title: 'Simple Future Tense',
    level: 'Dasar',
    summary: 'Digunakan untuk menyatakan rencana atau prediksi di masa depan.',
    explanation: [
      'Rumus: Subjek + will + Verb-1, atau Subjek + be going to + Verb-1.',
      '"Will" sering dipakai untuk keputusan spontan atau prediksi.',
      '"Be going to" dipakai untuk rencana yang sudah dipikirkan sebelumnya.',
      'Kalimat negatif: will not (won\'t) / is not going to.',
    ],
    examples: [
      { en: 'I will call you tomorrow.', id: 'Saya akan meneleponmu besok.' },
      { en: 'She is going to study abroad next year.', id: 'Dia akan kuliah di luar negeri tahun depan.' },
      { en: 'It will rain this afternoon.', id: 'Akan turun hujan sore ini.' },
      { en: 'They are not going to attend the party.', id: 'Mereka tidak akan menghadiri pesta itu.' },
    ],
    quiz: [
      {
        question: 'Pilih kalimat yang menyatakan rencana yang sudah dipikirkan.',
        options: ['I will eat later.', 'I am going to visit Japan next month.', 'I eat now.', 'I ate yesterday.'],
        correctIndex: 1,
      },
      {
        question: 'Bentuk singkat dari "will not" adalah...',
        options: ['willn\'t', 'won\'t', 'wil\'nt', 'wouldn\'t'],
        correctIndex: 1,
      },
      {
        question: 'They ___ arrive at 9 PM.',
        options: ['will', 'are', 'did', 'was'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'g-04',
    title: 'Present Continuous Tense',
    level: 'Dasar',
    summary: 'Digunakan untuk kejadian yang sedang berlangsung saat ini.',
    explanation: [
      'Rumus: Subjek + is/am/are + Verb-ing.',
      'Dipakai untuk aksi yang sedang terjadi sekarang, atau rencana dekat di masa depan.',
      'Kalimat negatif: Subjek + is/am/are + not + Verb-ing.',
      'Kalimat tanya: Is/Am/Are + Subjek + Verb-ing?',
    ],
    examples: [
      { en: 'I am studying English right now.', id: 'Saya sedang belajar bahasa Inggris sekarang.' },
      { en: 'They are playing football in the park.', id: 'Mereka sedang bermain sepak bola di taman.' },
      { en: 'She is not sleeping yet.', id: 'Dia belum tidur.' },
      { en: 'Are you coming to the meeting?', id: 'Apakah kamu akan datang ke rapat?' },
    ],
    quiz: [
      {
        question: 'He ___ a book at the moment.',
        options: ['read', 'reads', 'is reading', 'was reading'],
        correctIndex: 2,
      },
      {
        question: 'Pilih kalimat Present Continuous yang benar.',
        options: ['She are cooking dinner.', 'She is cooking dinner.', 'She cooking dinner.', 'She cook dinner.'],
        correctIndex: 1,
      },
      {
        question: 'Kalimat tanya yang benar untuk "You are listening to music"...',
        options: ['Do you listening to music?', 'Are you listen to music?', 'Are you listening to music?', 'Is you listening to music?'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'g-05',
    title: 'Past Continuous Tense',
    level: 'Menengah',
    summary: 'Digunakan untuk kejadian yang sedang berlangsung di masa lalu.',
    explanation: [
      'Rumus: Subjek + was/were + Verb-ing.',
      'Sering dipakai untuk menggambarkan latar belakang kejadian lain di masa lalu.',
      'Contoh pola: "was/were + Verb-ing + when + Simple Past".',
      'Kalimat negatif: was/were + not + Verb-ing.',
    ],
    examples: [
      { en: 'I was watching TV when you called.', id: 'Saya sedang menonton TV ketika kamu menelepon.' },
      { en: 'They were sleeping at midnight.', id: 'Mereka sedang tidur pada tengah malam.' },
      { en: 'She was not listening to the teacher.', id: 'Dia tidak sedang mendengarkan gurunya.' },
      { en: 'What were you doing yesterday at 8 PM?', id: 'Apa yang sedang kamu lakukan kemarin jam 8 malam?' },
    ],
    quiz: [
      {
        question: 'I ___ dinner when the phone rang.',
        options: ['cook', 'cooked', 'was cooking', 'cooking'],
        correctIndex: 2,
      },
      {
        question: 'Pilih bentuk yang benar untuk subjek "they".',
        options: ['they was playing', 'they were playing', 'they is playing', 'they are play'],
        correctIndex: 1,
      },
      {
        question: 'Past Continuous biasa digunakan bersama kata sambung...',
        options: ['and', 'when', 'because', 'so'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'g-06',
    title: 'Present Perfect Tense',
    level: 'Menengah',
    summary: 'Menghubungkan kejadian masa lalu dengan keadaan sekarang.',
    explanation: [
      'Rumus: Subjek + has/have + Verb-3 (past participle).',
      'Dipakai untuk pengalaman, kejadian yang baru saja terjadi, atau yang masih berlangsung sampai sekarang.',
      'Sering dipakai dengan already, yet, just, ever, never, since, for.',
      'Kalimat negatif: has/have + not + Verb-3.',
    ],
    examples: [
      { en: 'I have visited Japan twice.', id: 'Saya sudah mengunjungi Jepang dua kali.' },
      { en: 'She has just finished her work.', id: 'Dia baru saja menyelesaikan pekerjaannya.' },
      { en: 'They have not arrived yet.', id: 'Mereka belum tiba.' },
      { en: 'Have you ever tried durian?', id: 'Apakah kamu pernah mencoba durian?' },
    ],
    quiz: [
      {
        question: 'She ___ already finished the report.',
        options: ['have', 'has', 'had', 'having'],
        correctIndex: 1,
      },
      {
        question: 'Bentuk ketiga (Verb-3) dari "eat" adalah...',
        options: ['ate', 'eaten', 'eating', 'eats'],
        correctIndex: 1,
      },
      {
        question: 'Kata yang sering menandai Present Perfect adalah...',
        options: ['yesterday', 'tomorrow', 'already', 'now'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'g-07',
    title: 'Articles: A, An, The',
    level: 'Dasar',
    summary: 'Kata sandang untuk menunjukkan kata benda tertentu atau umum.',
    explanation: [
      '"A" dipakai sebelum kata benda tunggal yang diawali bunyi konsonan (a cat, a book).',
      '"An" dipakai sebelum kata benda tunggal yang diawali bunyi vokal (an apple, an hour).',
      '"The" dipakai untuk kata benda yang sudah spesifik/diketahui kedua pihak.',
      'Kata benda jamak atau tak terhitung umumnya tidak memakai a/an.',
    ],
    examples: [
      { en: 'I saw a dog in the park.', id: 'Saya melihat seekor anjing di taman.' },
      { en: 'She is an honest person.', id: 'Dia orang yang jujur.' },
      { en: 'The book you gave me is amazing.', id: 'Buku yang kamu berikan padaku luar biasa.' },
      { en: 'Can you close the door, please?', id: 'Bisakah kamu menutup pintu itu?' },
    ],
    quiz: [
      {
        question: 'I need ___ umbrella; it\'s raining.',
        options: ['a', 'an', 'the', '(tanpa artikel)'],
        correctIndex: 1,
      },
      {
        question: 'Pilih artikel yang tepat: "___ Eiffel Tower is in Paris."',
        options: ['A', 'An', 'The', '(tanpa artikel)'],
        correctIndex: 2,
      },
      {
        question: 'She bought ___ new car last week.',
        options: ['a', 'an', 'the', 'this'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'g-08',
    title: 'Plural Nouns',
    level: 'Dasar',
    summary: 'Cara membentuk kata benda jamak dalam bahasa Inggris.',
    explanation: [
      'Umumnya tambahkan -s: book → books, car → cars.',
      'Kata yang berakhiran -s, -x, -ch, -sh ditambah -es: box → boxes, watch → watches.',
      'Kata berakhiran konsonan + y, ubah y menjadi i lalu tambah -es: city → cities.',
      'Ada juga bentuk jamak tidak beraturan: child → children, man → men, foot → feet.',
    ],
    examples: [
      { en: 'I have two cats and one dog.', id: 'Saya punya dua kucing dan satu anjing.' },
      { en: 'There are many boxes in the room.', id: 'Ada banyak kotak di ruangan itu.' },
      { en: 'The children are playing outside.', id: 'Anak-anak sedang bermain di luar.' },
      { en: 'She visited three cities last month.', id: 'Dia mengunjungi tiga kota bulan lalu.' },
    ],
    quiz: [
      {
        question: 'Bentuk jamak dari "child" adalah...',
        options: ['childs', 'childes', 'children', 'child'],
        correctIndex: 2,
      },
      {
        question: 'Bentuk jamak dari "city" adalah...',
        options: ['citys', 'cities', 'cityes', 'city'],
        correctIndex: 1,
      },
      {
        question: 'Bentuk jamak dari "watch" adalah...',
        options: ['watchs', 'watches', 'watchies', 'watch'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'g-09',
    title: 'Pronouns & Possessive Adjectives',
    level: 'Dasar',
    summary: 'Kata ganti orang dan kata kepemilikan.',
    explanation: [
      'Subject pronouns: I, you, he, she, it, we, they (di depan kata kerja).',
      'Object pronouns: me, you, him, her, it, us, them (setelah kata kerja/preposisi).',
      'Possessive adjectives: my, your, his, her, its, our, their (diikuti kata benda).',
      'Possessive pronouns: mine, yours, his, hers, ours, theirs (berdiri sendiri, tanpa kata benda setelahnya).',
    ],
    examples: [
      { en: 'She gave the book to him.', id: 'Dia memberikan buku itu kepadanya.' },
      { en: 'This is my bag, and that is yours.', id: 'Ini tasku, dan itu tasmu.' },
      { en: 'Their house is bigger than ours.', id: 'Rumah mereka lebih besar dari rumah kami.' },
      { en: 'I saw them at the mall yesterday.', id: 'Saya melihat mereka di mal kemarin.' },
    ],
    quiz: [
      {
        question: 'This bag is ___ , not yours.',
        options: ['I', 'me', 'mine', 'my'],
        correctIndex: 2,
      },
      {
        question: 'Can you help ___ with this problem?',
        options: ['I', 'me', 'my', 'mine'],
        correctIndex: 1,
      },
      {
        question: '___ car is parked outside.',
        options: ['He', 'Him', 'His', 'Himself'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'g-10',
    title: 'Comparative & Superlative Adjectives',
    level: 'Menengah',
    summary: 'Membandingkan dua hal atau lebih menggunakan kata sifat.',
    explanation: [
      'Comparative (lebih...): adjective + -er, atau more + adjective, diikuti "than".',
      'Superlative (paling...): the + adjective + -est, atau the most + adjective.',
      'Kata sifat pendek (1 suku kata) biasanya + -er/-est: tall → taller → tallest.',
      'Kata sifat panjang (2+ suku kata) pakai more/most: beautiful → more beautiful → most beautiful.',
    ],
    examples: [
      { en: 'This book is more interesting than that one.', id: 'Buku ini lebih menarik daripada yang itu.' },
      { en: 'She is the tallest student in class.', id: 'Dia siswa tertinggi di kelas.' },
      { en: 'My house is bigger than yours.', id: 'Rumahku lebih besar dari rumahmu.' },
      { en: 'This is the most beautiful place I have ever seen.', id: 'Ini tempat paling indah yang pernah saya lihat.' },
    ],
    quiz: [
      {
        question: 'Bentuk comparative dari "big" adalah...',
        options: ['bigger', 'more big', 'biggest', 'bigly'],
        correctIndex: 0,
      },
      {
        question: 'This is ___ movie of the year.',
        options: ['a good', 'better', 'the best', 'good'],
        correctIndex: 2,
      },
      {
        question: 'She is ___ than her sister.',
        options: ['more smart', 'smarter', 'smartest', 'the smartest'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'g-11',
    title: 'Modal Verbs',
    level: 'Menengah',
    summary: 'Kata kerja bantu seperti can, could, must, should, may.',
    explanation: [
      '"Can/Could" menyatakan kemampuan atau izin (could lebih sopan/formal).',
      '"Must" menyatakan keharusan yang kuat; "Should" menyatakan saran.',
      '"May/Might" menyatakan kemungkinan atau izin secara sopan.',
      'Setelah modal verb, kata kerja selalu dalam bentuk dasar (Verb-1), tanpa "to".',
    ],
    examples: [
      { en: 'You must wear a helmet when riding a motorcycle.', id: 'Kamu harus memakai helm saat naik motor.' },
      { en: 'She can speak three languages.', id: 'Dia bisa berbicara tiga bahasa.' },
      { en: 'You should see a doctor.', id: 'Kamu sebaiknya menemui dokter.' },
      { en: 'It might rain later, so bring an umbrella.', id: 'Mungkin akan hujan nanti, jadi bawalah payung.' },
    ],
    quiz: [
      {
        question: 'You ___ smoke here; it\'s not allowed.',
        options: ['can', 'must not', 'should', 'may'],
        correctIndex: 1,
      },
      {
        question: 'Kata yang tepat untuk memberi saran adalah...',
        options: ['must', 'should', 'can', 'will'],
        correctIndex: 1,
      },
      {
        question: 'Setelah modal verb, kata kerja berbentuk...',
        options: ['Verb-1 (dasar)', 'Verb-ing', 'Verb-2', 'to + Verb'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'g-12',
    title: 'Prepositions of Time & Place',
    level: 'Menengah',
    summary: 'Kata depan untuk menunjukkan waktu dan tempat: in, on, at.',
    explanation: [
      '"At" untuk waktu spesifik (at 7 PM) dan titik tempat spesifik (at the door).',
      '"On" untuk hari dan tanggal (on Monday, on May 5th) dan permukaan (on the table).',
      '"In" untuk bulan, tahun, musim (in July, in 2024) dan ruang tertutup (in the room).',
      'Preposisi tempat lain: under, behind, between, in front of, next to.',
    ],
    examples: [
      { en: 'The meeting starts at 9 AM.', id: 'Rapat dimulai jam 9 pagi.' },
      { en: 'We will meet on Friday.', id: 'Kita akan bertemu hari Jumat.' },
      { en: 'She was born in 2001.', id: 'Dia lahir tahun 2001.' },
      { en: 'The cat is under the table.', id: 'Kucing itu di bawah meja.' },
    ],
    quiz: [
      {
        question: 'I will see you ___ Monday morning.',
        options: ['in', 'on', 'at', 'by'],
        correctIndex: 1,
      },
      {
        question: 'She works ___ night.',
        options: ['in', 'on', 'at', 'for'],
        correctIndex: 2,
      },
      {
        question: 'The book is ___ the table.',
        options: ['on', 'in', 'at', 'to'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'g-13',
    title: 'WH-Questions',
    level: 'Dasar',
    summary: 'Kata tanya what, where, when, who, why, how.',
    explanation: [
      '"What" untuk menanyakan benda/hal, "Where" untuk tempat, "When" untuk waktu.',
      '"Who" untuk orang, "Why" untuk alasan, "How" untuk cara/keadaan.',
      'Struktur umum: WH-word + auxiliary verb + subject + main verb?',
      'Contoh: What do you want? Where does she live?',
    ],
    examples: [
      { en: 'What is your name?', id: 'Siapa namamu?' },
      { en: 'Where do you live?', id: 'Di mana kamu tinggal?' },
      { en: 'Why were you late today?', id: 'Kenapa kamu terlambat hari ini?' },
      { en: 'How does this machine work?', id: 'Bagaimana cara kerja mesin ini?' },
    ],
    quiz: [
      {
        question: '___ is the meeting? — It\'s tomorrow.',
        options: ['What', 'When', 'Who', 'Why'],
        correctIndex: 1,
      },
      {
        question: '___ did you buy this shirt? — At the mall.',
        options: ['When', 'Who', 'Where', 'Why'],
        correctIndex: 2,
      },
      {
        question: '___ is that man over there? — He is my teacher.',
        options: ['What', 'Who', 'How', 'When'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'g-14',
    title: 'Conjunctions',
    level: 'Dasar',
    summary: 'Kata sambung: and, but, or, because, so.',
    explanation: [
      '"And" menggabungkan dua hal yang sejalan.',
      '"But" menunjukkan pertentangan/perbedaan.',
      '"Or" menunjukkan pilihan.',
      '"Because" menjelaskan alasan, sedangkan "so" menjelaskan akibat.',
    ],
    examples: [
      { en: 'I like tea and coffee.', id: 'Saya suka teh dan kopi.' },
      { en: 'She is smart but lazy.', id: 'Dia pintar tapi malas.' },
      { en: 'Do you want tea or coffee?', id: 'Kamu mau teh atau kopi?' },
      { en: 'I was tired, so I went to bed early.', id: 'Saya lelah, jadi saya tidur lebih awal.' },
    ],
    quiz: [
      {
        question: 'I wanted to go out, ___ it was raining.',
        options: ['and', 'but', 'or', 'because'],
        correctIndex: 1,
      },
      {
        question: 'She failed the test ___ she didn\'t study.',
        options: ['because', 'but', 'or', 'and'],
        correctIndex: 0,
      },
      {
        question: 'Kata sambung untuk menunjukkan pilihan adalah...',
        options: ['and', 'or', 'because', 'so'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'g-15',
    title: 'Passive Voice (Dasar)',
    level: 'Lanjut',
    summary: 'Kalimat pasif menekankan objek/penerima aksi, bukan pelakunya.',
    explanation: [
      'Rumus: Subjek (objek asli) + to be + Verb-3 (+ by + pelaku, opsional).',
      'Kalimat aktif "The chef cooks the food" menjadi "The food is cooked (by the chef)".',
      'Bentuk "to be" menyesuaikan tense: is/are (present), was/were (past), will be (future).',
      'Passive voice sering dipakai saat pelaku tidak penting atau tidak diketahui.',
    ],
    examples: [
      { en: 'The letter was written by her.', id: 'Surat itu ditulis olehnya.' },
      { en: 'This song is sung by many artists.', id: 'Lagu ini dinyanyikan oleh banyak artis.' },
      { en: 'The house will be built next year.', id: 'Rumah itu akan dibangun tahun depan.' },
      { en: 'The windows were cleaned yesterday.', id: 'Jendela-jendela itu dibersihkan kemarin.' },
    ],
    quiz: [
      {
        question: 'Ubah ke pasif: "They build houses."',
        options: ['Houses build them.', 'Houses are built by them.', 'Houses was built by them.', 'Houses building by them.'],
        correctIndex: 1,
      },
      {
        question: 'The cake ___ by my mother.',
        options: ['make', 'made', 'was made', 'is making'],
        correctIndex: 2,
      },
      {
        question: 'Passive voice menekankan pada...',
        options: ['Pelaku aksi', 'Objek/penerima aksi', 'Waktu kejadian', 'Tempat kejadian'],
        correctIndex: 1,
      },
    ],
  },
];

export const TOTAL_GRAMMAR_TOPICS = GRAMMAR_TOPICS.length;
