import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Drawer } from './drawer';

export const I_Icon = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  if (path === '/') return null;

  return (
    <>
      <div className="fixed z-50 top-[50%] right-0 flex items-center justify-center">
        <div className="relative group">
          
       
          <button
            className={`
              cursor-pointer
              relative flex items-center justify-center
              w-12 h-12 rounded-l-xl  text-white
              transition-all duration-300 ease-out
            
              bg-gradient-to-br from-amber-400 to-amber-600
              
              
            `}
            onClick={() => setIsDrawerOpen(true)}
          >
            
        
         
            <Info 
              size={28} 
              strokeWidth={2.2}
              className="relative z-10 
              drop-shadow-md transition-transform duration-300 group-hover:rotate-6"
            />
          </button>

       
        </div>

       
      </div>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  );
};