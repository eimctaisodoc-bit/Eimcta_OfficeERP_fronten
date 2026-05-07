import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Timer,
  ChevronDown,
  CalendarDays,
  CheckCircle2,
  XCircle,
  MessageSquareText,
  Bell,
  AlertTriangle,
  Sparkles,
  Send,
  X,
  Upload,
  CalendarRange,
  Search,
  RotateCcw,
  SlidersHorizontal,
  FileSpreadsheet,
  BriefcaseBusiness,
  Download,
} from "lucide-react";

const notificationThemes = [
  {
    name: "amber-orange",
    iconBg: "bg-orange-50",
    iconText: "text-orange-500",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-600",
    hover: "hover:border-orange-200 hover:bg-orange-50/40",
  },
  {
    name: "purple",
    iconBg: "bg-purple-50",
    iconText: "text-purple-500",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-600",
    hover: "hover:border-purple-200 hover:bg-purple-50/40",
  },
  {
    name: "mango",
    iconBg: "bg-[#FFF4D6]",
    iconText: "text-[#F59E0B]",
    badgeBg: "bg-[#FFF4D6]",
    badgeText: "text-[#D97706]",
    hover: "hover:border-[#FACC15] hover:bg-[#FFF4D6]/50",
  },
  {
    name: "red",
    iconBg: "bg-red-50",
    iconText: "text-red-500",
    badgeBg: "bg-red-50",
    badgeText: "text-red-600",
    hover: "hover:border-red-200 hover:bg-red-50/40",
  },
  {
    name: "emerald",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-500",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-600",
    hover: "hover:border-emerald-200 hover:bg-emerald-50/40",
  },
  {
    name: "blue",
    iconBg: "bg-blue-50",
    iconText: "text-blue-500",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-600",
    hover: "hover:border-blue-200 hover:bg-blue-50/40",
  },
];

const initialHolidayList = [
  {
    id: 1,
    type: "Government",
    title: "Nepali New Year",
    date: "2081/01/01 - 2081/01/02",
    time: "00:00 - 23:59",
    fromDateTime: "2024-04-13T00:00",
    toDateTime: "2024-04-14T23:59",
    remark: "New Year public holiday as per government schedule.",
    status: "Auto Display",
    icon: CalendarDays,
    themeIndex: 0,
  },
  {
    id: 2,
    type: "Client Remark",
    title: "Client Suggested Working Day",
    date: "2081/01/03",
    time: "09:30 - 16:30",
    fromDateTime: "2024-04-15T09:30",
    toDateTime: "2024-04-15T16:30",
    remark: "Client suggested this day as a working day.",
    status: "Pending Approval",
    icon: MessageSquareText,
    themeIndex: 1,
  },
  {
    id: 3,
    type: "Schedule Remark",
    title: "Extra Class Adjustment",
    date: "2081/01/05",
    time: "07:00 - 09:00",
    fromDateTime: "2024-04-17T07:00",
    toDateTime: "2024-04-17T09:00",
    remark: "Extra class schedule adjusted due to previous holiday.",
    status: "Approved",
    icon: CheckCircle2,
    themeIndex: 2,
  },
  {
    id: 4,
    type: "Government",
    title: "Loktantra Diwas",
    date: "2081/01/11",
    time: "00:00 - 23:59",
    fromDateTime: "2024-04-23T00:00",
    toDateTime: "2024-04-23T23:59",
    remark: "Public holiday according to government notice.",
    status: "Auto Display",
    icon: CalendarDays,
    themeIndex: 3,
  },
  {
    id: 5,
    type: "Client Remark",
    title: "Working Day Suggestion",
    date: "2081/01/15",
    time: "10:00 - 15:00",
    fromDateTime: "2024-04-27T10:00",
    toDateTime: "2024-04-27T15:00",
    remark: "Client requested this holiday to be converted into working day.",
    status: "Pending Approval",
    icon: AlertTriangle,
    themeIndex: 4,
  },
  {
    id: 6,
    type: "Client Remark",
    title: "Special Class Request",
    date: "2081/01/18",
    time: "06:30 - 08:30",
    fromDateTime: "2024-04-30T06:30",
    toDateTime: "2024-04-30T08:30",
    remark: "Client requested to add a special class for missed learning hours.",
    status: "Suggestion Required",
    icon: Sparkles,
    themeIndex: 5,
  },
];

