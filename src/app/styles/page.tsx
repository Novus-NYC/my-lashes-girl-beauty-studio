import type { Metadata } from "next"
import type { ReactNode } from "react"
import { T, Other } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import { lashStyles, styleById, mapLabel, type LashStyle, type Bi } from "@/lib/menu"
import LashMap, { ResponsiveMap } from "@/lib/components/LashMap"
import { photos, Loupe, Half } from "@/lib/components/Photo"
import Reveal from "@/lib/components/Reveal"
import Price from "@/lib/components/Price"
import EndCta from "@/lib/components/EndCta"

export const metadata: Metadata = {
  title: "Lash styles",
  description:
    "Natural, Full, Anime, Hybrid and Volume lash sets, each shown as a lash map with prices, times and refill prices. 274 Madison Avenue, New York.",
  alternates: { canonical: "/styles" },
}

type Tone = "paper" | "nude" | "ink" | "clay"

const tone: Record<Tone, { bg: string; text: string; muted: string; rule: string; btn: string; extra: string }> = {
  paper: { bg: "bg-m-paper", text: "text-m-ink", muted: "text-m-mute", rule: "border-m-ink/25", btn: "btn-line text-m-ink hover:bg-m-ink hover:text-m-paper", extra: "" },
  nude: { bg: "bg-m-nude", text: "text-m-ink", muted: "text-m-ink", rule: "border-m-ink/25", btn: "btn-line text-m-ink hover:bg-m-ink hover:text-m-paper", extra: "" },
  ink: { bg: "bg-m-ink", text: "text-m-paper", muted: "text-m-nude", rule: "border-m-paper/25", btn: "btn-primary-light", extra: "on-ink" },
  clay: { bg: "bg-m-clay", text: "text-m-paper", muted: "text-m-paper", rule: "border-m-paper/30", btn: "btn-primary-light", extra: "on-clay" },
}

const corners = { inner: copy.common.inner, outer: copy.common.outer }

