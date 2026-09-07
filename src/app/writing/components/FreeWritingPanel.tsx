'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircle2, ListChecks, ChevronRight } from 'lucide-react';
import { FREE_WRITING_PROMPTS, FreeWritingPrompt, TOTAL_FREE_WRITING_PROMPTS } from '@/data/writing';
import { getWritingFreeCompleted, markWritingFreeCompleted } from '@/lib/storage';

const levelColors: Record<string, string> = {
  Pemula: 'bg-blue-50 text-blue-600',
  Menengah: 'bg-amber-50 text-amber-600',
  Mahir: 'bg-purple-50 text-purple-600',
};

export default function FreeWritingPanel() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [activePrompt, setActivePrompt] = useState<FreeWritingPrompt | null>(null);
  const [text, setText] = useState('');
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    setCompletedIds(getWritingFreeCompleted());
  }, []);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const openPrompt = (prompt: FreeWritingPrompt) => {
    setActivePrompt(prompt);
    setText('');
    setCheckedItems(prompt.checklist.map(() => false));
    setMarked(completedIds.includes(prompt.id));
  };

  const handleMarkDone = () => {
    if (!activePrompt) return;
    const updated = markWritingFreeCompleted(activePrompt.id);
    setCompletedIds(updated);
    setMarked(true);
  };

  if (activePrompt) {
    const meetsMinWords = wordCount >= activePrompt.minWords;
    return (
      <div className="space-y-5">
        <button
          onClick={() => setActivePrompt(null)}
          className="text-xs text-muted-foreground hover:text-foreground font-medium"
        >
          ← Kembali ke daftar topik
        </button>

        <div className="bg-card rounded-xl border border-border card-shadow p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[activePrompt.level]}`}>
              {activePrompt.level}
            </span>
            {marked && (
              <span className="flex items-center gap-1 text-xs text-success font-medium">
                <CheckCircle2 size={14} /> Selesai
              </span>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground">{activePrompt.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{activePrompt.instruction}</p>
          </div>

          <div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Tulis jawabanmu di sini..."
              rows={8}
              className="w-full px-4 py-3 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            />
            <p className={`text-xs mt-1.5 ${meetsMinWords ? 'text-success' : 'text-muted-foreground'}`}>
              {wordCount} kata (minimal {activePrompt.minWords} kata)
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <ListChecks size={13} /> Checklist Mandiri
            </p>
            <div className="space-y-2">
              {activePrompt.checklist.map((item, i) => (
                <label key={`chk-${i}`} className="flex items-start gap-2.5 text-sm text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems[i] || false}
                    onChange={e => {
                      const updated = [...checkedItems];
                      updated[i] = e.target.checked;
                      setCheckedItems(updated);
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleMarkDone}
            disabled={!meetsMinWords || marked}
            className="w-full px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {marked ? 'Sudah Ditandai Selesai' : 'Tandai Selesai'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        {completedIds.length} dari {TOTAL_FREE_WRITING_PROMPTS} topik menulis bebas selesai
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FREE_WRITING_PROMPTS.map(prompt => {
          const isDone = completedIds.includes(prompt.id);
          return (
            <button
              key={prompt.id}
              onClick={() => openPrompt(prompt)}
              className={`
                group text-left bg-card rounded-xl border p-5 flex flex-col gap-3 transition-all duration-150
                hover:card-shadow-md
                ${isDone ? 'border-success/30 bg-green-50/30' : 'border-border card-shadow'}
              `}
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[prompt.level]}`}>
                  {prompt.level}
                </span>
                {isDone && (
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground leading-snug">{prompt.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{prompt.instruction}</p>
              </div>
              <span className="text-xs text-primary font-medium flex items-center gap-0.5 group-hover:gap-1.5 transition-all mt-1">
                {isDone ? 'Tulis lagi' : 'Mulai menulis'} <ChevronRight size={14} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
