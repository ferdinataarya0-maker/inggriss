export const STORAGE_KEYS = {
  LEARNED_VOCABULARY: 'el_learnedVocabulary',
  QUIZ_HISTORY: 'el_quizHistory',
  QUIZ_BEST_SCORE: 'el_quizBestScore',
  QUIZ_AVERAGE_SCORE: 'el_quizAverageScore',
  GRAMMAR_PROGRESS: 'el_grammarProgress',
  SENTENCE_PRACTICE_COUNT: 'el_sentencePracticeCount',
  DAILY_STREAK: 'el_dailyStreak',
  LAST_STUDY_DATE: 'el_lastStudyDate',
  DAILY_CHALLENGE_DATE: 'el_dailyChallengeDate',
  DAILY_CHALLENGE_COMPLETED: 'el_dailyChallengeCompleted',
};

export interface QuizResult {
  id: string;
  mode: string;
  score: number;
  total: number;
  accuracy: number;
  date: string;
}

export function getLearnedVocabulary(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEARNED_VOCABULARY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function setLearnedVocabulary(ids: string[]): void {
  localStorage.setItem(STORAGE_KEYS.LEARNED_VOCABULARY, JSON.stringify(ids));
}

export function toggleLearnedWord(id: string): string[] {
  const current = getLearnedVocabulary();
  const updated = current.includes(id)
    ? current.filter(x => x !== id)
    : [...current, id];
  setLearnedVocabulary(updated);
  return updated;
}

export function getQuizHistory(): QuizResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveQuizResult(result: QuizResult): void {
  const history = getQuizHistory();
  history.unshift(result);
  const trimmed = history.slice(0, 20);
  localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(trimmed));

  const best = getBestScore();
  if (result.accuracy > best) {
    localStorage.setItem(STORAGE_KEYS.QUIZ_BEST_SCORE, String(result.accuracy));
  }

  const allScores = trimmed.map(r => r.accuracy);
  const avg = Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length);
  localStorage.setItem(STORAGE_KEYS.QUIZ_AVERAGE_SCORE, String(avg));
}

export function getBestScore(): number {
  return Number(localStorage.getItem(STORAGE_KEYS.QUIZ_BEST_SCORE) || 0);
}

export function getAverageScore(): number {
  return Number(localStorage.getItem(STORAGE_KEYS.QUIZ_AVERAGE_SCORE) || 0);
}

export function getGrammarProgress(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GRAMMAR_PROGRESS);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function markGrammarCompleted(topicId: string): void {
  const current = getGrammarProgress();
  if (!current.includes(topicId)) {
    localStorage.setItem(STORAGE_KEYS.GRAMMAR_PROGRESS, JSON.stringify([...current, topicId]));
  }
}

export function getSentencePracticeCount(): number {
  return Number(localStorage.getItem(STORAGE_KEYS.SENTENCE_PRACTICE_COUNT) || 0);
}

export function incrementSentencePractice(): void {
  const count = getSentencePracticeCount();
  localStorage.setItem(STORAGE_KEYS.SENTENCE_PRACTICE_COUNT, String(count + 1));
}

export function getDailyStreak(): number {
  return Number(localStorage.getItem(STORAGE_KEYS.DAILY_STREAK) || 0);
}

export function updateDailyStreak(): number {
  const today = new Date().toDateString();
  const last = localStorage.getItem(STORAGE_KEYS.LAST_STUDY_DATE);
  const streak = getDailyStreak();

  if (last === today) return streak;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const newStreak = last === yesterday.toDateString() ? streak + 1 : 1;

  localStorage.setItem(STORAGE_KEYS.DAILY_STREAK, String(newStreak));
  localStorage.setItem(STORAGE_KEYS.LAST_STUDY_DATE, today);
  return newStreak;
}

export function resetAllProgress(): void {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
}