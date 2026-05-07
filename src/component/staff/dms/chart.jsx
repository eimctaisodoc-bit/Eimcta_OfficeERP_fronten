import React, { useState } from "react";
import Chart from "react-apexcharts";
import {
  File,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileAudio,
  FileVideo,
} from "lucide-react";

export const SemiDonut_ = () => {
  const series = [10, 15, 12, 8, 20, 10, 15, 10];
  const labels = [
    "Images",
    "Excel",
    "Word",
    "PDF",
    "PowerPoint",
    "Text",
    "Audio",
    "Video",
  ];
  const fileSizes = [
    "1.2GB",
    "450MB",
    "120MB",
    "85MB",
    "210MB",
    "15MB",
    "340MB",
    "1.1GB",
  ];
  const colors = [
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#EF4444",
    "#8B5CF6",
    "#FBBF24",
    "#06B6D4",
    "#F472B6",
  ];
  const icons = [
    FileImage,
    FileSpreadsheet,
    FileText,
    File,
    FileText,
    FileText,
    FileAudio,
    FileVideo,
  ];

  const [centerValue, setCenterValue] = useState("100%");

  const options = {
    chart: {
      type: "donut",
      sparkline: { enabled: true },
      toolbar: { show: false },
      events: {
        dataPointMouseEnter: (_, __, config) => {
          const value = config.w.config.series[config.dataPointIndex];
          setCenterValue(`${value}%`);
        },
        dataPointMouseLeave: () => setCenterValue("100%"),
      },
    },
    labels,
    colors,
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    legend: { show: false },
    tooltip: { enabled: true },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 0,
        donut: {
          size: "75%",
          labels: {
            show: false,
          },
        },
      },
    },
    states: {
      hover: { filter: { type: "none" } },
      active: { filter: { type: "none" } },
    },
  };

  return (
 
    <div className="md:w-[280px] mx-auto bg-white  rounded overflow-hidden font-sans ">
      <div className="p-2 sm:p-4">

        <div className="relative w-full flex justify-center mb-4">
          <div className="relative w-full">
            {/* Center Percentage Display */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-y-4">
              <span className="text-2xl font-black text-slate-800 tabular-nums" style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}>
                {centerValue}
              </span>
            </div>

            <Chart
              options={options}
              series={series}
              type="donut"
              height={220}
            />
          </div>
        </div>

        {/* Legend List */}
        <div className="flex flex-col divide-y -mt-[5rem] divide-slate-50 border-t border-slate-50">
          {labels.map((label, index) => {
            const IconComponent = icons[index];

            return (
              <div
                key={index}
                className="flex items-center justify-between gap-3 py-3 hover:bg-slate-50/50 transition-colors "
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${colors[index]}15` }}
                  >
                    <IconComponent size={16} style={{ color: colors[index] }} />
                  </div>

                  <div className="min-w-0 flex flex-col">
                    <span className="text-[13px] font-bold text-slate-700 truncate" style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}>
                      {label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {fileSizes[index]}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[13px] font-bold text-slate-900 shrink-0" style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}>
                    {series[index]}%
                  </span>
                  <div 
                    className="w-12 h-1 rounded-full mt-1" 
                    style={{ backgroundColor: `${colors[index]}20` }}
                  >
                    <div 
                      className="h-full rounded-full" 
                      style={{ width: '100%', backgroundColor: colors[index] }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      
      </div>
    </div>
  );
};