<?php

namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SchoolController extends Controller
{
    /**
     * Store a newly created school in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'district_id' => 'required|exists:school_districts,id',
            'type' => 'required|in:Primary,Secondary,Combined',
            'connectivity_status' => 'required|in:Online,Hybrid,Offline'
        ]);
        
        // Generate a unique code for the school
        $validated['code'] = strtoupper(substr(str_replace(' ', '', $validated['name']), 0, 3) . '-' . Str::random(5));
        
        // Convert type and connectivity_status to lowercase to match database enum values
        $validated['type'] = strtolower($validated['type']);
        $validated['connectivity_status'] = strtolower($validated['connectivity_status']);
        
        // Set default values for required fields
        $validated['address'] = $validated['address'] ?? 'TBD';
        $validated['city'] = $validated['city'] ?? 'TBD';
        $validated['province'] = $validated['province'] ?? 'TBD';
        $validated['phone'] = $validated['phone'] ?? 'TBD';

        $school = School::create($validated);
        
        return redirect()->back()->with('success', 'School created successfully!');
    }

    /**
     * Remove the specified school from storage.
     *
     * @param  \App\Models\School  $school
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(School $school)
    {
        $school->delete();
        return redirect()->back()->with('success', 'School deleted successfully!');
    }
}
