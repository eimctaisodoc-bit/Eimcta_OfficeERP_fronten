import React, { useState } from "react";
import {
    Building2,
    MapPin,
    Calendar,
    Clock,
    Plus,
    X,
    Eye,
    Check,
    Trash2
} from "lucide-react";

export const General_Setting = () => {
    const [settings, setSettings] = useState({
        companyName: "TechCorp Solutions",
        address: "123 Business Street, Tech City, TC 10101",
        workingDays: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            sunday: true
        },
        workingHours: {
            start: "09:00",
            end: "17:00"
        },
        holidays: [
            { id: 1, name: "New Year's Day", date: "2024-01-01" },
            { id: 2, name: "Christmas Day", date: "2024-12-25" },
            { id: 3, name: "Thanksgiving", date: "2024-11-28" }
        ],
        weekendDays: ["Saturday"]
    });

    const [newHoliday, setNewHoliday] = useState({ name: "", date: "" });
    const [isPreview, setIsPreview] = useState(false);

    const daysOfWeek = [
        { key: "monday", label: "Monday" },
        { key: "tuesday", label: "Tuesday" },
        { key: "wednesday", label: "Wednesday" },
        { key: "thursday", label: "Thursday" },
        { key: "friday", label: "Friday" },
        { key: "saturday", label: "Saturday" },
        { key: "sunday", label: "Sunday" }
    ];

    const handleDayToggle = (day) => {
        setSettings(prev => ({
            ...prev,
            workingDays: {
                ...prev.workingDays,
                [day]: !prev.workingDays[day]
            }
        }));
    };

    const handleTimeChange = (field, value) => {
        setSettings(prev => ({
            ...prev,
            workingHours: {
                ...prev.workingHours,
                [field]: value
            }
        }));
    };

    const handleAddHoliday = () => {
        if (newHoliday.name && newHoliday.date) {
            const newId = settings.holidays.length > 0
                ? Math.max(...settings.holidays.map(h => h.id)) + 1
                : 1;

            setSettings(prev => ({
                ...prev,
                holidays: [...prev.holidays, { ...newHoliday, id: newId }]
            }));
            setNewHoliday({ name: "", date: "" });
        }
    };

    const handleRemoveHoliday = (id) => {
        setSettings(prev => ({
            ...prev,
            holidays: prev.holidays.filter(holiday => holiday.id !== id)
        }));
    };

    const handleSaveSettings = () => {
        // Here you would typically send the data to an API
        console.log("Settings saved:", settings);
        alert("Settings saved successfully!");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all text-slate-700 hover:border-amber-300";
    return (
        <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg ">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8 border-b border-slate-300 pb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-700">General Settings</h1>
               
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Left Column - Settings Form */}
                <div className={`space-y-6 md:space-y-8 ${isPreview ? 'opacity-50 pointer-events-none' : ''}`}>
                    {/* Company Information */}
                    <div className="border border-slate-300 rounded-xl p-4 md:p-6 bg-white">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <Building2 className="text-amber-600" size={24} />
                            <h2 className="text-lg md:text-xl font-semibold text-slate-700">Company Information</h2>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block text-sm md:text-base font-medium text-slate-700 mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    value={settings.companyName}
                                    onChange={(e) => setSettings(prev => ({ ...prev, companyName: e.target.value }))}
                                    className={inputClasses}
                                    placeholder="Enter company name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm md:text-base font-medium text-slate-700 mb-2">
                                    Address
                                </label>
                                <textarea
                                    value={settings.address}
                                    onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                                    className={inputClasses}
                                    rows="3"
                                    placeholder="Enter company address"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Working Days & Hours */}
                    <div className="border border-slate-300 rounded-xl p-4 md:p-6 bg-white">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <Calendar className="text-amber-600" size={24} />
                            <h2 className="text-lg md:text-xl font-semibold text-slate-700">Working Days & Hours</h2>
                        </div>

                        <div className="mb-6 md:mb-8">
                            <label className="block text-sm md:text-base font-medium text-slate-700 mb-3 md:mb-4">
                                Working Days
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 md:gap-3">
                                {daysOfWeek.map((day) => {
                                    const isActive = settings.workingDays[day.key];

                                    return (
                                        <button
                                            key={day.key}
                                            type="button"
                                            onClick={() => handleDayToggle(day.key)}
                                            className={`
                                                relative px-4 py-2 md:px-1 md:py-2.5
                                                rounded-full text-sm md:text-base font-medium
                                                transition-all duration-200 ease-out
                                                border
                                                focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500
                                                ${isActive
                                                    ? `
                                                        bg-gradient-to-r from-amber-400 to-amber-600
                                                        text-white border-amber-600
                                                        shadow-md shadow-amber-300
                                                        scale-[1.03]
                                                    `
                                                    : `
                                                        bg-white text-slate-700 border-slate-300
                                                        hover:bg-amber-50 hover:text-slate-800
                                                        hover:border-slate-400
                                                        hover:-translate-y-[1px]
                                                        shadow-sm
                                                    `
                                                }
                                            `}
                                        >
                                            {day.label.slice(0, 3)}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label className="block text-sm md:text-base font-medium text-slate-700 mb-2 flex items-center gap-2">
                                    <Clock size={16} />
                                    Start Time
                                </label>
                                <input
                                    type="time"
                                    value={settings.workingHours.start}
                                    onChange={(e) => handleTimeChange("start", e.target.value)}
                                    className="w-full px-4 py-3 text-sm
                                             border border-slate-300 bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all text-slate-700 hover:border-amber-300 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm md:text-base font-medium text-slate-700 mb-2  items-center gap-2">
                                    <Clock size={16} />
                                    End Time
                                </label>
                                <input
                                    type="time"
                                    value={settings.workingHours.end}
                                    onChange={(e) => handleTimeChange("end", e.target.value)}
                                    className="w-full px-4 py-3 text-sm
                                             
                                              rounded-xl border border-slate-300 bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all text-slate-700 hover:border-amber-300 shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Holidays Configuration */}
                    <div className="border border-slate-300 rounded-xl p-4 md:p-6 bg-white">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <Calendar className="text-amber-600" size={24} />
                            <h2 className="text-lg md:text-xl font-semibold text-slate-700">Holidays & Weekend Configuration</h2>
                        </div>

                        <div className="mb-6 md:mb-8">
                            <label className="block text-sm md:text-base font-medium text-slate-700 mb-3 md:mb-4">
                                Add New Holiday
                            </label>
                            <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:gap-4">
                                <input
                                    type="text"
                                    value={newHoliday.name}
                                    onChange={(e) => setNewHoliday(prev => ({ ...prev, name: e.target.value }))}
                                    className="flex-1 px-4 py-3 text-sm
                                             bg-white border border-slate-300
                                              rounded-xl focus:ring-4 focus:ring-amber-500/20
                                               focus:border-amber-500 outline-none
                                                transition-all shadow-sm"
                                    placeholder="Holiday Name"
                                />
                                <input
                                    type="date"
                                    value={newHoliday.date}
                                    onChange={(e) => setNewHoliday(prev => ({ ...prev, date: e.target.value }))}
                                    className="px-4 py-3 text-sm
                                             bg-white border border-slate-300
                                              rounded-xl focus:ring-4 focus:ring-amber-500/20
                                               focus:border-amber-500 outline-none
                                                transition-all shadow-sm"
                                />
                                <button
                                    onClick={handleAddHoliday}
                                    className="px-4 py-3 text-sm md:text-base bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-lg hover:from-amber-500 hover:to-amber-700 transition-colors flex items-center justify-center gap-2 focus:ring-4 focus:ring-amber-500/20 focus:outline-none"
                                >
                                    <Plus size={18} />
                                    Add
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm md:text-base font-medium text-slate-700 mb-3 md:mb-4">
                                Scheduled Holidays
                            </label>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {settings.holidays.map((holiday) => (
                                    <div
                                        key={holiday.id}
                                        className="flex items-center justify-between p-3 md:p-4 bg-amber-50 border border-slate-200 rounded-lg hover:bg-amber-100 transition-colors"
                                    >
                                        <div>
                                            <span className="font-medium text-slate-700 text-sm md:text-base">{holiday.name}</span>
                                            <span className="ml-3 text-xs md:text-sm text-slate-500">{formatDate(holiday.date)}</span>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveHoliday(holiday.id)}
                                            className="p-1 md:p-2 text-slate-400 hover:text-red-500 transition-colors focus:ring-4 focus:ring-red-500/20 focus:outline-none"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                                {settings.holidays.length === 0 && (
                                    <div className="text-center py-4 text-slate-400 text-sm md:text-base">
                                        No holidays configured
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Preview */}
                <div className={`border border-slate-300 rounded-xl p-4 md:p-6 lg:p-8 bg-white ${!isPreview ? 'lg:block hidden' : ''}`}>
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <Eye className="text-amber-600" size={24} />
                        <h2 className="text-lg md:text-xl font-semibold text-slate-700">Settings Preview</h2>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                        {/* Company Preview */}
                        <div className="p-4 md:p-6 rounded-lg border border-slate-300 bg-amber-50">
                            <h3 className="font-semibold text-slate-700 mb-3 md:mb-4 flex items-center gap-2 text-base md:text-lg">
                                <Building2 size={18} className="text-amber-600" />
                                Company Information
                            </h3>
                            <div className="space-y-2 md:space-y-3">
                                <p className="text-base md:text-lg font-medium text-amber-600">{settings.companyName}</p>
                                <p className="text-slate-700 text-sm md:text-base flex items-start gap-2">
                                    <MapPin size={16} className="text-amber-400 mt-1 flex-shrink-0" />
                                    {settings.address}
                                </p>
                            </div>
                        </div>

                        {/* Working Days Preview */}
                        <div className="p-4 md:p-6 rounded-lg border border-slate-300 bg-amber-50">
                            <h3 className="font-semibold text-slate-700 mb-3 md:mb-4 flex items-center gap-2 text-base md:text-lg">
                                <Calendar size={18} className="text-amber-600" />
                                Working Schedule
                            </h3>
                            <div className="space-y-3 md:space-y-4">
                                <div>
                                    <p className="text-sm md:text-base text-slate-700 mb-2 md:mb-3">Working Days:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {daysOfWeek.map((day) => (
                                            <span
                                                key={day.key}
                                                className={`px-3 py-1 text-start rounded-full text-xs md:text-sm ${settings.workingDays[day.key]
                                                    ? "bg-gradient-to-r from-amber-400 to-amber-600 text-white border border-amber-600"
                                                    : "bg-white text-slate-500 border border-slate-300"
                                                    }`}
                                            >
                                                {day.label}
                                                {settings.workingDays[day.key] && (
                                                    <Check size={12} className="inline ml-1" />
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm md:text-base text-slate-700 mb-1 md:mb-2">Working Hours:</p>
                                    <p className="font-medium text-amber-600 text-base md:text-lg">
                                        {settings.workingHours.start} - {settings.workingHours.end}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Holidays Preview */}
                        <div className="p-4 md:p-6 rounded-lg border border-slate-300 bg-amber-50">
                            <h3 className="font-semibold text-slate-700 mb-3 md:mb-4 flex items-center gap-2 text-base md:text-lg">
                                <Calendar size={18} className="text-amber-600" />
                                Holidays ({settings.holidays.length})
                            </h3>
                            <div className="space-y-2 md:space-y-3">
                                {settings.holidays.slice(0, 5).map((holiday) => (
                                    <div
                                        key={holiday.id}
                                        className="flex items-center justify-between p-2 md:p-3 border-b border-slate-300 last:border-b-0"
                                    >
                                        <span className="text-slate-700 text-sm md:text-base">{holiday.name}</span>
                                        <span className="text-xs md:text-sm text-slate-500">
                                            {new Date(holiday.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}
                                {settings.holidays.length > 5 && (
                                    <p className="text-sm text-amber-600 text-center pt-2 md:pt-3">
                                        +{settings.holidays.length - 5} more holidays
                                    </p>
                                )}
                                {settings.holidays.length === 0 && (
                                    <p className="text-slate-400 text-center py-2 md:py-3 text-sm md:text-base">No holidays configured</p>
                                )}
                            </div>
                        </div>

                        {/* Summary */}
                      
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 md:mt-8 pt-6 border-t border-slate-300 flex justify-end">
                <button
                    onClick={handleSaveSettings}
                    disabled={isPreview}
                    className={`px-6 py-3 text-sm md:text-base rounded-lg font-medium transition-all flex items-center gap-2 ${isPreview
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-amber-400 to-amber-600 text-white hover:from-amber-500 hover:to-amber-700 shadow-lg focus:ring-4 focus:ring-amber-500/20 focus:outline-none"
                        }`}
                >
                    <Check size={20} />
                    Save Settings
                </button>
            </div>
        </div>
    );
};