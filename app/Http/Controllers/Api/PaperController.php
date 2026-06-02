<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Paper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PaperController extends Controller
{
    /**
     * සියලුම ප්‍රශ්න පත්‍ර ලබාගැනීම (React View එක සඳහා)
     */
    public function index()
    {
        try {
            // අලුත්ම පේපර්ස් මුලින්ම එන පරිදි දත්ත ලබාගෙන React එකට ගැළපෙන ආකෘතියට සකස් කිරීම
            $papers = Paper::latest()->get()->map(function($paper) {
                return [
                    'id'        => $paper->id,
                    'title'     => $paper->title,
                    'grade'     => $paper->grade,
                    'year'      => $paper->year,
                    'type'      => $paper->type,
                    // සිසුන්ට ඩවුන්ලෝඩ් කරගන්න සම්පූර්ණ URL එක සකස් කිරීම
                    'file_url'  => asset('storage/' . $paper->file_path),
                ];
            });

            return response()->json($papers, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * අලුත් පේපර් එකක් අප්ලෝඩ් කර සේව් කිරීම (Admin Panel එක සඳහා)
     */
    public function store(Request $request)
    {
        // Validation ක්‍රියාවලිය
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'grade' => 'required|string',
            'year'  => 'required|string',
            'type'  => 'required|string',
            'file'  => 'required|file|mimes:pdf|max:15360', // උපරිම 15MB PDF
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation input errors',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $validated = $validator->validated();

            // ෆයිල් එක storage/app/public/papers ෆෝල්ඩර් එකට එකතු කිරීම
            if ($request->hasFile('file')) {
                $path = $request->file('file')->store('papers', 'public');
                $validated['file_path'] = $path;
            }

            $paper = Paper::create($validated);
            
            // Response එක සඳහාද සම්පූර්ණ URL එක එකතු කිරීම
            $paper->file_url = asset('storage/' . $paper->file_path);

            return response()->json($paper, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Upload Server Error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * පේපර් එකක් පද්ධතියෙන් සහ සර්වර් එකෙන් සම්පූර්ණයෙන්ම ඉවත් කිරීම
     */
    public function destroy($id)
    {
        $paper = Paper::find($id);

        if (!$paper) {
            return response()->json(['message' => 'Paper not found in database'], 404);
        }

        try {
            // Storage එකේ ඇති සැබෑ PDF ෆයිල් එක සර්වර් එකෙන් මකා දැමීම
            if ($paper->file_path) {
                Storage::disk('public')->delete($paper->file_path);
            }

            // ඩේටාබේස් එකෙන් රෙකෝඩ් එක මැකීම
            $paper->delete();
            return response()->json(['message' => 'Paper deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Delete Error: ' . $e->getMessage()], 500);
        }
    }
}