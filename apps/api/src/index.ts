import { Elysia } from "elysia"

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/api/hello", () => ({ message: "Hello from API!" }))
  .put("/api/hello", () => ({ message: "PUT request received!" }))
  .listen(3001)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
