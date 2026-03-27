import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  User,
  Phone,
  MapPin,
  Globe,
  Building,
  Smartphone,
  Camera,
  Calendar,
  Shield,
  MessageCircle,
  Linkedin,
  Facebook,
  Youtube,
  Instagram,
  Twitter,
  PhoneCall,
  Upload,
  Users,
  Save,
  X,
  Github,
  CircleUserRound,
  ShieldCheck,
  Link as LinkIcon
} from "lucide-react";
import { Link } from "react-router-dom";

// Theme Configuration for Social Media & Profile Fields
const SOCIAL_MEDIA_CONFIG = [
  { label: "Instagram", icon: Instagram, color: "text-pink-600", bg: "bg-pink-50" },
  { label: "Twitter / X", icon: Twitter, color: "text-sky-500", bg: "bg-sky-50" },
  { label: "LinkedIn", icon: Linkedin, color: "text-blue-700", bg: "bg-blue-50" },
  { label: "GitHub", icon: Github, color: "text-slate-900", bg: "bg-slate-100" },
  { label: "YouTube", icon: Youtube, color: "text-red-600", bg: "bg-red-50" },
  { label: "WhatsApp", icon: MessageCircle, color: "text-green-600", bg: "bg-green-50" },
  { label: "Facebook", icon: Facebook, color: "text-blue-600", bg: "bg-blue-50" },
];

const PROFILE_FIELDS_CONFIG = [
  { label: "User Profile", icon: User, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Gender / Identity", icon: CircleUserRound, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Global Presence", icon: Globe, color: "text-cyan-600", bg: "bg-cyan-50" },
  { label: "Location", icon: MapPin, color: "text-rose-600", bg: "bg-rose-50" },
  { label: "Contact Info", icon: Phone, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Calendar Event", icon: Calendar, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Assigned Role", icon: ShieldCheck, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Community", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Email Address", icon: Mail, color: "text-orange-600", bg: "bg-orange-50" },
];

