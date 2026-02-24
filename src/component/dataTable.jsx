import React, { useMemo, useState, useEffect, useCallback } from "react";
import axios from "axios";
import * as Icons from "lucide-react";
import { RegisterModal } from "./Registermodal";

// ========== UTILS ==========
const getInitials = (name) => name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "??";

const colors = ["bg-amber-100 text-amber-800", "bg-slate-100 text-slate-800", "bg-emerald-100 text-emerald-800", "bg-blue-100 text-blue-800", "bg-purple-100 text-purple-800", "bg-rose-100 text-rose-800"];

const getColorIndex = (name) => name?.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length || 0;

const statusConfig = {
  Present: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Absent: "bg-rose-100 text-rose-800 border-rose-200",
  Late: "bg-amber-100 text-amber-800 border-amber-200",
  "On Leave": "bg-blue-100 text-blue-800 border-blue-200",
  Holiday: "bg-purple-100 text-purple-800 border-purple-200",
  Halfday: "bg-orange-100 text-orange-800 border-orange-200",
  Verified: "bg-green-100 text-green-800 border-green-200",
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Restricted: "bg-purple-100 text-purple-800 border-purple-200",
  Active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Inactive: "bg-slate-100 text-slate-800 border-slate-200",
  Contract: "bg-blue-100 text-blue-800 border-blue-200",
  Freelance: "bg-purple-100 text-purple-800 border-purple-200",
  "On Project": "bg-amber-100 text-amber-800 border-amber-200",
};

const getStatusBadge = (status) => statusConfig[status] || "bg-gray-100 text-gray-800";

const statusShort = { Present: "P", Absent: "A", Active: "Act", Contract: "Con" };

// ========== DATA ==========
const employeeInfo = {
  "EMP-101": { name: "John Smith", department: "Engineering", position: "Senior Developer", office: "New York HQ", email: "john.smith@company.com", phone: "+1 (555) 123-4567" },
  "EMP-102": { name: "Sarah Johnson", department: "Design", position: "UI/UX Designer", office: "Remote", email: "sarah.johnson@company.com", phone: "+1 (555) 234-5678" },
  "EMP-103": { name: "Michael Chen", department: "Marketing", position: "Marketing Manager", office: "San Francisco", email: "michael.chen@company.com", phone: "+1 (555) 345-6789" },
  "EMP-104": { name: "Emma Wilson", department: "HR", position: "HR Manager", office: "London", email: "emma.wilson@company.com", phone: "+44 20 7123 4567" },
};

const clientInfo = {
  "CLT-201": { name: "Tech Innovations Inc.", company: "Tech Innovations Inc.", industry: "Technology", contact_person: "Robert Brown", email: "robert.brown@techinnovations.com", phone: "+1 (555) 987-6543", notes: "Enterprise client" },
  "CLT-202": { name: "Global Solutions Ltd.", company: "Global Solutions Ltd.", industry: "Consulting", contact_person: "Lisa Anderson", email: "lisa.anderson@globalsolutions.com", phone: "+44 20 7654 3210", notes: "Long-term partnership" },
  "CLT-203": { name: "Creative Agency Co.", company: "Creative Agency Co.", industry: "Marketing", contact_person: "David Miller", email: "david.miller@creativeagency.com", phone: "+1 (555) 876-5432", notes: "Monthly retainer" },
};

