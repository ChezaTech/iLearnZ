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
        Schema::table('students', function (Blueprint $table) {
            // Drop the foreign key constraint first
            $table->dropForeign(['parent_id']);
            
            // Change the column to be nullable
            $table->foreignId('parent_id')->nullable()->change();
            
            // Add the foreign key constraint back
            $table->foreign('parent_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            // Drop the foreign key constraint first
            $table->dropForeign(['parent_id']);
            
            // Change the column back to non-nullable
            $table->foreignId('parent_id')->nullable(false)->change();
            
            // Add the original foreign key constraint back
            $table->foreign('parent_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
};
