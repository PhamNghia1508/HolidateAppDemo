import { useEffect, useState } from "react";

const COLORS = ["#e76f51", "#f4a261", "#e9c46a", "#2a9d8f", "#4a7c59", "#e8b4b8", "#f8e8d8"];

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
        left: 10 + Math.random() * 80,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        size: 6 + Math.random() * 10,
        rotation: Math.random() * 360,
        shape: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as any,
      }));
      setPieces(newPieces);
      const timer = setTimeout(() => setPieces([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
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
            transform: `rotate(${p.rotation}deg)`,
            ["--duration" as string]: `${p.duration}s`,
            ["--delay" as string]: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
