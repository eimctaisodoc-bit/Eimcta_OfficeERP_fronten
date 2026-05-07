import NepaliDate from "nepali-date-converter";

export const nepaliMonths = [
  "बैशाख",
  "जेठ",
  "असार",
  "साउन",
  "भदौ",
  "असोज",
  "कार्तिक",
  "मंसिर",
  "पुष",
  "माघ",
  "फागुन",
  "चैत",
];

export const nepaliDays = [
  "आइतबार",
  "सोमबार",
  "मंगलबार",
  "बुधबार",
  "बिहीबार",
  "शुक्रबार",
  "शनिबार",
];

const pad = (value) => String(value).padStart(2, "0");

export const formatADDate = (date) => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
};

export const formatBSDate = (year, monthNumber, date) => {
  return `${year}-${pad(monthNumber)}-${pad(date)}`;
};

export const getSafeADDate = (customADDate = null) => {
  // Auto system date
  if (!customADDate) return new Date();

  if (customADDate instanceof Date) {
    if (Number.isNaN(customADDate.getTime())) {
      throw new Error("Invalid AD date.");
    }

    return customADDate;
  }

  if (typeof customADDate === "string") {
    const match = customADDate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

    if (match) {
      const [, year, month, date] = match;

      return new Date(Number(year), Number(month) - 1, Number(date));
    }
  }

  const adDate = new Date(customADDate);

  if (Number.isNaN(adDate.getTime())) {
    throw new Error("Invalid AD date. Use format like 2026-05-04");
  }

  return adDate;
};

export const getBsFromADDate = (customADDate = null) => {
  const adDate = getSafeADDate(customADDate);

  return new NepaliDate(adDate);
};

