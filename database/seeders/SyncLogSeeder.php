<?php

namespace Database\Seeders;

use App\Models\SyncLog;
use Illuminate\Database\Seeder;

class SyncLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $syncLogs = [
            // Sync logs for Harare High School devices
            [
                'device_id' => 1, // HHS Smartboard 001
                'user_id' => 3, // John Smith
                'sync_date' => '2025-03-01 08:15:00',
                'status' => 'success',
                'data_size_kb' => 2560,
                'details' => 'Full content sync - lessons, resources, and assignments',
                'ip_address' => '192.168.1.101',
                'duration_seconds' => 45,
            ],
            [
                'device_id' => 2, // HHS Smartboard 002
                'user_id' => 4, // Mary Johnson
                'sync_date' => '2025-03-01 09:30:00',
                'status' => 'success',
                'data_size_kb' => 2350,
                'details' => 'Full content sync - lessons, resources, and assignments',
                'ip_address' => '192.168.1.102',
                'duration_seconds' => 42,
            ],
            [
                'device_id' => 3, // HHS Tablet 001
                'user_id' => 6, // Tendai Mutasa
                'sync_date' => '2025-03-02 14:20:00',
                'status' => 'success',
                'data_size_kb' => 1850,
                'details' => 'Student data sync - assignments, submissions, and progress',
                'ip_address' => '192.168.1.120',
                'duration_seconds' => 28,
            ],
            [
                'device_id' => 3, // HHS Tablet 001
                'user_id' => 6, // Tendai Mutasa
                'sync_date' => '2025-03-04 16:45:00',
                'status' => 'partial',
                'data_size_kb' => 450,
                'details' => 'Partial sync - new assignment submissions only',
                'ip_address' => '192.168.1.120',
                'duration_seconds' => 12,
            ],
            [
                'device_id' => 4, // HHS Tablet 002
                'user_id' => 7, // Chipo Dziva
                'sync_date' => '2025-03-02 15:10:00',
                'status' => 'success',
                'data_size_kb' => 1920,
                'details' => 'Student data sync - assignments, submissions, and progress',
                'ip_address' => '192.168.1.121',
                'duration_seconds' => 30,
            ],
            
            // Sync logs for Bulawayo Primary School devices
            [
                'device_id' => 5, // BPS Smartboard 001
                'user_id' => 5, // David Moyo
                'sync_date' => '2025-03-01 07:45:00',
                'status' => 'success',
                'data_size_kb' => 2150,
                'details' => 'Full content sync - lessons, resources, and assignments',
                'ip_address' => '192.168.2.101',
                'duration_seconds' => 38,
            ],
            [
                'device_id' => 7, // BPS Tablet 001
                'user_id' => 8, // Tafara Ncube
                'sync_date' => '2025-03-02 13:30:00',
                'status' => 'success',
                'data_size_kb' => 1680,
                'details' => 'Student data sync - assignments, submissions, and progress',
                'ip_address' => '192.168.2.120',
                'duration_seconds' => 25,
            ],
            [
                'device_id' => 7, // BPS Tablet 001
                'user_id' => 8, // Tafara Ncube
                'sync_date' => '2025-03-03 18:15:00',
                'status' => 'failed',
                'data_size_kb' => 0,
                'details' => 'Sync failed - connection timeout',
                'ip_address' => '192.168.2.120',
                'duration_seconds' => 60,
            ],
            [
                'device_id' => 7, // BPS Tablet 001
                'user_id' => 8, // Tafara Ncube
                'sync_date' => '2025-03-03 18:25:00',
                'status' => 'success',
                'data_size_kb' => 520,
                'details' => 'Partial sync - new assignment submissions only',
                'ip_address' => '192.168.2.120',
                'duration_seconds' => 15,
            ],
            [
                'device_id' => 8, // BPS Tablet 002
                'user_id' => 9, // Rudo Sibanda
                'sync_date' => '2025-03-02 14:05:00',
                'status' => 'success',
                'data_size_kb' => 1750,
                'details' => 'Student data sync - assignments, submissions, and progress',
                'ip_address' => '192.168.2.121',
                'duration_seconds' => 27,
            ],
        ];

        foreach ($syncLogs as $syncLog) {
            SyncLog::create($syncLog);
        }
    }
}
