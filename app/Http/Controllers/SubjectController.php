<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Classes;
use App\Models\Book;
use App\Models\User;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubjectController extends Controller
{
    /**
     * Display a listing of subjects for a specific class/grade.
     *
     * @param int $classId
     * @return \Inertia\Response
     */
    public function index($classId)
    {
        $user = Auth::user();
        $class = Classes::with('teacher:id,name,email')->findOrFail($classId);
        
        // Check if the class belongs to the user's school
        if ($class->school_id != $user->school_id) {
            return redirect()->route('classes.index')->with('error', 'You do not have permission to view this class.');
        }
        
        // Get all subjects assigned to this class
        $subjects = $class->subjects()->with(['teacher:id,name,email', 'books'])->get();
        
        // Get available teachers for assignment
        $teachers = User::where('school_id', $user->school_id)
            ->where('role_id', 3) // Teacher role
            ->select('id', 'name', 'email')
            ->get();
            
        // Get available books for the school
        $books = Book::where('school_id', $user->school_id)
            ->select('id', 'title', 'author', 'category')
            ->get();
            
        return Inertia::render('SchoolAdmin/Classes/Subjects/Index', [
            'class' => [
                'id' => $class->id,
                'name' => $class->name,
                'grade_level' => $class->grade_level,
                'section' => $class->section,
                'teacher' => $class->teacher,
            ],
            'subjects' => $subjects,
            'teachers' => $teachers,
            'books' => $books,
        ]);
    }

    /**
     * Store a newly created subject for a class.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $classId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, $classId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        
        // Check if the class belongs to the user's school
        if ($class->school_id != $user->school_id) {
            return redirect()->route('classes.index')->with('error', 'You do not have permission to modify this class.');
        }
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:subjects,code',
            'description' => 'nullable|string',
            'teacher_id' => 'nullable|exists:users,id',
            'book_ids' => 'nullable|array',
            'book_ids.*' => 'exists:books,id',
            'reading_materials' => 'nullable|array',
            'reading_materials.*.title' => 'required|string|max:255',
            'reading_materials.*.url' => 'nullable|url',
            'reading_materials.*.description' => 'nullable|string',
        ]);
        
        // Create the subject
        $subject = Subject::create([
            'name' => $validated['name'],
            'code' => $validated['code'],
            'description' => $validated['description'] ?? null,
            'grade_level' => $class->grade_level === 'Primary' ? 'primary' : 'secondary',
            'is_zimsec_aligned' => true,
            'curriculum_version' => date('Y'),
        ]);
        
        // Attach the subject to the class with teacher assignment
        $class->subjects()->attach($subject->id, [
            'teacher_id' => $validated['teacher_id'] ?? null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        // Attach books to the subject if provided
        if (!empty($validated['book_ids'])) {
            $subject->books()->attach($validated['book_ids']);
        }
        
        // Add reading materials if provided
        if (!empty($validated['reading_materials'])) {
            foreach ($validated['reading_materials'] as $material) {
                $subject->readingMaterials()->create([
                    'title' => $material['title'],
                    'url' => $material['url'] ?? null,
                    'description' => $material['description'] ?? null,
                    'class_id' => $class->id,
                ]);
            }
        }
        
        return redirect()->route('classes.subjects.index', $class->id)
            ->with('success', 'Subject added successfully!');
    }

    /**
     * Display the specified subject.
     *
     * @param  int  $classId
     * @param  int  $subjectId
     * @return \Inertia\Response
     */
    public function show($classId, $subjectId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        
        // Check if the class belongs to the user's school
        if ($class->school_id != $user->school_id) {
            return redirect()->route('classes.index')->with('error', 'You do not have permission to view this class.');
        }
        
        // Get the subject with its relationships
        $subject = $class->subjects()
            ->where('subjects.id', $subjectId)
            ->with(['teacher:id,name,email', 'books', 'readingMaterials'])
            ->firstOrFail();
            
        // Get available teachers for assignment
        $teachers = User::where('school_id', $user->school_id)
            ->where('role_id', 3) // Teacher role
            ->select('id', 'name', 'email')
            ->get();
            
        // Get available books for the school
        $books = Book::where('school_id', $user->school_id)
            ->select('id', 'title', 'author', 'category')
            ->get();
            
        return Inertia::render('SchoolAdmin/Classes/Subjects/Show', [
            'class' => [
                'id' => $class->id,
                'name' => $class->name,
                'grade_level' => $class->grade_level,
            ],
            'subject' => $subject,
            'teachers' => $teachers,
            'books' => $books,
        ]);
    }

    /**
     * Update the specified subject.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $classId
     * @param  int  $subjectId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $classId, $subjectId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        
        // Check if the class belongs to the user's school
        if ($class->school_id != $user->school_id) {
            return redirect()->route('classes.index')->with('error', 'You do not have permission to modify this class.');
        }
        
        $subject = Subject::findOrFail($subjectId);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:subjects,code,'.$subject->id,
            'description' => 'nullable|string',
            'teacher_id' => 'nullable|exists:users,id',
            'book_ids' => 'nullable|array',
            'book_ids.*' => 'exists:books,id',
            'reading_materials' => 'nullable|array',
            'reading_materials.*.id' => 'nullable|exists:reading_materials,id',
            'reading_materials.*.title' => 'required|string|max:255',
            'reading_materials.*.url' => 'nullable|url',
            'reading_materials.*.description' => 'nullable|string',
        ]);
        
        // Update the subject
        $subject->update([
            'name' => $validated['name'],
            'code' => $validated['code'],
            'description' => $validated['description'] ?? $subject->description,
        ]);
        
        // Update the teacher assignment in the pivot table
        $class->subjects()->updateExistingPivot($subject->id, [
            'teacher_id' => $validated['teacher_id'] ?? null,
            'updated_at' => now(),
        ]);
        
        // Sync books to the subject if provided
        if (isset($validated['book_ids'])) {
            $subject->books()->sync($validated['book_ids']);
        }
        
        // Update reading materials if provided
        if (!empty($validated['reading_materials'])) {
            // Process each reading material
            foreach ($validated['reading_materials'] as $material) {
                if (isset($material['id'])) {
                    // Update existing reading material
                    $subject->readingMaterials()->where('id', $material['id'])->update([
                        'title' => $material['title'],
                        'url' => $material['url'] ?? null,
                        'description' => $material['description'] ?? null,
                    ]);
                } else {
                    // Create new reading material
                    $subject->readingMaterials()->create([
                        'title' => $material['title'],
                        'url' => $material['url'] ?? null,
                        'description' => $material['description'] ?? null,
                        'class_id' => $class->id,
                    ]);
                }
            }
        }
        
        return redirect()->route('classes.subjects.show', [$class->id, $subject->id])
            ->with('success', 'Subject updated successfully!');
    }

    /**
     * Remove the specified subject from the class.
     *
     * @param  int  $classId
     * @param  int  $subjectId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($classId, $subjectId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        
        // Check if the class belongs to the user's school
        if ($class->school_id != $user->school_id) {
            return redirect()->route('classes.index')->with('error', 'You do not have permission to modify this class.');
        }
        
        // Detach the subject from the class
        $class->subjects()->detach($subjectId);
        
        return redirect()->route('classes.subjects.index', $class->id)
            ->with('success', 'Subject removed from class successfully!');
    }
}
