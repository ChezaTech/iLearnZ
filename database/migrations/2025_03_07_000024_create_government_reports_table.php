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
        Schema::create('government_reports', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('report_type'); // e.g., 'enrollment', 'performance', 'attendance', 'infrastructure'
            $table->date('report_date');
            $table->string('academic_year');
            $table->string('term')->nullable();
            $table->foreignId('district_id')->nullable()->constrained('school_districts')->nullOnDelete();
            $table->foreignId('school_id')->nullable()->constrained()->nullOnDelete();
            $table->json('report_data'); // Structured data for the report
            $table->text('summary')->nullable();
            $table->text('recommendations')->nullable();
            $table->enum('status', ['draft', 'submitted', 'approved', 'published'])->default('draft');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('government_reports');
    }
};
