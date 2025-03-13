<?php

namespace Database\Seeders;

use App\Models\SchoolDistrict;
use Illuminate\Database\Seeder;

class SchoolDistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $districts = [
            [
                'name' => 'Harare Metropolitan',
                'code' => 'HRE-01',
                'region' => 'Northern',
                'province' => 'Harare',
                'address' => '123 Samora Machel Avenue, Harare',
                'phone' => '+263 242 123456',
                'email' => 'harare.district@education.gov.zw',
                'district_education_officer' => 'Dr. Tapiwa Moyo'
            ],
            [
                'name' => 'Bulawayo Metropolitan',
                'code' => 'BYO-01',
                'region' => 'Southern',
                'province' => 'Bulawayo',
                'address' => '456 Joshua Nkomo Street, Bulawayo',
                'phone' => '+263 292 234567',
                'email' => 'bulawayo.district@education.gov.zw',
                'district_education_officer' => 'Dr. Nomsa Ndlovu'
            ],
            [
                'name' => 'Gweru District',
                'code' => 'MDL-01',
                'region' => 'Central',
                'province' => 'Midlands',
                'address' => '789 Robert Mugabe Way, Gweru',
                'phone' => '+263 254 345678',
                'email' => 'gweru.district@education.gov.zw',
                'district_education_officer' => 'Mr. Simba Chikwanda'
            ],
            [
                'name' => 'Mutare District',
                'code' => 'MAN-01',
                'region' => 'Eastern',
                'province' => 'Manicaland',
                'address' => '101 Herbert Chitepo Street, Mutare',
                'phone' => '+263 20 456789',
                'email' => 'mutare.district@education.gov.zw',
                'district_education_officer' => 'Mrs. Grace Mutema'
            ],
            [
                'name' => 'Masvingo District',
                'code' => 'MSV-01',
                'region' => 'Southern',
                'province' => 'Masvingo',
                'address' => '202 Simon Muzenda Street, Masvingo',
                'phone' => '+263 39 567890',
                'email' => 'masvingo.district@education.gov.zw',
                'district_education_officer' => 'Mr. Farai Chigumba'
            ],
            [
                'name' => 'Chinhoyi District',
                'code' => 'MSH-01',
                'region' => 'Northern',
                'province' => 'Mashonaland West',
                'address' => '303 Magamba Way, Chinhoyi',
                'phone' => '+263 67 678901',
                'email' => 'chinhoyi.district@education.gov.zw',
                'district_education_officer' => 'Mrs. Tendai Madziva'
            ],
            [
                'name' => 'Bindura District',
                'code' => 'MSH-02',
                'region' => 'Northern',
                'province' => 'Mashonaland Central',
                'address' => '404 Chipadze Street, Bindura',
                'phone' => '+263 71 789012',
                'email' => 'bindura.district@education.gov.zw',
                'district_education_officer' => 'Mr. Tonderai Nyamapfeni'
            ],
            [
                'name' => 'Marondera District',
                'code' => 'MSH-03',
                'region' => 'Eastern',
                'province' => 'Mashonaland East',
                'address' => '505 The Green, Marondera',
                'phone' => '+263 79 890123',
                'email' => 'marondera.district@education.gov.zw',
                'district_education_officer' => 'Dr. Rutendo Makoni'
            ],
            [
                'name' => 'Gwanda District',
                'code' => 'MAT-01',
                'region' => 'Southern',
                'province' => 'Matabeleland South',
                'address' => '606 Jahunda Road, Gwanda',
                'phone' => '+263 84 901234',
                'email' => 'gwanda.district@education.gov.zw',
                'district_education_officer' => 'Mr. Nkosana Moyo'
            ],
            [
                'name' => 'Lupane District',
                'code' => 'MAT-02',
                'region' => 'Western',
                'province' => 'Matabeleland North',
                'address' => '707 Main Street, Lupane',
                'phone' => '+263 81 012345',
                'email' => 'lupane.district@education.gov.zw',
                'district_education_officer' => 'Mrs. Sithembile Ncube'
            ],
        ];

        foreach ($districts as $district) {
            // Check if the district already exists by code
            if (!SchoolDistrict::where('code', $district['code'])->exists()) {
                SchoolDistrict::create($district);
            }
        }
    }
}
