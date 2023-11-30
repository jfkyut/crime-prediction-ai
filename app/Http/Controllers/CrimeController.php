<?php

namespace App\Http\Controllers;

use App\Models\Knowledge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Services\OpenAIService;

class CrimeController extends Controller
{
    public $openAIService;
    public function __construct(OpenAIService $openAIService)
    {
        $this->openAIService = $openAIService;
    }

    public function create()
    {
        return Inertia::render('Main');
    }

    public function store(Request $request)
    {
        $collection = [];

        foreach (Knowledge::all() as $knowledge) {
            array_push($collection, Storage::get($knowledge['path']));
        }

        $base = implode("\n\n\n\n", $collection);

        $system = [
            [
                "role" => "system",
                "content" => "You are a crime prediction app. Generate a possible crime for that can be applied depending on a situation that describe by the user.\n\nKnowledge base: " . $base
            ]
        ];

        $user = [
            [
                "role" => "user",
                "content" => $request->input('prompt')
            ]
        ];

        $messages = array_merge($system, $user);

        return response($this->openAIService->prompt($messages));
    }
}
