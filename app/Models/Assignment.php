<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Assignment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'class_id',
        'subject_id',
        'title',
        'description',
        'due_date',
        'total_points',
        'is_graded',
        'is_offline_available',
        'created_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'due_date' => 'date',
        'total_points' => 'integer',
        'is_graded' => 'boolean',
        'is_offline_available' => 'boolean',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'average_score',
        'submissions_count',
        'on_time_submissions_count',
        'late_submissions_count',
    ];

    /**
     * Get the class that this assignment belongs to.
     */
    public function class(): BelongsTo
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }

    /**
     * Get the subject that this assignment belongs to.
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Get the user who created this assignment.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the submissions for this assignment.
     */
    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class);
    }

    /**
     * Get the average score for this assignment.
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
     * Get the count of submissions for this assignment.
     *
     * @return int
     */
    public function getSubmissionsCountAttribute()
    {
        return $this->submissions()->count();
    }

    /**
     * Get the count of on-time submissions for this assignment.
     *
     * @return int
     */
    public function getOnTimeSubmissionsCountAttribute()
    {
        return $this->submissions()
            ->where('submitted_at', '<=', $this->due_date)
            ->count();
    }

    /**
     * Get the count of late submissions for this assignment.
     *
     * @return int
     */
    public function getLateSubmissionsCountAttribute()
    {
        return $this->submissions()
            ->where('submitted_at', '>', $this->due_date)
            ->count();
    }
}
