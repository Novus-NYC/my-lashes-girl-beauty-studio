import Link from "next/link"
import { T } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { navLinks } from "@/lib/nav"
import { site } from "@/lib/site"
import EyeMark from "./EyeMark"
import { TodayLine } from "./TodayHours"

const external = [
  { href: site.instagram, label: copy.common.instagram },
  { href: site.classpass, label: { en: "ClassPass", zh: "ClassPass" } },
  { href: site.yelp, label: { en: "Yelp", zh: "Yelp" } },
]

export default function Footer() {
  return (
    <footer className="on-ink bg-m-ink text-m-paper">
      {/* Sign-off: the logo lettering set large, with today's hours, phone and Book beside it */}
      <div className="container-site grid gap-10 border-b border-m-paper/20 pb-14 pt-16 md:grid-cols-12 md:items-end md:gap-8 md:pt-24">
        <Link href="/" aria-label={copy.nav.home.en} className="group flex items-center gap-4 md:col-span-8 md:gap-6">
          <EyeMark className="h-12 w-12 shrink-0 md:h-24 md:w-24" />
          <span className="flex flex-col leading-none">
            <span className="font-sans text-[clamp(1.55rem,4.5vw,4.6rem)] font-light uppercase tracking-[0.16em]">My Lash Girl</span>
            <span className="mt-3 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.42em] text-m-nude md:text-[1rem]">Beauty Studio</span>
          </span>
        </Link>
        <div className="flex flex-col items-start gap-2 md:col-span-4 md:col-start-9">
          <TodayLine tone="ink" />
          <a href={site.phoneHref} className="tnum link-under inline-flex min-h-[44px] w-fit items-center text-[1.15rem]">
            <T t={copy.common.call} />
            &nbsp;{site.phoneDisplay}
          </a>
          <a href={site.bookUrl} target="_blank" rel="noreferrer" className="link-under inline-flex min-h-[44px] items-center font-semibold">
            <T t={copy.common.bookOnSquare} />
            <span className="sr-only">
              {" "}
              <T t={copy.common.opensNew} />
            </span>
          </a>
        </div>
      </div>

      <div className="container-site grid gap-12 pb-10 pt-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <h2 className="anno text-m-nude">
            <T t={copy.footer.studio} />
          </h2>
          <address className="mt-4 not-italic leading-relaxed text-m-paper">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            <span className="text-m-nude">
              <T t={copy.common.floor} /> · <T t={copy.common.byAppointment} />
            </span>
          </address>
          <p className="mt-2 text-m-nude">
            <T t={copy.footer.hoursSentence} />{" "}
            <Link href="/visit" className="link-under inline-flex min-h-[44px] items-center text-m-paper">
              <T t={copy.footer.seeHours} />
            </Link>
          </p>
        </div>

        <nav aria-label={copy.footer.pages.en} className="md:col-span-3 md:col-start-7">
          <h2 className="anno text-m-nude">
            <T t={copy.footer.pages} />
          </h2>
          <ul className="mt-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rule-hover inline-flex min-h-[48px] items-center font-serif text-[1.7rem] [--ry:0.55rem]">
                  <T t={l.label} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="anno text-m-nude">
            <T t={copy.footer.elsewhere} />
          </h2>
          <ul className="mt-3 space-y-1">
            {external.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 transition-colors duration-300 hover:text-m-nude">
                  <T t={l.label} />
                  <span aria-hidden className="text-m-nude">
                    ↗
                  </span>
                  <span className="sr-only">
                    <T t={copy.common.opensNew} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-site">
        <div className="flex flex-col gap-1 border-t border-m-paper/20 py-5 text-m-nude sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <a href="https://novusnyc.org" target="_blank" rel="noreferrer" className="link-under inline-flex min-h-[44px] items-center text-m-paper">
            Made by Novus
          </a>
        </div>
      </div>
    </footer>
  )
}
