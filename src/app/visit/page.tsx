import type { Metadata } from "next"
import { T } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import Reveal from "@/lib/components/Reveal"
import { HoursTable } from "@/lib/components/TodayHours"
import Photo, { photos } from "@/lib/components/Photo"

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
  return (
    <>
      <section className="bg-m-paper pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="container-site">
          <p className="anno text-m-mute">
            <T t={copy.nav.visit} /> · <T t={copy.common.byAppointment} />
          </p>
          <h1 className="display d-hero latin mt-6">
            <span className="block">274 Madison</span>
            <span className="block md:pl-[12%]">Avenue</span>
          </h1>
          <div className="mt-10 grid gap-8 border-t border-m-rule pt-6 md:grid-cols-12">
            <p className="anno text-m-ink md:col-span-5">
              <T t={copy.visit.suite} />
            </p>
            <p className="md:col-span-4">
              <T t={copy.common.landmark} />
            </p>
            <div className="flex flex-wrap gap-3 md:col-span-3 md:justify-end">
              <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary">
                <T t={copy.common.bookOnSquare} />
                <NewTab />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-m-rule bg-m-paper py-16 md:py-24">
        <div className="container-site grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="display d-3">
                <T t={copy.visit.directionsTitle} />
              </h2>
              <p className="mt-5 max-w-[42ch]">
                <T t={copy.visit.directions} />
              </p>
              <p className="mt-4 text-m-mute">
                <T t={copy.visit.arrive} />
              </p>
            </Reveal>

            <Reveal index={1} className="mt-14">
              <div className="flex items-baseline justify-between">
                <h2 className="display d-3">
                  <T t={copy.visit.hoursTitle} />
                </h2>
                <span className="anno text-m-mute">
                  <T t={copy.visit.appointmentOnly} />
                </span>
              </div>
              <div className="mt-5">
                {/* Hours from Yelp. TODO confirm with owner (Square shows no hours). */}
                <HoursTable />
              </div>
            </Reveal>
          </div>

          <Reveal index={1} className="md:col-span-7">
            <div className="border border-m-rule">
              <iframe
                src={site.mapsEmbed}
                title={copy.visit.mapTitle.en}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[380px] w-full md:h-[560px]"
                style={{ filter: "grayscale(1) contrast(.95)" }}
              />
            </div>
            <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="link-under mt-4 inline-flex min-h-[44px] items-center font-semibold">
              <T t={copy.visit.openMaps} />
              <NewTab />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="on-ink bg-m-ink py-20 text-m-paper md:py-28" aria-labelledby="contact-title">
        <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-6">
            <h2 id="contact-title" className="display d-2">
              <T t={copy.visit.contactTitle} />
            </h2>
            <p className="mt-6 max-w-[36ch] text-m-nude">
              <T t={copy.common.mobile} />
            </p>
            <ul className="mt-10 flex flex-col gap-4">
              <li>
                <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary-light">
                  <T t={copy.common.bookOnSquare} />
                  <NewTab />
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="tnum link-under inline-flex min-h-[44px] items-center text-[1.5rem]">
                  <T t={copy.common.call} />&nbsp;{site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noreferrer" className="link-under inline-flex min-h-[44px] items-center text-[1.15rem]">
                  {site.instagramHandle}
                  <NewTab />
                </a>
              </li>
            </ul>
          </Reveal>
          <Reveal index={1} className="md:col-span-4 md:col-start-9">
            <Photo
              photo={photos.clientChair}
              alt="A client resting on the lash bed after her set"
              maxWidth={260}
              sizes="(max-width: 768px) 60vw, 300px"
              className="md:ml-auto"
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
