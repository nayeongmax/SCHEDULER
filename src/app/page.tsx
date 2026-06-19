"use client";
import { STUDY_TASKS, EXAM_SCHEDULES, WRONG_ANSWERS } from "@/lib/mockData";
import { RadialBarChart, RadialBar, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import Link from "next/link";

const weekData = [
  { day: "월", hours: 4.5, goal: 5 },
  { day: "화", hours: 6.0, goal: 5 },
  { day: "수", hours: 3.5, goal: 5 },
  { day: "목", hours: 7.0, goal: 5 },
  { day: "금", hours: 5.5, goal: 5 },
  { day: "토", hours: 8.0, goal: 7 },
  { day: "일", hours: 2.5, goal: 7 },
];

const subjectData = [
  { name: "수학", hours: 12.5, color: "#8b5cf6" },
  { name: "물리", hours: 9.0, color: "#06b6d4" },
  { name: "영어", hours: 6.0, color: "#3b82f6" },
  { name: "화학", hours: 5.5, color: "#10b981" },
  { name: "국어", hours: 4.0, color: "#ef4444" },
];

export default function Dashboard() {
  const today = STUDY_TASKS.filter((t) => t.date === "2026-06-19");
  const completed = today.filter((t) => t.completed).length;
  const completionRate = Math.round((completed / today.length) * 100);
  const totalStudyHours = weekData.reduce((s, d) => s + d.hours, 0);
  const wrongUnsolved = WRONG_ANSWERS.filter((w) => !w.solved).length;
  const closestExam = EXAM_SCHEDULES.sort((a, b) => (a.daysLeft ?? 99) - (b.daysLeft ?? 99))[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 relative z-10">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">안녕하세요, 우주탐험가님 👋</h1>
          <p className="text-space-400 mt-1">2026년 6월 19일 목요일 · 1학기 기말고사 <span className="text-mars-400 font-semibold">D-{closestExam.daysLeft}</span></p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold text-nebula-400">{completionRate}%</div>
          <div className="text-space-400 text-sm">오늘의 달성률</div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "이번 주 학습", value: `${totalStudyHours.toFixed(1)}h`, icon: "⏱", color: "text-aurora-400" },
          { label: "오늘 완료", value: `${completed}/${today.length}`, icon: "✅", color: "text-comet-400" },
          { label: "미해결 오답", value: `${wrongUnsolved}개`, icon: "❌", color: "text-mars-400" },
          { label: "D-Day 시험", value: `${closestExam.subject} D-${closestExam.daysLeft}`, icon: "📌", color: "text-star-400" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl p-4">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-space-400 text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly chart */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">📈 이번 주 학습 시간</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weekData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="day" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 12 }} unit="h" />
              <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
              <Area type="monotone" dataKey="goal" stroke="#334155" strokeDasharray="4 4" fill="none" name="목표" />
              <Area type="monotone" dataKey="hours" stroke="#8b5cf6" fill="url(#grad)" name="실제" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Subject distribution */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">📚 과목별 비중</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={subjectData} dataKey="hours" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3}>
                {subjectData.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} formatter={(v) => [`${v}h`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {subjectData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-space-300">{s.name}</span>
                </div>
                <span className="text-white font-medium">{s.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's tasks */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">📅 오늘의 학습 계획</h2>
            <Link href="/planner" className="text-nebula-400 text-sm hover:text-nebula-300">전체보기 →</Link>
          </div>
          <div className="space-y-2">
            {today.map((t) => (
              <div key={t.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${t.completed ? "opacity-50" : ""}`}
                style={{ background: `${t.subjectColor}10`, borderLeft: `3px solid ${t.subjectColor}` }}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                  ${t.completed ? "border-comet-400 bg-comet-400/20" : "border-space-500"}`}>
                  {t.completed && <span className="text-comet-400 text-xs">✓</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${t.completed ? "line-through text-space-500" : "text-white"}`}>{t.title}</div>
                  <div className="text-xs text-space-400">{t.subject} · {t.startTime}–{t.endTime}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exam countdown */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">⏰ 시험 D-Day 카운트다운</h2>
            <Link href="/planner" className="text-nebula-400 text-sm hover:text-nebula-300">시험모드 →</Link>
          </div>
          <div className="space-y-2">
            {EXAM_SCHEDULES.map((e) => (
              <div key={e.id} className="flex items-center justify-between p-3 rounded-xl bg-space-800/50">
                <div>
                  <div className="text-white font-medium text-sm">{e.subject}</div>
                  <div className="text-space-400 text-xs">{e.date} · {e.range}</div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${(e.daysLeft ?? 99) <= 5 ? "text-mars-400" : (e.daysLeft ?? 99) <= 7 ? "text-star-400" : "text-comet-400"}`}>
                    D-{e.daysLeft}
                  </div>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-sm ${i < e.difficulty ? "bg-star-400" : "bg-space-700"}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: "/planner", icon: "📅", label: "플래너", desc: "일정 추가하기", color: "from-nebula-600/20 to-nebula-900/20 border-nebula-500/20" },
          { href: "/wrong-answers", icon: "📝", label: "오답노트", desc: `미해결 ${wrongUnsolved}개`, color: "from-mars-500/20 to-red-900/20 border-mars-500/20" },
          { href: "/career", icon: "🚀", label: "진로탐구", desc: "천문학자 보기", color: "from-aurora-600/20 to-cyan-900/20 border-aurora-500/20" },
          { href: "/highschool", icon: "🏫", label: "고교탐색", desc: "영재학교 비교", color: "from-comet-500/20 to-emerald-900/20 border-comet-500/20" },
        ].map((q) => (
          <Link key={q.href} href={q.href}
            className={`glass rounded-2xl p-5 bg-gradient-to-br ${q.color} border hover:scale-105 transition-all duration-200 group`}>
            <div className="text-3xl mb-2">{q.icon}</div>
            <div className="text-white font-semibold">{q.label}</div>
            <div className="text-space-400 text-sm group-hover:text-space-300">{q.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
