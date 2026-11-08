import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google"
import Navbar from "@/lib/components/navbar"
import Footer from "@/lib/components/footer"
import { LangProvider } from "@/lib/i18n"
import { site } from "@/lib/site"

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" })
// 300 is used only for the wordmark lettering (matches the logo)
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-sans", display: "swap" })

const description =
  "Custom lash extensions designed for your eye shape. Natural, Full, Anime, Hybrid and Volume sets at 274 Madison Avenue, Suite 1205, New York."

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "My Lash Girl Beauty Studio | Custom lash extensions near Grand Central",
    template: "%s | My Lash Girl Beauty Studio",
  },
  description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: "My Lash Girl Beauty Studio | Custom lash extensions near Grand Central",
    description,
    images: [{ url: "/images/eye-portrait.jpg", width: 508, height: 640, alt: "Finished lash extensions on a client, eyes looking at the camera" }],
  },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  themeColor: "#FAF6F1",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col overflow-x-clip bg-m-paper font-sans text-m-ink">
        <LangProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-m-ink focus:px-4 focus:py-3 focus:text-m-paper"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="flex-1 pt-[76px]">
            {children}
          </main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  )
}
