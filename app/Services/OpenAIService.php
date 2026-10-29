<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use UnexpectedValueException;

class OpenAIService
{
    public function prompt($initialPrompt, $message)
    {
        $response = Http::withToken(config('services.llm.api_key'))
            ->acceptJson()
            ->post(config('services.llm.invoke_url'), [
                'model' => config('services.llm.model'),
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => $initialPrompt,
                    ],
                    [
                        'role' => 'user',
                        'content' => $message,
                    ],
                ],
            ])
            ->throw();

        $content = $response->json('choices.0.message.content');

        if (! is_string($content)) {
            throw new UnexpectedValueException('The LLM response did not contain a message.');
        }

        return $content;
    }
}
