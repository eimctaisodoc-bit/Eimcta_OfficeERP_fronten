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
  X
} from "lucide-react";
import { Link } from "react-router-dom";

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

  const roles = ["CEO", "Managing Director", "Manager", "System Administrator", "HR Manager", "Finance Head", "Team Lead"];

  // Social Media Colors
  const socialColors = {
    facebook: "#1877F2",
    youtube: "#FF0000",
    linkedin: "#0A66C2",
    whatsapp: "#25D366",
    instagram: "#E4405F",
    twitter: "#1DA1F2",
    tiktok: "#000000"
  };

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
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 lg:p-4 md:p-4 p-2">
              <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-amber-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Employees</p>
                <p className="md:text-2xl lg:text-2xl text-lg font-bold text-slate-800">{totalEmployees.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Left Side - Avatar & Basic Info */}
            <div className="lg:col-span-1 bg-gradient-to-b from-amber-50 to-white p-8 border-r border-slate-200">
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
                                        <Shield className="w-4 h-4 text-amber-600" />
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
                  />

                  <InfoCard
                    icon={User}
                    label="Username"
                    value={profile.username}
                  />

                  <InfoCard
                    icon={Calendar}
                    label="Date of Birth"
                    value={profile.dateOfBirth}
                  />

                  <InfoCard
                    icon={User}
                    label="Gender"
                    value={profile.gender}
                  />
                </div>

                {/* Social Media Quick Links */}
                <div className="mt-auto pt-8 w-full">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
                    Connect
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    <SocialIcon
                      icon={Facebook}
                      url={profile.facebook}
                      colorName="blue"
                      label="Facebook"
                    />
                    <SocialIcon
                      icon={Twitter}
                      url={profile.twitter}
                      colorName="sky"
                      label="Twitter"
                    />
                    <SocialIcon
                      icon={Linkedin}
                      url={profile.linkedin}
                      colorName="blue"
                      label="LinkedIn"
                    />
                    <SocialIcon
                      icon={Instagram}
                      url={profile.instagram}
                      colorName="pink"
                      label="Instagram"
                    />
                    <SocialIcon
                      icon={Youtube}
                      url={profile.youtube}
                      colorName="red"
                      label="YouTube"
                    />
                    <SocialIcon
                      icon={MessageCircle}
                      url={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`}
                      colorName="emerald"
                      label="WhatsApp"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form Sections */}
            <div className="lg:col-span-2 p-8">
              {/* Basic Information Section */}
              <Section title="Basic Information" icon={User}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    icon={User}
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Username"
                    icon={User}
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    required
                  />

                  <div>
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-amber-100 rounded-lg flex items-center justify-center">
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
                    name="dateOfBirth"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={handleChange}
                    optional
                  />
                </div>
              </Section>

              {/* Contact Details Section */}
              <Section title="Contact Details" icon={PhoneCall} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Email Address (Primary)"
                    icon={Mail}
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Phone / Mobile Number"
                    icon={Phone}
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Alternate Phone (Optional)"
                    icon={Smartphone}
                    name="alternatePhone"
                    value={profile.alternatePhone}
                    onChange={handleChange}
                    optional
                  />
                </div>
              </Section>

              {/* Address Section */}
              <Section title="Address Information" icon={MapPin} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Address"
                    icon={MapPin}
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                  />

                  <Input
                    label="Country"
                    icon={Globe}
                    name="country"
                    value={profile.country}
                    onChange={handleChange}
                  />

                  <Input
                    label="State"
                    icon={Building}
                    name="state"
                    value={profile.state}
                    onChange={handleChange}
                  />

                  <Input
                    label="City"
                    icon={Building}
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                  />
                </div>
              </Section>

              {/* Professional Section */}
              {/* <Section title="Professional Information" icon={Shield} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Admin ID"
                    icon={Shield}
                    name="adminId"
                    value={profile.adminId}
                    onChange={handleChange}
                    disabled
                  />

                  <div>
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-amber-600" />
                      Role
                    </label>
                    <select
                      name="role"
                      value={profile.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white
                                 focus:border-amber-400 focus:ring-4 focus:ring-amber-50
                                 outline-none transition-all text-slate-700
                                 hover:border-amber-300"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </Section> */}

              {/* Social Media Section */}
              <Section title="Social Media Links" icon={Globe} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Facebook"
                    icon={Facebook}
                    name="facebook"
                    value={profile.facebook}
                    onChange={handleChange}
                    type="url"
                    placeholder="https://facebook.com/username"
                  />

                  <Input
                    label="YouTube"
                    icon={Youtube}
                    name="youtube"
                    value={profile.youtube}
                    onChange={handleChange}
                    type="url"
                    placeholder="https://youtube.com/c/username"
                  />

                  <Input
                    label="LinkedIn"
                    icon={Linkedin}
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleChange}
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                  />

                  <Input
                    label="WhatsApp"
                    icon={MessageCircle}
                    name="whatsapp"
                    value={profile.whatsapp}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />

                  <Input
                    label="Instagram"
                    icon={Instagram}
                    name="instagram"
                    value={profile.instagram}
                    onChange={handleChange}
                    type="url"
                    placeholder="https://instagram.com/username"
                  />

                  <Input
                    label="Twitter"
                    icon={Twitter}
                    name="twitter"
                    value={profile.twitter}
                    onChange={handleChange}
                    type="url"
                    placeholder="https://twitter.com/username"
                  />
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

const Section = ({ title, icon: Icon, children, className = "" }) => (
  <div className={className}>
    <div className="flex items-center gap-3 mb-6">
        <div className="w-5 h-5 bg-amber-100 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-amber-600" />
        </div>
      <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
    </div>
    {children}
  </div>
);

const Input = ({ label, icon: Icon, type = "text", required = false, optional = false, disabled = false, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
      <div className="w-5 h-5 bg-amber-100 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-amber-600" />
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

const InfoCard = ({ icon: Icon, label, value, colorName = "amber" }) => (
  <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 bg-${colorName}-100 rounded-lg flex items-center justify-center`}>
        <Icon className={`w-5 h-5 text-${colorName}-600`} />
      </div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  </div>
);

const SocialIcon = ({ icon: Icon, url, colorName = "amber", label }) => (
  <Link
    to={url}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex flex-col items-center justify-center bg-white border border-slate-300 
      rounded-xl hover:shadow-md transition-all group relative"
    title={label}
  >
    <div className={`w-8 h-8 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform bg-${colorName}-100`}>
      <Icon className={`w-5 h-5 text-${colorName}-600`} />
    </div>
  </Link>
);