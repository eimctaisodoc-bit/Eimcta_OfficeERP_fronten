import { useState, useEffect } from "react";
import React from "react";
import Breadcrumb from "../breadGrum.jsx";
import Attend_hR_Data_table from "./Staff_hr/atten_hr_table_Data.jsx";

const Staff_hr_pages = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="min-h-screen bg-white"
      style={{
        fontFamily: "'Roboto Slab', serif",
        fontWeight: 400
      }}
    >
      {/* Enhanced Breadcrumb Container */}
      <div className="border-b p-4 border-amber-200/50">
        <div className="max-w-5xl mx-auto px-4 py-2">
          <Breadcrumb items={[
            { label: "Dashboard", to: "/dashboard" },
            { label: "HR Management", to: "/hr" },
            { label: "Attendance", to: null, active: true }
          ]} />
        </div>
      </div>
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">HR Management System</h1>
              <p className="text-sm text-white/90">Manage all employee operations</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-1 bg-white/10 px-2 py-1">
            <span className="text-xs text-white font-semibold">Attendance</span>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="p-2 bg-amber-100 text-amber-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Attendance Management</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">View and manage employee attendance records</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container - Full Width */}
      <div className="bg-transparent">
        <Attend_hR_Data_table />
      </div>
    </div>
  );
};

export default Staff_hr_pages;