/** Price set in italic serif, Latin even in Chinese mode. */
export default function Price({ value, className = "" }: { value: number; className?: string }) {
  return <span className={`latin font-serif italic tnum ${className}`}>${value}</span>
}
