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
        Schema::table('school_admins', function (Blueprint $table) {
            // Drop the existing admin_role column
            $table->dropColumn('admin_role');
        });

        Schema::table('school_admins', function (Blueprint $table) {
            // Add the admin_role column with the correct type
            $table->string('admin_role')->default('admin')->after('school_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('school_admins', function (Blueprint $table) {
            // Drop the new admin_role column
            $table->dropColumn('admin_role');
        });

        Schema::table('school_admins', function (Blueprint $table) {
            // Add back the original admin_role column
            $table->string('admin_role', 255)->after('school_id');
        });
    }
};
