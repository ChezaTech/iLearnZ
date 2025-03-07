<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'lesson_id',
        'title',
        'description',
        'duration_minutes',
        'total_points',
        'is_randomized',
        'show_answers_after_submission',
        'is_offline_available',
        'created_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_randomized' => 'boolean',
        'show_answers_after_submission' => 'boolean',
        'is_offline_available' => 'boolean',
        'duration_minutes' => 'integer',
        'total_points' => 'integer',
    ];

    /**
     * Get the lesson that this quiz belongs to.
     */
    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }

    /**
     * Get the user who created this quiz.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the questions associated with this quiz.
     */
    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }
}
