<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Crypt;
use App\Providers\RouteServiceProvider;
use Illuminate\Database\QueryException;
use Laravel\Socialite\Facades\Socialite;
use GuzzleHttp\Exception\ClientException;
use Laravel\Socialite\Two\InvalidStateException;

class OAuthController extends Controller
{
    public function create($social)
    {
        return Socialite::driver($social)->redirect();
    }

    public function store($social)
    {
        try {
            $socialUser = Socialite::driver($social)->user();

            $existingUser = User::where('email', $socialUser->getEmail())->first();

            if ($existingUser) {
                $correctId = $socialUser->getId() === Crypt::decrypt($existingUser['social_id']);

                if ($correctId) {
                    Auth::login($existingUser, true);
                } else {
                    return redirect(route('login'));
                }
            } else {
                $newUser = User::create([
                    'social' => $social,
                    'social_id' => Crypt::encrypt($socialUser->getId()),
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'email_verified_at' => Date::now('Asia/Manila')->format('Y-m-d'),
                    'has_password' => false
                ]);

                Auth::login($newUser, true);
            }
        } catch (QueryException $err) {
            return redirect(route('login'))
                        ->with('error', 'Error: ' . $err->getCode() . '. Email already registered with different provider.');
        } catch (InvalidStateException $err) {
            return redirect(route('login'))
                        ->with('error', 'Error: ' . $err->getCode() . '. Something went wrong!');
        } catch (ClientException $err) {
            return redirect(route('login'))
                        ->with('error', 'Error: ' . $err->getCode() . '. ' . $err->getMessage());
        }

        return redirect(RouteServiceProvider::HOME);
    }
}
