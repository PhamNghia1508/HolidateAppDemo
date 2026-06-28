# Visual Identity Overhaul — Kill the AI-gen look

## What & Why

GatherGo hiện tại trông như một shadcn/Tailwind template vì 4 nguyên nhân gốc rễ:
1. **Màu primary là blue-500 (#3B82F6)** — màu default của mọi AI UI tool, Tailwind, shadcn. Xuất hiện ở nav, mọi CTA, status pill, banner.
2. **`.page-label` uppercase tracking-wide gray** — pattern được copy từ Linear, Vercel, mọi React dashboard template trên GitHub.
3. **100% surface là white** với cùng border-radius 18-20px và cùng shadow — không có variation về depth hay warmth.
4. **Layout hoàn toàn symmetric** — mọi section cùng height, cùng card treatment, không có editorial tension.

Fix ở tầng CSS variables + global classes — không page-by-page, để thay đổi cascade tự động.

## Done looks like

- App có một màu signature riêng không giống bất kỳ app nào khác — không phải blue-500
- `.page-label` (uppercase gray tracking-wide) bị xóa hoặc redesign hoàn toàn
- Có ít nhất 3 loại surface khác nhau: light, warm-tinted, và dark (dùng cho hero moments)
- BottomNav active state dùng màu mới, không phải blue
- Home screen hero greeting lớn hơn, typography mạnh hơn
- Nhìn vào tổng thể thấy rõ "gu" — một hướng aesthetic cụ thể, không generic

## Out of scope

- Thêm tính năng mới
- Thay đổi layout structure (số columns, thứ tự sections)
- Thay đổi animation hay motion physics
- Font chữ mới (giữ Inter, chỉ cải thiện cách dùng)

## Design Direction: "Warm Ink"

Lấy cảm hứng từ aesthetic của Vietnamese editorial (Vietcetera, báo thanh niên mới), zine analog, và social energy của Saigon:

**New color palette:**
- Background: `#EEE6D4` — ấm hơn, có chiều sâu hơn ivory hiện tại, gần màu giấy báo/tạp chí
- Surface primary: `#F9F4EA` — warm white, không phải pure white
- Surface dark: `#1A0E07` — deep warm brown-black, dùng cho hero cards (plan context, vote panel, confirmed screen)
- Surface tinted: `#E8D8BC` — toasted warm, dùng cho secondary info cards
- Primary accent: `#C8371E` — Vietnamese lacquer red (đỏ sơn mài). Specific, opinionated, memorable. Thay thế hoàn toàn blue-500.
- Secondary accent: `#3D6B4F` — muted Vietnamese green, dùng cho "locked/success" states
- Text primary: `#1A0E07` — deep warm brown-black (ấm hơn slate-900)
- Text secondary: `#5C4033` — warm brown-gray
- Text muted: `#9C8470` — warm muted

**Typography signature:**
- Xóa `.page-label` uppercase pattern. Thay bằng eyebrow labels nhỏ hơn, lowercase, không all-caps
- Hero text (greeting, screen title) lớn hơn: 32-36px
- Numbers dùng tabular figures, editorial treatment (số lớn + label nhỏ dưới)

**Surface system (3 tiers):**
- **Light** (`#F9F4EA`): default cards, content areas
- **Tinted** (`#E8D8BC`): secondary cards, stats, contextual info — đây là cái đang thiếu
- **Dark** (`#1A0E07`): hero moments — plan context strip, vote panel header, confirmed celebration

**Border & shadow:**
- Border: `rgba(26,14,7,0.10)` — warm-tinted thay vì cold rgba(0,0,0,0.07)
- Card radius: giảm từ 18-20px xuống 14-16px — less bubble, more sophisticated
- Shadow: warm-tinted `rgba(26,14,7,0.08)` thay cold `rgba(0,0,0,0.05)`

## Steps

1. **Rewrite CSS variables trong `:root`** — thay toàn bộ color system, shadow system, border radius defaults. Update shadcn `--primary` sang màu lacquer red mới.

2. **Redesign global component classes** — `.page-label` → eyebrow lowercase style. `.premium-cta-mint` → dùng màu primary mới. `.status-pill.mint` → dùng màu primary mới. Thêm `.surface-tinted` và `.surface-dark` classes mới.

3. **Update BottomNav** — active color đổi sang primary mới. Nav indicator đổi shape/color.

4. **Update Home page** — tăng size hero greeting, đổi CTA button color/style, đổi urgency banner sang dark surface.

5. **Sweep toàn bộ trang** — tìm và thay tất cả hardcoded `#3B82F6`, `rgba(59,130,246,...)`, BLUE variable sang màu mới. Đổi urgency banner, vote panels, plan cards sang dùng dark surface thay vì blue gradient.

## Relevant files

- `client/src/index.css`
- `client/src/components/BottomNav.tsx`
- `client/src/pages/Home.tsx`
- `client/src/pages/Plan.tsx`
- `client/src/pages/Vote.tsx`
- `client/src/pages/Confirmed.tsx`
- `client/src/pages/Memories.tsx`
- `client/src/pages/Pet.tsx`
- `client/src/pages/Onboarding.tsx`
