import type { Config } from "tailwindcss"

const cjk = ['"PingFang SC"', '"Hiragino Sans GB"', '"Noto Sans SC"', '"Microsoft YaHei"', "sans-serif"]

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        m: {
          paper: "#FAF6F1",
          nude: "#E9D8CC",
          ink: "#1B1616",
          clay: "#9C5B4D",
          mute: "#6E625C",
          rule: "rgba(27,22,22,.16)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", ...cjk],
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
