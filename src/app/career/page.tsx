"use client";
import { useState } from "react";
import { CAREERS, CAREER_NEWS } from "@/lib/mockData";
import type { Career } from "@/lib/types";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const CATEGORIES = ["전체", "자연과학", "공학", "IT/공학"];

const KEYWORDS = ["천문학", "물리학", "로켓", "AI", "데이터", "핵융합", "로봇", "우주"];

export default function CareerPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("전체");
  const [selected, setSelected] = useState<Career | null>(CAREERS[0]);

  const filtered = CAREERS.filter((c) => {
    const matchCat = category === "전체" || c.category === category;
    const matchSearch = !search || c.title.includes(search) || c.description.includes(search) ||
      c.relatedSubjects.some((s) => s.includes(search)) || c.skills.some((s) => s.includes(search));
    return matchCat && matchSearch;
  });

  const radarData = selected ? [
    { subject: "취업률", value: selected.employmentRate },
    { subject: "성장률×3", value: Math.min(selected.growthRate * 3, 100) },
    { subject: "연봉/100", value: Math.min(selected.avgSalary / 100, 100) },
    { subject: "STEM연관", value: selected.relatedSubjects.length * 30 },
    { subject: "기술수", value: Math.min(selected.skills.length * 15, 100) },
  ] : [];

  const salaryData = CAREERS.map((c) => ({
    name: c.title.length > 5 ? c.title.slice(0, 5) + ".." : c.title,
    연봉: c.avgSalary,
    성장률: c.growthRate * 10,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">🚀 진로탐구</h1>
        <p className="text-space-400 text-sm mt-0.5">수학·과학 기반 직업 데이터를 수치로 분석합니다</p>
      </div>

      {/* Search */}
      <div className="glass rounded-2xl p-4 mb-4">
        <div className="flex gap-3 mb-3">
          <div className="flex-1 relative">
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 직업, 기술, 과목으로 검색... (예: 천문학, 로켓, AI)"
              className="w-full bg-space-800 border border-space-600 rounded-xl px-4 py-3 text-white text-sm pr-10 focus:outline-none focus:border-nebula-500 transition-colors" />
            {search && <button onClick={() => setSearch("")} className="absolute right-3 top-3 text-space-400 hover:text-white">×</button>}
          </div>
          <div className="flex gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${category === c ? "bg-nebula-600 text-white" : "glass text-space-300 hover:text-white"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {KEYWORDS.map((kw) => (
            <button key={kw} onClick={() => setSearch(kw)}
              className="px-3 py-1 bg-space-800 hover:bg-nebula-600/20 border border-space-700 hover:border-nebula-500/40 rounded-full text-xs text-space-300 hover:text-nebula-300 transition-all">
              {kw}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Career List */}
        <div className="space-y-3">
          <div className="text-space-400 text-sm mb-2">검색 결과 {filtered.length}개</div>
          {filtered.map((c) => (
            <button key={c.id} onClick={() => setSelected(c)}
              className={`w-full text-left glass rounded-xl p-4 transition-all hover:scale-[1.02] ${selected?.id === c.id ? "border border-nebula-500/50 glow-nebula" : "border border-transparent"}`}>
              <div className="flex items-start justify-between mb-1">
                <span className="text-white font-semibold">{c.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  c.category === "자연과학" ? "bg-aurora-500/20 text-aurora-400" :
                  c.category === "IT/공학" ? "bg-nebula-500/20 text-nebula-400" :
                  "bg-comet-500/20 text-comet-400"
                }`}>{c.category}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                <div>
                  <div className="text-xs text-space-400">평균연봉</div>
                  <div className="text-sm font-bold text-star-400">{(c.avgSalary / 100).toFixed(0) + "백만"}</div>
                </div>
                <div>
                  <div className="text-xs text-space-400">취업률</div>
                  <div className="text-sm font-bold text-comet-400">{c.employmentRate}%</div>
                </div>
                <div>
                  <div className="text-xs text-space-400">성장률</div>
                  <div className="text-sm font-bold text-aurora-400">+{c.growthRate}%</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        {selected ? (
          <div className="lg:col-span-2 space-y-4">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selected.title}</h2>
                  <span className="text-space-400 text-sm">{selected.category}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-star-500/10 border border-star-500/20 rounded-xl p-3">
                    <div className="text-xl font-bold text-star-400">{(selected.avgSalary / 10000).toFixed(1)}억</div>
                    <div className="text-xs text-space-400">평균 연봉</div>
                  </div>
                  <div className="bg-comet-500/10 border border-comet-500/20 rounded-xl p-3">
                    <div className="text-xl font-bold text-comet-400">{selected.employmentRate}%</div>
                    <div className="text-xs text-space-400">취업률</div>
                  </div>
                  <div className="bg-aurora-500/10 border border-aurora-500/20 rounded-xl p-3">
                    <div className="text-xl font-bold text-aurora-400">+{selected.growthRate}%</div>
                    <div className="text-xs text-space-400">연간 성장</div>
                  </div>
                </div>
              </div>
              <p className="text-space-200 text-sm leading-relaxed">{selected.description}</p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-space-800/50 rounded-xl p-4">
                  <div className="text-space-400 text-xs mb-2">🎓 관련 대학/학과</div>
                  <ul className="space-y-1">
                    {selected.universities.map((u) => <li key={u} className="text-white text-sm">· {u}</li>)}
                  </ul>
                </div>
                <div className="bg-space-800/50 rounded-xl p-4">
                  <div className="text-space-400 text-xs mb-2">🛠 필요 기술/역량</div>
                  <div className="flex flex-wrap gap-1">
                    {selected.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-nebula-600/20 border border-nebula-500/30 rounded-full text-nebula-300 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-space-800/50 rounded-xl p-4">
                <div className="text-space-400 text-xs mb-1">🏢 주요 근무 기관</div>
                <div className="text-white text-sm">{selected.workEnv}</div>
              </div>

              <div className="mt-4 bg-space-800/50 rounded-xl p-4">
                <div className="text-space-400 text-xs mb-2">📌 관련 과목</div>
                <div className="flex gap-2">
                  {selected.relatedSubjects.map((s) => (
                    <span key={s} className="px-3 py-1 bg-aurora-600/20 border border-aurora-500/30 rounded-full text-aurora-300 text-sm">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Radar chart */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">📊 직업 역량 레이더</h3>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Radar name={selected.title} dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Salary comparison */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">💰 직업별 연봉 비교 (만원)</h3>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={salaryData} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
                  <Bar dataKey="연봉" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 glass rounded-2xl p-12 text-center">
            <div className="text-5xl mb-3">🔭</div>
            <div className="text-white font-semibold">직업을 선택하세요</div>
            <div className="text-space-400 text-sm mt-1">왼쪽 목록에서 탐구할 직업을 클릭하세요</div>
          </div>
        )}
      </div>

      {/* News */}
      <div className="glass rounded-2xl p-6 mt-6">
        <h2 className="text-white font-semibold mb-4">📰 진로 관련 최신 기사</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CAREER_NEWS.map((n) => (
            <div key={n.id} className="bg-space-800/50 rounded-xl p-4 hover:bg-space-800 transition-all cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  n.category === "천문학" ? "bg-aurora-500/20 text-aurora-400" :
                  n.category === "물리학" ? "bg-nebula-500/20 text-nebula-400" :
                  "bg-comet-500/20 text-comet-400"
                }`}>{n.category}</span>
                <span className="text-space-500 text-xs">{n.date}</span>
              </div>
              <p className="text-white text-sm font-medium leading-snug">{n.title}</p>
              <div className="flex items-center gap-1 mt-2 text-space-500 text-xs">
                <span>👁</span>
                <span>{n.views.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
