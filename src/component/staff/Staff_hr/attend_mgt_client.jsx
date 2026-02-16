import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Select from 'react-select';
import {
  Clock,
  User,
  Calendar,
  AlertCircle,
  Fingerprint,
  Briefcase,
  MapPin,
  ClipboardList,
  X,
  Zap,
  CalendarDays,
} from "lucide-react";

/* -------------------- FORM FIELDS CONFIG -------------------- */
const attendanceFields = [
  [
    { name: "employeeId", label: "Employee ID (*)", type: "text", icon: Briefcase },
    { name: "date", label: "Date (*)", type: "date", icon: Calendar },
  ],
  [
    {
      name: "attendanceStatus",
      label: "Status",
      type: "select",
      icon: CalendarDays,
      options: [
        { value: "Present", label: "Present" },
        { value: "Absent", label: "Absent" },
        { value: "Late", label: "Late" },
        { value: "Half Day", label: "Half Day" },
      ],
    },
    { name: "checkInTime", label: "Check-in Time (*)", type: "time", icon: Clock },
    { name: "checkOutTime", label: "Check-out Time (*)", type: "time", icon: Clock },
    { name: "breakTime", label: "Break Duration (1–5 hrs) (*)", type: "number", min: 1, max: 5 },
    {
      name: "hasOvertime",
      label: "Overtime Applied",
      type: "checkbox",
    },
    { name: "remarks", label: "Remarks (Optional)", type: "text", icon: AlertCircle },
  ],
];

/* -------------------- REACT-SELECT CUSTOM STYLES -------------------- */
const customStyles = {
  control: (base, { isFocused }) => ({
    ...base,
    backgroundColor: 'white',
    borderColor: isFocused ? '#f59e0b' : '#d4d4d8',
    borderRadius: '0.75rem',
    padding: '8px 4px',
    minHeight: '48px',
    '&:hover': {
      borderColor: '#f59e0b'
    },
    boxShadow: isFocused ? '0 0 0 2px rgba(245, 158, 11, 0.1)' : 'none'
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected
      ? '#fef3c7'
      : isFocused
        ? '#fffbeb'
        : 'white',
    color: isSelected ? '#92400e' : '#1f2937',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderRadius: '0.5rem',
    margin: '2px 8px',
    fontSize: '14px',
    fontFamily: "'Roboto Slab', serif",
    fontWeight: 400
  }),
  singleValue: (base) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    fontFamily: "'Roboto Slab', serif",
    fontWeight: 500
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9ca3af',
    fontSize: '14px',
    fontFamily: "'Roboto Slab', serif",
    fontWeight: 400
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.75rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden'
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#9ca3af',
    '&:hover': {
      color: '#6b7280'
    }
  })
};

