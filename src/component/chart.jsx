import Chart from "react-apexcharts";
import React from 'react'
export default function DonutChart() {
    const options = {
        chart: {
            type: "donut",
        },
        labels: [],
        colors: ["#f97316", "#e5e7eb"], // amber / slate
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                    labels: {
                        show: true,
                        total: {
                            show: true,

                            fontSize: "14px",
                            color: "#475569",
                        },
                    },
                    legend: {
                        show: false, // 🔥 hides bottom labels
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    tooltip: {
                        enabled: false, // 🔥 optional: hides hover text
                    },
                },
            },
        },
        legend: {
            position: "bottom",
        },
        dataLabels: {
            enabled: false,
        },
    };

    const series = [75, 25];

    return (
        <div className="w-30 mx-auto">
            <Chart options={options} series={series} type="donut" height={300} />
        </div>
    );
}
