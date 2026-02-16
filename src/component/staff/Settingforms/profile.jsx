import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Linkedin, 
  Github, 
  Twitter, 
  Globe,
  GraduationCap,
  Briefcase,
  Award
} from 'lucide-react';
import {Link} from 'react-router-dom'
export const Profile = () => {
  // Sample data - you can replace with dynamic data
  const profileData = {
    name: "Alex Johnson",
    role: "Full Stack Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    contact: {
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      dob: "May 15, 1992"
    },
    socialMedia: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      twitter: "https://twitter.com/alex_johnson",
      website: "https://alexjohnson.dev"
    },
    skills: [
      { name: "React.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "Tailwind CSS", level: 95 },
      { name: "UI/UX Design", level: 75 },
      { name: "AWS", level: 70 }
    ],
    about: "Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Love working on open-source projects and mentoring junior developers.",
    education: [
      {
        degree: "Master of Computer Science",
        institution: "Stanford University",
        year: "2016-2018",
        details: "Specialization in Web Technologies"
      },
     
    ],
    experience: [
      {
        role: "Senior Full Stack Developer",
        company: "TechCorp Inc.",
        period: "2020-Present",
        details: "Lead development of customer-facing web applications"
      },
      {
        role: "Frontend Developer",
        company: "StartupXYZ",
        period: "2018-2020",
        details: "Built responsive web applications using React"
      }
    ]
  };

  return (
    <div className="min-h-screen  md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl  overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">
          
          {/* Left Column - Profile & Skills */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Profile Card */}
            <div className=" border-2 border-slate-50 bg-white rounded-2xl p-6 ">
              {/* Avatar & Name */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 mb-4">
                  <img 
                    src={profileData.avatar} 
                    alt={profileData.name}
                    className="w-full h-full rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">{profileData.name}</h1>
                <p className="text-lg text-amber-600 font-medium mt-1">{profileData.role}</p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-5 h-5 text-amber-500" />
                  <span>{profileData.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-5 h-5 text-amber-500" />
                  <span>{profileData.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  <span>{profileData.contact.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  <span>{profileData.contact.dob}</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <Link  
                    to={profileData.socialMedia.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                  <Link  
                    to={profileData.socialMedia.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                  <Link  
                    to={profileData.socialMedia.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link  
                    to={profileData.socialMedia.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Skills</h3>
              <div className="space-y-5">
                {profileData.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-amber-800">{skill.name}</span>
                      <span className="text-sm font-medium text-amber-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-amber-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - About, Education & Experience */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Briefcase className="w-6 h-6 text-amber-500" />
                <h2 className="text-xl font-bold text-gray-800">About</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {profileData.about}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Education Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <GraduationCap className="w-6 h-6 text-amber-500" />
                  <h2 className="text-xl font-bold text-gray-800">Education</h2>
                </div>
                <div className="space-y-6">
                  {profileData.education.map((edu, index) => (
                    <div key={index} className="relative pl-8 pb-6 last:pb-0">
                      <div className="absolute left-0 top-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                      <div className="absolute left-[5px] top-4 bottom-0 w-0.5 bg-orange-200"></div>
                      <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                      <p className="text-orange-600 font-medium">{edu.institution}</p>
                      <p className="text-sm text-orange-500 mt-1">{edu.year}</p>
                      <p className="text-gray-600 mt-2 text-sm">{edu.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <Link  className="w-6 h-6 text-indigo-500" />
                  <h2 className="text-xl font-bold text-gray-800">Experience</h2>
                </div>
                <div className="space-y-6">
                  {profileData.experience.map((exp, index) => (
                    <div key={index} className="relative pl-8 pb-6 last:pb-0">
                      <div className="absolute left-0 top-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                      <div className="absolute left-[5px] top-4 bottom-0 w-0.5 bg-orange-200"></div>
                      <h3 className="text-lg font-semibold text-gray-800">{exp.role}</h3>
                      <p className="text-orange-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-amber-500 mt-1">{exp.period}</p>
                      <p className="text-gray-600 mt-2 text-sm">{exp.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Personal Details Section */}
            <div className=" rounded-2xl p-6 shadow-sm border border-orange-500">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500 block">Languages</label>
                    <span className="font-medium text-gray-800">English, Spanish, French</span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block">Availability</label>
                    <span className="font-medium text-gray-800">Full-time</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500 block">Work Authorization</label>
                    <span className="font-medium text-gray-800">US Citizen</span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block">Remote Work</label>
                    <span className="font-medium text-gray-800">Available</span>
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