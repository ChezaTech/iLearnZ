<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolResource extends Model
{
    protected $fillable = [
        'school_id',
        'resource_type',
        'name',
        'description',
        'quantity',
        'condition',
        'acquisition_date',
        'estimated_value',
        'supplier',
        'location',
        'is_digital',
        'digital_access_url',
        'notes',
    ];

    protected $casts = [
        'acquisition_date' => 'date',
        'estimated_value' => 'decimal:2',
        'is_digital' => 'boolean',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }
}
