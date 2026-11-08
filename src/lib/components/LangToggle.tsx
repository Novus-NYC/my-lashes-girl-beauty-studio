"use client"

import { useLang } from "@/lib/i18n"

/**
 * One EN | 中文 switch: the whole control is a single button, so a press anywhere on it flips
 * the language (no aiming for the other label). The current language is rose and underlined.
 */
export default function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang()
  const next = lang === "en" ? "zh" : "en"
  const label = lang === "en" ? "Language: English. 切换到中文" : "语言：中文。Switch to English"
  const part = (on: boolean) =>
    `transition-colors duration-300 ${on ? "text-m-rose underline decoration-1 underline-offset-[6px]" : "text-m-mute group-hover:text-m-ink"}`
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={label}
      title={label}
      className={`group inline-flex min-h-[44px] min-w-[88px] items-center justify-center gap-2.5 px-2 text-[0.875rem] font-semibold tracking-[0.12em] ${className}`}
    >
      <span lang="en" className={part(lang === "en")}>
        EN
      </span>
      <span aria-hidden className="h-3 w-px bg-m-rule" />
      <span lang="zh-Hans" className={part(lang === "zh")}>
        中文
      </span>
    </button>
  )
}
