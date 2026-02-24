import React, { useCallback, useEffect, useMemo, useState } from "react";
import Select from 'react-select';
import {
    Eye,
    Edit2,
    Trash2,
    Filter,
    Search,
    Calendar,
    Users,
    CheckCircle,
    XCircle,
    MoreVertical,
    Download,
    Printer,
    PlusCircle,
    User,
    Mail,
    Phone,
    Building,
    Briefcase,
    FileText,
    Share2,
    Clock,
    MapPin,
    Award,
    TrendingUp,
    Check,
    ShieldOff,
    X,
    CalendarDays,
    BriefcaseBusiness,
    ShieldCheck,
    IdCard,
    Building2,
    Globe
} from "lucide-react";
import RecruitmentForm from "./emp-mgt_client";

/* =======================
   STATUS OPTIONS
======================= */
const statusOptions = [
    { value: "All", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" }
];

/* =======================
   EMPLOYMENT TYPE OPTIONS
======================= */
const employmentTypeOptions = [
    { value: "All", label: "All Types" },
    { value: "Permanent", label: "Permanent" },
    { value: "Contract", label: "Contract" },
    { value: "Intern", label: "Intern" }
];

/* =======================
   EXPORT FORMAT OPTIONS
======================= */

/* =======================
   HELPERS
======================= */
const formatDate = value =>
    value
        ? new Date(value).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        })
        : "-";

/* =======================
   AVATAR COMPONENT
======================= */
const AvatarWithHover = ({ firstName, lastName, employeeId, department, designation,onClick }) => {
    const getInitials = (first, last) => {
        return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
    };

    const getAvatarColor = (first, last) => {
        const colors = [
            "from-blue-500 to-blue-600",
            "from-emerald-500 to-emerald-600",
            "from-violet-500 to-violet-600",
            "from-amber-500 to-amber-600",
            "from-rose-500 to-rose-600",
            "from-indigo-500 to-indigo-600",
            "from-cyan-500 to-cyan-600",
            "from-fuchsia-500 to-fuchsia-600"
        ];
        const hash = (first.charCodeAt(0) + last.charCodeAt(0)) % colors.length;
        return colors[hash];
    };

    const avatarColor = getAvatarColor(firstName, lastName);
    const initials = getInitials(firstName, lastName);

    return (
        <div className="group relative cursor-pointer "   onClick={onClick}>
            <div className={`
        w-10 h-10 rounded-full 
        bg-gradient-to-br ${avatarColor}
        flex items-center justify-center 
        text-white font-bold text-sm
        shadow-lg shadow-${avatarColor.split('-')[1]}-500/20
        group-hover:scale-110 transition-transform duration-300
        ring-2 ring-white
      `}>
                {initials}
            </div>

        </div>
    );
};

/* =======================
   STATUS BADGE
======================= */
const StatusBadge = ({ status }) => {
    const map = {
        Active: ["bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200", "text-emerald-800", <CheckCircle size={14} />],
        Inactive: ["bg-gradient-to-r from-rose-50 to-rose-100 border-rose-200", "text-rose-800", <XCircle size={14} />],
        "On Hold": ["bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200", "text-amber-800", <CheckCircle size={14} />]
    };
    const [bg, text, icon] = map[status] || [
        "bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200",
        "text-slate-800",
        <CheckCircle size={14} />
    ];

    return (
      
        <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border shadow-sm shadow-slate-200/50 ${bg} ${text}`}
            style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
            >
            {icon}
            {status}
        </span>
            // </div>
    );
};

/* =======================
   EMPLOYMENT TYPE BADGE
======================= */
const EmploymentTypeBadge = ({ type }) => {
    const map = {
        Permanent: "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200 shadow-sm shadow-blue-200/50",
        Contract: "bg-gradient-to-r from-violet-50 to-violet-100 text-violet-800 border-violet-200 shadow-sm shadow-violet-200/50",
        Intern: "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border-amber-200 shadow-sm shadow-amber-200/50"
    };
    const className = map[type] || "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-800 border-slate-200 shadow-sm shadow-slate-200/50";

    return (
        <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${className}`}
            style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
        >
            {type}
        </span>
    );
};

