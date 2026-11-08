import type { Metadata } from "next"
import { T, Other } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { lashStyles, addOns, faceBody, mmRange, type MenuItem, type Bi } from "@/lib/menu"
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
  <span aria-hidden className="anno mb-1 block min-h-[2.9em] text-m-mute md:hidden">
    <T t={t} />
  </span>
)

function GroupHeading({ id, t }: { id: string; t: Bi }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-m-ink pb-4">
      <h2 id={id} className="display d-2">
        <T t={t} />
      </h2>
      <span className="anno text-m-mute">
        <Other t={t} />
      </span>
    </div>
  )
}

function SimpleTable({ id, title, items }: { id: string; title: Bi; items: MenuItem[] }) {
  return (
    <Reveal className="mt-20 md:mt-28">
      <div>
        <GroupHeading id={id} t={title} />
        <table className="w-full border-collapse text-left" aria-labelledby={id}>
          <thead className="max-md:sr-only">
            <tr className="anno text-m-mute">
              <th scope="col" className="py-3 font-semibold">
                <T t={copy.menu.service} />
              </th>
              <th scope="col" className="py-3 text-right font-semibold">
                <T t={copy.menu.time} />
              </th>
              <th scope="col" className="w-[9rem] py-3 text-right font-semibold">
                <T t={copy.menu.price} />
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-t border-m-rule py-4 md:table-row md:py-0">
                <th scope="row" className="col-span-2 font-normal md:py-5">
                  <span className="font-serif text-[1.55rem] leading-tight md:text-[1.75rem]">
                    <T t={it.name} />
                  </span>
                  <span className="block text-[0.9rem] text-m-mute sm:ml-3 sm:inline">
                    <Other t={it.name} />
                  </span>
                </th>
                <td className="text-m-mute md:py-5 md:text-right">
                  <T t={it.duration} />
                </td>
                <td className="text-right md:py-5">
                  <Price value={it.price} className="text-[1.6rem] md:text-[1.9rem]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  )
}

export default function MenuPage() {
  return (
    <>
      <section className="bg-m-paper pb-24 pt-10 md:pb-32 md:pt-16">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-12">
            <h1 className="display d-1 md:col-span-7">
              <T t={copy.menu.title} />
            </h1>
            <p className="md:col-span-4 md:col-start-9 md:self-end">
              <T t={copy.menu.lead} />
            </p>
          </div>

          {/* Lash sets: set / 2-week refill / 3-week refill */}
          <Reveal className="mt-16 md:mt-24">
            <GroupHeading id="lash-sets" t={copy.menu.lashSets} />
            <table className="w-full border-collapse text-left" aria-labelledby="lash-sets">
              <thead className="max-md:sr-only">
                <tr className="anno text-m-mute">
                  <th scope="col" className="py-3 font-semibold">
                    <T t={copy.menu.service} />
                  </th>
                  {[copy.menu.fullSet, copy.menu.refill2, copy.menu.refill3].map((h) => (
                    <th key={h.en} scope="col" className="w-[17%] py-3 text-right font-semibold">
                      <T t={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lashStyles.map((s) => (
                  <tr key={s.id} className="grid grid-cols-3 gap-x-3 gap-y-3 border-t border-m-rule py-5 md:table-row md:py-0">
                    <th scope="row" className="col-span-3 font-normal md:py-6">
                      <span className="flex items-center gap-5">
                        <span className="hidden w-[120px] shrink-0 text-m-ink md:block">
                          <LashMap lengths={s.lengths} density={s.id} size="xs" annotate={false} label={`Lash map for the ${s.name.en}: ${mmRange(s.lengths)} millimetres`} />
                        </span>
                        <span>
                          <span className="block font-serif text-[1.75rem] leading-tight md:text-[2.1rem]">
                            <T t={s.name} />
                          </span>
                          <span className="text-[0.9rem] text-m-mute">
                            <Other t={s.name} />
                          </span>
                        </span>
                      </span>
                    </th>
                    {[
                      { label: copy.menu.fullSet, price: s.price, dur: s.duration },
                      { label: copy.menu.refill2, price: s.refill2.price, dur: s.refill2.duration },
                      { label: copy.menu.refill3, price: s.refill3.price, dur: s.refill3.duration },
                    ].map((c, ci) => (
                      <td key={ci} className="align-baseline md:py-6 md:text-right">
                        <CellLabel t={c.label} />
                        <Price value={c.price} className={ci === 0 ? "block text-[1.75rem] leading-none md:text-[2.2rem]" : "block text-[1.5rem] leading-none md:text-[1.8rem]"} />
                        <span className="mt-1 block text-[0.85rem] text-m-mute">
                          <T t={c.dur} />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <div className="grid md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <SimpleTable id="add-ons" title={copy.menu.addOns} items={addOns} />
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <SimpleTable id="face-body" title={copy.menu.faceBody} items={faceBody} />
            </div>
          </div>

        </div>
      </section>

      <EndCta title={copy.menu.endTitle} link={{ href: "/styles", label: copy.menu.stylesLink }} />
    </>
  )
}
