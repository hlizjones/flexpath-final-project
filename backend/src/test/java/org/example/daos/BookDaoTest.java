package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Book;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.KeyHolder;

import javax.sql.DataSource;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doAnswer;

/**
 * Tests the Book Dao.
 */
@ExtendWith(MockitoExtension.class)
public class BookDaoTest {
    @Mock
    JdbcTemplate jdbcTemplate;
    @Mock
    DataSource dataSource;

    BookDao bookDao;

    @BeforeEach
    public void setUp () {
        bookDao = new BookDao(dataSource);
        bookDao.setJdbcTemplate(jdbcTemplate);
    }


    @Test
    public void BookDao_getBooksWithNullFields_ReturnsListOfBooks () {
        //Arrange
        Book book1 = new Book(1, "Atomic Habits", "James Clear", "Self Help");
        Book book2 = new Book(2, "Gone Girl", "Gillian Flynn", "Mystery");
        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(book1);
        expectedBooks.add(book2);

        Book book = new Book();

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedBooks);

        //Act
        List<Book> actualBooks = bookDao.getBooks(book);

        //Assert
        assertEquals(expectedBooks, actualBooks);
        assertEquals(2, actualBooks.size());
    }

    @Test
    public void BookDao_getBooksWithTitleField_ReturnsListOfBooks () {
        //Arrange
        Book book1 = new Book(1, "Atomic Habits", "James Clear", "Self Help");
        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(book1);

        Book book = new Book();
        book.setTitle("Atomic Habits");

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedBooks);

        //Act
        List<Book> actualBooks = bookDao.getBooks(book);

        //Assert
        assertEquals(expectedBooks, actualBooks);
        assertEquals(1, actualBooks.size());
    }

    @Test
    public void BookDao_getBooksWithAuthorField_ReturnsListOfBooks () {
        //Arrange
        Book book1 = new Book(1, "Atomic Habits", "James Clear", "Self Help");
        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(book1);

        Book book = new Book();
        book.setAuthor("James Clear");

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedBooks);

        //Act
        List<Book> actualBooks = bookDao.getBooks(book);

        //Assert
        assertEquals(expectedBooks, actualBooks);
        assertEquals(1, actualBooks.size());
    }

    @Test
    public void BookDao_getBooksWithGenreField_ReturnsListOfBooks () {
        //Arrange
        Book book1 = new Book(1, "Atomic Habits", "James Clear", "Self Help");
        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(book1);

        Book book = new Book();
        book.setGenre("Self Help");

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedBooks);

        //Act
        List<Book> actualBooks = bookDao.getBooks(book);

        //Assert
        assertEquals(expectedBooks, actualBooks);
        assertEquals(1, actualBooks.size());
    }

    @Test
    public void BookDao_getBooksWithTitleAndAuthorFields_ReturnsListOfBooks () {
        //Arrange
        Book book1 = new Book(1, "Atomic Habits", "James Clear", "Self Help");
        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(book1);

        Book book = new Book();
        book.setTitle("Atomic Habits");
        book.setAuthor("James Clear");

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedBooks);

        //Act
        List<Book> actualBooks = bookDao.getBooks(book);

        //Assert
        assertEquals(expectedBooks, actualBooks);
        assertEquals(1, actualBooks.size());
    }

    @Test
    public void BookDao_getBooksWithTitleAndGenreFields_ReturnsListOfBooks () {
        //Arrange
        Book book1 = new Book(1, "Atomic Habits", "James Clear", "Self Help");
        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(book1);

        Book book = new Book();
        book.setTitle("Atomic Habits");
        book.setGenre("Self Help");

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedBooks);

        //Act
        List<Book> actualBooks = bookDao.getBooks(book);

        //Assert
        assertEquals(expectedBooks, actualBooks);
        assertEquals(1, actualBooks.size());
    }

    @Test
    public void BookDao_getBooksWithAuthorAndGenreFields_ReturnsListOfBooks () {
        //Arrange
        Book book1 = new Book(1, "Atomic Habits", "James Clear", "Self Help");
        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(book1);

        Book book = new Book();
        book.setAuthor("James Clear");
        book.setGenre("Self Help");

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedBooks);

        //Act
        List<Book> actualBooks = bookDao.getBooks(book);

        //Assert
        assertEquals(expectedBooks, actualBooks);
        assertEquals(1, actualBooks.size());
    }

    @Test
    public void BookDao_getBooksWithAllFields_ReturnsListOfBooks () {
        //Arrange
        Book book1 = new Book(1, "Atomic Habits", "James Clear", "Self Help");
        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(book1);

        Book book = new Book();
        book.setTitle("Atomic Habits");
        book.setAuthor("James Clear");
        book.setGenre("Self Help");

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedBooks);

        //Act
        List<Book> actualBooks = bookDao.getBooks(book);

        //Assert
        assertEquals(expectedBooks, actualBooks);
        assertEquals(1, actualBooks.size());
    }

    @Test
    public void BookDao_getBooks_ReturnsEmptyArray () {
        //Arrange
        List<Book> emptyList = new ArrayList<>();

        Book book = new Book();

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(emptyList);

        //Act
        List<Book> actualBooks = bookDao.getBooks(book);

        //Assert
        assertTrue(actualBooks.isEmpty());
    }

    @Test
    public void BookDao_getBookById_ReturnsBook () {
        //Arrange
        Book expectedBook = new Book(1, "Atomic Habits", "James Clear", "Self Help");

        Mockito.when(jdbcTemplate.queryForObject(eq("SELECT * FROM books WHERE book_id = ?"), any(RowMapper.class), anyInt()))
                .thenReturn(expectedBook);

        //Act
        Book actualBook = bookDao.getBookById(1);

        //Assert
        assertEquals(expectedBook, actualBook);
    }

    @Test
    public void BookDao_getBookById_ReturnsNull () {
        //Arrange
        Mockito.when(jdbcTemplate.queryForObject(eq("SELECT * FROM books WHERE book_id = ?"), any(RowMapper.class), anyInt()))
                .thenReturn(null);

        //Act
        Book actualBook = bookDao.getBookById(1);

        //Assert
        assertNull(actualBook);
    }

