import React, { useMemo, useState } from "react";
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
  const eventsService = useState(() => createEventsServicePlugin())[0];
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
        eventsService.update(eventData);
        setEvents((prev) => prev.map((e) => (e.id === eventData.id ? eventData : e)));
      } else {
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

  const calendarApp = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
    weekOptions: { gridHeight: 1200 },
    plugins: [eventsService],
    timezone: TZ,
    callbacks: { onEventClick: (event) => setSelectedEvent(event) },
    calendars: {
      amberTheme: {
        colorName: "amber",
        lightColors: { main: "#f59e0b", container: "#fef3c7", onContainer: "#92400e" },
      },
    },
  });

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
                <button onClick={() => setSelectedEvent(null)} className="text-slate-400">✕</button>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-amber-700">{selectedEvent.title}</p>
                {selectedEvent.description && <p className="text-slate-500 italic">{selectedEvent.description}</p>}
                <div className="flex gap-2 pt-2">
                  <button onClick={() => openEditModal(selectedEvent)} className="flex-1 py-1.5 rounded-lg bg-amber-100 text-amber-700 text-xs font-bold">Edit</button>
                  <button onClick={() => { eventsService.remove(selectedEvent.id); setSelectedEvent(null); }} className="flex-1 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold">Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-4">{isEditMode ? "Edit Event" : "New Event"}</h3>

            <div className="space-y-4">
              <input
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-2 border rounded-lg outline-amber-500"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-2 border rounded-lg outline-amber-500 h-20"
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 ml-1">FROM</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="p-2 border rounded-lg text-sm"
                  />
                  <input
                    type="time"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="p-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 ml-1">TO</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="p-2 border rounded-lg text-sm"
                  />
                  <input
                    type="time"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="p-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2 border rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEvent}
                  className="flex-1 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}