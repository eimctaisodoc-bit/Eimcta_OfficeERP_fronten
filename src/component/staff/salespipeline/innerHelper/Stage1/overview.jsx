import React, { useEffect, useState, useRef, memo } from "react";
import {
    Building2,
    Mail,
    Phone,
    Users,
    ChevronRight,
    Globe,
    StickyNote,
    ExternalLink,
    ShieldCheck,
    BriefcaseBusiness,
    User,
    Calendar,
    Target,
    BadgeDollarSign,
    ScrollText,
    Facebook,
    Linkedin,
    Twitter,
    Clock,
    UserPlus,
    Zap,
    CheckCircle2,
    MapPinned,
    UserCog,
    History,
    TrendingUp,
    Fingerprint,
    CreditCard,
    FileText,
    Activity,
    Flag,
    DollarSign,
    ArrowRightCircle,
    Percent,
    Megaphone,
    CalendarDays,
    BarChart3,
    MapPin,
    PhoneCall,
    MailCheck,
    GraduationCap

} from 'lucide-react';
import { Link } from 'react-router-dom';

const Overview = memo(({ onUpdate, data = {}, leadInfo, organization }) => {
    // console.log('LEad Infor ----', leadInfo?.[0], organization)
    // console.log('LEad Infor ----', leadInfo, organization)
    const leadData = leadInfo?.[0]
    const organizationData = organization?.[0]
    const [isActive, setIsActive] = useState(false);

    const prevDataRef = useRef(null);

    // only update isActive if the incoming data object changed
    useEffect(() => {
        if (prevDataRef.current !== data) {
            prevDataRef.current = data;
            setIsActive(data?.isActive || false);
        }
    }, [data]);

    const handleClick = () => {
        const newIsActive = !isActive;
        setIsActive(newIsActive);


        if (onUpdate) {
            onUpdate({ ...data, isActive: newIsActive, step: 1, name: 'Lead' });
        }
    };
    const data_ = {
        leadId: "LD_0001",
        leadType: { label: "Referral", value: "referral" },
        assignedSalesRep: "Kiran J. (Sales Lead)",
        createdAt: "Feb 15, 2026",
        lastInteraction: "2 hours ago",

        organization: {
            name: "Everest Management Consultancy",
            legalId: "79789798",
            taxId: "7978789",
            size: "789 Employees",
            academicStaff: "6 Senior Educators",
            location: "Bagmati, Sarlahi, Nepal",
            hqPhone: "+977 1-4455667",
            hqEmail: "corporate@everestconsultancy.com.np",
            web: "https://www.everestconsultancy.com.np",
            socials: [
                { platform: 'Facebook', url: '#', icon: Facebook },
                { platform: 'LinkedIn', url: '#', icon: Linkedin },
                { platform: 'Twitter', url: '#', icon: Twitter }
            ]
        },

        liaison: {
            name: "Eimcta Eimcta",
            title: "Quality Assurance Director",
            email: "eimcta.isodoc@gmail.com",
            mobile: "+977 89767654553",
            pref: "WhatsApp / Email"
        },

        requirement: {
            standard: "ISO 21001:2018 (EOMS)",
            category: "Educational Organization",
            isNewCert: true,
            needsConsultancy: true,
            needsTraining: true,
            duration: "6-8 Months"
        },

        commercials: {
            status: "Discovery Phase",
            priority: "High",
            valuation: 150000,
            nextStep: "Feb 25, 2026",
            probability: "85%",
            campaign: "Facebook Q1 Lead Gen"
        },

        context: {
            source: "Referral / Social Media",
            internalNotes: "Client is seeking ISO 21001 to standardize their educational consulting wing. High urgency for the upcoming academic session audit. Previous interaction suggests they need full lifecycle support from documentation to final audit.",
            tags: ["Education Sector", "Priority-A", "Full Implementation"]
        }
    };
    const fontStyle = { fontFamily: "'Roboto Slab', serif" };
    function convertToNepaliTime(utcDateString) {
        const utcDate = new Date(utcDateString);
        const nepalOffset = 5 * 60 + 45; // +5:45 in minutes
        const nptDate = new Date(utcDate.getTime() + nepalOffset * 60 * 1000);

        const year = nptDate.getFullYear();
        const month = String(nptDate.getMonth() + 1).padStart(2, "0");
        const day = String(nptDate.getDate()).padStart(2, "0");
        const hours = String(nptDate.getHours()).padStart(2, "0");
        const minutes = String(nptDate.getMinutes()).padStart(2, "0");

        return `${year}/${month}/${day} ${hours}:${minutes}`;
    }

    
    return (
        <>

            <div className="min-h-screen flex flex-col items-center justify-start pt-5 font-sans" style={fontStyle}>
                <div className="bg-transparent border-b border-slate-100 flex flex-col justify-between items-start lg:items-center gap-8 w-full max-w-5xl px-6 pb-8">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <div className="h-18 w-18 rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100/50 flex items-center justify-center text-amber-600 border border-amber-200/50 shadow-inner">
                                <Building2 size={32} strokeWidth={1.2} />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-white text-emerald-500 p-2 rounded-xl border border-slate-100 shadow-lg">
                                <ShieldCheck size={18} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                {/* Lead ID */}
                                <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-[10px] font-black text-white uppercase tracking-wider">
                                    {leadData?.leadId}
                                </span>

                                {/* Animated Status Pulse */}
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-100">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest">
                                        {data_.commercials.status}
                                    </span>
                                </div>

                                <span className="flex items-center gap-3 
                                text-xs font-bold text-amber-600 uppercase tracking-widest">
                                    <span className="relative group">
                                        <div className="flex justify-start items-center cursor-pointer" >
                                            <User size={19} />
                                            <span className="ml-1 text-[10px]">{leadData.leadTakenBy|| " "}</span>
                                        </div>
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden w-max rounded bg-gray-800 px-2 py-1 text-white text-[10px] font-normal group-hover:block whitespace-nowrap">
                                            Sales Person
                                        </span>
                                    </span>

                                    <span className="relative group">
                                        <div className="flex justify-start items-center cursor-pointer">
                                            <Users size={19} />
                                            <span className="ml-1 text-[10px]">{leadData.leadOwner}</span>
                                        </div>
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden w-max rounded bg-gray-800 px-2 py-1 text-white text-[10px] font-normal group-hover:block whitespace-nowrap">
                                            Sales Manager
                                        </span>
                                    </span>
                                </span>
                            </div>
                            <h1 className="text-2xl font-black text-slate-900 leading-none">
                                {organizationData.organizationName}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                    <History size={14} />
                                    <span>Date : {convertToNepaliTime(leadData.leadTakenAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side controls */}
                    <div className="flex flex-col items-end gap-3 w-full">
                        <div className="flex gap-2 w-full justify-end items-center">
                            <div className="flex flex-row gap-3 items-center justify-center px-4 py-2 w-fit rounded-xl bg-slate-50 border border-slate-200 text-center">
                                <p className="text-[9px] font-bold text-slate-900 uppercase tracking-wide">Lead Type</p>
                                <p className="text-[11px] font-bold text-slate-800">{leadData.leadType}</p>
                            </div>
                            <div className="flex flex-row items-center gap-3 justify-center p-2 w-fit rounded-xl
                             bg-amber-500 text-white shadow shadow-amber-200 text-center">
                                <p className="text-[9px] font-bold text-amber-100 uppercase tracking-wide">Standards:</p>
                                {
                                    leadData.isoStandards.map((standard, index) => (
                                        <p key={index} className="text-[11px] font-bold">{standard}</p>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex gap-1.5 items-center align-middle justify-start">
                            {leadData.isoServices?.map((service, id) => (
                               
                                    <span className="text-[9px] relative font-black px-2 py-1 bg-white border border-slate-200 text-slate-800 rounded-md uppercase tracking-widest">
                                        {service}
                                        <span className="absolute -top-1 right-1 h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    </span>
                               
                            ))}

                            {/* Lead Source */}
                           
                                <span className="text-[9px] font-black px-2 py-1 bg-white border border-slate-200 text-slate-800 rounded-md uppercase tracking-widest">
                                 Lead Source:   {leadData.leadSource}
                                </span>
                           

                            {/* Lead Channel */}
                           
                                <span className="text-[9px] font-black px-2 py-1 bg-white border border-slate-200 text-slate-800 rounded-md uppercase tracking-widest">
                                 Lead Channel:   {leadData.leadChannel}
                                </span>
                          
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="lg:col-span-8 w-full max-w-5xl mx-auto space-y-12 pt-6">
                    <section className="space-y-9 w-full px-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 w-full">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                                    <BriefcaseBusiness size={20} />
                                </div>
                                <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Organization Profile</h2>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {data_.organization.socials.map((social, idx) => (
                                    <Link key={idx} to={social.url} className="p-2 bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all border border-slate-100">
                                        <social.icon size={14} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Registration, Tax, Address details */}
                <div className="w-full max-w-5xl bg rounded-2xl p-3 px-6">
                    <div className="space-y-6 text-sm flex flex-row gap-4 justify-between border border-slate-100 rounded-2xl p-6">
                        {/* Registration */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-2 bg-amber-50 rounded-xl text-amber-600"><FileText size={20} /></div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest text-center">Registration</p>
                                <p className="text-base font-semibold text-center text-slate-900 mt-1">{organizationData.registrationNumber}</p>
                            </div>
                        </div>
                        <div className="border-l border-slate-100"></div>
                        {/* Tax ID */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><CreditCard size={20} /></div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest text-center">Tax / PAN ID</p>
                                <p className="text-base text-center font-semibold text-slate-900 mt-1">{organizationData.vatPanNumber}</p>
                            </div>
                        </div>
                        <div className="border-l border-slate-100"></div>
                        {/* Address */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600"><MapPinned size={20} /></div>
                            <div>
                                <p className="text-[10px] text-center uppercase font-bold text-slate-400 tracking-widest">Official Address</p>
                                <p className="text-base text-center font-medium text-slate-900 mt-1 leading-relaxed">{organizationData.organizationAddress}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Solution Architecture */}
                <div className="w-full max-w-5xl mx-auto p-6">


                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">

                        {/* Organization */}
                        <div className="pb-3 border-b border-slate-100">
                            <p className="text-sm font-black text-slate-900 leading-snug">
                                Primary Contact
                            </p>
                            <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest mt-1">
                                {organizationData.organizationName || "N/A"}
                            </p>
                        </div>

                        <div className="space-y-3">

                            {/* Full Name */}
                            <div className="flex items-center gap-3 text-xs font-semibold text-slate-900">
                                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-indigo-50 text-indigo-600 shrink-0">
                                    <UserCog size={12} strokeWidth={3} />
                                </div>
                                <span>{organizationData?.contactPerson?.contactFullName || "N/A"}</span>
                            </div>

                            {/* Role */}
                            <div className="flex items-center gap-3 text-xs font-semibold text-slate-900">
                                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-purple-50 text-purple-600 shrink-0">
                                    <User size={12} strokeWidth={3} />
                                </div>
                                <span>{organizationData?.contactPerson?.contactRole || "N/A"}</span>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-3 text-xs font-semibold text-slate-900">
                                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-green-50 text-green-600 shrink-0">
                                    <PhoneCall size={12} strokeWidth={3} />
                                </div>
                                <span>{organizationData?.contactPerson?.contactNumber || "N/A"}</span>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3 text-xs font-semibold text-slate-900">
                                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 shrink-0">
                                    <MailCheck size={12} strokeWidth={3} />
                                </div>
                                <span>{organizationData?.contactPerson?.contactEmail || "N/A"}</span>
                            </div>

                            {/* Total Employees */}
                            <div className="flex items-center gap-3 text-xs font-semibold text-slate-900">
                                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-orange-50 text-orange-600 shrink-0">
                                    <Users size={12} strokeWidth={3} />
                                </div>
                                <span>{organizationData?.totalEmployees || "N/A"} Employees</span>
                            </div>

                            {/* Educators */}
                            <div className="flex items-center gap-3 text-xs font-semibold text-slate-900">
                                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-pink-50 text-pink-600 shrink-0">
                                    <GraduationCap size={12} strokeWidth={3} />
                                </div>
                                <span>{organizationData?.educators || "N/A"} Educators</span>
                            </div>

                        </div>

                        {/* Implementation Duration */}
                        <div className="pt-2">
                            <div className="px-4 py-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                    Implementation
                                </span>
                                <span className="text-xs font-black text-slate-900">
                                    {data_?.requirement?.duration || "TBD"}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="pt-4 pb-12 w-full max-w-5xl px-6">
                    <button className="w-full py-5 px-5 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-slate-800 transition-colors">
                        Complete
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

        </>
    );
});

// LeadHelper.displayName = 'LeadHelper';
export default Overview;

const test = [
    {
        step: 1,
        dec: "This is step one description"
    },
    {
        step: 2,
        dec: "This is step two description"
    },
    {
        step: 3,
        dec: "This is step three description"
    },
    {
        step: 4,
        dec: "This is step four description"
    }
];

export const SmallModal = ({ data, onClick, isdata = true, stageID, org }) => {
    if (!isdata || !org) return null;

    const progress = 75;

    // Handler for avatar clicks to prevent parent card onClick from firing
    const handleAvatarClick = (e, userId) => {
        e.stopPropagation(); // Prevents the card's onClick from firing
        // console.log(`Avatar ${userId} clicked`);
        // Add your logic here
    };

    return (
        <div
            onClick={onClick}
            className="group relative flex flex-col p-5 bg-white rounded-2xl border border-slate-200 
                       hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 
                       cursor-pointer w-full max-w-md overflow-hidden"
        >
            {/* Header Section */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 
                                    rounded-2xl bg-slate-50 border border-slate-100 
                                    group-hover:scale-110 transition-transform duration-300">
                        <Building2
                            size={22}
                            className="text-slate-600 group-hover:text-blue-600 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-0.5">
                            Project Entity
                        </span>
                        <h4 className="text-[14px] font-extrabold text-slate-900 leading-tight">
                            {org.organizationName || "General Org"}
                        </h4>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-tighter">
                        Active
                    </span>
                </div>
            </div>

            {/* Body: Info Grid */}
            <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                    <div className="mt-1 p-1 bg-slate-100 rounded-md">
                        <MapPin size={12} className="text-slate-500" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[9px] font-semibold text-slate-400 uppercase">Location</p>
                        <p className="text-[11px] text-slate-700 font-medium leading-relaxed italic">
                            {org.organizationAddress}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="mt-1 p-1 bg-slate-100 rounded-md">
                        <FileText size={12} className="text-slate-500" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[9px] font-semibold text-slate-400 uppercase">Service Standard</p>
                        <p className="text-[11px] text-slate-800 font-bold">
                            {org.serviceStandards}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer: Timeline, Avatars & Progress */}
            <div className="mt-auto pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-4">
                    {/* Deadline Section */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-slate-400 mb-1">
                            <CalendarDays size={12} />
                            <span className="text-[9px] font-bold uppercase">Deadline</span>
                        </div>
                        <span className="text-[12px] font-black text-slate-900">
                            {data || "Mar 30, 2026"}
                        </span>
                    </div>

                    {/* Team Avatars */}
                    <div className="flex -space-x-3 rtl:space-x-reverse">
                        <img
                            className="w-8 h-8 border-2 border-white rounded-full cursor-pointer hover:z-10 hover:scale-110 transition-transform"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"
                            alt="Member 1"
                            onClick={(e) => handleAvatarClick(e, 1)}
                        />
                        <img
                            className="w-8 h-8 border-2 border-white rounded-full cursor-pointer hover:z-10 hover:scale-110 transition-transform"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"
                            alt="Member 2"
                            onClick={(e) => handleAvatarClick(e, 2)}
                        />
                        <img
                            className="w-8 h-8 border-2 border-white rounded-full cursor-pointer hover:z-10 hover:scale-110 transition-transform"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"
                            alt="Member 3"
                            onClick={(e) => handleAvatarClick(e, 3)}
                        />
                        <div
                            className="flex items-center justify-center w-8 h-8 text-[10px] font-medium text-white bg-slate-800 border-2 border-white rounded-full cursor-pointer hover:bg-slate-700 transition-colors"
                            onClick={(e) => handleAvatarClick(e, 'more')}
                        >
                            +9
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                            <BarChart3 size={14} className="text-blue-500" />
                            <span className="text-[10px] font-black text-slate-900">Completion</span>
                        </div>
                        <span className="text-[10px] font-black text-slate-900">{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-700 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Hover Indicator: Arrow */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <ChevronRight size={16} className="text-blue-400" />
            </div>
        </div>
    );
};