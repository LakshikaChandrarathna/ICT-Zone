import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'; 
import Navbar from '@/Components/Navbar'; 

const Quizzes = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentGrade = searchParams.get('grade') || '6-9';
    const [quizzes, setQuizzes] = useState([]);
    
    // Quiz Player States
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    // Backend එකෙන් ලැබෙන Data
    const [quizResultData, setQuizResultData] = useState(null);

    useEffect(() => {
        const fetchQuizzesByGrade = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/quizzes/grade/${currentGrade}`);
                setQuizzes(response.data);
            } catch (error) {
                console.error("Quizzes Fetch කිරීමේදී දෝෂයක්:", error);
            }
        };

        fetchQuizzesByGrade();
    }, [currentGrade]); 

    const startQuiz = (quiz) => {
        setActiveQuiz(quiz);
        setCurrentStep(0);
        setAnswers({});
        setShowResult(false);
        setQuizResultData(null); 
    };

    const handleAnswer = (optionIndex) => {
        setAnswers({ ...answers, [currentStep]: optionIndex });
    };

    const nextQuestion = async () => {
        if (currentStep < activeQuiz.questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/api/quizzes/${activeQuiz.id}/submit`, {
                    studentAnswers: answers
                });
      
                setQuizResultData(response.data);
                setShowResult(true);
            } catch (error) {
                console.error("Quiz එක Submit කිරීමේදී දෝෂයක් සිදුවිය:", error);
                alert("පිළිතුරු පද්ධතියට ඇතුළත් කිරීමට නොහැකි විය.");
            }
        }
    };

    // --- COMPACT & MODERN QUIZ PLAYER UI ---
    if (activeQuiz && !showResult) {
        const q = activeQuiz.questions[currentStep];
        const progressPercentage = ((currentStep + 1) / activeQuiz.questions.length) * 100;

        return (
            <div className="min-h-screen bg-slate-50 py-6 px-4 flex justify-center items-center font-sans antialiased">
                <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col justify-between transition-all">
                    
                    {/* Header with Progress Bar */}
                    <div>
                        <div className="p-5 flex justify-between items-center bg-slate-50/50 border-b border-slate-100">
                            <div>
                                <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase block mb-0.5">Progress</span>
                                <div className="text-base font-black text-slate-800">
                                    Question {currentStep + 1} <span className="text-xs font-medium text-slate-400">/ {activeQuiz.questions.length}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setActiveQuiz(null)} 
                                className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-red-500 bg-white hover:bg-red-50 border border-slate-200 rounded-lg shadow-sm transition-all"
                            >
                                Quit
                            </button>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-slate-100">
                            <div 
                                className="h-full bg-blue-600 transition-all duration-300 ease-out" 
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Question and Options Body */}
                    <div className="p-6 flex-1">
                        <h2 className="text-lg font-bold text-slate-800 mb-5 leading-snug">
                            {q.qText}
                        </h2>
                        
                        <div className="space-y-2.5">
                            {q.options.map((opt, i) => {
                                const isSelected = answers[currentStep] === i;
                                return (
                                    <button 
                                        key={i} 
                                        onClick={() => handleAnswer(i)}
                                        className={`w-full p-3.5 text-left rounded-xl border-2 text-sm font-semibold text-slate-700 transition-all duration-150 flex items-center justify-between group ${
                                            isSelected 
                                            ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-sm' 
                                            : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50/50'
                                        }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                                                isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                                            }`}>
                                                {String.fromCharCode(65 + i)}
                                            </span>
                                            <span className="text-slate-700 font-medium">{opt}</span>
                                        </span>
                                        
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                                            isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                                        }`}>
                                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                        <button 
                            onClick={nextQuestion} 
                            disabled={answers[currentStep] === undefined} 
                            className="w-full p-3 bg-black text-white rounded-xl font-bold text-sm shadow-md hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-30 disabled:pointer-events-none"
                        >
                            {currentStep === activeQuiz.questions.length - 1 ? 'Finish & Submit' : 'Next Question'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- COMPACT & WELL-STRUCTURED RESULT PANEL UI ---
    if (showResult && quizResultData) {
        return (
            <div className="min-h-screen bg-slate-50 py-8 px-4 flex flex-col items-center justify-center font-sans antialiased">
                <div className="max-w-xl w-full grid grid-cols-1 gap-6">
                    
                    {/* Compact Score Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center justify-between relative overflow-hidden">
                        <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-blue-600"></div>
                        
                        <div className="pl-2 text-left">
                            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 font-bold text-[10px] tracking-wider uppercase rounded-md inline-block mb-1">
                                Quiz Completed
                            </span>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Your Performance</h2>
                            <p className="text-xs text-slate-500 mt-1">
                                Correct: <span className="text-slate-800 font-bold">{quizResultData.score}</span> / {quizResultData.totalQuestions} Questions
                            </p>
                        </div>
                        
                        {/* Mini Compact Score Meter */}
                        <div className="w-20 h-20 bg-slate-50 border-2 border-slate-100 rounded-full flex flex-col items-center justify-center shadow-inner relative">
                            <span className="text-lg font-black text-slate-800">{quizResultData.percentage}%</span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
                        </div>
                    </div>

                    {/* Answers Review Section */}
                    <div className="bg-white p-5 rounded-2xl shadow-xl border border-slate-100">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                            <h3 className="font-bold text-slate-800 text-sm">Answers Review</h3>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                Report
                            </span>
                        </div>

                        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                            {quizResultData.review.map((item, index) => (
                                <div key={index} className="p-3 border border-slate-100 rounded-xl bg-slate-50/30 flex flex-col gap-2">
                                    <div className="flex items-start gap-2.5">
                                        <span className="min-w-[20px] h-5 bg-slate-200 text-slate-700 font-bold rounded flex items-center justify-center text-[11px] mt-0.5">
                                            {index + 1}
                                        </span>
                                        <p className="font-bold text-slate-800 text-sm leading-tight">{item.question}</p>
                                    </div>
                                    
                                    <div className="grid gap-1.5 pl-8">
                                        {/* Student's Answer Box */}
                                        <div className={`p-2 rounded-lg border flex items-center justify-between text-[11px] font-semibold ${
                                            item.isCorrect 
                                            ? 'bg-green-50/40 border-green-100 text-green-800' 
                                            : 'bg-red-50/40 border-red-100 text-red-800'
                                        }`}>
                                            <div>
                                                <span className="opacity-70 font-medium">Your Ans: </span>
                                                <span>{item.studentAnswer !== null ? item.options[item.studentAnswer] : 'Not Answered'}</span>
                                            </div>
                                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                                item.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                {item.isCorrect ? '✓' : '✗'}
                                            </span>
                                        </div>
                                        
                                        {/* Correct Answer Box */}
                                        {!item.isCorrect && (
                                            <div className="p-2 bg-blue-50/20 border border-blue-100/30 rounded-lg text-[11px] font-semibold text-slate-600">
                                                <span className="text-blue-600 opacity-90 font-medium">Correct Ans: </span>
                                                <span className="text-slate-800 font-bold">{item.options[item.correctAnswer]}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Button Inside Panel */}
                        <div className="mt-5 pt-3 border-t border-slate-100">
                            <button 
                                onClick={() => setActiveQuiz(null)} 
                                className="w-full p-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-all active:scale-[0.99]"
                            >
                                Back to Quizzes
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-[#071835]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-black mb-8">ICT ZONE <span className="text-blue-600">[QUIZZES]</span></h1>
                
                {/* Tabs */}
                <div className="flex gap-4 mb-10">
                    {['6-9', 'ol', 'al'].map(g => (
                        <button key={g} onClick={() => setSearchParams({grade: g})} 
                            className={`px-6 py-2 rounded-xl font-bold text-xs uppercase border ${currentGrade === g ? 'bg-black text-white' : 'bg-white'}`}>
                            Grade {g}
                        </button>
                    ))}
                </div>

                {/* Quiz Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {quizzes.length > 0 ? quizzes.map(quiz => (
                        <div key={quiz.id} className="p-6 border rounded-2xl hover:shadow-lg transition-all">
                            <h3 className="font-bold text-lg mb-4">{quiz.title}</h3>
                            <div className="flex gap-4 text-xs text-gray-500 mb-6">
                                <span>{quiz.questions ? quiz.questions.length : 0} Questions</span>
                                <span>{quiz.duration} Mins</span>
                            </div>
                            <button onClick={() => startQuiz(quiz)} className="w-full py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all">
                                Start Quiz
                            </button>
                        </div>
                    )) : (
                        <p className="text-gray-400">No quizzes available for this grade yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quizzes;