import React, { useState, useRef, useEffect } from 'react';
import {
  Plus, Trash2, Paperclip, CheckSquare, Circle, X, FileText, Clock, FileSpreadsheet,
  FileImage, FileAudio, FileVideo, AlignLeft, Type, Search, Filter, MoreVertical, Layers,
  LayoutGrid, ChevronRight, Menu, User, Briefcase, BadgeInfo, Loader2, ChevronLeft, File,
  FileType, FileCode, FileArchive, Sparkles, Database, Shield, Calendar, AlertTriangle, Upload

} from 'lucide-react';
import Select from 'react-select'
import { CreateTask } from './createTask';
import MyCalendar from '../../calendara';
export const Admin_task_page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[isTaskOpen, setIsTaskOpen]=useState(false)

  const handleTaskClose=()=>{
    setIsTaskOpen(false)
  }
  const handleclose = () => {
    setIsModalOpen(false);
  }
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Quarterly Marketing Assets",
      description: "Prepare the final assets for the Q1 campaign including video teasers and audio scripts. This involves coordinating with the design team and ensuring all assets meet brand guidelines.",
      date: "2024-12-28",
      completed: false,
      priority: 'high',
      assignee: { username: "alex_dev", role: "Admin", position: "Lead Designer" },
      createdBy: "sarah_manager",
      createdDate: "2024-11-15",
      attachments: [
        { name: "campaign_brief.pdf", type: "pdf", size: "1.2 MB" },
        { name: "budget.xlsx", type: "excel", size: "850 KB" },
        { name: "brand_guidelines.pptx", type: "ppt", size: "2.1 MB" },
        { name: "mockup.jpg", type: "image", size: "3.4 MB" }
      ]
    },
    {
      id: 2,
      title: "Website Redesign Mockups",
      description: "Create initial mockups for the homepage redesign focusing on mobile-first approach and accessibility improvements.",
      date: "2024-12-20",
      completed: true,
      priority: 'medium',
      assignee: { username: "mike_design", role: "Editor", position: "UI Designer" },
      createdBy: "jane_lead",
      createdDate: "2024-11-10",
      attachments: [
        { name: "wireframes.fig", type: "figma", size: "4.2 MB" },
        { name: "requirements.doc", type: "word", size: "890 KB" }
      ]
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date: '',
    username: '',
    role: '',
    position: '',
    attachments: [],
    priority: 'medium'
  });

  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTask, setExpandedTask] = useState(null);

  // Simulated Backend Fetch for User Info
  const fetchUserData = async () => {
    setIsLoadingBackend(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUserData = {
      username: "sarah_j",
      role: "Editor",
      position: "Senior Project Manager"
    };

    setNewTask(prev => ({
      ...prev,
      username: mockUserData.username,
      role: mockUserData.role,
      position: mockUserData.position
    }));
    setIsLoadingBackend(false);
  };

  useEffect(() => {
    if (isAdding) {
      fetchUserData();
    }
  }, [isAdding]);

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileMetadata = (fileName, fileType = '') => {
    const ext = fileName.split('.').pop().toLowerCase();
    const type = fileType || ext;

    const iconMap = {
      pdf: { icon: <FileText size={14} />, color: 'text-rose-500 bg-rose-50', label: 'PDF' },
      excel: { icon: <FileSpreadsheet size={14} />, color: 'text-emerald-500 bg-emerald-50', label: 'Excel' },
      xlsx: { icon: <FileSpreadsheet size={14} />, color: 'text-emerald-500 bg-emerald-50', label: 'Excel' },
      xls: { icon: <FileSpreadsheet size={14} />, color: 'text-emerald-500 bg-emerald-50', label: 'Excel' },
      word: { icon: <FileText size={14} />, color: 'text-blue-500 bg-blue-50', label: 'Word' },
      doc: { icon: <FileText size={14} />, color: 'text-blue-500 bg-blue-50', label: 'Word' },
      docx: { icon: <FileText size={14} />, color: 'text-blue-500 bg-blue-50', label: 'Word' },
      ppt: { icon: <File type="ppt" size={14} />, color: 'text-orange-500 bg-orange-50', label: 'PPT' },
      pptx: { icon: <File type="ppt" size={14} />, color: 'text-orange-500 bg-orange-50', label: 'PPT' },
      txt: { icon: <FileType size={14} />, color: 'text-slate-500 bg-slate-50', label: 'Text' },
      image: { icon: <FileImage size={14} />, color: 'text-amber-500 bg-amber-50', label: 'Image' },
      jpg: { icon: <FileImage size={14} />, color: 'text-amber-500 bg-amber-50', label: 'Image' },
      jpeg: { icon: <FileImage size={14} />, color: 'text-amber-500 bg-amber-50', label: 'Image' },
      png: { icon: <FileImage size={14} />, color: 'text-amber-500 bg-amber-50', label: 'Image' },
      gif: { icon: <FileImage size={14} />, color: 'text-amber-500 bg-amber-50', label: 'Image' },
      audio: { icon: <FileAudio size={14} />, color: 'text-violet-500 bg-violet-50', label: 'Audio' },
      mp3: { icon: <FileAudio size={14} />, color: 'text-violet-500 bg-violet-50', label: 'Audio' },
      wav: { icon: <FileAudio size={14} />, color: 'text-violet-500 bg-violet-50', label: 'Audio' },
      video: { icon: <FileVideo size={14} />, color: 'text-purple-500 bg-purple-50', label: 'Video' },
      mp4: { icon: <FileVideo size={14} />, color: 'text-purple-500 bg-purple-50', label: 'Video' },
      mov: { icon: <FileVideo size={14} />, color: 'text-purple-500 bg-purple-50', label: 'Video' },
    };

    return iconMap[type] || { icon: <File size={14} />, color: 'text-slate-400 bg-slate-50', label: 'File' };
  };

  const getPriorityBadge = (priority) => {
    const config = {
      high: { color: 'bg-red-100 text-red-700 border-red-200', label: 'High' },
      medium: { color: 'bg-amber-100 text-amber-700 border-amber-200', label: 'Medium' },
      low: { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Low' }
    };
    return config[priority] || config.medium;
  };




  const removeTask = (id) => setTasks(tasks.filter(task => task.id !== id));
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };



  const toggleTaskExpansion = (id) => {
    setExpandedTask(expandedTask === id ? null : id);
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };


  return (
    <div className="min-h-screen relative bg-white text-slate-900 font-sans antialiased selection:bg-amber-100 selection:text-amber-700">
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
                Remaining: <span className="text-orange-600 font-bold">{tasks.filter(t => !t.completed).length} tasks</span>
              </p>
            </div>

            <div className="flex  flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div>
                <button className="flex items-center justify-center gap-2 bg-white border 
                 border-amber-100 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-sm
                  hover:border-amber-400 hover:bg-amber-50 transition-all shadow-sm 
                  active:scale-95" onClick={() => setIsModalOpen(true)}>
                  <Calendar size={16} /> <span className="hidden md:inline">Calendar</span>
                </button>
              </div>



              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={16} />
                <input
                  type="text"
                  placeholder="Quick search..."
                  className="pl-9 pr-4 py-2.5 bg-white border border-amber-100 rounded-xl text-sm focus:ring-2 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all w-full sm:w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>

                <button
                  onClick={() => setIsTaskOpen(true)}
                  className="flex items-center justify-center gap-1.5 bg-orange-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 active:scale-95 whitespace-nowrap"
                >
                  <Plus size={16} /> Create Task
                </button>

                {
                  isTaskOpen && (
                    <div className='absolute top-0 left-1 w-full z-50  bg-pink-500 max-h-full'>
                      <CreateTask onclose={handleTaskClose} />
                    </div>)
                }

              </div>
            </div>
          </header>

          {/* Add Task Modal */}
          {isAdding && (
            <>

            </>
          )}

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
                {filteredTasks.map(task => {
                  const priorityBadge = getPriorityBadge(task.priority);
                  const isExpanded = expandedTask === task.id;

                  return (
                    <div
                      key={task.id}
                      className={`group relative bg-white rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden shadow-sm hover:shadow-md cursor-pointer ${task.completed ? 'opacity-60 grayscale-[0.5] border-amber-50 bg-slate-50/50' : 'border-amber-100 hover:border-amber-200'}`}
                      onClick={() => toggleTaskExpansion(task.id)}
                    >
                      <div className="p-5 flex flex-col sm:flex-row items-start gap-4">
                        <div className="flex items-start gap-4 w-full sm:w-auto">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTask(task.id);
                            }}
                            className={`mt-0.5 shrink-0 flex items-center justify-center w-8 h-8 rounded-xl transition-all ${task.completed ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-300 hover:text-amber-600 border border-amber-100'}`}
                          >
                            {task.completed ? <CheckSquare size={18} /> : <div className="w-3.5 h-3.5 rounded-md border-2 border-current" />}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${priorityBadge.color}`}>
                                <Circle size={8} fill="currentColor" /> {priorityBadge.label}
                              </div>
                            </div>

                            <h3
                              className={`text-lg font-bold tracking-tight ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}
                              style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
                            >
                              {task.title}
                            </h3>

                            {/* Task Metadata Row */}
                            <div className="flex flex-wrap items-center gap-4 mt-3">
                              {/* Deadline */}
                              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                <Clock size={12} className="text-amber-500" />
                                <span className="font-semibold">Deadline:</span>
                                <span className="font-bold text-slate-700">{formatDate(task.date)}</span>
                              </div>

                              {/* Task Holder */}
                              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                <User size={12} className="text-blue-500" />
                                <span className="font-semibold">Assignee:</span>
                                <span className="font-bold text-slate-700">@{task.assignee?.username}</span>
                                <span className="text-slate-400">• {task.assignee?.role}</span>
                              </div>

                              {/* Created By */}
                              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                <BadgeInfo size={12} className="text-emerald-500" />
                                <span className="font-semibold">Created by:</span>
                                <span className="font-bold text-slate-700">@{task.createdBy}</span>
                                <span className="text-slate-400">• {formatDate(task.createdDate)}</span>
                              </div>
                            </div>

                            {/* File Attachments */}
                            {task.attachments && task.attachments.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {task.attachments.slice(0, 3).map((file, index) => {
                                  const metadata = getFileMetadata(file.name, file.type);
                                  return (
                                    <div
                                      key={index}
                                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${metadata.color} border-opacity-30 text-xs font-medium`}
                                    >
                                      {metadata.icon}
                                      <span className="truncate max-w-[100px]">{file.name.split('.')[0]}</span>
                                      <span className="text-[10px] opacity-70">.{file.name.split('.').pop()}</span>
                                    </div>
                                  );
                                })}
                                {task.attachments.length > 3 && (
                                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600">
                                    +{task.attachments.length - 3} more
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto mt-3 sm:mt-0">
                          <ChevronRight
                            size={20}
                            className={`text-slate-300 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTask(task.id);
                            }}
                            className="p-2 text-slate-300 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all ml-auto"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Description */}
                      {isExpanded && (
                        <div className="border-t border-amber-50 bg-amber-50/30 px-5 py-4 animate-in slide-in-from-top duration-200">
                          <div className="flex items-start gap-2">
                            <AlignLeft size={16} className="text-amber-500 mt-0.5" />
                            <div>
                              <h4
                                className="text-sm font-semibold text-slate-700 mb-2"
                                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                              >
                                Description
                              </h4>
                              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                {task.description}
                              </p>

                              {/* Full Attachment List */}
                              {task.attachments && task.attachments.length > 0 && (
                                <div className="mt-4">
                                  <h4
                                    className="text-sm font-semibold text-slate-700 mb-2"
                                    style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
                                  >
                                    Attachments ({task.attachments.length})
                                  </h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {task.attachments.map((file, index) => {
                                      const metadata = getFileMetadata(file.name, file.type);
                                      return (
                                        <div
                                          key={index}
                                          className="flex items-center justify-between p-3 bg-white rounded-xl border border-amber-100 hover:border-amber-200 transition-colors"
                                        >
                                          <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${metadata.color} bg-opacity-20`}>
                                              {metadata.icon}
                                            </div>
                                            <div>
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
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
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
      {
        isModalOpen && (
          <div className='absolute top-0 left-1 w-full z-50  bg-pink-500 max-h-full'>
            <MyCalendar onclose={handleclose} />
          </div>)
      }
      {/* <CreateTask /> */}
    </div>
  );
};