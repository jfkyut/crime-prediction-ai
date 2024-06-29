<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\CrimeController;
use App\Http\Controllers\KnowledgeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



// Route::middleware('guest')->group(function () {
//     Route::get('/', function () {
//         return Inertia::render('Guest/Index');
//     });
// });

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [CrimeController::class, 'create'])->name('dashboard');
    Route::post('/crime-bot', [CrimeController::class, 'store'])->name('generator.store');

    // answers
    Route::get('/answers', [AnswerController::class, 'index'])->name('answer.index');
    Route::post('/answers', [AnswerController::class, 'store'])->name('answer.store');
    Route::get('/answers/{answer}', [AnswerController::class, 'show'])->name('answer.show');
    Route::delete('/answers/{answer}', [AnswerController::class, 'destroy'])->name('answer.destroy');

    // knowledge
    Route::middleware('is_admin')->group(function () {
        Route::get('/knowledge', [KnowledgeController::class, 'index'])->name('knowledge.index');
        Route::post('/knowledge', [KnowledgeController::class, 'store'])->name('knowledge.store');
        Route::get('/knowledge/{knowledge}', [KnowledgeController::class, 'edit'])->name('knowledge.edit');
        Route::put('/knowledge/{knowledge}', [KnowledgeController::class, 'update'])->name('knowledge.update');
        Route::delete('/knowledge/{knowledge}', [KnowledgeController::class, 'destroy'])->name('knowledge.destroy');

        Route::get('/users', [UserController::class, 'index'])->name('user.index');
        Route::put('/users/{user}', [UserController::class, 'promote'])->name('user.promote');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('user.destroy');
    });

    // profile
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::middleware('has_password')->group(function () {
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::get('/profile/change-password', [ProfileController::class, 'passwordPage'])->name('profile.password');
        Route::get('/profile/edit-email', [ProfileController::class, 'emailPage'])->name('profile.email');
    });
    Route::get('/profile/delete-account', [ProfileController::class, 'deletePage'])->name('profile.delete');
});

require __DIR__.'/auth.php';

