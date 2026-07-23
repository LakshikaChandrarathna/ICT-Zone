import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; 

axios.defaults.baseURL = 'http://localhost:8000'; 

const Navbar = () => {
  const { user, login, logout } = useContext(AuthContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Scroll State for Navbar background transition
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  // Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/login', loginData);
      
      login(res.data.user, res.data.access_token); 
      
      setShowLogin(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid Email or Password!');
    } finally {
      setLoading(false);
    }
  };

  // Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/register', registerData);
      
      login(res.data.user, res.data.access_token); 
      
      setShowRegister(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Validation failed!');
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const handleLogout = async () => {
    const token = sessionStorage.getItem('token');
    try {
      await axios.post('/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Server logout failed', err);
    } finally {
      logout(); 
      setShowDropdown(false);
    }
  };

  return (
    <>
      <nav 
        className={`flex items-center justify-between px-6 md:px-16 py-1 sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#01060e]/75 backdrop-blur-md border-b border-[#071835]/80 shadow-lg' 
            : 'bg-[#010813]/40 backdrop-blur-md border-b border-[#071835]/30'
        }`}
      >
        {/* --- LOGO --- */}
        <div className="flex items-center"> 
          <Link to="/" className="flex items-center group pl-0"> 
            <img 
              src="/src/images/logo.png"
              alt="ICTZone Logo" 
              className="-ml-3 h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* --- NAVIGATION LINKS --- */}
        <div className="hidden lg:flex items-center space-x-8 font-mono text-[11px] uppercase tracking-widest text-[#b5cbf0]/80">
          <Link to="/" className="relative py-1 hover:text-white transition-colors group">
            Home <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#5d81bd] transition-all duration-300 group-hover:w-full" />
          </Link>
          <span className="text-[#5d81bd]/30 text-[9px]">•</span>
          <Link to="/papers" className="relative py-1 hover:text-white transition-colors group">
            Past_Papers <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#5d81bd] transition-all duration-300 group-hover:w-full" />
          </Link>
          <span className="text-[#5d81bd]/30 text-[9px]">•</span>
          <Link to="/quizzes" className="relative py-1 hover:text-white transition-colors group">
            Quizzes <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#5d81bd] transition-all duration-300 group-hover:w-full" />
          </Link>
          <span className="text-[#5d81bd]/30 text-[9px]">•</span>
          <Link to="/about" className="relative py-1 hover:text-white transition-colors group">
            About <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#5d81bd] transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        {/* --- ACTIONS / REAL-TIME USER PROFILE --- */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="relative flex flex-col items-center">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-8 h-8 rounded-full bg-[#071835] border border-[#5d81bd]/40 flex items-center justify-center text-[#5d81bd] hover:border-[#5d81bd] transition-all focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </button>
              
              <span className="text-[10px] font-mono text-[#b5cbf0]/70 mt-1 max-w-[80px] truncate text-center">
                {user.name.split(' ')[0]}
              </span>

              {showDropdown && (
                <div className="absolute right-0 top-14 w-40 bg-[#01060e] border border-[#071835] rounded-lg shadow-2xl p-1 z-50 font-mono text-[11px]">
                  <div className="px-3 py-2 text-[#5d81bd] border-b border-[#071835]/60 mb-1 font-bold truncate">
                    {user.email}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded transition-colors uppercase font-bold"
                  >
                    Logout_
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button 
                onClick={() => { setShowLogin(true); setError(''); }} 
                className="hidden sm:block font-mono font-bold text-[11px] uppercase tracking-wider text-[#b5cbf0]/60 hover:text-white transition-colors"
              >
                Sign_In
              </button>
              
              <button 
                onClick={() => { setShowRegister(true); setError(''); }} 
                className="px-4 py-2 border border-[#5d81bd] text-[#5d81bd] rounded font-mono font-bold text-[11px] uppercase tracking-wider hover:bg-[#5d81bd] hover:text-[#010813] transition-all duration-200 active:scale-[0.98]"
              >
                Join_Free
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ==================== LOGIN MODAL ==================== */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#01060e] border border-[#071835] w-full max-w-md rounded-xl p-6 shadow-2xl relative text-[#b5cbf0]">
            <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-[#5d81bd] hover:text-white font-mono text-sm">✕</button>
            <h3 className="text-xl font-mono font-black text-white uppercase tracking-wider mb-4">// EXECUTE_LOGIN</h3>
            {error && <div className="p-3 mb-4 text-xs font-mono bg-red-900/30 border border-red-500/40 text-red-400 rounded">{error}</div>}
            
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-[#5d81bd] uppercase mb-1">Email_Address</label>
                <input type="email" name="email" required onChange={handleLoginChange} className="w-full px-4 py-2.5 rounded border border-[#071835] bg-[#010813] text-xs font-mono focus:outline-none focus:border-[#5d81bd]" />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-[#5d81bd] uppercase mb-1">Password</label>
                <input type="password" name="password" required onChange={handleLoginChange} className="w-full px-4 py-2.5 rounded border border-[#071835] bg-[#010813] text-xs font-mono focus:outline-none focus:border-[#5d81bd]" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-[#071835] hover:bg-[#5d81bd] border border-[#5d81bd]/30 text-[#b5cbf0] hover:text-[#010813] font-mono font-bold text-xs rounded transition-all">
                {loading ? 'AUTHENTICATING...' : 'SIGN_IN_'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================== REGISTER MODAL ==================== */}
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#01060e] border border-[#071835] w-full max-w-md rounded-xl p-6 shadow-2xl relative text-[#b5cbf0]">
            <button onClick={() => setShowRegister(false)} className="absolute top-4 right-4 text-[#5d81bd] hover:text-white font-mono text-sm">✕</button>
            <h3 className="text-xl font-mono font-black text-white uppercase tracking-wider mb-4">// CREATE_ACCOUNT</h3>
            {error && <div className="p-3 mb-4 text-xs font-mono bg-red-900/30 border border-red-500/40 text-red-400 rounded">{error}</div>}
            
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-[#5d81bd] uppercase mb-1">Full_Name</label>
                <input type="text" name="name" required onChange={handleRegisterChange} className="w-full px-4 py-2.5 rounded border border-[#071835] bg-[#010813] text-xs font-mono focus:outline-none focus:border-[#5d81bd]" />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-[#5d81bd] uppercase mb-1">Email_Address</label>
                <input type="email" name="email" required onChange={handleRegisterChange} className="w-full px-4 py-2.5 rounded border border-[#071835] bg-[#010813] text-xs font-mono focus:outline-none focus:border-[#5d81bd]" />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-[#5d81bd] uppercase mb-1">Password</label>
                <input type="password" name="password" required onChange={handleRegisterChange} className="w-full px-4 py-2.5 rounded border border-[#071835] bg-[#010813] text-xs font-mono focus:outline-none focus:border-[#5d81bd]" />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-[#5d81bd] uppercase mb-1">Confirm_Password</label>
                <input type="password" name="password_confirmation" required onChange={handleRegisterChange} className="w-full px-4 py-2.5 rounded border border-[#071835] bg-[#010813] text-xs font-mono focus:outline-none focus:border-[#5d81bd]" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-[#071835] hover:bg-[#5d81bd] border border-[#5d81bd]/30 text-[#b5cbf0] hover:text-[#010813] font-mono font-bold text-xs rounded transition-all">
                {loading ? 'REGISTERING...' : 'JOIN_NOW_'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;