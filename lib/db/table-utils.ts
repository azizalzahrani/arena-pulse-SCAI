/**
 * Utility function to get the correct table name with prefix
 * This helps maintain consistent table naming across the application
 */
export function getTableName(baseName: string): string {
  // Use the arena_pulse prefix for all tables
  return `arena_pulse_${baseName}`
}

/**
 * List of all table names used in the application
 * This makes it easy to reference tables consistently
 */
export const TableNames = {
  GATES: getTableName("gates"),
  CAMERAS: getTableName("cameras"),
  EVENTS: getTableName("events"),
  PREDICTIONS: getTableName("predictions"),
  PARKING: getTableName("parking"),
}
