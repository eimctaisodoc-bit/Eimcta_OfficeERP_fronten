import React from "react";
import {
    User,
    Phone,
    Briefcase,
    FileText,
    Mail,
    MapPin,
    Calendar,
    Building,
    Clock,
    CheckCircle2,
    AlertCircle,
    Users,
    LayoutDashboard,
    CreditCard,
    BarChart3,
    MessageCircle,
    ClipboardList,
    Settings,
    LogOut,

} from "lucide-react";






const menus = {
    admin: [
        { name: "Dashboard", path: "/admin/report", icon: LayoutDashboard },
        { name: "HR Management", path: "/admin/hr", icon: Users },
        { name: "Finance", path: "/admin/finance", icon: CreditCard },
        { name: "Sales", path: "/admin/sales", icon: BarChart3 },
          { name: "Tasks", path: "/admin/tasks", icon: ClipboardList },
        { name: "DMS", path: "/admin/dms", icon: FileText },
        { name: "Communication", path: "/admin/comm", icon: MessageCircle },
        { name: "Settings", path: "/admin/settings", icon: Settings },
    ],
    client: [
        { name: "Dashboard", path: "/client/report", icon: LayoutDashboard },
        { name: "My Orders", path: "/client/hr", icon: ClipboardList },
        { name: "Profile", path: "/client/profile", icon: User },
        { name: "Support", path: "/client/support", icon: MessageCircle },
    ],
    staff: [
        { name: "Dashboard", path: "/staff/report", icon: LayoutDashboard },
        { name: "HR Management", path: "/staff/hr", icon: Users },
        { name: "Finance", path: "/staff/finance", icon: CreditCard },
        { name: "Tasks", path: "/staff/tasks", icon: ClipboardList },
        { name: "Attendance", path: "/staff/attendance", icon: ClipboardList },
        { name: "Settings", path: "/staff/settings", icon: User },
    ],
};





const ClientEmp_form = [
    {
        title: "Personal",
        fullTitle: "Personal Information",
        icon: <User size={24} className="" />,
        fields: [
            // { name: "employeeId", label: "Employee ID", type: "text", disabled: true, icon: <User size={16} /> },
            { name: "firstName", label: "First Name", type: "text", icon: <User size={16} /> },
            { name: "middleName", label: "Middle Name", type: "text", icon: <User size={16} /> },
            { name: "lastName", label: "Last Name", type: "text", icon: <User size={16} /> },
            { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
            { name: "dob", label: "Date of Birth", type: "date", icon: <Calendar size={16} /> },
            { name: "maritalStatus", label: "Marital Status", type: "select", options: ["Single", "Married", "Divorced", "Widowed"] },
            { name: "nationality", label: "Nationality", type: "select", options: ["Nepali", "Indian", "Other"] },
            { name: "citizenshipId", label: "National ID No.", type: "text" },
            { name: "profilePhoto", label: "Profile Photo", type: "file" },
        ],
    },
    {
        title: "Contact",
        fullTitle: "Contact Information",
        icon: <Phone size={24} className="" />,
        fields: [
            { name: "officeEmail", label: "Office Email", type: "email", icon: <Mail size={16} /> },
            { name: "personalEmail", label: "Personal Email", type: "email", icon: <Mail size={16} /> },
            { name: "officeMobile", label: "Office Mobile", type: "number", icon: <Phone size={16} /> },
            { name: "personalMobile", label: "Personal Mobile", type: "number", icon: <Phone size={16} /> },
            { name: "permanentAddress", label: "Permanent Address", type: "text", icon: <MapPin size={16} /> },
            { name: "currentAddress", label: "Current Address", type: "text", icon: <MapPin size={16} /> },
        ],
    },
    {
        title: "Employment",
        fullTitle: "Employment Details",
        icon: <Briefcase size={24} className="" />,
        fields: [
            { name: "department", label: "Department", type: "text", icon: <Building size={16} /> },
            { name: "designation", label: "Designation", type: "text", icon: <Briefcase size={16} /> },
            { name: "jobRole", label: "Job Role", type: "text", icon: <Briefcase size={16} /> },
            { name: "employmentType", label: "Type", type: "select", options: ["Permanent", "Contract", "Intern"] },
            { name: "dateOfJoining", label: "Join Date", type: "date", icon: <Calendar size={16} /> },
            { name: "employeeStatus", label: "Status", type: "select", options: ["Active", "Inactive"] },
            { name: "workLocation", label: "Location", type: "text" },
            { name: "reportingManager", label: "Manager", type: "text" },
        ],
    },
    {
        title: "Docs",
        fullTitle: "Documents",
        icon: <FileText size={24} className="" />,
        fields: [
            { name: "resume", label: "Resume", type: "file" },
            { name: "offerLetter", label: "Offer Letter", type: "file" },
            { name: "citizenDoc", label: "ID/Passport", type: "file" },
            { name: "qualification", label: "Qualification", type: "file" },
        ],
    },
];




const leaveManagementFields = {
    title: "Leave",
    fullTitle: "Leave Management",
    icon: <CheckCircle2 size={18} />,
    fields: [
        { name: "leaveId", label: "Leave ID", type: "text", icon: <FileText size={16} /> },
        { name: "employeeId", label: "Employee ID", type: "text", icon: <User size={16} /> },
        {
            name: "leaveType",
            label: "Leave Type",
            type: "select",
            options: ["Annual", "Sick", "Casual", "Unpaid"],
        },
        { name: "leaveStartDate", label: "Start Date", type: "date", icon: <Calendar size={16} /> },
        { name: "leaveEndDate", label: "End Date", type: "date", icon: <Calendar size={16} /> },
        { name: "totalLeaveDays", label: "Total Leave Days", type: "number" },
        { name: "leaveReason", label: "Reason", type: "text" },
        { name: "attachment", label: "Attachment", type: "file" },
        {
            name: "approvalStatus",
            label: "Approval Status",
            type: "select",
            options: ["Pending", "Approved", "Rejected"],
        },
        { name: "approvedBy", label: "Approved By", type: "text" },
        { name: "approvalDate", label: "Approval Date", type: "date", icon: <Calendar size={16} /> },
    ],
};
const attendanceManagementFields = {
    title: "Attendance",
    fullTitle: "Attendance Management",
    icon: <Clock size={18} />,
    fields: [
        { name: "attendanceId", label: "Attendance ID", type: "text", icon: <FileText size={16} /> },
        { name: "employeeId", label: "Employee ID", type: "text", icon: <User size={16} /> },
        { name: "date", label: "Date", type: "date", icon: <Calendar size={16} /> },
        { name: "checkInTime", label: "Check-in Time", type: "time", icon: <Clock size={16} /> },
        { name: "checkOutTime", label: "Check-out Time", type: "time", icon: <Clock size={16} /> },
        { name: "breakTime", label: "Break Time (hrs)", type: "number" },
        { name: "totalWorkingHours", label: "Total Working Hours", type: "number" },
        { name: "overtimeHours", label: "Overtime Hours", type: "number" },
        {
            name: "attendanceMode",
            label: "Attendance Mode",
            type: "select",
            options: ["Manual", "Biometric", "App"],
        },
        {
            name: "attendanceStatus",
            label: "Attendance Status",
            type: "select",
            options: ["Present", "Absent", "Late", "Half Day"],
        },
        { name: "remarks", label: "Remarks", type: "text", icon: <AlertCircle size={16} /> },
    ],
};


export { ClientEmp_form, leaveManagementFields, attendanceManagementFields, menus };