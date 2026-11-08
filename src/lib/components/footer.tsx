import Link from "next/link"
import { T } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { navLinks } from "@/lib/nav"
import { site } from "@/lib/site"
import Wordmark from "./Wordmark"

const external = [
  { href: site.bookUrl, label: copy.common.bookOnSquare },
  { href: site.instagram, label: copy.common.instagram },
  { href: site.classpass, label: { en: "ClassPass", zh: "ClassPass" } },
  { href: site.yelp, label: { en: "Yelp", zh: "Yelp" } },
]

export default function Footer() {
  return (
    <footer className="on-ink bg-m-ink text-m-paper">
      <div className="container-site grid gap-12 pb-10 pt-16 md:grid-cols-12 md:gap-8 md:pt-20">
        <div className="md:col-span-5">
          <Link href="/" className="inline-block" aria-label={copy.nav.home.en}>
            <Wordmark tone="paper" />
          </Link>
          <address className="mt-10 not-italic leading-relaxed text-m-paper">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            <span className="text-m-nude">
              <T t={copy.common.floor} />
            </span>
          </address>
          <p className="mt-6">
            <a href={site.phoneHref} className="tnum link-under inline-flex min-h-[44px] items-center text-[1.15rem]">
              {site.phoneDisplay}
            </a>
          </p>
          <p className="mt-2 text-m-nude">
            <T t={copy.footer.hours} />.{" "}
            <Link href="/visit" className="link-under inline-flex min-h-[44px] items-center text-m-paper">
              <T t={copy.footer.seeHours} />
            </Link>
          </p>
        </div>

        <nav aria-label={copy.footer.pages.en} className="md:col-span-3 md:col-start-7">
          <h2 className="anno text-m-nude">
            <T t={copy.footer.pages} />
          </h2>
          <ul className="mt-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-serif text-[1.6rem] leading-[1.6] transition-colors duration-300 hover:text-m-nude">
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
          <ul className="mt-4 space-y-1">
            {external.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 transition-colors duration-300 hover:text-m-nude">
                  <T t={l.label} />
                  <span aria-hidden className="text-m-nude">↗</span>
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
        <div className="flex flex-col gap-3 border-t border-m-paper/20 py-6 text-[0.9rem] text-m-nude sm:flex-row sm:items-center sm:justify-between">
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
