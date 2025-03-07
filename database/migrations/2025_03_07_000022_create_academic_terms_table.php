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
        Schema::create('academic_terms', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Term 1", "First Semester"
            $table->string('academic_year'); // e.g., "2024-2025"
            $table->date('start_date');
            $table->date('end_date');
            $table->date('exam_start_date')->nullable();
            $table->date('exam_end_date')->nullable();
            $table->date('report_card_date')->nullable();
            $table->boolean('is_current')->default(false);
            $table->foreignId('school_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            // Ensure unique terms per academic year per school
            $table->unique(['name', 'academic_year', 'school_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_terms');
    }
};
