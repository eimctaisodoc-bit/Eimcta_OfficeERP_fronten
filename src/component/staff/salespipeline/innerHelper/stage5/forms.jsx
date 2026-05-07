
import React, { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Hash,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  Users,
} from "lucide-react";
import Select from "react-select";
import { useGet } from "../../../../hooks/useGet"; // update path if needed
import { UseAdd } from "../../../../hooks/useadd";
import { ValidateStyle } from "../../../../../data/data";
import { SuccessNotify,waitingNotify } from "../../../../hotToaster";

const editableFields = [
  {
    name: "organizationName",
    label: "Organization Name",
    type: "text",
    icon: Building2,
    placeholder: "Enter organization name",
  },
  {
    name: "organizationType",
    label: "Organization Type",
    type: "select",
    icon: BriefcaseBusiness,
    multiple: false,
    options: [
      { label: "Private Limited", value: "private_limited" },
      { label: "Public Limited", value: "public_limited" },
      { label: "School", value: "school" },
      { label: "College", value: "college" },
      { label: "NGO", value: "ngo" },
      { label: "Government", value: "government" },
    ],
  },
  {
    name: "registrationNumber",
    label: "Registration Number",
    type: "text",
    icon: Hash,
    placeholder: "REG-123456",
  },
  {
    name: "vatPan",
    label: "VAT / PAN",
    type: "text",
    icon: BadgeCheck,
    placeholder: "PAN-987654",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    icon: MapPin,
    placeholder: "Kathmandu, Nepal",
  },
  {
    name: "contactPersonName",
    label: "Contact Person Name",
    type: "text",
    icon: User,
    placeholder: "Ram Bahadur",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    icon: BriefcaseBusiness,
    multiple: true,
    options: [
      { label: "Owner / Founder", value: "owner_founder" },
      { label: "CEO / Managing Director", value: "ceo_md" },
      { label: "Director", value: "director" },
      { label: "General Manager", value: "general_manager" },
      { label: "Operations Manager", value: "operations_manager" },
      { label: "Quality Manager", value: "quality_manager" },
      { label: "HR Manager", value: "hr_manager" },
      { label: "Safety Officer / HSE Manager", value: "hse_manager" },
      { label: "IT Manager", value: "it_manager" },
      { label: "Finance / Accounts Manager", value: "finance_manager" },
      { label: "Procurement / Purchase Manager", value: "procurement_manager" },
      { label: "Project Manager", value: "project_manager" },
      { label: "Supervisor / Team Leader", value: "supervisor_team_lead" },
      { label: "Chairman / Chairperson", value: "chairman" },
      { label: "Other", value: "other" },
    ],
    placeholder: "Director",
  },
  {
    name: "contactPersonEmail",
    label: "Contact Person Email",
    type: "email",
    icon: Mail,
    placeholder: "client@example.com",
  },
  {
    name: "contactPersonNumber",
    label: "Contact Person Number",
    type: "number",
    icon: Phone,
    placeholder: "9841234567",
  },
  {
    name: "industyType",
    label: "Industry Type",
    type: "select",
    multiple: true,
    icon: BriefcaseBusiness,
    options: [
      { label: "IT", value: "it", color: "#3b82f6" },
      { label: "Education", value: "education", color: "#8b5cf6" },
      { label: "Travel & Tourism", value: "travel_tourism", color: "#06b6d4" },
      { label: "Manufacturing", value: "manufacturing", color: "#f59e0b" },
      { label: "Healthcare", value: "healthcare", color: "#ef4444" },
      { label: "Construction", value: "construction", color: "#f97316" },
      { label: "Trading", value: "trading", color: "#84cc16" },
      { label: "Consultancy", value: "consultancy", color: "#6366f1" },
      { label: "Food & Beverage", value: "food_beverage", color: "#ea580c" },
      { label: "Hospitality (Hotels/Resorts)", value: "hospitality", color: "#ec4899" },
      { label: "Logistics & Transportation", value: "logistics", color: "#0ea5e9" },
      { label: "Energy & Utilities", value: "energy", color: "#22c55e" },
      { label: "Financial Services", value: "finance", color: "#14b8a6" },
    ],
    placeholder: "IT/Software, Education",
  },
  {
    name: "totalEducator",
    label: "Total Educator",
    type: "number",
    icon: Users,
    placeholder: "10",
  },
  {
    name: "totalEmp_learners",
    label: "Total Employees / Learners",
    type: "number",
    icon: Users,
    placeholder: "50",
  },
];

const isEmptyValue = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;

  if (
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).length === 0
  ) {
    return true;
  }

  return false;
};

const getDisplayValue = (field, value) => {
  if (field === "industyType") {
    return Array.isArray(value) ? value.join(", ") : value || "";
  }

  return value ?? "";
};

