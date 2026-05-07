import React from "react";
import { Activity, MapPin } from "lucide-react";
import Select from "react-select";

export const S_Logs_ = () => {
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
  ];

  return (
    <div className="flex justify-center items-start w-full bg-white min-h-screen overflow-hidden md:px-0">
      <div className="flex flex-col bg-white border border-slate-200 rounded h-fit overflow-hidden 
       w-full">
        {/* Header Section */}
        <div className="p-3 sm:p-4 border-b border-slate-100 bg-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3">
            <span className="font-semibold text-amber-600 text-sm sm:text-sm md:text-base flex items-center gap-2">
              <Activity size={16} className="w-4 h-4 sm:w-[16px] sm:h-[16px]" />
              Activity Logs
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] sm:text-xs md:text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-full">
              <MapPin size={13} className="text-orange-600" />
              <span>KTM</span>
            </span>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col gap-2">
            <Select
              options={options}
              placeholder="Filter type..."
              classNames={{
                control: () =>
                  "!text-[12px] sm:!text-sm !min-h-[38px] sm:!min-h-[40px] !border-slate-200 !rounded-lg !shadow-none hover:!border-slate-300",
                option: () => "text-[12px] sm:text-sm",
                placeholder: () => "text-slate-400",
                singleValue: () => "text-slate-700",
                menu: () => "text-sm",
              }}
            />

            <input
              type="date"
              className="text-[12px] sm:text-sm text-slate-600 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-white p-3 sm:p-4">
          <div className="relative border-l border-slate-200 ml-3 sm:ml-4 flex flex-col gap-5 sm:gap-6">
            {/* ================= FILE ACTIVITY ================= */}
            <div className="relative pl-4 sm:pl-6 group">
              {/* Avatar (Timeline Node) */}
              <div className="absolute -left-[12px] sm:-left-[15px] top-0 bg-white p-[2px]">
                <img
                  src="https://ui-avatars.com/api/?name=User+One&background=f1f5f9&color=0f172a"
                  alt="user"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 shadow-sm"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2.5">
                {/* Header */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[13px] sm:text-sm md:text-[15px] font-semibold text-slate-800 truncate pr-2">
                      Project_Brief.pdf
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
                      2.4 MB
                    </span>
                  </div>

                  <span className="text-[11px] sm:text-xs text-slate-400">
                    Uploaded • 2 mins ago
                  </span>
                </div>

                {/* Metadata Card */}
                <div className="flex flex-col gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100 shadow-sm">
                  {/* Info */}
                  <div className="flex flex-col text-[11px] sm:text-xs text-slate-500 gap-1">
                    <span>
                      Shared with{" "}
                      <span className="font-medium text-slate-800">
                        Design Team
                      </span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400">
                      Access: Read &amp; Comment
                    </span>
                  </div>

                  {/* Avatar Stack */}
                  <div className="flex -space-x-1.5">
                    <img
                      className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer rounded-full border-2 border-white"
                      src="https://ui-avatars.com/api/?name=A&background=0ea5e9&color=fff"
                      alt="A"
                    />
                    <img
                      className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer rounded-full border-2 border-white"
                      src="https://ui-avatars.com/api/?name=B&background=6366f1&color=fff"
                      alt="B"
                    />
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 cursor-pointer border-white bg-slate-200 flex items-center justify-center text-[9px] sm:text-[10px] font-semibold text-slate-600">
                      +2
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Activity Item */}
          </div>
        </div>
      </div>
    </div>
  );
};