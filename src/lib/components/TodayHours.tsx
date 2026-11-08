"use client"

import { useEffect, useState } from "react"
import { hours, formatRanges, formatTime, type Day } from "@/lib/site"
import { useLang } from "@/lib/i18n"
import { copy } from "@/lib/copy"

/** Current weekday in New York (0 = Sunday). Null until mounted to avoid hydration mismatch. */
function useNYDay(): Day | null {
  const [day, setDay] = useState<Day | null>(null)
  useEffect(() => {
    const name = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "short" }).format(new Date())
    const map: Record<string, Day> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
    setDay(map[name] ?? null)
  }, [])
  return day
}

/** Full week table. Today's row is set in clay with paper text, bold, and labelled "Today". */
export function HoursTable() {
  const { lang, t } = useLang()
  const today = useNYDay()
  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">{t(copy.visit.hoursTitle)}</caption>
      <tbody>
        {hours.map((row) => {
          const isToday = row.day === today
          return (
            <tr
              key={row.day}
              className={`border-t border-m-rule last:border-b ${isToday ? "on-clay bg-m-clay text-m-paper" : ""}`}
              aria-current={isToday ? "date" : undefined}
            >
              <th scope="row" className={`py-3.5 pl-3 pr-4 align-top ${isToday ? "font-semibold" : "font-normal"}`}>
                {row[lang]}
                {isToday && <span className="anno mt-1 block">{t(copy.common.today)}</span>}
              </th>
              <td className={`tnum py-3.5 pr-3 text-right align-top ${isToday ? "font-semibold" : ""}`}>
                {row.ranges.map(([a, b], i) => (
                  <span key={a} className="block whitespace-nowrap">
                    {i > 0 && <span className="sr-only">{lang === "zh" ? "，" : " and "}</span>}
                    {formatTime(a, lang)}
                    {lang === "zh" ? " 至 " : " to "}
                    {formatTime(b, lang)}
                  </span>
                ))}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/** One line: today's hours. Falls back to a neutral line before mount. */
export function TodayLine({ tone = "paper" }: { tone?: "paper" | "ink" }) {
  const { lang, t } = useLang()
  const today = useNYDay()
  const row = hours.find((h) => h.day === today)
  return (
    <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className={`anno ${tone === "ink" ? "text-m-nude" : "text-m-clay"}`}>{t(copy.common.today)}</span>
      <span className="tnum text-[1.15rem]">
        {row ? (
          <>
            <span className="font-semibold">{row[lang]}</span> {formatRanges(row.ranges, lang)}
          </>
        ) : (
          t(copy.footer.hours)
        )}
      </span>
    </p>
  )
}

/** Large "today" readout for highlight panels (ink or clay surfaces). */
export function TodayBlock() {
  const { lang, t } = useLang()
  const today = useNYDay()
  const row = hours.find((h) => h.day === today)
  return (
    <div>
      <p className="anno text-m-paper">
        {t(copy.common.today)}
        {row ? <> · {row[lang]}</> : null}
      </p>
      <p className="tnum mt-3 font-serif text-[2rem] leading-[1.1] text-m-paper md:text-[2.5rem]">
        {row ? (
          row.ranges.map(([a, b], i) => (
            <span key={a} className="block">
              <span className="latin">{formatTime(a, lang)}</span>
              <span className="text-[0.6em]"> {lang === "zh" ? "至" : "to"} </span>
              <span className="latin">{formatTime(b, lang)}</span>
              {i < row.ranges.length - 1 && <span className="sr-only">{lang === "zh" ? "，" : " and "}</span>}
            </span>
          ))
        ) : (
          <span className="text-[0.7em]">{t(copy.footer.hours)}</span>
        )}
      </p>
    </div>
  )
}
