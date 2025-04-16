package org.example.controllers;

import org.example.daos.BookDao;
import org.example.models.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

/**
 * Controller for books.
 *
 */
@RestController
@RequestMapping("api/books")
@PreAuthorize("hasAuthority('ADMIN')")
public class BookController {
    /**
     * The book data access object.
     */
    @Autowired
    private BookDao bookDao;

    /**
     * Gets books.
     *
     * @param title The title of the book.
     * @param author The author of the book.
     * @param genre the genre of the book.
     * @return A list of books.
     */
    @GetMapping
    @PreAuthorize("permitAll()")
    public List<Book> getBooks(@RequestParam(required = false) String title,
                               @RequestParam(required = false) String author,
                               @RequestParam(required = false) String genre) {
        Book book = new Book();
        if (title != null) {
            book.setTitle(title);
        } if (author != null) {
            book.setAuthor(author);
        } if (genre != null) {
            book.setGenre(genre);
        }
        return bookDao.getBooks(book);
    }

    /**
     * Gets a book by id.
     *
     * @param id The id of the book.
     * @return The book with the given id.
     */
    @GetMapping(path = "/{id}")
    @PreAuthorize("permitAll()")
    public Book get(@PathVariable int id) {
        Book book = bookDao.getBookById(id);
        if (book == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found");
        }
        return book;
    }

    /**
     * Creates a new book.
     *
     * @param book The book to create.
     * @return The book created.
     */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Book create(@RequestBody Book book) {
        return bookDao.createBook(book);
    }

    /**
     * Updates a book.
     *
     * @param book The new book.
     * @param id The id of the book.
     * @return The updated book.
     */
    @PutMapping(path = "/{id}")
    public Book update(@RequestBody Book book, @PathVariable int id) {
        if (bookDao.getBookById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found");
        }
        book.setId(id);
        return bookDao.updateBook(book);
    }

    /**
     * Deletes a book.
     *
     * @param id The id of the order.
     * @return Book deletion status.
     */
    @DeleteMapping(path = "/{id}")
    public String delete(@PathVariable int id) {
        if (bookDao.getBookById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found");
        }
        int rowsAffected = bookDao.deleteBook(id);
        if (rowsAffected == 1) {
            return ("Book deleted.");
        } else {
            return ("Failed to delete book.");
        }
    }
}
