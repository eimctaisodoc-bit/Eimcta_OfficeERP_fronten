import React from "react";
import {
    MoreHorizontal,
    Upload,
    Star,
    FileText,
    FileBox,
    Image as ImageIcon,
    ChevronRight,
    Search,
    LayoutGrid,
    FolderOpen,
    Clock3,
    Trash2,
    Share2,
    FileSpreadsheet,
} from "lucide-react";
import SemiCircleChart from "./chart";

const robotoSlabStyle = {
    fontFamily: "'Roboto Slab', serif",
    fontWeight: 600,
};

const robotoSlabBold = {
    fontFamily: "'Roboto Slab', serif",
    fontWeight: 800,
};

const StorageCard = ({ imgSrc, title, fileCount, size, colorClass, progress }) => (
    <div
        className={`p-6 rounded-2xl border border-slate-100 flex flex-col gap-4 w-full transition-all cursor-pointer group bg-white hover:shadow-md ${colorClass.bgLight}`}
    >
        <div className="flex justify-between items-start">
            <div className="w-14 h-14 rounded-2xl bg-white p-3 shadow-sm border border-slate-50 flex items-center justify-center overflow-hidden">
                <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-full object-contain group-hover:rotate-6 transition-transform duration-300"
                    onError={(e) => {
                        e.target.src =
                            "https://cdn-icons-png.flaticon.com/512/234/234731.png";
                    }}
                />
            </div>

            <button className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition">
                <MoreHorizontal size={20} />
            </button>
        </div>

        <div>
            <h3
                style={robotoSlabStyle}
                className="text-slate-900 text-lg uppercase tracking-tight"
            >
                {title}
            </h3>

            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                <div
                    className={`h-full ${colorClass.bgProgress} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>

        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>{fileCount} Files</span>
            <span className="text-slate-900">{size || "Full"}</span>
        </div>
    </div>
);

const FileCard = ({ name, size, type, isStarred }) => {
    const getFileStyles = () => {
        switch (type) {
            case "doc":
                return {
                    icon: <FileText size={28} />,
                    color: "text-blue-500",
                    bg: "bg-blue-50",
                };
            case "pdf":
                return {
                    icon: <FileBox size={28} />,
                    color: "text-red-500",
                    bg: "bg-red-50",
                };
            case "image":
                return {
                    icon: <ImageIcon size={28} />,
                    color: "text-teal-500",
                    bg: "bg-teal-50",
                };
            default:
                return {
                    icon: <FileText size={28} />,
                    color: "text-slate-400",
                    bg: "bg-slate-50",
                };
        }
    };

    const styles = getFileStyles();

    return (
        <div className="bg-white border border-white
     p-5 rounded-2xl flex flex-col items-center gap-4 relative hover:border-amber-200 hover:shadow-lg
      hover:shadow-amber-50 transition-all duration-300 group">
            <button className="absolute top-4 right-4">
                <Star
                    size={18}
                    className={
                        isStarred
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-100 group-hover:text-slate-200"
                    }
                />
            </button>

            <div
                className={`w-16 h-16 rounded-2xl ${styles.bg} ${styles.color} flex items-center justify-center`}
            >
                {styles.icon}
            </div>

            <div className="text-center w-full px-2">
                <p
                    style={robotoSlabStyle}
                    className="text-slate-900 text-sm truncate"
                    title={name}
                >
                    {name}
                </p>
                <p className="text-slate-300 text-[10px] font-bold mt-1 uppercase tracking-widest">
                    {size}
                </p>
            </div>
        </div>
    );
};

const SummaryCard = ({ icon: Icon, title, value, bg, color }) => (
    <div className="group p-4 flex items-center
     gap-4 bg-white border-b border-slate-200/60 rounded  transition-all duration-300 cursor-default">
        {/* Icon Container with subtle ring */}
        <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ring-4 ring-white shadow-sm ${bg}`}>
            <Icon size={24} className={`${color} transition-transform group-hover:scale-110 duration-300`} />
        </div>

        <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-extrabold" style={robotoSlabStyle}>
                {title}
            </span>
            <h1 style={robotoSlabStyle} className="text-slate-950 text-md font-semibold leading-tight">
                {value}
            </h1>
        </div>
    </div>
);

