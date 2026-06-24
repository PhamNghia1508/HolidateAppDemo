---
name: JSX Closing Tag Pattern
description: Common pitfall when refactoring divs to custom components.
---

**Why:** When refactoring `<div className="...">` to `<SpatialCard glow="..." className="...">`, it is easy to update the opening tag but forget the closing tag, leaving `</div>` which causes a JSX parser error.

**How to apply:**
- Always grep for `</div>` after any component replacement sweep
- Prefer `</SpatialCard>` explicitly; custom components are not self-closing when they contain children
- Use unique indent patterns in the closing tag to make it grep-able
- When wrapping multiple divs, verify each pair independently

**Impact:** Mismatched tags cause Vite build errors at the exact line, but the error message may point to the wrong line due to parser recovery. Always check the last matching closing tag first.
