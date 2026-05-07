import React, { useEffect, useState, useRef } from 'react';
import {
    Calendar,
    Plus,
    Phone,
    MessageSquare,
    ChevronRight,
    XCircle,
    Clock,
    CheckCircle2,
    Ban,
    Minus,
    Pencil,
    Edit2,
    Trash2,
    User,
    Edit,
} from 'lucide-react';
import Select from 'react-select';
import { getCountdown, getInputClass, ValidateStyle } from '../../../../../data/data';
import { UseAdd } from '../../../../hooks/useadd';
import { useGet } from '../../../../hooks/useGet';


export const Task = ({ id }) => {
    // console.log('something', id)
    const { getDetails_, getScheduleOnly_ } = useGet();
    const { addMsg_call_sch, add_sch_Only } = UseAdd();


    const schedulingRef = useRef(null);
    const callRef = useRef(null);
    const messageRef = useRef(null);

    const [IDsCollection, setIDsCollection] = useState({});
    const fontStyle = { fontFamily: "'Roboto Slab', serif" };

    // ==================== INITIAL FORM STATE ====================
    const initialFormState = {
        status: null,
        cancelReason: '',

        // Schedule
        scheduleFrom: '',
        scheduleTo: '',
        scheduleNote: '',
        scheduleBy: '',       // NEW FIELD
        duration: '',

        // Call Details
        callBy: '',
        callType: null,
        callDate: '',
        callNote: '',

        // Message Details
        messageBy: '',
        msgType: null,
        messageDate: '',
        messageNote: '',
    };

    const [taskForm, setTaskForm] = useState(initialFormState);
    const [scheduleItems, setScheduleItems] = useState([]);
    const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [scheduleErrors, setScheduleErrors] = useState({}); // NEW — separate schedule errors

    const isCancelled = taskForm.status?.value === 'cancelled';
    const isScheduled = taskForm.status?.value === 'scheduled';
    const isCompleted = taskForm.status?.value === 'completed';

    const callOptions = [
        { value: 'cold', label: 'Cold Call' },
        { value: 'followup', label: 'Follow-up' },
        { value: 'closing', label: 'Closing' }
    ];

    const msgOptions = [
        { value: 'messenger', label: 'Messenger' },
        { value: 'viber', label: 'Viber' },
        { value: 'email', label: 'Email' },
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'text', label: 'Text' },
        { value: 'fb', label: 'FB' },
        { value: 'tiktok', label: 'TikTok' }
    ];

    const statusOptions = [
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    // ==================== FORM UPDATER ====================
    const updateForm = (field, value) => {
        setTaskForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
        // Also clear schedule errors for schedule fields
        if (scheduleErrors[field]) {
            setScheduleErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // ==================== RESET ====================
    const resetScheduleForm = () => {
        setTaskForm(prev => ({
            ...prev,
            scheduleFrom: '',
            scheduleTo: '',
            scheduleNote: '',
            scheduleBy: '',
            duration: '',
        }));
        setScheduleErrors({});
    };

    const resetFullForm = () => {
        setTaskForm(initialFormState);
        setScheduleItems([]);
        setIsSchedulingOpen(false);
        setErrors({});
        setScheduleErrors({});
    };

    // ==================== SCHEDULE-ONLY VALIDATION ====================
    // Validates only the schedule sub-form fields. Used by "Add Schedule" button.
    const validateScheduleForm = () => {
        const newErrors = {};

        if (!taskForm.scheduleBy?.trim()) {
            newErrors.scheduleBy = 'Please enter who is scheduling.';
        }
        if (!taskForm.scheduleFrom) {
            newErrors.scheduleFrom = 'Please select start date.';
        }
        if (!taskForm.scheduleTo) {
            newErrors.scheduleTo = 'Please select end date.';
        } else if (taskForm.scheduleFrom && new Date(taskForm.scheduleTo) <= new Date(taskForm.scheduleFrom)) {
            newErrors.scheduleTo = 'To date must be after From date.';
        }
        if (!taskForm.scheduleNote?.trim()) {
            newErrors.scheduleNote = 'Please enter schedule note.';
        }

        setScheduleErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ==================== ADD SCHEDULE HANDLER ====================


    const handleRemoveScheduleItem = (itemId) => {

        // setScheduleItems(prev => prev.filter(s => s.id !== itemId));
    };
    const handleEditScheduleItem = () => {

    }

    // ==================== MAIN VALIDATION (Save Task) ====================
    // Does NOT validate schedule form fields — only status, cancel, call/message.
    const validateField = (field) => {
        const value = taskForm[field];
        const trimmed = typeof value === 'string' ? value.trim() : value;
        let error = '';

        switch (field) {
            case 'status':
                if (!value) error = 'Please select a status.';
                break;
            case 'cancelReason':
                if (isCancelled && !trimmed) error = 'Please provide a cancellation reason.';
                break;
            // Call / Message validated as groups below
            default:
                break;
        }

        setErrors(prev => ({ ...prev, [field]: error }));
        return !error;
    };

    const validateCallDetails = () => {
        if (isCancelled) return true;
        const callFields = ['callBy', 'callType', 'callDate', 'callNote'];
        let hasError = false;

        callFields.forEach(field => {
            const value = taskForm[field];
            const trimmed = typeof value === 'string' ? value.trim() : value;
            let error = '';

            if (!value || (typeof trimmed === 'string' && !trimmed)) {
                error = field === 'callType'
                    ? 'Please select call type.'
                    : `Please enter ${field.replace('call', '').toLowerCase()}.`;
            }

            if (error) {
                setErrors(prev => ({ ...prev, [field]: error }));
                hasError = true;
            }
        });

        return !hasError;
    };

    const validateMessageDetails = () => {
        if (isCancelled) return true;
        const msgFields = ['messageBy', 'msgType', 'messageDate', 'messageNote'];
        let hasError = false;

        msgFields.forEach(field => {
            const value = taskForm[field];
            const trimmed = typeof value === 'string' ? value.trim() : value;
            let error = '';

            if (!value || (typeof trimmed === 'string' && !trimmed)) {
                error = field === 'msgType'
                    ? 'Please select message type.'
                    : `Please enter ${field.replace('message', '').toLowerCase() || 'note'}.`;
            }

            if (error) {
                setErrors(prev => ({ ...prev, [field]: error }));
                hasError = true;
            }
        });

        return !hasError;
    };

    const validateAll = () => {
        let isValid = true;
        let firstErrorRef = null;

        // Status
        if (!validateField('status')) {
            isValid = false;
        }

        // Cancellation reason
        if (isCancelled && !validateField('cancelReason')) {
            isValid = false;
        }

        const callFilled = taskForm.callBy || taskForm.callType || taskForm.callDate || taskForm.callNote;
        const messageFilled = taskForm.messageBy || taskForm.msgType || taskForm.messageDate || taskForm.messageNote;

        if (!callFilled && !messageFilled && !isCancelled) {
            setErrors(prev => ({
                ...prev,
                callBy: 'Please fill either Call Details or Message Details',
                messageBy: 'Please fill either Call Details or Message Details',
            }));
            isValid = false;
            firstErrorRef = callRef;
        } else {
            if (callFilled && !validateCallDetails()) {
                isValid = false;
                firstErrorRef = callRef;
            }
            if (messageFilled && !validateMessageDetails()) {
                isValid = false;
                if (!firstErrorRef) firstErrorRef = messageRef;
            }
        }

        if (!isValid && firstErrorRef?.current) {
            firstErrorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    };

    // ==================== HANDLERS ====================
    const handleStatusChange = (selectedOption) => {
        setTaskForm(prev => ({ ...prev, status: selectedOption }));
        setErrors({});
        setScheduleErrors({});

        if (selectedOption?.value === 'scheduled') {
            setIsSchedulingOpen(true);
        } else {
            setIsSchedulingOpen(false);
            resetScheduleForm();
        }
    };

    const handleToggleSchedule = () => {
        if (isCancelled) return;
        if (!isScheduled) {
            setTaskForm(prev => ({
                ...prev,
                status: { value: 'scheduled', label: 'Scheduled' }
            }));
            setIsSchedulingOpen(true);
            return;
        }
        setIsSchedulingOpen(prev => !prev);
    };

    // Auto calculate duration
    useEffect(() => {
        const { scheduleFrom, scheduleTo } = taskForm;
        if (scheduleFrom && scheduleTo) {
            const start = new Date(scheduleFrom);
            const end = new Date(scheduleTo);
            const diffMs = end - start;

            if (diffMs > 0) {
                const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

                let durationText = '';
                if (days > 0) durationText += `${days}d `;
                if (hours > 0) durationText += `${hours}h `;
                durationText += `${minutes}m`;

                updateForm('duration', durationText.trim());
            } else {
                updateForm('duration', 'Invalid Range');
            }
        } else {
            updateForm('duration', '');
        }
    }, [taskForm.scheduleFrom, taskForm.scheduleTo]);

    const { data, error, isPending, isSuccess, mutate } = getDetails_;

    useEffect(() => {
        if (id?.mainID) {
            mutate({ _id: id.mainID });
        }
    }, [id?.mainID]); // Added dependency for safety



    useEffect(() => {
        if (data) {
            // Pass the 'data' variable to the function
            const result = filteredData(data);
            const firstItem = result?.[0];

            if (firstItem) {
                const { detailId, stageId } = firstItem;

                // Only update state if values are different to avoid render loops
                setIDsCollection((prev) => {
                    if (prev.detailId === detailId && prev.stageId === stageId) return prev;
                    return { ...prev, detailId, stageId };
                });
            }
        }
    }, [data]);

    /**
     * Optimized Filter Function
     */
    const filteredData = (rawData) => {
        if (!rawData?.details) return [];

        return rawData.details.map(detail => {
            const stage1Arr = detail.stages?.Stage1 || [];

            return {
                detailId: detail._id,
                createdAt: detail.createdAt,

                // Flattening call details
                callDetails: stage1Arr.flatMap(stage =>
                    stage.GeneralDetails?.callDetails?.map(call => ({
                        callId: call._id,
                        ...call
                    })) || []
                ),

                // Extracting Stage IDs
                stageId: stage1Arr.map(stage => ({
                    StageID: stage?._id,
                    updateAt: stage?.stageEnteredAt
                })),

                // Flattening message details
                messageDetails: stage1Arr.flatMap(stage =>
                    stage.GeneralDetails?.messageDetails?.map(msg => ({
                        messageId: msg._id,
                        ...msg
                    })) || []
                ),

                // Flattening schedules
                schedules: stage1Arr.flatMap(stage =>
                    stage.schedules?.map(schedule => ({
                        scheduleId: schedule._id,
                        ...schedule
                    })) || []
                )
            };
        });
    };

    // ==================== SAVE TASK ====================
    const handleSaveTask = () => {
        if (!validateAll()) return;


        const parms = {
            MainID: id?.mainID,
            DetailsID: IDsCollection.detailId,
            Stage1: IDsCollection.stageId[0]?.StageID,
        };
        let payload = {};

        if (isCompleted) {
            // GeneralDetails is an OBJECT containing arrays
            payload.GeneralDetails = {
                status: "completed",
                callDetails: taskForm.callBy ? [{
                    by: taskForm.callBy,
                    type: taskForm.callType?.value,
                    // callDuration: 135, // Add this if you have the field in taskForm
                    dateTime: taskForm.callDate,
                    note: taskForm.callNote
                }] : [],
                messageDetails: taskForm.messageBy ? [{
                    by: taskForm.messageBy,
                    type: taskForm.msgType?.value,
                    dateTime: taskForm.messageDate,
                    note: taskForm.messageNote
                }] : []
            };

        } else if (isCancelled) {
            // cancelDetails is an ARRAY of objects
            payload.cancelDetails = [{
                status: "cancel",
                cancelNote: taskForm.cancelReason
            }];
        }

        // console.log('Final Payload Format:', payload);

        addMsg_call_sch.mutate({ payload, parms }, {
            onSuccess: () => {
                alert('Task updated successfully!');
            },
            onError: (err) => {
                console.error("Update Error:", err);
                alert(err?.response?.data?.message || "Something went wrong");
            }
        });
    };
    // const { isSuccess, isError, isPending, mutate } = add_sch_Only;
    const handleAddSchedule = () => {
        if (!validateScheduleForm()) {
            if (schedulingRef.current) {
                schedulingRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        const parms = {
            MainID: id?.mainID,
            DetailsID: IDsCollection.detailId,
            Stage1: IDsCollection.stageId[0]?.StageID,
        };

        // let payload = {};
        if (isScheduled) {
        }
        const payload = {
            scheduleDetails: [
                {
                    by: taskForm.scheduleBy,
                    fromDate: taskForm.scheduleFrom,
                    toDate: taskForm.scheduleTo,
                    scheduleNote: taskForm.scheduleNote
                }
            ]
        };
        // console.log("Schedule data ", schedules, newItem)
        add_sch_Only.mutate({ payload, parms }, {
            onSuccess: (data) => {
                alert(data?.message)
                FetchScheduleOnly();
            },
            onError: (err) => {
                console.error("Update Error:", err);
                alert(err?.response?.data?.message || "Something went wrong");
            }
        })
        resetScheduleForm(); // Clear the schedule sub-form after adding
    };

    const FetchScheduleOnly = () => {
        const parms = {
            MainID: id?.mainID,
            DetailsID: IDsCollection.detailId,
            Stage1: IDsCollection.stageId?.[0]?.StageID,
        };
        console.log('PARMS', parms)
        if (!parms.MainID || !parms.DetailsID || !parms.Stage1) return;

        getScheduleOnly_.mutate({ parms }, {
            onSuccess: (data) => {
                console.log('from workplace:::', data.data)
                const res = data.data;

                const newItem = {
                    detailsId: res.detailsId,
                    mainId: res.mainId,
                    stageId: res.stageId,
                    schedules: res.schedules || []
                };
                setScheduleItems(prev => [...prev, newItem]);
            },
            onError: (err) => {
                console.error("Update Error:", err);
                // alert(err?.response?.data?.message || "Something went wrong");
            }
        })
    }
    useEffect(() => {
        FetchScheduleOnly(); 
    }, [id?.mainID, IDsCollection.detailId, IDsCollection.stageId]);
    
    // ==================== HELPERS ====================
    const formatDateTime = (dt) => {
        if (!dt) return '—';
        return new Date(dt).toLocaleString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const deadline = "2026-04-28T17:46:00";
    useEffect(() => {
        const interval = setInterval(() => {
            const T = getCountdown(deadline, 15);
            const { days, hours, minutes, seconds } = T.remaining;
            // console.log(`Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`);
            // console.log(T.isExpired)
            if (T.isExpired) clearInterval(interval)
        }, 1000)
        return () => clearInterval(interval);
    }, [])


    return (
        <div style={fontStyle} className="mx-auto bg-transparent p-4 w-full rounded-lg">
            <div className='w-full flex justify-end gap-2 mb-4'>
                <span className='bg-blue-50 p-2 hover:bg-blue-100 transition-all cursor-pointer rounded'>
                    <Edit2 size={14} className='text-blue-500' />
                </span>
                <span className='bg-amber-50 p-2 hover:bg-amber-100 transition-all cursor-pointer rounded'>
                    <Trash2 size={14} className='text-orange-500' />
                </span>
            </div>

            <div className="space-y-6">
                {/* ── Status ── */}
                <div className="grid grid-cols-1 gap-2">
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
                    {errors.status && <p className="text-xs text-red-500 mt-1">{errors.status}</p>}
                </div>

                {/* ── Cancellation ── */}
                {isCancelled && (
                    <div className="p-4 bg-red-50/50 rounded-xl border border-red-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Ban size={14} className="text-red-500" />
                            <h3 className="text-[13px] font-bold text-red-700 uppercase tracking-wide">
                                Cancellation Reason
                            </h3>
                        </div>
                        <textarea
                            rows={4}
                            value={taskForm.cancelReason}
                            onChange={(e) => updateForm('cancelReason', e.target.value)}
                            onBlur={(e) => validateField('cancelReason')}
                            placeholder="Enter reason for cancellation..."
                            className={getInputClass(!!errors.cancelReason)}
                        />
                        {errors.cancelReason && <p className="text-xs text-red-500 mt-1">{errors.cancelReason}</p>}
                    </div>
                )}

                {/* ── Schedule Section ── */}
                {isScheduled && (
                    <div ref={schedulingRef} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-amber-50 p-1.5 rounded">
                                    <Calendar size={14} className="text-amber-500" />
                                </div>
                                <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-tight">
                                    Re-Schedule Stage One
                                </h2>
                            </div>
                            <button
                                onClick={handleToggleSchedule}
                                className="bg-orange-50 p-1.5 rounded hover:bg-orange-100"
                            >
                                {isSchedulingOpen
                                    ? <Minus size={14} className="text-orange-500" />
                                    : <Plus size={14} className="text-orange-500" />}
                            </button>
                        </div>

                        {/* Schedule Form */}
                        {isSchedulingOpen && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                                {/* Schedule By — NEW FIELD */}
                                <div className="sm:col-span-2 flex flex-col gap-2">
                                    <span className="text-xs font-semibold flex items-center gap-1">
                                        <User size={12} className="text-slate-500" />
                                        Schedule By
                                    </span>
                                    <input
                                        type="text"
                                        value={taskForm.scheduleBy}
                                        onChange={(e) => updateForm('scheduleBy', e.target.value)}
                                        onBlur={() => {
                                            if (!taskForm.scheduleBy?.trim()) {
                                                setScheduleErrors(prev => ({ ...prev, scheduleBy: 'Please enter who is scheduling.' }));
                                            } else {
                                                setScheduleErrors(prev => ({ ...prev, scheduleBy: '' }));
                                            }
                                        }}
                                        placeholder="Scheduled by..."
                                        className={getInputClass(!!scheduleErrors.scheduleBy)}
                                    />
                                    {scheduleErrors.scheduleBy && (
                                        <p className="text-xs text-red-500">{scheduleErrors.scheduleBy}</p>
                                    )}
                                </div>

                                {/* From */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold">From</span>
                                    <input
                                        type="datetime-local"
                                        value={taskForm.scheduleFrom}
                                        onChange={(e) => updateForm('scheduleFrom', e.target.value)}
                                        onBlur={() => {
                                            if (!taskForm.scheduleFrom) {
                                                setScheduleErrors(prev => ({ ...prev, scheduleFrom: 'Please select start date.' }));
                                            } else {
                                                setScheduleErrors(prev => ({ ...prev, scheduleFrom: '' }));
                                            }
                                        }}
                                        className={getInputClass(!!scheduleErrors.scheduleFrom)}
                                    />
                                    {scheduleErrors.scheduleFrom && (
                                        <p className="text-xs text-red-500">{scheduleErrors.scheduleFrom}</p>
                                    )}
                                </div>

                                {/* To */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold">To</span>
                                    <input
                                        type="datetime-local"
                                        value={taskForm.scheduleTo}
                                        onChange={(e) => updateForm('scheduleTo', e.target.value)}
                                        onBlur={() => {
                                            if (!taskForm.scheduleTo) {
                                                setScheduleErrors(prev => ({ ...prev, scheduleTo: 'Please select end date.' }));
                                            } else if (taskForm.scheduleFrom && new Date(taskForm.scheduleTo) <= new Date(taskForm.scheduleFrom)) {
                                                setScheduleErrors(prev => ({ ...prev, scheduleTo: 'To date must be after From date.' }));
                                            } else {
                                                setScheduleErrors(prev => ({ ...prev, scheduleTo: '' }));
                                            }
                                        }}
                                        className={getInputClass(!!scheduleErrors.scheduleTo)}
                                    />
                                    {scheduleErrors.scheduleTo && (
                                        <p className="text-xs text-red-500">{scheduleErrors.scheduleTo}</p>
                                    )}
                                </div>

                                {/* Schedule Note */}
                                <div className="sm:col-span-2 flex flex-col gap-2">
                                    <span className="text-xs font-semibold">Schedule Note</span>
                                    <textarea
                                        rows={3}
                                        value={taskForm.scheduleNote}
                                        onChange={(e) => updateForm('scheduleNote', e.target.value)}
                                        onBlur={() => {
                                            if (!taskForm.scheduleNote?.trim()) {
                                                setScheduleErrors(prev => ({ ...prev, scheduleNote: 'Please enter schedule note.' }));
                                            } else {
                                                setScheduleErrors(prev => ({ ...prev, scheduleNote: '' }));
                                            }
                                        }}
                                        placeholder="Enter schedule purpose..."
                                        className={getInputClass(!!scheduleErrors.scheduleNote)}
                                    />
                                    {scheduleErrors.scheduleNote && (
                                        <p className="text-xs text-red-500">{scheduleErrors.scheduleNote}</p>
                                    )}
                                </div>

                                {/* Duration */}
                                <div className="sm:col-span-2 bg-white p-3 rounded border border-slate-200 flex items-center gap-2">
                                    <Clock size={14} className="text-amber-500" />
                                    <span className="text-sm">
                                        Duration: <span className="font-semibold">{taskForm.duration || '—'}</span>
                                    </span>
                                </div>

                                {/* ── Add Schedule Button ── */}
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

                        {/* ── Added Schedule Items List ── */}
                        {scheduleItems.length > 0 && (
                            <div className="mt-6 space-y-4">
                                {/* Header with Counter Badge */}
                                <div className="flex items-center justify-between px-1">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        Added Schedules
                                        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-[10px]">
                                            {scheduleItems.length}
                                        </span>
                                    </h3>
                                </div>

                                <div className="grid gap-3">
                                    {scheduleItems.flatMap(group =>
                                        group.schedules.map((item, idx) => {
                                            const scheduleId = item._id || item.id;
                                            return (
                                                <div key={`${item._id || item.id || idx}-schedule`}>

                                                    <div
                                                        className="group relative bg-white border border-slate-200 rounded-xl p-4 transition-all duration-200 hover:border-amber-200 hover:shadow-md hover:shadow-amber-500/5"
                                                    >
                                                        {/* Decorative Left Accent */}
                                                        <div className="absolute left-0 top-4 bottom-4 w-1 bg-amber-400 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />

                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="flex-1 min-w-0">

                                                                {/* Header */}
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

                                                                {/* Time */}
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

                                                            {/* Actions */}
                                                            <div className="flex items-center gap-1">
                                                                <button
                                                                    onClick={() =>
                                                                        handleEditScheduleItem({
                                                                            mainId: group.mainId,
                                                                            detailsId: group.detailsId,
                                                                            stageId: group.stageId,
                                                                            scheduleId,
                                                                            schedule: item,
                                                                        })
                                                                    }
                                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                >
                                                                    <Pencil size={15} />
                                                                </button>

                                                                <button
                                                                    onClick={() =>
                                                                        handleRemoveScheduleItem({
                                                                            mainId: group.mainId,
                                                                            detailsId: group.detailsId,
                                                                            stageId: group.stageId,
                                                                            scheduleId,
                                                                        })
                                                                    }
                                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                >
                                                                    <Trash2 size={15} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <hr className="border-slate-100 my-4" />

                {/* ── Call Details ── */}
                <div ref={callRef} className={`space-y-4 ${isCancelled ? 'opacity-60 pointer-events-none' : ''}`}>
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-900 uppercase">
                        <div className="bg-blue-50 p-1.5 rounded">
                            <Phone size={15} className="text-blue-500" />
                        </div>
                        Call Details
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={isCancelled ? "" : taskForm.callBy}
                            onChange={(e) => updateForm('callBy', e.target.value)}
                            onBlur={(e) => validateField('callBy')}
                            placeholder="Called By"
                            className={getInputClass(!!errors.callBy, isCancelled)}
                            disabled={isCancelled}
                        />

                        <Select
                            options={callOptions}
                            placeholder="Call Type"
                            styles={ValidateStyle(!!errors.callType, isCancelled)}
                            isDisabled={isCancelled}
                            value={taskForm.callType}
                            onChange={(opt) => updateForm('callType', opt)}
                            onBlur={() => validateField('callType')}
                        />

                        <input
                            type="date"
                            value={isCancelled ? "" : taskForm.callDate}
                            onChange={(e) => updateForm('callDate', e.target.value)}
                            onBlur={() => validateField('callDate')}
                            className={getInputClass(!!errors.callDate, isCancelled)}
                            disabled={isCancelled}
                        />

                        <div className="sm:col-span-2 flex flex-col">
                            <textarea
                                rows={3}
                                value={isCancelled ? "" : taskForm.callNote}
                                onChange={(e) => updateForm('callNote', e.target.value)}
                                onBlur={() => validateField('callNote')}
                                placeholder="Call Note"
                                className={getInputClass(!!errors.callNote, isCancelled)}
                                disabled={isCancelled}
                            />
                        </div>
                    </div>
                    {(errors.callBy || errors.callType || errors.callDate || errors.callNote) && (
                        <p className="text-xs text-red-500">
                            {errors.callBy || errors.callType || errors.callDate || errors.callNote}
                        </p>
                    )}
                </div>

                {/* ── Message Details ── */}
                <div ref={messageRef} className={`space-y-4 ${isCancelled ? 'opacity-60 pointer-events-none' : ''}`}>
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-900 uppercase">
                        <div className="bg-green-50 p-1.5 rounded">
                            <MessageSquare size={15} className="text-green-500" />
                        </div>
                        Message Details
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={isCancelled ? "" : taskForm.messageBy}
                            onChange={(e) => updateForm('messageBy', e.target.value)}
                            onBlur={() => validateField('messageBy')}
                            placeholder="Sent By"
                            className={getInputClass(!!errors.messageBy, isCancelled)}
                            disabled={isCancelled}
                        />

                        <Select
                            options={msgOptions}
                            placeholder="Message Type"
                            styles={ValidateStyle(!!errors.msgType, isCancelled)}
                            value={taskForm.msgType}
                            onChange={(opt) => updateForm('msgType', opt)}
                            isDisabled={isCancelled}
                            onBlur={() => validateField('msgType')}
                        />

                        <input
                            type="date"
                            value={isCancelled ? "" : taskForm.messageDate}
                            onChange={(e) => updateForm('messageDate', e.target.value)}
                            onBlur={() => validateField('messageDate')}
                            className={getInputClass(!!errors.messageDate, isCancelled)}
                            disabled={isCancelled}
                        />

                        <div className="sm:col-span-2 flex flex-col">
                            <textarea
                                rows={3}
                                value={isCancelled ? "" : taskForm.messageNote}
                                onChange={(e) => updateForm('messageNote', e.target.value)}
                                onBlur={() => validateField('messageNote')}
                                placeholder="Message Note"
                                className={getInputClass(!!errors.messageNote, isCancelled)}
                                disabled={isCancelled}
                            />
                        </div>
                    </div>
                    {(errors.messageBy || errors.msgType || errors.messageDate || errors.messageNote) && (
                        <p className="text-xs text-red-500">
                            {errors.messageBy || errors.msgType || errors.messageDate || errors.messageNote}
                        </p>
                    )}
                </div>
            </div>

            {/* ── Action Buttons ── */}
            <div className="flex gap-3 mt-8">
                <button className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl transition-colors font-medium">
                    <XCircle size={16} />
                    Terminate
                </button>

                <button
                    onClick={handleSaveTask}
                    className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl shadow-md shadow-orange-200 transition-all font-medium"
                >
                    {isCompleted ? 'Next Step' : 'Save Task'}
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};