import React, { useState, useMemo, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { STAGES } from "./sales";
import Overview from "./innerHelper/Stage1/overview";
import { useSalesData } from "../../hooks/useSales";
import { Task } from "./innerHelper/Stage1/task";
import { Forms } from "./innerHelper/Stage1/forms";
import { Activities } from "./innerHelper/Stage1/activities";
import { MeetingTask } from "./innerHelper/Stage2/task";
import { STAGE2_Activities } from "./innerHelper/Stage2/activities";

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
const OverViewData = ({ stage, leadInfo, organization, handlers }) => {
    const step = typeof stage === "number" ? stage : stage?.step;
    console.log('steps over', stage)
    switch (step) {
        case 1:
            return <Overview leadInfo={leadInfo} organization={organization} {...handlers} />;
        case 2:
            return <Overview leadInfo={leadInfo} organization={organization} {...handlers} />;
        // case 3:
        //     return <Overview leadInfo={leadInfo} organization={organization} {...handlers} />;
        default:
            return (
                <div className="p-4">
                    <h4 className="font-semibold">{stage?.title || "No Title"}</h4>
                    <p className="text-sm text-slate-600">{stage?.description || "No description available"}</p>
                </div>
            );
    }
};
const TaskData = ({ stage, handlers }) => {
    const step = typeof stage === "number" ? stage : stage?.step;

    switch (step) {
        case 1:
            return <Task {...handlers} />;
        case 2:
            return <MeetingTask />;
        // case 3:
        //     return <Overview leadInfo={leadInfo} organization={organization} {...handlers} />;
        default:
            return (
                <div className="p-4">
                    <h4 className="font-semibold">{stage?.title || "No Title"}</h4>
                    <p className="text-sm text-slate-600">{stage?.description || "No description available"}</p>
                </div>
            );
    }
};
const FormsData = ({ stage, leadInfo, organization, handlers }) => {
    const step = typeof stage === "number" ? stage : stage?.step;

    switch (step) {
        case 1:
            return <Forms />;
        // case 2:
        //     return <Overview leadInfo={leadInfo} organization={organization} {...handlers} />;
        // case 3:
        //     return <Overview leadInfo={leadInfo} organization={organization} {...handlers} />;
        default:
            return (
                <div className="p-4">
                    <h4 className="font-semibold">{stage?.title || "No Title"}</h4>
                    <p className="text-sm text-slate-600">{stage?.description || "No description available"}</p>
                </div>
            );
    }
};
const ActivitiesData = ({ stage, leadInfo, organization, handlers }) => {
    const step = typeof stage === "number" ? stage : stage?.step;
    console.log('step:::', step)
    switch (step) {
        case 1:
            return <Activities />;
        case 2:
            return <STAGE2_Activities />;
        // case 3:
        //     return <Overview leadInfo={leadInfo} organization={organization} {...handlers} />;
        default:
            return (
                <div className="p-4">
                    <h4 className="font-semibold">{stage?.title || "No Title"}</h4>
                    <p className="text-sm text-slate-600">{stage?.description || "No description available"}</p>
                </div>
            );
    }
};

const Button = memo(({ children, isActive, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled} // native HTML disabled
            className={`
                flex items-center gap-2 p-3 sales_btn transition-all
                ${isActive ? "ring-2 ring-amber-400 amber_glow" : "completed"}
                ${disabled
                    ? "cursor-not-allowed pointer-events-none opacity-50"
                    : "cursor-pointer hover:scale-105"}
            `}
        >
            {children}
        </button>
    );
});

