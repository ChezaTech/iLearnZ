<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'content',
        'author_id',
        'target_type', // 'all', 'teachers', 'students', 'parents', 'specific'
        'target_ids', // JSON array of specific user IDs when target_type is 'specific'
        'priority', // 'low', 'medium', 'high'
        'expires_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'target_ids' => 'array',
        'expires_at' => 'datetime',
    ];

    /**
     * Get the author of the announcement.
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
