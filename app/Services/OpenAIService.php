<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class OpenAIService
{
    public function prompt($message)
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . env('OPENAI_KEY')
        ])->post('https://api.openai.com/v1/chat/completions', [
            "model" => "gpt-3.5-turbo-1106",
            "messages" => $message,
        ]);

        if ($response->ok()) {
            return $response->json()['choices'][0]['message']['content'];
        } else {
            return abort(500, "Something went wrong!");
        }
    }
}
