'use client';
import React, { useState, useEffect } from 'react';
import { GraduationCap, CheckCircle2, ChevronRight } from 'lucide-react';
import { GRAMMAR_TOPICS, GrammarTopic, TOTAL_GRAMMAR_TOPICS } from '@/data/grammar';
import { getGrammarProgress } from '@/lib/storage';
import GrammarTopicModal from './GrammarTopicModal';

const LEVELS = ['Semua', 'Dasar', 'Menengah', 'Lanjut'];

const levelColors: Record<string, string> = {
  Dasar: 'bg-blue-50 text-blue-600',
  Menengah: 'bg-amber-50 text-amber-600',
  Lanjut: 'bg-purple-50 text-purple-600',
};

export default function GrammarClient() {
  const [activeLevel, setActiveLevel] = useState('Semua');
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [activeTopic, setActiveTopic] = useState<GrammarTopic | null>(null);

  useEffect(() => {
    setCompletedIds(getGrammarProgress());
  }, []);

  const refreshProgress = () => setCompletedIds(getGrammarProgress());

  const filtered = GRAMMAR_TOPICS.filter(
    t => activeLevel === 'Semua' || t.level === activeLevel
  );

  const completedCount = completedIds.length;
  const progressPct = Math.round((completedCount / TOTAL_GRAMMAR_TOPICS) * 100);

  return (
    <div className="flex flex-col h-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Grammar</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {completedCount} dari {TOTAL_GRAMMAR_TOPICS} topik selesai ({progressPct}%)
            </p>
          </div>
        </div>

        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-success rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {LEVELS.map(lvl => (
            <button
              key={`grammar-lvl-${lvl}`}
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

      {/* Topic Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(topic => {
            const isDone = completedIds.includes(topic.id);
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic)}
                className={`
                  group text-left bg-card rounded-xl border p-5 flex flex-col gap-3 transition-all duration-150
                  hover:card-shadow-md
                  ${isDone ? 'border-success/30 bg-green-50/30' : 'border-border card-shadow'}
                `}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={20} className="text-primary" />
                  </div>
                  {isDone && (
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={14} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground leading-snug">{topic.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{topic.summary}</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[topic.level]}`}>
                    {topic.level}
                  </span>
                  <span className="text-xs text-primary font-medium flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                    {isDone ? 'Lihat lagi' : 'Mulai belajar'} <ChevronRight size={14} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeTopic && (
        <GrammarTopicModal
          topic={activeTopic}
          isCompleted={completedIds.includes(activeTopic.id)}
          onClose={() => setActiveTopic(null)}
          onCompleted={refreshProgress}
        />
      )}
    </div>
  );
}
