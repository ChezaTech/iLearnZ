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
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('principal_name')->nullable();
            $table->string('website')->nullable();
            $table->text('description')->nullable();
            $table->enum('type', ['public', 'private', 'charter'])->default('public');
            $table->string('district')->nullable();
            $table->string('region')->nullable();
            $table->string('country')->nullable();
            $table->time('school_start_time')->nullable();
            $table->time('school_end_time')->nullable();
            $table->integer('school_hours')->nullable(); // Total school hours per week
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
