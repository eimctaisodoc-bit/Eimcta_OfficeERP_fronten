import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  MessageSquare,
  Calendar,
  User,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  RotateCcw,
  Paperclip,
  Info,
  LayoutDashboard,
  X,
  Plus,
  Download,
  FileText
} from 'lucide-react';
import { DprForm } from './dprFrom';

// --- Updated Mock Data ---
const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Finalize Brand Guidelines',
    description: 'Review the latest logo iterations and color palette. Please provide feedback on the secondary font choices and ensure the primary blue aligns with the previous digital campaign.',
    dueDate: '2023-11-25',
    assignee: 'Alex Rivera (Lead Designer)',
    fullDetails: 'The brand guidelines document includes typography, color usage, and iconography. We have also added a section on social media asset templates for your review.',
    currentStatus: 'Pending Review'
  },
  {
    id: '2',
    title: 'Initial Wireframe Approval',
    description: 'Draft wireframes for the mobile dashboard. Check the navigation flow and user profile sections for intuitive usability.',
    dueDate: '2023-11-28',
    assignee: 'Sarah Chen (UX Designer)',
    fullDetails: 'These wireframes represent the core functionality of the MVP. We are specifically looking for feedback on the ease of reaching the "Quick Actions" menu.',
    currentStatus: 'Underway'
  },
  {
    id: '3',
    title: 'API Integration Documentation',
    description: 'Technical specs for the payment gateway. Approved by client on Nov 15.',
    dueDate: '2023-11-20',
    assignee: 'James Wilson (Dev)',
    fullDetails: 'Includes documentation for Stripe and PayPal integrations, webhook security protocols, and error handling maps.',
    currentStatus: 'Completed'
  },
  {
    id: '4',
    title: 'User Testing Script',
    description: 'Scenarios for upcoming usability testing. We need your sign-off on the demographic targets.',
    dueDate: '2023-11-24',
    assignee: 'Alex Rivera (Lead Designer)',
    fullDetails: 'The script covers 5 user journeys. Based on previous feedback, we have simplified the checkout scenario to focus on guest users.',
    currentStatus: 'Revision Needed'
  }
];

