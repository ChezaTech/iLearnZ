<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Classes extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'teacher_id',
        'name',
        'grade_level',
        'section',
        'academic_year',
        'start_date',
        'end_date',
        'is_active',
        'max_students',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'max_students' => 'integer',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    /**
     * Get the school that this class belongs to.
     */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /**
     * Get the teacher responsible for this class.
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    /**
     * Get the enrollments associated with this class.
     */
    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class, 'class_id');
    }

    /**
     * Get the attendance records associated with this class.
     */
    public function attendance(): HasMany
    {
        return $this->hasMany(Attendance::class, 'class_id');
    }

    /**
     * Get the assignments associated with this class.
     */
    public function assignments(): HasMany
    {
        return $this->hasMany(Assignment::class, 'class_id');
    }

    /**
     * Get the grades associated with this class.
     */
    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class, 'class_id');
    }

    /**
     * Get the reports associated with this class.
     */
    public function reports(): HasMany
    {
        return $this->hasMany(Report::class, 'class_id');
    }

    /**
     * Get the students enrolled in this class.
     */
    public function students()
    {
        return $this->belongsToMany(User::class, 'enrollments', 'class_id', 'student_id')
            ->where('user_type', 'student')
            ->withPivot('enrollment_date', 'status', 'notes')
            ->withTimestamps();
    }
}
