import React, { useMemo, useState, useEffect } from "react";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "temporal-polyfill/global";
import "@schedule-x/theme-default/dist/index.css";
import { X } from "lucide-react";

const TZ = "Asia/Kathmandu";

const toZdt = (dateStr, timeStr) =>
  Temporal.ZonedDateTime.from(`${dateStr}T${timeStr}:00[${TZ}]`);

const formatHHMM = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(2000, 0, 1, h, m);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
};

export default function MyCalendar({ onclose }) {
  // Initialize events service
  const eventsService = useMemo(() => createEventsServicePlugin(), []);
  
  // State for events
  const [events, setEvents] = useState([]);
  const [calendarTitle, setCalendarTitle] = useState("EIMCTA Calendar");
  const [calendarDescription, setCalendarDescription] = useState("Manage your events and appointments");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const today = useMemo(() => {
    const now = Temporal.Now.zonedDateTimeISO(TZ);
    return `${String(now.year).padStart(4, "0")}-${String(now.month).padStart(2, "0")}-${String(now.day).padStart(2, "0")}`;
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Date and Time States
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [startTime, setStartTime] = useState("10:30");
  const [endTime, setEndTime] = useState("11:30");
  const [error, setError] = useState("");

  // Initialize calendar with events service
  const calendarApp = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
    weekOptions: { gridHeight: 1200 },
    plugins: [eventsService],
    timezone: TZ,
    callbacks: { 
      onEventClick: (event) => setSelectedEvent(event) 
    },
    calendars: {
      amberTheme: {
        colorName: "amber",
        lightColors: { main: "#f59e0b", container: "#fef3c7", onContainer: "#92400e" },
      },
    },
  });

  // Load initial events from localStorage or set default events
  useEffect(() => {
    const loadEvents = async () => {
      try {
        // Try to load from localStorage first
        const savedEvents = localStorage.getItem('calendarEvents');
        if (savedEvents) {
          const parsedEvents = JSON.parse(savedEvents);
          // Convert string dates back to Temporal objects
          const eventsToAdd = parsedEvents.map(event => ({
            ...event,
            start: Temporal.ZonedDateTime.from(event.start),
            end: Temporal.ZonedDateTime.from(event.end)
          }));
          
          // Add events to service and state
          eventsToAdd.forEach(event => {
            eventsService.add(event);
          });
          setEvents(eventsToAdd);
        } else {
          // Add some default events if no saved events
          const defaultEvents = [
            {
              id: crypto.randomUUID(),
              title: "Team Meeting (10:30 AM - 11:30 AM)",
              description: "Weekly team sync",
              start: toZdt(today, "10:30"),
              end: toZdt(today, "11:30"),
              calendarId: "amberTheme",
            },
            {
              id: crypto.randomUUID(),
              title: "Lunch Break (12:00 PM - 1:00 PM)",
              description: "",
              start: toZdt(today, "12:00"),
              end: toZdt(today, "13:00"),
              calendarId: "amberTheme",
            }
          ];
          
          defaultEvents.forEach(event => {
            eventsService.add(event);
          });
          setEvents(defaultEvents);
          localStorage.setItem('calendarEvents', JSON.stringify(defaultEvents.map(e => ({
            ...e,
            start: e.start.toString(),
            end: e.end.toString()
          }))));
        }
      } catch (error) {
        console.error("Error loading events:", error);
      }
    };

    loadEvents();
  }, [eventsService, today]);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0) {
      const eventsToSave = events.map(event => ({
        ...event,
        start: event.start.toString(),
        end: event.end.toString()
      }));
      localStorage.setItem('calendarEvents', JSON.stringify(eventsToSave));
    }
  }, [events]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStartDate(today);
    setEndDate(today);
    setStartTime("10:30");
    setEndTime("11:30");
    setError("");
    setIsEditMode(false);
    setSelectedEvent(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsOpen(true);
  };

  const openEditModal = (event) => {
    if (!event) return;
    setSelectedEvent(event);
    const originalTitle = (event.title || "").replace(/ \(\d+:\d+ [AP]M - \d+:\d+ [AP]M\)$/, "");
    setTitle(originalTitle);
    setDescription(event.description || "");

    const startZdt = Temporal.ZonedDateTime.from(event.start);
    const endZdt = Temporal.ZonedDateTime.from(event.end);
    const pad2 = (v) => String(v).padStart(2, "0");

    setStartDate(`${String(startZdt.year).padStart(4, "0")}-${pad2(startZdt.month)}-${pad2(startZdt.day)}`);
    setEndDate(`${String(endZdt.year).padStart(4, "0")}-${pad2(endZdt.month)}-${pad2(endZdt.day)}`);
    setStartTime(`${pad2(startZdt.hour)}:${pad2(startZdt.minute)}`);
    setEndTime(`${pad2(endZdt.hour)}:${pad2(endZdt.minute)}`);

    setIsEditMode(true);
    setIsOpen(true);
  };

  const saveEvent = async () => {
    setError("");
    const t = title.trim();
    if (!t) return setError("Title is required.");

    try {
      const startZdt = toZdt(startDate, startTime);
      const endZdt = toZdt(endDate, endTime);

      if (Temporal.ZonedDateTime.compare(endZdt, startZdt) <= 0) {
        return setError("End time must be after start time.");
      }

      const rangeText = `${formatHHMM(startTime)} - ${formatHHMM(endTime)}`;

      const eventData = {
        id: isEditMode && selectedEvent ? selectedEvent.id : crypto.randomUUID(),
        title: `${t} (${rangeText})`,
        description: description.trim(),
        start: startZdt,
        end: endZdt,
        calendarId: "amberTheme",
      };

      if (isEditMode && selectedEvent) {
        // Update existing event
        eventsService.update(eventData);
        setEvents((prev) => prev.map((e) => (e.id === eventData.id ? eventData : e)));
      } else {
        // Add new event
        eventsService.add(eventData);
        setEvents((prev) => [...prev, eventData]);
      }

      setIsOpen(false);
      resetForm();
    } catch (err) {
      console.error("Schedule-X Save Error:", err);
      setError("Failed to save event. Check inputs and try again.");
    }
  };

  const deleteEvent = (eventId) => {
    eventsService.remove(eventId);
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    setSelectedEvent(null);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh]">

        {/* Header */}
        <div className="p-5">
          <div className="flex justify-end text-amber-500 mb-2">
            <button onClick={onclose} className="hover:text-amber-700 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-row items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={calendarTitle}
                onChange={(e) => setCalendarTitle(e.target.value)}
                className="text-xl font-semibold text-slate-900 bg-transparent border-none outline-none focus:ring-2 focus:ring-amber-500/20 rounded px-1 w-full"
              />
              <input
                type="text"
                value={calendarDescription}
                onChange={(e) => setCalendarDescription(e.target.value)}
                className="text-sm text-slate-500 bg-transparent border-none outline-none focus:ring-2 focus:ring-amber-500/20 rounded px-1 w-full"
              />
            </div>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors shrink-0"
            >
              + Add Event
            </button>
          </div>
        </div>

        {/* Calendar Body */}
        <div className="flex-1 overflow-hidden px-5 pb-5 relative">
          <div className="h-full border border-slate-100 rounded-xl overflow-hidden sx-react-calendar-wrapper">
            {calendarApp ? (
              <ScheduleXCalendar calendarApp={calendarApp} />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">Loading...</div>
            )}
          </div>

          {/* Event Details Overlay */}
          {selectedEvent && (
            <div className="absolute bottom-10 right-10 w-72 bg-white rounded-xl shadow-2xl border border-amber-100 p-4 z-40">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900">Details</h3>
                <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-slate-600">
                  ✕
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-amber-700">{selectedEvent.title}</p>
                {selectedEvent.description && (
                  <p className="text-slate-500 italic">{selectedEvent.description}</p>
                )}
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => openEditModal(selectedEvent)} 
                    className="flex-1 py-1.5 rounded-lg bg-amber-100 text-amber-700 text-xs font-bold hover:bg-amber-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteEvent(selectedEvent.id)} 
                    className="flex-1 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[60] p-4 font-roboto">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
            {/* Header with Icon */}
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-amber-100 rounded-xl">
                {isEditMode ? (
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                {isEditMode ? "Edit Event" : "Create New Event"}
              </h3>
            </div>

            <div className="space-y-5">
              {/* Title Input with Icon */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <input
                  placeholder="Event title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all bg-slate-50/50 text-slate-700 placeholder:text-slate-400"
                />
              </div>

              {/* Description Input with Icon */}
              <div className="relative">
                <div className="absolute left-3 top-3 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </div>
                <textarea
                  placeholder="Add description (optional)"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all bg-slate-50/50 text-slate-700 placeholder:text-slate-400 h-24 resize-none"
                />
              </div>

              {/* FROM Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">From</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-700 bg-slate-50/50"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <input
                      type="time"
                      value={startTime}
                      onChange={e => setStartTime(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-700 bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* TO Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">To</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-700 bg-slate-50/50"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <input
                      type="time"
                      value={endTime}
                      onChange={e => setEndTime(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-700 bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* Error Message with Icon */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-100">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 font-medium flex items-center justify-center gap-2 group"
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
                <button
                  onClick={saveEvent}
                  className="flex-1 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors font-medium flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}