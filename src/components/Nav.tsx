"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "대시보드", icon: "🌌" },
  { href: "/planner", label: "플래너", icon: "📅" },
  { href: "/wrong-answers", label: "오답노트", icon: "📝" },
  { href: "/career", label: "진로탐구", icon: "🚀" },
  { href: "/highschool", label: "고교탐색", icon: "🏫" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌠</span>
          <span className="font-bold text-lg text-white">스터디 코스모스</span>
        </Link>
        <nav className="flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${path === n.href
                  ? "bg-nebula-600/30 text-nebula-300 glow-nebula"
                  : "text-space-400 hover:text-white hover:bg-white/5"
                }`}
            >
              <span>{n.icon}</span>
              <span className="hidden sm:inline">{n.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
