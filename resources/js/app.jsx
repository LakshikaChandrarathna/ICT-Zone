import './bootstrap';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import { AuthProvider } from "./context/AuthContext"; // 👈 ඔයා දැන් හදපු AuthContext එක import කළා

import Home from "./pages/Home";
import Papers from "./pages/Papers";
import About from "./pages/About";
import Quizzes from "./pages/Quizzes";
import Grade6 from "./pages/Grade6";
import Grade8 from "./pages/Grade8";
import Grade9 from "./pages/Grade9";
import Grade10 from "./pages/Grade10";
import Grade7 from "./pages/Grade7";
import Grade11 from "./pages/Grade11";
import Grade12 from "./pages/Grade12";
import Grade13 from "./pages/Grade13";

// Admin කොටස්
import AdminNav from "./components/AdminNav"; 
import Dashboard from "./pages/Admin/Dashboard";
import TutesMannage from "./pages/Admin/TutesMannage";
import QuizzesMannagement from "./pages/Admin/QuizzesMannagement";
import PapersMannagement from "./pages/Admin/PapersMannagement";

function App() {
    return (
        <AuthProvider> {/* 👈 මුළු ඇප් එකම AuthProvider එකෙන් වට කළා. එවිට එවලේම Navbar එක update වේ */}
            <BrowserRouter>
                <Routes>
                    {/* සාමාන්‍ය පරිශීලක පිටු */}
                    <Route path="/" element={<Home />} />
                    <Route path="/papers" element={<Papers />} />
                    <Route path="/quizzes" element={<Quizzes />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/grade6" element={<Grade6 />} />
                    <Route path="/grade7" element={<Grade7 />} />
                    <Route path="/grade8" element={<Grade8 />} />
                    <Route path="/grade9" element={<Grade9 />} />
                    <Route path="/grade10" element={<Grade10 />} />
                    <Route path="/grade11" element={<Grade11 />} />
                    <Route path="/grade12" element={<Grade12 />} />
                    <Route path="/grade13" element={<Grade13 />} />

                    {/* Admin පිටු */}
                    <Route path="/admin" element={<AdminNav />}>
                        <Route index element={<Navigate to="/admin/dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="tutes" element={<TutesMannage />} />
                        <Route path="papers" element={<PapersMannagement />} />
                        <Route path="quizzes" element={<QuizzesMannagement />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);