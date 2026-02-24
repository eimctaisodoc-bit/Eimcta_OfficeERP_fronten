import React, { useState, useEffect } from "react";
import {
    CheckCircle2,
    FileText,
    User,
    Calendar,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    Check,
    ClipboardList,
    UploadCloud,
    Clock,
    Briefcase,
    AlertTriangle,
    X
} from "lucide-react";
import { motion } from "framer-motion";

const LeaveManagementForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        leaveId: "",
        employeeId: "",
        leaveType: "",
        leaveStartDate: "",
        leaveEndDate: "",
        totalLeaveDays: 0,
        leaveReason: "",
        attachment: null,
        approvedBy: "",
        approvalDate: ""
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Calculate leave days when start/end dates change
    useEffect(() => {
        if (formData.leaveStartDate && formData.leaveEndDate) {
            const start = new Date(formData.leaveStartDate);
            const end = new Date(formData.leaveEndDate);

            if (start <= end) {
                const timeDiff = end.getTime() - start.getTime();
                const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
                setFormData(prev => ({
                    ...prev,
                    totalLeaveDays: dayDiff > 0 ? dayDiff : 0
                }));
            }
        }
    }, [formData.leaveStartDate, formData.leaveEndDate]);

    // Auto-generate leave ID on mount
    useEffect(() => {
        const generateLeaveId = () => {
            const timestamp = Date.now().toString().slice(-6);
            const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            return `LV-${timestamp}-${random}`;
        };

        setFormData(prev => ({
            ...prev,
            leaveId: generateLeaveId()
        }));
    }, []);

    const validateField = (name, value) => {
        switch (name) {
            case "employeeId":
                return value ? "" : "Employee ID is required";
            case "leaveType":
                return value ? "" : "Leave type is required";
            case "leaveStartDate":
                if (!value) return "Start date is required";
                if (formData.leaveEndDate && new Date(value) > new Date(formData.leaveEndDate)) {
                    return "Start date cannot be after end date";
                }
                return "";
            case "leaveEndDate":
                if (!value) return "End date is required";
                if (formData.leaveStartDate && new Date(value) < new Date(formData.leaveStartDate)) {
                    return "End date cannot be before start date";
                }
                return "";
            case "totalLeaveDays":
                if (value <= 0) return "Leave days must be greater than 0";
                return "";
            case "leaveReason":
                if (!value.trim()) return "Reason is required";
                if (value.length < 10) return "Reason must be at least 10 characters";
                return "";
            case "approvedBy":
                if (!value.trim()) {
                    return "Approver name is required";
                }
                return "";
            case "approvalDate":
                if (!value) {
                    return "Approval date is required";
                }
                return "";
            default:
                return "";
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        const val = type === "file" ? files[0] : value;

        setFormData(prev => ({ ...prev, [name]: val }));

        if (touched[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: validateField(name, val)
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({
            ...prev,
            [name]: validateField(name, value)
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // All required fields including approval details
        const requiredFields = [
            "employeeId",
            "leaveType",
            "leaveStartDate",
            "leaveEndDate",
            "leaveReason",
            "approvedBy",
            "approvalDate"
        ];

        requiredFields.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log("Leave Application Submitted:", formData);
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-5">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border border-slate-200"
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                        <Check size={36} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Leave Application Submitted!</h2>
                    <p className="text-slate-600 mb-6">
                        Your leave request has been submitted successfully. You will be notified once it's reviewed.
                    </p>
                    <div className="space-y-4">
                        <div className="bg-slate-50 rounded-xl p-4 text-left">
                            <h3 className="font-semibold text-slate-700 mb-2">Application Details</h3>
                            <div className="space-y-1 text-sm">
                                <p><span className="font-medium">Leave ID:</span> {formData.leaveId}</p>
                                <p><span className="font-medium">Type:</span> {formData.leaveType}</p>
                                <p><span className="font-medium">Duration:</span> {formData.totalLeaveDays} days</p>
                                <p><span className="font-medium">Approved By:</span> {formData.approvedBy}</p>
                                <p><span className="font-medium">Approval Date:</span> {formData.approvalDate}</p>
                                <p><span className="font-medium">Status:</span>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${formData.approvalStatus === "Approved"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : formData.approvalStatus === "Rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-amber-100 text-amber-700"
                                        }`}>
                                        {formData.approvalStatus}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                setFormData({
                                    leaveId: `LV-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                                    employeeId: "",
                                    leaveType: "",
                                    leaveStartDate: "",
                                    leaveEndDate: "",
                                    totalLeaveDays: 0,
                                    leaveReason: "",
                                    attachment: null,
                                    approvalStatus: "Pending",
                                    approvedBy: "",
                                    approvalDate: ""
                                });
                                setErrors({});
                                setTouched({});
                            }}
                            className="w-full bg-gradient-to-br from-amber-500 to-amber-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300"
                        >
                            Submit Another Leave Request
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
       <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
    {/* Single scrollable container - removed nested scrolling */}
    <div className="w-full max-w-4xl md:rounded-2xl flex flex-col max-h-[90vh] overflow-hidden relative bg-white">
        
        {/* Header - Now properly sticky at the top of the modal */}
        <div className="sticky top-0 z-20 bg-gradient-to-br from-amber-500 to-amber-600 p-4 md:p-10 text-white flex-shrink-0">
            <div className="flex justify-end absolute top-4 right-4 z-30">
                <button 
                    className="text-white cursor-pointer hover:text-white/60 p-3 rounded-full bg-white/10 hover:rotate-90 transition-all duration-200" 
                    onClick={onClose}
                >
                    <X size={25} />
                </button>
            </div>
            
            <div className="flex flex-col lg:flex-row text-center lg:text-start md:text-start items-center gap-3 mb-2 max-w-5xl mx-auto">
                <div className="p-4 bg-white/20 rounded-lg">
                    <ClipboardList size={28} className="w-6 h-6 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" />
                </div>
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight leading-snug" style={{
                        fontFamily: "'Roboto Slab', serif",
                        fontWeight: 600,
                    }}>Leave Management</h1>
                    <span className="text-white/90 text-base md:text-lg mt-1" style={{
                        fontFamily: "'Roboto Slab', serif",
                        fontWeight: 400,
                    }}>
                        Apply for leave and manage your time off requests
                    </span>
                </div>
            </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
            <div className="max-w-5xl mx-auto p-4 md:p-8">
                <div className="bg-white  overflow-hidden">
                    
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8">
                        {/* Error Summary */}
                        {Object.values(errors).some(error => error) && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 bg-gradient-to-br from-red-50 to-red-50/50 border border-red-200 text-red-700 p-4 rounded-xl font-medium flex items-start gap-3 shadow-sm"
                            >
                                <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <span className="font-semibold" style={{
                                        fontFamily: "'Roboto Slab', serif",
                                        fontWeight: 500,
                                    }}>Please fix the following errors:</span>
                                    <ul className="mt-2 text-sm space-y-1" style={{
                                        fontFamily: "'Roboto Slab', serif",
                                        fontWeight: 300,
                                    }}>
                                        {Object.entries(errors).map(([field, error]) => (
                                            error && (
                                                <li key={field} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                                    <span>{field === "leaveReason" ? "Reason" : field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}: {error}</span>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}

                        {/* Leave Details Card */}
                        <div className="mb-2 bg-white rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                    <Calendar size={24} className="text-amber-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800" style={{
                                    fontFamily: "'Roboto Slab', serif",
                                    fontWeight: 600,
                                }}>Leave Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Leave ID */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Leave ID
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <FileText size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            name="leaveId"
                                            value={formData.leaveId}
                                            readOnly
                                            className="w-full py-3.5 pl-12 pr-4 rounded-xl border border-slate-300 bg-slate-50 text-slate-600 font-mono text-sm font-medium"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500">Auto-generated leave identifier</p>
                                </div>

                                {/* Employee ID */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
                                        Employee ID <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <User size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            name="employeeId"
                                            value={formData.employeeId}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter employee ID"
                                            className={`w-full py-3.5 pl-12 pr-4 rounded-xl border outline-none text-sm font-medium bg-white
                                                ${errors.employeeId && touched.employeeId ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}
                                            `}
                                        />
                                        {errors.employeeId && touched.employeeId && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <AlertCircle size={16} className="text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                    {errors.employeeId && touched.employeeId && (
                                        <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                                            <AlertCircle size={12} />
                                            {errors.employeeId}
                                        </p>
                                    )}
                                </div>

                                {/* Leave Type */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
                                        Leave Type <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="leaveType"
                                            value={formData.leaveType}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`w-full px-4 py-3.5 rounded-xl border bg-white outline-none text-sm font-medium appearance-none
                                                ${errors.leaveType && touched.leaveType ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}
                                            `}
                                        >
                                            <option value="">Select Leave Type</option>
                                            <option value="Annual">Annual Leave</option>
                                            <option value="Sick">Sick Leave</option>
                                            <option value="Casual">Casual Leave</option>
                                            <option value="Unpaid">Unpaid Leave</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                            <ChevronDown size={20} />
                                        </div>
                                        {errors.leaveType && touched.leaveType && (
                                            <div className="absolute right-10 top-1/2 -translate-y-1/2">
                                                <AlertCircle size={16} className="text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                    {errors.leaveType && touched.leaveType && (
                                        <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                                            <AlertCircle size={12} />
                                            {errors.leaveType}
                                        </p>
                                    )}
                                </div>

                                {/* Date Range */}
                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Start Date */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
                                            Start Date <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                <Calendar size={20} />
                                            </div>
                                            <input
                                                type="date"
                                                name="leaveStartDate"
                                                value={formData.leaveStartDate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`w-full py-3.5 pl-12 pr-4 rounded-xl border outline-none text-sm font-medium bg-white
                                                    ${errors.leaveStartDate && touched.leaveStartDate ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}
                                                `}
                                            />
                                        </div>
                                        {errors.leaveStartDate && touched.leaveStartDate && (
                                            <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                                                <AlertCircle size={12} />
                                                {errors.leaveStartDate}
                                            </p>
                                        )}
                                    </div>

                                    {/* End Date */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
                                            End Date <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                <Calendar size={20} />
                                            </div>
                                            <input
                                                type="date"
                                                name="leaveEndDate"
                                                value={formData.leaveEndDate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                min={formData.leaveStartDate}
                                                className={`w-full py-3.5 pl-12 pr-4 rounded-xl border outline-none text-sm font-medium bg-white
                                                    ${errors.leaveEndDate && touched.leaveEndDate ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}
                                                `}
                                            />
                                        </div>
                                        {errors.leaveEndDate && touched.leaveEndDate && (
                                            <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                                                <AlertCircle size={12} />
                                                {errors.leaveEndDate}
                                            </p>
                                        )}
                                    </div>

                                    {/* Total Leave Days */}
                                    <div className="space-y-2 border-amber-200">
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Total Leave Days
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                <Clock size={20} />
                                            </div>
                                            <input
                                                type="number"
                                                name="totalLeaveDays"
                                                value={formData.totalLeaveDays}
                                                readOnly
                                                disabled
                                                className="w-full py-3.5 pl-12 pr-4 rounded-xl border bg-slate-50 text-slate-600 font-semibold text-lg"
                                            />
                                        </div>
                                        <p className="text-xs text-slate-500">Calculated automatically</p>
                                    </div>
                                </div>

                                {/* Leave Reason */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
                                        Reason for Leave <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="leaveReason"
                                        value={formData.leaveReason}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Please provide a detailed reason for your leave request..."
                                        rows={3}
                                        className={`w-full p-4 rounded-xl border outline-none text-sm font-medium bg-white resize-none
                                            ${errors.leaveReason && touched.leaveReason ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}
                                        `}
                                    />
                                    <div className="flex justify-between items-center">
                                        {errors.leaveReason && touched.leaveReason && (
                                            <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                                                <AlertCircle size={12} />
                                                {errors.leaveReason}
                                            </p>
                                        )}
                                        <p className="text-xs text-slate-500 ml-auto">
                                            {formData.leaveReason.length}/500 characters
                                        </p>
                                    </div>
                                </div>

                                {/* Attachment */}
                                <div className="md:col-span-2">
                                    <FileUploadField
                                        label="Supporting Document (Optional)"
                                        name="attachment"
                                        file={formData.attachment}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Approval Details Card */}
                        <div className="mb-10 bg-gradient-to-br from-amber-50/50 to-amber-50/30 border border-amber-100 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                    <CheckCircle2 size={24} className="text-amber-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800" style={{
                                    fontFamily: "'Roboto Slab', serif",
                                    fontWeight: 600,
                                }}>Approval Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Approved By - Now always required */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
                                        Approved By <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Briefcase size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            name="approvedBy"
                                            value={formData.approvedBy}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter approver name"
                                            className={`w-full py-3.5 pl-12 pr-4 rounded-xl border outline-none text-sm font-medium bg-white
                                                ${errors.approvedBy && touched.approvedBy ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}
                                            `}
                                        />
                                        {errors.approvedBy && touched.approvedBy && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <AlertCircle size={16} className="text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                    {errors.approvedBy && touched.approvedBy && (
                                        <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                                            <AlertCircle size={12} />
                                            {errors.approvedBy}
                                        </p>
                                    )}
                                </div>

                                {/* Approval Date - Now always required */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
                                        Approval Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Calendar size={20} />
                                        </div>
                                        <input
                                            type="date"
                                            name="approvalDate"
                                            value={formData.approvalDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`w-full py-3.5 pl-12 pr-4 rounded-xl border outline-none text-sm font-medium bg-white
                                                ${errors.approvalDate && touched.approvalDate ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}
                                            `}
                                        />
                                    </div>
                                    {errors.approvalDate && touched.approvalDate && (
                                        <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                                            <AlertCircle size={12} />
                                            {errors.approvalDate}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center" style={{
                            fontFamily: "'Roboto Slab', serif",
                            fontWeight: 600,
                        }}>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full md:w-auto bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-12 py-4 rounded-xl font-bold shadow-lg shadow-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Submitting Leave Request...
                                    </>
                                ) : (
                                    <>
                                        <ClipboardList size={22} />
                                        Submit Leave Application
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Quick Tips */}
                        <div className="mt-10 pt-8 border-t border-slate-100">
                            <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                <AlertTriangle size={20} className="text-amber-500 mt-1 flex-shrink-0" />
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-slate-700" style={{
                                        fontFamily: "'Roboto Slab', serif",
                                        fontWeight: 600,
                                    }}>Important Notes</h3>
                                    <ul className="text-sm text-slate-700 space-y-1" style={{
                                        fontFamily: "'Roboto Slab', serif",
                                        fontWeight: 400,
                                    }}>
                                        <li>• Submit leave requests at least 3 days in advance for approval</li>
                                        <li>• All required fields marked with * must be completed</li>
                                        <li>• Upload supporting documents for sick leave applications</li>
                                        <li>• Approval details (Approver and Date) are required for submission</li>
                                        <li>• You will be notified via email once your request is reviewed</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

