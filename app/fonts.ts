import { Geist, Geist_Mono } from "next/font/google"
import localFont from "next/font/local"

export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// Arabic font
export const tajawal = localFont({
  src: [
    {
      path: "../public/fonts/Tajawal-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Tajawal-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Tajawal-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-tajawal",
})

