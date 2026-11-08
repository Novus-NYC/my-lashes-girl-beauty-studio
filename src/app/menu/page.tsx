import type { Metadata } from "next"
import Link from "next/link"
import { T, Other } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import { lashStyles, addOns, faceBody, mapLabel, type MenuItem, type Bi } from "@/lib/menu"
import LashMap from "@/lib/components/LashMap"
import Reveal from "@/lib/components/Reveal"
import Price from "@/lib/components/Price"
import EndCta from "@/lib/components/EndCta"

export const metadata: Metadata = {
  title: "Menu and prices",
  description:
    "Lash set prices from $80, 2-week and 3-week refills, add-ons, facials, massage and body scrub at My Lash Girl Beauty Studio, 274 Madison Avenue, New York.",
  alternates: { canonical: "/menu" },
}

/** Mobile-only inline label for stacked cells (the real headers stay in <thead>). */
const CellLabel = ({ t }: { t: Bi }) => (
  <span aria-hidden className="anno mb-2 block md:hidden">
    <T t={t} />
  </span>
)

/** Price list with leader dots: name ........ $40, time underneath. */
function LeaderList({ items, tone }: { items: MenuItem[]; tone: "ink" | "nude" }) {
  const muted = tone === "ink" ? "text-m-nude" : "text-m-ink"
  const rule = tone === "ink" ? "border-m-paper/25" : "border-m-ink/25"
  return (
    <ul className={`border-t ${rule}`}>
      {items.map((it, i) => (
        <Reveal as="li" index={i} key={it.id} className={`border-b py-5 md:py-6 ${rule}`}>
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-[1.7rem] leading-tight md:text-[2.4rem]">
              <T t={it.name} />
            </span>
            <span aria-hidden className="leader" />
            <Price value={it.price} className="text-[1.9rem] leading-none md:text-[2.6rem]" />
          </div>
          <p className={`mt-1 flex flex-wrap gap-x-4 text-[0.95rem] ${muted}`}>
            <span>
              <T t={it.duration} />
            </span>
            <Other t={it.name} />
          </p>
        </Reveal>
      ))}
    </ul>
  )
}

export default function MenuPage() {
  const cols = [copy.menu.fullSet, copy.menu.refill2, copy.menu.refill3]
  return (
    <>
      {/* Header + the lash set card (paper) */}
      <section className="bg-m-paper pb-20 pt-10 md:pb-28 md:pt-16">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="anno text-m-mute">
                <T t={copy.menu.card} /> · <Other t={copy.menu.card} />
              </p>
              <h1 className="display d-hero mt-5">
                <T t={copy.menu.title} />
              </h1>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p>
                <T t={copy.menu.lead} />
              </p>
              <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6">
                <T t={copy.common.bookOnSquare} />
                <span className="sr-only">
                  {" "}
                  <T t={copy.common.opensNew} />
                </span>
              </a>
            </div>
          </div>

          {/* The card: a ruled sheet with an ink title strip and a nude "full set" column */}
          <Reveal className="mt-14 border border-m-ink md:mt-20">
            <div className="on-ink flex items-baseline justify-between gap-6 bg-m-ink px-4 py-4 text-m-paper md:px-8 md:py-5">
              <h2 id="lash-sets" className="font-serif text-[2rem] leading-none md:text-[2.6rem]">
                <T t={copy.menu.lashSets} />
              </h2>
              <span className="anno text-m-nude">
                <Other t={copy.menu.lashSets} />
              </span>
            </div>
            <table className="w-full border-collapse text-left" aria-labelledby="lash-sets">
              <thead className="max-md:sr-only">
                <tr className="anno text-m-ink">
                  <th scope="col" className="px-8 py-4 font-semibold">
                    <T t={copy.menu.style} />
                  </th>
                  {cols.map((h, i) => (
                    <th key={h.en} scope="col" className={`w-[19%] px-6 py-4 text-right font-semibold ${i === 0 ? "bg-m-nude" : ""}`}>
                      <T t={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lashStyles.map((s) => {
                  const cells = [
                    { price: s.price, dur: s.duration },
                    { price: s.refill2.price, dur: s.refill2.duration },
                    { price: s.refill3.price, dur: s.refill3.duration },
                  ]
                  return (
                    <tr key={s.id} className="grid grid-cols-3 border-t border-m-ink/25 md:table-row">
                      <th scope="row" className="col-span-3 px-4 pb-3 pt-5 font-normal md:px-8 md:py-6">
                        <Link href={`/styles#${s.id}`} className="group flex items-center gap-4 md:gap-6">
                          <span className="w-[84px] shrink-0 text-m-ink md:w-[120px]">
                            <LashMap lengths={s.lengths} density={s.id} size="xs" annotate={false} label={mapLabel(s)} />
                          </span>
                          <span>
                            <span className="rule-hover block font-serif text-[1.8rem] leading-tight [--ry:-2px] md:text-[2.3rem]">
                              <T t={s.name} />
                            </span>
                            <span className="text-[0.9rem] text-m-mute">
                              <Other t={s.name} />
                            </span>
                          </span>
                        </Link>
                      </th>
                      {cells.map((c, ci) => (
                        <td
                          key={ci}
                          className={`px-4 pb-5 pt-3 align-middle md:px-6 md:py-6 md:text-right ${ci === 0 ? "bg-m-nude" : "border-l border-m-ink/10 md:border-l-0"}`}
                        >
                          <CellLabel t={cols[ci]} />
                          <Price value={c.price} className={ci === 0 ? "block text-[2.2rem] leading-none md:text-[3rem]" : "block text-[1.6rem] leading-none md:text-[2rem]"} />
                          <span className={`mt-1.5 block text-[0.85rem] ${ci === 0 ? "text-m-ink" : "text-m-mute"}`}>
                            <T t={c.dur} />
                          </span>
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* Add-ons (ink): heading left, leader-dot list right */}
      <section className="on-ink bg-m-ink py-20 text-m-paper md:py-28" aria-labelledby="add-ons">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 id="add-ons" className="display d-1">
              <T t={copy.menu.addOns} />
            </h2>
            <p className="anno mt-4 text-m-nude">
              <Other t={copy.menu.addOns} />
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <LeaderList items={addOns} tone="ink" />
          </div>
        </div>
      </section>

      {/* Face and body (nude): flipped, list left, heading right */}
      <section className="bg-m-nude py-20 md:py-28" aria-labelledby="face-body">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <div className="md:order-2 md:col-span-4 md:col-start-9 md:text-right">
            <h2 id="face-body" className="display d-1">
              <T t={copy.menu.faceBody} />
            </h2>
            <p className="anno mt-4 text-m-ink">
              <Other t={copy.menu.faceBody} />
            </p>
          </div>
          <div className="md:order-1 md:col-span-7">
            <LeaderList items={faceBody} tone="nude" />
          </div>
        </div>
      </section>

      <EndCta tone="clay" title={copy.menu.endTitle} link={{ href: "/styles", label: copy.menu.stylesLink }} />
    </>
  )
}
