import React, { useState } from "react";
import { X, UserPlus, Briefcase, Building2, Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Select from "react-select";
import { getInputClass, ValidateStyle } from "../../../data/data";
import { UseAdd } from "../../hooks/useadd";
import { ErrorNotify, SuccessNotify } from "../../hotToaster";

const leadType = [
    { label: "Inbound (Client Contacted You)", value: "inbound" },
    { label: "Outbound (You Contacted Client)", value: "outbound" },
    { label: "Cold Lead", value: "cold_lead" },
    { label: "Warm Lead", value: "warm_lead" },
    { label: "Hot Lead", value: "hot_lead" },
    { label: "Existing Client", value: "existing_client" },
    { label: "Referred Lead", value: "referred_lead" },
];

const LeadSource = [
    { label: "Website", value: "website" },
    { label: "Facebook", value: "facebook" },
    { label: "TikTok", value: "tiktok" },
    { label: "Instagram", value: "instagram" },
    { label: "Email Campaign", value: "email_campaign" },
    { label: "Cold Calling", value: "cold_calling" },
    { label: "Partner / Consultant", value: "partner_consultant" },
    { label: "Referral", value: "referral" },
    { label: "Digital Marketing", value: "digital_marketing" },
];

const BusinessRole = [
    { label: "Owner / Founder", value: "owner_founder" },
    { label: "CEO / Managing Director", value: "ceo_md" },
    { label: "Director", value: "director" },
    { label: "General Manager", value: "general_manager" },
    { label: "Operations Manager", value: "operations_manager" },
    { label: "Quality Manager", value: "quality_manager" },
    { label: "HR Manager", value: "hr_manager" },
    { label: "Safety Officer / HSE Manager", value: "hse_manager" },
    { label: "IT Manager", value: "it_manager" },
    { label: "Finance / Accounts Manager", value: "finance_manager" },
    { label: "Procurement / Purchase Manager", value: "procurement_manager" },
    { label: "Project Manager", value: "project_manager" },
    { label: "Supervisor / Team Leader", value: "supervisor_team_lead" },
    { label: "Chairman / Chairperson", value: "chairman" },
    { label: "Other", value: "other" },
];

const LeadChannel = [
    { label: "Client Phone Call", value: "client_phone_call" },
    { label: "EIMCTA Phone Call", value: "eimcta_phone_call" },
    { label: "WhatsApp", value: "whatsapp" },
    { label: "Messanger", value: "messanger" },
    { label: "Referral", value: "referral" },
    { label: "BoostingFB", value: "boostingfb" },
    { label: "Email", value: "email" },
    { label: "Google Form", value: "googleForm" },
    { label: "LinkedIn", value: "linkedin" },
    { label: "TikTok", value: "tiktok" },
    { label: "Instrgram", value: "instagram" },
    { label: "Youtube", value: "youtube" },
    { label: "In-Person Meeting", value: "in_person_meeting" },

];

const organizationType = [
    { label: "Private Limited", value: "private_limited" },
    { label: "Government", value: "government" },
    { label: "NGO / Non-Profit", value: "ngo_non_profit" },
    { label: "Community-Based Organization", value: "community_based_organization" },
    { label: "Public-Private Partnership (PPP)", value: "ppp" },
    { label: "Semi-Government Organization", value: "semi_government" },
];

const servicesInterested = [
    { label: "ISO 9001:2015 QMS (Quality Management System)", value: "iso9001", color: "#3b82f6" },
    { label: "ISO 14001:2015 EMS (Environmental Management System)", value: "iso14001", color: "#10b981" },
    { label: "ISO 45001:2018 OHSMS (Occupational Health & Safety Management System)", value: "iso45001", color: "#ef4444" },
    { label: "ISO 27001:2022 ISMS (Information Security Management System)", value: "iso27001", color: "#f59e0b" },
    { label: "ISO 22000:2018 FSMS (Food Safety Management System)", value: "iso22000", color: "#f97316" },
    { label: "HACCP Certification (Hazard Analysis & Critical Control Points)", value: "haccp", color: "#ea580c" },
    { label: "HALAL Certification", value: "halal", color: "#16a34a" },
    { label: "ISO 15189:2022 Medical Laboratory QMS", value: "iso15189", color: "#8b5cf6" },
    { label: "GMP (Good Manufacturing Practices)", value: "gmp", color: "#0ea5e9" },
    { label: "ISO 50001:2018 EnMS (Energy Management System)", value: "iso50001", color: "#06b6d4" },
    { label: "ISO 21001:2025 EOMS (Educational Organizations Management System)", value: "iso21001", color: "#6366f1" },
    { label: "ISO 55001:2024 Asset Management System", value: "iso55001", color: "#64748b" },
    { label: "ISO 41001:2018 Facility Management System", value: "iso41001", color: "#475569" },
    { label: "SMETA Sedex Audits", value: "smeta", color: "#ec4899" },
    { label: "RBA Compliance", value: "rba", color: "#1e3a8a" },
    { label: "CE Marking (Conformité Européenne)", value: "ce_marking", color: "#1d4ed8" },
    { label: "ISO 26000:2010 Social Responsibility Guidance", value: "iso26000", color: "#d946ef" },
    { label: "Training Programs", value: "training_programs", color: "#f43f5e" },
    { label: "Third Party Audits", value: "third_party_audits", color: "#000000" },
];

const provinceOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
];

