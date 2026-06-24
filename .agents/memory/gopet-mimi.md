---
name: GoPet Mimi SVG
description: Animated cat SVG with CSS keyframe animations for blinking, floating, tail-wagging, breathing, and ear wiggling.
---

**Why:** Inline SVG allows precise CSS animation control over individual elements (eyes, ears, tail, body) without external assets.

**Animations:**
- `blink`: `scaleY(1)` → `scaleY(0.1)` → `scaleY(1)` on eyes, duration 3s, delay 1s
- `float`: `translateY(0)` → `translateY(-8px)` → `translateY(0)`, 3s ease-in-out infinite
- `tail-wag`: `rotate(-5deg)` ↔ `rotate(5deg)`, 2s ease-in-out infinite, transform-origin center
- `breathe`: `scaleY(1)` → `scaleY(1.03)` → `scaleY(1)`, 4s ease-in-out infinite
- `ear-wiggle-left`: `rotate(0)` → `rotate(-10deg)` → `rotate(0)`, 2.5s ease-in-out infinite
- `ear-wiggle-right`: `rotate(0)` → `rotate(10deg)` → `rotate(0)`, 2.5s ease-in-out infinite, delay 0.2s

**Energy Bar:**
- Animated gradient background with `shimmer` keyframe
- Sparkle burst effect on feed using `energy-sparkle` animation
- Staggered 5–10 sparkles per burst

**How to apply:** All animations are pure CSS keyframes in `index.css`, applied via Tailwind classes to SVG elements. No JS animation loop needed.
