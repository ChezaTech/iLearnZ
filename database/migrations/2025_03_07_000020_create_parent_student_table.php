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
        Schema::create('parent_student', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->enum('relationship', ['father', 'mother', 'guardian', 'other'])->default('other');
            $table->boolean('is_emergency_contact')->default(false);
            $table->boolean('can_pickup')->default(false);
            $table->boolean('receives_reports')->default(true);
            $table->boolean('receives_notifications')->default(true);
            $table->timestamps();
            
            // Ensure a student can only be linked to a parent once
            $table->unique(['parent_id', 'student_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parent_student');
    }
};
