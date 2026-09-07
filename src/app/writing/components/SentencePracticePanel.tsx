'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb, RotateCcw } from 'lucide-react';
import { SENTENCE_PRACTICE, TOTAL_SENTENCE_PRACTICE, normalizeAnswer } from '@/data/writing';
import { getSentencePracticeCount, incrementSentencePractice } from '@/lib/storage';

const LEVELS = ['Semua', 'Pemula', 'Menengah', 'Mahir'];

const levelColors: Record<string, string> = {
  Pemula: 'bg-blue-50 text-blue-600',
  Menengah: 'bg-amber-50 text-amber-600',
  Mahir: 'bg-purple-50 text-purple-600',
};

export default function SentencePracticePanel() {
  const [activeLevel, setActiveLevel] = useState('Semua');
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [practiceCount, setPracticeCount] = useState(0);

  useEffect(() => {
    setPracticeCount(getSentencePracticeCount());
  }, []);

  const items = SENTENCE_PRACTICE.filter(it => activeLevel === 'Semua' || it.level === activeLevel);
  const current = items[index] ?? items[0];

  useEffect(() => {
    setIndex(0);
    setAnswer('');
    setChecked(false);
    setShowHint(false);
  }, [activeLevel]);

  if (!current) return null;

  const handleCheck = () => {
    if (!answer.trim()) return;
    const normalized = normalizeAnswer(answer);
    const correct = current.acceptedAnswers.some(a => normalizeAnswer(a) === normalized);
    setIsCorrect(correct);
    setChecked(true);
    if (correct) {
      incrementSentencePractice();
      setPracticeCount(c => c + 1);
    }
  };

  const handleNext = () => {
    setIndex(i => Math.min(i + 1, items.length - 1));
    setAnswer('');
    setChecked(false);
    setShowHint(false);
  };

  const handleRetry = () => {
    setAnswer('');
    setChecked(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-xs text-muted-foreground">
          Total kalimat berhasil dijawab benar: <span className="font-semibold text-foreground">{practiceCount}</span>
        </p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {LEVELS.map(lvl => (
            <button
              key={`sp-lvl-${lvl}`}
              onClick={() => setActiveLevel(lvl)}
              className={`
                flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150
                ${activeLevel === lvl
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border card-shadow p-6 space-y-5">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[current.level]}`}>
            {current.level}
          </span>
          <span className="text-xs text-muted-foreground">Kalimat {index + 1} / {items.length}</span>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Terjemahkan ke Bahasa Inggris
          </p>
          <p className="text-lg font-semibold text-foreground">{current.indonesian}</p>
        </div>

        <div className="space-y-2">
          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            disabled={checked}
            placeholder="Ketik jawabanmu dalam Bahasa Inggris..."
            rows={2}
            className="w-full px-4 py-3 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-70 resize-none"
          />
          {current.hint && (
            <button
              onClick={() => setShowHint(h => !h)}
              className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
            >
              <Lightbulb size={13} /> {showHint ? 'Sembunyikan petunjuk' : 'Tampilkan petunjuk'}
            </button>
          )}
          {showHint && current.hint && (
            <p className="text-xs text-muted-foreground bg-muted/50 border border-border rounded-lg p-2">
              💡 {current.hint}
            </p>
          )}
        </div>

        {checked && (
          <div className={`flex items-start gap-3 p-4 rounded-xl border ${
            isCorrect ? 'bg-success-bg border-success/20 text-success' : 'bg-danger-bg border-danger/20 text-danger'
          }`}>
            {isCorrect ? <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" /> : <XCircle size={20} className="flex-shrink-0 mt-0.5" />}
            <div>
              <p className="font-semibold text-sm">{isCorrect ? 'Benar! 🎉' : 'Belum tepat'}</p>
              <p className="text-xs opacity-80 mt-0.5">
                Contoh jawaban: <span className="font-medium">{current.acceptedAnswers[0]}</span>
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          {checked && !isCorrect && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <RotateCcw size={16} />
              Coba Lagi
            </button>
          )}
          {!checked ? (
            <button
              onClick={handleCheck}
              disabled={!answer.trim()}
              className="ml-auto px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Cek Jawaban
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={index === items.length - 1}
              className="ml-auto flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Berikutnya
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
