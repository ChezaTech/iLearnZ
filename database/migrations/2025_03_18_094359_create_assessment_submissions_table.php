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
        Schema::create('assessment_submissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('assessment_id');
            $table->unsignedBigInteger('student_id');
            $table->text('submission_path');
            $table->text('comments')->nullable();
            $table->integer('score')->nullable();
            $table->unsignedBigInteger('graded_by')->nullable();
            $table->dateTime('submitted_at');
            $table->dateTime('graded_at')->nullable();
            $table->boolean('is_late')->default(false);
            $table->json('metadata')->nullable();
            $table->timestamps();
            
            $table->foreign('assessment_id')->references('id')->on('assessments')->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('graded_by')->references('id')->on('users')->onDelete('cascade');
            
            // Ensure a student can only submit once per assessment
            $table->unique(['assessment_id', 'student_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessment_submissions');
    }
};
