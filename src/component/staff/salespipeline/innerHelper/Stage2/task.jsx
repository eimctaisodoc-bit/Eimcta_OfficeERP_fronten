import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    ChevronRight,
    XCircle,
    CheckCircle2,
    Ban,
    Edit2,
    Trash2,
    Video,
    Phone,
    MessageSquare,
    Calendar,
    Plus,
    Minus,
    Clock,
    User,
    AlertCircle,
} from 'lucide-react';
import Select from 'react-select';
import { getInputClass, ValidateStyle } from '../../../../../data/data';
import { UseAdd } from '../../../../hooks/useadd';
import { useGet } from '../../../../hooks/useGet';

export const VMeeting = ({ id }) => {
    const { addMsg_call_sch } = UseAdd();
    const { mutate } = useGet();
    
    // ==================== REFS ====================
    const statusRef = useRef(null);
    const cancelReasonRef = useRef(null);
    const scheduleRef = useRef(null);
    const meetingRef = useRef(null);
    const scheduleByRef = useRef(null);
    const scheduleFromRef = useRef(null);
    const scheduleToRef = useRef(null);
    const scheduleNoteRef = useRef(null);

    // ==================== FIELD REFS MAPPING ====================
    const fieldRefs = {
        status: statusRef,
        cancelReason: cancelReasonRef,
        scheduleRequired: scheduleRef,
        scheduleBy: scheduleByRef,
        scheduleFrom: scheduleFromRef,
        scheduleTo: scheduleToRef,
        scheduleNote: scheduleNoteRef,
        meeting: meetingRef,
    };

    const fontStyle = { fontFamily: "'Roboto Slab', serif" };

    // ==================== INITIAL FORM STATE ====================
    const initialFormState = {
        status: null,
        cancelReason: '',
        scheduleFrom: '',
        scheduleTo: '',
        scheduleBy: '',
        scheduleNote: '',
        duration: '',
        meetingType: 'Virtual',
        meetingFrom: '',
        meetingTo: '',
        meetingMode: null,
        handledBy: null,
        meetingOutcome: '',
    };

    // ==================== STATE ====================
    const [taskForm, setTaskForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [scheduleItems, setScheduleItems] = useState([]);
    const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);
    const [scheduleErrors, setScheduleErrors] = useState({});
    const [IDsCollection, setIDsCollection] = useState({});

    // ==================== DERIVED STATES ====================
    const isCancelled = taskForm.status?.value === 'cancelled';
    const isCompleted = taskForm.status?.value === 'completed';
    const isScheduled = taskForm.status?.value === 'scheduled';

    // ==================== OPTIONS ====================
    const statusOptions = [
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    const meetingModeOptions = [
        { value: 'zoom', label: 'Zoom' },
        { value: 'googlemeet', label: 'Google Meet' },
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'teams', label: 'Teams' }
    ];

    const handledByOptions = [
        { value: 'MD', label: 'MD' },
        { value: 'CRO', label: 'CRO' },
        { value: 'Consultant', label: 'Consultant' }
    ];

    // ==================== UTILITY FUNCTIONS ====================
   
    const formatDateTime = useCallback((dt) => {
        if (!dt) return '—';
        try {
            return new Date(dt).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } catch {
            return '—';
        }
    }, []);

 
    const getTrimmedValue = useCallback((value) => {
        return typeof value === 'string' ? value.trim() : '';
    }, []);

   
    const isValidDateRange = useCallback((fromDate, toDate) => {
        if (!fromDate || !toDate) return false;
        return new Date(toDate) > new Date(fromDate);
    }, []);

   
    const calculateDuration = useCallback((fromDate, toDate) => {
        if (!fromDate || !toDate) return '';
        
        const start = new Date(fromDate);
        const end = new Date(toDate);
        const diffMs = end - start;

        if (diffMs <= 0) return 'Invalid Range';

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        let durationText = '';
        if (days > 0) durationText += `${days}d `;
        if (hours > 0) durationText += `${hours}h `;
        durationText += `${minutes}m`;

        return durationText.trim();
    }, []);

    
    const updateForm = useCallback((field, value) => {
        setTaskForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
        if (scheduleErrors[field]) {
            setScheduleErrors(prev => ({ ...prev, [field]: '' }));
        }
    }, [errors, scheduleErrors]);

    // ==================== AUTO-CALCULATE DURATION ====================
    useEffect(() => {
        const { scheduleFrom, scheduleTo } = taskForm;
        if (scheduleFrom && scheduleTo) {
            const duration = calculateDuration(scheduleFrom, scheduleTo);
            updateForm('duration', duration);
        } else {
            updateForm('duration', '');
        }
    }, [taskForm.scheduleFrom, taskForm.scheduleTo, calculateDuration, updateForm]);

    // ==================== VALIDATION FUNCTIONS ====================

    
    const validateScheduleField = useCallback((field, value) => {
        const trimmed = getTrimmedValue(value);

        switch (field) {
            case 'scheduleBy':
                return !trimmed ? 'Please enter who is scheduling.' : '';
            
            case 'scheduleFrom':
                return !value ? 'Please select start date.' : '';
            
            case 'scheduleTo':
                if (!value) return 'Please select end date.';
                if (!taskForm.scheduleFrom) return '';
                return !isValidDateRange(taskForm.scheduleFrom, value)
                    ? 'To date must be after From date.'
                    : '';
            
            case 'scheduleNote':
                return !trimmed ? 'Please enter schedule note.' : '';
            
            default:
                return '';
        }
    }, [taskForm.scheduleFrom, getTrimmedValue, isValidDateRange]);

   
    const validateScheduleForm = useCallback(() => {
        const newErrors = {
            scheduleBy: validateScheduleField('scheduleBy', taskForm.scheduleBy),
            scheduleFrom: validateScheduleField('scheduleFrom', taskForm.scheduleFrom),
            scheduleTo: validateScheduleField('scheduleTo', taskForm.scheduleTo),
            scheduleNote: validateScheduleField('scheduleNote', taskForm.scheduleNote),
        };

        setScheduleErrors(newErrors);
        
        // Return true if no errors
        return Object.values(newErrors).every(error => !error);
    }, [taskForm.scheduleBy, taskForm.scheduleFrom, taskForm.scheduleTo, taskForm.scheduleNote, validateScheduleField]);

    
    const validateField = useCallback((field) => {
        const value = taskForm[field];
        const trimmed = getTrimmedValue(value);
        let error = '';

        switch (field) {
            case 'status':
                error = !value ? 'Please select a status.' : '';
                break;
            case 'cancelReason':
                error = isCancelled && !trimmed ? 'Please provide a cancellation reason.' : '';
                break;
            default:
                break;
        }

        setErrors(prev => ({ ...prev, [field]: error }));
        return !error;
    }, [taskForm, isCancelled, getTrimmedValue]);

    
    const validateAll = useCallback(() => {
        let isValid = true;
        const newErrors = {};

        // Validate status
        if (!taskForm.status) {
            newErrors.status = 'Please select a status.';
            isValid = false;
        }

        // Validate cancellation reason
        if (isCancelled && !getTrimmedValue(taskForm.cancelReason)) {
            newErrors.cancelReason = 'Please provide a cancellation reason.';
            isValid = false;
        }

        // Validate schedules if scheduled status
        if (isScheduled) {
            if (scheduleItems.length === 0) {
                newErrors.scheduleRequired = 'Please add at least one schedule.';
                isValid = false;
            }
        }

        // Validate meeting details if completed status
        if (isCompleted) {
            if (!taskForm.meetingFrom) {
                newErrors.meetingFrom = 'Please select meeting start time.';
                isValid = false;
            }
            if (!taskForm.meetingTo) {
                newErrors.meetingTo = 'Please select meeting end time.';
                isValid = false;
            }
            if (!taskForm.meetingMode) {
                newErrors.meetingMode = 'Please select meeting mode.';
                isValid = false;
            }
            if (!taskForm.handledBy) {
                newErrors.handledBy = 'Please select who handled the meeting.';
                isValid = false;
            }
        }

        // Set errors state
        setErrors(newErrors);

        return { isValid, errors: newErrors };
    }, [taskForm, isCancelled, isScheduled, isCompleted, scheduleItems.length, getTrimmedValue]);

    // ==================== SCROLL TO ERROR ====================

   
    const scrollToError = useCallback((fieldName) => {
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
    }, [fieldRefs]);

    // ==================== DATA FETCHING & FILTERING ====================

    const { data, error, isPending, isSuccess } = useGet();

    useEffect(() => {
        if (id?.mainID) {
            // Fetch data if needed
            // mutate({ _id: id.mainID });
        }
    }, [id?.mainID]);

   
    const filteredData = useCallback((rawData) => {
        if (!rawData?.details || !Array.isArray(rawData.details)) {
            return [];
        }

        return rawData.details.map(detail => {
            const stage1Arr = detail.stages?.Stage1 || [];

            return {
                detailId: detail._id,
                stageId: stage1Arr.map(stage => ({
                    StageID: stage?._id,
                    updateAt: stage?.stageEnteredAt
                }))
            };
        });
    }, []);

    useEffect(() => {
        if (data) {
            const result = filteredData(data);
            const firstItem = result?.[0];

            if (firstItem) {
                const { detailId, stageId } = firstItem;

                setIDsCollection((prev) => {
                    if (prev.detailId === detailId && prev.stageId === stageId) {
                        return prev;
                    }
                    return { ...prev, detailId, stageId };
                });
            }
        }
    }, [data, filteredData]);

    // ==================== SCHEDULE HANDLERS ====================

    /**
     * Handles adding a new schedule item
     */
    const handleAddSchedule = useCallback(() => {
        if (!validateScheduleForm()) {
            // Scroll to first schedule error
            if (scheduleErrors.scheduleBy) {
                scrollToError('scheduleBy');
            } else if (scheduleErrors.scheduleFrom) {
                scrollToError('scheduleFrom');
            } else if (scheduleErrors.scheduleTo) {
                scrollToError('scheduleTo');
            } else if (scheduleErrors.scheduleNote) {
                scrollToError('scheduleNote');
            }
            return;
        }

        const newSchedule = {
            id: Date.now(),
            by: getTrimmedValue(taskForm.scheduleBy),
            fromDate: taskForm.scheduleFrom,
            toDate: taskForm.scheduleTo,
            note: getTrimmedValue(taskForm.scheduleNote),
            duration: taskForm.duration
        };

        setScheduleItems(prev => [...prev, newSchedule]);

        // Reset schedule form fields
        setTaskForm(prev => ({
            ...prev,
            scheduleFrom: '',
            scheduleTo: '',
            scheduleBy: '',
            scheduleNote: '',
            duration: ''
        }));
        setScheduleErrors({});
    }, [validateScheduleForm, scheduleErrors, taskForm, getTrimmedValue, scrollToError]);

   
    const handleRemoveSchedule = useCallback((scheduleId) => {
        setScheduleItems(prev => prev.filter(s => s.id !== scheduleId));
    }, []);

   
    const handleStatusChange = useCallback((selectedOption) => {
        setTaskForm(prev => ({ ...prev, status: selectedOption }));
        setErrors({});

        if (selectedOption?.value === 'scheduled') {
            setIsSchedulingOpen(true);
        } else {
            setIsSchedulingOpen(false);
        }
    }, []);

    const handleSaveTask = useCallback(() => {
        const validation = validateAll();
        
        if (!validation.isValid) {
            // Scroll to the first error field using the returned errors
            setTimeout(() => {
                if (validation.errors.status) {
                    scrollToError('status');
                } else if (validation.errors.cancelReason) {
                    scrollToError('cancelReason');
                } else if (validation.errors.scheduleRequired) {
                    scrollToError('scheduleRequired');
                } else if (validation.errors.meetingFrom || validation.errors.meetingTo || validation.errors.meetingMode || validation.errors.handledBy) {
                    scrollToError('meeting');
                }
            }, 0);
            return;
        }

        const params = {
            MainID: id?.mainID,
            DetailsID: IDsCollection.detailId,
            Stage1: IDsCollection.stageId?.[0]?.StageID,
        };

        let payload = {};

        if (isCompleted) {
            payload.GeneralDetails = {
                status: "completed",
                meetingDetails: {
                    meetingType: taskForm.meetingType,
                    meetingFrom: taskForm.meetingFrom,
                    meetingTo: taskForm.meetingTo,
                    meetingMode: taskForm.meetingMode?.value,
                    handledBy: taskForm.handledBy?.value,
                    meetingOutcome: getTrimmedValue(taskForm.meetingOutcome)
                },
                scheduleDetails: scheduleItems.map(item => ({
                    by: item.by,
                    fromDate: item.fromDate,
                    toDate: item.toDate,
                    note: item.note,
                    duration: item.duration
                }))
            };
        } else if (isScheduled) {
            payload.scheduleDetails = scheduleItems.map(item => ({
                by: item.by,
                fromDate: item.fromDate,
                toDate: item.toDate,
                note: item.note,
                duration: item.duration
            }));
        } else if (isCancelled) {
            payload.cancelDetails = [{
                status: "cancelled",
                cancelNote: getTrimmedValue(taskForm.cancelReason)
            }];
        }

        addMsg_call_sch.mutate({ payload, params }, {
            onSuccess: () => {
                alert('Task updated successfully!');
            },
            onError: (err) => {
                console.error("Update Error:", err);
                alert(err?.response?.data?.message || "Something went wrong");
            }
        });
    }, [validateAll, scrollToError, id?.mainID, IDsCollection, isCompleted, isScheduled, isCancelled, taskForm, scheduleItems, getTrimmedValue, addMsg_call_sch]);

    // ==================== JSX ====================

    return (
        <div style={fontStyle} className="mx-auto bg-transparent p-4 w-full rounded-lg">
            {/* Header Actions */}
            <div className='w-full flex justify-end gap-2 mb-4'>
                <span className='bg-blue-50 p-2 hover:bg-blue-100 transition-all cursor-pointer rounded'>
                    <Edit2 size={14} className='text-blue-500' />
                </span>
                <span className='bg-amber-50 p-2 hover:bg-amber-100 transition-all cursor-pointer rounded'>
                    <Trash2 size={14} className='text-orange-500' />
                </span>
            </div>

            <div className="space-y-6">
                {/* ──────────── STATUS ──────────── */}
                <div className="grid grid-cols-1 gap-2" ref={statusRef}>
                    <div className="flex items-center gap-1 text-[12px] font-semibold text-slate-900 uppercase">
                        <div className="bg-amber-50 p-1 rounded">
                            <CheckCircle2 size={14} className="text-amber-500" />
                        </div>
                        Status
                    </div>
                    <Select
                        options={statusOptions}
                        placeholder="Select Status"
                        styles={ValidateStyle(!!errors.status, false)}
                        value={taskForm.status}
                        onChange={handleStatusChange}
                    />
                    {errors.status && (
                        <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1 bg-red-50 p-2 rounded">
                            <AlertCircle size={14} className="flex-shrink-0" />
                            <span>{errors.status}</span>
                        </div>
                    )}
                </div>

                {/* ──────────── CANCELLATION ──────────── */}
                {isCancelled && (
                    <div className="p-4 bg-red-50/50 rounded-xl border border-red-100" ref={cancelReasonRef}>
                        <div className="flex items-center gap-2 mb-3">
                            <Ban size={14} className="text-red-500" />
                            <h3 className="text-[13px] font-bold text-red-700 uppercase tracking-wide">
                                Cancellation Reason
                            </h3>
                        </div>
                        <textarea
                            rows={4}
                            value={taskForm.cancelReason}
                            onChange={(e) => updateForm('cancelReason', e.target.value)}
                            onBlur={() => validateField('cancelReason')}
                            placeholder="Enter reason for cancellation..."
                            className={getInputClass(!!errors.cancelReason)}
                        />
                        {errors.cancelReason && (
                            <div className="flex items-center gap-1.5 text-xs text-red-600 mt-2 bg-red-50 p-2 rounded">
                                <AlertCircle size={14} className="flex-shrink-0" />
                                <span>{errors.cancelReason}</span>
                            </div>
                        )}
                    </div>
                )}

                <hr className="border-slate-100 my-4" />

                {/* ──────────── SCHEDULE SECTION ──────────── */}
                {isScheduled && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200" ref={scheduleRef}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-amber-50 p-1.5 rounded">
                                    <Calendar size={14} className="text-amber-500" />
                                </div>
                                <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-tight">
                                    Schedule
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsSchedulingOpen(prev => !prev)}
                                className="bg-orange-50 p-1.5 rounded hover:bg-orange-100 transition-colors"
                            >
                                {isSchedulingOpen
                                    ? <Minus size={14} className="text-orange-500" />
                                    : <Plus size={14} className="text-orange-500" />}
                            </button>
                        </div>

                        {errors.scheduleRequired && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                                <AlertCircle size={14} className="text-red-600 flex-shrink-0" />
                                <p className="text-xs text-red-600 font-medium">{errors.scheduleRequired}</p>
                            </div>
                        )}

                        {isSchedulingOpen && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                                {/* Schedule By */}
                                <div className="sm:col-span-2 flex flex-col gap-2" ref={scheduleByRef}>
                                    <span className="text-xs font-semibold flex items-center gap-1">
                                        <User size={12} className="text-slate-500" />
                                        Schedule By
                                    </span>
                                    <input
                                        type="text"
                                        value={taskForm.scheduleBy}
                                        onChange={(e) => updateForm('scheduleBy', e.target.value)}
                                        onBlur={() => validateScheduleField('scheduleBy', taskForm.scheduleBy)}
                                        placeholder="Scheduled by..."
                                        className={getInputClass(!!scheduleErrors.scheduleBy)}
                                    />
                                    {scheduleErrors.scheduleBy && (
                                        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded">
                                            <AlertCircle size={13} className="flex-shrink-0" />
                                            <span>{scheduleErrors.scheduleBy}</span>
                                        </div>
                                    )}
                                </div>

                                {/* From Date */}
                                <div className="flex flex-col gap-2" ref={scheduleFromRef}>
                                    <span className="text-xs font-semibold">From</span>
                                    <input
                                        type="datetime-local"
                                        value={taskForm.scheduleFrom}
                                        onChange={(e) => updateForm('scheduleFrom', e.target.value)}
                                        onBlur={() => validateScheduleField('scheduleFrom', taskForm.scheduleFrom)}
                                        className={getInputClass(!!scheduleErrors.scheduleFrom)}
                                    />
                                    {scheduleErrors.scheduleFrom && (
                                        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded">
                                            <AlertCircle size={13} className="flex-shrink-0" />
                                            <span>{scheduleErrors.scheduleFrom}</span>
                                        </div>
                                    )}
                                </div>

                                {/* To Date */}
                                <div className="flex flex-col gap-2" ref={scheduleToRef}>
                                    <span className="text-xs font-semibold">To</span>
                                    <input
                                        type="datetime-local"
                                        value={taskForm.scheduleTo}
                                        onChange={(e) => updateForm('scheduleTo', e.target.value)}
                                        onBlur={() => validateScheduleField('scheduleTo', taskForm.scheduleTo)}
                                        className={getInputClass(!!scheduleErrors.scheduleTo)}
                                    />
                                    {scheduleErrors.scheduleTo && (
                                        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded">
                                            <AlertCircle size={13} className="flex-shrink-0" />
                                            <span>{scheduleErrors.scheduleTo}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Note */}
                                <div className="sm:col-span-2 flex flex-col gap-2" ref={scheduleNoteRef}>
                                    <span className="text-xs font-semibold">Note</span>
                                    <textarea
                                        rows={2}
                                        value={taskForm.scheduleNote}
                                        onChange={(e) => updateForm('scheduleNote', e.target.value)}
                                        onBlur={() => validateScheduleField('scheduleNote', taskForm.scheduleNote)}
                                        placeholder="Enter schedule note..."
                                        className={getInputClass(!!scheduleErrors.scheduleNote)}
                                    />
                                    {scheduleErrors.scheduleNote && (
                                        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded">
                                            <AlertCircle size={13} className="flex-shrink-0" />
                                            <span>{scheduleErrors.scheduleNote}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Duration Display */}
                                {taskForm.duration && (
                                    <div className="sm:col-span-2 bg-white p-3 rounded border border-slate-200 flex items-center gap-2">
                                        <Clock size={14} className="text-amber-500" />
                                        <span className="text-sm">
                                            Duration: <span className="font-semibold">{taskForm.duration}</span>
                                        </span>
                                    </div>
                                )}

                                {/* Add Schedule Button */}
                                <div className="sm:col-span-2 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleAddSchedule}
                                        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm shadow-amber-200 transition-all"
                                    >
                                        <Plus size={14} />
                                        Add Schedule
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ──── Schedule Items Preview ──── */}
                        {scheduleItems.length > 0 && (
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between px-1">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        Added Schedules
                                        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-[10px]">
                                            {scheduleItems.length}
                                        </span>
                                    </h3>
                                </div>

                                <div className="grid gap-3">
                                    {scheduleItems.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            className="group relative bg-white border border-slate-200 rounded-xl p-4 transition-all duration-200 hover:border-amber-200 hover:shadow-md hover:shadow-amber-500/5"
                                        >
                                            <div className="absolute left-0 top-4 bottom-4 w-1 bg-amber-400 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    {/* By */}
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="p-1.5 bg-amber-50 rounded-lg">
                                                            <User size={12} className="text-amber-600" />
                                                        </div>
                                                        <span className="text-sm font-bold text-slate-800 truncate">
                                                            {item.by}
                                                        </span>
                                                        <span className="text-[10px] font-medium text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                                                            ENTRY #{idx + 1}
                                                        </span>
                                                    </div>

                                                    {/* Date & Duration */}
                                                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600 mb-3">
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock size={12} className="text-slate-400" />
                                                            <span className="font-medium">{formatDateTime(item.fromDate)}</span>
                                                            <span className="text-slate-300">→</span>
                                                            <span className="font-medium">{formatDateTime(item.toDate)}</span>
                                                        </div>

                                                        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md text-[10px] font-bold border border-emerald-100">
                                                            {item.duration}
                                                        </span>
                                                    </div>

                                                    {/* Note */}
                                                    {item.note && (
                                                        <div className="relative pl-3 border-l-2 border-slate-100">
                                                            <p className="text-xs text-slate-500 italic leading-relaxed">
                                                                "{item.note}"
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleRemoveSchedule(item.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    aria-label="Delete schedule"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <hr className="border-slate-100 my-4" />

                {/* ──────────── VIRTUAL MEETING ──────────── */}
                <div className={`space-y-4 ${isCancelled ? 'opacity-60 pointer-events-none' : ''}`} ref={meetingRef}>
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-900 uppercase">
                        <div className="bg-purple-50 p-1.5 rounded">
                            <Video size={15} className="text-purple-500" />
                        </div>
                        Virtual Meeting
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Meeting From */}
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-semibold">From</span>
                            <input
                                type="datetime-local"
                                value={isCancelled ? "" : taskForm.meetingFrom}
                                onChange={(e) => updateForm('meetingFrom', e.target.value)}
                                className={getInputClass(!!errors.meetingFrom, isCancelled)}
                                disabled={isCancelled}
                            />
                            {errors.meetingFrom && (
                                <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded">
                                    <AlertCircle size={13} className="flex-shrink-0" />
                                    <span>{errors.meetingFrom}</span>
                                </div>
                            )}
                        </div>

                        {/* Meeting To */}
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-semibold">To</span>
                            <input
                                type="datetime-local"
                                value={isCancelled ? "" : taskForm.meetingTo}
                                onChange={(e) => updateForm('meetingTo', e.target.value)}
                                className={getInputClass(!!errors.meetingTo, isCancelled)}
                                disabled={isCancelled}
                            />
                            {errors.meetingTo && (
                                <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded">
                                    <AlertCircle size={13} className="flex-shrink-0" />
                                    <span>{errors.meetingTo}</span>
                                </div>
                            )}
                        </div>

                        {/* Meeting Mode */}
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-semibold">Mode</span>
                            <Select
                                options={meetingModeOptions}
                                placeholder="Meeting Mode"
                                styles={ValidateStyle(!!errors.meetingMode, isCancelled)}
                                isDisabled={isCancelled}
                                value={taskForm.meetingMode}
                                onChange={(opt) => updateForm('meetingMode', opt)}
                            />
                            {errors.meetingMode && (
                                <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded">
                                    <AlertCircle size={13} className="flex-shrink-0" />
                                    <span>{errors.meetingMode}</span>
                                </div>
                            )}
                        </div>

                        {/* Handled By */}
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-semibold">Handled By</span>
                            <Select
                                options={handledByOptions}
                                placeholder="Handled By"
                                styles={ValidateStyle(!!errors.handledBy, isCancelled)}
                                isDisabled={isCancelled}
                                value={taskForm.handledBy}
                                onChange={(opt) => updateForm('handledBy', opt)}
                            />
                            {errors.handledBy && (
                                <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded">
                                    <AlertCircle size={13} className="flex-shrink-0" />
                                    <span>{errors.handledBy}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Meeting Outcome */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-600 uppercase mb-3">
                            <CheckCircle2 size={12} className="text-amber-500" />
                            Meeting Outcome
                        </div>
                        <textarea
                            rows={3}
                            value={isCancelled ? "" : taskForm.meetingOutcome}
                            onChange={(e) => updateForm('meetingOutcome', e.target.value)}
                            placeholder="Enter meeting outcome..."
                            className={getInputClass(!!errors.meetingOutcome, isCancelled)}
                            disabled={isCancelled}
                        />
                    </div>
                </div>
            </div>

            {/* ──────────── ACTION BUTTONS ──────────── */}
            <div className="flex gap-3 mt-8">
                <button className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl transition-colors font-medium">
                    <XCircle size={16} />
                    Terminate
                </button>

                <button
                    onClick={handleSaveTask}
                    className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl shadow-md shadow-orange-200 transition-all font-medium"
                >
                    {isCompleted ? 'Next Step' : 'Save Task'}
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};