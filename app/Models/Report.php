<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Report extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'type',
        'student_id',
        'class_id',
        'term',
        'academic_year',
        'overall_average',
        'class_rank',
        'teacher_comments',
        'principal_comments',
        'subject_scores',
        'is_published',
        'generated_by',
        'start_date',
        'end_date',
        'file_path',
        'size',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'overall_average' => 'decimal:2',
        'class_rank' => 'integer',
        'subject_scores' => 'json',
        'is_published' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
        'size' => 'integer',
    ];

    /**
     * Get the student associated with this report.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get the class associated with this report.
     */
    public function class(): BelongsTo
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }

    /**
     * Get the user who generated this report.
     */
    public function generator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'generated_by');
    }
    
    /**
     * Check if this is an administrative report.
     */
    public function isAdministrativeReport(): bool
    {
        $adminReportTypes = [
            'School Performance Report',
            'Teacher Effectiveness Report',
            'Resource Utilization Report',
            'Student Progress Report',
            'District Comparison Report'
        ];
        
        return in_array($this->type, $adminReportTypes);
    }
    
    /**
     * Get the formatted file size.
     */
    public function getFormattedSizeAttribute(): string
    {
        if ($this->size < 1024) {
            return $this->size . ' B';
        } elseif ($this->size < 1048576) {
            return round($this->size / 1024, 1) . ' KB';
        } else {
            return round($this->size / 1048576, 1) . ' MB';
        }
    }
}
