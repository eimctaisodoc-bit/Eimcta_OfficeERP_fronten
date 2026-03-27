import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
    Users,
    Calendar,
    Clock,
    DollarSign,
    FileText,
    Briefcase,
    CheckCircle,
    XCircle,
    Edit2,
    Trash2,
    User,
    UserPlus,
    Building,
    Target,
    AlertCircle,
    CheckSquare,
    X
} from "lucide-react";

export const Policies = () => {
    // API States
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [hasApiData, setHasApiData] = useState(false);

    // Leave Types State - Now with API data priority
    const [leaveTypes, setLeaveTypes] = useState([
        { id: 1, name: "Annual Leave", maxDays: 21, documentRequired: true, approval: "auto" },
        { id: 2, name: "Sick Leave", maxDays: 14, documentRequired: true, approval: "hr" },
        { id: 3, name: "Casual Leave", maxDays: 7, documentRequired: false, approval: "admin" },
        { id: 4, name: "Study / Training Leave", maxDays: 30, documentRequired: true, approval: "hr" },
    ]);

    // Work Hours State
    const [workHours, setWorkHours] = useState({
        startTime: "09:00",
        endTime: "18:00",
        breakDuration: 60,
        breakStartTime: "13:00",
        breakEndTime: "14:00",
        workWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
    });

    // Overtime State
    const [overtimeRules, setOvertimeRules] = useState({
        normalRate: 1.0,
        overtimeRate: 1.5,
        doubleRate: 2.0,
        weekendRate: 2.5,
        holidayRate: 3.0,
        dailyCap: 4,
        weeklyCap: 20,
        weekCount: 7
    });

    // Payroll State
    const [payroll, setPayroll] = useState({
        cycle: "monthly",
        paymentDate: '',
        taxRate: 15,
        vatRate: 10,
        bonusEnabled: true,
        deductionEnabled: true
    });
console.log('payroll date :',payroll)
    // Projects State
    const [projects, setProjects] = useState({
        statusOptions: ["Planning", "Active", "On Hold", "Completed", "Cancelled"],
        priorityLevels: [
            { label: "Critical", value: "critical", color: "#ef4444" },
            { label: "High", value: "high", color: "#f97316" },
            { label: "Medium", value: "medium", color: "#eab308" },
            { label: "Low", value: "low", color: "#22c55e" }
        ],
        projectsList: [
            {
                id: 1,
                name: "Website Redesign",
                status: "Active",
                priority: "high",
                deadline: "2024-06-15",
                progress: 65,
                handlePerson: "Alex Johnson",
                team: "Frontend Team",
                department: "Engineering",
                organization: "TechCorp Inc.",
                avatarColor: "bg-blue-500",
                startDate: "2024-01-15",
                budget: "$50,000",
                members: 8
            },
            {
                id: 2,
                name: "Mobile App Development",
                status: "Active",
                priority: "medium",
                deadline: "2024-07-30",
                progress: 40,
                handlePerson: "Sarah Miller",
                team: "Mobile Team",
                department: "Product",
                organization: "Innovate Solutions",
                avatarColor: "bg-purple-500",
                startDate: "2024-02-01",
                budget: "$75,000",
                members: 12
            },
            {
                id: 3,
                name: "CRM Implementation",
                status: "Planning",
                priority: "critical",
                deadline: "2024-08-20",
                progress: 15,
                handlePerson: "Michael Chen",
                team: "Backend Team",
                department: "IT",
                organization: "Global Systems",
                avatarColor: "bg-green-500",
                startDate: "2024-03-10",
                budget: "$100,000",
                members: 15
            },
            {
                id: 4,
                name: "Server Migration",
                status: "Active",
                priority: "low",
                deadline: "2024-05-30",
                progress: 90,
                handlePerson: "David Wilson",
                team: "DevOps Team",
                department: "Operations",
                organization: "CloudTech Ltd",
                avatarColor: "bg-red-500",
                startDate: "2024-01-10",
                budget: "$30,000",
                members: 6
            }
        ]
    });

    // Task Priority State
    const [taskPriorities, setTaskPriorities] = useState([
        {
            id: 1,
            title: "Implement User Authentication",
            priority: "high",
            assignee: "John Doe",
            team: "Security Team",
            dueDate: "2024-05-15",
            status: "In Progress",
            tags: ["Security", "Backend", "API"],
            estimatedHours: 40
        },
        {
            id: 2,
            title: "Design Dashboard UI",
            priority: "medium",
            assignee: "Jane Smith",
            team: "Design Team",
            dueDate: "2024-05-20",
            status: "Pending",
            tags: ["UI/UX", "Frontend"],
            estimatedHours: 24
        },
        {
            id: 3,
            title: "Fix Payment Gateway Bug",
            priority: "critical",
            assignee: "Robert Kim",
            team: "Payment Team",
            dueDate: "2024-05-10",
            status: "Urgent",
            tags: ["Bug", "Payment", "Critical"],
            estimatedHours: 16
        },
        {
            id: 4,
            title: "Write Documentation",
            priority: "low",
            assignee: "Emily Brown",
            team: "Documentation",
            dueDate: "2024-05-30",
            status: "Not Started",
            tags: ["Docs", "Internal"],
            estimatedHours: 20
        }
    ]);

    // Select Options
    const approvalOptions = [
        { value: "auto", label: "Auto Approval" },
        { value: "admin", label: "Admin Approval" },
        { value: "hr", label: "HR Approval" },
        { value: "manager", label: "Manager Approval" },
        { value: "director", label: "Director Approval" }
    ];

    const documentOptions = [
        { value: true, label: "Compulsory" },
        { value: false, label: "Optional" }
    ];

    const payrollCycleOptions = [
        { value: "weekly", label: "Weekly" },
        { value: "biweekly", label: "Bi-Weekly" },
        { value: "monthly", label: "Monthly" },
        { value: "quarterly", label: "Quarterly" },
        { value: "yearly", label: "Yearly" }
    ];

    const weekDayOptions = [
        { value: "sun", label: "Sunday" },
        { value: "mon", label: "Monday" },
        { value: "tue", label: "Tuesday" },
        { value: "wed", label: "Wednesday" },
        { value: "thu", label: "Thursday" },
        { value: "fri", label: "Friday" },
        { value: "sat", label: "Saturday" }
    ];

    const rateOptions = Array.from({ length: 5 }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}x Rate`
    }));

    const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all text-slate-700 hover:border-amber-300";
    const selectClasses = "w-full";

    // Simulate API fetch on component mount (Replace with actual API call)
    useEffect(() => {
        // Uncomment and implement when API is ready
        /*
        const fetchPolicies = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/policies');
                const data = await response.json();
                if (data) {
                    setApiData(data);
                    setHasApiData(true);
                    // Initialize states with API data
                    initializeWithApiData(data);
                }
            } catch (error) {
                console.error('Error fetching policies:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchPolicies();
        */
    }, []);

    // Function to initialize states with API data
    const initializeWithApiData = (apiData) => {
        if (apiData.leaveTypes) {
            setLeaveTypes(apiData.leaveTypes);
        }
        if (apiData.workHours) {
            setWorkHours(apiData.workHours);
        }
        if (apiData.overtimeRules) {
            setOvertimeRules(apiData.overtimeRules);
        }
        if (apiData.payroll) {
            setPayroll(apiData.payroll);
        }
        if (apiData.projects) {
            setProjects(apiData.projects);
        }
        if (apiData.taskPriorities) {
            setTaskPriorities(apiData.taskPriorities);
        }
    };

    // Prepare data for API submission
    const prepareApiData = () => {
        return {
            leaveTypes,
            workHours,
            overtimeRules,
            payroll,
            projects: {
                ...projects,
                projectsList: projects.projectsList
            },
            taskPriorities,
            updatedAt: new Date().toISOString()
        };
    };

    // API submission handler (ready for implementation)
    const handleSaveAll = async () => {
        const dataToSave = prepareApiData();
        console.log('Data ready for API:', dataToSave);
        
        // Uncomment and implement when API is ready
        /*
        setIsLoading(true);
        try {
            const response = await fetch('/api/policies/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave)
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('Save successful:', result);
                // Show success message
                alert('Policies saved successfully!');
            } else {
                throw new Error('Failed to save policies');
            }
        } catch (error) {
            console.error('Error saving policies:', error);
            alert('Error saving policies. Please try again.');
        } finally {
            setIsLoading(false);
        }
        */
        
        // For now, just show alert
        alert('Policies are ready to be saved to API. Check console for data structure.');
    };

    // Handlers
    const handleLeaveTypeChange = (index, field, value) => {
        const updated = [...leaveTypes];
        updated[index][field] = value;
        console.log(updated[index][field])
        setLeaveTypes(updated);
    };

    const addLeaveType = () => {
        setLeaveTypes([
            ...leaveTypes,
            {
                id: leaveTypes.length + 1,
                name: "",
                maxDays: 0,
                documentRequired: false,
                approval: "auto"
            }
        ]);
    };

    const deleteLeaveType = (index) => {
        const updated = leaveTypes.filter((_, i) => i !== index);
        setLeaveTypes(updated);
    };

    const handleWorkHoursChange = (field, value) => {
        setWorkHours({
            ...workHours,
            [field]: value
        });
    };

    const handleOvertimeChange = (field, value) => {
        setOvertimeRules({
            ...overtimeRules,
            [field]: Math.min(2, Math.max(1, value))
        });
    };

    const handlePayrollChange = (field, value) => {
        console.log(value)
        setPayroll({
            ...payroll,
            [field]: value
        });
    };

    // Custom styles for react-select with amber theme
    const customStyles = {
        control: (base) => ({
            ...base,
            border: '1px solid #cbd5e1',
            borderRadius: '0.75rem',
            padding: '0.25rem',
            backgroundColor: 'white',
            '&:hover': {
                borderColor: '#fbbf24',
            },
            '&:focus-within': {
                borderColor: '#f59e0b',
                boxShadow: '0 0 0 4px rgba(251, 191, 36, 0.2)',
            }
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#fbbf24' : state.isFocused ? '#fef3c7' : 'white',
            color: state.isSelected ? '#ffffff' : '#1f2937',
            '&:active': {
                backgroundColor: '#f59e0b',
                color: '#ffffff'
            },
            '&:hover': {
                backgroundColor: '#fef3c7',
                color: '#1f2937'
            }
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: '#fef3c7',
            borderRadius: '0.5rem',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: '#92400e',
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: '#92400e',
            '&:hover': {
                backgroundColor: '#fbbf24',
                color: '#ffffff',
            },
        }),
    };

    return (
        <div className="min-h-screen bg-white p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header with API status indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <Briefcase className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900"> Policies </h1>
                                {hasApiData && (
                                    <div className="flex items-center gap-2 mt-1">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span className="text-sm text-green-600">Using API Data</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {isLoading && (
                            <div className="flex items-center gap-2 text-amber-600">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-600"></div>
                                <span className="text-sm">Loading...</span>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-600">Configure company policies, work rules, and project settings</p>
                </div>

                {/* Leave Types Section */}
                <div className="bg-white   p-6 mb-6 border-b-2 border-t-2 border-amber-100 ">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Leave Types</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {leaveTypes.map((leave, index) => (
                            <div key={leave.id} className="border border-slate-200 rounded-xl p-5 hover:border-amber-300 transition-all duration-300 bg-gradient-to-br from-white to-amber-50/30 hover:shadow-md">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-medium text-gray-900">Leave Type #{leave.id}</h3>
                                    <button
                                        onClick={() => deleteLeaveType(index)}
                                        className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                                        title="Delete leave type"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            Leave Name
                                        </label>
                                        <input
                                            type="text"
                                            value={leave.name}
                                            onChange={(e) => handleLeaveTypeChange(index, 'name', e.target.value)}
                                            className={inputClasses}
                                            placeholder="Enter leave name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            Max Days
                                        </label>
                                        <input
                                            type="number"
                                            value={leave.maxDays}
                                            onChange={(e) => handleLeaveTypeChange(index, 'maxDays', parseInt(e.target.value) || 0)}
                                            className={inputClasses}
                                            min="0"
                                            placeholder="Max days allowed"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Document Required
                                        </label>
                                        <Select
                                            options={documentOptions}
                                            value={documentOptions.find(opt => opt.value === leave.documentRequired)}
                                            onChange={(option) => handleLeaveTypeChange(index, 'documentRequired', option.value)}
                                            className={selectClasses}
                                            styles={customStyles}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Approval Workflow
                                        </label>
                                        <Select
                                            options={approvalOptions}
                                            value={approvalOptions.find(opt => opt.value === leave.approval)}
                                            onChange={(option) => handleLeaveTypeChange(index, 'approval', option.value)}
                                            className={selectClasses}
                                            styles={customStyles}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={addLeaveType}
                        className="mt-6 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                        <UserPlus className="w-4 h-4" />
                        Add Leave Type
                    </button>
                </div>

                {/* Work Hours Section */}
                <div className="bg-white  p-6 mb-6 border-b-2 border-amber-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Clock className="w-5 h-5 text-green-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Attendance Rules & Working Hours</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Time
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="time"
                                    value={workHours.startTime}
                                    onChange={(e) => handleWorkHoursChange('startTime', e.target.value)}
                                    className={`${inputClasses} pl-11`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Time
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="time"
                                    value={workHours.endTime}
                                    onChange={(e) => handleWorkHoursChange('endTime', e.target.value)}
                                    className={`${inputClasses} pl-11`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Break Duration (minutes)
                            </label>
                            <input
                                type="number"
                                value={workHours.breakDuration}
                                onChange={(e) => handleWorkHoursChange('breakDuration', parseInt(e.target.value) || 0)}
                                className={inputClasses}
                                min="0"
                                placeholder="Break in minutes"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Work Week
                            </label>
                            <Select
                                isMulti
                                options={weekDayOptions}
                                defaultValue={weekDayOptions.filter(day =>
                                    workHours.workWeek.includes(day.label.substring(0, 3))
                                )}
                                onChange={(selected) => handleWorkHoursChange('workWeek',
                                    selected.map(day => day.label.substring(0, 3))
                                )}
                                className={selectClasses}
                                styles={customStyles}
                            />
                        </div>
                    </div>
                </div>

                {/* Overtime Rules Section */}
                <div className="bg-white  p-6 mb-6 border-b-2 border-amber-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <DollarSign className="w-5 h-5 text-red-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Overtime Rules</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Normal Rate (1x - 5x)
                            </label>
                            <Select
                                options={rateOptions}
                                value={rateOptions.find(opt => opt.value === overtimeRules.normalRate)}
                                onChange={(option) => handleOvertimeChange('normalRate', option.value)}
                                className={selectClasses}
                                styles={customStyles}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Overtime Rate (1x - 5x)
                            </label>
                            <Select
                                options={rateOptions}
                                value={rateOptions.find(opt => opt.value === overtimeRules.overtimeRate)}
                                onChange={(option) => handleOvertimeChange('overtimeRate', option.value)}
                                className={selectClasses}
                                styles={customStyles}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Double Time Rate (1x - 5x)
                            </label>
                            <Select
                                options={rateOptions}
                                value={rateOptions.find(opt => opt.value === overtimeRules.doubleRate)}
                                onChange={(option) => handleOvertimeChange('doubleRate', option.value)}
                                className={selectClasses}
                                styles={customStyles}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Weekend Rate (1x - 5x)
                            </label>
                            <Select
                                options={rateOptions}
                                value={rateOptions.find(opt => opt.value === overtimeRules.weekendRate)}
                                onChange={(option) => handleOvertimeChange('weekendRate', option.value)}
                                className={selectClasses}
                                styles={customStyles}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Holiday Rate (1x - 5x)
                            </label>
                            <Select
                                options={rateOptions}
                                value={rateOptions.find(opt => opt.value === overtimeRules.holidayRate)}
                                onChange={(option) => handleOvertimeChange('holidayRate', option.value)}
                                className={selectClasses}
                                styles={customStyles}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Daily Overtime Cap (hours)
                            </label>
                            <input
                                type="number"
                                value={overtimeRules.dailyCap}
                                onChange={(e) => handleOvertimeChange('dailyCap', parseInt(e.target.value) || 0)}
                                className={inputClasses}
                                min="0"
                                placeholder="Max daily hours"
                            />
                        </div>
                    </div>
                </div>

                {/* Payroll Section */}
                <div className="bg-white  p-6 mb-6 border-b-2 border-amber-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <DollarSign className="w-5 h-5 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Payroll Settings</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Payroll Cycle
                            </label>
                            <Select
                                options={payrollCycleOptions}
                                value={payrollCycleOptions.find(opt => opt.value === payroll.cycle)}
                                onChange={(option) => handlePayrollChange('cycle', option.value)}
                                className={selectClasses}
                                styles={customStyles}
                              
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Payment Date
                            </label>
                            <input
                                type="date"
                                onChange={(e) => handlePayrollChange('paymentDate', e.target.value || new Date.now())}
                                className={inputClasses}
                                min="1"
                                max="31"
                                placeholder="Day of month"
                                
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tax Rate (%)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                value={payroll.taxRate}
                                onChange={(e) => handlePayrollChange('taxRate', parseFloat(e.target.value))}
                                className={inputClasses}
                                min="0"
                                placeholder="Tax percentage"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                VAT Rate (%)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                value={payroll.vatRate}
                                onChange={(e) => handlePayrollChange('vatRate', parseFloat(e.target.value))}
                                className={inputClasses}
                                min="0"
                                placeholder="VAT percentage"
                            />
                        </div>
                    </div>
                </div>

                {/* Projects Section with Task Priorities */}
             

                {/* Save Button */}
                <div className="flex justify-end gap-4">
                    <button className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium">
                        Cancel
                    </button>
                    <button 
                        onClick={handleSaveAll}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                    >
                        Save All Changes
                    </button>
                </div>
            </div>
        </div>
    );
};