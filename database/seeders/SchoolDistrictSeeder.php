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
                'region' => 'Harare',
                'province' => 'Harare',
                'address' => '123 Education Avenue, Harare',
                'phone' => '+263 242 123456',
                'email' => 'harare.district@education.gov.zw',
                'district_education_officer' => 'Dr. Tapiwa Moyo'
            ],
            [
                'name' => 'Bulawayo Metropolitan',
                'code' => 'BYO-01',
                'region' => 'Bulawayo',
                'province' => 'Bulawayo',
                'address' => '456 Learning Street, Bulawayo',
                'phone' => '+263 292 234567',
                'email' => 'bulawayo.district@education.gov.zw',
                'district_education_officer' => 'Dr. Nomsa Ndlovu'
            ],
            [
                'name' => 'Midlands North',
                'code' => 'MDL-01',
                'region' => 'Midlands',
                'province' => 'Midlands',
                'address' => '789 Knowledge Road, Gweru',
                'phone' => '+263 254 345678',
                'email' => 'midlands.north@education.gov.zw',
                'district_education_officer' => 'Mr. Simba Chikwanda'
            ],
            [
                'name' => 'Manicaland Central',
                'code' => 'MAN-01',
                'region' => 'Manicaland',
                'province' => 'Manicaland',
                'address' => '101 Education Drive, Mutare',
                'phone' => '+263 20 456789',
                'email' => 'manicaland.central@education.gov.zw',
                'district_education_officer' => 'Mrs. Grace Mutema'
            ],
            [
                'name' => 'Masvingo East',
                'code' => 'MSV-01',
                'region' => 'Masvingo',
                'province' => 'Masvingo',
                'address' => '202 School Lane, Masvingo',
                'phone' => '+263 39 567890',
                'email' => 'masvingo.east@education.gov.zw',
                'district_education_officer' => 'Mr. Farai Chigumba'
            ],
        ];

        foreach ($districts as $district) {
            SchoolDistrict::create($district);
        }
    }
}
