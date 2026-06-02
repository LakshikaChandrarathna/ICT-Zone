import React, { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';

const Papers = ({ selectedGrade = "All" }) => {
  // Modern soft palette colors for grade tags
  const gradeStyles = {
    "6": "text-blue-600 bg-blue-50 border-blue-100",
    "7": "text-indigo-600 bg-indigo-50 border-indigo-100",
    "8": "text-purple-600 bg-purple-50 border-purple-100",
    "9": "text-pink-600 bg-pink-50 border-pink-100",
    "10": "text-amber-600 bg-amber-50 border-amber-100",
    "11": "text-orange-600 bg-orange-50 border-orange-100",
    "12": "text-emerald-600 bg-emerald-50 border-emerald-100",
    "13": "text-teal-600 bg-teal-50 border-teal-100",
    "All": "text-[#5d81bd] bg-[#b5cbf0]/10 border-transparent"
  };

  // State කළමනාකරණය
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterGrade, setFilterGrade] = useState(selectedGrade);
  const [filterTerm, setFilterTerm] = useState('All');

  // Laravel Backend API URL
  const API_URL = 'http://localhost:8000/api/papers';

  // පිටුව Load වෙද්දී Laravel එකෙන් ඩේටා ලබාගැනීම
  useEffect(() => {
    fetchLivePapers();
  }, []);

  const fetchLivePapers = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      
      if (response.ok) {
        setPapers(data);
      } else {
        console.error("Backend Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching papers from server:", error);
    } finally {
      setLoading(false);
    }
  };

  // Admin එකෙන් දාන Type එක අනුව Term එක අනුමාන කිරීම (Filtering පහසු කිරීමට)
  const getTermFromType = (type) => {
    if (type.includes('1st Term') || type.includes('Term Paper')) return 1; 
    if (type.includes('2nd Term')) return 2;
    if (type.includes('3rd Term') || type.includes('Past Paper') || type.includes('Model Paper')) return 3;
    return 1; // Default
  };

  // සජීවී දත්ත Filter කිරීම
  const filteredPapers = papers.filter((paper) => {
    const paperTerm = getTermFromType(paper.type);
    
    return (
      (filterGrade === 'All' || paper.grade === filterGrade) &&
      (filterTerm === 'All' || paperTerm === parseInt(filterTerm))
    );
  });

  const grades = ['All', '6', '7', '8', '9', '10', '11', '12', '13'];
  const terms = ['All', '1', '2', '3'];

  // PDF එක Download කිරීමට හෝ බැලීමට වෙනම Tab එකක විවෘත කිරීම
  const handleDownload = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('කණගාටුයි! මෙම ප්‍රශ්න පත්‍රයට අදාළ PDF ගොනුව සොයාගත නොහැක.');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-[#071835] selection:bg-[#b5cbf0] selection:text-[#010813] antialiased">
      <Navbar />

      {/* --- DASHBOARD WRAPPER --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= SIDEBAR FILTERS ================= */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-24 h-fit">
          
          {/* Header Card */}
          <div className="bg-white border border-[#b5cbf0]/40 p-6 rounded-2xl shadow-[0_2px_8px_rgba(7,24,53,0.02)]">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#071835] text-[#b5cbf0] text-[9px] font-mono font-bold tracking-widest uppercase mb-3">
              REPOSITORY
            </div>
            <h1 className="text-2xl font-black text-[#071835] tracking-tight uppercase">
              RESOURCE <span className="text-[#5d81bd] font-mono">[HUB]</span>
            </h1>
            <p className="text-xs text-[#071835]/60 mt-1 font-medium">6 ශ්‍රේණියේ සිට උසස් පෙළ දක්වා විභාග ප්‍රශ්න පත්‍ර එකතුව.</p>
          </div>

          {/* Grade Filter */}
          <div className="bg-white p-6 rounded-2xl border border-[#b5cbf0]/40 shadow-[0_2px_8px_rgba(7,24,53,0.02)]">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#5d81bd] uppercase block mb-4 border-l-2 border-[#5d81bd] pl-2">
              Filter by Grade
            </span>
            <div className="grid grid-cols-3 gap-2">
              {grades.map((g) => (
                <button
                  key={g}
                  onClick={() => setFilterGrade(g)}
                  className={`py-2.5 px-1 rounded-xl text-xs font-mono font-bold transition-all duration-200 active:scale-95 border ${
                    filterGrade === g
                      ? 'bg-[#071835] text-white border-transparent shadow-md'
                      : 'bg-white text-[#071835]/70 border-[#b5cbf0]/30 hover:border-[#5d81bd]/50 hover:bg-[#fafbfc]'
                  } ${g === 'All' ? 'col-span-3 text-center tracking-wider uppercase' : ''}`}
                >
                  {g === 'All' ? 'All Grades' : `G-${g}`}
                </button>
              ))}
            </div>
          </div>

          {/* Term Filter */}
          <div className="bg-white p-6 rounded-2xl border border-[#b5cbf0]/40 shadow-[0_2px_8px_rgba(7,24,53,0.02)]">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#5d81bd] uppercase block mb-4 border-l-2 border-[#5d81bd] pl-2">
              Filter by Term
            </span>
            <div className="flex flex-col gap-2">
              {terms.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterTerm(t)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-medium transition-all duration-200 flex items-center justify-between border ${
                    filterTerm === t
                      ? 'bg-[#b5cbf0]/20 text-[#071835] border-[#5d81bd] font-bold'
                      : 'bg-white text-[#071835]/70 border-[#b5cbf0]/30 hover:border-[#5d81bd]/40 hover:bg-[#fafbfc]'
                  }`}
                >
                  <span className="font-sans">{t === 'All' ? 'All School Terms' : `Term 0${t} Examination`}</span>
                  {filterTerm === t ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5d81bd]" />
                  ) : (
                    <span className="text-[10px] font-mono opacity-40">0{t}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ================= MAIN CONTENT AREA ================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-5">
          
          {/* Top Active Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-2xl border border-[#b5cbf0]/40 shadow-[0_2px_8px_rgba(7,24,53,0.01)] gap-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#5d81bd] font-bold">// VISUALIZING:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#071835]/05 text-[#071835] font-bold text-[10px]">
                {filterGrade === 'All' ? 'ALL GRADES' : `GRADE ${filterGrade}`}
              </span>
              <span className="text-[#b5cbf0]">•</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#071835]/05 text-[#071835] font-bold text-[10px]">
                {filterTerm === 'All' ? 'ALL TERMS' : `TERM ${filterTerm}`}
              </span>
            </div>
            <span className="text-xs font-mono font-bold bg-[#5d81bd]/10 text-[#5d81bd] px-3 py-1 rounded-lg self-start sm:self-auto">
              Found: {loading ? '...' : filteredPapers.length} Results
            </span>
          </div>

          {/* --- GRID CONTENT LAYOUT --- */}
          {loading ? (
            <div className="text-center py-20 font-medium text-gray-400">
              ප්‍රශ්න පත්‍ර පද්ධතියෙන් පූරණය වෙමින් පවතී (Loading...)...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredPapers.map((paper) => {
                const currentStyle = gradeStyles[paper.grade] || gradeStyles["All"];

                return (
                  <div
                    key={paper.id}
                    className="group bg-white border border-[#b5cbf0]/30 hover:border-[#5d81bd]/40 p-5 rounded-2xl shadow-[0_4px_16px_rgba(7,24,53,0.02)] hover:shadow-[0_12px_24px_rgba(93,129,189,0.08)] transition-all duration-300 flex flex-col justify-between gap-5 relative overflow-hidden"
                  >
                    {/* Decorative Subtle Corner Accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#b5cbf0]/10 to-transparent rounded-bl-full pointer-events-none" />

                    {/* Upper Block: Meta info + Title */}
                    <div className="space-y-3.5 relative z-10">
                      <div className="flex justify-between items-center">
                        <span className={`font-mono text-[9px] font-extrabold px-2 py-0.5 rounded border tracking-wider uppercase ${currentStyle}`}>
                          Grade {paper.grade}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400 font-medium">
                          {paper.year}
                        </span>
                      </div>

                      <h3 className="font-bold text-[#071835] group-hover:text-[#5d81bd] transition-colors duration-200 text-[15px] leading-snug line-clamp-3 min-h-[68px]">
                        {paper.title}
                      </h3>

                      {/* Bottom Inline Badges */}
                      <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
                        <span className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-200 text-gray-500 font-mono font-bold text-[9px] uppercase">
                          {paper.type}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 font-sans font-bold text-[9px] uppercase tracking-wide">
                          Official PDF
                        </span>
                      </div>
                    </div>

                    {/* Lower Block: Action Download Area */}
                    <button 
                      onClick={() => handleDownload(paper.file_url)}
                      className="w-full py-2.5 bg-gradient-to-r from-[#071835] to-[#122e5c] hover:from-[#5d81bd] hover:to-[#4a6fa8] text-white font-mono font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Download / View</span>
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Clean Rounded Empty State */}
          {!loading && filteredPapers.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-[#b5cbf0] p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-3 text-gray-400">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#071835] uppercase tracking-wider">ප්‍රශ්න පත්‍ර හමුවුණේ නැත</h3>
              <p className="text-gray-500 text-xs mt-1 max-w-xs mx-auto">
                තෝරාගත් ශ්‍රේණිය හෝ වාරය සඳහා ප්‍රශ්න පත්‍ර තවම පද්ධතියට ඇතුළත් කර නැත. වෙනත් වාරයක් හෝ ශ්‍රේණියක් තෝරා බලන්න.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Papers;