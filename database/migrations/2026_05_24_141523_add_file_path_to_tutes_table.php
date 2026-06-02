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
        Schema::table('tutes', function (Blueprint $table) {
            // status කොලමට පසුව file_path නමින් අලුත් කොලමයක් එකතු කිරීම
            $table->string('file_path')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tutes', function (Blueprint $table) {
            // Migration එක rollback කලහොත් file_path කොලම අයින් කිරීම
            $table->dropColumn('file_path');
        });
    }
};