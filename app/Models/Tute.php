<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tute extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'grade',
        'lesson',
        'status',
        'file_path', // අලුතින් එකතු කලා
    ];
}