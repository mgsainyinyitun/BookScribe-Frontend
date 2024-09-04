import Book from "./Book";

class BookStorage {
    public books: Book[];
    public focusedBook: Book | null = null;

    constructor(booksargs?: Book[]) {
        this.books = booksargs ? booksargs : [];
    }
}

export default BookStorage;