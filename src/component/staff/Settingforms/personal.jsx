import React, { useState } from "react";
import {
    User, Phone, MapPin, Home, Briefcase, Calendar,
    CheckCircle, XCircle, Edit2, Save, X, Globe,
    Mail, Linkedin, Github, Instagram, Facebook,
    Award, Target, BarChart, Star, Upload, Camera,
    Shield, TrendingUp, Users, Clock, Activity
} from "lucide-react";
import DonutChart from "../../chart";

export const Personal = () => {
    // State for edit mode
    const [isEditing, setIsEditing] = useState(false);

    // State for profile image
    const [profileImage, setProfileImage] = useState(null);

    // State for editable personal information
    const [personalInfo, setPersonalInfo] = useState({
        firstName: "John",
        middleName: "Michael",
        lastName: "Doe",
        contactNumber: "+1 (555) 123-4567",
        temporaryAddress: "123 Downtown St, New York, NY",
        permanentAddress: "456 Home Ave, Boston, MA",
        skills: ["React", "Tailwind CSS", "TypeScript", "Node.js", "Next.js"],
        socialMedia: {
            email: "john.doe@example.com",
            linkedin: "linkedin.com/in/johndoe",
            github: "github.com/johndoe",
            instagram: "@johndoe",
            facebook: "facebook.com/johndoe"
        },
        about: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React and modern JavaScript ecosystems."
    });

    // State for read-only attendance and work information
    const attendanceInfo = {
        presentDays: 22,
        absentDays: 3,
        month: "January",
        taskCompletionRate: 92,
        workingBranch: "Technology Department",
        workingAddress: "789 Tech Park, Silicon Valley, CA",
        position: "Senior Frontend Developer",
        employeeId: "EMP-2023-0456",
        joiningDate: "March 15, 2019",
        manager: "Sarah Johnson",
        teamSize: 8
    };

    // Handle profile image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("File size must be less than 5MB");
                return;
            }

            // Check file type
            if (!file.type.match('image.*')) {
                alert("Please upload an image file");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        setPersonalInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle social media changes
    const handleSocialMediaChange = (platform, value) => {
        setPersonalInfo(prev => ({
            ...prev,
            socialMedia: {
                ...prev.socialMedia,
                [platform]: value
            }
        }));
    };

    // Handle skills changes
    const handleSkillsChange = (index, value) => {
        const newSkills = [...personalInfo.skills];
        newSkills[index] = value;
        setPersonalInfo(prev => ({
            ...prev,
            skills: newSkills
        }));
    };

    // Add new skill
    const addSkill = () => {
        setPersonalInfo(prev => ({
            ...prev,
            skills: [...prev.skills, "New Skill"]
        }));
    };

    // Remove skill
    const removeSkill = (index) => {
        const newSkills = personalInfo.skills.filter((_, i) => i !== index);
        setPersonalInfo(prev => ({
            ...prev,
            skills: newSkills
        }));
    };

    // Save changes
    const handleSave = () => {
        setIsEditing(false);
        console.log("Saved:", personalInfo);
    };

    // Cancel editing
    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-white p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header with Profile Summary */}
                <div className="relative mb-8 overflow-hidden rounded-2xl bg-white border border-orange-500 shadow">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-500/5 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-orange-500/5 to-transparent rounded-full translate-x-20 translate-y-20"></div>

                    <div className="relative p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center justify-center flex-col lg:flex-row md:flex-row gap-4">
                                <div className="relative group flex ">
                                    <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow flex items-center justify-center overflow-hidden">

                                        <img
                                            src={profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                    {isEditing && (
                                        <label className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                                            <div className="p-3 bg-white rounded-full shadow">
                                                <Camera className="w-6 h-6 text-amber-600" />
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>

                                <div className="flex flex-col justify-center items-center lg:items-start md:items-start ">
                                    <h1 className="text-xl md:text-4xl font-bold text-gray-800">
                                        {personalInfo.firstName} {personalInfo.lastName}
                                    </h1>
                                    <p className="text-amber-600 text-lg mt-1">{attendanceInfo.position}</p>
                                    <div className="flex  gap-4 mt-3 flex-col lg:flex-row md:flex-row justify-center">
                                        <span className=" px-3 py-1 bg-white/80 backdrop-blur-sm border
                                         border-slate-200 text-gray-700 rounded-full text-sm
                                         font-medium ">
                                            ID: {attendanceInfo.employeeId}
                                        </span>
                                        <span className="px-3 py-1 bg-white/80 backdrop-blur-sm border border-slate-200 text-gray-700 rounded-full text-sm font-medium shadow-sm">
                                            <Clock className="w-4 h-4 inline mr-1 text-amber-600" />
                                            Joined: {attendanceInfo.joiningDate}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 shadow ${isEditing
                                        ? 'bg-gradient-to-r from-white to-slate-50 border border-slate-200 text-gray-700 hover:shadow-xl'
                                        : 'bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:from-amber-700 hover:to-orange-600 hover:shadow-sm'
                                        }`}
                                >
                                    {isEditing ? (
                                        <>
                                            <X className="w-5 h-5" />
                                            Cancel Edit
                                        </>
                                    ) : (
                                        <>
                                            <Edit2 className="w-5 h-5" />
                                            Edit Profile
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Upload System (only in edit mode) */}
                {isEditing && (
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-white to-amber-50 border border-slate-200 rounded-2xl shadow overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow
                  ">
                                        <Upload className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">Update Profile Picture</h3>
                                        <p className="text-amber-600">Upload a professional headshot (JPG, PNG, GIF - Max 5MB)</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                                            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                                                <Shield className="w-4 h-4 text-amber-600" />
                                                Requirements
                                            </h4>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                    Max file size: 5MB
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                    Supported formats: JPG, PNG, GIF
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                    Recommended: Square aspect ratio
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                    Professional headshot preferred
                                                </li>
                                            </ul>
                                        </div>

                                        <label className="block cursor-pointer">
                                            <div className="p-8 border-2 border-dashed border-slate-300 rounded-xl bg-white hover:border-amber-500 transition-colors duration-300 group">
                                                <div className="text-center">
                                                    <div className="inline-flex p-4 bg-gradient-to-br from-amber-50 to-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                                                        <Upload className="w-8 h-8 text-amber-600" />
                                                    </div>
                                                    <h4 className="font-medium text-gray-800 mb-2">Click to upload</h4>
                                                    <p className="text-sm text-amber-600 mb-2">or drag and drop</p>
                                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                                                </div>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                    <div>
                                        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm h-full">
                                            <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                                                <Camera className="w-4 h-4 text-amber-600" />
                                                Preview
                                            </h4>
                                            <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)]">
                                                <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-amber-50 to-white border-4 border-white shadow overflow-hidden mb-4">
                                                    {profileImage ? (
                                                        <img
                                                            src={profileImage}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <User className="w-16 h-16 text-amber-300" />
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 text-center">
                                                    {profileImage ? "Your new profile picture" : "No image selected"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Editable Information */}
                    <div className="space-y-6">
                        {/* Basic Information Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="md:text-2xl text-xl font-bold text-gray-800">
                                        Basic Information
                                    </h2>
                                    <p className="text-amber-600">Personal identification details</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="block text-gray-700 font-medium text-sm">First Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={personalInfo.firstName}
                                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                                            className="w-full px-4 py-3 text-sm
                                             bg-white border border-slate-300
                                              rounded-xl focus:ring-4 focus:ring-amber-500/20
                                               focus:border-amber-500 outline-none
                                                transition-all shadow-sm"
                                        />
                                    ) : (
                                        <div className="px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-gray-800 font-medium shadow-sm">
                                            {personalInfo.firstName}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-gray-700 font-medium text-sm">Middle Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={personalInfo.middleName}
                                            onChange={(e) => handleInputChange("middleName", e.target.value)}
                                            className="w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all shadow-sm"
                                        />
                                    ) : (
                                        <div className="px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-gray-800 font-medium shadow-sm">
                                            {personalInfo.middleName}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-gray-700 font-medium text-sm">Last Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={personalInfo.lastName}
                                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                                            className="w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all shadow-sm"
                                        />
                                    ) : (
                                        <div className="px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-gray-800 font-medium shadow-sm">
                                            {personalInfo.lastName}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-gray-700 font-medium text-sm">Contact Number</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={personalInfo.contactNumber}
                                            onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                                            className="w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all shadow-sm"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-gray-800 font-medium shadow-sm">
                                            <Phone className="w-4 h-4 text-amber-600" />
                                            {personalInfo.contactNumber}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Address Information Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow">
                                    <Home className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="md:text-2xl text-xl font-bold text-gray-800">
                                        Address Information
                                    </h2>
                                    <p className="text-amber-600">Current and permanent addresses</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="block text-gray-700 font-medium text-sm flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-amber-600" />
                                        Temporary Address
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={personalInfo.temporaryAddress}
                                            onChange={(e) => handleInputChange("temporaryAddress", e.target.value)}
                                            className="w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all shadow-sm min-h-[100px] resize-none"
                                        />
                                    ) : (
                                        <div className="px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-gray-800 font-medium shadow-sm">
                                            {personalInfo.temporaryAddress}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-gray-700 font-medium text-sm flex items-center gap-2">
                                        <Home className="w-4 h-4 text-amber-600" />
                                        Permanent Address
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={personalInfo.permanentAddress}
                                            onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                                            className="w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all shadow-sm min-h-[100px] resize-none"
                                        />
                                    ) : (
                                        <div className="px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-gray-800 font-medium shadow-sm">
                                            {personalInfo.permanentAddress}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Skills Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow">
                                    <Briefcase className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="md:text-2xl text-xl font-bold text-gray-800">
                                        Professional Skills
                                    </h2>
                                    <p className="text-amber-600">Your technical expertise and abilities</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {personalInfo.skills.map((skill, index) => (
                                    <div key={index} className="group relative">
                                        {isEditing ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={skill}
                                                    onChange={(e) => handleSkillsChange(index, e.target.value)}
                                                    className="px-4 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all shadow-sm"
                                                />
                                                <button
                                                    onClick={() => removeSkill(index)}
                                                    className="p-2 text-amber-600 hover:text-orange-500 transition-colors hover:scale-110"
                                                >
                                                    <XCircle className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="px-4 py-2 bg-gradient-to-r from-white to-amber-50 text-gray-800 border border-slate-200 rounded-xl font-medium text-sm shadow-sm hover:shadow-md transition-shadow">
                                                {skill}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {isEditing && (
                                    <button
                                        onClick={addSkill}
                                        className="px-4 py-2 bg-white border-2 border-dashed border-slate-300 text-amber-600 hover:border-amber-500 hover:bg-amber-50 rounded-xl transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md flex items-center gap-2"
                                    >
                                        <span className="text-lg">+</span> Add Skill
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Social Media Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow">
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="md:text-2xl text-xl font-bold text-gray-800">
                                        Social Profiles
                                    </h2>
                                    <p className="text-amber-600">Connect your social media accounts</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {Object.entries(personalInfo.socialMedia).map(([platform, value]) => (
                                    <div key={platform} className="space-y-2">
                                        <label className="block text-gray-700 font-medium text-sm capitalize">
                                            {platform === "linkedin" ? "LinkedIn" : platform}
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                                                className="w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all shadow-sm"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-3 px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-gray-800 font-medium shadow-sm group hover:shadow-md transition-shadow">
                                                <div className="p-2 bg-gradient-to-br from-amber-50 to-white rounded-lg">
                                                    {platform === "email" && <Mail className="w-4 h-4 text-amber-600" />}
                                                    {platform === "linkedin" && <Linkedin className="w-4 h-4 text-amber-600" />}
                                                    {platform === "github" && <Github className="w-4 h-4 text-amber-600" />}
                                                    {platform === "instagram" && <Instagram className="w-4 h-4 text-amber-600" />}
                                                    {platform === "facebook" && <Facebook className="w-4 h-4 text-amber-600" />}
                                                </div>
                                                <span className="truncate">{value}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* About Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow">
                                    <Activity className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="md:text-2xl text-xl font-bold text-gray-800">Professional Summary</h2>
                                    <p className="text-amber-600">About your career and expertise</p>
                                </div>
                            </div>
                            {isEditing ? (
                                <textarea
                                    value={personalInfo.about}
                                    onChange={(e) => handleInputChange("about", e.target.value)}
                                    className="w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all shadow-sm min-h-[150px] resize-none"
                                />
                            ) : (
                                <div className="px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-gray-800 leading-relaxed shadow-sm">
                                    {personalInfo.about}
                                </div>
                            )}
                        </div>

                        {/* Save Button (only in edit mode) */}
                        {isEditing && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-end">
                                <button
                                    onClick={handleCancel}
                                    className="px-8 py-4 bg-gradient-to-r from-white to-slate-50 border border-slate-300 text-gray-700 hover:shadow-xl rounded-xl font-medium transition-all duration-300 shadow text-sm"
                                >
                                    Cancel Changes
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white rounded-xl font-medium flex items-center justify-center gap-3 transition-all duration-300 shadow hover:shadow-sm text-sm"


                                >
                                    <Save className="w-5 h-5" />
                                    Save All Changes
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Read Only Information */}
                    <div className="space-y-6">
                        {/* Attendance Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow p-6">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow">
                                    <Calendar className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="md:text-2xl text-xl font-bold text-gray-800">
                                        Monthly Attendance
                                    </h2>
                                    <p className="text-amber-600">Performance for {attendanceInfo.month}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5 mb-8">
                                <div className="bg-gradient-to-br from-white to-green-50 border border-slate-200 rounded-2xl p-5 shadow">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-700 text-sm">Present Days</p>
                                            <p className="text-3xl font-bold text-gray-800 mt-2">{attendanceInfo.presentDays}</p>
                                        </div>
                                        <div className="p-3 bg-gradient-to-br from-green-100 to-white
                                         rounded-xl border border-slate-100 ">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-white to-red-50 border border-slate-200 rounded-2xl p-5 shadow">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-700 text-sm">Absent Days</p>
                                            <p className="text-3xl font-bold text-gray-800 mt-2">{attendanceInfo.absentDays}</p>
                                        </div>
                                        <div className="p-3 bg-gradient-to-br from-red-100 to-white rounded-xl border border-slate-100 shadow">
                                            <XCircle className="w-8 h-8 text-red-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white 
                border border-slate-200 rounded-2xl 
                p-4 sm:p-5 md:p-6 
                shadow w-full">

                                <div className="flex flex-col md:flex-row 
                  items-center md:items-stretch 
                  justify-between gap-6">

                                    {/* LEFT CONTENT */}
                                    <div className="flex-1 w-full text-center md:text-left">
                                        <p className="text-gray-700 text-sm">
                                            Task Completion Rate
                                        </p>

                                        <p className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
                                            {attendanceInfo.taskCompletionRate}%
                                        </p>

                                        <div className="flex justify-center md:justify-start items-center gap-2 mt-3">
                                            <TrendingUp className="w-4 h-4 text-green-500" />
                                            <span className="text-sm text-green-600">
                                                +5% from last month
                                            </span>
                                        </div>
                                    </div>

                                    {/* RIGHT DONUT */}
                                    <div className="flex items-center justify-center 
                    w-full md:w-[180px] 
                    h-[140px] sm:h-[160px] md:h-auto">

                                        <div className="w-[120px] h-[120px] 
                      sm:w-[140px] sm:h-[140px] 
                      md:w-[160px] md:h-[160px]">
                                            <DonutChart />
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* Work Information Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow p-6">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow">
                                    <Briefcase className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="md:text-2xl text-xl md:text-2xl font-bold text-gray-800">
                                        Work Details
                                    </h2>
                                    <p className="text-amber-600">Organization information</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="bg-gradient-to-br from-white to-amber-50 border border-slate-200 rounded-2xl p-5 shadow">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gradient-to-br from-amber-100 to-white rounded-xl border border-slate-100 shadow">
                                            <Award className="w-6 h-6 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-gray-700 text-sm">Position</p>
                                            <p className="text-lg font-bold text-gray-800 mt-1">{attendanceInfo.position}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-white to-amber-50 border border-slate-200 rounded-2xl p-5 shadow">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gradient-to-br from-amber-100 to-white rounded-xl border border-slate-100 shadow">
                                            <Target className="w-6 h-6 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-gray-700 text-sm">Department</p>
                                            <p className="text-lg font-bold text-gray-800 mt-1">{attendanceInfo.workingBranch}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-white to-amber-50 border border-slate-200 rounded-2xl p-5 shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gradient-to-br from-amber-100 to-white rounded-xl border border-slate-100 shadow mt-1">
                                            <MapPin className="w-6 h-6 text-amber-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-700 text-sm">Office Location</p>
                                            <p className="text-base font-medium text-gray-800 mt-1">{attendanceInfo.workingAddress}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                    <div className="bg-gradient-to-br from-white to-amber-50 border border-slate-200 rounded-xl p-4 shadow">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-br from-amber-100 to-white rounded-lg">
                                                <Users className="w-6 h-6 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="text-gray-700 text-xs">Team Size</p>
                                                <p className="md:text-lg lg:text-lg text-sm  font-bold text-gray-800">{attendanceInfo.teamSize} members</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-white to-amber-50 border border-slate-200 rounded-xl p-4 shadow">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-br from-amber-100 to-white rounded-lg">
                                                <User className="w-6 h-6 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="text-gray-700 text-xs">Manager</p>
                                                <p className="text-lg font-bold text-gray-800">{attendanceInfo.manager}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Monthly Summary Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow p-6">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow">
                                    <BarChart className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="md:text-2xl text-xl font-bold text-gray-800">
                                        Performance Metrics
                                    </h2>
                                    <p className="text-amber-600">Overall performance analysis</p>
                                </div>
                            </div>

                            <div className="space-y-5 mb-8">
                                <div className="flex justify-between items-center py-4 border-b border-slate-100">
                                    <span className="text-gray-700 text-sm">Total Working Days</span>
                                    <span className="text-xl font-bold text-gray-800 bg-gradient-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text">
                                        {attendanceInfo.presentDays + attendanceInfo.absentDays}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-4 border-b border-slate-100">
                                    <span className="text-gray-700 text-sm">Attendance Rate</span>
                                    <span className="text-xl font-bold text-gray-800 bg-gradient-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text">
                                        {Math.round((attendanceInfo.presentDays / (attendanceInfo.presentDays + attendanceInfo.absentDays)) * 100)}%
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-4 border-b border-slate-100">
                                    <span className="text-gray-700 text-sm">Productivity Score</span>
                                    <span className="text-xl font-bold text-gray-800 bg-gradient-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text">
                                        {Math.round((attendanceInfo.taskCompletionRate * attendanceInfo.presentDays) / 100)}/100
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-4">
                                    <span className="text-gray-700 text-sm">Performance Rating</span>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-6 h-6 ${i < 4 ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-amber-600">
                                        <Calendar className="w-5 h-5" />
                                        <span className="text-sm">Last updated: {new Date().toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}</span>
                                    </div>
                                    <div className="px-3 py-1 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200 text-amber-600 rounded-lg text-sm font-medium">
                                        Excellent Performance
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};