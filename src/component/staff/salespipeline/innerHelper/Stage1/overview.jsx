import React, { useEffect, useState, useRef, memo } from "react";
import {
    BadgeInfo,
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
    GraduationCap,
    MessageCircle,
    Radio,
    Edit2,
    Trash2Icon

} from 'lucide-react';
import { Link } from 'react-router-dom';

const Overview = memo(({ onUpdate, data = {}, leadInfo, organization }) => {
    // console.log('Organization details ----',  organization)
    const leadData = leadInfo?.[0]
    const organizationData = organization?.[0]
    const [isActive, setIsActive] = useState(false);
    const prevDataRef = useRef(null);
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
                { platform: 'Website', url: '#', icon: Twitter },
                { platform: 'Youtube', url: '#', icon: Twitter },
                { platform: 'Instagram', url: '#', icon: Twitter },
                { platform: 'Instagram', url: '#', icon: Twitter }
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
                <div className="bg-transparent border-b border-slate-100 flex flex-col items-start gap-6 w-full max-w-5xl px-6 pb-8">
                    <div className="w-full flex justify-end gap-2">
                        <button
                            className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                        >
                            <Edit2 size={16} />
                        </button>


                        <button
                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 cursor-pointer"
                        >
                            <Trash2Icon size={16} />
                        </button>

                    </div>
                    <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
                        <div className="relative group shrink-0">
                            <div className="h-18 w-18 rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100/50 flex items-center justify-center text-amber-600 border border-amber-200/50 shadow-inner">
                                <Building2 size={32} strokeWidth={1.2} />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-white text-emerald-500 p-2 rounded-xl border border-slate-100 shadow-lg">
                                <ShieldCheck size={18} />
                            </div>
                        </div>

                        <div className="space-y-3 w-full">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-[10px] font-black text-white uppercase tracking-wider">
                                    {leadData?.LeadID || "LD-002"}
                                </span>

                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-100">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest">
                                        {data_?.commercials?.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-amber-600 uppercase tracking-widest">
                                <span className="relative group">
                                    <div className="flex justify-start items-center cursor-pointer">
                                        <User size={19} />
                                        <span className="ml-1 text-[10px]">{leadData?.leadTakenBy || " Priya"}</span>
                                    </div>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden w-max rounded bg-gray-800 px-2 py-1 text-white text-[10px] font-normal group-hover:block whitespace-nowrap">
                                        Sales Person
                                    </span>
                                </span>

                                <span className="relative group">
                                    <div className="flex justify-start items-center cursor-pointer">
                                        <Users size={19} />
                                        <span className="ml-1 text-[10px]">{leadData?.salesManager || " "}</span>
                                    </div>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden w-max rounded bg-gray-800 px-2 py-1 text-white text-[10px] font-normal group-hover:block whitespace-nowrap">
                                        Sales Manager
                                    </span>
                                </span>
                            </div>

                            <h1 className="text-2xl uppercase font-black text-slate-900 leading-none">
                                {organizationData?.organizationName}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                    <History size={14} />
                                    <span>Date : {convertToNepaliTime(leadData?.createdAt)}</span>
                                </div>
                                {/* Added Campaign Name */}
                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                    <Megaphone size={14} />
                                    <span>Campaign: {leadData?.campaignName || "N/A"}</span>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>

                <div className="ml-5 p-4   space-y-4">

                    {/* Header Section: Lead Type & Standards */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Lead Type Badge */}
                        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-sm">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider border-r pr-3 border-slate-200">
                                Lead Type
                            </span>
                            <span className="text-xs font-black capitalize text-slate-900">
                                {leadData?.leadType}
                            </span>
                        </div>

                        {/* Standards Multi-Tag Container */}
                        <div className="flex flex-wrap items-center gap-2 p-1.5 px-3 rounded-lg bg-amber-500 text-white shadow-md shadow-amber-200/50">
                            <span className="text-[10px] font-bold text-amber-100 uppercase tracking-tight">
                                Standards:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {leadData?.ProductInterested?.map((standard, index) => (
                                    <span key={index} className="text-xs font-bold uppercase bg-amber-600/40 px-2 py-0.5 rounded-md">
                                        {standard}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Metadata Grid: Source, Channel, Branch, Province */}
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3">

                        {[
                            { label: "Source", value: leadData?.leadSource, icon: <Radio size={14} />, default: "N/A" },
                            { label: "Channel", value: leadData?.leadChannel, icon: <MessageCircle size={14} />, default: "N/A" },
                            { label: "Branch", value: leadData?.branch, icon: <Building2 size={14} />, default: "Main" },
                            { label: "Province", value: leadData?.province, icon: <MapPinned size={14} />, default: "N/A" },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:border-amber-400 hover:shadow-sm transition-all group"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-amber-500 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </span>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                                        {item.label}
                                    </span>
                                </div>
                                <span className="text-[11px] font-bold uppercase text-slate-800 sm:border-l sm:pl-2 border-slate-100">
                                    {item.value || item.default}
                                </span>
                            </div>
                        ))}

                    </div>
                </div>
                {/* Content Sections */}
                <div className="w-full max-w-full mx-auto pt-4">
                    <section className="px-2 sm:px-4">
                        <div className="w-full border-b border-slate-200 pb-6">

                            {/* Header Container: Name & Socials aligned in one row */}
                            <div className="flex items-start justify-between gap-4 mb-5">

                                {/* Left: Icon + Text */}
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="shrink-0 p-2.5 bg-amber-50 rounded-xl border border-amber-100 text-amber-600 shadow-sm">
                                        <BriefcaseBusiness size={20} strokeWidth={2.5} />
                                    </div>

                                    <div className="flex flex-col min-w-0">
                                        <h2 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-wider truncate">
                                            Organization Profile
                                        </h2>
                                        <p className="text-[11px] text-slate-500 font-medium truncate">
                                            Overview of information
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Social Icons - Compact & No Wrap */}
                                <div className="flex items-center gap-1.5 shrink-0">
                                    {data_?.organization?.socials?.map((social, idx) => (
                                        <Link
                                            key={idx}
                                            to={social.url}
                                            className="p-2 bg-white text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg border border-slate-200 transition-colors active:scale-95"
                                        >
                                            <social.icon size={14} />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Metadata: Industry and Type - Always Flex Row */}
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">

                                {/* Industry Group */}
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500  shrink-0">
                                        Industry:
                                    </span>
                                    <div className="flex gap-1 overflow-hidden">
                                        {organizationData?.industyType?.length > 0 ? (
                                            organizationData.industyType.slice(0, 2).map((item, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[9px] font-bold uppercase rounded border border-indigo-100 whitespace-nowrap"
                                                >
                                                    {item}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-slate-400 italic text-[10px]">N/A</span>
                                        )}
                                        {organizationData?.industyType?.length > 2 && (
                                            <span className="text-[9px] text-slate-400 font-bold">+{organizationData.industyType.length - 2}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Small Divider */}
                                <div className="h-3 w-px bg-slate-200 hidden xs:block"></div>

                                {/* Type Group */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter shrink-0">
                                        Type:
                                    </span>
                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[9px] font-bold uppercase rounded border border-slate-200 whitespace-nowrap">
                                        {organizationData?.organizationType || "N/A"}
                                    </span>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
                {/* Registration, Tax, Address details */}
                <div className="w-full max-w-full mx-auto p-2">
                    <div className="bg-white/55 border border-slate-100 rounded-2xl p-4 sm:p-6 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-2">

                            {/* Registration */}
                            <div className="flex flex-row md:flex-col items-center md:justify-center gap-4 md:gap-2 px-2">
                                <div className="shrink-0 p-2.5 bg-amber-50 rounded-xl text-amber-600">
                                    <FileText size={18} />
                                </div>
                                <div className="flex flex-col md:items-center min-w-0">
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                        Registration
                                    </p>
                                    <p className="text-sm font-semibold text-slate-900 truncate w-full md:text-center">
                                        {organizationData?.registrationNumber || "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Vertical Divider for Desktop / Horizontal for Mobile */}
                            <div className="hidden md:block border-l border-slate-100 h-10 self-center"></div>
                            <div className="block md:hidden border-t border-slate-50 w-full"></div>

                            {/* Tax ID */}
                            <div className="flex flex-row md:flex-col items-center md:justify-center gap-4 md:gap-2 px-2">
                                <div className="shrink-0 p-2.5 bg-blue-50 rounded-xl text-blue-600">
                                    <CreditCard size={18} />
                                </div>
                                <div className="flex flex-col md:items-center min-w-0">
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                        VAT / PAN
                                    </p>
                                    <p className="text-sm font-semibold text-slate-900 truncate w-full md:text-center">
                                        {organizationData?.vatPan || "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Vertical Divider for Desktop / Horizontal for Mobile */}
                            <div className="hidden md:block border-l border-slate-100 h-10 self-center"></div>
                            <div className="block md:hidden border-t border-slate-50 w-full"></div>

                            {/* Address */}
                            <div className="flex flex-row md:flex-col items-center md:justify-center gap-4 md:gap-2 px-2">
                                <div className="shrink-0 p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                                    <MapPinned size={18} />
                                </div>
                                <div className="flex flex-col md:items-center min-w-0">
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                        Official Address
                                    </p>
                                    <p className="text-sm font-medium text-slate-900 leading-tight md:text-center line-clamp-2">
                                        {organizationData?.address || organizationData?.organizationAddress || "N/A"}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Contact Details */}
                <div className="w-full max-w-full mx-auto p-2">
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">

                        {/* Header Section */}
                        <div className="pb-3 border-b border-slate-100">
                            <p className="text-xs font-black text-slate-900 leading-snug uppercase tracking-tight">
                                Primary Contact
                            </p>
                            <p className="text-[10px] text-amber-600 font-black uppercase tracking-[0.15em] mt-1 truncate">
                                {organizationData?.organizationName || "N/A"}
                            </p>
                        </div>

                        {/* Info Grid - Optimized for narrow modal widths */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4">

                            {/* Contact Person */}
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="h-6 w-6 rounded-full flex items-center justify-center bg-indigo-50 text-indigo-600 shrink-0">
                                    <UserCog size={12} strokeWidth={3} />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 truncate">
                                    {organizationData?.contactPersonName || organizationData?.contactPerson?.contactFullName || "N/A"}
                                </span>
                            </div>

                            {/* Role */}
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="h-6 w-6 rounded-full flex items-center justify-center bg-purple-50 text-purple-600 shrink-0">
                                    <User size={12} strokeWidth={3} />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 truncate">
                                    {organizationData?.contactPerson?.contactRole || "N/A"}
                                </span>
                            </div>

                            {/* Phone - Clickable */}
                            <a
                                href={`tel:${organizationData?.contactPersonNumber || organizationData?.contactPerson?.contactNumber}`}
                                className="flex items-center gap-3 min-w-0 group hover:opacity-80 transition-opacity"
                            >
                                <div className="h-6 w-6 rounded-full flex items-center justify-center bg-green-50 text-green-600 shrink-0 group-hover:bg-green-100">
                                    <PhoneCall size={12} strokeWidth={3} />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 truncate border-b border-transparent group-hover:border-green-200">
                                    {organizationData?.contactPersonNumber || organizationData?.contactPerson?.contactNumber || "N/A"}
                                </span>
                            </a>

                            {/* Email - Clickable */}
                            <a
                                href={`mailto:${organizationData?.contactPersonEmail || organizationData?.contactPerson?.contactEmail}`}
                                className="flex items-center gap-3 min-w-0 group hover:opacity-80 transition-opacity"
                            >
                                <div className="h-6 w-6 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 shrink-0 group-hover:bg-blue-100">
                                    <MailCheck size={12} strokeWidth={3} />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 truncate border-b border-transparent group-hover:border-blue-200">
                                    {organizationData?.contactPersonEmail || organizationData?.contactPerson?.contactEmail || "N/A"}
                                </span>
                            </a>

                            {/* Total Employees */}
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="h-6 w-6 rounded-full flex items-center justify-center bg-orange-50 text-orange-600 shrink-0">
                                    <Users size={12} strokeWidth={3} />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 truncate">
                                    {organizationData?.totalEmp_learners || organizationData?.totalEmployees || "0"} Employees
                                </span>
                            </div>

                            {/* Total Educators */}
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="h-6 w-6 rounded-full flex items-center justify-center bg-pink-50 text-pink-600 shrink-0">
                                    <GraduationCap size={12} strokeWidth={3} />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 truncate">
                                    {organizationData?.totalEducator || organizationData?.educators || "0"} Educators
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </>
    );
});

// LeadHelper.displayName = 'LeadHelper';
export default Overview;


