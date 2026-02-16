import React, { useEffect, useMemo, useState } from "react";
import Select from 'react-select';
import DataTable from "react-data-table-component";
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
    Check
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
const AvatarWithHover = ({ firstName, lastName, employeeId, department, designation }) => {
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
        <div className="group relative ">
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
            <button className="p-2 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg hover:bg-gradient-to-r hover:from-slate-100 hover:to-white transition-all duration-300 hover:shadow-sm shadow-slate-200/50 group">
                <Eye size={16} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
            </button>
            <button
                className="p-2 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-white transition-all duration-300 hover:shadow-sm shadow-blue-200/50 group"
                onClick={onActionClick}
            >
                <Edit2 size={16} className="text-blue-600 group-hover:text-blue-700 transition-colors" />
            </button>
            <button className="p-2 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg hover:bg-gradient-to-r hover:from-rose-50 hover:to-white transition-all duration-300 hover:shadow-sm shadow-rose-200/50 group">
                <Trash2 size={16} className="text-rose-600 group-hover:text-rose-700 transition-colors" />
            </button>
            <div className="group relative duration-300">
                <button className="p-2 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg hover:bg-gradient-to-r hover:from-slate-100 hover:to-white transition-all duration-300 hover:shadow-sm shadow-slate-200/50">
                    <MoreVertical size={16} className="text-slate-600" />
                </button>
                <div className="absolute right-0 top-9 z-50 hidden group-hover:block hover:block bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-900/10 border border-slate-200 rounded-lg p-2 w-56 backdrop-blur-sm">
                    <button
                        onClick={() => console.log("View Profile clicked")}
                        className="w-full text-left px-3 py-2.5 rounded-md hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-sm transition-all duration-300"
                        style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                    >
                        👤 View Full Profile
                    </button>
                    <button
                        onClick={() => console.log("Documents clicked")}
                        className="w-full text-left px-3 py-2.5 rounded-md hover:bg-gradient-to-r hover:from-emerald-50 hover:to-transparent text-sm transition-all duration-300"
                        style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                    >
                        📄 View Documents
                    </button>
                    <button
                        onClick={() => console.log("Performance clicked")}
                        className="w-full text-left px-3 py-2.5 rounded-md hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent text-sm transition-all duration-300"
                        style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                    >
                        📈 Performance Review
                    </button>
                </div>
            </div>
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
   COLUMNS
======================= */
const generateColumns = ({ onActionClick, selectedRows, onSelectRow, onSelectAll }) => [
    {
        name: (
            <div className="flex items-center gap-2">
                <CustomCheckbox
                    checked={selectedRows.length === recruitmentData.length}
                    onChange={onSelectAll}
                    id="select-all"
                />

            </div>
        ),
        cell: row => (
            <CustomCheckbox
                checked={selectedRows.includes(row.employeeId)}
                onChange={() => onSelectRow(row.employeeId)}
                id={row.employeeId}
            />
        ),
        width: "80px",
        minWidth: "80px"
    },
    {
        name: <span className="font-bold text-slate-800">Employee</span>,
        selector: row => `${row.firstName} ${row.lastName}`,
        sortable: true,
        cell: row => (
            <div className="flex items-center gap-3">
                <AvatarWithHover
                    firstName={row.firstName}
                    lastName={row.lastName}
                    employeeId={row.employeeId}
                    department={row.department}
                    designation={row.designation}
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
        ),
        minWidth: "220px"
    },
    {
        name: <span className="font-bold text-slate-800">Email</span>,
        selector: row => row.officeEmail,
        cell: row => (
            <div
                className="text-slate-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
            >
                {row.officeEmail}
            </div>
        ),
        minWidth: "220px"
    },
    {
        name: <span className="font-bold text-slate-800">Contact</span>,
        selector: row => row.officeMobile,
        cell: row => (
            <div
                className="text-slate-700"
                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
            >
                {row.officeMobile}
            </div>
        ),
        minWidth: "160px"
    },
    {
        name: <span className="font-bold text-slate-800">Department</span>,
        selector: row => row.department,
        sortable: true,
        cell: row => (
            <div
                className="text-slate-800"
                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 500 }}
            >
                {row.department}
            </div>
        ),
        minWidth: "160px"
    },
    {
        name: <span className="font-bold text-slate-800">Designation</span>,
        selector: row => row.designation,
        sortable: true,
        cell: row => (
            <div
                className="text-slate-800"
                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 500 }}
            >
                {row.designation}
            </div>
        ),
        minWidth: "180px"
    },
    {
        name: <span className="font-bold text-slate-800">Employment Type</span>,
        selector: row => row.employmentType,
        sortable: true,
        cell: row => <EmploymentTypeBadge type={row.employmentType} />,
        minWidth: "140px"
    },
    {
        name: <span className="font-bold text-slate-800">Status</span>,
        selector: row => row.employeeStatus,
        sortable: true,
        cell: row => <StatusBadge status={row.employeeStatus} />,
        minWidth: "140px"
    },
    {
        name: <span className="font-bold text-slate-800">Join Date</span>,
        selector: row => row.dateOfJoining,
        sortable: true,
        cell: row => (
            <div
                className="text-slate-700"
                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
            >
                {formatDate(row.dateOfJoining)}
            </div>
        ),
        minWidth: "140px"
    },
    {
        name: <span className="font-bold text-slate-800">End Date</span>,
        selector: row => row.contractEndDate || row.dateOfJoining,
        sortable: true,
        cell: row => {
            const endDate = row.contractEndDate ||
                new Date(new Date(row.dateOfJoining).setFullYear(new Date(row.dateOfJoining).getFullYear() + 1)).toISOString().split('T')[0];
            return (
                <div
                    className="text-slate-700 flex items-center gap-2"
                    style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                >
                    {formatDate(endDate)}
                </div>
            );
        },
        minWidth: "140px"
    },
    {
        name: <span className="font-bold text-slate-800">Actions</span>,
        cell: row => <ActionButtons row={row} onActionClick={onActionClick} />,
        ignoreRowClick: true,
        minWidth: "180px"
    }
];

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
   CUSTOM STYLES FOR DATATABLE
