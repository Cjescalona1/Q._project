<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Provider extends Authenticable
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table='provider';
    protected $fillable= [
        'name',
        'description',
        'location',
        'email',
        'password',
        'rating',
        'image',
        'phone'
    ];
}
