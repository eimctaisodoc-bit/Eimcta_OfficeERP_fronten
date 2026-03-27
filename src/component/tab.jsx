import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {

} from 'lucide-react';
// Staff,tabData
export const Tab_C = ({ content, tab }) => {
  const [activeTab, setActiveTab] = useState(0);

  // const tabs = AdminTabTitle || StaffTabTitle 
  return (
    <div className="max-w-6xl mx-auto ">

      <Tabs
        selectedIndex={activeTab}
        onSelect={(index) => setActiveTab(index)}
        className="bg-white rounded-2xl  border border-gray-100 overflow-hidden"
      >
        <div className="relative  border-b border-gray-100">
          <TabList className="flex overflow-x-auto no-scrollbar outline-none">
            {tab?.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === index;

              return (
                <Tab
                  key={index}
                  className="flex-1 w-auto  outline-none cursor-pointer relative"
                  selectedClassName="is-selected"
                >
                  <div className={`
                    flex items-center justify-center gap-2 py-5 px-4
                    transition-all duration-300 ease-in-out
                    ${isActive ? 'text-amber-600' : 'text-gray-500 hover:text-amber-500'}
                  `}>
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span className={`font-semibold  text-sm md:text-base`}>
                      {item.title.replace(/_/g, " ")}
                    </span>
                  </div>

                  {/* HR line for active tab */}
                  {isActive && (
                    <div
                      className={`absolute bottom-0 h-1 bg-gradient-to-r from-amber-400
                         to-amber-600 transition-all duration-300 ease-out rounded-t-full
                          ${isActive && 'animate-in'}  `}
                      style={{
                        width: `${100}%`,
                        left: '0',
                        transform: 'none',
                      }}
                    />
                  )}

                  {/* HR line separator between tabs - only show between items */}
                  {index < tab.length - 1 && (
                    <div
                      className="absolute top-1/2 right-0 h-8 w-px bg-gray-200 -translate-y-1/2"
                      style={{
                        opacity: isActive || activeTab === index + 1 ? '0.3' : '1'
                      }}
                    />
                  )}
                </Tab>
              );
            })}
          </TabList>
        </div>

        <div className="bg-white">
          {tab?.map((item, index) => {
            const ActiveComponent =
              content?.[item.key] ||
              content?.[item.key];
            return (

              <TabPanel
                key={index}
                className="outline-none"
              >
                {ActiveComponent && <ActiveComponent />}
                {/*  */}

              </TabPanel>
            )
          })}
        </div>
      </Tabs>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Custom Tailwind-like animation if not using Tailwind Animate plugin */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};