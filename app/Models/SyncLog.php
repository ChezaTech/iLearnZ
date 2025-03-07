<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SyncLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'device_id',
        'user_id',
        'sync_date',
        'status',
        'data_size_kb',
        'details',
        'ip_address',
        'duration_seconds',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sync_date' => 'datetime',
        'data_size_kb' => 'integer',
        'duration_seconds' => 'integer',
    ];

    /**
     * Get the device associated with this sync log.
     */
    public function device(): BelongsTo
    {
        return $this->belongsTo(Device::class);
    }

    /**
     * Get the user associated with this sync log.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
