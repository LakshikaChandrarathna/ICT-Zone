<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    // 1. CREATE QUIZ (Teacher/Admin පසෙන් Quiz එකක් එකතු කිරීම)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'grade' => 'required|string|in:6-9,ol,al',
            'duration' => 'required|integer',
            'questions' => 'required|array|min:1',
            'questions.*.qText' => 'required|string',
            'questions.*.options' => 'required|array|min:2',
            'questions.*.correct' => 'required|integer'
        ]);

        $quiz = Quiz::create($validated);

        return response()->json([
            'message' => 'Quiz එක සාර්ථකව පද්ධතියට ඇතුළත් කළා!',
            'quiz' => $quiz
        ], 201);
    }

    // 2. GET ALL QUIZZES BY GRADE (Student ට පෙන්වීමට - මෙහිදී correct answer එක හංගනවා)
    public function getByGrade($grade)
    {
        $quizzes = Quiz::where('grade', $grade)->get();

        // Security: Student ට ප්‍රශ්න පත්‍රය යවද්දී correct answer එක අයින් කරලා යවන්න
        $securedQuizzes = $quizzes->map(function ($quiz) {
            $questions = collect($quiz->questions)->map(function ($q) {
                unset($q['correct']); // Correct Index එක හංගන්න
                return $q;
            });
            $quiz->questions = $questions;
            return $quiz;
        });

        return response()->json($securedQuizzes, 200);
    }

    // 3. SUBMIT QUIZ & EVALUATE MARKS (පිළිතුරු පරීක්ෂා කර ලකුණු ලබාදීම)
    public function submit(Request $request, $id)
    {
        $quiz = Quiz::findOrFail($id);
        $studentAnswers = $request->input('studentAnswers', []); // ළමයා එවපු Answers array එක

        $score = 0;
        $review = [];
        $questions = $quiz->questions;

        foreach ($questions as $index => $question) {
            // නිවැරදි පිළිතුර (Database එකේ තියෙන එක)
            $correctIndex = $question['correct'];
            // සිසුවා තෝරාගත් පිළිතුර (Frontend එකෙන් එවපු එක)
            $studentSelection = $studentAnswers[$index] ?? null;

            $isCorrect = ($studentSelection !== null && (int)$studentSelection === (int)$correctIndex);

            if ($isCorrect) {
                $score++;
            }

            // Review Panel එකට අවශ්‍ය දත්ත සැකසීම
            $review[] = [
                'question' => $question['qText'],
                'options' => $question['options'],
                'studentAnswer' => $studentSelection,
                'correctAnswer' => $correctIndex,
                'isCorrect' => $isCorrect
            ];
        }

        $totalQuestions = count($questions);
        $percentage = $totalQuestions > 0 ? round(($score / $totalQuestions) * 100) : 0;

        return response()->json([
            'score' => $score,
            'totalQuestions' => $totalQuestions,
            'percentage' => $percentage,
            'review' => $review
        ], 200);
    }

    // 4. DELETE QUIZ (Quiz මකා දැමීම)
    public function destroy($id)
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->delete();

        return response()->json(['message' => 'Quiz එක සාර්ථකව මකා දමන ලදී.'], 200);
    }
}