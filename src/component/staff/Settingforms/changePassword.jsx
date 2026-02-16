import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle, XCircle, Lock ,Key, Edit2} from 'lucide-react';

export const ChangePassword = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'newPassword') {
            setPasswordRequirements({
                length: value.length >= 8,
                lowercase: /[a-z]/.test(value),
                uppercase: /[A-Z]/.test(value),
                number: /[0-9]/.test(value),
                special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        // Handle password change logic here
        console.log('Password change submitted', formData);
    };

    const requirements = [
        { key: 'length', label: 'At least 8 characters' },
        { key: 'lowercase', label: 'At least 1 lowercase letter (a-z)' },
        { key: 'uppercase', label: 'At least 1 uppercase letter (A-Z)' },
        { key: 'number', label: 'At least 1 number (0-9)' },
        { key: 'special', label: 'At least 1 special character' }
    ];

    const getRequirementStatus = (key) => {
        return passwordRequirements[key];
    };

    return (
        <div className="min-h-screen bg-white  ">
            <div className="p-5 mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-amber-100 rounded-full">
                            <Lock className="w-8 h-8 text-amber-600" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
                    <p className="text-gray-600 mt-2">Update your account password</p>
                </div>
                <div className='grid bg lg:grid-cols-2 md:gird-cols-2 grid-cols-1 gap-2' >

                 
                    <div className="w-auto bg-white rounded-lg shadow p-6 border border-gray-200">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Old Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Old Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showOldPassword ? "text" : "password"}
                                        name="oldPassword"
                                        value={formData.oldPassword}
                                        onChange={handleChange}
                                        placeholder="Enter Old Password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        placeholder="Enter New Password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm New Password"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition ${formData.confirmPassword && formData.newPassword !== formData.confirmPassword
                                                ? 'border-red-300'
                                                : 'border-gray-300 focus:border-amber-500'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                                    <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={Object.values(passwordRequirements).some(req => !req) ||
                                    formData.newPassword !== formData.confirmPassword}
                                className="w-full bg-gradient-to-r from-amber-500 
                                to-amber-700 text-white font-semibold py-3
                                 px-4 rounded-lg hover:from-amber-600
                                  hover:to-amber-800 focus:outline-none focus:ring-2
                                   focus:ring-amber-500 focus:ring-offset-2 
                                   disabled:opacity-50 disabled:cursor-not-allowed
                                    transition-all duration-200"
                            >  
                             <span>
                                
                                   Change Password
                                </span>
                            </button>
                        </form>
                    </div>

                     <div className="bg-white w-auto  p-6 mb-6 ">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            New Password Requirements:
                        </h2>
                        <ul className="space-y-2">
                            {requirements.map(req => (
                                <li key={req.key} className="flex items-center">
                                    {getRequirementStatus(req.key) ? (
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-gray-300 mr-2" />
                                    )}
                                    <span className={`text-sm ${getRequirementStatus(req.key) ? 'text-gray-700' : 'text-gray-600'}`}>
                                        {req.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                {/* Info Text */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Make sure to save your new password in a secure location.
                    </p>
                </div>
            </div>
        </div>
    );
};