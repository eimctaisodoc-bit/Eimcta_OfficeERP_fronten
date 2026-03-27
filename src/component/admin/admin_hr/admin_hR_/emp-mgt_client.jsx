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
  UserPlus,
  ChevronRight
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
// SELECT STYLES
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
    backgroundColor: "#f8fafc",
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
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    padding: "4px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#f59e0b"
      : state.isFocused
        ? "#fffbeb"
        : "transparent",
    color: state.isSelected ? "white" : "#334155",
    borderRadius: "10px",
    marginBlock: "2px",
    cursor: "pointer",
    "&:active": { backgroundColor: "#fbbf24" },
  }),
});

const normalizeOptions = (options = []) =>
  options.map((item) =>
    typeof item === "string" ? { label: item, value: item } : item
  );

const RecruitmentForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showMarriageForm, setShowMarriageForm] = useState(false);

  const allFields = ClientEmp_form.flatMap((s) => s.fields);
  const findField = (name) => allFields.find((f) => f.name === name);

  const validateField = (field, value) => {
    const optional = isOptionalField(field);

    if (optional && (!value || value === "")) return "";
    if (!optional && (!value || value === "")) return "This field is required";
    if (field.type === "file") return "";

    const looksNumeric =
      field.type === "number" ||
      field.type === "tel" ||
      /mobile|phone|contact|number/i.test(field.name);

    if (looksNumeric && typeof value === "string" && !/^\d+$/.test(value)) {
      return "Only numbers allowed";
    }

    const looksEmail = /email/i.test(field.name) || field.type === "email";
    if (
      looksEmail &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
    ) {
      return "Invalid email address";
    }

    if (
      typeof value === "string" &&
      field.type !== "select" &&
      !looksEmail &&
      !looksNumeric &&
      value.trim().length < 3
    ) {
      return "Minimum 3 characters";
    }

    return "";
  };

  const validateMarriageFields = () => {
    const newErrors = {};
    let isValid = true;

    const marriageFields = [
      { name: "spouseName", label: "Spouse Name" },
      { name: "spouseOccupation", label: "Spouse Occupation" },
      { name: "spousePhone", label: "Spouse Phone" },
      { name: "numberOfChildren", label: "Number of Children" },
    ];

    marriageFields.forEach((field) => {
      const value = formData[field.name];

      if (!value || value === "") {
        newErrors[field.name] = "This field is required";
        isValid = false;
      } else if (
        field.name === "spousePhone" &&
        !/^\d+$/.test(String(value).replace(/\D/g, ""))
      ) {
        newErrors[field.name] = "Only numbers allowed";
        isValid = false;
      } else if (
        field.name === "numberOfChildren" &&
        (isNaN(value) || Number(value) < 0)
      ) {
        newErrors[field.name] = "Please enter a valid number";
        isValid = false;
      } else if (
        (field.name === "spouseName" || field.name === "spouseOccupation") &&
        String(value).trim().length < 2
      ) {
        newErrors[field.name] = "Minimum 2 characters";
        isValid = false;
      }
    });

    return { newErrors, isValid };
  };

  const handleNext = () => {
    const currentFields = ClientEmp_form[step - 1].fields;
    const newErrors = {};
    let isValid = true;

    currentFields.forEach((field) => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    if (showMarriageForm) {
      const marriageValidation = validateMarriageFields();
      Object.assign(newErrors, marriageValidation.newErrors);
      if (!marriageValidation.isValid) isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    const field = findField(name);
    let val = files ? files[0] : value;

    // Handle Numeric fields
    const isNum = type === "tel" || type === "number" || /mobile|phone|contact|number/i.test(name);
    if (!files && isNum) {
      val = String(val).replace(/\D/g, "");
    }

    const spouseFields = ["spouseName", "spouseOccupation", "spousePhone", "numberOfChildren"];

    setFormData((prev) => {
      const updated = { ...prev, [name]: val };

      // If we are editing a spouse field, check if we should toggle Marital Status
      if (spouseFields.includes(name)) {
        const hasAnySpouseData = spouseFields.some((f) =>
          updated[f] !== undefined && updated[f] !== "" && updated[f] !== null
        );

        if (hasAnySpouseData) {
          updated.maritalStatus = "Married";
          // We don't force setShowMarriageForm(true) here to avoid 
          // popping the modal while the user is typing inside it.
        } else {
          updated.maritalStatus = "Single";
          setShowMarriageForm(false);
        }
      }
      return updated;
    });

    // Validation logic
    if (field || spouseFields.includes(name)) {
      setErrors((prev) => ({
        ...prev,
        [name]: field ? validateField(field, val) : (val ? "" : "This field is required"),
      }));
    }
  };

  const handleSelectChange = (opt, name) => {
    const val = opt ? opt.value : "";

    if (name === "maritalStatus") {
      if (val === "Married") {
        setShowMarriageForm(true);
        setFormData(prev => ({ ...prev, [name]: val }));
      } else {
        // Logic for "Single" or empty: Clear spouse data
        setShowMarriageForm(false);
        setFormData((prev) => ({
          ...prev,
          [name]: val,
          spouseName: "",
          spouseOccupation: "",
          spousePhone: "",
          numberOfChildren: "",
        }));
        // Clear specific spouse errors
        setErrors((prev) => ({
          ...prev,
          [name]: "",
          spouseName: "",
          spouseOccupation: "",
          spousePhone: "",
          numberOfChildren: "",
        }));
      }
      return;
    }

    // Default select behavior
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = () => {
    const currentFields = ClientEmp_form[step - 1].fields;
    const newErrors = {};
    let isValid = true;

    currentFields.forEach((field) => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    if (showMarriageForm) {
      const marriageValidation = validateMarriageFields();
      Object.assign(newErrors, marriageValidation.newErrors);
      if (!marriageValidation.isValid) isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("Final Data:", formData);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 
      backdrop-blur-md flex items-center justify-center z-50 
      p-4 animate-in fade-in duration-300"
    >
      <div className="w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-3  cursor-pointer p-2 text-white/80
          hover:text-white transition-all z-40 bg-white/10 hover:bg-white/20 rounded-full"
        >
          <X size={24} className="hover:rotate-90 transition-transform duration-300" />
        </button>

        <div
          className="bg-white rounded-[2rem] 
          shadow-2xl overflow-hidden border border-white/20 flex flex-col max-h-[95vh]"
        >
          <div
            className="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 p-6 md:p-8 text-white relative
            overflow-hidden shrink-0"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none min-h-[140px]">
              <UserPlus size={160} />
            </div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-inner">
                <ClipboardList size={32} />
              </div>
              <div>
                <h1
                  className="text-2xl md:text-3xl font-bold tracking-tight"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  Employee Recruitment
                </h1>
                <p className="text-amber-50 opacity-90 text-sm md:text-base mt-1">
                  Step {step} of {ClientEmp_form.length}:{" "}
                  {ClientEmp_form[step - 1].title}
                </p>
              </div>
            </div>
          </div>

          <div className="px-8 pt-8 pb-2 bg-slate-50/50">
            <div className="relative flex justify-between items-center max-w-2xl mx-auto">
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-200 -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-0 h-[3px] bg-amber-500 -translate-y-1/2 transition-all duration-500 rounded-full"
                style={{
                  width: `${((step - 1) / (ClientEmp_form.length - 1)) * 100}%`,
                }}
              />

              {ClientEmp_form.map((s, i) => {
                const isDone = i < step - 1;
                const isCurrent = i === step - 1;

                return (
                  <div key={i} className="relative z-10 group">
                    <div
                      className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2
                      ${isDone
                          ? "bg-amber-500 border-amber-500 text-white"
                          : isCurrent
                            ? "bg-white border-amber-500 text-amber-600 shadow-lg shadow-amber-200 ring-4 ring-amber-50"
                            : "bg-white border-slate-200 text-slate-400"
                        }
                    `}
                    >
                      {isDone ? (
                        <Check size={18} strokeWidth={3} />
                      ) : (
                        <span className="text-sm font-bold">{i + 1}</span>
                      )}
                    </div>
                    <span
                      className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider font-bold whitespace-nowrap transition-colors
                      ${isCurrent ? "text-amber-600" : "text-slate-400"}`}
                    >
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

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
                        onChange={handleSelectChange}
                        options={f.options || f.provinces || []}
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

              {showMarriageForm && (
                <MarriageDetailsForm
                  formData={formData}
                  onChange={handleChange}
                  setFormData={setFormData}
                  errors={errors}
                  showMarriageForm={showMarriageForm}
                  setShowMarriageForm={setShowMarriageForm}
                />
              )}
            </form>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep((prev) => prev - 1)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
                ${step === 1
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-200 active:scale-95"
                }`}
            >
              <ArrowLeftCircle size={20} />
              Back
            </button>

            {step === ClientEmp_form.length ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                Complete Registration
                <CheckCircle2 size={20} />
              </button>
            ) : (
              <button
                type="button"
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

const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  required,
  disabled,
}) => (
  <div className="space-y-1.5 group">
    <label className="text-sm font-bold text-slate-700 ml-1 flex justify-between items-center">
      <span>
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {!required && (
        <span className="text-[10px] text-slate-400 font-normal uppercase tracking-widest">
          Optional
        </span>
      )}
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
          ${error
            ? "border-red-400 bg-red-50/30 focus:ring-red-100"
            : "border-slate-200 bg-slate-50/50 focus:border-amber-500 focus:bg-white focus:ring-amber-100"
          }
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

const SelectField = ({ label, name, value, onChange, options, error, required }) => {
  const normalizedOptions = normalizeOptions(options);

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-bold text-slate-700 ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        name={name}
        options={normalizedOptions}
        value={normalizedOptions.find((opt) => opt.value === value) || null}
        onChange={(opt) => onChange(opt, name)}
        styles={customSelectStyles(!!error)}
      />
      {error && (
        <p className="text-red-500 text-[11px] mt-1 ml-1 flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
};

const FileUploadField = ({ label, name, file, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700 ml-1">
      {label} <span className="font-normal text-slate-400 text-xs">(Optional)</span>
    </label>
    <label
      className={`
      relative group cursor-pointer flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-[2rem] transition-all
      ${file
          ? "bg-emerald-50/50 border-emerald-200"
          : "bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50/30"
        }
    `}
    >
      <input type="file" name={name} onChange={onChange} className="hidden" />
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110
        ${file
            ? "bg-emerald-100 text-emerald-600"
            : "bg-white text-slate-400 shadow-sm"
          }`}
      >
        <UploadCloud size={24} />
      </div>
      <p className="text-sm font-bold text-slate-700">
        {file ? "File Selected" : "Click to upload document"}
      </p>
      <p className="text-xs text-slate-400 mt-1">
        {file ? file.name : "PDF, JPG or PNG (max 5MB)"}
      </p>
      {file && (
        <div className="absolute top-4 right-4 text-emerald-500">
          <CheckCircle2 size={20} />
        </div>
      )}
    </label>
  </div>
);

const MarriageDetailsForm = ({ formData, onChange, errors, setShowMarriageForm, setFormData }) => {
  
  // 1. Validation Logic: Check if all fields are filled
  const spouseFields = ["spouseName", "spouseOccupation", "spousePhone", "numberOfChildren"];
  const isFormValid = spouseFields.every(field => formData[field] && formData[field].toString().trim() !== "");

  // 2. Close Logic: Clear marriage fields and reset status
  const handleCloseModal = () => {
    setFormData(prev => ({
      ...prev,
      maritalStatus: "Single", // Revert status
      spouseName: "",
      spouseOccupation: "",
      spousePhone: "",
      numberOfChildren: ""
    }));
    setShowMarriageForm(false);
  };

  // 3. Next Logic: Just close the modal (state is already updated via onChange)
  const handleNext = () => {
    if (isFormValid) {
      setShowMarriageForm(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl border-2 border-amber-200 shadow-xl">
        
        {/* Close Icon (using the same reset logic) */}
        <button
          onClick={handleCloseModal}
          className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-red-500 transition hover:scale-110"
        >
          <X size={22} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
            <UserPlus size={20} />
          </div>
          <h3 className="text-lg font-bold text-amber-900" style={{ fontFamily: "'Roboto Slab', serif" }}>
            Spouse Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Spouse Name"
            name="spouseName"
            type="text"
            value={formData.spouseName}
            onChange={onChange}
            error={errors.spouseName}
            required
          />
          <InputField
            label="Spouse Occupation"
            name="spouseOccupation"
            type="text"
            value={formData.spouseOccupation}
            onChange={onChange}
            error={errors.spouseOccupation}
            required
          />
          <InputField
            label="Spouse Phone"
            name="spousePhone"
            type="tel"
            value={formData.spousePhone}
            onChange={onChange}
            error={errors.spousePhone}
            required
          />
          <InputField
            label="Number of Children"
            name="numberOfChildren"
            type="number"
            value={formData.numberOfChildren}
            onChange={onChange}
            error={errors.numberOfChildren}
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
          <button
            type="button"
            onClick={handleCloseModal}
            className="px-6 py-2 cursor-pointer rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition font-medium"
          >
            Close
          </button>
          
          <button
            type="button"
            onClick={handleNext}
            disabled={!isFormValid}
            className={`px-8 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              isFormValid 
                ? "bg-amber-500 text-white hover:bg-amber-600 shadow-md" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentForm;