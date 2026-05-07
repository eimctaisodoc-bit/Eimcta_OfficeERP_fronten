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
        { name: "Inbox", path: "/admin/inbox", icon: MessageCircle },
        { name: "Settings", path: "/admin/settings", icon: Settings },
    ],
    super_admin: [
        { name: "Dashboard", path: "/super_admin/report", icon: LayoutDashboard },
        { name: "HR Management", path: "/super_admin/hr", icon: Users },
        { name: "Finance", path: "/super_admin/finance", icon: CreditCard },
        { name: "Sales", path: "/super_admin/sales", icon: BarChart3 },
        { name: "Tasks", path: "/super_admin/tasks", icon: ClipboardList },
        { name: "DMS", path: "/super_admin/dms", icon: FileText },
        { name: "Inbox", path: "/super_admin/comm", icon: MessageCircle },
        { name: "Settings", path: "/super_admin/settings", icon: Settings },
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
        { name: "Sales", path: "/staff/sales", icon: BarChart3 },
        { name: "Tasks", path: "/staff/tasks", icon: ClipboardList },
        { name: "DMS", path: "/staff/dms", icon: FileText },
        // { name: "Attendance", path: "/staff/attendance", icon: ClipboardList },
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
            // { name: "department", label: "Department", type: "text", icon: <Building size={16} /> },
            //    ?? { name: "designation", label: "Designation", type: "text", icon: <Briefcase size={16} /> },
            { name: "jobRole", label: "Job Role/Position", type: "select", options: ['HR', 'CRO', 'Sales', ''] },
            { name: "Role", label: "Role", type: "select", options: ['Staff'] },
            // { name: "jobRole", label: "Job Role", type: "text", icon: <Briefcase size={16} /> },
            { name: "employmentType", label: "Type", type: "select", options: ["Permanent", "Contract", "Intern"] },
            { name: "dateOfJoining", label: "Join Date", type: "date", icon: <Calendar size={16} /> },
            { name: "employeeStatus", label: "Status", type: "select", options: ["Active", "Inactive"] },
            {
                name: "workLocation", label: "Location", type: "select", provinces: [
                    { label: "Koshi Province", value: "koshi" },
                    { label: "Madhesh Province", value: "madhesh" },
                    { label: "Bagmati Province", value: "bagmati" },
                    { label: "Gandaki Province", value: "gandaki" },
                    { label: "Lumbini Province", value: "lumbini" },
                    { label: "Karnali Province", value: "karnali" },
                    { label: "Sudurpashchim Province", value: "sudurpashchim" }
                ],
            },
            // { name: "reportingManager", label: "Manager", type: "text" },
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

const Dropstyle = (w, fs) => ({
    control: (base, state) => ({
        ...base,

        minHeight: w,
        borderRadius: "5px",
        borderColor: state.isFocused ? "#f59e0b" : "#e2e8f0",
        boxShadow: "none",
        fontSize: fs,//14
        "&:hover": {
            borderColor: "#f59e0b",
        },
    }),

    valueContainer: (base) => ({
        ...base,
        padding: "0 12px",
    }),

    placeholder: (base) => ({
        ...base,
        color: "#94a3b8",
        fontWeight: 500,
    }),

    singleValue: (base) => ({
        ...base,
        color: "#0f172a",
        fontWeight: 600,
    }),



    menu: (base) => ({
        ...base,
        borderRadius: "5px",
        overflow: "hidden",
        zIndex: 30,
        boxShadow: "0 10px 12px rgba(15, 23, 42, 0.15)",
        marginTop: "4px",
    }),

    menuList: (base) => ({
        ...base,
        padding: 0,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
    }),

    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? "#0f172a" // slate-900 active/selected
            : state.isFocused
                ? "#e2e8f0" // slate-200 hover
                : "#ffffff",

        color: state.isSelected
            ? "#ffffff"
            : "#1e293b",

        fontSize: fs,
        fontWeight: 500,
        cursor: "pointer",
        borderBottom: "1px solid #e2e8f0",

        ":active": {
            backgroundColor: "#0f172a", // slate-900 on click
            color: "#ffffff",
        },
    }),
});
const ValidateStyle = ({
  hasError = false,
  hasDisable = false,
  height = "48px",
  radius = "12px",
  fontSize = "14px",
  border = "1px solid #e2e8f0",
  focusBorder = "1px solid #f59e0b",
  errorBorder = "1px solid #ef4444",
  disabledBorder = "1px solid #cbd5e1",
  menuRadius = "12px",
  optionRadius = "8px",
} = {
}) => (
  console.log("height from warehouse", height),
  {
  control: (base, state) => ({
    ...base,

    minHeight: height,
    height: height,
   
    borderRadius: radius ?? "12px",

    fontSize: fontSize,

    backgroundColor:
      hasDisable || state.isDisabled ? "#f1f5f9" : "#ffffff",

    border:
      hasDisable || state.isDisabled
        ? disabledBorder
        : hasError
        ? errorBorder
        : state.isFocused
        ? focusBorder
        : border,

    boxShadow:
      hasDisable || state.isDisabled
        ? "none"
        : state.isFocused
        ? hasError
          ? "0 0 0 3px rgba(239, 68, 68, 0.15)"
          : "0 0 0 3px rgba(245, 158, 11, 0.18)"
        : "none",

    opacity: hasDisable || state.isDisabled ? 0.65 : 1,

    cursor: hasDisable || state.isDisabled ? "not-allowed" : "pointer",

    pointerEvents: hasDisable || state.isDisabled ? "none" : "auto",

    overflow: "hidden",

    "&:hover": {
      border:
        hasDisable || state.isDisabled
          ? disabledBorder
          : hasError
          ? errorBorder
          : focusBorder,
    },

    transition: "all 0.2s ease",
  }),

  valueContainer: (base) => ({
    ...base,
    height: height,
    minHeight: height,
    padding: "0 12px",
    fontSize: fontSize,
  }),

  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    fontSize: fontSize,
  }),

  placeholder: (base) => ({
    ...base,
    color: "#94a3b8",
    fontWeight: 500,
    fontSize: fontSize,
  }),

  singleValue: (base, state) => ({
    ...base,
    color: hasDisable || state.isDisabled ? "#94a3b8" : "#0f172a",
    fontWeight: 600,
    fontSize: fontSize,
  }),

  indicatorsContainer: (base) => ({
    ...base,
    height: height,
    minHeight: height,
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "4px",
    color:
      hasDisable || state.isDisabled
        ? "#cbd5e1"
        : state.isFocused
        ? "#f59e0b"
        : "#64748b",

    cursor: hasDisable || state.isDisabled ? "not-allowed" : "pointer",

    "&:hover": {
      color: hasDisable || state.isDisabled ? "#cbd5e1" : "#f59e0b",
    },
  }),

  clearIndicator: (base) => ({
    ...base,
    padding: "4px",
    display: hasDisable ? "none" : "flex",
    color: "#94a3b8",

    "&:hover": {
      color: "#ef4444",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  menu: (base) => ({
    ...base,
    width: "100%",
    minWidth: "100%",
    maxWidth: "380px",
    borderRadius: menuRadius,
    zIndex: 9999,
    border: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    boxShadow: "0 12px 20px rgba(0,0,0,0.08)",
    marginTop: "6px",
    padding: "6px",
    overflow: "hidden",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: "200px",
    overflowY: "auto",
    padding: 0,
    scrollbarWidth: "thin",
  }),

  option: (base, state) => ({
    ...base,

    backgroundColor: state.isDisabled
      ? "#f8fafc"
      : state.isSelected
      ? "#0f172a"
      : state.isFocused
      ? "#fef3c7"
      : "transparent",

    color: state.isDisabled
      ? "#94a3b8"
      : state.isSelected
      ? "#ffffff"
      : "#334155",

    borderRadius: optionRadius,
    marginBlock: "2px",
    padding: "10px 12px",
    fontSize: fontSize,
    fontWeight: 500,

    cursor: state.isDisabled ? "not-allowed" : "pointer",
    pointerEvents: state.isDisabled ? "none" : "auto",

    whiteSpace: "normal",
    wordBreak: "break-word",
    transition: "all 0.2s ease",
  }),

  multiValue: (base, { data }) => ({
    ...base,
    backgroundColor: data.color || "#1e293b",
    borderRadius: "8px",
    paddingLeft: "4px",
  }),

  multiValueLabel: (base) => ({
    ...base,
    color: "#ffffff",
    fontWeight: 600,
    fontSize: fontSize,
  }),

  multiValueRemove: (base, { data }) => ({
    ...base,
    color: "#ffffff",
    borderRadius: "6px",

    ":hover": {
      backgroundColor: data.color || "#1e293b",
      color: "#ffffff",
    },
  }),
});
 const getInputClass = (hasError = false, hasDisable = false) => {
        const disabled = hasDisable;
        return `
            w-full min-h-[48px] rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-all duration-200
            ${disabled
                ? 'bg-slate-100 border border-slate-300 text-slate-400 cursor-not-allowed opacity-65 pointer-events-none'
                : 'bg-white text-slate-900'}
            ${!disabled && hasError
                ? 'border border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-200'
                : !disabled
                    ? 'border border-slate-200 focus:border-amber-500 focus:ring-[3px] focus:ring-amber-200'
                    : ''}
            placeholder:text-slate-400
        `;
    };


const getCountdown = (target, warningMinutes = 15) => {
  const targetTime = new Date(target).getTime();
  const now = new Date().getTime();
  const diff = targetTime - now;

  const warningMs = warningMinutes * 60 * 1000;
  const isExpired = diff <= 0;
  const isWarning = !isExpired && diff <= warningMs;

  // Calculate remaining units
  const remaining = {
    days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
    hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
    minutes: Math.max(0, Math.floor((diff / 1000 / 60) % 60)),
    seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
    totalMs: Math.max(0, diff)
  };

  return { isExpired, isWarning, remaining };
};

// use this way for timer
// const deadline = "2026-04-28T17:46:00";

// You can call this inside a setInterval or a RequestAnimationFrame
// const status = getCountdown(deadline, 15);

// if (status.isExpired) {
//   console.log("Status: Finished");
// } else if (status.isWarning) {
//   console.log("Status: Final 15-minute stretch!");
// }

// console.log(`Time left: ${status.remaining.days}d ${status.remaining.hours}h`);

 const organizations = [
  {
    address: "Kathmandu, Nepal",
    contactPersonEmail: "ram@example.com",
    contactPersonName: "Ram Bahadur",
    contactPersonNumber: "9841234567",
    createdAt: "2026-04-23T10:24:56.300Z",
    industyType: [],
    organizationName: "Elite English boarding school",
    organizationType: "",
    registrationNumber: "REG-123456",
    role: "Director",
    totalEducator: null,
    totalEmp_learners: 50,
    updatedAt: "2026-04-23T10:24:56.300Z",
    vatPan: "PAN-987654",
    _id: "69e9f378d350a606553a29fb",
  },
];

// const result = checkArrayObjectsEmpty(organizations);

// console.log(result);

const isEmptyValue = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;

  if (
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).length === 0
  ) {
    return true;
  }

  return false;
};

const checkArrayObjectsEmpty = (dataArray) => {
  return dataArray.map((item) => {
    const { _id, ...restData } = item; // remove _id

    const emptyFields = Object.entries(restData)
      .filter(([key, value]) => isEmptyValue(value))
      .map(([key]) => key);

    return {
      hasEmpty: emptyFields.length > 0,
      emptyFields,
    };
  });
};


export { ClientEmp_form, leaveManagementFields, organizations, attendanceManagementFields, menus,getCountdown, Dropstyle, ValidateStyle,getInputClass, isEmptyValue, checkArrayObjectsEmpty };