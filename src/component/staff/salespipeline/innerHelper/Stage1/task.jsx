import React, { useState } from 'react';
import {
    Calendar,
    Plus,
    Mail,
    Phone,
    MessageSquare,
    ChevronRight,
    XCircle,
    Clock,
    User,
    Type,
    History,
    StickyNote
} from 'lucide-react';
import Select from 'react-select';

export const Task = () => {
    const [callType, setCallType] = useState(null);
    const [msgType, setMsgType] = useState(null);
    const [showTimeline, setShowTimeline] = useState(false);
    const [timelineFrom, setTimelineFrom] = useState('');
    const [timelineTo, setTimelineTo] = useState('');
    const [timelineError, setTimelineError] = useState('');
    const [callBy, setCallBy] = useState('');
    const [callNote, setCallNote] = useState('');
    const [messageBy, setMessageBy] = useState('');
    const [messageNote, setMessageNote] = useState('');

    const fontStyle = { fontFamily: "'Roboto Slab', serif" };

    const getTomorrow = () => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split('T')[0];
    };
    const tomorrow = getTomorrow();

    // Custom styles for React Select to match the theme
    const selectStyles = {
        control: (base) => ({
            ...base,
            fontSize: '10px',
            minHeight: '30px',
            borderColor: '#e2e8f0',
        }),
        option: (base) => ({
            ...base,
            fontSize: '10px',
        }),
    };

    const callOptions = [
        { value: 'cold', label: 'Cold Call' },
        { value: 'followup', label: 'Follow-up' },
        { value: 'closing', label: 'Closing' }
    ];

    const msgOptions = [
        { value: 'messenger', label: 'Messenger' },
        { value: 'viber', label: 'Viber' },
        { value: 'Email', label: 'Email' },
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'text', label: 'Text' },
        { value: 'fb', label: 'FB' },
        { value: 'tiktok', label: 'TikTok' }
    ];
    const handleDisplayTimeline = () => {
        setTimelineError('');
        setShowTimeline((prev) => !prev);
    };

    const hadleUpdateTimeline = () => {
        if (!timelineFrom || !timelineTo) {
            setTimelineError('From and To dates are required.');
            return;
        }
        if (timelineTo < timelineFrom) {
            setTimelineError('To date cannot be before From date.');
            return;
        }

        const hasCallDetails = callBy.trim() || callNote.trim();
        const hasMessageDetails = messageBy.trim() || messageNote.trim();
        if (!hasCallDetails && !hasMessageDetails) {
            setTimelineError('Please fill either Call Details or Message Details.');
            return;
        }

        setTimelineError('');
        // Save timeline to backend or state here.
        setShowTimeline(false);
    };

    return (
        <div style={fontStyle} className="mx-auto bg-transparent p-4 bg-white/80 w-full rounded-lg">
            {/* Header Section remains largely the same, just ensuring consistency */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="bg-amber-50 p-1.5 rounded"><Calendar size={14} className="text-amber-500" /></div>
                    <div>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Re-Schedule Stage One</h2>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                            <span className="text-[10px] text-slate-500">2026/02/03 12:00</span>
                            <span className="text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-2 py-[2px] rounded-full">Updated</span>
                        </div>
                    </div>
                </div>
                <div className="bg-orange-50 p-1.5 rounded cursor-pointer hover:bg-orange-100 transition-colors" onClick={handleDisplayTimeline}>
                    <Plus size={14} className="text-orange-500" />
                </div>
            </div>

            {/* Timeline Block */}
            {showTimeline && (
                <div className="bg-orange-50 p-3 rounded-lg mb-3 border border-orange-100">
                    <div className="flex justify-between mb-2">
                        <span className="text-[10px] font-bold text-orange-800 uppercase flex items-center gap-1"><Clock size={12} /> Timeline</span>
                        <button onClick={() => setShowTimeline(false)} className="text-[10px] text-orange-600 hover:underline">Close</button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">

                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-slate-600 font-medium">From</label>
                            <input
                                type="date"
                                name='from'
                                className="border border-slate-200 rounded px-2 py-1.5 text-[10px] focus:ring-1 focus:ring-amber-500 outline-none"
                                min={tomorrow}
                                value={timelineFrom}
                                onChange={(e) => setTimelineFrom(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-slate-600 font-medium">To</label>
                            <input
                                type="date"
                                name='to'
                                className="border border-slate-200 rounded px-2 py-1.5 text-[10px] focus:ring-1 focus:ring-amber-500 outline-none"
                                min={timelineFrom || tomorrow}

                                value={timelineTo}

                                onChange={(e) => setTimelineTo(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className="space-y-1 mt-2">
                        {timelineError && <p className="text-[10px] text-red-600">{timelineError}</p>}
                    </div>
                    <div className='flex w-full justify-end pt-2'>
                        <button
                            type="button"
                            className="inline-flex items-center px-3 cursor-pointer py-1 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={false}
                            onClick={hadleUpdateTimeline}
                        >
                            Update
                        </button>
                    </div>
                </div>
            )}

            <hr className="border-slate-100 mb-4" />

            {/* Communication Log Section */}
            <div className="space-y-4">
                {/* Call Details */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2 flex items-center gap-1 text-[10px] font-bold text-slate-900 uppercase">
                        <div className="bg-blue-50 p-1 rounded"><Phone size={10} className="text-blue-500" /></div> 
                        
                        Call Details
                    </div>
                    <div className="col-span-2 flex items-center border border-slate-200 
                    rounded px-2 py-2 focus-within:border-amber-500 transition-all">
                        <User size={12} className="text-slate-400 mr-2" />
                        <input
                            type="text"
                            name="call_by"
                            value={callBy}
                            onChange={(e) => setCallBy(e.target.value)}
                            placeholder="By"
                            className="w-full text-[10px] outline-none"
                        />
                    </div>
                    <Select options={callOptions} placeholder="Type" styles={selectStyles} onChange={(option) => setCallType(option)} />
                    <input
                        type="date"
                        name="call_date"
                        className="border border-slate-200 rounded px-2 py-2 text-[10px] focus:border-amber-500 outline-none"
                    />
                    <input
                        type="text"
                        name="call_note"
                        value={callNote}
                        onChange={(e) => setCallNote(e.target.value)}
                        placeholder="Note"
                        className="col-span-2 border border-slate-200 rounded px-2 py-2 text-[10px] focus:border-amber-500 outline-none transition-all"
                    />
                </div>

                {/* Message Log */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2 flex items-center gap-1 text-[10px] font-bold text-slate-900 uppercase">
                        <div className="bg-green-50 p-1 rounded"><MessageSquare size={10} className="text-green-500" /></div> Message Details
                    </div>
                    <div className="col-span-2 flex items-center border border-slate-200 rounded px-2 py-2 focus-within:border-amber-500 transition-all">
                        <User size={12} className="text-slate-400 mr-2" />
                        <input
                            type="text"
                            name="message_by"
                            value={messageBy}
                            onChange={(e) => setMessageBy(e.target.value)}
                            placeholder="By"
                            className="w-full text-[10px] outline-none"
                        />
                    </div>
                    <Select options={msgOptions} placeholder="Type" styles={selectStyles} onChange={(option) => setMsgType(option)} />
                    <input
                        type="date"
                        name="message_date"
                        className="border border-slate-200 rounded px-2 py-2 text-[10px] focus:border-amber-500 outline-none"
                    />
                    <input
                        type="text"
                        name="message_note"
                        value={messageNote}
                        onChange={(e) => setMessageNote(e.target.value)}
                        placeholder="Note"
                        className="col-span-2 border border-slate-200 rounded px-2 py-2 text-[10px] focus:border-amber-500 outline-none transition-all"
                    />
                </div>
            </div>


            <div className="flex gap-2 mt-6">
                <button className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded transition-colors">
                    <XCircle size={11} />
                    <span className="text-[10px] font-bold uppercase">Terminate</span>
                </button>

                <button className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded shadow-md shadow-orange-200 transition-all">
                    <span className="text-[10px] font-bold uppercase">Next Step</span>
                    <ChevronRight size={11} />
                </button>

            </div>
        </div>
    );
};
