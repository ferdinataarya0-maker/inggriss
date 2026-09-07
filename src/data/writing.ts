export interface SentencePractice {
  id: string;
  level: 'Pemula' | 'Menengah' | 'Mahir';
  indonesian: string;
  acceptedAnswers: string[];
  hint?: string;
}

export interface FreeWritingPrompt {
  id: string;
  level: 'Pemula' | 'Menengah' | 'Mahir';
  title: string;
  instruction: string;
  minWords: number;
  checklist: string[];
}

export const SENTENCE_PRACTICE: SentencePractice[] = [
  { id: 'w-01', level: 'Pemula', indonesian: 'Saya suka makan nasi goreng.', acceptedAnswers: ['i like eating fried rice', 'i like to eat fried rice'], hint: 'like + Verb-ing / to + Verb' },
  { id: 'w-02', level: 'Pemula', indonesian: 'Dia (perempuan) pergi ke sekolah setiap hari.', acceptedAnswers: ['she goes to school every day'], hint: 'she/he + Verb+s' },
  { id: 'w-03', level: 'Pemula', indonesian: 'Kami sedang belajar bahasa Inggris sekarang.', acceptedAnswers: ['we are learning english now', 'we are studying english now'], hint: 'are + Verb-ing' },
  { id: 'w-04', level: 'Pemula', indonesian: 'Ini adalah kucing saya.', acceptedAnswers: ['this is my cat'], hint: 'this is my ...' },
  { id: 'w-05', level: 'Pemula', indonesian: 'Apakah kamu suka kopi?', acceptedAnswers: ['do you like coffee'], hint: 'Do + you + like...?' },
  { id: 'w-06', level: 'Menengah', indonesian: 'Saya sudah tinggal di Jakarta selama lima tahun.', acceptedAnswers: ['i have lived in jakarta for five years', 'i have been living in jakarta for five years'], hint: 'have + Verb-3 + for...' },
  { id: 'w-07', level: 'Menengah', indonesian: 'Dia sedang memasak ketika saya tiba.', acceptedAnswers: ['she was cooking when i arrived'], hint: 'was/were + Verb-ing + when...' },
  { id: 'w-08', level: 'Menengah', indonesian: 'Kamu harus menyelesaikan pekerjaan ini sebelum jam lima.', acceptedAnswers: ['you must finish this work before five', 'you must finish this job before five o\'clock', 'you have to finish this work before five'], hint: 'must/have to + Verb-1' },
  { id: 'w-09', level: 'Menengah', indonesian: 'Buku ini lebih menarik daripada film itu.', acceptedAnswers: ['this book is more interesting than that movie', 'this book is more interesting than the movie'], hint: 'more + adjective + than' },
  { id: 'w-10', level: 'Menengah', indonesian: 'Kami akan pergi berlibur bulan depan.', acceptedAnswers: ['we will go on vacation next month', 'we are going on vacation next month', 'we are going to go on vacation next month'], hint: 'will / be going to' },
  { id: 'w-11', level: 'Mahir', indonesian: 'Jika saya punya lebih banyak waktu, saya akan belajar bahasa Prancis.', acceptedAnswers: ['if i had more time i would learn french', 'if i had more time, i would learn french'], hint: 'If + Past, would + Verb-1 (conditional type 2)' },
  { id: 'w-12', level: 'Mahir', indonesian: 'Laporan itu ditulis oleh tim pemasaran.', acceptedAnswers: ['the report was written by the marketing team'], hint: 'Passive: was/were + Verb-3' },
  { id: 'w-13', level: 'Mahir', indonesian: 'Meskipun hujan deras, mereka tetap pergi ke sekolah.', acceptedAnswers: ['although it rained heavily they still went to school', 'even though it was raining heavily, they still went to school'], hint: 'Although/Even though + clause' },
  { id: 'w-14', level: 'Mahir', indonesian: 'Semakin banyak kamu berlatih, semakin baik kemampuanmu.', acceptedAnswers: ['the more you practice the better your skill becomes', 'the more you practice, the better you become'], hint: 'The more..., the more/better...' },
  { id: 'w-15', level: 'Mahir', indonesian: 'Saya berharap saya sudah belajar lebih giat untuk ujian itu.', acceptedAnswers: ['i wish i had studied harder for that exam', 'i wish i had studied harder for the exam'], hint: 'I wish + past perfect' },
];

export const FREE_WRITING_PROMPTS: FreeWritingPrompt[] = [
  {
    id: 'fw-01',
    level: 'Pemula',
    title: 'Perkenalan Diri',
    instruction: 'Write a short paragraph introducing yourself: your name, age, where you live, and one hobby you enjoy.',
    minWords: 30,
    checklist: ['Menggunakan Simple Present Tense', 'Menyebutkan nama dan usia', 'Menyebutkan tempat tinggal', 'Menyebutkan satu hobi'],
  },
  {
    id: 'fw-02',
    level: 'Pemula',
    title: 'Kegiatan Kemarin',
    instruction: 'Write about what you did yesterday. Mention at least three activities in order.',
    minWords: 30,
    checklist: ['Menggunakan Simple Past Tense', 'Minimal 3 kegiatan berurutan', 'Menggunakan kata sambung seperti "then" atau "after that"'],
  },
  {
    id: 'fw-03',
    level: 'Menengah',
    title: 'Rencana Akhir Pekan',
    instruction: 'Describe your plans for next weekend. Explain what you are going to do and why.',
    minWords: 50,
    checklist: ['Menggunakan "will" atau "be going to"', 'Menjelaskan alasan rencana tersebut', 'Minimal 2 aktivitas berbeda'],
  },
  {
    id: 'fw-04',
    level: 'Menengah',
    title: 'Pengalaman Berkesan',
    instruction: 'Write about a memorable experience in your life. Describe what happened, where, and how you felt.',
    minWords: 60,
    checklist: ['Menceritakan kejadian dengan urutan yang jelas', 'Menyebutkan tempat dan waktu', 'Mengungkapkan perasaan dengan kata sifat yang tepat'],
  },
  {
    id: 'fw-05',
    level: 'Mahir',
    title: 'Opini tentang Teknologi',
    instruction: 'Write a short essay giving your opinion on whether social media has a positive or negative effect on society. Support your opinion with at least two reasons.',
    minWords: 100,
    checklist: ['Menyatakan opini secara jelas di awal', 'Memberikan minimal 2 alasan pendukung', 'Menggunakan kata penghubung seperti "however", "moreover", "therefore"', 'Menutup dengan kesimpulan singkat'],
  },
  {
    id: 'fw-06',
    level: 'Mahir',
    title: 'Memecahkan Masalah',
    instruction: 'Describe a problem your city or neighborhood faces and propose a possible solution.',
    minWords: 100,
    checklist: ['Menjelaskan masalah secara spesifik', 'Mengusulkan solusi yang masuk akal', 'Menggunakan kalimat kompleks (conditional atau passive voice)', 'Struktur paragraf jelas: pembuka, isi, penutup'],
  },
];

export const TOTAL_SENTENCE_PRACTICE = SENTENCE_PRACTICE.length;
export const TOTAL_FREE_WRITING_PROMPTS = FREE_WRITING_PROMPTS.length;

export function normalizeAnswer(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?']/g, '')
    .replace(/\s+/g, ' ');
}