export const Personal = () => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  );
  const [totalEmployees, setTotalEmployees] = useState(0);

  const [profile, setProfile] = useState({
    // Basic Information
    adminId: "ADM-001",
    fullName: "System Administrator",
    username: "admin_user",
    gender: "Male",
    dateOfBirth: "1985-03-15",

    // Contact Details
    email: "admin@company.com",
    phone: "+91 98765 43210",
    alternatePhone: "+91 87654 32109",

    // Address
    address: "123 Tech Park, Silicon Valley",
    country: "United States",
    state: "California",
    city: "San Francisco",

    // Professional
    role: "System Administrator",

    // Social Media
    facebook: "https://facebook.com/admin",
    youtube: "https://youtube.com/c/admin",
    linkedin: "https://linkedin.com/in/admin",
    whatsapp: "+91 9876543210",
    instagram: "https://instagram.com/admin",
    twitter: "https://twitter.com/admin",
    tiktok: "https://tiktok.com/@admin"
  });

  // Simulate fetching total employees on component mount
  useEffect(() => {
    // In a real app, you would fetch this from an API
    const fetchEmployeeCount = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setTotalEmployees(25); // Mock data
      } catch (error) {
        console.error("Error fetching employee count:", error);
      }
    };

    fetchEmployeeCount();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const simulateFileUpload = (file) => {
    return new Promise((resolve) => {
      setUploading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setUploading(false);
              setUploadProgress(0);
              resolve();
            }, 300);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Simulate upload process
    try {
      await simulateFileUpload(file);

      // In a real app, you would send the file to your server here
      // Example API call:
      // const formData = new FormData();
      // formData.append('avatar', file);
      // formData.append('userId', profile.adminId);
      // const response = await fetch('/api/upload-avatar', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();

      alert(`Avatar uploaded successfully: ${file.name}`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload avatar. Please try again.");
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      // In a real app, you would send the profile data to your server
      // const response = await fetch('/api/update-profile', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(profile)
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleDiscardChanges = () => {
    if (window.confirm("Are you sure you want to discard all changes?")) {
      window.location.reload();
    }
  };

  // const roles = ["CEO", "Managing Director", "Manager", "System Administrator", "HR Manager", "Finance Head", "Team Lead"];
  // Social Media Colors


  return (
    <div className="min-h-screen bg-white p-2 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Employee Count */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Profile Management</h1>
            <p className="text-slate-600 mt-2">Manage your personal and professional information</p>
          </div>

          {/* Employee Count Card */}
          <div className="bg-white rounded-xl  border border-slate-200 lg:p-4 md:p-4 p-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Employees</p>
                <p className="md:text-2xl lg:text-2xl text-lg font-bold text-slate-800">{totalEmployees.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl  border border-amber-500 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Left Side - Avatar & Basic Info */}
            <div className="lg:col-span-1 bg-white p-8 border-r border-slate-200">
              <div className="flex flex-col items-center h-full">
                {/* Avatar Section with Upload Progress */}
                <div className="relative mb-8">
                  <div
                    className="relative group cursor-pointer flex justify-center"
                    onClick={!uploading ? handleAvatarClick : undefined}
                  >
                    {/* Avatar */}
                    <div className={`w-48 h-48 rounded-2xl border-4 border-white shadow-xl overflow-hidden
                      bg-gradient-to-br from-amber-100 to-orange-100
                      transition-opacity ${!uploading && 'group-hover:opacity-90'} ${uploading ? 'opacity-80' : ''}`}>
                      <img
                        src={avatarPreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />

                      {/* Upload Progress Overlay */}
                      {uploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-2">
                              <div className="relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                </div>

                              </div>
                              <span className="text-white  font-semibold text-sm">
                                {uploadProgress}%
                                <p className="text-white text-sm">Uploading...</p>
                              </span>
                            </div>

                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hover Overlay (only when not uploading) */}
                    {!uploading && (
                      <>
                        <div className="absolute inset-0 rounded-2xl
                          bg-black/0 group-hover:bg-black/25
                          transition-all duration-300
                          flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100
                              transition-opacity duration-300
                              bg-white p-3 rounded-full shadow-lg">
                            <div className="w-5 h-5 bg-amber-100 rounded-lg flex items-center justify-center">
                              <Camera className="w-5 h-5 text-amber-600" />
                            </div>
                          </div>
                        </div>

                        {/* Change Photo Badge */}
                        <div
                          className="absolute -bottom-4 left-1/2 -translate-x-1/2
                            bg-white px-4 py-2
                            rounded-full border border-amber-300 shadow-sm
                            flex items-center gap-2"
                        >
                          <div className="w-5 h-5 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Upload className="w-5 h-5 text-amber-600" />
                          </div>
                          <span className="text-sm font-medium text-slate-700">
                            Change Photo
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                  />

                  {/* Upload Instructions */}
                  <p className="text-xs text-slate-500 text-center mt-6">
                    Supports: JPG, PNG, GIF (Max 5MB)
                  </p>
                </div>

                {/* Basic Information */}
                <div className="w-full space-y-6">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-slate-800 mb-1">
                      {profile.fullName}
                    </h2>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full">
                      <div className="w-5 h-5 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-10 h-10 text-cyan-600" />
                      </div>
                      <span className="text-sm font-semibold text-amber-800">
                        {profile.role}
                      </span>
                    </div>
                  </div>

                  <InfoCard
                    icon={User}
                    label="Admin ID"
                    value={profile.adminId}
                    color="text-indigo-600"
                    bg="bg-indigo-50"
                  />

                  <InfoCard
                    icon={User}
                    label="Username"
                    value={profile.username}
                    color="text-indigo-600"
                    bg="bg-indigo-50"
                  />

                  <InfoCard
                    icon={Calendar}
                    label="Date of Birth"
                    value={profile.dateOfBirth}
                    color="text-amber-600"
                    bg="bg-amber-50"
                  />

                  <InfoCard
                    icon={CircleUserRound}
                    label="Gender"
                    value={profile.gender}
                    color="text-purple-600"
                    bg="bg-purple-50"
                  />
                </div>

                {/* Social Media Quick Links */}
                <div className="mt-auto pt-8 w-full">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
                    Connect
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {SOCIAL_MEDIA_CONFIG.map((social) => (
                      <SocialIcon
                        key={social.label}
                        icon={social.icon}

                        url={profile[social.label.toLowerCase().replace(/\s+|\/.*/, '')] || '#'}
                        color={social.color}
                        bg={social.bg}
                        label={social.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form Sections */}
            <div className="lg:col-span-2 p-8">
              {/* Basic Information Section */}
              <Section title="Basic Information" icon={User} iconColor="text-indigo-600" >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    icon={User}
                    iconColor='text-indigo-600'
                     iconBg='bg-indigo-50'
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Username"
                    icon={User}
                    iconColor='text-indigo-600'
                     iconBg='bg-indigo-50'
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    required
                  />

                  <div>
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-amber-600" />
                      </div>
                      Gender (Optional)
                    </label>
                    <select
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white
                                 focus:border-amber-400 focus:ring-4 focus:ring-amber-50
                                 outline-none transition-all text-slate-700
                                 hover:border-amber-300"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <Input
                    label="Date of Birth (Optional)"
                    icon={Calendar}
                    iconColor='text-indigo-600'
                    iconBg='bg-indigo-50'
                    name="dateOfBirth"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={handleChange}
                    optional
                  />
                </div>
              </Section>

              {/* Contact Details Section */}
              <Section title="Contact Details" icon={PhoneCall} iconColor="text-green-600" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Email Address (Primary)"
                    icon={Mail}
                    iconColor='text-orange-500'
                    iconBg='bg-orange-50'
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Phone / Mobile Number"
                    icon={Phone}
                    iconColor='text-emerald-500'
                    iconBg='bg-emerald-50'
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Alternate Phone (Optional)"
                    icon={Smartphone}
                    name="alternatePhone"
                    iconColor='text-emerald-500'
                    iconBg='bg-emerald-50'
                    value={profile.alternatePhone}
                    onChange={handleChange}
                    optional
                  />
                </div>
              </Section>

              {/* Address Section */}
              <Section title="Address Information" icon={MapPin} iconColor="text-blue-600" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Address"
                    icon={MapPin}
                    iconColor='text-rose-500'
                    iconBg='bg-rose-50'
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                  />

                  <Input
                    label="Country"
                    icon={Globe}
                    iconColor='text-cyan-500'
                    iconBg='bg-cyan-50'

                    name="country"
                    value={profile.country}
                    onChange={handleChange}
                  />

                  <Input
                    label="State"
                    icon={Building}
                    iconColor='text-cyan-500'
                    iconBg='bg-cyan-50'
                    name="state"
                    value={profile.state}
                    onChange={handleChange}
                  />

                  <Input
                    label="City"
                    icon={Building}
                    iconColor='text-blue-500'
                    iconBg='bg-blue-50'
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                  />
                </div>
              </Section>

             
              {/* Social Media Section */}
              <Section title="Social Media Links" icon={Globe} iconColor="text-cyan-600"    className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {SOCIAL_MEDIA_CONFIG.map((social) => (
                    <Input
                      key={social.label}
                      label={social.label}
                      icon={social.icon}
                      name={social.label.toLowerCase().replace(/\s+|\/.*/, '')}
                      value={profile[social.label.toLowerCase().replace(/\s+|\/.*/, '')] || ''}
                      onChange={handleChange}
                      type="url"
                      placeholder={`https://${social.label.toLowerCase()}.com/username`}
                      S_color={social.color}
                      S_bg={social.bg}
                    />
                  ))}
                </div>
              </Section>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-12 pt-8 border-t border-slate-200">
                <button
                  className="px-8 py-3 rounded-xl border border-slate-300 text-slate-600 font-medium 
                    hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                  onClick={handleDiscardChanges}
                  disabled={uploading}
                >
                  <div className="w-5 h-5 bg-slate-100 rounded-lg flex items-center justify-center">
                    <X className="w-5 h-5 text-slate-600" />
                  </div>
                  Discard Changes
                </button>
                <button
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white 
                    font-semibold shadow-md hover:from-amber-600 hover:to-orange-600 
                    transition-all hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  onClick={handleUpdateProfile}
                  disabled={uploading}
                >
                  <div className="w-5 h-5 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Save className="w-5 h-5 text-amber-600" />
                  </div>
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Components */

const Section = ({ title, icon: Icon, iconColor = "text-amber-600", children, className = "" }) => (
  <div className={className}>
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-lg flex items-center  justify-center">
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
    </div>
    {children}
  </div>
);

const Input = ({ label, icon: Icon, iconBg, iconColor = "text-amber-600", type = "text", required = false, optional = false, disabled = false, S_color, S_bg, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg} ${S_bg}`}>
        <Icon className={`w-5 h-5 ${iconColor} ${S_color}`} />
      </div>
      {label}
      {required && <span className="text-red-500">*</span>}
      {optional && <span className="text-slate-400 text-xs">(Optional)</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        className={`w-full px-4 py-3 rounded-xl border border-slate-300 bg-white
                   focus:border-amber-400 focus:ring-4 focus:ring-amber-50
                   outline-none transition-all text-slate-700
                   hover:border-amber-300 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        disabled={disabled}
        {...props}
      />
    </div>
  </div>
);

const InfoCard = ({ icon: Icon, label, value, color = "text-amber-600", bg = "bg-amber-50" }) => {
  const colorMap = {
    "text-pink-600": "#db2777",
    "text-sky-500": "#0ea5e9",
    "text-blue-700": "#1d4ed8",
    "text-slate-900": "#0f172a",
    "text-red-600": "#dc2626",
    "text-green-600": "#16a34a",
    "text-blue-600": "#2563eb",
    "text-indigo-600": "#4f46e5",
    "text-purple-600": "#9333ea",
    "text-cyan-600": "#0891b2",
    "text-rose-600": "#e11d48",
    "text-emerald-600": "#059669",
    "text-amber-600": "#b45309",
    "text-orange-600": "#ea580c",
    "text-teal-600": "#0d9488",
  };

  const bgMap = {
    "bg-pink-50": "#fdf2f8",
    "bg-sky-50": "#f0f9ff",
    "bg-blue-50": "#eff6ff",
    "bg-slate-100": "#f1f5f9",
    "bg-red-50": "#fef2f2",
    "bg-green-50": "#f0fdf4",
    "bg-indigo-50": "#eef2ff",
    "bg-purple-50": "#faf5ff",
    "bg-cyan-50": "#ecf8ff",
    "bg-rose-50": "#fff7ed",
    "bg-emerald-50": "#f0fdf4",
    "bg-amber-50": "#fef3c7",
    "bg-orange-50": "#fff7ed",
    "bg-teal-50": "#f0fdfa",
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: bgMap[bg] || "#fef3c7" }}>
          <Icon className="w-5 h-5" style={{ color: colorMap[color] || "#b45309" }} />
        </div>
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="text-sm font-semibold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

const SocialIcon = ({ icon: Icon, url, color, bg, label }) => {
  // Mapping of color classes to RGB values for inline styles
  const colorMap = {
    "text-pink-600": { rgb: "219 39 119", hex: "#db2777" },
    "text-sky-500": { rgb: "14 165 233", hex: "#0ea5e9" },
    "text-blue-700": { rgb: "29 78 216", hex: "#1d4ed8" },
    "text-slate-900": { rgb: "15 23 42", hex: "#0f172a" },
    "text-red-600": { rgb: "220 38 38", hex: "#dc2626" },
    "text-green-600": { rgb: "22 163 74", hex: "#16a34a" },
    "text-blue-600": { rgb: "37 99 235", hex: "#2563eb" },
    "text-indigo-600": { rgb: "79 70 229", hex: "#4f46e5" },
    "text-purple-600": { rgb: "147 51 234", hex: "#9333ea" },
    "text-cyan-600": { rgb: "8 145 178", hex: "#0891b2" },
    "text-rose-600": { rgb: "225 29 72", hex: "#e11d48" },
    "text-emerald-600": { rgb: "5 150 105", hex: "#059669" },
    "text-orange-600": { rgb: "234 88 12", hex: "#ea580c" },
    "text-teal-600": { rgb: "13 148 136", hex: "#0d9488" },
  };

  const bgMap = {
    "bg-pink-50": "#fdf2f8",
    "bg-sky-50": "#f0f9ff",
    "bg-blue-50": "#eff6ff",
    "bg-slate-100": "#f1f5f9",
    "bg-red-50": "#fef2f2",
    "bg-green-50": "#f0fdf4",
    "bg-indigo-50": "#eef2ff",
    "bg-purple-50": "#faf5ff",
    "bg-cyan-50": "#ecf8ff",
    "bg-rose-50": "#fff7ed",
    "bg-emerald-50": "#f0fdf4",
    "bg-orange-50": "#fff7ed",
    "bg-teal-50": "#f0fdfa",
  };

  const bgColor = bgMap[bg] || "#fef3c7";

  return (
    <Link
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex flex-col items-center justify-center bg-white border border-slate-300 
        rounded-xl hover:shadow-md transition-all group relative"
      title={label}
      style={{ cursor: url === '#' ? 'not-allowed' : 'pointer', opacity: url === '#' ? 0.5 : 1 }}
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform"
        style={{ backgroundColor: bgColor }}>
        <Icon className="w-5 h-5" style={{ color: colorMap[color]?.hex || "#f59e0b" }} />
      </div>
    </Link>
  );
};