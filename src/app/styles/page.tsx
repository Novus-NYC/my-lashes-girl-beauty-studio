import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { T, Other } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import { lashStyles, styleById, mapLabel, type LashStyle, type Bi } from "@/lib/menu"
import LashMap, { ResponsiveMap } from "@/lib/components/LashMap"
import { photos, Loupe, Half } from "@/lib/components/Photo"
import Reveal from "@/lib/components/Reveal"
import Price from "@/lib/components/Price"

export const metadata: Metadata = {
  title: "Lash styles",
  description:
    "Natural, Full, Anime, Hybrid and Volume lash sets, each shown as a lash map with prices, times and refill prices. 274 Madison Avenue, New York.",
  alternates: { canonical: "/styles" },
}

type Tone = "paper" | "blush" | "ink" | "rose"

const tone: Record<Tone, { bg: string; text: string; muted: string; rule: string; btn: string; extra: string }> = {
  paper: { bg: "bg-m-paper", text: "text-m-ink", muted: "text-m-mute", rule: "border-m-ink/25", btn: "btn-line text-m-ink hover:bg-m-ink hover:text-m-paper", extra: "" },
  blush: { bg: "bg-m-blush", text: "text-m-ink", muted: "text-m-mute", rule: "border-m-ink/25", btn: "btn-line text-m-ink hover:bg-m-ink hover:text-m-paper", extra: "" },
  ink: { bg: "bg-m-ink", text: "text-m-paper", muted: "text-m-nude", rule: "border-m-paper/25", btn: "btn-primary-light", extra: "on-ink" },
  rose: { bg: "bg-m-rose", text: "text-m-paper", muted: "text-m-paper", rule: "border-m-paper/30", btn: "btn-primary-light", extra: "on-rose" },
}

const corners = { inner: copy.common.inner, outer: copy.common.outer }

const NewTab = () => (
  <span className="sr-only">
    {" "}
    <T t={copy.common.opensNew} />
  </span>
)

/** Name, description, the three prices and Book. `compact` is the smaller version used in the Hybrid / Volume pair. */
function Spec({ s, t, compact = false }: { s: LashStyle; t: Tone; compact?: boolean }) {
  const c = tone[t]
  const rows = [
    { k: copy.styles.refill2, price: s.refill2.price, dur: s.refill2.duration },
    { k: copy.styles.refill3, price: s.refill3.price, dur: s.refill3.duration },
  ]
  const H = compact ? "h3" : "h2"
  return (
    <div>
      <H id={`${s.id}-title`} className={`display ${compact ? "d-2" : "d-1"}`}>
        <T t={s.name} />
      </H>
      <p className={`mt-2 ${c.muted}`}>
        <Other t={s.name} />
      </p>
      <p className={`mt-5 max-w-[26ch] font-serif leading-[1.2] ${compact ? "text-[1.4rem] md:min-h-[2.4em]" : "text-[1.6rem]"}`}>
        <T t={s.description} />
      </p>
      <dl className={`mt-7 border-t ${c.rule}`}>
        <div className={`grid grid-cols-[1fr_auto] items-end gap-x-4 border-b py-4 ${c.rule}`}>
          <dt className="anno">
            <T t={copy.styles.set} />
          </dt>
          <dd className="row-span-2 self-end">
            <Price value={s.price} className={`${compact ? "text-[3rem]" : "text-[3.6rem]"} leading-[0.85]`} />
          </dd>
          <dd className={`mt-1.5 ${c.muted}`}>
            <T t={s.duration} />
          </dd>
        </div>
        {rows.map((r) => (
          <div key={r.k.en} className={`flex items-baseline justify-between gap-4 border-b py-3 ${c.rule}`}>
            <dt>
              <T t={r.k} /> <span className={c.muted}>· <T t={r.dur} /></span>
            </dt>
            <dd>
              <Price value={r.price} className="text-[1.6rem] leading-none" />
            </dd>
          </div>
        ))}
      </dl>
      <a href={site.bookUrl} target="_blank" rel="noreferrer" className={`${c.btn} mt-7`}>
        <T t={copy.styles.bookThis} />
        <NewTab />
      </a>
    </div>
  )
}

function MapCaption({ t: tn }: { t: Tone }) {
  return (
    <p className={`anno mt-4 md:pl-[11%] ${tone[tn].muted}`}>
      <T t={copy.common.mmShort} />
    </p>
  )
}

