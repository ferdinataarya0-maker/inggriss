'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, Headphones, CheckCircle2, XCircle, ArrowRight, Eye, EyeOff, RotateCcw, Gauge } from 'lucide-react';
import { LISTENING_ITEMS, TOTAL_LISTENING_ITEMS } from '@/data/listening';
import { getListeningProgress, markListeningCompleted } from '@/lib/storage';

const LEVELS = ['Semua', 'Pemula', 'Menengah', 'Mahir'];

const levelColors: Record<string, string> = {
  Pemula: 'bg-blue-50 text-blue-600',
  Menengah: 'bg-amber-50 text-amber-600',
  Mahir: 'bg-purple-50 text-purple-600',
};

function useSpeech() {
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  const speak = useCallback((text: string, rate: number = 0.9) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  return { supported, speaking, speak };
}

export default function ListeningClient() {
  const [activeLevel, setActiveLevel] = useState('Semua');
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showText, setShowText] = useState(false);
  const { supported, speaking, speak } = useSpeech();

  useEffect(() => {
    setCompletedIds(getListeningProgress());
  }, []);

  const items = LISTENING_ITEMS.filter(it => activeLevel === 'Semua' || it.level === activeLevel);
  const current = items[index] ?? items[0];

  useEffect(() => {
    setIndex(0);
    setSelected(null);
    setShowText(false);
  }, [activeLevel]);

  if (!current) return null;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === current.correctIndex) {
      const updated = markListeningCompleted(current.id);
      setCompletedIds(updated);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowText(false);
    setIndex(i => Math.min(i + 1, items.length - 1));
  };

  const handleRepeat = () => {
    setSelected(null);
    setShowText(false);
  };

  const completedCount = completedIds.length;
  const progressPct = Math.round((completedCount / TOTAL_LISTENING_ITEMS) * 100);
  const isDone = completedIds.includes(current.id);

  return (
    <div className="flex flex-col h-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Listening</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {completedCount} dari {TOTAL_LISTENING_ITEMS} latihan selesai ({progressPct}%)
          </p>
        </div>

        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {LEVELS.map(lvl => (
            <button
              key={`listen-lvl-${lvl}`}
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

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {!supported && (
            <div className="bg-danger-bg border border-danger/20 text-danger text-sm rounded-lg p-3">
              Browser ini tidak mendukung text-to-speech. Coba gunakan Chrome atau Edge versi terbaru.
            </div>
          )}

          <div className="bg-card rounded-xl border border-border card-shadow p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[current.level]}`}>
                {current.level}
              </span>
              <span className="text-xs text-muted-foreground">
                Latihan {index + 1} / {items.length}
              </span>
            </div>

            {/* Audio Player */}
            <div className="flex flex-col items-center gap-4 py-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl">
              <button
                onClick={() => speak(current.sentence, 0.85)}
                disabled={!supported}
                className={`
                  w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-95
                  ${speaking ? 'bg-primary/80 animate-pulse' : 'bg-primary hover:opacity-90'}
                  disabled:opacity-40 disabled:cursor-not-allowed
                `}
              >
                <Volume2 size={32} className="text-white" />
              </button>
              <p className="text-sm text-muted-foreground">
                {speaking ? 'Memutar audio...' : 'Ketuk untuk memutar audio'}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => speak(current.sentence, 0.6)}
                  disabled={!supported}
                  className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline disabled:opacity-40"
                >
                  <Gauge size={13} /> Putar lebih pelan
                </button>
                <button
                  onClick={() => setShowText(s => !s)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium hover:text-foreground"
                >
                  {showText ? <EyeOff size={13} /> : <Eye size={13} />}
                  {showText ? 'Sembunyikan teks' : 'Tampilkan teks'}
                </button>
              </div>
              {showText && (
                <p className="text-sm font-medium text-foreground bg-card px-4 py-2 rounded-lg border border-border">
                  &ldquo;{current.sentence}&rdquo;
                </p>
              )}
            </div>

            {/* Question */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">{current.question}</p>
              <div className="space-y-2">
                {current.options.map((opt, idx) => {
                  const isCorrect = idx === current.correctIndex;
                  const isSelected = idx === selected;
                  let stateClass = 'border-border hover:bg-muted';
                  if (selected !== null) {
                    if (isCorrect) stateClass = 'border-success bg-success-bg';
                    else if (isSelected) stateClass = 'border-danger bg-danger-bg';
                    else stateClass = 'border-border opacity-60';
                  }
                  return (
                    <button
                      key={`listen-opt-${idx}`}
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

            {/* Actions */}
            <div className="flex items-center gap-3">
              {selected !== null && (
                <button
                  onClick={handleRepeat}
                  className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                  <RotateCcw size={16} />
                  Ulangi
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={selected === null || index === items.length - 1}
                className="ml-auto flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Berikutnya
                <ArrowRight size={16} />
              </button>
            </div>

            {isDone && (
              <div className="flex items-center gap-2 text-xs text-success font-medium">
                <CheckCircle2 size={14} /> Kamu sudah menjawab benar latihan ini sebelumnya.
              </div>
            )}
          </div>

          {index === items.length - 1 && selected !== null && (
            <div className="flex flex-col items-center gap-2 text-center py-4">
              <Headphones size={28} className="text-primary" />
              <p className="text-sm font-medium text-foreground">Kamu sudah menyelesaikan semua latihan di level ini!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
