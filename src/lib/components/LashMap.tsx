import type { Bi, StyleId } from "@/lib/menu"
import { T, SvgTitle } from "@/lib/i18n"

/**
 * LashMap: a technician's lash mapping diagram drawn in SVG.
 *
 * A closed-eye lid curve (quadratic), split into 5 zones from the inner corner (left)
 * to the outer corner (right). Lashes hang from the lid, fanning outward and sweeping
 * toward the outer corner; each stroke's length is the zone's millimetre value x SCALE.
 * Annotations sit above each zone with hairline leader lines down to the lid.
 *
 * Server-safe. The optional draw-in is pure CSS (see globals.css `.lm-draw`).
 */

type Size = "xs" | "sm" | "md" | "lg" | "xl"

export type LashMapProps = {
  lengths: number[]
  density: StyleId
  spiky?: boolean
  annotate?: boolean
  size?: Size
  draw?: boolean
  /** Accessible name, rendered as the SVG <title> in the current language */
  label: Bi
  /** Optional "inner corner" / "outer corner" callouts at the two ends of the lid */
  corners?: { inner: Bi; outer: Bi }
  className?: string
}

type Pt = [number, number]

// Lid geometry, viewBox 0 0 400 200
const P0: Pt = [52, 74]
const P1: Pt = [188, 142]
const P2: Pt = [334, 60]
const T_START = 0.05
const T_END = 0.93
const SCALE = 6.2 // px per mm
const ZONES = 5

// Stroke widths in viewBox units so they render near 1.25 CSS px at each size
const UNIT: Record<Size, number> = { xs: 3.4, sm: 2.1, md: 1.35, lg: 0.92, xl: 0.72 }
const FONT: Record<Size, number> = { xs: 30, sm: 21, md: 12.5, lg: 9.2, xl: 7.2 }

const bez = (t: number): Pt => {
  const u = 1 - t
  return [u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0], u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1]]
}

const tangent = (t: number): Pt => {
  const x = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0])
  const y = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1])
  const l = Math.hypot(x, y)
  return [x / l, y / l]
}

/** Lash direction at t: lid normal (pointing down), swept toward the outer corner. */
const direction = (t: number, extraDeg = 0): Pt => {
  const [tx, ty] = tangent(t)
  const normal = Math.atan2(tx, -ty) // angle of (-ty, tx)
  const sweep = ((8 + 20 * Math.pow(t, 1.2)) * Math.PI) / 180
  const a = normal - sweep + (extraDeg * Math.PI) / 180
  return [Math.cos(a), Math.sin(a)]
}

// Deterministic jitter so the same style always draws the same
const jitter = (i: number) => {
  const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  return s - Math.floor(s) - 0.5
}

const f = (n: number) => Math.round(n * 100) / 100

/** A single curled lash from base, `len` long, in direction d. Tip curls up and out. */
const lashPath = (base: Pt, d: Pt, len: number, curl = 0.13): string => {
  const p: Pt = [d[1], -d[0]] // perpendicular, toward the outer corner / upward
  const c: Pt = [base[0] + d[0] * len * 0.55 + p[0] * len * curl * 0.35, base[1] + d[1] * len * 0.55 + p[1] * len * curl * 0.35]
  const e: Pt = [base[0] + d[0] * len * 0.96 + p[0] * len * curl, base[1] + d[1] * len * 0.96 + p[1] * len * curl]
  return `M${f(base[0])} ${f(base[1])}Q${f(c[0])} ${f(c[1])} ${f(e[0])} ${f(e[1])}`
}

/** A spike: several strokes from spread roots that meet in one point. */
const spikePath = (t: number, spread: number, len: number): string[] => {
  const d = direction(t, -2)
  const tip: Pt = [bez(t)[0] + d[0] * len, bez(t)[1] + d[1] * len]
  const p: Pt = [d[1], -d[0]]
  // Curl the tip slightly
  tip[0] += p[0] * len * 0.08
  tip[1] += p[1] * len * 0.08
  return [-1, 0, 1].map((k) => {
    const b = bez(t + k * spread)
    const c: Pt = [(b[0] + tip[0]) / 2 + p[0] * len * 0.03, (b[1] + tip[1]) / 2 + p[1] * len * 0.03]
    return `M${f(b[0])} ${f(b[1])}Q${f(c[0])} ${f(c[1])} ${f(tip[0])} ${f(tip[1])}`
  })
}

