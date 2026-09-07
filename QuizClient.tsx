'use client';
import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Home,
  Sparkles,
  Target,
} from 'lucide-react';
import { VOCABULARY, CATEGORIES, VocabWord } from '@/data/vocabulary';
import { saveQuizResult } from '@/lib/storage';

type QuizStage = 'setup' | 'playing' | 'result';

interface QuizQuestion {
  word: VocabWord;
  options: string[];
  correctIndex: number;
}

const QUESTION_COUNTS = [5, 10, 15, 20];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQuestions(pool: VocabWord[], count: number): QuizQuestion[] {
  const chosenWords = shuffle(pool).slice(0, Math.min(count, pool.length));

  return chosenWords.map(word => {
    const distractorPool = VOCABULARY.filter(w => w.id !== word.id && w.meaning !== word.meaning);
    const distractors = shuffle(distractorPool).slice(0, 3).map(w => w.meaning);
    const options = shuffle([word.meaning, ...distractors]);
    const correctIndex = options.indexOf(word.meaning);
    return { word, options, correctIndex };
  });
}

export default function QuizClient() {
  const [stage, setStage] = useState<QuizStage>('setup');
  const [category, setCategory] = useState('Semua');
  const [questionCount, setQuestionCount] = useState(10);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [saved, setSaved] = useState(false);

  const categoryCounts: Record<string, number> = useMemo(() => {
    const counts: Record<string, number> = { Semua: VOCABULARY.length };
    VOCABULARY.forEach(w => {
      counts[w.category] = (counts[w.category] || 0) + 1;
    });
    return counts;
  }, []);

  const availableCount = categoryCounts[category] || 0;

  const handleStart = useCallback(() => {
    const pool = category === 'Semua' ? VOCABULARY : VOCABULARY.filter(w => w.category === category);
    const built = buildQuestions(pool, questionCount);
    setQuestions(built);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setSaved(false);
    setStage('playing');
  }, [category, questionCount]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (selectedOption !== null) return;
      setSelectedOption(optionIndex);
      if (optionIndex === currentQuestion.correctIndex) {
        setScore(s => s + 1);
      }
    },
    [selectedOption, currentQuestion]
  );

  const finishQuiz = useCallback(
    (finalScore: number) => {
      if (saved) return;
      const accuracy = Math.round((finalScore / questions.length) * 100);
      saveQuizResult({
        id: `quiz-${Date.now()}`,
        mode: category,
        score: finalScore,
        total: questions.length,
        accuracy,
        date: new Date().toISOString(),
      });
      setSaved(true);
    },
    [category, questions.length, saved]
  );

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      finishQuiz(score);
      setStage('result');
      return;
    }
    setCurrentIndex(i => i + 1);
    setSelectedOption(null);
  }, [isLastQuestion, finishQuiz, score]);

  const handleRestart = useCallback(() => {
    setStage('setup');
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setSaved(false);
  }, []);

  const accuracy = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  // ---------- SETUP ----------
  if (stage === 'setup') {
    return (
      <div className="p-6 xl:p-8 max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kuis Kosakata</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Uji pemahaman kosakatamu dengan kuis pilihan ganda.
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border card-shadow p-6 space-y-6">
          {/* Category */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Pilih Kategori</p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {CATEGORIES.map(cat => (
                <button
                  key={`quiz-cat-${cat}`}
                  onClick={() => setCategory(cat)}
                  className={`
                    flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150
                    ${category === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  {cat}
                  <span className="ml-1 opacity-60">({categoryCounts[cat] || 0})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question count */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Jumlah Soal</p>
            <div className="flex gap-2 flex-wrap">
              {QUESTION_COUNTS.map(count => (
                <button
                  key={`count-${count}`}
                  onClick={() => setQuestionCount(count)}
                  disabled={availableCount < 4}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed
                    ${questionCount === count
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  {count} Soal
                </button>
              ))}
            </div>
            {availableCount < 4 && (
              <p className="text-xs text-danger mt-2">
                Kategori ini punya kurang dari 4 kata, pilih kategori lain.
              </p>
            )}
          </div>

          <button
            onClick={handleStart}
            disabled={availableCount < 4}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed card-shadow"
          >
            <Sparkles size={16} />
            Mulai Kuis
          </button>
        </div>
      </div>
    );
  }

  // ---------- PLAYING ----------
  if (stage === 'playing' && currentQuestion) {
    return (
      <div className="p-6 xl:p-8 max-w-2xl mx-auto space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">
              Soal {currentIndex + 1} / {questions.length}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Target size={14} />
              Skor: {score}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-card rounded-xl border border-border card-shadow p-8 text-center space-y-2">
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
            {currentQuestion.word.category}
          </span>
          <p className="text-4xl font-bold text-foreground pt-2">{currentQuestion.word.word}</p>
          <p className="text-xs text-muted-foreground pt-1">Apa arti kata ini dalam Bahasa Indonesia?</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, idx) => {
            const isCorrectOption = idx === currentQuestion.correctIndex;
            const isSelected = idx === selectedOption;
            const showResult = selectedOption !== null;

            let stateClasses = 'bg-card border-border hover:bg-muted';
            if (showResult && isCorrectOption) {
              stateClasses = 'bg-success-bg border-success/30 text-success';
            } else if (showResult && isSelected && !isCorrectOption) {
              stateClasses = 'bg-danger-bg border-danger/30 text-danger';
            } else if (showResult) {
              stateClasses = 'bg-card border-border opacity-60';
            }

            return (
              <button
                key={`opt-${idx}`}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                className={`
                  flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl border text-sm font-medium
                  transition-all duration-150 text-left disabled:cursor-default
                  ${stateClasses}
                `}
              >
                <span>{option}</span>
                {showResult && isCorrectOption && <CheckCircle2 size={18} className="flex-shrink-0" />}
                {showResult && isSelected && !isCorrectOption && <XCircle size={18} className="flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {selectedOption !== null && (
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all card-shadow"
          >
            {isLastQuestion ? 'Lihat Hasil' : 'Soal Berikutnya'}
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    );
  }

  // ---------- RESULT ----------
  const isGoodScore = accuracy >= 70;

  return (
    <div className="p-6 xl:p-8 max-w-2xl mx-auto space-y-6">
      <div className="bg-card rounded-xl border border-border card-shadow p-8 text-center space-y-4">
        <div
          className={`
            w-16 h-16 rounded-full flex items-center justify-center mx-auto
            ${isGoodScore ? 'bg-green-50' : 'bg-amber-50'}
          `}
        >
          <Trophy size={28} className={isGoodScore ? 'text-success' : 'text-warning'} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">
            {isGoodScore ? 'Kerja Bagus! 🎉' : 'Terus Berlatih! 💪'}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Kamu menjawab benar {score} dari {questions.length} soal.
          </p>
        </div>
        <div className="text-5xl font-bold text-primary tabular-nums">{accuracy}%</div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Akurasi</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleRestart}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all card-shadow"
        >
          <RotateCcw size={16} />
          Kuis Baru
        </button>
        <Link
          href="/"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-card border border-border text-foreground rounded-lg text-sm font-semibold hover:bg-muted transition-all"
        >
          <Home size={16} />
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