export const Su_Folder_ = () => {
    const storageData = [
        {
            title: "Dropbox",
            imgSrc: "https://cdn-icons-png.flaticon.com/512/732/732201.png",
            fileCount: 200,
            size: "28GB",
            progress: 45,
            colorClass: { bgLight: "hover:bg-blue-50/30", bgProgress: "bg-blue-600" },
        },
        {
            title: "Google Drive",
            imgSrc: "https://cdn-icons-png.flaticon.com/512/2991/2991147.png",
            fileCount: 144,
            size: "54GB",
            progress: 72,
            colorClass: {
                bgLight: "hover:bg-yellow-50/30",
                bgProgress: "bg-yellow-500",
            },
        },
        {
            title: "OneDrive",
            imgSrc: "https://cdn-icons-png.flaticon.com/512/732/732224.png",
            fileCount: 89,
            size: "15GB",
            progress: 20,
            colorClass: { bgLight: "hover:bg-sky-50/30", bgProgress: "bg-sky-500" },
        },
        {
            title: "iCloud",
            imgSrc: "https://cdn-icons-png.flaticon.com/512/270/270830.png",
            fileCount: 412,
            size: "2TB",
            progress: 85,
            colorClass: {
                bgLight: "hover:bg-slate-50/30",
                bgProgress: "bg-slate-900",
            },
        },
    ];

    const quickFiles = [
        { name: "Monthly_Report.doc", size: "1.2 GB", type: "doc", isStarred: true },
        { name: "Tax_Return_2024.pdf", size: "450 KB", type: "pdf", isStarred: false },
        { name: "Vacation_Photo.jpg", size: "2.1 MB", type: "image", isStarred: false },
        { name: "Work_Specs.txt", size: "12 KB", type: "other", isStarred: false },
        { name: "Client_File.pdf", size: "820 KB", type: "pdf", isStarred: true },
        { name: "Design_Notes.doc", size: "320 KB", type: "doc", isStarred: false },
    ];

    const sidebarItems = [
        { name: "Recent", icon: Clock3, count: 18 },
        { name: "My Files", icon: FolderOpen, count: 120 },
        { name: "Shared", icon: Share2, count: 32 },
        { name: "Bin", icon: Trash2, count: 6 },
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="max-w-7xl mx-auto p-6 lg:p-10">
                {/* Top Header */}
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-sm">
                            <LayoutGrid size={22} />
                        </div>
                        <h1 style={robotoSlabBold} className="text-3xl lg:text-4xl tracking-tight">
                            MyCloud.
                        </h1>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search files, folders..."
                            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-4 focus:ring-amber-100 focus:border-amber-300 transition-all outline-none shadow-sm"
                        />
                    </div>
                </header>

                {/* Storage Cards */}
                <section className="mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {storageData.map((data, idx) => (
                            <StorageCard key={idx} {...data} />
                        ))}
                    </div>
                </section>

                {/* Bottom Content */}
                <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Sidebar / Summary */}
                    <aside className="xl:col-span-4 space-y-6">
                        <div className="bg-white border border-slate-100 rounded-3xl p-6">
                            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center gap-4 bg-slate-50/50">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-orange-500">
                                    <Upload size={24} />
                                </div>
                                <div>
                                    <p style={robotoSlabStyle} className="text-slate-900 text-lg">
                                        Upload Area
                                    </p>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Drag and drop files here
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-3xl p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h3 style={robotoSlabStyle} className="text-lg">
                                    Quick Menu
                                </h3>
                            </div>

                            <div className="flex flex-col gap-2">
                                {sidebarItems.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={item.name}
                                            className={`flex items-center justify-between p-4 rounded transition-all cursor-pointer ${idx === 0
                                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                                : "hover:bg-slate-50 text-slate-700"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon size={18} />
                                                <span
                                                    style={idx === 0 ? robotoSlabStyle : {}}
                                                    className="text-sm"
                                                >
                                                    {item.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-slate-400">
                                                    {item.count}
                                                </span>
                                                <ChevronRight size={15} className="text-slate-300" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 p-3 rounded shadow  sm:grid-cols-2 bg-white  xl:grid-cols-1 gap-4">


                            <div>
                                {/* Title + Icon */}
                                <div className="flex items-center justify-between mb-2">

                                    {/* Left: Icon + Title */}
                                    <div className="flex items-center gap-2">
                                        <FolderOpen className="text-amber-500" size={20} />
                                        <span className="text-slate-800 font-semibold">Storage</span>
                                    </div>

                                    {/* Right: Badge */}
                                    <div className="px-3 py-1 text-xs font-semibold rounded-full 
                  bg-amber-100 text-amber-600">
                                        75% Used
                                    </div>

                                </div>

                                <SemiCircleChart />
                            </div>

                            {/* Right Section */}
                            <div className="relative -top-[8rem]">

                                <SummaryCard
                                    icon={FolderOpen}
                                    title="Docx"
                                    value="64 Items"
                                    bg="bg-indigo-50"
                                    color="text-indigo-500"
                                />

                                <SummaryCard
                                    icon={FileBox}
                                    title="Video"
                                    value="04 Items"
                                    bg="bg-orange-50"
                                    color="text-orange-500"
                                />

                                <SummaryCard
                                    icon={FileSpreadsheet}
                                    title="Excel"
                                    value="25 Items"
                                    bg="bg-emerald-50"
                                    color="text-emerald-600"
                                />

                                <SummaryCard
                                    icon={FileText}
                                    title="PDF"
                                    value="60 Items"
                                    bg="bg-red-50"
                                    color="text-red-500"
                                />

                            </div>
                        </div>
                    </aside>

                    {/* Recent Files */}
                    <main className="xl:col-span-8">
                        <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                                <div>
                                    <h2 style={robotoSlabBold} className="text-2xl text-slate-900">
                                        Recent Documents
                                    </h2>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Last opened and updated files
                                    </p>
                                </div>

                                <button className="text-orange-500 font-bold text-xs uppercase tracking-widest hover:underline">
                                    See More
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {quickFiles.map((file, idx) => (
                                    <FileCard key={idx} {...file} />
                                ))}
                            </div>
                        </div>
                    </main>
                </section>
            </div>
        </div>
    );
};