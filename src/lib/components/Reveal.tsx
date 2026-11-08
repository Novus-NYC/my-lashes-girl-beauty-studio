"use client"

import { useEffect, useRef, type ElementType, type ReactNode } from "react"

type Props = {
  children: ReactNode
  as?: ElementType
  /** Position in a staggered group; each step adds 60ms */
  index?: number
  className?: string
}

/** Fade + 12px rise when entering the viewport. Reduced motion shows content at once (CSS). */
export default function Reveal({ children, as: Tag = "div", index = 0, className = "" }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in")
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ ["--delay" as string]: `${index * 60}ms` }}>
      {children}
    </Tag>
  )
}
