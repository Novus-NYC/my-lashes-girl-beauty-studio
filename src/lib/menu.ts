// Menu from the studio's Square booking page, read Nov 7, 2026 (see research/BRIEF.md).
// Square spells "Hybird"; corrected to "Hybrid" here. Confirm prices with owner before launch.

export type Bi = { en: string; zh: string }

export type StyleId = "natural" | "full" | "anime" | "hybrid" | "volume"

export type Duration = Bi

const d = (en: string, zh: string): Duration => ({ en, zh })
const D = {
  m20: d("20 min", "20 分钟"),
  h1: d("1 hr", "1 小时"),
  h130: d("1 hr 30 min", "1 小时 30 分钟"),
  h145: d("1 hr 45 min", "1 小时 45 分钟"),
}

export type LashStyle = {
  id: StyleId
  name: Bi
  short: Bi
  price: number
  duration: Duration
  refill2: { price: number; duration: Duration }
  refill3: { price: number; duration: Duration }
  /** Illustrative map, 5 zones inner corner to outer corner, in millimetres */
  lengths: number[]
  description: Bi
}

export const lashStyles: LashStyle[] = [
  {
    id: "natural",
    name: { en: "Natural Set", zh: "自然款" },
    short: { en: "Natural", zh: "自然款" },
    price: 80,
    duration: D.h1,
    refill2: { price: 55, duration: D.h1 },
    refill3: { price: 65, duration: D.h1 },
    lengths: [8, 9, 10, 10, 9],
    description: { en: "Soft, close to your own lashes.", zh: "柔和自然，接近你本来的睫毛。" },
  },
  {
    id: "full",
    name: { en: "Full Set", zh: "全套款" },
    short: { en: "Full Set", zh: "全套款" },
    price: 120,
    duration: D.h1,
    refill2: { price: 60, duration: D.h1 },
    refill3: { price: 70, duration: D.h1 },
    lengths: [9, 10, 11, 12, 11],
    description: { en: "Fuller and defined, still everyday.", zh: "更浓密、更有轮廓，日常也适合。" },
  },
  {
    id: "anime",
    name: { en: "Anime Set", zh: "动漫款" },
    short: { en: "Anime", zh: "动漫款" },
    price: 140,
    duration: D.h130,
    refill2: { price: 70, duration: D.h1 },
    refill3: { price: 85, duration: D.h130 },
    lengths: [8, 11, 9, 12, 10],
    description: {
      en: "Spiky, separated clusters for a doll-like, anime-inspired look.",
      zh: "一簇簇分明的尖角睫毛，像洋娃娃一样的动漫感。",
    },
  },
  {
    id: "hybrid",
    name: { en: "Hybrid Set", zh: "混合款" },
    short: { en: "Hybrid", zh: "混合款" },
    price: 160,
    duration: D.h130,
    refill2: { price: 85, duration: D.h1 },
    refill3: { price: 105, duration: D.h130 },
    lengths: [9, 10, 11, 12, 12],
    description: { en: "A mix of classic and volume lashes for texture.", zh: "单根与开花睫毛混合，更有层次。" },
  },
  {
    id: "volume",
    name: { en: "Volume Set", zh: "花式浓密款" },
    short: { en: "Volume", zh: "浓密款" },
    price: 160,
    duration: D.h145,
    refill2: { price: 120, duration: D.h130 },
    refill3: { price: 150, duration: D.h130 },
    lengths: [10, 11, 12, 13, 12],
    description: { en: "The densest, darkest set.", zh: "最浓密、最深邃的一款。" },
  },
]

export type MenuItem = { id: string; name: Bi; price: number; duration: Duration }

export const addOns: MenuItem[] = [
  { id: "bottom", name: { en: "Bottom lash", zh: "下睫毛" }, price: 40, duration: D.m20 },
  { id: "removal", name: { en: "Lash removal", zh: "卸睫毛" }, price: 20, duration: D.m20 },
  { id: "brow", name: { en: "Eyebrow fixing", zh: "修眉" }, price: 12, duration: D.m20 },
]

export const faceBody: MenuItem[] = [
  { id: "facial", name: { en: "Deep clean and hydration facial", zh: "深层清洁补水面部护理" }, price: 80, duration: D.h1 },
  { id: "massage", name: { en: "Swedish massage", zh: "瑞典式按摩" }, price: 79, duration: D.h1 },
  { id: "scrub", name: { en: "Sea salt body scrub", zh: "海盐身体磨砂" }, price: 99, duration: D.h1 },
]

export const styleById = (id: StyleId) => lashStyles.find((s) => s.id === id)!

export const mmRange = (lengths: number[]) => `${Math.min(...lengths)} to ${Math.max(...lengths)}`
