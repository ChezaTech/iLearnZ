<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolEvent extends Model
{
    protected $fillable = [
        'school_id',
        'title',
        'description',
        'event_type',
        'start_date',
        'end_date',
        'location',
        'organizer_id',
        'is_public',
        'requires_registration',
        'max_participants',
        'registration_deadline',
        'status',
        'notes',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'registration_deadline' => 'date',
        'is_public' => 'boolean',
        'requires_registration' => 'boolean',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }
}
