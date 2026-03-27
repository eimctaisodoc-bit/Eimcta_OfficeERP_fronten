import React, { useEffect, useState } from "react";
import {
    Users, Sparkles, FileText, Handshake, CreditCard,
    ClipboardCheck, FileSignature, UserCheck, Route,
    ClipboardEdit, Settings, Eye, ListChecks, CheckCircle2,
    PlusCircle
} from "lucide-react";
import LeadForm from "./leadForm";
import HelperSalesPipeline from "./helper";
import { SmallModal } from "./innerHelper/Stage1/overview";
import { useSalesData } from "../../hooks/useSales";
import { ComponentLoader } from "../../loader";

export const STAGES = [
    { title: "Lead Generation", name: "Lead", icon: Users, step: 1 },
    { title: "Proposal/Meeting", name: "Proposal/Meeting", icon: FileText, step: 2 },
    { title: "50% Retention", name: "50% Retention", icon: CreditCard, step: 3 },
    { title: "CIS & PCCCF", name: "CIS & PCCCF", icon: ClipboardCheck, step: 4 },
    { title: "Contract", name: "Contract", icon: FileSignature, step: 5 },
    { title: "Consultant", name: "Consultant", icon: UserCheck, step: 6 },
    { title: "Road Map", name: "Road Map", icon: Route, step: 7 },
    { title: "Job Card", name: "Job Card", icon: ClipboardEdit, step: 8 },
    { title: "Service", name: "Service", icon: Settings, step: 9 },
    { title: "Observation", name: "Observation", icon: Eye, step: 10 },
    { title: "Tracking", name: "Traking", icon: ListChecks, step: 11 },
    { title: "Closure", name: "Closure", icon: CheckCircle2, step: 12 },
];

export const SalesPipeline = () => {
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [isStage, setStage] = useState(false);
    const [tempID, settempID] = useState("")
    const [_id, Set_id] = useState({ stageID: '', SalesID: '' })
    const handleClose = () => setShowLeadForm(false);

    const handleClick = (id, stageId, s, salesId) => {

        Set_id({ stageID: stageId, SalesID: salesId, s: s })
        settempID(stageId)
        alert(`Clicked on card with id: ${id} and stageId: ${stageId}`);
        setStage(true)

    };
    // console.log('Stage status', Stage_id);
    const { data: salesData, isLoading, error } = useSalesData();

    const { data } = salesData || {};
    const organizations = data?.flatMap(item =>
        item?.details?.flatMap(detail => detail?.organization || [])
    ) || [];

    const sales_id = data?.map((sale) => {
        return sale._id
    })
    // console.log('Sales id ', sales_id)
    const stages = {};

    data?.forEach(item => {
        item?.details?.forEach(detail => {
            Object.entries(detail?.stages || {}).forEach(([key, value]) => {
                if (!stages[key]) stages[key] = [];
                stages[key].push(...value);
            });
        });
    });

    // console.log('flat', stages.Stage1, stages.Stage2, stages.Stage3);

    const stageIds = Object.fromEntries(
        Object.entries(stages).map(([key, value]) => [
            key,
            value.map(stage => stage._id)
        ])
    );
 
    const ID_CurrentStage = Object.fromEntries(
        Object.entries(stages).map(([key, value]) => [
            key,
            value.filter(stage => stage._id === tempID) // keep only with _id
                .map(stage => ({ id: stage._id, currentStage: stage.currentStage }))
        ])
    );
    return (
        <div
            className="min-h-screen bg-white p-6 md:p-12 antialiased text-slate-900"
            style={{ fontFamily: "'Roboto Slab', serif" }}
        >
            <div className="max-w-[1700px] mx-auto">
                {/* --- HEADER --- */}
                <header className="mb-14">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <Sparkles className="text-orange-600" size={18} />
                        </div>
                        <span className="text-[11px] font-black text-orange-700 uppercase tracking-[0.3em]">
                            ISO Management Portal
                        </span>
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tight leading-none">
                        Sales <span className="text-orange-600">Pipeline</span>
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-orange-500 mt-4 rounded-full"></div>
                </header>

                {/* --- PIPELINE SCROLL AREA --- */}
                <div className="flex gap-8 overflow-x-auto pb-10 custom-scrollbar scroll-smooth">
                    {STAGES.map((stage) => (
                        <div
                            key={`stage-${stage.step}`}
                            className="flex flex-col min-w-[320px] w-[320px]"
                        >
                            {/* Stage Heading */}
                            <div className="flex items-center justify-between mb-6 px-1">
                                <div className="flex items-center gap-3">
                                    <stage.icon className="text-amber-500" size={20} />
                                    <h2 className="text-sm font-bold text-slate-700 uppercase tracking-tighter">
                                        {stage.title}
                                    </h2>
                                </div>
                                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                                    04
                                </span>
                            </div>

                            {/* Column Body */}
                            <div className="flex flex-col gap-4 p-4 rounded-xl
                              border-2 border-amber-500 border-dotted min-h-[60vh]
                              transition-colors hover:bg-amber-50/30">

                                {stage.name === "Lead" && (
                                    <button
                                        onClick={() => setShowLeadForm(true)}
                                        className="w-full py-6 border-2 border-dashed border-amber-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-amber-600 bg-white hover:border-orange-400 hover:text-orange-700 transition-all duration-300 shadow-sm hover:shadow-md"
                                    >
                                        <PlusCircle size={24} />
                                        <span className="text-xs font-black uppercase tracking-widest">New Entry</span>
                                    </button>
                                )}

                                {/* Card Containers */}
                                <div className="space-y-4">
                                    {/* Logic to render based on stage step */}
                                    {/* {stage.step === 1 && <SmallModal />} */}

                                    {stage.step === 1 && (
                                        isLoading ? (
                                            <div className="flex items-center justify-center h-[200px]">
                                                <ComponentLoader />
                                            </div>
                                        ) : (
                                            organizations?.map((org, idx) => (
                                                <div
                                                    key={`${stage.step}-${idx}`}
                                                    className="bg-white rounded-2xl 
                                                    cursor-pointer border
        border-slate-200  
        hover:border-orange-300 transition-all transform
        hover:-translate-y-1"
                                                    onClick={() => handleClick(idx, stageIds.Stage1[idx],1, sales_id[idx])}
                                                >
                                                    <SmallModal data={idx} org={org} />
                                                </div>
                                            ))
                                        )
                                    )}
                                    {stage.step === 2 && (
                                        isLoading ? (
                                            <div className="flex items-center justify-center h-[200px]">
                                                <ComponentLoader />
                                            </div>
                                        ) : (
                                            organizations?.map((org, idx) => (
                                                <div
                                                    key={`${stage.step}-${idx}`}
                                                    className="bg-white rounded-2xl 
                                                    cursor-pointer border
        border-slate-200  
        hover:border-orange-300 transition-all transform
        hover:-translate-y-1"

                                                    onClick={() => handleClick(idx, stageIds.Stage2[idx], 2, sales_id[idx])}
                                                >
                                                    <SmallModal data={idx} org={org} />
                                                </div>
                                            ))
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showLeadForm && <LeadForm onClose={handleClose} />}
            <HelperSalesPipeline isStage={isStage} setStage={setStage} _id={_id} ID_CurrentStage={ID_CurrentStage} />

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #fed7aa; /* amber-200 */
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #fb923c; /* orange-400 */
                }
            `}</style>
        </div>
    );
};