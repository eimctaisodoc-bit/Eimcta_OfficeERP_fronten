import React, { useState } from "react";
import {
  CheckCircle2,
  UploadCloud,
  Check,
  ClipboardList,
  ArrowRightCircle,
  ArrowLeftCircle,
  X,
  AlertCircle,
  UserPlus
} from "lucide-react";
import { ClientEmp_form } from "../../../../data/data.jsx";
import Select from "react-select";

// ==============================
// OPTIONAL FIELD NAMES
// ==============================
const OPTIONAL_FIELDS = new Set(["officeEmail", "officeMobile", "middleName"]);

const isOptionalField = (field) =>
  field.type === "file" || OPTIONAL_FIELDS.has(field.name);

// ==============================
// UPDATED SELECT STYLES
// ==============================
export const customSelectStyles = (hasError) => ({
  control: (base, state) => ({
    ...base,
    minHeight: "52px",
    border: hasError
      ? "2px solid #ef4444"
      : state.isFocused
        ? "2px solid #f59e0b"
        : "1px solid #e2e8f0",
    borderRadius: "14px",
    backgroundColor: "#f8fafc", // Slightly off-white for depth
    boxShadow: state.isFocused
      ? hasError
        ? "0 0 0 4px rgba(239, 68, 68, 0.1)"
        : "0 0 0 4px rgba(245, 158, 11, 0.1)"
      : "none",
    "&:hover": {
      borderColor: hasError ? "#ef4444" : "#f59e0b",
      backgroundColor: "white",
    },
    transition: "all 0.3s ease",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    padding: "4px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#f59e0b" : state.isFocused ? "#fffbeb" : "transparent",
    color: state.isSelected ? "white" : "#334155",
    borderRadius: "10px",
    marginBlock: "2px",
    cursor: "pointer",
    "&:active": { backgroundColor: "#fbbf24" },
  }),
});

const RecruitmentForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const allFields = ClientEmp_form.flatMap((s) => s.fields);
  const findField = (name) => allFields.find((f) => f.name === name);

  // ... (Validation & Handlers remain logic-identical to your functional code)
  const validateField = (field, value) => {
    const optional = isOptionalField(field);
    if (optional && (!value || value === "")) return "";
    if (!optional && (!value || value === "")) return "This field is required";
    if (field.type === "file") return "";

    const looksNumeric = field.type === "number" || field.type === "tel" || /mobile|phone|contact|number/i.test(field.name);
    if (looksNumeric && typeof value === "string" && !/^\d+$/.test(value)) return "Only numbers allowed";

    const looksEmail = /email/i.test(field.name) || field.type === "email";
    if (looksEmail && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Invalid email address";

    if (typeof value === "string" && field.type !== "select" && !looksEmail && !looksNumeric && value.trim().length < 3) return "Minimum 3 characters";
    return "";
  };

  const handleNext = () => {
    const currentFields = ClientEmp_form[step - 1].fields;
    const newErrors = {};
    let isValid = true;
    currentFields.forEach((field) => {
      const error = validateField(field, formData[field.name]);
      if (error) { newErrors[field.name] = error; isValid = false; }
    });
    setErrors(newErrors);
    if (isValid) setStep((prev) => prev + 1);
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    const field = findField(name);
    let val = files ? files[0] : value;
    const isNum = type === "tel" || type === "number" || /mobile|phone|contact|number/i.test(name);
    if (!files && isNum) val = String(val).replace(/\D/g, "");
    
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (field) setErrors((prev) => ({ ...prev, [name]: validateField(field, val) }));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-4xl relative">
        {/* Close Button Outside */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/20 rounded-full"
        >
          <X size={24} className="hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 flex flex-col max-h-[80vh]">
          
          {/* Enhanced Header */}
          <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 p-6 md:p-8 text-white relative
           overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none min-h-[140px]">
                <UserPlus size={160} />
            </div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-inner">
                <ClipboardList size={32} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: "'Roboto Slab', serif" }}>
                  Employee Recruitment
                </h1>
                <p className="text-amber-50 opacity-90 text-sm md:text-base mt-1">
                  Step {step} of {ClientEmp_form.length}: {ClientEmp_form[step-1].title}
                </p>
              </div>
            </div>
          </div>

          {/* New Progress Bar Container */}
          <div className="px-8 pt-8 pb-2 bg-slate-50/50">
            <div className="relative flex justify-between items-center max-w-2xl mx-auto">
              {/* Background Line */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-200 -translate-y-1/2" />
              {/* Active Line */}
              <div 
                className="absolute top-1/2 left-0 h-[3px] bg-amber-500 -translate-y-1/2 transition-all duration-500 rounded-full"
                style={{ width: `${((step - 1) / (ClientEmp_form.length - 1)) * 100}%` }}
              />

              {ClientEmp_form.map((s, i) => {
                const isDone = i < step - 1;
                const isCurrent = i === step - 1;
                return (
                  <div key={i} className="relative z-10 group">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2
                      ${isDone ? "bg-amber-500 border-amber-500 text-white" : 
                        isCurrent ? "bg-white border-amber-500 text-amber-600 shadow-lg shadow-amber-200 ring-4 ring-amber-50" : 
                        "bg-white border-slate-200 text-slate-400"}
                    `}>
                      {isDone ? <Check size={18} strokeWidth={3} /> : <span className="text-sm font-bold">{i + 1}</span>}
                    </div>
                    <span className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider font-bold whitespace-nowrap transition-colors
                      ${isCurrent ? "text-amber-600" : "text-slate-400"}`}>
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar mt-4">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                {ClientEmp_form[step - 1].fields.map((f, i) => (
                  <div key={i} className={f.type === "file" ? "md:col-span-2" : ""}>
                    {f.type === "select" ? (
                      <SelectField
                        label={f.label}
                        name={f.name}
                        value={formData[f.name]}
                        onChange={(opt, name) => {
                           const val = opt ? opt.value : "";
                           setFormData(prev => ({...prev, [name]: val}));
                           setErrors(prev => ({...prev, [name]: validateField(findField(name), val)}));
                        }}
                        options={f.options}
                        error={errors[f.name]}
                        required={!isOptionalField(f)}
                      />
                    ) : f.type === "file" ? (
                      <FileUploadField
                        label={f.label}
                        name={f.name}
                        file={formData[f.name]}
                        onChange={handleChange}
                      />
                    ) : (
                      <InputField
                        {...f}
                        value={formData[f.name]}
                        onChange={handleChange}
                        error={errors[f.name]}
                        required={!isOptionalField(f)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </form>
          </div>

          {/* Bottom Actions */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep(prev => prev - 1)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
                ${step === 1 ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:bg-slate-200 active:scale-95"}`}
            >
              <ArrowLeftCircle size={20} />
              Back
            </button>

            {step === ClientEmp_form.length ? (
              <button
                onClick={(e) => {
                    const currentFields = ClientEmp_form[step - 1].fields;
                    let isValid = true;
                    currentFields.forEach(f => { if(validateField(f, formData[f.name])) isValid = false; });
                    if(isValid) console.log("Final Data:", formData);
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                Complete Registration
                <CheckCircle2 size={20} />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-amber-200 hover:shadow-amber-300 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                Continue
                <ArrowRightCircle size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


const InputField = ({ label, name, type, value, onChange, error, required, disabled }) => (
  <div className="space-y-1.5 group">
    <label className="text-sm font-bold text-slate-700 ml-1 flex justify-between items-center">
      <span>{label} {required && <span className="text-red-500">*</span>}</span>
      {!required && <span className="text-[10px] text-slate-400 font-normal uppercase tracking-widest">Optional</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        placeholder={`Enter ${label.toLowerCase()}`}
        className={`w-full py-3.5 px-4 rounded-xl border outline-none transition-all text-sm font-medium
          ${error ? "border-red-400 bg-red-50/30 focus:ring-red-100" : "border-slate-200 bg-slate-50/50 focus:border-amber-500 focus:bg-white focus:ring-amber-100"}
          focus:ring-4 focus:shadow-inner`}
      />
      {error && (
        <div className="flex items-center gap-1 text-red-500 text-[11px] mt-1.5 ml-1 animate-in slide-in-from-top-1">
          <AlertCircle size={12} />
          {error}
        </div>
      )}
    </div>
  </div>
);

const SelectField = ({ label, name, value, onChange, options, error, required }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-bold text-slate-700 ml-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Select
      name={name}
      options={options.map(v => ({ label: v, value: v }))}
      value={value ? { label: value, value: value } : null}
      
      onChange={(opt) => onChange(opt, name)}
      styles={customSelectStyles(!!error)}
    />
    {error && <p className="text-red-500 text-[11px] mt-1 ml-1 flex items-center gap-1"><AlertCircle size={12}/>{error}</p>}
  </div>
);

const FileUploadField = ({ label, name, file, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700 ml-1">{label} <span className="font-normal text-slate-400 text-xs">(Optional)</span></label>
    <label className={`
      relative group cursor-pointer flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-[2rem] transition-all
      ${file ? "bg-emerald-50/50 border-emerald-200" : "bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50/30"}
    `}>
      <input type="file" name={name} onChange={onChange} className="hidden" />
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110
        ${file ? "bg-emerald-100 text-emerald-600" : "bg-white text-slate-400 shadow-sm"}`}>
        <UploadCloud size={24} />
      </div>
      <p className="text-sm font-bold text-slate-700">{file ? "File Selected" : "Click to upload document"}</p>
      <p className="text-xs text-slate-400 mt-1">{file ? file.name : "PDF, JPG or PNG (max 5MB)"}</p>
      {file && <div className="absolute top-4 right-4 text-emerald-500"><CheckCircle2 size={20}/></div>}
    </label>
  </div>
);

export default RecruitmentForm;