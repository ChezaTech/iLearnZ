<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReportCard extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'student_id',
        'class_id',
        'school_id',
        'term',
        'academic_year',
        'issue_date',
        'subject_grades',
        'average_grade',
        'rank_in_class',
        'teacher_comments',
        'principal_comments',
        'status',
        'created_by',
        'parent_acknowledged',
        'parent_acknowledged_at',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'issue_date' => 'date',
        'subject_grades' => 'json',
        'average_grade' => 'decimal:2',
        'parent_acknowledged' => 'boolean',
        'parent_acknowledged_at' => 'datetime',
    ];
    
    /**
     * Get the student associated with the report card.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }
    
    /**
     * Get the class associated with the report card.
     */
    public function class(): BelongsTo
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }
    
    /**
     * Get the school associated with the report card.
     */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }
    
    /**
     * Get the user who created the report card.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
