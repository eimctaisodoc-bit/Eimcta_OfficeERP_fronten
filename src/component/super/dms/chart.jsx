import React, { useState } from "react";
import Chart from "react-apexcharts";

const SemiDonut = () => {
  const series = [10, 15, 12, 8, 20, 10, 15, 10];

  const [centerValue, setCenterValue] = useState("100%"); // default

  const options = {
    chart: {
      type: "donut",

      events: {
        dataPointMouseEnter: (event, chartContext, config) => {
          const value = config.w.config.series[config.dataPointIndex];
          setCenterValue(value + "%");
        },
        dataPointMouseLeave: () => {
          setCenterValue("100%"); // reset
        },
      },
    },
    labels: [
      "Images",
      "Excel",
      "Word ",
      "PDF",
      "PowerPoint",
      "Text ",
      "Audio",
      "Video",
    ],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 0,
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true, // 🔥 optional (since we show center value)
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-4 relative">
      <div className="relative">
        {/* Center Text */}
        <div className="absolute inset-0 flex  -top-[2rem] items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-slate-800">
            {centerValue}
          </span>
        </div>

        <Chart options={options} series={series} type="donut" height={350} />
      </div>
    </div>
  );
};

export default SemiDonut;