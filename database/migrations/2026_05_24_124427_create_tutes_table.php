<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
     Schema::create('tutes', function (Blueprint $table) {
        $table->id();                                 // Auto-incrementing primary key (id)
        $table->string('title');                      // Tute Title / Topic
        $table->string('grade');                      // Target Grade (e.g., "11")
        $table->string('lesson');                     // Lesson Number (e.g., "05")
        $table->string('status')->default('Active');  // Visibility status ('Active' or 'Draft')
        $table->timestamps();                         // Automatically adds 'created_at' and 'updated_at' columns
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tutes');
    }
};
