<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentPerformance extends Model
{
    use HasFactory;
    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'student_performance';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'student_id',
        'class_id',
        'subject_id',
        'academic_term_id',
        'average_score',
        'rank_in_subject',
        'strengths',
        'areas_for_improvement',
        'teacher_comments',
        'parent_viewed',
        'parent_viewed_at',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'average_score' => 'decimal:2',
        'parent_viewed' => 'boolean',
        'parent_viewed_at' => 'datetime',
    ];
    
    /**
     * Get the student associated with the performance record.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }
    
    /**
     * Get the class associated with the performance record.
     */
    public function class(): BelongsTo
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }
    
    /**
     * Get the subject associated with the performance record.
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }
    
    /**
     * Get the academic term associated with the performance record.
     */
    public function academicTerm(): BelongsTo
    {
        return $this->belongsTo(AcademicTerm::class);
    }
    
    /**
     * Get the letter grade based on the average score.
     */
    public function getLetterGradeAttribute(): string
    {
        $score = $this->average_score;
        
        if ($score >= 90) {
            return 'A+';
        } elseif ($score >= 80) {
            return 'A';
        } elseif ($score >= 70) {
            return 'B';
        } elseif ($score >= 60) {
            return 'C';
        } elseif ($score >= 50) {
            return 'D';
        } else {
            return 'F';
        }
    }
}
