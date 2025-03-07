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
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('address');
            $table->string('city');
            $table->string('province');
            $table->string('postal_code')->nullable();
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('principal_name')->nullable();
            $table->enum('type', ['primary', 'secondary', 'combined']);
            $table->enum('connectivity_status', ['online', 'offline', 'hybrid'])->default('offline');
            $table->string('internet_provider')->nullable();
            $table->boolean('has_smartboards')->default(false);
            $table->integer('student_count')->default(0);
            $table->integer('teacher_count')->default(0);
            $table->timestamps();
        });

        // Add foreign key constraint to users table
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('school_id')->references('id')->on('schools')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['school_id']);
        });
        
        Schema::dropIfExists('schools');
    }
};
