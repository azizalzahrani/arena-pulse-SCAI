import { createClient } from "@/lib/supabase"

// This function tries to determine the correct table name to use
export async function getTableName(baseTableName: string): Promise<string> {
  const supabase = createClient()

  // Try different table naming conventions
  const possibleTableNames = [
    `arena_pulse_${baseTableName}`, // Prefixed table in public schema
    baseTableName, // Table directly in public schema
    // Add other naming conventions if needed
  ]

  for (const tableName of possibleTableNames) {
    const { count, error } = await supabase.from(tableName).select("*", { count: "exact", head: true })

    if (!error) {
      console.log(`Found table: ${tableName}`)
      return tableName
    }
  }

  // If no table is found, return the first option as default
  // This will likely fail, but at least we tried all options
  console.warn(`No valid table found for ${baseTableName}, using default`)
  return possibleTableNames[0]
}