@Test
    public void BookDao_createBook_ReturnsBook () {
        //Arrange
        Book expectedBook = new Book(1, "Atomic Habits", "James Clear", "Self Help");

        doAnswer(invocation -> {
            KeyHolder keyHolder = invocation.getArgument(1);
            Map<String, Object> keyMap = new HashMap<String, Object>();
            keyMap.put("book_id", 1L);
            List<Map<String, Object>> generatedKeys = keyHolder.getKeyList();
            generatedKeys.clear();
            generatedKeys.add(keyMap);
            return 1;

        }).when(jdbcTemplate).update(any(PreparedStatementCreator.class), any(KeyHolder.class));

        BookDao bookDao1 = Mockito.spy(bookDao);
        Mockito.doReturn(expectedBook).when(bookDao1).getBookById(1);

        //Act
        Book actualBook = bookDao1.createBook(expectedBook);

        //Assert
        assertEquals(expectedBook, actualBook);
    }

    @Test
    public void BookDao_createBook_ThrowsNewDaoExceptionWhenKeyIsNull () {
        //Arrange
        Book book = new Book(1, "Atomic Habits", "James Clear", "Self Help");

        doAnswer(invocation -> {
            KeyHolder keyHolder = invocation.getArgument(1);
            Map<String, Object> keyMap = new HashMap<String, Object>();
            keyMap.put("book_id", null);
            List<Map<String, Object>> generatedKeys = keyHolder.getKeyList();
            generatedKeys.clear();
            generatedKeys.add(keyMap);
            return 0;

        }).when(jdbcTemplate).update(any(PreparedStatementCreator.class), any(KeyHolder.class));

        //Act and Assert
        assertThrows(DaoException.class,
                () -> {
                    bookDao.createBook(book);
                });
    }

    @Test
    public void BookDao_createBook_ThrowsNewDaoException () {
        //Arrange
        Book book = new Book(1, "Atomic Habits", "James Clear", "Self Help");

        Mockito.when(jdbcTemplate.update(any(PreparedStatementCreator.class), any(KeyHolder.class)))
                .thenThrow(new DataAccessException("..."){ });

        //Act and Assert
        assertThrows(DaoException.class,
                () -> {
                    bookDao.createBook(book);
                });
    }

    @Test
    public void BookDao_updateBook_ReturnsBook () {
        //Arrange
        Book expectedBook = new Book(1, "Atomic Habits", "James Clear", "Self Help");

        Mockito.when(jdbcTemplate.update(eq("UPDATE books SET title = ?, author = ?, genre = ? WHERE book_id  = ?"), anyString(), anyString(), anyString(), anyInt()))
                .thenReturn(1);

        BookDao bookDao1 = Mockito.spy(bookDao);
        Mockito.doReturn(expectedBook).when(bookDao1).getBookById(1);

        //Act
        Book actualBook = bookDao1.updateBook(expectedBook);

        //Assert
        assertEquals(expectedBook, actualBook);
    }

    @Test
    public void BookDao_updateBook_ThrowsNewDaoException () {
        //Arrange
        Book book = new Book(1, "Atomic Habits", "James Clear", "Self Help");

        Mockito.when(jdbcTemplate.update(eq("UPDATE books SET title = ?, author = ?, genre = ? WHERE book_id  = ?"), anyString(), anyString(), anyString(), anyInt()))
                .thenReturn(0);

        //Act and Assert
        assertThrows(DaoException.class,
                () -> {
                    bookDao.updateBook(book);
                });
    }

    @Test
    public void BookDao_deleteBook_ReturnsInt () {
        //Arrange
        Mockito.when(jdbcTemplate.update(eq("DELETE FROM books WHERE book_id = ?"), anyInt()))
                .thenReturn(1);

        //Act
        int numberReturned = bookDao.deleteBook(5);

        //Assert
        assertEquals(1, numberReturned);
        assertInstanceOf(Integer.class, numberReturned);
    }
}
