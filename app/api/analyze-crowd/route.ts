import { type NextRequest, NextResponse } from "next/server"
import { Replicate } from "replicate"

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || "",
})

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 })
    }

    // Call Replicate API with the crowd counting model
    const output = await replicate.run(
      "chuanyangjin/crowd-counting:8b5e8a00a74e0d375b5ebc1ca3055389f15189cd0b2e827e8e9c1d8a6746b5bc",
      {
        input: {
          image: image,
        },
      },
    )

    return NextResponse.json(output)
  } catch (error) {
    console.error("Error in crowd analysis API:", error)
    return NextResponse.json({ error: "Failed to analyze crowd" }, { status: 500 })
  }
}