const combinedData = [
  { attendance_id: 1, employee_id: "EMP-101", type: "employee", attendance_date: "2026-01-05", check_in_time: "2026-01-05T09:10:00", check_out_time: "2026-01-05T17:30:00", attendance_mode: "Office", attendance_status: "Present", total_working_hours: "8h 20m", created_at: "2026-01-05T09:10:00", updated_at: "2026-01-05T17:30:00", today_present: true, verified: false, restricted: { restriction_type: "temporary", restriction_date: "2026-02-05", reason: "Late arrival", description: "Arrived 30 min late", approved_by: "Manager A", notes: "Approved with warning" } },
  { attendance_id: 2, employee_id: "EMP-102", type: "employee", attendance_date: "2026-01-05", check_in_time: "2026-01-05T09:15:00", check_out_time: "2026-01-05T17:25:00", attendance_mode: "Remote", attendance_status: "Verified", total_working_hours: "8h 10m", created_at: "2026-01-05T09:15:00", updated_at: "2026-01-05T17:25:00", today_present: true, verified: true, restricted: null },
  { attendance_id: 3, employee_id: "EMP-103", type: "employee", attendance_date: "2026-01-05", check_in_time: "2026-01-05T09:20:00", check_out_time: "2026-01-05T17:35:00", attendance_mode: "Office", attendance_status: "Pending", total_working_hours: "8h 15m", created_at: "2026-01-05T09:20:00", updated_at: "2026-01-05T17:35:00", today_present: true, verified: false, restricted: { restriction_type: "permanent", reason: "System malfunction", description: "Manual check-in", approved_by: "Admin", notes: "System issue resolved" } },
  { attendance_id: 4, employee_id: "EMP-104", type: "employee", attendance_date: "2026-01-05", check_in_time: "2026-01-05T09:05:00", check_out_time: "2026-01-05T17:20:00", attendance_mode: "Office", attendance_status: "Present", total_working_hours: "8h 15m", created_at: "2026-01-05T09:05:00", updated_at: "2026-01-05T17:20:00", today_present: false, verified: false, restricted: null },
  { attendance_id: 5, employee_id: "CLT-201", type: "client", attendance_date: "2026-01-05", status: "Active", project_status: "In Progress", project_value: "$50,000", project_start_date: "2025-12-01", created_at: "2025-12-01T09:00:00", updated_at: "2026-01-05T14:30:00", today_present: true, verified: true, restricted: null },
  { attendance_id: 6, employee_id: "CLT-202", type: "client", attendance_date: "2026-01-05", status: "Contract", project_status: "Completed", project_value: "$25,000", project_start_date: "2025-11-15", created_at: "2025-11-15T10:00:00", updated_at: "2026-01-04T16:45:00", today_present: true, verified: true, restricted: null },
  { attendance_id: 7, employee_id: "CLT-203", type: "client", attendance_date: "2026-01-05", status: "On Project", project_status: "Planning", project_value: "$15,000", project_start_date: "2026-01-15", created_at: "2025-12-20T11:30:00", updated_at: "2026-01-05T10:15:00", today_present: false, verified: false, restricted: { restriction_type: "under_review", reason: "Contract negotiation", description: "Under legal review", approved_by: "Legal Team", notes: "Awaiting approval" } },
];

// ========== COMPONENTS ==========

// Avatar Component
const Avatar = ({ name, size = 10, mobileSize = 8 }) => (
  <div className={`flex items-center justify-center rounded-full ${colors[getColorIndex(name)]} font-semibold w-${mobileSize} h-${mobileSize} sm:w-${size} sm:h-${size}`}>
    <span className="text-xs sm:text-sm">{getInitials(name)}</span>
  </div>
);

