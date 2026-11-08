import type { Metadata } from "next"
import { T } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import Reveal from "@/lib/components/Reveal"
import { HoursTable, TodayBlock } from "@/lib/components/TodayHours"
import { photos, Loupe } from "@/lib/components/Photo"

export const metadata: Metadata = {
  title: "Visit",
  description:
    "274 Madison Avenue, Suite 1205, 12th floor, next to Chipotle at 40th Street, a short walk from Grand Central. Hours, directions, phone and booking.",
  alternates: { canonical: "/visit" },
}

const NewTab = () => (
  <span className="sr-only">
    {" "}
    <T t={copy.common.opensNew} />
  </span>
)

export default function VisitPage() {
  const route = copy.visit.route
  return (
    <>
      {/* Hero (paper): the address as the headline, today's hours in a clay panel that overlaps the next band */}
      <section className="relative bg-m-paper pt-10 md:pt-16">
        <div className="container-site grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <p className="anno text-m-mute">
              <T t={copy.nav.visit} /> · <T t={copy.common.byAppointment} />
            </p>
            <h1 className="display d-hero latin mt-6">
              <span className="block">274 Madison</span>
              <span className="block md:pl-[14%]">Avenue</span>
            </h1>
            <p className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-m-rule pt-5">
              <span className="anno text-m-ink">
                <T t={copy.visit.suite} />
              </span>
              <span className="text-m-mute">
                <T t={copy.common.landmark} />
              </span>
            </p>
          </div>
          <Reveal className="on-clay relative z-10 flex flex-col gap-6 bg-m-clay p-7 text-m-paper md:col-span-4 md:mb-[-120px] md:self-end md:p-9">
            <TodayBlock />
            <p className="text-[0.95rem]">
              <span className="block font-semibold">
                <T t={copy.visit.appointmentOnly} />
              </span>
              <span className="block">
                <T t={copy.visit.arrive} />
              </span>
            </p>
            <div className="flex flex-col items-start gap-2 border-t border-m-paper/30 pt-6">
              <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary-light">
                <T t={copy.common.bookOnSquare} />
                <NewTab />
              </a>
              <a href={site.phoneHref} className="tnum link-under inline-flex min-h-[44px] items-center text-[1.15rem]">
                <T t={copy.common.call} />
                &nbsp;{site.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
        <div className="h-16 md:h-24" />
      </section>

      {/* Route (nude): Grand Central to Suite 1205, drawn as a measured line with stops */}
      <section className="bg-m-nude pb-20 pt-20 md:pb-28 md:pt-40" aria-labelledby="route-title">
        <div className="container-site">
          <Reveal className="grid gap-6 md:grid-cols-12">
            <h2 id="route-title" className="display d-2 md:col-span-6">
              <T t={copy.visit.directionsTitle} />
            </h2>
            <p className="max-w-[44ch] md:col-span-5 md:col-start-8 md:self-end">
              <T t={copy.visit.directions} />
            </p>
          </Reveal>

          <ol className="relative mt-14 grid gap-0 md:mt-20 md:grid-cols-5">
            {/* the line */}
            <span aria-hidden className="absolute bottom-6 left-[7px] top-2 w-px bg-m-ink md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto" />
            {route.map((stop, i) => {
              const last = i === route.length - 1
              return (
                <Reveal as="li" index={i} key={stop.en} className="relative pb-8 pl-10 md:pb-0 md:pl-0 md:pr-6 md:pt-10">
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1 block h-[15px] w-[15px] rounded-full border border-m-ink md:top-0 ${last ? "bg-m-ink" : i === 0 ? "bg-m-nude" : "bg-m-paper"}`}
                  />
                  <p className={`font-serif leading-[1.1] ${last ? "text-[2.4rem] md:text-[3rem]" : "text-[1.6rem] md:text-[1.75rem]"}`}>
                    <T t={stop} />
                  </p>
                  {last && (
                    <p className="anno mt-3 text-m-ink">
                      <T t={copy.common.floor} />
                    </p>
                  )}
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Hours and map (paper): 5 / 7 */}
      <section className="bg-m-paper py-20 md:py-28" aria-labelledby="hours-title">
        <div className="container-site grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="hours-title" className="display d-2">
                <T t={copy.visit.hoursTitle} />
              </h2>
              <span className="anno text-m-mute">
                <T t={copy.visit.appointmentOnly} />
              </span>
            </div>
            <div className="mt-8">
              {/* Hours from Yelp. TODO confirm with owner (Square shows no hours). */}
              <HoursTable />
            </div>
            <p className="mt-6 text-m-mute">
              <T t={copy.common.mobile} />
            </p>
          </Reveal>

          <Reveal index={1} className="md:col-span-7">
            <div className="border border-m-ink">
              <iframe
                src={site.mapsEmbed}
                title={copy.visit.mapTitle.en}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[360px] w-full md:h-[540px]"
                style={{ filter: "grayscale(1) sepia(.18) contrast(.95)" }}
              />
            </div>
            <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="link-under mt-4 inline-flex min-h-[44px] items-center font-semibold">
              <T t={copy.visit.openMaps} />
              <NewTab />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Contact (clay) */}
      <section className="on-clay bg-m-clay py-20 text-m-paper md:py-28" aria-labelledby="contact-title">
        <div className="container-site grid items-center gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7">
            <h2 id="contact-title" className="display d-1 max-w-[12ch]">
              <T t={copy.visit.contactTitle} />
            </h2>
            <ul className="mt-10 flex flex-col items-start gap-3">
              <li>
                <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary-light">
                  <T t={copy.common.bookOnSquare} />
                  <NewTab />
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="tnum link-under inline-flex min-h-[44px] items-center font-serif text-[2rem] md:text-[2.6rem]">
                  <span className="latin">{site.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noreferrer" className="link-under inline-flex min-h-[44px] items-center text-[1.15rem]">
                  <T t={copy.common.instagram} />&nbsp;{site.instagramHandle}
                  <NewTab />
                </a>
              </li>
            </ul>
          </Reveal>
          <Reveal index={1} as="figure" className="md:col-span-4 md:col-start-9">
            <div className="ml-auto w-[70%] max-w-[300px] rounded-full border border-m-paper/50 p-2 md:w-full">
              <Loupe photo={photos.clientChair} alt="A client relaxing on the lash bed after her set" cx={160} cy={300} d={284} sizes="(max-width: 768px) 66vw, 284px" />
            </div>
            <figcaption className="anno mt-4 text-right">
              <T t={copy.about.chairCaption} />
            </figcaption>
          </Reveal>
        </div>
      </section>
    </>
  )
}
