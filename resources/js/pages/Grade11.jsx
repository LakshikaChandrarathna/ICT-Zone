import React, { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar'; // ඔයාගේ Navbar එක

const Grade11 = () => {
  const [activeTab, setActiveTab] = useState('tutes');
  const [topicsData, setTopicsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // දැනට Play වන වීඩියෝව තබා ගැනීමට
  const [activeVideo, setActiveVideo] = useState("");

  // Laravel Backend URL එක
  const API_URL = "http://localhost:8000/api/tutes";
  const STORAGE_URL = "http://localhost:8000/storage/";

  // පිටුව පූරණය වෙද්දී Backend එකෙන් දත්ත ලබා ගැනීම
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("දත්ත ලබා ගැනීමට අපොහොසත් විය.");
        }
        const data = await response.json();
        
        // පැමිණෙන සියලුම දත්ත වලින් 'Grade 11' සහ 'Active' ඒවා පමණක් පෙරරා ගැනීම
        const grade11Data = data.filter(item => item.grade === '11' && item.status === 'Active');
        
        setTopicsData(grade11Data);

        // වීඩියෝ ලැයිස්තුවෙන් පළමු එක මුලින්ම Active කිරීම
        const firstVideo = grade11Data.find(item => item.type === 'video');
        if (firstVideo) {
          setActiveVideo(firstVideo.video_url);
        } else {
          setActiveVideo("https://www.youtube.com/embed/dQw4w9WgXcQ"); // Default Placement
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // PDF Download/Open ෆන්ක්ෂන් එක
  const handleDownload = (filePath, typeName) => {
    if (filePath) {
      const fullUrl = `${STORAGE_URL}${filePath}`;
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(`කණගාටුයි! මෙම පාඩමට අදාළ ${typeName} එක තවම පද්ධතියට ඇතුළත් කර නැත.`);
    }
  };

  // YouTube Link එක Embed Link එකක් බවට හැරවීම
  const formatEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("embed")) return url;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  // Resource Type අනුව දත්ත වෙන් කිරීම
  const tutesList = topicsData.filter(item => item.type === 'tute');
  const notesList = topicsData.filter(item => item.type === 'short_note');
  const videosList = topicsData.filter(item => item.type === 'video');

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-[#071835] selection:bg-[#b5cbf0] selection:text-[#010813] antialiased">
      <Navbar />

      {/* --- DASHBOARD WRAPPER --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= SIDEBAR ================= */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-5 lg:sticky lg:top-24 h-fit">
          
          {/* Header Card */}
          <div className="bg-white border border-[#b5cbf0]/40 p-6 rounded-2xl shadow-[0_2px_8px_rgba(7,24,53,0.02)]">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#071835] text-[#b5cbf0] text-[9px] font-mono font-bold tracking-widest uppercase mb-3">
              GRADE 11
            </div>
            <h1 className="text-2xl font-black text-[#071835] tracking-tight uppercase">
              STUDY <span className="text-[#5d81bd] font-mono">[PORTAL]</span>
            </h1>
            <p className="text-xs text-[#071835]/60 mt-1 font-medium">වීඩියෝ, නිබන්ධන සහ කෙටි සටහන් මෙතනින් තෝරාගන්න.</p>
          </div>

          {/* TAB BUTTONS */}
          <div className="bg-white p-3 rounded-2xl border border-[#b5cbf0]/40 shadow-[0_2px_8px_rgba(7,24,53,0.02)] flex flex-col gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#5d81bd] uppercase block mb-1 border-l-2 border-[#5d81bd] pl-2 mt-1">
              Resource Type
            </span>
            
            <button
              onClick={() => setActiveTab('tutes')}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-between border ${
                activeTab === 'tutes' ? 'bg-[#071835] text-white border-transparent shadow-md' : 'bg-white text-[#071835]/70 border-[#b5cbf0]/30 hover:border-[#5d81bd]/40'
              }`}
            >
              <span className="font-sans flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                නිබන්ධන (Tutes PDF)
              </span>
              <span className={`text-[10px] font-mono ${activeTab === 'tutes' ? 'text-[#b5cbf0]' : 'opacity-40'}`}>
                {tutesList.length < 10 ? `0${tutesList.length}` : tutesList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-between border ${
                activeTab === 'notes' ? 'bg-[#071835] text-white border-transparent shadow-md' : 'bg-white text-[#071835]/70 border-[#b5cbf0]/30 hover:border-[#5d81bd]/40'
              }`}
            >
              <span className="font-sans flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                කෙටි සටහන් (Short Notes)
              </span>
              <span className={`text-[10px] font-mono ${activeTab === 'notes' ? 'text-[#b5cbf0]' : 'opacity-40'}`}>
                {notesList.length < 10 ? `0${notesList.length}` : notesList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-between border ${
                activeTab === 'videos' ? 'bg-[#071835] text-white border-transparent shadow-md' : 'bg-white text-[#071835]/70 border-[#b5cbf0]/30 hover:border-[#5d81bd]/40'
              }`}
            >
              <span className="font-sans flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                වීඩියෝ පාඩම් (Videos)
              </span>
              <span className={`text-[10px] font-mono ${activeTab === 'videos' ? 'text-[#b5cbf0]' : 'opacity-40'}`}>
                {videosList.length < 10 ? `0${videosList.length}` : videosList.length}
              </span>
            </button>
          </div>
        </div>

        {/* ================= MAIN CONTENT AREA ================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-5">
          
          {/* Status Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-2xl border border-[#b5cbf0]/40 shadow-[0_2px_8px_rgba(7,24,53,0.01)] gap-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#5d81bd] font-bold">// VIEWING MODE:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#071835] text-white font-mono font-bold text-[10px] tracking-wider uppercase">
                {activeTab === 'tutes' && 'STUDY TUTES (PDF)'}
                {activeTab === 'notes' && 'SHORT NOTES (PDF)'}
                {activeTab === 'videos' && 'VIDEO LESSONS'}
              </span>
            </div>
            <span className="text-xs font-mono font-bold bg-[#5d81bd]/10 text-[#5d81bd] px-3 py-1 rounded-lg self-start sm:self-auto">
              Topics Found: {activeTab === 'tutes' ? tutesList.length : activeTab === 'notes' ? notesList.length : videosList.length}
            </span>
          </div>

          {/* Loading / Error States */}
          {loading && <div className="text-center py-20 text-sm font-medium text-gray-400">දත්ත පූරණය වෙමින් පවතී...</div>}
          {error && <div className="text-center py-20 text-sm font-bold text-red-500">පද්ධතියට සම්බන්ධ වීමේ දෝෂයකි! ({error})</div>}
          {!loading && !error && topicsData.length === 0 && (
            <div className="bg-white p-10 border border-dashed border-[#b5cbf0] rounded-2xl text-center text-xs font-medium text-gray-400">
              Grade 11 සඳහා දැනට කිසිදු අධ්‍යයන ද්‍රව්‍යයක් ඇතුළත් කර නැත.
            </div>
          )}

          {/* --- TUTES TAB --- */}
          {!loading && !error && activeTab === 'tutes' && tutesList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {tutesList.map((topic) => (
                <div key={topic.id} className="group bg-white border border-[#b5cbf0]/30 hover:border-[#5d81bd]/40 p-5 rounded-2xl shadow-[0_4px_16px_rgba(7,24,53,0.02)] transition-all duration-300 flex flex-col justify-between gap-5 relative overflow-hidden">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] font-extrabold px-2 py-0.5 rounded border text-[#5d81bd] bg-[#5d81bd]/05 border-[#5d81bd]/20">
                        LESSON 0{topic.lesson}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 font-sans font-bold text-[9px] uppercase">
                        PDF TUTE
                      </span>
                    </div>
                    <h3 className="font-bold text-[#071835] group-hover:text-[#5d81bd] text-[14px] leading-snug line-clamp-2 min-h-[40px]">
                      {topic.title}
                    </h3>
                  </div>
                  <button onClick={() => handleDownload(topic.file_path, 'Tute PDF')} className="w-full py-2.5 bg-gradient-to-r from-[#071835] to-[#122e5c] hover:from-[#5d81bd] hover:to-[#4a6fa8] text-white font-mono font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm">
                    <span>Download Tute</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* --- SHORT NOTES TAB --- */}
          {!loading && !error && activeTab === 'notes' && notesList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {notesList.map((topic) => (
                <div key={topic.id} className="group bg-white border border-[#b5cbf0]/30 hover:border-[#10b981]/40 p-5 rounded-2xl shadow-[0_4px_16px_rgba(7,24,53,0.02)] transition-all duration-300 flex flex-col justify-between gap-5 relative overflow-hidden">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] font-extrabold px-2 py-0.5 rounded border text-[#10b981] bg-[#10b981]/05 border-[#10b981]/20">
                        LESSON 0{topic.lesson}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100 font-sans font-bold text-[9px] uppercase">
                        SHORT NOTE
                      </span>
                    </div>
                    <h3 className="font-bold text-[#071835] group-hover:text-[#10b981] text-[14px] leading-snug line-clamp-2 min-h-[40px]">
                      {topic.title}
                    </h3>
                  </div>
                  <button onClick={() => handleDownload(topic.file_path, 'Short Note PDF')} className="w-full py-2.5 bg-gradient-to-r from-[#071835] to-[#122e5c] hover:from-[#10b981] hover:to-[#059669] text-white font-mono font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm">
                    <span>Download Note</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* --- VIDEOS TAB --- */}
          {!loading && !error && activeTab === 'videos' && videosList.length > 0 && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-4">
                <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-sm bg-black border border-[#b5cbf0]/20">
                  <iframe className="absolute top-0 left-0 w-full h-full" src={formatEmbedUrl(activeVideo)} title="Main Video Player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {videosList.map((topic) => (
                  <div key={topic.id} className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 ${activeVideo === topic.video_url ? 'bg-[#b5cbf0]/15 border-[#5d81bd] shadow-sm' : 'bg-white border-[#b5cbf0]/30 hover:border-[#5d81bd]/40'}`}>
                    <div>
                      <span className="font-mono text-[9px] font-extrabold px-1.5 py-0.5 rounded border text-[#5d81bd] bg-[#5d81bd]/05 border-[#5d81bd]/20">
                        LESSON 0{topic.lesson}
                      </span>
                      <h4 className="font-bold text-xs text-[#071835] leading-snug mt-2">{topic.title}</h4>
                    </div>
                    <button onClick={() => setActiveVideo(topic.video_url)} className={`w-full py-2 rounded-lg font-mono font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${activeVideo === topic.video_url ? 'bg-[#071835] text-white' : 'bg-gray-100 text-gray-700 hover:bg-[#5d81bd] hover:text-white'}`}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                      Play Video
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Grade11;