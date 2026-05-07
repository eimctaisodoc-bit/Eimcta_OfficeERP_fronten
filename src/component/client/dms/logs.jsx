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
    <div className="flex justify-center items-start w-full bg-white min-h-screen ">
      {/* Container adjusted to 240px */}
      <div className="flex flex-col w-[240px] bg-white border border-slate-200 rounded-md h-fit overflow-hidden shadow-sm">
        
        {/* Header Section */}
        <div className="p-3 border-b border-slate-100 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-amber-600 text-[12px] flex items-center gap-1.5">
              <Activity size={14} /> Activity Logs
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[8px] text-orange-700 bg-orange-50 border border-orange-200 rounded-full">
              <MapPin size={8} className="text-orange-600" />
              <span>KTM</span>
            </span>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col gap-1.5">
            <Select
              options={options}
              placeholder="Filter type..."
              classNames={{
                control: () => "!text-[10px] !min-h-[28px] !border-slate-200 !rounded-md !shadow-none",
                option: () => "text-[10px]",
                placeholder: () => "text-slate-400",
              }}
            />
            <input
              type="date"
              className="text-[10px] text-slate-600 border border-slate-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-white p-3">
          <div className="relative border-l border-slate-200 ml-3 flex flex-col gap-6">
            
            {/* ================= FILE ACTIVITY ================= */}
            <div className="relative pl-5 group">
              
              {/* Avatar (Timeline Node) - Adjusted for 240px width */}
              <div className="absolute -left-[13px] top-0 bg-white p-[1px]">
                <img
                  src="https://ui-avatars.com/api/?name=User+One&background=f1f5f9&color=0f172a"
                  alt="user"
                  className="w-6 h-6 rounded-full border border-slate-200 shadow-sm"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                {/* Header */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-800 truncate pr-1">
                      Project_Brief.pdf
                    </span>
                    <span className="text-[9px] text-slate-400 whitespace-nowrap">2.4 MB</span>
                  </div>
                  <span className="text-[9px] text-slate-400">
                    Uploaded • 2 mins ago
                  </span>
                </div>

                {/* Metadata Card */}
                <div className="flex flex-col gap-2 bg-slate-50 p-2 rounded border border-slate-100 shadow-sm">
                  {/* Info */}
                  <div className="flex flex-col text-[9px] text-slate-500">
                    <span>
                      Shared with{" "}
                      <span className="font-medium text-slate-800">Design Team</span>
                    </span>
                    <span className="text-[8px] text-slate-400">
                      Access: Read & Comment
                    </span>
                  </div>

                  {/* Avatar Stack */}
                  <div className="flex -space-x-1.5">
                    <img
                      className="w-5 h-5 cursor-pointer rounded-full border-2 border-white"
                      src="https://ui-avatars.com/api/?name=A&background=0ea5e9&color=fff"
                      alt="A"
                    />
                    <img
                      className="w-5 h-5 cursor-pointer rounded-full border-2 border-white"
                      src="https://ui-avatars.com/api/?name=B&background=6366f1&color=fff"
                      alt="B"
                    />
                    <div className="w-5 h-5 rounded-full border-2 cursor-pointer border-white bg-slate-200 flex items-center justify-center text-[8px] font-semibold text-slate-600">
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