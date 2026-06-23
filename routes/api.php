<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers Import කිරීම
use App\Http\Controllers\QuizController;
use App\Http\Controllers\LearningResourceController;
use App\Http\Controllers\Api\PaperController;
use App\Http\Controllers\Api\TuteController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// ==========================================
// 1. QUIZ ROUTES 
// ==========================================
Route::prefix('quizzes')->group(function () {
    Route::post('/', [QuizController::class, 'store']);                  // POST -> /api/quizzes
    Route::get('/grade/{grade}', [QuizController::class, 'getByGrade']); // GET  -> /api/quizzes/grade/{grade}
    Route::post('/{id}/submit', [QuizController::class, 'submit']);      // POST -> /api/quizzes/{id}/submit
    Route::delete('/{id}', [QuizController::class, 'destroy']);          // DELETE -> /api/quizzes/{id}
});


// ==========================================
// 2. LEARNING RESOURCE ROUTES
// ==========================================
Route::prefix('learning-resources')->group(function () {
    Route::get('/', [LearningResourceController::class, 'index']); 
    Route::post('/', [LearningResourceController::class, 'store']); 
    Route::delete('/{id}', [LearningResourceController::class, 'destroy']); 
    
   
    Route::get('/grade/{grade}', [LearningResourceController::class, 'getByGrade']); // GET -> /api/learning-resources/grade/6
});


// ==========================================
// 3. PAPER ROUTES
// ==========================================
Route::prefix('papers')->group(function () {
    Route::get('/', [PaperController::class, 'index']);                  // GET  -> /api/papers
    Route::post('/', [PaperController::class, 'store']);                 // POST -> /api/papers
    Route::delete('/{id}', [PaperController::class, 'destroy']);         // DELETE -> /api/papers/{id}
});


// ==========================================
// 4. TUTE ROUTES
// ==========================================
Route::prefix('tutes')->group(function () {
    Route::get('/', [TuteController::class, 'index']);                   // GET  -> /api/tutes
    Route::post('/', [TuteController::class, 'store']);                  // POST -> /api/tutes
    Route::delete('/{id}', [TuteController::class, 'destroy']);          // DELETE -> /api/tutes/{id}
});