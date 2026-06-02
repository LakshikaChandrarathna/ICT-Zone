<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PaperController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\LearningResourceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// අලුත් කළමනාකරණ පද්ධතිය (Tutes, Videos, Short Notes සියල්ලම මේ හරහා සිදුවේ)
Route::apiResource('tutes', LearningResourceController::class);

// Paper කළමනාකරණය සඳහා Endpoints
Route::get('/papers', [PaperController::class, 'index']);
Route::post('/papers', [PaperController::class, 'store']);
Route::delete('/papers/{id}', [PaperController::class, 'destroy']);

// Quizzes සඳහා Endpoints
Route::prefix('quizzes')->group(function () {
    Route::post('/create', [QuizController::class, 'store']);           // Quiz එකක් සාදන්න
    Route::get('/grade/{grade}', [QuizController::class, 'getByGrade']); // Grade එක අනුව ගන්න
    Route::post('/{id}/submit', [QuizController::class, 'submit']);   // Answers Submit කර ලකුණු ගන්න
    Route::delete('/{id}', [QuizController::class, 'destroy']);     // Quiz එක Delete කරන්න
});