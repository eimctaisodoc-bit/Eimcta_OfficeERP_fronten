import React, { useState } from "react";
import {
    Building2,
    MapPin,
    Calendar,
    Clock,
    Plus,
    Eye,
    Check,
    Trash2,
    Sparkles
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
        ]
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
            workingDays: { ...prev.workingDays, [day]: !prev.workingDays[day] }
        }));
    };

    const handleTimeChange = (field, value) => {
        setSettings(prev => ({
            ...prev,
            workingHours: { ...prev.workingHours, [field]: value }
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const inputClasses = "w-full px-0 py-3 bg-white border-b border-slate-200 focus:border-amber-500 focus:ring-0 outline-none transition-all text-slate-900 placeholder-slate-300";

    return (
        <div 
            className="bg-white min-h-screen p-6 md:p-12 text-slate-900" 
            style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">General Settings</h1>
                        <p className="text-slate-500 mt-2">Manage your organization's core configuration and schedule.</p>
                    </div>
                    <button 
                        onClick={() => setIsPreview(!isPreview)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                    >
                        <Eye size={18} />
                        <span className="text-sm font-medium">{isPreview ? "Edit Mode" : "View Preview"}</span>
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Side: Forms */}
                    <div className={`lg:col-span-7 space-y-16 ${isPreview ? 'opacity-40 pointer-events-none' : ''}`}>
                        
                        {/* Company Section */}
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <Building2 className="text-amber-500" size={28} />
                                <h2 className="text-2xl font-semibold text-slate-800">Company Profile</h2>
                            </div>
                            <div className="space-y-8">
                                <div>
                                    <label className="text-xs font-bold text-amber-600 uppercase tracking-widest">Organization Name</label>
                                    <input
                                        type="text"
                                        value={settings.companyName}
                                        onChange={(e) => setSettings(prev => ({ ...prev, companyName: e.target.value }))}
                                        className={inputClasses}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-amber-600 uppercase tracking-widest">Physical Address</label>
                                    <textarea
                                        value={settings.address}
                                        onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                                        className={inputClasses}
                                        rows="2"
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="border-t border-slate-100" />

                        {/* Working Hours Section */}
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <Clock className="text-orange-500" size={28} />
                                <h2 className="text-2xl font-semibold text-slate-800">Operating Hours</h2>
                            </div>
                            
                            <div className="mb-10">
                                <label className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-4 block">Active Workdays</label>
                                <div className="flex flex-wrap gap-3">
                                    {daysOfWeek.map((day) => (
                                        <button
                                            key={day.key}
                                            onClick={() => handleDayToggle(day.key)}
                                            className={`h-12 w-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                                                settings.workingDays[day.key]
                                                    ? "bg-orange-500 text-white shadow-lg shadow-orange-100"
                                                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                                            }`}
                                        >
                                            {day.label.slice(0, 1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-10">
                                <div>
                                    <label className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-1">Shift Start</label>
                                    <input
                                        type="time"
                                        value={settings.workingHours.start}
                                        onChange={(e) => handleTimeChange("start", e.target.value)}
                                        className={inputClasses}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-1">Shift End</label>
                                    <input
                                        type="time"
                                        value={settings.workingHours.end}
                                        onChange={(e) => handleTimeChange("end", e.target.value)}
                                        className={inputClasses}
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="border-t border-slate-100" />

                        {/* Holidays Section */}
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <Calendar className="text-blue-500" size={28} />
                                <h2 className="text-2xl font-semibold text-slate-800">Public Holidays</h2>
                            </div>

                            <div className="flex gap-4 items-end mb-8">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Holiday Title"
                                        value={newHoliday.name}
                                        onChange={(e) => setNewHoliday(prev => ({ ...prev, name: e.target.value }))}
                                        className={inputClasses}
                                    />
                                </div>
                                <div className="w-40">
                                    <input
                                        type="date"
                                        value={newHoliday.date}
                                        onChange={(e) => setNewHoliday(prev => ({ ...prev, date: e.target.value }))}
                                        className={inputClasses}
                                    />
                                </div>
                                <button
                                    onClick={handleAddHoliday}
                                    className="p-3 bg-amber-500 text-white rounded-full hover:bg-emerald-600 transition-transform hover:scale-110 shadow-md shadow-emerald-100"
                                >
                                    <Plus size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {settings.holidays.map((holiday) => (
                                    <div key={holiday.id} className="flex items-center justify-between py-3 group">
                                        <div className="flex items-center gap-4">
                                            <div className="h-2 w-2 rounded-full bg-amber-400" />
                                            <div>
                                                <p className="font-medium text-slate-800">{holiday.name}</p>
                                                <p className="text-xs text-slate-400 font-sans tracking-tight">{formatDate(holiday.date)}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveHoliday(holiday.id)}
                                            className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Side: Preview Card */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-12 p-8 bg-slate-900
                         rounded-[2rem] text-white  overflow-hidden">
                            {/* Decorative Background Element */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-amber-400 mb-10">
                                    <Sparkles size={20} />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em]">System Insight</span>
                                </div>

                                <div className="space-y-12">
                                    <section>
                                        <h3 className="text-3xl font-bold leading-tight">{settings.companyName || "Company Name"}</h3>
                                        <div className="flex items-start gap-2 mt-4 text-slate-400">
                                            <MapPin size={18} className="shrink-0 text-amber-500" />
                                            <p className="text-sm leading-relaxed">{settings.address || "No address set"}</p>
                                        </div>
                                    </section>

                                    <section className="grid grid-cols-2 gap-8 border-t border-slate-800 pt-8">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Status</p>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-sm font-medium">Live & Active</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Shift</p>
                                            <p className="text-sm font-medium text-orange-400">{settings.workingHours.start} — {settings.workingHours.end}</p>
                                        </div>
                                    </section>

                                    <section>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Calendar Exceptions</p>
                                        <div className="space-y-3">
                                            {settings.holidays.slice(0, 2).map(h => (
                                                <div key={h.id} className="flex justify-between items-center text-xs">
                                                    <span className="text-slate-300">{h.name}</span>
                                                    <span className="text-emerald-400 font-sans">{new Date(h.date).toLocaleDateString('en-GB')}</span>
                                                </div>
                                            ))}
                                            <p className="text-[10px] text-slate-600 italic">Total of {settings.holidays.length} holidays configured</p>
                                        </div>
                                    </section>
                                </div>

                                <button
                                    className="w-full mt-12 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl shadow-amber-900/20"
                                >
                                    <Check size={20} />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};