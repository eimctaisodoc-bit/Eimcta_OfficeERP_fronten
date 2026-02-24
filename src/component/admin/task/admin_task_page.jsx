import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  CheckSquare,
  Circle,
  FileText,
  Clock,
  FileSpreadsheet,
  FileImage,
  FileAudio,
  FileVideo,
  AlignLeft,
  Search,
  ChevronRight,
  User,
  BadgeInfo,
  File,
  FileType,
  Calendar,
} from "lucide-react";

import { CreateTask } from "./createTask";
import MyCalendar from "../../calendara";

export const Admin_task_page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const handleTaskClose = () => setIsTaskOpen(false);
  const handleclose = () => setIsModalOpen(false);

  // ✅ Updated tasks: attachments split into adminAttachments + clientAttachments
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Quarterly Marketing Assets",
      description:
        "Prepare the final assets for the Q1 campaign including video teasers and audio scripts. This involves coordinating with the design team and ensuring all assets meet brand guidelines.",
      date: "2024-12-28",
      completed: false,
      priority: "high",
      assignee: { username: "alex_dev", role: "Admin", position: "Lead Designer" },
      createdBy: "sarah_manager",
      createdDate: "2024-11-15",

      adminAttachments: [
        { name: "campaign_brief.pdf", type: "pdf", size: "1.2 MB" },
        { name: "budget.xlsx", type: "excel", size: "850 KB" },
        { name: "brand_guidelines.pptx", type: "ppt", size: "2.1 MB" },
      ],
      clientAttachments: [
        { name: "mockup.jpg", type: "image", size: "3.4 MB" },
        { name: "voice_note.mp3", type: "audio", size: "6.1 MB" },
      ],
    },
    {
      id: 2,
      title: "Website Redesign Mockups",
      description:
        "Create initial mockups for the homepage redesign focusing on mobile-first approach and accessibility improvements.",
      date: "2024-12-20",
      completed: true,
      priority: "medium",
      assignee: { username: "mike_design", role: "Editor", position: "UI Designer" },
      createdBy: "jane_lead",
      createdDate: "2024-11-10",

      adminAttachments: [{ name: "wireframes.fig", type: "figma", size: "4.2 MB" }],
      clientAttachments: [{ name: "requirements.doc", type: "word", size: "890 KB" }],
    },
    {
  id: 3,
  title: "SEO Optimization Phase 1",
  description:
    "Conduct keyword research and optimize meta tags, headings, and on-page content for better search engine visibility.",
  date: "2025-01-15",
  completed: false,
  priority: "high",
  assignee: { username: "sarah_marketing", role: "Editor", position: "SEO Specialist" },
  createdBy: "jane_lead",
  createdDate: "2024-12-01",

  adminAttachments: [{ name: "seo-strategy.pdf", type: "pdf", size: "2.1 MB" }],
  clientAttachments: [{ name: "target-keywords.xlsx", type: "excel", size: "560 KB" }],
},
{
  id: 4,
  title: "Backend API Integration",
  description:
    "Integrate third-party payment gateway API and implement secure authentication with JWT tokens.",
  date: "2025-01-28",
  completed: false,
  priority: "high",
  assignee: { username: "alex_backend", role: "Admin", position: "Backend Developer" },
  createdBy: "john_manager",
  createdDate: "2024-12-05",

  adminAttachments: [{ name: "api-docs.pdf", type: "pdf", size: "3.4 MB" }],
  clientAttachments: [{ name: "payment-requirements.docx", type: "word", size: "1.2 MB" }],
},
{
  id: 5,
  title: "Mobile Responsiveness Testing",
  description:
    "Test the application across multiple devices and browsers ensuring consistent UI/UX experience.",
  date: "2025-02-05",
  completed: false,
  priority: "medium",
  assignee: { username: "lisa_qa", role: "Editor", position: "QA Engineer" },
  createdBy: "jane_lead",
  createdDate: "2024-12-12",

  adminAttachments: [{ name: "test-cases.xlsx", type: "excel", size: "980 KB" }],
  clientAttachments: [{ name: "device-list.pdf", type: "pdf", size: "430 KB" }],
},
{
  id: 6,
  title: "Dashboard Analytics Module",
  description:
    "Develop interactive analytics dashboard with charts and real-time data updates using WebSockets.",
  date: "2025-02-18",
  completed: false,
  priority: "high",
  assignee: { username: "raj_frontend", role: "Editor", position: "Frontend Developer" },
  createdBy: "john_manager",
  createdDate: "2024-12-20",

  adminAttachments: [{ name: "analytics-ui.fig", type: "figma", size: "5.6 MB" }],
  clientAttachments: [{ name: "metrics-requirement.docx", type: "word", size: "760 KB" }],
},
{
  id: 7,
  title: "Content Migration",
  description:
    "Migrate existing blog articles and media assets to the new CMS while maintaining SEO structure.",
  date: "2025-03-02",
  completed: false,
  priority: "medium",
  assignee: { username: "emma_content", role: "Editor", position: "Content Manager" },
  createdBy: "jane_lead",
  createdDate: "2025-01-05",

  adminAttachments: [{ name: "migration-plan.pdf", type: "pdf", size: "1.7 MB" }],
  clientAttachments: [{ name: "old-content-backup.zip", type: "zip", size: "12.4 MB" }],
},
{
  id: 8,
  title: "Security Audit & Penetration Testing",
  description:
    "Perform security assessment including vulnerability scanning, penetration testing, and risk mitigation planning.",
  date: "2025-03-15",
  completed: false,
  priority: "high",
  assignee: { username: "noah_security", role: "Admin", position: "Security Analyst" },
  createdBy: "john_manager",
  createdDate: "2025-01-10",

  adminAttachments: [{ name: "security-checklist.pdf", type: "pdf", size: "2.9 MB" }],
  clientAttachments: [{ name: "compliance-guidelines.docx", type: "word", size: "1.1 MB" }],
}
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    username: "",
    role: "",
    position: "",
    adminAttachments: [],
    clientAttachments: [],
    priority: "medium",
  });

  const [isAdding, setIsAdding] = useState(false);
  const [isLoadingBackend, setIsLoadingBackend] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTask, setExpandedTask] = useState(null);

  // Simulated Backend Fetch for User Info
  const fetchUserData = async () => {
    setIsLoadingBackend(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockUserData = {
      username: "sarah_j",
      role: "Editor",
      position: "Senior Project Manager",
    };

    setNewTask((prev) => ({
      ...prev,
      username: mockUserData.username,
      role: mockUserData.role,
      position: mockUserData.position,
    }));
    setIsLoadingBackend(false);
  };

  useEffect(() => {
    if (isAdding) fetchUserData();
  }, [isAdding]);

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileMetadata = (fileName, fileType = "") => {
    const ext = fileName.split(".").pop().toLowerCase();
    const type = fileType || ext;

    const iconMap = {
      pdf: { icon: <FileText size={14} />, color: "text-rose-600 bg-rose-50", label: "PDF" },
      excel: { icon: <FileSpreadsheet size={14} />, color: "text-emerald-600 bg-emerald-50", label: "Excel" },
      xlsx: { icon: <FileSpreadsheet size={14} />, color: "text-emerald-600 bg-emerald-50", label: "Excel" },
      xls: { icon: <FileSpreadsheet size={14} />, color: "text-emerald-600 bg-emerald-50", label: "Excel" },
      word: { icon: <FileText size={14} />, color: "text-blue-600 bg-blue-50", label: "Word" },
      doc: { icon: <FileText size={14} />, color: "text-blue-600 bg-blue-50", label: "Word" },
      docx: { icon: <FileText size={14} />, color: "text-blue-600 bg-blue-50", label: "Word" },
      ppt: { icon: <File size={14} />, color: "text-orange-600 bg-orange-50", label: "PPT" },
      pptx: { icon: <File size={14} />, color: "text-orange-600 bg-orange-50", label: "PPT" },
      txt: { icon: <FileType size={14} />, color: "text-slate-600 bg-slate-50", label: "Text" },
      image: { icon: <FileImage size={14} />, color: "text-amber-600 bg-amber-50", label: "Image" },
      jpg: { icon: <FileImage size={14} />, color: "text-amber-600 bg-amber-50", label: "Image" },
      jpeg: { icon: <FileImage size={14} />, color: "text-amber-600 bg-amber-50", label: "Image" },
      png: { icon: <FileImage size={14} />, color: "text-amber-600 bg-amber-50", label: "Image" },
      gif: { icon: <FileImage size={14} />, color: "text-amber-600 bg-amber-50", label: "Image" },
      audio: { icon: <FileAudio size={14} />, color: "text-violet-600 bg-violet-50", label: "Audio" },
      mp3: { icon: <FileAudio size={14} />, color: "text-violet-600 bg-violet-50", label: "Audio" },
      wav: { icon: <FileAudio size={14} />, color: "text-violet-600 bg-violet-50", label: "Audio" },
      video: { icon: <FileVideo size={14} />, color: "text-purple-600 bg-purple-50", label: "Video" },
      mp4: { icon: <FileVideo size={14} />, color: "text-purple-600 bg-purple-50", label: "Video" },
      mov: { icon: <FileVideo size={14} />, color: "text-purple-600 bg-purple-50", label: "Video" },
      figma: { icon: <File size={14} />, color: "text-fuchsia-600 bg-fuchsia-50", label: "Figma" },
    };

    return iconMap[type] || { icon: <File size={14} />, color: "text-slate-500 bg-slate-50", label: "File" };
  };

  const getPriorityBadge = (priority) => {
    const config = {
      high: { color: "bg-red-50 text-red-700 border-red-200", label: "High" },
      medium: { color: "bg-amber-50 text-amber-700 border-amber-200", label: "Medium" },
      low: { color: "bg-blue-50 text-blue-700 border-blue-200", label: "Low" },
    };
    return config[priority] || config.medium;
  };

  const removeTask = (id) => setTasks(tasks.filter((task) => task.id !== id));
  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const toggleTaskExpansion = (id) => setExpandedTask(expandedTask === id ? null : id);

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // ✅ Per-task actions
  const handleFeedback = (task) => {
    console.log("Feedback for:", task.id);
  };

  const handleSchedule = (task) => {
    console.log("Schedule for:", task.id);
  };

  // ✅ Helper: get a combined list for preview chips (admin + client)
  const getAllAttachments = (task) => [
    ...(task.adminAttachments || []),
    ...(task.clientAttachments || []),
  ];

  const AttachmentPreviewChips = ({ task }) => {
    const all = getAllAttachments(task);
    if (!all.length) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {all.slice(0, 3).map((file, index) => {
          const metadata = getFileMetadata(file.name, file.type);
          return (
            <div
              key={index}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${metadata.color} border-opacity-30 text-xs font-medium bg-white`}
            >
              {metadata.icon}
              <span className="truncate max-w-[100px]">{file.name.split(".")[0]}</span>
              <span className="text-[10px] opacity-70">.{file.name.split(".").pop()}</span>
            </div>
          );
        })}
        {all.length > 3 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600">
            +{all.length - 3} more
          </div>
        )}
      </div>
    );
  };

  const AttachmentGroup = ({ title, icon, items = [] }) => {
    if (!items.length) return null;

    return (
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <h4
            className="text-sm font-semibold text-slate-700 flex items-center gap-2"
            style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
          >
            <span className="text-slate-500">{icon}</span>
            {title} <span className="text-slate-400">({items.length})</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {items.map((file, index) => {
            const metadata = getFileMetadata(file.name, file.type);
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-amber-100 hover:border-amber-200 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-lg ${metadata.color} bg-opacity-20`}>
                    {metadata.icon}
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-800 truncate max-w-[180px]">
                      {file.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="font-medium">{metadata.label}</span>
                      <span>•</span>
                      <span>{file.size}</span>
                    </div>
                  </div>
                </div>

                {/* Optional: add Download / View action here later */}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Diagonal Cross Grid Bottom Background */}
      <div
        className="fixed inset-0 bottom-0 "
      //     style={{
      //   backgroundImage: `
      //     repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
      //   repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
      //   `,
      //   backgroundSize: "40px 40px",
      // }}
      />
      
      {/* Your Content/Components */}
      <div className="flex flex-col lg:flex-row min-h-screen relative">
        <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-5xl mx-auto w-full">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 lg:mb-12">
            <div className="space-y-1">
              <h1
                className="text-2xl md:text-3xl text-slate-900 tracking-tight text-balance"
                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
              >
                Task Dashboard
              </h1>
              <p
                className="text-xs md:text-sm text-slate-500"
                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
              >
                Remaining:{" "}
                <span className="text-orange-600 font-bold">
                  {tasks.filter((t) => !t.completed).length} tasks
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                className="flex items-center justify-center bg-white border border-amber-100 text-slate-600 px-2.5 py-2.5 rounded-xl font-bold text-sm hover:border-amber-400 hover:bg-amber-50 transition-colors active:scale-95"
                onClick={() => setIsModalOpen(true)}
                title="Open calendar"
              >
                <Calendar size={16} className="text-amber-600" />
              </button>

              <div className="relative group">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Quick search..."
                  className="pl-9 pr-4 py-2.5 bg-white border border-amber-100 rounded-xl text-sm focus:ring-2 focus:ring-amber-100 focus:border-amber-400 outline-none transition-colors w-full sm:w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                onClick={() => setIsTaskOpen(true)}
                className="flex items-center justify-center gap-1.5 bg-orange-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors active:scale-95 whitespace-nowrap"
              >
                <Plus size={16} /> Create Task
              </button>

              {isTaskOpen && (
                <div className="absolute top-0 left-1 w-full z-50 bg-white max-h-full border border-amber-100 rounded-2xl">
                  <CreateTask onclose={handleTaskClose} />
                </div>
              )}
            </div>
          </header>

          {/* Task List */}
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[32px] border border-amber-100 flex flex-col items-center justify-center px-6">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-4 text-amber-200">
                  <CheckSquare size={32} />
                </div>
                <h3
                  className="text-lg text-slate-400"
                  style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
                >
                  All clear
                </h3>
                <p
                  className="text-slate-300 text-xs mt-1"
                  style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                >
                  Ready for the next sprint?
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredTasks.map((task) => {
                  const priorityBadge = getPriorityBadge(task.priority);
                  const isExpanded = expandedTask === task.id;

                  return (
                    <div
                      key={task.id}
                      className={`group relative bg-white rounded-2xl border transition-colors duration-200 flex flex-col overflow-hidden cursor-pointer ${
                        task.completed
                          ? "opacity-60 border-amber-50 bg-white"
                          : "border-amber-100 hover:border-amber-200"
                      }`}
                      onClick={() => toggleTaskExpansion(task.id)}
                    >
                      <div className="p-5 flex flex-col sm:flex-row items-start gap-4">
                        <div className="flex items-start gap-4 w-full sm:w-auto">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTask(task.id);
                            }}
                            className={`mt-0.5 shrink-0 flex items-center justify-center w-8 h-8 rounded-xl transition-colors ${
                              task.completed
                                ? "bg-amber-500 text-white"
                                : "bg-white text-amber-600 hover:bg-amber-50 border border-amber-100"
                            }`}
                            title="Toggle complete"
                          >
                            {task.completed ? (
                              <CheckSquare size={18} />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-md border-2 border-current" />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <div
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${priorityBadge.color}`}
                              >
                                <Circle size={8} fill="currentColor" /> {priorityBadge.label}
                              </div>
                            </div>

                            <h3
                              className={`text-lg tracking-tight ${
                                task.completed ? "line-through text-slate-400" : "text-slate-800"
                              }`}
                              style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
                            >
                              {task.title}
                            </h3>

                            {/* Task Metadata Row */}
                            <div className="flex flex-wrap items-center gap-4 mt-3">
                              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                <Clock size={12} className="text-amber-600" />
                                <span className="font-semibold">Deadline:</span>
                                <span className="font-bold text-slate-700">{formatDate(task.date)}</span>
                              </div>

                              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                <User size={12} className="text-blue-600" />
                                <span className="font-semibold">Assignee:</span>
                                <span className="font-bold text-slate-700">@{task.assignee?.username}</span>
                                <span className="text-slate-400">• {task.assignee?.role}</span>
                              </div>

                              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                <BadgeInfo size={12} className="text-emerald-600" />
                                <span className="font-semibold">Created by:</span>
                                <span className="font-bold text-slate-700">@{task.createdBy}</span>
                                <span className="text-slate-400">• {formatDate(task.createdDate)}</span>
                              </div>
                            </div>

                            {/* ✅ Preview chips (admin + client combined) */}
                            <AttachmentPreviewChips task={task} />
                          </div>
                        </div>

                        {/* ✅ Actions: Feedback + Schedule + Delete + Expand (bg-white, no shadow) */}
                        <div className="flex items-center gap-2 w-full sm:w-auto mt-3 sm:mt-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFeedback(task);
                            }}
                            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-amber-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition-colors"
                            title="Feedback"
                          >
                            <BadgeInfo size={16} className="text-emerald-600" />
                            <span className="hidden sm:inline">Feedback</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSchedule(task);
                            }}
                            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-orange-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition-colors"
                            title="Schedule"
                          >
                            <Calendar size={16} className="text-orange-600" />
                            <span className="hidden sm:inline">Schedule</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTask(task.id);
                            }}
                            className="p-2 bg-white border border-slate-200 hover:border-rose-300 rounded-xl transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} className="text-rose-600" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTaskExpansion(task.id);
                            }}
                            className="p-2 bg-white border border-slate-200 hover:border-amber-300 rounded-xl transition-colors"
                            title={isExpanded ? "Collapse" : "Expand"}
                          >
                            <ChevronRight
                              size={18}
                              className={`text-amber-600 transition-transform duration-200 ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Description + ✅ Admin + Client Attachments */}
                      {isExpanded && (
                        <div className="border-t border-amber-50 bg-white px-5 py-4">
                          <div className="flex items-start gap-2">
                            <AlignLeft size={16} className="text-amber-600 mt-0.5" />
                            <div className="w-full">
                              <h4
                                className="text-sm font-semibold text-slate-700 mb-2"
                                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                              >
                                Description
                              </h4>
                              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                {task.description}
                              </p>

                              {/* ✅ Admin Attachments */}
                              <AttachmentGroup
                                title="Admin Attachments"
                                icon={<BadgeInfo size={16} className="text-emerald-600" />}
                                items={task.adminAttachments || []}
                              />

                              {/* ✅ Client Attachments */}
                              <AttachmentGroup
                                title="Client Attachments"
                                icon={<User size={16} className="text-blue-600" />}
                                items={task.clientAttachments || []}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="absolute top-0 left-1 w-full z-50 bg-white max-h-full border border-amber-100 rounded-2xl">
          <MyCalendar onclose={handleclose} />
        </div>
      )}
    </div>
  );
};