import { EYE } from "@/lib/eyeMark"

/** The studio's closed-eye mark on a nude circle. Decorative unless given a title. */
export default function EyeMark({ className = "", circle = true, title }: { className?: string; circle?: boolean; title?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {circle && <circle cx="50" cy="50" r="49" fill="#E9D8CC" />}
      <path d={EYE.brow} fill="none" stroke="#1B1616" strokeWidth="2.6" strokeLinecap="round" />
      <path d={EYE.lid} fill="none" stroke="#1B1616" strokeWidth="3.2" strokeLinecap="round" />
      <path d={EYE.lashes} fill="#1B1616" />
    </svg>
  )
}