const normalizeValue = (field, value) => {
  if (field === "totalEducator" || field === "totalEmp_learners") {
    return value === "" ? "" : Number(value);
  }

  if (field === "industyType") {
    console.log("Normalizing industry type value:", value);
    return value ? value.split(",")
      .map((item) => item.trim())
      .filter(Boolean) : [];
  }

  return value;
};

export const ContractForms = ({ id }) => {
  const fontStyle = { fontFamily: "'Roboto Slab', serif" };

  const [organizations, setOrganizations] = useState([]);
  const [touched, setTouched] = useState({});
  const [saveStatus, setSaveStatus] = useState({});

  const autoSaveTimers = useRef({});

  const { getOnlyOrgDetails_, } = useGet();
  const { update_Only_OrgDetails } = UseAdd();

  useEffect(() => {
    if (!id?.mainID) return;

    getOnlyOrgDetails_.mutate(
      { parms: { _id: id?.mainID } },
      {
        onSuccess: (data) => {
          setOrganizations(data?.data?.organizationDetails || []);
        },
        onError: (err) => {
          console.error("Error fetching organization details:", err);
        },
      }
    );
  }, [id?.mainID]);

  useEffect(() => {
    return () => {
      Object.values(autoSaveTimers.current).forEach(clearTimeout);
    };
  }, []);

  const getEmptyFields = (org) => {
    return editableFields
      .filter((field) => isEmptyValue(org?.[field.name]))
      .map((field) => field.label);
  };

  const saveOrganization = (index, organizationData) => {
    setSaveStatus((prev) => ({
      ...prev,
      [index]: "saving",
    }));

    // send only one object
    const singleOrganizationObject = {
      ...organizationData,
    };

    const payload = {
      parms: {
        _id: id?.mainID,
        organizationId: organizationData?._id,
      },
      body: {
        organizationDetails: singleOrganizationObject,
      },
    };

    const safePayload = payload?.body ?? {};

    if (update_Only_OrgDetails?.mutate) {
      update_Only_OrgDetails.mutate(
        {
          parms: payload.parms,
          payload: safePayload,
        },
        {
          onSuccess: (data) => {
            // console.log("Auto save successful:", data);

            setSaveStatus((prev) => ({
              ...prev,
              [index]: "saved",
            }));
          },

          onError: (err) => {
            console.error("Auto save failed:", err?.response?.data || err);

            setSaveStatus((prev) => ({
              ...prev,
              [index]: "error",
            }));
          },
        }
      );

      return;
    }

    console.log("Auto save payload:", payload);

    setTimeout(() => {
      setSaveStatus((prev) => ({
        ...prev,
        [index]: "saved",
      }));
    }, 400);
  };
  useEffect(() => {
    if (saveStatus?.[0] === "waiting") {
      waitingNotify("Saving organization details...");
      // console.log("Auto-saving organization at index 0 with data:", organizations[0]);
    }
    if (saveStatus?.[0] === "error") {
      console.log("save failed for organization at index 0. Please check the payload and try again.");
    }
    if (saveStatus?.[0] === "saved") {
      SuccessNotify("Organization details saved successfully!");
    }
  }, [saveStatus]);
  const scheduleAutoSave = (index, organizationData) => {
    if (autoSaveTimers.current[index]) {
      clearTimeout(autoSaveTimers.current[index]);
    }

    setSaveStatus((prev) => ({
      ...prev,
      [index]: "waiting",
    }));

    autoSaveTimers.current[index] = setTimeout(() => {
      saveOrganization(index, organizationData);
    }, 700);
  };
  console.log(saveStatus)
  // if (saveStatus?.[0] === "waiting") {

  // }
  const handleChange = (index, field, rawValue) => {
    const value = normalizeValue(field, rawValue);

    const nextOrganization = {
      ...organizations[index],
      [field]: value,
    };

    const nextOrganizations = organizations.map((org, itemIndex) =>
      itemIndex === index ? nextOrganization : org
    );

    setOrganizations(nextOrganizations);

    setTouched((prev) => ({
      ...prev,
      [`${index}.${field}`]: true,
    }));

    scheduleAutoSave(index, nextOrganization);
  };

  const renderSaveStatus = (index) => {
    const status = saveStatus[index];

    if (status === "waiting") {
      return (
        <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-bold uppercase text-amber-600">
          <Save size={12} />
          Waiting
        </span>
      );
    }

    if (status === "saving") {
      return (
        <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-[11px] font-bold uppercase text-blue-600">
          <Loader2 size={12} className="animate-spin" />
          Saving
        </span>
      );
    }

    if (status === "saved") {
      return (
        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[11px] font-bold uppercase text-emerald-600">
          <BadgeCheck size={12} />
          Saved
        </span>
      );
    }

    if (status === "error") {
      return (
        <span className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2 py-1 text-[11px] font-bold uppercase text-red-600">
          <AlertTriangle size={12} />
          Failed
        </span>
      );
    }

    return null;
  };

  return (
    <div className="mx-auto w-full bg-transparent px-3 py-4" style={fontStyle}>
      <div className="mb-4 flex items-start gap-3 rounded-lg border border-amber-200/80 bg-amber-50 px-4 py-3">
        <AlertTriangle
          className="mt-0.5 shrink-0 text-amber-500"
          size={18}
          strokeWidth={2.5}
        />

        <div className="flex-1">
          <h5 className="text-sm font-medium text-amber-800">
            Organization details are auto-saved after each change.
          </h5>
          <p className="mt-0.5 text-[11px] text-amber-700">
            Complete all required fields before continuing contract actions.
          </p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-xl bg-amber-50 p-1.5">
          <Building2 size={14} className="text-amber-500" />
        </div>

        <h2 className="text-sm font-bold uppercase text-slate-900 sm:text-[12px]">
          Organization Forms
        </h2>
      </div>

      {organizations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-center">
          <h3 className="text-sm font-bold text-slate-900">
            No organization details found
          </h3>
          <p className="mt-1 text-[12px] text-slate-500">
            Please add organization details first.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {organizations.map((org, index) => {
            const emptyFields = getEmptyFields(org);
            const isComplete = emptyFields.length === 0;

            return (
              <div
                key={org?._id || index}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl bg-emerald-50 p-1.5">
                      <Building2 size={14} className="text-emerald-500" />
                    </div>

                    <div>
                      <h3 className="text-[13px] font-bold uppercase tracking-wide text-slate-900">
                        {org?.organizationName || `Organization ${index + 1}`}
                      </h3>

                      <p className="text-[11px] text-slate-500">
                        {isComplete
                          ? "All organization fields are completed"
                          : `${emptyFields.length} field(s) missing`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {renderSaveStatus(index)}

                    <span
                      className={`rounded-lg px-2 py-1 text-[11px] font-bold uppercase ${isComplete
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                        }`}
                    >
                      {isComplete ? "Complete" : "Incomplete"}
                    </span>
                  </div>
                </div>

                {!isComplete && (
                  <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
                    <p className="text-[11px] font-semibold text-amber-800">
                      Empty Fields:
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {emptyFields.map((field) => (
                        <span
                          key={field}
                          className="rounded-lg bg-white px-2 py-1 text-[11px] font-semibold text-amber-700"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {editableFields.map((field) => {
                    const Icon = field.icon;
                    const key = `${index}.${field.name}`;
                    const hasError =
                      touched[key] && isEmptyValue(org?.[field.name]);

                    return (
                      <label key={field.name} className="flex flex-col gap-2">
                        <span className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                          <Icon size={13} className="text-amber-500" />
                          {field.label}
                        </span>

                        {field.type === "select" ? (
                          <div className="w-full">
                            <Select
                              name={field.name}
                              isMulti={field.multiple}
                              options={field.options}
                              placeholder={`Select ${field.label}`}
                              styles={ValidateStyle(false, false, "25px")}

                              value={
                                field.multiple
                                  ? field.options?.filter((option) =>
                                    Array.isArray(org?.[field.name])
                                      ? org?.[field.name]?.includes(option.value)
                                      : false
                                  )
                                  : field.options?.find(
                                    (option) =>
                                      option.value === getDisplayValue(field.name, org?.[field.name])
                                  ) || null
                              }

                              onChange={(option) => {
                                if (field.multiple) {
                                  const values = option ? option.map((item) => item.value) : [];
                                  handleChange(index, field.name, values);
                                } else {
                                  handleChange(index, field.name, option?.value || "");
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={getDisplayValue(field.name, org?.[field.name])}
                            placeholder={field.placeholder}
                            onChange={(e) =>
                              handleChange(index, field.name, e.target.value)
                            }
                            className={`w-full rounded-lg border h-[48px] bg-white px-3 
      py-2.5 text-sm outline-none transition-colors ${hasError
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-200 focus:border-amber-500"
                              }`}
                          />
                        )}

                        {hasError && (
                          <span className="text-[11px] text-red-500">
                            {field.label} is required
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="grid grid-cols-1 gap-3 text-[11px] text-slate-500 sm:grid-cols-2">
                    <p>
                      <span className="font-bold text-slate-700">Created:</span>{" "}
                      {org?.createdAt
                        ? new Date(org.createdAt).toLocaleString()
                        : "Not available"}
                    </p>

                    <p>
                      <span className="font-bold text-slate-700">Updated:</span>{" "}
                      {org?.updatedAt
                        ? new Date(org.updatedAt).toLocaleString()
                        : "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};