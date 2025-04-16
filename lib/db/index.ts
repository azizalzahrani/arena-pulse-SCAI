import { createActionClient } from "@/lib/supabase"

// Export a simple function to get the Supabase client
export function getSupabaseClient() {
  return createActionClient()
}

// Simple error handler
export function handleError(error: any, operation: string) {
  console.error(`Error during ${operation}:`, error)
  return null
}
