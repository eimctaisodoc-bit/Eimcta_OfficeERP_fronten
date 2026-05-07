import { Download, FileText, Send, X, Calendar, Upload, FileImage, FileInput, Inbox, AlertCircle, Trash2, Share } from "lucide-react"
import React, { useState, useMemo, useRef } from "react"

export const Memo_ = ({ open = true, setOpen }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([
        { id: 1, name: 'Q4_Financial_Report.pdf', size: '2.4 MB', date: '2026-03-06', type: 'pdf' },
        { id: 2, name: 'Project_Alpha_Brief.docx', size: '900 KB', date: '2026-03-05', type: 'word' },
    ]);

    const getFileIcon = (type) => {
        if (type === 'image') return <FileImage className="w-5 h-5" />;
        if (type === 'pdf') return <FileText className="w-5 h-5" />;
        return <FileInput className="w-5 h-5" />;
    };

    const validateFile = (file) => {
        const validTypes = [
            'application/pdf', 
            'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
            'image/jpeg', 'image/png'
        ];
        
        if (!validTypes.includes(file.type)) {
            alert("Invalid file type. Please upload a PDF, Word document, or Image.");
            return false;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert("File is too large. Maximum size is 10MB.");
            return false;
        }
        return true;
    };

    const handleFile = (file) => {
        if (file && validateFile(file)) {
            const newFile = {
                id: Date.now(),
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
                date: new Date().toISOString().split('T')[0],
                type: file.type.includes('image') ? 'image' : file.type.includes('pdf') ? 'pdf' : 'other'
            };
            setFiles(prev => [newFile, ...prev]);
        }
    };

    const groupedFiles = useMemo(() => {
        return files.reduce((acc, file) => {
            if (!acc[file.date]) acc[file.date] = [];
            acc[file.date].push(file);
            return acc;
        }, {});
    }, [files]);

    return (
        <div 
            className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${open ? "opacity-100 bg-slate-900/20 backdrop-blur-sm" : "opacity-0 pointer-events-none"}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
            style={{ fontFamily: "'Roboto Slab', serif" }}
        >
            <div className={`bg-white w-full max-w-md h-full shadow-2xl flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-orange-100">
                    <h2 className="text-xl font-bold text-slate-800">Memo Notes</h2>
                    <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500"><X size={20} /></button>
                </div>

                {/* Upload Zone */}
                <div className="p-6">
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging ? "border-orange-500 bg-orange-50" : "border-slate-200 hover:border-orange-300"}`}
                    >
                        <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
                        <Upload className="mx-auto text-orange-400 mb-2" size={24} />
                        <p className="text-sm text-slate-600 font-medium">Click or Drag to Upload</p>
                        <p className="text-[10px] text-slate-400 mt-1">PDF, Word, or Images (Max 10MB)</p>
                    </div>
                </div>

                {/* File List */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
                    {Object.entries(groupedFiles).map(([date, groupFiles]) => (
                        <div key={date} className="mb-6">
                            <h4 className="text-[10px] uppercase tracking-widest text-slate-400 mb-3">{date}</h4>
                            <div className="flex flex-col gap-3">
                                {groupFiles.map((file) => (
                                    <div key={file.id} className="bg-white  animated-border-card border border-slate-100 p-3 rounded-lg flex
                                     items-center gap-4 transition-all">
                                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-orange-500">
                                            {getFileIcon(file.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-slate-800 text-sm truncate">{file.name}</h3>
                                            <p className="text-[10px] text-slate-400">{file.size}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <button className="p-2 cursor-pointer text-slate-400 hover:text-amber-600  "><Download size={16} /></button>
                                            <button className="p-2 cursor-pointer text-slate-400 hover:text-blue-600"><Send size={16} /></button>
                                            <button className="p-2 cursor-pointer text-slate-400 hover:text-orange-600"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}