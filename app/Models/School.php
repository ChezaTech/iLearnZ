<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
}
