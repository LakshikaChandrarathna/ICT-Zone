import './bootstrap';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 

import Home from "./pages/Home";
import Papers from "./pages/Papers";
import About from "./pages/About";
import Quizzes from "./pages/Quizzes";
import Grade6 from "./pages/Grade6";

// Admin කොටස්
import AdminNav from "./components/AdminNav"; 
import Dashboard from "./pages/Admin/Dashboard";
import TutesMannage from "./pages/Admin/TutesMannage";
import QuizzesMannagement from "./pages/Admin/QuizzesMannagement";
import PapersMannagement from "./pages/Admin/PapersMannagement";

function App() {
    return (
        <BrowserRouter>
            <Routes>
               
                <Route path="/" element={<Home />} />
                <Route path="/papers" element={<Papers />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/about" element={<About />} />
                <Route path="/grade6" element={<Grade6 />} />

                
                <Route path="/admin" element={<AdminNav />}>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    
                    <Route path="dashboard" element={<Dashboard />} />
                    
                    <Route path="tutes" element={<TutesMannage/>} />
                    <Route path="papers" element={<PapersMannagement/>} />
                    <Route path="quizzes" element={<QuizzesMannagement/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);