/* ---------------- Main Component ---------------- */
const HelperSalesPipeline = ({ isStage, setStage, _id, ID_CurrentStage }) => {
    const { data: salesData } = useSalesData();
    const [step_id, set_set_id] = useState()
    // console.log("_id", _id.s)
    const data = salesData?.data;

    // console.log('from stages', ID_CurrentStage)
    let store = {}
    Object.entries(ID_CurrentStage).forEach(([key, value]) => {
        // console.log('key value', key, value[0]?.currentStage, _id)
        if (value.length > 0) {
            const stagesCurrent = value.map(v => v);
            store[key] = stagesCurrent;
        }

    });
    //    console.log(store[`Stage${_id.s}`])
    useEffect(() => {
        set_set_id(store[`Stage${_id.s}`])

    }, [_id])
    // console.log('Stage id ',step_id?.[0].currentStage)

    // Optimized Data Lookup
    const { leadInfo, organization } = useMemo(() => {
        // console.log(data)
        const item = data?.find(item => item._id === _id?.SalesID);
        const detail = item?.details?.[0]; // Assuming you want the first detail object
        // console.log('details',item)
        return {
            leadInfo: detail?.leadInfo || null,
            organization: detail?.organization || null
        };
    }, [data, _id?.SalesID]);

    const [activeTab, setActiveTab] = useState("Overview");
    const [activePill, setActivePill] = useState(0);
    const [leadState, setLeadState] = useState({ isActive: false, step: null, name: '' });

    const handleLeadUpdate = (newData) => {
        // console.log('new daata :}', newData)

        setLeadState(prev => ({ ...prev, ...newData }));
    };
    // console.log(leadState)

    const CurrentStage = STAGES[(step_id?.[0].currentStage) - 1];
    // console.log(STAGES[(step_id?.[0].currentStage) - 1])
    // console.log('actual id ', CurrentStage)
// const 


    const buttons = (id) => STAGES.map((pill) => {
        const Icon = pill.icon;
        const isActive = pill.step === step_id?.[0]?.currentStage;

        return (
            <Button
                key={pill.step}
                id={`stage-btn-${pill.step}`}
                isActive={isActive}
                disabled={!isActive}
                onClick={() => setActivePill(pill.step)}
            >
                <Icon size={18} />
                <span className="text-xs md:text-sm font-medium truncate">{pill.title}</span>
            </Button>
        );
    });

    if (!isStage) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3"
            >
                <div className="bg-white relative overflow-hidden rounded-2xl w-full md:w-[80vw] lg:w-[60vw] h-[95vh] shadow flex flex-col">
                    <div className="absolute inset-0 pointer-events-none" style={gridBgStyle} />

                    <div className="sticky top-0 z-10 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 text-lg font-medium flex items-center justify-between">
                        <div>Title</div>
                        <button className="px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-md transition duration-200 backdrop-blur-sm" onClick={() => setStage(false)}>Close</button>
                    </div>

                    <div className="relative z-10 flex-1 overflow-auto custom-scrollbar p-4">
                        <div className="flex flex-col lg:flex-row h-full">
                            <div className="w-full lg:w-[70%] border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
                                <div className="flex gap-8 px-8 pt-2 border-b border-slate-200 bg-white overflow-x-auto">
                                    {["Overview", "Task", "Activities", "Forms"].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`relative pb-4 text-sm font-semibold transition-all cursor-pointer ${activeTab === tab ? "text-amber-600" : "text-slate-500 hover:text-slate-800"}`}
                                        >
                                            {tab}
                                            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex-1 overflow-auto custom-scrollbar">
                                    {activeTab === "Overview" && (
                                        <OverViewData
                                            stage={CurrentStage}
                                            leadInfo={leadInfo}
                                            organization={organization}
                                            handlers={{ onUpdate: handleLeadUpdate, data: leadState }}
                                        />
                                    )}
                                    {activeTab === "Task" && (
                                        // <>
                                        //     {JSON.stringify(CurrentStage)}
                                        // </>
                                        <TaskData stage={CurrentStage} handlers={{ onUpdate: handleLeadUpdate, data: leadState }} />
                                    )}
                                    {activeTab === "Activities" && (
                                        <ActivitiesData stage={CurrentStage} />
                                    )}
                                    {activeTab === "Forms" && (
                                        <FormsData stage={CurrentStage} />
                                    )}

                                    {/* {activeTab !== "Overview" && <div>{activeTab} Content</div>} */}
                                </div>
                            </div>

                            <div className="w-full lg:w-[30%] p-6 flex flex-col gap-4 bg-slate-50 lg:bg-transparent overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">{buttons(step_id?.[0].currentStage)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default HelperSalesPipeline;