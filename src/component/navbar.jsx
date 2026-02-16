import React, { useState, useEffect, useRef } from "react";
import { Menu, Bell, Search, User, Settings, LogOut, ChevronDown, ShieldCheck, ChevronRight } from "lucide-react";

const DropdownItem = ({ icon, label, variant = "default" }) => {
    const styles = {
        danger: "text-red-500 hover:bg-red-50",
        default: "text-slate-600 hover:bg-orange-50 hover:text-orange-600",
    };

    return (
        <button className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${styles[variant]}`}>
            {icon}
            {label}
        </button>
    );
};

const Navbar = ({ isOpen = false, toggleSidebar }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const profileRef = useRef(null);
    const notifRef = useRef(null);

    const notifications = [
        { id: 1, message: "New message from Alice", time: "2 min ago", color: "bg-orange-500" },
        { id: 2, message: "System updated to v2.4", time: "10 min ago", color: "bg-green-500" },
        { id: 3, message: "New login detected in SF", time: "1 hr ago", color: "bg-red-500" },
    ];

    useEffect(() => {


        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
            if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
        };
        window.addEventListener("mousedown", handleClickOutside);
        return () => window.removeEventListener("mousedown", handleClickOutside);

    }, []);

    // useEffect(() => {
    //     const user = sessionStorage.getItem('user')
    //     console.log('from navbar ::', user)
    // }, [])

    const user=JSON.parse(sessionStorage.getItem('user'))
// console.log('from navbar ::',user)

    const sidebarMarginClass = isOpen ? "md:ml-64" : "md:ml-20";
    const handleToggleSidebar = toggleSidebar || (() => { });

    return (
        <header className="fixed top-0 w-full z-30 flex items-center justify-between h-16 px-6 bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-50/50">

            <div className={`flex items-center gap-6  transition-all duration-300 ${sidebarMarginClass}`}>
                <button
                    onClick={handleToggleSidebar}
                    className="p-2 lg:hidden md:hidden sm:hidden block hover:bg-slate-100 rounded-full transition-colors text-slate-700"
                >
                    <Menu size={20} />
                </button>

                <div className="hidden lg:flex items-center
                 gap-3 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-md  
                    focus-within:ring-2 focus-within:ring-orange-500/30 focus-within:border-orange-500 transition-all ml-4">
                    <Search size={16} className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search projects, tasks, or people..."
                        className="bg-transparent border-none outline-none
                         text-sm w-72 text-slate-700 placeholder:text-slate-400 font-medium"
                        style={{ fontFamily: "Inter, sans-serif" }} />
                </div>
            </div>

            {/* RIGHT SECTION (Notifications & Profile) */}
            <div className="flex items-center gap-3">

                {/* NOTIFICATIONS */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setNotifOpen(!notifOpen)}
                        // Updated active state color
                        className={`p-2.5 rounded-full transition-all relative ${notifOpen ? "bg-orange-50 text-orange-600" : "hover:bg-slate-100 text-slate-600"
                            }`}
                    >
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                    </button>

                    {/* Dropdown */}
                    <div className={`absolute -right-24 lg:right-0 md:right-0 sm:right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 transition-all duration-200 origin-top-right ${notifOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                        }`}>
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Notifications</h3>
                            {/* Updated notification badge color */}
                            <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">3 New</span>
                        </div>
                        <div className="max-h-80  overflow-y-auto custom-scrollbar">
                            {notifications.map((n) => (
                                <div key={n.id} className="p-3 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    {/* Updated notification line color */}
                                    <div className={`w-2 h-full shrink-0 rounded-full ${n.color}`}></div>
                                    <div className="flex-grow">
                                        {/* Updated hover text color */}
                                        <p className="text-sm font-medium text-slate-800 group-hover:text-orange-600 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>{n.message}</p>
                                        <p className="text-xs text-slate-500 mt-0.5 font-light" style={{ fontFamily: "Inter, sans-serif" }}>{n.time}</p>
                                    </div>
                                    {/* Updated icon color on hover */}
                                    <ChevronRight size={16} className="text-slate-300 group-hover:text-orange-400 transition-colors" style={{ fontFamily: "Inter, sans-serif" }} />
                                </div>
                            ))}
                        </div>
                        {/* Updated button color */}
                        <button className="w-full py-3 text-center text-sm font-medium text-orange-600 hover:bg-orange-50 transition-colors rounded-b-xl border-t border-slate-100" style={{ fontFamily: "Inter, sans-serif" }}>
                            View all updates
                        </button>
                    </div>
                </div>

                <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>

                {/* PROFILE */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-slate-100 transition-all group"
                    >
                        <div className="relative">
                            <img
                                // Updated background color for the avatar to orange
                                src="https://ui-avatars.com/api/?name=J+D&background=f97316&color=fff&bold=true"
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                            />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="hidden md:block text-left" style={{ fontFamily: "Inter, sans-serif" }}>
                            <p className="text-sm font-semibold text-slate-800 leading-none" style={{ fontFamily: "Inter, sans-serif" }}>{user.userName}</p>
                            <p className="text-[11px] text-slate-500 font-normal">{user.role}</p>
                        </div>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform hidden md:block ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown */}
                    <div className={`absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 p-2 transition-all duration-200 origin-top-right ${profileOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                        }`}>
                        <div className="px-4 py-3 border-b border-slate-100 mb-1">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Personal</p>
                        </div>
                        <DropdownItem icon={<User size={16} />} label="My Profile" />
                        <DropdownItem icon={<ShieldCheck size={16} />} label="Security" />
                        <DropdownItem icon={<Settings size={16} />} label="Settings" />
                        <div className="my-2 border-t border-slate-100"></div>
                        <DropdownItem icon={<LogOut size={16} />} label="Sign Out" variant="danger" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;