export const getBsMonthTotalDays = (bsYear, bsMonthIndex) => {
  const currentMonthStart = new NepaliDate(
    bsYear,
    bsMonthIndex,
    1
  ).toJsDate();

  let nextYear = bsYear;
  let nextMonthIndex = bsMonthIndex + 1;

  if (nextMonthIndex > 11) {
    nextMonthIndex = 0;
    nextYear = bsYear + 1;
  }

  const nextMonthStart = new NepaliDate(
    nextYear,
    nextMonthIndex,
    1
  ).toJsDate();

  const diffTime = nextMonthStart - currentMonthStart;

  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

export const getBsInfoByAdDate = (customADDate = null) => {
  const adDate = getSafeADDate(customADDate);
  const bs = getBsFromADDate(adDate);

  const bsYear = bs.getYear();
  const bsMonthIndex = bs.getMonth();
  const bsMonthNumber = bsMonthIndex + 1;
  const bsDate = bs.getDate();

  const dayIndex = adDate.getDay();
  const dayNumber = dayIndex + 1;
  const dayName = nepaliDays[dayIndex];

  const bsMonthName = nepaliMonths[bsMonthIndex];

  const totalDaysInMonth = getBsMonthTotalDays(bsYear, bsMonthIndex);

  return {
    adDate,
    adDateFormatted: formatADDate(adDate),

    bsYear,
    bsMonthIndex,
    bsMonthNumber,
    bsMonthName,

    bsDate,
    bsDateFormatted: formatBSDate(bsYear, bsMonthNumber, bsDate),
    bsFullDate: `${bsDate} ${bsMonthName} ${bsYear}`,

    dayIndex,
    dayNumber,
    dayName,

    totalDaysInMonth,
  };
};

export const getMonthDays = (bsYear, bsMonthIndex, todayBsDate = null) => {
  const bsMonthNumber = bsMonthIndex + 1;
  const bsMonthName = nepaliMonths[bsMonthIndex];
  const totalDaysInMonth = getBsMonthTotalDays(bsYear, bsMonthIndex);

  return Array.from({ length: totalDaysInMonth }, (_, index) => {
    const bsDate = index + 1;

    const adDate = new NepaliDate(bsYear, bsMonthIndex, bsDate).toJsDate();

    const dayIndex = adDate.getDay();
    const dayNumber = dayIndex + 1;
    const dayName = nepaliDays[dayIndex];

    return {
      day: dayNumber,
      date: bsDate,
      dayIndex,
      dayName,

      bsYear,
      bsMonthIndex,
      bsMonthNumber,
      bsMonthName,

      totalDaysInMonth,

      bsDate,
      bsDateFormatted: formatBSDate(bsYear, bsMonthNumber, bsDate),
      bsFullDate: `${bsDate} ${bsMonthName} ${bsYear}`,

      adDate,
      adDateFormatted: formatADDate(adDate),

      isToday: todayBsDate === bsDate,
      isSaturday: dayIndex === 6,
      isHoliday: dayIndex === 6,
    };
  });
};

export const getBsWeeks = (monthDays, totalDaysInMonth, todayBsDate = null) => {
  const weeks = [];

  const firstDay = monthDays?.[0];

  const monthName = firstDay?.bsMonthName;
  const monthIndex = firstDay?.bsMonthIndex;
  const monthNumber = firstDay?.bsMonthNumber;

  let startDate = 1;
  let weekIndex = 1;

  while (startDate <= totalDaysInMonth) {
    const endDate = Math.min(startDate + 6, totalDaysInMonth);

    const weeksDay = monthDays
      .filter((item) => item.date >= startDate && item.date <= endDate)
      .map((item) => ({
        day: item.day,
        date: item.date,
        dayName: item.dayName,

        isToday: item.isToday,
        isSaturday: item.isSaturday,
        isHoliday: item.isHoliday,
      }));

    const currentDay = weeksDay.find((item) => item.isToday) || null;

    weeks.push({
      range: `${startDate}-${endDate}`,
      weekName: `week${weekIndex}`,
      weekIndex,

      monthName,
      monthIndex,
      monthNumber,

      totalDays: totalDaysInMonth,

      isCurrentWeek: Boolean(currentDay),
      currentDay,

      weeksDay,
    });

    startDate = endDate + 1;
    weekIndex++;
  }

  return weeks;
};

export const getAllBsMonthsWeeks = (bsYear, todayInfo = null) => {
  return nepaliMonths.map((monthName, monthIndex) => {
    const monthNumber = monthIndex + 1;
    const totalDays = getBsMonthTotalDays(bsYear, monthIndex);

    const isCurrentMonth =
      todayInfo &&
      todayInfo.bsYear === bsYear &&
      todayInfo.bsMonthIndex === monthIndex;

    const todayBsDate = isCurrentMonth ? todayInfo.bsDate : null;

    const monthDays = getMonthDays(bsYear, monthIndex, todayBsDate);

    const weeks = getBsWeeks(monthDays, totalDays, todayBsDate);

    const currentWeek =
      weeks.find((week) => week.isCurrentWeek === true) || null;

    const currentDay = currentWeek?.currentDay || null;

    return {
      monthName,
      monthIndex,
      monthNumber,

      totalDays,

      isCurrentMonth,

      currentWeek,
      currentDay,

      weeks,
    };
  });
};

export const getPreviousBsMonth = (bsYear, bsMonthIndex) => {
  let year = bsYear;
  let monthIndex = bsMonthIndex - 1;

  if (monthIndex < 0) {
    monthIndex = 11;
    year = bsYear - 1;
  }

  const totalDays = getBsMonthTotalDays(year, monthIndex);

  return {
    value: monthIndex,
    label: nepaliMonths[monthIndex],

    bsYear: year,
    monthIndex,
    monthNumber: monthIndex + 1,
    monthName: nepaliMonths[monthIndex],

    totalDays,
    totalDaysInMonth: totalDays,
  };
};

export const getNextBsMonth = (bsYear, bsMonthIndex) => {
  let year = bsYear;
  let monthIndex = bsMonthIndex + 1;

  if (monthIndex > 11) {
    monthIndex = 0;
    year = bsYear + 1;
  }

  const totalDays = getBsMonthTotalDays(year, monthIndex);

  return {
    value: monthIndex,
    label: nepaliMonths[monthIndex],

    bsYear: year,
    monthIndex,
    monthNumber: monthIndex + 1,
    monthName: nepaliMonths[monthIndex],

    totalDays,
    totalDaysInMonth: totalDays,
  };
};

export const getBsDisplayData = (customADDate = null) => {
  const todayInfo = getBsInfoByAdDate(customADDate);

  const {
    adDate,
    adDateFormatted,

    bsYear,
    bsMonthIndex,
    bsMonthNumber,
    bsMonthName,

    bsDate,
    bsDateFormatted,
    bsFullDate,

    dayIndex,
    dayNumber,
    dayName,

    totalDaysInMonth,
  } = todayInfo;

  const months = nepaliMonths.map((month, index) => ({
    value: index,
    label: month,
    monthIndex: index,
    monthNumber: index + 1,
  }));

  const days = nepaliDays.map((day, index) => ({
    value: index,
    label: day,
    dayIndex: index,
    dayNumber: index + 1,
  }));

  const currentDay = [
    {
      value: dayIndex,
      label: dayName,

      day: dayNumber,
      date: bsDate,
      dayIndex,
      dayName,

      monthName: bsMonthName,
      monthIndex: bsMonthIndex,
      monthNumber: bsMonthNumber,
    },
  ];

  const currentMonth = [
    {
      value: bsMonthIndex,
      label: bsMonthName,

      monthIndex: bsMonthIndex,
      monthNumber: bsMonthNumber,
      monthName: bsMonthName,

      totalDays: totalDaysInMonth,
      totalDaysInMonth,
    },
  ];

  const currentYear = [
    {
      value: bsYear,
      label: String(bsYear),
      year: bsYear,
    },
  ];

  const today = {
    adDate,
    adDateFormatted,

    bsYear,
    bsMonthIndex,
    bsMonthNumber,
    bsMonthName,

    bsDate,
    bsDateFormatted,
    bsFullDate,

    dayIndex,
    dayNumber,
    dayName,

    totalDaysInMonth,
  };

  // Current month only
  const monthDays = getMonthDays(bsYear, bsMonthIndex, bsDate);

  const weeks = getBsWeeks(monthDays, totalDaysInMonth, bsDate);

  const currentWeek =
    weeks.find((week) => week.isCurrentWeek === true) || null;

  const currentDayInWeek = currentWeek?.currentDay || null;

  // All 12 BS months: बैशाख to चैत
  const allMonthsWeeks = getAllBsMonthsWeeks(bsYear, todayInfo);

  return {
    totalMonths: nepaliMonths.length,
    totalDaysInMonth,

    months,
    days,

    currentDay,
    currentMonth,
    currentYear,

    today,

    // Current month data
    monthDays,
    weeks,
    currentWeek,
    currentDayInWeek,

    // Full BS year data
    allMonthsWeeks,

    previousMonth: getPreviousBsMonth(bsYear, bsMonthIndex),
    nextMonth: getNextBsMonth(bsYear, bsMonthIndex),
  };
};