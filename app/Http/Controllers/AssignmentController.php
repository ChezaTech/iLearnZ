<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\Classes;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AssignmentController extends Controller
{
    /**
     * Display a listing of assignments.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $user = Auth::user();
        
        if ($user->user_type === 'teacher') {
            // Get assignments created by this teacher
            $assignments = Assessment::where('teacher_id', $user->id)
                ->with(['class', 'subject'])
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            // Get assignments assigned to this student's classes
            $assignments = Assessment::whereHas('class.students', function ($query) use ($user) {
                $query->where('users.id', $user->id);
            })
            ->with(['class', 'subject'])
            ->orderBy('due_date', 'asc')
            ->get();
        }
        
        return Inertia::render('Assignments/Index', [
            'assignments' => $assignments
        ]);
    }

    /**
     * Store a newly created assignment in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'instructions' => 'required|string',
            'class_id' => 'required|exists:classes,id',
            'subject_id' => 'required|exists:subjects,id',
            'due_date' => 'required|date|after:today',
            'available_from' => 'required|date',
            'max_score' => 'required|numeric|min:0',
            'allow_late_submissions' => 'boolean',
            'attachment' => 'nullable|file|max:10240', // 10MB max
        ]);
        
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        
        // Handle file upload if present
        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('assignments', 'public');
        }
        
        // Create new assignment
        $assignment = new Assessment();
        $assignment->title = $request->title;
        $assignment->description = $request->instructions;
        $assignment->class_id = $request->class_id;
        $assignment->subject_id = $request->subject_id;
        $assignment->teacher_id = Auth::id();
        $assignment->due_date = $request->due_date;
        $assignment->available_from = $request->available_from;
        $assignment->max_score = $request->max_score;
        $assignment->allow_late_submissions = $request->allow_late_submissions ?? false;
        $assignment->attachment = $attachmentPath;
        $assignment->type = 'assignment'; // Set type to assignment
        $assignment->status = 'active';
        $assignment->save();
        
        return redirect()->route('teacher.dashboard')->with('success', 'Assignment created successfully!');
    }

    /**
     * Display the specified assignment.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $assignment = Assessment::with(['class', 'subject', 'teacher', 'submissions.student'])
            ->findOrFail($id);
            
        // Check if user has access to this assignment
        $user = Auth::user();
        if ($user->user_type === 'student') {
            // Check if student is in the class
            $isInClass = $assignment->class->students()->where('users.id', $user->id)->exists();
            if (!$isInClass) {
                abort(403, 'You do not have access to this assignment');
            }
        } elseif ($user->user_type === 'teacher' && $assignment->teacher_id !== $user->id) {
            // Check if teacher created this assignment
            abort(403, 'You do not have access to this assignment');
        }
        
        return Inertia::render('Assignments/Show', [
            'assignment' => $assignment
        ]);
    }

    /**
     * Update the specified assignment in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $assignment = Assessment::findOrFail($id);
        
        // Check if user is the teacher who created this assignment
        if (Auth::id() !== $assignment->teacher_id) {
            abort(403, 'You do not have permission to update this assignment');
        }
        
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'instructions' => 'required|string',
            'class_id' => 'required|exists:classes,id',
            'subject_id' => 'required|exists:subjects,id',
            'due_date' => 'required|date',
            'available_from' => 'required|date',
            'max_score' => 'required|numeric|min:0',
            'allow_late_submissions' => 'boolean',
            'attachment' => 'nullable|file|max:10240', // 10MB max
        ]);
        
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        
        // Handle file upload if present
        if ($request->hasFile('attachment')) {
            // Delete old attachment if exists
            if ($assignment->attachment) {
                Storage::disk('public')->delete($assignment->attachment);
            }
            $attachmentPath = $request->file('attachment')->store('assignments', 'public');
            $assignment->attachment = $attachmentPath;
        }
        
        // Update assignment
        $assignment->title = $request->title;
        $assignment->description = $request->instructions;
        $assignment->class_id = $request->class_id;
        $assignment->subject_id = $request->subject_id;
        $assignment->due_date = $request->due_date;
        $assignment->available_from = $request->available_from;
        $assignment->max_score = $request->max_score;
        $assignment->allow_late_submissions = $request->allow_late_submissions ?? false;
        $assignment->save();
        
        return redirect()->route('assignments.show', $assignment->id)->with('success', 'Assignment updated successfully!');
    }

    /**
     * Remove the specified assignment from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $assignment = Assessment::findOrFail($id);
        
        // Check if user is the teacher who created this assignment
        if (Auth::id() !== $assignment->teacher_id) {
            abort(403, 'You do not have permission to delete this assignment');
        }
        
        // Delete attachment if exists
        if ($assignment->attachment) {
            Storage::disk('public')->delete($assignment->attachment);
        }
        
        $assignment->delete();
        
        return redirect()->route('teacher.dashboard')->with('success', 'Assignment deleted successfully!');
    }
}
