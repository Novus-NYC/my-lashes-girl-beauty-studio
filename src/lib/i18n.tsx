"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import type { Bi } from "./menu"

export type Lang = "en" | "zh"

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (s: Bi) => string }

const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (s) => s.en })

const KEY = "mlg-lang"

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")

  useEffect(() => {
    let stored: string | null = null
    try {
      stored = window.localStorage.getItem(KEY)
    } catch {
      stored = null
    }
    if (stored === "zh" || stored === "en") setLangState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en"
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      window.localStorage.setItem(KEY, l)
    } catch {
      /* storage unavailable: keep the choice for this visit only */
    }
  }, [])

  const t = useCallback((s: Bi) => s[lang], [lang])

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

/** Renders a bilingual string in the current language. Usable from server components. */
export function T({ t }: { t: Bi }) {
  const { lang } = useLang()
  return <>{t[lang]}</>
}

/** Renders the string in the other language (secondary label), with the right lang attribute. */
export function Other({ t, className = "" }: { t: Bi; className?: string }) {
  const { lang } = useLang()
  const other: Lang = lang === "en" ? "zh" : "en"
  return (
    <span lang={other === "zh" ? "zh-Hans" : "en"} className={className}>
      {t[other]}
    </span>
  )
}
