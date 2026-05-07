import React from "react";

const activityLogs = [
    {
        id: 1,
        date: "March 13, 2026",
        title: "Call Log: Initial Consultation",
        avatar: "https://i.pravatar.cc/40?u=1",
        fields: { "Lead Type": "Enterprise", "Lead Source": "Referral" },
        details: "Discussed the service standards and project scope."
    },
    {
        id: 2,
        date: "March 10, 2026",
        title: "Mail Log: Follow-up",
        avatar: "https://i.pravatar.cc/40?u=2",
        fields: { "Lead Channel": "Direct", "Lead Campaign": "Q1-Launch" },
        details: "Sent documentation regarding service standards."
    }
];

export const Activities = () => {
    return (
        <>
            <div>

            </div>
            <div className="bg-white/80 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Activity Timeline</h2>

                <ol className="relative border-s border-slate-200 ms-2">
                    {activityLogs.map((log) => (
                        <li key={log.id} className="mb-8 ms-8">
                            {/* Icon/Avatar Container: Amber-50 background, Amber-500 border */}
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-amber-50 rounded-full -start-4 border-2 border-amber-500">
                                <img src={log.avatar} className="rounded-full" alt="user" />
                            </span>

                            {/* Date & Title */}
                            <time className="text-[12px] font-medium text-slate-500 uppercase">{log.date}</time>
                            <h3 className="text-sm font-semibold text-slate-900 my-1">{log.title}</h3>

                            {/* Common Fields */}
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
                                {Object.entries(log.fields).map(([key, value]) => (
                                    <div key={key} className="text-[12px] text-slate-600">
                                        <span className="font-bold text-slate-900">{key}:</span> {value}
                                    </div>
                                ))}
                            </div>

                            {/* Log Details */}
                            <p className="text-[12px] text-slate-700 bg-orange-50 p-3 rounded-md border-l-4 border-amber-500">
                                {log.details}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
};