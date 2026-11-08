"use client"

import { useLang, type Lang } from "@/lib/i18n"
import { copy } from "@/lib/copy"

const OPTIONS: { id: Lang; label: string; lang: string }[] = [
  { id: "en", label: "EN", lang: "en" },
  { id: "zh", label: "中文", lang: "zh-Hans" },
]

export default function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang()
  return (
    <div role="group" aria-label={t(copy.nav.language)} className={`flex items-center ${className}`}>
      {OPTIONS.map((o, i) => (
        <span key={o.id} className="flex items-center">
          {i > 0 && <span aria-hidden className="mx-0.5 h-3 w-px bg-m-rule" />}
          <button
            type="button"
            lang={o.lang}
            aria-pressed={lang === o.id}
            onClick={() => setLang(o.id)}
            className={`min-h-[44px] min-w-[44px] px-2 text-[0.8rem] font-semibold tracking-[0.12em] transition-colors duration-300 ${
              lang === o.id ? "text-m-clay underline decoration-1 underline-offset-[6px]" : "text-m-mute hover:text-m-ink"
            }`}
          >
            {o.label}
          </button>
        </span>
      ))}
    </div>
  )
}
