// RegisterModal.jsx
import {
  X, User, Building, Mail, Phone, Lock, KeyRound, ChevronRight,
  Loader2, CircleAlert,
  PhoneCall,
  UserCheck
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import Select from "react-select";
import { useRecruitmentData, useRecruitmentDataForClient } from "../../hooks/useRecruitment";

// --------------------- helpers ---------------------
const createOptions = (data, field) =>
  data?.data?.filter((item) => item?.[field]).map((item) => ({
    value: item._id,
    label: item[field],
  })) || [];

const fullNameOptions = (data) =>
  data?.data?.map((item) => ({
    value: item._id,
    label: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
  })) || [];
const C_fullNameOptions = (data) => {
  // console.log('from C_fullNameOptions', data?.data);
  return (
    data?.data?.map((item) => ({
      value: item._id,
      label: `${item.organizationName
        || ""}`.trim(),
    })) || []
  );
};
const C_createOptions = (data, field) => {
  // console.log('from C_createOptions', data?.data);
  return (
    data?.data?.map((item) => ({
      value: item._id,
      label: item.contact[field],
    })) || []);

}

// --------------------- Initial States ---------------------
const initialStaffState = {
  fullName: "",
  userName: "",
  role: "",
  position: "",
  personalEmail: "",
  personalPhone: "",
  employee_id: "",
  password: "",
  confirmPassword: "",
};

const initialClientState = {
  organizationName: "",
  username:"",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  Client_id: "",
};

// --------------------- Staff Form ---------------------
const StaffForm = ({
  staffData,
  onSelectChange,
  onInputChange,
  roleOptions,
  firstNameOptions,
  customSelectStyles,
  onSubmit,
  loading,
}) => {
  return (
    <>
      {/* Full Name */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
          Select Full Name <span className="text-red-500">*</span>
        </label>
        <Select
          options={firstNameOptions}
          value={firstNameOptions?.find((opt) => opt.value === staffData.fullName)}
          onChange={(selected) => onSelectChange(selected, "fullName", "staff")}
          className="react-select-container"
          classNamePrefix="select"
          placeholder="Select employee full name..."
          isClearable
          isSearchable
          styles={customSelectStyles}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
        {/* User Name */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
            User Name
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <User size={20} />
            </div>
            <input
              type="text"
              name="userName"
              value={staffData.userName}
              readOnly
              className="w-full py-3.5 pl-12 pr-4 rounded-xl border
               border-slate-300 outline-none text-sm font-medium
                bg-slate-50 text-slate-600 cursor-not-allowed"
              placeholder="Auto-filled from Full Name selection"
            />
          </div>
        </div>

        {/* Role */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
            Role <span className="text-red-500">*</span>
          </label>
          {/* <Select
            options={roleOptions}
            value={roleOptions.find((opt) => opt.value === staffData.role)}
            defaultInputValue="staff"
            onChange={(selected) => onSelectChange(selected, "role", "staff")}
            className="react-select-container"
            classNamePrefix="select"
            isDisabled={true}
            placeholder="Select a role..."
            styles={customSelectStyles}
          /> */}
           <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <UserCheck size={20} />
          </div>
          <input
            type="text"
            name="position"
            value='Staff'
            readOnly
            className="w-full py-3.5 pl-12 pr-4 rounded-xl border  border-slate-300 outline-none text-sm font-medium bg-slate-50 text-slate-600 cursor-not-allowed"
            // placeholder="Auto Filled from Full Name selection"
          />
        </div>
        </div>
      </div>

      {/* Position */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
          Position <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <User size={20} />
          </div>
          <input
            type="text"
            name="position"
            value={staffData.position}
            readOnly
            className="w-full py-3.5 pl-12 pr-4 rounded-xl border border-slate-300 outline-none text-sm font-medium bg-slate-50 text-slate-600 cursor-not-allowed"
            placeholder="Auto Filled from Full Name selection"
          />
        </div>
      </div>

      {/* Personal Email */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
          Personal Email
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Mail size={20} />
          </div>
          <input
            type="email"
            name="personalEmail"
            value={staffData.personalEmail || ""}
            readOnly
            className="w-full py-3.5 pl-12 pr-4 rounded-xl border border-slate-300 outline-none text-sm font-medium bg-slate-50 text-slate-600 cursor-not-allowed"
            placeholder="Auto-filled from selection"
          />
        </div>
      </div>

      {/* Personal Phone */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1">
          Personal Phone
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Phone size={20} />
          </div>
          <input
            type="tel"
            name="personalPhone"
            value={staffData.personalPhone || ""}
            readOnly
            className="w-full py-3.5 pl-12 pr-4 rounded-xl border border-slate-300 outline-none text-sm font-medium bg-slate-50 text-slate-600 cursor-not-allowed"
            placeholder="Auto-filled from selection"
          />
        </div>
      </div>
      
      {/* Password fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Lock size={20} />
            </div>
            <input
              type="password"
              name="password"
              value={staffData.password}
              readOnly
              onChange={(e) => onInputChange(e, "staff")}
             className="w-full py-3.5 pl-12 pr-4 rounded-xl border
               border-slate-300 outline-none text-sm font-medium bg-slate-50 text-slate-600 cursor-not-allowed"
              placeholder="Enter password"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Lock size={20} />
            </div>
            <input
              type="password"
              name="confirmPassword"
              value={staffData.password}
              readOnly
              onChange={(e) => onInputChange(e, "staff")}
              className="w-full py-3.5 pl-12 pr-4 rounded-xl border
               border-slate-300 outline-none text-sm font-medium bg-slate-50 text-slate-600 cursor-not-allowed"
              placeholder="Confirm password"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          onClick={onSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-4 text-base rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl active:shadow-md group font-['Roboto_Slab']"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              Registering...
            </span>
          ) : (
            <span className="flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              Create Account
              <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          )}
        </button>
        <p className="text-slate-500 text-xs text-center mt-3 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3 flex-shrink-0" />
          Your data is securely encrypted
        </p>
      </div>
    </>
  );
};

// --------------------- Client Form ---------------------
const ClientForm = ({
  clientData,
  onInputChange,
  onSubmit,
  loading,
  customSelectStyles,
  ClientFN,
  // firstNameOptions,
  onSelectChange
}) => {
  // console.log('from client ::::', clientData)
  return (
    <>
      {/* Org Name */}
      <div className="space-y-2">
        <label className=" text-sm font-semibold text-slate-700 flex items-center gap-1">
          Client / Organization Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Building size={20} />
          </div>
          <Select
            options={ClientFN}
            value={ClientFN?.find((opt) => opt.value === clientData.organizationName )}
            onChange={(selected) => onSelectChange(selected, "fullName", "client")}
            className="react-select-container"
            classNamePrefix="select"
            placeholder="Select client full name..."
            isClearable
            isSearchable
            styles={customSelectStyles}
          />
        </div>
      </div>

      {/* Org Email */}
      <div className="space-y-2">
        <label className=" text-sm font-semibold text-slate-700 flex items-center gap-1">
          Organization Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Mail size={20} />
          </div>
          <input
            type="email"
            name="email"
            value={clientData.email}
            readOnly={!!clientData.organizationName}
            onChange={(e) => onInputChange(e, "client")}
            className={`w-full py-3.5 pl-12 pr-4 rounded-xl border border-slate-300 outline-none text-sm font-medium ${clientData.organizationName ? 'bg-slate-50 text-slate-600 cursor-not-allowed' : 'bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}`}
            placeholder="contact@organization.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className=" text-sm font-semibold text-slate-700 flex items-center gap-1">
          Organization Phone/Contact No. <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <PhoneCall size={20} />
          </div>
          <input
            type="tel"
            name="clientPhone"
            value={clientData.phone}
            readOnly={!!clientData.organizationName}
            onChange={(e) => onInputChange(e, "client")}
            className={`w-full py-3.5 pl-12 pr-4 rounded-xl border border-slate-300 outline-none text-sm font-medium ${clientData.organizationName ? 'bg-slate-50 text-slate-600 cursor-not-allowed' : 'bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}`}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className=" text-sm font-semibold text-slate-700 flex items-center gap-1">
          UserName <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <User size={20} />
          </div>
          <input
            type="text"
            name="clientUsername"
            value={clientData.username}
            readOnly={!!clientData.organizationName}
            onChange={(e) => onInputChange(e, "client")}
            className={`w-full py-3.5 pl-12 pr-4 rounded-xl border border-slate-300 outline-none text-sm font-medium ${clientData.organizationName ? 'bg-slate-50 text-slate-600 cursor-not-allowed' : 'bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}`}
            placeholder="Auto-generated from organization name"
          />
        </div>
      </div>

      {/* Password fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Lock size={20} />
            </div>
            <input
              type="password"
              name="password"
              value={clientData.password}
              readOnly={!!clientData.organizationName}
              onChange={(e) => onInputChange(e, "client")}
              className={`w-full py-3.5 pl-12 pr-4 rounded-xl border border-slate-300 outline-none text-sm font-medium ${clientData.organizationName ? 'bg-slate-50 text-slate-600 cursor-not-allowed' : 'bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}`}
              placeholder="Enter password"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Lock size={20} />
            </div>
            <input
              type="password"
              name="confirmPassword"
              value={clientData.confirmPassword }
              readOnly={!!clientData.organizationName}
              onChange={(e) => onInputChange(e, "client")}
              className={`w-full py-3.5 pl-12 pr-4 rounded-xl border border-slate-300 outline-none text-sm font-medium ${clientData.organizationName ? 'bg-slate-50 text-slate-600 cursor-not-allowed' : 'bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}`}
              placeholder="Confirm password"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          onClick={onSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-4 text-base rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl active:shadow-md group font-['Roboto_Slab']"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              Registering...
            </span>
          ) : (
            <span className="flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              Create Account
              <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          )}
        </button>
        <p className="text-slate-500 text-xs text-center mt-3 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3 flex-shrink-0" />
          Your data is securely encrypted
        </p>
      </div>
    </>
  );
};

// --------------------- Parent Modal ---------------------
export const RegisterModal = ({ onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState("staff");

  // Separate states for staff and client
  const [staffData, setStaffData] = useState(initialStaffState);
  const [clientData, setClientData] = useState(initialClientState);

  const [recruitmentData, setRecruitmentData] = useState([]);
  const [client_Recruitment_Data, set_client_Recruitment_Data] = useState([]);
  const { data, isLoading, isFetching } = useRecruitmentData();
  const { data: clientRecruitmentData } = useRecruitmentDataForClient();

  // console.log('from client Register form', clientRecruitmentData);

  useEffect(() => {
    setRecruitmentData(data);
    set_client_Recruitment_Data(clientRecruitmentData)
  }, [data, clientRecruitmentData]);

  // console.log("Recruitment Client:", client_Recruitment_Data);
  const ClientFN = useMemo(() => C_fullNameOptions(client_Recruitment_Data), [client_Recruitment_Data]);
  // console.log('Client full name options:', ClientFN);
  const ClientEmail = useMemo(() => C_createOptions(client_Recruitment_Data, "officialEmail"), [client_Recruitment_Data]);
  const ClientPhone = useMemo(() => C_createOptions(client_Recruitment_Data, "officialPhone"), [client_Recruitment_Data]);
  // console.log('Client Email options:', ClientEmail, ClientPhone);

  // Options
  const firstNameOptions = useMemo(() => fullNameOptions(recruitmentData), [recruitmentData]);
  const designationOptions = useMemo(() => createOptions(recruitmentData, "designation"), [recruitmentData]);
  const positionOptions = designationOptions;

  const roleOptions = useMemo(
    () => [{ value: "staff", label: "Staff", icon: "👤" }],
    []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to reset forms
  const resetForms = () => {
    setStaffData(initialStaffState);
    setClientData(initialClientState);
  };

  const handleSubmit = async (formType) => {
    alert(formType)
  };

  const handleInputChange = (e, type = activeTab) => {
    const { name, value } = e.target;

    if (type === "staff") {
      setStaffData((prev) => ({ ...prev, [name]: value }));
    } else {
      setClientData((prev) => ({ ...prev, [name]: value }));
    }
  };

  function generatePWDigit() {
    // Generate a number between 0 and 9999, pad with zeros to make 4 digits
    const pw = Math.floor(1000 + Math.random() * 9000);
    return pw.toString();
  }

  function generateUserNameDigit() {
    // Generate a number between 0 and 9999, pad with zeros to make 4 digits
    const pw = Math.floor(1000 + Math.random() * 9000);
    return pw.toString();
  }

  const handleSelectChange = (selectedOption, fieldName, type = activeTab) => {
    if (type === "staff" && fieldName === "fullName" && selectedOption) {
      const selectedRecord = recruitmentData?.data?.find((item) => item._id === selectedOption.value);
      // console.log("Selected Record for Full Name:", selectedRecord);
      if (selectedRecord) {
        setStaffData((prev) => ({
          ...prev,
          fullName: selectedOption.label,
          personalEmail: selectedRecord.personalEmail || "",
          personalPhone: selectedRecord.personalMobile || "",
          position: `${selectedRecord.jobRole || ""} - ${selectedRecord.designation || ""}`.trim(),
          userName: `${selectedRecord.firstName.toLowerCase() || ""}${selectedRecord.lastName.toLowerCase() || ""}${generateUserNameDigit()}`.trim(),
          employee_id: selectedRecord._id || "",
          password: `${selectedRecord.firstName.toLowerCase() || ""}${generatePWDigit()}`.trim(),
          confirmPassword: `${selectedRecord.firstName.toLowerCase() || ""}${generatePWDigit()}`.trim(), // Auto-fill confirm password too
        }));
      }
      return;
    }

    if (type === "client" && fieldName === "fullName" && selectedOption) {
      // alert('Client selected: ' + selectedOption.label);
      const selectedRecord = clientRecruitmentData?.data?.find((item) => item._id === selectedOption.value);
      // console.log("Selected Record for Client Full Name:", selectedRecord);
      if (selectedRecord) {
        const clientName = selectedOption.label.toLowerCase().replace(/\s+/g, "").substring(0, 6); // Take first 10 characters of organization name for username/password
        setClientData((prev) => ({
          ...prev,
          organizationName: selectedOption.label,
          email : selectedRecord.contact.officialEmail || "",
          phone: selectedRecord.contact.officialPhone || "",
          username: `${clientName}${generateUserNameDigit()}`.trim(),
          Client_id: selectedRecord._id || "",
          password: `${clientName}${generatePWDigit()}`.trim(),
          confirmPassword: `${clientName}${generatePWDigit()}`.trim(),
        }));
      }
      return;
    }
    
    if (type === "staff") {
      setStaffData((prev) => ({
        ...prev,
        [fieldName]: selectedOption ? selectedOption.value : "",
      }));
    } else {
      setClientData((prev) => ({
        ...prev,
        [fieldName]: selectedOption ? selectedOption.value : "",
      }));
    }
  };

// console.log('from handleSelectChange clientData:', clientData);


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
    // Reset form when switching tabs
    if (tab === "staff") {
      setStaffData(initialStaffState);
    } else {
      setClientData(initialClientState);
    }
  };

  // ✅ make select styles reusable
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#f59e0b" : "#cbd5e1",
      borderRadius: "0.75rem",
      padding: "4px 8px",
      minHeight: "56px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(245, 158, 11, 0.1)" : "none",
      "&:hover": { borderColor: "#f59e0b" },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#f59e0b" : state.isFocused ? "#fef3c7" : "white",
      color: state.isSelected ? "white" : "#1e293b",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
      "&:active": { backgroundColor: "#fbbf24" },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.75rem",
      border: "1px solid #e2e8f0",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      overflow: "hidden",
    }),
    placeholder: (base) => ({ ...base, color: "#94a3b8", fontSize: "14px", fontWeight: "500" }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#94a3b8",
      padding: "8px",
      "&:hover": { color: "#f59e0b" },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    valueContainer: (base) => ({ ...base, padding: "0 8px" }),
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.65 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-0 bg-black/60 w-full z-50 flex justify-center p-3 backdrop-blur-md"
      >
        {isLoading || isFetching ? (
          <RegisterSkeleton />
        ) : (
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-xl border border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-amber-100 rounded-lg">
                  {activeTab === "staff" ? (
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                  ) : (
                    <Building className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 font-['Roboto_Slab']">
                    Register
                    <span className="text-amber-500 ml-2">
                      {activeTab === "staff" ? "Staff" : "Client"}
                    </span>
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5 flex items-center gap-1">
                    <KeyRound className="w-3 h-3 flex-shrink-0" />
                    Create new account
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-amber-50 rounded-xl transition-all duration-300 hover:scale-105 border border-slate-200 group"
              >
                <X className="w-5 h-5 text-slate-500 group-hover:text-amber-500" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => handleTabChange("staff")}
                className={`flex-1 py-4 text-center font-medium transition-all duration-300 relative group flex items-center justify-center gap-2 ${activeTab === "staff" ? "text-amber-600" : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                <User className={`w-4 h-4 ${activeTab === "staff" ? "text-amber-500" : "text-slate-400"}`} />
                <span className="font-['Roboto_Slab']">Staff</span>
                {activeTab === "staff" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-t-full" />
                )}
              </button>

              <button
                onClick={() => handleTabChange("client")}
                className={`flex-1 py-4 text-center font-medium transition-all duration-300 relative group flex items-center justify-center gap-2 ${activeTab === "client" ? "text-amber-600" : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                <Building className={`w-4 h-4 ${activeTab === "client" ? "text-amber-500" : "text-slate-400"}`} />
                <span className="font-['Roboto_Slab']">Client</span>
                {activeTab === "client" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-t-full" />
                )}
              </button>
            </div>

            {/* Form */}
            <form
             onSubmit={(e) => { e.preventDefault(); handleSubmit(activeTab); }}
              className="p-4 sm:p-6 space-y-5 max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
            >
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm flex items-start gap-2">
                  <CircleAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              {activeTab === "staff" ? (
                <StaffForm
                  staffData={staffData}
                  onSelectChange={handleSelectChange}
                  onInputChange={handleInputChange}
                  roleOptions={roleOptions}
                  firstNameOptions={firstNameOptions}
                  customSelectStyles={customSelectStyles}
                 onSubmit={() => handleSubmit("staff")}  
                  loading={loading}
                />
              ) : (
                <ClientForm
                  clientData={clientData}
                  onInputChange={handleInputChange}
                  onSelectChange={handleSelectChange}
                  ClientFN={ClientFN}
                  firstNameOptions={firstNameOptions}
                  customSelectStyles={customSelectStyles}
                  onSubmit={() => handleSubmit("client")}
                  loading={loading}
                />
              )}
            </form>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

// Register Skeleton
export const RegisterSkeleton = () => {
  const skeletonClass = "bg-slate-200 animate-pulse rounded-xl";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.65 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 bg-black/60 z-50 flex justify-center p-3 backdrop-blur-md"
    >
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-xl border border-slate-200 p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-200 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="w-3/4 h-5 rounded bg-slate-200 animate-pulse" />
            <div className="w-1/2 h-3 rounded bg-slate-200 animate-pulse" />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 h-10 rounded bg-slate-200 animate-pulse" />
          <div className="flex-1 h-10 rounded bg-slate-200 animate-pulse" />
        </div>
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-full h-12 sm:h-14 lg:h-16 rounded-xl bg-slate-200 animate-pulse" />
          ))}
        </div>
        <div className="w-full h-12 sm:h-14 lg:h-16 rounded-xl bg-slate-200 animate-pulse mt-4" />
      </div>
    </motion.div>
  );
};