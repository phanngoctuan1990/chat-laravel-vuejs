<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('chat', 'ChatController@chat');
Route::post('send', 'ChatController@send');
Route::get('get-old-message', 'ChatController@getOldMessage');
Route::post('save-to-session', 'ChatController@saveToSession');
Route::delete('delete-session','ChatController@deleteSession');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
