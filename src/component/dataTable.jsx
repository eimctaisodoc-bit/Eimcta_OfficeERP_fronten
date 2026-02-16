import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as LucideIcons from "lucide-react";
import { RegisterModal } from "./Registermodal";

// Responsive Avatar component
const Avatar = ({ name, size = 10, mobileSize = 8 }) => {
  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const colors = [
    "bg-amber-100 text-amber-800",
    "bg-slate-100 text-slate-800",
    "bg-emerald-100 text-emerald-800",
    "bg-blue-100 text-blue-800",
    "bg-purple-100 text-purple-800",
    "bg-rose-100 text-rose-800",
  ];

  const colorIndex = name
    ? name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length
    : 0;

  return (
    <div
      className={`flex items-center justify-center rounded-full ${colors[colorIndex]} font-semibold 
        w-${mobileSize} h-${mobileSize} 
        sm:w-${size} sm:h-${size}`}
    >
      <span className="text-xs sm:text-sm">{getInitials(name)}</span>
    </div>
  );
};

// Responsive Status badge component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    Present: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    Absent: "bg-rose-100 text-rose-800 border border-rose-200",
    Late: "bg-amber-100 text-amber-800 border border-amber-200",
    "On Leave": "bg-blue-100 text-blue-800 border border-blue-200",
    Holiday: "bg-purple-100 text-purple-800 border border-purple-200",
    Halfday: "bg-orange-100 text-orange-800 border border-orange-200",
    Verified: "bg-green-100 text-green-800 border border-green-200",
    Pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    Restricted: "bg-purple-100 text-purple-800 border border-purple-200",
    Active: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    Inactive: "bg-slate-100 text-slate-800 border border-slate-200",
    Contract: "bg-blue-100 text-blue-800 border border-blue-200",
    Freelance: "bg-purple-100 text-purple-800 border border-purple-200",
    "On Project": "bg-amber-100 text-amber-800 border border-amber-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[status] || "bg-gray-100 text-gray-800"}`}
    >
      <span className="hidden sm:inline">{status}</span>
      <span className="sm:hidden">
        {status === "Present" ? "P" :
          status === "Absent" ? "A" :
            status === "Active" ? "Act" :
              status === "Contract" ? "Con" :
                status.substring(0, 3)}
      </span>
    </span>
  );
};

// Responsive Modal component for Add/Edit


