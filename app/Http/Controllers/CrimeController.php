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

        $initialPrompt = "You are a crime prediction assistant. Your purpose is to analyze given situations and generate potential crime including its article code based on a knowledge base of legal cases and information. User will describe a situation, and you will respond with a potential crime related to that scenario with explanation, don't just invent code, if the code does not exist in your knowledge base, just say it is not available in your current knowledge base. This is Philippine base, not US.\n\n\n\nKnowledge base: " . $base;

        return response($this->openAIService->prompt($initialPrompt, $request->input('prompt')));
    }
}