/* =======================
   ACTION BUTTONS
======================= */
const ActionButtons = ({ row, onActionClick }) => {
    return (
        <div className="flex items-center gap-1.5">
            <div className="relative group inline-block">

                <button className="p-2 cursor-pointer bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg 
                     hover:from-slate-100 hover:to-white transition-all duration-300 
                     hover:shadow-sm shadow-slate-200/50">
                    <ShieldOff size={16} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
                </button>

                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-10 
                  flex flex-col items-center
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300
                  pointer-events-none">

                    {/* Tooltip Text */}
                    <div className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
                        User is disabled 
                    </div>

                    {/* Middle Arrow */}
                    <div className="w-2.5 h-2.5 bg-slate-800 rotate-45 -mt-1.5"></div>

                </div>

            </div>

            <button className="p-2 cursor-pointer bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg hover:bg-gradient-to-r hover:from-rose-50 hover:to-white transition-all duration-300 hover:shadow-sm shadow-rose-200/50 group">
                <Trash2 size={16} className="text-rose-600 group-hover:text-rose-700 transition-colors" />
            </button>

        </div>
    );
};

/* =======================
   CHECKBOX COLUMN
======================= */
const CustomCheckbox = ({ checked, onChange, id }) => (
    <div className="relative">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            id={`checkbox-${id}`}
            className="absolute opacity-0 w-0 h-0"
        />
        <label
            htmlFor={`checkbox-${id}`}
            className={`
        w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all duration-200
        ${checked
                    ? 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-500 shadow-sm '
                    : 'bg-white border-slate-300 '
                }
      `}
        >
            {checked && (
                <Check size={12} className="text-white" />
            )}
        </label>
    </div>
);



/* =======================
   SAMPLE DATA WITH END DATES
======================= */
const recruitmentData = [
    {
        employeeId: "EMP-101",
        firstName: "John",
        lastName: "Smith",
        officeEmail: "john.smith@company.com",
        officeMobile: "+1 (555) 123-4567",
        department: "Engineering",
        designation: "Senior Developer",
        employmentType: "Permanent",
        employeeStatus: "Active",
        dateOfJoining: "2023-03-15",
        contractEndDate: "2026-03-15"
    },
    {
        employeeId: "EMP-102",
        firstName: "Sarah",
        lastName: "Johnson",
        officeEmail: "sarah.j@company.com",
        officeMobile: "+1 (555) 987-6543",
        department: "Marketing",
        designation: "Marketing Manager",
        employmentType: "Permanent",
        employeeStatus: "Active",
        dateOfJoining: "2022-08-22",
        contractEndDate: "2025-08-22"
    },
    {
        employeeId: "EMP-103",
        firstName: "Michael",
        lastName: "Chen",
        officeEmail: "michael.chen@company.com",
        officeMobile: "+1 (555) 456-7890",
        department: "Finance",
        designation: "Financial Analyst",
        employmentType: "Contract",
        employeeStatus: "Active",
        dateOfJoining: "2024-01-10",
        contractEndDate: "2025-01-10"
    },
    {
        employeeId: "EMP-104",
        firstName: "Emma",
        lastName: "Wilson",
        officeEmail: "emma.w@company.com",
        officeMobile: "+1 (555) 234-5678",
        department: "HR",
        designation: "HR Specialist",
        employmentType: "Permanent",
        employeeStatus: "Inactive",
        dateOfJoining: "2021-11-05",
        contractEndDate: "2024-11-05"
    },
    {
        employeeId: "EMP-105",
        firstName: "David",
        lastName: "Brown",
        officeEmail: "david.b@company.com",
        officeMobile: "+1 (555) 876-5432",
        department: "Sales",
        designation: "Sales Executive",
        employmentType: "Permanent",
        employeeStatus: "Active",
        dateOfJoining: "2023-07-18",
        contractEndDate: "2026-07-18"
    },
    {
        employeeId: "EMP-106",
        firstName: "Lisa",
        lastName: "Anderson",
        officeEmail: "lisa.a@company.com",
        officeMobile: "+1 (555) 345-6789",
        department: "Engineering",
        designation: "Junior Developer",
        employmentType: "Intern",
        employeeStatus: "Active",
        dateOfJoining: "2024-06-01",
        contractEndDate: "2024-12-01"
    },
    {
        employeeId: "EMP-107",
        firstName: "Robert",
        lastName: "Taylor",
        officeEmail: "robert.t@company.com",
        officeMobile: "+1 (555) 765-4321",
        department: "Operations",
        designation: "Operations Manager",
        employmentType: "Permanent",
        employeeStatus: "Active",
        dateOfJoining: "2020-09-12",
        contractEndDate: "2025-09-12"
    },
    {
        employeeId: "EMP-108",
        firstName: "Maria",
        lastName: "Garcia",
        officeEmail: "maria.g@company.com",
        officeMobile: "+1 (555) 654-3210",
        department: "Customer Support",
        designation: "Support Lead",
        employmentType: "Contract",
        employeeStatus: "Inactive",
        dateOfJoining: "2022-04-30",
        contractEndDate: "2024-04-30"
    }
];


