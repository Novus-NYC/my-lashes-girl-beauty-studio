import type { Config } from "tailwindcss"

const cjk = ['"PingFang SC"', '"Hiragino Sans GB"', '"Noto Sans SC"', '"Microsoft YaHei"', "sans-serif"]

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        m: {
          paper: "#FAF6F1",
          blush: "#F3E3E0",
          nude: "#E9D8CC",
          ink: "#1B1616",
          rose: "#A34D5C",
          mute: "#5E524D",
          rule: "rgba(27,22,22,.16)",
        },
      },
      fontFamily: {
        serif: ["'MLG Hyphen'", "var(--font-serif)", "Georgia", ...cjk],
        sans: ["var(--font-sans)", "system-ui", ...cjk],
      },
      maxWidth: {
        site: "1320px",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(.2,.7,.2,1)",
      },
    },
  },
  plugins: [],
}
export default config
