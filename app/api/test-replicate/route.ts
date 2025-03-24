import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if API key exists
    const apiKey = process.env.REPLICATE_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "REPLICATE_API_KEY is not defined in environment variables",
          envVars: Object.keys(process.env)
            .filter((key) => !key.includes("SECRET") && !key.includes("KEY"))
            .join(", "),
        },
        { status: 500 },
      )
    }

    // Mask the API key for security
    const maskedKey = apiKey.substring(0, 4) + "..." + apiKey.substring(apiKey.length - 4)

    return NextResponse.json({
      status: "API key found",
      keyPreview: maskedKey,
      keyLength: apiKey.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error checking API key", details: error.message }, { status: 500 })
  }
}

