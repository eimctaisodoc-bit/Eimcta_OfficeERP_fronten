import React, { useRef, useState } from "react";
import {
  Upload,
  File,
  X,
  CheckCircle2,
  UploadCloud,
} from "lucide-react";

export const S_FileUpload_ = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
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

  const reset = (e) => {
    e.stopPropagation(); // Prevent triggering the label click
    setFile(null);
    setProgress(0);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
   
    <div className="w-full md:w-[280px] mx-auto bg-white border border-slate-200 rounded overflow-hidden font-sans ">
      
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-100">
        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0">
          <UploadCloud size={20} strokeWidth={2.2} />
        </div>

        <div className="min-w-0">
          <h3 className="text-slate-900 font-bold text-base leading-tight" style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}>
            Upload File
          </h3>
          <p className="text-slate-500 text-xs mt-0.5">
            Max size: 10MB
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        {!file ? (
          /* Dropzone */
          <label className="group relative flex flex-col items-center justify-center w-full min-h-[180px] border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50 hover:bg-orange-50 hover:border-orange-300 active:bg-orange-100 transition-all duration-200 px-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-3 p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-200">
                <Upload className="w-6 h-6 text-slate-400 group-hover:text-orange-500" />
              </div>
              <p className="text-sm text-slate-700 group-hover:text-orange-600" style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}>
                <span className="font-bold underline decoration-orange-300">Click to upload</span>
                <span className="hidden sm:inline"> or drag</span>
              </p>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mt-2">
                PDF, PNG, JPG
              </p>
            </div>

            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* File Info Card */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                <File size={18} className="text-orange-600" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate" style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}>
                  {file.name}
                </p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button
                onClick={reset}
                className="p-1.5 text-slate-400 hover:text-red-500 active:bg-red-50 rounded-full transition-colors shrink-0"
                aria-label="Remove file"
              >
                <X size={18} />
              </button>
            </div>

            {/* Progress Bar Section */}
            <div className="w-full px-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-orange-600 flex items-center gap-1.5" style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}>
                  {progress < 100 ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={12} className="text-green-500" />
                      Ready to finish
                    </>
                  )}
                </span>
                <span className="text-[11px] font-bold text-slate-600">
                  {progress}%
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          disabled={uploading || !file}
          className={`mt-5 w-full py-3 px-4 rounded-xl text-sm font-bold text-white transition-all duration-200
          ${
            !file || uploading
              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-slate-900 hover:bg-black active:scale-[0.98] shadow-md shadow-slate-200"
          }`}
          style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 600 }}
        >
          {progress === 100 ? (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle2 size={16} /> Finish
            </span>
          ) : (
            "Complete Upload"
          )}
        </button>
      </div>
    </div>
  );
};