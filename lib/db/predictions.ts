import { createClient } from "@/lib/supabase"

export type AIPrediction = {
  id: string
  prediction_type: string
  query: string
  result: any
  model?: string
  confidence_score?: number
  created_at: string
  created_by?: string
}

export async function getPredictions(): Promise<AIPrediction[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('arena_pulse.ai_predictions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching predictions:", error)
    return []
  }
}

export async function createPrediction(prediction: Omit<AIPrediction, 'id' | 'created_at'>): Promise<AIPrediction | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('arena_pulse.ai_predictions')
      .insert([prediction])
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error("Error creating prediction:", error)
    return null
  }
}
