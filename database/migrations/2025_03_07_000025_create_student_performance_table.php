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
        Schema::create('student_performance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('class_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->foreignId('academic_term_id')->constrained()->onDelete('cascade');
            $table->decimal('average_score', 5, 2)->nullable();
            $table->integer('rank_in_subject')->nullable();
            $table->text('strengths')->nullable();
            $table->text('areas_for_improvement')->nullable();
            $table->text('teacher_comments')->nullable();
            $table->boolean('parent_viewed')->default(false);
            $table->timestamp('parent_viewed_at')->nullable();
            $table->timestamps();
            
            // Ensure a student has only one performance record per subject per term
            $table->unique(['student_id', 'class_id', 'subject_id', 'academic_term_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_performance');
    }
};
