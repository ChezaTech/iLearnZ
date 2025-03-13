<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "===== USER LOGIN DETAILS =====\n\n";

// Super Admin
echo "SUPER ADMIN:\n";
$superAdmin = DB::table('users')->where('user_type', 'admin')->where('role_id', 1)->first();
if ($superAdmin) {
    echo "- {$superAdmin->name} ({$superAdmin->email})\n";
    echo "  Password: password (default for all seeded users)\n\n";
}

// School Admins
echo "SCHOOL ADMINS:\n";
$schoolAdmins = DB::table('users')
    ->where('user_type', 'admin')
    ->where('role_id', 2)
    ->join('schools', 'users.school_id', '=', 'schools.id')
    ->select('users.*', 'schools.name as school_name')
    ->get();

foreach ($schoolAdmins as $admin) {
    echo "- {$admin->name} ({$admin->email}) - {$admin->school_name}\n";
    echo "  Password: password\n";
}
echo "\n";

// Teachers (sample)
echo "TEACHERS (sample):\n";
$teachers = DB::table('users')
    ->where('user_type', 'teacher')
    ->where('role_id', 3)
    ->join('schools', 'users.school_id', '=', 'schools.id')
    ->select('users.*', 'schools.name as school_name')
    ->limit(3)
    ->get();

foreach ($teachers as $teacher) {
    echo "- {$teacher->name} ({$teacher->email}) - {$teacher->school_name}\n";
    echo "  Password: password\n";
}
echo "\n";

// Students (sample)
echo "STUDENTS (sample):\n";
$students = DB::table('users')
    ->where('user_type', 'student')
    ->where('role_id', 4)
    ->join('schools', 'users.school_id', '=', 'schools.id')
    ->select('users.*', 'schools.name as school_name')
    ->limit(3)
    ->get();

foreach ($students as $student) {
    echo "- {$student->name} ({$student->email}) - {$student->school_name}\n";
    echo "  Password: password\n";
}
echo "\n";

// Parents (sample)
echo "PARENTS (sample):\n";
$parents = DB::table('users')
    ->where('user_type', 'parent')
    ->where('role_id', 5)
    ->limit(3)
    ->get();

foreach ($parents as $parent) {
    // Get children for this parent
    $children = DB::table('parent_student')
        ->where('parent_id', $parent->id)
        ->join('users', 'parent_student.student_id', '=', 'users.id')
        ->select('users.name', 'parent_student.relationship')
        ->get();
    
    $childrenInfo = [];
    foreach ($children as $child) {
        $childrenInfo[] = "{$child->name} ({$child->relationship})";
    }
    
    echo "- {$parent->name} ({$parent->email})\n";
    echo "  Children: " . implode(", ", $childrenInfo) . "\n";
    echo "  Password: password\n";
}
echo "\n";

// Government Officials
echo "GOVERNMENT OFFICIALS:\n";
$officials = DB::table('users')
    ->where('user_type', 'government')
    ->where('role_id', 6)
    ->get();

foreach ($officials as $official) {
    echo "- {$official->name} ({$official->email})\n";
    echo "  Password: password\n";
}
echo "\n";

echo "=============================\n";
echo "Note: All passwords are set to 'password' for testing purposes.\n";
echo "      In a production environment, secure passwords should be used.\n";
