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

- Display Latin: **Instrument Serif** (`next/font/google`, 400 and italic). Hero headline `clamp(3.6rem, 9.6vw, 9.75rem)` (about 138px at 1440), line-height 0.88, tracking -0.015em. `d-1` is `clamp(3rem, 7.4vw, 7.5rem)`.
- Text and annotations: **Plus Jakarta Sans** (`next/font/google`, 400, 500, 600). Body 1.0625rem / 1.65. Annotation style: 0.72rem, uppercase, letter-spacing 0.16em, weight 600, tabular numbers (`font-variant-numeric: tabular-nums`).
- Chinese: system CJK stack, no web font download: `"PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif` appended to both font stacks. When `lang` is `zh`, headings use the sans stack weight 500 at about 0.8x the Latin display size (serif Latin display looks wrong next to CJK), keep the italic serif only for Latin accents such as prices and "mm".
- Wordmark: recreate the logo lettering as live text: "MY LASH GIRL" in Plus Jakarta Sans 300, letter-spacing 0.22em, with "BEAUTY STUDIO" small beneath, plus an inline SVG closed-eye mark (curved lid line, lashes fanning down-right, brow arc above) on a nude circle. Do not use the JPG.

## 4. Color tokens (Tailwind `theme.extend.colors.m`)

| Token | Hex | Role |
|---|---|---|
| `paper` | `#FAF6F1` | Canvas |
| `nude` | `#E9D8CC` | Primary brand (the logo circle). Full-section backgrounds, map zones |
| `ink` | `#1B1616` | Primary text, lash strokes, dark sections, primary button |
| `clay` | `#9C5B4D` | Supplemental, now also a full-section colour (before/after, hybrid, end CTAs, visit contact, today panels). Paper on clay 4.86:1 passes AA for body text |
| `mute` | `#6E625C` | Muted text on paper and nude |
| `rule` | `rgba(27,22,22,.16)` | Hairlines |

