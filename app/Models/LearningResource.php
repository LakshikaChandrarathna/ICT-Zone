<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class LearningResource extends Model
{
    protected $fillable = ['title', 'grade', 'lesson', 'type', 'file_path', 'video_url', 'status'];

    // JSON Response එකක් යද්දීම File එකට අදාළ සම්පූර්ණ URL එක හැදීමට (Accessor)
    protected $appends = ['file_url'];

    public function getFileUrlAttribute()
    {
        if ($this->file_path) {
            return asset('storage/' . $this->file_path);
        }
        return null;
    }
}