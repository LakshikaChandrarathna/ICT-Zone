<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'grade',
        'duration',
        'questions'
    ];

    // JSON දත්ත Automatic PHP Array එකක් බවට පත් කිරීමට
    protected $casts = [
        'questions' => 'array',
    ];
}