/* =======================
   CUSTOM STYLES FOR REACT-SELECT
======================= */
const customSelectStyles = {
    control: (base, state) => ({
        ...base,
        minHeight: "48px",
        border: state.isFocused ? "2px solid #f59e0b" : "1px solid #e2e8f0",
        borderRadius: "12px",
        backgroundColor: "white",
        zIndex: 9999,
        boxShadow: state.isFocused
            ? "0 0 0 3px rgba(245, 158, 11, 0.15), 0 2px 8px rgba(0,0,0,0.08)"
            : "0 2px 8px rgba(0,0,0,0.05)",
        "&:hover": {
            borderColor: "#f59e0b",
            boxShadow: "0 4px 12px rgba(245, 158, 11, 0.15)",
        },
        transition: "all 0.3s ease",
        fontFamily: "'Roboto Slab', serif",
    }),
    menu: base => ({
        ...base,
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        zIndex: 9999,
        backdropFilter: "blur(10px)",
    }),
    menuList: base => ({
        ...base,
        padding: "8px",
        borderRadius: "8px",
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? "linear-gradient(135deg, #fef3c7, #fffbeb)" : state.isFocused ? "linear-gradient(135deg, #fffbeb, #fff)" : "white",
        color: "#1e293b",
        borderRadius: "8px",
        padding: "12px 16px",
        marginBottom: "4px",
        fontSize: "14px",
        fontWeight: state.isSelected ? "600" : "400",
        fontFamily: "'Roboto Slab', serif",
        boxShadow: state.isSelected ? "0 2px 4px rgba(245, 158, 11, 0.2)" : "none",
        "&:active": {
            backgroundColor: "#fde68a",
        },
        transition: "all 0.2s ease",
    }),
    singleValue: base => ({
        ...base,
        color: "#1e293b",
        fontWeight: "500",
        fontFamily: "'Roboto Slab', serif",
    }),
    placeholder: base => ({
        ...base,
        color: "#94a3b8",
        fontFamily: "'Roboto Slab', serif",
        fontWeight: "400",
    }),
    indicatorSeparator: () => ({
        display: "none"
    }),
    dropdownIndicator: base => ({
        ...base,
        color: "#94a3b8",
        "&:hover": {
            color: "#f59e0b",
            transform: "scale(1.1)",
        },
        transition: "all 0.2s ease",
    })
};

