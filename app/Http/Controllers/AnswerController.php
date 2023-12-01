<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Answer;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreAnswerRequest;
use Illuminate\Support\Facades\Crypt;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $answers = Auth::user()->answers()->latest()->paginate(10);

        foreach ($answers as $answer) {
            $answer['situation'] = Crypt::decryptString($answer['situation']);
            $answer['response'] = Crypt::decryptString($answer['response']);
            $answer['description'] = Crypt::decryptString($answer['description']);
        }

        return Inertia::render('Answer/Index', ['answers' => $answers]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnswerRequest $request)
    {
        $newAnswer = $request->validated();

        $newAnswer['situation'] = Crypt::encryptString($newAnswer['situation']);
        $newAnswer['response'] = Crypt::encryptString($newAnswer['response']);
        $newAnswer['description'] = Crypt::encryptString($newAnswer['description']);

        Auth::user()->answers()->create($newAnswer);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $answer = Auth::user()->answers()->where('id', $id)->first();

        $answer['situation'] = Crypt::decryptString($answer['situation']);
        $answer['response'] = Crypt::decryptString($answer['response']);
        $answer['description'] = Crypt::decryptString($answer['description']);

        return Inertia::render('Answer/Show', ['answer' => $answer]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Answer $answer)
    {
        $answer->delete();

        return redirect(route('answer.index'));
    }
}
