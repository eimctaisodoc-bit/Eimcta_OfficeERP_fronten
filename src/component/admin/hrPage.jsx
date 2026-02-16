import { useState, useEffect } from "react";
import React from "react";
// import Attend_Mgt_Client_form from "../component/client_hrfroms/attend_mgt_client";

// import LeaveManagementForm from "../staff/Staff_hr/leave_,mgt_client.jsx";
import Breadcrumb from "../breadGrum.jsx";
import { RecruitmentTable } from "./admin_hr/admin_hR_/recruTable.jsx";
import Attend_HR_Data_Table from "./admin_hr/atten_hr_table_Data.jsx";
// import Attend_Mgt_Client_form from "../staff/Staff_hr/attend_mgt_client.jsx";

const Admin_Hr_Page = () => {
  const [activeTab, setActiveTab] = useState("recruitment");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const tabs = [
    {
      id: "recruitment",
      label: "Recruitment",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      content: <RecruitmentTable />
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      content: <Attend_HR_Data_Table />
    },
    
  ];

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);

  return (
    <div
      className="min-h-screen bg-white"
      style={{
        fontFamily: "'Roboto Slab', serif",
        fontWeight: 400
      }}
    >
      {/* Enhanced Breadcrumb Container */}
      <div className=" border-b p-4  border-amber-200/50">
        <div className="max-w-5xl mx-auto px-4 py-2">
          <Breadcrumb items={[
            { label: "Dashboard", to: "/dashboard" },
            { label: "HR Management", to: "/hr" },
            { label: tabs.find(tab => tab.id === activeTab)?.label, to: null, active: true }
          ]} />
        </div>
      </div>
      
      
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">HR Management System</h1>
              <p className="text-sm text-white/90">Manage all employee operations</p>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-between gap-1 bg-white/10 px-2 py-1">
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.id}>
                {index > 0 && (
                  <div className="w-1 h-1 bg-white/50 mx-1"></div>
                )}
                <span className={`text-xs ${activeTab === tab.id ? 'text-white font-semibold' : 'text-white/70'}`}>
                  {tab.label}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      
      <div className="border-b border-gray-200">
        {!isMobile ? (
          /* Desktop Tabs - Simple Horizontal */
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  flex-1 flex items-center justify-center gap-3 py-4
                  transition-all duration-200 relative
                  ${activeTab === tab.id
                    ? "text-amber-700 bg-gradient-to-b from-amber-50 to-white"
                    : "text-gray-600 hover:text-amber-600 hover:bg-gray-50"
                  }
                `}
              >
                {tab.icon}
                <span className="text-sm font-medium">{tab.label}</span>

                {/* Active Indicator */}

              </button>
            ))}
          </div>
        ) : (
          /* Mobile - Simple Button Row */
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  flex-none flex items-center gap-2 px-4 py-3 border-r border-gray-200
                  ${activeTab === tab.id
                    ? "text-amber-700 bg-amber-50"
                    : "text-gray-600 bg-white"
                  }
                `}
              >
                {tab.icon}
                <span className="text-sm font-medium whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

       
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-700 transition-all duration-300"
          style={{ width: `${((activeTabIndex + 1) / tabs.length) * 100}%` }}
        ></div>
      </div>

    
      <div
        className={`
          transition-opacity duration-300
          ${isTransitioning ? "opacity-50" : "opacity-100"}
        `}
      >
        {/* Current Section Header */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className={`p-2 ${activeTab === "employment" ? "bg-amber-100 text-amber-700" :
                activeTab === "attendance" ? "bg-amber-100 text-amber-700" :
                  "bg-amber-100 text-amber-700"
              }`}>
              {tabs.find(tab => tab.id === activeTab)?.icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  {tabs.map((tab, index) => (
                    <React.Fragment key={tab.id}>
                      <div className={`w-2 h-2 ${activeTab === tab.id ? 'bg-amber-600' : 'bg-gray-300'}`}></div>
                      {index < tabs.length - 1 && (
                        <div className="w-4 h-[1px] bg-gray-300"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  Section {activeTabIndex + 1} of {tabs.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content Container - Full Width */}
        <div className="bg-transparent">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>

    
      
      </div>
    </div>
  );
};

export default Admin_Hr_Page ;