export const Staff_task_page = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [isDpr, setIsDpr] = useState(false)

  const toggleExpand = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  const updateTaskStatus = (taskId, statusLabel) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) return { ...task, currentStatus: statusLabel };
      return task;
    });
    setTasks(updatedTasks);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      return task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [tasks, searchTerm]);

  // Styling object for fonts
  const headerStyle = { fontFamily: "'Roboto Slab', serif", fontWeight: 600 };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans p-4 md:p-8">
      {/* Import Roboto Slab for the preview */}


      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-100 ring-4 ring-orange-50">
              <LayoutDashboard size={30} />
            </div>
            <div>
              <h1 className="text-3xl text-slate-900" style={headerStyle}>Staff Task Portal</h1>
              <p className="text-amber-600 text-sm font-semibold tracking-wide">Project Workspace • Active Management</p>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="mb-10 flex items-center gap-4">

          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500"
              size={22}
            />

            <input
              type="text"
              placeholder="Filter tasks..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl 
                 focus:outline-none focus:ring-4 focus:ring-orange-500/10 
                 focus:border-orange-400  transition-all 
                 placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 
               text-white px-5 py-4 rounded-2xl 
               transition-all duration-200 active:scale-95"
            onClick={() => { setIsDpr(true) }}>
            <Plus size={20} />
            <span className="font-medium">DPR</span>
          </button>

        </div>

        {/* Task List */}
        <div className="space-y-5">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => {
              const isExpanded = expandedTaskId === task.id;
              return (
                <div
                  key={task.id}
                  className={`group bg-white border-2 rounded-3xl overflow-hidden transition-all duration-300 ${isExpanded
                    ? 'border-orange-400 shadow-xl shadow-orange-500/5 translate-y-[-2px]'
                    : 'border-slate-100 hover:border-amber-200 hover:shadow-lg hover:shadow-slate-200/50'
                    }`}
                >
                  {/* Card Header */}
                  <div
                    onClick={() => toggleExpand(task.id)}
                    className="p-6 cursor-pointer flex items-center gap-5"
                  >
                    <div className={`p-3 rounded-2xl transition-colors ${isExpanded ? 'bg-orange-100' : 'bg-slate-50'}`}>
                      <ShieldCheck className={isExpanded ? 'text-orange-600' : 'text-slate-400'} size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-xl transition-all ${task.currentStatus === 'Completed' ? 'text-slate-300 font-normal line-through' : 'text-slate-800'}`} style={headerStyle}>
                        {task.title}
                      </h3>
                      {!isExpanded && (
                        <p className="text-sm text-slate-500 truncate mt-1">
                          {task.description}
                        </p>
                      )}
                    </div>
                    <div className={`p-2 rounded-xl transition-all duration-300 ${isExpanded ? 'rotate-180 bg-orange-500 text-white shadow-md' : 'bg-amber-50 text-amber-600'}`}>
                      <ChevronDown size={20} />
                    </div>
                  </div>

                  {/* Expanded Section */}
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1200px] border-t-2 border-slate-50' : 'max-h-0'}`}>
                    <div className="p-6 bg-slate-50/20">
                      <div className="grid grid-cols-1 gap-8 mb-8">
                        <div className=" space-y-6">
                          <div>
                            <label className="text-xs font-black tracking-widest text-amber-600 uppercase mb-2 block">Objective</label>
                            <p className="text-base text-slate-700 leading-relaxed font-medium">{task.description}</p>
                          </div>
                          <div className="bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm">
                            <label className="text-xs font-black tracking-widest text-orange-500 uppercase mb-2 block">Execution Details</label>
                            <p className="text-sm text-slate-600 leading-relaxed italic">
                              {task.fullDetails}
                            </p>
                          </div>
                          <div className="flex items-start gap-9 bg-white w-full">

                            {/* Left Side - Admin */}
                            <div className="bg-white p-4 w-[600px]">
                              <div className="flex items-center gap-2 mb-4">
                                <Paperclip className="w-5 h-5 text-amber-600" />
                                <h3
                                  className="text-lg text-gray-800"
                                  style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
                                >
                                  Attachment (Admin)
                                </h3>
                              </div>

                              <div className="border border-slate-100 rounded-xl hover:bg-slate-100 cursor-pointer p-3 flex items-center justify-between transition">
                                <div className="flex items-center gap-3">
                                  <FileText className="w-4 h-4 text-blue-500" />
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-800">
                                      document.pdf
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      2.4 MB
                                    </span>
                                  </div>
                                </div>

                                <button className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1.5 rounded-md transition">
                                  <Download className="w-4 h-4" />
                                  Download
                                </button>
                              </div>
                            </div>

                            {/* Vertical Divider */}
                            <div className="w-px bg-slate-200 self-stretch"></div>

                            {/* Right Side - You */}
                            <div className="bg-white p-4 w-[600px]">
                              <div className="flex items-center gap-2 mb-4">
                                <Paperclip className="w-5 h-5 text-amber-600" />
                                <h3
                                  className="text-lg text-gray-800"
                                  style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
                                >
                                  Attachment (You)
                                </h3>
                              </div>

                              <div className="border border-slate-100 rounded-xl hover:bg-slate-100 cursor-pointer p-3 flex items-center justify-between transition">
                                <div className="flex items-center gap-3">
                                  <FileText className="w-4 h-4 text-blue-500" />
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-800">
                                      document.pdf
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      2.4 MB
                                    </span>
                                  </div>
                                </div>

                                <button className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1.5 rounded-md transition">
                                  <Download className="w-4 h-4" />
                                  Download
                                </button>
                              </div>
                            </div>

                          </div>

                          <div className="space-y-4">
                            <div className="bg-amber-50/50 p-5 rounded-2xl border-2 border-amber-100">
                              <label className="text-xs font-black tracking-widest text-amber-700 uppercase mb-3 block">Metadata</label>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                  <User size={18} className="text-orange-500" />
                                  {task.assignee}
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                  <Calendar size={18} className="text-amber-500" />
                                  {task.dueDate}
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>

                      {/* Controls Row */}
                      <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-slate-100">
                        <button
                          onClick={() => updateTaskStatus(task.id, 'Completed')
                            
                          }
                          className={`flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-black transition-all border-2 shadow-sm ${task.currentStatus === 'Completed'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white'
                            }`}
                        >
                          <ThumbsUp size={18} className={task.currentStatus === 'Completed' ? 'text-white' : 'text-emerald-500'} /> COMPLETE
                        </button>

                        <button
                          onClick={() => updateTaskStatus(task.id, 'Revision Needed')}
                          className={`flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-black transition-all border-2 shadow-sm ${task.currentStatus === 'Revision Needed'
                            ? 'bg-orange-600 text-white border-orange-600 shadow-orange-100'
                            : 'bg-white text-orange-600 border-orange-100 hover:bg-orange-600 hover:text-white'
                            }`}
                        >
                          <ThumbsDown size={18} className={task.currentStatus === 'Revision Needed' ? 'text-white' : 'text-orange-500'} /> REJECT
                        </button>

                        <button
                          onClick={() => updateTaskStatus(task.id, 'Underway')}
                          className={`flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-black transition-all border-2 shadow-sm ${task.currentStatus === 'Underway'
                            ? 'bg-slate-800 text-white border-slate-800'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                          <RotateCcw size={18} className={task.currentStatus === 'Underway' ? 'text-white' : 'text-amber-500'} /> INCOMPLETE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-slate-50 border-4 border-dashed border-slate-100 rounded-3xl p-16 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-amber-200 mx-auto mb-6 shadow-inner">
                <Info size={40} />
              </div>
              <h3 className="text-slate-800 font-bold mb-2 text-xl" style={headerStyle}>No Tasks Found</h3>
              <p className="text-slate-400 text-sm">Refine your search parameters to find specific tasks.</p>
            </div>
          )}
        </div>


      </div>
      <DprForm isDpr={isDpr} setIsDpr={setIsDpr} />
    </div>
  );
}