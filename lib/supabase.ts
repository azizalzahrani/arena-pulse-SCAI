import { createClientComponentClient as _createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createServerClient as _createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { createClient as supabaseCreateClient, type SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Create a default supabase client for use throughout the application
export const supabase = supabaseCreateClient(supabaseUrl, supabaseAnonKey)

// Client component client
export const createClientComponentClient = () => {
  return _createClientComponentClient({
    supabaseUrl: supabaseUrl!,
    supabaseKey: supabaseAnonKey!,
  })
}

// Server component client
export const createServerClient = () => {
  return _createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookies().set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookies().set({ name, value: "", ...options })
      },
    },
  })
}

// For use in Server Actions
export const createActionClient = () => {
  return _createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookies().set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookies().set({ name, value: "", ...options })
      },
    },
  })
}

export const createClient = (): SupabaseClient => {
  return supabaseCreateClient(supabaseUrl, supabaseAnonKey)
}
