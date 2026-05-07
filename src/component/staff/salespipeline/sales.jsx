import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
    Video,
    Search,
    Wallet,
    Users,
    Sparkles,
    FileText,
    Handshake,
    CreditCard,
    ClipboardCheck,
    FileSignature,
    UserCheck,
    Route,
    ClipboardEdit,
    Settings,
    Eye,
    ListChecks,
    CheckCircle2,
    PlusCircle,
    CalendarCheck
} from "lucide-react";
import Select from "react-select";
import LeadForm from "./leadForm";
import HelperSalesPipeline from "./helper";
// import { SmallModal } from "./innerHelper/Stage1/overview";
import { useSalesData } from "../../hooks/useSales";
import { ComponentLoader } from "../../loader";
import { Dropstyle } from "../../../data/data";
import { ErrorPage } from "../../../error";
import { SmallModal } from "./modal";

// Constants: Move outside component to prevent recreation
export const STAGES = [
    // 1. Lead & Meeting
    { title: "Lead", name: "Lead Info.", icon: Users, step: 1 },
    { title: "Virtual Meeting (MD)", name: "V.Meeting", icon: Users, step: 2 },
    { title: "Physical Meeting (MD)", name: "P.Meeting", icon: CalendarCheck, step: 3 },

    // 2. Proposal & Contract
    { title: "Send Proposal (Email/WhatsApp/Call)", name: "Proposal", icon: FileText, step: 4 },
    { title: "Send Contract & Follow-up", name: "Contract", icon: FileSignature, step: 5 },

    // 3. Payment Initiation
    { title: "Initial Payment & Cheque Documentation", name: "Payment", icon: CreditCard, step: 6 },

    // 4. Client Onboarding
    { title: "Scheduling", name: "Scheduling", icon: UserCheck, step: 7 },

    // 5. Analysis Phase
    { title: "Gap Analysis & SWOT Analysis", name: "Analysis", icon: Search, step: 8 },

    // 6. Planning
    { title: "Service Roadmap Finalization", name: "Planning", icon: Route, step: 9 },

    // 7. Execution
    { title: "Job Card Creation & Service Execution", name: "Execution", icon: Settings, step: 10 },

    // 8. Monitoring & Control
    { title: "Observation & MOM Recording", name: "Monitoring", icon: Eye, step: 11 },

    // 9. Tracking
    { title: "Tracking (MOM, Job Card, Follow-up)", name: "Tracking", icon: ListChecks, step: 12 },

    // 10. Accounts
    { title: "Billing & Payment Management", name: "Accounts", icon: Wallet, step: 13 },

    // 11. Closure
    { title: "Project Closure & Testimonial", name: "Closure", icon: CheckCircle2, step: 14 },
];

