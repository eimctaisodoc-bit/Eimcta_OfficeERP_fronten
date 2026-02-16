import React, { useMemo, useState, useEffect } from "react";
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
  Clock,
  MoreVertical,
  Download,
  Printer,
  PlusCircle,
  X
} from "lucide-react";


/* =======================
   FIELD DEFINITIONS
======================= */
const attendanceTableFields = [
  "attendance_id",
  "employee_id",
  "attendance_date",
  "check_in_time",
  "check_out_time",
  "attendance_mode",
  "attendance_status",
  "total_working_hours"
];

/* =======================
   STATUS OPTIONS FOR SELECT
======================= */
const statusOptions = [
  { value: "All", label: "All Status" },
  { value: "Present", label: "Present" },
  { value: "Late", label: "Late" },
  { value: "Absent", label: "Absent" },
  { value: "On Leave", label: "On Leave" }
];

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

const formatTime = value =>
  value
    ? new Date(value).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
    : "-";

/* =======================
   STATUS BADGE
======================= */
const StatusBadge = ({ status }) => {
  const map = {
    Present: ["bg-emerald-50 border-emerald-200", "text-emerald-700", <CheckCircle size={14} />],
    Late: ["bg-amber-50 border-amber-200", "text-amber-700", <Clock size={14} />],
    Absent: ["bg-red-50 border-red-200", "text-red-700", <XCircle size={14} />],
    "On Leave": ["bg-blue-50 border-blue-200", "text-blue-700", <Clock size={14} />]
  };
  const [bg, text, icon] = map[status] || [
    "bg-slate-50 border-slate-200",
    "text-slate-700",
    <Clock size={14} />
  ];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${bg} ${text}`}
    >
      {icon}
      {status}
    </span>
  );
};


/* =======================
   ACTION BUTTONS
======================= */
const ActionButtons = ({ row, onActionClick }) => {


  return (

    < div className="flex items-center gap-1" >
      <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
        <Eye size={16} className="text-slate-600" />
      </button>
      <div className="relative group transition-all duration-500">

        <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors" onClick={onActionClick}>
          <Edit2 size={16} className="text-blue-600" />
        </button>

      </div>
      <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
        <Trash2 size={16} className="text-red-600" />
      </button>
      <div className="group relative duration-300 ">

        <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <MoreVertical size={16} className="text-slate-600" />
        </button>
        <div
          className="
    absolute right-0 top-9 z-50
    hidden group-hover:block hover:block
    bg-white shadow-xl border border-slate-200
    rounded-lg p-2 w-56
  "
        >
          {/* Assign Task */}
          <button
            onClick={() => console.log("Assign Task clicked")}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 text-sm"
          >
            📝 Assign Task
          </button>

          {/* Mark as Complete */}
          <button
            onClick={() => console.log("Mark Complete clicked")}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-green-100 text-sm text-green-600"
          >
            ✅ Mark Complete
          </button>

          {/* Schedule Meeting */}
          <button
            onClick={() => console.log("Schedule Meeting clicked")}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-100 text-sm text-blue-600"
          >
            📅 Schedule Meeting
          </button>

          {/* Send Reminder */}
          <button
            onClick={() => console.log("Send Reminder clicked")}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-yellow-100 text-sm text-yellow-700"
          >
            ⏰ Send Reminder
          </button>
        </div>

      </div>

    </div >
  )
};


/* =======================
   COLUMNS
======================= */
const generateColumns = ({ onActionClick }) => [
  {
    name: <span className="font-bold text-black">Employee</span>,
    selector: row => row.employee_id,
    sortable: true,
    cell: row => (
      <div className="relative group flex items-center gap-3">
        <img
          src={row.avatar || "/default-avatar.png"}
          alt={row.employee_name}
          className="w-8 h-8 rounded-full object-cover border border-slate-200 cursor-pointer"
        />
        <span className="font-medium text-black cursor-pointer">
          {row.employee_id}
        </span>
        <div className="
      absolute left-0 top-10 z-50
      hidden group-hover:block
      bg-white shadow-xl border border-slate-200
      rounded-lg p-3 w-56
    ">
          <div className="flex items-center gap-3">
            <img
              src={row.avatar || "/default-avatar.png"}
              alt={row.employee_name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-black">
                {row.employee_name}
              </p>
              <p className="text-xs text-slate-500">
                ID: {row.employee_id}
              </p>
            </div>
          </div>

          <div className="mt-2 text-xs text-slate-600 space-y-1">
            <p><span className="font-medium">Department:</span> {row.department}</p>
            <p><span className="font-medium">Role:</span> {row.designation}</p>
            <p><span className="font-medium">Status:</span> {row.status}</p>
          </div>
        </div>

      </div>
    ),
    minWidth: "200px"
  },
  {
    name: <span className="font-bold text-black">Date</span>,
    selector: row => row.attendance_date,
    sortable: true,
    cell: row => (
      <div className="text-black">
        {formatDate(row.attendance_date)}
      </div>
    ),
    minWidth: "140px"
  },
  {
    name: <span className="font-bold text-black">Check In</span>,
    selector: row => row.check_in_time,
    cell: row => (
      <div className="text-black">
        {formatTime(row.check_in_time)}
      </div>
    ),
    minWidth: "120px"
  },
  {
    name: <span className="font-bold text-black">Check Out</span>,
    selector: row => row.check_out_time,
    cell: row => (
      <div className="text-black">
        {formatTime(row.check_out_time)}
      </div>
    ),
    minWidth: "120px"
  },
  {
    name: <span className="font-bold text-black">Total Hours</span>,
    selector: row => row.total_working_hours,
    sortable: true,
    cell: row => (
      <div className="font-medium text-black">
        {row.total_working_hours}
      </div>
    ),
    minWidth: "130px"
  },
  {
    name: <span className="font-bold text-black">Status</span>,
    selector: row => row.attendance_status,
    sortable: true,
    cell: row => <StatusBadge status={row.attendance_status} />,
    minWidth: "140px"
  },
  {
    name: <span className="font-bold text-black">Actions</span>,
    cell: row => (<ActionButtons onActionClick={onActionClick} />),
    ignoreRowClick: true,
    minWidth: "180px"
  }
];

/* =======================
   SAMPLE DATA
======================= */
const attendanceData = [
  {
    attendance_id: 1,
    employee_id: "EMP-101",
    employee_name: "John Smith",
    attendance_date: "2026-01-05",
    check_in_time: "2026-01-05T09:10:00",
    check_out_time: "2026-01-05T17:30:00",
    attendance_status: "Present",
    total_working_hours: "8h 20m"
  },
  {
    attendance_id: 2,
    employee_id: "EMP-102",
    employee_name: "Sarah Johnson",
    attendance_date: "2026-01-05",
    check_in_time: "2026-01-05T10:30:00",
    check_out_time: "2026-01-05T18:45:00",
    attendance_status: "Late",
    total_working_hours: "7h 15m"
  },
  {
    attendance_id: 3,
    employee_id: "EMP-103",
    employee_name: "Michael Chen",
    attendance_date: "2026-01-05",
    check_in_time: "2026-01-05T08:45:00",
    check_out_time: "2026-01-05T17:15:00",
    attendance_status: "Present",
    total_working_hours: "8h 30m"
  },
  {
    attendance_id: 4,
    employee_id: "EMP-104",
    employee_name: "Emma Wilson",
    attendance_date: "2026-01-05",
    check_in_time: null,
    check_out_time: null,
    attendance_status: "Absent",
    total_working_hours: "0h"
  },
  {
    attendance_id: 5,
    employee_id: "EMP-105",
    employee_name: "David Brown",
    attendance_date: "2026-01-05",
    check_in_time: "2026-01-05T09:05:00",
    check_out_time: "2026-01-05T17:45:00",
    attendance_status: "Present",
    total_working_hours: "8h 40m"
  },
  {
    attendance_id: 6,
    employee_id: "EMP-106",
    employee_name: "Lisa Anderson",
    attendance_date: "2026-01-05",
    check_in_time: null,
    check_out_time: null,
    attendance_status: "On Leave",
    total_working_hours: "0h"
  }
];

/* =======================
   CUSTOM STYLES FOR DATATABLE
======================= */
const customStyles = {
  headCells: {
    style: {
      padding: "16px 20px",
      backgroundColor: "#f8fafc",
      borderBottom: "1px solid #e2e8f0",
      fontWeight: "bold",
      fontSize: "14px",
      color: "#000000",
    },
  },
  cells: {
    style: {
      padding: "20px",
      fontSize: "14px",
      color: "#000000",
      borderBottom: "1px solid #f1f5f9",
    },
  },
  rows: {
    style: {
      backgroundColor: "#ffffff",
      "&:hover": {
        backgroundColor: "#f8fafc",
      },
    },
    highlightOnHoverStyle: {
      backgroundColor: "#f1f5f9",
    },
  },
  pagination: {
    style: {
      borderTop: "1px solid #e2e8f0",
      padding: "16px 20px",
      fontSize: "14px",
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
    boxShadow: state.isFocused ? "0 0 0 3px rgba(245, 158, 11, 0.1)" : "none",
    "&:hover": {
      borderColor: "#f59e0b"
    },
    transition: "all 0.2s"
  }),
  menu: base => ({
    ...base,
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    zIndex: 9999
  }),
  menuList: base => ({
    ...base,
    padding: "8px",
    borderRadius: "8px"
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#fef3c7" : state.isFocused ? "#fffbeb" : "white",
    color: "#000000",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "4px",
    fontSize: "14px",
    fontWeight: state.isSelected ? "600" : "400",
    "&:active": {
      backgroundColor: "#fde68a"
    }
  }),
  singleValue: base => ({
    ...base,
    color: "#000000",
    fontWeight: "500"
  }),
  placeholder: base => ({
    ...base,
    color: "#94a3b8"
  }),
  indicatorSeparator: () => ({
    display: "none"
  }),
  dropdownIndicator: base => ({
    ...base,
    color: "#94a3b8",
    "&:hover": {
      color: "#f59e0b"
    }
  })
};

/* =======================
   MAIN COMPONENT
======================= */
const Attend_HR_Data_Table = () => {

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [actionState, setActionState] = useState(false);
  
  const onActionClick = () => {
    setActionState(prev => !prev);
    alert(actionState)
    // toggles true/false
  };
  // Filter data based on search and selected status
  const filteredData = useMemo(() => {
    return attendanceData.filter(row => {
      const matchesSearch = Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = selectedStatus.value === "All" ||
        row.attendance_status === selectedStatus.value;

      return matchesSearch && matchesStatus;
    });
  }, [search, selectedStatus]);

  const columns = useMemo(() => generateColumns({ onActionClick: onActionClick }), []);

  return (
    <div className="p-6 min-h-screen relative">
      <div className="max-w-7xl mx-auto">

        {/* HEADER SECTION */}
        <div className="mb-8 grid grid-cols-1">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">
                Attendance Records
              </h1>
              <p className="text-slate-600">
                Track and manage employee attendance with real-time updates
              </p>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto">

          

              <button className="px-4 py-2.5 bg-amber-500 text-white border hover:cursor-pointer border-amber-300 rounded-lg flex items-center gap-2 hover:bg-amber-600 transition-colors">
                <Printer size={16} className="" />
                Print
              </button>
              <button className="px-4 py-2.5 text-amber-500 bg-white border border-amber-300 rounded-lg flex items-center gap-2 hover:cursor-pointer hover:bg-slate-50 transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Employees</p>
                  <p className="text-2xl font-bold text-black">48</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Users className="text-blue-600" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Present Today</p>
                  <p className="text-2xl font-bold text-emerald-600">42</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <CheckCircle className="text-emerald-600" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Late Today</p>
                  <p className="text-2xl font-bold text-amber-600">3</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <Clock className="text-amber-600" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Absent Today</p>
                  <p className="text-2xl font-bold text-red-600">3</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <XCircle className="text-red-600" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS AND SEARCH */}
        <div className="bg-white/70 backdrop-blur border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

            {/* SEARCH */}
            <div className="flex-1">
              <div className="relative max-w-md">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by employee ID, name, or status..."
                  className="
                    w-full pl-12 pr-4 py-3
                    bg-white border border-amber-200
                rounded-2xl
                text-slate-800 placeholder-slate-400/60
                focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 focus:bg-white
                outline-none transition-all duration-300
                  "
                />
              </div>
            </div>

            {/* FILTERS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* DATE FILTER */}
              <div className="flex items-center gap-3">
                <Calendar size={22} className="text-slate-500" />
                <Select
                  placeholder="Select date range..."
                  styles={customSelectStyles}
                  options={[
                    { value: "today", label: "Today" },
                    { value: "week", label: "This Week" },
                    { value: "month", label: "This Month" },
                  ]}
                  className="w-full min-w-[200px]"
                  isSearchable={false}
                  menuPlacement="auto"
                  classNamePrefix="react-select"
                  menuPortalTarget={document.body}  // <-- this makes dropdown render over everything
                  menuPosition={"fixed"}
                />
              </div>

              {/* STATUS FILTER */}
              <div className="flex items-center gap-3">
                <Filter size={18} className="text-slate-500" />
                <Select
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  options={statusOptions}
                  styles={customSelectStyles}
                  className="w-full min-w-[200px] react-select-container"
                  isSearchable={false}
                  menuPlacement="auto"
                  classNamePrefix="react-select"
                  menuPortalTarget={document.body}  // <-- this makes dropdown render over everything
                  menuPosition={"fixed"}
                />
              </div>

            </div>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            highlightOnHover
            responsive
            dense
            customStyles={customStyles}
            noDataComponent={
              <div className="py-12 text-center">
                <div className="text-slate-400 mb-2">No attendance records found</div>
                <p className="text-slate-500">Try adjusting your search or filters</p>
              </div>
            }
          />
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-6 text-sm text-slate-500 text-center">
          Showing {filteredData.length} of {attendanceData.length} attendance records
          {selectedStatus.value !== "All" && ` • Filtered by: ${selectedStatus.label}`}
        </div>

      </div>
      <div className="absolute top-0 left-0   w-full ">

       

      
      </div>
    </div>
  );
};

export default Attend_HR_Data_Table;