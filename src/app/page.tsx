import Link from "next/link"
import { T, Other } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import { lashStyles, styleById, mmRange } from "@/lib/menu"
import LashMap from "@/lib/components/LashMap"
import Photo, { photos } from "@/lib/components/Photo"
import Reveal from "@/lib/components/Reveal"
import Reviews from "@/lib/components/Reviews"
import Price from "@/lib/components/Price"
import { TodayLine } from "@/lib/components/TodayHours"

const NewTab = () => (
  <span className="sr-only">
    {" "}
    <T t={copy.common.opensNew} />
  </span>
)

export default function HomePage() {
  const anime = styleById("anime")

  return (
    <>
      {/* 1. Hero (paper) */}
      <section className="bg-m-paper">
        <div className="container-site grid gap-y-14 pb-16 pt-8 md:grid-cols-12 md:gap-x-10 md:pb-32 md:pt-14">
          <div className="flex flex-col md:col-span-7">
            <p className="anno text-m-mute">
              <T t={copy.home.annotation} />
            </p>
            <h1 className="display d-hero mt-7 max-w-[11ch]">
              <T t={copy.home.title} />
            </h1>
            <p className="mt-8 max-w-[36ch] text-[1.2rem] leading-[1.55]">
              <T t={copy.home.line} />
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
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
              className="anno mt-10 inline-flex min-h-[44px] w-fit items-center gap-3 border-t border-m-rule pt-4 text-m-mute transition-colors hover:text-m-ink"
            >
              <T t={copy.home.proof} />
              <NewTab />
            </a>
          </div>

          <div className="md:col-span-5">
            <div className="relative ml-auto w-[min(76vw,440px)] md:mr-0">
              <Photo
                photo={photos.eyePortrait}
                alt="A client's eyes with finished, wispy lash extensions, looking at the camera"
                caption={copy.home.heroCaption}
                maxWidth={440}
                priority
                sizes="(max-width: 768px) 76vw, 440px"
                className="ml-auto text-right"
              />
              <div className="absolute -left-6 bottom-12 w-[82%] border border-m-rule bg-m-paper px-3 pb-3 pt-2 md:-left-20 md:bottom-16 md:w-[96%] md:px-5 md:pb-4 md:pt-3">
                <LashMap
                  lengths={anime.lengths}
                  density="anime"
                  size="md"
                  draw
                  label={`Lash map for the Anime Set: ${mmRange(anime.lengths)} millimetres`}
                />
                <p className="anno mt-1 flex justify-between text-m-mute">
                  <T t={copy.home.heroMapCaption} />
                  <span className="hidden sm:inline">
                    <T t={{ en: "Inner → outer", zh: "内 → 外" }} />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Style index (nude) */}
      <section className="bg-m-nude py-20 md:py-28" aria-labelledby="index-title">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-7">
              <h2 id="index-title" className="display d-2">
                <T t={copy.home.indexTitle} />
              </h2>
            </Reveal>
            <Reveal index={1} className="md:col-span-4 md:col-start-9">
              <p className="text-m-ink">
                <T t={copy.home.indexLead} />
              </p>
              <Link href="/styles" className="link-under mt-3 inline-flex min-h-[44px] items-center font-semibold">
                <T t={copy.home.indexLink} />
              </Link>
            </Reveal>
          </div>

          <ul className="snap-row -mx-5 mt-12 flex scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-16 md:grid md:grid-cols-5 md:gap-0 md:overflow-visible md:px-0 md:pb-0">
            {lashStyles.map((s, i) => (
              <Reveal
                as="li"
                index={i}
                key={s.id}
                className="w-[85vw] max-w-[340px] shrink-0 border-t border-m-ink/30 md:w-auto md:max-w-none md:border-l md:px-5 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
              >
                <Link href={`/styles#${s.id}`} className="group block pb-6 pt-6">
                  <LashMap lengths={s.lengths} density={s.id} size="sm" label={`Lash map for the ${s.name.en}: ${mmRange(s.lengths)} millimetres`} />
                  <h3 className="mt-6 font-serif text-[2rem] leading-none transition-colors group-hover:text-m-clay">
                    <T t={s.short} />
                  </h3>
                  <p className="mt-1 text-[0.9rem] text-m-ink">
                    <Other t={s.short} />
                  </p>
                  <p className="mt-5 flex items-baseline justify-between gap-3 border-t border-m-ink/20 pt-3">
                    <Price value={s.price} className="text-[1.6rem] leading-none" />
                    <span className="anno text-m-ink">
                      <T t={s.duration} />
                    </span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
          <p className="anno mt-6 text-m-ink">
            <T t={copy.common.illustrative} />
          </p>
        </div>
      </section>

      {/* 3. How a set is designed (paper) */}
      <section className="bg-m-paper py-20 md:py-32" aria-labelledby="process-title">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <h2 id="process-title" className="display d-2">
                <T t={copy.home.processTitle} />
              </h2>
            </Reveal>
            <Reveal index={1} className="md:col-span-4 md:col-start-9 md:self-end">
              <p className="text-m-mute">
                <T t={copy.home.processLead} />
              </p>
            </Reveal>
          </div>

          <ol className="relative mt-14 grid gap-12 border-l border-m-ink/40 pl-8 md:mt-20 md:grid-cols-[1fr_1.25fr_1fr] md:gap-10 md:border-l-0 md:border-t md:pl-0">
            {copy.home.steps.map((s, i) => (
              <Reveal as="li" index={i} key={s.word.en} className="relative md:pt-10">
                {/* tick on the hairline */}
                <span aria-hidden className="absolute -left-8 top-3 h-px w-4 bg-m-ink md:left-0 md:top-[-8px] md:h-4 md:w-px" />
                <h3 className="display d-2">
                  <T t={s.word} />
                </h3>
                <p className="mt-4 max-w-[30ch] text-m-ink">
                  <T t={s.body} />
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Before and after (ink) */}
      <section className="on-ink bg-m-ink py-20 text-m-paper md:py-28" aria-labelledby="ba-title">
        <div className="container-site grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-4">
            <h2 id="ba-title" className="display d-2">
              <T t={copy.home.baTitle} />
            </h2>
            <p className="mt-6 max-w-[34ch] text-m-nude">
              <T t={copy.home.baBody} />
            </p>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="link-under mt-6 inline-flex min-h-[44px] items-center font-semibold">
              <T t={copy.home.baLink} />
              <NewTab />
            </a>
          </Reveal>
          <div className="grid grid-cols-2 items-start gap-3 sm:gap-6 md:col-span-8 md:flex md:justify-end md:gap-8">
            <Reveal className="md:w-[360px]">
              <Photo
                photo={photos.beforeAfter1}
                alt="One eye before lash extensions (top) and after, with long wispy lashes (bottom)"
                caption={copy.home.baCaption1}
                maxWidth={360}
                sizes="(max-width: 768px) 45vw, 360px"
                captionClass="text-m-nude"
              />
            </Reveal>
            <Reveal index={1} className="mt-12 md:mt-28 md:w-[360px]">
              <Photo
                photo={photos.animeBeforeAfter}
                alt="An eye before (top) and after an Anime Set with spiky, separated lashes (bottom)"
                caption={copy.home.baCaption2}
                maxWidth={360}
                sizes="(max-width: 768px) 45vw, 360px"
                captionClass="text-m-nude"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Reviews (nude) */}
      <Reviews />

      {/* 6. Visit strip (paper) */}
      <section className="bg-m-paper py-20 md:py-28" aria-labelledby="visit-title">
        <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7">
            <h2 id="visit-title" className="display d-2 max-w-[12ch]">
              <T t={copy.home.visitTitle} />
            </h2>
            <address className="mt-10 not-italic">
              <span className="block font-serif text-[1.9rem] leading-tight md:text-[2.4rem]">{site.address.line1}</span>
              <span className="block text-m-mute">
                {site.address.line2} · <T t={copy.common.floor} />
              </span>
            </address>
            <p className="mt-5 max-w-[40ch]">
              <T t={copy.common.landmark} />
            </p>
          </Reveal>
          <Reveal index={1} className="flex flex-col gap-6 md:col-span-4 md:col-start-9 md:self-end">
            <TodayLine />
            <a href={site.phoneHref} className="tnum link-under inline-flex min-h-[44px] w-fit items-center text-[1.15rem]">
              {site.phoneDisplay}
            </a>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-line text-m-ink hover:bg-m-ink hover:text-m-paper">
                <T t={copy.common.book} />
                <NewTab />
              </a>
              <Link href="/visit" className="link-under inline-flex min-h-[44px] items-center font-semibold">
                <T t={copy.home.visitLink} />
              </Link>
            </div>
            <p className="border-t border-m-rule pt-4 text-m-mute">
              <T t={copy.common.mobile} />
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