type Stroke = { d: string; w: number; t: number }

function buildStrokes(lengths: number[], density: StyleId, spiky: boolean): Stroke[] {
  const out: Stroke[] = []
  const zw = (T_END - T_START) / ZONES
  let n = 0

  lengths.slice(0, ZONES).forEach((mm, z) => {
    const a = T_START + z * zw
    const at = (i: number, count: number) => a + zw * ((i + 0.5) / count)

    if (density === "volume") {
      // 10 thin strokes per zone, in fans of 3, 3 and 4 sharing a root
      const fans = [3, 3, 4]
      fans.forEach((size, fi) => {
        const t = at(fi, fans.length)
        const base = bez(t)
        for (let k = 0; k < size; k++) {
          const spread = size === 1 ? 0 : -8 + (16 * k) / (size - 1)
          const len = (mm - 0.15 - Math.abs(spread) * 0.06 + jitter(++n) * 0.25) * SCALE
          out.push({ d: lashPath(base, direction(t, spread), len, 0.15), w: 0.55, t })
        }
      })
      return
    }

    if (density === "hybrid") {
      // 7 positions: classic singles alternate with thin pairs
      for (let i = 0; i < 7; i++) {
        const t = at(i, 7)
        const base = bez(t)
        if (i % 2 === 0) {
          out.push({ d: lashPath(base, direction(t), (mm + jitter(++n) * 0.3) * SCALE), w: 1, t })
        } else {
          for (const s of [-5, 5]) {
            out.push({ d: lashPath(base, direction(t, s), (mm - 0.6 + jitter(++n) * 0.3) * SCALE, 0.15), w: 0.55, t })
          }
        }
      }
      return
    }

    if (density === "anime" || spiky) {
      // 5 short fill lashes plus one long closed spike per zone
      for (let i = 0; i < 5; i++) {
        const t = at(i, 5)
        const fill = Math.max(5, mm - 3.2) + jitter(++n) * 0.4
        out.push({ d: lashPath(bez(t), direction(t), fill * SCALE, 0.12), w: 0.6, t })
      }
      const tc = a + zw * 0.5
      spikePath(tc, zw * 0.07, mm * SCALE).forEach((d) => out.push({ d, w: 0.85, t: tc }))
      return
    }

    // natural (4) and full (6): classic single lashes
    const count = density === "natural" ? 4 : 6
    for (let i = 0; i < count; i++) {
      const t = at(i, count)
      const len = (mm - (density === "natural" ? 0.3 : 0) + jitter(++n) * 0.3) * SCALE
      out.push({ d: lashPath(bez(t), direction(t), len, density === "natural" ? 0.1 : 0.13), w: density === "natural" ? 0.85 : 0.9, t })
    }
  })

  return out
}

