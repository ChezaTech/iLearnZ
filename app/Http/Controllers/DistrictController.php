<?php

namespace App\Http\Controllers;

use App\Models\SchoolDistrict;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DistrictController extends Controller
{
    /**
     * Store a newly created district in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'province' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'district_education_officer' => 'nullable|string|max:255',
        ]);
        
        // Generate a unique code for the district
        $validated['code'] = strtoupper(substr(str_replace(' ', '', $validated['name']), 0, 3) . '-' . Str::random(5));
        
        // Set default province if not provided (using region as default)
        $validated['province'] = $validated['province'] ?? $validated['region'];
        
        // Create the district
        $district = SchoolDistrict::create($validated);
        
        // Get all districts to return to the frontend
        $districts = SchoolDistrict::all();
        
        return redirect()->back()->with([
            'success' => 'District created successfully!',
            'initialDistricts' => $districts
        ]);
    }

    /**
     * Update the specified district in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SchoolDistrict  $district
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, SchoolDistrict $district)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'province' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'district_education_officer' => 'nullable|string|max:255',
        ]);
        
        // Set default province if not provided (using region as default)
        $validated['province'] = $validated['province'] ?? $validated['region'];
        
        // Update the district
        $district->update($validated);
        
        // Get all districts to return to the frontend
        $districts = SchoolDistrict::all();
        
        return redirect()->back()->with([
            'success' => 'District updated successfully!',
            'initialDistricts' => $districts
        ]);
    }

    /**
     * Remove the specified district from storage.
     *
     * @param  \App\Models\SchoolDistrict  $district
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(SchoolDistrict $district)
    {
        // Check if the district has any schools
        if ($district->schools()->count() > 0) {
            return redirect()->back()->with('error', 'Cannot delete district with associated schools.');
        }
        
        // Delete the district
        $district->delete();
        
        // Get all districts to return to the frontend
        $districts = SchoolDistrict::all();
        
        return redirect()->back()->with([
            'success' => 'District deleted successfully!',
            'initialDistricts' => $districts
        ]);
    }
}
