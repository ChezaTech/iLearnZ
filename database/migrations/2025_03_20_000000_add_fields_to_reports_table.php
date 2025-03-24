<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reports', function (Blueprint $table) {
            if (!Schema::hasColumn('reports', 'name')) {
                $table->string('name')->nullable();
            }
            if (!Schema::hasColumn('reports', 'type')) {
                $table->string('type')->nullable();
            }
            if (!Schema::hasColumn('reports', 'start_date')) {
                $table->date('start_date')->nullable();
            }
            if (!Schema::hasColumn('reports', 'end_date')) {
                $table->date('end_date')->nullable();
            }
            if (!Schema::hasColumn('reports', 'file_path')) {
                $table->string('file_path')->nullable();
            }
            if (!Schema::hasColumn('reports', 'size')) {
                $table->bigInteger('size')->default(0);
            }
            
            // Make existing columns nullable for administrative reports
            $table->unsignedBigInteger('student_id')->nullable()->change();
            $table->unsignedBigInteger('class_id')->nullable()->change();
            $table->string('term')->nullable()->change();
            $table->string('academic_year')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropColumn([
                'name',
                'type',
                'start_date',
                'end_date',
                'file_path',
                'size'
            ]);
            
            // Revert nullable changes
            $table->unsignedBigInteger('student_id')->nullable(false)->change();
            $table->unsignedBigInteger('class_id')->nullable(false)->change();
            $table->string('term')->nullable(false)->change();
            $table->string('academic_year')->nullable(false)->change();
        });
    }
}
