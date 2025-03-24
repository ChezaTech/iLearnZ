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
        Schema::create('school_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('event_type'); // academic, meeting, sports, cultural, performance, training, etc.
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->string('location')->nullable();
            $table->foreignId('organizer_id')->constrained('users')->onDelete('cascade');
            $table->boolean('is_public')->default(true);
            $table->boolean('requires_registration')->default(false);
            $table->integer('max_participants')->nullable();
            $table->date('registration_deadline')->nullable();
            $table->enum('status', ['planning', 'scheduled', 'cancelled', 'completed'])->default('planning');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_events');
    }
};
