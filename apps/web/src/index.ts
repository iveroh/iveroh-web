import { serve } from "bun"
import index from "./index.html"

const API_URL = process.env.API_URL ?? "http://localhost:3001"

const server = serve({
  routes: {
    "/*": index,

    "/api/*": async (req) => {
      const url = req.url.replace(/^https?:\/\/[^/]+/, API_URL)
      return fetch(new Request(url, req))
    },
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
})

console.log(`🚀 Frontend running at ${server.url}`)
console.log(`🔗 Proxying /api/* → ${API_URL}`)