/** Name, description, the three prices and Book. `wide` lays it out as two halves under a full-width map. */
function Spec({ s, t, wide = false }: { s: LashStyle; t: Tone; wide?: boolean }) {
  const c = tone[t]
  const rows = [
    { k: copy.styles.refill2, price: s.refill2.price, dur: s.refill2.duration },
    { k: copy.styles.refill3, price: s.refill3.price, dur: s.refill3.duration },
  ]
  const book = (
    <a href={site.bookUrl} target="_blank" rel="noreferrer" className={`${c.btn} mt-9`}>
      <T t={copy.styles.bookThis} />
      <span className="sr-only">
        {" "}
        <T t={copy.common.opensNew} />
      </span>
    </a>
  )
  return (
    <div className={wide ? "grid md:grid-cols-12 md:gap-x-10" : ""}>
      <div className={wide ? "md:col-span-5" : ""}>
        <h2 id={`${s.id}-title`} className="display d-1">
          <T t={s.name} />
        </h2>
        <p className={`mt-3 text-[1.05rem] ${c.muted}`}>
          <Other t={s.name} />
        </p>
        <p className="mt-7 max-w-[24ch] font-serif text-[1.6rem] leading-[1.2]">
          <T t={s.description} />
        </p>
        {wide && <div className="hidden md:block">{book}</div>}
      </div>
      <div className={wide ? "md:col-span-6 md:col-start-7 md:self-end" : ""}>
        <dl className={`mt-9 border-t ${c.rule}`}>
          <div className={`grid grid-cols-[1fr_auto] items-end gap-x-4 border-b py-4 ${c.rule}`}>
            <dt className="anno">
              <T t={copy.styles.set} />
            </dt>
            <dd className="row-span-2 self-end">
              <Price value={s.price} className="text-[3.6rem] leading-[0.85]" />
            </dd>
            <dd className={`mt-1.5 text-[0.95rem] ${c.muted}`}>
              <T t={s.duration} />
            </dd>
          </div>
          {rows.map((r) => (
            <div key={r.k.en} className={`flex items-baseline justify-between gap-4 border-b py-3 ${c.rule}`}>
              <dt className="text-[0.95rem]">
                <T t={r.k} /> <span className={c.muted}>· <T t={r.dur} /></span>
              </dt>
              <dd>
                <Price value={r.price} className="text-[1.6rem] leading-none" />
              </dd>
            </div>
          ))}
        </dl>
        <div className={wide ? "md:hidden" : ""}>{book}</div>
      </div>
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
    <section id={s.id} aria-labelledby={`${s.id}-title`} className={`${c.bg} ${c.text} ${c.extra} scroll-mt-20 overflow-x-clip py-20 md:py-28`}>
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
      {/* Index (paper): headline left, a ruled list of the five maps right */}
      <section className="bg-m-paper pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <p className="anno text-m-mute">
              <T t={copy.nav.styles} /> · <T t={copy.styles.indexLabel} />
            </p>
            <h1 className="display d-1 mt-6 max-w-[11ch]">
              <T t={copy.styles.title} />
            </h1>
            <p className="mt-8 max-w-[40ch] text-[1.15rem]">
              <T t={copy.styles.lead} />
            </p>
            <p className="mt-3 max-w-[40ch] text-m-mute">
              <T t={copy.common.illustrative} />
            </p>
          </div>
          <nav aria-label={copy.styles.jump.en} className="md:col-span-6 md:col-start-7 md:pt-4">
            <ul className="border-t border-m-ink">
              {lashStyles.map((s) => (
                <li key={s.id} className="border-b border-m-rule">
                  <a
                    href={`#${s.id}`}
                    className="group grid min-h-[72px] grid-cols-[88px_1fr_auto] items-center gap-4 py-2 transition-colors duration-300 hover:bg-m-nude sm:grid-cols-[128px_1fr_auto] sm:gap-6 sm:pr-3"
                  >
                    <span className="text-m-ink">
                      <LashMap lengths={s.lengths} density={s.id} size="xs" annotate={false} label={mapLabel(s)} />
                    </span>
                    <span>
                      <span className="block font-serif text-[1.6rem] leading-none sm:text-[2rem]">
                        <T t={s.name} />
                      </span>
                      <span className="mt-1 block text-[0.85rem] text-m-mute group-hover:text-m-ink">
                        <T t={s.duration} />
                      </span>
                    </span>
                    <Price value={s.price} className="text-[1.6rem] sm:text-[2rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Natural (nude): map 7, spec 4, loupe breaking the map's corner */}
      <Section s={natural} t="nude">
        <div className="container-site grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="relative md:col-span-7">
            <ResponsiveMap lengths={natural.lengths} density="natural" label={mapLabel(natural)} corners={corners} />
            <MapCaption t="nude" />
            <figure className="zoom-hover ml-auto mt-10 w-[58%] max-w-[240px] md:absolute md:-bottom-28 md:right-[-2%] md:mt-0">
              <div className="rounded-full border border-m-ink/40 p-2">
                <Loupe photo={photos.naturalTrio} alt="Close-up of an eye with a soft, natural lash set" cx={215} cy={300} d={224} sizes="(max-width: 768px) 56vw, 224px" />
              </div>
              <Caption t={copy.styles.captions.natural} />
            </figure>
          </Reveal>
          <Reveal index={1} className="md:col-span-4 md:col-start-9">
            <Spec s={natural} t="nude" />
          </Reveal>
        </div>
      </Section>

      {/* Full (paper): flipped, loupe above-left of the map */}
      <Section s={full} t="paper">
        <div className="container-site grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:order-2 md:col-span-7 md:col-start-6">
            <figure className="zoom-hover mb-10 w-[58%] max-w-[260px] md:-ml-16 md:mb-4">
              <div className="rounded-full border border-m-ink/40 p-2">
                <Loupe photo={photos.closeupPair} alt="Close-up of an eye with a full, defined lash set" cx={250} cy={150} d={244} sizes="(max-width: 768px) 56vw, 244px" />
              </div>
              <Caption t={copy.styles.captions.full} className="text-m-mute" />
            </figure>
            <ResponsiveMap lengths={full.lengths} density="full" label={mapLabel(full)} corners={corners} />
            <MapCaption t="paper" />
          </Reveal>
          <Reveal index={1} className="md:order-1 md:col-span-4 md:self-end">
            <Spec s={full} t="paper" />
          </Reveal>
        </div>
      </Section>

      {/* Anime (ink): the one style with a real before/after, so it gets the widest stage */}
      <Section s={anime} t="ink">
        <div className="container-site">
          <Reveal>
            <ResponsiveMap lengths={anime.lengths} density="anime" desktop="xl" label={mapLabel(anime)} corners={corners} className="mx-auto md:max-w-[1000px]" />
            <MapCaption t="ink" />
          </Reveal>
          <div className="mt-16 grid gap-14 md:grid-cols-12 md:gap-10">
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

      {/* Hybrid (clay): map only, drawn wide, spec as a row underneath */}
      <Section s={hybrid} t="clay">
        <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-10 md:col-start-2">
            <ResponsiveMap lengths={hybrid.lengths} density="hybrid" desktop="xl" label={mapLabel(hybrid)} corners={corners} />
            <MapCaption t="clay" />
          </Reveal>
          <Reveal index={1} className="md:col-span-12">
            <Spec s={hybrid} t="clay" wide />
          </Reveal>
        </div>
      </Section>

      {/* Volume (paper): spec left, map right, map only */}
      <Section s={volume} t="paper">
        <div className="container-site grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:order-2 md:col-span-7 md:col-start-6 md:self-center">
            <ResponsiveMap lengths={volume.lengths} density="volume" label={mapLabel(volume)} corners={corners} />
            <MapCaption t="paper" />
          </Reveal>
          <Reveal index={1} className="md:order-1 md:col-span-4">
            <Spec s={volume} t="paper" />
          </Reveal>
        </div>
      </Section>

      <EndCta tone="nude" title={copy.menu.endTitle} link={{ href: "/menu", label: copy.styles.menuLink }} />
    </>
  )
}
