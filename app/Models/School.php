<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class School extends Model
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
        'address',
        'city',
        'province',
        'district_id',
        'postal_code',
        'phone',
        'email',
        'principal_name',
        'type',
        'connectivity_status',
        'internet_provider',
        'has_smartboards',
        'student_count',
        'teacher_count',
        'school_hours',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'has_smartboards' => 'boolean',
        'student_count' => 'integer',
        'teacher_count' => 'integer',
    ];

    /**
     * Get the district that the school belongs to.
     */
    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }
    
    /**
     * Get the academic terms for this school.
     */
    public function academicTerms(): HasMany
    {
        return $this->hasMany(AcademicTerm::class);
    }
    
    /**
     * Get the report cards issued by this school.
     */
    public function reportCards(): HasMany
    {
        return $this->hasMany(ReportCard::class);
    }
    
    /**
     * Get the government reports for this school.
     */
    public function governmentReports(): HasMany
    {
        return $this->hasMany(GovernmentReport::class);
    }
    
    /**
     * Get the users associated with this school.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get the classes associated with this school.
     */
    public function classes(): HasMany
    {
        return $this->hasMany(Classes::class);
    }

    /**
     * Get the devices associated with this school.
     */
    public function devices(): HasMany
    {
        return $this->hasMany(Device::class);
    }
    
    /**
     * Get the teachers associated with this school.
     */
    public function teachers(): HasMany
    {
        return $this->hasMany(Teacher::class);
    }
    
    /**
     * Get the students associated with this school.
     */
    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    /**
     * Get the admins for the school.
     */
    public function admins(): HasMany
    {
        return $this->hasMany(SchoolAdmin::class);
    }
    
    /**
     * Get the books in the school's library.
     */
    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }
}
