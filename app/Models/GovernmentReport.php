<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GovernmentReport extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'report_type',
        'report_date',
        'academic_year',
        'term',
        'district_id',
        'school_id',
        'report_data',
        'summary',
        'recommendations',
        'status',
        'created_by',
        'approved_by',
        'approved_at',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'report_date' => 'date',
        'report_data' => 'json',
        'approved_at' => 'datetime',
    ];
    
    /**
     * Get the district associated with the report.
     */
    public function district(): BelongsTo
    {
        return $this->belongsTo(SchoolDistrict::class, 'district_id');
    }
    
    /**
     * Get the school associated with the report.
     */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }
    
    /**
     * Get the user who created the report.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    
    /**
     * Get the user who approved the report.
     */
    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
    
    /**
     * Scope a query to only include reports of a specific type.
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('report_type', $type);
    }
    
    /**
     * Scope a query to only include reports with a specific status.
     */
    public function scopeWithStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
