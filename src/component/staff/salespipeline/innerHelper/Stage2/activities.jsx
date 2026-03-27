import React from "react";
import {
    Calendar,
    Users,
    MapPin,
    CheckCircle,
    Target,
    ClipboardList,
    UserCheck
} from "lucide-react";

const meetingLogs = [
    {
        id: 1,
        date: "March 14, 2026",
        meetingType: "Client Consultation",
        meetingWith: "ABC Corporation",
        participants: "John Doe, Jane Smith",

        avatar: "https://i.pravatar.cc/40?u=1",
        agenda: "Discuss project scope and service standards",
        outcome: "Client agreed to proceed with proposal",
        status: "Completed",
        location: "Kathmandu Office",
        executedBy: "Rahul Sharma"
    },
    {
        id: 2,
        date: "March 11, 2026",
        meetingType: "Internal Strategy Meeting",
        meetingWith: "Sales Team",
        avatar: "https://i.pravatar.cc/40?u=2",
        participants: "Sales Manager, Marketing Lead",
        agenda: "Lead generation campaign planning",
        outcome: "Defined Q2 marketing strategy",
        status: "Completed",
        location: "Zoom Meeting",
        executedBy: "Anita Verma"
    }
];

const InfoRow = ({ icon: Icon, color, label, value }) => (
    <div className="flex items-start gap-2">
        <div className={`p-1.5 rounded-xl bg-${color}-50`}>
            <Icon size={12} className={`text-${color}-500`} />
        </div>

        <div className="flex flex-col leading-tight">
            <span className="font-semibold text-slate-900 text-[12px]">{label}</span>
            <span className="text-[12px] text-slate-600">{value}</span>
        </div>
    </div>
);

export const STAGE2_Activities = () => {
    return (
        <div className="bg-white/80 p-6 rounded-xl">
            <h2 className="text-lg font-bold text-slate-900 mb-6">
                Meeting Timeline
            </h2>

            <ol className="relative border-s border-slate-200 ms-2">
                {meetingLogs.map((log) => (
                    <li key={log.id} className="mb-10 ms-8">

                        {/* Timeline Icon */}
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-amber-50 rounded-full -start-4 border-2 border-amber-500">
                            <img src={log.avatar} className="rounded-full" alt="user" />
                        </span>

                        {/* Date */}
                        <time className="text-[11px] font-medium text-slate-500 uppercase">
                            {log.date}
                        </time>

                        {/* Title */}
                        <h3 className="text-sm font-semibold text-slate-900 mt-1 mb-3">
                            {log.meetingType}
                        </h3>

                        {/* Responsive Layout */}
                        <div className="flex flex-col  gap-6">

                            {/* Info Section */}
                            <div className="flex flex-col gap-3 flex-1">

                                <InfoRow
                                    icon={Users}
                                    color="indigo"
                                    label="Meeting With"
                                    value={log.meetingWith}
                                />

                                <InfoRow
                                    icon={Users}
                                    color="purple"
                                    label="Participants"
                                    value={log.participants}
                                />

                                <InfoRow
                                    icon={Target}
                                    color="amber"
                                    label="Agenda"
                                    value={log.agenda}
                                />

                                <InfoRow
                                    icon={ClipboardList}
                                    color="blue"
                                    label="Status"
                                    value={log.status}
                                />

                                <InfoRow
                                    icon={MapPin}
                                    color="red"
                                    label="Location"
                                    value={log.location}
                                />

                                <InfoRow
                                    icon={UserCheck}
                                    color="teal"
                                    label="Executed By"
                                    value={log.executedBy}
                                />

                            </div>

                            {/* Outcome Highlight */}
                            <div className="flex-1">
                                <div className="flex gap-2 items-start bg-green-50 border-l-4 border-green-500 p-3 rounded-lg">

                                    <div className="p-1.5 rounded-xl bg-green-50">
                                        <CheckCircle size={12} className="text-green-500" />
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="font-semibold text-[12px] text-slate-900">
                                            Outcome
                                        </span>
                                        <span className="text-[12px] text-slate-700">
                                            {log.outcome}
                                            If you want, I can also show a much more advanced CRM-style meeting timeline UI (like HubSpot / Salesforce) with:If you want, I can also show a much more advanced CRM-style meeting timeline UI (like HubSpot / Salesforce) with:
                                        </span>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
};