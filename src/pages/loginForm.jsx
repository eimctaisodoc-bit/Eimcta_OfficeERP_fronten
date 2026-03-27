import React, { useState } from 'react';
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/hooks/useAuth.js";
import { socket } from "../socket_client/scoket.js";
import InputField from "../component/inputField";
import { ErrorNotify } from "../component/hotToaster.jsx";

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "admin",
    });

    const roleOptions = [
        { value: "super_admin", label: "Super Admin" },
        { value: "admin", label: "Admin" },
        { value: "staff", label: "Staff" },
        { value: "client", label: "Client" }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login.mutate(formData, {
            onSuccess: (user) => {
                const token = user?.user?.token;
                if (token) {
                    sessionStorage.setItem('isToken', 'true');
                    sessionStorage.setItem('Token', token);
                }

                const userData = {
                    id: user.user.id,
                    userName: user.user.username,
                    role: user.user.role
                };
                sessionStorage.setItem("user", JSON.stringify(userData));
                
                socket.auth = { token };
                if (!socket.connected) socket.connect();

                const routes = {
                    admin: "/admin",
                    super_admin: "/super_admin",
                    client: "/client",
                    staff: "/staff"
                };

                const targetRoute = routes[user.user.role];
                targetRoute ? navigate(targetRoute) : ErrorNotify("Access denied");
            },
            onError: (error) => {
                ErrorNotify(error.response?.data?.message || "Login failed");
            }
        });
    };

    // Standardized Styles for React-Select to match Tailwind Inputs
    const customSelectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: "42px",
            border: state.isFocused ? "1px solid #F59E0B" : "1px solid #d1d5db",
            borderRadius: "0.375rem",
            boxShadow: "none",
            "&:hover": { borderColor: "#F59E0B" },
            fontFamily: "Arial Narrow, sans-serif",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? "#d97706" : state.isFocused ? "#fef3c7" : "white",
            color: state.isSelected ? "white" : "#374151",
            fontFamily: "Arial Narrow, sans-serif",
        }),
    };

    const labelStyle = "block text-gray-700 font-bold mb-1 font-['Roboto_Slab']";

    return (
        <div className="flex items-center justify-center min-h-screen bg-white px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="font-bold mb-8 text-center text-amber-600 text-3xl underline decoration-amber-200 underline-offset-8 font-['Roboto_Slab']">
                    LOGIN
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Username */}
                    <div>
                        <label className={labelStyle}>Username:</label>
                        <InputField
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="w-full border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className={labelStyle}>Password:</label>
                        <div className="relative">
                            <InputField
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-amber-600 transition-colors"
                            >
                                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                            </button>
                        </div>
                    </div>

                    {/* Role */}
                    <div>
                        <label className={labelStyle}>Role:</label>
                        <Select
                            options={roleOptions}
                            value={roleOptions.find(opt => opt.value === formData.role)}
                            styles={customSelectStyles}
                            onChange={(opt) => setFormData(p => ({ ...p, role: opt.value }))}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={login.isPending}
                        className="w-full mt-4 bg-amber-600 text-white font-bold py-2.5 px-4 rounded-md hover:bg-amber-700 active:transform active:scale-[0.98] transition-all shadow-md font-['Roboto_Slab'] disabled:bg-gray-400"
                    >
                        {login.isPending ? "SIGNING IN..." : "SUBMIT"}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Sub-components for cleaner JSX
const EyeOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeClosedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a9.958 9.958 0 012.422-3.512M6.636 6.636A9.958 9.958 0 0112 5c4.478 0 8.269 2.943 9.543 7a9.958 9.958 0 01-1.268 2.634M3 3l18 18" />
    </svg>
);

export default LoginForm;