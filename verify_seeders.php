<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Get counts
$districtCount = DB::table('school_districts')->count();
$schoolCount = DB::table('schools')->count();
$userCount = DB::table('users')->count();
$parentStudentCount = DB::table('parent_student')->count();
$reportCardCount = DB::table('report_cards')->count();
$resourceCount = DB::table('school_resources')->count();
$eventCount = DB::table('school_events')->count();

echo "===== DATABASE SEEDER VERIFICATION =====\n";
echo "School Districts: $districtCount\n";
echo "Schools: $schoolCount\n";
echo "Users: $userCount\n";
echo "Parent-Student Relationships: $parentStudentCount\n";
echo "Report Cards: $reportCardCount\n";
echo "School Resources: $resourceCount\n";
echo "School Events: $eventCount\n";
echo "=======================================\n\n";

// Sample data from each table
echo "===== SAMPLE DATA FROM EACH TABLE =====\n";

// School Districts
echo "SCHOOL DISTRICTS:\n";
$districts = DB::table('school_districts')->limit(3)->get();
foreach ($districts as $district) {
    echo "- {$district->name} ({$district->code}): {$district->region} region, {$district->province} province\n";
}
echo "\n";

// Schools
echo "SCHOOLS:\n";
$schools = DB::table('schools')->limit(3)->get();
foreach ($schools as $school) {
    echo "- {$school->name} ({$school->code}): {$school->city}, {$school->province}\n";
}
echo "\n";

// Users (sample of different roles)
echo "USERS:\n";
$adminUser = DB::table('users')->where('role', 'admin')->first();
$teacherUser = DB::table('users')->where('role', 'teacher')->first();
$studentUser = DB::table('users')->where('role', 'student')->first();
$parentUser = DB::table('users')->where('role', 'parent')->first();

if ($adminUser) echo "- Admin: {$adminUser->name} ({$adminUser->email})\n";
if ($teacherUser) echo "- Teacher: {$teacherUser->name} ({$teacherUser->email})\n";
if ($studentUser) echo "- Student: {$studentUser->name} ({$studentUser->email})\n";
if ($parentUser) echo "- Parent: {$parentUser->name} ({$parentUser->email})\n";
echo "\n";

// Parent-Student relationships
echo "PARENT-STUDENT RELATIONSHIPS:\n";
$relationships = DB::table('parent_student')
    ->join('users as parents', 'parent_student.parent_id', '=', 'parents.id')
    ->join('users as students', 'parent_student.student_id', '=', 'students.id')
    ->select('parents.name as parent_name', 'students.name as student_name', 'parent_student.relationship')
    ->limit(3)
    ->get();

foreach ($relationships as $rel) {
    echo "- {$rel->parent_name} is the {$rel->relationship} of {$rel->student_name}\n";
}
echo "\n";

// Report Cards
echo "REPORT CARDS:\n";
$reportCards = DB::table('report_cards')
    ->join('users', 'report_cards.student_id', '=', 'users.id')
    ->select('users.name as student_name', 'report_cards.term', 'report_cards.academic_year', 'report_cards.average_grade')
    ->limit(3)
    ->get();

foreach ($reportCards as $card) {
    echo "- {$card->student_name}: {$card->term} {$card->academic_year}, Average Grade: {$card->average_grade}\n";
}
echo "\n";

// School Resources
echo "SCHOOL RESOURCES:\n";
$resources = DB::table('school_resources')
    ->leftJoin('schools', 'school_resources.school_id', '=', 'schools.id')
    ->select('school_resources.name', 'school_resources.resource_type', 'schools.name as school_name')
    ->limit(3)
    ->get();

foreach ($resources as $resource) {
    $schoolName = $resource->school_name ?? 'District-wide';
    echo "- {$resource->name} ({$resource->resource_type}) at {$schoolName}\n";
}
echo "\n";

// School Events
echo "SCHOOL EVENTS:\n";
$events = DB::table('school_events')
    ->leftJoin('schools', 'school_events.school_id', '=', 'schools.id')
    ->select('school_events.title', 'school_events.event_type', 'school_events.start_date', 'schools.name as school_name')
    ->limit(3)
    ->get();

foreach ($events as $event) {
    $schoolName = $event->school_name ?? 'District-wide';
    echo "- {$event->title} ({$event->event_type}) at {$schoolName} on " . date('Y-m-d', strtotime($event->start_date)) . "\n";
}
echo "\n";

echo "=======================================\n";
