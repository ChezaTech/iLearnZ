<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// Get all tables
$tables = DB::select('SHOW TABLES');

// Disable foreign key checks
DB::statement('SET FOREIGN_KEY_CHECKS=0');

// Drop all tables
foreach ($tables as $table) {
    $tableName = array_values((array) $table)[0];
    echo "Dropping table: {$tableName}\n";
    Schema::dropIfExists($tableName);
}

// Re-enable foreign key checks
DB::statement('SET FOREIGN_KEY_CHECKS=1');

echo "All tables dropped successfully!\n";

// Run migrations
echo "Running migrations...\n";
$kernel->call('migrate');

echo "\nMigrations completed!\n";

// Run seeders if needed
$runSeeders = readline("Do you want to run seeders? (y/n): ");
if (strtolower($runSeeders) === 'y') {
    echo "Running seeders...\n";
    $kernel->call('db:seed');
    echo "Seeders completed!\n";
}

echo "Database reset complete!\n";
