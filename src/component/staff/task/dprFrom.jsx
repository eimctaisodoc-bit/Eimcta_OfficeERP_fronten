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
  Container,
  PenTool,
  ClipboardCheck,
  Signature,
  Clock3,
  Map,
  Download,
  Printer,
  Save,
  CheckSquare,
  FileSignature,
  UserCheck,
  Eye,
  PenSquare,
  Award,
  BookOpen,
  Presentation,
  BarChart,
  Database,
  Users2,
  Globe,
  Target,
  Layers,
  CheckCircle,
  FileOutput,
  Check,
  SaveAll
} from 'lucide-react';
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';

export const DprForm = ({ isDpr, setIsDpr }) => {
  console.log('From dpr', isDpr);

  // State for Header/General Info
  const [dprInfo, setDprInfo] = useState({
    dprNo: '022',
    dprDate: '2022-12-07',
    employeeName: '',
    contractRef: '',
    scopeOfServices: '',
    jobCardRef: '',
    organizationName: 'Everest International Management Consultancy & Training Agency Pvt. Ltd.',
    registrationNo: '280667/078/079'
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
  const [otherJobs, setOthersJobs] = useState([]);

  // State for Activities Table
  const [activities, setActivities] = useState([
    {
      id: crypto.randomUUID(),
      sn: 1,
      timeFrom: '',
      timeTo: '',
      description: '',
      clientLocation: '',
      entryTime: '',
      exitTime: '',
      totalTravelTime: 0,
      evidence: {
        jc: false,
        mom: false,
        obs: false,
        af: false
      }
    }
  ]);

  // State for Signature Section
  const [signatureInfo, setSignatureInfo] = useState({
    signature: '',
    role: 'Consultant',
    preparedBy: '',
    reviewedBy: '',
    approvedBy: '',
    closingNote: '',
    consultantAcceptance: '',
    consultantAcceptanceList: []
  });

  // State for Evidence Verification
  const [evidenceVerified, setEvidenceVerified] = useState(false);

  // Predefined time slots
  const timeSlots = [
    '9:00 AM – 10:00 AM',
    '10:00 AM – 11:00 AM',
    '11:00 AM – 12:00 PM',
    '12:00 PM – 1:00 PM',
    '1:00 PM – 2:00 PM',
    '2:00 PM – 3:00 PM',
    '3:00 PM – 4:00 PM',
    '4:00 PM – 5:00 PM',
    '5:00 PM – 6:00 PM'
  ];

  const taskOptions = [
    "Consultancy", "Audit", "Certification", "Training",
    "Meeting", "Inspection", "Investigation",
    "Management Review Meeting", "Improvement Program",
    "Document Writing", "Document Preparation", "Presentation",
    "EOMS Observation", "Data Management", "Good Parenting",
    "Cross Check", "SAC", "UBE", "CPD", "Olympiad",
    "Presentation MoM", "IOmM", "IOmM Owners"
  ];

  const roleOptions = [
    { value: "Consultant", label: "Consultant" },
    { value: "Auditor", label: "Auditor" }
  ];

  const preparedByOptions = [
    { value: "HR", label: "HR" },
    { value: "Admin", label: "Admin" }
  ];

  const reviewedByOptions = [
    { value: "Operation Manager", label: "Operation Manager" },
    { value: "HoD", label: "HoD" }
  ];

  const approvedByOptions = [
    { value: "MD", label: "MD" },
    { value: "Province Head", label: "Province Head" }
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

  console.log(selectedJob);

  const handleAdd = (val) => {
    const trimmed = val.trim();
    if (!trimmed) return;

    setSelectedTasks(prev => {
      if (prev.includes(trimmed)) return prev;
      return [...prev, trimmed];
    });

    setIsModalOpen(false);
  };

  // console.log(isInputEnabled, selectedTasks);

  

  const updateEvidence = (id, evidenceType) => {
    setActivities(prev => prev.map(act => {
      if (act.id === id) {
        return {
          ...act,
          evidence: {
            ...act.evidence,
            [evidenceType]: !act.evidence[evidenceType]
          }
        };
      }
      return act;
    }));
  };

  const addActivity = () => {
    setActivities([...activities, {
      id: crypto.randomUUID(),
      sn: activities.length + 1,
      timeFrom: '',
      timeTo: '',
      description: '',
      clientLocation: '',
      entryTime: '',
      exitTime: '',
      totalTravelTime: 0,
      evidence: {
        jc: false,
        mom: false,
        obs: false,
        af: false
      }
    }]);
  };

  const removeActivity = (id) => {
    if (activities.length > 1) {
      setActivities(activities.filter(a => a.id !== id));
    }
  };

  // Handle consultant acceptance entry
  const handleConsultantAcceptanceKeyDown = (e) => {
    if (e.key === 'Enter' && signatureInfo.consultantAcceptance.trim()) {
      e.preventDefault();
      setSignatureInfo(prev => ({
        ...prev,
        consultantAcceptanceList: [...prev.consultantAcceptanceList, prev.consultantAcceptance.trim()],
        consultantAcceptance: ''
      }));
    }
  };

  const removeConsultantAcceptanceItem = (index) => {
    setSignatureInfo(prev => ({
      ...prev,
      consultantAcceptanceList: prev.consultantAcceptanceList.filter((_, i) => i !== index)
    }));
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
  const fontStyle = { fontFamily: "'Roboto Slab', serif", fontWeight: 600 };
  console.log('DPr', isDpr);

  if (!isDpr) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
          style={{ zIndex: 9998 }}
        />

        {/* Modal Container */}
        <div
          className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 transition-all duration-300"
          style={{ zIndex: 9999 }}
        >
          {/* Modal Content */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Daily Performance Report</h2>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Printer className="w-5 h-5 text-slate-500" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-slate-500" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Save className="w-5 h-5 text-slate-500" />
                </button>
                <button
                  onClick={() => setIsDpr(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(95vh - 70px)' }}>
              <div className="p-3 sm:p-4 md:p-6 lg:p-8" style={fontStyle}>
                <div className="max-w-7xl mx-auto">
                  {/* Organization Header */}


                  {/* Header Info */}
                  <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

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
                      {/* Section 1: Employee & Work Details */}
                      <section>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                          <div className="bg-orange-50 p-2 rounded-lg">
                            <User className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Employee & Work Details</h2>
                            <p className="text-xs sm:text-sm text-slate-500">Basic information about the work</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                          <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                              <User size={14} /> Name of Employee
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
                              <Hash size={14} /> Contract Ref.
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
                              <Layers size={14} /> Standard / Scope of Services
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2.5 sm:py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-sm"
                              placeholder="Scope of services"
                              value={dprInfo.scopeOfServices}
                              onChange={(e) => setDprInfo({ ...dprInfo, scopeOfServices: e.target.value })}
                            />
                          </div>

                          <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                              <FileCheck size={14} /> Job Card Ref.
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2.5 sm:py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-sm"
                              placeholder="JC-2024-089"
                              value={dprInfo.jobCardRef}
                              onChange={(e) => setDprInfo({ ...dprInfo, jobCardRef: e.target.value })}
                            />
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

                      {/* Section 3: Daily Work Activity Table */}
                      <section className={!isInputEnabled ? 'opacity-30 pointer-events-none' : 'transition-all duration-500'}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                          <div className="flex items-center gap-3">
                            <div className="bg-orange-50 p-2 rounded-lg">
                              <FileText className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Daily Work Activity Log</h2>
                              <p className="text-xs sm:text-sm text-slate-500">Track your daily tasks and time</p>
                            </div>
                          </div>
                          <button
                            onClick={addActivity}
                            className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 active:scale-95 transition-all text-sm font-semibold"
                          >
                            <Plus className="w-4 h-4" /> Add Activity Row
                          </button>
                        </div>

                        {/* Table - Horizontal scroll on mobile */}
                        <div className="bg-white overflow-hidden rounded-xl border border-slate-200">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse bg-white text-sm">
                              <thead>
                                <tr className="bg-slate-50">
                                  <th className="border border-slate-300 p-2 text-left">S.N</th>
                                  <th className="border border-slate-300 p-2 text-left">From (Date)</th>
                                  <th className="border border-slate-300 p-2 text-left">To</th>
                                  <th className="border border-slate-300 p-2 text-left">Description</th>
                                  <th className="border border-slate-300 p-2 text-left">Client/Location</th>
                                  <th className="border border-slate-300 p-2 text-left">Entry Time</th>
                                  <th className="border border-slate-300 p-2 text-left">Exit Time</th>
                                  <th className="border border-slate-300 p-2 text-left">Travel (Min)</th>
                                  <th className="border border-slate-300 p-2 text-left">Evidence</th>
                                  <th className="border border-slate-300 p-2 text-center">Signed</th>
                                  <th className="border border-slate-300 p-2 text-center">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {activities.map((activity, index) => (
                                  <tr key={activity.id} className="hover:bg-slate-50">
                                    <td className="border border-slate-300 p-2 text-center font-medium">{index + 1}</td>
                                    <td className="border border-slate-300 p-2">
                                      <input
                                        type="date"
                                        // value={activity.timeFrom}
                                        // onChange={(e) => updateActivity(activity.id, 'timeFrom', e.target.value)}
                                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                                      />
                                    </td>
                                    <td className="border border-slate-300 p-2">
                                      <input
                                        type="date"
                                        // value={activity.timeTo}
                                        // onChange={(e) => updateActivity(activity.id, 'timeTo', e.target.value)}
                                        placeholder="Site/Location"
                                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                                      />
                                    </td>
                                    <td className="border border-slate-300 p-2">
                                      <textarea
                                        // value={activity.description}
                                        // onChange={(e) => updateActivity(activity.id, 'description', e.target.value)}
                                        placeholder="Describe the job..."
                                        rows="2"
                                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm resize-none"
                                      />
                                    </td>
                                    <td className="border border-slate-300 p-2">
                                      <input
                                        type="text"
                                        // value={activity.clientLocation}
                                        // onChange={(e) => updateActivity(activity.id, 'clientLocation', e.target.value)}
                                        placeholder="Client Location"
                                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                                      />
                                    </td>
                                    <td className="border border-slate-300 p-2">
                                      <input
                                        type="time"
                                        // value={activity.entryTime}
                                        // onChange={(e) => updateActivity(activity.id, 'entryTime', e.target.value)}
                                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                                      />
                                    </td>
                                    <td className="border border-slate-300 p-2">
                                      <input
                                        type="time"
                                        // value={activity.exitTime}
                                        // onChange={(e) => updateActivity(activity.id, 'exitTime', e.target.value)}
                                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                                      />
                                    </td>
                                    <td className="border border-slate-300 p-2 text-center font-medium text-slate-600">
                                      {/* {activity.totalTravelTime > 0 ? `${activity.totalTravelTime}` : '-'} */}-
                                    </td>
                                    <td className="border border-slate-300 p-2">
                                      <div className="flex flex-col gap-1.5 text-xs">
                                        <div className="flex items-center gap-1">
                                          <span className="w-8">JC</span>
                                          <label className="inline-flex items-center justify-center relative">
                                            <input
                                              type="checkbox"
                                              // checked={activity.evidence.jc}
                                              // onChange={() => updateEvidence(activity.id, 'jc')}
                                              className="peer appearance-none w-4 h-4 rounded border-2 transition-all cursor-pointer bg-white border-amber-400 hover:border-amber-500 checked:bg-amber-500 checked:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                            />
                                            <Check size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                          </label>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <span className="w-8">MoM</span>
                                          <label className="inline-flex items-center justify-center relative">
                                            <input
                                              type="checkbox"
                                              checked={activity.evidence.mom}
                                              onChange={() => updateEvidence(activity.id, 'mom')}
                                              className="peer appearance-none w-4 h-4 rounded border-2 transition-all cursor-pointer bg-white border-amber-400 hover:border-amber-500 checked:bg-amber-500 checked:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                            />
                                            <Check size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                          </label>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <span className="w-8">Obs.</span>
                                          <label className="inline-flex items-center justify-center relative">
                                            <input
                                              type="checkbox"
                                              checked={activity.evidence.obs}
                                              onChange={() => updateEvidence(activity.id, 'obs')}
                                              className="peer appearance-none w-4 h-4 rounded border-2 transition-all cursor-pointer bg-white border-amber-400 hover:border-amber-500 checked:bg-amber-500 checked:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                            />
                                            <Check size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                          </label>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <span className="w-8">A&F</span>
                                          <label className="inline-flex items-center justify-center relative">
                                            <input
                                              type="checkbox"
                                              checked={activity.evidence.af}
                                              onChange={() => updateEvidence(activity.id, 'af')}
                                              className="peer appearance-none w-4 h-4 rounded border-2 transition-all cursor-pointer bg-white border-amber-400 hover:border-amber-500 checked:bg-amber-500 checked:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                            />
                                            <Check size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                          </label>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="border border-slate-300 p-2 text-center">
                                      <label className="inline-flex items-center justify-center relative">
                                        <input
                                          type="checkbox"
                                          className="peer appearance-none w-4 h-4 rounded border-2 transition-all cursor-pointer bg-white border-amber-400 hover:border-amber-500 checked:bg-amber-500 checked:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                        />
                                        <Check size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                      </label>
                                    </td>
                                    <td className="border border-slate-300 p-2 text-center">
                                      <button
                                        onClick={() => removeActivity(activity.id)}
                                        disabled={activities.length === 1}
                                        className="p-1.5 text-slate-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Evidence Verification Section */}

                      </section>

                      {/* Section 4: Signature Section */}
                      <section className={!isInputEnabled ? 'opacity-30 pointer-events-none' : 'transition-all duration-500'}>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                          <div className="bg-orange-50 p-2 rounded-lg">
                            <Signature className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Sign-off & Authorization</h2>
                            <p className="text-xs sm:text-sm text-slate-500">Final approval and verification</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Left Column - Signatures */}
                          <div className="space-y-4">


                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                <UserCheck size={14} /> Role
                              </label>
                              <Select
                                options={roleOptions}
                                styles={customSelectStyles()}
                                value={roleOptions.find(opt => opt.value === signatureInfo.role)}
                                onChange={(opt) => setSignatureInfo({ ...signatureInfo, role: opt.value })}
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                <User size={14} /> Prepared by
                              </label>
                              <Select
                                options={preparedByOptions}
                                styles={customSelectStyles()}
                                value={preparedByOptions.find(opt => opt.value === signatureInfo.preparedBy) || null}
                                onChange={(opt) => setSignatureInfo({ ...signatureInfo, preparedBy: opt?.value || '' })}
                                placeholder="HR / Admin"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                <Eye size={14} /> Reviewed by
                              </label>
                              <Select
                                options={reviewedByOptions}
                                styles={customSelectStyles()}
                                value={reviewedByOptions.find(opt => opt.value === signatureInfo.reviewedBy) || null}
                                onChange={(opt) => setSignatureInfo({ ...signatureInfo, reviewedBy: opt?.value || '' })}
                                placeholder="Operation Manager / HoD"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                <Award size={14} /> Approved by
                              </label>
                              <Select
                                options={approvedByOptions}
                                styles={customSelectStyles()}
                                value={approvedByOptions.find(opt => opt.value === signatureInfo.approvedBy) || null}
                                onChange={(opt) => setSignatureInfo({ ...signatureInfo, approvedBy: opt?.value || '' })}
                                placeholder="MD / Province Head"
                              />
                            </div>
                          </div>

                          {/* Right Column - Notes & Acceptance */}
                          <div className="space-y-4">
                            {/* Closing Note/Remark */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                <FileText size={14} /> Closing Note / Remark
                              </label>
                              <textarea
                                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-sm"
                                placeholder="Enter closing remarks or notes..."
                                rows="4"
                                value={signatureInfo.closingNote}
                                onChange={(e) => setSignatureInfo({ ...signatureInfo, closingNote: e.target.value })}
                              />
                            </div>

                            {/* Consultant's Acceptance with Auto-list */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                <CheckSquare size={14} /> Consultant's Acceptance
                              </label>
                              <p className="text-xs text-slate-400 mb-1">Type and press Enter to add items</p>
                              <div className="relative">
                                <input
                                  type="text"
                                  className="w-full px-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-sm pr-10"
                                  placeholder="Add acceptance point..."
                                  value={signatureInfo.consultantAcceptance}
                                  onChange={(e) => setSignatureInfo({ ...signatureInfo, consultantAcceptance: e.target.value })}
                                  onKeyDown={handleConsultantAcceptanceKeyDown}
                                />
                                <button
                                  onClick={() => {
                                    if (signatureInfo.consultantAcceptance.trim()) {
                                      setSignatureInfo(prev => ({
                                        ...prev,
                                        consultantAcceptanceList: [...prev.consultantAcceptanceList, prev.consultantAcceptance.trim()],
                                        consultantAcceptance: ''
                                      }));
                                    }
                                  }}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Acceptance List */}
                              {signatureInfo.consultantAcceptanceList.length > 0 && (
                                <div className="mt-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                                  <p className="text-xs font-semibold text-slate-500 mb-2">Acceptance Points:</p>
                                  <ul className="space-y-2">
                                    {signatureInfo.consultantAcceptanceList.map((item, index) => (
                                      <li key={index} className="flex items-start gap-2 group">
                                        <span className="text-orange-500 mt-0.5">•</span>
                                        <span className="text-sm text-slate-700 flex-1">{item}</span>
                                        <button
                                          onClick={() => removeConsultantAcceptanceItem(index)}
                                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-orange-600 rounded transition-all"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Submit Section */}
                      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t-2 border-slate-100">
                        <button
                          // onClick={handleSubmit}
                          disabled={!isInputEnabled}
                          className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-white font-semibold tracking-wide transition-all ${isInputEnabled
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