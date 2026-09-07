'use client';
import React, { useState } from 'react';
import { X, Volume2, HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { ReadingArticle } from '@/data/reading';
import { markReadingCompleted } from '@/lib/storage';

interface ReadingArticleModalProps {
  article: ReadingArticle;
  isCompleted: boolean;
  onClose: () => void;
  onCompleted: () => void;
}

type ViewStage = 'reading' | 'quiz' | 'result';

export default function ReadingArticleModal({ article, isCompleted, onClose, onCompleted }: ReadingArticleModalProps) {
  const [stage, setStage] = useState<ViewStage>('reading');
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  const question = article.questions[qIndex];
  const isLast = qIndex === article.questions.length - 1;

  const handleReadAloud = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(article.paragraphs.join(' '));
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === question.correctIndex) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (isLast) {
      if (score / article.questions.length >= 0.6) {
        markReadingCompleted(article.id);
        onCompleted();
      }
      setStage('result');
      return;
    }
    setQIndex(i => i + 1);
    setSelected(null);
  };

  const handleRetry = () => {
    setStage('quiz');
    setQIndex(0);
    setSelected(null);
    setScore(0);
  };

  const finalPct = Math.round((score / article.questions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl w-full max-w-2xl card-shadow-lg animate-bounce-in max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-foreground truncate">{article.title}</h2>
              {isCompleted && (
                <span className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-success-bg text-success">
                  Selesai
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {stage === 'reading' && article.topic}
              {stage === 'quiz' && `Pertanyaan ${qIndex + 1} / ${article.questions.length}`}
              {stage === 'result' && 'Hasil kuis pemahaman'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all flex-shrink-0">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-5">
          {stage === 'reading' && (
            <>
              <button
                onClick={handleReadAloud}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${speaking ? 'bg-primary/80 text-white animate-pulse' : 'bg-primary/10 text-primary hover:bg-primary/20'}
                `}
              >
                <Volume2 size={16} />
                {speaking ? 'Sedang dibacakan...' : 'Dengarkan artikel'}
              </button>
              <div className="space-y-3 bg-muted/40 border border-border rounded-xl p-5">
                {article.paragraphs.map((para, i) => (
                  <p key={`para-${i}`} className="text-sm text-foreground leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </>
          )}

          {stage === 'quiz' && question && (
            <div className="space-y-4">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${((qIndex + 1) / article.questions.length) * 100}%` }}
                />
              </div>
              <p className="text-base font-semibold text-foreground">{question.question}</p>
              <div className="space-y-2">
                {question.options.map((opt, idx) => {
                  const isCorrect = idx === question.correctIndex;
                  const isSelected = idx === selected;
                  let stateClass = 'border-border hover:bg-muted';
                  if (selected !== null) {
                    if (isCorrect) stateClass = 'border-success bg-success-bg';
                    else if (isSelected) stateClass = 'border-danger bg-danger-bg';
                    else stateClass = 'border-border opacity-60';
                  }
                  return (
                    <button
                      key={`rq-opt-${idx}`}
                      onClick={() => handleSelect(idx)}
                      disabled={selected !== null}
                      className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-between ${stateClass}`}
                    >
                      <span className="text-foreground">{opt}</span>
                      {selected !== null && isCorrect && <CheckCircle2 size={16} className="text-success flex-shrink-0" />}
                      {selected !== null && isSelected && !isCorrect && <XCircle size={16} className="text-danger flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {stage === 'result' && (
            <div className="flex flex-col items-center text-center py-6 gap-3">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${finalPct >= 60 ? 'bg-success-bg' : 'bg-danger-bg'}`}>
                {finalPct >= 60 ? <CheckCircle2 size={32} className="text-success" /> : <XCircle size={32} className="text-danger" />}
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{score} / {article.questions.length}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {finalPct >= 60
                    ? 'Bagus! Pemahaman bacaanmu sudah baik.'
                    : 'Skor minimal 60% untuk menandai artikel selesai. Baca ulang lalu coba lagi, yuk!'
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-border flex-shrink-0 flex items-center gap-3">
          {stage === 'reading' && (
            <button
              onClick={() => setStage('quiz')}
              className="ml-auto flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
            >
              <HelpCircle size={16} />
              Uji Pemahaman
            </button>
          )}
          {stage === 'quiz' && (
            <button
              onClick={handleNext}
              disabled={selected === null}
              className="ml-auto flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLast ? 'Selesai' : 'Lanjut'}
              <ArrowRight size={16} />
            </button>
          )}
          {stage === 'result' && (
            <>
              {finalPct < 60 && (
                <button
                  onClick={() => setStage('reading')}
                  className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                  <RotateCcw size={16} />
                  Baca Ulang
                </button>
              )}
              <button
                onClick={onClose}
                className="ml-auto px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
              >
                Tutup
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
