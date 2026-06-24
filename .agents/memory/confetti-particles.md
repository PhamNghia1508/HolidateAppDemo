---
name: Confetti & Particles
description: Celebration effects for aha moments and ambient magical particles for GoPet ecosystem.
---

**Confetti:**
- 40 pieces with random colors (sage, coral, yellow, pink, teal, lavender)
- Random shapes: circle, square, triangle
- Duration: 3s with staggered delays
- Triggered: `Confirmed` page on load, `Vote` page when 100% vote reached
- Uses `confetti-fall` keyframe in CSS

**MagicalParticles:**
- Two layers: `firefly-drift` (slow ambient, 6-8s) and `particle-float` (faster, 3-4s)
- Colors: sage, coral, yellow, pink, white
- Sizes: 2px–6px, opacity 0.3–0.7
- Positioned absolutely behind GoPet card
- 30 particles total, random positions

**How to apply:** Import components from `@/components/Confetti` and `@/components/MagicalParticles`. Mount conditionally based on state. Use `isVisible` prop to control visibility.
