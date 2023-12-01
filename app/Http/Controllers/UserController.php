<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Index', ['users' => User::latest()->paginate(20)]);
    }

    public function promote(User $user)
    {
        $user->update(['is_admin' => true]);

        return back();
    }

    public function destroy(User $user)
    {
        $user->delete();

        return back();
    }
}
