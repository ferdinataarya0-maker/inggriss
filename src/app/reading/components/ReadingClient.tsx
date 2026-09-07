'use client';
import React, { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { READING_ARTICLES, ReadingArticle, TOTAL_READING_ARTICLES } from '@/data/reading';
import { getReadingProgress } from '@/lib/storage';
import ReadingArticleModal from './ReadingArticleModal';

const LEVELS = ['Semua', 'Pemula', 'Menengah', 'Mahir'];

const levelColors: Record<string, string> = {
  Pemula: 'bg-blue-50 text-blue-600',
  Menengah: 'bg-amber-50 text-amber-600',
  Mahir: 'bg-purple-50 text-purple-600',
};

export default function ReadingClient() {
  const [activeLevel, setActiveLevel] = useState('Semua');
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [activeArticle, setActiveArticle] = useState<ReadingArticle | null>(null);

  useEffect(() => {
    setCompletedIds(getReadingProgress());
  }, []);

  const refreshProgress = () => setCompletedIds(getReadingProgress());

  const filtered = READING_ARTICLES.filter(a => activeLevel === 'Semua' || a.level === activeLevel);
  const completedCount = completedIds.length;
  const progressPct = Math.round((completedCount / TOTAL_READING_ARTICLES) * 100);

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Reading</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {completedCount} dari {TOTAL_READING_ARTICLES} artikel selesai ({progressPct}%)
          </p>
        </div>

        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-success rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {LEVELS.map(lvl => (
            <button
              key={`read-lvl-${lvl}`}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(article => {
            const isDone = completedIds.includes(article.id);
            return (
              <button
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className={`
                  group text-left bg-card rounded-xl border p-5 flex flex-col gap-3 transition-all duration-150
                  hover:card-shadow-md
                  ${isDone ? 'border-success/30 bg-green-50/30' : 'border-border card-shadow'}
                `}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <FileText size={20} className="text-indigo-600" />
                  </div>
                  {isDone && (
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={14} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground leading-snug">{article.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{article.topic}</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[article.level]}`}>
                      {article.level}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={11} /> {article.minutesToRead} mnt
                    </span>
                  </div>
                  <span className="text-xs text-primary font-medium flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                    {isDone ? 'Baca lagi' : 'Baca'} <ChevronRight size={14} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeArticle && (
        <ReadingArticleModal
          article={activeArticle}
          isCompleted={completedIds.includes(activeArticle.id)}
          onClose={() => setActiveArticle(null)}
          onCompleted={refreshProgress}
        />
      )}
    </div>
  );
}
