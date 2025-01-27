<?php

use App\Http\Controllers\serviceController;
use App\Http\Controllers\consumerController;
use App\Http\Controllers\providerController;
use App\Http\Controllers\appointmentController;
use App\Http\Controllers\authController; 
use Illuminate\Support\Facades\Route;   

Route::post('/register/prov',[authController::class,'registerProvider']) ;
Route::post('/register/provider',[authController::class,'regP']);
Route::post('/register/consumer',[authController::class,'regC']);
Route::post('/register/cons',[authController::class,'registerConsumer']);
// Route::post('/login',[authController::class,'login']);
Route::post('/login/prov',[authController::class,'loginProvider']);
Route::post('/login/cons',[authController::class,'loginConsumer']);
Route::post('/logout',[authController::class,'logout'])->middleware('auth:sanctum');


Route::get ('/services', [serviceController::class ,'index']);
Route::get ('/services/{id}',[serviceController::class ,'show']);
Route::post('/services/find/',[serviceController::class ,'search']);
Route::post ('/services',[serviceController::class,'store'])->middleware('auth:sanctum');
Route::put ('/services/{id}', [serviceController::class,'update'])->middleware('auth:sanctum');
Route::delete ('/services/{id}',[serviceController::class,'destroy'])->middleware('auth:sanctum');


Route::get ('/consumers', [consumerController::class ,'index']);
Route::get ('/consumers/{id}',[consumerController::class ,'show']);
Route::post ('/consumers',[consumerController::class,'store']);
Route::put ('/consumers/{id}', [consumerController::class,'update']);
Route::delete ('/consumers/{id}',[consumerController::class,'destroy']);
Route::get ('/consumers/appointments/{id}',[consumerController::class ,'showConsumerAppointments']);



Route::get ('/providers', [providerController::class ,'index']);
Route::get ('/providers/{id}',[providerController::class ,'show']);
Route::get ('/providers/services/{id}',[providerController::class ,'showServices']);
Route::get ('/providers/appointments/{id}',[providerController::class ,'showAppointments']);
Route::post ('/providers',[providerController::class,'store']);
Route::put ('/providers/{id}', [providerController::class,'update'])->middleware('auth:sanctum');
Route::delete ('/providers/{id}',[providerController::class,'destroy']);


Route::get ('/appointments', [appointmentController::class ,'index']);
Route::get ('/appointments/{id}',[appointmentController::class ,'show']);
//Route::get ('/appointments/services/{id}',[appointmentController::class ,'showServices']);
Route::post ('/appointments',[appointmentController::class,'store']);
Route::put ('/appointments/{id}', [appointmentController::class,'update']);
Route::delete ('/appointments/{id}',[appointmentController::class,'destroy']);