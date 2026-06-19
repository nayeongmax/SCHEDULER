"use client";
import { useState } from "react";
import { STUDY_TASKS, EXAM_SCHEDULES, SUBJECTS } from "@/lib/mockData";
import type { StudyTask, ExamSchedule } from "@/lib/types";

type Mode = "planner" | "exam";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function getWeekDates() {
  const today = new Date("2026-06-19");
  const day = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - day + 1);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      date: d.toISOString().slice(0, 10),
      label: DAYS[d.getDay()],
      day: d.getDate(),
      isToday: d.toISOString().slice(0, 10) === "2026-06-19",
    };
  });
}

export default function PlannerPage() {
  const [mode, setMode] = useState<Mode>("planner");
  const [selectedDate, setSelectedDate] = useState("2026-06-19");
  const [tasks, setTasks] = useState<StudyTask[]>(STUDY_TASKS);
  const [exams] = useState<ExamSchedule[]>(EXAM_SCHEDULES);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ subject: "수학", title: "", startTime: "09:00", endTime: "10:00" });

  const weekDates = getWeekDates();
  const todayTasks = tasks.filter((t) => t.date === selectedDate);
  const completedCount = todayTasks.filter((t) => t.completed).length;

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = () => {
    if (!newTask.title) return;
    const subj = SUBJECTS.find((s) => s.name === newTask.subject);
    setTasks((prev) => [...prev, {
      id: Date.now().toString(), ...newTask,
      subjectColor: subj?.color ?? "#8b5cf6",
      completed: false, date: selectedDate,
    }]);
    setNewTask({ subject: "수학", title: "", startTime: "09:00", endTime: "10:00" });
    setShowAddTask(false);
  };

  const totalMinutes = todayTasks.reduce((acc, t) => {
    const [sh, sm] = t.startTime.split(":").map(Number);
    const [eh, em] = t.endTime.split(":").map(Number);
    return acc + ((eh * 60 + em) - (sh * 60 + sm));
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">📅 스터디 플래너</h1>
          <p className="text-space-400 text-sm mt-0.5">총 계획 {Math.round(totalMinutes / 60 * 10) / 10}h · 완료 {completedCount}/{todayTasks.length}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setMode("planner")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${mode === "planner" ? "bg-nebula-600 text-white" : "glass text-space-300 hover:text-white"}`}>
            📅 플래너
          </button>
          <button onClick={() => setMode("exam")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${mode === "exam" ? "bg-mars-500 text-white" : "glass text-space-300 hover:text-white"}`}>
            🎯 시험모드
          </button>
        </div>
      </div>

      {mode === "planner" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar strip */}
          <div className="lg:col-span-3 glass rounded-2xl p-4">
            <div className="grid grid-cols-7 gap-2">
              {weekDates.map((d) => {
                const count = tasks.filter((t) => t.date === d.date).length;
                const done = tasks.filter((t) => t.date === d.date && t.completed).length;
                return (
                  <button key={d.date} onClick={() => setSelectedDate(d.date)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                      selectedDate === d.date ? "bg-nebula-600 text-white glow-nebula" :
                      d.isToday ? "bg-space-800 text-nebula-300 border border-nebula-500/40" :
                      "hover:bg-space-800 text-space-300"
                    }`}>
                    <span className="text-xs font-medium">{d.label}</span>
                    <span className="text-xl font-bold">{d.day}</span>
                    {count > 0 && (
                      <div className="flex gap-0.5">
                        {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < done ? "bg-comet-400" : "bg-space-600"}`} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold">{selectedDate} 학습 계획</h2>
              <button onClick={() => setShowAddTask(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-nebula-600 hover:bg-nebula-500 rounded-xl text-white text-sm font-medium transition-all">
                + 일정 추가
              </button>
            </div>

            {showAddTask && (
              <div className="glass rounded-2xl p-4 border border-nebula-500/30 fade-in">
                <h3 className="text-white font-medium mb-3">새 학습 일정</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-space-400 text-xs block mb-1">과목</label>
                    <select value={newTask.subject} onChange={(e) => setNewTask((p) => ({ ...p, subject: e.target.value }))}
                      className="w-full bg-space-800 border border-space-600 rounded-lg px-3 py-2 text-white text-sm">
                      {SUBJECTS.map((s) => <option key={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-space-400 text-xs block mb-1">학습 내용</label>
                    <input value={newTask.title} onChange={(e) => setNewTask((p) => ({ ...p, title: e.target.value }))}
                      placeholder="예: 미적분 문제 5개" className="w-full bg-space-800 border border-space-600 rounded-lg px-3 py-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="text-space-400 text-xs block mb-1">시작</label>
                    <input type="time" value={newTask.startTime} onChange={(e) => setNewTask((p) => ({ ...p, startTime: e.target.value }))}
                      className="w-full bg-space-800 border border-space-600 rounded-lg px-3 py-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="text-space-400 text-xs block mb-1">종료</label>
                    <input type="time" value={newTask.endTime} onChange={(e) => setNewTask((p) => ({ ...p, endTime: e.target.value }))}
                      className="w-full bg-space-800 border border-space-600 rounded-lg px-3 py-2 text-white text-sm" />
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={addTask} className="flex-1 bg-nebula-600 hover:bg-nebula-500 text-white rounded-lg py-2 text-sm font-medium">추가</button>
                  <button onClick={() => setShowAddTask(false)} className="flex-1 glass text-space-300 hover:text-white rounded-lg py-2 text-sm">취소</button>
                </div>
              </div>
            )}

            {todayTasks.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <div className="text-4xl mb-2">🌙</div>
                <div className="text-space-400">아직 학습 계획이 없어요</div>
                <button onClick={() => setShowAddTask(true)} className="mt-3 text-nebula-400 hover:text-nebula-300 text-sm">+ 일정 추가하기</button>
              </div>
            ) : (
              todayTasks.map((t) => {
                const [sh, sm] = t.startTime.split(":").map(Number);
                const [eh, em] = t.endTime.split(":").map(Number);
                const mins = (eh * 60 + em) - (sh * 60 + sm);
                return (
                  <div key={t.id} onClick={() => toggleTask(t.id)} role="button"
                    className={`glass rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.01] ${t.completed ? "opacity-60" : ""}`}
                    style={{ borderLeft: `4px solid ${t.subjectColor}` }}>
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                        ${t.completed ? "bg-comet-400 border-comet-400" : "border-space-500 hover:border-comet-400"}`}>
                        {t.completed && <span className="text-space-950 text-xs font-bold">✓</span>}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${t.completed ? "line-through text-space-500" : "text-white"}`}>{t.title}</div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ background: t.subjectColor + "40" }}>{t.subject}</span>
                          <span className="text-space-400 text-xs">{t.startTime} – {t.endTime}</span>
                          <span className="text-space-500 text-xs">{mins}분</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Progress sidebar */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-4">오늘의 진행률</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-28 h-28">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                    <circle cx="56" cy="56" r="48" fill="none" stroke="#1e293b" strokeWidth="10" />
                    <circle cx="56" cy="56" r="48" fill="none" stroke="#8b5cf6" strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 48}`}
                      strokeDashoffset={`${2 * Math.PI * 48 * (1 - completedCount / Math.max(todayTasks.length, 1))}`}
                      strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{Math.round(completedCount / Math.max(todayTasks.length, 1) * 100)}%</span>
                    <span className="text-space-400 text-xs">{completedCount}/{todayTasks.length}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {SUBJECTS.slice(0, 4).map((s) => {
                  const cnt = todayTasks.filter((t) => t.subject === s.name).length;
                  if (cnt === 0) return null;
                  const done = todayTasks.filter((t) => t.subject === s.name && t.completed).length;
                  return (
                    <div key={s.id}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-space-300">{s.name}</span>
                        <span className="text-space-400">{done}/{cnt}</span>
                      </div>
                      <div className="h-1.5 bg-space-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${(done / cnt) * 100}%`, background: s.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-3">⏰ 다음 시험</h3>
              <div className="text-4xl font-bold text-mars-400 text-center py-2">D-{EXAM_SCHEDULES[0].daysLeft}</div>
              <div className="text-center text-white font-medium">{EXAM_SCHEDULES[0].subject}</div>
              <div className="text-center text-space-400 text-sm">{EXAM_SCHEDULES[0].date}</div>
              <div className="mt-3 p-2 bg-space-800/50 rounded-lg text-xs text-space-300">{EXAM_SCHEDULES[0].range}</div>
            </div>
          </div>
        </div>
      ) : (
        /* Exam Mode */
        <div className="space-y-6">
          <div className="glass rounded-2xl p-5 border border-mars-500/30 glow-nebula" style={{ boxShadow: "0 0 30px rgba(239,68,68,0.15)" }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🎯</span>
              <span className="text-mars-400 font-bold text-lg">시험 기간 모드 활성화</span>
            </div>
            <p className="text-space-400 text-sm">시험 일정, 범위, 우선순위를 한눈에 파악하세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exams.sort((a, b) => (a.daysLeft ?? 99) - (b.daysLeft ?? 99)).map((e) => {
              const urgency = (e.daysLeft ?? 99) <= 3 ? "mars" : (e.daysLeft ?? 99) <= 7 ? "star" : "comet";
              const urgencyColors = { mars: "#ef4444", star: "#f59e0b", comet: "#10b981" };
              return (
                <div key={e.id} className="glass rounded-2xl p-5" style={{ borderTop: `3px solid ${urgencyColors[urgency]}` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-white font-bold text-lg">{e.subject}</div>
                      <div className="text-space-400 text-sm">{e.date} {e.time}</div>
                    </div>
                    <div className={`text-3xl font-bold`} style={{ color: urgencyColors[urgency] }}>D-{e.daysLeft}</div>
                  </div>
                  <div className="bg-space-800/50 rounded-lg p-3 mb-3">
                    <div className="text-xs text-space-400 mb-1">시험 범위</div>
                    <div className="text-space-200 text-sm">{e.range}</div>
                  </div>
                  <div>
                    <div className="text-xs text-space-400 mb-1">난이도 예상</div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={`flex-1 h-2 rounded-sm transition-all ${i < e.difficulty ? "bg-star-400" : "bg-space-700"}`} />
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-space-400">
                    남은 시간: <span className="text-white font-medium">{((e.daysLeft ?? 0) * 8).toFixed(0)}시간 (하루 8h 기준)</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Exam study tips */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">📊 T형 맞춤 시험 전략</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "시간 배분 공식", value: "우선순위 × 난이도 × D-day역수", desc: "수치로 배분 → 수학 40% / 물리 30% / 나머지 30%" },
                { label: "회독 효율", value: "1회독: 개념(40%) / 2회독: 문제(40%) / 3회독: 오답(20%)", desc: "기출 3년치 전수 분석 권장" },
                { label: "최적 학습 사이클", value: "50분 집중 + 10분 휴식", desc: "포모도로 기법. 4사이클 후 30분 긴 휴식" },
              ].map((tip) => (
                <div key={tip.label} className="bg-space-800/50 rounded-xl p-4">
                  <div className="text-aurora-400 text-xs font-medium mb-1">{tip.label}</div>
                  <div className="text-white text-sm font-semibold mb-1">{tip.value}</div>
                  <div className="text-space-400 text-xs">{tip.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
