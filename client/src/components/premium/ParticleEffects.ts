import confetti from "canvas-confetti";

// Elegant colors: Gold, Rose Gold, Slate, and Pure White
const premiumColors = ["#D4AF37", "#B76E79", "#E2E8F0", "#FFFFFF"];
const heartColors = ["#EF4444", "#F43F5E", "#E11D48"];

export const triggerHaptic = (duration: number = 15) => {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    // 15ms is a light tap on Android. iOS Safari doesn't strictly support navigator.vibrate, 
    // but on Android/PWA this gives a highly premium feel.
    navigator.vibrate(duration);
  }
};

export const triggerConfettiExplosion = (clientX?: number, clientY?: number) => {
  triggerHaptic(30); // Stronger haptic for "Chốt Lịch"
  
  // If coordinates provided, burst around the button, else default bottom corners
  if (clientX !== undefined && clientY !== undefined) {
    const x = clientX / window.innerWidth;
    const y = clientY / window.innerHeight;
    
    // Sparkle Dust effect
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { x, y },
      colors: premiumColors,
      disableForReducedMotion: true,
      zIndex: 1000,
      gravity: 0.6,
      scalar: 0.8,
      ticks: 100
    });
  } else {
    // Fallback if no coordinates
    confetti({
      particleCount: 80,
      spread: 120,
      origin: { x: 0.5, y: 1 },
      colors: premiumColors,
      zIndex: 1000,
    });
  }
};

export const triggerHeartBurst = (clientX: number, clientY: number) => {
  triggerHaptic(15); // Light tap for Heart
  
  const scalar = 1.5;
  const heartPath = confetti.shapeFromPath({ path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z' });

  // Convert pixel coordinates to 0-1 ratio
  const x = clientX / window.innerWidth;
  const y = clientY / window.innerHeight;

  confetti({
    spread: 60,
    startVelocity: 30,
    particleCount: 15,
    origin: { x, y },
    colors: heartColors,
    shapes: [heartPath],
    scalar,
    disableForReducedMotion: true,
    zIndex: 1000,
    gravity: 0.8,
    ticks: 150,
  });
  
  // Follow up scattered hearts
  setTimeout(() => {
    confetti({
      spread: 80,
      startVelocity: 20,
      particleCount: 10,
      origin: { x, y },
      colors: ["#FDA4AF", "#FFE4E6"], // Softer pink/white hearts
      shapes: [heartPath],
      scalar: 1,
      disableForReducedMotion: true,
      zIndex: 1000,
      gravity: 0.5,
      ticks: 200,
    });
  }, 100);
};
