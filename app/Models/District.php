<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'school_districts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'province',
        'code',
        'region',
        'address',
        'phone',
        'email',
        'district_education_officer',
    ];

    /**
     * Get the schools in this district.
     */
    public function schools()
    {
        return $this->hasMany(School::class);
    }
}
