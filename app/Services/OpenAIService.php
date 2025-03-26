<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class OpenAIService
{
    public function prompt($initialPrompt, $message)
    {
        $response = Http::withHeaders([
            'x-goog-api-key' => env('GEMINI_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [
                        [
                            'text' => $initialPrompt . 'user message: ' . $message
                        ]
                    ]
                ]
            ]
        ]);

        if (isset($response->json()['candidates'][0]['content'])) {
            return $response->json()['candidates'][0]['content']['parts'][0]['text']; 
        } else {
            return 'Too sensitive. Please try again.';
        }
    }
}
