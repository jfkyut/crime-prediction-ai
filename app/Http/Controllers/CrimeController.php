<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class CrimeController extends Controller
{
    public function create()
    {
        return Inertia::render('Main');
    }

    public function store(Request $request)
    {
        $system = [
            [
                "role" => "system",
                "content" => "You are a crime prediction app. Generate a possible crime for that can be applied depending on a situation that describe by the user."
            ]
        ];

        $user = [
            [
                "role" => "user",
                "content" => $request->input('prompt')
            ]
        ];

        $messages = array_merge($system, $user);

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . env('OPENAI_KEY')
        ])->post('https://api.openai.com/v1/chat/completions', [
            "model" => "gpt-3.5-turbo-1106",
            "messages" => $messages,
        ]);

        if ($response->ok()) {
            return response($response->json()['choices'][0]['message']['content']);
        } else {
            return abort(500, "Something went wrong!");
        }
    }
}
