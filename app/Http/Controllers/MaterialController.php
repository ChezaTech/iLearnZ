<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use App\Models\ReadingMaterial;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MaterialController extends Controller
{
    /**
     * Store a newly uploaded material.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $classId
     * @param  int  $subjectId
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $classId, $subjectId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Validate user has access to this class
        if ($class->school_id != $user->school_id) {
            return response()->json(['error' => 'You do not have permission to modify this class.'], 403);
        }
        
        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|in:document,lesson,book,video,audio,image,archive',
            'category' => 'nullable|string|max:100',
            'tags' => 'nullable|string',
            'file' => 'required|file|max:50000', // 50MB max file size
            'author' => 'nullable|string|max:255',
            'publisher' => 'nullable|string|max:255',
            'publication_year' => 'nullable|integer',
        ]);
        
        // Handle file upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $extension = $file->getClientOriginalExtension();
            $fileName = Str::slug($validated['title']) . '_' . time() . '.' . $extension;
            
            // Determine the appropriate storage path based on file type
            $fileType = $this->determineFileType($extension);
            $path = "materials/{$class->id}/{$subject->id}/{$fileType}";
            
            // Store the file
            $filePath = $file->storeAs($path, $fileName, 'public');
            
            // Create the material record
            $material = new ReadingMaterial([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'type' => $validated['type'],
                'category' => $validated['category'] ?? null,
                'tags' => $validated['tags'] ?? null,
                'file_path' => $filePath,
                'file_type' => $extension,
                'file_size' => $file->getSize(),
                'author' => $validated['author'] ?? null,
                'publisher' => $validated['publisher'] ?? null,
                'publication_year' => $validated['publication_year'] ?? null,
            ]);
            
            $material->subject_id = $subject->id;
            $material->class_id = $class->id;
            $material->save();
            
            return response()->json([
                'success' => true,
                'message' => 'Material uploaded successfully',
                'material' => $material
            ]);
        }
        
        return response()->json(['error' => 'No file was uploaded.'], 400);
    }
    
    /**
     * Update the specified material.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $classId
     * @param  int  $subjectId
     * @param  int  $materialId
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $classId, $subjectId, $materialId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        $material = ReadingMaterial::findOrFail($materialId);
        
        // Validate user has access to this class
        if ($class->school_id != $user->school_id) {
            return response()->json(['error' => 'You do not have permission to modify this class.'], 403);
        }
        
        // Validate the material belongs to the subject and class
        if ($material->subject_id != $subject->id || $material->class_id != $class->id) {
            return response()->json(['error' => 'This material does not belong to the specified subject and class.'], 403);
        }
        
        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|in:document,lesson,book,video,audio,image,archive',
            'category' => 'nullable|string|max:100',
            'tags' => 'nullable|string',
            'file' => 'nullable|file|max:50000', // 50MB max file size
            'author' => 'nullable|string|max:255',
            'publisher' => 'nullable|string|max:255',
            'publication_year' => 'nullable|integer',
        ]);
        
        // Update the material record
        $material->title = $validated['title'];
        $material->description = $validated['description'] ?? $material->description;
        $material->type = $validated['type'];
        $material->category = $validated['category'] ?? $material->category;
        $material->tags = $validated['tags'] ?? $material->tags;
        $material->author = $validated['author'] ?? $material->author;
        $material->publisher = $validated['publisher'] ?? $material->publisher;
        $material->publication_year = $validated['publication_year'] ?? $material->publication_year;
        
        // Handle file upload if a new file is provided
        if ($request->hasFile('file')) {
            // Delete the old file if it exists
            if ($material->file_path && Storage::disk('public')->exists($material->file_path)) {
                Storage::disk('public')->delete($material->file_path);
            }
            
            $file = $request->file('file');
            $extension = $file->getClientOriginalExtension();
            $fileName = Str::slug($validated['title']) . '_' . time() . '.' . $extension;
            
            // Determine the appropriate storage path based on file type
            $fileType = $this->determineFileType($extension);
            $path = "materials/{$class->id}/{$subject->id}/{$fileType}";
            
            // Store the file
            $filePath = $file->storeAs($path, $fileName, 'public');
            
            // Update file-related fields
            $material->file_path = $filePath;
            $material->file_type = $extension;
            $material->file_size = $file->getSize();
        }
        
        $material->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Material updated successfully',
            'material' => $material
        ]);
    }
    
    /**
     * Remove the specified material.
     *
     * @param  int  $classId
     * @param  int  $subjectId
     * @param  int  $materialId
     * @return \Illuminate\Http\Response
     */
    public function destroy($classId, $subjectId, $materialId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        $material = ReadingMaterial::findOrFail($materialId);
        
        // Validate user has access to this class
        if ($class->school_id != $user->school_id) {
            return response()->json(['error' => 'You do not have permission to modify this class.'], 403);
        }
        
        // Validate the material belongs to the subject and class
        if ($material->subject_id != $subject->id || $material->class_id != $class->id) {
            return response()->json(['error' => 'This material does not belong to the specified subject and class.'], 403);
        }
        
        // Delete the file if it exists
        if ($material->file_path && Storage::disk('public')->exists($material->file_path)) {
            Storage::disk('public')->delete($material->file_path);
        }
        
        // Delete the material record
        $material->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Material deleted successfully'
        ]);
    }
    
    /**
     * Get all materials for a subject.
     *
     * @param  int  $classId
     * @param  int  $subjectId
     * @return \Illuminate\Http\Response
     */
    public function index($classId, $subjectId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Validate user has access to this class
        if ($class->school_id != $user->school_id) {
            return response()->json(['error' => 'You do not have permission to access this class.'], 403);
        }
        
        // Get all materials for this subject and class
        $materials = ReadingMaterial::where('subject_id', $subject->id)
            ->where('class_id', $class->id)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json([
            'success' => true,
            'materials' => $materials
        ]);
    }
    
    /**
     * Batch delete multiple materials.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $classId
     * @param  int  $subjectId
     * @return \Illuminate\Http\Response
     */
    public function batchDelete(Request $request, $classId, $subjectId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Validate user has access to this class
        if ($class->school_id != $user->school_id) {
            return response()->json(['error' => 'You do not have permission to modify this class.'], 403);
        }
        
        // Validate the request
        $validated = $request->validate([
            'material_ids' => 'required|array',
            'material_ids.*' => 'required|integer|exists:reading_materials,id',
        ]);
        
        // Get all materials that belong to this subject and class
        $materials = ReadingMaterial::whereIn('id', $validated['material_ids'])
            ->where('subject_id', $subject->id)
            ->where('class_id', $class->id)
            ->get();
        
        // Delete files and records
        foreach ($materials as $material) {
            if ($material->file_path && Storage::disk('public')->exists($material->file_path)) {
                Storage::disk('public')->delete($material->file_path);
            }
            $material->delete();
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Materials deleted successfully',
            'count' => count($materials)
        ]);
    }
    
    /**
     * Determine the file type based on extension.
     *
     * @param  string  $extension
     * @return string
     */
    private function determineFileType($extension)
    {
        $extension = strtolower($extension);
        
        // Documents
        if (in_array($extension, ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'])) {
            return 'documents';
        }
        
        // Presentations
        if (in_array($extension, ['ppt', 'pptx', 'odp'])) {
            return 'presentations';
        }
        
        // Spreadsheets
        if (in_array($extension, ['xls', 'xlsx', 'csv', 'ods'])) {
            return 'spreadsheets';
        }
        
        // Images
        if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'])) {
            return 'images';
        }
        
        // Videos
        if (in_array($extension, ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'])) {
            return 'videos';
        }
        
        // Audio
        if (in_array($extension, ['mp3', 'wav', 'ogg', 'aac', 'flac'])) {
            return 'audio';
        }
        
        // Archives
        if (in_array($extension, ['zip', 'rar', '7z', 'tar', 'gz'])) {
            return 'archives';
        }
        
        // Default
        return 'other';
    }
    
    /**
     * Create a new category for materials.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $classId
     * @param  int  $subjectId
     * @return \Illuminate\Http\Response
     */
    public function storeCategory(Request $request, $classId, $subjectId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Validate user has access to this class
        if ($class->school_id != $user->school_id) {
            return response()->json(['error' => 'You do not have permission to modify this class.'], 403);
        }
        
        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:100',
        ]);
        
        // Get existing categories from subject metadata or create new
        $metadata = $subject->metadata ?? [];
        $categories = $metadata['material_categories'] ?? [];
        
        // Add new category if it doesn't already exist
        if (!in_array($validated['name'], $categories)) {
            $categories[] = $validated['name'];
            $metadata['material_categories'] = $categories;
            
            // Update subject metadata
            $subject->metadata = $metadata;
            $subject->save();
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'categories' => $categories
        ]);
    }
    
    /**
     * Get all categories for a subject.
     *
     * @param  int  $classId
     * @param  int  $subjectId
     * @return \Illuminate\Http\Response
     */
    public function getCategories($classId, $subjectId)
    {
        $user = Auth::user();
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Validate user has access to this class
        if ($class->school_id != $user->school_id) {
            return response()->json(['error' => 'You do not have permission to access this class.'], 403);
        }
        
        // Get categories from subject metadata
        $metadata = $subject->metadata ?? [];
        $categories = $metadata['material_categories'] ?? [];
        
        // Also get unique categories from existing materials
        $materialCategories = ReadingMaterial::where('subject_id', $subject->id)
            ->where('class_id', $class->id)
            ->whereNotNull('category')
            ->distinct()
            ->pluck('category')
            ->toArray();
        
        // Merge both arrays and remove duplicates
        $allCategories = array_unique(array_merge($categories, $materialCategories));
        
        return response()->json([
            'success' => true,
            'categories' => $allCategories
        ]);
    }
}
