<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'school_id',
        'user_type',
        'phone_number',
        'profile_photo',
        'is_active',
        'preferences',
        'biometric_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'preferences' => 'json',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get the role that the user belongs to.
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Get the school that the user belongs to.
     */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /**
     * Get the classes that the teacher is responsible for.
     */
    public function teacherClasses(): HasMany
    {
        return $this->hasMany(Classes::class, 'teacher_id');
    }

    /**
     * Get the enrollments for the student.
     */
    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class, 'student_id');
    }

    /**
     * Get the attendance records for the student.
     */
    public function attendance(): HasMany
    {
        return $this->hasMany(Attendance::class, 'student_id');
    }

    /**
     * Get the submissions made by the student.
     */
    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class, 'student_id');
    }

    /**
     * Get the grades for the student.
     */
    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class, 'student_id');
    }

    /**
     * Get the progress records for the student.
     */
    public function progress(): HasMany
    {
        return $this->hasMany(Progress::class, 'student_id');
    }

    /**
     * Get the reports for the student.
     */
    public function reports(): HasMany
    {
        return $this->hasMany(Report::class, 'student_id');
    }

    /**
     * Get the notifications for the user.
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    /**
     * Check if the user has a specific role.
     */
    public function hasRole(string $roleName): bool
    {
        return $this->role && $this->role->name === $roleName;
    }

    /**
     * Check if the user is a teacher.
     */
    public function isTeacher(): bool
    {
        return $this->user_type === 'teacher';
    }

    /**
     * Check if the user is a student.
     */
    public function isStudent(): bool
    {
        return $this->user_type === 'student';
    }

    /**
     * Check if the user is an administrator.
     */
    public function isAdmin(): bool
    {
        return $this->user_type === 'admin';
    }

    /**
     * Check if the user is a parent.
     */
    public function isParent(): bool
    {
        return $this->user_type === 'parent';
    }

    /**
     * Check if the user is a government official.
     */
    public function isGovernment(): bool
    {
        return $this->user_type === 'government';
    }
    
    /**
     * Get the students associated with the parent user.
     */
    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'parent_id');
    }
    
    /**
     * Get the student profile associated with the user.
     */
    public function studentProfile(): HasMany
    {
        return $this->hasMany(Student::class, 'user_id');
    }
}
