import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'; 

const Quizzes = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentGrade = searchParams.get('grade') || '6-9';
    const [quizzes, setQuizzes] = useState([]);
    
    // Quiz Player States
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    // Backend එකෙ
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

    if (activeQuiz && !showResult) {
        // --- QUIZ PLAYER UI ---
        const q = activeQuiz.questions[currentStep];
        return (
            <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
                <div className="max-w-2xl w-full bg-white p-8 rounded-3xl shadow-xl border">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-xs font-mono font-bold text-blue-600">QUESTION {currentStep + 1} / {activeQuiz.questions.length}</span>
                        <button onClick={() => setActiveQuiz(null)} className="text-xs text-gray-400">Exit</button>
                    </div>
                    <h2 className="text-xl font-bold mb-8">{q.qText}</h2>
                    <div className="space-y-3">
                        {q.options.map((opt, i) => (
                            <button key={i} 
                                onClick={() => handleAnswer(i)}
                                className={`w-full p-4 text-left rounded-2xl border-2 transition-all ${answers[currentStep] === i ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                    <button onClick={nextQuestion} disabled={answers[currentStep] === undefined} className="w-full mt-8 p-4 bg-black text-white rounded-2xl font-bold disabled:opacity-50">
                        {currentStep === activeQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                </div>
            </div>
        );
    }

    if (showResult && quizResultData) {
        // --- RESULT PANEL ---
       
        return (
            <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
                <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl text-center mb-6">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black">
                        {quizResultData.percentage}%
                    </div>
                    <h2 className="text-2xl font-black mb-2">QUIZ COMPLETED!</h2>
                    <p className="text-gray-500 mb-6">You scored {quizResultData.score} out of {quizResultData.totalQuestions}</p>
                    <button onClick={() => setActiveQuiz(null)} className="w-full p-4 bg-blue-600 text-white rounded-2xl font-bold">Back to Quizzes</button>
                </div>

                
                <div className="max-w-md w-full bg-white p-6 rounded-3xl shadow-lg border space-y-4">
                    <h3 className="font-bold border-b pb-2 text-sm">Answers Review</h3>
                    {quizResultData.review.map((item, index) => (
                        <div key={index} className="p-3 border rounded-xl text-sm">
                            <p className="font-semibold mb-2">{index + 1}. {item.question}</p>
                            <p className={`text-xs p-2 rounded mb-1 ${item.isCorrect ? 'bg-green-50 text-green-700 font-medium' : 'bg-red-50 text-red-700 font-medium'}`}>
                                Your Answer: {item.studentAnswer !== null ? item.options[item.studentAnswer] : 'Not Answered'} 
                                {item.isCorrect ? ' (Correct)' : ' (Wrong)'}
                            </p>
                            {!item.isCorrect && (
                                <p className="text-xs p-2 bg-gray-50 text-gray-700 rounded">
                                    Correct Answer: <span className="font-medium text-green-600">{item.options[item.correctAnswer]}</span>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-[#071835]">
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