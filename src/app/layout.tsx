import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import StarField from "@/components/StarField";

export const metadata: Metadata = {
  title: "스터디 코스모스 | 중3 → 고1 완벽 대비",
  description: "시험 플래너 · 오답노트 · 진로탐구 · 고교탐색 올인원 스터디 플랫폼",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" rel="stylesheet" />
      </head>
      <body className="min-h-screen">
        <StarField />
        <Nav />
        <main className="pt-16 pb-8">{children}</main>
      </body>
    </html>
  );
}
