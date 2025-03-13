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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('author');
            $table->string('isbn')->nullable()->unique();
            $table->string('publisher')->nullable();
            $table->integer('publication_year')->nullable();
            $table->string('category')->nullable();
            $table->text('description')->nullable();
            $table->integer('quantity')->default(1);
            $table->integer('available_quantity')->default(1);
            $table->string('location')->nullable();
            $table->string('cover_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
