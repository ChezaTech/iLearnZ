<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToReadingMaterialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reading_materials', function (Blueprint $table) {
            if (!Schema::hasColumn('reading_materials', 'file_type')) {
                $table->string('file_type')->nullable()->after('file_path');
            }
            
            if (!Schema::hasColumn('reading_materials', 'file_size')) {
                $table->bigInteger('file_size')->nullable()->after('file_type');
            }
            
            if (!Schema::hasColumn('reading_materials', 'category')) {
                $table->string('category', 100)->nullable()->after('type');
            }
            
            if (!Schema::hasColumn('reading_materials', 'tags')) {
                $table->string('tags')->nullable()->after('category');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('reading_materials', function (Blueprint $table) {
            $table->dropColumn([
                'file_type',
                'file_size',
                'category',
                'tags',
            ]);
        });
    }
}
