<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TuteController extends Controller
{
    // සියලුම Tutes ලබාගැනීම
    public function index()
    {
        // tutes ටික ලබාගන්නා විට file එකට අදාළ සම්පූර්ණ URL එකත් සාදා ගනිමු
        $tutes = Tute::latest()->get()->map(function($tute) {
            $tute->file_url = $tute->file_path ? asset('storage/' . $tute->file_path) : null;
            return $tute;
        });

        return response()->json($tutes, 200);
    }

    // අලුත් Tute එකක් ෆයිල් එකත් සමඟ සුරැකීම
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'  => 'required|string|max:255',
            'grade'  => 'required|string',
            'lesson' => 'required', 
            'status' => 'required|in:Active,Draft',
            'file'   => 'required|file|mimes:pdf,doc,docx,zip|max:10240', // Max 10MB Files
        ]);

        // 1 -> 01 ලෙස පිරවීම
        $validated['lesson'] = str_pad($request->lesson, 2, '0', STR_PAD_LEFT);

        // ෆයිල් එක storage/app/public/tutes ෆෝල්ඩර් එකට අප්ලෝඩ් කිරීම
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('tutes', 'public');
            $validated['file_path'] = $path;
        }

        $tute = Tute::create($validated);
        $tute->file_url = asset('storage/' . $tute->file_path);

        return response()->json($tute, 201);
    }

    // Tute එකක් ඉවත් කිරීම
    public function destroy($id)
    {
        $tute = Tute::find($id);
        
        if (!$tute) {
            return response()->json(['message' => 'Tute not found'], 404);
        }

        // Database එකෙන් අයින් කරන ගමන් Storage එකේ තියෙන ෆයිල් එකත් ඩිලීට් කිරීම
        if ($tute->file_path) {
            Storage::disk('public')->delete($tute->file_path);
        }

        $tute->delete();
        return response()->json(['message' => 'Tute deleted successfully'], 200);
    }
}