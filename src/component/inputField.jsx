import React from 'react';

const InputField = ({ label, type = 'text', name, value, onChange, placeholder }) => {
    return (
        <div className="mb-4 ">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-gray-700  text-md  mb-1 [font-family:'Arial_Narrow',sans-serif]"
                >
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700
                   focus:outline-none focus:ring-1 focus:ring-amber-300 focus:border-amber-300
                   transition duration-200"
                required />
        </div>
    );
};

export default InputField;
