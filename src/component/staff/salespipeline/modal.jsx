import React from "react";
import { Building2, MapPin, FileText, Users, Phone, CalendarDays, BarChart3, BadgeInfo } from "lucide-react";

export const SmallModal = ({ data, onClick, isdata = true, stageID, org, leadDetails }) => {
    if (!isdata || !org) return null;
    // console.log('from smallmodal', org, leadDetails)

    const {
        _id,
        salesId,
        organizationName,
        organizationType,
        industyType,
        registrationNumber,
        vatPan,
        address,
        totalEmp_learners,
        totalEducator,
        contactPersonName,
        role,
        contactPersonNumber,
        contactPersonEmail,
        ProductInterested,
        branch,
        province,
        campaignName,
        leadChannel,
        leadSource,
        leadType,
        salesManager,
        createdAt,
        updatedAt,
    } = org;

    const progress = 49
    // console.log('organization details', org)
    const statusColor =
        leadType === "hot_lead"
            ? "bg-red-50 text-red-700 border-red-100"
            : leadType === "warm_lead"
                ? "bg-amber-50 text-amber-700 border-amber-100"
                : "bg-emerald-50 text-emerald-700 border-emerald-100";

    const statusText =
        leadType === "hot_lead"
            ? "High Priority"
            : leadType === "warm_lead"
                ? "Medium Priority"
                : "Active";

    const formatLabel = (value) => {
        if (!value) return "N/A";
        return value
            .toString()
            .replaceAll("_", " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const formatDate = (dateValue) => {
        if (!dateValue) return "Apr 17, 2026";
        const date = new Date(dateValue);
        if (Number.isNaN(date.getTime())) return "Apr 17, 2026";
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div
            onClick={onClick}
            className="group relative flex flex-col p-5 bg-white rounded-2xl border border-slate-200 
                 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 
                 cursor-pointer w-full max-w-md overflow-hidden"
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-5">
                <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                        <Building2 size={22} className="text-slate-600 group-hover:text-blue-600" />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-0.5">
                            Project Entity
                        </span>
                        <h4 className="text-[14px] font-extrabold text-slate-900 leading-tight">
                            {organizationName || "General Organization"}
                        </h4>

                        <div className="flex flex gap-1.5 mt-2">
                            <span className="text-[9px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                                {formatLabel(organizationType)}
                            </span>
                            <span className="text-[9px] px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full border border-purple-100">
                                {formatLabel(branch)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${statusColor}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-tighter">{statusText}</span>
                </div>
            </div>

            {/* Main Info */}
            <div className="space-y-4 mb-5">
                <div className="flex items-start gap-3">
                    <div className="mt-1 p-1 bg-slate-100 rounded-md">
                        <MapPin size={12} className="text-slate-500" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[9px] font-semibold text-slate-400 uppercase">Location</p>
                        <p className="text-[11px] text-slate-700 font-medium italic">{address || "Not available"}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="mt-1 p-1 bg-slate-100 rounded-md">
                        <FileText size={12} className="text-slate-500" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[9px] font-semibold text-slate-400 uppercase">Service Standard</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {Array.isArray(ProductInterested) && ProductInterested.length > 0 ? (
                                ProductInterested.map((item, index) => (
                                    <span
                                        key={index}
                                        className="flex items-center gap-2 rounded-full border border-slate-200
                                         bg-slate-100 px-3 py-1 text-[9px] font-semibold uppercase text-slate-900"
                                    >
                                        <span className="inline-block  h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        {item}
                                    </span>
                                ))
                            ) : (
                                <span className="text-[11px] uppercase font-medium text-slate-500">No products selected</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* REPLACED STATISTICAL CARDS WITH A SINGLE CHANNEL INFO BOX */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 mb-5">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <BadgeInfo size={14} className="text-slate-500" />
                        <div>
                            <p className="text-[9px] font-semibold uppercase text-slate-400">Lead Origin</p>
                            <p className="text-[11px] font-bold text-slate-800">
                                {formatLabel(leadSource)} <span className="text-slate-300 mx-1">|</span> {formatLabel(leadChannel)}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-semibold uppercase text-slate-400">Type</p>
                        <p className="text-[11px] font-bold text-amber-600">{formatLabel(leadType)}</p>
                    </div>
                </div>
            </div>

            {/* Contact Summary */}
            <div className="rounded-xl border border-slate-100 bg-white p-3 mb-5 space-y-2">
                <p className="text-[9px] font-semibold uppercase text-slate-400">Contact Summary</p>
                <div className="flex items-center gap-2 text-slate-700 text-[11px] font-medium">
                    <Users size={13} className="text-slate-400" /> {contactPersonName || "N/A"}
                </div>
                <div className="flex items-center gap-2 text-slate-700 text-[11px] font-medium">
                    <Phone size={13} className="text-slate-400" /> {contactPersonNumber || "N/A"}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-slate-400 mb-1">
                            <CalendarDays size={12} />
                            <span className="text-[9px] font-bold uppercase">Created</span>
                        </div>
                        <span className="text-[12px] font-black text-slate-900">{data || formatDate(createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <BarChart3 size={14} className="text-blue-500" />
                        <span className="text-[10px] font-black text-slate-900">{progress}% Complete</span>
                    </div>
                </div>

                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-700"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};
