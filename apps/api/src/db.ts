import { Database } from "bun:sqlite"

const DB_PATH = process.env.DB_PATH ?? "sqlite.db"
export const db = new Database(DB_PATH, { create: true })

// Better performance for concurrent reads
db.run("PRAGMA journal_mode = WAL")
// Enforce foreign key constraints
db.run("PRAGMA foreign_keys = ON")

// Example table — replace or extend as needed
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    email      TEXT    NOT NULL UNIQUE,
    name       TEXT    NOT NULL,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`)

export type User = {
  id: number
  email: string
  name: string
  created_at: string
}