const BranchName = [
    { label: "Kathmandu", value: "kathmandu" },
    { label: "Lalitpur", value: "lalitpur" },
    { label: "Bhaktapur", value: "bhaktapur" },
    { label: "Pokhara", value: "pokhara" },
    { label: "Itahari", value: "itahari" },
    { label: "Hetauda", value: "hetauda" },
    { label: "Biratnagar", value: "biratnagar" },
    { label: "Dharan", value: "dharan" },
    { label: "Butwal", value: "butwal" },
    { label: "Chitwan (Bharatpur)", value: "chitwan" },
    { label: "Nepalgunj", value: "nepalgunj" },
    { label: "Dhangadhi", value: "dhangadhi" },
    { label: "Birgunj", value: "birgunj" },
    { label: "Janakpur", value: "janakpur" },
    { label: "Ghorahi (Dang)", value: "ghorahi" },
    { label: "Birendranagar (Surkhet)", value: "birendranagar" },
];

const industries = [
    { label: "IT", value: "it", color: "#3b82f6" },
    { label: "Education", value: "education", color: "#8b5cf6" },
    { label: "Travel & Tourism", value: "travel_tourism", color: "#06b6d4" },
    { label: "Manufacturing", value: "manufacturing", color: "#f59e0b" },
    { label: "Healthcare", value: "healthcare", color: "#ef4444" },
    { label: "Construction", value: "construction", color: "#f97316" },
    { label: "Trading", value: "trading", color: "#84cc16" },
    { label: "Consultancy", value: "consultancy", color: "#6366f1" },
    { label: "Food & Beverage", value: "food_beverage", color: "#ea580c" },
    { label: "Hospitality (Hotels/Resorts)", value: "hospitality", color: "#ec4899" },
    { label: "Logistics & Transportation", value: "logistics", color: "#0ea5e9" },
    { label: "Energy & Utilities", value: "energy", color: "#22c55e" },
    { label: "Financial Services", value: "finance", color: "#14b8a6" },
];

const initialLeadData = {
    leadType: null,
    leadSource: null,
    leadChannel: null,
    campaignName: "",
    assignedSalesRep: "",
    ProductInterested: [],
    notes: "",
    branch: null,
    province: null,
    salesManager: "",
    note_comments: "",
};

const initialOrgData = {
    organizationName: "",
    organizationType: null,
    industyType: [],
    registrationNumber: "",
    vatPan: "",
    address: "",
    totalEmp_learners: "",
    totalEducator: "",
    contactPersonName: "",
    role: null,
    contactPersonNumber: "",
    contactPersonEmail: "",
};

