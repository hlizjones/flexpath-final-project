package org.example.daos;

import org.example.models.Book;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import javax.sql.DataSource;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;

/**
 * Tests the BookCollection Dao.
 */
@ExtendWith(MockitoExtension.class)
public class BookCollectionDaoTest {
    @Mock
    JdbcTemplate jdbcTemplate;
    @Mock
    DataSource dataSource;

    BookCollectionDao bookCollectionDao;

    @BeforeEach
    public void setUp () {
        bookCollectionDao = new BookCollectionDao(dataSource);
        bookCollectionDao.setJdbcTemplate(jdbcTemplate);
    }

    @Test
    public void BookCollectionDao_getBooksByCollectionId_ReturnsListOfBooks () {
        Book book1 = new Book(1, "Atomic Habits", "James Clear", "Self Help");
        Book book2 = new Book(2, "Gone Girl", "Gillian Flynn", "Mystery");
        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(book1);
        expectedBooks.add(book2);

        Mockito.when(jdbcTemplate.query(eq("SELECT * FROM books LEFT JOIN book_collections on book_collections.book_id = books.book_id WHERE book_collections.collection_id = ? ORDER BY books.title ASC"), any(RowMapper.class), anyInt()))
                .thenReturn(expectedBooks);

        List<Book> actualBooks = bookCollectionDao.getBooksByCollectionId(1);

        assertEquals(expectedBooks, actualBooks);
    }

    @Test
    public void BookCollectionDao_getBooksByCollectionId_ReturnsEmptyArray () {
        List<Book> expectedBooks = new ArrayList<>();

        Mockito.when(jdbcTemplate.query(eq("SELECT * FROM books LEFT JOIN book_collections on book_collections.book_id = books.book_id WHERE book_collections.collection_id = ? ORDER BY books.title ASC"), any(RowMapper.class), anyInt()))
                .thenReturn(expectedBooks);

        List<Book> actualBooks = bookCollectionDao.getBooksByCollectionId(5);

        assertTrue(actualBooks.isEmpty());
    }

    @Test
    public void BookCollectionDao_getCollectionUsername_ReturnsUsername () {
        String expectedUsername = "admin";

        Mockito.when(jdbcTemplate.queryForObject(eq("SELECT username FROM collections WHERE collection_id = ?"), eq(String.class), anyInt()))
                .thenReturn(expectedUsername);

        String actualUsername = bookCollectionDao.getCollectionUsername(1);

        assertEquals(expectedUsername, actualUsername);
    }

    @Test
    public void BookCollectionDao_getCollectionUsername_ReturnsNull () {
        Mockito.when(jdbcTemplate.queryForObject(eq("SELECT username FROM collections WHERE collection_id = ?"), eq(String.class), anyInt()))
                .thenReturn(null);

        String actualUsername = bookCollectionDao.getCollectionUsername(1);

        assertNull(actualUsername);
    }

    @Test
    public void BookCollectionDao_getCollectionPrivacy_ReturnsPrivacy () {
        Boolean expectedPrivacy = true;

        Mockito.when(jdbcTemplate.queryForObject(eq("SELECT privacy FROM collections WHERE collection_id = ?"), eq(Boolean.class), anyInt()))
                .thenReturn(expectedPrivacy);

        Boolean actualPrivacy = bookCollectionDao.getCollectionPrivacy(1);

        assertEquals(expectedPrivacy, actualPrivacy);
    }

    @Test
    public void BookCollectionDao_getCollectionPrivacy_ReturnsNull () {
        Mockito.when(jdbcTemplate.queryForObject(eq("SELECT privacy FROM collections WHERE collection_id = ?"), eq(Boolean.class), anyInt()))
                .thenReturn(null);

        Boolean actualPrivacy = bookCollectionDao.getCollectionPrivacy(1);

        assertNull(actualPrivacy);
    }

    @Test
    public void BookCollectionDao_addBookToCollection_ReturnsInt () {
        Mockito.when(jdbcTemplate.update(eq("INSERT INTO book_collections (book_id, collection_id) VALUES (?, ?)"), anyInt(), anyInt()))
                .thenReturn(1);

        int numberReturned = bookCollectionDao.addBookToCollection(1, 1);

        assertEquals(1, numberReturned);
    }

    @Test
    public void BookCollectionDao_deleteBookFromCollection_ReturnsInt () {
        Mockito.when(jdbcTemplate.update(eq("DELETE FROM book_collections WHERE book_id = ? AND collection_id = ?"), anyInt(), anyInt()))
                .thenReturn(1);

        int numberReturned = bookCollectionDao.deleteBookFromCollection(1, 1);

        assertEquals(1, numberReturned);
        assertInstanceOf(Integer.class, numberReturned);
    }
}
