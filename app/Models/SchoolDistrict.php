<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SchoolDistrict extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'code',
        'region',
        'province',
        'address',
        'phone',
        'email',
        'district_education_officer',
    ];
    
    /**
     * Get the schools in this district.
     */
    public function schools(): HasMany
    {
        return $this->hasMany(School::class, 'district_id');
    }
    
    /**
     * Get the government reports for this district.
     */
    public function governmentReports(): HasMany
    {
        return $this->hasMany(GovernmentReport::class, 'district_id');
    }
    
    /**
     * Get the total number of students in this district.
     */
    public function getTotalStudentsAttribute(): int
    {
        return $this->schools()->sum('student_count');
    }
    
    /**
     * Get the total number of teachers in this district.
     */
    public function getTotalTeachersAttribute(): int
    {
        return $this->schools()->sum('teacher_count');
    }
}
