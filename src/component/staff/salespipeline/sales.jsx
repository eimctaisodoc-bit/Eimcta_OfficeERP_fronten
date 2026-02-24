import React, { useRef, useState, useEffect } from "react";
import {
    Users,
    Sparkles,
    Plus,
    FileText,
    Handshake,
    CreditCard,
    ClipboardCheck,
    FileSignature,
    UserCheck,
    MapPinned,
    Route,
    ClipboardEdit,
    Settings,
    Eye,
    ListChecks,
    CheckCircle2,

    PlusCircle,


} from "lucide-react";
import LeadForm from "./leadForm";
import HelperSalesPipeline from "./helper";
import { SmallModal } from "./innerHelper/lead";

/* -------------------- ISO STAGES -------------------- */

export const STAGES = [
    { title: "Lead ", name: "Lead", icon: Users, step: 1 },
    { title: " Proposal", name: "Proposal", icon: FileText, step: 2 },
    { title: "Meeting", name: "Meeting", icon: Handshake, step: 3 },
    { title: "50% Retention", name: "50% Retention", icon: CreditCard, step: 4 },
    { title: "CIS & PCCCF", name: "CIS & PCCCF", icon: ClipboardCheck, step: 5 },
    { title: " Contract", name: "Contract", icon: FileSignature, step: 6 },
    { title: "Consultant", name: "Consultant", icon: UserCheck, step: 7 },
    { title: "Deployment", name: "Deployment", icon: MapPinned, step: 8 },
    { title: "Road Map", name: "Road Map", icon: Route, step: 9 },
    { title: "Job Card", name: "Job Card", icon: ClipboardEdit, step: 10 },
    { title: "Service", name: "Service", icon: Settings, step: 11 },
    { title: "Observation", name: "Observation", icon: Eye, step: 12 },
    { title: "Traking", name: "Traking", icon: ListChecks, step: 13 },
    { title: "Closure", name: "Closure", icon: CheckCircle2, step: 14 },
];
/* -------------------- INDIVIDUAL PIPELINE -------------------- */


/* -------------------- MAIN COMPONENT -------------------- */

export const SalesPipeline = () => {

    const [showLeadForm, setShowLeadForm] = useState(false);
    const [isStage, setStage] = useState(false)
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClose = () => {

        setShowLeadForm(false);
        // setActiveIndex((prev) => (prev === index ? null : index));
    }
    const handleClick = (id) => {

        setStage(true)
        console.log(id)
        // alert(id)
    }
    // localStorage.getItem('newLead') && console.log('New Lead Data from Local Storage:', JSON.parse(localStorage.getItem('newLead')));
    return (
        <div
            className="min-h-screen bg-white p-6 md:p-16 antialiased text-slate-900"
            style={{ fontFamily: "'Roboto Slab', serif" }}
        >
            <div className="max-w-7xl mx-auto">

                <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <Sparkles className="text-orange-600" size={20} />
                            </div>
                            <span className="text-xs font-black text-orange-700 uppercase tracking-[0.3em]">
                                ISO Management Portal
                            </span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-wide  leading-none">
                            Sales <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Pipeline</span>
                        </h1>
                        <p className="text-slate-400 mt-3 text-lg font-light">Monitor certification lifecycles and revenue milestones</p>
                    </div>





                </header>

                {/* pipeline selector */}

                {/* symmetrical grid for stages */}
                <div className="flex flex-row gap-14 overflow-x-auto py-4 custom-scrollbar cursor-grab">
                    {STAGES.map((stage) => (
                        <div key={`stage-${stage.step}`} className="flex flex-col min-w-[320px] justify-start items-start">

                            {/* header section */}
                            <div className="flex w-full items-center gap-6 py-3 border-b border-slate-200 last:border-0">
                                <div className="relative">
                                    <div className="flex bg-amber-100/50 rounded-full items-center justify-center w-12 h-12 ring-4 ring-amber-50/50">
                                        <stage.icon className="text-amber-600" size={22} />
                                    </div>
                                </div>

                                <div className="flex-grow flex flex-row gap-6 items-center justify-between">
                                    <h2 className="text-md font-semibold text-slate-700">
                                        {stage.title}
                                    </h2>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 font-semibold text-amber-600">
                                        4
                                    </div>
                                </div>
                            </div>

                            {/* content area that can grow */}
                            <div className="mt-7 flex flex-col w-full items-center justify-center rounded-lg border-2 border-dashed
                    border-slate-200 p-3 text-amber-500 transition-all hover:border-amber-200 h-auto">

                                {stage.name === "Lead" ? (
                                    <>
                                        <div className="flex flex-col gap-4 w-full pb-4">
                                            {
                                                stage.step === 1 && (<SmallModal />)
                                            }
                                            {/* {Array.from({ length: Number(2) || 0 }).map((_, i) => {
                                                // const box = getBoxData(i + 1);
                                                // console.log(i)
                                                return <SmallModal key={i} data={i} />;
                                            })} */}
                                        </div>

                                        <div className="flex w-full flex-row rounded-lg text-center hover:border-amber-300 
                                hover:bg-amber-50/30 transition-all duration-200 align-middle gap-2 cursor-pointer 
                                justify-center border-2 border-dashed border-slate-200 p-4 items-center group"
                                            onClick={() => setShowLeadForm(true)}>
                                            <PlusCircle size={22} className="text-amber-400 group-hover:text-amber-500 transition-colors" />
                                            <span className="font-medium text-slate-600 group-hover:text-amber-600 transition-colors">
                                                Add New Lead
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col gap-4 w-full">
                                            {
                                                stage.step === 2 && (<>
                                                    {
                                                        Array.from({ length: 3 }).map((_, idx) => {
                                                            // if(idx===0) return
                                                            return (
                                                                // <div>this is {idx}{_}</div>
                                                                <SmallModal key={`${idx} lead`} data={idx} onClick={() => handleClick(idx)} />

                                                            )
                                                        })
                                                    }

                                                </>)
                                            }
                                            {
                                                stage.step === 5 && (<>
                                                    {
                                                        Array.from({ length: 2 }).map((_, idx) => {
                                                            // if(idx===0) return
                                                            return (
                                                                // <div>this is {idx}{_}</div>
                                                                <SmallModal key={`${idx} lead`} data={idx} onClick={() => handleClick(idx)} />

                                                            )
                                                        })
                                                    }

                                                </>)
                                            }
                                            {
                                                stage.step === 6 && (<>
                                                    {
                                                        Array.from({ length: 1 }).map((_, idx) => {
                                                            // if(idx===0) return
                                                            return (
                                                                // <div>this is {idx}{_}</div>
                                                                <SmallModal key={`${idx} lead`} data={idx} onClick={() => handleClick(idx)} />

                                                            )
                                                        })
                                                    }

                                                </>)
                                            }
                                           


                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>


            </div>
            {
                showLeadForm && <LeadForm onClose={handleClose} />
            }
            <HelperSalesPipeline isStage={isStage} setStage={setStage} />
        </div>
    );
};








