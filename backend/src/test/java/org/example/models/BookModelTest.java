package org.example.models;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests the Book Model.
 */
public class BookModelTest {

    @Test
    public void testBookConstructorAndGetters() {
        Book book = new Book(1, "Test Title", "Test Author", "Test Genre");
        assertEquals(1, book.getId());
        assertEquals("Test Title", book.getTitle());
        assertEquals("Test Author", book.getAuthor());
        assertEquals("Test Genre", book.getGenre());
    }

    @Test
    public void testBookSetters() {
        Book book = new Book();

        book.setId(1);
        book.setTitle("Test Title");
        book.setAuthor("Test Author");
        book.setGenre("Test Genre");

        assertEquals(1, book.getId());
        assertEquals("Test Title", book.getTitle());
        assertEquals("Test Author", book.getAuthor());
        assertEquals("Test Genre", book.getGenre());
    }

}