const LeadForm = ({ onClose }) => {
    const { addOrgLeadDetails } = UseAdd();
    const [activeTab, setActiveTab] = useState("lead");
    const [submitError, setSubmitError] = useState("");

    const [leadData, setLeadData] = useState(initialLeadData);
    const [orgData, setOrgData] = useState(initialOrgData);

    const [leadErrors, setLeadErrors] = useState({});
    const [orgErrors, setOrgErrors] = useState({});

    const isEducationService = leadData.ProductInterested?.some(item => item.value === "iso21001");

    const isEmpty = (value) => {
        if (value === null || value === undefined) return true;
        if (typeof value === "string") return value.trim() === "";
        if (Array.isArray(value)) return value.length === 0;
        return false;
    };

    const requiredLeadFields = [
        "leadType",
        "leadSource",
        "leadChannel",
        "campaignName",
        "assignedSalesRep",
        "ProductInterested",
        "notes",
        "branch",
        "province",
        "salesManager",
    ];

    const requiredOrgFields = [
        "organizationName",
        "organizationType",
        "industyType",
        "registrationNumber",
        "vatPan",
        "address",
        "totalEmp_learners",
        "contactPersonName",
        "role",
        "contactPersonNumber",
        "contactPersonEmail",
    ];

    const setTabErrors = (tab, name, error) => {
        if (tab === "lead") {
            setLeadErrors((prev) => ({ ...prev, [name]: error }));
        } else {
            setOrgErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleInputChange = (eOrOption, tabName, fieldName) => {
        if (eOrOption?.target) {
            const { name, value } = eOrOption.target;

            if (tabName === "lead") {
                setLeadData((prev) => ({ ...prev, [name]: value }));
                setLeadErrors((prev) => ({ ...prev, [name]: "" }));
            } else {
                setOrgData((prev) => ({ ...prev, [name]: value }));
                setOrgErrors((prev) => ({ ...prev, [name]: "" }));
            }
            return;
        }

        if (tabName === "lead") {
            setLeadData((prev) => ({ ...prev, [fieldName]: eOrOption }));
            setLeadErrors((prev) => ({ ...prev, [fieldName]: "" }));
        } else {
            setOrgData((prev) => ({ ...prev, [fieldName]: eOrOption }));
            setOrgErrors((prev) => ({ ...prev, [fieldName]: "" }));
        }
    };

    const validateField = (name, value, tab) => {
        let error = "";
        const isRequired =
            tab === "lead"
                ? requiredLeadFields.includes(name)
                : requiredOrgFields.includes(name);

        if (isRequired && isEmpty(value)) {
            error = "This field is required";
        }

        if (!error && name === "contactPersonEmail" && !isEmpty(value)) {
            const email = String(value).trim();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                error = "Enter a valid email";
            }
        }

        if (!error && name === "contactPersonNumber" && !isEmpty(value)) {
            if (!/^\d{7,15}$/.test(String(value).trim())) {
                error = "Enter a valid contact number";
            }
        }

        if (!error && name === "totalEmp_learners" && !isEmpty(value)) {
            if (!/^\d+$/.test(String(value).trim())) {
                error = "Enter a valid number";
            }
        }

        if (!error && name === "totalEducator" && !isEducationService) {
            setTabErrors(tab, name, "");
            return "";
        }

        if (!error && name === "totalEducator" && !isEmpty(value)) {
            if (!/^\d+$/.test(String(value).trim())) {
                error = "Enter a valid number";
            }
        }

        setTabErrors(tab, name, error);
        return error;
    };

    const validateLead = () => {
        const fields = [
            "leadType",
            "leadSource",
            "leadChannel",
            "campaignName",
            "assignedSalesRep",
            "ProductInterested",
            "notes",
            "branch",
            "province",
            "salesManager",
            "note_comments",
        ];

        const errors = fields.map((field) =>
            validateField(field, leadData[field], "lead")
        );
        return !errors.some(Boolean);
    };

    const validateOrg = () => {
        const fields = [
            "organizationName",
            "organizationType",
            "industyType",
            "registrationNumber",
            "vatPan",
            "address",
            "totalEmp_learners",
            "totalEducator",
            "contactPersonName",
            "role",
            "contactPersonNumber",
            "contactPersonEmail",
        ];

        if (!isEducationService) {
            const index = fields.indexOf("totalEducator");
            if (index > -1) fields.splice(index, 1);
        }

        const errors = fields.map((field) =>
            validateField(field, orgData[field], "org")
        );
        return !errors.some(Boolean);
    };

    const normalizePayload = () => {
        return {
            lead: {
                leadType: leadData.leadType?.value || "",
                leadSource: leadData.leadSource?.value || "",
                leadChannel: leadData.leadChannel?.value || "",
                campaignName: leadData.campaignName.trim(),
                assignedSalesRep: leadData.assignedSalesRep.trim(),
                ProductInterested: Array.isArray(leadData.ProductInterested)
                    ? leadData.ProductInterested.map((item) => item.value)
                    : [],
                notes: leadData.notes.trim(),
                branch: leadData.branch?.value || "",
                province: leadData.province?.value || "",
                salesManager: leadData.salesManager.trim(),
                note_comments: leadData.note_comments.trim(),
            },
            organization: {
                organizationName: orgData.organizationName.trim(),
                organizationType: orgData.organizationType?.value || "",
                industyType: Array.isArray(orgData.industyType)
                    ? orgData.industyType.map((item) => item.value)
                    : [],
                registrationNumber: orgData.registrationNumber.trim(),
                vatPan: orgData.vatPan.trim(),
                address: orgData.address.trim(),
                totalEmp_learners: orgData.totalEmp_learners === ""
                    ? null
                    : Number(orgData.totalEmp_learners),
                totalEducator: orgData.totalEducator === ""
                    ? null
                    : Number(orgData.totalEducator),
                contactPersonName: orgData.contactPersonName.trim(),
                role: orgData.role?.value || "",
                contactPersonNumber: orgData.contactPersonNumber.trim(),
                contactPersonEmail: orgData.contactPersonEmail.trim(),
            },
        };
    };

    const resetForm = () => {
        setLeadData(initialLeadData);
        setOrgData(initialOrgData);
        setLeadErrors({});
        setOrgErrors({});
        setSubmitError("");
        setActiveTab("lead");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        const leadValid = validateLead();
        const orgValid = validateOrg();

        if (!leadValid) {
            setActiveTab("lead");
            return;
        }

        if (!orgValid) {
            setActiveTab("org");
            return;
        }

        const payload = normalizePayload();
        console.log('Payload',payload)
        try {
            await addOrgLeadDetails.mutateAsync(payload);
            console.log("Submitted payload:", payload);
            resetForm();
            // onClose?.();
            SuccessNotify('Lead Created Successfully ')
        } catch (error) {
            console.error("Error adding lead:", error);
            ErrorNotify(error?.response?.data?.message ||
                error?.message)
            setSubmitError(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to submit form"
            );
        }
    };

    const isSubmitting = addOrgLeadDetails?.isPending;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute cursor-pointer top-2 sm:top-4 right-2 sm:right-4 md:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/30 text-white flex justify-center items-center hover:bg-white/50 transition-all hover:rotate-90 z-[60]"
                >
                    <X size={20} className="sm:w-6 sm:h-6" />
                </button>

                <motion.div
                    initial={{ opacity: 0, y: -90, scale: 0.86 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -90, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="w-full max-w-5xl relative"
                >
                    <div
                        className="max-h-[85vh] sm:max-h-[90vh] overflow-y-auto custom-scrollbar rounded-lg sm:rounded-xl"
                        style={{ fontFamily: "'Roboto Slab', serif" }}
                    >
                        <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl border border-slate-100 overflow-hidden">
                            <div className="sticky top-0 z-30 bg-gradient-to-r from-amber-500 to-orange-600 p-4 sm:p-6 md:p-8 shadow-sm">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 flex-wrap">
                                    <UserPlus size={24} className="sm:w-7 sm:h-7" /> Create New Lead
                                </h2>
                                <p className="text-orange-100 text-xs sm:text-sm mt-2">
                                    Capture prospect details and organization profile below.
                                </p>
                            </div>

                            <div className="sticky top-[84px] sm:top-[104px] md:top-[116px] z-20 flex border-b border-slate-100 bg-slate-50/95 backdrop-blur-sm">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("lead")}
                                    className={`flex-1 py-3 sm:py-4 px-3 sm:px-4 md:px-6 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1 sm:gap-2 flex-wrap ${activeTab === "lead"
                                        ? "bg-white text-orange-600 border-b-2 border-orange-600"
                                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                                        }`}
                                >
                                    <Briefcase size={16} className="sm:w-5 sm:h-5" /> Lead Info
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setActiveTab("org")}
                                    className={`flex-1 py-3 sm:py-4 px-3 sm:px-4 md:px-6 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1 sm:gap-2 flex-wrap ${activeTab === "org"
                                        ? "bg-white text-orange-600 border-b-2 border-orange-600"
                                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                                        }`}
                                >
                                    <Building2 size={16} className="sm:w-5 sm:h-5" /> Organization
                                </button>
                            </div>

                            <form className="p-4 sm:p-6 md:p-8" onSubmit={handleSubmit} noValidate>
                                {submitError && (
                                    <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                        {submitError}
                                    </div>
                                )}

                                {activeTab === "lead" && (
                                    <motion.div
                                        key="lead-tab"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -12 }}
                                        transition={{ duration: 0.25 }}
                                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                                    >
                                        <div className="flex flex-col gap-1.5 sm:gap-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                Lead Type <span className="text-red-500">*</span>
                                            </label>
                                            <Select
                                                name="leadType"
                                                value={leadData.leadType}
                                                options={leadType}
                                                styles={ValidateStyle(!!leadErrors.leadType)}
                                                onChange={(option) => {
                                                    handleInputChange(option, "lead", "leadType");
                                                    validateField("leadType", option, "lead");
                                                }}
                                            />
                                            {leadErrors.leadType && <p className="mt-1 text-xs text-red-500">{leadErrors.leadType}</p>}
                                        </div>

                                        <div className="flex flex-col gap-1.5 sm:gap-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                Lead Source <span className="text-red-500">*</span>
                                            </label>
                                            <Select
                                                name="leadSource"
                                                value={leadData.leadSource}
                                                options={LeadSource}
                                                styles={ValidateStyle(!!leadErrors.leadSource)}
                                                onChange={(option) => {
                                                    handleInputChange(option, "lead", "leadSource");
                                                    validateField("leadSource", option, "lead");
                                                }}
                                            />
                                            {leadErrors.leadSource && <p className="mt-1 text-xs text-red-500">{leadErrors.leadSource}</p>}
                                        </div>

                                        <div className="flex flex-col gap-1.5 sm:gap-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                Lead Channel <span className="text-red-500">*</span>
                                            </label>
                                            <Select
                                                name="leadChannel"
                                                value={leadData.leadChannel}
                                                options={LeadChannel}
                                                styles={ValidateStyle(!!leadErrors.leadChannel)}
                                                onChange={(option) => {
                                                    handleInputChange(option, "lead", "leadChannel");
                                                    validateField("leadChannel", option, "lead");
                                                }}
                                            />
                                            {leadErrors.leadChannel && <p className="mt-1 text-xs text-red-500">{leadErrors.leadChannel}</p>}
                                        </div>

                                        <div className="flex flex-col gap-1.5 sm:gap-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                Campaign Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="campaignName"
                                                value={leadData.campaignName}
                                                placeholder="e.g. FB_Jan_2026"
                                                className={`${getInputClass(leadErrors.campaignName, false)}`}
                                                // className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${leadErrors.campaignName ? "border-2 border-red-500" : "border border-slate-100"
                                                //     }`}
                                                onChange={(e) => handleInputChange(e, "lead")}
                                                onBlur={(e) => validateField(e.target.name, e.target.value, "lead")}
                                            />
                                            {leadErrors.campaignName && <p className="mt-1 text-xs text-red-500">{leadErrors.campaignName}</p>}
                                        </div>

                                        <div className="flex flex-col gap-1.5 sm:gap-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                Assigned Sales Rep <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="assignedSalesRep"
                                                value={leadData.assignedSalesRep}
                                                placeholder="Staff Name / ID"
                                                className={`${getInputClass(leadErrors.assignedSalesRep, false)}`}
                                                // className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${leadErrors.assignedSalesRep ? "border-2 border-red-500" : "border border-slate-100"
                                                //     }`}
                                                onChange={(e) => handleInputChange(e, "lead")}
                                                onBlur={(e) => validateField(e.target.name, e.target.value, "lead")}
                                            />
                                            {leadErrors.assignedSalesRep && <p className="mt-1 text-xs text-red-500">{leadErrors.assignedSalesRep}</p>}
                                        </div>

                                        <div className="flex flex-col gap-1.5 sm:gap-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                Product/Service Interested <span className="text-red-500">*</span>
                                            </label>
                                            <Select
                                                name="ProductInterested"
                                                value={leadData.ProductInterested}
                                                options={servicesInterested}
                                                isMulti
                                                styles={ValidateStyle(!!leadErrors.ProductInterested, false)}
                                                onChange={(option) => {
                                                    handleInputChange(option || [], "lead", "ProductInterested");
                                                    validateField("ProductInterested", option || [], "lead");
                                                }}
                                            />
                                            {leadErrors.ProductInterested && <p className="mt-1 text-xs text-red-500">{leadErrors.ProductInterested}</p>}
                                        </div>

                                        <div className="flex flex-col gap-1.5 sm:gap-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                Province <span className="text-red-500">*</span>
                                            </label>
                                            <Select
                                                name="province"
                                                value={leadData.province}
                                                options={provinceOptions}
                                                styles={ValidateStyle(!!leadErrors.province, false)}
                                                onChange={(option) => {
                                                    handleInputChange(option, "lead", "province");
                                                    validateField("province", option, "lead");
                                                }}
                                            />
                                            {leadErrors.province && <p className="mt-1 text-xs text-red-500">{leadErrors.province}</p>}
                                        </div>

                                        <div className="flex flex-col gap-1.5 sm:gap-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                Branch Name <span className="text-red-500">*</span>
                                            </label>
                                            <Select
                                                name="branch"
                                                value={leadData.branch}
                                                options={BranchName}
                                                styles={ValidateStyle(!!leadErrors.branch, false)}
                                                onChange={(option) => {
                                                    handleInputChange(option, "lead", "branch");
                                                    validateField("branch", option, "lead");
                                                }}
                                            />
                                            {leadErrors.branch && <p className="mt-1 text-xs text-red-500">{leadErrors.branch}</p>}
                                        </div>

                                        <div className="flex flex-col gap-1.5 sm:gap-2 col-span-1 sm:col-span-2 w-full">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                Sales Manager
                                            </label>

                                            <input
                                                type="text"
                                                name="salesManager"
                                                value={leadData.salesManager}
                                                placeholder="Sales manager name"
                                                className={`${getInputClass(leadErrors.salesManager, false)}`}
                                                //                                             className="p-2 sm:p-3 text-sm bg-slate-50 
                                                // rounded-md focus:ring-2 focus:ring-amber-500 
                                                // w-full outline-none border border-slate-100"
                                                onChange={(e) => handleInputChange(e, "lead")}
                                                onBlur={(e) => validateField(e.target.name, e.target.value, "lead")}
                                            />

                                            {leadErrors.salesManager && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {leadErrors.salesManager}
                                                </p>
                                            )}
                                        </div>


                                        <div className="flex flex-col gap-1.5 sm:gap-2 sm:col-span-2">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                Notes / Comments <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                rows="3"
                                                name="notes"
                                                value={leadData.notes}
                                                placeholder="Additional remarks..."
                                                className={`p-2 sm:p-3 text-sm
                             bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${leadErrors.notes ? "border-2 border-red-500" : "border border-slate-100"
                                                    }`}
                                                onChange={(e) => handleInputChange(e, "lead")}
                                                onBlur={(e) => validateField(e.target.name, e.target.value, "lead")}
                                            />
                                            {leadErrors.notes && <p className="mt-1 text-xs text-red-500">{leadErrors.notes}</p>}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "org" && (
                                    <motion.div
                                        key="org-tab"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -12 }}
                                        transition={{ duration: 0.25 }}
                                        className="space-y-6 sm:space-y-8"
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                            <div className="sm:col-span-2 border-l-4 border-amber-500 pl-3 py-1 bg-amber-50/50">
                                                <h3 className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wider">
                                                    Company Profile
                                                </h3>
                                            </div>

                                            <div className="flex flex-col gap-1.5 sm:gap-2 sm:col-span-2">
                                                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                    Organization Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="organizationName"
                                                    value={orgData.organizationName}
                                                    placeholder="Legal Entity Name"
                                                    className={`${getInputClass(orgErrors.organizationName, false)}`}
                                                    //                         className={`p-2 sm:p-3 text-sm
                                                    //  bg-slate-50 rounded-md focus:ring-2
                                                    //   focus:ring-amber-500 outline-none ${orgErrors.organizationName ? "border-2 border-red-500" : "border border-slate-100"
                                                    //                             }`}
                                                    onChange={(e) => handleInputChange(e, "org")}
                                                    onBlur={(e) => validateField(e.target.name, e.target.value, "org")}
                                                />
                                                {orgErrors.organizationName && <p className="mt-1 text-xs text-red-500">{orgErrors.organizationName}</p>}
                                            </div>

                                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                    Organization Type <span className="text-red-500">*</span>
                                                </label>
                                                <Select
                                                    name="organizationType"
                                                    value={orgData.organizationType}
                                                    options={organizationType}
                                                    styles={ValidateStyle(!!orgErrors.organizationType, false)}
                                                    placeholder="Select Organization Type or Search"
                                                    onChange={(option) => {
                                                        handleInputChange(option, "org", "organizationType");
                                                        validateField("organizationType", option, "org");
                                                    }}
                                                />
                                                {orgErrors.organizationType && <p className="mt-1 text-xs text-red-500">{orgErrors.organizationType}</p>}
                                            </div>

                                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                    Industry / Sector <span className="text-red-500">*</span>
                                                </label>
                                                <Select
                                                    name="industyType"
                                                    value={orgData.industyType}
                                                    options={industries}
                                                    styles={ValidateStyle(!!orgErrors.industyType, false)}
                                                    isMulti
                                                    placeholder="Select Industry Type or Search"
                                                    onChange={(option) => {
                                                        handleInputChange(option || [], "org", "industyType");
                                                        validateField("industyType", option || [], "org");
                                                    }}
                                                />
                                                {orgErrors.industyType && <p className="mt-1 text-xs text-red-500">{orgErrors.industyType}</p>}
                                            </div>

                                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                    Registration Number <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="registrationNumber"
                                                    value={orgData.registrationNumber}
                                                    placeholder="e.g. REG123456"
                                                    className={`${getInputClass(orgErrors.registrationNumber, false)}`}
                                                    // className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.registrationNumber ? "border-2 border-red-500" : "border border-slate-100"
                                                    //     }`}
                                                    onChange={(e) => handleInputChange(e, "org")}
                                                    onBlur={(e) => validateField(e.target.name, e.target.value, "org")}
                                                />
                                                {orgErrors.registrationNumber && <p className="mt-1 text-xs text-red-500">{orgErrors.registrationNumber}</p>}
                                            </div>

                                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                    VAT / PAN Number <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="vatPan"
                                                    value={orgData.vatPan}
                                                    placeholder="e.g. VAT1234567890"
                                                    className={`${getInputClass(orgErrors.vatPan, false)}`}
                                                    // className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.vatPan ? "border-2 border-red-500" : "border border-slate-100"
                                                    //     }`}
                                                    onChange={(e) => handleInputChange(e, "org")}
                                                    onBlur={(e) => validateField(e.target.name, e.target.value, "org")}
                                                />
                                                {orgErrors.vatPan && <p className="mt-1 text-xs text-red-500">{orgErrors.vatPan}</p>}
                                            </div>

                                            <div className="flex flex-col gap-1.5 sm:gap-2 sm:col-span-2">
                                                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                    Organization Address <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={orgData.address}
                                                    placeholder="Full Street Address, City, Country"
                                                    className={`${getInputClass(orgErrors.address, false)}`}
                                                    // className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.address ? "border-2 border-red-500" : "border border-slate-100"
                                                    //     }`}
                                                    onChange={(e) => handleInputChange(e, "org")}
                                                    onBlur={(e) => validateField(e.target.name, e.target.value, "org")}
                                                />
                                                {orgErrors.address && <p className="mt-1 text-xs text-red-500">{orgErrors.address}</p>}
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:col-span-2">
                                                <div className="flex flex-col gap-1.5 sm:gap-2">
                                                    <label className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase">
                                                        Total Employees/Learners <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="totalEmp_learners"
                                                        value={orgData.totalEmp_learners}
                                                        className={`${getInputClass(orgErrors.totalEmp_learners, false)}`}
                                                        // className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.totalEmp_learners ? "border-2 border-red-500" : "border border-slate-100"
                                                        //     }`}
                                                        placeholder="e.g.:100,200,230......"
                                                        onChange={(e) => handleInputChange(e, "org")}
                                                        onBlur={(e) => validateField(e.target.name, e.target.value, "org")}
                                                    />
                                                    {orgErrors.totalEmp_learners && <p className="mt-1 text-xs text-red-500">{orgErrors.totalEmp_learners}</p>}
                                                </div>

                                                <div className="flex flex-col gap-1.5 sm:gap-2">
                                                    <span className="flex items-center gap-2">
                                                        <label className={`text-[10px] ${!isEducationService ? "opacity-30" : "opacity-100"} sm:text-xs font-bold text-slate-700 uppercase`}>
                                                            No. Of totalEducator
                                                        </label>
                                                        <span className="relative group flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition cursor-pointer">
                                                            <Info size={12} />
                                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 hidden group-hover:block bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow whitespace-nowrap z-20">
                                                                Optional. Applicable only for Educational Institutions.
                                                            </span>
                                                        </span>
                                                    </span>
                                                    <input
                                                        type="number"
                                                        name="totalEducator"
                                                        value={orgData.totalEducator}
                                                        min="0"
                                                        className={`${getInputClass(orgErrors.totalEducator, !isEducationService)} `}
                                                        // className={`${}`}
                                                        // className={`p-2 sm:p-3 text-sm bg-slate-50 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${orgErrors.totalEducator ? "border-2 border-red-500" : "border border-slate-100"
                                                        //     }`}
                                                        onChange={(e) => handleInputChange(e, "org")}
                                                        onBlur={(e) => validateField(e.target.name, e.target.value, "org")}
                                                        placeholder={`${!isEducationService ? "disabled" : "e.g.: 12,23,100...."}`}
                                                    // disabled={!isEducationService}
                                                    />
                                                    {orgErrors.totalEducator && <p className="mt-1 text-xs text-red-500">{orgErrors.totalEducator}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-slate-100">
                                            <div className="sm:col-span-2 border-l-4 border-orange-500 pl-3 py-1 bg-orange-50/50">
                                                <h3 className="text-xs sm:text-sm font-bold text-orange-800 uppercase tracking-wider">
                                                    Primary Contact Person <span className="text-red-500">*</span>
                                                </h3>
                                            </div>

                                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                    Full Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="contactPersonName"
                                                    value={orgData.contactPersonName}
                                                    placeholder="John Doe"
                                                    className={`${getInputClass(orgErrors.contactPersonName, false)} `}
                                                    onChange={(e) => handleInputChange(e, "org")}
                                                    onBlur={(e) => validateField(e.target.name, e.target.value, "org")}
                                                />
                                                {orgErrors.contactPersonName && <p className="mt-1 text-xs text-red-500">{orgErrors.contactPersonName}</p>}
                                            </div>

                                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                    Role / Position <span className="text-red-500">*</span>
                                                </label>
                                                <Select
                                                    name="role"
                                                    value={orgData.role}
                                                    options={BusinessRole}
                                                    styles={ValidateStyle(!!orgErrors.role, false)}
                                                    placeholder="Select role"
                                                    onChange={(option) => {
                                                        handleInputChange(option, "org", "role");
                                                        validateField("role", option, "org");
                                                    }}
                                                />
                                                {orgErrors.role && <p className="mt-1 text-xs text-red-500">{orgErrors.role}</p>}
                                            </div>

                                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                    Contact Number <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="contactPersonNumber"
                                                    value={orgData.contactPersonNumber}
                                                    placeholder="9841234567"
                                                    className={`${getInputClass(orgErrors.contactPersonNumber, false)} `}
                                                    onChange={(e) => handleInputChange(e, "org")}
                                                    onBlur={(e) => validateField(e.target.name, e.target.value, "org")}
                                                />
                                                {orgErrors.contactPersonNumber && <p className="mt-1 text-xs text-red-500">{orgErrors.contactPersonNumber}</p>}
                                            </div>

                                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                                    Email Address <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="contactPersonEmail"
                                                    value={orgData.contactPersonEmail}
                                                    placeholder="john@organization.com"
                                                    className={`${getInputClass(orgErrors.contactPersonEmail, false)} `}
                                                    onChange={(e) => handleInputChange(e, "org")}
                                                    onBlur={(e) => validateField(e.target.name, e.target.value, "org")}
                                                />
                                                {orgErrors.contactPersonEmail && <p className="mt-1 text-xs text-red-500">{orgErrors.contactPersonEmail}</p>}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        disabled={isSubmitting}
                                        className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm border border-slate-200 text-slate-600 rounded-md hover:bg-slate-100 transition-colors font-semibold disabled:opacity-60"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`px-6 sm:px-10 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-md transition-all transform ${isSubmitting
                                            ? "bg-gradient-to-r from-amber-300 to-orange-300 text-white/70 cursor-not-allowed shadow-none opacity-70"
                                            : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-200 active:scale-95"
                                            }`}
                                    >
                                        {isSubmitting ? "Saving..." : "Save Lead & Organization"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LeadForm;