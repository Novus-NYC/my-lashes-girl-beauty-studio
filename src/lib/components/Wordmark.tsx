import EyeMark from "./EyeMark"

/** Live-text recreation of the logo lettering with the eye mark. */
export default function Wordmark({ tone = "ink", compact = false }: { tone?: "ink" | "paper"; compact?: boolean }) {
  return (
    <span className={`flex items-center gap-3 ${tone === "paper" ? "text-m-paper" : "text-m-ink"}`}>
      <EyeMark className={compact ? "h-9 w-9 shrink-0" : "h-12 w-12 shrink-0"} />
      <span className="flex flex-col leading-none">
        <span className={`font-sans font-light uppercase tracking-[0.22em] ${compact ? "text-[0.98rem]" : "text-[1.2rem]"}`}>
          My Lash Girl
        </span>
        <span className={`mt-1.5 font-sans font-semibold uppercase tracking-[0.3em] ${compact ? "text-[0.52rem]" : "text-[0.6rem]"}`}>
          Beauty Studio
        </span>
      </span>
    </span>
  )
}
