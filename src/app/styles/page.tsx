import type { Metadata } from "next"
import { T, Other } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import { lashStyles, mmRange, type StyleId } from "@/lib/menu"
import LashMap from "@/lib/components/LashMap"
import Photo, { photos } from "@/lib/components/Photo"
import Reveal from "@/lib/components/Reveal"
import Price from "@/lib/components/Price"
import EndCta from "@/lib/components/EndCta"

export const metadata: Metadata = {
  title: "Lash styles",
  description:
    "Natural, Full, Anime, Hybrid and Volume lash sets, each shown as a lash map with prices, times and refill prices. 274 Madison Avenue, New York.",
  alternates: { canonical: "/styles" },
}

// Photos only where they match the style (DESIGN.md §6). Hybrid and Volume are map only.
const stylePhoto: Partial<Record<StyleId, { photo: (typeof photos)[keyof typeof photos]; alt: string; caption: { en: string; zh: string } }>> = {
  natural: {
    photo: photos.naturalTrio,
    alt: "Three close-ups of eyes with soft, natural lash extensions",
    caption: copy.styles.captions.natural,
  },
  full: {
    photo: photos.closeupPair,
    alt: "Two extreme close-ups of one eye with full, wispy lash extensions",
    caption: copy.styles.captions.full,
  },
  anime: {
    photo: photos.animeBeforeAfter,
    alt: "An eye before (top) and after an Anime Set with spiky, separated lashes (bottom)",
    caption: copy.styles.captions.anime,
  },
}

export default function StylesPage() {
  return (
    <>
      <section className="bg-m-paper pb-16 pt-10 md:pb-20 md:pt-16">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="anno text-m-mute">
              <T t={copy.nav.styles} /> · 5
            </p>
            <h1 className="display d-1 mt-6 max-w-[14ch]">
              <T t={copy.styles.title} />
            </h1>
          </div>
          <div className="md:col-span-4 md:self-end">
            <p>
              <T t={copy.styles.lead} />
            </p>
            <p className="mt-3 text-m-mute">
              <T t={copy.common.illustrative} />
            </p>
          </div>
        </div>
        <nav aria-label={copy.styles.jump.en} className="container-site mt-12">
          <ul className="flex flex-wrap border-t border-m-rule">
            {lashStyles.map((s) => (
              <li key={s.id} className="w-1/2 border-b border-m-rule sm:w-1/3 md:w-1/5">
                <a href={`#${s.id}`} className="flex min-h-[56px] items-baseline justify-between gap-3 py-3 pr-4 transition-colors hover:text-m-clay">
                  <span className="font-serif text-[1.35rem]">
                    <T t={s.short} />
                  </span>
                  <Price value={s.price} className="text-[1.1rem] text-m-mute" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {lashStyles.map((s, i) => {
        const flip = i % 2 === 1
        const ph = stylePhoto[s.id]
        const bg = flip ? "bg-m-nude" : "bg-m-paper"
        const muted = flip ? "text-m-ink" : "text-m-mute"
        return (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className={`${bg} scroll-mt-20 border-t border-m-rule py-20 md:py-28`}>
            <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
              {/* map + photo */}
              <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                <Reveal>
                  <LashMap
                    lengths={s.lengths}
                    density={s.id}
                    size="lg"
                    label={`Lash map for the ${s.name.en}: ${mmRange(s.lengths)} millimetres, inner corner to outer corner`}
                  />
                  <p className={`anno mt-4 ${muted}`}>
                    <T t={copy.common.mmNote} />
                  </p>
                </Reveal>
                {ph ? (
                  <Reveal index={1} className={`mt-12 flex ${flip ? "md:justify-start" : "md:justify-end"}`}>
                    <Photo photo={ph.photo} alt={ph.alt} caption={ph.caption} maxWidth={340} sizes="(max-width: 768px) 80vw, 340px" captionClass={muted} />
                  </Reveal>
                ) : null}
              </div>

              {/* spec */}
              <Reveal index={1} className={`md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
                <h2 id={`${s.id}-title`} className="display d-1">
                  <T t={s.name} />
                </h2>
                <p className={`mt-3 text-[1.05rem] ${muted}`}>
                  <Other t={s.name} />
                </p>
                <p className="mt-8 font-serif text-[1.6rem] leading-[1.25]">
                  <T t={s.description} />
                </p>

                <dl className="mt-10 border-t border-m-ink/30">
                  {[
                    { k: copy.styles.set, price: s.price, dur: s.duration },
                    { k: copy.styles.refill2, price: s.refill2.price, dur: s.refill2.duration },
                    { k: copy.styles.refill3, price: s.refill3.price, dur: s.refill3.duration },
                  ].map((row, ri) => (
                    <div key={ri} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-m-ink/20 py-4">
                      <dt className="anno text-m-ink">
                        <T t={row.k} />
                      </dt>
                      <dd className="row-span-2 text-right">
                        <Price value={row.price} className={ri === 0 ? "text-[2.6rem] leading-none" : "text-[1.8rem] leading-none"} />
                      </dd>
                      <dd className={`text-[0.9rem] ${muted}`}>
                        <T t={row.dur} />
                      </dd>
                    </div>
                  ))}
                </dl>

                <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-line mt-10 text-m-ink hover:bg-m-ink hover:text-m-paper">
                  <T t={copy.styles.bookThis} />
                  <span className="sr-only">
                    {" "}
                    <T t={copy.common.opensNew} />
                  </span>
                </a>
              </Reveal>
            </div>
          </section>
        )
      })}

      <EndCta title={copy.menu.endTitle} link={{ href: "/menu", label: copy.styles.menuLink }} />
    </>
  )
}
