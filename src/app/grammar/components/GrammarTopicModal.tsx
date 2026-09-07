'use client';
import React, { useState } from 'react';
import { X, BookOpenCheck, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { GrammarTopic } from '@/data/grammar';
import { markGrammarCompleted } from '@/lib/storage';

interface GrammarTopicModalProps {
  topic: GrammarTopic;
  isCompleted: boolean;
  onClose: () => void;
  onCompleted: () => void;
}

type ViewStage = 'explanation' | 'quiz' | 'result';

export default function GrammarTopicModal({ topic, isCompleted, onClose, onCompleted }: GrammarTopicModalProps) {
  const [stage, setStage] = useState<ViewStage>('explanation');
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const question = topic.quiz[qIndex];
  const isLast = qIndex === topic.quiz.length - 1;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === question.correctIndex) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (isLast) {
      const finalScore = score;
      if (finalScore / topic.quiz.length >= 0.6) {
        markGrammarCompleted(topic.id);
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

  const finalPct = Math.round((score / topic.quiz.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl w-full max-w-xl card-shadow-lg animate-bounce-in max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-foreground truncate">{topic.title}</h2>
              {isCompleted && (
                <span className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-success-bg text-success">
                  Selesai
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {stage === 'explanation' && 'Penjelasan materi'}
              {stage === 'quiz' && `Kuis ${qIndex + 1} / ${topic.quiz.length}`}
              {stage === 'result' && 'Hasil kuis'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-5">
          {stage === 'explanation' && (
            <>
              <div className="space-y-3">
                {topic.explanation.map((para, i) => (
                  <p key={`exp-${i}`} className="text-sm text-foreground leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Contoh Kalimat</p>
                <div className="space-y-2">
                  {topic.examples.map((ex, i) => (
                    <div key={`ex-${i}`} className="bg-muted/50 border border-border rounded-lg p-3">
                      <p className="text-sm font-medium text-foreground">{ex.en}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{ex.id}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {stage === 'quiz' && question && (
            <div className="space-y-4">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${((qIndex + 1) / topic.quiz.length) * 100}%` }}
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
                      key={`opt-${idx}`}
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
                {finalPct >= 60
                  ? <CheckCircle2 size={32} className="text-success" />
                  : <XCircle size={32} className="text-danger" />
                }
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{score} / {topic.quiz.length}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {finalPct >= 60
                    ? 'Bagus! Topik ini sudah kamu kuasai.'
                    : 'Skor minimal 60% untuk menandai topik selesai. Coba lagi, yuk!'
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex-shrink-0 flex items-center gap-3">
          {stage === 'explanation' && (
            <button
              onClick={() => setStage('quiz')}
              className="ml-auto flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
            >
              <BookOpenCheck size={16} />
              Mulai Kuis
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
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                  <RotateCcw size={16} />
                  Ulangi Kuis
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
