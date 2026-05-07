import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Plus, Clock, Target, XCircle, ChevronRight, Award, FileCheck, BookOpen, UserCheck } from 'lucide-react';
import Select from 'react-select';
import { ValidateStyle } from '../../../../../data/data';

export const ProposalTask = () => {
    const fontStyle = { fontFamily: "'Roboto Slab', serif" };

    const fromRef = useRef(null);

    // Form States
    const [proposalDateFrom, setProposalDateFrom] = useState('');
    const [proposalDateTo, setProposalDateTo] = useState('');
    const [proposalType, setProposalType] = useState(null);
    const [proposalSendVia, setProposalSendVia] = useState(null);
    const [scopeOfServices, setScopeOfServices] = useState('');
    const [objectivesDeliverables, setObjectivesDeliverables] = useState('');
    const [preparedBy, setPreparedBy] = useState('');
    const [duration, setDuration] = useState('');
    const [errors, setErrors] = useState({});
    const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);
    const [scheduleDateTime, setScheduleDateTime] = useState('');
    const [scheduleNote, setScheduleNote] = useState('');
    const [scheduleItems, setScheduleItems] = useState([]);
    const [scheduleErrors, setScheduleErrors] = useState({});

    // Sample History Data (you can replace with real data later)
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

    const isEmptyValue = (value) => {
        if (value === null || value === undefined) return true;
        if (Array.isArray(value)) return value.length === 0;
        if (typeof value === 'object') return Object.keys(value).length === 0;
        return String(value).trim() === '';
    };

    const validateField = (field, value) => {
        let error = '';

        switch (field) {
            case 'proposalType':
            case 'proposalSendVia':
                if (isEmptyValue(value)) error = 'This field is required';
                break;

            case 'scopeOfServices':
                if (isEmptyValue(value)) error = 'Scope of Services is required';
                else if (String(value).trim().length < 20) error = 'Scope must be at least 20 characters';
                break;

            case 'objectivesDeliverables':
                if (isEmptyValue(value)) error = 'Objectives / Deliverables is required';
                else if (String(value).trim().length < 15) error = 'Please provide more detailed objectives';
                break;

            case 'preparedBy':
                if (isEmptyValue(value)) error = 'Prepared By is required';
                break;

            case 'proposalDateFrom':
                if (isEmptyValue(value)) error = 'Proposal start date is required';
                break;

            case 'proposalDateTo':
                if (isEmptyValue(value)) {
                    error = 'Proposal end date is required';
                } else if (proposalDateFrom && value) {
                    const start = new Date(proposalDateFrom);
                    const end = new Date(value);
                    if (end <= start) error = 'End date must be after start date';
                }
                break;

            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
        return error;
    };

    const validateAll = () => {
        const fieldsToValidate = [
            validateField('proposalType', proposalType),
            validateField('proposalSendVia', proposalSendVia),
            validateField('scopeOfServices', scopeOfServices),
            validateField('objectivesDeliverables', objectivesDeliverables),
            validateField('preparedBy', preparedBy),
            validateField('proposalDateFrom', proposalDateFrom),
            validateField('proposalDateTo', proposalDateTo),
        ];

        return !fieldsToValidate.some((err) => err !== '');
    };

    const handleSelectChange = (field, value) => {
        if (field === 'proposalType') setProposalType(value);
        if (field === 'proposalSendVia') setProposalSendVia(value);
        validateField(field, value);
    };

    const handleInputChange = (field, value) => {
        if (field === 'scopeOfServices') setScopeOfServices(value);
        if (field === 'objectivesDeliverables') setObjectivesDeliverables(value);
        if (field === 'preparedBy') setPreparedBy(value);
        if (field === 'proposalDateFrom') setProposalDateFrom(value);
        if (field === 'proposalDateTo') setProposalDateTo(value);

        validateField(field, value);
    };

    const handleToggleSchedule = () => {
        setIsSchedulingOpen((prev) => !prev);
        setScheduleErrors({});
    };

    const handleScheduleChange = (field, value) => {
        if (field === 'scheduleDateTime') setScheduleDateTime(value);
        if (field === 'scheduleNote') setScheduleNote(value);
        setScheduleErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleAddSchedule = () => {
        const nextErrors = {};
        if (!scheduleDateTime) nextErrors.scheduleDateTime = 'Please select a schedule date and time';
        if (!scheduleNote.trim()) nextErrors.scheduleNote = 'Please add a schedule note';

        if (Object.keys(nextErrors).length > 0) {
            setScheduleErrors(nextErrors);
            return;
        }

        setScheduleItems((prev) => [
            ...prev,
            {
                dateTime: scheduleDateTime,
                note: scheduleNote.trim(),
            },
        ]);

        setScheduleDateTime('');
        setScheduleNote('');
        setScheduleErrors({});
        setIsSchedulingOpen(false);
    };

    // Edit from History (Example - you can customize)
    const handleEdit = (index) => {
        const item = historyItems[index];
        if (!item) return;

        setProposalDateFrom(item.startDate);
        setProposalDateTo(item.endDate);
        setScopeOfServices(`Scope for ${item.text}`);
        setObjectivesDeliverables(`Deliverables and objectives from previous proposal: ${item.text}`);
        setPreparedBy("John Doe"); // Default or from user data

        setErrors((prev) => ({ ...prev, proposalDateFrom: '', proposalDateTo: '' }));

        setTimeout(() => {
            fromRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
    };

    const handleDelete = (index) => {
        if (window.confirm('Delete this history item?')) {
            setHistoryItems((prev) => prev.filter((_, i) => i !== index));
        }
    };

    const handleSave = () => {
        if (!validateAll()) {
            console.log('Validation failed');
            return;
        }

        console.log('Proposal saved successfully:', {
            proposalType,
            proposalSendVia,
            proposalDateFrom,
            proposalDateTo,
            scopeOfServices: scopeOfServices.trim(),
            objectivesDeliverables: objectivesDeliverables.trim(),
            preparedBy: preparedBy.trim(),
            duration,
        });

        // TODO: Save to backend
    };

    // Calculate Duration
    useEffect(() => {
        if (!proposalDateFrom || !proposalDateTo) {
            setDuration('');
            return;
        }

        const start = new Date(proposalDateFrom);
        const end = new Date(proposalDateTo);
        const diffMs = end - start;

        if (diffMs <= 0) {
            setDuration("Invalid Range");
            return;
        }

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        let durationStr = '';
        if (days > 0) durationStr += `${days}d `;
        if (hours > 0) durationStr += `${hours}h `;
        durationStr += `${minutes}m`;

        setDuration(durationStr.trim());
    }, [proposalDateFrom, proposalDateTo]);

    // Options
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

    return (
        <div className="mx-auto bg-transparent py-4 px-3 w-full" style={fontStyle}>
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <div className="bg-amber-50 p-1.5 rounded-xl">
                    <Award size={14} className="text-amber-500" />
                </div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Proposal Information
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {/* Proposal Type */}
                <label className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
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
                    />
                    {errors.proposalType && <p className="text-xs text-red-500 mt-0.5">{errors.proposalType}</p>}
                </label>

                {/* Proposal Date From & To */}
                <label ref={fromRef} className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <div className="bg-orange-50 p-1.5 rounded-xl">
                            <Calendar size={13} className="text-orange-500" />
                        </div>
                        <span className="font-semibold text-slate-700">Proposal Date (From)</span>
                    </div>
                    <input
                        type="datetime-local"
                        className={`border ${errors.proposalDateFrom ? 'border-red-500' : 'border-slate-200'} 
                       focus:border-amber-500 focus:ring-0 rounded-lg px-3 py-2.5 w-full text-sm`}
                        value={proposalDateFrom}
                        min={new Date().toISOString().slice(0, 16)}
                        onChange={(e) => handleInputChange('proposalDateFrom', e.target.value)}
                        onBlur={() => validateField('proposalDateFrom', proposalDateFrom)}
                    />
                    {errors.proposalDateFrom && <p className="text-xs text-red-500 mt-0.5">{errors.proposalDateFrom}</p>}
                </label>

                <label className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <div className="bg-orange-50 p-1.5 rounded-xl">
                            <Calendar size={13} className="text-orange-500" />
                        </div>
                        <span className="font-semibold text-slate-700">Proposal Date (To)</span>
                    </div>
                    <input
                        type="datetime-local"
                        className={`border ${errors.proposalDateTo ? 'border-red-500' : 'border-slate-200'} 
                       focus:border-amber-500 focus:ring-0 rounded-lg px-3 py-2.5 w-full text-sm`}
                        value={proposalDateTo}
                        min={new Date().toISOString().slice(0, 16)}
                        onChange={(e) => handleInputChange('proposalDateTo', e.target.value)}
                        onBlur={() => validateField('proposalDateTo', proposalDateTo)}
                    />
                    {errors.proposalDateTo && <p className="text-xs text-red-500 mt-0.5">{errors.proposalDateTo}</p>}
                </label>

                {/* Duration Display */}
                <div className="col-span-1 sm:col-span-2 bg-slate-50 p-4 rounded-xl flex items-center gap-3">
                    <div className="bg-amber-50 p-2 rounded-xl flex-shrink-0">
                        <Clock size={15} className="text-amber-500" />
                    </div>
                    <div>
                        <span className="text-slate-600">Duration:</span>{' '}
                        <span className="font-semibold text-slate-800">{duration || '—'}</span>
                    </div>
                </div>

                {/* Proposal Send Via */}
                <label className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
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
                    />
                    {errors.proposalSendVia && <p className="text-xs text-red-500 mt-0.5">{errors.proposalSendVia}</p>}
                </label>

                {/* Scope of Services */}
                <label className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-50 p-1.5 rounded-xl">
                            <BookOpen size={13} className="text-blue-500" />
                        </div>
                        <span className="font-semibold text-slate-700">Scope of Services</span>
                    </div>
                    <textarea
                        placeholder="Describe the detailed scope of services..."
                        className={`border ${errors.scopeOfServices ? 'border-red-500' : 'border-slate-200'} 
                       focus:border-amber-500 rounded-lg px-3 py-3 h-28 w-full resize-y outline-none`}
                        value={scopeOfServices}
                        onChange={(e) => handleInputChange('scopeOfServices', e.target.value)}
                        onBlur={() => validateField('scopeOfServices', scopeOfServices)}
                    />
                    {errors.scopeOfServices && <p className="text-xs text-red-500 mt-0.5">{errors.scopeOfServices}</p>}
                </label>

                {/* Objectives / Deliverables */}
                <label className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-50 p-1.5 rounded-xl">
                            <Plus size={13} className="text-green-500" />
                        </div>
                        <span className="font-semibold text-slate-700">Objectives / Deliverables</span>
                    </div>
                    <textarea
                        placeholder="List key objectives and expected deliverables..."
                        className={`border ${errors.objectivesDeliverables ? 'border-red-500' : 'border-slate-200'} 
                       focus:border-amber-500 rounded-lg px-3 py-3 h-28 w-full resize-y outline-none`}
                        value={objectivesDeliverables}
                        onChange={(e) => handleInputChange('objectivesDeliverables', e.target.value)}
                        onBlur={() => validateField('objectivesDeliverables', objectivesDeliverables)}
                    />
                    {errors.objectivesDeliverables && <p className="text-xs text-red-500 mt-0.5">{errors.objectivesDeliverables}</p>}
                </label>

                {/* Prepared By */}
                <label className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-purple-50 p-1.5 rounded-xl">
                            <UserCheck size={13} className="text-purple-500" />
                        </div>
                        <span className="font-semibold text-slate-700">Proposal Prepared By</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter name of the person who prepared the proposal"
                        className={`border ${errors.preparedBy ? 'border-red-500' : 'border-slate-200'} 
                       focus:border-amber-500 focus:ring-0 rounded-lg px-3 py-2.5 w-full text-sm`}
                        value={preparedBy}
                        onChange={(e) => handleInputChange('preparedBy', e.target.value)}
                        onBlur={() => validateField('preparedBy', preparedBy)}
                    />
                    {errors.preparedBy && <p className="text-xs text-red-500 mt-0.5">{errors.preparedBy}</p>}
                </label>

                {/* Scheduling */}
                <div className="col-span-1 sm:col-span-2 bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                            <div className="bg-amber-50 p-2 rounded-xl">
                                <Plus size={15} className="text-amber-500" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-900">Schedule Proposal</p>
                                <p className="text-12 text-slate-500">Add meeting or follow-up schedule for this proposal.</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleToggleSchedule}
                            className="inline-flex text-[14px] items-center
                             gap-2 rounded-md border border-slate-200
                             bg-white px-2 py-1.5  font-semibold
                              text-slate-700 transition hover:bg-slate-100"
                        >
                            <Plus size={14} />
                        
                        </button>
                    </div>

                    {isSchedulingOpen && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-semibold text-slate-900">Schedule Date & Time</span>
                                <input
                                    type="datetime-local"
                                    className={`border ${scheduleErrors.scheduleDateTime ? 'border-red-500' : 'border-slate-200'} 
                     focus:border-amber-500 focus:ring-0 rounded-lg px-3 py-2.5 w-full text-sm`}
                                    value={scheduleDateTime}
                                    onChange={(e) => handleScheduleChange('scheduleDateTime', e.target.value)}
                                />
                                {scheduleErrors.scheduleDateTime && (
                                    <p className="text-xs text-red-500 mt-0.5">{scheduleErrors.scheduleDateTime}</p>
                                )}
                            </label>

                            <label className="flex flex-col gap-2 sm:col-span-2">
                                <span className="text-xs font-semibold text-slate-900">Schedule Note</span>
                                <textarea
                                    rows={3}
                                    className={`border ${scheduleErrors.scheduleNote ? 'border-red-500' : 'border-slate-200'} 
                     focus:border-amber-500 rounded-lg px-3 py-3 w-full text-sm resize-y outline-none`}
                                    placeholder="Enter what this schedule is for..."
                                    value={scheduleNote}
                                    onChange={(e) => handleScheduleChange('scheduleNote', e.target.value)}
                                />
                                {scheduleErrors.scheduleNote && (
                                    <p className="text-xs text-red-500 mt-0.5">{scheduleErrors.scheduleNote}</p>
                                )}
                            </label>
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        {scheduleItems.length > 0 ? (
                            scheduleItems.map((item, index) => (
                                <div key={index} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-semibold text-slate-900">
                                                {new Date(item.dateTime).toLocaleString()}
                                            </p>
                                            <p className="text-12 text-slate-600 mt-1">{item.note}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setScheduleItems((prev) => prev.filter((_, i) => i !== index))}
                                            className="text-xs font-semibold text-red-600 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-12 text-slate-500">No schedule items added yet.</p>
                        )}
                    </div>

                    {isSchedulingOpen && (
                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={handleAddSchedule}
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-600"
                            >
                                <Plus size={14} />
                                Add Schedule
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
                <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-red-600 py-3 rounded-xl font-semibold text-sm transition-colors">
                    <XCircle size={16} /> Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2
           bg-amber-500 hover:bg-amber-600 text-white py-3 
           rounded-md font-semibold text-sm transition-colors"
                >
                    Save Proposal <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};