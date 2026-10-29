<?php

namespace Tests\Unit;

use App\Services\OpenAIService;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class OpenAIServiceTest extends TestCase
{
    public function test_it_sends_an_openai_compatible_chat_completion_request(): void
    {
        config([
            'services.llm.invoke_url' => 'https://llm.example/v1/chat/completions',
            'services.llm.model' => 'test-model',
            'services.llm.api_key' => 'test-api-key',
        ]);

        Http::fake([
            'https://llm.example/v1/chat/completions' => Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => 'Generated answer',
                        ],
                    ],
                ],
            ]),
        ]);

        $answer = app(OpenAIService::class)->prompt('System prompt', 'User message');

        $this->assertSame('Generated answer', $answer);
        Http::assertSent(function (Request $request): bool {
            return $request->url() === 'https://llm.example/v1/chat/completions'
                && $request->hasHeader('Authorization', 'Bearer test-api-key')
                && $request['model'] === 'test-model'
                && $request['messages'] === [
                    ['role' => 'system', 'content' => 'System prompt'],
                    ['role' => 'user', 'content' => 'User message'],
                ];
        });
    }

    public function test_it_rejects_responses_without_message_content(): void
    {
        config([
            'services.llm.invoke_url' => 'https://llm.example/v1/chat/completions',
            'services.llm.model' => 'test-model',
            'services.llm.api_key' => 'test-api-key',
        ]);

        Http::fake([
            'https://llm.example/v1/chat/completions' => Http::response([
                'choices' => [],
            ]),
        ]);

        $this->expectException(\UnexpectedValueException::class);

        app(OpenAIService::class)->prompt('System prompt', 'User message');
    }
}
