import React, { useState, useMemo, useEffect } from "react";
import {
    FileText,
    Folder,
    Star,
    Search,
    Grid,
    List,
    Share2,
    Download,
    HardDrive,
    FileCode,
    FileImage,
    ChevronRight,
    X,
    Info,
    FileVideo,
    Music,
    Table,
    Presentation,
    FileBox,
    Trash2Icon,
    Users,
    UserPlus,
    Link2,
    Mail,
    Check,
    Plus,
    Files,
    ChevronDown,
} from "lucide-react";
import { Circular_ } from "./circular";
import { Memo_ } from "./memo";
import DonutChart from "../../chart";
import { DriveStat, SemiDonut_ } from "./chart";
import DriveIcon from '../../../../public/driveicon.png'
import FilesIcon from '../../../../public/files.png'
import { S_Logs_ } from "./logs";
import { VideoPlayer } from "./video";
import { S_FileUpload_ } from "./uploads";

const INITIAL_FILES = [
    {
        id: 1,
        name: "Project_Proposal.pdf",
        type: "pdf",
        size: "2.4 MB",
        modified: "2 hours ago",
        owner: "Sarah J.",
        starred: true,
        description: "Official proposal for the 2024 expansion.",
        source: "uploaded",
    },
    {
        id: 2,
        name: "Meeting_Notes.docx",
        type: "word",
        size: "1.1 MB",
        modified: "1 hour ago",
        owner: "James L.",
        starred: false,
        description: "Detailed notes from the stakeholder meeting.",
        source: "uploaded",
    },
    {
        id: 3,
        name: "Budget_2024.xlsx",
        type: "xlsx",
        size: "4.2 MB",
        modified: "3 hours ago",
        owner: "Finance",
        starred: true,
        description: "Full budget breakdown for all departments.",
        source: "shared",
    },
    {
        id: 4,
        name: "Readme.txt",
        type: "txt",
        size: "12 KB",
        modified: "Yesterday",
        owner: "Dev Team",
        starred: false,
        description: "Plain text instructions for system setup.",
        source: "uploaded",
    },
    {
        id: 5,
        name: "Investors_Pitch.pptx",
        type: "ppt",
        size: "18.5 MB",
        modified: "Feb 22, 2024",
        owner: "Marketing",
        starred: true,
        description: "Visual presentation for the upcoming funding round.",
        source: "shared",
    },
    {
        id: 6,
        name: "Hero_Section_v1.png",
        type: "image",
        size: "2.1 MB",
        modified: "Feb 18, 2024",
        owner: "Design",
        starred: false,
        description: "Homepage hero image mockup.",
        source: "uploaded",
    },
    {
        id: 7,
        name: "UI_Feedback_Recording.mp4",
        type: "video",
        size: "45.0 MB",
        modified: "Feb 15, 2024",
        owner: "UX Research",
        starred: false,
        description: "Screen recording of user testing session.",
        source: "shared",
    },
    {
        id: 8,
        name: "Theme_Music_Demo.mp3",
        type: "audio",
        size: "8.4 MB",
        modified: "Feb 12, 2024",
        owner: "Audio Lab",
        starred: false,
        description: "Original brand theme audio file.",
        source: "uploaded",
    },
    {
        id: 9,
        name: "Product_Catalog.jpg",
        type: "image",
        size: "3.5 MB",
        modified: "Feb 10, 2024",
        owner: "Marketing",
        starred: false,
        description: "High-res JPEG of the seasonal catalog.",
        source: "shared",
    },
    {
        id: 10,
        name: "Raw_Logs.csv",
        type: "xlsx",
        size: "1.2 MB",
        modified: "Feb 05, 2024",
        owner: "System",
        starred: false,
        description: "Raw exported CSV data logs.",
        source: "uploaded",
    },
    {
        id: 11,
        name: "Marketing_Plan_2024.pdf",
        type: "pdf",
        size: "3.2 MB",
        modified: "Mar 05, 2024",
        owner: "Marketing Team",
        starred: true,
        description: "Annual marketing strategy document",
        sharedBy: "Sophia M.",
        sharedDate: "Mar 06, 2024",
        source: "shared",
    },
    {
        id: 12,
        name: "Product_Roadmap.xlsx",
        type: "excel",
        size: "1.9 MB",
        modified: "Mar 12, 2024",
        owner: "Product Team",
        starred: false,
        description: "Quarterly roadmap planning",
        sharedBy: "Liam T.",
        sharedDate: "Mar 13, 2024",
        source: "shared",
    },
    {
        id: 13,
        name: "Client_Presentation.pptx",
        type: "presentation",
        size: "4.6 MB",
        modified: "Mar 18, 2024",
        owner: "Sales Team",
        starred: true,
        description: "Presentation for enterprise client",
        sharedBy: "Olivia R.",
        sharedDate: "Mar 19, 2024",
        source: "shared",
    },
    {
        id: 14,
        name: "Database_Schema.sql",
        type: "code",
        size: "0.5 MB",
        modified: "Mar 22, 2024",
        owner: "Backend Team",
        starred: false,
        description: "Updated database structure",
        sharedBy: "Noah D.",
        sharedDate: "Mar 23, 2024",
        source: "shared",
    },
    {
        id: 15,
        name: "Brand_Assets.zip",
        type: "archive",
        size: "25.7 MB",
        modified: "Mar 25, 2024",
        owner: "Design Team",
        starred: true,
        description: "Logos and branding materials",
        sharedBy: "Emma W.",
        sharedDate: "Mar 26, 2024",
        source: "shared",
    },
    {
        id: 16,
        name: "Onboarding_Guide.docx",
        type: "word",
        size: "2.1 MB",
        modified: "Mar 28, 2024",
        owner: "HR Team",
        starred: false,
        description: "Employee onboarding process guide",
        sharedBy: "Daniel P.",
        sharedDate: "Mar 29, 2024",
        source: "shared",
    }
];

