import React, { useState, useEffect, useRef } from "react";
import { Menu, Bell, Search, User, Settings, LogOut,
     ChevronDown, ShieldCheck, ChevronRight, ChevronLeft } from "lucide-react";
// import { logoutUser } from "../api/auth.api";
import logo from "../assets/eimcta.png";
import { useAuth } from "./hooks/useAuth";

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
    const { useMe: { data: { user: { decoded, token } = {} } = {}, isLoading, error } } = useAuth();
const role=sessionStorage.getItem('user')
    const notifications = [
        { id: 1, message: "New message from Alice", time: "2 min ago", color: "bg-orange-500" },
        { id: 2, message: "System updated to v2.4", time: "10 min ago", color: "bg-green-500" },
        { id: 3, message: "New login detected in SF", time: "1 hr ago", color: "bg-red-500" },
    ];

// console.log(decoded, isLoading, error, token);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
            if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
        };
        window.addEventListener("mousedown", handleClickOutside);
        return () => window.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // const user = JSON.parse(sessionStorage.getItem('user')) || { userName: "Guest", role: "Visitor" };

    const sidebarMarginClass = isOpen ? "md:ml-64" : "md:ml-20";
    const handleToggleSidebar = toggleSidebar || (() => { });

    return (
        <header className="fixed top-0 w-full z-30 flex items-center justify-between h-16 px-6 bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-50/50">

            <div className={`flex items-center gap-6 transition-all duration-300 ${sidebarMarginClass}`}>
                <button
                    onClick={handleToggleSidebar}
                    className="p-2 lg:hidden md:hidden sm:hidden block hover:bg-slate-100 rounded-full transition-colors text-slate-700"
                >
                    <Menu size={20} />
                </button>

                <button
                    onClick={handleToggleSidebar}
                    className="flex items-center justify-center p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
                >
                    {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>

                {/* ADJUSTED IMAGE SIZE HERE */}

            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-3">
                {/* NOTIFICATIONS */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setNotifOpen(!notifOpen)}
                        className={`p-2.5 rounded-full transition-all relative ${notifOpen ? "bg-orange-50 text-orange-600" : "hover:bg-slate-100 text-slate-600"}`}
                    >
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                    </button>

                    <div className={`absolute -right-24 lg:right-0 md:right-0 sm:right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 transition-all duration-200 origin-top-right ${notifOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}>
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Notifications</h3>
                            <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">3 New</span>
                        </div>
                        <div className="max-h-80 overflow-y-auto custom-scrollbar">
                            {notifications.map((n) => (
                                <div key={n.id} className="p-3 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className={`w-1 shrink-0 rounded-full ${n.color}`}></div>
                                    <div className="flex-grow">
                                        <p className="text-sm font-medium text-slate-800 group-hover:text-orange-600 transition-colors">{n.message}</p>
                                        <p className="text-xs text-slate-500 mt-0.5 font-light">{n.time}</p>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-300 group-hover:text-orange-400 transition-colors" />
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-3 text-center text-sm font-medium text-orange-600 hover:bg-orange-50 transition-colors rounded-b-xl border-t border-slate-100">
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
                                src={`https://ui-avatars.com/api/?name=${decoded?.username}&background=f97316&color=fff&bold=true`}
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                            />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-semibold text-slate-800 leading-none">{JSON.parse(role)?.userName}</p>
                            <p className="text-[11px] text-slate-500 font-normal">{JSON.parse(role)?.role}</p>
                        </div>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform hidden md:block ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <div className={`absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 p-2 transition-all duration-200 origin-top-right ${profileOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}>
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