export function ScheduleRemark() {
  const [isOpen, setIsOpen] = useState(false);
  const [holidayList, setHolidayList] = useState(initialHolidayList);
  const [openHolidayFile, setOpenHolidayFile] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchFromDateTime, setSearchFromDateTime] = useState("");
  const [searchToDateTime, setSearchToDateTime] = useState("");
  const [activeMatchId, setActiveMatchId] = useState(null);

  const scrollAreaRef = useRef(null);
  const notificationRefs = useRef({});

  const handleHolidayFileUpload = () => { }// Placeholder for file upload handler
  
  // const  clearSearch = () => { }
const downloadHolidayScheduleSample=()=>{}
const downloadWorkingScheduleSample=()=>{}
  const [rejectBox, setRejectBox] = useState({
    itemId: null,
    reason: "",
    error: "",
  });

  const [suggestDialog, setSuggestDialog] = useState({
    open: false,
    item: null,
    fromDate: "",
    toDate: "",
    note: "",
    errors: {},
  });

  const getTimeValue = (value) => {
    if (!value) return null;
    const time = new Date(value).getTime();
    return Number.isNaN(time) ? null : time;
  };

  const filteredHolidayList = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    const searchFromTime = getTimeValue(searchFromDateTime);
    const searchToTime = getTimeValue(searchToDateTime);

    return holidayList.filter((item) => {
      const searchableText = [
        item.type,
        item.title,
        item.date,
        item.time,
        item.remark,
        item.status,
        item.fromDateTime,
        item.toDateTime,
      ]
        .join(" ")
        .toLowerCase();

      const textMatched = keyword ? searchableText.includes(keyword) : true;

      const itemFromTime = getTimeValue(item.fromDateTime);
      const itemToTime = getTimeValue(item.toDateTime);

      let dateMatched = true;

      if (searchFromTime && itemToTime) {
        dateMatched = itemToTime >= searchFromTime;
      }

      if (dateMatched && searchToTime && itemFromTime) {
        dateMatched = itemFromTime <= searchToTime;
      }

      return textMatched && dateMatched;
    });
  }, [holidayList, searchText, searchFromDateTime, searchToDateTime]);

  const hasSearch =
    searchText.trim() || searchFromDateTime.trim() || searchToDateTime.trim();

  const firstMatchedId = filteredHolidayList?.[0]?.id;

  useEffect(() => {
    if (hasSearch) {
      setIsOpen(true);
    }
  }, [hasSearch]);

  useEffect(() => {
    if (!isOpen || !hasSearch || !firstMatchedId) return;

    const timer = setTimeout(() => {
      const targetElement = notificationRefs.current[firstMatchedId];

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });

        setActiveMatchId(firstMatchedId);

        setTimeout(() => {
          setActiveMatchId(null);
        }, 1600);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [isOpen, hasSearch, firstMatchedId, searchText, searchFromDateTime, searchToDateTime]);

  const clearSearch = () => {
    setSearchText("");
    setSearchFromDateTime("");
    setSearchToDateTime("");
    setActiveMatchId(null);

    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const updateStatus = (id, status) => {
    setHolidayList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleApprove = (item) => {
    const payload = {
      action: "approve",
      holidayId: item.id,
      title: item.title,
      status: "Approved",
    };

    console.log("SEND APPROVE DATA:", payload);
    updateStatus(item.id, "Approved");
  };

  const openRejectBox = (item) => {
    setRejectBox({
      itemId: item.id,
      reason: "",
      error: "",
    });
  };

  const closeRejectBox = () => {
    setRejectBox({
      itemId: null,
      reason: "",
      error: "",
    });
  };

  const handleRejectSend = (item) => {
    const reason = rejectBox.reason.trim();

    if (!reason) {
      setRejectBox((prev) => ({
        ...prev,
        error: "Reject reason is required.",
      }));
      return;
    }

    if (reason.length < 5) {
      setRejectBox((prev) => ({
        ...prev,
        error: "Reason must be at least 5 characters.",
      }));
      return;
    }

    const payload = {
      action: "reject",
      holidayId: item.id,
      title: item.title,
      reason,
      status: "Rejected",
    };

    console.log("SEND REJECT DATA:", payload);

    updateStatus(item.id, "Rejected");
    closeRejectBox();
  };

  const openSuggestDialog = (item) => {
    setSuggestDialog({
      open: true,
      item,
      fromDate: "",
      toDate: "",
      note: "",
      errors: {},
    });
  };

  const closeSuggestDialog = () => {
    setSuggestDialog({
      open: false,
      item: null,
      fromDate: "",
      toDate: "",
      note: "",
      errors: {},
    });
  };

  const isValidDateTimeLocal = (value) => {
    if (!value) return false;

    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    const time = new Date(value).getTime();

    return dateTimeRegex.test(value) && !Number.isNaN(time);
  };

  const validateSuggestForm = () => {
    const errors = {};

    if (!suggestDialog.fromDate.trim()) {
      errors.fromDate = "From date and time is required.";
    } else if (!isValidDateTimeLocal(suggestDialog.fromDate.trim())) {
      errors.fromDate = "Select valid from date and time.";
    }

    if (!suggestDialog.toDate.trim()) {
      errors.toDate = "To date and time is required.";
    } else if (!isValidDateTimeLocal(suggestDialog.toDate.trim())) {
      errors.toDate = "Select valid to date and time.";
    }

    if (
      isValidDateTimeLocal(suggestDialog.fromDate.trim()) &&
      isValidDateTimeLocal(suggestDialog.toDate.trim()) &&
      new Date(suggestDialog.fromDate).getTime() >
      new Date(suggestDialog.toDate).getTime()
    ) {
      errors.toDate = "To date/time must be greater than or equal to from date/time.";
    }

    if (!suggestDialog.note.trim()) {
      errors.note = "Suggestion note is required.";
    } else if (suggestDialog.note.trim().length < 5) {
      errors.note = "Note must be at least 5 characters.";
    }

    return errors;
  };

  const handleSuggestSend = () => {
    const errors = validateSuggestForm();

    if (Object.keys(errors).length > 0) {
      setSuggestDialog((prev) => ({
        ...prev,
        errors,
      }));
      return;
    }

    const payload = {
      action: "suggest",
      holidayId: suggestDialog.item?.id,
      title: suggestDialog.item?.title,
      fromDateTime: suggestDialog.fromDate.trim(),
      toDateTime: suggestDialog.toDate.trim(),
      note: suggestDialog.note.trim(),
      status: "Suggestion Sent",
    };

    console.log("SEND SUGGEST DATA:", payload);

    updateStatus(suggestDialog.item.id, "Suggestion Sent");
    closeSuggestDialog();
  };
  return (
    <div className="w-full bg-white pt-1">
      {/* Header */}
      <div className="flex items-center align-baseline">
        <div className="flex flex-1  items-center justify-start gap-2 border-b border-slate-100 pb-3">
          <span className="rounded bg-amber-50 p-1.5">
            <Timer size={17} className="text-amber-500" />
          </span>

          <span className="text-[14px] font-semibold text-black sm:text-sm">
            Working Schedule
          </span>
        </div>

        <div className="flex items-center gap-2" onClick={() => { setOpenHolidayFile(true) }}>
          <span className="rounded cursor-pointer bg-amber-50 p-1.5">
            <Upload size={14} className=" cursor-pointer text-amber-500" />
          </span>
        </div>
        {/* Start upload section  */}
        {openHolidayFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-amber-50 p-2">
                    <FileSpreadsheet size={17} className="text-amber-500" />
                  </span>

                  <div>
                    <h3 className="text-[14px] font-bold text-slate-900">
                      Upload Schedule File
                    </h3>
                    <p className="text-[11px] font-medium text-slate-500">
                      Upload holiday or working schedule excel file
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenHolidayFile(false)}
                  className="rounded bg-white p-1.5 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-4 p-4">
                {/* Dropdown */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-slate-700">
                    Select Schedule Type
                  </label>

                  <select
                    defaultValue=""
                    className="h-10 w-full rounded border border-slate-200 bg-white px-3 text-[13px] font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="" disabled>
                      Choose schedule type
                    </option>
                    <option value="holiday_schedule">Holiday Schedule</option>
                    <option value="working_schedule">Working Schedule</option>
                  </select>
                </div>

                {/* Upload Area */}
                <label
                  htmlFor="holidayScheduleFile"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    // use your drop function here
                    // handleHolidayDropFile(e);
                  }}
                  className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/40 px-4 py-6 text-center transition hover:border-amber-400 hover:bg-amber-50"
                >
                  <span className="mb-3 rounded-full bg-white p-3 shadow-sm">
                    <Upload size={24} className="text-amber-500" />
                  </span>

                  <h4 className="text-[14px] font-bold text-slate-800">
                    Drop & Drag Excel File Here
                  </h4>

                  <p className="mt-1 text-[12px] font-medium text-slate-500">
                    or click to browse file from your device
                  </p>

                  <span className="mt-3 rounded bg-white px-3 py-1 text-[11px] font-semibold text-amber-600">
                    Accepted: .xlsx, .xls
                  </span>

                  <input
                    id="holidayScheduleFile"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleHolidayFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={downloadHolidayScheduleSample}
                    className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded border border-amber-200 bg-white px-3 text-[12px] font-semibold text-amber-600 transition hover:border-amber-500 hover:bg-amber-500 hover:text-white"
                  >
                    <CalendarDays size={13} />
                    Holiday Sample
                    <Download size={12} />
                  </button>

                  <button
                    type="button"
                    onClick={downloadWorkingScheduleSample}
                    className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded border border-blue-200 bg-white px-3 text-[12px] font-semibold text-blue-600 transition hover:border-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    <BriefcaseBusiness size={13} />
                    Working Sample
                    <Download size={12} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenHolidayFile(false)}
                  className="inline-flex h-9 cursor-pointer items-center justify-center rounded border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {/* End */}
      </div>

      {/* Single Accordion */}
      <div className="mt-3 rounded border border-slate-100 bg-white">
        {/* Accordion Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full cursor-pointer items-center justify-between gap-3 rounded px-3 py-2.5 text-left transition hover:bg-slate-50"
        >
          <div className="flex min-w-0 items-center gap-2">
            <span className="shrink-0 rounded bg-blue-50 p-1.5">
              <Bell size={14} className="text-blue-500" />
            </span>

            <div className="min-w-0">
              <h3 className="truncate text-[14px] font-semibold text-black sm:text-sm">
                Client Schedule Notifications
              </h3>

              <p className="truncate text-[12px] text-orange-500 sm:text-xs">
                Client remarks, working day suggestions and schedule updates
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-500">
              {filteredHolidayList.length}/{holidayList.length}
            </span>

            <ChevronDown
              size={16}
              className={`text-blue-500 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
                }`}
            />
          </div>
        </button>

        {/* Accordion Content */}
        <div
          className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-slate-100 bg-white p-1.5">
              {/* Search Area */}
              <div className="mb-3 rounded border border-slate-100 bg-slate-50/60 p-1">
                {/* Expand / Collapse Filter Header */}
                <div className="mb-3 rounded border border-slate-100 bg-white/60">
                  <button
                    type="button"
                    onClick={() => setOpenFilter((prev) => !prev)}
                    className="flex w-full cursor-pointer items-center justify-between px-3 py-2.5 text-left transition hover:bg-slate-100/70"
                  >
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-amber-50 p-1.5">
                        <SlidersHorizontal size={14} className="text-amber-500" />
                      </span>

                      <div>
                        <h4 className="text-[13px] font-semibold text-slate-800">
                          Filter Schedule Remark
                        </h4>
                        <p className="text-[11px] font-medium text-slate-500">
                          Search by from date and to date time
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      size={16}
                      className={`text-slate-500 transition duration-300 ${openFilter ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Expanded Filter Body */}
                  {openFilter && (
                    <div className="border-t border-slate-100 bg-white p-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <input
                            type="datetime-local"
                            value={searchFromDateTime}
                            onChange={(e) => setSearchFromDateTime(e.target.value)}
                            className="h-10 w-full rounded border border-slate-200 bg-white px-3 text-[13px] text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-auto"
                          />

                          <input
                            type="datetime-local"
                            value={searchToDateTime}
                            onChange={(e) => setSearchToDateTime(e.target.value)}
                            className="h-10 w-full rounded border border-slate-200 bg-white px-3 text-[13px] text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-auto"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={clearSearch}
                          className="inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                        >
                          <RotateCcw size={13} />
                          Clear
                        </button>
                      </div>

                      {hasSearch && (
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-medium">
                          <span className="rounded bg-amber-50 px-2 py-1 text-amber-600">
                            Matched: {filteredHolidayList.length}
                          </span>

                          {firstMatchedId && (
                            <span className="rounded bg-blue-50 px-2 py-1 text-blue-600">
                              Auto scrolled to first match
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {hasSearch && (
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-medium">
                    <span className="rounded bg-amber-50 px-2 py-1 text-amber-600">
                      Matched: {filteredHolidayList.length}
                    </span>

                    {firstMatchedId && (
                      <span className="rounded bg-blue-50 px-2 py-1 text-blue-600">
                        Auto scrolled to first match
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Scroll Area */}
              <div
                ref={scrollAreaRef}
                className="max-h-[285px] space-y-2 overflow-y-auto pr-1 scroll-smooth"
              >
                {filteredHolidayList.length > 0 ? (
                  filteredHolidayList.map((item) => {
                    const Icon = item.icon;
                    const theme =
                      notificationThemes[item.themeIndex] ||
                      notificationThemes[0];

                    const isRejectOpen = rejectBox.itemId === item.id;
                    const isActiveMatch = activeMatchId === item.id;

                    return (
                      <div
                        key={item.id}
                        ref={(element) => {
                          notificationRefs.current[item.id] = element;
                        }}
                        className={`rounded border border-slate-100 bg-white p-3 shadow-sm transition duration-300 ${theme.hover} ${isActiveMatch
                          ? "ring-2 ring-amber-300 ring-offset-1"
                          : ""
                          }`}
                      >
                        {/* Notification Top */}
                        <div className="flex items-start gap-2">
                          <span
                            className={`mt-0.5 shrink-0 rounded p-1.5 ${theme.iconBg}`}
                          >
                            <Icon size={14} className={theme.iconText} />
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                              <h4 className="truncate text-[13px] font-semibold text-black sm:text-sm">
                                {item.title}
                              </h4>

                              <span
                                className={`w-fit rounded px-2 py-0.5 text-[11px] font-semibold ${theme.badgeBg} ${theme.badgeText}`}
                              >
                                {item.type}
                              </span>
                            </div>

                            <div className="mt-0.5 flex flex-wrap items-center gap-2">
                              <p className={`text-[12px] font-medium ${theme.iconText}`}>
                                {item.date}
                              </p>

                              <span className="rounded bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                                {item.time}
                              </span>
                            </div>

                            <p className="mt-2 text-[13px] leading-5 text-slate-700">
                              {item.remark}
                            </p>
                          </div>
                        </div>

                        {/* Bottom Action */}
                        <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                          <span
                            className={`w-fit rounded px-2 py-1 text-[11px] font-semibold ${theme.badgeBg} ${theme.badgeText}`}
                          >
                            {item.status}
                          </span>

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleApprove(item)}
                              className="cursor-pointer rounded border border-amber-500 bg-amber-50 px-3 py-1.5 text-[12px] font-medium text-amber-500 transition hover:bg-amber-500 hover:text-white"
                            >
                              Approve
                            </button>

                            <button
                              type="button"
                              onClick={() => openSuggestDialog(item)}
                              className="cursor-pointer rounded border border-blue-500 bg-blue-50 px-3 py-1.5 text-[12px] font-medium text-blue-500 transition hover:bg-blue-500 hover:text-white"
                            >
                              Suggest
                            </button>

                            <button
                              type="button"
                              onClick={() => openRejectBox(item)}
                              className="cursor-pointer rounded border border-red-500 bg-red-50 px-3 py-1.5 text-[12px] font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
                            >
                              Reject
                            </button>
                          </div>
                        </div>

                        {/* Reject Reason Box */}
                        {isRejectOpen && (
                          <div className="mt-3 rounded border border-red-100 bg-red-50/40 p-3">
                            <div className="mb-2 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="rounded bg-red-50 p-1.5">
                                  <XCircle size={14} className="text-red-500" />
                                </span>

                                <span className="text-[13px] font-semibold text-red-600">
                                  Reject Reason
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={closeRejectBox}
                                className="rounded bg-white p-1 text-slate-500 transition hover:text-red-500"
                              >
                                <X size={14} />
                              </button>
                            </div>

                            <textarea
                              value={rejectBox.reason}
                              onChange={(e) =>
                                setRejectBox((prev) => ({
                                  ...prev,
                                  reason: e.target.value,
                                  error: "",
                                }))
                              }
                              rows={3}
                              placeholder="Write reject reason..."
                              className={`w-full resize-none rounded border bg-white px-3 py-2 text-[13px] text-slate-700 outline-none transition placeholder:text-slate-400 ${rejectBox.error
                                ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                : "border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                                }`}
                            />

                            {rejectBox.error && (
                              <p className="mt-1 text-[11px] font-medium text-red-500">
                                {rejectBox.error}
                              </p>
                            )}

                            <div className="mt-3 flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={closeRejectBox}
                                className="rounded border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-600 transition hover:bg-slate-50"
                              >
                                Cancel
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRejectSend(item)}
                                className="inline-flex items-center gap-1.5 rounded border border-red-500 bg-red-500 px-3 py-1.5 text-[12px] font-medium text-white transition hover:bg-red-600"
                              >
                                <Send size={13} />
                                Send
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
                    <p className="text-[13px] font-semibold text-slate-700">
                      No matching schedule remark found.
                    </p>

                    <p className="mt-1 text-[12px] text-slate-500">
                      Try another title, status, date, or time range.
                    </p>
                  </div>
                )}
              </div>

              {/* Small Footer */}
              <div className="mt-3 flex items-center justify-between rounded bg-slate-50 px-3 py-2">
                <span className="text-[11px] font-medium text-slate-500">
                  Search result scrolls automatically to first matched notification
                </span>

                <span className="text-[11px] font-semibold text-amber-500">
                  Showing {filteredHolidayList.length} of {holidayList.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggest Dialog */}
      {suggestDialog.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
          <div className="w-full max-w-md rounded bg-white shadow-xl">
            {/* Dialog Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3">
              <div className="flex items-start gap-2">
                <span className="rounded bg-blue-50 p-1.5">
                  <CalendarRange size={16} className="text-blue-500" />
                </span>

                <div>
                  <h3 className="text-[14px] font-semibold text-black">
                    Suggest Schedule Date
                  </h3>

                  <p className="mt-0.5 text-[12px] text-slate-500">
                    {suggestDialog.item?.title}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeSuggestDialog}
                className="cursor-pointer rounded bg-slate-50 p-1.5 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
              >
                <X size={15} />
              </button>
            </div>

            {/* Dialog Body */}
            <div className="space-y-3 px-4 py-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-slate-700">
                    From Date & Time
                  </label>

                  <input
                    type="datetime-local"
                    value={suggestDialog.fromDate}
                    onChange={(e) =>
                      setSuggestDialog((prev) => ({
                        ...prev,
                        fromDate: e.target.value,
                        errors: {
                          ...prev.errors,
                          fromDate: "",
                        },
                      }))
                    }
                    className={`h-10 w-full rounded border bg-white px-3 text-[13px] text-slate-700 outline-none transition placeholder:text-slate-400 ${suggestDialog.errors.fromDate
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                  />

                  {suggestDialog.errors.fromDate && (
                    <p className="mt-1 text-[11px] font-medium text-red-500">
                      {suggestDialog.errors.fromDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-slate-700">
                    To Date & Time
                  </label>

                  <input
                    type="datetime-local"
                    value={suggestDialog.toDate}
                    onChange={(e) =>
                      setSuggestDialog((prev) => ({
                        ...prev,
                        toDate: e.target.value,
                        errors: {
                          ...prev.errors,
                          toDate: "",
                        },
                      }))
                    }
                    className={`h-10 w-full rounded border bg-white px-3 text-[13px] text-slate-700 outline-none transition placeholder:text-slate-400 ${suggestDialog.errors.toDate
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                  />

                  {suggestDialog.errors.toDate && (
                    <p className="mt-1 text-[11px] font-medium text-red-500">
                      {suggestDialog.errors.toDate}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[12px] font-semibold text-slate-700">
                  Note
                </label>

                <textarea
                  value={suggestDialog.note}
                  onChange={(e) =>
                    setSuggestDialog((prev) => ({
                      ...prev,
                      note: e.target.value,
                      errors: {
                        ...prev.errors,
                        note: "",
                      },
                    }))
                  }
                  rows={4}
                  placeholder="Write suggestion note..."
                  className={`w-full resize-none rounded border bg-white px-3 py-2 text-[13px] text-slate-700 outline-none transition placeholder:text-slate-400 ${suggestDialog.errors.note
                    ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                />

                {suggestDialog.errors.note && (
                  <p className="mt-1 text-[11px] font-medium text-red-500">
                    {suggestDialog.errors.note}
                  </p>
                )}
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-4 py-3">
              <button
                type="button"
                onClick={closeSuggestDialog}
                className="cursor-pointer rounded border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSuggestSend}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded border border-blue-500 bg-blue-500 px-3 py-1.5 text-[12px] font-medium text-white transition hover:bg-blue-600"
              >
                <Send size={13} />
                Send Suggestion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}