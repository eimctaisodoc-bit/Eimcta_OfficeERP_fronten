import React, { useEffect, useMemo, useState } from "react";
import {
    CalendarDaysIcon,
    CalendarIcon,
    CalendarRangeIcon,
    LayersIcon,
} from "lucide-react";
import Select from "react-select";
import { ValidateStyle } from "../../../../../data/data";
import { getBsDisplayData } from "./calendar";

const timeFrames = [
    "09:00 - 09:30",
    "09:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "11:00 - 11:30",
    "11:30 - 12:00",
    "12:00 - 12:30",
    "12:30 - 01:00",
    "01:00 - 01:30",
    "01:30 - 02:00",
    "02:00 - 02:30",
    "02:30 - 03:00",
    "03:00 - 03:30",
    "03:30 - 04:00",
    "04:00 - 04:30",
    "04:30 - 05:00",
    "05:00 - 05:30",
    "05:30 - 06:00",
];

export const ClientScheduleCalendar = () => {
    const [calendarData, setCalendarData] = useState(() => getBsDisplayData());

    const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);
    const [selectedWeekIndex, setSelectedWeekIndex] = useState(null);

    // Auto update by system date/time
    useEffect(() => {
        const timer = setInterval(() => {
            setCalendarData(getBsDisplayData());
        }, 60 * 1000);

        return () => clearInterval(timer);
    }, []);

    const {
        today,
        allMonthsWeeks,
        currentYear,
        currentMonth,
        currentWeek,
        currentDayInWeek,
    } = calendarData;

    const yearOptions = useMemo(() => {
        return [
            {
                value: today.bsYear,
                label: String(today.bsYear),
                year: today.bsYear,
            },
        ];
    }, [today.bsYear]);

    const monthOptions = useMemo(() => {
        return allMonthsWeeks.map((month) => ({
            value: month.monthIndex,
            label: month.monthName,

            monthName: month.monthName,
            monthIndex: month.monthIndex,
            monthNumber: month.monthNumber,

            totalDays: month.totalDays,
            isCurrentMonth: month.isCurrentMonth,
        }));
    }, [allMonthsWeeks]);

    const activeMonthIndex =
        selectedMonthIndex !== null ? selectedMonthIndex : today.bsMonthIndex;

    const selectedMonthData =
        allMonthsWeeks.find((month) => month.monthIndex === activeMonthIndex) ||
        allMonthsWeeks[0];

    const selectedMonthOption =
        monthOptions.find((month) => month.value === selectedMonthData?.monthIndex) ||
        null;

    const weekOptions = useMemo(() => {
        if (!selectedMonthData?.weeks) return [];

        return selectedMonthData.weeks.map((week) => ({
            value: week.weekIndex,
            label: `${week.weekName} (${week.range})`,

            range: week.range,
            weekName: week.weekName,
            weekIndex: week.weekIndex,

            monthName: week.monthName,
            monthIndex: week.monthIndex,
            monthNumber: week.monthNumber,

            totalDays: week.totalDays,
            isCurrentWeek: week.isCurrentWeek,
        }));
    }, [selectedMonthData]);

    const activeWeekIndex =
        selectedWeekIndex !== null
            ? selectedWeekIndex
            : selectedMonthData?.currentWeek?.weekIndex || 1;

    const selectedWeekData =
        selectedMonthData?.weeks?.find((week) => week.weekIndex === activeWeekIndex) ||
        selectedMonthData?.weeks?.[0] ||
        null;

    const selectedWeekOption =
        weekOptions.find((week) => week.value === selectedWeekData?.weekIndex) ||
        null;

    const selectedWeekDays = selectedWeekData?.weeksDay || [];

    const handleMonthChange = (selectedOption) => {
        setSelectedMonthIndex(selectedOption?.value ?? null);
        setSelectedWeekIndex(null);
    };

    const handleWeekChange = (selectedOption) => {
        setSelectedWeekIndex(selectedOption?.value ?? null);
    };

    return (
        <main className="min-h-screen bg-transparent p-4">
            <div className="w-full rounded-sm border border-slate-100 bg-transparent p-3">
                {/* Client Header */}
                <div className="flex w-full flex-col items-center justify-center border-b border-slate-200 pb-5 text-center">
                    <span className="rounded-md font-['Roboto_Slab'] text-sm text-slate-700">
                        Ram Kishor Adhikari (Founder & CEO)
                    </span>

                    <span className="rounded-md font-['Roboto_Slab'] text-md font-bold text-slate-900">
                        Elite English Boarding School
                    </span>
                </div>

                {/* Form Area */}
                <div className="mt-6 space-y-5">
                    <div className="flex items-center gap-2">
                        <span className="rounded bg-amber-50 p-2">
                            <CalendarDaysIcon size={14} className="text-amber-500" />
                        </span>

                        <span className="block font-['Roboto_Slab'] text-base font-semibold text-slate-800">
                            Year / Months / Weeks:
                        </span>
                    </div>

                    {/* Date Summary */}


                    {/* Form Row */}
                    <div className="flex w-full flex-col items-end gap-3 md:flex-row md:justify-around">
                        {/* Year */}
                        <div className="w-full space-y-2 md:w-[140px]">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <span className="rounded bg-amber-50 p-1.5">
                                    <CalendarIcon size={13} className="text-amber-500" />
                                </span>
                                Year
                            </label>

                            <Select
                                options={yearOptions}
                                value={yearOptions[0]}
                                styles={ValidateStyle(false, true, "40px")}
                                isDisabled={true}
                                isSearchable={false}
                                isClearable={false}
                            />
                        </div>

                        {/* Month */}
                        <div className="w-full space-y-2 md:w-[200px]">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <span className="rounded bg-blue-50 p-1.5">
                                    <CalendarDaysIcon size={13} className="text-blue-500" />
                                </span>
                                Month
                            </label>

                            <Select
                                options={monthOptions}
                                value={selectedMonthOption}
                                placeholder="Select Month"
                                styles={ValidateStyle(false, false, "40px")}
                                isSearchable={false}
                                onChange={handleMonthChange}
                            />
                        </div>

                        {/* Week */}
                        <div className="w-full space-y-2 md:w-[180px]">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <span className="rounded bg-orange-50 p-1.5">
                                    <CalendarRangeIcon size={13} className="text-orange-500" />
                                </span>
                                Week
                            </label>

                            <Select
                                options={weekOptions}
                                value={selectedWeekOption}
                                placeholder="Select Week"
                                styles={ValidateStyle(false, false, "40px")}
                                isSearchable={false}
                                onChange={handleWeekChange}
                            />
                        </div>

                        {/* Month Info */}

                    </div>
                </div>

                {/* Calendar Table */}
                <div className="w-full overflow-x-auto rounded-lg border mt-3 border-slate-200">
                    <table className="w-full min-w-[900px] border-collapse text-sm">
                        <thead>
                            <tr className="bg-slate-900 text-white">
                                <th className="w-[140px] border border-slate-300 px-2 text-left font-semibold">
                                    TimeFrame
                                </th>

                                {selectedWeekDays.map((dayItem) => (
                                    <th
                                        key={`${selectedMonthData?.monthIndex}-${selectedWeekData?.weekIndex}-${dayItem.date}`}
                                        className={`border border-slate-300 p-3 text-center font-semibold ${dayItem.isToday ? "bg-amber-500 text-slate-950" : ""
                                            }`}
                                    >
                                        <div className="text-sm font-bold">{dayItem.dayName}</div>

                                        {/* <div className="mt-1 text-xs font-medium opacity-90">
                        {selectedMonthData?.monthName} {dayItem.date}
                      </div> */}

                                        <div className="mt-1 text-[10px] font-medium opacity-80">
                                            Day {dayItem.day}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="bg-white">
                            {timeFrames.map((time) => (
                                <tr
                                    key={time}
                                    className="group transition-all duration-200 hover:bg-slate-50/70"
                                >
                                    {/* Time Column */}
                                    <td className="w-14 border border-slate-200 bg-gradient-to-r from-slate-50 to-white px-1 py-1.5 text-center align-center">
                                        <div className="-mt-1.5 text-md font-semibold tracking-wide text-slate-500 group-hover:text-slate-700">
                                            {time}
                                        </div>
                                    </td>

                                    {/* Calendar Grid Cells */}
                                    {selectedWeekDays.map((dayItem) => (
                                        <td
                                            key={`${time}-${selectedMonthData?.monthIndex}-${dayItem.date}`}
                                            className={`relative h-20  p-1.5 align-center transition-all duration-200 border border-slate-100`}
                                        >
                                            <div className="flex h-full w-full flex-col ">
                                                {/* Date Badge */}
                                                <div className="flex items-center justify-between">
                                                    <span
                                                        className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[11px] font-bold transition-all duration-200
                  ${dayItem.isToday
                                                                ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                                                                : "bg-slate-100 text-slate-500 group-hover:bg-amber-50 group-hover:text-amber-700"
                                                            }
                `}
                                                    >
                                                        {dayItem.date}
                                                    </span>

                                                 
                                                </div>

                                                {/* Cell Content Area */}
                                                {/* <div
                                                    className={`mt-2 flex-1 rounded-lg border border-dashed transition-all duration-200
                ${dayItem.isToday
                                                            ? "border-blue-200/70 bg-blue-50/30"
                                                            : "border-transparent group-hover:border-slate-200 group-hover:bg-white/70"
                                                        }
              `}
                                                ></div> */}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </main>
    );
};