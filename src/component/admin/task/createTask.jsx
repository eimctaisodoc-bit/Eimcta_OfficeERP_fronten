import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';
import { 
  X, 
  User, 
  Users, 
  Calendar, 
  Clock, 
  Upload, 
  AlertCircle,
  FileText,
  FileSpreadsheet,
  File,
  Image as ImageIcon,
  Music,
  Film,
  Briefcase,
  ChevronDown
} from 'lucide-react';

export const CreateTask = ({  onclose }) => {
  console.log(onclose)
  const [activeTab, setActiveTab] = useState('client');
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [priority, setPriority] = useState('medium');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  
  // State for select values
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedNamesMulti, setSelectedNamesMulti] = useState([]);

  // Check if form is valid
  const isFormValid = () => {
    return (
      selectedNamesMulti.length > 0 &&
      selectedRole &&
      taskTitle.trim() !== '' &&
      taskDescription.trim() !== '' &&
      priority
    );
  };

  // Custom amber theme for react-select
  const amberTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: '#f59e0b', // amber-500
      primary25: '#fef3c7', // amber-100
      primary50: '#fef3c7', // amber-100
      primary75: '#fbbf24', // amber-400
      neutral0: '#ffffff', // white
      neutral5: '#fef3c7', // amber-100
      neutral10: '#fef3c7', // amber-100
      neutral20: '#fbbf24', // amber-400
      neutral30: '#f59e0b', // amber-500
      neutral40: '#d97706', // amber-600
      neutral50: '#92400e', // amber-800
      neutral60: '#92400e', // amber-800
      neutral70: '#78350f', // amber-900
      neutral80: '#78350f', // amber-900
      neutral90: '#451a03', // amber-950
    },
  });

  // Custom styles for react-select
  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: '44px',
      backgroundColor: 'white',
      borderColor: state.isFocused ? '#f59e0b' : '#cbd5e1',
      borderRadius: '0.5rem',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(245, 158, 11, 0.1)' : 'none',
      borderWidth: '1px',
      '&:hover': {
        borderColor: '#f59e0b',
      },
      transition: 'all 0.2s ease',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      border: '1px solid #fef3c7',
      boxShadow: '0 10px 25px rgba(245, 158, 11, 0.15)',
      marginTop: '4px',
      zIndex: 9999,
    }),
    menuList: (base) => ({
      ...base,
      padding: '8px',
      maxHeight: '200px',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#fef3c7' 
        : state.isFocused 
        ? '#fef3c7' 
        : 'white',
      color: state.isSelected ? '#92400e' : '#1f2937',
      borderRadius: '0.375rem',
      padding: '10px 12px',
      margin: '2px 0',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#fde68a',
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#fef3c7',
      borderRadius: '9999px',
      padding: '2px 6px',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#92400e',
      fontWeight: '500',
      fontSize: '14px',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#92400e',
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: '#fbbf24',
        color: '#78350f',
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: '#9ca3af',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#cbd5e1',
      padding: '8px',
      '&:hover': {
        color: '#f59e0b',
      },
    }),
    clearIndicator: (base) => ({
      ...base,
      color: '#cbd5e1',
      padding: '8px',
      '&:hover': {
        color: '#f59e0b',
      },
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: '#f3f4f6',
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0 12px',
    }),
  };

  // Mock data for select options
  const clientOptions = [
    { value: 1, label: 'John Doe', icon: <User size={16} /> },
    { value: 2, label: 'Jane Smith', icon: <User size={16} /> },
    { value: 3, label: 'Robert Johnson', icon: <User size={16} /> },
    { value: 4, label: 'Emily Wilson', icon: <User size={16} /> },
  ];

  const staffOptions = [
    { value: 1, label: 'Alex Turner', icon: <Users size={16} /> },
    { value: 2, label: 'Sarah Connor', icon: <Users size={16} /> },
    { value: 3, label: 'Mike Ross', icon: <Users size={16} /> },
    { value: 4, label: 'Lisa Wong', icon: <Users size={16} /> },
  ];

  const roleOptions = [
    { value: 1, label: 'Project Manager', icon: <Briefcase size={16} /> },
    { value: 2, label: 'Developer', icon: <Briefcase size={16} /> },
    { value: 3, label: 'Designer', icon: <Briefcase size={16} /> },
    { value: 4, label: 'QA Engineer', icon: <Briefcase size={16} /> },
  ];

  const organizationOptions = [
    { value: 1, label: 'Tech Corp', icon: <Briefcase size={16} /> },
    { value: 2, label: 'Design Studio', icon: <Briefcase size={16} /> },
    { value: 3, label: 'Marketing Agency', icon: <Briefcase size={16} /> },
    { value: 4, label: 'Consulting Firm', icon: <Briefcase size={16} /> },
  ];

  // Custom option component with icon
  const OptionWithIcon = ({ innerProps, label, data }) => (
    <div 
      {...innerProps} 
      className="flex items-center gap-3 px-3 py-2 hover:bg-amber-50 rounded cursor-pointer"
    >
      {data.icon && (
        <div className="text-amber-600">
          {data.icon}
        </div>
      )}
      <span className="text-gray-800">{label}</span>
    </div>
  );

  // Custom value component for multi-select
  const MultiValueWithIcon = ({ data, removeProps }) => (
    <div className="flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm mr-2">
      {data.icon && (
        <div className="text-amber-600">
          {data.icon}
        </div>
      )}
      <span>{data.label}</span>
      <button
        {...removeProps}
        className="hover:text-amber-900 ml-1"
      >
        <X size={14} />
      </button>
    </div>
  );

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const { date, time } = getCurrentDateTime();

  const fileTypes = [
    { type: 'doc', label: 'Document', icon: <FileText size={18} /> },
    { type: 'txt', label: 'Text', icon: <FileText size={18} /> },
    { type: 'xlsx', label: 'Excel', icon: <FileSpreadsheet size={18} /> },
    { type: 'pdf', label: 'PDF', icon: <File size={18} /> },
    { type: 'ppt', label: 'PowerPoint', icon: <File size={18} /> },
    { type: 'image', label: 'Image', icon: <ImageIcon size={18} /> },
    { type: 'audio', label: 'Audio', icon: <Music size={18} /> },
    { type: 'video', label: 'Video', icon: <Film size={18} /> },
  ];

  // Custom dropdown indicator
  const DropdownIndicator = (props) => {
    return (
      <div {...props.innerProps} className="pr-2">
        <ChevronDown 
          size={20} 
          className={`transform transition-transform duration-200 ${
            props.selectProps.menuIsOpen ? 'rotate-180' : ''
          } text-gray-400`}
        />
      </div>
    );
  };

  return (
    <AnimatePresence>
      
        <div className="fixed inset-0 z-50 
        flex items-center justify-center ">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0
             bg-black/50 backdrop-blur-sm"
            // onClick={onclose}
          />

          {/* Modal with blur effect at top */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl"
          >
            {/* Top blur effect */}
            <div className="absolute top-0
             left-0 right-0 h-8
              bg-gradient-to-b from-white/30
               to-transparent backdrop-blur-sm
                rounded-t-2xl z-10" />
            
            <div className="relative
             bg-white backdrop-blur-xl
              rounded-2xl shadow-2xl 
                overflow-hidden max-h-[80vh] flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-amber-100 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 
                      className="text-2xl text-gray-800"
                      style={{
                        fontFamily: "'Roboto Slab', serif",
                        fontWeight: 600
                      }}
                    >
                      Create New Task
                    </h2>
                    <p 
                      className="text-gray-600 mt-1"
                      style={{
                        fontFamily: "'Roboto Slab', serif",
                        fontWeight: 400
                      }}
                    >
                      Fill in the details to create a new task
                    </p>
                  </div>
                  <button
                    onClick={onclose}
                    className="group p-2 hover:bg-amber-50 rounded-full transition-all duration-200 text-gray-500 hover:text-amber-600 hover:rotate-90"
                  >
                    <X size={24} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-amber-100">
                <button
                  onClick={() => setActiveTab('client')}
                  className={`flex-1 py-4 flex items-center justify-center gap-2 transition-all duration-200 ${
                    activeTab === 'client'
                      ? 'bg-amber-50 text-amber-600 border-b-2 border-amber-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-amber-500'
                  }`}
                >
                  <User size={20} />
                  <span className="font-medium">Client</span>
                </button>
                <button
                  onClick={() => setActiveTab('staff')}
                  className={`flex-1 py-4 flex items-center justify-center gap-2 transition-all duration-200 ${
                    activeTab === 'staff'
                      ? 'bg-amber-50 text-amber-600 border-b-2 border-amber-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-amber-500'
                  }`}
                >
                  <Users size={20} />
                  <span className="font-medium">Staff</span>
                </button>
              </div>

              {/* Form */}
              <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                {/* Organization Field (Only for Staff) */}
                {activeTab === 'staff' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <Select
                      value={selectedOrganization}
                      onChange={setSelectedOrganization}
                      options={organizationOptions}
                      theme={amberTheme}
                      styles={customStyles}
                      placeholder="Select Organization"
                      components={{
                        Option: OptionWithIcon,
                        DropdownIndicator,
                      }}
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>
                )}

                {/* Task Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 hover:border-amber-400 transition-all duration-200 bg-white placeholder-gray-400"
                    placeholder="Enter task title"
                  />
                </div>

                {/* Task Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Description
                  </label>
                  <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 hover:border-amber-400 transition-all duration-200 bg-white placeholder-gray-400 resize-none"
                    placeholder="Enter task description"
                    rows="4"
                  />
                </div>

                {/* Name Select (Multiple Selection) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign To (Select at least one)
                  </label>
                  <Select
                    value={selectedNamesMulti}
                    onChange={setSelectedNamesMulti}
                    options={activeTab === 'client' ? clientOptions : staffOptions}
                    theme={amberTheme}
                    styles={customStyles}
                    placeholder="Select names..."
                    isMulti
                    components={{
                      Option: OptionWithIcon,
                      MultiValue: MultiValueWithIcon,
                      DropdownIndicator,
                    }}
                    isSearchable
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Role and Position */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <Select
                      value={selectedRole}
                      onChange={setSelectedRole}
                      options={roleOptions}
                      theme={amberTheme}
                      styles={customStyles}
                      placeholder="Select Role"
                      components={{
                        Option: OptionWithIcon,
                        DropdownIndicator,
                      }}
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 hover:border-amber-400 transition-all duration-200 bg-white placeholder-gray-400"
                      placeholder="Enter position"
                    />
                  </div>
                </div>

                {/* Auto-detected Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar size={16} className="text-amber-500" />
                      Date (Auto-detected)
                    </label>
                    <div className="px-4 py-2.5 border border-amber-200 rounded-lg bg-white">
                      <span className="text-gray-700 font-medium">{date}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Clock size={16} className="text-amber-500" />
                      Time (Auto-detected)
                    </label>
                    <div className="px-4 py-2.5 border border-amber-200 rounded-lg bg-white">
                      <span className="text-gray-700 font-medium">{time}</span>
                    </div>
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <AlertCircle size={16} className="text-amber-500" />
                    Priority
                  </label>
                  <div className="flex gap-2">
                    {['low', 'medium', 'high'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setPriority(level)}
                        className={`flex-1 py-2.5 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 ${
                          priority === level
                            ? level === 'low'
                              ? 'bg-green-100 text-green-800 border-2 border-green-300 shadow-sm'
                              : level === 'medium'
                              ? 'bg-amber-100 text-amber-800 border-2 border-amber-300 shadow-sm'
                              : 'bg-red-100 text-red-800 border-2 border-red-300 shadow-sm'
                            : 'bg-white text-gray-700 border border-slate-300 hover:border-amber-400 hover:shadow-md'
                        }`}
                      >
                        <span className="font-medium">
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Upload size={16} className="text-amber-500" />
                    File Upload
                  </label>
                  
                  {/* Allowed File Types */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Allowed file types:</p>
                    <div className="flex flex-wrap gap-2">
                      {fileTypes.map((fileType) => (
                        <div
                          key={fileType.type}
                          className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200 hover:border-amber-400 transition-all duration-200 hover:scale-105"
                        >
                          <div className="text-amber-600">
                            {fileType.icon}
                          </div>
                          <span className="text-sm font-medium text-amber-800">{fileType.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-amber-400 transition-all duration-200 bg-white hover:shadow-lg">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".doc,.docx,.txt,.xlsx,.xls,.pdf,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp3,.wav,.mp4,.avi"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <Upload size={28} className="text-amber-600" />
                      </div>
                      <p className="text-gray-700">
                        <span className="text-amber-600 font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Maximum file size: 10MB
                      </p>
                    </label>
                  </div>

                  {/* Selected File Preview */}
                  {selectedFile && (
                    <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-amber-200 shadow-sm">
                            <FileText size={24} className="text-amber-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{selectedFile.name}</p>
                            <p className="text-sm text-gray-600">
                              {(selectedFile.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="p-1 hover:bg-amber-100 rounded-full transition-colors duration-200 text-gray-500 hover:text-amber-600"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-amber-100 bg-white">
                <div className="flex justify-end gap-3">
                  <button
                    // onClick={onClose}
                    className="px-6 py-2.5 border border-slate-300 rounded-lg text-gray-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!isFormValid()}
                    className={`px-6 py-2.5 text-white rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                      isFormValid()
                        ? 'bg-amber-500 hover:bg-amber-600 hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-amber-500/25 cursor-pointer'
                        : 'bg-gray-300 cursor-not-allowed opacity-50'
                    }`}
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
     
    </AnimatePresence>
  );
};