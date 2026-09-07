'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Shuffle, CheckCircle2 } from 'lucide-react';
import { VocabWord } from '@/data/vocabulary';

interface FlashcardModalProps {
  words: VocabWord[];
  initialIndex: number;
  learnedIds: string[];
  onToggleLearned: (id: string) => void;
  onClose: () => void;
}

export default function FlashcardModal({
  words,
  initialIndex,
  learnedIds,
  onToggleLearned,
  onClose,
}: FlashcardModalProps) {
  const [index, setIndex] = useState(initialIndex);
  const [isFlipped, setIsFlipped] = useState(false);
  const [order, setOrder] = useState<number[]>(words.map((_, i) => i));

  const currentIdx = order[index] ?? 0;
  const currentWord = words[currentIdx];
  const isLearned = currentWord ? learnedIds.includes(currentWord.id) : false;

  const goNext = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => setIndex(i => Math.min(i + 1, order.length - 1)), 150);
  }, [order.length]);

  const goPrev = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => setIndex(i => Math.max(i - 1, 0)), 150);
  }, []);

  const handleFlip = useCallback(() => setIsFlipped(f => !f), []);

  const handleShuffle = () => {
    const shuffled = [...order].sort(() => (Math.random() > 0.5 ? 1 : -1));
    setOrder(shuffled);
    setIndex(0);
    setIsFlipped(false);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ') { e.preventDefault(); handleFlip(); }
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Enter' && currentWord) onToggleLearned(currentWord.id);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleFlip, goNext, goPrev, currentWord, onToggleLearned, onClose]);

  if (!currentWord) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl w-full max-w-lg card-shadow-lg animate-bounce-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-base font-semibold text-foreground">Mode Flashcard</h2>
            <p className="text-xs text-muted-foreground">
              {index + 1} / {order.length} kartu
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
              title="Acak urutan"
            >
              <Shuffle size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((index + 1) / order.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="p-6">
          <div
            className="flip-card h-52 cursor-pointer"
            onClick={handleFlip}
          >
            <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
              {/* Front */}
              <div className="flip-card-front bg-gradient-to-br from-primary/5 to-primary/15 border border-primary/20 rounded-xl flex flex-col items-center justify-center p-8">
                <p className="text-4xl font-bold text-primary text-center">{currentWord.word}</p>
                <span className="mt-3 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {currentWord.category}
                </span>
                <p className="mt-4 text-xs text-muted-foreground">Tekan Space atau klik untuk membalik</p>
              </div>
              {/* Back */}
              <div className="flip-card-back bg-gradient-to-br from-success/5 to-success/15 border border-success/20 rounded-xl flex flex-col items-center justify-center p-8">
                <p className="text-2xl font-bold text-success text-center">{currentWord.meaning}</p>
                <p className="mt-2 text-base text-foreground font-medium">{currentWord.word}</p>
                <span className="mt-3 text-xs bg-success/10 text-success px-3 py-1 rounded-full font-medium">
                  {currentWord.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="px-6 pb-6 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={goPrev}
              disabled={index === 0}
              className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
              Sebelumnya
            </button>

            <button
              onClick={() => onToggleLearned(currentWord.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95
                ${isLearned
                  ? 'bg-success/10 text-success border border-success/20 hover:bg-success/20' :'bg-primary text-primary-foreground hover:opacity-90'
                }
              `}
            >
              <CheckCircle2 size={16} />
              {isLearned ? 'Dipelajari ✓' : 'Tandai Dipelajari'}
            </button>

            <button
              onClick={goNext}
              disabled={index === order.length - 1}
              className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Berikutnya
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <span><kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Space</kbd> Balik</span>
            <span><kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">←→</kbd> Navigasi</span>
            <span><kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Enter</kbd> Tandai</span>
          </div>
        </div>
      </div>
    </div>
  );
}