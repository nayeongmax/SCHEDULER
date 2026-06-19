"use client";
import { useEffect, useRef } from "react";

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const count = 80;
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 2 + 1;
      star.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}vw; top:${Math.random() * 100}vh;
        animation-duration:${2 + Math.random() * 4}s;
        animation-delay:${Math.random() * 4}s;
        opacity:${0.2 + Math.random() * 0.8};
      `;
      container.appendChild(star);
    }
    return () => { container.innerHTML = ""; };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
}
