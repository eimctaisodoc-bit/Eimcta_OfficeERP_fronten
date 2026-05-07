import React, { useState } from "react";
import Chart from "react-apexcharts";
import { File, FileImage, FileSpreadsheet, FileText, FileAudio, FileVideo } from "lucide-react";

export const SemiDonut_ = () => {
  const series = [10, 15, 12, 8, 20, 10, 15, 10];
  const labels = ["Images", "Excel", "Word", "PDF", "PowerPoint", "Text", "Audio", "Video"];
  const fileSizes = ["1.2GB", "450MB", "120MB", "85MB", "210MB", "15MB", "340MB", "1.1GB"];
  const colors = ["#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#8B5CF6", "#FBBF24", "#06B6D4", "#F472B6"];
  const colorNames = ["amber", "emerald", "blue", "red", "violet", "yellow", "cyan", "pink"];
  const icons = [FileImage, FileSpreadsheet, FileText, File, FileText, FileText, FileAudio, FileVideo];

  const [centerValue, setCenterValue] = useState("100%");

  const options = {
    chart: {
      type: "donut",
      sparkline: { enabled: true }, // Cleaner for semi-donuts
      events: {
        dataPointMouseEnter: (_, __, config) => {
          const value = config.w.config.series[config.dataPointIndex];
          setCenterValue(value + "%");
        },
        dataPointMouseLeave: () => setCenterValue("100%"),
      },
    },
    labels,
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
        donut: {
          size: "75%",
          labels: { show: false },
        },
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    tooltip: { enabled: true },
    colors,
    stroke: { width: 0 }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-4">
      <div className="relative">
        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-4">
          <span className="text-2xl font-bold text-slate-800">{centerValue}</span>
        </div>
        <Chart options={options} series={series} type="donut" height={300} />
      </div>

      {/* Legend/List */}
      <div className="flex flex-col gap-1 w-full mt-4">
        {labels.map((label, index) => {
          const IconComponent = icons[index];
          const colorName = colorNames[index];
          
          return (
            <div key={index} className="flex items-center justify-between border-b border-gray-100 py-3">
              <div className="flex items-center gap-3">
                <div className="p-2" style={{ backgroundColor: `${colors[index]}15` }}>
                  <IconComponent size={16} style={{ color: colors[index] }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                  <span className="text-[10px] text-gray-400 uppercase">{fileSizes[index]}</span>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-900">{series[index]}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const DriveStat = () => {
  const used = 50;
  const free = 100 - used;
  const series = [used, free];
  const [centerValue, setCenterValue] = useState(used + "% Used");

  const options = {
    chart: {
      type: "donut",
      sparkline: { enabled: true },
      events: {
        dataPointMouseEnter: (event, chartContext, config) => {
          const value = config.w.config.series[config.dataPointIndex];
          const label = config.w.config.labels[config.dataPointIndex];
          setCenterValue(`${value}% ${label}`);
        },
        dataPointMouseLeave: () => setCenterValue(used + "% Used"),
      },
    },
    labels: ["Used", "Free"],
    colors: ["#ea580c", "#fde68a"],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        donut: { size: "75%" },
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: { width: 0 },
  };

  return (
    <div className="w-full max-w-md h-[23vh] mx-auto p-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-2">
          <span className="text-sm font-bold text-slate-800 text-center uppercase tracking-wide">
            {centerValue}
          </span>
        </div>
        <Chart options={options} series={series} type="donut" height={300} />
      </div>
    </div>
  );
};