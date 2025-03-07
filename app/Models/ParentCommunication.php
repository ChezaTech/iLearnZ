<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ParentCommunication extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'parent_id',
        'teacher_id',
        'student_id',
        'subject',
        'message',
        'type',
        'is_read',
        'read_at',
        'requires_response',
        'response',
        'responded_at',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_read' => 'boolean',
        'read_at' => 'datetime',
        'requires_response' => 'boolean',
        'responded_at' => 'datetime',
    ];
    
    /**
     * Get the parent associated with the communication.
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'parent_id');
    }
    
    /**
     * Get the teacher associated with the communication.
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
    
    /**
     * Get the student associated with the communication.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }
    
    /**
     * Mark the communication as read.
     */
    public function markAsRead(): self
    {
        $this->update([
            'is_read' => true,
            'read_at' => now(),
        ]);
        
        return $this;
    }
    
    /**
     * Add a response to the communication.
     */
    public function addResponse(string $response): self
    {
        $this->update([
            'response' => $response,
            'responded_at' => now(),
        ]);
        
        return $this;
    }
    
    /**
     * Scope a query to only include unread communications.
     */
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }
    
    /**
     * Scope a query to only include communications that require a response.
     */
    public function scopeRequiresResponse($query)
    {
        return $query->where('requires_response', true)
                    ->whereNull('response');
    }
}
