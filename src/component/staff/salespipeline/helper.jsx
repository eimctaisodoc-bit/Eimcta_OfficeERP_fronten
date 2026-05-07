import React, { useState, useMemo, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { STAGES } from "./sales";
import Overview from "./innerHelper/Stage1/overview";
import { useSalesData } from "../../hooks/useSales";
import { Task } from "./innerHelper/Stage1/task";
import { Forms } from "./innerHelper/Stage1/forms";
import { Activities } from "./innerHelper/Stage1/activities";
// import { MeetingTask } from "./innerHelper/Stage2/task";

import { PMeeting } from "./innerHelper/Stage3/task";
import { VMeeting } from "./innerHelper/Stage2/task";
import { ProposalTask } from "./innerHelper/stage4/task";
import { Contract } from "./innerHelper/stage5/task";
import { ContractForms } from "./innerHelper/stage5/forms";
import { ClientScheduleCalendar } from "./innerHelper/stage7/task";
import { X } from "lucide-react";
import {SchedulingForms} from "./innerHelper/stage7/forms";

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
const OverViewData = ({ stage, leadInfo, organization, handlers, id }) => {
    // console.log('stagefskfkjsdfsdjkfhds', stage?.activeStage)
    const step = typeof stage === "number" ? stage : stage?.step;
    // console.log('id', id)
    // console.log('steps over', stage)
    switch (stage?.activeStage) {
        case 1:
            return <Overview leadInfo={leadInfo} organization={organization} {...handlers} id={id} />;
        case 2:
            return <Overview leadInfo={leadInfo} organization={organization} {...handlers} id={id} />;
        case 3: return <> this is </>
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
const TaskData = ({ stage, handlers, id }) => {
    const step = typeof stage === "number" ? stage : stage?.step;
    // console.log('active stage with second tab',stage)
    // console.log(' Main id + Stage id', id)
    // console.log(1)
    switch (stage?.activeStage) {
        case 1:
            return <Task {...handlers} id={id} />;
        case 2:
            return <VMeeting id={id} />;
        case 3:

            return <PMeeting id={id} />
        case 4:
            return <ProposalTask id={id} />;
        case 5:
            return <Contract id={id} />;
        case 7: return <ClientScheduleCalendar id={id} />
        default:
            return (
                <div className="p-4">
                    <h4 className="font-semibold">{stage?.title || "No Title"}</h4>
                    <p className="text-sm text-slate-600">{stage?.description || "No description available"}</p>
                </div>
            );
    }
};
const FormsData = ({ stage, handlers, id }) => {
    const step = typeof stage === "number" ? stage : stage?.step;

    switch (stage?.activeStage) {
        case 1:
            return <Forms id={id} />;
        case 5: return <ContractForms id={id} />;
        case 7: return <SchedulingForms id={id} />
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
    // console.log('step:::', step)
    switch (step) {
        case 1:
            return <Activities id={id} />;
        case 2:
            return <> this is 2 </>;
        case 3: return <> this is 3 9</>
        case 7: return <ClientScheduleCalendar />
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

    const [activeTab, setActiveTab] = useState("Overview");
    const [leadState, setLeadState] = useState({
        isActive: false,
        step: null,
        name: "",
    });

    // Current Stage Data
    const step_id = useMemo(() => {
        const stageKey = `Stage${_id?.s}`;
        return ID_CurrentStage?.[stageKey] || [];
    }, [_id?.s, ID_CurrentStage]);

    // Find Lead + Organization using mainID
    const { leadInfo, organization } = useMemo(() => {
        const data = salesData?.data;
        const mainID = _id?.mainID;

        if (!data || !mainID) {
            return {
                leadInfo: null,
                organization: null,
            };
        }

        const item = data.find(
            (item) =>
                item._id?.toString().trim() === mainID.toString().trim()
        );

        return {
            leadInfo: item?.leadDetails || null,
            organization: item?.organizationDetails || null,
        };
    }, [salesData?.data, _id?.mainID]);

    const organizationName =
        organization?.[0]?.organizationName || "Organization Name";

    const contactPersonName =
        organization?.[0]?.contactPersonName || "Contact Person";

    const mainID = _id?.mainID || "N/A";

    const handleLeadUpdate = (newData) => {
        setLeadState((prev) => ({
            ...prev,
            ...newData,
        }));
    };

    if (!isStage) return null;

    const renderStageButtons = () => {
        const currentStep = step_id?.[0]?.currentStage;

        return STAGES.map((pill) => {
            const Icon = pill.icon;
            const isActive = pill.step === currentStep;

            return (
                <Button
                    key={pill.step}
                    id={`stage-btn-${pill.step}`}
                    isActive={isActive}
                    disabled={!isActive}
                    onClick={() => console.log("Navigating to step:", pill.step)}
                >
                    <Icon size={18} />
                    <span className="truncate text-xs font-medium md:text-sm">
                        {pill.title}
                    </span>
                </Button>
            );
        });
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm"
            >
                <div className="relative flex h-[95vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow md:w-[80vw] lg:w-[60vw]">
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={gridBgStyle}
                    />

                    {/* Header */}
                    <div className="sticky top-0 z-10 flex w-full items-center justify-between gap-3 bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
                        {/* Left Header Details */}
                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                            <div className="flex flex-col justify-start items-start items-center gap-2">
                                <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/90">
                                    Name / Contact Person
                                </span>

                                <h2 className="mt-0.5 truncate text-sm font-bold text-white md:text-base">
                                    {organizationName}/ {contactPersonName}
                                </h2>
                            </div>


                        </div>

                        {/* Close Button */}
                        <button
                            className="shrink-0 rounded-md bg-white/20 px-4 py-2 backdrop-blur-sm transition duration-200 hover:bg-white/30"
                            onClick={() => setStage(false)}
                        >
                            <X size={14} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="custom-scrollbar relative z-10 flex-1 overflow-auto p-4">
                        <div className="flex h-full flex-col lg:flex-row">
                            {/* Main Content */}
                            <div className="flex w-full flex-col border-b border-slate-200 lg:w-[70%] lg:border-b-0 lg:border-r">
                                {/* Navigation Tabs */}
                                <div className="flex gap-8 overflow-x-auto border-b border-slate-200 bg-white px-8 pt-2">
                                    {["Overview", "Task", "Activities", "Forms"].map(
                                        (tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`relative cursor-pointer pb-4 text-sm font-semibold transition-all ${activeTab === tab
                                                    ? "text-amber-600"
                                                    : "text-slate-500 hover:text-slate-800"
                                                    }`}
                                            >
                                                {tab}

                                                {activeTab === tab && (
                                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-amber-500" />
                                                )}
                                            </button>
                                        )
                                    )}
                                </div>

                                {/* Content Area */}
                                <div className="custom-scrollbar flex-1 overflow-auto">
                                    {activeTab === "Overview" && (
                                        <OverViewData
                                            stage={_id}
                                            leadInfo={leadInfo}
                                            organization={organization}
                                            handlers={{
                                                onUpdate: handleLeadUpdate,
                                                data: leadState,
                                            }}
                                            id={_id}
                                        />
                                    )}

                                    {activeTab === "Task" && (
                                        <TaskData
                                            stage={_id}
                                            handlers={{
                                                onUpdate: handleLeadUpdate,
                                                data: leadState,
                                            }}
                                            id={_id}
                                        />
                                    )}

                                    {activeTab === "Activities" && (
                                        <ActivitiesData stage={_id} id={_id} />
                                    )}

                                    {activeTab === "Forms" && (
                                        <FormsData stage={_id} id={_id} />
                                    )}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="custom-scrollbar flex w-full flex-col gap-4 overflow-y-auto bg-slate-50 p-6 lg:w-[30%] lg:bg-transparent">
                                <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
                                    {renderStageButtons()}
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