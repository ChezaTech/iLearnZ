<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\AssessmentSubmission;
use App\Models\Classes;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    /**
     * Display a listing of assessments for a specific subject.
     *
     * @param  int  $classId
     * @param  int  $subjectId
     * @return \Illuminate\Http\Response
     */
    public function index($classId, $subjectId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Validate user has access to this class
        if ($class->school_id != $user->school_id) {
            return response()->json(['error' => 'You do not have permission to access this class.'], 403);
        }
        
        // Get assessments for this subject
        $assessments = Assessment::where('subject_id', $subject->id)
            ->where('class_id', $class->id)
            ->orderBy('due_date', 'desc')
            ->get();
        
        // For each assessment, add submission count
        $assessments->each(function ($assessment) {
            $assessment->submission_count = $assessment->submissions()->count();
            $assessment->is_past_due = $assessment->isPastDue();
            $assessment->is_available = $assessment->isAvailable();
        });
        
        return response()->json([
            'success' => true,
            'assessments' => $assessments
        ]);
    }

    /**
     * Store a newly created assessment.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $classId
     * @param  int  $subjectId
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $classId, $subjectId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Validate user has access to this class
        if ($class->school_id != $user->school_id) {
            return response()->json(['error' => 'You do not have permission to modify this class.'], 403);
        }
        
        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'instructions' => 'nullable|string',
            'due_date' => 'required|date',
            'available_from' => 'nullable|date',
            'max_score' => 'nullable|integer|min:1',
            'is_published' => 'boolean',
            'allow_late_submissions' => 'boolean',
            'attachment' => 'nullable|file|max:10240', // 10MB max file size
        ]);
        
        // Handle file upload if present
        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $fileName = time() . '_' . Str::slug($validated['title']) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('assessments/' . $classId . '/' . $subjectId, $fileName, 'public');
            $attachmentPath = $path;
        }
        
        // Create the assessment
        $assessment = Assessment::create([
            'title' => $validated['title'],
            'instructions' => $validated['instructions'] ?? null,
            'class_id' => $class->id,
            'subject_id' => $subject->id,
            'created_by' => $user->id,
            'due_date' => $validated['due_date'],
            'available_from' => $validated['available_from'] ?? null,
            'max_score' => $validated['max_score'] ?? 100,
            'is_published' => $validated['is_published'] ?? false,
            'allow_late_submissions' => $validated['allow_late_submissions'] ?? false,
            'attachment_path' => $attachmentPath,
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Assessment created successfully',
            'assessment' => $assessment
        ]);
    }

    /**
     * Display the specified assessment.
     *
     * @param  int  $classId
     * @param  int  $subjectId
     * @param  int  $assessmentId
     * @return \Illuminate\Http\Response
     */
    public function show($classId, $subjectId, $assessmentId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Validate user has access to this class
        if ($class->school_id != $user->school_id) {
            return response()->json(['error' => 'You do not have permission to access this class.'], 403);
        }
        
        $assessment = Assessment::with(['teacher:id,name'])->findOrFail($assessmentId);
        
        // Check if assessment belongs to the specified class and subject
        if ($assessment->class_id != $class->id || $assessment->subject_id != $subject->id) {
            return response()->json(['error' => 'Assessment not found in this class/subject.'], 404);
        }
        
        // Add additional information
        $assessment->is_past_due = $assessment->isPastDue();
        $assessment->is_available = $assessment->isAvailable();
        $assessment->submission_count = $assessment->submissions()->count();
        
        // If user is a teacher, include submissions
        if ($user->role === 'teacher') {
            $assessment->submissions = $assessment->submissions()
                ->with(['student:id,name'])
                ->get();
        } else {
            // If user is a student, check if they have submitted
            $submission = AssessmentSubmission::where('assessment_id', $assessment->id)
                ->where('student_id', $user->id)
                ->first();
                
            $assessment->user_submission = $submission;
        }
        
        return response()->json([
            'success' => true,
            'assessment' => $assessment
        ]);
    }

    /**
     * Update the specified assessment.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $classId
     * @param  int  $subjectId
     * @param  int  $assessmentId
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $classId, $subjectId, $assessmentId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Validate user has access to this class
        if ($class->school_id != $user->school_id) {
            return response()->json(['error' => 'You do not have permission to modify this class.'], 403);
        }
        
        $assessment = Assessment::findOrFail($assessmentId);
        
        // Check if assessment belongs to the specified class and subject
        if ($assessment->class_id != $class->id || $assessment->subject_id != $subject->id) {
            return response()->json(['error' => 'Assessment not found in this class/subject.'], 404);
        }
        
        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'instructions' => 'nullable|string',
            'due_date' => 'required|date',
            'available_from' => 'nullable|date',
            'max_score' => 'nullable|integer|min:1',
            'is_published' => 'boolean',
            'allow_late_submissions' => 'boolean',
            'attachment' => 'nullable|file|max:10240', // 10MB max file size
        ]);
        
        // Handle file upload if present
        if ($request->hasFile('attachment')) {
            // Delete old attachment if exists
            if ($assessment->attachment_path) {
                Storage::disk('public')->delete($assessment->attachment_path);
            }
            
            $file = $request->file('attachment');
            $fileName = time() . '_' . Str::slug($validated['title']) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('assessments/' . $classId . '/' . $subjectId, $fileName, 'public');
            $assessment->attachment_path = $path;
        }
        
        // Update the assessment
        $assessment->title = $validated['title'];
        $assessment->instructions = $validated['instructions'] ?? null;
        $assessment->due_date = $validated['due_date'];
        $assessment->available_from = $validated['available_from'] ?? null;
        $assessment->max_score = $validated['max_score'] ?? 100;
        $assessment->is_published = $validated['is_published'] ?? false;
        $assessment->allow_late_submissions = $validated['allow_late_submissions'] ?? false;
        $assessment->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Assessment updated successfully',
            'assessment' => $assessment
        ]);
    }

    /**
     * Remove the specified assessment.
     *
     * @param  int  $classId
     * @param  int  $subjectId
     * @param  int  $assessmentId
     * @return \Illuminate\Http\Response
     */
    public function destroy($classId, $subjectId, $assessmentId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Validate user has access to this class
        if ($class->school_id != $user->school_id) {
            return response()->json(['error' => 'You do not have permission to modify this class.'], 403);
        }
        
        $assessment = Assessment::findOrFail($assessmentId);
        
        // Check if assessment belongs to the specified class and subject
        if ($assessment->class_id != $class->id || $assessment->subject_id != $subject->id) {
            return response()->json(['error' => 'Assessment not found in this class/subject.'], 404);
        }
        
        // Delete attachment if exists
        if ($assessment->attachment_path) {
            Storage::disk('public')->delete($assessment->attachment_path);
        }
        
        // Delete all submissions and their files
        foreach ($assessment->submissions as $submission) {
            if ($submission->submission_path) {
                Storage::disk('public')->delete($submission->submission_path);
            }
            $submission->delete();
        }
        
        // Delete the assessment
        $assessment->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Assessment deleted successfully'
        ]);
    }

    /**
     * Submit an assessment (for students).
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $classId
     * @param  int  $subjectId
     * @param  int  $assessmentId
     * @return \Illuminate\Http\Response
     */
    public function submitAssessment(Request $request, $classId, $subjectId, $assessmentId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Validate user has access to this class
        if ($class->school_id != $user->school_id) {
            return response()->json(['error' => 'You do not have permission to access this class.'], 403);
        }
        
        $assessment = Assessment::findOrFail($assessmentId);
        
        // Check if assessment belongs to the specified class and subject
        if ($assessment->class_id != $class->id || $assessment->subject_id != $subject->id) {
            return response()->json(['error' => 'Assessment not found in this class/subject.'], 404);
        }
        
        // Check if assessment is available for submission
        if (!$assessment->isAvailable()) {
            return response()->json(['error' => 'This assessment is not available for submission.'], 403);
        }
        
        // Check if student has already submitted
        $existingSubmission = AssessmentSubmission::where('assessment_id', $assessment->id)
            ->where('student_id', $user->id)
            ->first();
            
        if ($existingSubmission) {
            return response()->json(['error' => 'You have already submitted this assessment.'], 403);
        }
        
        // Validate the request
        $validated = $request->validate([
            'submission' => 'required|file|max:20480', // 20MB max file size
            'comments' => 'nullable|string',
        ]);
        
        // Handle file upload
        $file = $request->file('submission');
        $fileName = time() . '_' . $user->id . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('submissions/' . $classId . '/' . $subjectId . '/' . $assessmentId, $fileName, 'public');
        
        // Create the submission
        $submission = AssessmentSubmission::create([
            'assessment_id' => $assessment->id,
            'student_id' => $user->id,
            'submission_path' => $path,
            'comments' => $validated['comments'] ?? null,
            'submitted_at' => now(),
            'is_late' => $assessment->isPastDue(),
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Assessment submitted successfully',
            'submission' => $submission
        ]);
    }

    /**
     * Grade a submission (for teachers).
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $classId
     * @param  int  $subjectId
     * @param  int  $assessmentId
     * @param  int  $submissionId
     * @return \Illuminate\Http\Response
     */
    public function gradeSubmission(Request $request, $classId, $subjectId, $assessmentId, $submissionId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Validate user has access to this class
        if ($class->school_id != $user->school_id) {
            return response()->json(['error' => 'You do not have permission to access this class.'], 403);
        }
        
        $assessment = Assessment::findOrFail($assessmentId);
        
        // Check if assessment belongs to the specified class and subject
        if ($assessment->class_id != $class->id || $assessment->subject_id != $subject->id) {
            return response()->json(['error' => 'Assessment not found in this class/subject.'], 404);
        }
        
        $submission = AssessmentSubmission::findOrFail($submissionId);
        
        // Check if submission belongs to the assessment
        if ($submission->assessment_id != $assessment->id) {
            return response()->json(['error' => 'Submission not found for this assessment.'], 404);
        }
        
        // Validate the request
        $validated = $request->validate([
            'score' => 'required|integer|min:0|max:' . $assessment->max_score,
            'comments' => 'nullable|string',
        ]);
        
        // Update the submission
        $submission->score = $validated['score'];
        $submission->comments = $validated['comments'] ?? $submission->comments;
        $submission->graded_by = $user->id;
        $submission->graded_at = now();
        $submission->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Submission graded successfully',
            'submission' => $submission
        ]);
    }
}
