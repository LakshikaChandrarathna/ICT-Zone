<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('learning_resources', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('grade'); // 10, 11, 12, 13
            $table->integer('lesson'); // Lesson Number
            $table->enum('type', ['tute', 'video', 'short_note']); // සම්පතේ වර්ගය
            $table->string('file_path')->nullable(); // PDF ගොනු සඳහා පථය
            $table->string('video_url')->nullable(); // YouTube Embed Link එක සඳහා
            $table->enum('status', ['Active', 'Draft'])->default('Active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('learning_resources');
    }
};