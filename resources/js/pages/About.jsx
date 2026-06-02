import React from 'react';
import Navbar from '@/Components/Navbar';

const About = () => {
  // Core pillars dynamic styles tailored for the white theme
  const pillarStyles = {
    "Vision": "text-blue-600 bg-blue-50 border-blue-200 shadow-[0_4px_12px_rgba(59,130,246,0.06)]",
    "Mission": "text-indigo-600 bg-indigo-50 border-indigo-200 shadow-[0_4px_12px_rgba(99,102,241,0.06)]",
    "Values": "text-purple-600 bg-purple-50 border-purple-200 shadow-[0_4px_12px_rgba(168,85,247,0.06)]",
  };

  // Academic Platform Statistics
  const stats = [
    { label: 'Active Students', count: '5,000+', desc: 'Learners island-wide' },
    { label: 'Resource Files', count: '250+', desc: 'Papers & lecture tutes' },
    { label: 'Success Rate', count: '98%', desc: 'Top tier exam results' },
    { label: 'Syllabus Coverage', count: '100%', desc: 'Strictly local curriculum' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#071835] selection:bg-[#b5cbf0] selection:text-[#010813] antialiased">
      <Navbar />

      {/* --- MAIN CONTAINER --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-10">
        
        {/* ================= SECTION 1: HERO BANNER (ABOUT US INTRODUCTION) ================= */}
        <div className="relative bg-gradient-to-b from-[#b5cbf0]/10 to-[#5d81bd]/05 p-8 md:p-12 rounded-3xl border border-[#b5cbf0]/30 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#071835] text-[#b5cbf0] text-[10px] font-mono font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5d81bd] animate-pulse" />
              // WHO WE ARE
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-[#071835] tracking-tight uppercase">
              ABOUT OUR <span className="text-[#5d81bd] font-mono font-bold">[ACADEMY]</span>
            </h1>
            <p className="text-sm text-[#071835]/70 max-w-2xl leading-relaxed">
              The island&apos;s premier technical learning hub dedicated to making Information and Communication Technology (ICT) simple, practical, and highly systematic for students from Grade 6 up to G.C.E. Advanced Level (A/L).
            </p>
          </div>

          <div className="bg-white border border-[#b5cbf0]/50 p-4 rounded-xl shadow-sm self-stretch md:self-auto flex flex-col justify-center min-w-[180px]">
            <span className="text-[10px] font-mono font-bold text-[#5d81bd] uppercase tracking-wider block">// PLATFORM STATUS</span>
            <span className="text-3xl font-black text-[#071835]">ONLINE</span>
            <span className="text-[11px] text-[#071835]/60 font-medium">E-Learning Hub</span>
          </div>
        </div>

        {/* ================= SECTION 2: STATS MODULAR ROW ================= */}
        <div className="bg-gradient-to-b from-[#b5cbf0]/10 to-[#5d81bd]/05 p-6 rounded-2xl border border-[#b5cbf0]/30 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center md:text-left space-y-1 md:pl-4 md:border-l border-[#b5cbf0]/40 first:border-none">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#5d81bd] uppercase block">
                  {stat.label}
                </span>
                <div className="text-2xl md:text-3xl font-black text-[#071835]">
                  {stat.count}
                </div>
                <p className="text-xs text-[#071835]/60 font-medium">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 3: VISION, MISSION & VALUES BENTO GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* VISION CARD */}
          <div className="group relative bg-gradient-to-b from-[#b5cbf0]/10 to-[#5d81bd]/05 border border-[#b5cbf0]/30 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between gap-6 overflow-hidden">
            <div className="absolute top-0 left-0 w-[4px] h-full bg-blue-500" />
            <div className="space-y-3 pl-2">
              <span className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase border tracking-widest ${pillarStyles.Vision}`}>
                VISION
              </span>
              <h3 className="font-extrabold text-lg text-[#071835] group-hover:text-[#5d81bd] transition-colors duration-200">
                Our Vision
              </h3>
              <p className="text-xs text-[#071835]/70 leading-relaxed">
                To foster a generation of digitally literate Sri Lankan students who are creative, analytical, and ready to confidently embrace innovations within a rapidly evolving global tech landscape.
              </p>
            </div>
          </div>

          {/* MISSION CARD */}
          <div className="group relative bg-gradient-to-b from-[#b5cbf0]/10 to-[#5d81bd]/05 border border-[#b5cbf0]/30 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between gap-6 overflow-hidden">
            <div className="absolute top-0 left-0 w-[4px] h-full bg-indigo-500" />
            <div className="space-y-3 pl-2">
              <span className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase border tracking-widest ${pillarStyles.Mission}`}>
                MISSION
              </span>
              <h3 className="font-extrabold text-lg text-[#071835] group-hover:text-[#5d81bd] transition-colors duration-200">
                Our Mission
              </h3>
              <p className="text-xs text-[#071835]/70 leading-relaxed">
                To deliver structural guidance and high-quality study materials tailored precisely to the national syllabus, utilizing modern educational frameworks to ensure every student achieves academic excellence.
              </p>
            </div>
          </div>

          {/* VALUES CARD */}
          <div className="group relative bg-gradient-to-b from-[#b5cbf0]/10 to-[#5d81bd]/05 border border-[#b5cbf0]/30 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between gap-6 overflow-hidden">
            <div className="absolute top-0 left-0 w-[4px] h-full bg-purple-500" />
            <div className="space-y-3 pl-2">
              <span className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase border tracking-widest ${pillarStyles.Values}`}>
                CORE VALUES
              </span>
              <h3 className="font-extrabold text-lg text-[#071835] group-hover:text-[#5d81bd] transition-colors duration-200">
                Core Values
              </h3>
              <p className="text-xs text-[#071835]/70 leading-relaxed">
                Driven by integrity, high-caliber resources, persistent technological adaptation, and an unwavering commitment to cultivating our students&apos; real-world, practical development.
              </p>
            </div>
          </div>

        </div>

        {/* ================= SECTION 4: WHY CHOOSE US FOOTER NOTE ================= */}
        <div className="bg-gradient-to-b from-[#b5cbf0]/10 to-[#5d81bd]/05 p-8 rounded-2xl border border-[#b5cbf0]/30 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-white border border-[#b5cbf0] flex items-center justify-center mx-auto text-[#5d81bd]">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a48.67 48.67 0 0115.482 0m-15.482 0l4.97 4.97m10.512-4.97l-4.97 4.97M12 11v6.5m0-6.5L8.332 7.668a48.632 48.632 0 017.336 0L12 11z" />
            </svg>
          </div>
          <h3 className="text-base font-mono font-bold text-[#071835] uppercase tracking-wider">// WHY CHOOSE OUR HUB</h3>
          <p className="text-[#071835]/70 text-xs max-w-xl mx-auto leading-relaxed">
            We transcend foundational theory. Our specific focus lies in breaking down complex terminal and official national evaluation architectures (Model and Past Papers) to comprehensively steer students towards solid &apos;A&apos; distinctions.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;