'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Trophy, GraduationCap, Flame, ArrowRight, CheckCircle2, XCircle, TrendingUp, Star, Target, Calendar } from 'lucide-react';
import { getLearnedVocabulary, getAverageScore, getGrammarProgress, updateDailyStreak, getQuizHistory, STORAGE_KEYS } from '@/lib/storage';
import { VOCABULARY, TOTAL_VOCAB } from '@/data/vocabulary';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Icon from '@/components/ui/AppIcon';


interface DailyChallengeState {
  answer: string;
  submitted: boolean;
  correct: boolean;
}

function getDailyWord() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const idx = dayOfYear % VOCABULARY.length;
  return VOCABULARY[idx];
}

export default function DashboardClient() {
  const [learnedCount, setLearnedCount] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [grammarCount, setGrammarCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [quizHistory, setQuizHistory] = useState<{ name: string; score: number }[]>([]);
  const [challenge, setChallenge] = useState<DailyChallengeState>({
    answer: '',
    submitted: false,
    correct: false,
  });
  const [challengeAlreadyDone, setChallengeAlreadyDone] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  const dailyWord = getDailyWord();

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }));
    setLearnedCount(getLearnedVocabulary().length);
    setAvgScore(getAverageScore());
    setGrammarCount(getGrammarProgress().length);
    const newStreak = updateDailyStreak();
    setStreak(newStreak);

    const history = getQuizHistory().slice(0, 7).reverse();
    setQuizHistory(
      history.map((h, i) => ({
        name: `Q${i + 1}`,
        score: h.accuracy,
      }))
    );

    const savedDate = localStorage.getItem(STORAGE_KEYS.DAILY_CHALLENGE_DATE);
    const savedDone = localStorage.getItem(STORAGE_KEYS.DAILY_CHALLENGE_COMPLETED);
    if (savedDate === currentDate && savedDone === 'true') {
      setChallengeAlreadyDone(true);
    }
  }, []);

  const handleChallengeSubmit = () => {
    const correct = challenge.answer.trim().toLowerCase() === dailyWord.meaning.toLowerCase() ||
      dailyWord.meaning.toLowerCase().includes(challenge.answer.trim().toLowerCase()) &&
      challenge.answer.trim().length > 2;
    setChallenge(c => ({ ...c, submitted: true, correct }));
    if (correct) {
      localStorage.setItem(STORAGE_KEYS.DAILY_CHALLENGE_DATE, currentDate);
      localStorage.setItem(STORAGE_KEYS.DAILY_CHALLENGE_COMPLETED, 'true');
      setChallengeAlreadyDone(true);
    }
  };

  const progressPct = Math.round((learnedCount / TOTAL_VOCAB) * 100);

  const stats = [
    {
      id: 'stat-vocab',
      label: 'Kata Dipelajari',
      value: learnedCount,
      total: TOTAL_VOCAB,
      icon: BookOpen,
      color: 'text-primary',
      bg: 'bg-blue-50',
      trend: '+12 minggu ini',
      trendUp: true,
    },
    {
      id: 'stat-quiz',
      label: 'Rata-rata Kuis',
      value: avgScore,
      suffix: '%',
      icon: Trophy,
      color: 'text-warning',
      bg: 'bg-amber-50',
      trend: avgScore >= 70 ? 'Di atas rata-rata' : 'Perlu ditingkatkan',
      trendUp: avgScore >= 70,
    },
    {
      id: 'stat-grammar',
      label: 'Topik Grammar',
      value: grammarCount,
      total: 15,
      icon: GraduationCap,
      color: 'text-success',
      bg: 'bg-green-50',
      trend: `${15 - grammarCount} topik tersisa`,
      trendUp: grammarCount > 0,
    },
    {
      id: 'stat-streak',
      label: 'Hari Berturut',
      value: streak,
      suffix: ' hari',
      icon: Flame,
      color: 'text-danger',
      bg: 'bg-red-50',
      trend: streak >= 7 ? '🔥 Luar biasa!' : 'Tetap semangat!',
      trendUp: streak >= 3,
    },
  ];

  const quickActions = [
    { id: 'qa-vocab', label: 'Belajar Kosakata', desc: 'Pelajari kata-kata baru', href: '/vocabulary', icon: BookOpen, gradient: 'gradient-primary' },
    { id: 'qa-quiz', label: 'Mulai Kuis', desc: 'Uji kemampuanmu', href: '/quiz', icon: Trophy, gradient: 'gradient-warning' },
  ];

  return (
    <div className="p-6 xl:p-8 max-w-screen-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Selamat Datang! 👋</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Terus belajar dan tingkatkan kemampuan Bahasa Inggrismu.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 text-sm text-muted-foreground card-shadow">
          <Calendar size={14} />
          <span className="font-medium">
            {currentDate}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-card rounded-xl border border-border card-shadow p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon size={20} className={stat.color} />
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.trendUp ? 'bg-green-50 text-success' : 'bg-amber-50 text-warning'}`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <div className="text-3xl font-bold tabular-nums text-foreground">
                  {stat.value}{stat.suffix || ''}
                  {stat.total && <span className="text-lg font-normal text-muted-foreground">/{stat.total}</span>}
                </div>
                <p className="text-xs font-medium text-muted-foreground mt-0.5 tracking-wide uppercase">{stat.label}</p>
              </div>
              {stat.total && (
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(100, Math.round((stat.value / stat.total) * 100))}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Challenge */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border card-shadow p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center">
              <Star size={18} className="text-warning" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Tantangan Harian</h2>
              <p className="text-xs text-muted-foreground">Terjemahkan kata ini ke Bahasa Indonesia</p>
            </div>
            <span className="ml-auto text-xs bg-amber-50 text-warning font-medium px-2 py-1 rounded-full border border-amber-100">
              +10 XP
            </span>
          </div>

          {challengeAlreadyDone ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 size={40} className="text-success mb-3" />
              <p className="font-semibold text-foreground">Tantangan hari ini selesai!</p>
              <p className="text-sm text-muted-foreground mt-1">Kembali besok untuk tantangan baru.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-primary mb-2">{dailyWord.word}</p>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                  {dailyWord.category}
                </span>
              </div>

              {!challenge.submitted ? (
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={challenge.answer}
                    onChange={e => setChallenge(c => ({ ...c, answer: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && challenge.answer.trim() && handleChallengeSubmit()}
                    placeholder="Ketik artinya dalam Bahasa Indonesia..."
                    className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-background"
                  />
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={!challenge.answer.trim()}
                    className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Cek
                  </button>
                </div>
              ) : (
                <div className={`flex items-center gap-3 p-4 rounded-xl border ${
                  challenge.correct
                    ? 'bg-success-bg border-success/20 text-success' :'bg-danger-bg border-danger/20 text-danger'
                }`}>
                  {challenge.correct
                    ? <CheckCircle2 size={20} />
                    : <XCircle size={20} />
                  }
                  <div>
                    <p className="font-semibold text-sm">
                      {challenge.correct ? 'Benar! 🎉' : 'Belum tepat'}
                    </p>
                    <p className="text-xs opacity-80">
                      Jawaban: <span className="font-medium">{dailyWord.meaning}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-foreground">Aksi Cepat</h2>
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <Link
                key={action.id}
                href={action.href}
                className={`
                  flex items-center gap-4 p-4 rounded-xl text-white ${action.gradient}
                  hover:opacity-90 active:scale-95 transition-all duration-150 card-shadow-md
                `}
              >
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{action.label}</p>
                  <p className="text-xs opacity-80">{action.desc}</p>
                </div>
                <ArrowRight size={18} className="opacity-70 flex-shrink-0" />
              </Link>
            );
          })}

          {/* Progress Summary */}
          <div className="bg-card border border-border rounded-xl p-4 card-shadow">
            <div className="flex items-center gap-2 mb-3">
              <Target size={16} className="text-primary" />
              <span className="text-sm font-semibold text-foreground">Progress Keseluruhan</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Kosakata</span>
                  <span className="font-medium text-foreground">{learnedCount}/{TOTAL_VOCAB}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${progressPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Grammar</span>
                  <span className="font-medium text-foreground">{grammarCount}/15</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: `${Math.round((grammarCount / 15) * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz History Chart */}
      {quizHistory.length > 0 && (
        <div className="bg-card rounded-xl border border-border card-shadow p-6">
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp size={18} className="text-primary" />
            <h2 className="text-base font-semibold text-foreground">Riwayat Kuis Terakhir</h2>
            <Link href="/quiz" className="ml-auto text-xs text-primary font-medium hover:underline flex items-center gap-1">
              Lihat semua <ArrowRight size={12} />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={quizHistory} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border border-border rounded-lg px-3 py-2 text-sm card-shadow">
                        <span className="font-semibold text-foreground">{payload[0].value}%</span>
                        <span className="text-muted-foreground ml-1">akurasi</span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="score" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}