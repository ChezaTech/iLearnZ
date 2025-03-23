<?php

namespace Database\Seeders;

use App\Models\Device;
use Illuminate\Database\Seeder;

class DeviceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $devices = [
            // Smartboards for Harare High School
            [
                'school_id' => 1, // Harare High School
                'type' => 'smart_board',
                'name' => 'HHS Smartboard 001',
                'serial_number' => 'SB-HHS-001',
                'model' => 'SmartTech X500',
                'manufacturer' => 'SmartTech',
                'purchase_date' => '2024-12-15',
                'warranty_expiry' => '2027-12-15',
                'status' => 'active',
                'assigned_to' => 3, // John Smith
                'notes' => 'Installed in Form 1A classroom',
            ],
            [
                'school_id' => 1, // Harare High School
                'type' => 'smart_board',
                'name' => 'HHS Smartboard 002',
                'serial_number' => 'SB-HHS-002',
                'model' => 'SmartTech X500',
                'manufacturer' => 'SmartTech',
                'purchase_date' => '2024-12-15',
                'warranty_expiry' => '2027-12-15',
                'status' => 'active',
                'assigned_to' => 4, // Mary Johnson
                'notes' => 'Installed in Form 2B classroom',
            ],
            
            // Tablets for Harare High School
            [
                'school_id' => 1, // Harare High School
                'type' => 'tablet',
                'name' => 'HHS Tablet 001',
                'serial_number' => 'TB-HHS-001',
                'model' => 'EduTab Pro',
                'manufacturer' => 'EduTech',
                'purchase_date' => '2025-01-10',
                'warranty_expiry' => '2027-01-10',
                'status' => 'active',
                'assigned_to' => 6, // Tendai Mutasa
                'notes' => 'Assigned to student Tendai Mutasa',
            ],
            [
                'school_id' => 1, // Harare High School
                'type' => 'tablet',
                'name' => 'HHS Tablet 002',
                'serial_number' => 'TB-HHS-002',
                'model' => 'EduTab Pro',
                'manufacturer' => 'EduTech',
                'purchase_date' => '2025-01-10',
                'warranty_expiry' => '2027-01-10',
                'status' => 'active',
                'assigned_to' => 7, // Chipo Dziva
                'notes' => 'Assigned to student Chipo Dziva',
            ],
            
            // Smartboards for Bulawayo Primary School
            [
                'school_id' => 2, // Bulawayo Primary School
                'type' => 'smart_board',
                'name' => 'BPS Smartboard 001',
                'serial_number' => 'SB-BPS-001',
                'model' => 'SmartTech X300',
                'manufacturer' => 'SmartTech',
                'purchase_date' => '2024-11-20',
                'warranty_expiry' => '2027-11-20',
                'status' => 'active',
                'assigned_to' => 5, // David Moyo
                'notes' => 'Installed in Grade 5 Eagles classroom',
            ],
            [
                'school_id' => 2, // Bulawayo Primary School
                'type' => 'smart_board',
                'name' => 'BPS Smartboard 002',
                'serial_number' => 'SB-BPS-002',
                'model' => 'SmartTech X300',
                'manufacturer' => 'SmartTech',
                'purchase_date' => '2024-11-20',
                'warranty_expiry' => '2027-11-20',
                'status' => 'maintenance',
                'assigned_to' => null,
                'notes' => 'Under maintenance - touch screen calibration issue',
            ],
            
            // Tablets for Bulawayo Primary School
            [
                'school_id' => 2, // Bulawayo Primary School
                'type' => 'tablet',
                'name' => 'BPS Tablet 001',
                'serial_number' => 'TB-BPS-001',
                'model' => 'EduTab Lite',
                'manufacturer' => 'EduTech',
                'purchase_date' => '2025-01-15',
                'warranty_expiry' => '2027-01-15',
                'status' => 'active',
                'assigned_to' => 8, // Tafara Ncube
                'notes' => 'Assigned to student Tafara Ncube',
            ],
            [
                'school_id' => 2, // Bulawayo Primary School
                'type' => 'tablet',
                'name' => 'BPS Tablet 002',
                'serial_number' => 'TB-BPS-002',
                'model' => 'EduTab Lite',
                'manufacturer' => 'EduTech',
                'purchase_date' => '2025-01-15',
                'warranty_expiry' => '2027-01-15',
                'status' => 'active',
                'assigned_to' => 9, // Rudo Sibanda
                'notes' => 'Assigned to student Rudo Sibanda',
            ],
        ];

        foreach ($devices as $device) {
            Device::create($device);
        }
    }
}
