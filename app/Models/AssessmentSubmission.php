<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssessmentSubmission extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'assessment_id',
        'student_id',
        'submission_path',
        'comments',
        'score',
        'graded_by',
        'submitted_at',
        'graded_at',
        'is_late',
        'metadata',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'submitted_at' => 'datetime',
        'graded_at' => 'datetime',
        'is_late' => 'boolean',
        'metadata' => 'array',
    ];

    /**
     * Get the assessment that the submission belongs to.
     */
    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class);
    }

    /**
     * Get the student who submitted the assessment.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get the teacher who graded the submission.
     */
    public function gradedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'graded_by');
    }

    /**
     * Check if the submission has been graded.
     *
     * @return bool
     */
    public function isGraded(): bool
    {
        return $this->score !== null;
    }

    /**
     * Get the file name from the submission path.
     *
     * @return string
     */
    public function getFileName(): string
    {
        return basename($this->submission_path);
    }
}
