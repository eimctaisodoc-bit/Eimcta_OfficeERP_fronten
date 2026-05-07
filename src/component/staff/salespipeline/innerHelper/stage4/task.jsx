import React, { useState, useRef } from 'react';
import {
    Plus,
    Target,
    XCircle,
    ChevronRight,
    Award,
    FileCheck,
    BookOpen,
    UserCheck,
    Ban,
    CheckCircle2,
    Minus
} from 'lucide-react';
import Select from 'react-select';
import { getInputClass, ValidateStyle } from '../../../../../data/data';


export const ProposalTask = ({ id }) => {
    console.log(id, "proposal task id")
    const fontStyle = { fontFamily: "'Roboto Slab', serif" };

    // Field References for scroll-to-error functionality
    const fieldRefs = {
        status: useRef(null),
        proposalType: useRef(null),
        proposalSendVia: useRef(null),
        scopeOfServices: useRef(null),
        objectivesDeliverables: useRef(null),
        preparedBy: useRef(null),
        cancelReason: useRef(null),
    };

    // Main Form States
    const [proposalType, setProposalType] = useState(null);
    const [proposalSendVia, setProposalSendVia] = useState(null);
    const [scopeOfServices, setScopeOfServices] = useState('');
    const [objectivesDeliverables, setObjectivesDeliverables] = useState('');
    const [preparedBy, setPreparedBy] = useState('');
    const [errors, setErrors] = useState({});

    // Status States
    const [status, setStatus] = useState(null);
    const [cancelReason, setCancelReason] = useState('');

    const [saveErrors, setSaveErrors] = useState({});

    // Scroll to error functionality
    const scrollToError = (fieldName) => {
        const ref = fieldRefs[fieldName];

        if (ref?.current) {
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            ref.current.classList.add("animate-pulse");

            setTimeout(() => {
                ref.current?.classList.remove("animate-pulse");
            }, 1200);
        }
    };

    // Sample History Data
    const [historyItems, setHistoryItems] = useState([
        {
            text: "ISO 9001:2015 Certification Support - ABC Manufacturing",
            startDate: "2026-04-20T09:00",
            endDate: "2026-04-20T10:30",
        },
        {
            text: "Gap Analysis for Food Safety Management System",
            startDate: "2026-04-22T14:00",
            endDate: "2026-04-22T15:30",
        },
    ]);

    const isCancelled = status?.value === 'cancelled';
    const isCompleted = status?.value === 'completed';

    const isEmptyValue = (value) => {
        if (value === null || value === undefined) return true;
        if (Array.isArray(value)) return value.length === 0;
        if (typeof value === 'object') return Object.keys(value).length === 0;
        return String(value).trim() === '';
    };

    const validateField = (field, value) => {
        let error = '';

        switch (field) {
            case 'status':
                if (isEmptyValue(value)) error = 'Status is required';
                break;

            case 'proposalType':
            case 'proposalSendVia':
                if (!isCancelled && isEmptyValue(value)) error = 'This field is required';
                break;

            case 'scopeOfServices':
                if (!isCancelled) {
                    if (isEmptyValue(value)) error = 'Scope of Services is required';
                    else if (String(value).trim().length < 20) error = 'Scope must be at least 20 characters';
                }
                break;

            case 'objectivesDeliverables':
                if (!isCancelled) {
                    if (isEmptyValue(value)) error = 'Objectives / Deliverables is required';
                    else if (String(value).trim().length < 15) error = 'Please provide more detailed objectives';
                }
                break;

            case 'preparedBy':
                if (!isCancelled && isEmptyValue(value)) error = 'Prepared By is required';
                break;

            case 'cancelReason':
                if (isCancelled && isEmptyValue(value)) error = 'Cancellation reason is required';
                break;

            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
        return error;
    };

    const validateAll = () => {
        const errorsMap = {};
        const fieldsList = [
            { name: 'status', value: status },
            { name: 'proposalType', value: proposalType },
            { name: 'proposalSendVia', value: proposalSendVia },
            { name: 'scopeOfServices', value: scopeOfServices },
            { name: 'objectivesDeliverables', value: objectivesDeliverables },
            { name: 'preparedBy', value: preparedBy },
            { name: 'cancelReason', value: cancelReason },
        ];

        // Validate all fields and collect errors synchronously
        fieldsList.forEach(({ name, value }) => {
            errorsMap[name] = validateField(name, value);
        });

        const isMainValid = !Object.values(errorsMap).some((err) => err !== '');

        return {
            isValid: isMainValid,
            errors: errorsMap,
        };
    };

    const handleSelectChange = (field, value) => {
        if (field === 'proposalType') setProposalType(value);
        if (field === 'proposalSendVia') setProposalSendVia(value);

        if (field === 'status') {
            setStatus(value);
            setErrors((prev) => ({
                ...prev,
                status: '',
                cancelReason: '',
            }));

            if (value?.value === 'cancelled') {
                setCancelReason('');
            }
        }

        validateField(field, value);
    };

    const handleInputChange = (field, value) => {
        if (field === 'scopeOfServices') setScopeOfServices(value);
        if (field === 'objectivesDeliverables') setObjectivesDeliverables(value);
        if (field === 'preparedBy') setPreparedBy(value);
        if (field === 'cancelReason') setCancelReason(value);

        validateField(field, value);
    };

    const handleSave = () => {
        setSaveErrors({});
        const validationResult = validateAll();

        if (!validationResult.isValid) {
            console.log('Validation failed');

            // Find first field with error and scroll to it
            const fieldsInOrder = [
                'status',
                'proposalType',
                'proposalSendVia',
                'scopeOfServices',
                'objectivesDeliverables',
                'preparedBy',
                'cancelReason',
            ];

            for (const field of fieldsInOrder) {
                if (validationResult.errors[field]) {
                    scrollToError(field);
                    break;
                }
            }
            return;
        }

        const payload = {
            id,
            status,
            proposalType,
            proposalSendVia,
            scopeOfServices: scopeOfServices.trim(),
            objectivesDeliverables: objectivesDeliverables.trim(),
            preparedBy: preparedBy.trim(),
            cancelReason: cancelReason.trim(),
        };

        if (isCompleted) {
            console.log('Move to next stage:', payload);

            return;
        }
        // SalesID
        // stageID
        // s
        console.log('Proposal saved successfully:', payload);

    };

    const proposalTypeOptions = [
        { value: 'full_certification', label: 'Full Certification Support' },
        { value: 'gap_analysis', label: 'Gap Analysis / Pre-Audit' },
        { value: 'documentation', label: 'Documentation Development' },
        { value: 'internal_audit', label: 'Internal Audit Support' },
        { value: 'training', label: 'Training & Awareness Programs' },
        { value: 'recertification', label: 'Recertification / Surveillance Audit Support' },
        { value: 'partial_consultancy', label: 'Partial / Modular Consultancy' },
    ];

    const sendViaOptions = [
        { value: 'email', label: 'Email' },
        { value: 'portal', label: 'Client Portal' },
        { value: 'physical', label: 'Physical / Hard Copy' },
        { value: 'whatsapp', label: 'WhatsApp / Messaging' },
    ];

    const statusOptions = [
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
    ];

    const inputDisabledClass = isCancelled ? 'bg-slate-100 cursor-not-allowed opacity-70' : 'bg-white';
    const commonDisabled = isCancelled;

    return (
        <div className="mx-auto bg-transparent py-4 px-3 w-full" style={fontStyle}>
            <div className="flex items-center gap-2 mb-6">
                <div className="bg-amber-50 p-1.5 rounded-xl">
                    <Award size={14} className="text-amber-500" />
                </div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Proposal Information
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

                {/* STATUS */}
                <label className="flex flex-col gap-1.5 col-span-1 sm:col-span-2" ref={fieldRefs.status}>
                    <div className="flex items-center gap-2">
                        <div className="bg-amber-50 p-1.5 rounded-xl">
                            <CheckCircle2 size={13} className="text-amber-500" />
                        </div>
                        <span className="font-semibold text-slate-700">Status</span>
                    </div>
                    <Select
                        placeholder="Select Status"
                        options={statusOptions}
                        styles={ValidateStyle(!!errors.status)}
                        onChange={(val) => handleSelectChange('status', val)}
                        value={status}
                    />
                    {errors.status && <p className="text-xs text-red-500 mt-0.5">{errors.status}</p>}
                </label>
                {/* CANCEL REASON */}
                {isCancelled && (
                    <label className="flex flex-col gap-1.5 col-span-1 sm:col-span-2" ref={fieldRefs.cancelReason}>
                        <div className="flex items-center gap-2">
                            <div className="bg-red-50 p-1.5 rounded-xl">
                                <Ban size={13} className="text-red-500" />
                            </div>
                            <span className="font-semibold text-slate-700">Cancellation Reason</span>
                        </div>
                        <textarea
                            placeholder="Enter cancellation reason..."
                            className={`border ${errors.cancelReason ? 'border-red-500' : 'border-slate-200'} focus:border-red-400 rounded-lg px-3 py-3 h-28 w-full resize-y outline-none`}
                            value={cancelReason}
                            onChange={(e) => handleInputChange('cancelReason', e.target.value)}
                            onBlur={() => validateField('cancelReason', cancelReason)}
                        />
                        {errors.cancelReason && <p className="text-xs text-red-500 mt-0.5">{errors.cancelReason}</p>}
                    </label>
                )}

                <label className="flex flex-col gap-1.5 col-span-1 sm:col-span-2" ref={fieldRefs.proposalType}>
                    <div className="flex items-center gap-2">
                        <div className="bg-violet-50 p-1.5 rounded-xl">
                            <Target size={13} className="text-violet-500" />
                        </div>
                        <span className="font-semibold text-slate-700">Proposal Type</span>
                    </div>
                    <Select
                        placeholder="Select Proposal Type"
                        options={proposalTypeOptions}
                        styles={ValidateStyle(!!errors.proposalType)}
                        onChange={(val) => handleSelectChange('proposalType', val)}
                        value={proposalType}
                        isDisabled={commonDisabled}
                    />
                    {errors.proposalType && <p className="text-xs text-red-500 mt-0.5">{errors.proposalType}</p>}
                </label>





                <label className="flex flex-col gap-1.5 col-span-1 sm:col-span-2" ref={fieldRefs.proposalSendVia}>
                    <div className="flex items-center gap-2">
                        <div className="bg-teal-50 p-1.5 rounded-xl">
                            <FileCheck size={13} className="text-teal-500" />
                        </div>
                        <span className="font-semibold text-slate-700">Proposal Send Via</span>
                    </div>
                    <Select
                        placeholder="Select Send Via"
                        options={sendViaOptions}
                        styles={ValidateStyle(!!errors.proposalSendVia)}
                        onChange={(val) => handleSelectChange('proposalSendVia', val)}
                        value={proposalSendVia}
                        isDisabled={commonDisabled}
                    />
                    {errors.proposalSendVia && <p className="text-xs text-red-500 mt-0.5">{errors.proposalSendVia}</p>}
                </label>

                <label className="flex flex-col gap-1.5 col-span-1 sm:col-span-2" ref={fieldRefs.scopeOfServices}>
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-50 p-1.5 rounded-xl">
                            <BookOpen size={13} className="text-blue-500" />
                        </div>
                        <span className="font-semibold text-slate-700">Scope of Services</span>
                    </div>
                    <textarea
                        placeholder="Describe the detailed scope of services..."
                        disabled={commonDisabled}
                        className={`border ${errors.scopeOfServices ? 'border-red-500' : 'border-slate-200'} focus:border-amber-500 rounded-lg px-3 py-3 h-28 w-full resize-y outline-none ${inputDisabledClass}`}
                        value={scopeOfServices}
                        onChange={(e) => handleInputChange('scopeOfServices', e.target.value)}
                        onBlur={() => validateField('scopeOfServices', scopeOfServices)}
                    />
                    {errors.scopeOfServices && <p className="text-xs text-red-500 mt-0.5">{errors.scopeOfServices}</p>}
                </label>

                <label className="flex flex-col gap-1.5 col-span-1 sm:col-span-2" ref={fieldRefs.objectivesDeliverables}>
                    <div className="flex items-center gap-2">
                        <div className="bg-green-50 p-1.5 rounded-xl">
                            <Plus size={13} className="text-green-500" />
                        </div>
                        <span className="font-semibold text-slate-700">Objectives / Deliverables</span>
                    </div>
                    <textarea
                        placeholder="List key objectives and expected deliverables..."
                        disabled={commonDisabled}
                        className={`border ${errors.objectivesDeliverables ? 'border-red-500' : 'border-slate-200'} focus:border-amber-500 rounded-lg px-3 py-3 h-28 w-full resize-y outline-none ${inputDisabledClass}`}
                        value={objectivesDeliverables}
                        onChange={(e) => handleInputChange('objectivesDeliverables', e.target.value)}
                        onBlur={() => validateField('objectivesDeliverables', objectivesDeliverables)}
                    />
                    {errors.objectivesDeliverables && <p className="text-xs text-red-500 mt-0.5">{errors.objectivesDeliverables}</p>}
                </label>

                <label className="flex flex-col gap-1.5 col-span-1 sm:col-span-2" ref={fieldRefs.preparedBy}>
                    <div className="flex items-center gap-2">
                        <div className="bg-purple-50 p-1.5 rounded-xl">
                            <UserCheck size={13} className="text-purple-500" />
                        </div>
                        <span className="font-semibold text-slate-700">Proposal Prepared By</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter name of the person who prepared the proposal"
                        disabled={commonDisabled}
                        className={`border ${errors.preparedBy ? 'border-red-500' : 'border-slate-200'} focus:border-amber-500 focus:ring-0 rounded-lg px-3 py-2.5 w-full text-sm outline-none ${inputDisabledClass}`}
                        value={preparedBy}
                        onChange={(e) => handleInputChange('preparedBy', e.target.value)}
                        onBlur={() => validateField('preparedBy', preparedBy)}
                    />
                    {errors.preparedBy && <p className="text-xs text-red-500 mt-0.5">{errors.preparedBy}</p>}
                </label>



            </div>

            <div className="flex gap-3 mt-8">
                <button
                    type="button"
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-red-600 py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                    <XCircle size={16} /> Cancel
                </button>

                <button
                    type="button"
                    onClick={handleSave}
                    className={`flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-md font-semibold text-sm transition-colors ${isCompleted
                        ? 'bg-emerald-500 hover:bg-emerald-600'
                        : isCancelled
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-amber-500 hover:bg-amber-600'
                        }`}
                >
                    {isCompleted ? 'Next' : 'Save Proposal'} <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};