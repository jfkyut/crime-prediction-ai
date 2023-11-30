<?php

use App\Http\Controllers\CrimeController;
use App\Http\Controllers\GeneratorController;
use App\Http\Controllers\KnowledgeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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



Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Guest/Index');
    });
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/ai-generator', [CrimeController::class, 'create'])->name('dashboard');
    Route::post('/ai-generator', [CrimeController::class, 'store'])->name('generator.store');

    // knowledge
    Route::get('/knowledge', [KnowledgeController::class, 'index'])->name('knowledge.index');
    Route::get('/knowledge/create', [KnowledgeController::class, 'create'])->name('knowledge.create');
    Route::get('/knowledge/{knowledge}', [KnowledgeController::class, 'show'])->name('knowledge.show');
    Route::post('/knowledge', [KnowledgeController::class, 'store'])->name('knowledge.store');
    Route::delete('/knowledge/{knowledge}', [KnowledgeController::class, 'destroy'])->name('knowledge.destroy');
    Route::put('/knowledge/{knowledge}', [KnowledgeController::class, 'update'])->name('knowledge.update');

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/profile/change-password', [ProfileController::class, 'passwordPage'])->name('profile.password');
    Route::get('/profile/edit-email', [ProfileController::class, 'emailPage'])->name('profile.email');
    Route::get('/profile/delete-account', [ProfileController::class, 'deletePage'])->name('profile.delete');
});

require __DIR__.'/auth.php';
