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
        // Check if the column doesn't already exist
        if (!Schema::hasColumn('schools', 'school_hours')) {
            Schema::table('schools', function (Blueprint $table) {
                $table->string('school_hours')->nullable()->after('teacher_count');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('schools', 'school_hours')) {
            Schema::table('schools', function (Blueprint $table) {
                $table->dropColumn('school_hours');
            });
        }
    }
};
