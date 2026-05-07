import React, { useState } from "react";
import { Upload, File, X, CheckCircle2, FilesIcon, UploadCloud } from "lucide-react";

export const S_FileUpload_ = () => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);

    // Simulated Upload Logic
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            startUpload();
        }
    };

    const startUpload = () => {
        setUploading(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    const reset = () => {
        setFile(null);
        setProgress(0);
        setUploading(false);
    };

    return (
        <div className="flex flex-col w-[240px] bg-white  border border-slate-200 rounded-md overflow-hidden  font-sans">
            <h3 className="flex items-center gap-4 py-3 px-4 group 
           transition-all duration-200  rounded-xl">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-100 transition-colors">
                    <UploadCloud size={22} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                    <span className="text-slate-900 font-semibold text-sm leading-none">
                        Upload File
                    </span>
                    <span className="text-slate-500 text-[11px] mt-1">
                        Max size: 10MB
                    </span>
                </div>
            </h3>
            <div className="p-3">

                {!file ? (
                    /* Upload Trigger Area */
                    <label className="group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer bg-slate-50 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-6 h-6 mb-2 text-slate-400 group-hover:text-orange-500 transition-colors" />
                            <p className="text-[10px] text-slate-500 group-hover:text-orange-600">
                                <span className="font-semibold">Click</span> or drag
                            </p>
                            <p className="text-[8px] text-slate-400 mt-1">Max 10MB</p>
                        </div>
                        <input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                ) : (
                    /* File & Progress Area */
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded-md">
                            <File size={16} className="text-orange-500 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-medium text-slate-700 truncate">
                                    {file.name}
                                </p>
                                <p className="text-[8px] text-slate-400">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                            <button onClick={reset} className="text-slate-400 hover:text-red-500">
                                <X size={14} />
                            </button>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full">
                            <div className="flex justify-between mb-1">
                                <span className="text-[9px] font-medium text-orange-600">
                                    {progress < 100 ? "Uploading..." : "Complete"}
                                </span>
                                <span className="text-[9px] text-slate-500">{progress}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5">
                                <div
                                    className="bg-orange-500 h-1.5 rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(249,115,22,0.3)]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <button
                    disabled={uploading || !file}
                    className={`mt-4 w-full py-2 px-4 rounded-md text-[11px] font-bold text-white transition-all duration-200 
            ${!file || uploading
                            ? "bg-slate-300 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600 active:scale-[0.97] active:bg-orange-700 shadow-md shadow-orange-200"
                        }`}
                >
                    {progress === 100 ? (
                        <span className="flex items-center justify-center gap-1">
                            <CheckCircle2 size={12} /> Done
                        </span>
                    ) : (
                        "Finish Upload"
                    )}
                </button>
            </div>
        </div>
    );
};