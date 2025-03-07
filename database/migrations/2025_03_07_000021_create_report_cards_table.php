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
        Schema::create('report_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('class_id')->constrained()->onDelete('cascade');
            $table->foreignId('school_id')->constrained()->onDelete('cascade');
            $table->string('term');
            $table->string('academic_year');
            $table->date('issue_date');
            $table->json('subject_grades'); // JSON structure with subject_id, grade, comments
            $table->decimal('average_grade', 5, 2)->nullable();
            $table->integer('rank_in_class')->nullable();
            $table->text('teacher_comments')->nullable();
            $table->text('principal_comments')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->boolean('parent_acknowledged')->default(false);
            $table->timestamp('parent_acknowledged_at')->nullable();
            $table->timestamps();
            
            // Ensure a student has only one report card per class per term per academic year
            $table->unique(['student_id', 'class_id', 'term', 'academic_year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_cards');
    }
};
