'use client';
import React, { useState } from 'react';
import { PenLine, Sparkles } from 'lucide-react';
import SentencePracticePanel from './SentencePracticePanel';
import FreeWritingPanel from './FreeWritingPanel';

type Tab = 'sentence' | 'free';

export default function WritingClient() {
  const [tab, setTab] = useState<Tab>('sentence');

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Writing</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Latih kemampuan menulis kalimat dan menulis bebas dalam Bahasa Inggris.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTab('sentence')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
              ${tab === 'sentence'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              }
            `}
          >
            <PenLine size={15} />
            Latihan Kalimat
          </button>
          <button
            onClick={() => setTab('free')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
              ${tab === 'free'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              }
            `}
          >
            <Sparkles size={15} />
            Menulis Bebas
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          {tab === 'sentence' ? <SentencePracticePanel /> : <FreeWritingPanel />}
        </div>
      </div>
    </div>
  );
}
