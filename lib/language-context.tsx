"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Arabic translations
const translations = {
  en: {},
  ar: {
    // Dashboard
    "Welcome back": "مرحبًا بعودتك",
    "Here's what's happening at your venues today": "إليك ما يحدث في المواقع الخاصة بك اليوم",
    Dashboard: "لوحة المعلومات",
    Export: "تصدير",

    // Navigation
    "Crowd Analysis": "تحليل الحشود",
    Predictions: "التنبؤات",
    Events: "الفعاليات",
    Staff: "الموظفين",
    Settings: "الإعدادات",
    Admin: "المسؤول",

    // Overview Cards
    "Current Attendance": "الحضور الحالي",
    "from last hour": "من الساعة الماضية",
    "Ticket Sales": "مبيعات التذاكر",
    "from yesterday": "من الأمس",
    "Crowd Density": "كثافة الحشود",
    "people/m²": "شخص/م²",
    "Bottleneck Alerts": "تنبيهات الاختناق",

    // Charts
    "Crowd Density (people/m²)": "كثافة الحشود (شخص/م²)",
    "Ticket Sales (Last 7 Days)": "مبيعات التذاكر (آخر 7 أيام)",

    // Events
    "Recent Events": "الفعاليات الأخيرة",
    "Upcoming Events": "الفعاليات القادمة",
    Completed: "مكتمل",
    Sold: "مباع",

    // AI Solutions
    "AI Solutions": "حلول الذكاء الاصطناعي",
    Active: "نشط",
    All: "الكل",
    Critical: "حرج",
    Warnings: "تحذيرات",
    Suggestions: "اقتراحات",
    Applied: "مطبق",
    "Recommended Actions": "الإجراءات الموصى بها",
    "Apply Solution": "تطبيق الحل",

    // Notifications
    Notifications: "الإشعارات",
    "Mark all as read": "تعليم الكل كمقروء",
    "Clear all": "مسح الكل",
    Unread: "غير مقروء",
    Info: "معلومات",
    Alerts: "تنبيهات",
    "No notifications to display": "لا توجد إشعارات للعرض",
    "Mark as read": "تعليم كمقروء",
    Dismiss: "تجاهل",

    // Predictions
    "AI Predictions": "تنبؤات الذكاء الاصطناعي",
    "Update Predictions": "تحديث التنبؤات",
    "Predicted Crowd Density": "كثافة الحشود المتوقعة",
    "Predicted Bottlenecks": "الاختناقات المتوقعة",
    "Optimal Staffing Levels": "المستويات المثلى للتوظيف",
    "AI Insights": "رؤى الذكاء الاصطناعي",
    Actual: "فعلي",
    Predicted: "متوقع",
    Current: "حالي",
    Recommended: "موصى به",
    "High Risk": "خطر مرتفع",
    "Medium Risk": "خطر متوسط",
    "Low Risk": "خطر منخفض",
    "congestion predicted": "ازدحام متوقع",

    // Crowd Analysis
    "Crowd Analysis": "تحليل الحشود",
    "Real-time crowd density and flow analysis for": "تحليل كثافة وتدفق الحشود في الوقت الفعلي لـ",
    "Real-time": "الوقت الفعلي",
    Historical: "تاريخي",
    Predictive: "تنبؤي",
    "Filter Zones": "تصفية المناطق",
    "Crowd Density Heatmap": "خريطة حرارية لكثافة الحشود",
    "Crowd Flow Patterns": "أنماط تدفق الحشود",
    "Congestion Points": "نقاط الازدحام",
    "Zone Analysis": "تحليل المناطق",
    "AI Crowd Insights": "رؤى الذكاء الاصطناعي للحشود",
    Low: "منخفض",
    Medium: "متوسط",
    High: "مرتفع",
    Critical: "حرج",
    "Critical Areas:": "المناطق الحرجة:",
    "No critical areas detected": "لم يتم اكتشاف مناطق حرجة",
    "Highest Volume Flows:": "تدفقات أعلى حجم:",
    Increasing: "متزايد",
    Decreasing: "متناقص",
    Stable: "مستقر",
    "Duration:": "المدة:",
    "Affected:": "المتأثرين:",
    "Recommended action:": "الإجراء الموصى به:",
    people: "شخص",

    // Staff
    "Staff Management": "إدارة الموظفين",
    "Optimize staffing levels and performance across all venues": "تحسين مستويات التوظيف والأداء في جميع المواقع",
    "Add Staff": "إضافة موظف",
    "Total Staff": "إجمالي الموظفين",
    "Active Staff": "الموظفين النشطين",
    "Average Hours": "متوسط الساعات",
    "hrs/week": "ساعة/أسبوع",
    "Staff Utilization": "استخدام الموظفين",
    "from last month": "من الشهر الماضي",

    // Events
    "Events Management": "إدارة الفعاليات",
    "Schedule, optimize, and analyze events across all venues": "جدولة وتحسين وتحليل الفعاليات في جميع المواقع",
    "New Event": "فعالية جديدة",
    "Export Schedule": "تصدير الجدول",
    "Event Calendar": "تقويم الفعاليات",
    "AI Attendance Forecast": "توقعات الحضور بالذكاء الاصطناعي",
    "AI Staffing Optimizer": "محسن التوظيف بالذكاء الاصطناعي",
    "Event Performance Metrics": "مقاييس أداء الفعالية",
    "AI Event Conflict Analyzer": "محلل تعارض الفعاليات بالذكاء الاصطناعي",

    // Language Switcher
    Language: "اللغة",
    English: "الإنجليزية",
    Arabic: "العربية",

    // Calendar specific
    "Event Calendar": "تقويم الفعاليات",
    "View and manage all scheduled events across your venues. Colored dots indicate event types. Select a date to see detailed event information.":
      "عرض وإدارة جميع الفعاليات المجدولة في جميع المواقع. النقاط الملونة تشير إلى أنواع الفعاليات. حدد تاريخًا لعرض معلومات مفصلة عن الفعالية.",
    "Events on": "الفعاليات في",
    Event: "فعالية",
    Events: "فعاليات",
    "League Match": "مباراة الدوري",
    "Cup Match": "مباراة الكأس",
    International: "دولي",
    Friendly: "ودي",
    League: "الدوري",
    Cup: "الكأس",
    Weather: "الطقس",
    Staffing: "التوظيف",
    "Select a date to view event details": "حدد تاريخًا لعرض تفاصيل الفعالية",
    "AI Event Insights": "رؤى الذكاء الاصطناعي للفعالية",
    "Hide Insights": "إخفاء الرؤى",
    "Show Insights": "عرض الرؤى",
    "High Risk": "خطر مرتفع",
    "Medium Risk": "خطر متوسط",
    "Low Risk": "خطر منخفض",
    Unknown: "غير معروف",
    Understaffed: "نقص في الموظفين",
    Optimal: "مثالي",
    Overstaffed: "فائض في الموظفين",
    "Automated Analysis": "التحليل الآلي",
  },
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en")

  // Function to translate text
  const t = (key: string): string => {
    if (language === "en") return key
    return translations.ar[key] || key
  }

  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language

    // Add or remove Arabic class for styling
    if (language === "ar") {
      document.documentElement.classList.add("arabic")
    } else {
      document.documentElement.classList.remove("arabic")
    }
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