Section background sequence on the homepage: paper (hero) → ink (how a set is designed + style explorer) → clay (before and after) → nude (reviews) → paper (visit) → ink footer. No two neighbouring sections share a colour on any page. No gradients, no glass, no blobs, no rounded cards. Radius 0 except buttons (pills only for primary CTAs) and the circle motif (the logo's nude disc and the photo loupes).

Measured contrast (WCAG): ink/paper 16.6, ink/nude 12.9, mute/paper 5.5, paper/clay 4.86, clay/paper 4.86, mute/nude 4.25 (fails), clay/nude 3.77 (fails), clay/ink 3.42 (fails). Rules that follow: on nude use ink only; on clay use paper only; on ink use paper or nude; clay text only on paper. Focus ring: clay on light surfaces, nude on ink (`.on-ink`), paper on clay (`.on-clay`).

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

Treatment (all in `src/lib/components/Photo.tsx`): one warm grade `.photo { filter: saturate(.9) contrast(1.04) sepia(.06) }`, never above native size, and only two crop shapes:

- **Loupe** (circle, from the logo's round mark): single-eye details, shown at native pixel size inside a hairline "reticle" ring. Positioned by the source pixel to centre (`cx`, `cy`) and a maximum diameter `d`.
- **Half**: the top or bottom half of a stacked before/after post, cropped by source rows (`y0`, `y1`) so the watermark/label band between halves is cut out. Paired halves carry a small square `BEFORE` / `AFTER` tag.

The chair portrait on About is the one full-frame image. A gentle 1.03 hover zoom (fine pointers only, off under reduced motion). Alt text describes the lashes, never names clients.

## 6. Pages and sections

Routes (replace template `src/app/pages/*`, delete the template folder):

`/` · `/styles` · `/menu` · `/about` · `/visit`

Nav: Styles 款式, Menu 价目, About 关于, Visit 到店. Primary nav CTA: **Book** / **预约** (Square). Language toggle `EN / 中文` in the nav.

### Home `/`
1. **Hero (paper): the worksheet.** A hairline header row (`LASH MAP · 睫毛设计图` left, address right). Left 7 columns: headline at about 138px, one line, Book on Square + "See styles and prices", ClassPass 4.9 proof. Right: a 720px nude disc (the logo circle) bleeding off the right edge, carrying a large Anime `LashMap` (720px, `xl`, mm callouts, zone lines, inner/outer corner callouts) that draws in on load. A 244px loupe of `eye-portrait.jpg` (native size) sits at the disc's lower-left edge, captioned `Finished set · detail`; `Anime set · illustrative map` labels the drawing. Mobile: text first, then disc, map (`md` size) and loupe.
2. **How a set is designed (ink).** Title and lead left; Look / Map / Apply on three hairlines right (Map in italic). Below, the **style explorer** (`StyleExplorer.tsx`): a `radiogroup` of the five sets (roving tabindex; arrows, Home, End; selection follows focus; 5 across on phones, a ruled list on desktop) drives a large map that redraws with the draw-in (keyed by style) plus that set's Square price, time and refills, Book this set, and "Read the full map" (`/styles#id`). A polite live region announces the change. Labelled "Illustrative map" in both languages.
3. **Before and after (clay).** One pair from `before-after-1.jpg`: the after half at native width, the before half overlapping its lower-left corner (10px clay outline separates them). Instagram link.
4. **Reviews (nude).** `4.9` at 15rem beside Amber's quote as a display pull-quote (up to 5rem, hanging quote mark); the other two quotes smaller and offset (one italic). Reviews stay in English (`lang="en"`), note "shown in their original English".
5. **Visit (paper).** "Up on the 12th floor." with the address in serif; an ink panel lifted into the reviews band with today's hours large (`TodayBlock`), by appointment, mobile service, Book and Call.
6. **Footer (ink).**

### `/styles`
Index (paper): headline left, a ruled jump list right (mini map, name, time, price per row; nude on hover). Then one section per set, each a different composition and colour: Natural (nude; map 7 cols, loupe of `natural-trio.jpg` breaking the map's corner), Full (paper; flipped, loupe of `eye-closeup-pair.jpg` above the map), Anime (ink; widest map, then spec and the before/after halves of `anime-before-after.jpg`), Hybrid (clay; map only, spec as two halves under it), Volume (paper; spec left, map right). Shared `Spec`: name, other-language name, description, full set price large with time, 2 and 3 week refills, Book this set. Maps use `ResponsiveMap` (md drawing on phones, lg/xl with corner callouts on desktop) captioned "Illustrative map, lengths in mm". Ends with a nude `EndCta`.

### `/menu`
A technician's service card. Header: `Service card · 服务价目卡`, "Menu" at hero size, the Square note and Book. The lash set card is a 1px ink-ruled sheet with an ink title strip and a semantic `<table>`: Style (mini map, name, other-language name, links to `/styles#id`) | **Full set** (nude column band, largest prices) | 2-week refill | 3-week refill. Phones: each row stacks to name, then three labelled cells with the nude full-set cell first. Add-ons (ink) and Face and body (nude, flipped) are leader-dot lists (`name ······ $40`, time and other-language name below). Clay `EndCta`. Every price comes from `menu.ts`.

### `/about`
Hero (paper): "8 years of lash artistry." at hero size, lead and body left; `client-chair.jpg` at native size breaking out of a nude block that bleeds right, with an ink `Woman-owned · Asian-owned` tag overlapping the photo's lower edge. Clay band: the Instagram line "Custom lash designs for your unique eye shape." at display size. Paper spec sheet (facts on hairlines, a small Natural map). Ink: two halves of `before-after-2.jpg` (two angles of one set) overlapping. Reviews (nude). Clay `EndCta`. The artist is still not named.

### `/visit`
Hero (paper): "274 Madison / Avenue" at hero size, suite and landmark line; a clay today panel (`TodayBlock`, appointment only, arrive early, Book, Call) overlapping into the next band. Route (nude): the ClassPass directions drawn as a measured line with five stops (Grand Central → Madison and 40th → 274 Madison next to Chipotle → elevator to the 12th floor → Suite 1205), horizontal on desktop, vertical on phones. Hours and map (paper, 5/7): `HoursTable` with today's row in clay with paper text and a "Today" label, each range on its own line; Google Maps embed (grayscale, warm). Contact (clay): Book, phone at display size, Instagram, a loupe of the chair photo.

### 404 (`src/app/not-found.tsx`)
"This page isn't on the map." with Back to home, the four page links on hairlines, and a Natural map on a nude disc.

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
- `LashMap` additions: `xl` size (finest strokes, for maps 700px and wider), optional `corners` callouts ("Inner corner" / "Outer corner"), and a bilingual `label` rendered as the SVG `<title>` through the client `SvgTitle` (React needs a plain string inside `<title>`). `mapLabel(style)` in `menu.ts` builds the label and says "illustrative". `ResponsiveMap` renders the md drawing on phones and lg/xl from `md` up.
- `StyleExplorer` (client): see Home section 2.
- `Loupe` and `Half` in `Photo.tsx`: the two photo crops (see §5).
- `TodayHours.tsx`: `HoursTable` (today in clay), `TodayLine` (`tone` paper or ink) and `TodayBlock` (large readout for ink or clay panels).
- `EndCta` takes `tone` (`clay` default, or `nude`) and offers Book, Call and one internal link.
- Footer: the logo lettering set large as the sign-off with the eye mark, today's hours, Call and Book beside it; then address, pages, elsewhere, `Made by Novus`.
- Navbar: page links use a hairline that draws in on hover/focus/current (`.rule-hover`); the mobile sheet shows each page's other-language name, today's hours, the language toggle, Book and Call.
- Motion vocabulary: map draw-in (hero and explorer), reveal fade-up, explorer readout swap (360ms), hairline draw on links, 1.03 photo hover zoom. All off or instant under `prefers-reduced-motion`.
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
- `npm run lint` runs `tsc --noEmit`: Next 16 removed `next lint`, and no ESLint dependency is installed. Add ESLint later if wanted.
- Layout: no max-width `main` wrapper; container `max-w-[1320px] px-5 md:px-10`.
- Replace README with a business README including a "Confirm with owner" list.
- Keep `AGENTS.md` and `CLAUDE.md` identical (do not edit them).