/* -------------------- OVERTIME MODAL -------------------- */
const OvertimeModal = ({ isOTModalOpen, setIsOTModalOpen, formData, setFormData }) => {
  const [otError, setOTError] = useState(null);
  const [localOTData, setLocalOTData] = useState({
    from: "",
    to: "",
    location: "",
    position: "",
    task: "",
  });

  useEffect(() => {
    if (isOTModalOpen) {
      setLocalOTData(formData.overtimeDetails);
      setOTError(null);
    }
  }, [isOTModalOpen, formData.overtimeDetails]);

  const handleLocalOTChange = (e) => {
    const { name, value } = e.target;
    setLocalOTData((prev) => ({ ...prev, [name]: value }));
    setOTError(null);
  };

  const saveAndClose = (e) => {
    e.preventDefault();
    const { from, to, location, task } = localOTData;
    if (!from || !to || !location || !task) {
      setOTError("All Overtime fields are required to save.");
      return;
    }
    if (from >= to) {
      setOTError("Overtime 'From' time must be earlier than 'To' time.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      hasOvertime: true,
      overtimeDetails: localOTData,
    }));
    setOTError(null);
    setIsOTModalOpen(false);
  };

  const cancelAndClose = () => {
    setFormData((prev) => ({
      ...prev,
      hasOvertime: false,
      overtimeDetails: { from: "", to: "", location: "", position: "", task: "" },
    }));
    setOTError(null);
    setIsOTModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={cancelAndClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 250 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border lg:h-[95%] md:h-fit overflow-y-scroll border-slate-200"
      >
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-bold text-xl">Overtime Details</h3>
              <p className="text-amber-100 text-sm">Fill in overtime work information</p>
            </div>
          </div>
          <button onClick={cancelAndClose} className="p-2 rounded-full hover:bg-white/20">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={saveAndClose} className="p-6 space-y-6">
          {otError && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium flex items-start gap-3">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <span>{otError}</span>
            </motion.div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <InputGroup type="time" name="from" label="OT Start Time (*)" onChange={handleLocalOTChange} value={localOTData.from} icon={Clock} />
            <InputGroup type="time" name="to" label="OT End Time (*)" onChange={handleLocalOTChange} value={localOTData.to} icon={Clock} />
          </div>

          <InputGroup type="text" name="location" label="Work Location (*)" placeholder="e.g., Office" onChange={handleLocalOTChange} value={localOTData.location} icon={MapPin} />
          <InputGroup type="text" name="position" label="Position (Optional)" placeholder="e.g., Senior Developer" onChange={handleLocalOTChange} value={localOTData.position} icon={Briefcase} />

          <div className="space-y-2">
            <label htmlFor="task" className="block text-sm font-semibold text-slate-700">Task Description (*)</label>
            <textarea
              name="task"
              id="task"
              placeholder="Detailed description..."
              onChange={handleLocalOTChange}
              value={localOTData.task}
              className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-32 text-slate-700 transition resize-none bg-white"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={cancelAndClose} className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 py-3 rounded-xl font-semibold transition">Cancel</button>
            <button type="submit" className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-slate-900/20 transition duration-300">Confirm & Save Overtime</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

/* -------------------- INPUT GROUP -------------------- */
const InputGroup = ({ name, label, type, value, onChange, icon: Icon, placeholder, min, max, options, disabled = false, errors = {}, touched = {} }) => {
  const isError = errors[name] && touched[name];

  const handleSelectChange = (selectedOption) => {
    const event = {
      target: {
        name,
        value: selectedOption ? selectedOption.value : ""
      }
    };
    onChange(event);
  };

  const baseInputClasses = "w-full py-3.5 pl-12 pr-4 rounded-xl border outline-none text-sm font-medium bg-white";
  const errorClasses = "border-red-500 bg-red-50/50";
  const normalClasses = "border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

  return (
    <div className="space-y-2 w-full">
      <label htmlFor={name} className="block text-sm font-semibold text-slate-700">{label}</label>

      {type === "text" || type === "date" || type === "time" || type === "number" ? (
        <div className="relative">
          <input
            id={name}
            type={type}
            name={name}
            value={value || ""}
            min={min}
            max={max}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            className={`${baseInputClasses} ${isError ? errorClasses : normalClasses} ${disabled ? 'bg-slate-50 cursor-not-allowed text-slate-500' : ''}`}
          />
          {Icon && <Icon size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />}
          {isError && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AlertCircle size={20} className="text-red-500" />
            </div>
          )}
        </div>
      ) : type === "select" ? (
        <div className="relative">
          <Select
            id={name}
            name={name}
            value={options?.find(opt => opt.value === value) || null}
            onChange={handleSelectChange}
            options={options}
            styles={customStyles}
            isDisabled={disabled}
            placeholder="Select an option"
            className={`${isError ? 'border-red-500' : ''}`}
            components={{
              DropdownIndicator: (props) => (
                <div {...props.innerProps} className="pr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              ),
            }}
          />
          {isError && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <AlertCircle size={20} className="text-red-500" />
            </div>
          )}
        </div>
      ) : type === "checkbox" ? (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name={name}
            checked={value || false}
            onChange={onChange}
            disabled={disabled}
            className={`w-5 h-5 rounded ${isError ? 'border-red-500' : 'border-slate-300'}`}
          />
          <label className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-800'}`}>{label}</label>
        </div>
      ) : null}

      {isError && (
        <p className="text-red-500 text-xs mt-1 font-medium">{errors[name]}</p>
      )}
    </div>
  );
};

/* -------------------- MAIN COMPONENT -------------------- */
const Attend_Mgt_Client_form = ({onClose}) => {
  const [isOTModalOpen, setIsOTModalOpen] = useState(false);
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [formData, setFormData] = useState({
    attendanceId: "",
    employeeId: "",
    date: "",
    attendanceMode: "Manual",
    attendanceStatus: "Present",
    checkInTime: "",
    checkOutTime: "",
    breakTime: 1,
    hasOvertime: false,
    remarks: "",
    overtimeDetails: { from: "", to: "", location: "", position: "", task: "" },
  });

  /* -------------------- DEFAULT DATE & TIME -------------------- */
  useEffect(() => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().slice(0, 5);

    setFormData((prev) => ({
      ...prev,
      date: today,
      checkInTime: currentTime,
      checkOutTime: currentTime,
    }));
  }, []);

  /* -------------------- INPUT HANDLER -------------------- */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Mark field as touched
    setTouched(prev => ({ ...prev, [name]: true }));

    let updatedData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    // Clear error for this field
    setErrors(prev => ({ ...prev, [name]: null }));

    if (name === "attendanceStatus") {
      if (value === "Absent") {
        updatedData = { ...updatedData, checkInTime: "00:00", checkOutTime: "00:00", breakTime: 0, hasOvertime: false };
        setIsOTModalOpen(false);
      } else if (formData.attendanceStatus === "Absent") {
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);
        updatedData.checkInTime = currentTime;
        updatedData.checkOutTime = currentTime;
        updatedData.breakTime = 1;
      }
    }

    if (name === "breakTime") {
      const val = Number(value);
      updatedData.breakTime = Math.max(0, Math.min(5, val));
    }

    if (name === "hasOvertime") {
      if (checked && updatedData.attendanceStatus !== "Absent") {
        setIsOTModalOpen(true);
      } else {
        updatedData.hasOvertime = false;
        updatedData.overtimeDetails = { from: "", to: "", location: "", position: "", task: "" };
      }
    }

    setFormData(updatedData);
    setFormError(null);
  };

  /* -------------------- VALIDATION -------------------- */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.attendanceStatus) newErrors.attendanceStatus = "Attendance status is required.";

    if (formData.attendanceStatus !== "Absent") {
      if (!formData.checkInTime) newErrors.checkInTime = "Check-in time is required.";
      if (!formData.checkOutTime) newErrors.checkOutTime = "Check-out time is required.";
      if (!formData.breakTime || formData.breakTime < 1 || formData.breakTime > 5) newErrors.breakTime = "Break time must be between 1 and 5 hours.";
    }

    if (formData.hasOvertime) {
      const { from, to, location, task } = formData.overtimeDetails;
      if (!from) newErrors.overtimeFrom = "OT start time is required.";
      if (!to) newErrors.overtimeTo = "OT end time is required.";
      if (!location) newErrors.overtimeLocation = "Work location is required.";
      if (!task) newErrors.overtimeTask = "Task description is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length > 0 ? newErrors : null;
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allFields = attendanceFields.flat();
    const newTouched = {};
    allFields.forEach(field => {
      newTouched[field.name] = true;
    });
    setTouched(newTouched);

    const error = validateForm();
    if (error) {
      setFormError("Please fix all errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log("FINAL DATA SUBMITTED:", formData);
      setIsSubmitting(false);
      alert("Attendance Log Submitted Successfully!");
    }, 1000);
  };

  /* -------------------- RENDER -------------------- */
  return (
    <div className="min-h-screen md:p-8 font-sans w-full">
       <div className="flex justify-end w-full ">
                    <button className="p-3 rounded-xl text-amber-500 transition-colors cursor-pointer  hover:text-orange-500" onClick={onClose}><X size={25} /></button>

                </div>
      {/* Container & Header */}
      <div className="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        {/* Header & Title */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 md:p-10 text-white">
          <div className="flex flex-col lg:flex-row text-center lg:text-start items-center gap-3 mb-2">
            <div className="p-4 bg-white/20 rounded-lg">
              <ClipboardList size={28} className="w-6 h-6 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight leading-snug" style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}>
                Attendance Log Entry
              </h1>
              <span className="text-white/90 text-base md:text-lg mt-1" style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}>
                Record daily time logs and overtime requests efficiently. All fields marked with * are required.
              </span>
            </div>
          </div>
        </div>
        

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {formError && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl font-medium flex items-start gap-3 shadow-sm">
              <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
              <span className="font-semibold">{formError}</span>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {attendanceFields.flat().map((field) => (
              <React.Fragment key={field.name}>
                <InputGroup
                  {...field}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  disabled={formData.attendanceStatus === "Absent" && (field.type === "time" || field.type === "number")}
                  errors={errors}
                  touched={touched}
                />
              </React.Fragment>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end items-center mt-12 pt-8 border-t border-slate-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              ) : (
                <ClipboardList size={20} className="mr-2" />
              )}
              {isSubmitting ? 'Processing...' : 'Submit Attendance Log'}
            </button>
          </div>
        </form>
      </div>

      {/* Overtime Modal */}
      {isOTModalOpen && (
        <OvertimeModal
          isOTModalOpen={isOTModalOpen}
          setIsOTModalOpen={setIsOTModalOpen}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default Attend_Mgt_Client_form;