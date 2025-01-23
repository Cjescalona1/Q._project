<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Service extends Model
{
    use HasFactory;
    protected $table='service';
    protected $fillable= [
        'name',
        'description',
        'mode',
        'price',
        'provider_id',
        'image'
    ];
    public $timestamps = false;
}

