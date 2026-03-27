import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Clock, Users, FileText, Target, MapPin, XCircle, ChevronRight } from 'lucide-react';
import Select from 'react-select';

export const MeetingTask = () => {
  const fontStyle = { fontFamily: "'Roboto Slab', serif" };

  const [meetingType, setMeetingType] = useState(null);
  const [meetingFrom, setMeetingFrom] = useState('');
  const [meetingTo, setMeetingTo] = useState('');
  const [duration, setDuration] = useState('');
  const [participants, setParticipants] = useState([]);
  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState(null);
  const [agenda, setAgenda] = useState('');
  const [purpose, setPurpose] = useState('');

  // Calculate Duration
  useEffect(() => {
    if (meetingFrom && meetingTo) {
      const start = new Date(meetingFrom);
      const end = new Date(meetingTo);
      const diff = (end - start) / (1000 * 60); // in minutes
      setDuration(diff > 0 ? `${diff} mins` : 'Invalid Range');
    }
  }, [meetingFrom, meetingTo]);

  const selectStyles = {
    control: (base) => ({
      ...base,
      fontSize: '12px',
      minHeight: '35px',
      borderColor: '#e2e8f0',
      fontFamily: "'Roboto Slab', serif",
    }),
    option: (base) => ({
      ...base,
      fontSize: '12px',
    }),
  };

  const participantOptions = [
    { value: 'principal', label: 'Principal' },
    { value: 'founder', label: 'Founder' },
    { value: 'chairperson', label: 'Chairperson' },
    { value: 'voice', label: 'Voice' },
  ];

  const statusOptions = [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const locationOptions = [
    { value: 'virtual', label: 'Virtual' },
    { value: 'physical', label: 'Physical' },
  ];

  const meetingTypeOptions = [
    { value: 'internal', label: 'Internal' },
    { value: 'external', label: 'External' },
  ];

  return (
    <div className="mx-auto bg-transparent py-4 px-3 w-full" style={fontStyle}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-amber-50 p-1.5 rounded-xl">
          <Calendar size={14} className="text-amber-500" />
        </div>
        <h2 className="text-sm font-bold text-slate-900 uppercase sm:text-[12px]">Meeting Information</h2>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-2 gap-3 text-[12px] sm:text-sm">

        {/* Meeting Type */}
        <label className="flex flex-col gap-1 col-span-1">
          <div className="flex items-center gap-1">
            <div className="bg-red-50 p-1.5 rounded-xl">
              <Target size={12} className="text-red-500" />
            </div>
            <span className="font-semibold text-slate-700">Type</span>
          </div>
          <Select 
            placeholder="Select Type" 
            options={meetingTypeOptions} 
            styles={selectStyles} 
            onChange={setMeetingType} 
          />
        </label>

        {/* Status */}
        <label className="flex flex-col gap-1 col-span-1">
          <div className="flex items-center gap-1">
            <div className="bg-blue-50 p-1.5 rounded-xl">
              <Clock size={12} className="text-blue-500" />
            </div>
            <span className="font-semibold text-slate-700">Status</span>
          </div>
          <Select 
            placeholder="Select Status" 
            options={statusOptions} 
            styles={selectStyles} 
            onChange={(value) => setStatus(value)} 
            value={status}
          />
        </label>

        {status?.value === 'scheduled' && (
          <>
            {/* Meeting From */}
            <label className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <div className="bg-orange-50 p-1.5 rounded-xl">
                  <Clock size={12} className="text-orange-500" />
                </div>
                <span className="font-semibold text-slate-700">From</span>
              </div>
              <input 
                type="datetime-local" 
                className="border border-slate-200 rounded px-2 py-1.5 text-[12px] sm:text-sm" 
                value={meetingFrom}
                onChange={(e) => setMeetingFrom(e.target.value)} 
              />
            </label>

            {/* Meeting To */}
            <label className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <div className="bg-orange-50 p-1.5 rounded-xl">
                  <Clock size={12} className="text-orange-500" />
                </div>
                <span className="font-semibold text-slate-700">To</span>
              </div>
              <input 
                type="datetime-local" 
                className="border border-slate-200 rounded px-2 py-1.5 text-[12px] sm:text-sm" 
                value={meetingTo}
                onChange={(e) => setMeetingTo(e.target.value)} 
              />
            </label>
          </>
        )}

        {/* Duration */}
        <div className="col-span-2 flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded text-[12px] sm:text-sm">
          <div className="bg-amber-50 p-1.5 rounded-xl">
            <Clock size={12} className="text-amber-500" />
          </div>
          Duration: <span className="font-bold">{duration || '0 mins'}</span>
        </div>

        {/* Participants */}
        <label className="flex flex-col gap-1 col-span-2">
          <div className="flex items-center gap-1">
            <div className="bg-purple-50 p-1.5 rounded-xl">
              <Users size={12} className="text-purple-500" />
            </div>
            <span className="font-semibold text-slate-700">Participants</span>
          </div>
          <Select 
            isMulti 
            placeholder="Select Participants" 
            options={participantOptions} 
            styles={selectStyles} 
            onChange={setParticipants} 
          />
        </label>

        {/* Location */}
        <label className="flex flex-col gap-1 col-span-2">
          <div className="flex items-center gap-1">
            <div className="bg-teal-50 p-1.5 rounded-xl">
              <MapPin size={12} className="text-teal-500" />
            </div>
            <span className="font-semibold text-slate-700">Location</span>
          </div>
          <Select 
            placeholder="Select Location" 
            options={locationOptions} 
            styles={selectStyles} 
            onChange={setLocation} 
          />
        </label>

        {/* Agenda */}
        <label className="flex flex-col gap-1 col-span-2">
          <div className="flex items-center gap-1">
            <div className="bg-pink-50 p-1.5 rounded-xl">
              <FileText size={12} className="text-pink-500" />
            </div>
            <span className="font-semibold text-slate-700">Agenda</span>
          </div>
          <textarea 
            placeholder="Agenda" 
            className="border border-slate-200 rounded px-2 py-2 text-[12px] sm:text-sm h-16 outline-none" 
            onChange={(e) => setAgenda(e.target.value)} 
          />
        </label>

        {/* Purpose */}
        <label className="flex flex-col gap-1 col-span-2">
          <div className="flex items-center gap-1">
            <div className="bg-green-50 p-1.5 rounded-xl">
              <Plus size={12} className="text-green-500" />
            </div>
            <span className="font-semibold text-slate-700">Purpose</span>
          </div>
          <textarea 
            placeholder="Purpose" 
            className="border border-slate-200 rounded px-2 py-2 text-[12px] sm:text-sm h-16 outline-none" 
            onChange={(e) => setPurpose(e.target.value)} 
          />
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-6">
        <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-red-600 py-2 rounded text-[12px] sm:text-sm font-bold uppercase">
          <XCircle size={12} /> Cancel
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded text-[12px] sm:text-sm font-bold uppercase">
          Save Meeting <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};