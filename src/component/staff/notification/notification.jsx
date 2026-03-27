import React, { useEffect, useMemo, useState } from "react";
import {
  FileText, // For PDF/Word
  Table,    // For Excel
  Image as ImageIcon,
  MessageSquare,
  Video,
  ChevronDown,
  Paperclip,
  Search,
  Filter,
  X,
  Clock,
  User,
  AlertCircle,
  BellRing,
  MoreHorizontal
} from "lucide-react";


export const Noti = ({ height = "h-screen" }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [display_, setdisplay_] = useState([]);


  const theme = {
    primary: "from-orange-500 to-amber-600",
    accent: "text-amber-600",
    surface: "bg-white",
    neutral: "text-slate-600",
    border: "border-slate-100",
    heading: "text-slate-900"
  };

  // Map file formats to vendor-specific color schemes
  const vendorColors = {
    pdf: "bg-red-50 text-red-600",
    excel: "bg-green-50 text-green-600",
    word: "bg-blue-50 text-blue-600",
    image: "bg-yellow-50 text-yellow-600",
    video: "bg-purple-50 text-purple-600",
    message: "bg-indigo-50 text-indigo-600"
  };

  const notifications = [
    {
      id: 1,
      format: "pdf",
      icon: FileText,
      category: "Legal Documents",
      title: "Partnership_Agreement_2026.pdf",
      description: "Final draft pending executive signature.",
      time: "10:15 AM",
      priority: "High",
      author: "Legal Dept",
      note: "Section 4.2 updated per last board meeting.",
      status: "action_required"
    },
    {
      id: 2,
      format: "excel",
      icon: Table,
      category: "Operations",
      title: "Inventory_Report_Q1.xlsx",
      description: "Monthly reconciliation completed for EMEA region.",
      time: "Yesterday",
      priority: "Medium",
      author: "Supply Chain",
      note: "Stock levels are 12% higher than seasonal average.",
      status: "info"
    },
    {
      id: 3,
      format: "message",
      icon: MessageSquare,
      category: "Direct Message",
      title: "Feedback on Design System",
      description: "Alex sent a comment on the typography overhaul.",
      time: "2h ago",
      priority: "Low",
      author: "Alex Rivera",
      note: "The Roboto Slab choice is getting great feedback from the dev team.",
      status: "unread"
    },
    {
      id: 4,
      format: "image",
      icon: ImageIcon,
      category: "Marketing Assets",
      title: "Hero_Banner_Draft.png",
      description: "New visual assets ready for campaign review.",
      time: "5h ago",
      priority: "Medium",
      author: "Creative Team",
      note: "Vibrant orange gradients used to match brand refresh.",
      status: "info"
    },
    {
      id: 5,
      format: "video",
      icon: Video,
      category: "Training",
      title: "Onboarding_Tutorial.mp4",
      description: "New employee walkthrough available.",
      time: "1d ago",
      priority: "Low",
      author: "HR Team",
      note: "Includes updated compliance section.",
      status: "info"
    },
    {
      id: 6,
      format: "word",
      icon: FileText,
      category: "Documents",
      title: "Meeting_Minutes_05.docx",
      description: "Review and approve minutes from last board meeting.",
      time: "3d ago",
      priority: "Low",
      author: "Executive Assistant",
      note: "Timestamped for easy reference.",
      status: "unread"
    }

  ];
  useEffect(() => {
    setdisplay_(notifications)
  }, [])

  // console.log(display_)
  const searchFilter = useMemo(() => {
    return display_?.filter((fields) =>
      fields.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, display_]);

  useEffect(() => {
    if (searchQuery === "") {
      setdisplay_(notifications)
    } else {
      setdisplay_(searchFilter)
    }
  }, [searchQuery])
  // setdisplay_(searchFilter)
  // console.log('search filter', searchFilter)

  const handleChange = (e) => {
    setSearchQuery(e.target.value)

    // console.log(res)
  }

  return (
    <div
      style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
      className={`${theme.surface} ${height} flex flex-col overflow-hidden font-sans border border-slate-200 shadow-2xl rounded-3xl`}
    >
      {/* Header Section */}
      <div className="px-8 pt-8 pb-6 border-b border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-orange-50 ${theme.accent}`}>
              <BellRing size={24} />
            </div>
            <h1
              className={`text-2xl ${theme.heading}`}
            >
              Activity Center
            </h1>
          </div>
          <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search by file or sender..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-slate-400"
            // onChange={(e) => setSearchQuery(e.target.value)}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      {/* Notification List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 custom-scroll">
        <div className="space-y-3">
          {display_?.map((item) => {
            const isExpanded = expandedId === item.id;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className={`group transition-all duration-300 rounded-2xl border ${isExpanded
                  ? "border-amber-200 bg-amber-50/30 ring-4 ring-amber-500/5 shadow-sm"
                  : "border-slate-100 bg-white hover:border-slate-200 shadow-sm"
                  }`}
              >
                <div className="p-4 flex items-start gap-4 cursor-pointer">
                  {/* Icon Technique: Background mapping */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${isExpanded
                    ? `bg-gradient-to-br ${theme.primary} text-white shadow-lg shadow-orange-200`
                    : vendorColors[item.format] || "bg-slate-50 text-slate-500"
                    }`}>
                    <Icon size={22} strokeWidth={2.5} />
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isExpanded ? theme.accent : "text-slate-400"}`}>
                        {item.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                        <Clock size={10} /> {item.time}
                      </span>
                    </div>
                    <h3 className={`text-sm font-bold truncate ${theme.heading}`}>
                      {item.title}
                    </h3>
                    {!isExpanded && (
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className={`mt-2 transition-transform duration-300 ${isExpanded ? "rotate-180 text-amber-600" : "text-slate-300"}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>

                {/* Expanded State */}
                {isExpanded && (
                  <div className="px-4 pb-4 animate-slideDown">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-100/50">
                      <p className="text-sm text-slate-700 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1.5">
                          <User size={14} className="text-slate-400" />
                          <span className="text-xs font-bold text-slate-600">{item.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <AlertCircle size={14} className="text-amber-500" />
                          <span className="text-xs font-bold text-slate-600">{item.priority}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-amber-400 mb-4">
                        <p className="text-xs text-slate-600 italic">"{item.note}"</p>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Paperclip size={14} />
                          <span className="text-[10px] font-bold">Attachment Included</span>
                        </div>
                        <button className={`px-5 py-2 rounded-lg text-white text-xs font-bold bg-gradient-to-r ${theme.primary} hover:opacity-90 transition-all shadow-md active:scale-95`}>
                          Open {item.format.toUpperCase()}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Branding */}


      <style>{`
        
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};