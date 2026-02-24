import React, { useState, useEffect } from 'react';
import { X, Menu, Settings, User, Bell, HelpCircle, LogOut } from 'lucide-react';

// The Drawer Component
export const Drawer = ({ isOpen, onClose }) => {
    // Prevent scrolling when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const menuItems = [
        { icon: <User size={20} />, label: 'Profile' },
        { icon: <Bell size={20} />, label: 'Notifications' },
        { icon: <Settings size={20} />, label: 'Settings' },
        { icon: <HelpCircle size={20} />, label: 'Help & Support' },
    ];

    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 400 }}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <aside
                className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="p-6  border-gray-200 flex items-center justify-between">
                    <h2 className="text-xl text-gray-800">
                        Information
                    </h2>
                </div>
                    <hr className="border-gray-200" />

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 text-gray-700 text-sm leading-relaxed">

                   


                   

                  
                    

                </div>

                {/* Footer */}
               
            </aside>
        </div>
    );
};
