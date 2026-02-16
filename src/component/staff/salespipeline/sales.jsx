import React, { useRef, useState } from "react";
import {
    Users, FileText, CalendarCheck, CreditCard, ClipboardList,
    FileSignature, Rocket, Map, Briefcase, Wrench,
    Eye, Activity, CheckCircle, ChevronLeftCircle, ChevronRightCircle,
    PlusCircle
} from "lucide-react";

export const Pipelines = [
    { title: "Lead Gen", icon: Users, step: 1, },
    { title: "Proposal", icon: FileText, step: 2, },
    { title: "Meeting", icon: CalendarCheck, step: 3, },
    { title: "50% Advance", icon: CreditCard, step: 4, },
    { title: "CIS & PCCCF", icon: ClipboardList, step: 5, },
    { title: "Contract", icon: FileSignature, step: 6, },
    { title: "Deployment", icon: Rocket, step: 7, },
    { title: "Roadmap", icon: Map, step: 8, },
    { title: "Job Card", icon: Briefcase, step: 9, },
    { title: "Service", icon: Wrench, step: 10, },
    { title: "Observation", icon: Eye, step: 11, },
    { title: "Tracking", icon: Activity, step: 12, },
    { title: "Closure", icon: CheckCircle, step: 13, },
];

export const SalesPipeline = () => {
    const scrollRef = useRef(null);
    // Track current step to demonstrate functionality

    const [currentStep, setCurrentStep] = useState(1);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - 200
                : scrollLeft + 200;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const getStatusStyles = (step) => {
        if (step < currentStep) return "border-green-500 bg-green-50 text-green-600";
        if (step === currentStep) return "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200";
        return "border-slate-200 bg-white text-slate-400";
    };

    return (
        <div className="w-full gap-3 flex justify-end flex-col max-w-7xl  px-4 py-8 shadow bg-white rounded-2xl border-slate-100">
            <div className="w-full  bg-transparent flex justify-end p-3">
                <div className="flex items-center text-white p-3 w-fit rounded-2xl cursor-pointer gap-2 bg-amber-500">
                    Add Pipeline
                    <button type="button">
                        <PlusCircle size={25} />
                    </button>
                </div>
            </div>

            <div className="relative flex items-center  ">

                {/* Left Navigation */}
                <button
                    onClick={() => scroll('left')}
                    className="p-2 text-slate-400 hover:text-blue-600 transition-colors z-10 bg-white rounded-full"
                >
                    <ChevronLeftCircle size={28} />
                </button>

                {/* Pipeline Container */}
                <div
                    ref={scrollRef}
                    className="flex flex-1 gap-0 overflow-x-auto no-scrollbar scroll-smooth items-center px-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {Pipelines.map((pipeline, index) => {
                        const Icon = pipeline.icon;
                        const statusClass = getStatusStyles(pipeline.step);
                        const isLast = index === Pipelines.length - 1;

                        return (
                            <div key={pipeline.step} className="flex items-center flex-shrink-0 group">
                                <div
                                    onClick={() => setCurrentStep(pipeline.step)}
                                    className="flex flex-col items-center cursor-pointer transition-all duration-300 transform group-hover:scale-105"
                                >
                                    {/* Icon Circle */}
                                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 transition-colors ${statusClass}`}>
                                        <Icon size={20} />
                                    </div>

                                    {/* Label */}
                                    <span className={`text-xs font-semibold whitespace-nowrap px-2 ${pipeline.step === currentStep ? 'text-blue-600' : 'text-slate-500'}`}>
                                        {pipeline.title}
                                    </span>

                                    {/* Status Indicator */}
                                    <span className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${pipeline.step < currentStep ? 'text-green-500' : pipeline.step === currentStep ? 'text-blue-500' : 'text-slate-300'}`}>
                                        {pipeline.step < currentStep ? 'Done' : pipeline.step === currentStep ? 'Active' : 'Pending'}
                                    </span>
                                </div>

                                {/* Connector Line */}
                                {!isLast && (
                                    <div className={`h-[2px] w-12 mx-2 mb-8 transition-colors ${pipeline.step < currentStep ? 'bg-green-400' : 'bg-slate-100'}`} />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Right Navigation */}
                <button
                    onClick={() => scroll('right')}
                    className="p-2 text-slate-400 hover:text-blue-600 transition-colors z-10 bg-white rounded-full"
                >
                    <ChevronRightCircle size={28} />
                </button>
            </div>

            {/* Legend/Context (Optional) */}
            <div className="mt-4 flex justify-end gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /> Completed</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-600" /> Active</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-200" /> Upcoming</div>
            </div>
            <hr />
        </div>
    );
};
