import React, { useEffect } from 'react';
import { X, Settings, User, Bell, HelpCircle } from 'lucide-react';

export const Drawer = ({ isOpen, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const menuItems = [
        { icon: <User size={18} />, label: 'Profile Overview', description: 'Manage your account details.' },
        { icon: <Bell size={18} />, label: 'Notifications', description: 'Get alerts and updates in one place.' },
        { icon: <Settings size={18} />, label: 'Settings', description: 'Customize your preferences.' },
        { icon: <HelpCircle size={18} />, label: 'Help & Support', description: 'Access docs and contact support.' },
    ];

    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <div className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm" onClick={onClose} />

            <aside className={`absolute top-0 right-0 h-full w-full max-w-md bg-slate-950 text-slate-100 shadow-2xl border-l border-slate-800 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-start justify-between p-5 border-b border-slate-800">
                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-indigo-300">Quick Info</p>
                        <h2 className="mt-1 text-2xl font-semibold text-slate-100">Instant support panel</h2>
                        <p className="mt-1 text-sm text-slate-300">Get the latest guidance, links and shortcuts.</p>
                    </div>
                    <button onClick={onClose} className="rounded-full p-2 text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    <div className="rounded-2xl bg-gradient-to-r from-indigo-700/20 via-violet-700/15 to-sky-700/10 border border-slate-700 p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-indigo-200">Start</p>
                        <p className="mt-1 text-sm text-slate-200">Use the dashboard to navigate quickly and track activity at a glance.</p>
                    </div>

                    <div className="space-y-3">
                        {menuItems.map((item) => (
                            <div key={item.label} className="group flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-900/50 p-3 transition hover:border-indigo-400/40 hover:bg-slate-800">
                                <div className="rounded-full bg-indigo-500/15 p-2 text-indigo-300">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-100">{item.label}</p>
                                    <p className="text-xs text-slate-300">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto border-t border-slate-800 p-5">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-900 p-3 border border-slate-700">
                        <div className="rounded-full bg-indigo-500/20 p-2 text-indigo-300">
                            <Settings size={16} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-100">Need more help?</p>
                            <p className="text-xs text-slate-300">Check docs or contact support through your account.</p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
};
