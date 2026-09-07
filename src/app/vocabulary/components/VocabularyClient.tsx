'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Search, BookOpen, Layers, X } from 'lucide-react';
import { VOCABULARY, CATEGORIES, VocabWord, TOTAL_VOCAB } from '@/data/vocabulary';
import { getLearnedVocabulary, toggleLearnedWord } from '@/lib/storage';
import FlashcardModal from './FlashcardModal';

export default function VocabularyClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [learnedIds, setLearnedIds] = useState<string[]>([]);
  const [showFlashcard, setShowFlashcard] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);

  useEffect(() => {
    setLearnedIds(getLearnedVocabulary());
  }, []);

  const filtered = VOCABULARY.filter(w => {
    const matchCat = activeCategory === 'Semua' || w.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const handleToggleLearned = useCallback((id: string) => {
    const updated = toggleLearnedWord(id);
    setLearnedIds(updated);
  }, []);

  const learnedCount = learnedIds.length;
  const progressPct = Math.round((learnedCount / TOTAL_VOCAB) * 100);

  const categoryCounts: Record<string, number> = { 'Semua': VOCABULARY.length };
  VOCABULARY.forEach(w => {
    categoryCounts[w.category] = (categoryCounts[w.category] || 0) + 1;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Kosakata</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {learnedCount} dari {TOTAL_VOCAB} kata dipelajari ({progressPct}%)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setFlashcardIndex(0); setShowFlashcard(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all card-shadow"
            >
              <Layers size={16} />
              Mode Flashcard
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari kata Inggris atau arti Indonesia..."
            className="w-full pl-9 pr-9 py-2.5 border border-border rounded-lg text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={`cat-${cat}`}
              onClick={() => setActiveCategory(cat)}
              className={`
                flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150
                ${activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
            >
              {cat}
              <span className="ml-1 opacity-60">({categoryCounts[cat] || 0})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Word Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BookOpen size={40} className="text-muted-foreground mb-3" />
            <p className="font-semibold text-foreground">Kata tidak ditemukan</p>
            <p className="text-sm text-muted-foreground mt-1">Coba kata kunci lain atau ubah filter kategori.</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('Semua'); }}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-4">
              Menampilkan {filtered.length} kata
              {search && ` untuk "${search}"`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
              {filtered.map(word => {
                const isLearned = learnedIds.includes(word.id);
                return (
                  <WordCard
                    key={word.id}
                    word={word}
                    isLearned={isLearned}
                    onToggle={() => handleToggleLearned(word.id)}
                    onFlashcard={() => {
                      const idx = filtered.findIndex(w => w.id === word.id);
                      setFlashcardIndex(idx >= 0 ? idx : 0);
                      setShowFlashcard(true);
                    }}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Flashcard Modal */}
      {showFlashcard && (
        <FlashcardModal
          words={filtered}
          initialIndex={flashcardIndex}
          learnedIds={learnedIds}
          onToggleLearned={handleToggleLearned}
          onClose={() => setShowFlashcard(false)}
        />
      )}
    </div>
  );
}

interface WordCardProps {
  word: VocabWord;
  isLearned: boolean;
  onToggle: () => void;
  onFlashcard: () => void;
}

function WordCard({ word, isLearned, onToggle, onFlashcard }: WordCardProps) {
  const categoryColors: Record<string, string> = {
    'Pronouns': 'bg-blue-50 text-blue-600',
    'Daily Verbs': 'bg-green-50 text-green-600',
    'Adjectives': 'bg-purple-50 text-purple-600',
    'Animals': 'bg-orange-50 text-orange-600',
    'Food': 'bg-red-50 text-red-600',
    'Food & Drinks': 'bg-red-50 text-red-600',
    'Colors': 'bg-pink-50 text-pink-600',
    'Numbers': 'bg-indigo-50 text-indigo-600',
    'Family': 'bg-rose-50 text-rose-600',
    'Emotions': 'bg-yellow-50 text-yellow-600',
    'Jobs': 'bg-cyan-50 text-cyan-600',
    'Body': 'bg-teal-50 text-teal-600',
  };
  const colorClass = categoryColors[word.category] || 'bg-gray-50 text-gray-600';

  return (
    <div
      className={`
        group bg-card rounded-xl border transition-all duration-150 p-4 flex flex-col gap-3
        hover:card-shadow-md cursor-pointer
        ${isLearned ? 'border-success/30 bg-green-50/30' : 'border-border card-shadow'}
      `}
      onClick={onFlashcard}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-lg font-bold text-foreground truncate">{word.word}</p>
          <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{word.meaning}</p>
        </div>
        {isLearned && (
          <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colorClass}`}>
          {word.category}
        </span>
        <button
          onClick={e => { e.stopPropagation(); onToggle(); }}
          className={`
            text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-150 active:scale-95
            ${isLearned
              ? 'bg-success/10 text-success hover:bg-success/20' :'bg-primary/10 text-primary hover:bg-primary/20'
            }
          `}
        >
          {isLearned ? 'Dipelajari ✓' : 'Tandai'}
        </button>
      </div>
    </div>
  );
}