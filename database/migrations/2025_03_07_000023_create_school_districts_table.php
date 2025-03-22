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
        // Create school_districts table if it doesn't exist
        if (!Schema::hasTable('school_districts')) {
            Schema::create('school_districts', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('code')->nullable();
                $table->string('region')->nullable();
                $table->string('province')->nullable();
                $table->string('contact_person')->nullable();
                $table->string('contact_email')->nullable();
                $table->string('contact_phone')->nullable();
                $table->text('address')->nullable();
                $table->timestamps();
            });
        }
        
        // Only add district_id to schools table if it doesn't exist
        if (!Schema::hasColumn('schools', 'district_id')) {
            Schema::table('schools', function (Blueprint $table) {
                $table->foreignId('district_id')->nullable()->constrained('school_districts')->nullOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove foreign key and column from schools table
        if (Schema::hasColumn('schools', 'district_id')) {
            Schema::table('schools', function (Blueprint $table) {
                $table->dropForeign(['district_id']);
                $table->dropColumn('district_id');
            });
        }
        
        // Drop the school_districts table
        Schema::dropIfExists('school_districts');
    }
};