const FileUploadField = ({ label, name, file, onChange }) => (
    <div className={`p-6 border-2 border-dashed rounded-2xl text-center transition-all cursor-pointer group
        ${file
            ? 'bg-gradient-to-br from-emerald-50/80 to-emerald-50/50 border-emerald-300'
            : 'bg-white border-slate-300 hover:border-amber-400 hover:bg-amber-50/30'
        }`}
    >
        <label className="cursor-pointer block">
            <div className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center transition-all ${file ? 'bg-emerald-100' : 'bg-slate-100 group-hover:bg-amber-100'
                }`}>
                <UploadCloud className={`${file ? 'text-emerald-600' : 'text-slate-400 group-hover:text-amber-500'}`} size={24} />
            </div>
            <p className="text-base font-bold text-slate-800 mb-1">{label}</p>
            <p className="text-sm text-slate-500 mb-4">Max file size: 5MB (PDF, JPG, PNG)</p>
            <input
                type="file"
                name={name}
                onChange={onChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
            />
            {file && (
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg">
                    <Check size={16} />
                    <span className="text-sm font-medium truncate max-w-xs">{file.name}</span>
                </div>
            )}
        </label>
    </div>
);

const ChevronDown = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m6 9 6 6 6-6" />
    </svg>
);

export default LeaveManagementForm;