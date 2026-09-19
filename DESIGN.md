# DESIGN SYSTEM — Nexro
**App:** Nexro, a mobile consumer app (Android + iOS, portrait 375–414px) that books verified household service professionals (electrician, plumber, cleaner, carpenter, painter, caregiver) sourced from local worker cooperatives, in India.  
**Personality:** Calm, trustworthy, modern, warm. NOT flashy, NOT corporate-cold, NOT cluttered. Think "a bank app's confidence" crossed with "a friendly local service." Every screen should feel like it belongs to the same product.

---

## COLOR TOKENS
- **Brand primary (Nexro Green):** `#12805C` — primary buttons, active nav, links, price highlights
- **Brand primary dark:** `#0B4F3A` — hero sections, splash background, dark headers
- **Brand primary light:** `#E4F5EC` — chip backgrounds, selected states, subtle highlight fills
- **AI / Signal accent (Signal Indigo):** `#5B4FE8` — reserved ONLY for AI-powered moments. Never used for ordinary buttons or nav.
- **AI accent light:** `#EDEBFF` — background for AI cards/chips
- **Surface / app background:** `#FAFAF8`
- **Card surface:** `#FFFFFF`
- **Border / divider:** `#E7E9E4`
- **Text primary (ink):** `#14181B`
- **Text secondary:** `#6B7280`
- **Rating star:** `#F5A623`
- **Discount / offer tag:** `#E14B4B`
- **Success:** `#12805C`
- **Error:** `#D64545`

---

## TYPOGRAPHY
- **Display / Headings / Buttons:** `"Plus Jakarta Sans"`, weights 600–800, rounded geometric sans, slightly bold — use for wordmark, hero text, section titles, CTAs
- **Body / UI / data-dense text:** `"Inter"`, weights 400–600 — use for descriptions, form fields, list items, prices, booking details
- Never use more than these two font families anywhere in the app

---

## SHAPE & SPACING
- **Card corner radius:** 20px
- **Button corner radius:** 16px (primary CTA can be full pill / 9999px)
- **Chip / badge corner radius:** full pill
- **Image-in-card corner radius:** 16px
- **Base spacing unit:** 8px grid (8/16/24/32)
- **Screen horizontal padding:** 20px

---

## ELEVATION & TEXTURE
- Flat design, very soft low-opacity shadows only (`0 4px 16px rgba(20,24,27,0.06)`)
- No heavy drop shadows, no skeuomorphism, no gradients except the two allowed: hero banner scrim and AI-card subtle gradient

---

## ICONOGRAPHY
- **Category grid:** Soft rounded-square chips (56x56px, radius 16px) in Brand primary light (`#E4F5EC`) background, containing a simple duotone flat icon
- **Navigation / utility icons:** Simple 2px outline line icons, ink-900 (`#14181B`) when active, ink-500 (`#6B7280`) when inactive

---

## PHOTOGRAPHY
- Bright, natural, warm-toned photography of real Indian homes and service professionals at work. Candid, not staged-corporate. NOT sepia/vintage-filtered.
- Worker photos: mid-shot, professional but approachable, visible cooperative uniform/ID where relevant

---

## COMPONENT CONVENTIONS
- **Rating display:** `★ 4.8 (327 jobs)` — amber star, bold rating, grey count in parens
- **Price display:** Original price strikethrough in grey + final price bold in ink, with a small pill tag `12% OFF` in discount-red when discounted
- **Verified badge:** Small rounded-pill badge, brand-green background, white checkmark-shield icon + `Cooperative Verified` label, 12px text
- **Primary CTA:** Full-width, brand-green, pill or 16px-radius button, white bold text, ONE primary CTA visible per screen — never two competing primary buttons
- **Bottom navigation:** 4 items max, icon + label, brand-green active state
- **Empty states:** Calm illustration + one short reassuring sentence + one clear action button — never apologetic or alarming tone

---

## AI VISIBILITY & SIGNAL INDIGO RULES
- **Home screen:** Dedicated AI problem card (`#EDEBFF` background, `#5B4FE8` headline and mic icon: *"Not sure what you need? Just tell us."*).
- **AI Problem intake screen:** Signal Indigo active focus border, natural language problem description input.
- **Worker matching results screen:** Explainable AI chips under each worker: `✓ Skill match`, `✓ Available 5PM`, `✓ 1.4km away` in Signal Indigo outline chips.
- **Emergency booking:** High-priority AI dispatch indicator: `⚡ AI Priority Dispatch`.
- **Search bar:** Stays neutral brand green — keyword search is NOT branded as AI.
