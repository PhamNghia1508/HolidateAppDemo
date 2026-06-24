export default function MagicalParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${3 + Math.random() * 3}s`,
    size: 2 + Math.random() * 4,
    isFirefly: i % 3 === 0,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {particles.map((p) =>
        p.isFirefly ? (
          <div
            key={p.id}
            className="firefly"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
              ['--drift-x' as string]: `${(Math.random() - 0.5) * 120}px`,
              ['--drift-y' as string]: `${-40 - Math.random() * 80}px`,
            }}
          />
        ) : (
          <div
            key={p.id}
            className="particle-glow"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        )
      )}
    </div>
  );
}
