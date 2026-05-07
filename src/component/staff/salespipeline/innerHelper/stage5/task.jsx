import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Plus,
  Clock,
  FileText,
  Download,
  Printer,
  Mail,
  Send,
  XCircle,
  ChevronRight,
  Edit,
  Minus,
  Trash2,
  Edit2,
  AlertTriangle,
} from 'lucide-react';
import Select from 'react-select';
import { checkArrayObjectsEmpty, ValidateStyle } from '../../../../../data/data';
import { useGet } from '../../../../hooks/useGet';

export const Contract = ({ id }) => {
  const [filled, setFilled] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const { getOnlyOrgDetails_ } = useGet();
  // console.log('Contract component received id:', id);


  useEffect(() => {
    getOnlyOrgDetails_.mutate(
      { parms: { _id: id?.mainID } },
      {
        onSuccess: (data) => {
          setOrganizations(data?.data?.organizationDetails || []);
          // console.log('Organization details fetched successfully:', data?.data.organizationDetails);
        },
        onError: (err) => {
          console.error('Error fetching organization details:', err);
        },
      }
    );
  }, [id?.mainID])
  useEffect(() => {
    const org__ = checkArrayObjectsEmpty(organizations);
    setFilled(org__);
  }, [organizations]);
  console.log('is filleded:--', filled)
  const fontStyle = { fontFamily: "'Roboto Slab', serif" };
  const checkIsfilled = true;

  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [errors, setErrors] = useState({});

  const [focusedField, setFocusedField] = useState(null);

  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);
  const [schedule, setSchedule] = useState(false)
  const [scheduleFrom, setScheduleFrom] = useState('');
  const [scheduleTo, setScheduleTo] = useState('');
  const [scheduleNote, setScheduleNote] = useState('');
  const [scheduleItems, setScheduleItems] = useState([]);
  const [scheduleEditIndex, setScheduleEditIndex] = useState(-1);
  const [emailInput, setEmailInput] = useState('');
  const [emailRecipients, setEmailRecipients] = useState([]);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('Please review the contract details and share your confirmation.');
  const [emailError, setEmailError] = useState('');
  const [emailSubjectError, setEmailSubjectError] = useState('');
  const [emailBodyError, setEmailBodyError] = useState('');

  const schedulingRef = useRef(null);

  const isCancelled = status?.value === 'cancelled';
  const contractActionsDisabled = !checkIsfilled;

  const getContractReference = () => {
    if (typeof id === 'string' || typeof id === 'number') return String(id);
    return id?.mainID || id?._id || 'draft';
  };

  const sanitizeFileName = (value) => (
    String(value || 'draft')
      .replace(/[^a-z0-9-_]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase() || 'draft'
  );

  const getOptionLabel = (option) => option?.label || 'Not selected';

  const formatDateTime = (value) => {
    if (!value) return 'Not selected';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
  };

  const getContractText = () => {
    return [
      'Contract',
      `Reference: ${getContractReference()}`,
      `Status: ${getOptionLabel(status)}`,
      `Schedule From: ${formatDateTime(scheduleFrom)}`,
      `Schedule To: ${formatDateTime(scheduleTo)}`,
      `Duration: ${duration || 'Not calculated'}`,
      `Cancellation Reason: ${cancelReason.trim() || 'Not provided'}`,
      '',
      'Schedule Items:',
      ...(scheduleItems.length > 0
        ? scheduleItems.map((item, index) => (
          `${index + 1}. ${formatDateTime(item.from)} to ${formatDateTime(item.to)} - ${item.note}`
        ))
        : ['No schedule items added.']),
    ].join('\n');
  };

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }[char]));

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAddEmail = () => {
    const nextEmail = emailInput.trim();

    if (!nextEmail) {
      setEmailError('Enter an email address');
      return;
    }

    if (!isValidEmail(nextEmail)) {
      setEmailError('Enter a valid email address');
      return;
    }

    if (emailRecipients.includes(nextEmail)) {
      setEmailError('Email already added');
      return;
    }

    setEmailRecipients((prev) => [...prev, nextEmail]);
    setEmailInput('');
    setEmailError('');
  };

  const handleEmailKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddEmail();
    }
  };

  const handleRemoveEmail = (index) => {
    setEmailRecipients((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    setEmailError('');
  };

  const getMailRecipients = () => {
    const pendingEmail = emailInput.trim();
    if (!pendingEmail) return emailRecipients;
    return emailRecipients.includes(pendingEmail)
      ? emailRecipients
      : [...emailRecipients, pendingEmail];
  };

  const handleDownloadContract = () => {
    if (contractActionsDisabled) return;

    const blob = new Blob([getContractText()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = `contract-${sanitizeFileName(getContractReference())}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const handlePrintContract = () => {
    if (contractActionsDisabled) return;

    const printWindow = window.open('', '_blank', 'width=900,height=700');

    if (!printWindow) {
      alert('Please allow pop-ups to print the contract.');
      return;
    }

    const contractHtml = getContractText()
      .split('\n')
      .map((line) => `<p>${escapeHtml(line) || '&nbsp;'}</p>`)
      .join('');

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>Contract</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 32px; color: #0f172a; }
            h1 { font-size: 22px; margin-bottom: 20px; }
            p { margin: 0 0 8px; font-size: 13px; line-height: 1.5; }
          </style>
        </head>
        <body>
          <h1>Contract</h1>
          ${contractHtml}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleSendMail = () => {
    if (contractActionsDisabled) return;

    const subjectValue = emailSubject.trim();
    const bodyValue = emailMessage.trim();
    let hasError = false;

    setEmailSubjectError('');
    setEmailBodyError('');
    setEmailError('');

    if (!subjectValue) {
      setEmailSubjectError('Subject is required');
      hasError = true;
    }

    if (!bodyValue) {
      setEmailBodyError('Body is required');
      hasError = true;
    }

    if (hasError) return;

    const recipients = getMailRecipients();
    const invalidEmail = recipients.find((email) => !isValidEmail(email));

    if (recipients.length === 0) {
      setEmailError('Add at least one recipient');
      return;
    }

    if (invalidEmail) {
      setEmailError(`Invalid email: ${invalidEmail}`);
      return;
    }

    setEmailRecipients(recipients);
    setEmailInput('');
    setEmailError('');

    const subject = encodeURIComponent(subjectValue);
    const body = encodeURIComponent(`${emailMessage.trim()}\n\n${getContractText()}`);
    window.location.href = `mailto:${recipients.join(',')}?subject=${subject}&body=${body}`;
  };

  const getInputStyles = (hasError = false, isDisabled = false, isFocused = false) => ({
    backgroundColor: (isDisabled) ? "#f1f5f9" : "#ffffff",
    border: (isDisabled)
      ? "1px solid #cbd5e1"
      : hasError
        ? "1px solid #ef4444"
        : isFocused
          ? "1px solid #f59e0b"
          : "1px solid #e2e8f0",
    boxShadow: (isDisabled)
      ? "none"
      : isFocused
        ? hasError
          ? "0 0 0 3px rgba(239, 68, 68, 0.15)"
          : "0 0 0 3px rgba(245, 158, 11, 0.18)"
        : "none",
    opacity: (isDisabled) ? 0.65 : 1,
    cursor: (isDisabled) ? "not-allowed" : "text",
    borderRadius: "12px",
    padding: "12px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    resize: "vertical",
    transition: "all 0.2s ease"
  });

  const isEmptyValue = (value) => {
    if (value === null || value === undefined) return true;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return String(value).trim() === '';
  };

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'scheduleNote':
        if (schedule && isEmptyValue(value)) error = 'Schedule note is required';
        break;

      case 'scheduleFrom':
        if (schedule && isEmptyValue(value)) {
          error = 'Start time is required';
        }
        break;

      case 'scheduleTo':
        if (schedule) {
          if (isEmptyValue(value)) {
            error = 'End time is required';
          } else if (scheduleFrom && value) {
            const start = new Date(scheduleFrom);
            const end = new Date(value);
            if (end <= start) error = 'End time must be after start time';
          }
        }
        break;

      case 'cancelReason':
        if (isCancelled && isEmptyValue(value)) error = 'Cancellation reason is required';
        break;

      case 'scheduleFrom':
        if (status?.value === 'scheduled' && isEmptyValue(value)) {
          error = 'Start time is required';
        }
        break;

      case 'scheduleTo':
        if (status?.value === 'scheduled') {
          if (isEmptyValue(value)) {
            error = 'End time is required';
          } else if (scheduleFrom && value) {
            const start = new Date(scheduleFrom);
            const end = new Date(value);
            if (end <= start) error = 'End time must be after start time';
          }
        }
        break;

      case 'cancelReason':
        if (isCancelled && isEmptyValue(value)) error = 'Cancellation reason is required';
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const validateAll = () => {
    const fieldsToValidate = [];

    if (schedule) {
      fieldsToValidate.push(validateField('scheduleFrom', scheduleFrom));
      fieldsToValidate.push(validateField('scheduleTo', scheduleTo));
      fieldsToValidate.push(validateField('scheduleNote', scheduleNote));
    }

    if (isCancelled) {
      fieldsToValidate.push(validateField('cancelReason', cancelReason));
    }

    return !fieldsToValidate.some((err) => err !== '');
  };

  const handleToggleSchedule = () => {
    setIsSchedulingOpen((prev) => !prev);
    setSchedule((prev) => !prev);
  };

  const handleScheduleChange = (field, value) => {
    if (field === 'scheduleFrom') setScheduleFrom(value);
    if (field === 'scheduleTo') setScheduleTo(value);
    if (field === 'scheduleNote') setScheduleNote(value);
  };



  const handleScheduleEdit = (index) => {
    const item = scheduleItems[index];
    if (!item) return;

    setScheduleFrom(item.from);
    setScheduleTo(item.to);
    setScheduleNote(item.note);
    setScheduleEditIndex(index);
    setIsSchedulingOpen(true);
  };

  const handleScheduleDelete = (index) => {
    setScheduleItems((prev) => prev.filter((_, i) => i !== index));

    if (scheduleEditIndex === index) {
      setScheduleEditIndex(-1);
      setScheduleFrom('');
      setScheduleTo('');
      setScheduleNote('');
      setIsSchedulingOpen(false);
    }
  };

  const handleSave = () => {
    if (!validateAll()) {
      alert('Validation failed');
      if (schedulingRef.current) {
        schedulingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    console.log('Contract saved successfully:', {
      status,
      scheduleFrom,
      scheduleTo,
      duration,
      scheduleItems,
      cancelReason: cancelReason.trim(),
    });
  };

  useEffect(() => {
    if (scheduleFrom && scheduleTo) {
      const start = new Date(scheduleFrom);
      const end = new Date(scheduleTo);
      const diffMs = end - start;

      if (diffMs > 0) {
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        let durationStr = '';
        if (days > 0) durationStr += `${days}d `;
        if (hours > 0) durationStr += `${hours}h `;
        durationStr += `${minutes}m`;

        setDuration(durationStr.trim());
      } else {
        setDuration('Invalid Range');
      }
    } else {
      setDuration('');
    }
  }, [scheduleFrom, scheduleTo]);

  return (
    <>
      <div className="mx-auto bg-transparent py-4 px-3 w-full" style={fontStyle}>

        <div
          className="relative flex items-start gap-3 bg-amber-50 
  px-4 py-3 rounded-lg border border-amber-200/80 
  w-full animate-in fade-in slide-in-from-top-2 duration-300  align-middle "
          role="alert"
        >
          <AlertTriangle
            className="text-amber-500 mt-0.5 flex-shrink-0 cursor-pointer"
            size={18}
            strokeWidth={2.5}
          />

          <div className="flex-1">
            <h5 className="text-amber-800 text-sm font-medium">
              Please complete the client details.
            </h5>
          </div>

          {/* Action Button */}
          <div className="flex-shrink-0 cursor-pointer">
            <button
              type="button"
              className="text-sm font-medium text-white cursor-pointer
               hover:text-white/80
      bg-amber-500 shadow-sm shadow:amber-500
       hover:bg-amber-500/80 px-3 py-1 rounded-md 
      transition-colors duration-200"
            >
              Update
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 py-2 align-middle ">


          <div className="flex items-center gap-2 mb-4 flex-1">
            <div className="bg-amber-50 p-1.5 rounded-xl">
              <Calendar size={14} className="text-amber-500" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 uppercase sm:text-[12px]">
              Contract
            </h2>
          </div>



        </div>



        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-50 p-1.5 rounded-xl">
                <FileText size={14} className="text-emerald-500" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-wide text-slate-900">
                  Contract Actions
                </h3>
                <p className="text-[11px] text-slate-500">
                  {checkIsfilled ? 'Contract file is ready' : 'Complete contract details first'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                title="Download contract"
                onClick={handleDownloadContract}
                disabled={contractActionsDisabled}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-[12px] font-bold uppercase transition-colors ${contractActionsDisabled
                  ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
              >
                <Download size={13} />
                Download
              </button>

              <button
                type="button"
                title="Print contract"
                onClick={handlePrintContract}
                disabled={contractActionsDisabled}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-[12px] font-bold uppercase transition-colors ${contractActionsDisabled
                  ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                  : 'bg-violet-50 text-violet-600 hover:bg-violet-100'
                  }`}
              >
                <Printer size={13} />
                Print
              </button>
            </div>
          </div>

          <div className={`mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 ${contractActionsDisabled ? 'pointer-events-none opacity-60' : ''}`}>
            <div className="mb-3 flex items-center gap-2">
              <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                <Mail size={13} className="text-amber-500" />
              </div>
              <span className="text-[12px] font-bold uppercase tracking-wide text-slate-900">
                Send Mail
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <label className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-slate-700">Recipient Email</span>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={emailInput}
                    disabled={contractActionsDisabled}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    onKeyDown={handleEmailKeyDown}
                    className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-amber-500"
                  />
                  <button
                    type="button"
                    title="Add email"
                    onClick={handleAddEmail}
                    disabled={contractActionsDisabled}
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${contractActionsDisabled
                      ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                      : 'bg-amber-500 text-white hover:bg-amber-600'
                      }`}
                  >
                    <Plus size={15} />
                  </button>
                </div>
                {emailError && <span className="text-[11px] text-red-500">{emailError}</span>}
              </label>

              {emailRecipients.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {emailRecipients.map((email, index) => (
                    <span
                      key={email}
                      className="inline-flex max-w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700"
                    >
                      <span className="truncate">{email}</span>
                      <button
                        type="button"
                        title="Remove email"
                        onClick={() => handleRemoveEmail(index)}
                        className="text-slate-400 transition-colors hover:text-red-500"
                      >
                        <Trash2 size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <label className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-slate-700">Subject</span>
                <input
                  type="text"
                  value={emailSubject}
                  disabled={contractActionsDisabled}
                  onChange={(e) => {
                    setEmailSubject(e.target.value);
                    if (emailSubjectError) setEmailSubjectError('');
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-amber-500"
                  placeholder="Enter email subject"
                />
                {emailSubjectError && <span className="text-[11px] text-red-500">{emailSubjectError}</span>}
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-slate-700">Body</span>
                <textarea
                  rows={4}
                  value={emailMessage}
                  disabled={contractActionsDisabled}
                  onChange={(e) => {
                    setEmailMessage(e.target.value);
                    if (emailBodyError) setEmailBodyError('');
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-amber-500"
                />
                {emailBodyError && <span className="text-[11px] text-red-500">{emailBodyError}</span>}
              </label>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSendMail}
                  disabled={contractActionsDisabled}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-[12px] font-bold uppercase transition-colors ${contractActionsDisabled
                    ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                >
                  <Send size={13} />
                  Send Mail
                </button>
              </div>
            </div>
          </div>
        </div>
        {(status?.value === 'scheduled' || isSchedulingOpen) && (<>
          <div ref={schedulingRef} className="bg-slate-50 p-4 rounded-xl border
         border-slate-200 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-amber-50 p-1.5 rounded">
                  <Calendar size={14} className="text-amber-500" />
                </div>
                <div>
                  <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-tight">
                    Re-Schedule Stage One
                  </h2>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>
                      {scheduleItems.length > 0
                        ? `${scheduleItems.length} item${scheduleItems.length > 1 ? 's' : ''} added`
                        : 'No schedule added'}
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleSchedule}
                className="bg-orange-50 p-1.5 rounded cursor-pointer hover:bg-orange-100 transition-colors"
              >
                {
                  schedule ? (<Minus size={14} className="text-orange-500" />) : (<Plus size={14} className="text-orange-500" />)
                }


              </button>
            </div>

            {schedule && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 border-t border-slate-200 pt-4">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-900">From</span>
                  <input
                    type="datetime-local"
                    className="border border-slate-200 focus:border-amber-500 focus:ring-0 rounded-lg px-3 py-2.5 w-full text-sm outline-none"
                    value={scheduleFrom}
                    onChange={(e) => handleScheduleChange('scheduleFrom', e.target.value)}
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-900">To</span>
                  <input
                    type="datetime-local"
                    className="border border-slate-200 focus:border-amber-500 focus:ring-0 rounded-lg px-3 py-2.5 w-full text-sm outline-none"
                    value={scheduleTo}
                    min={scheduleFrom || undefined}
                    onChange={(e) => handleScheduleChange('scheduleTo', e.target.value)}
                  />
                </label>

                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="text-xs font-semibold text-slate-900">Schedule Note</span>
                  <textarea
                    rows={3}
                    className="border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-3 w-full text-sm resize-y outline-none"
                    placeholder="Enter what this schedule is for..."
                    value={scheduleNote}
                    onChange={(e) => handleScheduleChange('scheduleNote', e.target.value)}
                  />
                </label>


                <div className="col-span-2 flex flex-col gap-3 text-slate-600 p-2 rounded text-[12px] sm:text-sm">
                  <div className="flex items-center gap-2 bg-slate-50 p-3 rounded w-full border border-slate-200">
                    <div className="bg-amber-50 p-1.5 rounded-xl shrink-0">
                      <Clock size={12} className="text-amber-500" />
                    </div>
                    <span>
                      Duration: <span className="font-bold">{duration || '—'}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {scheduleItems.length > 0 ? (
                scheduleItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 rounded-lg p-3 hover:border-amber-200 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-amber-50 p-1.5 rounded">
                          <Calendar size={14} className="text-amber-500" />
                        </div>
                        <div>
                          <h3 className="text-[14px] font-bold text-slate-900">
                            Re-Schedule Stage One {index + 1}
                          </h3>
                          <div className="text-[11px] text-slate-500">
                            {new Date(item.from).toLocaleString()} - {new Date(item.to).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="bg-blue-50 p-1.5 rounded cursor-pointer hover:bg-blue-100 transition-colors"
                          onClick={() => handleScheduleEdit(index)}
                        >
                          <Edit size={14} className="text-blue-500" />
                        </button>
                        <button
                          type="button"
                          className="bg-red-50 p-1.5 rounded cursor-pointer hover:bg-red-100 transition-colors"
                          onClick={() => handleScheduleDelete(index)}
                        >
                          <XCircle size={14} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[12px] leading-relaxed text-slate-600 pl-8">{item.note}</p>
                  </div>
                ))
              ) : (
                <div className="border border-dashed border-slate-300 rounded-lg p-4 text-[12px] text-slate-500 bg-white">
                  No schedule items added yet.
                </div>
              )}
            </div>
          </div>
        </>
        )}

        <div className="flex gap-2 mt-6">
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-red-600 py-2 rounded text-[12px] sm:text-sm font-bold uppercase">
            <XCircle size={12} /> Terminated
          </button>
        </div>
      </div>
    </>
  );
};
