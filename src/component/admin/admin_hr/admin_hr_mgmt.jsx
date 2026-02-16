import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { 
  Search, 
  Filter, 
  X, 
  Eye, 
  Edit2, 
  Trash2,
  User,
  FileText,
  CreditCard,
  DollarSign,
  TrendingUp,
  Calendar,
  Shield,
  Car,
  Stethoscope,
  Plane,
  Award,
  Clock,
  Percent,
  Wallet,
  Download,
  Printer,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  XCircle,
  Users,
  Building,
  Calculator,
  FileCheck,
  Settings,
  ChevronDown,
  ChevronUp,
  BarChart3,
  FileSpreadsheet,
  Mail,
  Send,
  CalendarDays,
  FilterX
} from "lucide-react";

const Admin_HR_Mgmt = () => {
    // Enhanced initial data with pay month and department
    const initialData = [
        {
            id: 1,
            payrollId: "PR001",
            employeeId: "EMP001",
            name: "John Doe",
            position: "Software Engineer",
            department: "Engineering",
            payingType: "Monthly",
            payMonth: "2024-01",
            basicSalary: 50000,
            hra: 15000,
            travelAllowance: 5000,
            medicalAllowance: 3000,
            transportation: 4000,
            bonus: 10000,
            overtime: 5000,
            grossSalary: 102000,
            tax: 15000,
            advanceSalary: 20000,
            netSalary: 87000,
            status: "Approved",
            joinDate: "2023-01-15",
            payrollStatus: "Processed"
        },
        {
            id: 2,
            payrollId: "PR002",
            employeeId: "EMP002",
            name: "Jane Smith",
            position: "Product Manager",
            department: "Product",
            payingType: "Quarterly",
            payMonth: "2024-Q1",
            basicSalary: 60000,
            hra: 18000,
            travelAllowance: 6000,
            medicalAllowance: 4000,
            transportation: 5000,
            bonus: 12000,
            overtime: 6000,
            grossSalary: 121000,
            tax: 18000,
            advanceSalary: 25000,
            netSalary: 98000,
            status: "Pending",
            joinDate: "2022-06-20",
            payrollStatus: "Pending"
        },
        {
            id: 3,
            payrollId: "PR003",
            employeeId: "EMP003",
            name: "Alice Johnson",
            position: "UX Designer",
            department: "Design",
            payingType: "Monthly",
            payMonth: "2024-01",
            basicSalary: 45000,
            hra: 13500,
            travelAllowance: 4500,
            medicalAllowance: 2500,
            transportation: 3500,
            bonus: 8000,
            overtime: 4000,
            grossSalary: 91000,
            tax: 12000,
            advanceSalary: 15000,
            netSalary: 79000,
            status: "Draft",
            joinDate: "2023-08-10",
            payrollStatus: "Draft"
        },
        {
            id: 4,
            payrollId: "PR004",
            employeeId: "EMP004",
            name: "Bob Martin",
            position: "Senior Developer",
            department: "Engineering",
            payingType: "Half Yearly",
            payMonth: "2024-H1",
            basicSalary: 70000,
            hra: 21000,
            travelAllowance: 7000,
            medicalAllowance: 5000,
            transportation: 6000,
            bonus: 15000,
            overtime: 7000,
            grossSalary: 141000,
            tax: 22000,
            advanceSalary: 30000,
            netSalary: 119000,
            status: "Approved",
            joinDate: "2021-03-05",
            payrollStatus: "Processed"
        },
        {
            id: 5,
            payrollId: "PR005",
            employeeId: "EMP005",
            name: "Clara Oswald",
            position: "HR Manager",
            department: "Human Resources",
            payingType: "Yearly",
            payMonth: "2024",
            basicSalary: 80000,
            hra: 24000,
            travelAllowance: 8000,
            medicalAllowance: 6000,
            transportation: 7000,
            bonus: 18000,
            overtime: 8000,
            grossSalary: 163000,
            tax: 25000,
            advanceSalary: 35000,
            netSalary: 138000,
            status: "Approved",
            joinDate: "2020-11-15",
            payrollStatus: "Processed"
        },
    ];

    // State management
    const [data, setData] = useState(initialData);
    const [filterText, setFilterText] = useState("");
    const [selectedPayingType, setSelectedPayingType] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [selectedDepartment, setSelectedDepartment] = useState("All");
    const [selectedPayMonth, setSelectedPayMonth] = useState("All");
    const [showSummary, setShowSummary] = useState(false);
    const [summaryData, setSummaryData] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [exportMenuOpen, setExportMenuOpen] = useState(false);
    const [reportType, setReportType] = useState("Monthly");
    const [reportPeriod, setReportPeriod] = useState("2024-01");
    const [showReportGenerator, setShowReportGenerator] = useState(false);
    const [selectedForApproval, setSelectedForApproval] = useState([]);

    // Pay month options
    const payMonths = ["All", "2024-01", "2024-02", "2024-Q1", "2024-Q2", "2024-H1", "2024"];

    // Columns configuration
    const columns = [
        {
            name: "Select",
            cell: row => (
                <input
                    type="checkbox"
                    checked={selectedForApproval.includes(row.id)}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setSelectedForApproval([...selectedForApproval, row.id]);
                        } else {
                            setSelectedForApproval(selectedForApproval.filter(id => id !== row.id));
                        }
                    }}
                    className="h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
            ),
            width: "70px",
            ignoreRowClick: true,
        },
        { 
            name: "Payroll ID", 
            selector: row => row.payrollId, 
            sortable: true,
            width: "120px",
            cell: row => (
                <div className="flex items-center gap-2">
                    <FileText size={14} className="text-amber-600" />
                    <span className="font-medium">{row.payrollId}</span>
                </div>
            )
        },
        { 
            name: "Employee", 
            selector: row => row.name, 
            sortable: true,
            width: "180px",
            cell: row => (
                <div>
                    <div className="font-medium text-gray-900">{row.name}</div>
                    <div className="text-sm text-gray-500">{row.employeeId}</div>
                </div>
            )
        },
        { 
            name: "Department", 
            selector: row => row.department, 
            sortable: true,
            width: "140px",
            cell: row => (
                <div className="flex items-center gap-2">
                    <Building size={14} className="text-amber-500" />
                    <span>{row.department}</span>
                </div>
            )
        },
        { 
            name: "Pay Month", 
            selector: row => row.payMonth, 
            sortable: true,
            width: "120px",
            cell: row => (
                <div className="flex items-center gap-2">
                    <CalendarDays size={14} className="text-amber-500" />
                    <span>{row.payMonth}</span>
                </div>
            )
        },
        { 
            name: "Gross", 
            selector: row => row.grossSalary, 
            sortable: true,
            width: "120px",
            cell: row => (
                <div className="font-medium text-amber-700">₹{row.grossSalary.toLocaleString()}</div>
            )
        },
        { 
            name: "Net", 
            selector: row => row.netSalary, 
            sortable: true,
            width: "120px",
            cell: row => (
                <div className="font-medium text-emerald-600">₹{row.netSalary.toLocaleString()}</div>
            )
        },
        { 
            name: "Status", 
            cell: row => {
                const statusConfig = {
                    "Approved": { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
                    "Pending": { icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
                    "Draft": { icon: AlertCircle, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
                    "Rejected": { icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" }
                };
                
                const config = statusConfig[row.status] || statusConfig.Pending;
                const Icon = config.icon;
                
                return (
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${config.bg} ${config.border}`}>
                        <Icon size={14} className={config.color} />
                        <span className={`text-sm font-medium ${config.color}`}>{row.status}</span>
                    </div>
                );
            },
            sortable: true,
            width: "120px"
        },
        {
            name: "Actions",
            cell: row => (
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => handleViewSummary(row)}
                        className="p-2 hover:bg-amber-50 rounded-lg transition-colors group"
                        title="View Details"
                    >
                        <Eye size={18} className="text-amber-600 group-hover:text-amber-700" />
                    </button>
                    <button
                        onClick={() => handleEdit(row.id)}
                        className="p-2 hover:bg-emerald-50 rounded-lg transition-colors group"
                        title="Edit"
                    >
                        <Edit2 size={18} className="text-emerald-600 group-hover:text-emerald-700" />
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        title="Delete"
                    >
                        <Trash2 size={18} className="text-red-600 group-hover:text-red-700" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical size={18} className="text-gray-500" />
                    </button>
                </div>
            ),
            width: "160px",
            ignoreRowClick: true,
            allowOverflow: true,
        },
    ];

    // Filter data based on search and filter criteria
    const filteredData = useMemo(() => {
        return data.filter(item => {
            const matchesSearch = 
                item.name.toLowerCase().includes(filterText.toLowerCase()) ||
                item.payrollId.toLowerCase().includes(filterText.toLowerCase()) ||
                item.employeeId.toLowerCase().includes(filterText.toLowerCase()) ||
                item.position.toLowerCase().includes(filterText.toLowerCase());
            
            const matchesPayingType = selectedPayingType === "All" || item.payingType === selectedPayingType;
            const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
            const matchesDepartment = selectedDepartment === "All" || item.department === selectedDepartment;
            const matchesPayMonth = selectedPayMonth === "All" || item.payMonth === selectedPayMonth;
            
            return matchesSearch && matchesPayingType && matchesStatus && matchesDepartment && matchesPayMonth;
        });
    }, [data, filterText, selectedPayingType, selectedStatus, selectedDepartment, selectedPayMonth]);

    // Get unique departments for filter
    const departments = useMemo(() => {
        const deptSet = new Set(data.map(item => item.department));
        return ["All", ...Array.from(deptSet)];
    }, [data]);

    // Summary calculations
    const summaryStats = useMemo(() => {
        const totalEmployees = filteredData.length;
        const totalGrossSalary = filteredData.reduce((sum, item) => sum + item.grossSalary, 0);
        const totalNetSalary = filteredData.reduce((sum, item) => sum + item.netSalary, 0);
        const totalTax = filteredData.reduce((sum, item) => sum + item.tax, 0);
        const totalBonus = filteredData.reduce((sum, item) => sum + item.bonus, 0);
        const totalOvertime = filteredData.reduce((sum, item) => sum + item.overtime, 0);
        const pendingPayments = filteredData.filter(item => item.status === "Pending").length;
        
        return {
            totalEmployees,
            totalGrossSalary,
            totalNetSalary,
            totalTax,
            totalBonus,
            totalOvertime,
            pendingPayments,
            averageNetSalary: totalEmployees > 0 ? Math.round(totalNetSalary / totalEmployees) : 0
        };
    }, [filteredData]);

    // Action handlers
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this payroll record?")) {
            setData(prevData => prevData.filter(item => item.id !== id));
        }
    };

    const handleEdit = (id) => {
        // In a real app, you would navigate to an edit form or open a modal
        alert(`Edit payroll record with ID: ${id}`);
        console.log("Edit record:", id);
    };

    const handleViewSummary = (row) => {
        setSummaryData(row);
        setShowSummary(true);
    };

    const handleCloseSummary = () => {
        setShowSummary(false);
        setSummaryData(null);
    };

    const resetFilters = () => {
        setFilterText("");
        setSelectedPayingType("All");
        setSelectedStatus("All");
        setSelectedDepartment("All");
        setSelectedPayMonth("All");
    };

    const handleExport = (type) => {
        alert(`Exporting ${reportType} report as ${type}`);
        setExportMenuOpen(false);
    };

    const handleGenerateReport = () => {
        alert(`Generating ${reportType} report for ${reportPeriod}`);
        // In real app, generate and download report
    };

    const handleApprovePayroll = () => {
        if (selectedForApproval.length === 0) {
            alert("Please select payroll records to approve");
            return;
        }
        
        const confirmed = window.confirm(`Approve ${selectedForApproval.length} selected payroll records?`);
        if (confirmed) {
            setData(prevData => 
                prevData.map(item => 
                    selectedForApproval.includes(item.id) 
                        ? { ...item, status: "Approved", payrollStatus: "Processed" }
                        : item
                )
            );
            setSelectedForApproval([]);
            alert("Selected payroll records approved successfully!");
        }
    };

    const handleCalculateGross = () => {
        // Calculate gross salary for all records
        setData(prevData => 
            prevData.map(item => ({
                ...item,
                grossSalary: item.basicSalary + item.hra + item.travelAllowance + 
                           item.medicalAllowance + item.transportation + 
                           item.bonus + item.overtime,
                netSalary: (item.basicSalary + item.hra + item.travelAllowance + 
                          item.medicalAllowance + item.transportation + 
                          item.bonus + item.overtime) - (item.tax + item.advanceSalary)
            }))
        );
        alert("Gross and Net salaries recalculated for all records!");
    };

    const handleProcessExceptions = () => {
        alert("Opening payroll exceptions management...");
        // In real app, open exceptions management modal
    };

    // Custom styles for the table with Amber theme
    const customStyles = {
        headCells: {
            style: {
                backgroundColor: "#fffbeb", // Amber-50
                color: "#78350f", // Amber-900
                fontWeight: "600",
                fontSize: "13px",
                padding: "16px 12px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                borderBottom: "2px solid #fbbf24", // Amber-400
            },
        },
        cells: {
            style: {
                padding: "16px 12px",
                fontSize: "14px",
                borderBottom: "1px solid #fef3c7", // Amber-100
            },
        },
        rows: {
            style: {
                minHeight: "64px",
                '&:hover': {
                    backgroundColor: "#fffbeb", // Amber-50
                },
            },
            stripedStyle: {
                backgroundColor: "#fef3c7", // Amber-100
            },
        },
        pagination: {
            style: {
                borderTop: "2px solid #fbbf24", // Amber-400
                padding: "20px 12px",
                fontSize: "14px",
                backgroundColor: "#fffbeb", // Amber-50
            },
        },
    };

    return (
        <div 
            className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 md:p-6 max-w-7xl mx-auto"
            style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
        >
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-amber-900 flex items-center gap-3">
                            <CreditCard className="text-amber-600" size={32} />
                            HR Payroll Management System
                        </h1>
                        <p className="text-amber-700 mt-2">Manage salaries, generate reports, and process payroll</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        <button 
                            onClick={handleCalculateGross}
                            className="flex items-center gap-2 px-4 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg transition-colors border border-amber-300"
                        >
                            <Calculator size={18} />
                            <span>Calculate Gross</span>
                        </button>
                        <button 
                            onClick={handleProcessExceptions}
                            className="flex items-center gap-2 px-4 py-2.5 bg-red-100 hover:bg-red-200 text-red-900 rounded-lg transition-colors border border-red-300"
                        >
                            <Settings size={18} />
                            <span>Exceptions</span>
                        </button>
                        <button 
                            onClick={() => setShowReportGenerator(!showReportGenerator)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                        >
                            <BarChart3 size={18} />
                            <span>Generate Report</span>
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-amber-600">Total Employees</p>
                                <p className="text-2xl font-bold text-amber-900 mt-1">{summaryStats.totalEmployees}</p>
                            </div>
                            <div className="p-3 bg-amber-100 rounded-lg">
                                <Users className="text-amber-600" size={24} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-amber-600">Total Gross Salary</p>
                                <p className="text-2xl font-bold text-amber-700 mt-1">
                                    ₹{summaryStats.totalGrossSalary.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-amber-100 rounded-lg">
                                <DollarSign className="text-amber-600" size={24} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-amber-600">Pending Approvals</p>
                                <p className="text-2xl font-bold text-amber-600 mt-1">{summaryStats.pendingPayments}</p>
                            </div>
                            <div className="p-3 bg-amber-100 rounded-lg">
                                <FileCheck className="text-amber-600" size={24} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-amber-600">Avg. Net Salary</p>
                                <p className="text-2xl font-bold text-emerald-600 mt-1">
                                    ₹{summaryStats.averageNetSalary.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-emerald-100 rounded-lg">
                                <CreditCard className="text-emerald-600" size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Report Generator */}
            {showReportGenerator && (
                <div className="mb-6 bg-white rounded-xl shadow-sm border border-amber-200 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                            <BarChart3 size={20} />
                            Generate Payroll Report
                        </h3>
                        <button 
                            onClick={() => setShowReportGenerator(false)}
                            className="p-1 hover:bg-amber-50 rounded-lg"
                        >
                            <X size={20} className="text-amber-600" />
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-amber-700 mb-2">
                                Report Type
                            </label>
                            <select
                                value={reportType}
                                onChange={e => setReportType(e.target.value)}
                                className="w-full px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                <option value="Monthly">Monthly Report</option>
                                <option value="Quarterly">Quarterly Report</option>
                                <option value="Yearly">Yearly Report</option>
                                <option value="Department">Department-wise</option>
                                <option value="Employee">Employee-wise</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-amber-700 mb-2">
                                Report Period
                            </label>
                            <select
                                value={reportPeriod}
                                onChange={e => setReportPeriod(e.target.value)}
                                className="w-full px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                <option value="2024-01">January 2024</option>
                                <option value="2024-02">February 2024</option>
                                <option value="2024-Q1">Q1 2024</option>
                                <option value="2024-Q2">Q2 2024</option>
                                <option value="2024">Full Year 2024</option>
                            </select>
                        </div>
                        
                        <div className="flex items-end gap-3">
                            <button
                                onClick={handleGenerateReport}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                            >
                                <FileSpreadsheet size={18} />
                                Generate
                            </button>
                            <button
                                onClick={() => handleExport("PDF")}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                                <Download size={18} />
                                PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Approval Section */}
            {selectedForApproval.length > 0 && (
                <div className="mb-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <FileCheck size={24} />
                            <div>
                                <p className="font-semibold">{selectedForApproval.length} payroll records selected</p>
                                <p className="text-sm text-amber-100">Ready for approval</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedForApproval([])}
                                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                            >
                                Clear Selection
                            </button>
                            <button
                                onClick={handleApprovePayroll}
                                className="px-4 py-2 bg-white text-amber-700 hover:bg-amber-50 rounded-lg font-semibold transition-colors flex items-center gap-2"
                            >
                                <Send size={18} />
                                Approve Selected
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters and Search Bar */}
            <div className="mb-6 bg-white rounded-xl shadow-sm border border-amber-200 p-4 md:p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Search Bar */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search employees, payroll IDs, departments..."
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-3 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg transition-colors border border-amber-300"
                        >
                            {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            <Filter size={18} />
                            <span className="hidden sm:inline">Filters</span>
                            {(selectedPayingType !== "All" || selectedStatus !== "All" || selectedDepartment !== "All" || selectedPayMonth !== "All") && (
                                <span className="bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    4
                                </span>
                            )}
                        </button>

                        <button
                            onClick={resetFilters}
                            className="flex items-center gap-2 px-4 py-3 text-amber-600 hover:text-amber-800 border border-amber-300 hover:border-amber-400 rounded-lg transition-colors"
                        >
                            <FilterX size={18} />
                            <span className="hidden sm:inline">Clear All</span>
                        </button>

                        <div className="relative">
                            <button 
                                onClick={() => setExportMenuOpen(!exportMenuOpen)}
                                className="flex items-center gap-2 px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                            >
                                <Download size={18} />
                                <span className="hidden sm:inline">Export</span>
                            </button>
                            
                            {exportMenuOpen && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-40" 
                                        onClick={() => setExportMenuOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-amber-200 z-50">
                                        <button 
                                            onClick={() => handleExport("PDF")}
                                            className="w-full px-4 py-3 text-left hover:bg-amber-50 rounded-t-lg text-amber-900"
                                        >
                                            Export as PDF
                                        </button>
                                        <button 
                                            onClick={() => handleExport("Excel")}
                                            className="w-full px-4 py-3 text-left hover:bg-amber-50 text-amber-900"
                                        >
                                            Export as Excel
                                        </button>
                                        <button 
                                            onClick={() => handleExport("CSV")}
                                            className="w-full px-4 py-3 text-left hover:bg-amber-50 rounded-b-lg text-amber-900"
                                        >
                                            Export as CSV
                                        </button>
                                        <button 
                                            onClick={() => {
                                                alert("Salary slips sent via email!");
                                                setExportMenuOpen(false);
                                            }}
                                            className="w-full px-4 py-3 text-left hover:bg-amber-50 rounded-b-lg text-amber-900 border-t"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Mail size={16} />
                                                Email Slips
                                            </div>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                    <div className="mt-6 pt-6 border-t border-amber-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {/* Pay Month Filter */}
                            <div>
                                <label className="block text-sm font-medium text-amber-700 mb-2 flex items-center gap-2">
                                    <CalendarDays size={16} />
                                    Pay Month
                                </label>
                                <select
                                    value={selectedPayMonth}
                                    onChange={e => setSelectedPayMonth(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                    {payMonths.map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Department Filter */}
                            <div>
                                <label className="block text-sm font-medium text-amber-700 mb-2 flex items-center gap-2">
                                    <Building size={16} />
                                    Department
                                </label>
                                <select
                                    value={selectedDepartment}
                                    onChange={e => setSelectedDepartment(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                    {departments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div>
                                <label className="block text-sm font-medium text-amber-700 mb-2 flex items-center gap-2">
                                    <Shield size={16} />
                                    Status
                                </label>
                                <select
                                    value={selectedStatus}
                                    onChange={e => setSelectedStatus(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                    <option value="All">All Status</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            {/* Paying Type Filter */}
                            <div>
                                <label className="block text-sm font-medium text-amber-700 mb-2 flex items-center gap-2">
                                    <Calendar size={16} />
                                    Payment Cycle
                                </label>
                                <select
                                    value={selectedPayingType}
                                    onChange={e => setSelectedPayingType(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                    <option value="All">All Cycles</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Half Yearly">Half Yearly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden">
                <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[5, 10, 20, 50]}
                    highlightOnHover
                    striped
                    responsive
                    customStyles={customStyles}
                    noDataComponent={
                        <div className="py-12 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                                <Search className="text-amber-600" size={24} />
                            </div>
                            <h3 className="text-lg font-medium text-amber-900 mb-2">No payroll records found</h3>
                            <p className="text-amber-600">Try adjusting your search or filters</p>
                        </div>
                    }
                />
            </div>

            {/* Summary Modal */}
            {showSummary && summaryData && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 p-6 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                    <FileText className="text-amber-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-amber-900">Salary Breakdown</h3>
                                    <p className="text-amber-700">{summaryData.name} • {summaryData.position}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCloseSummary}
                                className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
                            >
                                <X size={24} className="text-amber-600" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                            {/* Employee Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-amber-50 rounded-xl">
                                <div>
                                    <p className="text-sm text-amber-600">Employee ID</p>
                                    <p className="font-medium">{summaryData.employeeId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-amber-600">Department</p>
                                    <p className="font-medium">{summaryData.department}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-amber-600">Pay Month</p>
                                    <p className="font-medium">{summaryData.payMonth}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Earnings */}
                                <div>
                                    <h4 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                                        <TrendingUp className="text-emerald-600" size={20} />
                                        Earnings & Allowances
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 hover:bg-amber-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <DollarSign size={16} className="text-amber-500" />
                                                <span>Basic Salary</span>
                                            </div>
                                            <span className="font-semibold">₹{summaryData.basicSalary.toLocaleString()}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center p-3 hover:bg-amber-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Shield size={16} className="text-blue-500" />
                                                <span>House Rent Allowance</span>
                                            </div>
                                            <span className="font-semibold">₹{summaryData.hra.toLocaleString()}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center p-3 hover:bg-amber-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Plane size={16} className="text-purple-500" />
                                                <span>Travel Allowance</span>
                                            </div>
                                            <span className="font-semibold">₹{summaryData.travelAllowance.toLocaleString()}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center p-3 hover:bg-amber-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Stethoscope size={16} className="text-emerald-500" />
                                                <span>Medical Allowance</span>
                                            </div>
                                            <span className="font-semibold">₹{summaryData.medicalAllowance.toLocaleString()}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center p-3 hover:bg-amber-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Car size={16} className="text-orange-500" />
                                                <span>Transportation</span>
                                            </div>
                                            <span className="font-semibold">₹{summaryData.transportation.toLocaleString()}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center p-3 hover:bg-amber-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Award size={16} className="text-yellow-500" />
                                                <span>Bonus / Incentive</span>
                                            </div>
                                            <span className="font-semibold text-emerald-600">₹{summaryData.bonus.toLocaleString()}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center p-3 hover:bg-amber-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Clock size={16} className="text-red-500" />
                                                <span>Overtime Amount</span>
                                            </div>
                                            <span className="font-semibold text-emerald-600">₹{summaryData.overtime.toLocaleString()}</span>
                                        </div>
                                        
                                        <div className="border-t border-amber-200 pt-4 mt-2">
                                            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg">
                                                <span className="font-bold text-lg text-amber-900">Gross Salary</span>
                                                <span className="font-bold text-xl text-amber-700">
                                                    ₹{summaryData.grossSalary.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Deductions */}
                                <div>
                                    <h4 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                                        <Percent className="text-red-600" size={20} />
                                        Deductions
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 hover:bg-amber-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Percent size={16} className="text-red-500" />
                                                <span>Tax / VAT</span>
                                            </div>
                                            <span className="font-semibold text-red-600">-₹{summaryData.tax.toLocaleString()}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center p-3 hover:bg-amber-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Wallet size={16} className="text-orange-500" />
                                                <span>Advance Salary</span>
                                            </div>
                                            <span className="font-semibold text-red-600">-₹{summaryData.advanceSalary.toLocaleString()}</span>
                                        </div>
                                        
                                        <div className="border-t border-amber-200 pt-4 mt-2">
                                            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg mb-6">
                                                <span className="font-bold text-lg text-red-900">Total Deductions</span>
                                                <span className="font-bold text-xl text-red-600">
                                                    -₹{(summaryData.tax + summaryData.advanceSalary).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Final Summary */}
                                        <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-semibold text-gray-700">Payroll ID:</span>
                                                    <span className="font-bold">{summaryData.payrollId}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-semibold text-gray-700">Status:</span>
                                                    <span className={`font-semibold ${
                                                        summaryData.status === "Approved" ? "text-emerald-600" :
                                                        summaryData.status === "Pending" ? "text-amber-600" :
                                                        summaryData.status === "Draft" ? "text-blue-600" :
                                                        "text-red-600"
                                                    }`}>
                                                        {summaryData.status}
                                                    </span>
                                                </div>
                                                <div className="pt-4 border-t border-emerald-200">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-bold text-xl">Net Salary Payable</span>
                                                        <span className="font-bold text-2xl text-emerald-600">
                                                            ₹{summaryData.netSalary.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-white border-t border-amber-200 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="text-sm text-amber-600">
                                Last updated: {new Date().toLocaleDateString()}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={handleCloseSummary}
                                    className="px-6 py-2.5 border border-amber-300 hover:bg-amber-50 rounded-lg transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        handleEdit(summaryData.id);
                                        handleCloseSummary();
                                    }}
                                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <Edit2 size={18} />
                                    Edit Details
                                </button>
                                <button
                                    onClick={() => alert("Payroll processed successfully!")}
                                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <Send size={18} />
                                    Process Payroll
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin_HR_Mgmt;