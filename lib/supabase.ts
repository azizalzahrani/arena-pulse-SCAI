import { createClient as supabaseCreateClient } from "@supabase/supabase-js"

// Create a singleton instance for client components
let clientInstance = null

// For client-side usage (with auth)
export function createClientComponentClient() {
  if (clientInstance) return clientInstance

  clientInstance = supabaseCreateClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return clientInstance
}

// For server-side usage (with admin privileges)
export function createServerComponentClient() {
  return supabaseCreateClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
    },
  })
}

// For server actions
export function createActionClient() {
  return supabaseCreateClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
    },
  })
}

// Simple function to get a client (for simplicity in our data layer)
export function getClient() {
  // If we're on the server, use the server client
  if (typeof window === "undefined") {
    return createServerComponentClient()
  }

  // Otherwise use the client component client
  return createClientComponentClient()
}

export const createClient = supabaseCreateClient