// Status Badge Component
const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(status)}`}>
    <span className="hidden sm:inline">{status}</span>
    <span className="sm:hidden">{statusShort[status] || status?.substring(0, 3)}</span>
  </span>
);

// Custom Checkbox
const CustomCheckbox = ({ checked, indeterminate, onChange }) => (
  <div className="relative inline-block w-4 h-4 sm:w-5 sm:h-5">
    <input type="checkbox" checked={checked} onChange={onChange} ref={el => el && (el.indeterminate = indeterminate)} className="absolute w-full h-full opacity-0 cursor-pointer z-10" />
    <div className={`absolute inset-0 border-2 rounded transition-all ${indeterminate ? "border-amber-500 bg-amber-500" : checked ? "border-amber-500 bg-amber-500" : "border-gray-300 hover:border-amber-400"}`}>
      {checked && !indeterminate && <Icons.Check className="absolute inset-0 w-full h-full text-white p-0.5" />}
      {indeterminate && <Icons.Minus className="absolute inset-0 w-full h-full text-white p-0.5" />}
    </div>
  </div>
);

// Tooltip
const Tooltip = ({ children, text }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="inline-block">{children}</div>
      {show && <div className="hidden sm:block absolute z-20 px-3 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg shadow-sm bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap">{text}<div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1"><div className="w-2 h-2 bg-slate-900 rotate-45"></div></div></div>}
    </div>
  );
};

// Action Buttons
const ActionButtons = ({ row, onDelete, onRestrict, onView }) => {
  const [loading, setLoading] = useState({ delete: false, restrict: false });
  
  const handleAction = async (type, fn) => {
    setLoading(prev => ({ ...prev, [type]: true }));
    try { await fn(); } finally { setLoading(prev => ({ ...prev, [type]: false })); }
  };

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
      <Tooltip text="View"><button className="p-1.5 sm:p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg border border-blue-200 hover:scale-105" onClick={() => onView(row)}><Icons.Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button></Tooltip>
      <Tooltip text="Delete"><button className="p-1.5 sm:p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg border border-rose-200 hover:scale-105 disabled:opacity-50" onClick={() => handleAction("delete", () => onDelete(row.attendance_id))} disabled={loading.delete}>{loading.delete ? <Icons.Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> : <Icons.Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}</button></Tooltip>
      {row.restricted ? (
        <Tooltip text="View Restricted"><button className="p-1.5 sm:p-2 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg border border-purple-200 hover:scale-105" onClick={() => alert(`Restriction: ${row.restricted.reason}`)}><Icons.ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button></Tooltip>
      ) : (
        <Tooltip text="Restrict"><button className="p-1.5 sm:p-2 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg border border-purple-200 hover:scale-105 disabled:opacity-50" onClick={() => handleAction("restrict", () => onRestrict(row.attendance_id))} disabled={loading.restrict}>{loading.restrict ? <Icons.Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> : <Icons.Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}</button></Tooltip>
      )}
    </div>
  );
};

// Restrict Modal
const RestrictModal = ({ isOpen, onClose, attendanceId, onSuccess, attendanceRecords }) => {
  const [form, setForm] = useState({ reason: "", approved_by: "", notes: "", restriction_type: "temporary", restriction_date: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const record = attendanceRecords.find(r => r.attendance_id === attendanceId);
  const emp = record ? (record.type === 'client' ? clientInfo[record.employee_id] : employeeInfo[record.employee_id]) : null;

  useEffect(() => { if (isOpen) { setForm({ reason: "", approved_by: "", notes: "", restriction_type: "temporary", restriction_date: "", description: "" }); setError(""); } }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError("");
    if (form.restriction_type === "temporary" && !form.restriction_date) { setError("End date required"); setLoading(false); return; }
    if (!form.description || !form.reason || !form.approved_by) { setError("Fill required fields"); setLoading(false); return; }
    if (form.restriction_type === "permanent" && !window.confirm("Apply permanent restriction?")) { setLoading(false); return; }
    try {
      const res = await axios.post(`/api/attendance/${attendanceId}/restrict`, form);
      if (res.data.success) { onSuccess(res.data.data); onClose(); } else setError(res.data.message);
    } catch (err) { setError(err.response?.data?.message || "Error occurred"); } finally { setLoading(false); }
  };

  if (!isOpen || !record || !emp) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-2 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b sticky top-0 bg-white">
          <h3 className="text-lg font-semibold text-slate-900">Restrict Record</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><Icons.X className="w-5 h-5" /></button>
        </div>

        <div className="p-4 sm:p-6 border-b bg-slate-50">
          <div className="flex items-start space-x-3">
            <Avatar name={emp.name} size={12} mobileSize={10} />
            <div>
              <h4 className="font-semibold">{emp.name}</h4>
              <p className="text-sm text-slate-600">{emp.position || emp.company}</p>
            </div>
          </div>
          <div className="mt-3 p-3 bg-white rounded-lg border text-sm grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">Date:</span> {new Date(record.attendance_date).toLocaleDateString()}</div>
            <div><span className="text-slate-500">Status:</span> <StatusBadge status={record.attendance_status || record.status} /></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {error && <div className="p-3 bg-rose-50 text-rose-700 rounded-lg text-sm">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium mb-2">Type *</label>
            <div className="flex flex-wrap gap-3">
              {["temporary", "permanent", "under_review"].map(t => (
                <label key={t} className="flex items-center"><input type="radio" name="restriction_type" value={t} checked={form.restriction_type === t} onChange={e => setForm({...form, restriction_type: e.target.value})} className="mr-2" />{t}</label>
              ))}
            </div>
          </div>

          {form.restriction_type === "temporary" && (
            <div>
              <label className="block text-sm font-medium mb-1">End Date *</label>
              <input type="date" value={form.restriction_date} onChange={e => setForm({...form, restriction_date: e.target.value})} min={new Date().toISOString().split('T')[0]} className="w-full p-2 border rounded-lg" required />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-2 border rounded-lg" rows="3" required placeholder="Enter description..." />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Reason *</label>
            <select value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} className="w-full p-2 border rounded-lg" required>
              <option value="">Select reason</option>
              <option value="late_arrival">Late Arrival</option>
              <option value="early_departure">Early Departure</option>
              <option value="unauthorized_absence">Unauthorized Absence</option>
              <option value="time_tampering">Time Tampering</option>
              <option value="policy_violation">Policy Violation</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Approved By *</label>
            <input type="text" value={form.approved_by} onChange={e => setForm({...form, approved_by: e.target.value})} className="w-full p-2 border rounded-lg" required placeholder="Approver name" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="w-full p-2 border rounded-lg" rows="2" placeholder="Additional notes..." />
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
            <p className="font-medium">Important:</p>
            <ul className="list-disc pl-4 text-xs">
              <li>Temporary restrictions auto-expire</li>
              <li>Permanent restrictions need approval</li>
              <li>Restricted records cannot be edited</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50 flex items-center">
              {loading ? <><Icons.Loader2 className="w-4 h-4 mr-2 animate-spin" />Applying...</> : <><Icons.ShieldAlert className="w-4 h-4 mr-2" />Apply</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// View Details Modal
const ViewDetailsModal = ({ isOpen, onClose, record }) => {
  if (!isOpen || !record) return null;
  
  const isClient = record.type === 'client';
  const info = isClient ? clientInfo[record.employee_id] : employeeInfo[record.employee_id];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-2 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b sticky top-0 bg-white">
          <h3 className="text-lg font-semibold">{isClient ? 'Client Details' : 'Employee Details'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><Icons.X className="w-5 h-5" /></button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex items-start space-x-4 mb-6">
            <Avatar name={info?.name} size={16} mobileSize={12} />
            <div>
              <h4 className="text-xl font-bold">{info?.name}</h4>
              <p className="text-sm text-slate-600">{isClient ? 'Client' : info?.position}</p>
              <div className="flex gap-2 mt-2"><StatusBadge status={record.attendance_status || record.status} /></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h5 className="font-semibold flex items-center"><Icons.User className="w-4 h-4 mr-2" />{isClient ? 'Company' : 'Personal'}</h5>
              <div className="space-y-2">
                <div><label className="text-xs text-slate-500">ID</label><p className="text-sm">{record.employee_id}</p></div>
                {!isClient && <div><label className="text-xs text-slate-500">Department</label><p className="text-sm">{info?.department}</p></div>}
                {isClient && <div><label className="text-xs text-slate-500">Company</label><p className="text-sm">{info?.company}</p></div>}
                <div><label className="text-xs text-slate-500">Email</label><p className="text-sm">{info?.email || `${info?.name?.toLowerCase().replace(/\s+/g, ".")}@${isClient ? 'client.com' : 'company.com'}`}</p></div>
                <div><label className="text-xs text-slate-500">Phone</label><p className="text-sm">{info?.phone || "N/A"}</p></div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold flex items-center"><Icons.Calendar className="w-4 h-4 mr-2" />{isClient ? 'Project' : 'Attendance'}</h5>
              <div className="space-y-2">
                <div><label className="text-xs text-slate-500">Date</label><p className="text-sm">{new Date(record.attendance_date).toLocaleDateString()}</p></div>
                {!isClient ? (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="text-xs text-slate-500">Check-in</label><p className="text-sm">{record.check_in_time ? new Date(record.check_in_time).toLocaleTimeString() : 'N/A'}</p></div>
                      <div><label className="text-xs text-slate-500">Check-out</label><p className="text-sm">{record.check_out_time ? new Date(record.check_out_time).toLocaleTimeString() : 'N/A'}</p></div>
                    </div>
                    <div><label className="text-xs text-slate-500">Hours</label><p className="text-sm">{record.total_working_hours}</p></div>
                  </>
                ) : (
                  <>
                    <div><label className="text-xs text-slate-500">Project Status</label><p className="text-sm">{record.project_status}</p></div>
                    <div><label className="text-xs text-slate-500">Value</label><p className="text-sm">{record.project_value}</p></div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <h5 className="font-semibold flex items-center mb-2"><Icons.FileText className="w-4 h-4 mr-2" />Notes</h5>
            <div className="bg-slate-50 p-3 rounded-lg"><p className="text-sm">{record.notes || info?.notes || "No notes available"}</p></div>
          </div>
        </div>

        <div className="flex justify-end p-4 border-t">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
};

// ========== MAIN TABLE ==========
const Data_Table = () => {
  const [selected, setSelected] = useState({ selectedRows: [], allSelected: false, indeterminate: false });
  const [showModal, setShowModal] = useState(false);
  const [showRestrict, setShowRestrict] = useState(false);
  const [showView, setShowView] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [restricting, setRestricting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState(combinedData);
  const [filtered, setFiltered] = useState(combinedData);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => { showModal ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset'; return () => document.body.style.overflow = 'unset'; }, [showModal]);
  useEffect(() => { const handleResize = () => setWidth(window.innerWidth); window.addEventListener('resize', handleResize); return () => window.removeEventListener('resize', handleResize); }, []);

  // pagination & sorting state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => { setCurrentPage(1); }, [search, type, filtered]);

  const sortedFiltered = useMemo(() => {
    if (!sortConfig.key) return filtered;
    const sorted = [...filtered];
    sorted.sort((a, b) => {
      let res = 0;
      switch (sortConfig.key) {
        case 'employee':
          res = sortByName(a, b);
          break;
        case 'department':
          res = sortByDepartment(a, b);
          break;
        case 'date':
          res = sortByDate(a, b);
          break;
        case 'info':
          res = sortByInfo(a, b);
          break;
        default:
          res = 0;
      }
      return sortConfig.direction === 'asc' ? res : -res;
    });
    return sorted;
  }, [filtered, sortConfig]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedFiltered.slice(start, start + rowsPerPage);
  }, [sortedFiltered, currentPage]);

  const totalPages = Math.ceil(sortedFiltered.length / rowsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const filterData = useCallback((searchTerm, typeFilter) => {
    let filtered = records;
    if (typeFilter !== "all") filtered = filtered.filter(r => r.type === typeFilter);
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(r => {
        const info = r.type === 'client' ? clientInfo[r.employee_id] : employeeInfo[r.employee_id];
        return r.employee_id?.toLowerCase().includes(term) || info?.name?.toLowerCase().includes(term) || (r.type === 'client' ? info?.company?.toLowerCase().includes(term) : info?.department?.toLowerCase().includes(term));
      });
    }
    setFiltered(filtered);
  }, [records]);

  useEffect(() => { filterData(search, type); }, [search, type, filterData]);

  const handleSearch = (term) => { setSearch(term); filterData(term, type); };
  const handleTypeFilter = (t) => { setType(t); filterData(search, t); };

  const fetchData = async () => {
    try { setLoading(true); const res = await axios.get("/api/records"); if (res.data.success) { setRecords(res.data.data); setFiltered(res.data.data); } } 
    catch (error) { console.error("Error:", error); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      const res = await axios.delete(`/api/records/${id}`);
      if (res.data.success) {
        const updated = records.filter(r => r.attendance_id !== id);
        setRecords(updated); setFiltered(updated);
        setSelected(prev => ({ ...prev, selectedRows: prev.selectedRows.filter(i => i !== id) }));
      }
    } catch (error) { console.error("Error:", error); alert("Delete failed"); }
  };

  const handleRestrictSuccess = (data) => {
    const updated = records.map(r => r.attendance_id === restricting ? { ...r, restricted: data } : r);
    setRecords(updated); setFiltered(updated); setShowRestrict(false); setRestricting(null);
  };

  const handleRowSelect = (state, row) => {
    let newSelected = [...selected.selectedRows];
    if (row) {
      newSelected = newSelected.includes(row.attendance_id) ? newSelected.filter(id => id !== row.attendance_id) : [...newSelected, row.attendance_id];
    } else {
      newSelected = selected.allSelected || selected.indeterminate ? [] : filtered.map(r => r.attendance_id);
    }
    const allSelected = newSelected.length === filtered.length;
    const indeterminate = newSelected.length > 0 && newSelected.length < filtered.length;
    setSelected({ selectedRows: newSelected, allSelected, indeterminate });
  };

  // Custom sort functions
  const sortByName = (rowA, rowB) => {
    const isClientA = rowA.type === 'client';
    const isClientB = rowB.type === 'client';
    const infoA = isClientA ? clientInfo[rowA.employee_id] : employeeInfo[rowA.employee_id];
    const infoB = isClientB ? clientInfo[rowB.employee_id] : employeeInfo[rowB.employee_id];
    return (infoA?.name || '').localeCompare(infoB?.name || '');
  };

  const sortByDepartment = (rowA, rowB) => {
    const infoA = rowA.type === 'client' ? clientInfo[rowA.employee_id] : employeeInfo[rowA.employee_id];
    const infoB = rowB.type === 'client' ? clientInfo[rowB.employee_id] : employeeInfo[rowB.employee_id];
    const valueA = rowA.type === 'client' ? infoA?.company || '' : infoA?.department || '';
    const valueB = rowB.type === 'client' ? infoB?.company || '' : infoB?.department || '';
    return valueA.localeCompare(valueB);
  };

  const sortByDate = (rowA, rowB) => {
    return new Date(rowA.attendance_date) - new Date(rowB.attendance_date);
  };

  const sortByInfo = (rowA, rowB) => {
    const valueA = rowA.type === 'client' ? rowA.project_status || '' : rowA.total_working_hours || '';
    const valueB = rowB.type === 'client' ? rowB.project_status || '' : rowB.total_working_hours || '';
    return valueA.localeCompare(valueB);
  };

  // columns removed - manual table rendering will be used instead


  const Pagination = ({ rowsPerPage, rowCount, onChangePage, currentPage }) => (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t">
      <div className="text-xs sm:text-sm mb-2 sm:mb-0">Showing {Math.min((currentPage-1)*rowsPerPage+1, rowCount)}-{Math.min(currentPage*rowsPerPage, rowCount)} of {rowCount}</div>
      <div className="flex space-x-1">
        <button onClick={() => onChangePage(Math.max(1, currentPage-1))} disabled={currentPage===1} className="px-2 py-1 sm:px-3 text-xs sm:text-sm border rounded disabled:opacity-50">Prev</button>
        {Array.from({ length: Math.min(3, Math.ceil(rowCount/rowsPerPage)) }, (_, i) => i+1).map(p => (
          <button key={p} onClick={() => onChangePage(p)} className={`px-2 py-1 sm:px-3 text-xs sm:text-sm border rounded ${currentPage===p ? 'bg-amber-600 text-white' : ''}`}>{p}</button>
        ))}
        <button onClick={() => onChangePage(Math.min(Math.ceil(rowCount/rowsPerPage), currentPage+1))} disabled={currentPage===Math.ceil(rowCount/rowsPerPage)} className="px-2 py-1 sm:px-3 text-xs sm:text-sm border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );


  return (
    <div className="p-2 sm:p-4 md:p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col lg:flex-row justify-between mb-4 gap-3">
        <h2 className="text-lg sm:text-xl font-bold truncate" style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}>Employee & Client Records</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {["all", "employee", "client"].map(t => (
              <button key={t} onClick={() => handleTypeFilter(t)} className={`px-3 py-1.5 text-sm rounded-md ${type===t ? (t==="employee" ? "bg-emerald-100 text-emerald-800" : t==="client" ? "bg-blue-100 text-blue-800" : "bg-white shadow-sm") : ""}`} style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}>
                {t==="all" ? "All" : t==="employee" ? "Employees" : "Clients"}
              </button>
            ))}
          </div>
          <div className="relative flex-1">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" value={search} onChange={e => handleSearch(e.target.value)} className="pl-9 pr-4 py-2 border rounded-lg w-full text-sm" placeholder="Search..." />
          </div>
          <button onClick={() => { setViewing(null); setShowModal(true); }} className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg flex items-center justify-center text-sm">
            <Icons.Plus className="w-4 h-4 mr-1" /> Register
          </button>
        </div>
      </div>

      <div className="mb-3 text-xs sm:text-sm text-slate-500">
        Showing {sortedFiltered.length} of {records.length} records
        {search && <span className="text-amber-600 ml-2">• "{search.substring(0,15)}..."</span>}
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-100">
        <table className="min-w-full divide-y divide-slate-200 font-['Roboto_Slab']">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <CustomCheckbox checked={selected.allSelected} indeterminate={selected.indeterminate} onChange={handleRowSelect} />
              </th>
              <th onClick={() => handleSort('employee')} className="cursor-pointer px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">EMPLOYEE/CLIENT</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">TYPE</th>
              <th onClick={() => handleSort('department')} className="cursor-pointer px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">DEPARTMENT/COMPANY</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ACTIVE</th>
              <th onClick={() => handleSort('date')} className="cursor-pointer px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">DATE</th>
              <th onClick={() => handleSort('info')} className="cursor-pointer px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">INFO</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {paginatedData.length > 0 ? (
              paginatedData.map(r => {
                const isClient = r.type === 'client';
                const info = isClient ? clientInfo[r.employee_id] : employeeInfo[r.employee_id];
                return (
                  <tr key={r.attendance_id}>
                    <td className="px-4 py-2">
                      <CustomCheckbox checked={selected.selectedRows.includes(r.attendance_id)} onChange={() => handleRowSelect(null, r)} />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Avatar name={info?.name} size={10} mobileSize={8} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="text-xs sm:text-sm font-semibold truncate">{info?.name}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isClient ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>{isClient ? 'Client' : 'Emp'}</span>
                          </div>
                          <p className="text-xs text-slate-500 truncate">{isClient ? info?.company : info?.department}</p>
                        </div>
                        {r.restricted && <Icons.ShieldAlert className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 shrink-0" />}
                      </div>
                    </td>
                    <td className="px-4 py-2"><span className={`text-xs px-2 py-1 uppercase rounded-full ${r.type === 'client' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>{r.type}</span></td>
                    <td className="px-4 py-2"><span className="text-xs">{isClient ? info?.company : info?.department}</span></td>
                    <td className="px-4 py-2"><div className="flex items-center"><div className={`w-2 h-2 rounded-full mr-1 ${r.today_present ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} /><span className="text-xs">{r.today_present ? "Yes" : "No"}</span></div></td>
                    <td className="px-4 py-2">{new Date(r.attendance_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                    <td className="px-4 py-2"><span className="text-sm font-medium">{isClient ? r.project_status : r.total_working_hours}</span></td>
                    <td className="px-4 py-2">
                      <ActionButtons row={r} onDelete={handleDelete} onRestrict={setRestricting} onView={setViewing} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="py-12 text-center text-slate-400">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {sortedFiltered.length > rowsPerPage && (
        <Pagination rowsPerPage={rowsPerPage} rowCount={sortedFiltered.length} onChangePage={setCurrentPage} currentPage={currentPage} />
      )}

      {selected.selectedRows.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 sm:hidden">
          <Icons.Check className="w-4 h-4" /><span>{selected.selectedRows.length} selected</span>
        </div>
      )}

      {showModal && <RegisterModal onClose={() => setShowModal(false)} />}
      <RestrictModal isOpen={showRestrict} onClose={() => { setShowRestrict(false); setRestricting(null); }} attendanceId={restricting} onSuccess={handleRestrictSuccess} attendanceRecords={records} />
      <ViewDetailsModal isOpen={showView} onClose={() => { setShowView(false); setViewing(null); }} record={viewing} />
    </div>
  );
};

export default Data_Table;