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
        Schema::create('reading_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->foreignId('class_id')->nullable()->constrained('classes')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('url')->nullable();
            $table->string('file_path')->nullable();
            $table->string('type')->default('document'); // document, video, audio, etc.
            $table->string('author')->nullable();
            $table->string('publisher')->nullable();
            $table->integer('publication_year')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reading_materials');
    }
};
