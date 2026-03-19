// Shared types and utilities for web and api

export type ApiResponse<T> = { data: T; error: null } | { data: null; error: string }

export function ok<T>(data: T): ApiResponse<T> {
  return { data, error: null }
}

export function err(error: string): ApiResponse<never> {
  return { data: null, error }
}
