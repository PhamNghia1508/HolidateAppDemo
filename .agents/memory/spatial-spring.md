---
name: SpatialCard & SpringButton
description: Reusable Framer Motion components for VisionOS-style spatial cards and spring-animated buttons.
---

**SpatialCard:**
- Wraps children with `motion.div` using spring transition: `type: "spring", stiffness: 300, damping: 25`
- Entry animation: `scale: 0.96 → 1`, `y: 8 → 0`
- Glow variants: `sage` (border-sage/40), `coral` (border-coral/40), `none` (no glow)
- Inner border glow: pseudo-element or box-shadow inset
- Gradient shadow: `box-shadow: 0 8px 32px -8px rgba(74, 124, 89, 0.15)` for sage

**SpringButton:**
- `motion.button` with `whileHover: { scale: 1.03 }`, `whileTap: { scale: 0.97 }`
- Spring transition: `type: "spring", stiffness: 400, damping: 17`
- Variants: `gradient` (default coral-sage), `outline` (border + transparent), `ghost` (text only)
- `fullWidth` prop for 100% width

**How to apply:** Import from `@/components/SpatialCard` and `@/components/SpringButton`. Use `glow` prop on SpatialCard for category. Always use closing tag `</SpatialCard>` not `</div>`.
