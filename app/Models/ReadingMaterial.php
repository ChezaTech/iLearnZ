<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReadingMaterial extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'subject_id',
        'class_id',
        'title',
        'description',
        'url',
        'file_path',
        'type',
        'author',
        'publisher',
        'publication_year',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'publication_year' => 'integer',
    ];

    /**
     * Get the subject that owns the reading material.
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Get the class that this reading material is associated with.
     */
    public function class(): BelongsTo
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }
}
