import React, { useState, useEffect } from 'react';

const TutesManage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Laravel Backend API URL
  const API_URL = 'http://localhost:8000/api/tutes'; 

  const [formData, setFormData] = useState({
    title: '',
    grade: '11',
    lesson: '',
    type: 'tute', // default: tute, වෙනත්: video, short_note
    video_url: '',
    status: 'Active'
  });
  
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("පද්ධතියට සම්බන්ධ වීමේ දෝෂයකි!");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert('කරුණාකර මාතෘකාව (Title) ඇතුළත් කරන්න!');
    if (!formData.lesson.trim()) return alert('කරුණාකර පාඩමේ අංකය (Lesson No) ඇතුළත් කරන්න!');
    
    // Resource Type එක අනුව සුදුසු පරිදි Validation සිදුවේ
    if (formData.type === 'video' && !formData.video_url.trim()) {
      return alert('කරුණාකර වීඩියෝවට අදාළ YouTube URL එක ඇතුළත් කරන්න!');
    }
    if ((formData.type === 'tute' || formData.type === 'short_note') && !selectedFile) {
      return alert('කරුණාකර අදාළ PDF/File ගොනුව තෝරන්න!');
    }

    try {
      const dataToSend = new FormData();
      dataToSend.append('title', formData.title);
      dataToSend.append('grade', formData.grade);
      dataToSend.append('lesson', formData.lesson);
      dataToSend.append('type', formData.type);
      dataToSend.append('status', formData.status);
      
      if (formData.type === 'video') {
        dataToSend.append('video_url', formData.video_url);
      } else {
        dataToSend.append('file', selectedFile);
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: dataToSend
      });

      const resData = await response.json();

      if (response.ok) {
        setResources([resData, ...resources]); 
        setFormData({ title: '', grade: '11', lesson: '', type: 'tute', video_url: '', status: 'Active' }); 
        setSelectedFile(null);
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = '';
        alert('දත්ත සාර්ථකව පද්ධතියට එකතු කරන ලදී!');
      } else {
        console.error("Laravel Error:", resData);
        alert(`දත්ත සුරැකීමේදී දෝෂයක් සිදු විය: ${resData.message || 'නැවත උත්සාහ කරන්න.'}`);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert('සේවාදායකයට (Server) සම්බන්ධ විය නොහැක!');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('මෙම දත්තය පද්ධතියෙන් සම්පූර්ණයෙන්ම ඉවත් කිරීමට අවශ්‍යද?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          setResources(resources.filter(res => res.id !== id));
        } else {
          alert('දත්ත ඉවත් කිරීමට නොහැකි විය.');
        }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-6 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl border border-[#b5cbf0]/30 shadow-[0_2px_12px_rgba(7,24,53,0.01)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black uppercase text-[#071835]">Study Portal Resource Management</h2>
          <p className="text-xs text-gray-500 mt-1">ශ්‍රේණි අනුව නිබන්ධන, කෙටි සටහන් සහ වීඩියෝ පාඩම් එක් කිරීම සහ කළමනාකරණය.</p>
        </div>
        <span className="text-[10px] font-mono text-[#5d81bd] bg-[#5d81bd]/10 px-3 py-1.5 rounded-lg font-bold w-fit">
          TOTAL ITEMS: {resources.length}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FORM */}
        <div className="lg:col-span-4 bg-white border border-[#b5cbf0]/30 rounded-2xl shadow-[0_2px_12px_rgba(7,24,53,0.01)] p-6 h-fit sticky top-5">
          <h3 className="font-bold text-[#071835] text-sm uppercase tracking-wide border-b border-gray-100 pb-3 mb-4">
            Upload New Resource
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            
            {/* RESOURCE TYPE SELECTOR */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 block">Resource Type (සම්පත් වර්ගය)</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-semibold outline-none transition-all"
              >
                <option value="tute">Tute (නිබන්ධන PDF)</option>
                <option value="short_note">Short Note (කෙටි සටහන් PDF)</option>
                <option value="video">Video (වීඩියෝ පාඩම්)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 block">Title / Topic Name</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Introduction to Computers Summary"
                className="w-full px-3.5 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-medium outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 block">Grade</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-semibold outline-none transition-all"
                >
                  <option value="6">Grade 6</option>
                  <option value="7">Grade 7</option>
                  <option value="8">Grade 8</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                  <option value="13">Grade 13</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 block">Lesson No</label>
                <input
                  type="number"
                  name="lesson"
                  value={formData.lesson}
                  onChange={handleInputChange}
                  placeholder="e.g. 1, 2"
                  className="w-full px-3 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-medium outline-none transition-all"
                />
              </div>
            </div>

            {/* DYNAMIC FORM FIELDS BASED ON TYPE */}
            {formData.type === 'video' ? (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 block">YouTube Video Embed URL</label>
                <input
                  type="url"
                  name="video_url"
                  value={formData.video_url}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full px-3.5 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-medium outline-none transition-all"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 block">Upload Document (PDF, Doc)</label>
                <input
                  id="fileInput"
                  type="file"
                  accept=".pdf,.doc,.docx,.zip"
                  onChange={handleFileChange}
                  className="w-full px-2 py-2 bg-[#fafbfc] border border-gray-200 rounded-xl text-xs font-medium outline-none transition-all file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#5d81bd]/10 file:text-[#5d81bd] hover:file:bg-[#5d81bd]/20"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 block">Visibility Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-semibold outline-none transition-all"
              >
                <option value="Active">Active (ප්‍රසිද්ධ කරන්න)</option>
                <option value="Draft">Draft (සඟවා තබන්න)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 bg-[#071835] hover:bg-[#5d81bd] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Save & Publish Resource
            </button>
          </form>
        </div>

        {/* TABLE */}
        <div className="lg:col-span-8 bg-white border border-[#b5cbf0]/30 rounded-2xl shadow-[0_2px_12px_rgba(7,24,53,0.01)] p-6">
          <h3 className="font-bold text-[#071835] text-sm uppercase tracking-wide border-b border-gray-100 pb-3 mb-4">
            Uploaded Resources List
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-gray-400 font-mono text-[10px] uppercase tracking-wider bg-gray-50/70 rounded-xl">
                  <th className="py-3 px-4 rounded-l-xl">Lesson</th>
                  <th className="py-3 px-4">Title / Resource Link</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-r-xl text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-[#071835]/90">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-400">දත්ත පූරණය වෙමින් පවතී...</td>
                  </tr>
                ) : resources.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-400">තවමත් කිසිදු සම්පතක් ඇතුළත් කර නොමැත.</td>
                  </tr>
                ) : (
                  resources.map((res) => (
                    <tr key={res.id} className="hover:bg-[#fafbfc] transition-colors group">
                      <td className="py-3.5 px-4 font-mono text-[#5d81bd] font-bold">#{res.lesson}</td>
                      <td className="py-3.5 px-4 font-sans text-gray-700 max-w-[200px] truncate group-hover:text-[#5d81bd] transition-colors">
                        {res.type === 'video' ? (
                          <a href={res.video_url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1.5 text-blue-600">
                            <span className="shrink-0">📺</span> {res.title}
                          </a>
                        ) : res.file_url ? (
                          <a href={res.file_url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1.5">
                            <span className="shrink-0">{res.type === 'tute' ? '📕' : '📝'}</span> {res.title}
                          </a>
                        ) : (
                          res.title
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          res.type === 'tute' ? 'bg-blue-50 text-blue-700' :
                          res.type === 'short_note' ? 'bg-amber-50 text-amber-700' : 'bg-purple-50 text-purple-700'
                        }`}>
                          {res.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-gray-500">Grade {res.grade}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          res.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleDelete(res.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 12m-4.72 0-.34-12M9.25 12h5.5M12 5.25c1.135 0 2.098-.845 2.192-1.976a48.567 48.567 0 0 0-4.384 0C10.155 4.405 11.118 5.25 12 5.25ZM2.25 5.75h19.5" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TutesManage;