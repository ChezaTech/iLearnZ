<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Assessment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'instructions',
        'class_id',
        'subject_id',
        'created_by',
        'due_date',
        'available_from',
        'max_score',
        'is_published',
        'allow_late_submissions',
        'attachment_path',
        'metadata',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'due_date' => 'datetime',
        'available_from' => 'datetime',
        'is_published' => 'boolean',
        'allow_late_submissions' => 'boolean',
        'metadata' => 'array',
    ];

    /**
     * Get the class that the assessment belongs to.
     */
    public function class(): BelongsTo
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }

    /**
     * Get the subject that the assessment belongs to.
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Get the teacher who created the assessment.
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the submissions for the assessment.
     */
    public function submissions(): HasMany
    {
        return $this->hasMany(AssessmentSubmission::class);
    }

    /**
     * Check if the assessment is past due.
     *
     * @return bool
     */
    public function isPastDue(): bool
    {
        return now()->isAfter($this->due_date);
    }

    /**
     * Check if the assessment is available.
     *
     * @return bool
     */
    public function isAvailable(): bool
    {
        if (!$this->is_published) {
            return false;
        }

        if ($this->available_from && now()->isBefore($this->available_from)) {
            return false;
        }

        if (!$this->allow_late_submissions && $this->isPastDue()) {
            return false;
        }

        return true;
    }
}
