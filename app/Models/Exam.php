<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Exam extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'exam_date',
        'duration',
        'max_score',
        'class_id',
        'subject_id',
        'created_by',
        'is_active'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'exam_date' => 'datetime',
        'duration' => 'integer',
        'max_score' => 'float',
        'is_active' => 'boolean',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'average_score',
        'submissions_count',
        'pass_rate',
    ];

    /**
     * Get the class that this exam belongs to.
     */
    public function class(): BelongsTo
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }

    /**
     * Get the subject that this exam belongs to.
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Get the teacher who created this exam.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the submissions for this exam.
     */
    public function submissions()
    {
        return $this->hasMany(ExamSubmission::class);
    }

    /**
     * Get the average score for this exam.
     *
     * @return float
     */
    public function getAverageScoreAttribute()
    {
        $submissions = $this->submissions()->whereNotNull('score')->get();
        
        if ($submissions->isEmpty()) {
            return 0;
        }
        
        return round($submissions->avg('score'), 1);
    }

    /**
     * Get the count of submissions for this exam.
     *
     * @return int
     */
    public function getSubmissionsCountAttribute()
    {
        return $this->submissions()->count();
    }

    /**
     * Get the pass rate for this exam (percentage of students who scored 60% or higher).
     *
     * @return float
     */
    public function getPassRateAttribute()
    {
        $submissions = $this->submissions()->whereNotNull('score')->get();
        
        if ($submissions->isEmpty()) {
            return 0;
        }
        
        $passThreshold = $this->max_score * 0.6; // 60% of max score
        $passCount = $submissions->filter(function ($submission) use ($passThreshold) {
            return $submission->score >= $passThreshold;
        })->count();
        
        return round(($passCount / $submissions->count()) * 100, 1);
    }
}