function Section({ s, t, children }: { s: LashStyle; t: Tone; children: ReactNode }) {
  const c = tone[t]
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className={`${c.bg} ${c.text} ${c.extra} scroll-mt-20 overflow-x-clip py-16 md:py-20`}>
      {children}
    </section>
  )
}

const Caption = ({ t, className = "" }: { t: Bi; className?: string }) => (
  <figcaption className={`anno mt-3 ${className}`}>
    <T t={t} />
  </figcaption>
)

export default function StylesPage() {
  const natural = styleById("natural")
  const full = styleById("full")
  const anime = styleById("anime")
  const hybrid = styleById("hybrid")
  const volume = styleById("volume")

  return (
    <>
      {/* Hero (paper): headline and Book left; a finished set in a loupe on the logo's nude disc,
          over the ruled list of all five maps */}
      <section className="overflow-x-clip bg-m-paper pb-16 pt-10 md:pb-20 md:pt-14">
        <div className="container-site grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="relative z-10 md:col-span-6">
            <p className="anno text-m-mute">
              <T t={copy.nav.styles} /> · <T t={copy.styles.indexLabel} />
            </p>
            <h1 className="display d-1 mt-6 max-w-[11ch]">
              <T t={copy.styles.title} />
            </h1>
            <p className="mt-8 max-w-[40ch] text-[1.15rem] leading-[1.55] md:text-[1.25rem]">
              <T t={copy.styles.lead} />
            </p>
            <p className="mt-3 max-w-[44ch] text-m-mute">
              <T t={copy.common.illustrative} />
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary">
                <T t={copy.common.bookOnSquare} />
                <NewTab />
              </a>
              <Link href="/menu" className="link-under inline-flex min-h-[44px] items-center font-semibold">
                <T t={copy.styles.menuLink} />
              </Link>
            </div>
          </div>

          <div className="relative md:col-span-6">
            <div aria-hidden className="absolute -right-[30vw] -top-6 aspect-square w-[78vw] rounded-full bg-m-nude md:-right-28 md:-top-10 md:w-[460px]" />
            <figure className="zoom-hover relative ml-auto w-[60vw] max-w-[268px] md:mr-6">
              <div className="rounded-full border border-m-ink/30 p-2">
                <Loupe
                  photo={photos.closeupPair}
                  alt="Close-up of an eye with a full, defined lash set"
                  cx={250}
                  cy={150}
                  d={252}
                  priority
                  sizes="(max-width: 768px) 58vw, 252px"
                />
              </div>
              <Caption t={copy.styles.captions.hero} className="text-right text-m-ink" />
            </figure>
            <nav aria-label={copy.styles.jump.en} className="relative mt-6">
              <ul className="border-t border-m-ink">
                {lashStyles.map((s) => (
                  <li key={s.id} className="border-b border-m-rule">
                    <a
                      href={`#${s.id}`}
                      className="group grid min-h-[68px] grid-cols-[84px_1fr_auto] items-center gap-4 py-1.5 transition-colors duration-300 hover:bg-m-blush sm:grid-cols-[120px_1fr_auto] sm:gap-6 sm:pr-3"
                    >
                      <span className="text-m-ink">
                        <LashMap lengths={s.lengths} density={s.id} size="xs" annotate={false} label={mapLabel(s)} />
                      </span>
                      <span>
                        <span className="block font-serif text-[1.6rem] leading-none sm:text-[1.9rem]">
                          <T t={s.name} />
                        </span>
                        <span className="mt-1 block text-m-mute group-hover:text-m-ink">
                          <T t={s.duration} />
                        </span>
                      </span>
                      <Price value={s.price} className="text-[1.6rem] sm:text-[1.9rem]" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Natural (blush): map 7, spec 4, loupe breaking the map's corner */}
      <Section s={natural} t="blush">
        <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="relative md:col-span-7 md:self-center">
            <ResponsiveMap lengths={natural.lengths} density="natural" label={mapLabel(natural)} corners={corners} />
            <MapCaption t="blush" />
            <figure className="zoom-hover ml-auto mt-8 w-[56%] max-w-[224px] md:absolute md:-bottom-20 md:right-[-2%] md:mt-0">
              <div className="rounded-full border border-m-ink/30 p-2">
                <Loupe photo={photos.naturalTrio} alt="Close-up of an eye with a soft, natural lash set" cx={215} cy={300} d={208} sizes="(max-width: 768px) 52vw, 208px" />
              </div>
              <Caption t={copy.styles.captions.natural} />
            </figure>
          </Reveal>
          <Reveal index={1} className="md:col-span-4 md:col-start-9">
            <Spec s={natural} t="blush" />
          </Reveal>
        </div>
      </Section>

      {/* Full (paper): flipped, map only, set a little tighter */}
      <Section s={full} t="paper">
        <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:order-2 md:col-span-7 md:col-start-6 md:self-center">
            <ResponsiveMap lengths={full.lengths} density="full" label={mapLabel(full)} corners={corners} />
            <MapCaption t="paper" />
          </Reveal>
          <Reveal index={1} className="md:order-1 md:col-span-4">
            <Spec s={full} t="paper" />
          </Reveal>
        </div>
      </Section>

      {/* Anime (ink): the one style with a real before/after, so it gets the widest stage */}
      <Section s={anime} t="ink">
        <div className="container-site">
          <Reveal>
            <ResponsiveMap lengths={anime.lengths} density="anime" desktop="xl" label={mapLabel(anime)} corners={corners} className="mx-auto md:max-w-[920px]" />
            <MapCaption t="ink" />
          </Reveal>
          <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-10">
            <Reveal className="md:col-span-5">
              <Spec s={anime} t="ink" />
            </Reveal>
            <Reveal index={1} className="md:col-span-6 md:col-start-7">
              <figure>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="zoom-hover relative sm:mt-12">
                    <span className="anno absolute left-0 top-0 z-10 bg-m-paper px-2.5 py-1.5 text-m-ink">
                      <T t={copy.common.before} />
                    </span>
                    <Half photo={photos.animeBeforeAfter} alt="Before: an eye with its natural lashes" y0={0} y1={290} sizes="(max-width: 640px) 90vw, 300px" />
                  </div>
                  <div className="zoom-hover relative">
                    <span className="anno absolute left-0 top-0 z-10 bg-m-paper px-2.5 py-1.5 text-m-ink">
                      <T t={copy.common.after} />
                    </span>
                    <Half photo={photos.animeBeforeAfter} alt="After: the Anime Set, with spiky, separated lashes" y0={338} y1={640} sizes="(max-width: 640px) 90vw, 300px" />
                  </div>
                </div>
                <Caption t={copy.styles.captions.anime} className="text-m-nude" />
              </figure>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Hybrid and Volume (rose): same price, so they share one band, maps side by side */}
      <section aria-labelledby="pair-title" className="on-rose overflow-x-clip bg-m-rose py-16 text-m-paper md:py-20">
        <div className="container-site">
          <Reveal className="grid gap-4 md:grid-cols-12 md:items-end md:gap-10">
            <h2 id="pair-title" className="display d-1 [word-break:keep-all] md:col-span-6">
              <T t={copy.styles.pairTitle} />
            </h2>
            <p className="max-w-[40ch] text-[1.15rem] md:col-span-5 md:col-start-8">
              <T t={copy.styles.pairLead} />
            </p>
          </Reveal>
          <div className="mt-12 grid gap-16 md:mt-14 md:grid-cols-2 md:gap-12">
            {[hybrid, volume].map((s, i) => (
              <Reveal index={i} key={s.id}>
                <article aria-labelledby={`${s.id}-title`}>
                <div id={s.id} className="scroll-mt-24">
                  <LashMap lengths={s.lengths} density={s.id} size="md" label={mapLabel(s)} className="md:hidden" />
                  <LashMap lengths={s.lengths} density={s.id} size="lg" label={mapLabel(s)} className="hidden md:block" />
                  <p className="anno mt-3">
                    <T t={copy.common.mmShort} />
                  </p>
                </div>
                <div className="mt-8">
                  <Spec s={s} t="rose" compact />
                </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Close (nude): one compact strip, a different shape from every other page ending */}
      <section className="bg-m-nude py-12 md:py-16" aria-labelledby="styles-end">
        <Reveal className="container-site grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
          <div className="md:col-span-7">
            <h2 id="styles-end" className="display d-2">
              <T t={copy.styles.endTitle} />
            </h2>
            <p className="mt-4 max-w-[46ch]">
              <T t={copy.styles.endLine} />
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 md:col-span-5 md:justify-end">
            <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary">
              <T t={copy.common.bookOnSquare} />
              <NewTab />
            </a>
            <Link href="/menu" className="link-under inline-flex min-h-[44px] items-center font-semibold">
              <T t={copy.styles.menuLink} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
