import Image from "next/image"

// Real posts from the studio's Instagram, small (360 to 524px wide): never shown above native size.
// Shared treatment: the warm `.photo` grade, sharp corners, and two crop shapes only:
// circles (Loupe) for single-eye details and halves (Half) for before / after; the chair
// portrait on About is the one full-frame exception.

export const photos = {
  eyePortrait: { src: "/images/eye-portrait.jpg", width: 508, height: 640 },
  closeupPair: { src: "/images/eye-closeup-pair.jpg", width: 481, height: 640 },
  naturalTrio: { src: "/images/natural-trio.jpg", width: 515, height: 640 },
  beforeAfter1: { src: "/images/before-after-1.jpg", width: 483, height: 640 },
  animeBeforeAfter: { src: "/images/anime-before-after.jpg", width: 524, height: 640 },
  beforeAfter2: { src: "/images/before-after-2.jpg", width: 482, height: 640 },
  clientChair: { src: "/images/client-chair.jpg", width: 360, height: 640 },
} as const

type Shot = (typeof photos)[keyof typeof photos]

/**
 * Circle crop ("loupe"), echoing the logo's round mark. Used for single-eye details.
 * (cx, cy) is the point of the source image to centre, d the largest diameter in CSS px.
 * The image is never shown above its native size: it is positioned in percentages of d.
 */
export function Loupe({
  photo,
  alt,
  cx,
  cy,
  d,
  sizes,
  priority,
  className = "",
}: {
  photo: Shot
  alt: string
  cx: number
  cy: number
  d: number
  sizes?: string
  priority?: boolean
  className?: string
}) {
  const left = Math.min(0, Math.max(d - photo.width, d / 2 - cx))
  const top = Math.min(0, Math.max(d - photo.height, d / 2 - cy))
  return (
    <div className={`relative aspect-square w-full overflow-hidden rounded-full bg-m-nude ${className}`} style={{ maxWidth: d }}>
      <Image
        src={photo.src}
        alt={alt}
        width={photo.width}
        height={photo.height}
        priority={priority}
        sizes={sizes ?? `${d}px`}
        className="photo absolute max-w-none"
        style={{ width: `${(photo.width / d) * 100}%`, height: "auto", left: `${(left / d) * 100}%`, top: `${(top / d) * 100}%` }}
      />
    </div>
  )
}

/**
 * One half of a stacked before/after photo, cropped to rows y0..y1 of the source.
 * Rendered full width of its parent, at most the native width.
 */
export function Half({
  photo,
  alt,
  y0,
  y1,
  sizes,
  className = "",
}: {
  photo: Shot
  alt: string
  y0: number
  y1: number
  sizes?: string
  className?: string
}) {
  const h = y1 - y0
  return (
    <div className={`relative w-full overflow-hidden bg-m-nude ${className}`} style={{ aspectRatio: `${photo.width} / ${h}`, maxWidth: photo.width }}>
      <Image
        src={photo.src}
        alt={alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes ?? `(max-width: 640px) 90vw, ${photo.width}px`}
        className="photo absolute left-0 w-full max-w-none"
        style={{ height: "auto", top: `${(-y0 / h) * 100}%` }}
      />
    </div>
  )
}
