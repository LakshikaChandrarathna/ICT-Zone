import React from 'react';
import Navbar from '@/Components/Navbar'; 

const HomePage = () => {
  const categories = [
    { 
      id: 6, 
      title: 'Grade 06 ICT', 
      items: '10 Modules', 
      desc: 'පරිගණකයේ මූලික කොටස්, මෙහෙයුම් පද්ධති හඳුනාගැනීම සහ සරල චිත්‍ර ඇඳීමේ මෘදුකාංග (Paint) මුල සිට සරලව.' 
    },
    { 
      id: 7, 
      title: 'Grade 07 ICT', 
      items: '12 Modules', 
      desc: 'දත්ත සහ තොරතුරු, ලිපි ලේඛන සකස් කිරීම (Word Processing) සහ සරල Multimedia නිර්මාණකරණය.' 
    },
    { 
      id: 8, 
      title: 'Grade 08 ICT', 
      items: '14 Modules', 
      desc: 'පැතුරුම්පත් (Spreadsheets), ඉලෙක්ට්‍රොනික ඉදිරිපත් කිරීම් (PowerPoint) සහ සරල Scratch ක්‍රමලේඛනය.' 
    },
    { 
      id: 9, 
      title: 'Grade 09 ICT', 
      items: '15 Modules', 
      desc: 'පරිගණක ජාලකරණය, වෙබ් අඩවි නිර්මාණය (HTML මූලධර්ම) සහ තාර්කික ගැටලු විසඳීමේ මූලික පියවර.' 
    },
    { 
      id: 10, 
      title: 'Grade 10 (O/L)', 
      items: '22 Lessons', 
      desc: 'සංඛ්‍යා පද්ධති (Number Systems), දත්ත සමුදාය (Database), සහ ප්‍රථම වරට Python Programming හැඳින්වීම.' 
    },
    { 
      id: 11, 
      title: 'Grade 11 (O/L)', 
      items: '25 Lessons', 
      desc: 'පද්ධති සංවර්ධන ජීවන චක්‍රය (SDLC), Python Array, Functions සහ O/L විභාග ඉලක්ක කරගත් පසුගිය ප්‍රශ්න පත්‍ර.' 
    },
    { 
      id: 12, 
      title: 'Grade 12 (A/L)', 
      items: '30 Lessons', 
      desc: 'Advanced Logic Gates, Boolean Algebra, දත්ත සන්නිවේදනය, ER Diagrams සහ උසස් SQL භාවිතය.' 
    },
    { 
      id: 13, 
      title: 'Grade 13 (A/L)', 
      items: '35 Lessons', 
      desc: 'Advanced Python, Object-Oriented Programming (OOP), Web Engineering (PHP/CSS) සහ e-Commerce TAක්ෂණය.' 
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#071835] antialiased selection:bg-[#b5cbf0] selection:text-[#010813]">
      
      <Navbar />

      {/* --- ASYMMETRIC PROFESSIONAL HERO SECTION --- */}
      <section className="relative bg-[#010813] py-24 md:py-32 px-6 md:px-12 w-full border-b border-[#071835]/40 overflow-hidden">
        {/* Crisp grid blueprint overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#5d81bd_1px,transparent_1px),linear-gradient(to_bottom,#5d81bd_1px,transparent_1px)] bg-[size:5rem_5rem]" />
        
        {/* Soft, ultra-premium background glow */}
        <div className="absolute top-1/3 right-0 w-[600px] h-[400px] bg-[#5d81bd]/10 rounded-full blur-[140px] -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Left Column: Heading & Typography */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded border border-[#5d81bd]/20 bg-[#071835]/40 text-[#b5cbf0] text-[11px] font-mono tracking-wide mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5d81bd] animate-pulse" />
              system_portal: v2.0.26
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] mb-6">
              Learn ICT Like a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#b5cbf0] to-[#5d81bd] font-mono font-bold">
                [Developer]
              </span>
            </h1>

            <p className="text-sm md:text-base text-[#5d81bd] max-w-xl leading-relaxed mb-0 font-medium opacity-90">
              ශ්‍රී ලංකාවේ 6 සිට 13 ශ්‍රේණි සඳහාම විශේෂයෙන්ම ව්‍යුහගත කළ පද්ධතිය. 
              තාක්ෂණික ලෝකය ජයගන්න ඔයාගේ නිවැරදිම පියවර මෙතනින් තෝරන්න.
            </p>
          </div>

          {/* Right Column: Refined Command Box */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#01060e] border border-[#071835] rounded-xl p-6 shadow-2xl relative">
              <div className="flex gap-1.5 mb-5 border-b border-[#071835]/60 pb-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#071835]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#071835]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#071835]" />
              </div>
              
              <span className="block text-[#5d81bd] font-mono text-[11px] uppercase tracking-wider mb-2.5">core_search_engine</span>
              <div className="relative group mb-4">
                <input
                  type="text"
                  placeholder="පාඩම්, වීඩියෝ හෝ ප්‍රශ්න පත්‍ර (e.g., Python)..."
                  className="w-full pl-4 pr-12 py-3.5 rounded-lg border border-[#071835] bg-[#010813] text-[#b5cbf0] placeholder-[#5d81bd]/30 focus:outline-none focus:border-[#5d81bd]/80 transition-all text-xs font-mono"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5d81bd]/30 group-focus-within:text-[#b5cbf0]">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
              </div>

              <button className="w-full py-3.5 bg-[#071835] hover:bg-[#5d81bd] border border-[#5d81bd]/30 hover:border-transparent text-[#b5cbf0] hover:text-[#010813] font-mono font-bold text-xs rounded-lg transition-all shadow-md tracking-wider">
                EXECUTE SEARCH_
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* --- 🛠️ මෙතැන් සිට පහළ කොටස ඔයාගේ මුල්ම වර්ණ රටාවලට අනුව නිවැරදි කර ඇත --- */}
      <section className="px-6 md:px-12 py-10 max-w-7xl mx-auto bg-white">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#b5cbf0]/30 pb-6 mb-12">
          <div>
            <span className="text-[#5d81bd] font-mono text-xs tracking-widest uppercase block mb-1.5">// Syllabus Structure</span>
            <h2 className="text-3xl font-black text-[#071835] tracking-tight">ශ්‍රේණි අනුව නාමාවලිය</h2>
          </div>
          <p className="text-[11px] font-mono text-[#5d81bd] mt-2 md:mt-0 bg-[#b5cbf0]/10 px-2.5 py-1 rounded">
            Total Classes: 0{categories.length}
          </p>
        </div>

        {/* Clean Line Grid Layout - මුල්ම Background Colors ඒ විදිහටම ආරක්ෂා කර ඇත */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => {
                console.log(`Navigating to Index ${cat.id}`);
                alert(`Grade ${cat.id} වෙත ප්‍රවේශ වෙමින්...`);
              }}
              className="group relative p-6 rounded-xl bg-gradient-to-b from-[#b5cbf0]/10 to-[#5d81bd]/05 border border-[#b5cbf0]/30 hover:bg-none hover:bg-[#010813] hover:border-[#071835] hover:shadow-[0_24px_50px_rgba(1,8,19,0.12)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Meta Header */}
                <div className="flex justify-between items-center mb-5">
                  <span className="font-mono text-xs text-[#5d81bd] group-hover:text-[#b5cbf0]/50 font-bold transition-colors">
                    INDEX_0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-[#071835] text-[#b5cbf0] group-hover:bg-[#5d81bd] group-hover:text-[#01060e] px-2 py-0.5 rounded transition-colors">
                    {cat.items}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-extrabold text-[#071835] tracking-tight mb-3 group-hover:text-white transition-colors">
                  {cat.title}
                </h3>

                {/* Description */}
                <p className="text-[#071835]/80 text-xs font-medium leading-loose mb-6 line-clamp-4 group-hover:text-[#b5cbf0]/80 transition-colors">
                  {cat.desc}
                </p>
              </div>

              {/* Action Link */}
              <div className="flex items-center justify-between pt-4 border-t border-[#b5cbf0]/30 group-hover:border-[#071835]/60 mt-auto">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#071835]/70 group-hover:text-[#5d81bd] transition-colors">
                  launch_module
                </span>
                <span className="text-[#5d81bd] group-hover:translate-x-1 transition-transform text-sm font-mono font-bold">
                  →
                </span>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* --- DASHBOARD ENTERPRISE FOOTER --- */}
      <footer className="px-6 py-14 bg-[#01060e] text-center border-t border-[#071835]/60">
        <div className="max-w-xl mx-auto">
          <h4 className="text-base font-mono font-bold text-white mb-2">
            [[ initial_cohort_program ]]
          </h4>
          <p className="text-[#5d81bd] text-xs max-w-xs mx-auto mb-6 font-medium opacity-80">
            සක්‍රීය සිසුන් 15,000+ ප්‍රජාව සමඟ ඔබගේ තාක්ෂණික ගමන අදම අරඹන්න.
          </p>

          <div className="inline-flex items-center gap-4 px-4 py-2 rounded border border-[#071835] bg-[#010813] text-[10px] font-mono text-[#5d81bd] font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              deploy: success
            </span>
            <span className="text-[#071835]">|</span>
            <span>© 2026 edulanka_ict</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;