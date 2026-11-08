"use client"

import Link from "next/link"
import { useRef, useState, type KeyboardEvent } from "react"
import { useLang } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import { lashStyles, mapLabel, type StyleId } from "@/lib/menu"
import LashMap from "./LashMap"
import Price from "./Price"

/**
 * Style explorer: a radiogroup of the five sets. Choosing one redraws the lash map
 * (the draw-in replays because the map is keyed by style) and swaps in that set's
 * Square price, time and refills. Arrow keys, Home and End move the selection.
 * Designed for an ink section: everything is drawn in paper / nude.
 */
export default function StyleExplorer({ initial = "anime" }: { initial?: StyleId }) {
  const { t, lang } = useLang()
  const [id, setId] = useState<StyleId>(initial)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const idx = lashStyles.findIndex((s) => s.id === id)
  const s = lashStyles[idx]

  const select = (i: number) => {
    const n = (i + lashStyles.length) % lashStyles.length
    setId(lashStyles[n].id)
    refs.current[n]?.focus()
  }

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const k = e.key
    if (k === "ArrowRight" || k === "ArrowDown") select(idx + 1)
    else if (k === "ArrowLeft" || k === "ArrowUp") select(idx - 1)
    else if (k === "Home") select(0)
    else if (k === "End") select(lashStyles.length - 1)
    else return
    e.preventDefault()
  }

  const rows = [
    { k: copy.styles.refill2, price: s.refill2.price, dur: s.refill2.duration },
    { k: copy.styles.refill3, price: s.refill3.price, dur: s.refill3.duration },
  ]

  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-10">
      {/* Options */}
      <div className="md:col-span-3">
        <p id="explorer-label" className="anno text-m-nude">
          {t(copy.home.chooseStyle)}
        </p>
        <div
          role="radiogroup"
          aria-labelledby="explorer-label"
          className="mt-4 grid grid-cols-5 border-t border-m-paper/25 md:grid-cols-1"
        >
          {lashStyles.map((o, i) => {
            const on = o.id === id
            return (
              <button
                key={o.id}
                ref={(el) => {
                  refs.current[i] = el
                }}
                type="button"
                role="radio"
                aria-checked={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setId(o.id)}
                onKeyDown={onKey}
                className={`group relative flex min-h-[64px] flex-col items-start justify-center gap-1 border-b border-m-paper/25 px-2 py-3 text-left transition-colors duration-300 md:min-h-[72px] md:flex-row md:items-baseline md:justify-between md:px-4 ${
                  on ? "bg-m-paper text-m-ink" : "text-m-paper hover:bg-m-paper/10"
                }`}
              >
                <span className="font-serif text-[1.05rem] leading-none sm:text-[1.3rem] md:text-[1.75rem]">{t(o.short)}</span>
                <Price value={o.price} className={`text-[1.05rem] leading-none md:text-[1.2rem] ${on ? "text-m-ink" : "text-m-nude"}`} />
              </button>
            )
          })}
        </div>
        <p className="mt-6 hidden max-w-[28ch] text-m-nude md:block">{t(copy.home.explorerLead)}</p>
      </div>

      {/* Map + readout */}
      <div className="md:col-span-9 md:pl-6">
        <div className="relative">
          <p className="anno flex justify-between border-b border-m-paper/25 pb-3 text-m-nude">
            <span>
              {t(copy.common.illustrativeShort)} · {t(s.name)}
            </span>
            <span className="hidden sm:inline">
              {t(copy.common.lengths)} · mm
            </span>
          </p>
          <div key={id} className="pt-10 text-m-paper md:pl-[10%] md:pr-[2%] md:pt-12">
            <LashMap lengths={s.lengths} density={s.id} size="md" draw label={mapLabel(s)} className="md:hidden" />
            <LashMap
              lengths={s.lengths}
              density={s.id}
              size="xl"
              draw
              label={mapLabel(s)}
              corners={{ inner: copy.common.inner, outer: copy.common.outer }}
              className="hidden md:block"
            />
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {t(s.name)}, ${s.price}, {t(s.duration)}
        </p>
        <div key={`r-${id}-${lang}`} className="swap-in mt-10 grid gap-8 border-t border-m-paper/25 pt-8 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <h3 className="display d-3 text-m-paper">{t(s.name)}</h3>
            <p className="mt-3 max-w-[36ch] text-m-nude">{t(s.description)}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary-light">
                {t(copy.styles.bookThis)}
                <span className="sr-only"> {t(copy.common.opensNew)}</span>
              </a>
              <Link href={`/styles#${s.id}`} className="link-under inline-flex min-h-[44px] items-center font-semibold text-m-paper">
                {t(copy.home.readMap)}
              </Link>
            </div>
          </div>
          <dl className="sm:col-span-5">
            <div className="grid grid-cols-[1fr_auto] items-end gap-x-4 border-b border-m-paper/25 pb-4">
              <dt className="anno text-m-nude">{t(copy.styles.set)}</dt>
              <dd className="row-span-2 self-end">
                <Price value={s.price} className="text-[4.5rem] leading-[0.8] text-m-paper md:text-[5.5rem]" />
              </dd>
              <dd className="anno mt-2 text-m-paper">{t(s.duration)}</dd>
            </div>
            {rows.map((r) => (
              <div key={r.k.en} className="flex items-baseline justify-between gap-4 border-b border-m-paper/25 py-3">
                <dt className="text-m-nude">
                  {t(r.k)} <span className="text-m-paper/80">· {t(r.dur)}</span>
                </dt>
                <dd>
                  <Price value={r.price} className="text-[1.6rem] leading-none text-m-paper" />
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-6 text-m-nude">{t(copy.common.illustrative)}</p>
      </div>
    </div>
  )
}
