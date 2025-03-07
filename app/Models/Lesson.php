<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lesson extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'subject_id',
        'title',
        'description',
        'content',
        'duration_minutes',
        'grade_level',
        'is_offline_available',
        'is_interactive',
        'created_by',
        'is_approved',
        'approved_by',
        'approved_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_offline_available' => 'boolean',
        'is_interactive' => 'boolean',
        'is_approved' => 'boolean',
        'approved_at' => 'datetime',
        'duration_minutes' => 'integer',
    ];

    /**
     * Get the subject that this lesson belongs to.
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Get the user who created this lesson.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who approved this lesson.
     */
    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Get the resources associated with this lesson.
     */
    public function resources(): HasMany
    {
        return $this->hasMany(Resource::class);
    }

    /**
     * Get the quizzes associated with this lesson.
     */
    public function quizzes(): HasMany
    {
        return $this->hasMany(Quiz::class);
    }

    /**
     * Get the progress records associated with this lesson.
     */
    public function progress(): HasMany
    {
        return $this->hasMany(Progress::class);
    }
}
