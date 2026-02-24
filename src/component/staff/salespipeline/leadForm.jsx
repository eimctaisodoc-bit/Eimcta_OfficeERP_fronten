import React from "react";
import { X, UserPlus, Briefcase, Building2 } from "lucide-react";
import { useState } from "react";
import Select from "react-select";

const customSelectStyles = (hasError) => ({
    control: (base, state) => ({
        ...base,
        minHeight: "52px",
        border: hasError
            ? "2px solid #ef4444"
            : state.isFocused
                ? "2px solid #f59e0b"
                : "1px solid #e2e8f0",
        borderRadius: "14px",
        backgroundColor: "#f8fafc", // Slightly off-white for depth
        boxShadow: state.isFocused
            ? hasError
                ? "0 0 0 4px rgba(239, 68, 68, 0.1)"
                : "0 0 0 4px rgba(245, 158, 11, 0.1)"
            : "none",
        "&:hover": {
            borderColor: hasError ? "#ef4444" : "#f59e0b",
            backgroundColor: "white",
        },
        transition: "all 0.3s ease",
    }),
    menu: (base) => ({
        ...base,
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        padding: "4px",
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? "#f59e0b" : state.isFocused ? "#fffbeb" : "transparent",
        color: state.isSelected ? "white" : "#334155",
        borderRadius: "10px",
        marginBlock: "2px",
        cursor: "pointer",
        "&:active": { backgroundColor: "#fbbf24" },
    }),
});

const LeadType = [{ label: "Cold Call", value: "cold_call" }, { label: "Referral", value: "referral" }, { label: "Digital Marketing", value: "digital_marketing" }];
const LeadSource = [{ label: "Cold Call", value: "cold_call" }, { label: "Referral", value: "referral" }, { label: "Digital Marketing", value: "digital_marketing" }];
const Lead = [{ label: "Cold Call", value: "cold_call" }, { label: "Referral", value: "referral" }, { label: "Digital Marketing", value: "digital_marketing" }];
const LeadChannel = [{ label: "WhatsApp", value: "whatsapp" }, { label: "Facebook", value: "facebook" }, { label: "Email", value: "email" }];





