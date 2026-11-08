"use client"

import { useEffect, useState } from "react"
import { hours, formatRanges, type Day } from "@/lib/site"
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

/** Full week table, today's row marked with a rule, weight and a text label. */
export function HoursTable({ tone = "paper" }: { tone?: "paper" | "nude" }) {
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
              className={`border-t border-m-rule last:border-b ${isToday ? (tone === "nude" ? "bg-m-paper/60" : "bg-m-nude/60") : ""}`}
              aria-current={isToday ? "date" : undefined}
            >
              <th scope="row" className={`py-3 pl-3 pr-4 align-top ${isToday ? "font-semibold" : "font-normal"}`}>
                {row[lang]}
                {isToday && <span className="anno ml-3 text-m-ink">· {t(copy.common.today)}</span>}
              </th>
              <td className={`tnum py-3 pr-3 text-right align-top ${isToday ? "font-semibold" : ""}`}>{formatRanges(row.ranges, lang)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/** One line: today's hours. Falls back to a neutral line before mount. */
export function TodayLine() {
  const { lang, t } = useLang()
  const today = useNYDay()
  const row = hours.find((h) => h.day === today)
  return (
    <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="anno text-m-clay">{t(copy.common.today)}</span>
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
