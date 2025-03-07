<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AcademicTerm extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'academic_year',
        'start_date',
        'end_date',
        'exam_start_date',
        'exam_end_date',
        'report_card_date',
        'is_current',
        'school_id',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'exam_start_date' => 'date',
        'exam_end_date' => 'date',
        'report_card_date' => 'date',
        'is_current' => 'boolean',
    ];
    
    /**
     * Get the school associated with the academic term.
     */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }
    
    /**
     * Get the student performances for this academic term.
     */
    public function studentPerformances(): HasMany
    {
        return $this->hasMany(StudentPerformance::class);
    }
    
    /**
     * Check if the current date is within the term dates.
     */
    public function isActive(): bool
    {
        $today = now()->startOfDay();
        return $today->between($this->start_date, $this->end_date);
    }
    
    /**
     * Check if the current date is within the exam period.
     */
    public function isExamPeriod(): bool
    {
        if (!$this->exam_start_date || !$this->exam_end_date) {
            return false;
        }
        
        $today = now()->startOfDay();
        return $today->between($this->exam_start_date, $this->exam_end_date);
    }
}