const LeadForm = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('lead');

    const [leadData, setLeadData] = useState({
        leadId: 'LD_0001',
        leadType: null,
        leadSource: null,
        leadChannel: null,
        campaignName: '',
        assignedSalesRep: '',
        productInterest: null,
        notes: ''
    });

    const [orgData, setOrgData] = useState({
        organizationName: '',
        registrationNumber: '',
        vatPanNumber: '',
        organizationAddress: '',
        serviceStandards: '',
        totalEmployees: '',
        educators: '',
        contactFullName: '',
        contactRole: '',
        contactNumber: '',
        contactEmail: ''
    });

    const handleInputChange = (eOrOption, tabName, fieldName) => {
        // native input event
        if (eOrOption && eOrOption.target) {


            const { name, value } = eOrOption.target;
            if (tabName === 'lead') {
                setLeadData(prev => ({ ...prev, [name]: value }));
                setLeadErrors(prev => ({ ...prev, [name]: '' }));
            }
            if (tabName === 'org') {
                setOrgData(prev => ({ ...prev, [name]: value }));
                setOrgErrors(prev => ({ ...prev, [name]: '' }));
            }
            return;
        }

        // react-select option (object) - fieldName required
        if (tabName === 'lead') {
            setLeadData(prev => ({ ...prev, [fieldName]: eOrOption }));
            setLeadErrors(prev => ({ ...prev, [fieldName]: '' }));
        } else if (tabName === 'org') {
            setOrgData(prev => ({ ...prev, [fieldName]: eOrOption }));
            setOrgErrors(prev => ({ ...prev, [fieldName]: '' }));
        }
    };
    const [leadErrors, setLeadErrors] = useState({});
    const [orgErrors, setOrgErrors] = useState({});

    const validateField = (name, value, tab) => {
        let error = '';

        const isEmpty = (v) => {
            if (v === null || v === undefined) return true;
            if (typeof v === 'object') return Object.keys(v).length === 0;
            return String(v).trim() === '';
        };

        // Required check for all fields
        if (isEmpty(value)) {
            error = 'This field is required';
        }

        // Email validation
        if (!error && name && name.toLowerCase().includes('email')) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) error = 'Enter a valid email';
        }

        // Numeric fields validation
        if (!error && ['contactNumber', 'totalEmployees', 'educators'].includes(name)) {
            if (!/^\d+$/.test(String(value))) error = 'Enter a valid number';
        }

        if (tab === 'lead') setLeadErrors(prev => ({ ...prev, [name]: error }));
        else setOrgErrors(prev => ({ ...prev, [name]: error }));
        return error;
    };

    const validateAll = () => {
        // list all lead fields to validate
        const leadFields = ['leadType', 'leadSource', 'leadChannel', 'campaignName', 'assignedSalesRep', 'productInterest', 'notes', 'leadId'];
        const orgFields = ['organizationName', 'registrationNumber', 'vatPanNumber', 'organizationAddress', 'serviceStandards', 'totalEmployees', 'educators', 'contactFullName', 'contactRole', 'contactNumber', 'contactEmail'];

        const errors = [];

        leadFields.forEach((f) => {
            const val = leadData[f];
            errors.push(validateField(f, val, 'lead'));
        });

        orgFields.forEach((f) => {
            const val = orgData[f];
            errors.push(validateField(f, val, 'org'));
        });

        const hasError = errors.some(Boolean);
        return !hasError;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateAll()) return;
        // submit payload
        const payload = { lead: leadData, organization: orgData };
        console.log('Submitting lead payload', payload);
        localStorage.setItem('newLead', JSON.stringify(payload));
        onClose && onClose();
    };
    console.log('Lead Errors:', leadErrors);
    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4 animate-in fade-in duration-300">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 md:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/30 text-white flex justify-center items-center hover:bg-white/50 transition-all hover:rotate-90 z-50"
            >
                <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            <div className="w-full max-w-5xl relative">
                <div className="max-h-[85vh] sm:max-h-[90vh] overflow-y-auto custom-scrollbar" style={{ fontFamily: "'Roboto Slab', serif" }}>
                    <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl border border-slate-100 overflow-hidden">

                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 sm:p-6 md:p-8">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 flex-wrap">
                                <UserPlus size={24} className="sm:w-7 sm:h-7" /> Create New Lead
                            </h2>
                            <p className="text-orange-100 text-xs sm:text-sm mt-2">Capture prospect details and organization profile below.</p>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex border-b border-slate-100 bg-slate-50/50">
                            <button
                                onClick={() => setActiveTab('lead')}
                                className={`flex-1 py-3 sm:py-4 px-3 sm:px-4 md:px-6 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1 sm:gap-2 flex-wrap ${activeTab === 'lead'
                                    ? "bg-white text-orange-600 border-b-2 border-orange-600"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                                    }`}
                            >
                                <Briefcase size={16} className="sm:w-5 sm:h-5" /> Lead Info
                            </button>
                            <button
                                onClick={() => setActiveTab('org')}
                                className={`flex-1 py-3 sm:py-4 px-3 sm:px-4 md:px-6 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1 sm:gap-2 flex-wrap ${activeTab === 'org'
                                    ? "bg-white text-orange-600 border-b-2 border-orange-600"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                                    }`}
                            >
                                <Building2 size={16} className="sm:w-5 sm:h-5" /> Organization
                            </button>
                        </div>

                        <form className="p-4 sm:p-6 md:p-8" onSubmit={handleSubmit}>
                            {/* TAB 1: LEAD INFORMATION */}
                            {activeTab === 'lead' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 animate-in slide-in-from-left-4 duration-300">
                                    <div className="flex flex-col gap-1.5 sm:gap-2">
                                        <label className="text-xs sm:text-sm font-semibold text-slate-700">Lead ID</label>
                                        <input type="text" name="leadId" value={leadData.leadId} placeholder="LD_0001" disabled className="p-2 sm:p-3 text-sm bg-slate-50 border border-slate-200 rounded-md italic text-slate-400 cursor-not-allowed" />
                                    </div>

                                    <div className="flex flex-col gap-1.5 sm:gap-2">
                                        <label className="text-xs sm:text-sm font-semibold text-slate-700">Lead Type</label>
                                        <Select
                                            name="leadType"
                                            value={leadData.leadType}
                                            options={LeadType}
                                            styles={customSelectStyles(!!leadErrors.leadType)}
                                            onChange={(option) => { handleInputChange(option, 'lead', 'leadType'); validateField('leadType', option, 'lead'); }}
                                        />
                                        {leadErrors.leadType && <p className="mt-1 text-xs text-red-500">{leadErrors.leadType}</p>}
                                    </div>
                                    <div className="flex flex-col gap-1.5 sm:gap-2">
                                        <label className="text-xs sm:text-sm font-semibold text-slate-700">Lead Source</label>
                                        <Select
                                            name="leadSource"
                                            value={leadData.leadSource}
                                            options={LeadType}
                                            styles={customSelectStyles(!!leadErrors.leadSource)}
                                            onChange={(option) => { handleInputChange(option, 'lead', 'leadSource'); validateField('leadSource', option, 'lead'); }}
                                        />
                                        {leadErrors.leadSource && <p className="mt-1 text-xs text-red-500">{leadErrors.leadSource}</p>}
                                    </div>
                                    <div className="flex flex-col gap-1.5 sm:gap-2">
                                        <label className="text-xs sm:text-sm font-semibold text-slate-700">Lead Channel</label>
                                        <Select
                                            name="leadChannel"
                                            value={leadData.leadChannel}
                                            options={LeadChannel}
                                            styles={customSelectStyles(!!leadErrors.leadChannel)}
                                            onChange={(option) => { handleInputChange(option, 'lead', 'leadChannel'); validateField('leadChannel', option, 'lead'); }}
                                        />
                                        {leadErrors.leadChannel && <p className="mt-1 text-xs text-red-500">{leadErrors.leadChannel}</p>}
                                    </div>
                                    <div className="flex flex-col gap-1.5 sm:gap-2">
                                        <label className="text-xs sm:text-sm font-semibold text-slate-700">Campaign Name</label>
                                        <input type="text" name="campaignName" value={leadData.campaignName} placeholder="e.g. FB_Jan_2026" className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${leadErrors.campaignName ? 'border-2 border-red-500' : 'border border-slate-100'}`} onChange={(e) => handleInputChange(e, 'lead')} onBlur={(e) => validateField(e.target.name, e.target.value, 'lead')} />
                                        {leadErrors.campaignName && <p className="mt-1 text-xs text-red-500">{leadErrors.campaignName}</p>}
                                    </div>
                                    <div className="flex flex-col gap-1.5 sm:gap-2">
                                        <label className="text-xs sm:text-sm font-semibold text-slate-700">Assigned Sales Rep</label>
                                        <input type="text" name="assignedSalesRep" value={leadData.assignedSalesRep} placeholder="Staff Name / ID" className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${leadErrors.assignedSalesRep ? 'border-2 border-red-500' : 'border border-slate-100'}`} onChange={(e) => handleInputChange(e, 'lead')} onBlur={(e) => validateField(e.target.name, e.target.value, 'lead')} />
                                        {leadErrors.assignedSalesRep && <p className="mt-1 text-xs text-red-500">{leadErrors.assignedSalesRep}</p>}
                                    </div>
                                    <div className="flex flex-col gap-1.5 sm:gap-2">
                                        <label className="text-xs sm:text-sm font-semibold text-slate-700">Product/Service Interested</label>
                                        <Select
                                            name='productInterest'
                                            value={leadData.productInterest}
                                            options={Lead}
                                            styles={customSelectStyles(!!leadErrors.productInterest)}
                                            onChange={(option) => { handleInputChange(option, 'lead', 'productInterest'); validateField('productInterest', option, 'lead'); }}

                                        // onChange={(option) => {
                                        //     console.log("OPTION =", option);
                                        // }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5 sm:gap-2 sm:col-span-2">
                                        <label className="text-xs sm:text-sm font-semibold text-slate-700">Notes / Comments</label>
                                        <textarea rows="3" name="notes" value={leadData.notes} placeholder="Additional remarks..." className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${leadErrors.notes ? 'border-2 border-red-500' : 'border border-slate-100'}`} onChange={(e) => handleInputChange(e, 'lead')} onBlur={(e) => validateField(e.target.name, e.target.value, 'lead')} />
                                        {leadErrors.notes && <p className="mt-1 text-xs text-red-500">{leadErrors.notes}</p>}
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: ORGANIZATION DETAILS */}
                            {activeTab === 'org' && (
                                <div className="animate-in slide-in-from-right-4 duration-300 space-y-6 sm:space-y-8">
                                    {/* Company Section */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="sm:col-span-2 border-l-4 border-amber-500 pl-3 py-1 bg-amber-50/50">
                                            <h3 className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wider">Company Profile</h3>
                                        </div>

                                        <div className="flex flex-col gap-1.5 sm:gap-2 sm:col-span-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Organization Name</label>
                                            <input type="text" name="organizationName" value={orgData.organizationName} placeholder="Legal Entity Name" className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.organizationName ? 'border-2 border-red-500' : 'border border-slate-100'}`} onChange={(e) => handleInputChange(e, 'org')} onBlur={(e) => validateField(e.target.name, e.target.value, 'org')} />
                                            {orgErrors.organizationName && <p className="mt-1 text-xs text-red-500">{orgErrors.organizationName}</p>}
                                        </div>

                                        <div className="flex flex-col gap-1.5 sm:gap-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Registration Number</label>
                                            <input type="text" name="registrationNumber" value={orgData.registrationNumber} placeholder="e.g. REG123456" className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.registrationNumber ? 'border-2 border-red-500' : 'border border-slate-100'}`} onChange={(e) => handleInputChange(e, 'org')} onBlur={(e) => validateField(e.target.name, e.target.value, 'org')} />
                                            {orgErrors.registrationNumber && <p className="mt-1 text-xs text-red-500">{orgErrors.registrationNumber}</p>}
                                        </div>

                                        <div className="flex flex-col gap-1.5 sm:gap-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">VAT / PAN Number</label>
                                            <input type="text" name="vatPanNumber" value={orgData.vatPanNumber} placeholder="e.g. VAT1234567890" className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.vatPanNumber ? 'border-2 border-red-500' : 'border border-slate-100'}`} onChange={(e) => handleInputChange(e, 'org')} onBlur={(e) => validateField(e.target.name, e.target.value, 'org')} />
                                            {orgErrors.vatPanNumber && <p className="mt-1 text-xs text-red-500">{orgErrors.vatPanNumber}</p>}
                                        </div>

                                        <div className="flex flex-col gap-1.5 sm:gap-2 sm:col-span-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Organization Address</label>
                                            <input type="text" name="organizationAddress" value={orgData.organizationAddress} 
                                            placeholder="Full Street Address, City, Country" 
                                            className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 ${!orgErrors.organizationAddress ? 'focus:ring-amber-500 outline-none' : ''} focus:outline-none ${orgErrors.organizationAddress ? 'border-2 border-red-500' : 'border border-slate-100'}`} onChange={(e) => handleInputChange(e, 'org')} onBlur={(e) => validateField(e.target.name, e.target.value, 'org')} />
                                            {orgErrors.organizationAddress && <p className="mt-1 text-xs text-red-500">{orgErrors.organizationAddress}</p>}
                                        </div>
                                        <div className="flex flex-col gap-1.5 sm:gap-2 sm:col-span-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Type of Service / Standards</label>
                                            <input type="text" name="serviceStandards" value={orgData.serviceStandards} placeholder="e.g. ISO, Corporate Training" className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.serviceStandards ? 'border-2 border-red-500' : 'border border-slate-100'}`} onChange={(e) => handleInputChange(e, 'org')} onBlur={(e) => validateField(e.target.name, e.target.value, 'org')} />
                                            {orgErrors.serviceStandards && <p className="mt-1 text-xs text-red-500">{orgErrors.serviceStandards}</p>}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:col-span-2">
                                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                                <label className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase">Total Employees</label>
                                                <input type="number" name="totalEmployees" value={orgData.totalEmployees} className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.totalEmployees ? 'border-2 border-red-500' : 'border border-slate-100'}`} onChange={(e) => handleInputChange(e, 'org')} onBlur={(e) => validateField(e.target.name, e.target.value, 'org')} />
                                                {orgErrors.totalEmployees && <p className="mt-1 text-xs text-red-500">{orgErrors.totalEmployees}</p>}
                                            </div>
                                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                                <label className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase">Educators</label>
                                                <input type="number" name="educators" value={orgData.educators} className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.educators ? 'border-2 border-red-500' : 'border border-slate-100'}`} onChange={(e) => handleInputChange(e, 'org')} onBlur={(e) => validateField(e.target.name, e.target.value, 'org')} />
                                                {orgErrors.educators && <p className="mt-1 text-xs text-red-500">{orgErrors.educators}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Person Section */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-slate-100">
                                        <div className="sm:col-span-2 border-l-4 border-orange-500 pl-3 py-1 bg-orange-50/50">
                                            <h3 className="text-xs sm:text-sm font-bold text-orange-800 uppercase tracking-wider">Primary Contact Person</h3>
                                        </div>
                                        <div className="flex flex-col gap-1.5 sm:gap-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Full Name</label>
                                            <input type="text" name="contactFullName" value={orgData.contactFullName} placeholder="John Doe"
                                                className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.contactFullName ? 'border-2 border-red-500' : 'border border-slate-100'}`}
                                                onChange={(e) => handleInputChange(e, 'org')}
                                                onBlur={(e) => validateField(e.target.name, e.target.value, 'org')}
                                            />
                                            {orgErrors.contactFullName && <p className="mt-1 text-xs text-red-500">{orgErrors.contactFullName}</p>}
                                        </div>
                                        <div className="flex flex-col gap-1.5 sm:gap-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Role / Position</label>
                                            <input type="text" name="contactRole" value={orgData.contactRole} placeholder="e.g. Director, HR Manager" className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.contactRole ? 'border-2 border-red-500' : 'border border-slate-100'}`} onChange={(e) => handleInputChange(e, 'org')} onBlur={(e) => validateField(e.target.name, e.target.value, 'org')} />
                                            {orgErrors.contactRole && <p className="mt-1 text-xs text-red-500">{orgErrors.contactRole}</p>}
                                        </div>
                                        <div className="flex flex-col gap-1.5 sm:gap-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Contact Number</label>
                                            <input type="tel" name="contactNumber" value={orgData.contactNumber} placeholder="+123 456 7890" className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.contactNumber ? 'border-2 border-red-500' : 'border border-slate-100'}`} onChange={(e) => handleInputChange(e, 'org')} onBlur={(e) => validateField(e.target.name, e.target.value, 'org')} />
                                            {orgErrors.contactNumber && <p className="mt-1 text-xs text-red-500">{orgErrors.contactNumber}</p>}
                                        </div>
                                        <div className="flex flex-col gap-1.5 sm:gap-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Email Address</label>
                                            <input type="email" name="contactEmail" value={orgData.contactEmail} placeholder="john@organization.com" className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.contactEmail ? 'border-2 border-red-500' : 'border border-slate-100'}`} onChange={(e) => handleInputChange(e, 'org')} onBlur={(e) => validateField(e.target.name, e.target.value, 'org')} />
                                            {orgErrors.contactEmail && <p className="mt-1 text-xs text-red-500">{orgErrors.contactEmail}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-slate-100">
                                <button type="button" onClick={onClose} className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm border border-slate-200 text-slate-600 rounded-md hover:bg-slate-100 transition-colors font-semibold">
                                    Cancel
                                </button>
                                <button type="submit" className="px-6 sm:px-10 py-2.5 sm:py-3 text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-md shadow-lg shadow-amber-200 transition-all transform active:scale-95">
                                    Save Lead & Organization
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LeadForm;