import React from "react";
export const VideoPlayer = ({ title, description, uploadDate, videoUrl }) => {
  return (
    <div className="w-full max-w-md bg-white h-96 shadow rounded-2xl flex flex-col overflow-hidden">
      
      {/* Video Container (fixed) */}
      <div className="aspect-video w-full bg-black flex-shrink-0">
        <video 
          controls 
          className="w-full h-full object-cover"
          src={videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Scrollable Content */}
      <div className="p-4 overflow-y-auto flex-1">
        <h1 className="text-lg font-bold text-gray-900 mb-2">
          {title}
        </h1>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="mx-2">•</span>
          <span>{uploadDate}</span>
        </div>

        <p className="text-gray-700 leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};