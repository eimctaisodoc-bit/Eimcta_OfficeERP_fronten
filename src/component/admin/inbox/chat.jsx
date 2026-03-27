import React, { useState, useEffect, useRef } from 'react';
import {
    Send, Search, Phone, Video, MoreVertical,
    CheckCheck, Smile, FolderOpen, PhoneIncoming, VideoOff,
    MessageSquare,
    VideoIcon,
    MessageCircleCodeIcon,
    MessageCircleIcon,
    MessageCircleX,
    ChevronLeft,
     FileText,
  FileSpreadsheet,
  FileImage,
  FileAudio,
  FileVideo,
  File,
  FileCode,
  FileArchive,
  Download
} from 'lucide-react';

const fontStyle = { fontFamily: "Roboto, sans-serif" };

const Chat = () => {
    const [conversations, setConversations] = useState([
        {
            id: 1,
            name: 'Anthony Lewis',
            status: 'Online',
            avatar: 'AL',
            online: true,
            lastSeen: '02:40 PM',
            tag: 'is typing',
            tagClass: 'text-amber-500 bg-amber-50 border border-amber-100',
            messages: [
                { id: 1, role: 'assistant', user: { name: 'Anthony Lewis' }, content: 'Hey John, quick update on remote work policy.', timestamp: '08:00 AM' },
                { id: 2, role: 'user', user: { name: 'John Doe' }, content: 'Sure, tell me.', timestamp: '08:02 AM' }
            ]
        },
        {
            id: 2,
            name: 'Elliot Murray',
            status: 'Busy',
            avatar: 'EM',
            online: true,
            lastSeen: '08:12 AM',
            tag: 'Incoming Call',
            tagClass: 'text-blue-500 bg-blue-50 border border-blue-100',
            tagIcon: 'call',
            messages: [
                { id: 3, role: 'assistant', user: { name: 'Elliot Murray' }, content: 'Calling you now...', timestamp: '08:12 AM' }
            ]
        },
        {
            id: 3,
            name: 'Stephan Peralt',
            status: 'Offline',
            avatar: 'SP',
            online: false,
            lastSeen: 'Yesterday',
            tag: 'Missed Video Call',
            tagClass: 'text-red-500 bg-red-50 border border-red-100',
            tagIcon: 'video',
            messages: [
                { id: 4, role: 'assistant', user: { name: 'Stephan Peralt' }, content: 'We missed the meeting.', timestamp: 'Yesterday' }
            ]
        },
        {
            id: 4,
            name: 'Sophia Carter',
            status: 'Online',
            avatar: 'SC',
            online: true,
            lastSeen: 'Just now',
            tag: 'New Message',
            tagClass: 'text-green-500 bg-green-50 border border-green-100',
            tagIcon: 'message',
            messages: [
                { id: 5, role: 'assistant', user: { name: 'Sophia Carter' }, content: 'Hey! Did you check the latest design?', timestamp: '09:10 AM' }
            ]
        },
        {
            id: 5,
            name: 'Liam Johnson',
            status: 'Offline',
            avatar: 'LJ',
            online: false,
            lastSeen: '2 hrs ago',
            tag: 'Sent File',
            tagClass: 'text-purple-500 bg-purple-50 border border-purple-100',
            tagIcon: 'file',
            messages: [
                { id: 6, role: 'user', user: { name: 'John Doe' }, content: 'I sent you the documents.', timestamp: '07:30 AM' }
            ]
        },
        {
            id: 6,
            name: 'Emma Watson',
            status: 'Online',
            avatar: 'EW',
            online: true,
            lastSeen: 'Online',
            tag: 'Voice Message',
            tagClass: 'text-pink-500 bg-pink-50 border border-pink-100',
            tagIcon: 'mic',
            messages: [
                { id: 7, role: 'assistant', user: { name: 'Emma Watson' }, content: '🎤 Voice message (0:32)', timestamp: '10:05 AM' }
            ]
        },
        {
            id: 7,
            name: 'Noah Smith',
            status: 'Away',
            avatar: 'NS',
            online: false,
            lastSeen: '1 hr ago',
            tag: 'Typing...',
            tagClass: 'text-amber-500 bg-amber-50 border border-amber-100',
            tagIcon: 'typing',
            messages: [
                { id: 8, role: 'assistant', user: { name: 'Noah Smith' }, content: 'Working on your request...', timestamp: '11:00 AM' }
            ]
        },
        {
            id: 8,
            name: 'Olivia Brown',
            status: 'Online',
            avatar: 'OB',
            online: true,
            lastSeen: 'Now',
            tag: 'Image',
            tagClass: 'text-indigo-500 bg-indigo-50 border border-indigo-100',
            tagIcon: 'image',
            messages: [
                { id: 9, role: 'assistant', user: { name: 'Olivia Brown' }, content: '📷 Sent you an image', timestamp: '11:45 AM' }
            ]
        }
    ]);
    const [selectedConversationId, setSelectedConversationId] = useState(1);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    // Find the currently active conversation object
    const activeConversation = conversations.find((c) => c.id === selectedConversationId) || conversations[0];

    // Check screen size for responsive behavior
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobileView(window.innerWidth < 768); // md breakpoint
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Auto-scroll to bottom on message change or chat switch
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [selectedConversationId, activeConversation?.messages]);

    const sendFileMessage = (file) => {
        if (!file) return;

        const fileCategory = getFileCategory(file.name, file.type);

        const fileMessage = {
            id: Date.now(),
            role: 'user',
            user: { name: 'John Doe' },
            content: file.name,
            type: 'file',
            fileType: file.type,
            fileCategory,
            fileName: file.name,
            fileSize: file.size,
            fileUrl: URL.createObjectURL(file),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setConversations(prev => prev.map(conv =>
            conv.id === selectedConversationId
                ? {
                    ...conv,
                    messages: [...conv.messages, fileMessage],
                    tag: 'Sent a file',
                    tagClass: 'text-slate-500'
                }
                : conv
        ));

        // simulate quick assistant reply
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                role: 'assistant',
                user: { name: activeConversation.name },
                content: `File received: ${file.name}`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setConversations(prev => prev.map(conv =>
                conv.id === selectedConversationId
                    ? { ...conv, messages: [...conv.messages, botResponse], tag: 'is typing...', tagClass: 'text-amber-500' }
                    : conv
            ));
        }, 900);
    };

    const handleSendMessage = (content = input) => {
        if (!content.trim()) return;

        const newMessage = {
            id: Date.now(),
            role: 'user',
            user: { name: 'John Doe' },
            content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setConversations(prev => prev.map(conv =>
            conv.id === selectedConversationId
                ? { ...conv, messages: [...conv.messages, newMessage], tag: 'You: ' + content, tagClass: 'text-slate-400' }
                : conv
        ));

        setInput('');

        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                role: 'assistant',
                user: { name: activeConversation.name },
                content: `Acknowledged: "${content}"`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setConversations(prev => prev.map(conv =>
                conv.id === selectedConversationId
                    ? { ...conv, messages: [...conv.messages, botResponse], tag: 'is typing...', tagClass: 'text-amber-500' }
                    : conv
            ));
        }, 1000);
    };

    const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

    const getFileCategory = (fileName, fileType) => {
        const ext = fileName?.split('.').pop().toLowerCase() || '';
        if (['doc', 'docx'].includes(ext)) return 'word';
        if (['xls', 'xlsx', 'csv'].includes(ext)) return 'excel';
        if (['ppt', 'pptx'].includes(ext)) return 'ppt';
        if (['txt', 'md', 'rtf'].includes(ext)) return 'txt';
        if (fileType?.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
        if (fileType?.startsWith('audio/') || ['mp3', 'wav', 'm4a', 'ogg'].includes(ext)) return 'audio';
        if (fileType?.startsWith('video/') || ['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(ext)) return 'video';
        if (['js','ts','py','java','c','cpp','cs','html','css','json','yaml','yml','sql'].includes(ext)) return 'code';
        if (['zip','rar','7z','tar','gz'].includes(ext)) return 'zip';
        return 'default';
    };

    const iconMap = {
        call: <Phone size={14} />,
        video: <VideoIcon size={16} />,
        typing: <MessageSquare size={14} />,
        message: <MessageSquare size={14} />
    };

    const inputRef = useRef(null);
    const handleClick = () => {
        inputRef.current.click();
    };

    // 📥 File selected (click)
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length > 0) {
            selectedFiles.forEach(file => sendFileMessage(file));
        }
        e.target.value = null;
    };

    // 🟠 Drag events
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        // Only remove dragging state when leaving the container, not when moving within.
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        const files = Array.from(e.dataTransfer.files || []);
        if (files.length > 0) {
            files.forEach(file => sendFileMessage(file));
        }
    };
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => setHeight(window.innerHeight);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Function to handle back button click
    const handleBackToList = () => {
        setSelectedConversationId(null);
    };



 const files = {
  word: {
    icon: <FileText size={16} className="text-blue-500" />,
    className: "bg-blue-50 text-blue-500 rounded-2xl"
  },

  excel: {
    icon: <FileSpreadsheet size={16} className="text-green-500" />,
    className: "bg-green-50 text-green-500 rounded-2xl"
  },

  ppt: {
    icon: <FileText size={16} className="text-orange-500" />,
    className: "bg-orange-50 text-orange-500 rounded-2xl"
  },

  txt: {
    icon: <FileText size={16} className="text-slate-500" />,
    className: "bg-slate-50 text-slate-500 rounded-2xl"
  },

  image: {
    icon: <FileImage size={16} className="text-pink-500" />,
    className: "bg-pink-50 text-pink-500 rounded-2xl"
  },

  audio: {
    icon: <FileAudio size={16} className="text-purple-500" />,
    className: "bg-purple-50 text-purple-500 rounded-2xl"
  },

  video: {
    icon: <FileVideo size={16} className="text-red-500" />,
    className: "bg-red-50 text-red-500 rounded-2xl"
  },

  code: {
    icon: <FileCode size={16} className="text-indigo-500" />,
    className: "bg-indigo-50 text-indigo-500 rounded-2xl"
  },

  zip: {
    icon: <FileArchive size={16} className="text-yellow-500" />,
    className: "bg-yellow-50 text-yellow-500 rounded-2xl"
  },

  default: {
    icon: <File size={16} className="text-gray-500" />,
    className: "bg-gray-50 text-gray-500 rounded-2xl"
  }
};
    return (
        <div className="flex justify-center overflow-hidden rounded-2xl border border-slate-200">
            <div className="flex w-full max-w-[1390px] p-4 h-[88vh] bg-white" style={fontStyle}>
                {/* Sidebar - Conversation List */}
                <aside
                    className={`
                        ${selectedConversationId ? "hidden" : "flex"}
                        w-full
                        flex-col
                        bg-white
                        border-r border-slate-200
                        min-h-0
                        transition-all duration-300
                    `}
                >
                    <div className="shrink-0 p-4 sm:p-5 md:p-6 border-b border-slate-100">
                        <h1 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6">Messages</h1>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search chats..."
                                className="
                                    w-full rounded-xl border-2 border-slate-200
                                    bg-slate-50 text-slate-500
                                    py-2.5 sm:py-3 pl-4 pr-10
                                    text-sm
                                    transition-colors
                                    focus:border-amber-500 focus:outline-none
                                "
                            />
                            <Search
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={18}
                            />
                        </div>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-2 sm:px-3 py-2 space-y-1">
                        {conversations.map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => setSelectedConversationId(conv.id)}
                                className={`
                                    flex items-center gap-3 md:gap-4
                                    p-3
                                    rounded-xl cursor-pointer
                                    transition-all duration-200
                                    ${conv.id === selectedConversationId
                                        ? "bg-amber-50 border-l-4 border-amber-500"
                                        : "hover:bg-slate-50"
                                    }
                                `}
                            >
                                <div className="relative shrink-0">
                                    <div
                                        className={`
                                            w-11 h-11 md:w-12 md:h-12
                                            rounded-full flex items-center justify-center font-bold
                                            ${conv.online
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-slate-200 text-slate-500"
                                            }
                                        `}
                                    >
                                        {conv.avatar}
                                    </div>

                                    {conv.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="font-bold truncate text-sm sm:text-[15px] md:text-base">
                                            {conv.name}
                                        </h3>
                                        <span className="shrink-0 text-[10px] sm:text-xs text-slate-400">
                                            {conv.lastSeen}
                                        </span>
                                    </div>

                                    <div
                                        className={`flex items-center gap-1.5 w-fit max-w-full px-2 py-0.5 rounded-2xl truncate mt-1 ${conv.tagClass}`}
                                    >
                                        {conv.tagIcon && iconMap[conv.tagIcon] && (
                                            <span className="shrink-0 scale-75">{iconMap[conv.tagIcon]}</span>
                                        )}
                                        <p className="text-[10px] md:text-xs truncate font-medium">{conv.tag}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Chat Area */}
                <main
                    className={`
                        ${!selectedConversationId ? "hidden" : "flex"}
                        flex-1 flex-col
                        bg 
                        min-w-0 min-h-0
                        w-full
                        transition-all duration-300
                    `}
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='a' patternUnits='userSpaceOnUse' width='69.282' height='40' patternTransform='scale(2)'%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Cpath d='M34.641-20v80m34.64-40L0-20m69.282 80L0 20m69.282 0L0 60m69.282-80L0 20m69.282-40v80' stroke-width='1.2' stroke='%23fa61001A' fill='none'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800%25' height='800%25' fill='url(%23a)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "auto",
                    }}
                >
                    {/* Header */}
                    <header
                        className="
                            shrink-0
                            h-16 sm:h-[72px] md:h-20
                            border-b border-slate-100
                            flex items-center justify-between
                            px-3 sm:px-4 md:px-8
                            bg-white
                        "
                    >
                        <div className="flex items-center gap-3 md:gap-4 min-w-0">
                            {/* Back button - visible on all screens when a chat is selected */}
                            <button
                                onClick={handleBackToList}
                                className="
                                    p-2 -ml-1
                                    rounded-lg
                                    text-slate-500
                                    hover:bg-slate-100
                                    shrink-0
                                    transition-all duration-200
                                    hover:text-amber-500
                                "
                                title="Back to conversations"
                            >
                                <ChevronLeft size={22} />
                            </button>

                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center text-white text-[10px] md:text-xs font-bold shrink-0">
                                {activeConversation.avatar}
                            </div>

                            <div className="min-w-0">
                                <h2 className="font-bold text-slate-900 text-sm sm:text-[15px] md:text-base truncate">
                                    {activeConversation.name}
                                </h2>

                                <p className="text-[10px] md:text-xs text-green-500 font-medium truncate">
                                    {activeConversation.status}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 md:gap-2 shrink-0">
                            <button className="p-2 bg-blue-50 hover:bg-blue-100 cursor-pointer   rounded-lg transition-all duration-200">
                                <Phone size={18} className='text-blue-500' />
                            </button>
                            <button className="p-2 bg-red-50 hover:bg-red-100  cursor-pointer  rounded-lg transition-all duration-200 ">
                                <Video size={18} className='text-red-500' />
                            </button>
                        </div>
                    </header>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`
                            flex-1 min-h-0
                            overflow-y-auto
                            custom-scrollbar
                            bg-slate-50/50
                            px-3 py-4
                            sm:px-4 sm:py-5
                            md:px-8 md:py-6
                            space-y-4 md:space-y-6
                            ${dragging ? 'ring-2 ring-amber-300 ring-offset-2 ring-offset-white' : ''}
                        `}
                    >
                        {activeConversation.messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`
                                        ${msg.role === "user" ? "order-2" : ""}
                                        max-w-[90%] sm:max-w-[82%] md:max-w-[70%]
                                    `}
                                >
                                    <div
                                        className={`
                                            p-3 sm:p-3.5 md:p-4
                                            rounded-2xl text-sm shadow-sm break-words
                                            ${msg.role === "user"
                                                ? "bg-amber-500 text-white rounded-tr-none"
                                                : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                                            }
                                        `}
                                    >
                                        {msg.type === "file" ? (
                                            <div className="flex items-start gap-3">
                                                {(() => {
                                                    const fileMeta = files[msg.fileCategory] || files.default;
                                                    return (
                                                        <div className={`p-2 rounded-lg shrink-0 ${fileMeta.className}`}>
                                                            {fileMeta.icon}
                                                        </div>
                                                    );
                                                })()}

                                                <div className="text-left overflow-hidden min-w-0">
                                                    <p className="font-semibold truncate">{msg.fileName}</p>
                                                    <p className="text-[10px] opacity-80">
                                                        {(msg.fileSize / 1024).toFixed(1)}KB
                                                    </p>

                                                    <a
                                                        className="text-[10px] underline mt-1 inline-block break-all"
                                                        href={msg.fileUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        Download
                                                    </a>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="leading-relaxed whitespace-pre-wrap break-words">
                                                {msg.content}
                                            </p>
                                        )}
                                    </div>

                                    <div
                                        className={`
                                            flex items-center gap-2 mt-1
                                            text-[10px] text-slate-400
                                            ${msg.role === "user" ? "justify-end" : ""}
                                        `}
                                    >
                                        <span>{msg.timestamp}</span>
                                        {msg.role === "user" && (
                                            <CheckCheck size={12} className="text-blue-500" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="shrink-0 border-t border-slate-100 bg-white p-3 sm:p-4 md:p-6">
                        <div className="flex items-end gap-2 md:gap-3 max-w-4xl mx-auto">
                            <button
                                className={`
                                    shrink-0
                                    p-2.5 md:p-3
                                    rounded-xl cursor-pointer border
                                    text-orange-500 transition-all
                                    ${dragging
                                        ? "bg-orange-200 border-orange-500"
                                        : "bg-orange-50 border-orange-300"
                                    }
                                    hover:bg-orange-100
                                `}
                                onClick={handleClick}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <FolderOpen size={20} />
                            </button>

                            <input
                                type="file"
                                ref={inputRef}
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                placeholder="Type a message..."
                                className="
                                    flex-1 min-w-0
                                    bg-slate-50 text-slate-900
                                    rounded-xl border border-slate-200
                                    focus:border-orange-500 focus:outline-none
                                    px-4 py-2.5 md:py-3
                                    text-sm
                                "
                            />

                            <button
                                onClick={handleSendMessage}
                                className="
                                    shrink-0
                                    p-2.5 md:p-3
                                    bg-amber-500 text-white rounded-xl
                                    hover:bg-amber-600
                                    shadow-lg shadow-amber-200
                                    transition-transform active:scale-95
                                "
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Chat;