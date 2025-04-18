"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define the available languages
type Language = "en" | "ar"

// Define the translations interface
interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

// Define the language context interface
interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

// Create the translations object
const translations: Translations = {
  en: {
    dashboard: "Dashboard",
    "gate-overview": "Gate Overview",
    "video-feed": "Video Feed",
    "ai-predictions": "AI Predictions",
    "stadium-services": "Stadium Services",
    "event-schedule": "Event Schedule",
    "parking-management": "Parking Management",
    settings: "Settings",
    search: "Search",
    "total-attendance": "Total Attendance",
    capacity: "Capacity",
    "gate-status": "Gate Status",
    "crowd-density": "Crowd Density",
    alerts: "Alerts",
    "prayer-times": "Prayer Times",
    remaining: "remaining",
    "crowd-flow-prediction": "Crowd Flow Prediction",
    "predictive-insights": "Predictive Insights",
    "gate-traffic": "Gate Traffic",
    "gate-automation": "Gate Automation",
    "gate-security": "Gate Security",
    "stadium-blueprint": "Stadium Blueprint",
    "camera-feeds": "Camera Feeds",
    "sentiment-analysis": "Sentiment Analysis",
    "anomaly-detection": "Anomaly Detection",
    "lost-person-tracking": "Lost Person Tracking",
    "prediction-models": "Prediction Models",
    "prediction-accuracy": "Prediction Accuracy",
    "recent-predictions": "Recent Predictions",
    "custom-prediction": "Custom Prediction",
    "parking-overview": "Parking Overview",
    "parking-ai-insights": "Parking AI Insights",
    "parking-recommendations": "Parking Recommendations",
    "parking-analytics": "Parking Analytics",
    "parking-historical-data": "Parking Historical Data",
    "parking-staff-communication": "Staff Communication",
    "parking-entry-exit": "Entry/Exit Operations",
    "parking-map": "Parking Map",
    language: "Language",
    english: "English",
    arabic: "Arabic",
    open: "Open",
    closed: "Closed",
    "partially-open": "Partially Open",
    automated: "Automated",
    manual: "Manual",
    high: "High",
    medium: "Medium",
    low: "Low",
    critical: "Critical",
    warning: "Warning",
    info: "Info",
    normal: "Normal",
    abnormal: "Abnormal",
    positive: "Positive",
    negative: "Negative",
    neutral: "Neutral",
    detected: "Detected",
    "not-detected": "Not Detected",
    available: "Available",
    occupied: "Occupied",
    reserved: "Reserved",
    vip: "VIP",
    standard: "Standard",
    disabled: "Disabled",
    family: "Family",
    staff: "Staff",
    north: "North",
    south: "South",
    east: "East",
    west: "West",
    entry: "Entry",
    exit: "Exit",
    "capacity-utilization": "Capacity Utilization",
    "peak-hours": "Peak Hours",
    "average-occupancy": "Average Occupancy",
    "turnover-rate": "Turnover Rate",
    recommendations: "Recommendations",
    "historical-data": "Historical Data",
    communication: "Communication",
    operations: "Operations",
    map: "Map",
    insights: "Insights",
    analytics: "Analytics",
    overview: "Overview",
    details: "Details",
    status: "Status",
    type: "Type",
    location: "Location",
    time: "Time",
    date: "Date",
    duration: "Duration",
    accuracy: "Accuracy",
    confidence: "Confidence",
    model: "Model",
    prediction: "Prediction",
    actual: "Actual",
    difference: "Difference",
    percentage: "Percentage",
    total: "Total",
    average: "Average",
    maximum: "Maximum",
    minimum: "Minimum",
    current: "Current",
    historical: "Historical",
    future: "Future",
    past: "Past",
    present: "Present",
    trend: "Trend",
    increasing: "Increasing",
    decreasing: "Decreasing",
    stable: "Stable",
    unstable: "Unstable",
    fluctuating: "Fluctuating",
    steady: "Steady",
    rising: "Rising",
    falling: "Falling",
    peak: "Peak",
    valley: "Valley",
    plateau: "Plateau",
    spike: "Spike",
    drop: "Drop",
    surge: "Surge",
    decline: "Decline",
    growth: "Growth",
    reduction: "Reduction",
    expansion: "Expansion",
    contraction: "Contraction",
    acceleration: "Acceleration",
    deceleration: "Deceleration",
    speed: "Speed",
    velocity: "Velocity",
    momentum: "Momentum",
    force: "Force",
    pressure: "Pressure",
    temperature: "Temperature",
    humidity: "Humidity",
    weather: "Weather",
    sunny: "Sunny",
    cloudy: "Cloudy",
    rainy: "Rainy",
    windy: "Windy",
    stormy: "Stormy",
    hot: "Hot",
    cold: "Cold",
    warm: "Warm",
    cool: "Cool",
    mild: "Mild",
    severe: "Severe",
    moderate: "Moderate",
    light: "Light",
    heavy: "Heavy",
    intense: "Intense",
    mild: "Mild",
    severe: "Severe",
    critical: "Critical",
    emergency: "Emergency",
    urgent: "Urgent",
    routine: "Routine",
    scheduled: "Scheduled",
    unscheduled: "Unscheduled",
    planned: "Planned",
    unplanned: "Unplanned",
    expected: "Expected",
    unexpected: "Unexpected",
    anticipated: "Anticipated",
    unanticipated: "Unanticipated",
    predicted: "Predicted",
    unpredicted: "Unpredicted",
    forecasted: "Forecasted",
    unforecasted: "Unforecasted",
    projected: "Projected",
    unprojected: "Unprojected",
    estimated: "Estimated",
    actual: "Actual",
    real: "Real",
    virtual: "Virtual",
    simulated: "Simulated",
    modeled: "Modeled",
    calculated: "Calculated",
    measured: "Measured",
    observed: "Observed",
    recorded: "Recorded",
    logged: "Logged",
    tracked: "Tracked",
    monitored: "Monitored",
    supervised: "Supervised",
    controlled: "Controlled",
    managed: "Managed",
    operated: "Operated",
    maintained: "Maintained",
    serviced: "Serviced",
    repaired: "Repaired",
    fixed: "Fixed",
    broken: "Broken",
    damaged: "Damaged",
    intact: "Intact",
    complete: "Complete",
    incomplete: "Incomplete",
    partial: "Partial",
    full: "Full",
    empty: "Empty",
    filled: "Filled",
    drained: "Drained",
    loaded: "Loaded",
    unloaded: "Unloaded",
    packed: "Packed",
    unpacked: "Unpacked",
    stacked: "Stacked",
    unstacked: "Unstacked",
    arranged: "Arranged",
    disarranged: "Disarranged",
    organized: "Organized",
    disorganized: "Disorganized",
    ordered: "Ordered",
    disordered: "Disordered",
    structured: "Structured",
    unstructured: "Unstructured",
    systematic: "Systematic",
    unsystematic: "Unsystematic",
    methodical: "Methodical",
    unmethodical: "Unmethodical",
    logical: "Logical",
    illogical: "Illogical",
    rational: "Rational",
    irrational: "Irrational",
    reasonable: "Reasonable",
    unreasonable: "Unreasonable",
    sensible: "Sensible",
    insensible: "Insensible",
    practical: "Practical",
    impractical: "Impractical",
    feasible: "Feasible",
    infeasible: "Infeasible",
    possible: "Possible",
    impossible: "Impossible",
    probable: "Probable",
    improbable: "Improbable",
    likely: "Likely",
    unlikely: "Unlikely",
    certain: "Certain",
    uncertain: "Uncertain",
    definite: "Definite",
    indefinite: "Indefinite",
    specific: "Specific",
    general: "General",
    particular: "Particular",
    universal: "Universal",
    unique: "Unique",
    common: "Common",
    rare: "Rare",
    frequent: "Frequent",
    infrequent: "Infrequent",
    regular: "Regular",
    irregular: "Irregular",
    periodic: "Periodic",
    aperiodic: "Aperiodic",
    cyclic: "Cyclic",
    acyclic: "Acyclic",
    rhythmic: "Rhythmic",
    arrhythmic: "Arrhythmic",
    patterned: "Patterned",
    unpatterned: "Unpatterned",
    consistent: "Consistent",
    inconsistent: "Inconsistent",
    uniform: "Uniform",
    nonuniform: "Nonuniform",
    homogeneous: "Homogeneous",
    heterogeneous: "Heterogeneous",
    similar: "Similar",
    dissimilar: "Dissimilar",
    same: "Same",
    different: "Different",
    identical: "Identical",
    distinct: "Distinct",
    equivalent: "Equivalent",
    nonequivalent: "Nonequivalent",
    equal: "Equal",
    unequal: "Unequal",
    balanced: "Balanced",
    unbalanced: "Unbalanced",
    symmetrical: "Symmetrical",
    asymmetrical: "Asymmetrical",
    proportional: "Proportional",
    disproportional: "Disproportional",
    scaled: "Scaled",
    unscaled: "Unscaled",
    normalized: "Normalized",
    unnormalized: "Unnormalized",
    standardized: "Standardized",
    unstandardized: "Unstandardized",
    calibrated: "Calibrated",
    uncalibrated: "Uncalibrated",
    adjusted: "Adjusted",
    unadjusted: "Unadjusted",
    corrected: "Corrected",
    uncorrected: "Uncorrected",
    modified: "Modified",
    unmodified: "Unmodified",
    altered: "Altered",
    unaltered: "Unaltered",
    changed: "Changed",
    unchanged: "Unchanged",
    transformed: "Transformed",
    untransformed: "Untransformed",
    converted: "Converted",
    unconverted: "Unconverted",
    translated: "Translated",
    untranslated: "Untranslated",
    rotated: "Rotated",
    unrotated: "Unrotated",
    flipped: "Flipped",
    unflipped: "Unflipped",
    mirrored: "Mirrored",
    unmirrored: "Unmirrored",
    reversed: "Reversed",
    unreversed: "Unreversed",
    inverted: "Inverted",
    uninverted: "Uninverted",
    negated: "Negated",
    unnegated: "Unnegated",
    complemented: "Complemented",
    uncomplemented: "Uncomplemented",
    supplemented: "Supplemented",
    unsupplemented: "Unsupplemented",
    augmented: "Augmented",
    unaugmented: "Unaugmented",
    enhanced: "Enhanced",
    unenhanced: "Unenhanced",
    improved: "Improved",
    unimproved: "Unimproved",
    upgraded: "Upgraded",
    unupgraded: "Unupgraded",
    updated: "Updated",
    outdated: "Outdated",
    current: "Current",
    obsolete: "Obsolete",
    modern: "Modern",
    ancient: "Ancient",
    contemporary: "Contemporary",
    historical: "Historical",
    present: "Present",
    past: "Past",
    future: "Future",
    now: "Now",
    then: "Then",
    later: "Later",
    earlier: "Earlier",
    sooner: "Sooner",
    later: "Later",
    before: "Before",
    after: "After",
    during: "During",
    while: "While",
    when: "When",
    where: "Where",
    why: "Why",
    how: "How",
    what: "What",
    who: "Who",
    whom: "Whom",
    whose: "Whose",
    which: "Which",
    that: "That",
    this: "This",
    these: "These",
    those: "Those",
    here: "Here",
    there: "There",
    everywhere: "Everywhere",
    nowhere: "Nowhere",
    somewhere: "Somewhere",
    anywhere: "Anywhere",
    always: "Always",
    never: "Never",
    sometimes: "Sometimes",
    occasionally: "Occasionally",
    rarely: "Rarely",
    frequently: "Frequently",
    often: "Often",
    seldom: "Seldom",
    usually: "Usually",
    normally: "Normally",
    typically: "Typically",
    generally: "Generally",
    commonly: "Commonly",
    mostly: "Mostly",
    mainly: "Mainly",
    primarily: "Primarily",
    principally: "Principally",
    chiefly: "Chiefly",
    predominantly: "Predominantly",
    prevalently: "Prevalently",
    largely: "Largely",
    greatly: "Greatly",
    highly: "Highly",
    extremely: "Extremely",
    very: "Very",
    quite: "Quite",
    rather: "Rather",
    somewhat: "Somewhat",
    slightly: "Slightly",
    barely: "Barely",
    hardly: "Hardly",
    scarcely: "Scarcely",
    nearly: "Nearly",
    almost: "Almost",
    approximately: "Approximately",
    about: "About",
    around: "Around",
    roughly: "Roughly",
    precisely: "Precisely",
    exactly: "Exactly",
    accurately: "Accurately",
    correctly: "Correctly",
    rightly: "Rightly",
    wrongly: "Wrongly",
    incorrectly: "Incorrectly",
    inaccurately: "Inaccurately",
    imprecisely: "Imprecisely",
    inexactly: "Inexactly",
    vaguely: "Vaguely",
    ambiguously: "Ambiguously",
    clearly: "Clearly",
    distinctly: "Distinctly",
    obviously: "Obviously",
    evidently: "Evidently",
    apparently: "Apparently",
    seemingly: "Seemingly",
    ostensibly: "Ostensibly",
    supposedly: "Supposedly",
    presumably: "Presumably",
    allegedly: "Allegedly",
    reputedly: "Reputedly",
    reportedly: "Reportedly",
    purportedly: "Purportedly",
    supposedly: "Supposedly",
    certainly: "Certainly",
    definitely: "Definitely",
    undoubtedly: "Undoubtedly",
    indubitably: "Indubitably",
    unquestionably: "Unquestionably",
    undeniably: "Undeniably",
    indisputably: "Indisputably",
    incontrovertibly: "Incontrovertibly",
    irrefutably: "Irrefutably",
    incontestably: "Incontestably",
    incontrovertibly: "Incontrovertibly",
    indisputably: "Indisputably",
    undeniably: "Undeniably",
    unquestionably: "Unquestionably",
    indubitably: "Indubitably",
    undoubtedly: "Undoubtedly",
    definitely: "Definitely",
    certainly: "Certainly",
    surely: "Surely",
    assuredly: "Assuredly",
    positively: "Positively",
    absolutely: "Absolutely",
    completely: "Completely",
    entirely: "Entirely",
    wholly: "Wholly",
    totally: "Totally",
    utterly: "Utterly",
    thoroughly: "Thoroughly",
    fully: "Fully",
    perfectly: "Perfectly",
    ideally: "Ideally",
    optimally: "Optimally",
    maximally: "Maximally",
    minimally: "Minimally",
    partially: "Partially",
    partly: "Partly",
    fractionally: "Fractionally",
    fragmentarily: "Fragmentarily",
    incompletely: "Incompletely",
    imperfectly: "Imperfectly",
    defectively: "Defectively",
    faultily: "Faultily",
    deficiently: "Deficiently",
    inadequately: "Inadequately",
    insufficiently: "Insufficiently",
    enough: "Enough",
    sufficiently: "Sufficiently",
    adequately: "Adequately",
    satisfactorily: "Satisfactorily",
    acceptably: "Acceptably",
    tolerably: "Tolerably",
    passably: "Passably",
    reasonably: "Reasonably",
    fairly: "Fairly",
    moderately: "Moderately",
    middlingly: "Middlingly",
    averagely: "Averagely",
    medially: "Medially",
    centrally: "Centrally",
    intermediately: "Intermediately",
    midway: "Midway",
    halfway: "Halfway",
    middle: "Middle",
    center: "Center",
    midst: "Midst",
    core: "Core",
    heart: "Heart",
    nucleus: "Nucleus",
    kernel: "Kernel",
    seed: "Seed",
    germ: "Germ",
    embryo: "Embryo",
    origin: "Origin",
    source: "Source",
    root: "Root",
    base: "Base",
    foundation: "Foundation",
    basis: "Basis",
    ground: "Ground",
    floor: "Floor",
    bottom: "Bottom",
    underneath: "Underneath",
    beneath: "Beneath",
    below: "Below",
    under: "Under",
    down: "Down",
    downward: "Downward",
    downwards: "Downwards",
    downstairs: "Downstairs",
    downhill: "Downhill",
    upstream: "Upstream",
    downstream: "Downstream",
    uphill: "Uphill",
    upstairs: "Upstairs",
    upward: "Upward",
    upwards: "Upwards",
    up: "Up",
    over: "Upstairs",
    upward: "Upward",
    upwards: "Upwards",
    up: "Up",
    over: "Over",
    above: "Above",
    atop: "Atop",
    on: "On",
    onto: "Onto",
    upon: "Upon",
    top: "Top",
    summit: "Summit",
    peak: "Peak",
    apex: "Apex",
    zenith: "Zenith",
    acme: "Acme",
    pinnacle: "Pinnacle",
    climax: "Climax",
    height: "Height",
    altitude: "Altitude",
    elevation: "Elevation",
    level: "Level",
    plane: "Plane",
    tier: "Tier",
    layer: "Layer",
    stratum: "Stratum",
  },
  ar: {
    dashboard: "لوحة التحكم",
    "gate-overview": "نظرة عامة على البوابات",
    "video-feed": "بث الفيديو",
    "ai-predictions": "تنبؤات الذكاء الاصطناعي",
    "stadium-services": "خدمات الملعب",
    "event-schedule": "جدول الفعاليات",
    "parking-management": "إدارة مواقف السيارات",
    settings: "الإعدادات",
    search: "بحث",
    "total-attendance": "إجمالي الحضور",
    capacity: "السعة",
    "gate-status": "حالة البوابة",
    "crowd-density": "كثافة الحشود",
    alerts: "التنبيهات",
    "prayer-times": "أوقات الصلاة",
    remaining: "متبقي",
    "crowd-flow-prediction": "التنبؤ بتدفق الحشود",
    "predictive-insights": "رؤى تنبؤية",
    "gate-traffic": "حركة البوابة",
    "gate-automation": "أتمتة البوابة",
    "gate-security": "أمن البوابة",
    "stadium-blueprint": "مخطط الملعب",
    "camera-feeds": "بث الكاميرات",
    "sentiment-analysis": "تحليل المشاعر",
    "anomaly-detection": "كشف الشذوذ",
    "lost-person-tracking": "تتبع الأشخاص المفقودين",
    "prediction-models": "نماذج التنبؤ",
    "prediction-accuracy": "دقة التنبؤ",
    "recent-predictions": "التنبؤات الأخيرة",
    "custom-prediction": "تنبؤ مخصص",
    "parking-overview": "نظرة عامة على مواقف السيارات",
    "parking-ai-insights": "رؤى الذكاء الاصطناعي لمواقف السيارات",
    "parking-recommendations": "توصيات مواقف السيارات",
    "parking-analytics": "تحليلات مواقف السيارات",
    "parking-historical-data": "البيانات التاريخية لمواقف السيارات",
    "parking-staff-communication": "تواصل الموظفين",
    "parking-entry-exit": "عمليات الدخول/الخروج",
    "parking-map": "خريطة مواقف السيارات",
    language: "اللغة",
    english: "الإنجليزية",
    arabic: "العربية",
    open: "مفتوح",
    closed: "مغلق",
    "partially-open": "مفتوح جزئيًا",
    automated: "آلي",
    manual: "يدوي",
    high: "مرتفع",
    medium: "متوسط",
    low: "منخفض",
    critical: "حرج",
    warning: "تحذير",
    info: "معلومات",
    normal: "طبيعي",
    abnormal: "غير طبيعي",
    positive: "إيجابي",
    negative: "سلبي",
    neutral: "محايد",
    detected: "تم الكشف",
    "not-detected": "لم يتم الكشف",
    available: "متاح",
    occupied: "مشغول",
    reserved: "محجوز",
    vip: "كبار الشخصيات",
    standard: "قياسي",
    disabled: "ذوي الاحتياجات الخاصة",
    family: "عائلي",
    staff: "الموظفين",
    north: "شمال",
    south: "جنوب",
    east: "شرق",
    west: "غرب",
    entry: "دخول",
    exit: "خروج",
    "capacity-utilization": "استخدام السعة",
    "peak-hours": "ساعات الذروة",
    "average-occupancy": "متوسط الإشغال",
    "turnover-rate": "معدل الدوران",
    recommendations: "التوصيات",
    "historical-data": "البيانات التاريخية",
    communication: "التواصل",
    operations: "العمليات",
    map: "الخريطة",
    insights: "الرؤى",
    analytics: "التحليلات",
    overview: "نظرة عامة",
    details: "التفاصيل",
    status: "الحالة",
    type: "النوع",
    location: "الموقع",
    time: "الوقت",
    date: "التاريخ",
    duration: "المدة",
    accuracy: "الدقة",
    confidence: "الثقة",
    model: "النموذج",
    prediction: "التنبؤ",
    actual: "الفعلي",
    difference: "الفرق",
    percentage: "النسبة المئوية",
    total: "الإجمالي",
    average: "المتوسط",
    maximum: "الحد الأقصى",
    minimum: "الحد الأدنى",
    current: "الحالي",
    historical: "التاريخي",
    future: "المستقبلي",
    past: "الماضي",
    present: "الحاضر",
    trend: "الاتجاه",
    increasing: "متزايد",
    decreasing: "متناقص",
    stable: "مستقر",
    unstable: "غير مستقر",
    fluctuating: "متقلب",
    steady: "ثابت",
    rising: "صاعد",
    falling: "هابط",
    peak: "ذروة",
    valley: "وادي",
    plateau: "هضبة",
    spike: "ارتفاع مفاجئ",
    drop: "انخفاض",
    surge: "ارتفاع",
    decline: "تراجع",
    growth: "نمو",
    reduction: "تخفيض",
    expansion: "توسع",
    contraction: "انكماش",
    acceleration: "تسارع",
    deceleration: "تباطؤ",
    speed: "سرعة",
    velocity: "سرعة متجهة",
    momentum: "زخم",
    force: "قوة",
    pressure: "ضغط",
    temperature: "درجة الحرارة",
    humidity: "الرطوبة",
    weather: "الطقس",
    sunny: "مشمس",
    cloudy: "غائم",
    rainy: "ممطر",
    windy: "عاصف",
    stormy: "عاصف",
    hot: "حار",
    cold: "بارد",
    warm: "دافئ",
    cool: "منعش",
    mild: "معتدل",
    severe: "شديد",
    moderate: "معتدل",
    light: "خفيف",
    heavy: "ثقيل",
    intense: "مكثف",
    mild: "معتدل",
    severe: "شديد",
    critical: "حرج",
    emergency: "طارئ",
    urgent: "عاجل",
    routine: "روتيني",
    scheduled: "مجدول",
    unscheduled: "غير مجدول",
    planned: "مخطط",
    unplanned: "غير مخطط",
    expected: "متوقع",
    unexpected: "غير متوقع",
    anticipated: "متوقع",
    unanticipated: "غير متوقع",
    predicted: "متنبأ به",
    unpredicted: "غير متنبأ به",
    forecasted: "متوقع",
    unforecasted: "غير متوقع",
    projected: "متوقع",
    unprojected: "غير متوقع",
    estimated: "مقدر",
    actual: "فعلي",
    real: "حقيقي",
    virtual: "افتراضي",
    simulated: "محاكى",
    modeled: "منمذج",
    calculated: "محسوب",
    measured: "مقاس",
    observed: "ملاحظ",
    recorded: "مسجل",
    logged: "مسجل",
    tracked: "متتبع",
    monitored: "مراقب",
    supervised: "مشرف عليه",
    controlled: "متحكم به",
    managed: "مدار",
    operated: "مشغل",
    maintained: "مصان",
    serviced: "مخدم",
    repaired: "مصلح",
    fixed: "مثبت",
    broken: "مكسور",
    damaged: "متضرر",
    intact: "سليم",
    complete: "كامل",
    incomplete: "غير كامل",
    partial: "جزئي",
    full: "ممتلئ",
    empty: "فارغ",
    filled: "ممتلئ",
    drained: "مستنزف",
    loaded: "محمل",
    unloaded: "غير محمل",
    packed: "معبأ",
    unpacked: "غير معبأ",
    stacked: "مكدس",
    unstacked: "غير مكدس",
    arranged: "مرتب",
    disarranged: "غير مرتب",
    organized: "منظم",
    disorganized: "غير منظم",
    ordered: "مرتب",
    disordered: "غير مرتب",
    structured: "منظم",
    unstructured: "غير منظم",
    systematic: "منهجي",
    unsystematic: "غير منهجي",
    methodical: "منهجي",
    unmethodical: "غير منهجي",
    logical: "منطقي",
    illogical: "غير منطقي",
    rational: "عقلاني",
    irrational: "غير عقلاني",
    reasonable: "معقول",
    unreasonable: "غير معقول",
    sensible: "معقول",
    insensible: "غير معقول",
    practical: "عملي",
    impractical: "غير عملي",
    feasible: "ممكن",
    infeasible: "غير ممكن",
    possible: "ممكن",
    impossible: "مستحيل",
    probable: "محتمل",
    improbable: "غير محتمل",
    likely: "مرجح",
    unlikely: "غير مرجح",
    certain: "مؤكد",
    uncertain: "غير مؤكد",
    definite: "محدد",
    indefinite: "غير محدد",
    specific: "محدد",
    general: "عام",
    particular: "خاص",
    universal: "عالمي",
    unique: "فريد",
    common: "شائع",
    rare: "نادر",
    frequent: "متكرر",
    infrequent: "غير متكرر",
    regular: "منتظم",
    irregular: "غير منتظم",
    periodic: "دوري",
    aperiodic: "غير دوري",
    cyclic: "دوري",
    acyclic: "غير دوري",
    rhythmic: "إيقاعي",
    arrhythmic: "غير إيقاعي",
    patterned: "منمط",
    unpatterned: "غير منمط",
    consistent: "متسق",
    inconsistent: "غير متسق",
    uniform: "موحد",
    nonuniform: "غير موحد",
    homogeneous: "متجانس",
    heterogeneous: "غير متجانس",
    similar: "متشابه",
    dissimilar: "غير متشابه",
    same: "نفس",
    different: "مختلف",
    identical: "متطابق",
    distinct: "متميز",
    equivalent: "مكافئ",
    nonequivalent: "غير مكافئ",
    equal: "متساوي",
    unequal: "غير متساوي",
    balanced: "متوازن",
    unbalanced: "غير متوازن",
    symmetrical: "متماثل",
    asymmetrical: "غير متماثل",
    proportional: "متناسب",
    disproportional: "غير متناسب",
    scaled: "مقياس",
    unscaled: "غير مقياس",
    normalized: "مطبع",
    unnormalized: "غير مطبع",
    standardized: "موحد",
    unstandardized: "غير موحد",
    calibrated: "معاير",
    uncalibrated: "غير معاير",
    adjusted: "معدل",
    unadjusted: "غير معدل",
    corrected: "مصحح",
    uncorrected: "غير مصحح",
    modified: "معدل",
    unmodified: "غير معدل",
    altered: "مغير",
    unaltered: "غير مغير",
    changed: "متغير",
    unchanged: "غير متغير",
    transformed: "محول",
    untransformed: "غير محول",
    converted: "محول",
    unconverted: "غير محول",
    translated: "مترجم",
    untranslated: "غير مترجم",
    rotated: "مدور",
    unrotated: "غير مدور",
    flipped: "مقلوب",
    unflipped: "غير مقلوب",
    mirrored: "معكوس",
    unmirrored: "غير معكوس",
    reversed: "معكوس",
    unreversed: "غير معكوس",
    inverted: "مقلوب",
    uninverted: "غير مقلوب",
    negated: "منفي",
    unnegated: "غير منفي",
    complemented: "مكمل",
    uncomplemented: "غير مكمل",
    supplemented: "مكمل",
    unsupplemented: "غير مكمل",
    augmented: "معزز",
    unaugmented: "غير معزز",
    enhanced: "محسن",
    unenhanced: "غير محسن",
    improved: "محسن",
    unimproved: "غير محسن",
    upgraded: "مطور",
    unupgraded: "غير مطور",
    updated: "محدث",
    outdated: "قديم",
    current: "حالي",
    obsolete: "قديم",
    modern: "حديث",
    ancient: "قديم",
    contemporary: "معاصر",
    historical: "تاريخي",
    present: "حاضر",
    past: "ماضي",
    future: "مستقبلي",
    now: "الآن",
    then: "ثم",
    later: "لاحقًا",
    earlier: "سابقًا",
    sooner: "قريبًا",
    later: "لاحقًا",
    before: "قبل",
    after: "بعد",
    during: "أثناء",
    while: "بينما",
    when: "عندما",
    where: "أين",
    why: "لماذا",
    how: "كيف",
    what: "ماذا",
    who: "من",
    whom: "من",
    whose: "لمن",
    which: "أي",
    that: "ذلك",
    this: "هذا",
    these: "هؤلاء",
    those: "أولئك",
    here: "هنا",
    there: "هناك",
    everywhere: "في كل مكان",
    nowhere: "لا مكان",
    somewhere: "في مكان ما",
    anywhere: "في أي مكان",
    always: "دائمًا",
    never: "أبدًا",
    sometimes: "أحيانًا",
    occasionally: "أحيانًا",
    rarely: "نادرًا",
    frequently: "كثيرًا",
    often: "غالبًا",
    seldom: "نادرًا",
    usually: "عادةً",
    normally: "عادةً",
    typically: "عادةً",
    generally: "عمومًا",
    commonly: "عادةً",
    mostly: "غالبًا",
    mainly: "بشكل رئيسي",
    primarily: "بشكل أساسي",
    principally: "بشكل رئيسي",
    chiefly: "بشكل رئيسي",
    predominantly: "بشكل غالب",
    prevalently: "بشكل سائد",
    largely: "إلى حد كبير",
    greatly: "بشكل كبير",
    highly: "للغاية",
    extremely: "للغاية",
    very: "جدًا",
    quite: "تمامًا",
    rather: "إلى حد ما",
    somewhat: "إلى حد ما",
    slightly: "قليلاً",
    barely: "بالكاد",
    hardly: "بالكاد",
    scarcely: "بالكاد",
    nearly: "تقريبًا",
    almost: "تقريبًا",
    approximately: "تقريبًا",
    about: "حوالي",
    around: "حوالي",
    roughly: "تقريبًا",
    precisely: "بدقة",
    exactly: "بالضبط",
    accurately: "بدقة",
    correctly: "بشكل صحيح",
    rightly: "بشكل صحيح",
    wrongly: "بشكل خاطئ",
    incorrectly: "بشكل غير صحيح",
    inaccurately: "بشكل غير دقيق",
    imprecisely: "بشكل غير دقيق",
    inexactly: "بشكل غير دقيق",
    vaguely: "بشكل غامض",
    ambiguously: "بشكل غامض",
    clearly: "بوضوح",
    distinctly: "بوضوح",
    obviously: "بوضوح",
    evidently: "بوضوح",
    apparently: "على ما يبدو",
    seemingly: "على ما يبدو",
    ostensibly: "ظاهريًا",
    supposedly: "من المفترض",
    presumably: "على الأرجح",
    allegedly: "حسب الزعم",
    reputedly: "حسب السمعة",
    reportedly: "حسب التقارير",
    purportedly: "حسب الزعم",
    supposedly: "من المفترض",
    certainly: "بالتأكيد",
    definitely: "بالتأكيد",
    undoubtedly: "بلا شك",
    indubitably: "بلا شك",
    unquestionably: "بلا شك",
    undeniably: "لا يمكن إنكاره",
    indisputably: "لا جدال فيه",
    incontrovertibly: "لا جدال فيه",
    irrefutably: "لا يمكن دحضه",
    incontestably: "لا يمكن الطعن فيه",
    incontrovertibly: "لا جدال فيه",
    indisputably: "لا جدال فيه",
    undeniably: "لا يمكن إنكاره",
    unquestionably: "بلا شك",
    indubitably: "بلا شك",
    undoubtedly: "بلا شك",
    definitely: "بالتأكيد",
    certainly: "بالتأكيد",
    surely: "بالتأكيد",
    assuredly: "بالتأكيد",
    positively: "بشكل إيجابي",
    absolutely: "تمامًا",
    completely: "تمامًا",
    entirely: "تمامًا",
    wholly: "كليًا",
    totally: "كليًا",
    utterly: "تمامًا",
    thoroughly: "تمامًا",
    fully: "بالكامل",
    perfectly: "بشكل مثالي",
    ideally: "بشكل مثالي",
    optimally: "بشكل أمثل",
    maximally: "بأقصى قدر",
    minimally: "بأدنى قدر",
    partially: "جزئيًا",
    partly: "جزئيًا",
    fractionally: "جزئيًا",
    fragmentarily: "بشكل متقطع",
    incompletely: "بشكل غير كامل",
    imperfectly: "بشكل غير مثالي",
    defectively: "بشكل معيب",
    faultily: "بشكل معيب",
    deficiently: "بشكل ناقص",
    inadequately: "بشكل غير كافٍ",
    insufficiently: "بشكل غير كافٍ",
    enough: "كافٍ",
    sufficiently: "بشكل كافٍ",
    adequately: "بشكل كافٍ",
    satisfactorily: "بشكل مرضٍ",
    acceptably: "بشكل مقبول",
    tolerably: "بشكل محتمل",
    passably: "بشكل مقبول",
    reasonably: "بشكل معقول",
    fairly: "بشكل عادل",
    moderately: "باعتدال",
    middlingly: "بشكل متوسط",
    averagely: "بشكل متوسط",
    medially: "بشكل متوسط",
    centrally: "مركزيًا",
    intermediately: "بشكل متوسط",
    midway: "في المنتصف",
    halfway: "في المنتصف",
    middle: "وسط",
    center: "مركز",
    midst: "وسط",
    core: "جوهر",
    heart: "قلب",
    nucleus: "نواة",
    kernel: "نواة",
    seed: "بذرة",
    germ: "جرثومة",
    embryo: "جنين",
    origin: "أصل",
    source: "مصدر",
    root: "جذر",
    base: "قاعدة",
    foundation: "أساس",
    basis: "أساس",
    ground: "أرض",
    floor: "أرضية",
    bottom: "قاع",
    underneath: "تحت",
    beneath: "تحت",
    below: "أدناه",
    under: "تحت",
    down: "أسفل",
    downward: "نحو الأسفل",
    downwards: "نحو الأسفل",
    downstairs: "في الطابق السفلي",
    downhill: "منحدر",
    upstream: "عكس التيار",
    downstream: "مع التيار",
    uphill: "صعودًا",
    upstairs: "في الطابق العلوي",
    upward: "نحو الأعلى",
    upwards: "نحو الأعلى",
    up: "أعلى",
    over: "فوق",
    above: "فوق",
    atop: "فوق",
    on: "على",
    onto: "على",
    upon: "على",
    top: "أعلى",
    summit: "قمة",
    peak: "ذروة",
    apex: "ذروة",
    zenith: "ذروة",
    acme: "ذروة",
    pinnacle: "ذروة",
    climax: "ذروة",
    height: "ارتفاع",
    altitude: "ارتفاع",
    elevation: "ارتفاع",
    level: "مستوى",
    plane: "مستوى",
    tier: "طبقة",
    layer: "طبقة",
    stratum: "طبقة",
  },
}

// Create the language context
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
  isRTL: false,
})

// Create the language provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const isRTL = language === "ar"

  // Function to get a translation
  const t = (key: string): string => {
    // Check if the key exists in the translations
    if (!translations[language]) {
      console.warn(`Language "${language}" not found in translations`)
      return key
    }

    if (!translations[language][key]) {
      console.warn(`Translation key "${key}" not found for language "${language}"`)
      return key
    }

    return translations[language][key]
  }

  // Set the dir attribute on the html element when the language changes
  useEffect(() => {
    const htmlElement = document.documentElement
    htmlElement.setAttribute("dir", isRTL ? "rtl" : "ltr")
    htmlElement.classList.toggle("rtl", isRTL)
  }, [isRTL])

  return <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>{children}</LanguageContext.Provider>
}

// Create a custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
