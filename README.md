# My Lash Girl Beauty Studio

Website for **My Lash Girl Beauty Studio**, an appointment-only lash extension studio at 274 Madison Avenue, Suite 1205 (12th floor), New York, NY 10016, a short walk from Grand Central.

The site helps visitors pick a lash style, see its price and book on Square, in English or Simplified Chinese.

- Design spec: `DESIGN.md` (the "lash map" concept, tokens, pages, copy rules)
- Research and sources: `research/BRIEF.md`
- Build standard: `AGENTS.md` (mirrored in `CLAUDE.md`)

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero with the Anime lash map, style index, how a set is designed, before and after, reviews, visit strip |
| `/styles` | One section per set: full lash map, prices, time, 2 and 3 week refills, Book this set |
| `/menu` | Full price list as a semantic table (lash sets, add-ons, face and body) |
| `/about` | The studio, 8 years of lash artistry, woman-owned and Asian-owned, mobile service |
| `/visit` | Address, directions from Grand Central, hours (today highlighted), map, contact |

## Where to edit things

- Business facts, links, hours: `src/lib/site.ts`
- Menu, prices, lash map lengths: `src/lib/menu.ts`
- Every visible string (English and Chinese): `src/lib/copy.ts`
- Language context and the `T` component: `src/lib/i18n.tsx`
- Lash map diagram: `src/lib/components/LashMap.tsx`
- Colors and fonts: `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`
- Favicon: `src/app/icon.svg`; Apple touch icon: `src/app/apple-icon.tsx` (generated PNG, 180px)

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build, must pass before deploy
```

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3. Fonts: Instrument Serif and Plus Jakarta Sans via `next/font`; Chinese uses the system CJK stack. Set `NEXT_PUBLIC_SITE_URL` to the production URL (defaults to `https://mylashgirlbeauty.com`).

## Confirm with owner

- [ ] Business name spelling ("My Lash Girl", not "Lashes"), and which phone and email to publish (email is not shown yet: Square lists sunshinetherapy2021@gmail.com, the old site zhengsudan28@gmail.com)
- [ ] Prices and times from Square (read Nov 7, 2026) are current; any ClassPass or Groupon offers to show
- [ ] Hours (taken from Yelp). Square's location page shows every day as "Closed", which should be fixed there too
- [ ] Mobile lash service: area, travel fee, how to book
- [ ] Artist name and photo (ClassPass reviews mention "Chrissy"), and whether to feature her. The site does not name her yet
- [ ] "8 years of lash artistry" wording (from the studio's Instagram bio)
- [ ] Written permission to quote the three ClassPass reviews (Amber, Laina, one anonymous)
- [ ] Permission to use the client photos from Instagram on the website; any better or original before and after photos
- [ ] Which photo shows which set (captions only name the Anime set and the Natural set)
- [ ] Aftercare instructions and policies (deposit, lateness, cancellation, patch test). None are on the site
- [ ] Simplified Chinese copy: have a native speaker review `src/lib/copy.ts` and `src/lib/menu.ts`. Which language should be the default?
- [ ] RedNote (小红书) or WeChat accounts to link
- [ ] Production domain: point mylashgirlbeauty.com (owned, disconnected on Wix) at this site
- [ ] Lash map lengths are illustrative. Confirm the studio is happy showing these typical lengths per style
