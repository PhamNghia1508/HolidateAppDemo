import { useEffect, useState } from "react";

const COLORS = ["#3B82F6", "#8B5CF6", "#F59E0B", "#EC4899", "#10B981", "#F43F5E", "#06B6D4"];

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  shape: "circle" | "square" | "triangle";
}

export default function Confetti({ trigger }: { trigger: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger) {
      const newPieces: ConfettiPiece[] = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.6,
        duration: 2.5 + Math.random() * 2,
        size: 6 + Math.random() * 10,
        rotation: Math.random() * 360,
        shape: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as any,
      }));
      setPieces(newPieces);
      const timer = setTimeout(() => setPieces([]), 6000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (pieces.length === 0) return null;

  return (
    /* absolute within the page's overflow-hidden container — never bleeds outside app */
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 9999, overflow: "hidden" }}
    >
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            top: "-10px",
            backgroundColor: p.color,
            width: p.size,
            height: p.shape === "triangle" ? p.size * 0.8 : p.size,
            borderRadius: p.shape === "circle" ? "50%" : p.shape === "square" ? "2px" : "0",
            clipPath: p.shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
            ["--rot" as string]: `${p.rotation}deg`,
            ["--duration" as string]: `${p.duration}s`,
            ["--delay" as string]: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
