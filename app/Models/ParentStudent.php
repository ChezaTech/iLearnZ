<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ParentStudent extends Model
{
    use HasFactory;
    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'parent_student';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'parent_id',
        'student_id',
        'relationship',
        'is_emergency_contact',
        'can_pickup',
        'receives_reports',
        'receives_notifications',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_emergency_contact' => 'boolean',
        'can_pickup' => 'boolean',
        'receives_reports' => 'boolean',
        'receives_notifications' => 'boolean',
    ];
    
    /**
     * Get the parent associated with the relationship.
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'parent_id');
    }
    
    /**
     * Get the student associated with the relationship.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
