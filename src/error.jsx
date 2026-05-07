import React from 'react';
import { RefreshCcw } from 'lucide-react';
import errorImage from './assets/404.gif';

export const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">

      {/* subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"/>

      {/* content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md">

        {/* image */}
        <img
          src={errorImage}
          alt="404"
          className="w-[26rem] max-w-full mb-6"
        />

        {/* heading */}
        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight mb-2">
          Network Error
        </h1>

        {/* description */}
        <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
          Unable to connect to the server. Please check your internet connection
          and try again.
        </p>

        {/* button */}
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold 
          bg-amber-500 hover:bg-amber-600 text-white rounded-lg 
          transition-all active:scale-95"
        >
          <RefreshCcw size={14} />
          Retry Connection
        </button>

      </div>
    </div>
  );
};