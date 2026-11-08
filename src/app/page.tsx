import Link from "next/link"
import { T, Other } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import { styleById, mapLabel } from "@/lib/menu"
import LashMap from "@/lib/components/LashMap"
import { photos, Loupe, Half } from "@/lib/components/Photo"
import Reveal from "@/lib/components/Reveal"
import Reviews from "@/lib/components/Reviews"
import StyleExplorer from "@/lib/components/StyleExplorer"
import { TodayBlock } from "@/lib/components/TodayHours"

const NewTab = () => (
  <span className="sr-only">
    {" "}
    <T t={copy.common.opensNew} />
  </span>
)

/** Small paper tag set inside a photo corner: BEFORE / AFTER */
const Tag = ({ t }: { t: { en: string; zh: string } }) => (
  <span className="anno absolute left-0 top-0 z-10 bg-m-rose px-2.5 py-1.5 text-m-paper">
    <T t={t} />
  </span>
)

export default function HomePage() {
  const anime = styleById("anime")
  const corners = { inner: copy.common.inner, outer: copy.common.outer }

  return (
    <>
      {/* 1. Hero (paper): the worksheet. A nude disc (the logo's circle) carrying a large lash map. */}
      <section className="relative overflow-x-clip bg-m-paper">
        <div className="container-site">
          <div className="anno flex items-center justify-between gap-6 border-b border-m-rule py-3.5 text-m-mute">
            <span className="hidden sm:inline">
              <T t={copy.home.sheet} /> · <Other t={copy.home.sheet} />
            </span>
            <span className="sm:text-right">
              <T t={copy.home.annotation} />
            </span>
          </div>

          <div className="grid pb-16 pt-8 md:grid-cols-12 md:gap-x-10 md:pb-20 md:pt-10">
            <div className="relative z-10 flex flex-col md:col-span-7">
              <h1 className="display d-hero max-w-[9.5ch] [word-break:keep-all]">
                <T t={copy.home.title} />
              </h1>
              <p className="mt-6 max-w-[34ch] text-[1.15rem] leading-[1.55] md:mt-8 md:text-[1.2rem]">
                <T t={copy.home.line} />
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-2 md:mt-9">
                <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary">
                  <T t={copy.common.bookOnSquare} />
                  <NewTab />
                </a>
                <Link href="/styles" className="link-under inline-flex min-h-[44px] items-center font-semibold">
                  <T t={copy.home.seeStyles} />
                </Link>
              </div>
              <a
                href={site.classpass}
                target="_blank"
                rel="noreferrer"
                className="mt-9 hidden md:inline-flex min-h-[44px] w-fit items-baseline gap-3 border-t border-m-rule pt-4 text-m-mute transition-colors hover:text-m-ink"
              >
                <span className="latin font-serif text-[2rem] leading-none text-m-ink">{site.rating.score}</span>
                <span className="anno">
                  <T t={copy.reviews.count} />
                </span>
                <NewTab />
              </a>
            </div>

            {/* The sheet */}
            <div className="relative mt-8 h-[112vw] max-h-[520px] md:col-span-5 md:col-start-8 md:mt-0 md:h-[660px] md:max-h-none">
              <div aria-hidden className="absolute left-[8vw] top-0 aspect-square w-[108vw] rounded-full bg-m-nude md:-left-12 md:w-[720px]" />
              {/* mobile map */}
              <div className="absolute inset-x-0 top-[16vw] text-m-ink md:hidden">
                <LashMap lengths={anime.lengths} density="anime" size="md" draw label={mapLabel(anime)} />
              </div>
              {/* desktop map: drawn large, the hero's star */}
              <div className="absolute -left-[150px] top-[56px] hidden w-[720px] text-m-ink md:block">
                <LashMap lengths={anime.lengths} density="anime" size="xl" draw label={mapLabel(anime)} corners={corners} />
              </div>
              <p className="anno absolute bottom-24 right-0 hidden max-w-[18ch] text-right text-m-ink md:block">
                <T t={copy.home.heroMapCaption} />
              </p>

              {/* Loupe: a finished set, shown at native size inside a reticle ring */}
              <figure className="absolute bottom-0 left-0 w-[44vw] max-w-[260px] md:-left-16 md:bottom-0 md:w-[260px]">
                <div className="rounded-full border border-m-ink/40 p-2">
                  <Loupe
                    photo={photos.eyePortrait}
                    alt="Close-up of a client's eye with finished, wispy lash extensions"
                    cx={128}
                    cy={128}
                    d={244}
                    priority
                    sizes="(max-width: 768px) 44vw, 244px"
                  />
                </div>
                <figcaption className="anno mt-3 text-m-ink">
                  <T t={copy.home.loupe} />
                </figcaption>
              </figure>
            </div>

            {/* Phones: the ClassPass proof sits under the sheet so the map shows in the first screen */}
            <a
              href={site.classpass}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-[44px] w-fit items-baseline gap-3 border-t border-m-rule pt-4 text-m-mute md:hidden"
            >
              <span className="latin font-serif text-[2rem] leading-none text-m-ink">{site.rating.score}</span>
              <span className="anno">
                <T t={copy.reviews.count} />
              </span>
              <NewTab />
            </a>
          </div>
        </div>
      </section>

      {/* 2. How a set is designed (ink): Look, Map, Apply, then the style explorer */}
      <section className="on-ink bg-m-ink py-16 text-m-paper md:py-24" aria-labelledby="process-title">
        <div className="container-site">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-5">
              <h2 id="process-title" className="display d-1">
                <T t={copy.home.processTitle} />
              </h2>
              <p className="mt-6 max-w-[34ch] text-m-nude">
                <T t={copy.home.processLead} />
              </p>
            </Reveal>
            <ol className="grid gap-6 sm:grid-cols-3 sm:gap-0 md:col-span-7">
              {copy.home.steps.map((s, i) => (
                <Reveal as="li" index={i} key={s.word.en} className={`border-t pt-4 sm:pr-6 ${i === 1 ? "border-m-paper" : "border-m-paper/30"}`}>
                  <h3 className={`font-serif text-[2.2rem] leading-none ${i === 1 ? "italic" : ""}`}>
                    <T t={s.word} />
                  </h3>
                  <p className="mt-3 text-m-nude">
                    <T t={s.body} />
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="mt-14 md:mt-20">
            <StyleExplorer initial="anime" />
          </div>
        </div>
      </section>

      {/* 3. Before and after (blush): one pair, split and overlapped */}
      <section className="bg-m-blush py-16 text-m-ink md:py-24" aria-labelledby="ba-title">
        <div className="container-site grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-4 md:self-center">
            <h2 id="ba-title" className="display d-1">
              <T t={copy.home.baTitle} />
            </h2>
            <p className="mt-6 max-w-[30ch]">
              <T t={copy.home.baPair} />
            </p>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="link-under mt-6 inline-flex min-h-[44px] items-center font-semibold">
              <T t={copy.home.baLink} />
              <NewTab />
            </a>
          </Reveal>

          <div className="relative md:col-span-8">
            <Reveal className="zoom-hover relative ml-auto w-full max-w-[483px] md:mr-6">
              <Tag t={copy.common.after} />
              <Half
                photo={photos.beforeAfter1}
                alt="After: an eye with long, spiky, separated lash extensions"
                y0={336}
                y1={640}
                sizes="(max-width: 768px) 90vw, 483px"
              />
            </Reveal>
            <Reveal
              index={1}
              className="zoom-hover relative -mt-14 w-[64%] max-w-[300px] outline outline-[10px] outline-m-blush md:absolute md:bottom-[-56px] md:left-[4%] md:mt-0 md:w-[300px]"
            >
              <Tag t={copy.common.before} />
              <Half photo={photos.beforeAfter1} alt="Before: the eye with its natural lashes, before extensions" y0={0} y1={300} sizes="(max-width: 768px) 64vw, 300px" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Reviews (nude) */}
      <Reviews />

      {/* 5. Visit strip (paper) with a nude "today" panel lifted into the rose reviews band */}
      <section className="bg-m-paper pb-16 pt-14 md:pb-24 md:pt-0" aria-labelledby="visit-title">
        <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7 md:pt-20">
            <h2 id="visit-title" className="display d-1 max-w-[10ch]">
              <T t={copy.home.visitTitle} />
            </h2>
            <address className="mt-10 not-italic">
              <span className="latin block font-serif text-[2rem] leading-tight md:text-[2.6rem]">{site.address.line1}</span>
              <span className="block text-m-mute">
                {site.address.line2} · <T t={copy.common.floor} />
              </span>
            </address>
            <p className="mt-5 max-w-[40ch]">
              <T t={copy.common.landmark} />
            </p>
            <Link href="/visit" className="link-under mt-4 inline-flex min-h-[44px] items-center font-semibold">
              <T t={copy.home.visitLink} />
            </Link>
          </Reveal>
          <Reveal index={1} className="relative z-10 flex flex-col gap-6 bg-m-nude p-7 text-m-ink md:col-span-5 md:-mt-24 md:self-start md:p-10">
            <TodayBlock tone="ink" />
            <p>
              <span className="anno block">
                <T t={copy.common.byAppointment} />
              </span>
              <span className="mt-2 block">
                <T t={copy.common.mobile} />
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary">
                <T t={copy.common.bookOnSquare} />
                <NewTab />
              </a>
              <a href={site.phoneHref} className="tnum link-under inline-flex min-h-[44px] items-center text-[1.1rem]">
                <T t={copy.common.call} />
                &nbsp;{site.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
