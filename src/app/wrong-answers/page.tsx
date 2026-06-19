"use client";
import { useState, useRef } from "react";
import { WRONG_ANSWERS, SUBJECTS } from "@/lib/mockData";
import type { WrongAnswer } from "@/lib/types";

const DIFF_LABEL = ["", "⭐ 쉬움", "⭐⭐ 보통", "⭐⭐⭐ 어려움"] as const;
const DIFF_COLOR = ["", "text-comet-400", "text-star-400", "text-mars-400"] as const;

export default function WrongAnswersPage() {
  const [items, setItems] = useState<WrongAnswer[]>(WRONG_ANSWERS);
  const [filter, setFilter] = useState<string>("전체");
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ subject: "수학", problem: "", memo: "", tags: "", difficulty: 2 as 1 | 2 | 3 });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const subjects = ["전체", ...SUBJECTS.map((s) => s.name)];
  const filtered = filter === "전체" ? items : items.filter((i) => i.subject === filter);
  const unsolved = items.filter((i) => !i.solved).length;

  const toggleSolved = (id: string) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, solved: !i.solved } : i));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const addItem = () => {
    if (!newItem.problem) return;
    const subj = SUBJECTS.find((s) => s.name === newItem.subject);
    setItems((prev) => [...prev, {
      id: Date.now().toString(),
      subject: newItem.subject,
      subjectColor: subj?.color ?? "#8b5cf6",
      date: "2026-06-19",
      problem: newItem.problem,
      memo: newItem.memo,
      tags: newItem.tags.split(",").map((t) => t.trim()).filter(Boolean),
      solved: false,
      difficulty: newItem.difficulty,
      imageUrl: previewImage ?? undefined,
    }]);
    setNewItem({ subject: "수학", problem: "", memo: "", tags: "", difficulty: 2 });
    setPreviewImage(null);
    setShowAdd(false);
  };

  const stats = SUBJECTS.map((s) => ({
    name: s.name, color: s.color,
    total: items.filter((i) => i.subject === s.name).length,
    unsolved: items.filter((i) => i.subject === s.name && !i.solved).length,
  })).filter((s) => s.total > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">📝 오답노트</h1>
          <p className="text-space-400 text-sm mt-0.5">총 {items.length}개 · 미해결 <span className="text-mars-400 font-semibold">{unsolved}개</span></p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-nebula-600 hover:bg-nebula-500 rounded-xl text-white text-sm font-medium transition-all">
          + 오답 추가
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <div key={s.name} className="glass rounded-xl p-3" style={{ borderLeft: `3px solid ${s.color}` }}>
            <div className="text-white font-semibold">{s.name}</div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-mars-400">{s.unsolved}</span>
              <span className="text-space-400 text-xs">/{s.total}개 미해결</span>
            </div>
            <div className="h-1 bg-space-700 rounded mt-2 overflow-hidden">
              <div className="h-full rounded" style={{ width: `${((s.total - s.unsolved) / s.total) * 100}%`, background: s.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {subjects.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${filter === s ? "bg-nebula-600 text-white" : "glass text-space-300 hover:text-white"}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="glass rounded-2xl p-6 mb-6 border border-nebula-500/30 fade-in">
          <h3 className="text-white font-semibold mb-4">📌 오답 기록</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-space-400 text-xs block mb-1">과목</label>
                <select value={newItem.subject} onChange={(e) => setNewItem((p) => ({ ...p, subject: e.target.value }))}
                  className="w-full bg-space-800 border border-space-600 rounded-lg px-3 py-2 text-white text-sm">
                  {SUBJECTS.map((s) => <option key={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-space-400 text-xs block mb-1">틀린 문제 / 개념</label>
                <textarea value={newItem.problem} onChange={(e) => setNewItem((p) => ({ ...p, problem: e.target.value }))}
                  placeholder="어떤 문제를 틀렸나요?" rows={3}
                  className="w-full bg-space-800 border border-space-600 rounded-lg px-3 py-2 text-white text-sm resize-none" />
              </div>
              <div>
                <label className="text-space-400 text-xs block mb-1">풀이 메모</label>
                <textarea value={newItem.memo} onChange={(e) => setNewItem((p) => ({ ...p, memo: e.target.value }))}
                  placeholder="올바른 풀이법, 공식, 핵심 개념..." rows={3}
                  className="w-full bg-space-800 border border-space-600 rounded-lg px-3 py-2 text-white text-sm resize-none" />
              </div>
              <div>
                <label className="text-space-400 text-xs block mb-1">태그 (쉼표로 구분)</label>
                <input value={newItem.tags} onChange={(e) => setNewItem((p) => ({ ...p, tags: e.target.value }))}
                  placeholder="미적분, 극한, 기출" className="w-full bg-space-800 border border-space-600 rounded-lg px-3 py-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-space-400 text-xs block mb-2">난이도</label>
                <div className="flex gap-2">
                  {([1, 2, 3] as const).map((d) => (
                    <button key={d} onClick={() => setNewItem((p) => ({ ...p, difficulty: d }))}
                      className={`flex-1 py-2 rounded-lg text-sm transition-all ${newItem.difficulty === d ? "bg-star-500/30 text-star-400 border border-star-500/40" : "glass text-space-400 hover:text-white"}`}>
                      {DIFF_LABEL[d]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="text-space-400 text-xs block mb-2">문제 사진 첨부</label>
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-space-600 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:border-nebula-500 transition-all overflow-hidden">
                {previewImage ? (
                  <img src={previewImage} alt="preview" className="w-full h-full object-contain" />
                ) : (
                  <>
                    <span className="text-4xl mb-2">📷</span>
                    <span className="text-space-400 text-sm">클릭해서 사진 선택</span>
                    <span className="text-space-500 text-xs mt-1">JPG, PNG, HEIC</span>
                  </>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              {previewImage && (
                <button onClick={() => setPreviewImage(null)} className="mt-2 text-xs text-space-400 hover:text-mars-400">× 사진 제거</button>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={addItem} className="flex-1 bg-nebula-600 hover:bg-nebula-500 text-white rounded-xl py-2.5 text-sm font-medium">저장</button>
            <button onClick={() => { setShowAdd(false); setPreviewImage(null); }} className="flex-1 glass text-space-300 hover:text-white rounded-xl py-2.5 text-sm">취소</button>
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className={`glass rounded-2xl p-5 transition-all ${item.solved ? "opacity-60" : ""}`}
            style={{ borderLeft: `4px solid ${item.subjectColor}` }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-xs text-white font-medium" style={{ background: item.subjectColor + "40", color: item.subjectColor }}>{item.subject}</span>
                <span className={`text-xs ${DIFF_COLOR[item.difficulty]}`}>{DIFF_LABEL[item.difficulty]}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-space-500 text-xs">{item.date}</span>
                <button onClick={() => toggleSolved(item.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${item.solved ? "bg-comet-500/20 text-comet-400 border border-comet-500/30" : "glass text-space-400 hover:text-white border border-space-600"}`}>
                  {item.solved ? "✓ 해결" : "미해결"}
                </button>
              </div>
            </div>

            {item.imageUrl && (
              <div className="mb-3 rounded-lg overflow-hidden border border-space-700">
                <img src={item.imageUrl} alt="문제" className="w-full max-h-40 object-contain bg-space-900" />
              </div>
            )}

            <p className="text-white text-sm font-medium mb-2">{item.problem}</p>
            {item.memo && (
              <div className="bg-space-800/50 rounded-lg p-3 mb-3">
                <div className="text-xs text-space-400 mb-1">💡 풀이 포인트</div>
                <p className="text-space-200 text-sm">{item.memo}</p>
              </div>
            )}
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-space-800 text-space-400 rounded-full text-xs">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass rounded-2xl p-16 text-center">
          <div className="text-5xl mb-3">🎉</div>
          <div className="text-white font-semibold">오답이 없어요!</div>
          <div className="text-space-400 text-sm mt-1">모든 문제를 완벽하게 이해했군요.</div>
        </div>
      )}
    </div>
  );
}