const SHARED_WITH_ME = [
    {
        id: 101,
        name: "Q1_Report.pdf",
        type: "pdf",
        size: "3.1 MB",
        modified: "Jan 15, 2024",
        owner: "Michael C.",
        starred: false,
        description: "Quarterly financial report",
        sharedBy: "Finance Team",
        sharedDate: "Jan 16, 2024",
        source: "shared",
    },
    {
        id: 102,
        name: "Design_Guidelines.fig",
        type: "image",
        size: "12.4 MB",
        modified: "Feb 01, 2024",
        owner: "Design Team",
        starred: true,
        description: "Figma design system",
        sharedBy: "Emma W.",
        sharedDate: "Feb 02, 2024",
        source: "shared",
    },
    {
        id: 103,
        name: "API_Docs.md",
        type: "txt",
        size: "0.8 MB",
        modified: "Feb 20, 2024",
        owner: "Dev Team",
        starred: false,
        description: "API documentation",
        sharedBy: "Alex K.",
        sharedDate: "Feb 21, 2024",
        source: "shared",
    },
    {
        id: 104,
        name: "Marketing_Plan_2024.pdf",
        type: "pdf",
        size: "3.2 MB",
        modified: "Mar 05, 2024",
        owner: "Marketing Team",
        starred: true,
        description: "Annual marketing strategy document",
        sharedBy: "Sophia M.",
        sharedDate: "Mar 06, 2024",
        source: "shared",
    },
    {
        id: 105,
        name: "Product_Roadmap.xlsx",
        type: "excel",
        size: "1.9 MB",
        modified: "Mar 12, 2024",
        owner: "Product Team",
        starred: false,
        description: "Quarterly roadmap planning",
        sharedBy: "Liam T.",
        sharedDate: "Mar 13, 2024",
        source: "shared",
    },
    {
        id: 106,
        name: "Client_Presentation.pptx",
        type: "presentation",
        size: "4.6 MB",
        modified: "Mar 18, 2024",
        owner: "Sales Team",
        starred: true,
        description: "Presentation for enterprise client",
        sharedBy: "Olivia R.",
        sharedDate: "Mar 19, 2024",
        source: "shared",
    },
    {
        id: 107,
        name: "Database_Schema.sql",
        type: "code",
        size: "0.5 MB",
        modified: "Mar 22, 2024",
        owner: "Backend Team",
        starred: false,
        description: "Updated database structure",
        sharedBy: "Noah D.",
        sharedDate: "Mar 23, 2024",
        source: "shared",
    },
    {
        id: 108,
        name: "Brand_Assets.zip",
        type: "archive",
        size: "25.7 MB",
        modified: "Mar 25, 2024",
        owner: "Design Team",
        starred: true,
        description: "Logos and branding materials",
        sharedBy: "Emma W.",
        sharedDate: "Mar 26, 2024",
        source: "shared",
    },
    {
        id: 109,
        name: "Onboarding_Guide.docx",
        type: "word",
        size: "2.1 MB",
        modified: "Mar 28, 2024",
        owner: "HR Team",
        starred: false,
        description: "Employee onboarding process guide",
        sharedBy: "Daniel P.",
        sharedDate: "Mar 29, 2024",
        source: "shared",
    }
];
const Sample_ME = [
    {
        id: 201,
        name: "Investor_Pitch_Deck.pptx",
        type: "presentation",
        size: "6.8 MB",
        modified: "Apr 02, 2024",
        owner: "Founders",
        starred: true,
        description: "Startup pitch for Series A funding",
        sharedBy: "CEO Office",
        sharedDate: "Apr 03, 2024",
        source: "shared",
    },
    {
        id: 202,
        name: "Server_Logs_Archive.zip",
        type: "archive",
        size: "48.2 MB",
        modified: "Apr 05, 2024",
        owner: "DevOps Team",
        starred: false,
        description: "Compressed logs for debugging production issues",
        sharedBy: "Infra Team",
        sharedDate: "Apr 06, 2024",
        source: "shared",
    },
    {
        id: 203,
        name: "UI_Icons_Pack.svg",
        type: "image",
        size: "2.3 MB",
        modified: "Apr 07, 2024",
        owner: "Design Team",
        starred: true,
        description: "Custom SVG icon library",
        sharedBy: "Figma Workspace",
        sharedDate: "Apr 07, 2024",
        source: "shared",
    },
    {
        id: 204,
        name: "Security_Audit_Report.pdf",
        type: "pdf",
        size: "5.4 MB",
        modified: "Apr 10, 2024",
        owner: "Security Team",
        starred: false,
        description: "Detailed vulnerability assessment report",
        sharedBy: "External Auditor",
        sharedDate: "Apr 11, 2024",
        source: "shared",
    },
    {
        id: 205,
        name: "Employee_Salary_Data.xlsx",
        type: "excel",
        size: "1.2 MB",
        modified: "Apr 12, 2024",
        owner: "HR Dept",
        starred: false,
        description: "Confidential payroll data",
        sharedBy: "HR Manager",
        sharedDate: "Apr 12, 2024",
        source: "shared",
    },
    {
        id: 206,
        name: "Landing_Page_Code.html",
        type: "code",
        size: "0.3 MB",
        modified: "Apr 14, 2024",
        owner: "Frontend Team",
        starred: true,
        description: "Initial landing page structure",
        sharedBy: "UI Team",
        sharedDate: "Apr 14, 2024",
        source: "shared",
    },
    {
        id: 207,
        name: "Product_Demo_Video.mp4",
        type: "video",
        size: "72.5 MB",
        modified: "Apr 16, 2024",
        owner: "Marketing Team",
        starred: true,
        description: "Demo video for new product launch",
        sharedBy: "Content Team",
        sharedDate: "Apr 17, 2024",
        source: "shared",
    },
    {
        id: 208,
        name: "Bug_Tracking_List.csv",
        type: "excel",
        size: "0.6 MB",
        modified: "Apr 18, 2024",
        owner: "QA Team",
        starred: false,
        description: "List of reported bugs and statuses",
        sharedBy: "QA Lead",
        sharedDate: "Apr 18, 2024",
        source: "shared",
    },
    {
        id: 209,
        name: "Meeting_Notes_Alpha.txt",
        type: "txt",
        size: "0.2 MB",
        modified: "Apr 19, 2024",
        owner: "Project Manager",
        starred: false,
        description: "Notes from alpha release meeting",
        sharedBy: "PM Office",
        sharedDate: "Apr 19, 2024",
        source: "shared",
    },
    {
        id: 210,
        name: "AI_Model_Weights.bin",
        type: "code",
        size: "120.7 MB",
        modified: "Apr 20, 2024",
        owner: "AI Team",
        starred: true,
        description: "Trained model weights for inference",
        sharedBy: "ML Pipeline",
        sharedDate: "Apr 21, 2024",
        source: "shared",
    }
];
const schoolVideos = [
    {
        title: "Greenwood Academy",
        description: "A look inside our new sustainable campus and the student-led organic gardening project.",
        views: "12k",
        uploadDate: "March 15, 2026",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        title: "Horizon Technical High",
        description: "Highlights from the 2026 Robotics Championship where our seniors took home the gold.",
        views: "45k",
        uploadDate: "Feb 10, 2026",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        title: "Sunrise Public School",
        description: "Annual sports day recap featuring track events, team spirit, and unforgettable moments.",
        views: "8.2k",
        uploadDate: "Jan 28, 2026",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        title: "Everest International Academy",
        description: "Student exchange program highlights with cultural performances and global friendships.",
        views: "22k",
        uploadDate: "March 2, 2026",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        title: "Riverdale High",
        description: "Behind the scenes of our drama club’s award-winning theater production.",
        views: "17k",
        uploadDate: "Feb 18, 2026",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        title: "Starlight Secondary School",
        description: "Science fair innovations where students showcased futuristic tech ideas.",
        views: "31k",
        uploadDate: "March 8, 2026",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        title: "Maple Leaf School",
        description: "A day in the life of students, from morning assembly to after-school clubs.",
        views: "9.5k",
        uploadDate: "Jan 12, 2026",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        title: "Silver Oak Academy",
        description: "Digital classroom transformation and how technology is reshaping learning.",
        views: "27k",
        uploadDate: "Feb 25, 2026",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
];

const FileIcon = ({ type }) => {
    switch (type) {
        case "pdf":
            return <FileText className="text-orange-600" />;
        case "word":
        case "docx":
            return <FileText className="text-blue-500" />;
        case "xlsx":
        case "excel":
            return <Table className="text-emerald-600" />;
        case "ppt":
        case "presentation":
            return <Presentation className="text-orange-500" />;
        case "txt":
            return <FileText className="text-slate-500" />;
        case "image":
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
            return <FileImage className="text-pink-500" />;
        case "video":
        case "mp4":
            return <FileVideo className="text-purple-500" />;
        case "audio":
        case "mp3":
            return <Music className="text-cyan-500" />;
        case "folder":
            return <Folder className="text-amber-500 fill-amber-500" />;
        case "code":
        case "sql":
            return <FileCode className="text-slate-700" />;
        case "archive":
        case "zip":
            return <FileBox className="text-slate-400" />;
        default:
            return <FileBox className="text-slate-400" />;
    }
};

const formatFileSize = (bytes) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const A_Folder_ = () => {
    const [myFiles, setMyFiles] = useState(INITIAL_FILES);
    const [sharedFiles, setSharedFiles] = useState(SHARED_WITH_ME);
    const [SampleFiles, setSampleFiles] = useState(Sample_ME);

    const [viewMode, setViewMode] = useState("list");
    const [selectedFileType, setSelectedFileType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);

    const [selectedIds, setSelectedIds] = useState([]);
    const [isShareOpen, setIsShareOpen] = useState(false);

    const [activeTab, setActiveTab] = useState("myfiles"); // 'myfiles' or 'shared'
    const [showMobileSearch, setShowMobileSearch] = useState(false);


    // Close mobile search when switching tab (nice UX)
    useEffect(() => {
        setShowMobileSearch(false);
    }, [activeTab]);

    const sourceFiles = useMemo(
        () => (activeTab === "myfiles" ? myFiles : activeTab === "shared" ? sharedFiles : SampleFiles),
        [activeTab, myFiles, sharedFiles]
    );

    const filteredFiles = useMemo(() => {
        return sourceFiles.filter((file) => {
            const matchesType =
                selectedFileType === "all" || file.type === selectedFileType;

            const matchesSearch = file.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            return matchesType && matchesSearch;
        });
    }, [sourceFiles, selectedFileType, searchQuery]);

    // const fileTypeStats = useMemo(() => {
    //     const stats = {};
    //     sourceFiles.forEach((file) => {
    //         let normalizedType = file.type;
    //         // Normalize excel types
    //         if (file.type === "excel") {
    //             normalizedType = "xlsx";
    //         }
    //         stats[normalizedType] = (stats[normalizedType] || 0) + 1;
    //     });
    //     return stats;
    // }, [sourceFiles]);

    const openDocDetails = (doc) => {
        setSelectedDoc(doc);
        setIsModalOpen(true);
    };

    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const clearSelection = () => setSelectedIds([]);

    const handleFilesShare = () => {
        if (selectedIds.length === 0) {
            alert("Please select files to share");
            return;
        }
        setIsShareOpen(true);
    };

    const handleFilesDownload = () => {
        if (selectedIds.length === 0) {
            alert("Please select files to download");
            return;
        }
        alert(`Download files with IDs: ${selectedIds.join(", ")}`);
    };

    const handleFilesDelete = () => {
        if (selectedIds.length === 0) return;

        const confirmDelete = window.confirm(
            `Delete ${selectedIds.length} selected file(s)?`
        );
        if (!confirmDelete) return;

        if (activeTab === "myfiles") {
            setMyFiles((prev) => prev.filter((f) => !selectedIds.includes(f.id)));
        } else if (activeTab === "shared") {
            setSharedFiles((prev) => prev.filter((f) => !selectedIds.includes(f.id)));
        }
        else {
            setSampleFiles((prev) => prev.filter((f) => !selectedIds.includes(f.id)));

        }
        clearSelection();
    };

    return (
        <div
            className="flex h-fit bg-white text-slate-900 overflow-hidden flex-col"
            style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
        >
            {/* Main Content */}
            <header className="border-b border-slate-100 bg-white sticky top-0 z-20">
                <div className=" flex flex-col gap-3 lg:gap-4">

                    {/* Top Section: Logo, Tabs, and Action Row */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        {/* Left side: Logo & Tab Switcher */}
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 bg-amber-500 rounded-lg flex-shrink-0 flex items-center justify-center
                                 text-white font-black text-xl shadow-sm">
                                D
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1
                                     bg-slate-50 p-1 rounded-xl border border-slate-100 overflow-x-auto no-scrollbar">
                                    <button
                                        onClick={() => setActiveTab("myfiles")}
                                        className={`px-4 py-2 flex items-center gap-2
                                                 rounded-lg text-xs cursor-pointer font-black  shrink-0 ${activeTab === "myfiles"
                                                ? "bg-white shadow-sm text-amber-600 border border-slate-100"
                                                : "text-slate-500 hover:text-slate-900"
                                            }`}
                                    >
                                        <Files size={14} />
                                        <span className="inline-block">  My Files</span>

                                    </button>

                                    <button
                                        onClick={() => setActiveTab("shared")}
                                        className={`px-4 py-2 rounded-lg cursor-pointer text-xs font-black  flex items-center gap-2 shrink-0 ${activeTab === "shared"
                                            ? "bg-white shadow-sm text-amber-600 border border-slate-100"
                                            : "text-slate-500 hover:text-slate-900"
                                            }`}
                                    >
                                        <Users size={14} />
                                        <span className="inline-block">Shared</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("sample")}
                                        className={`px-4 py-2 rounded-lg cursor-pointer text-xs font-black  flex items-center gap-2 shrink-0 ${activeTab === "sample"
                                            ? "bg-white shadow-sm text-amber-600 border border-slate-100"
                                            : "text-slate-500 hover:text-slate-900"
                                            }`}
                                    >
                                        <Files size={14} />
                                        <span className="inline-block">Sample</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right side: Action Cluster (Download, Share, Delete) */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 
                        md:pb-0 no-scrollbar">

                            {/* Selection Actions Group */}
                            <div className="flex items-center gap-1.5 pr-2 border-r border-slate-200">
                                <button
                                    onClick={handleFilesDownload}
                                    className="p-2.5 cursor-pointer bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-2 shrink-0"
                                    title="Download Selected"
                                >
                                    <Plus size={18} />
                                    <span className="text-xs font-bold sm:hidden lg:inline">Memo</span>
                                </button>

                                <button
                                    onClick={handleFilesDownload}
                                    className="p-2.5 cursor-pointer bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors flex items-center gap-2 shrink-0"
                                    title="Download Selected"
                                >
                                    <Plus size={18} />
                                    <span className="text-xs font-bold sm:hidden lg:inline">Circular</span>
                                </button>
                                <button
                                    onClick={handleFilesDownload}
                                    className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-2 shrink-0"
                                    title="Download Selected"
                                >
                                    <Download size={18} />
                                    <span className="text-xs font-bold sm:hidden lg:inline">{selectedIds.length || 0}</span>
                                </button>

                                <button
                                    onClick={handleFilesShare}
                                    className="p-2.5 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors flex items-center gap-2 shrink-0"
                                    title="Share Selected"
                                >
                                    <Share2 size={18} />
                                    <span className="text-xs font-bold sm:hidden lg:inline">{selectedIds.length || 0}</span>
                                </button>

                                <button
                                    onClick={handleFilesDelete}
                                    className="p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors shrink-0"
                                    title="Delete Selected"
                                >
                                    <Trash2Icon size={18} />
                                </button>
                            </div>



                            {/* View Switcher (Hidden on smallest mobile, shown from sm up) */}
                            <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-100/50 rounded-lg ml-1 shrink-0">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-white shadow-sm text-amber-600" : "text-slate-400"}`}
                                >
                                    <Grid size={16} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-white shadow-sm text-amber-600" : "text-slate-400"}`}
                                >
                                    <List size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Search Row */}
                    <div className="relative group">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors"
                            size={18}
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search documents..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 text-sm outline-none transition-all font-medium"
                        />

                        {/* Mobile-only view toggle inside search bar */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 sm:hidden flex items-center">
                            <button
                                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                                className="p-2 text-slate-400 bg-white/50 rounded-lg border border-slate-100"
                            >
                                {viewMode === "grid" ? <List size={18} /> : <Grid size={18} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1 flex-col min-w-0 w-full">
                {/* Top Header */}
                {/* Browser Area */}
                <div className="flex-1 overflow-y-auto py-4 w-full">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight italic uppercase">
                                {activeTab === "myfiles" ? "My Files" : "Shared with Me"}
                                <span className="text-orange-500">.</span>
                            </h1>
                            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black text-slate-400 mt-2 uppercase tracking-widest">
                                <HardDrive size={12} />
                                <span>Storage</span>
                                <ChevronRight size={12} />
                                <span className="text-slate-900">
                                    {activeTab === "myfiles" ? "My Library" : "Shared"}
                                </span>
                                <span className="text-slate-900">
                                    {activeTab === "sample" ? "Sample" : "Files"}
                                </span>
                            </div>
                        </div>

                        <div className="w-full md:w-auto">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    Filter:
                                </span>
                                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 max-w-full">
                                    {[
                                        "all",
                                        "pdf",
                                        "word",
                                        "xlsx",
                                        "ppt",
                                        "txt",
                                        "image",
                                        "video",
                                        "audio",
                                    ].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setSelectedFileType(type)}
                                            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide transition-all border whitespace-nowrap ${selectedFileType === type
                                                ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                                                : "bg-white text-slate-500 border-slate-200 hover:border-amber-400"
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* File Type Statistics */}



                    <div className=" flex flex-col justify-between w-full  gap-4 ">


                        <div className="flex justify-between w-full h-[85vh] gap-6">


                            {/* Left - Sticky Charts */}
                            <div className="w-[240px] flex flex-col gap-4">
                                <div className="sticky top-1 flex flex-col gap-4">
<div>
    <S_FileUpload_/>
</div>
                                    <div className="bg-white rounded-sm border border-gray-200 p-4 flex flex-col gap-4 ">
                                        {/* Header */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100">
                                                <img src={DriveIcon} alt="Drive Icon" className="w-6 h-6 object-contain" />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-800 tracking-tight">
                                                Drive Storage
                                            </span>
                                        </div>

                                        {/* Divider */}
                                        <div className="w-full h-px bg-gray-200" />

                                        {/* Chart */}
                                        <div className="flex justify-center items-center">
                                            <DriveStat />
                                        </div>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="bg-white rounded-sm border border-gray-200 p-4 flex flex-col gap-4 ">
                                        {/* Header */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50">
                                                <Files size={20} className="text-amber-500" />
                                                {/* <img src={DriveIcon} alt="Drive Icon" className="w-6 h-6 object-contain" /> */}
                                            </div>
                                            <span className="text-sm font-semibold text-gray-800 tracking-tight">
                                                Files Information
                                            </span>
                                        </div>

                                        {/* Divider */}
                                        <div className="w-full h-px bg-gray-200" />

                                        {/* Chart */}
                                        <div className="flex justify-center items-center">
                                            <SemiDonut_ />
                                        </div>
                                    </div>
                                    <div className="bg-white ">
                                        <S_Logs_ />

                                    </div>
                                </div>
                            </div>

                            {/* Right - Scrollable Content */}
                            <div className=" flex    flex-col ">
                                <div className="flex-1  pr-1">
                                    <FileDisplay
                                        viewMode={viewMode}
                                        filteredFiles={filteredFiles}
                                        selectedDoc={selectedDoc}
                                        selectedIds={selectedIds}
                                        isModalOpen={isModalOpen}
                                        onFileClick={openDocDetails}
                                        onToggleSelect={toggleSelect}
                                        activeTab={activeTab}
                                    />
                                </div>
                                <div className="grid py-3  grid-cols-2 gap-4">
                                    {schoolVideos?.map((video, index) => (
                                        <VideoPlayer
                                            key={index}
                                            title={video.title}
                                            description={video.description}
                                            uploadDate={video.uploadDate}
                                            videoUrl={video.videoUrl}
                                        />
                                    ))}
                                </div>
                                <div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Share Slider */}
                {/* <Circular_ /> */}
                {/* <Memo_/> */}
            </main>
            <ShareSlider
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                selectedFiles={selectedIds}
            />

            {/* Document Detail Modal */}
            {isModalOpen && selectedDoc && (
                <DocumentDetailModal
                    doc={selectedDoc}
                    onClose={() => setIsModalOpen(false)}
                />
            )}


        </div>
    );
};

const FileDisplay = ({
    viewMode,
    filteredFiles,
    selectedDoc,
    selectedIds,
    isModalOpen,
    onFileClick,
    onToggleSelect,
    activeTab,
}) => {
    if (viewMode === "list") {
        return (
            <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-auto h-[85vh]   ">
                    <table className="min-w-[760px] w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="px-4 py-3 w-14 text-center">Sel.</th>
                                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.18em]">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] hidden sm:table-cell">
                                    {activeTab === "myfiles" ? "Contributor" : "Shared By"}
                                </th>
                                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] hidden md:table-cell">
                                    Activity
                                </th>
                                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] hidden lg:table-cell">
                                    Size
                                </th>
                                <th className="px-4 py-3 text-right w-16"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 ">
                            {filteredFiles.map((file) => (

                                <tr
                                    key={file.id}
                                    className={`hover:bg-amber-50/20 transition-all group ${selectedDoc?.id === file.id && isModalOpen
                                        ? "bg-amber-50/40"
                                        : ""
                                        }`}
                                >
                                    <td className="px-4 py-4 text-center">
                                        <label className="inline-flex items-center justify-center relative">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(file.id)}
                                                onChange={() => onToggleSelect(file.id)}
                                                className="peer appearance-none w-5 h-5 rounded 
                                                border-2 transition-all cursor-pointer bg-white
                                                 border-amber-400 hover:border-amber-500
                                                  checked:bg-amber-500 checked:border-amber-500 focus:outline-none 
                                                  focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
                                            />
                                            <Check
                                                size={14}
                                                className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                                            />
                                        </label>
                                    </td>

                                    <td
                                        className="px-4 py-4 cursor-pointer"
                                        onClick={() => onFileClick(file)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileIcon type={file.type} />
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-black text-slate-900 truncate">
                                                    {file.name}
                                                </span>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    {file.starred && (
                                                        <Star
                                                            size={12}
                                                            className="fill-amber-500 text-amber-500 shrink-0"
                                                        />
                                                    )}
                                                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-tight">
                                                        {file.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-slate-700 font-semibold hidden sm:table-cell">
                                        {activeTab === "myfiles"
                                            ? file.owner
                                            : file.sharedBy || file.owner}
                                    </td>

                                    <td className="px-6 py-4 text-slate-500 italic hidden md:table-cell">
                                        {file.modified}
                                    </td>

                                    <td className="px-6 py-4 text-slate-500 font-mono hidden lg:table-cell">
                                        {file.size}
                                    </td>

                                    <td className="px-4 py-4 text-right">
                                        <button
                                            className="inline-flex items-center justify-center w-10 h-10 bg-purple-50 rounded-full hover:bg-purple-100 transition"
                                            onClick={() => alert(`Download: ${file.name}`)}
                                            title="Download"
                                            type="button"
                                        >
                                            <Download size={16} className="text-slate-500" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredFiles.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="py-16 text-center text-slate-400 font-black italic"
                                    >
                                        No matching documents found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-4 py-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold flex items-center justify-between">
                    <span>
                        Showing <span className="text-slate-900">{filteredFiles.length}</span>{" "}
                        item(s)
                    </span>
                    <span>
                        Selected{" "}
                        <span className="text-slate-900">{selectedIds.length}</span>
                    </span>
                </div>
            </div>
        );
    }

    // Grid view
    return (
        <div className='overflow-auto h-[85vh] '>

            <div className="grid grid-cols-3 
         gap-3 sm:gap-6">

                {filteredFiles.map((file) => (
                    <div
                        key={file.id}
                        className={`bg-white p-4 sm:p-6 rounded-xl border transition-all group relative ${selectedDoc?.id === file.id && isModalOpen
                            ? "border-amber-400 shadow-md bg-amber-50/10"
                            : "border-slate-100 shadow-sm hover:border-amber-400"
                            }`}
                    >
                        <div className="absolute top-3 left-3">
                            <label className="inline-flex items-center justify-center relative">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(file.id)}
                                    onChange={() => onToggleSelect(file.id)}
                                    className="peer appearance-none w-5 h-5 rounded border-2 transition-all cursor-pointer bg-white border-amber-400 hover:border-amber-500 checked:bg-amber-500 checked:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
                                />
                                <Check
                                    size={14}
                                    className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                                />
                            </label>
                        </div>

                        <div onClick={() => onFileClick(file)} className="cursor-pointer">
                            <div className="flex justify-between items-start mb-4 pt-2">
                                <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-amber-50 transition-colors ml-6">
                                    <FileIcon type={file.type} />
                                </div>
                                {file.starred && (
                                    <Star
                                        size={16}
                                        className="fill-amber-500 text-amber-500 opacity-90"
                                    />
                                )}
                            </div>

                            <h3 className="font-black text-slate-900 text-sm mb-1 truncate leading-tight ml-6">
                                {file.name}
                            </h3>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider ml-6">
                                {activeTab === "myfiles"
                                    ? file.owner
                                    : file.sharedBy || file.owner}
                            </p>

                            <div className="mt-5 pt-4 border-t border-slate-50 flex justify-between ml-6">
                                <span className="text-[10px] font-black text-slate-400 uppercase">
                                    {file.size}
                                </span>
                                <span className="text-[10px] font-black text-orange-500 uppercase">
                                    {file.modified}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredFiles.length === 0 && (
                    <div className="col-span-full py-16 text-center text-slate-400 font-black italic">
                        No matching documents found.
                    </div>
                )}
            </div>
        </div>
    );
};

const ShareSlider = ({ isOpen, onClose, selectedFiles }) => {
    const [shareEmail, setShareEmail] = useState("");
    const [permission, setPermission] = useState("view");

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 transform transition-transform duration-300 shadow-xl ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="h-full flex flex-col">
                    <div className="p-5 sm:p-6 border-b border-slate-100">
                        <div className="flex items-center justify-between">
                            <h2 className="font-black text-lg uppercase tracking-tight flex items-center gap-2">
                                <Share2 size={18} className="text-amber-500" />
                                Share Files
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                type="button"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 font-semibold">
                            Sharing <span className="text-slate-900">{selectedFiles.length}</span>{" "}
                            file(s)
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 sm:p-6">
                        <div className="space-y-6">
                            {/* Share with people */}
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">
                                    Share with people
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        value={shareEmail}
                                        onChange={(e) => setShareEmail(e.target.value)}
                                        placeholder="Enter email address"
                                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold"
                                    />
                                    <button
                                        className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-black hover:bg-amber-600 transition-colors"
                                        onClick={() => alert(`Add: ${shareEmail || "(empty)"}`)}
                                        type="button"
                                    >
                                        <UserPlus size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Permission level */}
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">
                                    Permission
                                </label>
                                <select
                                    value={permission}
                                    onChange={(e) => setPermission(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold"
                                >
                                    <option value="view">Can view</option>
                                    <option value="edit">Can edit</option>
                                    <option value="comment">Can comment</option>
                                </select>
                            </div>

                            {/* Share link */}
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">
                                    Share link
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value="https://dochub.com/share/abc123"
                                        readOnly
                                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold"
                                    />
                                    <button
                                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-black hover:bg-slate-200 transition-colors"
                                        onClick={() => navigator.clipboard?.writeText("https://dochub.com/share/abc123")}
                                        type="button"
                                        title="Copy link"
                                    >
                                        <Link2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Shared with list */}
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">
                                    Already shared with
                                </label>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                                                <Mail size={14} className="text-purple-600" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-black truncate">
                                                    sarah.j@company.com
                                                </p>
                                                <p className="text-xs text-slate-400 font-semibold">
                                                    Can edit
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            className="text-slate-400 hover:text-red-500 p-1"
                                            onClick={() => alert("Remove access")}
                                            type="button"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:p-6 border-t border-slate-100">
                        <button
                            className="w-full py-3 bg-amber-500 text-white rounded-lg font-black hover:bg-amber-600 transition-colors"
                            onClick={() => alert(`Invitations sent (${permission})`)}
                            type="button"
                        >
                            Send Invitations
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const DocumentDetailModal = ({ doc, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom sm:zoom-in duration-200 max-h-[90dvh] flex flex-col">
                <div className="bg-amber-500 p-4 sm:p-6 text-white relative flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                        aria-label="Close"
                        type="button"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-md flex-shrink-0">
                            <FileIcon type={doc.type} />
                        </div>

                        <div className="min-w-0">
                            <h2 className="text-base sm:text-xl font-black uppercase tracking-tight leading-tight truncate">
                                {doc.name}
                            </h2>
                            <p className="text-[10px] font-black opacity-80 uppercase tracking-widest mt-1">
                                ID: DOC-00{doc.id}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-8 space-y-5 overflow-y-auto flex-1">
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                {doc.sharedBy ? "Shared By" : "Contributor"}
                            </p>
                            <p className="text-sm font-black text-slate-900 truncate">
                                {doc.sharedBy || doc.owner}
                            </p>
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                Activity
                            </p>
                            <p className="text-sm font-black text-slate-900 truncate">
                                {doc.modified}
                            </p>
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                Size
                            </p>
                            <p className="text-sm font-black text-slate-900 font-mono">
                                {doc.size}
                            </p>
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                Format
                            </p>
                            <p className="text-sm font-black text-orange-600 uppercase">
                                {doc.type}
                            </p>
                        </div>
                    </div>

                    {doc.sharedDate && (
                        <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                Shared On
                            </p>
                            <p className="text-sm font-black text-slate-900 truncate">
                                {doc.sharedDate}
                            </p>
                        </div>
                    )}

                    <div className="pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 mb-2 text-amber-600">
                            <Info size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                Description
                            </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed italic font-semibold">
                            “{doc.description}”
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                        <button
                            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl text-sm font-black shadow-md shadow-amber-100 transition-all flex items-center justify-center gap-2"
                            onClick={() => alert(`Download: ${doc.name}`)}
                            type="button"
                        >
                            <Download size={16} />
                            <span>Download</span>
                        </button>
                        <button
                            className="flex-1 bg-white border border-slate-200 text-slate-900 py-3 rounded-xl text-sm font-black hover:bg-slate-50 transition-all"
                            onClick={() => alert("Edit action")}
                            type="button"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