======================= */
const customStyles = {
    headCells: {
        style: {
            padding: "18px 24px",
            backgroundColor: "#f8fafc",
            //   borderBottom: "2px solid #e2e8f0",
            fontSize: "14px",
            color: "#1e293b",
            fontFamily: "'Roboto Slab', serif",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        },
    },
    cells: {
        style: {
            padding: "22px 24px",
            fontSize: "14px",
            color: "#334155",
            borderBottom: "1px solid #f1f5f9",
            transition: "background-color 0.3s ease",
        },
    },
    rows: {
        style: {
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 0 0 #f1f5f9",
            "&:hover": {
                backgroundColor: "#f8fafc",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
            },
        },
        highlightOnHoverStyle: {
            backgroundColor: "#f1f5f9",
            boxShadow: "0 4px 12px rgba(245, 158, 11, 0.15)",
        },
    },
    pagination: {
        style: {
            borderTop: "2px solid #e2e8f0",
            padding: "20px 24px",
            fontSize: "14px",
            fontFamily: "'Roboto Slab', serif",
            fontWeight: 400,
            boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
        },
    },
};

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

    const handleSelectAll = () => {
        if (selectedRows.length === filteredData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(filteredData.map(row => row.employeeId));
        }
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

    const columns = useMemo(() =>
        generateColumns({
            onActionClick,
            selectedRows,
            onSelectRow: handleSelectRow,
            onSelectAll: handleSelectAll
        }),
        [selectedRows]
    );
    // document.body.style.overflow='hidden'

    return (
        <div className="p-6 min-h-screen bg-white relative ">
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                        <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow  hover:shadow-2xl 
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
                                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg shadow-blue-200/30">
                                    <Users className="text-blue-700" size={22} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow 
            hover:shadow-2xl  hover:scale-105 transition-all duration-300">
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

                        <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow 
             hover:shadow-2xl  hover:scale-105 transition-all duration-300">
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

                        <div className="bg-white  rounded-2xl p-6 shadow 
            hover:shadow-2xl  hover:scale-105 transition-all duration-300">
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
                <div className="bg-white to-slate-50 border
         border-slate-300 rounded-2xl overflow-hidden shadow">
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        pagination
                        paginationPerPage='5'
                        paginationRowsPerPageOptions={[5, 10, 15, 20]}
                        highlightOnHover
                        responsive
                        dense
                        customStyles={customStyles}
                        noDataComponent={
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
                        }
                    />
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