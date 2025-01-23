<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Appointment extends Model
{
  
    use HasFactory;
    protected $table='appointment';
    protected $fillable= [
        'title',
        'start',
        'end',
        'status',
        'rating',
        'service_id',
        'consumer_id',
        'provider_id'
    ];
    public $timestamps = false;
}