export const SalesPipeline = () => {
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [isStage, setStage] = useState(false);
    const [selectedId, setSelectedId] = useState({
        activeStage: "",
        stageId: "",
        stageNumber: "",
        mainID: ""
    });
    const [filterValue, setFilterValue] = useState(null);

    const { data: salesData, isLoading, error } = useSalesData();
    const { data = [] } = salesData || {};

    // Flatten organization + lead details
    const organizations = useMemo(() => {
        return data.map(item => ({
            ...(item.organizationDetails?.[0] || {}),
            ...(item.leadDetails?.[0] || {}),
            _id: item._id,
            salesId: item._id,
        }));
    }, [data]);

    // Group stages data properly
    const stagesData = useMemo(() => {
        const grouped = {};

        data.forEach(item => {
            item?.details?.forEach(detail => {
                Object.entries(detail?.stages || {}).forEach(([stageKey, stageItems]) => {
                    if (!grouped[stageKey]) grouped[stageKey] = [];
                    grouped[stageKey].push(...stageItems);
                });
            });
        });

        return grouped;
    }, [data]);

    // Company filter options
    const companyOptions = useMemo(() => [
        { label: "All Companies", value: "All" },
        ...organizations.map(org => ({
            label: org.organizationName || "Unnamed Company",
            value: org.organizationName,
        }))
    ], [organizations]);

    // Filtered organizations - moved logic here
    const filteredOrganizations = useMemo(() => {
        if (!filterValue || filterValue.value === "All") {
            return organizations;
        }
        return organizations.filter(org => org.organizationName === filterValue.value);
    }, [organizations, filterValue]);

    // Use useCallback for event handlers to prevent recreation
    const handleFilterChange = useCallback((selectedOption) => {
        setFilterValue(selectedOption);
    }, []);

    const handleCardClick = useCallback((activeStage, stageId, stageNumber, mainID) => {
        setSelectedId({
            activeStage,
            stageId,
            stageNumber,
            mainID
        });
        setStage(true);
    }, []);

    const handleCloseLeadForm = useCallback(() => {
        setShowLeadForm(false);
    }, []);

    const handleOpenLeadForm = useCallback(() => {
        setShowLeadForm(true);
    }, []);

    if (error?.code === "ERR_NETWORK") {
        return <ErrorPage />;
    }

    return (
        <div
            className="min-h-screen bg-white md:p-3 p-3 antialiased text-slate-900"
            style={{ fontFamily: "'Roboto Slab', serif" }}
        >
            <div className="max-w-[1700px] mx-auto">
                {/* HEADER */}
                <header className="mb-8 sm:mb-10 lg:mb-14 flex flex-col
                 lg:flex-row lg:justify-between lg:items-center sticky top-0
                  bg-white z-10 py-4 sm:py-6 lg:py-9 gap-5 lg:gap-6 ">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="p-2 bg-amber-100 rounded-lg shrink-0">
                                <Sparkles className="text-orange-600" size={16} />
                            </div>
                            <span className="text-[9px] sm:text-[10px] md:text-[11px] font-black text-orange-700 uppercase tracking-[0.18em] sm:tracking-[0.25em] lg:tracking-[0.3em]">
                                ISO Management Portal
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none">
                            Sales <span className="text-orange-600">Pipeline</span>
                        </h1>

                        <div className="h-1 w-16 sm:w-20 lg:w-24 bg-gradient-to-r from-amber-400 to-orange-500 mt-3 sm:mt-4 rounded-full" />
                    </div>

                    <div className="w-full lg:w-72">
                        <Select
                            options={companyOptions}
                            styles={Dropstyle('48px', '14px')}
                            onChange={handleFilterChange}
                            value={filterValue}
                            placeholder="Filter by Company"
                            className="w-full"
                            isClearable
                        />
                    </div>
                </header>

                {/* PIPELINE */}
                <div className="flex gap-8 overflow-x-auto pb-10 custom-scrollbar scroll-smooth">
                    {STAGES.map((stage) => (
                        <StageColumn
                            key={`stage-${stage.step}`}
                            stage={stage}
                            organizations={filteredOrganizations}
                            isLoading={isLoading}
                            onCardClick={handleCardClick}
                            onOpenLeadForm={handleOpenLeadForm}
                        />
                    ))}
                </div>
            </div>

            {showLeadForm && <LeadForm onClose={handleCloseLeadForm} />}

            <HelperSalesPipeline
                isStage={isStage}
                setStage={setStage}
                _id={selectedId}
                ID_CurrentStage={stagesData}
            />

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #fed7aa;
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #fb923c;
                }
            `}</style>
        </div>
    );
};

// Extract stage column to separate component for better performance and readability
const StageColumn = React.memo(({
    stage,
    organizations,
    isLoading,
    onCardClick,
    onOpenLeadForm
}) => {
    return (
        <div className="flex flex-col min-w-[320px] w-[320px]">
            {/* Stage Header */}
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-3">
                    <stage.icon className="text-amber-500" size={20} />
                    <h2 className="text-sm font-bold tracking-wide text-slate-700 uppercase">
                        {stage.name}
                    </h2>
                </div>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    {String(stage.step).padStart(2, '0')}
                </span>
            </div>

            {/* Stage Column */}
            <div className="flex flex-col gap-4 p-4 rounded-xl border-2 border-amber-500 border-dotted min-h-[60vh] transition-colors hover:bg-amber-50/30">

                {/* New Lead Button - Only in first stage */}
                {stage.step === 1 && (
                    <button
                        onClick={onOpenLeadForm}
                        className="w-full py-6 border-2 border-dashed border-amber-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-amber-600 bg-white hover:border-orange-400 hover:text-orange-700 transition-all duration-300 shadow-sm hover:shadow-md"
                        aria-label="Add new lead entry"
                    >
                        <PlusCircle size={24} />
                        <span className="text-xs font-black uppercase tracking-widest">New Entry</span>
                    </button>
                )}

                {/* Cards */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-[200px]">
                            <ComponentLoader />
                        </div>
                    ) : (
                        organizations.map((org, idx) => (
                            <OrganizationCard
                                key={`${stage.step}-${org._id || idx}`}
                                org={org}
                                idx={idx}
                                stage={stage}
                                onCardClick={onCardClick}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
});

StageColumn.displayName = 'StageColumn';

const OrganizationCard = React.memo(({
    org,
    idx,
    stage,
    onCardClick
}) => {
    const handleClick = useCallback(() => {
        if (stage.step === 1) {
            onCardClick(1, org._id, 1, org._id);
        } else {
            onCardClick(stage.step, 2, stage.step, org._id);
        }
    }, [stage, org._id, onCardClick]);

    return (
        <div
            className="bg-white rounded-2xl cursor-pointer border border-slate-200 hover:border-orange-300 transition-all transform hover:-translate-y-1"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                }
            }}
        >
            <SmallModal data={idx} org={org} />
        </div>
    );
});

OrganizationCard.displayName = 'OrganizationCard';