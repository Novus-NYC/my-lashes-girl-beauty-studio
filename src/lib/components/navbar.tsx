"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import Wordmark from "./Wordmark"
import LangToggle from "./LangToggle"
import { useLang, Other } from "@/lib/i18n"
import { TodayLine } from "./TodayHours"
import { copy } from "@/lib/copy"
import { navLinks } from "@/lib/nav"
import { site } from "@/lib/site"

export default function Navbar() {
  const { t } = useLang()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the sheet on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== "Tab" || !sheetRef.current) return
      const focusables = sheetRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", onKey)
    }
  }, [open, close])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b bg-m-paper transition-[padding,border-color] duration-300 ease-calm ${
        scrolled ? "border-m-rule py-3" : "border-transparent py-[18px]"
      }`}
    >
      <div className="container-site flex items-center justify-between gap-6">
        <Link href="/" aria-label={t(copy.nav.home)} className="-my-1 py-1">
          <Wordmark compact />
        </Link>

        <nav aria-label={t(copy.nav.main)} className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className="rule-hover flex min-h-[44px] items-center px-3 text-[1rem] text-m-ink [--rx:0.75rem] [--ry:0.6rem]"
            >
              {t(l.label)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LangToggle />
          <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary min-h-[44px] px-6">
            {t(copy.nav.book)}
            <span className="sr-only"> {t(copy.common.opensNew)}</span>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={site.bookUrl}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[44px] items-center px-2 text-[1rem] font-semibold underline decoration-1 underline-offset-[6px] max-[359px]:hidden"
          >
            {t(copy.nav.book)}
            <span className="sr-only"> {t(copy.common.opensNew)}</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span className="sr-only">{t(copy.nav.open)}</span>
            <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.25">
              <path d="M3 8h18M3 16h18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label={t(copy.nav.main)}
          className="swap-in fixed inset-0 z-50 flex flex-col overflow-y-auto bg-m-paper lg:hidden"
        >
          <div className="container-site flex items-center justify-between py-[18px]">
            <Link href="/" onClick={() => setOpen(false)} aria-label={t(copy.nav.home)}>
              <Wordmark compact />
            </Link>
            <button ref={closeRef} type="button" onClick={close} className="flex h-11 w-11 items-center justify-center">
              <span className="sr-only">{t(copy.nav.close)}</span>
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.25">
                <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav aria-label={t(copy.nav.main)} className="container-site mt-6 flex-1">
            <ul className="border-t border-m-rule">
              {navLinks.map((l) => (
                <li key={l.href} className="border-b border-m-rule">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className="flex min-h-[68px] items-baseline justify-between gap-4 py-3"
                  >
                    <span className="display" style={{ ["--fs" as string]: "2.75rem" }}>
                      {t(l.label)}
                    </span>
                    <span className="flex items-center gap-3 text-m-mute">
                      {isActive(l.href) && <span aria-hidden className="h-px w-8 self-center bg-m-ink" />}
                      <Other t={l.label} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="container-site flex flex-col gap-5 py-6">
            <TodayLine />
            <div className="flex items-center justify-between">
              <span className="anno text-m-mute">{t(copy.nav.language)}</span>
              <LangToggle />
            </div>
            <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary w-full">
              {t(copy.common.bookOnSquare)}
              <span className="sr-only"> {t(copy.common.opensNew)}</span>
            </a>
            <a href={site.phoneHref} className="anno flex min-h-[44px] items-center justify-center text-m-mute">
              {t(copy.common.call)} {site.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
