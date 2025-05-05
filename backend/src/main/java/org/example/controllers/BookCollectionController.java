package org.example.controllers;

import org.example.daos.BookCollectionDao;
import org.example.models.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Objects;

/**
 * Controller for collections.
 *
 */
@RestController
@RequestMapping("api/book_collection")
@PreAuthorize("permitAll()")
public class BookCollectionController {
    /**
     * The collection data access object.
     */
    @Autowired
    private BookCollectionDao bookCollectionDao;

    /**
     * Gets books from a collection.
     *
     * @param id The id of the collection.
     * @param principal The authenticated user.
     * @return  List of Book.
     */
    @GetMapping
    public List<Book> getBooksByCollection(@RequestParam int id, Principal principal) {
        if (isAdmin() || Objects.equals(bookCollectionDao.getCollectionUsername(id), principal.getName()) || !bookCollectionDao.getCollectionPrivacy(id)) {
                return bookCollectionDao.getBooksByCollectionId(id);
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
            }
    }

    /**
     * Adds a book to a collection.
     *
     * @param bookId The id of the book.
     * @param collectionId The id of the collection.
     * @param principal The authenticated user.
     * @return  List of Book.
     */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public String addBookToCollection(@RequestParam int bookId, @RequestParam int collectionId, Principal principal) {
        int rowsAffected;
        if (isAdmin() || Objects.equals(bookCollectionDao.getCollectionUsername(collectionId), principal.getName())) {
            rowsAffected = bookCollectionDao.addBookToCollection(bookId, collectionId);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        if (rowsAffected == 1) {
            return ("Book added.");
        } else {
            return ("Failed to add book.");
        }
    }

    /**
     * Adds a book to a collection.
     *
     * @param bookId The id of the book.
     * @param collectionId The id of the collection.
     * @param principal The authenticated user.
     * @return  List of Book.
     */
    @DeleteMapping
    public String deleteBooksFromCollection(@RequestParam int bookId, @RequestParam int collectionId, Principal principal) {
        int rowsAffected;
        if (isAdmin() || Objects.equals(bookCollectionDao.getCollectionUsername(collectionId), principal.getName())) {
            rowsAffected = bookCollectionDao.deleteBookFromCollection(bookId, collectionId);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        if (rowsAffected == 1) {
            return ("Book deleted.");
        } else {
            return ("Failed to delete book.");
        }
    }

    /**
     * Checks if user has admin role
     * @return boolean (True if user is admin, false if user is not admin).
     */
    private boolean isAdmin() {
        return SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities().stream().anyMatch(a ->
                        a.getAuthority().equals("ADMIN"));
    }
}
