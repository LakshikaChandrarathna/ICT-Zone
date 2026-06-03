<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LearningResource; // 👈 අලුත් Model එක Import කළා
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TuteController extends Controller
{
    public function index()
    {
        // Model එකේ Accessor එක ($appends) ඇති නිසා map() කර කර URL හදන්න අවශ්‍ය නැත.
        $tutes = LearningResource::latest()->get();

        return response()->json($tutes, 200);
    }

    public function store(Request $request)
    {
        // Dynamic Validation: type එක අනුව file හෝ video_url required වේ
        $validated = $request->validate([
            'title'     => 'required|string|max:255',
            'grade'     => 'required|string',
            'lesson'    => 'required', 
            'type'      => 'required|in:tute,short_note,video',
            'status'    => 'required|in:Active,Draft',
            'video_url' => 'required_if:type,video|nullable|url',
            'file'      => 'required_if:type,tute,short_note|nullable|file|mimes:pdf,doc,docx,zip|max:10240',
        ]);

        // Lesson අංකය "01", "02" ලෙස format කිරීම
        $validated['lesson'] = str_pad($request->lesson, 2, '0', STR_PAD_LEFT);
        
        // Default values මුලින්ම null කර ගනිමු
        $validated['file_path'] = null;
        $validated['video_url'] = null;

        // Video වර්ගයේ ඒවා සඳහා video_url පමණක් ගනී
        if ($request->type === 'video') {
            $validated['video_url'] = $request->video_url;
        } 
        // Tute හෝ Short note සඳහා file එකක් ඇත්නම් එය save කරයි
        elseif (in_array($request->type, ['tute', 'short_note'])) {
            if ($request->hasFile('file') && $request->file('file')->isValid()) {
                // 'tutes' නමැති public folder එකේ save කිරීම (කලින් තිබූ ෆෝල්ඩර් නමමයි)
                $path = $request->file('file')->store('tutes', 'public');
                $validated['file_path'] = $path;
            }
        }

        // learning_resources table එකට ඩේටා ඇතුළත් කිරීම
        $tute = LearningResource::create($validated);

        // මෙහිදී Model එක හරහා automatic 'file_url' එක එකතු වී response එක ලැබෙනවා
        return response()->json($tute, 201);
    }

    public function destroy($id)
    {
        // learning_resources table එකෙන් දත්ත සොයයි
        $tute = LearningResource::find($id);
        
        if (!$tute) {
            return response()->json(['message' => 'Resource not found'], 404);
        }

        // Storage එකෙන් file එක delete කිරීම
        if ($tute->file_path) {
            Storage::disk('public')->delete($tute->file_path);
        }

        $tute->delete();
        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}