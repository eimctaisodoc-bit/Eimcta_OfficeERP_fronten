import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { STAGES } from "./sales";
import LeadHelper from "./innerHelper/lead";

/* ---------------- Background Style ---------------- */

const gridBgStyle = {
    backgroundImage: `
    linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
    linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
  `,
    backgroundSize: "40px 40px",
    WebkitMaskImage:
        "radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)",
    maskImage:
        "radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)",
};

/* ---------------- Button Component ---------------- */
// `handlers` object can carry callbacks or current values from parent
const PassStageData = (stage, handlers = {}) => {
    const step = typeof stage === "number" ? stage : stage?.step;
    switch (step) {
        case 1:
            // render the lead helper component and pass along any handlers
            return <LeadHelper {...handlers} />;
        case 2:
            return <LeadHelper {...handlers} />;

        default:
            return {
                title: "",
                description: "",
            };
    }
};

const Button = memo(({ children, isActive, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-2 p-3  sales_btn transition-all
      ${isActive ? "ring-2 ring-amber-400  amber_glow" : "completed"}
      ${disabled ? "cursor-not-allowed opacity-50 pointer-events-none" : "cursor-pointer"}`}
        >
            {children}
        </button>
    );
});

/* ---------------- Main Component ---------------- */

const HelperSalesPipeline = ({ isStage ,setStage}) => {
    const [activeTab, setActiveTab] = useState("Overview");
    const [activePill, setActivePill] = useState(0);


    const [leadState, setLeadState] = useState({ isActive: false, step: null, name: '' });

    const handleLeadUpdate = useCallback((newData) => {

        setLeadState(prev => {
            return { ...prev, ...newData };
        });
    }, []);

    // maintain computed stage element in state so that it only changes when deps change
    const [stageContent, setStageContent] = useState(null);

    const CurrentStage = STAGES[activePill];

    useEffect(() => {
        const data = PassStageData(CurrentStage, {
            onUpdate: handleLeadUpdate,
            data: leadState,
        });
        setStageContent(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CurrentStage, handleLeadUpdate]);

    // memoize button list to prevent re-renders when leadState changes
    const buttons = useMemo(() => {
        return STAGES.map((pill, index) => {
            const Icon = pill.icon;

            const isMatched =
                leadState.step === pill.step &&
                leadState.name === pill.name &&
                leadState.isActive;

            const isActive = activePill === index && isMatched;
            const isDisabled = !isMatched; // disable if criteria don't match

            return (
                <Button
                    key={index}
                    isActive={isActive}
                    disabled={false}
                    onClick={() => setActivePill(index)}
                >
                    <Icon size={18} />
                    <span className="text-xs md:text-sm font-medium truncate">
                        {pill.title}
                    </span>
                </Button>
            );
        });
    }, [activePill, leadState]);

    console.log(isStage)
    if (!isStage) return;
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50
        flex items-center justify-center p-3"
            >
                <div className="bg-white relative overflow-hidden rounded-2xl 
        w-full md:w-[80vw] lg:w-[60vw] h-[95vh] shadow flex flex-col">

                    {/* 🔹 Diagonal Cross Grid Background (Only inside modal) */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={gridBgStyle}
                    />

                    {/* Header */}
                    <div className="sticky top-0 z-10 w-full 
    bg-gradient-to-r from-amber-500 to-orange-500 
    text-white p-4 text-lg font-medium 
    flex items-center justify-between">

                        {/* Title */}
                        <div>
                            Title
                        </div>

                        {/* Close Button */}
                        <button
                            className="px-4 py-1.5 bg-white/20 hover:bg-white/30 
        rounded-md transition duration-200 backdrop-blur-sm" onClick={() => setStage(false)}>
                            Close
                        </button>
                    </div>


                    <div className="relative z-10 flex-1 overflow-auto p-4">
                        <div className="flex flex-col lg:flex-row h-full">

                            {/* LEFT SECTION */}
                            <div className="w-full lg:w-[70%] border-b lg:border-b-0 
              lg:border-r border-slate-200 flex flex-col">

                                {/* Small Navbar */}
                                <div className="flex gap-8 px-8 pt-2 border-b 
                border-slate-200 bg-white overflow-x-auto">

                                    {["Overview", "Task", "Activities", "Forms"].map((tab) => {
                                        const isActive = activeTab === tab;
                                        return (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`relative pb-4 text-sm font-semibold 
                        transition-all cursor-pointer whitespace-nowrap
                        ${isActive
                                                        ? "text-amber-600"
                                                        : "text-slate-500 hover:text-slate-800"}`}
                                            >
                                                {tab}

                                                {isActive && (
                                                    <div className="absolute bottom-0 left-0 right-0 
                          h-0.5 bg-amber-500 rounded-full" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Content */}
                                <div className=" flex-1 overflow-auto">
                                    {activeTab === "Overview" && (() => {
                                        const stageData = stageContent;

                                        if (React.isValidElement(stageData)) {
                                            return <div>{stageData}</div>;
                                        }

                                        // otherwise assume it's an object with title/description
                                        return (
                                            <div>
                                                {JSON.stringify(CurrentStage)}
                                                <h4 className="font-semibold mt-2">{stageData?.title}</h4>
                                                <p className="text-sm text-slate-600">{stageData?.description}</p>
                                            </div>
                                        );
                                    })()}
                                    {activeTab === "Task" && <div>Task Content</div>}
                                    {activeTab === "Activities" && <div>Activities Content</div>}
                                    {activeTab === "Forms" && <div>Forms Content</div>}
                                </div>
                            </div>

                            {/* RIGHT SECTION */}
                            <div className="w-full lg:w-[30%] p-6 flex flex-col 
              gap-4 bg-slate-50 lg:bg-transparent overflow-y-auto">

                                {/* Status Message */}

                                <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
                                    {buttons}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default HelperSalesPipeline;

