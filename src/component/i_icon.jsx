import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Drawer } from './drawer';

export const I_Icon = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Path check for visibility
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  if (path === '/') return null;

  return (
    <>
    <div className="fixed z-50 bottom-4 cursor-pointer right-10 flex items-center justify-center">
      {/* Container without animation */}
      <div className="relative">
        
        {/* Animated button only */}
        <button
          className={`
            cursor-pointer
            relative flex items-center justify-center
            w-14 h-14 rounded-full text-white
            transition-all duration-200 ease-out
            
            /* Modern gradient background */
            bg-gradient-to-br from-amber-400 to-amber-600
            
            /* Soft shadow for depth */
            shadow-lg shadow-amber-500/30
            
            /* Subtle inner glow */
            ring-1 ring-white/20 ring-inset

            /* Hover state - gentle scale */
            hover:shadow-xl hover:shadow-amber-500/40
            hover:scale-110
            
            /* Interaction - smooth press */
            active:scale-95
            active:shadow-md
            
            /* Focus state */
            focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50
            
            /* Scale animation - only on the button itself */
            animate-float-scale
          `}
          onClick={() => setIsDrawerOpen(true)}>
          
          {/* Animated pulse ring - scales with button */}
          <span className="absolute
           inset-0 rounded-full bg-amber-400/20 animate-ping-slow" />
          
          {/* Internal glow overlay */}
          <div className="absolute inset-0 
          rounded-full bg-gradient-to-t 
          from-white/0 via-white/10 to-white/20 pointer-events-none" />
          
          {/* Icon with subtle animation */}
          <Info 
            size={28} 
            strokeWidth={2.2}
            className="relative z-10 drop-shadow-md transition-transform duration-300 group-hover:rotate-12"
          />
        </button>

        {/* Decorative elements - positioned absolutely relative to button */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-amber-300 rounded-full animate-pulse-scale" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-400/60 rounded-full animate-pulse-scale delay-300" />
        
        {/* Soft glow effect - behind button */}
        <div className="absolute inset-0 -z-10 bg-amber-400/20 rounded-full blur-xl animate-glow-scale" />
      </div>

      <style>{`
        /* Scale-based floating animation - only for the button */
        @keyframes float-scale {
          0%, 100% { 
            transform: scale(1); 
          }
          50% { 
            transform: scale(1.08); 
          }
        }
        
        /* Slow pulse animation */
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        /* Scale pulse for decorative elements */
        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }
        
        /* Glow animation */
        @keyframes glow-scale {
          0%, 100% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }
        
        /* Apply animation only to the button */
        .animate-float-scale {
          animation: float-scale 4s ease-in-out infinite;
          transform-origin: center;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
          will-change: transform;
        }
        
        /* Pulse animations for decorative elements */
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-pulse-scale {
          animation: pulse-scale 3s ease-in-out infinite;
        }
        
        .animate-glow-scale {
          animation: glow-scale 4s ease-in-out infinite;
        }
        
        /* Pause all animations on hover */
        .relative:hover .animate-float-scale,
        .relative:hover .animate-ping-slow,
        .relative:hover .animate-pulse-scale,
        .relative:hover .animate-glow-scale {
          animation-play-state: paused;
        }
        
        /* Smooth transitions for interactions */
        button {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Delay utility */
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
    <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
      </>
  );
};