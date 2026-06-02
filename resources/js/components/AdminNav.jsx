import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

const AdminNav = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // දැනට තියෙන URL එක අනුව සයිඩ්බාර් එකේ ඇක්ටිව් බටන් එක පාට කරන්න
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/admin/tutes')) return 'tutes';
    if (path.includes('/admin/papers')) return 'papers';
    if (path.includes('/admin/quizzes')) return 'quizzes';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard Overview',
      sinhala: 'පාලන පුවරුව',
      path: '/admin/dashboard',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
      )
    },
    {
      id: 'tutes',
      label: 'Manage Tutes',
      sinhala: 'ටියුට් කළමනාකරණය',
      path: '/admin/tutes',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      )
    },
    {
      id: 'papers',
      label: 'Manage Papers',
      sinhala: 'ප්‍රශ්න පත්‍ර කළමනාකරණය',
      path: '/admin/papers',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      )
    },
    {
      id: 'quizzes',
      label: 'Manage Quizzes',
      sinhala: 'ක්විස් කළමනාකරණය',
      path: '/admin/quizzes',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0 1 12 3m0 0c2.917 0 5.747.294 8.5.862m-21 1.402v13.13c0 1.135.845 2.098 1.976 2.192c1.326.107 2.66.19 4 .248M5.11 5.694c.15-.022.3-.041.45-.061L5.11 5.694Z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-[#071835] antialiased flex w-full">
      
      {/* ================= 1. SIDEBAR NAVIGATION ================= */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#b5cbf0]/40 transform lg:transform-none lg:opacity-100 transition-all duration-300 flex flex-col justify-between ${
        isMobileOpen ? 'translate-x-0 opacity-100' : '-translate-x-0 -left-64 lg:left-0'
      }`}>
        
        <div className="p-6 space-y-8">
          {/* Logo Section */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#071835] text-[#b5cbf0] tracking-widest uppercase block w-fit">
                ADMIN PANEL
              </span>
              <h2 className="text-xl font-black tracking-tight uppercase text-[#071835]">
                ICT ZONE <span className="text-[#5d81bd] font-mono">[HQ]</span>
              </h2>
            </div>
            {/* Mobile Close Button */}
            <button onClick={() => setIsMobileOpen(false)} className="lg:hidden p-1 text-gray-400 hover:text-black">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#5d81bd] uppercase block mb-3 pl-2">// Management</span>
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path} // සයිඩ්බාර් එකේ අදාළ පේජ් එකට ලින්ක් එක
                  onClick={() => setIsMobileOpen(false)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl border font-medium text-xs transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-[#071835] text-white border-transparent shadow-md font-bold'
                      : 'bg-white text-[#071835]/70 border-transparent hover:border-[#b5cbf0]/30 hover:bg-[#fafbfc] hover:text-[#071835]'
                  }`}
                >
                  <span className={`${isActive ? 'text-[#b5cbf0]' : 'text-[#5d81bd]'}`}>{item.icon}</span>
                  <div className="flex flex-col">
                    <span>{item.label}</span>
                    <span className={`text-[9px] font-normal opacity-60 font-sans ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {item.sinhala}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Account Node */}
        <div className="p-4 border-t border-[#b5cbf0]/30 bg-gray-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#5d81bd]/20 border border-[#5d81bd]/30 flex items-center justify-center font-mono font-bold text-xs text-[#5d81bd]">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold leading-none">Lakshika C.</span>
              <span className="text-[10px] text-gray-400 font-mono mt-0.5">Super Admin</span>
            </div>
          </div>
          <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition-colors">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 18.75h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H8.25" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Backdrop overlay for mobile screen */}
      {isMobileOpen && (
        <div onClick={() => setIsMobileOpen(false)} className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs lg:hidden" />
      )}

      {/* ================= 2. MAIN CONTENT WRAPPER ================= */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-[#b5cbf0]/40 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
          
          {/* Left Side: Logo & Mobile Burger Menu */}
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileOpen(true)} className="lg:hidden p-2 text-[#071835] hover:bg-gray-100 rounded-xl">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            
            {/* Logo in Nav (ඔයාගේ logo path එක /images/logo.png වගේ වෙනස් කරගන්න) */}
            <div className="flex items-center gap-2">
              <img 
                src="/images/logo.png" 
                alt="ICT ZONE Logo" 
                className="h-8 w-auto object-contain hidden lg:block"
                onError={(e) => { e.target.style.display = 'none'; }} // රූපය නැත්නම් text එක විතරක් පෙන්වන්න
              />
              <span className="font-black text-xs text-[#071835] tracking-tight uppercase sm:block hidden">
                ICT ZONE <span className="text-[#5d81bd] font-normal">Management</span>
              </span>
            </div>
          </div>

          {/* Right Side: User Profile Photo & Stats */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#5d81bd]">
              <span>// STATUS:</span>
              <span className="bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 px-2 py-0.5 rounded-md text-[10px]">ONLINE</span>
            </div>
            
            <div className="w-px h-6 bg-gray-200 hidden sm:block" />

            {/* Logged in User Profile Photo (ඔයාගේ profile picture path එක දෙන්න) */}
            <div className="flex items-center gap-3 pl-2">
              <img 
                src="/images/admin-profile.jpg" 
                alt="Lakshika C." 
                className="w-9 h-9 rounded-xl border border-[#b5cbf0]/50 object-cover shadow-xs bg-gray-100"
                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Lakshika+C&background=5d81bd&color=fff'; }} // රූපය නැත්නම් default avatar එකක් වැටෙන්න
              />
              <div className="flex flex-col text-left hidden md:block">
                <span className="text-xs font-bold leading-none block text-[#071835]">Lakshika C.</span>
                <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* --- DYNAMIC PAGES RENDERING VIA OUTLET --- */}
        <main className="p-4 md:p-8 flex-1">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* සයිඩ්බාර් එකෙන් ක්ලික් කරන පිටුව (Dashboard, Tutes, Papers, Quizzes) මෙතනට ලෝඩ් වෙනවා */}
            <Outlet />

          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminNav;