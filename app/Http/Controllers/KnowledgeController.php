<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Knowledge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Knowledge\NewKnowledgeFileRequest;

class KnowledgeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Knowledge/Index', [
            'knowledgeList' => Knowledge::latest()->paginate(20)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(NewKnowledgeFileRequest $request)
    {
        $newFile = $request->file('knowledge');
        $path = $newFile->store('/knowledge');

        if ($path) {
            Knowledge::create([
                'name' => $newFile->getClientOriginalName(),
                'path' => $path
            ]);
        }

        return back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Knowledge $knowledge)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Knowledge $knowledge)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Knowledge $knowledge)
    {
        if (Storage::exists($knowledge['path'])) {
            Storage::delete($knowledge['path']);
        }

        try {
            $knowledge->delete();

            return back();
        } catch (\LogicException) {
            return abort(500);
        }
    }
}
