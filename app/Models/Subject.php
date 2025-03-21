<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Subject extends Model
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
        'description',
        'grade_level',
        'is_zimsec_aligned',
        'curriculum_version',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_zimsec_aligned' => 'boolean',
    ];

    /**
     * Get the lessons associated with this subject.
     */
    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class);
    }

    /**
     * Get the assignments associated with this subject.
     */
    public function assignments(): HasMany
    {
        return $this->hasMany(Assignment::class);
    }

    /**
     * Get the grades associated with this subject.
     */
    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class);
    }
    
    /**
     * Get the classes that this subject is taught in.
     */
    public function classes(): BelongsToMany
    {
        return $this->belongsToMany(Classes::class, 'class_subject', 'subject_id', 'class_id')
            ->withPivot('teacher_id', 'schedule', 'notes')
            ->withTimestamps();
    }
    
    /**
     * Get the teacher assigned to teach this subject in a specific class.
     */
    public function teacher()
    {
        return $this->belongsToMany(User::class, 'class_subject', 'subject_id', 'teacher_id')
            ->withPivot('class_id', 'schedule', 'notes')
            ->withTimestamps();
    }
    
    /**
     * Get the books associated with this subject.
     */
    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'book_subject', 'subject_id', 'book_id')
            ->withPivot('relationship_type', 'notes')
            ->withTimestamps();
    }
    
    /**
     * Get the reading materials associated with this subject.
     */
    public function readingMaterials(): HasMany
    {
        return $this->hasMany(ReadingMaterial::class);
    }
}
