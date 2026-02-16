// src/component/hotToaster.jsx
import toast from "react-hot-toast";
import React from "react";

// ✅ Success Toast
export const SuccessNotify = (message) => {
  toast.success(message || "Login successful", {
    duration: 5000,
    style: {
      border: "1px solid #713200",
      padding: "16px",
      color: "#713200",
    },
    iconTheme: {
      primary: "#713200",
      secondary: "#FFFAEE",
    },
  });
};

// ✅ Error Toast
export const ErrorNotify = (message) => {
  toast.error(message || "This didn't work or Invalid.", {
    duration: 2000,
    style: {
      border: "1px solid #713200",
      padding: "16px",
      color: "#713200",
    },
    iconTheme: {
      primary: "#713200",
      secondary: "#FFFAEE",
    },
  });
};





const formatDateTime = (d) => {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kathmandu",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // ✅ 24-hour
  }).format(date);
}



let activeToastId = null;

export const InputNotify = (
  title = "Enter value",
  placeholder = "Type here...",
  slotInfo
) => {
  return new Promise((resolve, reject) => {
    // ✅ Only one toast at a time
    if (activeToastId) toast.dismiss(activeToastId);

    let inputValue = "";
    let done = false;

    const start = slotInfo?.start;
    const date = new Date(start);
    const resDate = date.setHours(10, 30, 0);
    const resfnDate = formatDateTime(resDate);
    const nayadate = new Date().toLocaleTimeString();
    console.log('start====Time', resfnDate,start,'----->',nayadate);
    const end = slotInfo?.end;

    const cancel = (t) => {
      if (done) return;
      done = true;
      toast.dismiss(t.id);
      reject("cancelled");
    };

    const submit = (t) => {
      if (done) return;
      const v = inputValue.trim();
      if (!v) return;

      done = true;
      toast.dismiss(t.id);
      resolve(v);
      toast.success("Saved", { duration: 1200 });
    };

    activeToastId = toast.custom(
      (t) => (
        <div
          className="w-[320px] rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden"
          onKeyDown={(e) => {
            if (e.key === "Escape") cancel(t);
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50">
            <div className="min-w-0">
              <p
                className="text-lg text-slate-400"
                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
              >
                {title}
              </p>

              {start && end && (
                <p className="mt-1 text-xs text-slate-500 truncate">
                  {formatDateTime(start)} →
                  <br />
                  {formatDateTime(end)}
                </p>
              )}
            </div>

            <button
              onClick={() => cancel(t)}
              className="h-8 w-8 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100"
              aria-label="Close"
              title="Close"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-4">
            <input
              autoFocus
              type="text"
              placeholder={placeholder}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              onChange={(e) => (inputValue = e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submit(t);
                }
              }}
            />

            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => cancel(t)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={() => submit(t)}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      ),
      {
        id: "input-notify-single",
        duration: Infinity,
        position: "top-right",
        onDismiss: () => {
          activeToastId = null;
        },
      }
    );
  });
};


