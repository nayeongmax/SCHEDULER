"use client";
import { useState } from "react";
import { HIGH_SCHOOLS } from "@/lib/mockData";
import type { HighSchool } from "@/lib/types";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const TYPES = ["전체", "영재학교", "자사고", "외고", "일반고"];
const REGIONS = ["전체", "서울", "경기", "대전", "부산", "강원"];

type SortKey = "suneungAvg" | "skyRate" | "univAdmissionRate" | "studentCount" | "rating";

export default function HighSchoolPage() {
  const [typeFilter, setTypeFilter] = useState("전체");
  const [regionFilter, setRegionFilter] = useState("전체");
  const [sciFilter, setSciFilter] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("suneungAvg");
  const [selected, setSelected] = useState<HighSchool | null>(HIGH_SCHOOLS[0]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [tab, setTab] = useState<"list" | "compare">("list");

  const filtered = HIGH_SCHOOLS
    .filter((h) => typeFilter === "전체" || h.type === typeFilter)
    .filter((h) => regionFilter === "전체" || h.region === regionFilter)
    .filter((h) => !sciFilter || h.scienceSpecial)
    .sort((a, b) => (b[sortKey] ?? 0) - (a[sortKey] ?? 0));

  const toggleCompare = (id: string) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const compareSchools = HIGH_SCHOOLS.filter((h) => compareList.includes(h.id));

  const getRadarData = (h: HighSchool) => [
    { subject: "수능점수", value: h.suneungAvg ?? 0 },
    { subject: "대입률", value: h.univAdmissionRate ?? 0 },
    { subject: "SKY율×2", value: (h.skyRate ?? 0) * 1.5 },
    { subject: "동아리수", value: Math.min(h.clubCount * 1.5, 100) },
    { subject: "교사비율", value: Math.min((h.teacherCount / h.studentCount) * 1500, 100) },
  ];

  const compareBarData = compareSchools.map((h) => ({
    name: h.name.replace("고등학교", "고").replace("학교", ""),
    수능: h.suneungAvg ?? 0,
    SKY율: h.skyRate ?? 0,
    대입률: h.univAdmissionRate ?? 0,
  }));

  const COLORS = ["#8b5cf6", "#06b6d4", "#f59e0b"];

  const typeColor: Record<string, string> = {
    영재학교: "bg-star-500/20 text-star-400 border-star-500/30",
    자사고: "bg-nebula-500/20 text-nebula-400 border-nebula-500/30",
    외고: "bg-aurora-500/20 text-aurora-400 border-aurora-500/30",
    일반고: "bg-space-600/30 text-space-300 border-space-600/30",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">🏫 고교탐색</h1>
          <p className="text-space-400 text-sm mt-0.5">전국 고등학교 데이터 기반 비교 분석 (학교알리미 참고)</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setTab("list")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === "list" ? "bg-nebula-600 text-white" : "glass text-space-300 hover:text-white"}`}>
            목록
          </button>
          <button onClick={() => setTab("compare")} disabled={compareList.length < 2}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === "compare" ? "bg-aurora-600 text-white" : "glass text-space-300 hover:text-white disabled:opacity-40"}`}>
            비교 {compareList.length > 0 && `(${compareList.length})`}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-4 mb-4 space-y-3">
        <div className="flex gap-2 flex-wrap">
          <span className="text-space-400 text-sm self-center">유형:</span>
          {TYPES.map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${typeFilter === t ? "bg-nebula-600 text-white" : "glass text-space-300 hover:text-white"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-space-400 text-sm self-center">지역:</span>
          {REGIONS.map((r) => (
            <button key={r} onClick={() => setRegionFilter(r)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${regionFilter === r ? "bg-aurora-600 text-white" : "glass text-space-300 hover:text-white"}`}>
              {r}
            </button>
          ))}
          <label className="flex items-center gap-2 cursor-pointer ml-2">
            <div className={`w-10 h-5 rounded-full transition-all ${sciFilter ? "bg-comet-500" : "bg-space-700"} relative`}
              onClick={() => setSciFilter((p) => !p)}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${sciFilter ? "left-5" : "left-0.5"}`} />
            </div>
            <span className="text-space-300 text-sm">과학 특성화</span>
          </label>
          <span className="text-space-400 text-sm ml-2">정렬:</span>
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="bg-space-800 border border-space-600 rounded-lg px-2 py-1 text-white text-sm">
            <option value="suneungAvg">수능 평균</option>
            <option value="skyRate">SKY 진학률</option>
            <option value="univAdmissionRate">대입 성공률</option>
            <option value="rating">평점</option>
          </select>
        </div>
      </div>

      {tab === "list" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* School List */}
          <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-1">
            {filtered.map((h, idx) => (
              <div key={h.id}
                className={`glass rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.01] ${selected?.id === h.id ? "border border-nebula-500/50 glow-nebula" : "border border-transparent"}`}
                onClick={() => setSelected(h)}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-space-500 text-xs font-mono">#{idx + 1}</span>
                    <span className="text-white font-semibold text-sm">{h.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${typeColor[h.type]}`}>{h.type}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleCompare(h.id); }}
                      className={`w-6 h-6 rounded-full border text-xs flex items-center justify-center transition-all ${compareList.includes(h.id) ? "bg-aurora-500 border-aurora-500 text-white" : "border-space-600 text-space-400 hover:border-aurora-400 hover:text-aurora-400"}`}>
                      {compareList.includes(h.id) ? "✓" : "+"}
                    </button>
                  </div>
                </div>
                <div className="text-space-400 text-xs mb-2">{h.region} · {h.dormitory ? "기숙사O" : "기숙사X"}</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xs text-space-500">수능</div>
                    <div className="text-sm font-bold text-star-400">{h.suneungAvg ?? "–"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-space-500">SKY율</div>
                    <div className="text-sm font-bold text-nebula-400">{h.skyRate ?? "–"}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-space-500">대입</div>
                    <div className="text-sm font-bold text-comet-400">{h.univAdmissionRate ?? "–"}%</div>
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`flex-1 h-1 rounded-sm ${i < Math.floor(h.rating) ? "bg-star-400" : "bg-space-700"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Detail */}
          {selected && (
            <div className="lg:col-span-2 space-y-4">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold text-white">{selected.name}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${typeColor[selected.type]}`}>{selected.type}</span>
                    </div>
                    <p className="text-space-400 text-sm">{selected.region} {selected.district} · {selected.address}</p>
                  </div>
                  <div className="flex items-center gap-1 text-star-400">
                    {"★".repeat(Math.floor(selected.rating))}
                    <span className="text-white font-bold ml-1">{selected.rating}</span>
                  </div>
                </div>

                {/* Key stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "수능 백분위", value: `${selected.suneungAvg ?? "–"}`, unit: "점", color: "text-star-400", bg: "bg-star-500/10 border-star-500/20" },
                    { label: "SKY 진학률", value: `${selected.skyRate ?? "–"}`, unit: "%", color: "text-nebula-400", bg: "bg-nebula-500/10 border-nebula-500/20" },
                    { label: "대학 합격률", value: `${selected.univAdmissionRate ?? "–"}`, unit: "%", color: "text-comet-400", bg: "bg-comet-500/10 border-comet-500/20" },
                  ].map((s) => (
                    <div key={s.label} className={`border rounded-xl p-3 text-center ${s.bg}`}>
                      <div className={`text-2xl font-bold ${s.color}`}>{s.value}<span className="text-sm">{s.unit}</span></div>
                      <div className="text-space-400 text-xs mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-center">
                  {[
                    { label: "전교생수", value: `${selected.studentCount}명` },
                    { label: "교사수", value: `${selected.teacherCount}명` },
                    { label: "학급수", value: `${selected.classCount}개` },
                    { label: "동아리", value: `${selected.clubCount}개` },
                  ].map((s) => (
                    <div key={s.label} className="bg-space-800/50 rounded-lg p-2">
                      <div className="text-white font-bold">{s.value}</div>
                      <div className="text-space-400 text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selected.scienceSpecial && <span className="px-3 py-1 bg-aurora-600/20 border border-aurora-500/30 rounded-full text-aurora-300 text-xs">⚡ 과학특성화</span>}
                  {selected.mathSpecial && <span className="px-3 py-1 bg-nebula-600/20 border border-nebula-500/30 rounded-full text-nebula-300 text-xs">∑ 수학특성화</span>}
                  {selected.dormitory && <span className="px-3 py-1 bg-comet-600/20 border border-comet-500/30 rounded-full text-comet-300 text-xs">🏠 기숙사</span>}
                  {selected.internationalExchange && <span className="px-3 py-1 bg-star-600/20 border border-star-500/30 rounded-full text-star-300 text-xs">🌍 국제교류</span>}
                </div>

                <div className="bg-space-800/50 rounded-xl p-4">
                  <div className="text-space-400 text-xs mb-2">✨ 주요 특징</div>
                  <div className="grid grid-cols-2 gap-1">
                    {selected.features.map((f) => (
                      <div key={f} className="text-space-200 text-sm">· {f}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Radar */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">📊 역량 레이더</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={getRadarData(selected)}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <Radar name={selected.name} dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Compare mode */
        <div className="space-y-6">
          {compareSchools.length < 2 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="text-4xl mb-2">⚖️</div>
              <div className="text-white font-semibold">학교를 2개 이상 선택하세요</div>
              <div className="text-space-400 text-sm mt-1">목록 탭에서 + 버튼으로 최대 3개까지 선택 가능</div>
            </div>
          ) : (
            <>
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${compareSchools.length}, 1fr)` }}>
                {compareSchools.map((h, i) => (
                  <div key={h.id} className="glass rounded-2xl p-5" style={{ borderTop: `3px solid ${COLORS[i]}` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                      <div className="text-white font-bold">{h.name}</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      {[
                        ["유형", h.type],
                        ["지역", h.region],
                        ["수능 백분위", `${h.suneungAvg ?? "–"}점`],
                        ["SKY 진학률", `${h.skyRate ?? "–"}%`],
                        ["전체 대입", `${h.univAdmissionRate ?? "–"}%`],
                        ["학생 수", `${h.studentCount}명`],
                        ["기숙사", h.dormitory ? "있음" : "없음"],
                        ["과학특성화", h.scienceSpecial ? "✓" : "–"],
                        ["동아리 수", `${h.clubCount}개`],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-space-400">{k}</span>
                          <span className="text-white font-medium">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">📊 핵심 지표 비교</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={compareBarData} margin={{ left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                    <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" }} />
                    <Legend wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }} />
                    <Bar dataKey="수능" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="SKY율" fill="#06b6d4" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="대입률" fill="#10b981" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">🎯 나에게 맞는 학교는?</h3>
                <div className="space-y-3">
                  {[
                    { label: "수학·과학 최강자라면", recommend: compareSchools.sort((a,b) => (b.skyRate??0)-(a.skyRate??0))[0]?.name, reason: "SKY 진학률 최고" },
                    { label: "기숙사 생활 원한다면", recommend: compareSchools.filter(h=>h.dormitory)[0]?.name ?? "해당 없음", reason: "기숙사 제공" },
                    { label: "과학 특성화를 원한다면", recommend: compareSchools.filter(h=>h.scienceSpecial)[0]?.name ?? "해당 없음", reason: "과학 특성화 학교" },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between p-3 bg-space-800/50 rounded-xl">
                      <span className="text-space-300 text-sm">{r.label}</span>
                      <div className="text-right">
                        <div className="text-white font-semibold text-sm">{r.recommend}</div>
                        <div className="text-space-400 text-xs">{r.reason}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
