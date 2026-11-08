# My Lash Girl Beauty Studio: design spec

Read alongside `AGENTS.md` (build standard) and `research/BRIEF.md` (facts and sources). Everything below is decided; build it as written. If a fact is not in this file or the brief, do not invent it.

The business name is **My Lash Girl Beauty Studio** (short: My Lash Girl). The repo name "my-lashes-girl" is a typo; never show "Lashes" on the site.

## 1. The business in three sentences

- A calm, appointment-only lash studio on the 12th floor of 274 Madison Avenue, a short walk from Grand Central, where one experienced artist designs each set for the client's eye shape.
- Visitors are Midtown women, many Chinese-speaking, comparing styles and prices on their phones before booking.
- They should pick a style, see its price, and book on Square in two taps, or call or ask about the mobile service.

## 2. The idea: "The lash map"

Lash artists plan each set on a mapping diagram: an eye outline split into zones, each zone labeled with a lash length in millimetres and a curl. The studio's own pitch is "custom lash designs for your unique eye shape", so the map is the visual system.

- A reusable SVG `LashMap` component draws a closed-eye curve (matching the logo's closed eye) with 5 zones fanning out, thin ink lash strokes whose lengths follow a per-style length array, and small mono-style annotations ("9", "10", "11", "12", "10" mm) above each zone, with hairline leader lines. Each lash style has its own map data, so Natural looks short and soft, Anime looks spiky with clustered spikes, Volume looks dense.
- Typography and layout borrow from a technician's spec sheet: hairline rules, small annotations, generous paper, numbers set precisely, measurements next to prices.
- Bilingual 中文 / English with a language toggle (the repo specifies Chinese).

Logo-swap test: the per-style lash maps with millimetre annotations, the 12th-floor Madison Avenue address and the Square menu belong only to this studio.

## 3. Type

- Display Latin: **Instrument Serif** (`next/font/google`, 400 and italic). Hero headline `clamp(3.6rem, 9vw, 9.5rem)`, line-height 0.9, tracking -0.01em.
- Text and annotations: **Plus Jakarta Sans** (`next/font/google`, 400, 500, 600). Body 1.0625rem / 1.65. Annotation style: 0.72rem, uppercase, letter-spacing 0.16em, weight 600, tabular numbers (`font-variant-numeric: tabular-nums`).
- Chinese: system CJK stack, no web font download: `"PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif` appended to both font stacks. When `lang` is `zh`, headings use the sans stack weight 500 at about 0.8x the Latin display size (serif Latin display looks wrong next to CJK), keep the italic serif only for Latin accents such as prices and "mm".
- Wordmark: recreate the logo lettering as live text: "MY LASH GIRL" in Plus Jakarta Sans 300, letter-spacing 0.22em, with "BEAUTY STUDIO" small beneath, plus an inline SVG closed-eye mark (curved lid line, lashes fanning down-right, brow arc above) on a nude circle. Do not use the JPG.

## 4. Color tokens (Tailwind `theme.extend.colors.m`)

| Token | Hex | Role |
|---|---|---|
| `paper` | `#FAF6F1` | Canvas |
| `nude` | `#E9D8CC` | Primary brand (the logo circle). Full-section backgrounds, map zones |
| `ink` | `#1B1616` | Primary text, lash strokes, dark sections, primary button |
| `clay` | `#9C5B4D` | Supplemental accent: prices, active toggle, focus ring, small highlights. Passes AA on paper (about 5:1) |
| `mute` | `#6E625C` | Muted text on paper and nude |
| `rule` | `rgba(27,22,22,.16)` | Hairlines |

Section background sequence on the homepage: paper (hero) → nude → paper → ink → nude → paper → ink footer. No gradients, no glass, no blobs, no rounded cards. Radius 0 except buttons (999px pills are allowed ONLY for the two primary CTAs; everything else square). Text on nude is ink or mute (check mute on nude ≥ 4.5:1; if not, use ink).

## 5. Photography

Files in `public/images/` (real posts from the studio's Instagram, small: 360 to 524px wide, so NEVER display them larger than about 520px CSS width at 1x; use them as tall narrow frames and details, not full-bleed):

| File | Size | Content | Use |
|---|---|---|---|
| `eye-portrait.jpg` | 508×640 | Client covering nose and mouth, eyes with finished lashes looking at camera | Hero frame |
| `eye-closeup-pair.jpg` | 481×640 | Two stacked extreme close-ups of one eye with wispy lashes | Styles detail |
| `natural-trio.jpg` | 515×640 | Three stacked natural-set eyes | Natural style |
| `before-after-1.jpg` | 483×640 | Before (top) and after (bottom), "my lash Girl" watermark | Before/after |
| `anime-before-after.jpg` | 524×640 | Before/after collage labeled "Anime set" | Anime style |
| `before-after-2.jpg` | 482×640 | Before (top) / after (bottom) | Before/after |
| `client-chair.jpg` | 360×640 | Client lying on the pink lash bed after a set | About / visit |

Treatment: all photos share a subtle warm grade `filter: saturate(.92) contrast(1.03)`, sharp corners, a 1px rule frame and an annotation caption below (e.g. `ANIME SET · AFTER`). Alt text describes the lashes, never names clients. `next/image` with explicit `width`/`height` from the table.

## 6. Pages and sections

Routes (replace template `src/app/pages/*`, delete the template folder):

`/` · `/styles` · `/menu` · `/about` · `/visit`

Nav: Styles 款式, Menu 价目, About 关于, Visit 到店. Primary nav CTA: **Book** / **预约** (Square). Language toggle `EN / 中文` in the nav.

### Home `/`
1. **Hero (paper).** Asymmetric 7/5. Left: annotation row `274 MADISON AVE · SUITE 1205 · 12TH FLOOR`; headline from her own words: "Lashes designed for your eye shape." (中文: "为你的眼型设计的睫毛。"); one line: "Custom lash sets by an artist with 8 years of experience, a short walk from Grand Central."; CTAs: **Book on Square** (primary ink pill) + text link "See styles and prices" → /styles. Below CTAs a proof line: "4.9 on ClassPass · 100+ ratings" linked to the ClassPass page. Right: `eye-portrait.jpg` in a tall frame with a large `LashMap` (Anime) drawn in thin ink overlapping the frame's left edge by about 80px, annotations visible. The map draws in on load (stroke-dashoffset, 900ms) as the one signature motion; static under reduced motion.
2. **Style index (nude).** Heading "Five sets, five maps." Five columns on desktop (scroll-snap horizontal row on mobile with visible next-card peek, 85vw cards), each a small `LashMap` + name + price + duration, no photos. Names and prices: Natural $80 · 1 hr, Full Set $120 · 1 hr, Anime $140 · 1 hr 30 min, Hybrid $160 · 1 hr 30 min, Volume $160 · 1 hr 45 min. Link to /styles.
3. **How a set is designed (paper).** Three steps as a horizontal timeline drawn with a hairline, NOT numbered circles: "Look" (we study your eye shape and the look you want; bring a photo), "Map" (lengths and curl are planned zone by zone), "Apply" (lashes are applied one zone at a time). Source: ClassPass description and reviews ("Show her image of lash you like, she makes it happen"). Keep factual; no medical claims.
4. **Before and after (ink).** Two images (`before-after-1.jpg`, `anime-before-after.jpg`) side by side at their natural size with captions, plus a short statement. Text pureza-on-ink equivalent: paper on ink.
5. **Reviews (nude).** ClassPass 4.9 score set huge in Instrument Serif ("4.9") with "100+ ratings on ClassPass". Three short quotes, first name only, source "ClassPass":
   - "Show her image of lash you like, she makes it happen, simple like that." Amber
   - "So gentle and so detail oriented! Love my customized lashes!" (anonymous: attribute "ClassPass client")
   - "My lashes last for a month and all my friends noticed the transformation." Laina
   Add a code comment: confirm permission with the owner before launch.
6. **Visit strip (paper).** Address, "Next to Chipotle on Madison at 40th, 12th floor, Suite 1205", today's hours highlighted (client-side by day), phone, Book button, link to /visit. Mobile service line: "Mobile lash service available. Ask when you book."
7. **Footer (ink).**

### `/styles`
One section per lash set, alternating layout. Each: large `LashMap` for that style with full annotations (length per zone), name EN/中文, price, duration, refill prices (2 wk / 3 wk), a one-line plain description of how the style looks (general lash-industry descriptions, not claims): Natural "Soft, close to your own lashes." Full Set "Fuller and defined, still everyday." Anime "Spiky, separated clusters for a doll-like, anime-inspired look." Hybrid "A mix of classic and volume lashes for texture." Volume "The densest, darkest set." Use photos where they match: Natural (`natural-trio.jpg`), Anime (`anime-before-after.jpg`), Full/Hybrid (`eye-closeup-pair.jpg`), Volume (no photo, map only). Each section ends with "Book this set" (Square link).

### `/menu`
Full price list as a precise spec-sheet table (semantic `<table>`), grouped: Lash sets (set / 2-week refill / 3-week refill), Add-ons (Bottom lash $40 · 20 min, Lash removal $20 · 20 min, Eyebrow fixing $12 · 20 min), Face and body (Deep clean and hydration facial $80 · 1 hr, Swedish massage $79 · 1 hr, Sea salt body scrub $99 · 1 hr). Note: "Prices from our Square booking page. Final price is confirmed when you book." Mobile: each row stacks, no horizontal scroll.

### `/about`
The studio and the artist: 8 years of lash artistry experience (from the studio's Instagram), customized sets for each eye shape, woman-owned and Asian-owned (ClassPass highlights), mobile lash service. Do NOT name the artist (unconfirmed; code comment: reviews mention "Chrissy", confirm). Photos: `client-chair.jpg`, `before-after-2.jpg`. Reviews block (reuse). CTA Book.

### `/visit`
Address block huge; directions copy from ClassPass in plain words: "From Grand Central, walk to Madison Avenue and 40th Street. We're at 274 Madison, next to Chipotle. Take the elevator to the 12th floor, Suite 1205." Hours table (Yelp; code comment: confirm, Square shows no hours): Mon 2:00 PM to 8:00 PM; Tue 10:00 AM to 8:00 PM; Wed 10:00 AM to 8:00 PM; Thu 10:00 AM to 6:30 PM; Fri 10:00 AM to 6:00 PM; Sat 11:00 AM to 2:00 PM and 5:00 PM to 8:00 PM; Sun 11:00 AM to 5:00 PM. Appointment only. Embedded Google Map iframe (`https://www.google.com/maps?q=274+Madison+Ave+Suite+1205+New+York+NY+10016&output=embed`, `loading="lazy"`, title attr). Arrival note from ClassPass: "Please arrive a few minutes early to settle in." Phone call button, Book button, Instagram link.

## 7. Data (centralize in `src/lib/site.ts` and `src/lib/menu.ts`)

```ts
export const site = {
  name: "My Lash Girl Beauty Studio",
  short: "My Lash Girl",
  address: { line1: "274 Madison Avenue, Suite 1205", line2: "New York, NY 10016", floor: "12th floor" },
  phoneDisplay: "(718) 799-2182",
  phoneHref: "tel:+17187992182",
  bookUrl: "https://book.squareup.com/appointments/rq66svxufjoyzt/location/LXYA5YHRHH34S/services",
  instagram: "https://www.instagram.com/mylashgirlbeautystudio/",
  classpass: "https://classpass.com/studios/mylashgirl--beauty-studio-new-york",
  yelp: "https://www.yelp.com/biz/my-lash-girl-new-york",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=274+Madison+Ave+Suite+1205+New+York+NY+10016",
  rating: { score: "4.9", count: "100+", source: "ClassPass" },
  // email intentionally omitted until the owner confirms which address to publish
}
```

Menu (from Square, read Nov 7, 2026), `menu.ts`, with `en` and `zh` names and a `map` length array per lash style:

| id | en | zh | price | duration | refill2 | refill3 | lengths (5 zones, mm) |
|---|---|---|---|---|---|---|---|
| natural | Natural Set | 自然款 | 80 | 1 hr | 55 | 65 | [8, 9, 10, 10, 9] |
| full | Full Set | 全套款 | 120 | 1 hr | 60 | 70 | [9, 10, 11, 12, 11] |
| anime | Anime Set | 动漫款 | 140 | 1 hr 30 min | 70 | 85 | [8, 11, 9, 12, 10] spiky |
| hybrid | Hybrid Set | 混合款 | 160 | 1 hr 30 min | 85 | 105 | [9, 10, 11, 12, 12] |
| volume | Volume Set | 花式浓密款 | 160 | 1 hr 45 min | 120 | 150 | [10, 11, 12, 13, 12] dense |

Add-ons zh: 下睫毛 Bottom lash, 卸睫毛 Lash removal, 修眉 Eyebrow fixing, 深层清洁补水面部护理 Deep clean and hydration facial, 瑞典式按摩 Swedish massage, 海盐身体磨砂 Sea salt body scrub.

Map rendering: zones go inner corner → outer corner. Lash count per zone: natural 4, full 6, anime 5 plus one long spike per zone, hybrid 7, volume 10 thin strokes in fans. Stroke length in px = mm × scale.

## 8. Internationalization

- `src/lib/i18n.tsx` client context: `lang` ∈ `en | zh`, default `en`, persisted in `localStorage` (wrapped in try/catch), sets `document.documentElement.lang` to `en` or `zh-Hans`.
- All visible strings come from a dictionary `src/lib/copy.ts` with `{ en, zh }`. Provide natural Simplified Chinese (keep it short and plain; add a README note that a native speaker should review).
- Toggle: two buttons `EN` and `中文` with `aria-pressed`, in the nav (desktop) and inside the mobile menu.
- Keep pages as server components where possible; a small client `T` component renders the string for the current language. Metadata stays English.

## 9. Components

- `LashMap` (server-safe SVG, optionally a client wrapper for draw-in): props `lengths`, `density`, `spiky`, `annotate`, `size`. viewBox 0 0 400 200. Closed-eye lid curve as a quadratic path; lashes are lines starting on the curve, angled outward and downward, length from zone. Annotations: small text above each zone ("10" with "mm" after the last). Strokes `currentColor`, 1.25px, round caps. `role="img"` with `aria-label` e.g. "Lash map for the Anime Set: 8 to 12 millimetres".
- `Navbar` (client): fixed, paper with transparent border at top, becomes paper with hairline bottom rule and slight compression (py 18px → 12px) after scroll. Mobile: full-screen paper sheet, close button, Escape closes, focus moves into the sheet, body scroll locked, links large serif, language toggle and Book button at bottom.
- `Footer`: ink; wordmark + eye mark; address; phone; hours summary; links (Styles, Menu, About, Visit, Book, Instagram, ClassPass, Yelp); `Made by Novus` exact text linking to https://novusnyc.org with target _blank rel noreferrer.
- `Reveal`: IntersectionObserver fade + 12px rise, 500ms, stagger 60ms; reduced motion shows everything immediately.
- `TodayHours` client: highlights today's row (America/New_York day).

## 10. Copy rules

No em dashes. No leading zeroes. Times like "10:00 AM". Never invent: artist name, certifications, product brands, aftercare rules, deposit or cancellation policy, years in business at this address. Use "Book" not "Book Now"/"Submit".

## 11. Metadata

- Title template `%s | My Lash Girl Beauty Studio`; default "My Lash Girl Beauty Studio | Custom lash extensions near Grand Central".
- Description: "Custom lash extensions designed for your eye shape. Natural, Full, Anime, Hybrid and Volume sets at 274 Madison Avenue, Suite 1205, New York."
- Favicon `src/app/icon.svg`: nude circle with the ink closed-eye mark. `apple-icon` PNG 180px.
- OG image: `eye-portrait.jpg`.

## 12. Tech

- Pin `next` 16.2.12, `react` 19.2.6, `react-dom` 19.2.6. Keep Tailwind 3 with tokens. `npm run build` must pass.
- Layout: no max-width `main` wrapper; container `max-w-[1320px] px-5 md:px-10`.
- Replace README with a business README including a "Confirm with owner" list.
- Keep `AGENTS.md` and `CLAUDE.md` identical (do not edit them).
