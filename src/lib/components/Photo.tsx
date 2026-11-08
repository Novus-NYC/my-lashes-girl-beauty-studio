import Image from "next/image"
import { T } from "@/lib/i18n"
import type { Bi } from "@/lib/menu"

export const photos = {
  eyePortrait: { src: "/images/eye-portrait.jpg", width: 508, height: 640 },
  closeupPair: { src: "/images/eye-closeup-pair.jpg", width: 481, height: 640 },
  naturalTrio: { src: "/images/natural-trio.jpg", width: 515, height: 640 },
  beforeAfter1: { src: "/images/before-after-1.jpg", width: 483, height: 640 },
  animeBeforeAfter: { src: "/images/anime-before-after.jpg", width: 524, height: 640 },
  beforeAfter2: { src: "/images/before-after-2.jpg", width: 482, height: 640 },
  clientChair: { src: "/images/client-chair.jpg", width: 360, height: 640 },
} as const

type Props = {
  photo: (typeof photos)[keyof typeof photos]
  alt: string
  caption?: Bi
  /** CSS display width cap in px; never above the native width */
  maxWidth?: number
  priority?: boolean
  sizes?: string
  className?: string
  captionClass?: string
}

/** A framed, graded studio photo with a spec-sheet caption. Never upscaled. */
export default function Photo({ photo, alt, caption, maxWidth, priority, sizes, className = "", captionClass = "text-m-mute" }: Props) {
  const cap = Math.min(maxWidth ?? photo.width, photo.width)
  return (
    <figure className={className} style={{ width: cap, maxWidth: "100%" }}>
      <div className="border border-m-rule bg-m-nude p-0">
        <Image
          src={photo.src}
          alt={alt}
          width={photo.width}
          height={photo.height}
          priority={priority}
          sizes={sizes ?? `(max-width: 640px) 90vw, ${cap}px`}
          className="photo block h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className={`anno mt-3 ${captionClass}`}>
          <T t={caption} />
        </figcaption>
      )}
    </figure>
  )
}
