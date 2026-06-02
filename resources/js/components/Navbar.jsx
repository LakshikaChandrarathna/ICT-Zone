import React from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  return (
    
    <nav className="flex items-center justify-between px-6 md:px-16 py-3.5 bg-[#0a0f1d] border-b border-[#5d81bd]/10 sticky top-0 z-50 w-full">

      
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2.5 group">
        
          <div className="w-8 h-8 bg-[#5d81bd] rounded flex items-center justify-center transition-transform duration-300 group-hover:bg-[#b5cbf0]">
            <span className="text-[#010813] font-mono font-black text-base">IZ</span>
          </div>
          
          <span className="text-base font-black tracking-tight text-white font-mono uppercase">
            ICTZone
          </span>
        </Link>
      </div>

      {/* --- MIDDLE NAVIGATION LINKS --- */}
      
      <div className="hidden lg:flex items-center space-x-8 font-mono text-[11px] uppercase tracking-widest text-[#b5cbf0]/80">
        <Link to="/" className="relative py-1 hover:text-white transition-colors group">
          Home
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#5d81bd] transition-all duration-300 group-hover:w-full" />
        </Link>
        <span className="text-[#5d81bd]/30 text-[9px]">•</span>
        
        <Link to="/papers" className="relative py-1 hover:text-white transition-colors group">
          Past_Papers
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#5d81bd] transition-all duration-300 group-hover:w-full" />
        </Link>
        <span className="text-[#5d81bd]/30 text-[9px]">•</span>
        
        <Link to="/quizzes" className="relative py-1 hover:text-white transition-colors group">
          Quizzes
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#5d81bd] transition-all duration-300 group-hover:w-full" />
        </Link>
        <span className="text-[#5d81bd]/30 text-[9px]">•</span>
        
        <Link to="/about" className="relative py-1 hover:text-white transition-colors group">
          About
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#5d81bd] transition-all duration-300 group-hover:w-full" />
        </Link>
      </div>

      {/* --- RIGHT ACTIONS (LOGIN / REGISTER) --- */}
      <div className="flex items-center gap-6">
        <Link to="/login" className="hidden sm:block font-mono font-bold text-[11px] uppercase tracking-wider text-[#b5cbf0]/60 hover:text-white transition-colors">
          Sign_In
        </Link>
        
        <Link 
          to="/register" 
          className="px-4 py-2 border border-[#5d81bd] text-[#5d81bd] rounded font-mono font-bold text-[11px] uppercase tracking-wider hover:bg-[#5d81bd] hover:text-[#010813] transition-all duration-200 active:scale-[0.98]"
        >
          Join_Free
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;