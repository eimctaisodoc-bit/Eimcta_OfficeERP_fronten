import React, { useState, useMemo, useEffect } from "react";
import {
    FileText,
    Folder,
    Star,
    Search,
    Upload,
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

export const Folder_ = () => {
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
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [showStatistics, setShowStatistics] = useState(false);

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

    const fileTypeStats = useMemo(() => {
        const stats = {};
        sourceFiles.forEach((file) => {
            let normalizedType = file.type;
            // Normalize excel types
            if (file.type === "excel") {
                normalizedType = "xlsx";
            }
            stats[normalizedType] = (stats[normalizedType] || 0) + 1;
        });
        return stats;
    }, [sourceFiles]);

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



    const handleFileUpload = (event) => {
        const inputFiles = Array.from(event.target.files || []);
        if (!inputFiles.length) return;

        const newUploads = inputFiles.map((file, index) => ({
            id: Date.now() + index,
            name: file.name,
            type: file.name.split(".").pop().toLowerCase(),
            size: formatFileSize(file.size),
            modified: "Just now",
            owner: "You",
            starred: false,
            description: `Uploaded on ${new Date().toLocaleDateString()}`,
            source: "uploaded",
            progress: 0,
        }));

        setUploadedFiles((prev) => [...prev, ...newUploads]);

        // Simulate upload progress then add into My Files
        newUploads.forEach((upload) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadedFiles((prev) =>
                    prev.map((f) => (f.id === upload.id ? { ...f, progress } : f))
                );
                if (progress >= 100) {
                    clearInterval(interval);
                    // When finished, add to library (my files)
                    setMyFiles((prev) => [
                        { ...upload, progress: undefined },
                        ...prev,
                    ]);
                }
            }, 180);
        });
    };

    return (
        <div
            className="flex h-fit bg-white text-slate-900 overflow-hidden flex-col"
            style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
        >
            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 w-full">
                {/* Top Header */}
                <header className="border-b border-slate-100 bg-white sticky top-0 z-20">
                    <div className="p-3 sm:p-4 lg:px-8 flex flex-col gap-3 lg:gap-4">

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

                            {/* Right side: Action Cluster (Download, Share, Delete, Upload) */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">

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

                                {/* Primary Action */}
                                <button
                                    onClick={() => setIsUploadModalOpen(true)}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-black hover:bg-amber-600 transition-all shadow-md active:scale-95 whitespace-nowrap"
                                >
                                    <Upload size={18} />
                                    <span>Upload</span>
                                </button>

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

                {/* Browser Area */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10 w-full">
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
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                                <HardDrive size={16} className="text-amber-500" />
                                File Statistics
                            </h3>
                            <button
                                onClick={() => setShowStatistics(!showStatistics)}
                                className="px-3 py-1.5 text-xs font-black text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform ${showStatistics ? 'rotate-180' : ''}`}
                                />
                                {showStatistics ? "Hide" : "Show"} Stats
                            </button>
                        </div>
                        {showStatistics && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {Object.entries(fileTypeStats).map(([type, count]) => (
                                    <div
                                        key={type}
                                        className="flex flex-col items-center p-4 bg-white border border-slate-100 rounded-xl hover:scale-105 transition-transform duration-200 cursor-pointer"
                                    >
                                        <div className="mb-2">
                                            <FileIcon type={type} />
                                        </div>
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-wide mb-1">
                                            {type}
                                        </span>
                                        <span className="text-lg font-black text-slate-900">
                                            {count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Upload Progress Section */}
                    {uploadedFiles.length > 0 && (
                        <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                                <Upload size={16} className="text-amber-500" />
                                Uploads
                            </h3>
                            <div className="space-y-2">
                                {uploadedFiles.map((file) => (
                                    <div key={file.id} className="flex items-center gap-3">
                                        <FileIcon type={file.type} />
                                        <div className="flex-1">
                                            <div className="flex justify-between text-xs">
                                                <span className="font-semibold truncate pr-2">
                                                    {file.name}
                                                </span>
                                                <span className="text-slate-500 tabular-nums">
                                                    {file.progress}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                                                <div
                                                    className="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
                                                    style={{ width: `${file.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

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

                {/* Share Slider */}
                <ShareSlider
                    isOpen={isShareOpen}
                    onClose={() => setIsShareOpen(false)}
                    selectedFiles={selectedIds}
                />
                {/* <Circular_ /> */}
                {/* <Memo_/> */}
            </main>

            {/* Document Detail Modal */}
            {isModalOpen && selectedDoc && (
                <DocumentDetailModal
                    doc={selectedDoc}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <UploadModal
                    onClose={() => setIsUploadModalOpen(false)}
                    onUpload={handleFileUpload}
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
                <div className="overflow-auto   ">
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

                        <tbody className="divide-y divide-slate-100">
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
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
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

const UploadModal = ({ onClose, onUpload }) => {
    const [dragActive, setDragActive] = useState(false);

    const allowedExtensions = [
        "pdf",
        "doc",
        "docx",
        "ppt",
        "pptx",
        "xls",
        "xlsx",
        "txt",
        "png",
        "jpg",
        "jpeg",
        "gif",
        "bmp",
        "svg",
        "webp",
        "mp4",
        "mov",
        "avi",
        "mkv",
        "wmv",
        "flv",
        "webm",
        "mp3",
        "wav",
        "ogg",
        "aac",
        "m4a",
        "md",
        "csv",
        "fig",
    ];

    const validateFiles = (fileList) => {
        const files = Array.from(fileList || []);
        const invalid = [];

        files.forEach((file) => {
            const extension = file.name.split(".").pop()?.toLowerCase();
            if (!allowedExtensions.includes(extension)) invalid.push(file.name);
        });

        if (invalid.length) {
            alert(`Not allowed:\n${invalid.join("\n")}`);
            return false;
        }
        return true;
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            if (validateFiles(files)) {
                onUpload({ target: { files } });
            }
        }
    };

    const handleChange = (e) => {
        if (validateFiles(e.target.files)) onUpload(e);
        e.target.value = "";
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                <div className="bg-amber-500 p-6 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                        type="button"
                    >
                        <X size={18} />
                    </button>
                    <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                        <Upload size={20} />
                        Upload Files
                    </h2>
                    <p className="text-xs opacity-90 font-semibold mt-1">
                        Drag & drop or browse. Max size: 100MB.
                    </p>
                </div>

                <div className="p-6 sm:p-8">
                    <div
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragActive
                            ? "border-amber-500 bg-amber-50"
                            : "border-slate-200 hover:border-amber-400"
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <Upload size={40} className="mx-auto mb-4 text-slate-300" />
                        <p className="text-sm font-black text-slate-900 mb-2">
                            Drag & drop files here
                        </p>
                        <p className="text-xs text-slate-400 mb-4 font-semibold">
                            or click to browse from your computer
                        </p>

                        <input
                            type="file"
                            multiple
                            onChange={handleChange}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="inline-block px-6 py-2 bg-amber-500 text-white rounded-lg text-sm font-black hover:bg-amber-600 transition-colors cursor-pointer"
                        >
                            Browse Files
                        </label>
                    </div>

                    <div className="mt-4 text-[11px] text-slate-400 text-center font-semibold">
                        Allowed: pdf, doc/docx, xls/xlsx/csv, ppt/pptx, txt/md, images, audio,
                        video
                    </div>
                </div>
            </div>
        </div>
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

export default Folder_;