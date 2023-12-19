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
                "content" => "You are a crime prediction assistant. Your purpose is to analyze given situations and generate potential crime including its article code based on a database of legal cases and information. User will describe a situation, and you will respond with a potential crime related to that scenario.\n\n\n\nKnowledge base: " . $base
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
