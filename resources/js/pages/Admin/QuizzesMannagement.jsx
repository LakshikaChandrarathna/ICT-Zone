import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const QuizzesManagement = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        grade: '6-9', 
        duration: '20',
        questions: [] 
    });

    const [currQ, setCurrQ] = useState({ qText: '', options: ['', '', '', ''], correct: 0 });

    const fetchQuizzes = async () => {
        try {
         
            const grades = ['6-9', 'ol', 'al'];
            let allQuizzes = [];
            
            for (const g of grades) {
                const res = await axios.get(`http://127.0.0.1:8000/api/quizzes/grade/${g}`);
                allQuizzes = [...allQuizzes, ...res.data];
            }
            setQuizzes(allQuizzes);
        } catch (error) {
            console.error("Quizzes Load කිරීමේදී දෝෂයක්:", error);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    
    const addQuestionToQuiz = () => {
        if (!currQ.qText) return alert("ප්‍රශ්නය ඇතුළත් කරන්න");
        
        if (currQ.options.some(opt => opt.trim() === '')) return alert("සියලුම පිළිතුරු (Options 4) ඇතුළත් කරන්න");
        
        setFormData({ ...formData, questions: [...formData.questions, currQ] });
        setCurrQ({ qText: '', options: ['', '', '', ''], correct: 0 });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.questions.length === 0) return alert('අවම වශයෙන් එක ප්‍රශ්නයක්වත් ඇතුළත් කරන්න!');

        try {
           
            const response = await axios.post('http://127.0.0.1:8000/api/quizzes/create', formData);
            alert(response.data.message);
            
            
            setFormData({ title: '', grade: '6-9', duration: '20', questions: [] });
           
            fetchQuizzes();
        } catch (error) {
            console.error(error);
            alert("දත්ත ඇතුළත් කිරීමේදී දෝෂයක් සිදුවිය. (Backend එක ක්‍රියාත්මකදැයි පරීක්ෂා කරන්න)");
        }
    };

   
    const handleDelete = async (id) => {
        if (window.confirm('මෙම Quiz එක සම්පූර්ණයෙන්ම මකා දැමීමට අවශ්‍යද?')) {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/api/quizzes/${id}`);
                alert(response.data.message);
                
                
                fetchQuizzes();
            } catch (error) {
                console.error("Delete කිරීමේදී දෝෂයක්:", error);
                alert("Quiz එක මකා දැමීමට නොහැකි විය.");
            }
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen font-sans">
            <h2 className="text-2xl font-bold mb-6">Manage Quizzes (Admin)</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form එක */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                    <h3 className="font-bold mb-4 border-b pb-2">Create New Quiz</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Quiz Title" className="w-full p-2 border rounded-lg" required />
                        <div className="flex gap-4">
                            <select name="grade" value={formData.grade} onChange={handleInputChange} className="w-full p-2 border rounded-lg">
                                <option value="6-9">Grade 6-9</option>
                                <option value="ol">O/L</option>
                                <option value="al">A/L</option>
                            </select>
                            <input name="duration" type="number" value={formData.duration} onChange={handleInputChange} placeholder="Time (Mins)" className="w-full p-2 border rounded-lg" required />
                        </div>

                        
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <p className="text-sm font-bold mb-2">Add Question ({formData.questions.length} Added)</p>
                            <input value={currQ.qText} onChange={e => setCurrQ({...currQ, qText: e.target.value})} placeholder="Question Text" className="w-full p-2 mb-2 border rounded" />
                            <div className="grid grid-cols-2 gap-2">
                                {currQ.options.map((opt, i) => (
                                    <input key={i} value={opt} onChange={e => {
                                        const newOpts = [...currQ.options];
                                        newOpts[i] = e.target.value;
                                        setCurrQ({...currQ, options: newOpts});
                                    }} placeholder={`Option ${i+1}`} className="p-2 border rounded text-sm" />
                                ))}
                            </div>
                            <select value={currQ.correct} onChange={e => setCurrQ({...currQ, correct: parseInt(e.target.value)})} className="w-full p-2 mt-2 border rounded text-sm">
                                {currQ.options.map((_, i) => <option key={i} value={i}>Correct Answer: Option {i+1}</option>)}
                            </select>
                            <button type="button" onClick={addQuestionToQuiz} className="w-full mt-3 p-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Add Question to List</button>
                        </div>

                        <button type="submit" className="w-full p-3 bg-black text-white rounded-xl font-bold">Save All & Activate Quiz</button>
                    </form>
                </div>

              
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                    <h3 className="font-bold mb-4 border-b pb-2">Active Quizzes (Database)</h3>
                    <div className="space-y-3">
                        {quizzes.length > 0 ? quizzes.map(quiz => (
                            <div key={quiz.id} className="flex justify-between items-center p-3 border rounded-xl hover:bg-gray-50">
                                <div>
                                    <p className="font-bold text-sm">{quiz.title}</p>
                                    <p className="text-[10px] text-gray-500 uppercase">{quiz.grade} | {quiz.questions ? quiz.questions.length : 0} Questions</p>
                                </div>
                                <button onClick={() => handleDelete(quiz.id)} className="text-red-500 text-sm font-semibold hover:underline">Delete</button>
                            </div>
                        )) : (
                            <p className="text-gray-400 text-sm">Database එකේ දැනට Quizzes කිසිවක් නැත.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizzesManagement;