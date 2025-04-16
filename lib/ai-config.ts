// AI configuration
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ""

// Helper function to call the OpenAI API
export async function callAI(prompt: string, temperature = 0.7, maxTokens = 200) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant for stadium management.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature,
        max_tokens: maxTokens,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content.trim()
  } catch (error) {
    console.error("Error calling AI:", error)
    throw error
  }
}
