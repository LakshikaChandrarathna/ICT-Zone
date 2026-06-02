<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\LearningResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LearningResourceController extends Controller
{
    // සියලුම දත්ත නවතම ඒවා මුලින්ම එන සේ ලබා ගැනීම
    public function index()
    {
        $resources = LearningResource::orderBy('created_at', 'desc')->get();
        return response()->json($resources, 200);
    }

    // නව සම්පතක් පද්ධතියට ඇතුළත් කිරීම
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'grade' => 'required|string',
            'lesson' => 'required|integer',
            'type' => 'required|in:tute,video,short_note',
            'status' => 'required|in:Active,Draft',
            'file' => 'required_if:type,tute,short_note|file|mimes:pdf,doc,docx,zip|max:10240', // Max 10MB
            'video_url' => 'required_if:type,video|nullable|url',
        ]);

        $data = $request->only(['title', 'grade', 'lesson', 'type', 'status', 'video_url']);

        // වීඩියෝවක් නොවේ නම් PDF/File එක Upload කර Path එක සකසයි
        if ($request->hasFile('file') && $request->type !== 'video') {
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            // storage/app/public/resources ෆෝල්ඩරයේ සුරැකීම
            $path = $file->storeAs('resources', $filename, 'public');
            $data['file_path'] = $path;
            $data['video_url'] = null; // ආරක්ෂිත පියවරක් ලෙස වීඩියෝ ලින්ක් එක හිස් කරයි
        }

        // වීඩියෝවක් නම් File Path එක හිස් කරයි
        if ($request->type === 'video') {
            $data['file_path'] = null;
        }

        $resource = LearningResource::create($data);

        return response()->json($resource, 201);
    }

    // පද්ධතියෙන් ඉවත් කිරීම
    public function destroy($id)
    {
        $resource = LearningResource::findOrFail($id);

        // සේවාදායකයේ ගොනුවක් ඇත්නම් එයද මකා දමයි
        if ($resource->file_path) {
            Storage::disk('public')->delete($resource->file_path);
        }

        $resource->delete();

        return response()->json(['message' => 'Resource deleted successfully'], 200);
    }
}