export default function LashMap({
  lengths,
  density,
  spiky = false,
  annotate = true,
  size = "md",
  draw = false,
  label,
  corners,
  className = "",
}: LashMapProps) {
  const u = UNIT[size]
  const fs = FONT[size]
  const strokes = buildStrokes(lengths, density, spiky)
  const zw = (T_END - T_START) / ZONES
  const lid = `M${P0[0]} ${P0[1]}Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`

  // Crease above the lid, a lighter echo of the curve
  const crease = `M${P0[0] + 34} ${P0[1] - 22}Q${P1[0] + 4} ${P1[1] - 52} ${P2[0] - 30} ${P2[1] - 24}`

  const labelY = fs + 3

  return (
    <svg
      viewBox="0 0 400 200"
      role="img"
      className={`block h-auto w-full overflow-visible ${draw ? "lm-draw" : ""} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <SvgTitle t={label} />
      {/* crease */}
      <path d={crease} strokeWidth={u * 0.45} strokeOpacity={0.35} className="lm-l" pathLength={1} style={{ ["--d" as string]: "0ms" }} />

      {/* zone dividers: dashed hairlines along the lash direction */}
      {annotate &&
        Array.from({ length: ZONES - 1 }, (_, i) => {
          const t = T_START + zw * (i + 1)
          const b = bez(t)
          const d = direction(t)
          const len = (Math.max(...lengths) + 2.2) * SCALE
          return (
            <line
              key={`div-${i}`}
              className="lm-a"
              x1={f(b[0] - d[0] * 6)}
              y1={f(b[1] - d[1] * 6)}
              x2={f(b[0] + d[0] * len)}
              y2={f(b[1] + d[1] * len)}
              strokeWidth={u * 0.4}
              strokeOpacity={0.4}
              strokeDasharray={`${u * 1.6} ${u * 2.4}`}
            />
          )
        })}

      {/* lashes */}
      <g>
        {strokes.map((s, i) => (
          <path
            key={i}
            d={s.d}
            className="lm-l"
            pathLength={1}
            strokeWidth={u * s.w}
            style={{ ["--d" as string]: `${Math.round(140 + s.t * 300)}ms` }}
          />
        ))}
      </g>

      {/* lid line, drawn last so it sits on top of the lash roots */}
      <path d={lid} className="lm-l" pathLength={1} strokeWidth={u * 1.15} style={{ ["--d" as string]: "0ms" }} />

      {/* corner marks */}
      <g className="lm-a" fill="currentColor" stroke="none">
        <circle cx={P0[0]} cy={P0[1]} r={u * 1.3} />
        <circle cx={P2[0]} cy={P2[1]} r={u * 1.3} />
      </g>

      {corners && (
        <g className="lm-a" fill="currentColor" stroke="none" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: fs * 0.82, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          <text x={P0[0] - u * 5} y={P0[1] + fs * 0.3} textAnchor="end">
            <T t={corners.inner} />
          </text>
          <text x={P2[0] + u * 5} y={P2[1] + fs * 0.3} textAnchor="start">
            <T t={corners.outer} />
          </text>
        </g>
      )}

      {annotate && (
        <g className="lm-a">
          {lengths.slice(0, ZONES).map((mm, z) => {
            const t = T_START + zw * (z + 0.5)
            const [x, y] = bez(t)
            const last = z === ZONES - 1
            return (
              <g key={`a-${z}`}>
                <line x1={f(x)} y1={labelY + fs * 0.45} x2={f(x)} y2={f(y - u * 3)} strokeWidth={u * 0.4} strokeOpacity={0.55} />
                <circle cx={f(x)} cy={f(y)} r={u * 0.95} fill="currentColor" stroke="none" />
                <text
                  x={f(x)}
                  y={labelY}
                  textAnchor="middle"
                  fill="currentColor"
                  stroke="none"
                  style={{
                    fontFamily: "var(--font-sans), system-ui, sans-serif",
                    fontSize: fs,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {mm}
                </text>
                {last && (
                  <text
                    x={f(x + fs * 0.31 * String(mm).length + fs * 0.22)}
                    y={labelY}
                    textAnchor="start"
                    fill="currentColor"
                    stroke="none"
                    style={{ fontFamily: "var(--font-serif), Georgia, serif", fontStyle: "italic", fontSize: fs * 1.15 }}
                  >
                    mm
                  </text>
                )}
              </g>
            )
          })}
        </g>
      )}
    </svg>
  )
}

/**
 * A map that keeps its annotations legible at both widths: the "md" drawing on phones,
 * and a finer drawing (lg / xl) with corner callouts from the md breakpoint up.
 */
export function ResponsiveMap({ desktop = "lg", ...props }: Omit<LashMapProps, "size"> & { desktop?: "lg" | "xl" }) {
  const { corners, className = "", ...rest } = props
  return (
    <>
      <LashMap {...rest} size="md" className={`md:hidden ${className}`} />
      <div className={`hidden md:block ${corners ? "pl-[11%]" : ""}`}>
        <LashMap {...rest} corners={corners} size={desktop} className={className} />
      </div>
    </>
  )
}
