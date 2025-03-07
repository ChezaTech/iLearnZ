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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('class_id')->constrained()->onDelete('cascade');
            $table->enum('term', ['first', 'second', 'third', 'final']);
            $table->string('academic_year');
            $table->decimal('overall_average', 5, 2);
            $table->integer('class_rank')->nullable();
            $table->text('teacher_comments')->nullable();
            $table->text('principal_comments')->nullable();
            $table->json('subject_scores')->nullable(); // JSON array of subject scores
            $table->boolean('is_published')->default(false);
            $table->foreignId('generated_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            // Ensure a student has only one report per class per term per academic year
            $table->unique(['student_id', 'class_id', 'term', 'academic_year'], 'unique_report');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
