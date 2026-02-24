import React, { useEffect, useState } from 'react';
import {
  Calendar,
  User,
  Briefcase,
  FileText,
  Plus,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Info,
  ChevronDown,
  Building2,
  Hash,
  FileCheck,
  Tag,
  MapPin,
  DollarSign,
  CalendarDays,
  Users,
  BriefcaseIcon,
  Container
} from 'lucide-react';
import Select from 'react-select'
import { motion, AnimatePresence } from 'framer-motion';

export const DprForm = ({ isDpr, setIsDpr }) => {
  console.log('From dpr', isDpr)
  // State for Header/General Info
  const [dprInfo, setDprInfo] = useState({
    dprNo: '022',
    dprDate: '2022-12-07',
    employeeName: '',
    clientName: '',
    contractRef: '',
    jobCardRef: '',
    jobType: ''
  });

  // State for Available Jobs
  const [availableJobs, setAvailableJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    location: '',
    salary: '',
    type: 'Full-time',
    postedDate: ''
  });

  // State for Checkboxes (Job Categories)
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otherJobs, setOthersJobs] = useState([])

  // State for Activities Table
  const [activities, setActivities] = useState([
    {
      id: crypto.randomUUID(),
      description: '',
      actionParty: '',
      targetDate: '',
      completionDate: '',
      delayedDate: '',
      totalDelay: 0
    }
  ]);

  const taskOptions = [
    "Consultancy", "Audit", "Certification", "Training",
    "Meeting", "Inspection", "Investigation",
    "Management Review Meeting", "Improvement Program",
    "Document Writing", "Others"
  ];

  const jobtype = [
    { value: "All", label: "All Types" },
    { value: "Permanent", label: "Permanent" },
    { value: "Contract", label: "Contract" },
    { value: "Intern", label: "Intern" }
  ];

  // Sample available jobs
  useEffect(() => {
    setAvailableJobs([
      { id: 1, title: 'Senior Software Engineer', department: 'Engineering', location: 'New York', salary: '$120k - $150k', type: 'Full-time', postedDate: '2024-01-15' },
      { id: 2, title: 'Product Manager', department: 'Product', location: 'San Francisco', salary: '$130k - $160k', type: 'Full-time', postedDate: '2024-01-20' },
      { id: 3, title: 'UX Designer', department: 'Design', location: 'Remote', salary: '$90k - $120k', type: 'Contract', postedDate: '2024-01-25' },
    ]);
  }, []);

  // Logic: Are inputs enabled?
  const isInputEnabled = selectedTasks.length > 0;

  const toggleTask = (task) => {
    if (task === 'Others') {
      setIsModalOpen(true);
      return;
    }

    setSelectedTasks(prev =>
      prev.includes(task)
        ? prev.filter(t => t !== task)
        : [...prev, task]
    );
  };

  console.log(selectedJob)
  const handleAdd = (val) => {
    const trimmed = val.trim();
    if (!trimmed) return;

    setSelectedTasks(prev => {
      if (prev.includes(trimmed)) return prev;
      return [...prev, trimmed];
    });

    setIsModalOpen(false);
  };
  console.log(isInputEnabled, selectedTasks)
  const updateActivity = (id, field, value) => {
    setActivities(prev => prev.map(act => {
      if (act.id === id) {
        const updatedAct = { ...act, [field]: value };

        // Calculate Total Delay if target and completion dates exist
        if (field === 'targetDate' || field === 'completionDate') {
          const target = new Date(updatedAct.targetDate);
          const completion = new Date(updatedAct.completionDate);

          if (!isNaN(target) && !isNaN(completion)) {
            const diffTime = completion - target;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            updatedAct.totalDelay = diffDays > 0 ? diffDays : 0;
          }
        }
        return updatedAct;
      }
      return act;
    }));
  };

  const addActivity = () => {
    setActivities([...activities, {
      id: crypto.randomUUID(),
      description: '',
      actionParty: '',
      targetDate: '',
      completionDate: '',
      delayedDate: '',
      totalDelay: 0
    }]);
  };

  const removeActivity = (id) => {
    if (activities.length > 1) {
      setActivities(activities.filter(a => a.id !== id));
    }
  };


  const customSelectStyles = () => ({
    container: (base) => ({
      ...base,
      width: "100%",
    }),
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#f97316" : "#e2e8f0",
      borderRadius: "0.75rem",
      padding: "4px 8px",
      minHeight: "48px",
      fontSize: "14px",
      fontWeight: "400",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(249, 115, 22, 0.1)" : "none",
      "&:hover": { borderColor: "#f97316" },
      transition: "all 0.2s ease",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#f97316" : state.isFocused ? "#fff7ed" : "white",
      color: state.isSelected ? "white" : "#1e293b",
      padding: "10px 12px",
      fontSize: "14px",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.75rem",
      border: "1px solid #e2e8f0",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
      overflow: "hidden",
    }),
    placeholder: (base) => ({ ...base, color: "#94a3b8", fontSize: "14px" }),
  });

  // Professional font stack
  const fontStyle = { fontFamily: "'Roboto', sans-serif" };
  console.log('DPr', isDpr)
  if (!isDpr) return
  return (
    <AnimatePresence>


      <motion.div
    >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/80 backdrop:blur-sm transition-opacity duration-300 `}
          style={{ zIndex: 9998 }}
        // onClick={handleClose}
        />

        {/* Modal Container */}
        <div
          className={`fixed inset-0 flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${false ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          style={{ zIndex: 9999 }}
        >
          {/* Modal Content - Your existing component */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Daily Performance Report</h2>
              </div>
              <button
                onClick={() => {
                  setIsDpr(false)
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(95vh - 70px)' }}>
              <div className="p-3 sm:p-4 md:p-6 lg:p-8" style={fontStyle}>
                <div className="max-w-7xl mx-auto">
                  {/* Header */}
                  <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-slate-900">
                        Daily Performance Report
                      </h1>
                      <p className="text-sm sm:text-base text-slate-500 flex items-center gap-2">
                        <Clock size={16} />
                        <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </p>
                    </div>
                    <div className="flex gap-4 sm:gap-6 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-slate-200 self-start sm:self-auto">
                      <div className="text-right">
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">DPR No.</p>
                        <p className="font-mono text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">{dprInfo.dprNo}</p>
                      </div>
                      <div className="text-right border-l border-slate-200 pl-4 sm:pl-6">
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">DPR Date</p>
                        <p className="font-mono text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">{dprInfo.dprDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Main Card */}
                  <div className="bg-white rounded-2xl lg:rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
                    {/* Progress Bar */}
                    <div className="h-1 w-full bg-slate-100">
                      <div
                        className="h-full bg-orange-500 transition-all duration-500"
                        style={{ width: `${(selectedTasks.length / taskOptions.length) * 100}%` }}
                      />
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 lg:space-y-10">

                      {/* Section 1: Available Jobs */}
                      <section>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                          <div className="bg-orange-50 p-2 rounded-lg">
                            <BriefcaseIcon className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Available Jobs</h2>
                            <p className="text-xs sm:text-sm text-slate-500">Select or add a job position</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:gap-6">
                          {/* Job Selection */}
                          <div className="w-full">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                              Select Job
                            </label>
                            <Select options={jobtype} styles={customSelectStyles()} />
                            {/* <select className="w-full px-4 py-2.5 sm:py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-sm">
                            {jobtype.map(job => (
                              <option key={job.value} value={job.value}>{job.label}</option>
                            ))}
                          </select> */}
                          </div>
                        </div>
                      </section>

                      {/* Section 2: Job Categories */}
                      <section>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                          <div className="bg-orange-50 p-2 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Job Categories</h2>
                            <p className="text-xs sm:text-sm text-slate-500">Select all applicable job types</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                          {taskOptions.map(task => (
                            <button
                              key={task}
                              onClick={() => toggleTask(task)}
                              className={`group relative flex items-center p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ${selectedTasks.includes(task)
                                ? 'bg-orange-50 border-orange-500'
                                : 'bg-white border-slate-200 hover:border-orange-200 hover:bg-orange-50/30'
                                }`}
                            >
                              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 mr-2 sm:mr-3 flex items-center justify-center transition-all ${selectedTasks.includes(task)
                                ? 'bg-orange-500 border-orange-500'
                                : 'bg-white border-slate-300 group-hover:border-orange-300'
                                }`}>
                                {selectedTasks.includes(task) && <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                              </div>
                              <span className={`text-xs sm:text-sm font-medium truncate ${selectedTasks.includes(task) ? 'text-orange-700' : 'text-slate-600'
                                }`}>
                                {task}
                              </span>
                            </button>
                          ))}
                        </div>

                        {!isInputEnabled && (
                          <div className="mt-4 flex items-center gap-2 sm:gap-3 text-amber-700 bg-amber-50 p-3 sm:p-4 rounded-xl border border-amber-200 text-xs sm:text-sm">
                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="font-medium">Please select at least one job category</span>
                          </div>
                        )}
                      </section>

                      {/* Section 3: Professional Details */}
                      <section className={!isInputEnabled ? 'opacity-30 pointer-events-none' : 'transition-all duration-500'}>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                          <div className="bg-orange-50 p-2 rounded-lg">
                            <User className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Professional Information</h2>
                            <p className="text-xs sm:text-sm text-slate-500">Enter the key details for this report</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                          <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                              <User size={14} /> Employee Name
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2.5 sm:py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-sm"
                              placeholder="John Doe"
                              value={dprInfo.employeeName}
                              onChange={(e) => setDprInfo({ ...dprInfo, employeeName: e.target.value })}
                            />
                          </div>

                          <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                              <Building2 size={14} /> Client Name
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2.5 sm:py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-sm"
                              placeholder="Client Corp."
                              value={dprInfo.clientName}
                              onChange={(e) => setDprInfo({ ...dprInfo, clientName: e.target.value })}
                            />
                          </div>

                          <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                              <Hash size={14} /> Contract Reference
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2.5 sm:py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-sm"
                              placeholder="CTR-2024-001"
                              value={dprInfo.contractRef}
                              onChange={(e) => setDprInfo({ ...dprInfo, contractRef: e.target.value })}
                            />
                          </div>

                          <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                              <FileCheck size={14} /> Job Card Reference
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2.5 sm:py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-sm"
                              placeholder="JC-2024-089"
                              value={dprInfo.jobCardRef}
                              onChange={(e) => setDprInfo({ ...dprInfo, jobCardRef: e.target.value })}
                            />
                          </div>

                          <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                              <Tag size={14} /> Job Type
                            </label>

                            <Select options={jobtype} styles={customSelectStyles()} />
                          </div>
                        </div>
                      </section>

                      {/* Section 4: Activities Table */}
                      <section className={!isInputEnabled ? 'opacity-30 pointer-events-none' : 'transition-all duration-500'}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                          <div className="flex items-center gap-3">
                            <div className="bg-orange-50 p-2 rounded-lg">
                              <FileText className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Activity Log</h2>
                              <p className="text-xs sm:text-sm text-slate-500">Track your daily tasks and deadlines</p>
                            </div>
                          </div>
                          <button
                            onClick={addActivity}
                            className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 active:scale-95 transition-all text-sm font-semibold"
                          >
                            <Plus className="w-4 h-4" /> Add Activity
                          </button>
                        </div>

                        {/* Table - Horizontal scroll on mobile */}
                        <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px] lg:min-w-0 text-left">
                              <thead>
                                <tr className="bg-slate-50 border-b-2 border-slate-200">
                                  <th className="p-3 sm:p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                                  <th className="p-3 sm:p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action Party</th>
                                  <th className="p-3 sm:p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Date</th>
                                  <th className="p-3 sm:p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Completion</th>
                                  <th className="p-3 sm:p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Delayed</th>
                                  <th className="p-3 sm:p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Total Days</th>
                                  <th className="p-3 sm:p-4 w-10 sm:w-12"></th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {activities.map((activity) => (
                                  <tr key={activity.id} className="hover:bg-orange-50/30 transition-colors">
                                    <td className="p-2 sm:p-3">
                                      <textarea
                                        className="w-full p-2 sm:p-3 text-xs sm:text-sm border border-transparent hover:border-slate-200 focus:border-orange-400 bg-slate-50 rounded-lg sm:rounded-xl outline-none resize-none transition-all"
                                        placeholder="Describe activity..."
                                        rows="2"
                                        value={activity.description}
                                        onChange={(e) => updateActivity(activity.id, 'description', e.target.value)}
                                      />
                                    </td>
                                    <td className="p-2 sm:p-3">
                                      <input
                                        type="text"
                                        className="w-full p-2 sm:p-3 text-xs sm:text-sm border border-transparent hover:border-slate-200 focus:border-orange-400 bg-slate-50 rounded-lg sm:rounded-xl outline-none transition-all"
                                        placeholder="Responsible"
                                        value={activity.actionParty}
                                        onChange={(e) => updateActivity(activity.id, 'actionParty', e.target.value)}
                                      />
                                    </td>
                                    <td className="p-2 sm:p-3">
                                      <input
                                        type="date"
                                        className="w-full p-2 sm:p-3 text-xs sm:text-sm border border-transparent hover:border-slate-200 focus:border-orange-400 bg-slate-50 rounded-lg sm:rounded-xl outline-none transition-all"
                                        value={activity.targetDate}
                                        onChange={(e) => updateActivity(activity.id, 'targetDate', e.target.value)}
                                      />
                                    </td>
                                    <td className="p-2 sm:p-3">
                                      <input
                                        type="date"
                                        className="w-full p-2 sm:p-3 text-xs sm:text-sm border border-transparent hover:border-slate-200 focus:border-orange-400 bg-slate-50 rounded-lg sm:rounded-xl outline-none transition-all"
                                        value={activity.completionDate}
                                        onChange={(e) => updateActivity(activity.id, 'completionDate', e.target.value)}
                                      />
                                    </td>
                                    <td className="p-2 sm:p-3">
                                      <input
                                        type="date"
                                        className="w-full p-2 sm:p-3 text-xs sm:text-sm border border-transparent hover:border-slate-200 focus:border-orange-400 bg-slate-50 rounded-lg sm:rounded-xl outline-none transition-all"
                                        value={activity.delayedDate}
                                        onChange={(e) => updateActivity(activity.id, 'delayedDate', e.target.value)}
                                      />
                                    </td>
                                    <td className="p-2 sm:p-3">
                                      <div className={`flex flex-col items-center justify-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-semibold ${activity.totalDelay > 0
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'bg-emerald-100 text-emerald-700'
                                        }`}>
                                        <span className="text-sm sm:text-base">{activity.totalDelay}</span>
                                        <span className="text-[8px] sm:text-[10px] uppercase tracking-tight">days</span>
                                      </div>
                                    </td>
                                    <td className="p-2 sm:p-3">
                                      <button
                                        onClick={() => removeActivity(activity.id)}
                                        className="p-1.5 sm:p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                                      >
                                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </section>

                      {/* Submit Section */}
                      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t-2 border-slate-100">
                        <button
                          // onClick={handleSubmit}
                          // disabled={!isInputEnabled}
                          className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-white font-semibold tracking-wide transition-all ${false
                            ? 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg active:scale-95'
                            : 'bg-slate-300 cursor-not-allowed'
                            }`}
                        >
                          Submit Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <OthersModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onAdd={handleAdd}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>


  );
};










const OthersModal = ({ isOpen, onClose, onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="h-1.5 bg-orange-500" />

        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-orange-50 p-2 rounded-lg">
                <Plus size={18} className="text-orange-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-800">Add Custom Job Type</h3>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
              <X size={18} className="text-slate-400" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                Job Type Name
              </label>
              <input
                autoFocus
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-sm"
                placeholder="e.g., Senior Consultant"
              />
            </div>

            <div className="flex items-start gap-2 bg-blue-50 p-3 sm:p-4 rounded-xl text-blue-700">
              <Info size={16} className="shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm">This will add a custom entry to your job selection list.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-5 sm:mt-6">
            <button
              onClick={onClose}
              className="w-full sm:flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onAdd(inputValue);
                setInputValue('');
              }}
              disabled={!inputValue.trim()}
              className="w-full sm:flex-[2] px-4 py-3 bg-orange-500 rounded-xl text-sm font-semibold text-white hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Job Type
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};