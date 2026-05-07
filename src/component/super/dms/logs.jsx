import React, { Activity } from "react"
import {
    CalendarRange,
    Folder,
    GitBranch,
    LucideGitBranch,
    MapPin
} from "lucide-react"
import Select from "react-select";
export const Logs_ = () => {
    const options = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
    ];
    return (<>
        <div className=" grid grid-cols-2 place-items-center-safe  w-full  ">


            <div className="mt-5 h-[calc(100vh-1.25rem)]">
                <div className="flex flex-col w-[300px] bg-white border border-slate-200 rounded-md h-fit overflow-hidden">

                    {/* Header Section */}
                    <div className="p-4 border-b border-slate-100 bg-white">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-amber-600 text-sm flex items-center gap-2">
                                <Activity size={16} /> Activity Logs
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] text-orange-700
                                         bg-orange-50 border border-orange-200 rounded-full">
                                <MapPin size={10} className="text-orange-600" />
                                <span>KTM</span>
                            </span>
                        </div>

                        {/* Filters Row */}
                        <div className="flex flex-col gap-2">
                            <Select
                                options={options}
                                placeholder="Filter type..."
                                classNames={{
                                    control: () => "!text-[11px] !min-h-[30px] !border-slate-200 !rounded-md !shadow-none",
                                    option: () => "text-[11px]"
                                }}
                            />
                            <input
                                type="date"
                                className="text-[11px] text-slate-600 border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto bg-white p-5">
                        <div className="relative border-l border-slate-200 ml-4 flex flex-col gap-8">

                            {/* ================= FILE ACTIVITY ================= */}
                            <div className="relative pl-7 group">

                                {/* Avatar (Timeline Node) */}
                                <div className="absolute -left-[18px] top-0 bg-white p-[2px]">
                                    <img
                                        src="https://ui-avatars.com/api/?name=User+One&background=f1f5f9&color=0f172a"
                                        alt="user"
                                        className="w-8 h-8 rounded-full border border-slate-200 shadow-sm"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-3">

                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">

                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-slate-800">
                                                    Project_Brief.pdf
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    Uploaded • 2 mins ago
                                                </span>
                                            </div>
                                        </div>

                                        {/* File Size */}
                                        <span className="text-xs text-slate-400">2.4 MB</span>
                                    </div>

                                    {/* Metadata Card */}
                                    <div className="flex items-center justify-between
                                                 bg-white px-2 py-1.5  rounded border border-white shadow">

                                        {/* Left Info */}
                                        <div className="flex flex-col text-xs text-slate-500">
                                            <span>
                                                Shared with{" "}
                                                <span className="font-medium text-slate-800">
                                                    Design Team
                                                </span>
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                Access: Read & Comment
                                            </span>
                                        </div>

                                        {/* Avatar Stack */}
                                        <div className="flex -space-x-2">
                                            <img
                                                className="w-6 h-6  cursor-pointer  rounded-full border-2 border-white"
                                                src="https://ui-avatars.com/api/?name=A&background=0ea5e9&color=fff"
                                            />
                                            <img
                                                className="w-6 cursor-pointer h-6 rounded-full border-2 border-white"
                                                src="https://ui-avatars.com/api/?name=B&background=6366f1&color=fff"
                                            />
                                            <div className="w-6 h-6 rounded-full border-2 cursor-pointer border-white bg-slate-200 flex items-center justify-center text-[10px] font-semibold text-slate-600">
                                                +2
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 h-[calc(100vh-1.25rem)]">
                <div className="flex flex-col w-[300px] bg-white border border-slate-200 rounded-md h-fit overflow-hidden">

                    {/* Header Section */}
                    <div className="p-4 border-b border-slate-100 bg-white">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-amber-600 text-sm flex items-center gap-2">
                                <Activity size={16} /> Activity Logs
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] text-orange-700
                                         bg-orange-50 border border-orange-200 rounded-full">
                                <MapPin size={10} className="text-orange-600" />
                                <span>KTM</span>
                            </span>
                        </div>

                        {/* Filters Row */}
                        <div className="flex flex-col gap-2">
                            <Select
                                options={options}
                                placeholder="Filter type..."
                                classNames={{
                                    control: () => "!text-[11px] !min-h-[30px] !border-slate-200 !rounded-md !shadow-none",
                                    option: () => "text-[11px]"
                                }}
                            />
                            <input
                                type="date"
                                className="text-[11px] text-slate-600 border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto bg-white p-5">
                        <div className="relative border-l border-slate-200 ml-4 flex flex-col gap-8">

                            {/* ================= FILE ACTIVITY ================= */}
                            <div className="relative pl-7 group">

                                {/* Avatar (Timeline Node) */}
                                <div className="absolute -left-[18px] top-0 bg-white p-[2px]">
                                    <img
                                        src="https://ui-avatars.com/api/?name=User+One&background=f1f5f9&color=0f172a"
                                        alt="user"
                                        className="w-8 h-8 rounded-full border border-slate-200 shadow-sm"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-3">

                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">

                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-slate-800">
                                                    Project_Brief.pdf
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    Uploaded • 2 mins ago
                                                </span>
                                            </div>
                                        </div>

                                        {/* File Size */}
                                        <span className="text-xs text-slate-400">2.4 MB</span>
                                    </div>

                                    {/* Metadata Card */}
                                    <div className="flex items-center justify-between
                                                 bg-white px-2 py-1.5  rounded border border-white shadow">

                                        {/* Left Info */}
                                        <div className="flex flex-col text-xs text-slate-500">
                                            <span>
                                                Shared with{" "}
                                                <span className="font-medium text-slate-800">
                                                    Design Team
                                                </span>
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                Access: Read & Comment
                                            </span>
                                        </div>

                                        {/* Avatar Stack */}
                                        <div className="flex -space-x-2">
                                            <img
                                                className="w-6 h-6  cursor-pointer  rounded-full border-2 border-white"
                                                src="https://ui-avatars.com/api/?name=A&background=0ea5e9&color=fff"
                                            />
                                            <img
                                                className="w-6 cursor-pointer h-6 rounded-full border-2 border-white"
                                                src="https://ui-avatars.com/api/?name=B&background=6366f1&color=fff"
                                            />
                                            <div className="w-6 h-6 rounded-full border-2 cursor-pointer border-white bg-slate-200 flex items-center justify-center text-[10px] font-semibold text-slate-600">
                                                +2
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}