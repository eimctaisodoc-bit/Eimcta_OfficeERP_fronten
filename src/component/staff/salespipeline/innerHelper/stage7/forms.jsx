import {
  CalendarCheck,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Layers3,
  FolderKanban,
  Trash2,
  AlertTriangle,
  CalendarDays,
  Save,
} from "lucide-react";
import React, { useState } from "react";

export const SchedulingForms = () => {
  const [selectedPersons, setSelectedPersons] = useState([]);

  const persons = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Project Manager",
      status: "Available",
      color: "emerald",
      qualification: "MBA, PMP Certified",
      experience: "Senior Level - 8 Years",
      currentProject: "ISO 21001 School Implementation",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      name: "Sarah Miller",
      role: "Scheduling Officer",
      status: "Available",
      color: "amber",
      qualification: "BBA in Management",
      experience: "Mid Level - 5 Years",
      currentProject: "Training Calendar Planning",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "David Smith",
      role: "Consultant",
      status: "Available",
      color: "blue",
      qualification: "ISO Lead Auditor",
      experience: "Senior Level - 7 Years",
      currentProject: "Client Audit Preparation",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 4,
      name: "Emma Wilson",
      role: "Training Coordinator",
      status: "Available",
      color: "purple",
      qualification: "M.Ed, Training Specialist",
      experience: "Expert Level - 10 Years",
      currentProject: "CPD Training Management",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 5,
      name: "Michael Brown",
      role: "Field Officer",
      status: "Available",
      color: "orange",
      qualification: "BSc, Safety Training",
      experience: "Mid Level - 4 Years",
      currentProject: "Site Visit Scheduling",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 6,
      name: "Lisa Carter",
      role: "Documentation Officer",
      status: "Available",
      color: "red",
      qualification: "BIM, Documentation Expert",
      experience: "Junior Level - 3 Years",
      currentProject: "ISO Document Review",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
  ];

  const colorClasses = {
    emerald: {
      border: "border-emerald-500",
      softBorder: "border-emerald-200",
      hoverBorder: "hover:border-emerald-200",
      bg: "bg-emerald-50/50",
      hoverBg: "hover:bg-emerald-50/50",
      iconText: "text-emerald-500",
      badge: "border-emerald-500 bg-emerald-500 text-white",
      ring: "ring-emerald-200",
      checkbox: "accent-emerald-500",
      dot: "bg-emerald-500",
    },
    amber: {
      border: "border-amber-500",
      softBorder: "border-amber-200",
      hoverBorder: "hover:border-amber-200",
      bg: "bg-amber-50/50",
      hoverBg: "hover:bg-amber-50/50",
      iconText: "text-amber-500",
      badge: "border-amber-500 bg-amber-500 text-white",
      ring: "ring-amber-200",
      checkbox: "accent-amber-500",
      dot: "bg-amber-500",
    },
    blue: {
      border: "border-blue-500",
      softBorder: "border-blue-200",
      hoverBorder: "hover:border-blue-200",
      bg: "bg-blue-50/50",
      hoverBg: "hover:bg-blue-50/50",
      iconText: "text-blue-500",
      badge: "border-blue-500 bg-blue-500 text-white",
      ring: "ring-blue-200",
      checkbox: "accent-blue-500",
      dot: "bg-blue-500",
    },
    purple: {
      border: "border-purple-500",
      softBorder: "border-purple-200",
      hoverBorder: "hover:border-purple-200",
      bg: "bg-purple-50/50",
      hoverBg: "hover:bg-purple-50/50",
      iconText: "text-purple-500",
      badge: "border-purple-500 bg-purple-500 text-white",
      ring: "ring-purple-200",
      checkbox: "accent-purple-500",
      dot: "bg-purple-500",
    },
    orange: {
      border: "border-orange-500",
      softBorder: "border-orange-200",
      hoverBorder: "hover:border-orange-200",
      bg: "bg-orange-50/50",
      hoverBg: "hover:bg-orange-50/50",
      iconText: "text-orange-500",
      badge: "border-orange-500 bg-orange-500 text-white",
      ring: "ring-orange-200",
      checkbox: "accent-orange-500",
      dot: "bg-orange-500",
    },
    red: {
      border: "border-red-500",
      softBorder: "border-red-200",
      hoverBorder: "hover:border-red-200",
      bg: "bg-red-50/50",
      hoverBg: "hover:bg-red-50/50",
      iconText: "text-red-500",
      badge: "border-red-500 bg-red-500 text-white",
      ring: "ring-red-200",
      checkbox: "accent-red-500",
      dot: "bg-red-500",
    },
  };

  const getToday = () => new Date().toISOString().split("T")[0];

  const handleSelectPerson = (id) => {
    setSelectedPersons((prev) => {
      const alreadySelected = prev.some((item) => item.id === id);

      if (alreadySelected) {
        return prev.filter((item) => item.id !== id);
      }

      return [
        ...prev,
        {
          id,
          fromDate: "",
          toDate: "",
          date: getToday(),
        },
      ];
    });
  };

  const handleInlineDateChange = (id, field, value) => {
    setSelectedPersons((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            [field]: value,
          }
          : item
      )
    );
  };

  const handleDeleteSelectedPerson = (id) => {
    setSelectedPersons((prev) => prev.filter((item) => item.id !== id));
  };

  const getSelectedPersonDetails = () => {
    return selectedPersons
      .map((selected) => {
        const person = persons.find((p) => p.id === selected.id);

        return {
          ...selected,
          person,
        };
      })
      .filter((item) => item.person);
  };

  const hasConflict = (currentItem) => {
    if (!currentItem.fromDate || !currentItem.toDate) return false;

    const currentStart = new Date(currentItem.fromDate).getTime();
    const currentEnd = new Date(currentItem.toDate).getTime();

    if (currentStart > currentEnd) return true;

    return selectedPersons.some((item) => {
      if (item.id === currentItem.id) return false;
      if (!item.fromDate || !item.toDate) return false;

      const start = new Date(item.fromDate).getTime();
      const end = new Date(item.toDate).getTime();

      return currentStart <= end && start <= currentEnd;
    });
  };

  const getConflictLabel = (item) => {
    if (!item.fromDate || !item.toDate) {
      return {
        label: "Date Pending",
        className: "border-slate-200 bg-slate-50 text-slate-500",
        icon: CalendarDays,
      };
    }

    if (new Date(item.fromDate).getTime() > new Date(item.toDate).getTime()) {
      return {
        label: "Invalid Date",
        className: "border-red-200 bg-red-50 text-red-600",
        icon: AlertTriangle,
      };
    }

    if (hasConflict(item)) {
      return {
        label: "Conflict",
        className: "border-red-200 bg-red-50 text-red-600",
        icon: AlertTriangle,
      };
    }

    return {
      label: "No Conflict",
      className: "border-emerald-200 bg-emerald-50 text-emerald-600",
      icon: CheckCircle2,
    };
  };

  const selectedPersonDetails = getSelectedPersonDetails();

  return (
    <div className="w-full overflow-visible bg-transparent">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 p-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50">
          <CalendarCheck size={18} className="text-emerald-500" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-700">
            Scheduling Forms
          </h3>
          <p className="text-xs text-slate-400">
            Select available person for scheduling
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-2 my-2 h-[1px] rounded bg-slate-100" />

      {/* Cards */}
      <div className="grid grid-cols-1 gap-3 overflow-visible p-1.5 sm:grid-cols-2">
        {persons.map((person) => {
          const theme = colorClasses[person.color];
          const isChecked = selectedPersons.some((item) => item.id === person.id);

          return (
            <label
              key={person.id}
              className={`group relative cursor-pointer overflow-visible rounded-xl border bg-white p-3 transition-all duration-300 hover:z-50 ${isChecked
                ? `${theme.border} ${theme.bg}`
                : `border-slate-200 ${theme.hoverBorder} ${theme.hoverBg}`
                }`}
            >
              {/* Hover Popup Information */}
              <div
                className="pointer-events-none invisible absolute left-1/2 top-[calc(100%+12px)] 
                z-[999] w-[285px] -translate-x-1/2 translate-y-2 scale-95 opacity-0 
                transition-all duration-300 group-hover:visible group-hover:translate-y-0 
                group-hover:scale-100 group-hover:opacity-100"
              >
                <div className="relative rounded-xl border border-slate-100 bg-white p-3 shadow-xl shadow-slate-200/80">
                  {/* Arrow */}
                  <div
                    className="absolute -top-1.5 left-1/2 h-3 w-3 
                    -translate-x-1/2 -rotate-135 border-b border-r border-slate-100 bg-white"
                  />

                  {/* Popup Header */}
                  <div className="mb-2 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <img
                      src={person.image}
                      alt={person.name}
                      className={`h-9 w-9 rounded-full border-2 border-white object-cover ring-2 ${theme.ring}`}
                    />

                    <div className="min-w-0 flex-1">
                      <h5 className="truncate text-xs font-bold text-slate-700">
                        {person.name}
                      </h5>
                      <p className="truncate text-[11px] font-medium text-slate-400">
                        {person.role}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${theme.badge}`}
                    >
                      <CheckCircle2 size={11} />
                      {person.status}
                    </span>
                  </div>

                  {/* Popup Body */}
                  <div className="space-y-2 text-xs">
                    <p className="flex items-start gap-2 text-slate-600">
                      <GraduationCap
                        size={14}
                        className={`mt-0.5 shrink-0 ${theme.iconText}`}
                      />
                      <span>
                        <b className="font-semibold text-slate-700">
                          Qualification:
                        </b>{" "}
                        {person.qualification}
                      </span>
                    </p>

                    <p className="flex items-start gap-2 text-slate-600">
                      <Layers3
                        size={14}
                        className={`mt-0.5 shrink-0 ${theme.iconText}`}
                      />
                      <span>
                        <b className="font-semibold text-slate-700">
                          Experience:
                        </b>{" "}
                        {person.experience}
                      </span>
                    </p>

                    <p className="flex items-start gap-2 text-slate-600">
                      <FolderKanban
                        size={14}
                        className={`mt-0.5 shrink-0 ${theme.iconText}`}
                      />
                      <span>
                        <b className="font-semibold text-slate-700">
                          Current Project:
                        </b>{" "}
                        {person.currentProject}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Top Info */}
              <div className="flex items-center gap-3">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleSelectPerson(person.id)}
                  className={`h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 ${theme.checkbox}`}
                />

                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={person.image}
                    alt={person.name}
                    className={`h-12 w-12 rounded-full border-2 border-white object-cover ring-2 transition ${isChecked ? theme.ring : "ring-slate-100"
                      }`}
                  />

                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${theme.dot}`}
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="truncate text-sm font-semibold text-slate-700">
                      {person.name}
                    </h4>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${theme.badge}`}
                    >
                      <CheckCircle2 size={12} />
                      {person.status}
                    </span>
                  </div>

                  <p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-500">
                    <BriefcaseBusiness size={13} className="text-slate-400" />
                    {person.role}
                  </p>
                </div>
              </div>

              {/* Active Border Mark */}
              {isChecked && (
                <div
                  className={`absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full ${theme.badge}`}
                >
                  <CheckCircle2 size={13} />
                </div>
              )}
            </label>
          );
        })}
      </div>


      <div className="px-1.5 " >

        <div className="mt-4 rounded-xl border border-slate-200 bg-white shadow-sm ">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-100 bg-amber-50">
                <CalendarDays size={17} className="text-amber-500" />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700">
                  Selected Scheduling Person
                </h4>
                <p className="text-xs text-slate-400">
                  Inline edit date and check conflict
                </p>
              </div>
            </div>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
              Total Selected: {selectedPersonDetails.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <th className="border-b border-slate-100 px-3 py-3 font-semibold">
                    Name
                  </th>
                  <th className="border-b border-slate-100 px-3 py-3 font-semibold">
                    From Date - To Date
                  </th>
                  <th className="border-b border-slate-100 px-3 py-3 font-semibold">
                    Conflict
                  </th>

                  <th colSpan={2} className="border-b border-slate-100 px-3 py-3 text-center font-semibold">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>
                {selectedPersonDetails.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-10 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
                          <CalendarDays size={22} className="text-slate-400" />
                        </div>

                        <div>
                          <h5 className="text-sm font-semibold text-slate-600">
                            No Data Available
                          </h5>
                          <p className="mt-1 text-xs text-slate-400">
                            Please check/select a person to display scheduling details.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  selectedPersonDetails.map((item) => {
                    const person = item.person;
                    const theme = colorClasses[person.color];
                    const conflict = getConflictLabel(item);
                    const ConflictIcon = conflict.icon;

                    return (
                      <tr
                        key={item.id}
                        className="group border-b border-slate-100 transition hover:bg-slate-50/70"
                      >
                        {/* Name */}
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={person.image}
                              alt={person.name}
                              className={`h-9 w-9 rounded-full border-2 border-white object-cover ring-2 ${theme.ring}`}
                            />

                            <div className="min-w-0">
                              <h5 className="truncate text-sm font-semibold text-slate-700">
                                {person.name}
                              </h5>
                              <p className="truncate text-xs text-slate-400">
                                {person.role}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* From Date - To Date */}
                        <td className="px-3 py-3">
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="datetime-local"
                              value={item.fromDate}
                              onChange={(e) =>
                                handleInlineDateChange(
                                  item.id,
                                  "fromDate",
                                  e.target.value
                                )
                              }
                              className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-xs font-medium text-slate-600 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                            />

                            <input
                              type="datetime-local"
                              value={item.toDate}
                              onChange={(e) =>
                                handleInlineDateChange(
                                  item.id,
                                  "toDate",
                                  e.target.value
                                )
                              }
                              className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-xs font-medium text-slate-600 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                            />
                          </div>
                        </td>

                        {/* Conflict */}
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${conflict.className}`}
                          >
                            <ConflictIcon size={13} />
                            {conflict.label}
                          </span>
                        </td>

                        {/* Date */}


                        {/* Delete */}
                        <td className="px-3 py-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteSelectedPerson(item.id)}
                            className="inline-flex h-9 cursor-pointer w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition hover:border-red-200 hover:bg-red-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <button
                            type="button"
                            onClick={() => { }}
                            className="inline-flex h-9  cursor-pointer w-9 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-500 transition hover:border-emerald-200 hover:bg-emerald-100"
                          >
                            <Save size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  );
};