import type { NextConfig } from "next"
import path from "node:path"

const nextConfig: NextConfig = {
  // Pin the workspace root: a lockfile higher up the tree otherwise confuses root inference.
  turbopack: { root: path.resolve(__dirname) },
}

export default nextConfig
