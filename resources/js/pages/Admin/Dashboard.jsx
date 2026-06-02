import React from 'react';

const Dashboard = () => {
  const stats = [
    {
      id: 1,
      title: 'Total Tutes',
      count: '42',
      sinhala: 'මුළු නිබන්ධන',
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Total Papers',
      count: '14',
      sinhala: 'මුළු ප්‍රශ්න පත්‍ර',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Active Quizzes',
      count: '28',
      sinhala: 'ක්‍රියාකාරී ක්විස් තරඟ',
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0 1 12 3m0 0c2.917 0 5.747.294 8.5.862m-21 1.402v13.13c0 1.135.845 2.098 1.976 2.192c1.326.107 2.66.19 4 .248M5.11 5.694c.15-.022.3-.041.45-.061L5.11 5.694Z" />
        </svg>
      )
    }
  ];

  const recentUploads = [
    { id: 1, type: 'Paper', title: '3rd Term A/L - ICT Target Model Paper', grade: '13', date: 'Today' },
    { id: 2, type: 'Tute', title: 'Python Programming Complete Theory', grade: '11', date: 'Yesterday' },
    { id: 3, type: 'Quiz', title: 'Logic Gates & Digital Circuits MCQ', grade: '10', date: '2 days ago' },
    { id: 4, type: 'Tute', title: 'Introduction to Networking & IP Addressing', grade: '12', date: '5 days ago' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Dynamic Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#b5cbf0]/30 shadow-[0_2px_12px_rgba(7,24,53,0.01)]">
        <h2 className="text-xl font-black uppercase text-[#071835]">System Analytics</h2>
        <p className="text-xs text-gray-500 mt-1">ඇකඩමියේ සිසුන් සහ සම්පත් පිළිබඳ පොදු දත්ත විග්‍රහය.</p>
      </div>

      {/* ================= QUICK STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className="bg-white border border-[#b5cbf0]/30 p-6 rounded-2xl shadow-[0_2px_12px_rgba(7,24,53,0.01)] flex items-center justify-between group hover:border-[#5d81bd]/40 transition-all duration-300"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-gray-400 block uppercase tracking-wider">
                {stat.title}
              </span>
              <h3 className="text-3xl font-black text-[#071835] tracking-tight">
                {stat.count}
              </h3>
              <p className="text-[10px] font-sans text-gray-400">
                {stat.sinhala}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ================= RECENT UPLOADS TABLE ================= */}
        <div className="lg:col-span-8 bg-white border border-[#b5cbf0]/30 rounded-2xl shadow-[0_2px_12px_rgba(7,24,53,0.01)] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h4 className="font-bold text-[#071835] text-sm uppercase tracking-wide">Recent Activities</h4>
              <p className="text-[11px] text-gray-400">මෑතකදී පද්ධතියට එකතු කරන ලද ද්‍රව්‍ය.</p>
            </div>
            <span className="text-[10px] font-mono text-[#5d81bd] bg-[#5d81bd]/10 px-2.5 py-1 rounded-md font-bold">
              LIVE TRACKING
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-gray-400 font-mono text-[10px] uppercase tracking-wider bg-gray-50/70 rounded-lg">
                  <th className="py-3 px-4 rounded-l-xl">Type</th>
                  <th className="py-3 px-4">Resource Title</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4 rounded-r-xl">Uploaded</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-[#071835]/90">
                {recentUploads.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors group">
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                        item.type === 'Tute' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        item.type === 'Paper' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                        'bg-purple-50 text-purple-600 border border-purple-100'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-sans text-gray-700 max-w-[240px] truncate group-hover:text-[#5d81bd] transition-colors">
                      {item.title}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-500">G-{item.grade}</td>
                    <td className="py-3.5 px-4 text-gray-400 font-sans text-[11px]">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= QUICK ACTIONS PANEL ================= */}
        <div className="lg:col-span-4 bg-white border border-[#b5cbf0]/30 rounded-2xl shadow-[0_2px_12px_rgba(7,24,53,0.01)] p-6 space-y-4">
          <div>
            <h4 className="font-bold text-[#071835] text-sm uppercase tracking-wide">Quick Actions</h4>
            <p className="text-[11px] text-gray-400">නව සම්පත් කඩිනමින් ඇතුළත් කරන්න.</p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button className="w-full p-3 bg-white hover:bg-blue-50/50 border border-gray-200 hover:border-blue-300 text-gray-700 font-medium text-xs rounded-xl transition-all duration-200 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100/70">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
                <span className="text-left block">
                  <span className="text-xs font-bold block text-gray-800">Add New Tute</span>
                  <span className="text-[10px] text-gray-400 font-sans block">නව ටියුට් එකක් එකතු කරන්න</span>
                </span>
              </div>
              <span className="text-gray-300 group-hover:text-blue-500 font-mono text-xs">→</span>
            </button>

            <button className="w-full p-3 bg-white hover:bg-indigo-50/50 border border-gray-200 hover:border-indigo-300 text-gray-700 font-medium text-xs rounded-xl transition-all duration-200 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100/70">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
                <span className="text-left block">
                  <span className="text-xs font-bold block text-gray-800">Upload Exam Paper</span>
                  <span className="text-[10px] text-gray-400 font-sans block">ප්‍රශ්න පත්‍රයක් අප්ලෝඩ් කරන්න</span>
                </span>
              </div>
              <span className="text-gray-300 group-hover:text-indigo-500 font-mono text-xs">→</span>
            </button>

            <button className="w-full p-3 bg-white hover:bg-purple-50/50 border border-gray-200 hover:border-purple-300 text-gray-700 font-medium text-xs rounded-xl transition-all duration-200 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span className="p-1.5 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100/70">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
                <span className="text-left block">
                  <span className="text-xs font-bold block text-gray-800">Create MCQ Quiz</span>
                  <span className="text-[10px] text-gray-400 font-sans block">නව ක්විස් තරඟයක් සාදන්න</span>
                </span>
              </div>
              <span className="text-gray-300 group-hover:text-purple-500 font-mono text-xs">→</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;