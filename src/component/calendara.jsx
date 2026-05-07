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
import { X, CalendarDays, Pencil } from "lucide-react";

const TZ = "Asia/Kathmandu";

const toZdt = (dateStr, timeStr) =>
  Temporal.ZonedDateTime.from(`${dateStr}T${timeStr}:00[${TZ}]`);

const pad2 = (num) => String(num).padStart(2, "0");

const formatHHMM = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(2000, 0, 1, h, m);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function MyCalendar({ onclose }) {
  const eventsService = useMemo(() => createEventsServicePlugin(), []);

  const [events, setEvents] = useState([]);
  const [calendarTitle, setCalendarTitle] = useState("EIMCTA Calendar");
  const [calendarDescription, setCalendarDescription] = useState(
    "Manage your events and appointments"
  );
  const [selectedEvent, setSelectedEvent] = useState(null);

  const today = useMemo(() => {
    const now = Temporal.Now.zonedDateTimeISO(TZ);
    return `${pad2(now.year).padStart(4, "0")}-${pad2(now.month)}-${pad2(
      now.day
    )}`;
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [startTime, setStartTime] = useState("10:30");
  const [endTime, setEndTime] = useState("11:30");
  const [error, setError] = useState("");

  const calendarApp = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
    weekOptions: {
      gridHeight: 1200,
    },
    plugins: [eventsService],
    timezone: TZ,
    callbacks: {
      onEventClick: (event) => setSelectedEvent(event),
    },
    calendars: {
      amberTheme: {
        colorName: "amber",
        lightColors: {
          main: "#f59e0b",
          container: "#fef3c7",
          onContainer: "#92400e",
        },
      },
    },
  });

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

    const startZdt = Temporal.ZonedDateTime.from(event.start);
    const endZdt = Temporal.ZonedDateTime.from(event.end);

    const cleanTitle = String(event.title || "").replace(/\s*\(.+\)\s*$/, "");

    setSelectedEvent(event);
    setTitle(cleanTitle);
    setDescription(event.description || "");
    setStartDate(
      `${pad2(startZdt.year).padStart(4, "0")}-${pad2(startZdt.month)}-${pad2(
        startZdt.day
      )}`
    );
    setEndDate(
      `${pad2(endZdt.year).padStart(4, "0")}-${pad2(endZdt.month)}-${pad2(
        endZdt.day
      )}`
    );
    setStartTime(`${pad2(startZdt.hour)}:${pad2(startZdt.minute)}`);
    setEndTime(`${pad2(endZdt.hour)}:${pad2(endZdt.minute)}`);

    setIsEditMode(true);
    setIsOpen(true);
  };

  const saveEvent = () => {
    setError("");

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Title is required.");
      return;
    }

    try {
      const startZdt = toZdt(startDate, startTime);
      const endZdt = toZdt(endDate, endTime);

      if (Temporal.ZonedDateTime.compare(endZdt, startZdt) <= 0) {
        setError("End time must be after start time.");
        return;
      }

      const rangeText = `${formatHHMM(startTime)} - ${formatHHMM(endTime)}`;

      const eventData = {
        id:
          isEditMode && selectedEvent
            ? selectedEvent.id
            : crypto.randomUUID(),
        title: `${trimmedTitle} (${rangeText})`,
        description: description.trim(),
        start: startZdt,
        end: endZdt,
        calendarId: "amberTheme",
      };

      if (isEditMode && selectedEvent) {
        eventsService.update(eventData);
        setEvents((prev) =>
          prev.map((item) => (item.id === eventData.id ? eventData : item))
        );
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

  const deleteEvent = (eventId) => {
    eventsService.remove(eventId);
    setEvents((prev) => prev.filter((item) => item.id !== eventId));
    setSelectedEvent(null);
  };

  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem("calendarEvents");

      if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents);

        const restoredEvents = parsedEvents.map((event) => ({
          ...event,
          start: Temporal.ZonedDateTime.from(event.start),
          end: Temporal.ZonedDateTime.from(event.end),
        }));

        restoredEvents.forEach((event) => {
          eventsService.add(event);
        });

        setEvents(restoredEvents);
      } else {
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
          },
        ];

        defaultEvents.forEach((event) => {
          eventsService.add(event);
        });

        setEvents(defaultEvents);

        localStorage.setItem(
          "calendarEvents",
          JSON.stringify(
            defaultEvents.map((event) => ({
              ...event,
              start: event.start.toString(),
              end: event.end.toString(),
            }))
          )
        );
      }
    } catch (err) {
      console.error("Error loading events:", err);
    }
  }, [eventsService, today]);

  useEffect(() => {
    localStorage.setItem(
      "calendarEvents",
      JSON.stringify(
        events.map((event) => ({
          ...event,
          start: event.start.toString(),
          end: event.end.toString(),
        }))
      )
    );
  }, [events]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] min-h-[85vh]">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 shrink-0">
            <div className="flex justify-end text-amber-500 mb-2">
              <button
                onClick={onclose}
                className="hover:text-amber-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
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
                  className="text-sm text-slate-500 bg-transparent border-none outline-none focus:ring-2 focus:ring-amber-500/20 rounded px-1 w-full mt-1"
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
          <div className="flex-1 min-h-0 px-5 pb-5 pt-5 relative">
            <div className="h-full min-h-0 border border-slate-100 rounded-xl overflow-auto bg-white sx-react-calendar-wrapper">
              {calendarApp ? (
                <ScheduleXCalendar calendarApp={calendarApp} />
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">
                  Loading...
                </div>
              )}
            </div>

            {/* Event Details */}
            {selectedEvent && (
              <div className="absolute bottom-10 right-10 w-72 bg-white rounded-xl shadow-2xl border border-amber-100 p-4 z-40">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900">Details</h3>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="font-medium text-amber-700">
                    {selectedEvent.title}
                  </p>

                  {selectedEvent.description && (
                    <p className="text-slate-500 italic">
                      {selectedEvent.description}
                    </p>
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
      </div>

      {/* Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[60] p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
                {isEditMode ? <Pencil size={20} /> : <CalendarDays size={20} />}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {isEditMode ? "Edit Event" : "Create Event"}
                </h2>
                <p className="text-sm text-slate-500">
                  Add your schedule details below
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter event title"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Add a short description"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-2 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={saveEvent}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                >
                  {isEditMode ? "Update Event" : "Save Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sx-react-calendar-wrapper {
          width: 100%;
          height: 100%;
          min-height: 100%;
        }

        .sx-react-calendar-wrapper .sx__calendar {
          height: 100%;
          min-height: 100%;
        }

        .sx-react-calendar-wrapper .sx__view-container {
          min-height: 100%;
        }
      `}</style>
    </>
  );
}