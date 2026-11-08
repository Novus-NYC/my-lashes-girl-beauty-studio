import { ImageResponse } from "next/og"
import { EYE } from "@/lib/eyeMark"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#E9D8CC" }}>
        <svg width="180" height="180" viewBox="0 0 100 100">
          <path d={EYE.brow} fill="none" stroke="#1B1616" strokeWidth="2.8" strokeLinecap="round" />
          <path d={EYE.lid} fill="none" stroke="#1B1616" strokeWidth="3.4" strokeLinecap="round" />
          <path d={EYE.lashes} fill="#1B1616" />
        </svg>
      </div>
    ),
    size,
  )
}