/* =======================
   MAIN COMPONENT
======================= */
export const RecruitmentTable = () => {
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
    const [selectedType, setSelectedType] = useState(employmentTypeOptions[0]);
    const [actionState, setActionState] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [open, SetIsOpen] = useState(false);
     const [isOpen, setIs_Open] = useState(false);

    const handleClose = () => {
        SetIsOpen((prev) => { !prev })

    }
    useEffect(() => {

        open ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset' }
    }, [open])
    const onActionClick = () => {
        setActionState(prev => !prev);
        alert(actionState ? "Edit mode off" : "Edit mode on");
    };

    const handleSelectRow = (employeeId) => {
        setSelectedRows(prev =>
            prev.includes(employeeId)
                ? prev.filter(id => id !== employeeId)
                : [...prev, employeeId]
        );
    };

    // Filter data based on search and selected filters
    const filteredData = useMemo(() => {
        return recruitmentData.filter(row => {
            const matchesSearch = Object.values(row)
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesStatus = selectedStatus.value === "All" ||
                row.employeeStatus === selectedStatus.value;

            const matchesType = selectedType.value === "All" ||
                row.employmentType === selectedType.value;

            return matchesSearch && matchesStatus && matchesType;
        });
    }, [search, selectedStatus, selectedType]);

    // will be recalculated whenever the current page or filteredData changes
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, currentPage]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // reset to first page whenever filters/search change so we don't end up on an empty page
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredData]);

    const handleSelectAll = () => {
        if (selectedRows.length === paginatedData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(paginatedData.map(row => row.employeeId));
        }
    };


    const handleGetInfo = useCallback((id) => {
        console.log(id)
        setIs_Open(true)
}, []);
    // document.body.style.overflow='hidden'

    return (
        <div className="p-1 min-h-screen bg-white relative ">
            <div className="max-w-7xl mx-auto">

                {/* HEADER SECTION */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h1
                                className="text-4xl font-bold text-slate-900 mb-3 tracking-tight"
                                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
                            >
                                Recruitment Records
                            </h1>
                            <p
                                className="text-slate-600 text-lg"
                                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                            >
                                Manage and track employee recruitment information with precision and ease
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 w-full md:w-auto">
                            <button
                                type="button"
                                className="px-5 py-3 bg-gradient-to-r from-amber-500 
                to-amber-600 text-white border border-amber-400 rounded-xl flex items-center
                 gap-2 hover:from-amber-600 hover:to-amber-700  transition-all duration-300
                  hover:scale-105 group"
                                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 500 }}
                                onClick={() => { SetIsOpen((prev) => !prev) }}  >
                                <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                Add New
                            </button>

                            <button
                                className="px-5 py-3 bg-gradient-to-r from-white
                 to-slate-50 text-slate-700 border border-slate-200 
                 
                 rounded-xl flex items-center gap-2 hover:bg-gradient-to-r
                  hover:from-slate-100 hover:to-slate-50 hover:shadow-lg 
                  shadow-slate-200/50 transition-all duration-300 hover:scale-105 group"
                                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 500 }}
                            >
                                <Printer size={18} className="group-hover:animate-pulse" />
                                Print
                            </button>
                        </div>
                    </div>

                    {/* STATS CARDS */}
                    <div className="grid grid-cols-1  md:grid-cols-4  gap-5 mb-8">
                        <div className="bg-white border border-amber-300 rounded-2xl p-6 shadow   
             hover:scale-105 transition-all duration-300">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p
                                        className="text-sm text-slate-600 mb-2"
                                        style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                                    >
                                        Total Employees
                                    </p>
                                    <p
                                        className="text-3xl font-bold text-slate-900"
                                        style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
                                    >
                                        {recruitmentData.length}
                                    </p>
                                </div>
                                <div className="p-3 bg-gradient-to-br from-blue-100 
                                to-blue-200 rounded-xl shadow-lg shadow-blue-200/30">
                                    <Users className="text-blue-700" size={22} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-amber-300 rounded-2xl p-6   hover:scale-105 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p
                                        className="text-sm text-slate-600 mb-2"
                                        style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                                    >
                                        Active Employees
                                    </p>
                                    <p
                                        className="text-3xl font-bold text-emerald-700"
                                        style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
                                    >
                                        {recruitmentData.filter(e => e.employeeStatus === "Active").length}
                                    </p>
                                </div>
                                <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl shadow-lg shadow-emerald-200/30">
                                    <CheckCircle className="text-emerald-700" size={22} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-amber-300 rounded-2xl p-6   hover:scale-105 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p
                                        className="text-sm text-slate-600 mb-2"
                                        style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                                    >
                                        Permanent Staff
                                    </p>
                                    <p
                                        className="text-3xl font-bold text-blue-700"
                                        style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
                                    >
                                        {recruitmentData.filter(e => e.employmentType === "Permanent").length}
                                    </p>
                                </div>
                                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg shadow-blue-200/30">
                                    <Briefcase className="text-blue-700" size={22} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white  rounded-2xl p-6  border border-amber-300  hover:scale-105 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p
                                        className="text-sm text-slate-600 mb-2"
                                        style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                                    >
                                        New This Month
                                    </p>
                                    <p
                                        className="text-3xl font-bold text-amber-700"
                                        style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
                                    >
                                        2
                                    </p>
                                </div>
                                <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl shadow-lg shadow-amber-200/30">
                                    <Users className="text-amber-700" size={22} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FILTERS AND SEARCH */}
                <div className="bg-white backdrop-blur-sm   rounded-2xl p-7 mb-8 shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        {/* SEARCH */}
                        <div className="flex-1">
                            <div className="relative max-w-lg">
                                <Search
                                    size={20}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-500"
                                />
                                <input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search by ID, name, email, department, or designation..."
                                    className="
                    w-full pl-14 pr-5 py-3.5
                    bg-gradient-to-r from-white to-amber-50/30 border-2 border-amber-300
                    rounded-2xl
                    text-slate-900 placeholder-slate-500
                    focus:ring-4 focus:ring-amber-400/20 focus:border-amber-500 focus:bg-white
                    outline-none transition-all duration-300 shadow-lg shadow-amber-200/20
                    hover:shadow-xl hover:shadow-amber-200/30
                  "
                                    style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                                />
                            </div>
                        </div>

                        {/* FILTERS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* EMPLOYMENT TYPE FILTER */}
                            <div className="flex items-center gap-3">
                                <Briefcase size={20} className="text-amber-600" />
                                <Select
                                    value={selectedType}
                                    onChange={setSelectedType}
                                    options={employmentTypeOptions}
                                    styles={customSelectStyles}
                                    className="w-full min-w-[220px] react-select-container"
                                    isSearchable={false}
                                    menuPlacement="auto"
                                    classNamePrefix="react-select"
                                    menuPortalTarget={document.body}
                                    menuPosition={"fixed"}
                                />
                            </div>

                            {/* STATUS FILTER */}
                            <div className="flex items-center gap-3">
                                <Filter size={20} className="text-amber-600" />
                                <Select
                                    value={selectedStatus}
                                    onChange={setSelectedStatus}
                                    options={statusOptions}
                                    styles={customSelectStyles}
                                    className="w-full min-w-[220px] react-select-container"
                                    isSearchable={false}
                                    menuPlacement="auto"
                                    classNamePrefix="react-select"
                                    menuPortalTarget={document.body}
                                    menuPosition={"fixed"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* TABLE CONTAINER */}
                {/* custom tailwind table */}
                <div className="bg-white to-slate-50 border border-slate-300 rounded-2xl overflow-hidden ">
                    {paginatedData.length === 0 ? (
                        <div className="py-16 text-center">
                            <div
                                className="text-slate-400 mb-3 text-lg"
                                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                            >
                                📭 No recruitment records found
                            </div>
                            <p
                                className="text-slate-500"
                                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                            >
                                Try adjusting your search or filters to find what you're looking for
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <CustomCheckbox
                                                checked={selectedRows.length === paginatedData.length}
                                                onChange={handleSelectAll}
                                                id="select-all"
                                            />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employment Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedData.map(row => (
                                        <tr key={row.employeeId} className="hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <CustomCheckbox
                                                    checked={selectedRows.includes(row.employeeId)}
                                                    onChange={() => handleSelectRow(row.employeeId)}
                                                    id={row.employeeId}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <AvatarWithHover 
                                                        firstName={row.firstName}
                                                        lastName={row.lastName}
                                                        employeeId={row.employeeId}
                                                        department={row.department}
                                                        designation={row.designation}
                                                        onClick={() => handleGetInfo(row.employeeId)}
                                                    />
                                                    <div>
                                                        <div
                                                            className="font-medium text-slate-900 tracking-wide"
                                                            style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 500 }}
                                                        >
                                                            {row.firstName} {row.lastName}
                                                        </div>
                                                        <div
                                                            className="text-sm text-slate-600 mt-0.5"
                                                            style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                                                        >
                                                            {row.employeeId}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className="text-slate-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
                                                    style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                                                >
                                                    {row.officeEmail}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className="text-slate-700"
                                                    style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                                                >
                                                    {row.officeMobile}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className="text-slate-800"
                                                    style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 500 }}
                                                    >
                                                    {row.department}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className="text-slate-800"
                                                    style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 500 }}
                                                >
                                                    {row.designation}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <EmploymentTypeBadge type={row.employmentType} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={row.employeeStatus} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className="text-slate-700"
                                                    style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                                                >
                                                    {formatDate(row.dateOfJoining)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className="text-slate-700 flex items-center gap-2"
                                                    style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                                                >
                                                    {formatDate(
                                                        row.contractEndDate ||
                                                        new Date(new Date(row.dateOfJoining).setFullYear(new Date(row.dateOfJoining).getFullYear() + 1)).toISOString().split('T')[0]
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <ActionButtons row={row} onActionClick={onActionClick} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    
                    <Emp_Each isOpen={isOpen} onClose={() => setIs_Open(false)}  />
                    {/* simple pagination controls */}
                    {filteredData.length > rowsPerPage && (
                        <div className="flex text-sm items-center justify-between px-6 py-4 bg-gray-50">
                            <div>
                                Showing {paginatedData.length} of {filteredData.length}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 bg-white border border-gray-300 rounded disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span className="px-2">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 bg-white border border-gray-300 rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* FOOTER NOTE */}
                <div className="mt-8 text-center">
                    <p
                        className="text-sm text-slate-500"
                        style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                    >
                        Showing {filteredData.length} of {recruitmentData.length} records •
                        <span className="text-amber-600 font-medium ml-1">
                            {selectedRows.length} selected
                        </span>
                    </p>
                </div>

            </div>
            <div className="absolute top-1 left-1  w-full">
                {open && (
                    <div className="w-full  relative inset-0  top-0
                     lg:h-[69rem]                      md:h-[69rem]  sm:h-[89rem]   ">
                        <RecruitmentForm onClose={handleClose} />
                    </div>
                )
                }

            </div>
        </div>
    );
};








const Emp_Each = ({ isOpen, onClose }) => {
  const employee = {
    employeeId: "EMP-101",
    firstName: "John",
    lastName: "Smith",
    officeEmail: "john.smith@company.com",
    officeMobile: "+1 (555) 123-4567",
    department: "Engineering",
    designation: "Senior Developer",
    employmentType: "Permanent",
    employeeStatus: "Active",
    dateOfJoining: "2023-03-15",
    contractEndDate: "2026-03-15"
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

   return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Animated Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        style={{ fontFamily: "'Roboto Slab', serif" }}
      >
        {/* Dynamic Accent Header */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 opacity-10" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all z-20"
        >
          <X size={24} />
        </button>

        <div className="relative pt-12 pb-10 px-8 sm:px-12">
          
          {/* Identity Header */}
          <div className="flex flex-col items-center sm:flex-row sm:items-end gap-6 mb-10">
            <div className="relative">
              <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center border-4 border-white shadow-xl">
                <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white">
                  <User size={48} strokeWidth={1.5} />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full" title="Active Status" />
            </div>

            <div className="text-center sm:text-left">
              <h2 
                className="text-3xl font-semibold text-slate-800 tracking-tight"
                style={{ fontWeight: 600 }}
              >
                {employee.firstName} {employee.lastName}
              </h2>
              <p className="text-orange-600 font-medium text-lg mt-1 tracking-wide">
                {employee.designation}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                <span className="flex items-center gap-1 text-slate-500 text-sm">
                  <Building2 size={14} /> {employee.department}
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="flex items-center gap-1 text-slate-500 text-sm">
                  <MapPin size={14} /> {employee.location}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 py-8 border-y border-slate-100">
            
            <DetailItem 
              icon={<IdCard className="text-amber-500" size={20} />}
              label="Employee ID"
              value={employee.employeeId}
            />

            <DetailItem 
              icon={<Globe className="text-orange-500" size={20} />}
              label="Employment Type"
              value={employee.employmentType}
            />

            <DetailItem 
              icon={<Mail className="text-amber-500" size={20} />}
              label="Office Email"
              value={employee.officeEmail}
            />

            <DetailItem 
              icon={<Phone className="text-orange-500" size={20} />}
              label="Office Mobile"
              value={employee.officeMobile}
            />

            <DetailItem 
              icon={<Calendar className="text-amber-500" size={20} />}
              label="Date of Joining"
              value={employee.dateOfJoining}
            />

            <DetailItem 
              icon={<Calendar className="text-orange-500" size={20} />}
              label="Contract End Date"
              value={employee.contractEndDate}
            />

          </div>

          {/* Action Footer */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="flex-1 cursor-pointer min-w-[140px] py-3 bg-white border-2 border-slate-200 hover:border-amber-500 text-slate-700 font-semibold rounded-2xl transition-all">
              Download Profile
            </button>
            <button className="flex-1 cursor-pointer min-w-[140px] py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-2xl shadow-lg shadow-slate-200 transition-all">
             Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for clean organization
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 group">
    <div className="mt-1 p-2 bg-slate-50 rounded-lg group-hover:bg-amber-50 transition-colors">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">
        {label}
      </span>
      <span 
        className="text-slate-700 text-sm font-semibold"
        style={{ fontWeight: 600 }}
      >
        {value}
      </span>
    </div>
  </div>
);


