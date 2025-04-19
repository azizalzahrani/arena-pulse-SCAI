"use client"

import type React from "react"
import { useLanguage } from "@/contexts/language-context"

interface RTLTextProps {
  children: React.ReactNode
  className?: string
}

export function RTLText({ children, className = "" }: RTLTextProps) {
  const { isRTL } = useLanguage()

  return (
    <span className={`${isRTL ? "rtl" : ""} ${className}`} dir={isRTL ? "rtl" : "ltr"}>
      {children}
    </span>
  )
}
