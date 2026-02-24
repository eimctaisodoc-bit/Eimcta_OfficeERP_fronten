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
    MapPin

} from 'lucide-react';
import { Link } from 'react-router-dom';

const LeadHelper = memo(({ onUpdate, data = {} }) => {
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
    return (
        <>

            <div className="min-h-screen   flex flex-col items-center justify-start pt-5 font-sans" style={fontStyle}>

                <div className=" bg-transparent border-b border-slate-100 
                flex flex-col  justify-between items-start lg:items-center gap-8">
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
                            <div className="flex items-center gap-3">
                                <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-[10px] font-black text-white uppercase tracking-wider">
                                    {data_.leadId}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-widest">
                                    <TrendingUp size={14} /> {data_.commercials.priority} Priority Lead
                                </span>
                            </div>
                            <h1 className="text-2xl   font-black text-slate-900 leading-none">
                                {data_.organization.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 ">
                                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                    <Target size={14} className="text-amber-500" />
                                    <span className="font-semibold text-slate-700 underline underline-offset-4
                                     decoration-amber-200">{data_.commercials.status}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                                    <History size={14} />
                                    <span>Last touch: {data_.lastInteraction}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 w-full ">
                        <div className="flex gap-2 w-full justify-end  items-center">

                            {/* Lead Type */}
                            <div className="flex flex-row gap-3 items-center  justify-center px-4 py-2 
                  w-fit rounded-xl 
                  bg-slate-50 border border-slate-200 
                  text-center">
                                <p className="text-[9px] font-bold text-slate-900 uppercase tracking-wide">
                                    Lead Type
                                </p>
                                <p className="text-[11px] font-bold text-slate-800">
                                    {data_.leadType.label}
                                </p>
                            </div>

                            {/* ISO Target */}
                            <div className="flex flex-row items-center gap-3 justify-center px-4 py-2 
                  w-fit rounded-xl 
                  bg-amber-500 text-white 
                  shadow-md shadow-amber-200 
                  text-center">
                                <p className="text-[9px] font-bold text-amber-100 uppercase tracking-wide">
                                    ISO Target
                                </p>
                                <p className="text-[11px] font-bold">
                                    21001:2018
                                </p>
                            </div>

                        </div>

                        <div className="flex gap-1.5">
                            {data_.context.tags.map(tag => (
                                <span key={tag} className="text-[9px] font-black px-2 py-1 bg-white border border-slate-200 text-slate-800 rounded-md uppercase tracking-widest">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 w-full max-w-5xl mx-auto space-y-12 pt-6">

                    <section className="space-y-9 w-full">

                        <div className="flex items-center justify-between 
                    border-b border-slate-100 
                    pb-4 w-full">

                            {/* Left Title */}
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                                    <BriefcaseBusiness size={20} />
                                </div>

                                <h2 className="text-sm font-black text-slate-900 
                       uppercase tracking-[0.2em]">
                                    Organization Profile
                                </h2>
                            </div>

                            {/* Social Icons */}
                            <div className="flex gap-2 flex-wrap">
                                {data_.organization.socials.map((social, idx) => (
                                    <Link
                                        key={idx}
                                        to={social.url}
                                        className="p-2 bg-slate-50 text-slate-400 
                       hover:text-amber-600 hover:bg-amber-50 
                       rounded-xl transition-all 
                       border border-slate-100"
                                    >
                                        <social.icon size={14} />
                                    </Link>
                                ))}
                            </div>

                        </div>

                    </section>

                </div>

                <div className="w-full bg rounded-2xl  p-3">

                    <div className="space-y-6 text-sm flex flex-row gap-4 justify-between">

                        {/* Registration */}
                        <div className="flex items-center justify-between">
                            <div className="flex  items-center  flex-col gap-3">
                                <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                                    <FileText size={20} />
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                                        Registration
                                    </p>
                                    <p className="text-base font-semibold text-center text-slate-900 mt-1">
                                        {data_.organization.legalId}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100"></div>

                        {/* Tax ID */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center flex-col  gap-3">
                                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                                    <CreditCard size={20} />
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                                        Tax / PAN ID
                                    </p>
                                    <p className="text-base  text-center font-semibold text-slate-900 mt-1">
                                        {data_.organization.taxId}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100"></div>

                        {/* Address */}
                        <div className="flex items-center flex-col gap-3">
                            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                                <MapPinned size={20} />
                            </div>

                            <div>
                                <p className="text-[10px] text-center uppercase font-bold text-slate-400 tracking-widest">
                                    Official Address
                                </p>
                                <p className="text-base text-center font-medium text-slate-900 mt-1 leading-relaxed">
                                    {data_.organization.location}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>



                <div className="w-full max-w-5xl mx-auto p-2">

                    {/* Section Title */}
                    <h3 className="text-[11px] font-black text-slate-400 
                 uppercase tracking-[0.2em] 
                 flex items-center gap-2 pb-2">
                        <Zap size={14} className="text-amber-500" />
                        Solution Architecture
                    </h3>

                    {/* Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 
                  p-6 shadow-sm space-y-5">

                        {/* Standard + Category */}
                        <div className="pb-3 border-b border-slate-100">
                            <p className="text-sm font-black text-slate-900 leading-snug">
                                {data_?.requirement?.standard || "N/A"}
                            </p>

                            <p className="text-[10px] text-amber-600 font-black 
                    uppercase tracking-widest mt-1">
                                {data_?.requirement?.category || "Category"}
                            </p>
                        </div>

                        {/* Service List */}
                        <div className="space-y-3">

                            <div className="flex items-center gap-3 text-xs font-semibold text-slate-900">
                                <div className="h-5 w-5 rounded-full flex items-center justify-center 
                        bg-amber-100 text-amber-600 shrink-0">
                                    <CheckCircle2 size={12} strokeWidth={3} />
                                </div>
                                <span>End-to-end Consultancy</span>
                            </div>

                            <div className="flex items-center gap-3 text-xs font-semibold text-slate-900">
                                <div className="h-5 w-5 rounded-full flex items-center justify-center 
                        bg-amber-100 text-amber-600 shrink-0">
                                    <CheckCircle2 size={12} strokeWidth={3} />
                                </div>
                                <span>Staff Training Module</span>
                            </div>

                        </div>

                        {/* Implementation Duration */}
                        <div className="pt-2">
                            <div className="px-4 py-3 bg-slate-50 rounded-xl 
                      flex items-center justify-between 
                      border border-slate-100">
                                <span className="text-[10px] text-slate-400 
                         font-black uppercase tracking-widest">
                                    Implementation
                                </span>

                                <span className="text-xs font-black text-slate-900">
                                    {data_?.requirement?.duration || "TBD"}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className=" pt-4 w-full max-w-2xl mx-auto">
                    <button className="w-full py-5 px-5 bg-slate-900 text-white rounded-xl flex items-center justify-center 
                    gap-2 font-semibold hover:bg-slate-800 transition-colors" >
                        Complete
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                </div>

            </div>

        </>
    );
});

// LeadHelper.displayName = 'LeadHelper';
export default LeadHelper;

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
export const SmallModal = ({data, onClick,isdata = true }) => {

    if (!isdata) return
    // console.log(data)
    return (
        <>


            <div className="flex pb-3 bg-white flex-col justify-between p-5 rounded-2xl border border-slate-200 shadow-sm w-full max-w-md text-[10px] text-slate-900" onClick={onClick}>

                <div className="grid grid-cols-2 gap-y-3">

                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-blue-500" />
                        <span>Organizational Address:{data}</span>
                    </div>
                    <span>Everest Management Consultancy</span>

                    <div className="flex items-center gap-2">
                        <FileText size={14} className="text-purple-500" />
                        <span>Standard / Service:</span>
                    </div>
                    <span>ISO 9001:2015 {data}</span>


                </div>



                {/* Footer */}
                <footer className="mt-5 pt-4 border-t border-slate-200 flex justify-between items-center">

                    <div className="flex items-center gap-2">
                        <CalendarDays size={14} className="text-cyan-500" />
                        <div>
                            <p>Expected End Date {data}</p>
                            <p>March 30, 2026 {data}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <BarChart3 size={14} className="text-emerald-500" />
                        <div className="w-24 h-1.5 bg-slate-200 rounded-full">
                            <div className="h-1.5 bg-emerald-500 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                    </div>

                </footer>

            </div>


        </>
    )
}