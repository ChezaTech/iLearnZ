<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolAdmin extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'school_admins';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'school_id',
        'admin_role',
    ];

    /**
     * Get the user that owns the school admin.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the school that the admin belongs to.
     */
    public function school()
    {
        return $this->belongsTo(School::class);
    }
}
