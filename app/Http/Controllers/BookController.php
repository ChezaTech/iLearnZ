<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\School;
use App\Models\BookBorrowing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Store a newly created book in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'nullable|string|max:20',
            'publication_year' => 'nullable|integer',
            'category' => 'nullable|string|max:100',
            'school_id' => 'required|exists:schools,id',
        ]);

        $book = Book::create($validated);

        return redirect()->back()->with('success', 'Book added successfully!');
    }

    /**
     * Update the specified book in storage.
     */
    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'nullable|string|max:20',
            'publication_year' => 'nullable|integer',
            'category' => 'nullable|string|max:100',
        ]);

        $book->update($validated);

        return redirect()->back()->with('success', 'Book updated successfully!');
    }

    /**
     * Remove the specified book from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->back()->with('success', 'Book deleted successfully!');
    }

    /**
     * Borrow a book.
     */
    public function borrow(Request $request, Book $book)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'due_date' => 'required|date|after:today',
        ]);

        // Check if the book is already borrowed
        $isBorrowed = BookBorrowing::where('book_id', $book->id)
            ->whereNull('returned_at')
            ->exists();

        if ($isBorrowed) {
            return redirect()->back()->with('error', 'This book is already borrowed.');
        }

        // Create a new borrowing record
        BookBorrowing::create([
            'book_id' => $book->id,
            'user_id' => $validated['user_id'],
            'borrowed_at' => now(),
            'due_date' => $validated['due_date'],
        ]);

        return redirect()->back()->with('success', 'Book borrowed successfully!');
    }

    /**
     * Return a book.
     */
    public function return(Book $book)
    {
        if (!$book->is_borrowed) {
            return redirect()->back()->with('error', 'This book is not currently borrowed.');
        }

        // Find the active borrowing record
        $borrowing = BookBorrowing::where('book_id', $book->id)
            ->where('returned_at', null)
            ->first();

        if ($borrowing) {
            $borrowing->returned_at = now();
            $borrowing->save();
            return redirect()->back()->with('success', 'Book has been marked as returned.');
        }

        return redirect()->back()->with('error', 'No active borrowing record found for this book.');
    }

    /**
     * Get all books for a specific school.
     */
    public function getSchoolBooks(School $school)
    {
        $books = Book::where('school_id', $school->id)
            ->with(['borrowings' => function($query) {
                $query->whereNull('returned_at');
            }])
            ->get()
            ->map(function($book) {
                // Check if the book is currently borrowed
                $is_borrowed = $book->borrowings->count() > 0;
                
                // Add the is_borrowed flag to the book
                $book->is_borrowed = $is_borrowed;
                
                // Remove the borrowings relationship from the response
                unset($book->borrowings);
                
                return $book;
            });

        return response()->json($books);
    }
}
