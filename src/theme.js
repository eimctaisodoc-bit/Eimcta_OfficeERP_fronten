export const theme = {
  font: {
    family: "'Roboto Slab', serif",
    className: "font-['Roboto_Slab']",
  },

  color: {
    primary: "amber",
    dark: "slate",
    success: "emerald",
    info: "blue",
    danger: "red",
    warning: "orange",
    violet: "violet",
  },

  text: {
    sm: {
      base: "text-[11px] sm:text-xs leading-4 text-slate-500 font-medium",
      title: "text-[11px] sm:text-xs font-bold uppercase tracking-wide text-slate-900",
      color: "text-slate-600",
      hover: "hover:text-amber-600 transition-colors duration-200",
      family: "font-['Roboto_Slab']",
    },

    md: {
      base: "text-xs sm:text-[13px] leading-5 text-slate-600 font-medium",
      title: "text-xs sm:text-[13px] font-bold uppercase tracking-wide text-slate-900",
      color: "text-slate-700",
      hover: "hover:text-amber-600 transition-colors duration-200",
      family: "font-['Roboto_Slab']",
    },

    lg: {
      base: "text-sm sm:text-base leading-6 text-slate-700 font-medium",
      title: "text-sm sm:text-base font-bold uppercase tracking-tight text-slate-900",
      color: "text-slate-800",
      hover: "hover:text-amber-600 transition-colors duration-200",
      family: "font-['Roboto_Slab']",
    },

    xl: {
      base: "text-base sm:text-lg lg:text-xl leading-7 text-slate-800 font-semibold",
      title: "text-base sm:text-lg lg:text-xl font-extrabold uppercase tracking-tight text-slate-900",
      color: "text-slate-900",
      hover: "hover:text-amber-600 transition-colors duration-200",
      family: "font-['Roboto_Slab']",
    },
  },

  icon: {
    sm: {
      size: 12,
      className: "text-slate-500",
      bg: "bg-slate-50",
      box: "p-1 rounded-md bg-slate-50",
      hover: "hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200",
    },

    md: {
      size: 14,
      className: "text-amber-500",
      bg: "bg-amber-50",
      box: "p-1.5 rounded-lg bg-amber-50",
      hover: "hover:bg-amber-100 hover:text-amber-600 transition-colors duration-200",
    },

    lg: {
      size: 16,
      className: "text-slate-700",
      bg: "bg-slate-100",
      box: "p-2 rounded-xl bg-slate-100",
      hover: "hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200",
    },

    xl: {
      size: 20,
      className: "text-slate-900",
      bg: "bg-white",
      box: "p-2.5 rounded-xl bg-white border border-slate-200",
      hover: "hover:border-amber-300 hover:text-amber-600 transition-all duration-200",
    },

    colors: {
      primary: "text-amber-500",
      success: "text-emerald-500",
      info: "text-blue-500",
      danger: "text-red-500",
      warning: "text-orange-500",
      dark: "text-slate-900",
      muted: "text-slate-400",
      white: "text-white",
    },

    bgColors: {
      primary: "bg-amber-50",
      success: "bg-emerald-50",
      info: "bg-blue-50",
      danger: "bg-red-50",
      warning: "bg-orange-50",
      violet: "bg-violet-50",
      dark: "bg-slate-900",
      light: "bg-slate-50",
      white: "bg-white",
    },
  },

  input: {
    sm: {
      label: "text-[11px] font-semibold text-slate-700",
      field:
        "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15",
      hover: "hover:border-slate-300",
      error: "border-red-400 focus:border-red-500 focus:ring-red-500/15",
      disabled: "cursor-not-allowed bg-slate-100 text-slate-400 opacity-70",
    },

    md: {
      label: "text-xs font-semibold text-slate-700",
      field:
        "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15",
      hover: "hover:border-slate-300",
      error: "border-red-400 focus:border-red-500 focus:ring-red-500/15",
      disabled: "cursor-not-allowed bg-slate-100 text-slate-400 opacity-70",
    },

    lg: {
      label: "text-sm font-bold text-slate-800",
      field:
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15",
      hover: "hover:border-slate-300",
      error: "border-red-400 focus:border-red-500 focus:ring-red-500/15",
      disabled: "cursor-not-allowed bg-slate-100 text-slate-400 opacity-70",
    },

    xl: {
      label: "text-sm font-bold uppercase tracking-wide text-slate-900",
      field:
        "w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20",
      hover: "hover:border-slate-300",
      error: "border-red-400 focus:border-red-500 focus:ring-red-500/15",
      disabled: "cursor-not-allowed bg-slate-100 text-slate-400 opacity-70",
    },

    textarea:
      "w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15",

    errorText: "text-[11px] font-medium text-red-500",
    helpText: "text-[11px] text-slate-500",
  },

  button: {
    sm: "inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-bold uppercase transition-colors duration-200",
    md: "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-[12px] font-bold uppercase transition-colors duration-200",
    lg: "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold uppercase transition-all duration-200",
    xl: "inline-flex items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-base font-extrabold uppercase transition-all duration-200",

    primary: "bg-amber-500 text-white hover:bg-amber-600 shadow-sm shadow-amber-500/20",
    dark: "bg-slate-900 text-white hover:bg-slate-800",
    light: "bg-slate-50 text-slate-700 hover:bg-slate-100",
    info: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    success: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    violet: "bg-violet-50 text-violet-600 hover:bg-violet-100",

    disabled: "cursor-not-allowed bg-slate-100 text-slate-400 opacity-70",
  },

  card: {
    base: "rounded-xl border border-slate-200 bg-white",
    sm: "rounded-lg border border-slate-200 bg-white p-3",
    md: "rounded-xl border border-slate-200 bg-white p-4",
    lg: "rounded-xl border border-slate-200 bg-white p-5 shadow-sm",
    xl: "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
    hover: "hover:border-amber-200 hover:shadow-md transition-all duration-200",
    soft: "rounded-xl border border-slate-200 bg-slate-50 p-4",
  },

  badge: {
    sm: "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-bold uppercase",
    md: "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold uppercase",
    lg: "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold uppercase",

    primary: "bg-amber-50 text-amber-700 border border-amber-200",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    info: "bg-blue-50 text-blue-700 border border-blue-200",
    danger: "bg-red-50 text-red-700 border border-red-200",
    dark: "bg-slate-900 text-white border border-slate-900",
    light: "bg-slate-50 text-slate-600 border border-slate-200",
  },

  alert: {
    warning:
      "relative flex items-start gap-3 rounded-lg border border-amber-200/80 bg-amber-50 px-4 py-3 text-amber-800",
    success:
      "relative flex items-start gap-3 rounded-lg border border-emerald-200/80 bg-emerald-50 px-4 py-3 text-emerald-800",
    danger:
      "relative flex items-start gap-3 rounded-lg border border-red-200/80 bg-red-50 px-4 py-3 text-red-800",
    info:
      "relative flex items-start gap-3 rounded-lg border border-blue-200/80 bg-blue-50 px-4 py-3 text-blue-800",
  },

  section: {
    wrapper: "mx-auto w-full bg-transparent px-3 py-4",
    header: "mb-4 flex items-center gap-2",
    title: "text-sm font-bold uppercase tracking-tight text-slate-900",
    subtitle: "text-[11px] text-slate-500",
    divider: "border-t border-slate-200 pt-4",
  },

  table: {
    wrapper: "overflow-hidden rounded-xl border border-slate-200 bg-white",
    head: "bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-600",
    row: "border-t border-slate-200 text-sm text-slate-700 hover:bg-amber-50/40 transition-colors",
    cell: "px-3 py-2",
  },

  motion: {
    fast: "transition-all duration-150",
    normal: "transition-all duration-200",
    slow: "transition-all duration-300",
    hoverLift: "hover:-translate-y-0.5 hover:shadow-md transition-all duration-200",
  },

  radius: {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl",
    full: "rounded-full",
  },
};
