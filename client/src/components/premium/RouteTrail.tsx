import React from "react";

const T1 = "#1A0E07";
const T2 = "#5C4033";

export function RouteTrail({ stops, color, compact = false }: { stops: string[]; color: string; compact?: boolean }) {
  return (
    <div className="flex items-center overflow-hidden">
      {stops.map((stop, i) => (
        <div key={i} className="flex items-center min-w-0">
          <div className="flex-shrink-0" style={{
            width: i === 0 ? 7 : 5,
            height: i === 0 ? 7 : 5,
            borderRadius: "50%",
            background: i === 0 ? color : `${color}70`,
            boxShadow: i === 0 ? `0 0 0 2px ${color}22` : "none",
          }} />
          {!compact && (
            <span className="text-xs font-semibold px-1 truncate max-w-[68px]"
              style={{ color: i === 0 ? T1 : T2 }}>
              {stop}
            </span>
          )}
          {i < stops.length - 1 && (
            <div className="flex-shrink-0" style={{
              width: compact ? 14 : 10,
              height: 1,
              background: `${color}35`,
              marginLeft: compact ? 2 : 0,
              marginRight: compact ? 2 : 0,
            }} />
          )}
        </div>
      ))}
    </div>
  );
}
