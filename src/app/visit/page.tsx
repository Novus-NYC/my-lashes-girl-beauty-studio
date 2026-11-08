import type { Metadata } from "next"
import { T } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import Reveal from "@/lib/components/Reveal"
import { HoursTable, TodayBlock } from "@/lib/components/TodayHours"

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
      {/* Hero (paper): the address as the headline, today's hours in a rose panel, and the walk
          from Grand Central drawn as a measured line with five stops, all in the first screen */}
      <section className="relative bg-m-paper pb-14 pt-10 md:pb-20 md:pt-14" aria-labelledby="visit-title">
        <div className="container-site grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <p className="anno text-m-mute">
              <T t={copy.nav.visit} /> · <T t={copy.common.byAppointment} />
            </p>
            <h1 id="visit-title" className="display d-hero latin mt-6">
              <span className="block">274 Madison</span>
              <span className="block italic">Avenue</span>
            </h1>
            <p className="mt-7 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="anno text-m-ink">
                <T t={copy.visit.suite} />
              </span>
              <span className="text-m-mute">
                <T t={copy.common.landmark} />
              </span>
            </p>
          </div>
          <Reveal className="on-rose relative z-10 flex flex-col gap-5 bg-m-rose p-7 text-m-paper md:col-span-4 md:self-start md:p-9">
            <TodayBlock />
            <p>
              <span className="block font-semibold">
                <T t={copy.visit.appointmentOnly} />
              </span>
              <span className="block">
                <T t={copy.visit.arrive} />
              </span>
            </p>
            <div className="flex flex-col items-start gap-2 pt-1">
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

        {/* The route */}
        <div className="container-site mt-12 md:mt-14">
          <h2 className="anno text-m-ink">
            <T t={copy.visit.directionsTitle} />
          </h2>
          <ol className="relative mt-6 grid gap-0 md:mt-8 md:grid-cols-5">
            <span aria-hidden className="absolute bottom-8 left-[7px] top-2 w-px bg-m-ink md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto" />
            {route.map((stop, i) => {
              const last = i === route.length - 1
              return (
                <Reveal as="li" index={i} key={stop.en} className="relative pb-7 pl-10 md:pb-0 md:pl-0 md:pr-6 md:pt-9">
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1 block h-[15px] w-[15px] rounded-full border border-m-ink md:top-0 ${last ? "bg-m-rose" : i === 0 ? "bg-m-nude" : "bg-m-paper"}`}
                  />
                  <p className={`font-serif leading-[1.1] ${last ? "text-[2.4rem] md:text-[3rem]" : "text-[1.55rem] md:text-[1.75rem]"}`}>
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

      {/* Hours and map (nude): 5 / 7 */}
      <section className="bg-m-nude py-16 md:py-24" aria-labelledby="hours-title">
        <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="hours-title" className="display d-2">
                <T t={copy.visit.hoursTitle} />
              </h2>
              <span className="anno text-m-ink">
                <T t={copy.visit.appointmentOnly} />
              </span>
            </div>
            <div className="mt-7">
              {/* Hours from Yelp. TODO confirm with owner (Square shows no hours). */}
              <HoursTable />
            </div>
            <p className="mt-6">
              <T t={copy.common.mobile} />
            </p>
          </Reveal>

          <Reveal index={1} className="md:col-span-7">
            <iframe
              src={site.mapsEmbed}
              title={copy.visit.mapTitle.en}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[340px] w-full md:h-[520px]"
              style={{ filter: "grayscale(1) sepia(.18) contrast(.95)" }}
            />
            <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="link-under mt-4 inline-flex min-h-[44px] items-center font-semibold">
              <T t={copy.visit.openMaps} />
              <NewTab />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Contact (blush): title left, three ways in, each set large */}
      <section className="bg-m-blush py-16 md:py-24" aria-labelledby="contact-title">
        <div className="container-site grid gap-10 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <h2 id="contact-title" className="display d-1 max-w-[10ch] [word-break:keep-all]">
              <T t={copy.visit.contactTitle} />
            </h2>
            <p className="mt-6 max-w-[38ch]">
              <T t={copy.visit.contactLine} />
            </p>
          </Reveal>
          <Reveal index={1} as="ul" className="md:col-span-6 md:col-start-7 md:self-end">
            <li className="flex flex-col gap-1 border-b border-m-ink/20 pb-5">
              <span className="anno text-m-mute">
                <T t={copy.common.book} />
              </span>
              <a href={site.bookUrl} target="_blank" rel="noreferrer" className="link-under inline-flex min-h-[44px] w-fit items-center font-serif text-[2rem] leading-tight md:text-[2.6rem]">
                <T t={copy.common.bookOnSquare} />
                <NewTab />
              </a>
            </li>
            <li className="flex flex-col gap-1 border-b border-m-ink/20 py-5">
              <span className="anno text-m-mute">
                <T t={copy.common.call} />
              </span>
              <a href={site.phoneHref} className="tnum latin link-under inline-flex min-h-[44px] w-fit items-center font-serif text-[2rem] italic leading-tight md:text-[2.6rem]">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex flex-col gap-1 pt-5">
              <span className="anno text-m-mute">
                <T t={copy.common.instagram} />
              </span>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="latin link-under inline-flex min-h-[44px] w-fit items-center break-all font-serif text-[1.6rem] leading-tight md:text-[2.2rem]">
                {site.instagramHandle}
                <NewTab />
              </a>
            </li>
          </Reveal>
        </div>
      </section>
    </>
  )
}
