<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\LearningResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LearningResourceController extends Controller
{
    // 1. සියලුම දත්ත ලබා ගැනීම
    public function index()
    {
        $resources = LearningResource::orderBy('created_at', 'desc')->get();
        return response()->json($resources, 200);
    }

    // 2. පන්තිය (Grade) අනුව Active දත්ත පමණක් ලබා ගැනීම
    public function getByGrade($grade)
    {
        $resources = LearningResource::where('grade', $grade)
            ->where('status', 'Active')
            ->orderBy('lesson', 'asc') // පාඩම් අනුපිළිවෙලට (01, 02, 03...)
            ->get();

        return response()->json($resources, 200);
    }

    // 3. නව දත්තයක් ඇතුළත් කිරීම (Store)
    public function store(Request $request)
    {
        $request->validate([
            'title'     => 'required|string|max:255',
            'grade'     => 'required|string',
            'lesson'    => 'required|integer', // මෙතන integer වැලිඩේට් කරනවා
            'type'      => 'required|in:tute,video,short_note',
            'status'    => 'required|in:Active,Draft',
            'file'      => 'required_unless:type,video|nullable|file|mimes:pdf,doc,docx,zip|max:10240',
            'video_url' => 'required_if:type,video|nullable|url',
        ]);

        $data = $request->only(['title', 'grade', 'type', 'status']);
        
        // Lesson එක "01", "02" ආදී වශයෙන් සකස් කිරීම
        $data['lesson'] = str_pad($request->lesson, 2, '0', STR_PAD_LEFT);
        $data['file_path'] = null;
        $data['video_url'] = null;

        // Type එක video නම්
        if ($request->type === 'video') {
            $data['video_url'] = $request->video_url;
        } 
        // Type එක tute හෝ short_note නම් සහ file එකක් ඇත්නම්
        elseif (in_array($request->type, ['tute', 'short_note'])) {
            if ($request->hasFile('file') && $request->file('file')->isValid()) {
                $file = $request->file('file');
                $filename = time() . '_' . $file->getClientOriginalName();
                // 'resources' නමැති public folder එකේ save කිරීම
                $path = $file->storeAs('resources', $filename, 'public');
                $data['file_path'] = $path;
            }
        }

        $resource = LearningResource::create($data);

        return response()->json($resource, 201);
    }

    // 4. දත්ත යාවත්කාලීන කිරීම (Update) - 💡 අලුතින් එකතු කරන ලදී
    public function update(Request $request, $id)
    {
        $resource = LearningResource::findOrFail($id);

        $request->validate([
            'title'     => 'required|string|max:255',
            'grade'     => 'required|string',
            'lesson'    => 'required|integer',
            'type'      => 'required|in:tute,video,short_note',
            'status'    => 'required|in:Active,Draft',
            'file'      => 'nullable|file|mimes:pdf,doc,docx,zip|max:10240',
            'video_url' => 'required_if:type,video|nullable|url',
        ]);

        $data = $request->only(['title', 'grade', 'type', 'status']);
        $data['lesson'] = str_pad($request->lesson, 2, '0', STR_PAD_LEFT);

        if ($request->type === 'video') {
            // කලින් file එකක් තිබුනා නම් එය delete කරයි
            if ($resource->file_path) {
                Storage::disk('public')->delete($resource->file_path);
            }
            $data['video_url'] = $request->video_url;
            $data['file_path'] = null;
        } else {
            $data['video_url'] = null;
            
            // අලුත් file එකක් upload කර ඇත්නම් පමණක් පැරණි එක අයින් කර අලුත් එක දමයි
            if ($request->hasFile('file') && $request->file('file')->isValid()) {
                if ($resource->file_path) {
                    Storage::disk('public')->delete($resource->file_path);
                }
                $file = $request->file('file');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('resources', $filename, 'public');
                $data['file_path'] = $path;
            } else {
                $data['file_path'] = $resource->file_path; // පැරණි path එකම තබා ගනී
            }
        }

        $resource->update($data);

        return response()->json($resource, 200);
    }

    // 5. පද්ධතියෙන් ඉවත් කිරීම (Destroy)
    public function destroy($id)
    {
        $resource = LearningResource::findOrFail($id);

        // Storage එකෙන් file එක delete කිරීම
        if ($resource->file_path) {
            Storage::disk('public')->delete($resource->file_path);
        }

        $resource->delete();

        return response()->json(['message' => 'Resource deleted successfully'], 200);
    }
}