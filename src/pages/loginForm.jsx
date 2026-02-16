
import { useMutation } from "@tanstack/react-query";
import React, { useState } from 'react';
import InputField from "../component/inputField";
import { SuccessNotify, ErrorNotify } from "../component/hotToaster.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/hooks/useAuth.js";
import { socket } from "../socket_client/scoket.js";


const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "admin",
    });
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
                console.log(Boolean(user.user.token))
                user?.user.
                    token ? sessionStorage.setItem('isToken', Boolean(user.user.token)) : null;
                const User = {
                    id: user.user.id,
                    userName: user.user.username,
                    role: user.user.role
                }
                sessionStorage.setItem("user", JSON.stringify(User));
                socket.auth = {
                    token: user.user.token
                }
                if (!socket.connected) socket.connect();
                user.user.role === "admin" ? navigate("/admin")
                    : user.user.role === "client" ? navigate("/client")
                        : user.user.role === "staff" ? navigate("/staff")
                            : ErrorNotify("Access denied")

            },
            onError: (Error) => {
                // console.log('errr from login ',Error.response.data.message)
                ErrorNotify(Error.response.data.message)
            }
        })
    };

    return (
        <div className="flex relative z-50 items-center justify-center min-h-screen md:w-full lg:full  sm:w-full   w-11/12 mx-auto">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="font-bold mb-6 text-center text-amber-500 text-3xl underline  [font-family:'Arial_Narrow',sans-serif]">LogIn</h2>
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <InputField
                        label="Username:"
                        type="text"
                        name="username"
                        value={formData?.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                    />

                    {/* Password with toggle */}
                    <div className="mb-4 relative">
                        <InputField
                            label="Password:"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute inset-y-0 right-0 px-3 mt-6 flex items-center  ${showPassword ? "text-amber-500" : "text-gray-500"} `}
                        >
                            {showPassword ? (
                                // Eye open icon
                                <svg
                                    xmlns="http: www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            ) : (
                                // Eye closed icon
                                <svg
                                    xmlns="http: www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a9.958 9.958 0 012.422-3.512M6.636 6.636A9.958 9.958 0 0112 5c4.478 0 8.269 2.943 9.543 7a9.958 9.958 0 01-1.268 2.634M3 3l18 18"
                                    />

                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Role dropdown */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-md  mb-1 [font-family:'Arial_Narrow',sans-serif]">
                            Role:
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-1 focus:ring-amber-300 focus:border-amber-300
                           hover:border-amber-400 text-md hover:ring-amber-400 transition duration-200 [font-family:'Arial_Narrow',sans-serif]"
                        >
                            <option value="admin" className="hover:bg-amber-500">Admin</option>
                            <option value="staff">Staff</option>
                            <option value="client">Client</option>
                        </select>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-amber-600 text-white py-2 px-4 text-md rounded-md hover:bg-amber-500 transition [font-family:'Arial_Narrow',sans-serif]"
                    // disabled={mutation.isPending} 
                    >
                        Submit
                        {/* {mutation.isPending ? "Logging in..." : "Submit"} */}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