// Responsive Restrict Modal Component
const RestrictModal = ({ isOpen, onClose, attendanceId, onSuccess, attendanceRecords }) => {
  const [formData, setFormData] = useState({
    reason: "",
    approved_by: "",
    notes: "",
    restriction_type: "temporary",
    restriction_date: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const employeeRecord = attendanceRecords.find(record => record.attendance_id === attendanceId);
  const empInfo = employeeRecord ? employeeInfo[employeeRecord.employee_id] : null;

  useEffect(() => {
    if (attendanceId && employeeRecord) {
      setFormData({
        reason: "",
        approved_by: "",
        notes: "",
        restriction_type: "temporary",
        restriction_date: "",
        description: "",
      });
      setError("");
    }
  }, [attendanceId, employeeRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.restriction_type === "temporary" && !formData.restriction_date) {
      setError("Please select an end date for temporary restriction");
      setLoading(false);
      return;
    }

    if (!formData.description || !formData.reason || !formData.approved_by) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (formData.restriction_type === "permanent") {
      if (!window.confirm("Are you sure you want to apply permanent restriction? This action cannot be undone.")) {
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.post(
        `/api/attendance/${attendanceId}/restrict`,
        formData
      );
      if (response.data.success) {
        onSuccess(response.data.data);
        onClose();
      } else {
        setError(response.data.message || "Failed to restrict record");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen || !employeeRecord || !empInfo) return null;
  // Restriction record 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-2 sm:mx-0 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 truncate">
              Restrict Record
            </h3>
            <p className="text-sm text-slate-500 mt-1 hidden sm:block">
              Apply restrictions to this attendance record
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0 ml-2"
          >
            <LucideIcons.X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-4 sm:p-6 border-b bg-slate-50">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <Avatar name={empInfo.name} size={12} mobileSize={10} />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-900 truncate">{empInfo.name}</h4>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-x-4 sm:gap-y-1 mt-1">
                <div className="flex items-center text-xs sm:text-sm text-slate-600">
                  <LucideIcons.Badge className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="truncate">{employeeRecord.employee_id}</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-slate-600">
                  <LucideIcons.Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="truncate">{empInfo.position}</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-slate-600">
                  <LucideIcons.Building className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="truncate">{empInfo.department}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
              <div className="col-span-2 sm:col-span-1">
                <span className="text-slate-500">Date:</span>
                <div className="font-medium text-slate-900 truncate">
                  {new Date(employeeRecord.attendance_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-slate-500">Status:</span>
                <div className="truncate">
                  <StatusBadge status={employeeRecord.attendance_status} />
                </div>
              </div>
              <div className="col-span-1">
                <span className="text-slate-500">Mode:</span>
                <div className="font-medium text-slate-900 truncate">
                  {employeeRecord.attendance_mode}
                </div>
              </div>
              <div className="col-span-1">
                <span className="text-slate-500">Hours:</span>
                <div className="font-medium text-slate-900 truncate">
                  {employeeRecord.total_working_hours}
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Restriction Type *
            </label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <label className="flex items-center flex-1 min-w-[100px]">
                <input
                  type="radio"
                  name="restriction_type"
                  value="temporary"
                  checked={formData.restriction_type === "temporary"}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-slate-700">Temporary</span>
              </label>
              <label className="flex items-center flex-1 min-w-[100px]">
                <input
                  type="radio"
                  name="restriction_type"
                  value="permanent"
                  checked={formData.restriction_type === "permanent"}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-slate-700">Permanent</span>
              </label>
              <label className="flex items-center flex-1 min-w-[120px]">
                <input
                  type="radio"
                  name="restriction_type"
                  value="under_review"
                  checked={formData.restriction_type === "under_review"}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-slate-700">Under Review</span>
              </label>
            </div>
          </div>

          {formData.restriction_type === "temporary" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Restriction End Date *
              </label>
              <input
                type="date"
                name="restriction_date"
                value={formData.restriction_date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                required={formData.restriction_type === "temporary"}
              />
              <p className="text-xs text-slate-500 mt-1">
                The restriction will be automatically removed on this date
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description / Message *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              required
              rows="3"
              placeholder="Enter detailed description for restriction..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Reason *
            </label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              required
            >
              <option value="">Select a reason</option>
              <option value="late_arrival">Late Arrival</option>
              <option value="early_departure">Early Departure</option>
              <option value="unauthorized_absence">Unauthorized Absence</option>
              <option value="time_tampering">Time Tampering</option>
              <option value="policy_violation">Policy Violation</option>
              <option value="system_issue">System Issue</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Approved By *
            </label>
            <input
              type="text"
              name="approved_by"
              value={formData.approved_by}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              required
              placeholder="Enter approver name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              rows="2"
              placeholder="Any additional notes or comments..."
            />
          </div>

          <div className="p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start">
              <LucideIcons.AlertCircle className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-700">
                <p className="font-medium mb-1">Important Notice:</p>
                <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
                  <li>Temporary restrictions will auto-expire on the selected date</li>
                  <li>Permanent restrictions require manager approval</li>
                  <li>Restricted records cannot be edited until restriction is lifted</li>
                  <li>All restrictions are logged in the audit trail</li>
                </ul>
              </div>
            </div>
          </div>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-end p-4 sm:p-6 border-t space-y-2 sm:space-y-0 sm:space-x-3 sticky bottom-0 bg-white z-10">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <LucideIcons.Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Applying...
              </>
            ) : (
              <>
                <LucideIcons.ShieldAlert className="w-4 h-4 mr-2" />
                Apply Restriction
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Responsive View Details Modal Component
const ViewDetailsModal = ({ isOpen, onClose, record }) => {
  if (!isOpen || !record) return null;

  const empInfo = employeeInfo[record.employee_id] || clientInfo[record.employee_id];
  const isClient = record.type === 'client';
  // eomloyee record +client record in view case
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-2 sm:mx-0 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 truncate">
              {isClient ? 'Client Details' : 'Employee Details'}
            </h3>
            <p className="text-sm text-slate-500 mt-1 hidden sm:block">
              View complete information for this record
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0 ml-2"
          >
            <LucideIcons.X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Header Section */}
          <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
            <Avatar name={empInfo?.name || "Unknown"} size={16} mobileSize={12} />
            <div className="flex-1 min-w-0">
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 truncate">{empInfo?.name || "Unknown"}</h4>
              <p className="text-sm text-slate-600 mt-1 truncate">
                {isClient ? 'Client' : empInfo?.position || "Position not specified"}
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                <StatusBadge status={record.attendance_status || record.status} />
                {record.restricted && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                    <LucideIcons.ShieldAlert className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">Restricted</span>
                    <span className="sm:hidden">Rest</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Grid Layout for Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column - Personal/Company Info */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h5 className="text-sm font-semibold text-slate-700 mb-2 sm:mb-3 flex items-center">
                  <LucideIcons.User className="w-4 h-4 mr-2 flex-shrink-0" />
                  {isClient ? 'Company Information' : 'Personal Information'}
                </h5>
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <label className="text-xs text-slate-500">ID</label>
                    <p className="text-sm font-medium text-slate-900 truncate">{record.employee_id}</p>
                  </div>
                  {!isClient && (
                    <>
                      <div>
                        <label className="text-xs text-slate-500">Department</label>
                        <p className="text-sm font-medium text-slate-900 truncate">{empInfo?.department || "N/A"}</p>
                      </div>
                      <div>
                        <label className="text-xs text-slate-500">Office</label>
                        <p className="text-sm font-medium text-slate-900 truncate">{empInfo?.office || "N/A"}</p>
                      </div>
                    </>
                  )}
                  {isClient && (
                    <>
                      <div>
                        <label className="text-xs text-slate-500">Company</label>
                        <p className="text-sm font-medium text-slate-900 truncate">{empInfo?.company || "N/A"}</p>
                      </div>
                      <div>
                        <label className="text-xs text-slate-500">Industry</label>
                        <p className="text-sm font-medium text-slate-900 truncate">{empInfo?.industry || "N/A"}</p>
                      </div>
                    </>
                  )}
                  <div>
                    <label className="text-xs text-slate-500">Email</label>
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {empInfo?.email || `${empInfo?.name?.toLowerCase().replace(/\s+/g, ".")}@${isClient ? 'client.com' : 'company.com'}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h5 className="text-sm font-semibold text-slate-700 mb-2 sm:mb-3 flex items-center">
                  <LucideIcons.Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  Contact Information
                </h5>
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <label className="text-xs text-slate-500">Phone</label>
                    <p className="text-sm font-medium text-slate-900 truncate">{empInfo?.phone || "Not specified"}</p>
                  </div>
                  {isClient && (
                    <div>
                      <label className="text-xs text-slate-500">Contact Person</label>
                      <p className="text-sm font-medium text-slate-900 truncate">{empInfo?.contact_person || "N/A"}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Attendance/Project Info */}
            <div className="space-y-4 sm:space-y-6">
              {!isClient ? (
                <>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-700 mb-2 sm:mb-3 flex items-center">
                      <LucideIcons.Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      Attendance Information
                    </h5>
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <label className="text-xs text-slate-500">Date</label>
                        <p className="text-sm font-medium text-slate-900">
                          {new Date(record.attendance_date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <div>
                          <label className="text-xs text-slate-500">Check-in</label>
                          <p className="text-sm font-medium text-slate-900">
                            {record.check_in_time ? new Date(record.check_in_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <label className="text-xs text-slate-500">Check-out</label>
                          <p className="text-sm font-medium text-slate-900">
                            {record.check_out_time ? new Date(record.check_out_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-slate-500">Total Working Hours</label>
                        <p className="text-sm font-medium text-slate-900 truncate">{record.total_working_hours || "N/A"}</p>
                      </div>
                      <div>
                        <label className="text-xs text-slate-500">Mode</label>
                        <p className="text-sm font-medium text-slate-900 truncate">{record.attendance_mode || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <h5 className="text-sm font-semibold text-slate-700 mb-2 sm:mb-3 flex items-center">
                    <LucideIcons.Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                    Project Information
                  </h5>
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <label className="text-xs text-slate-500">Project Status</label>
                      <p className="text-sm font-medium text-slate-900 truncate">{record.project_status || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Project Value</label>
                      <p className="text-sm font-medium text-slate-900 truncate">{record.project_value || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Start Date</label>
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {record.project_start_date ? new Date(record.project_start_date).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Notes */}
              <div>
                <h5 className="text-sm font-semibold text-slate-700 mb-2 sm:mb-3 flex items-center">
                  <LucideIcons.FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                  Additional Notes
                </h5>
                <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                  <p className="text-sm text-slate-700">
                    {record.notes || empInfo?.notes || "No additional notes available for this record."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
              <div>
                <label className="text-xs text-slate-500">Created</label>
                <p className="text-sm text-slate-700 truncate">
                  {record.created_at ? new Date(record.created_at).toLocaleString() : "N/A"}
                </p>
              </div>
              <div>
                <label className="text-xs text-slate-500">Last Updated</label>
                <p className="text-sm text-slate-700 truncate">
                  {record.updated_at ? new Date(record.updated_at).toLocaleString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end p-4 sm:p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom Tooltip Component
const Tooltip = ({ children, text }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="inline-block"
      >
        {children}
      </div>
      {show && (
        <div className="hidden sm:block absolute z-20 px-3 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg shadow-sm bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-2 h-2 bg-slate-900 rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Responsive Action buttons component
const ActionButtons = ({ row, onDelete, onRestrict, onView }) => {
  const [actionLoading, setActionLoading] = useState({
    delete: false,
    restrict: false,
  });

  const handleAction = async (actionType, actionFn) => {
    setActionLoading((prev) => ({ ...prev, [actionType]: true }));
    try {
      await actionFn();
    } finally {
      setActionLoading((prev) => ({ ...prev, [actionType]: false }));
    }
  };

  const handleDelete = () => handleAction("delete", () => onDelete(row.attendance_id));
  const handleRestrictClick = () => handleAction("restrict", () => onRestrict(row.attendance_id));
  const handleViewClick = () => onView(row);

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2 ">
      {/* View button */}
      <Tooltip text="View Details">
        <button
          className="p-1.5 sm:p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 flex items-center justify-center border border-blue-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleViewClick}
        >
          <LucideIcons.Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </Tooltip>

      {/* Delete button */}
      <Tooltip text="Delete Record">
        <button
          className="p-1.5 sm:p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-all duration-200 flex items-center justify-center border border-rose-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleDelete}
          disabled={actionLoading.delete}
        >
          {actionLoading.delete ? (
            <LucideIcons.Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
          ) : (
            <LucideIcons.Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          )}
        </button>
      </Tooltip>

      {/* Restrict button */}
      {row.restricted ? (
        <Tooltip text="View Restricted Info">
          <button
            className="p-1.5 sm:p-2 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-200 flex items-center justify-center border border-purple-200 hover:scale-105"
            onClick={() => {
              alert(`Restriction Details:\n\nEmployee: ${employeeInfo[row.employee_id]?.name || row.employee_id}\nDate: ${new Date(row.attendance_date).toLocaleDateString()}\nType: ${row.restricted.restriction_type}\nReason: ${row.restricted.reason}`);
            }}
          >
            <LucideIcons.ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </Tooltip>
      ) : (
        <Tooltip text="Restrict Record">
          <button
            className="p-1.5 sm:p-2 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-200 flex items-center justify-center border border-purple-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleRestrictClick}
            disabled={actionLoading.restrict}
          >
            {actionLoading.restrict ? (
              <LucideIcons.Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
            ) : (
              <LucideIcons.Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
        </Tooltip>
      )}
    </div>
  );
};

// Employee data
const employeeInfo = {
  "EMP-101": {
    name: "John Smith",
    department: "Engineering",
    position: "Senior Developer",
    office: "New York HQ",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
  },
  "EMP-102": {
    name: "Sarah Johnson",
    department: "Design",
    position: "UI/UX Designer",
    office: "Remote",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 234-5678",
  },
  "EMP-103": {
    name: "Michael Chen",
    department: "Marketing",
    position: "Marketing Manager",
    office: "San Francisco",
    email: "michael.chen@company.com",
    phone: "+1 (555) 345-6789",
  },
  "EMP-104": {
    name: "Emma Wilson",
    department: "HR",
    position: "HR Manager",
    office: "London",
    email: "emma.wilson@company.com",
    phone: "+44 20 7123 4567",
  },
};

// Client data
const clientInfo = {
  "CLT-201": {
    name: "Tech Innovations Inc.",
    company: "Tech Innovations Inc.",
    industry: "Technology",
    contact_person: "Robert Brown",
    email: "robert.brown@techinnovations.com",
    phone: "+1 (555) 987-6543",
    notes: "Enterprise client with ongoing projects",
  },
  "CLT-202": {
    name: "Global Solutions Ltd.",
    company: "Global Solutions Ltd.",
    industry: "Consulting",
    contact_person: "Lisa Anderson",
    email: "lisa.anderson@globalsolutions.com",
    phone: "+44 20 7654 3210",
    notes: "Long-term partnership",
  },
  "CLT-203": {
    name: "Creative Agency Co.",
    company: "Creative Agency Co.",
    industry: "Marketing",
    contact_person: "David Miller",
    email: "david.miller@creativeagency.com",
    phone: "+1 (555) 876-5432",
    notes: "Monthly retainer contract",
  },
};

// Combined Employee and Client data
const combinedData = [
  // Employee records
  {
    attendance_id: 1,
    employee_id: "EMP-101",
    type: "employee",
    attendance_date: "2026-01-05",
    check_in_time: "2026-01-05T09:10:00",
    check_out_time: "2026-01-05T17:30:00",
    attendance_mode: "Office",
    attendance_status: "Present",
    total_working_hours: "8h 20m",
    created_at: "2026-01-05T09:10:00",
    updated_at: "2026-01-05T17:30:00",
    today_present: true,
    verified: false,
    restricted: {
      restriction_type: "temporary",
      restriction_date: "2026-02-05",
      reason: "Late arrival - Traffic delay",
      description: "Employee arrived 30 minutes late without prior notice",
      approved_by: "Manager A",
      notes: "Approved with warning, to be reviewed next month",
    },
  },
  {
    attendance_id: 2,
    employee_id: "EMP-102",
    type: "employee",
    attendance_date: "2026-01-05",
    check_in_time: "2026-01-05T09:15:00",
    check_out_time: "2026-01-05T17:25:00",
    attendance_mode: "Remote",
    attendance_status: "Verified",
    total_working_hours: "8h 10m",
    created_at: "2026-01-05T09:15:00",
    updated_at: "2026-01-05T17:25:00",
    today_present: true,
    verified: true,
    restricted: null,
  },
  {
    attendance_id: 3,
    employee_id: "EMP-103",
    type: "employee",
    attendance_date: "2026-01-05",
    check_in_time: "2026-01-05T09:20:00",
    check_out_time: "2026-01-05T17:35:00",
    attendance_mode: "Office",
    attendance_status: "Pending",
    total_working_hours: "8h 15m",
    created_at: "2026-01-05T09:20:00",
    updated_at: "2026-01-05T17:35:00",
    today_present: true,
    verified: false,
    restricted: {
      restriction_type: "permanent",
      reason: "System malfunction",
      description: "Manual check-in recorded due to biometric system failure",
      approved_by: "Admin",
      notes: "System issue resolved, but record needs permanent restriction",
    },
  },
  {
    attendance_id: 4,
    employee_id: "EMP-104",
    type: "employee",
    attendance_date: "2026-01-05",
    check_in_time: "2026-01-05T09:05:00",
    check_out_time: "2026-01-05T17:20:00",
    attendance_mode: "Office",
    attendance_status: "Present",
    total_working_hours: "8h 15m",
    created_at: "2026-01-05T09:05:00",
    updated_at: "2026-01-05T17:20:00",
    today_present: false,
    verified: false,
    restricted: null,
  },
  // Client records
  {
    attendance_id: 5,
    employee_id: "CLT-201",
    type: "client",
    attendance_date: "2026-01-05",
    status: "Active",
    project_status: "In Progress",
    project_value: "$50,000",
    project_start_date: "2025-12-01",
    created_at: "2025-12-01T09:00:00",
    updated_at: "2026-01-05T14:30:00",
    today_present: true,
    verified: true,
    restricted: null,
  },
  {
    attendance_id: 6,
    employee_id: "CLT-202",
    type: "client",
    attendance_date: "2026-01-05",
    status: "Contract",
    project_status: "Completed",
    project_value: "$25,000",
    project_start_date: "2025-11-15",
    created_at: "2025-11-15T10:00:00",
    updated_at: "2026-01-04T16:45:00",
    today_present: true,
    verified: true,
    restricted: null,
  },
  {
    attendance_id: 7,
    employee_id: "CLT-203",
    type: "client",
    attendance_date: "2026-01-05",
    status: "On Project",
    project_status: "Planning",
    project_value: "$15,000",
    project_start_date: "2026-01-15",
    created_at: "2025-12-20T11:30:00",
    updated_at: "2026-01-05T10:15:00",
    today_present: false,
    verified: false,
    restricted: {
      restriction_type: "under_review",
      reason: "Contract negotiation",
      description: "Client contract under review by legal department",
      approved_by: "Legal Team",
      notes: "Awaiting final approval from legal",
    },
  },
];

// Responsive Custom Checkbox Component
const CustomCheckbox = ({ checked, indeterminate, onChange, className = "" }) => {
  return (
    <div className={`relative inline-block w-4 h-4 sm:w-5 sm:h-5 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        ref={(el) => {
          if (el) {
            el.indeterminate = indeterminate;
          }
        }}
        className="absolute w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className={`absolute inset-0 border-2 rounded transition-all duration-200 ${indeterminate
        ? "border-amber-500 bg-amber-500"
        : checked
          ? "border-amber-500 bg-amber-500"
          : "border-gray-300 hover:border-amber-400"
        }`}>
        {checked && !indeterminate && (
          <LucideIcons.Check className="absolute inset-0 w-full h-full text-white p-0.5" />
        )}
        {indeterminate && (
          <LucideIcons.Minus className="absolute inset-0 w-full h-full text-white p-0.5" />
        )}
      </div>
    </div>
  );
};

// Responsive table styles
const getCustomStyles = () => ({
  header: {
    style: {
      minHeight: "56px",
      backgroundColor: "#ffffff",
      color: "#000000",
      fontSize: "14px",
      fontWeight: "700",
      borderBottom: "2px solid #e2e8f0",
      padding: "0 8px",
    },
  },

  headRow: {
    style: {
      backgroundColor: "#e2e8f0",
      borderBottomWidth: "2px",
      borderBottomColor: "#cbd5e1",
      minHeight: "40px",
    },
  },

  headCells: {
    style: {
      color: "#1D2360",
      fontSize: "10px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.3px",
      paddingTop: "12px",
      paddingBottom: "12px",
      paddingLeft: "8px",
      paddingRight: "8px",
      borderLeft: "1px solid #cbd5e1",
      "&:first-child": {
        borderLeft: "none",
      },
      "@media (min-width: 640px)": {
        fontSize: "12px",
        paddingLeft: "12px",
        paddingRight: "12px",
      },
      "@media (min-width: 768px)": {
        fontSize: "13px",
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
  },

  rows: {
    style: {
      backgroundColor: "#ffffff",
      color: "#0f172a",
      fontSize: "12px",
      transition: "background 0.2s ease",
      "&:hover": {
        backgroundColor: "#f8fafc",
        cursor: "pointer",
      },
      minHeight: "48px",
      "@media (min-width: 640px)": {
        fontSize: "13px",
      },
      "@media (min-width: 768px)": {
        fontSize: "14px",
      },
    },
    stripedStyle: {
      backgroundColor: "#ffffff",
    },
  },

  cells: {
    style: {
      paddingTop: "8px",
      paddingBottom: "8px",
      paddingLeft: "8px",
      paddingRight: "8px",
      borderLeft: "1px solid #e2e8f0",
      "&:first-child": {
        borderLeft: "none",
      },
      "@media (min-width: 640px)": {
        paddingLeft: "12px",
        paddingRight: "12px",
      },
      "@media (min-width: 768px)": {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
  },

  pagination: {
    style: {
      backgroundColor: "#ffffff",
      color: "#334155",
      borderTop: "1px solid #e2e8f0",
      fontSize: "12px",
      "@media (min-width: 640px)": {
        fontSize: "14px",
      },
    },
    pageButtonsStyle: {
      color: "#334155",
      fill: "#334155",
      "&:hover": {
        backgroundColor: "#e2e8f0",
      },
      "&:disabled": {
        color: "#94a3b8",
      },
    },
  },
});

const generateColumns = (selectedRows, handleRowSelected, onDelete, onRestrict, onView) => {
  const columns = [
    {
      name: (
        <div className="flex justify-center">
          <CustomCheckbox
            checked={selectedRows.allSelected}
            indeterminate={selectedRows.indeterminate}
            onChange={handleRowSelected}
          />
        </div>
      ),
      selector: (row) => row.attendance_id,
      sortable: false,
      width: "50px",
      center: true,

      cell: (row) => (
        <div className="flex justify-center">
          <CustomCheckbox
            checked={selectedRows.selectedRows.includes(row.attendance_id)}
            onChange={() => handleRowSelected(null, row)}
          />
        </div>
      ),
    },
    {
      name: "EMPLOYEE/CLIENT",
      selector: (row) => row.employee_id,
      sortable: true,
      minWidth: "200px",
      grow: 2,
      cell: (row) => {
        const isClient = row.type === 'client';
        const info = isClient ? clientInfo[row.employee_id] : employeeInfo[row.employee_id];

        return (
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Avatar name={info?.name || "Unknown"} size={10} mobileSize={8} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                  {info?.name || "Unknown"}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isClient ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'} mt-0.5 sm:mt-0`}>
                  {isClient ? 'Client' : 'Employee'}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate hidden sm:block">
                {info ? (isClient ? `${info.company} • ${info.industry}` : `${info.department} • ${info.position}`) : "N/A"}
              </p>
              <p className="text-xs text-slate-500 truncate sm:hidden">
                {info ? (isClient ? `${info.company}` : `${info.department}`) : "N/A"}
              </p>
            </div>
            {row.restricted && (
              <div className="flex-shrink-0">
                <LucideIcons.ShieldAlert className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      name: "TYPE",
      selector: (row) => row.type || 'employee',
      sortable: true,
      width: "90px",

      cell: (row) => (
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${row.type === 'client' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>
          {row.type === 'client' ? 'Client' : 'Emp'}
        </div>
      ),
    },
    {
      name: "ACTIVE",
      selector: (row) => row.today_present,
      sortable: true,
      width: "80px",
      cell: (row) => (
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-1 ${row.today_present ? "bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite]" : "bg-rose-500"}`} />
          <span className="text-xs text-slate-700">
            {row.today_present ? "Yes" : "No"}
          </span>
        </div>
      ),
    },
    {
      name: "PRESENT",
      selector: (row) => row.today_present,
      sortable: true,
      width: "100px",
      cell: (row) => (
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${row.today_present ? "bg-emerald-500" : "bg-rose-500"}`} />
          <span className="text-sm text-slate-700">
            {row.today_present ? "Active" : "Inactive"}
          </span>
        </div>
      ),
    },
    {
      name: "DATE",
      selector: (row) => row.attendance_date,
      sortable: true,
      width: "100px",
      hide: "lg",
      cell: (row) => (
        <div className="text-xs text-slate-700">
          {new Date(row.attendance_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
      ),
    },


    {
      name: "INFO",
      selector: (row) => row.type === 'client' ? row.project_status : row.total_working_hours,
      sortable: true,
      width: "140px",
      cell: (row) => (
        <div className="text-sm font-medium text-slate-900 truncate">
          {row.type === 'client' ? row.project_status : row.total_working_hours}
        </div>
      ),
    },
    {
      name: "ACTIONS",
      selector: (row) => row.attendance_id,
      width: "120px",
      center: true,
      cell: (row) => (
        <ActionButtons
          row={row}
          onDelete={onDelete}
          onRestrict={onRestrict}
          onView={onView}
        />
      ),
    },
  ];

  // Filter columns based on screen size
  return columns
};

const Data_Table = () => {
  const [selectedRows, setSelectedRows] = useState({
    selectedRows: [],
    allSelected: false,
    indeterminate: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [showRestrictModal, setShowRestrictModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingRecord, setViewingRecord] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [restrictingRecord, setRestrictingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState(combinedData);
  const [filteredRecords, setFilteredRecords] = useState(combinedData);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const handleCloseRegisterModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    showModal ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
    return () => document.body.style.overflow = 'unset';
  }, [showModal])
  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Search and filter function
  const handleSearch = (term) => {
    setSearchTerm(term);

    let filtered = attendanceRecords;

    if (typeFilter !== "all") {
      filtered = filtered.filter(record => record.type === typeFilter);
    }

    if (term.trim()) {
      const lowerTerm = term.toLowerCase();
      filtered = filtered.filter(record => {
        const isClient = record.type === 'client';
        const info = isClient ? clientInfo[record.employee_id] : employeeInfo[record.employee_id];

        return (
          record.employee_id?.toLowerCase().includes(lowerTerm) ||
          info?.name?.toLowerCase().includes(lowerTerm) ||
          (isClient ? info?.company?.toLowerCase().includes(lowerTerm) : info?.department?.toLowerCase().includes(lowerTerm)) ||
          (record.attendance_status || record.status)?.toLowerCase().includes(lowerTerm)
        );
      });
    }

    setFilteredRecords(filtered);
  };

  // Handle type filter change
  const handleTypeFilter = (type) => {
    setTypeFilter(type);
    let filtered = attendanceRecords;

    if (type !== "all") {
      filtered = filtered.filter(record => record.type === type);
    }

    if (searchTerm.trim()) {
      const lowerTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(record => {
        const isClient = record.type === 'client';
        const info = isClient ? clientInfo[record.employee_id] : employeeInfo[record.employee_id];

        return (
          record.employee_id?.toLowerCase().includes(lowerTerm) ||
          info?.name?.toLowerCase().includes(lowerTerm) ||
          (isClient ? info?.company?.toLowerCase().includes(lowerTerm) : info?.department?.toLowerCase().includes(lowerTerm))
        );
      });
    }

    setFilteredRecords(filtered);
  };

  // Fetch data from API
  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/records");
      if (response.data.success) {
        setAttendanceRecords(response.data.data);
        setFilteredRecords(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete single record
  const handleDelete = async (attendanceId) => {
    if (!window.confirm("Are you sure you want to delete this record?")) {
      return;
    }

    try {
      const response = await axios.delete(`/api/records/${attendanceId}`);
      if (response.data.success) {
        const updatedRecords = attendanceRecords.filter((record) => record.attendance_id !== attendanceId);
        setAttendanceRecords(updatedRecords);
        setFilteredRecords(updatedRecords);

        setSelectedRows((prev) => ({
          ...prev,
          selectedRows: prev.selectedRows.filter((id) => id !== attendanceId),
        }));

        console.log("Record deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record. Please try again.");
    }
  };

  // Restrict single record
  const handleRestrict = (attendanceId) => {
    setRestrictingRecord(attendanceId);
    setShowRestrictModal(true);
  };

  // Handle restrict success
  const handleRestrictSuccess = (restrictedData) => {
    const updatedRecords = attendanceRecords.map((record) =>
      record.attendance_id === restrictingRecord
        ? {
          ...record,
          restricted: {
            ...restrictedData,
            restriction_date: restrictedData.restriction_date || null,
            description: restrictedData.description || "",
          }
        }
        : record
    );
    setAttendanceRecords(updatedRecords);
    setFilteredRecords(updatedRecords);
    setShowRestrictModal(false);
    setRestrictingRecord(null);
  };

  // Handle view record
  const handleViewRecord = (record) => {
    setViewingRecord(record);
    setShowViewModal(true);
  };

  const handleRowSelected = (state, row) => {
    let newSelectedRows = [...selectedRows.selectedRows];

    if (row) {
      if (newSelectedRows.includes(row.attendance_id)) {
        newSelectedRows = newSelectedRows.filter((id) => id !== row.attendance_id);
      } else {
        newSelectedRows.push(row.attendance_id);
      }
    } else {
      if (selectedRows.allSelected || selectedRows.indeterminate) {
        newSelectedRows = [];
      } else {
        newSelectedRows = filteredRecords.map((item) => item.attendance_id);
      }
    }

    const allSelected = newSelectedRows.length === filteredRecords.length;
    const indeterminate = newSelectedRows.length > 0 && newSelectedRows.length < filteredRecords.length;

    setSelectedRows({
      selectedRows: newSelectedRows,
      allSelected,
      indeterminate,
    });
  };

  const attendanceColumns = useMemo(
    () =>
      generateColumns(
        selectedRows,
        handleRowSelected,
        handleDelete,
        handleRestrict,
        handleViewRecord
      ),
    [selectedRows, filteredRecords, windowWidth]
  );

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  // Custom responsive pagination component
  const CustomPagination = ({ rowsPerPage, rowCount, onChangePage, currentPage }) => (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-slate-200">
      <div className="mb-2 sm:mb-0 text-xs sm:text-sm text-slate-600">
        Showing {Math.min((currentPage - 1) * rowsPerPage + 1, rowCount)}-
        {Math.min(currentPage * rowsPerPage, rowCount)} of {rowCount} records
      </div>
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onChangePage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {Array.from({ length: Math.min(3, Math.ceil(rowCount / rowsPerPage)) }, (_, i) => {
          const pageNumber = i + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => onChangePage(pageNumber)}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg ${currentPage === pageNumber
                ? 'bg-amber-600 text-white'
                : 'text-slate-700 hover:bg-slate-100'
                }`}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          onClick={() => onChangePage(Math.min(Math.ceil(rowCount / rowsPerPage), currentPage + 1))}
          disabled={currentPage === Math.ceil(rowCount / rowsPerPage)}
          className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-white rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 truncate">
            Employee & Client Records
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 hidden sm:block">
            Manage and monitor employee and client records in one place
          </p>
          <p className="text-xs text-slate-600 mt-1 sm:hidden">
            Manage all records
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Type Filter - Mobile */}
          {/* <div className="flex items-center bg-slate-100 p-0.5 rounded-lg sm:hidden w-full">
            <button
              onClick={() => handleTypeFilter("all")}
              className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all ${typeFilter === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              All
            </button>
            <button
              onClick={() => handleTypeFilter("employee")}
              className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all ${typeFilter === "employee" ? "bg-emerald-100 text-emerald-800" : "text-slate-600 hover:text-slate-900"}`}
            >
              Employee
            </button>
            <button
              onClick={() => handleTypeFilter("client")}
              className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all ${typeFilter === "client" ? "bg-blue-100 text-blue-800" : "text-slate-600 hover:text-slate-900"}`}
            >
              Client
            </button>
          </div> */}

          {/* Type Filter - Desktop */}
          <div className=" flex items-center bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => handleTypeFilter("all")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${typeFilter === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              All
            </button>
            <button
              onClick={() => handleTypeFilter("employee")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${typeFilter === "employee" ? "bg-emerald-100 text-emerald-800" : "text-slate-600 hover:text-slate-900"}`}
            >
              Employees
            </button>
            <button
              onClick={() => handleTypeFilter("client")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${typeFilter === "client" ? "bg-blue-100 text-blue-800" : "text-slate-600 hover:text-slate-900"}`}
            >
              Clients
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:flex-initial">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LucideIcons.Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full text-sm sm:text-base"
              placeholder="Search..."
            />
            {searchTerm && (
              <button
                onClick={() => handleSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <LucideIcons.X className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>

          {/* Add Record Button */}
          <button
            onClick={() => {
              setEditingRecord(null);
              setShowModal(true);
            }}
            className="px-3 py-2 sm:px-4 sm:py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all duration-200 font-medium flex items-center justify-center hover:scale-105 text-sm sm:text-base"
          >
            <LucideIcons.Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Register</span>
            <span className="sm:hidden">Register</span>
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-slate-500 flex flex-wrap items-center gap-2">
        <span>Showing {filteredRecords.length} of {attendanceRecords.length} records</span>
        {searchTerm && (
          <span className="text-amber-600 hidden sm:inline">
            • Searching for: "{searchTerm}"
          </span>
        )}
        {searchTerm && (
          <span className="text-amber-600 sm:hidden">
            • "{searchTerm.substring(0, 10)}..."
          </span>
        )}
        {typeFilter !== "all" && (
          <span className="hidden sm:inline">
            • Filtered by: {typeFilter === "employee" ? "Employees" : "Clients"}
          </span>
        )}
        {typeFilter !== "all" && (
          <span className="sm:hidden">
            • {typeFilter === "employee" ? "Emp" : "Cli"}
          </span>
        )}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <DataTable
          columns={attendanceColumns}
          data={filteredRecords}
          customStyles={getCustomStyles()}
          pagination
          paginationComponent={CustomPagination}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          highlightOnHover
          striped
          responsive
          dense
          progressPending={loading}
          noDataComponent={
            <div className="py-8 text-center">
              <LucideIcons.FileSearch className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-slate-700 mb-1">No records found</h3>
              <p className="text-slate-500">
                {searchTerm ? 'Try a different search term' : 'No records available'}
              </p>
            </div>
          }
        />
      </div>

      {/* Mobile Selected Count */}
      {selectedRows.selectedRows.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-40 sm:hidden">
          <LucideIcons.Check className="w-4 h-4" />
          <span className="text-sm">{selectedRows.selectedRows.length} selected</span>
        </div>
      )}
      {
        showModal && (<RegisterModal onClose={handleCloseRegisterModal} />)
      }

      <RestrictModal
        isOpen={showRestrictModal}
        onClose={() => {
          setShowRestrictModal(false);
          setRestrictingRecord(null);
        }}
        attendanceId={restrictingRecord}
        onSuccess={handleRestrictSuccess}
        attendanceRecords={attendanceRecords}
      />

      <ViewDetailsModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setViewingRecord(null);
        }}
        record={viewingRecord}
      />
    </div>
  );
};

export default Data_Table;