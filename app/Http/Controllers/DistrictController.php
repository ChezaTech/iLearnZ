<?php

namespace App\Http\Controllers;

use App\Models\SchoolDistrict;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DistrictController extends Controller
{
    /**
     * Display a listing of all districts.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $districts = SchoolDistrict::select('id', 'name', 'region', 'province')
            ->orderBy('name')
            ->get();
            
        return response()->json($districts);
    }

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
    public function update(Request $request, $district)
    {
        // Find the district by name if it's not an ID
        if (!is_numeric($district)) {
            $districtModel = SchoolDistrict::where('name', $district)->first();
            if (!$districtModel) {
                return redirect()->back()->with('error', 'District not found');
            }
        } else {
            $districtModel = SchoolDistrict::find($district);
            if (!$districtModel) {
                return redirect()->back()->with('error', 'District not found');
            }
        }
        
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
        $districtModel->update($validated);
        
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
    public function destroy($district)
    {
        // Find the district by name if it's not an ID
        if (!is_numeric($district)) {
            $districtModel = SchoolDistrict::where('name', $district)->first();
            if (!$districtModel) {
                return redirect()->back()->with('error', 'District not found');
            }
        } else {
            $districtModel = SchoolDistrict::find($district);
            if (!$districtModel) {
                return redirect()->back()->with('error', 'District not found');
            }
        }
        
        // Check if the district has any schools
        if ($districtModel->schools()->count() > 0) {
            return redirect()->back()->with('error', 'Cannot delete district with associated schools.');
        }
        
        // Delete the district
        $districtModel->delete();
        
        // Get all districts to return to the frontend
        $districts = SchoolDistrict::all();
        
        return Inertia::render('Dashboard/SuperAdmin', [
            'initialDistricts' => $districts,
        ]);
    }

    /**
     * Display the specified district.
     *
     * @param  string|int  $district
     * @return \Inertia\Response
     */
    public function show($district)
    {
        // Find the district by name if it's not an ID
        if (!is_numeric($district)) {
            $districtModel = SchoolDistrict::where('name', $district)->first();
            if (!$districtModel) {
                return redirect()->route('superadmin.dashboard')->with('error', 'District not found');
            }
        } else {
            $districtModel = SchoolDistrict::find($district);
            if (!$districtModel) {
                return redirect()->route('superadmin.dashboard')->with('error', 'District not found');
            }
        }
        
        // Get schools in this district
        $schools = $districtModel->schools()->get();
        
        // Get all districts for dropdown
        $districts = SchoolDistrict::select('id', 'name', 'region', 'province')
            ->orderBy('name')
            ->get();
        
        return Inertia::render('Districts/Show', [
            'district' => $districtModel,
            'schools' => $schools,
            'allDistricts' => $districts
        ]);
    }

    /**
     * Get all districts for API use.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAll()
    {
        $districts = SchoolDistrict::select('id', 'name', 'region', 'province')
            ->orderBy('name')
            ->get();
            
        return response()->json($districts);
    }
}
