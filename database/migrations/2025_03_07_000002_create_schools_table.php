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
        Schema::table('schools', function (Blueprint $table) {
            // Check if columns don't exist before adding them
            if (!Schema::hasColumn('schools', 'city')) {
                $table->string('city')->nullable();
            }
            if (!Schema::hasColumn('schools', 'province')) {
                $table->string('province')->nullable();
            }
            if (!Schema::hasColumn('schools', 'postal_code')) {
                $table->string('postal_code')->nullable();
            }
            if (!Schema::hasColumn('schools', 'connectivity_status')) {
                $table->enum('connectivity_status', ['online', 'offline', 'hybrid'])->default('offline');
            }
            if (!Schema::hasColumn('schools', 'internet_provider')) {
                $table->string('internet_provider')->nullable();
            }
            if (!Schema::hasColumn('schools', 'has_smartboards')) {
                $table->boolean('has_smartboards')->default(false);
            }
            if (!Schema::hasColumn('schools', 'student_count')) {
                $table->integer('student_count')->default(0);
            }
            if (!Schema::hasColumn('schools', 'teacher_count')) {
                $table->integer('teacher_count')->default(0);
            }
            
            // Modify existing columns if needed
            if (Schema::hasColumn('schools', 'type')) {
                $table->dropColumn('type');
            }
            $table->enum('type', ['primary', 'secondary', 'combined'])->nullable();
            
            // Make sure address is text instead of string
            if (Schema::hasColumn('schools', 'address')) {
                $table->text('address')->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('schools', function (Blueprint $table) {
            // Drop the columns that were added
            $table->dropColumn([
                'city',
                'province',
                'postal_code',
                'connectivity_status',
                'internet_provider',
                'has_smartboards',
                'student_count',
                'teacher_count'
            ]);
            
            // Revert type column
            $table->dropColumn('type');
            $table->enum('type', ['public', 'private', 'charter'])->default('public');
            
            // Revert address to string
            $table->string('address')->change();
        });
    }
};
