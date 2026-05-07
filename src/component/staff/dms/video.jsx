import React from "react";

export const VideoPlayer = ({
  title = "Video Title",
  description = "This is a responsive video player card with scrollable content for long descriptions.",
  uploadDate = "April 1, 2026",
  videoUrl = "",
}) => {
  return (
    <div
      className="
        w-full
        max-w-full sm:max-w-xl lg:max-w-2xl xl:max-w-3xl
        mx-auto
        bg-white
      shadow
      rounded 
        overflow-hidden
        flex flex-col
        min-h-[320px]
        h-auto
      "
    >
      {/* Video Section */}
      <div
        className="
          w-full
          bg-black
          aspect-video
          flex-shrink-0
        "
      >
        <video
          controls
          className="w-full h-full object-cover"
          src={videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Section */}
      <div
        className="
          flex-1
          p-3 sm:p-4 md:p-5 lg:p-6
          overflow-y-auto
        "
      >
        <h1
          className="
            text-base sm:text-lg md:text-xl lg:text-2xl
            font-bold
            text-gray-900
            leading-snug
            mb-2
          "
        >
          {title}
        </h1>

        <div
          className="
            flex flex-wrap items-center gap-x-2 gap-y-1
            text-xs sm:text-sm md:text-base
            text-gray-500
            mb-3
          "
        >
          <span className="hidden sm:inline">Uploaded</span>
          <span className="hidden sm:inline">•</span>
          <span>{uploadDate}</span>
        </div>

        <p
          className="
            text-sm sm:text-base
            text-gray-700
            leading-6 sm:leading-7
            break-words
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
};