// Central business facts. Sources: research/BRIEF.md (Square, Yelp, ClassPass, Instagram).
export const site = {
  name: "My Lash Girl Beauty Studio",
  short: "My Lash Girl",
  address: { line1: "274 Madison Avenue, Suite 1205", line2: "New York, NY 10016", floor: "12th floor" },
  phoneDisplay: "(718) 799-2182",
  phoneHref: "tel:+17187992182",
  bookUrl: "https://book.squareup.com/appointments/rq66svxufjoyzt/location/LXYA5YHRHH34S/services",
  instagram: "https://www.instagram.com/mylashgirlbeautystudio/",
  instagramHandle: "@mylashgirlbeautystudio",
  classpass: "https://classpass.com/studios/mylashgirl--beauty-studio-new-york",
  yelp: "https://www.yelp.com/biz/my-lash-girl-new-york",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=274+Madison+Ave+Suite+1205+New+York+NY+10016",
  mapsEmbed: "https://www.google.com/maps?q=274+Madison+Ave+Suite+1205+New+York+NY+10016&output=embed",
  rating: { score: "4.9", count: "100+", source: "ClassPass" },
  // email intentionally omitted until the owner confirms which address to publish
  // Production URL: confirm with owner (mylashgirlbeauty.com is owned but disconnected on Wix).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mylashgirlbeauty.com",
} as const

export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6 // JS getDay(): 0 = Sunday

export type HoursRow = {
  day: Day
  en: string
  zh: string
  // 24h "HH:MM" pairs, formatted for display without leading zeroes
  ranges: [string, string][]
}

// Hours from Yelp (the only public source with hours).
// TODO confirm with owner: Square's location page shows every day as "Closed".
export const hours: HoursRow[] = [
  { day: 1, en: "Monday", zh: "周一", ranges: [["14:00", "20:00"]] },
  { day: 2, en: "Tuesday", zh: "周二", ranges: [["10:00", "20:00"]] },
  { day: 3, en: "Wednesday", zh: "周三", ranges: [["10:00", "20:00"]] },
  { day: 4, en: "Thursday", zh: "周四", ranges: [["10:00", "18:30"]] },
  { day: 5, en: "Friday", zh: "周五", ranges: [["10:00", "18:00"]] },
  { day: 6, en: "Saturday", zh: "周六", ranges: [["11:00", "14:00"], ["17:00", "20:00"]] },
  { day: 0, en: "Sunday", zh: "周日", ranges: [["11:00", "17:00"]] },
]

/** "14:00" -> "2:00 PM" (en) or "14:00" (zh). Never a leading zero. */
export function formatTime(hhmm: string, lang: "en" | "zh"): string {
  const [h, m] = hhmm.split(":").map(Number)
  if (lang === "zh") return `${h}:${String(m).padStart(2, "0")}`
  const suffix = h >= 12 ? "PM" : "AM"
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`
}

export function formatRanges(ranges: [string, string][], lang: "en" | "zh"): string {
  const joiner = lang === "zh" ? " 至 " : " to "
  const sep = lang === "zh" ? "，" : " and "
  return ranges.map(([a, b]) => `${formatTime(a, lang)}${joiner}${formatTime(b, lang)}`).join(sep)
}
