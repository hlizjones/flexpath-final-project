package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Book;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Data access object for books.
 */
@Component
public class BookDao {
    /**
     * The JDBC template for querying the database.
     */
    private final JdbcTemplate jdbcTemplate;

    /**
     * Creates a new book data access object
     *
     * @param dataSource The data source for the DAO.
     */
    public BookDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    /**
     * Gets books.
     *
     * @param book A book object.
     * @return List of Book.
     */
    public List<Book> getBooks(Book book) {
        // using my querybuilder here
        return jdbcTemplate.query(query, this::mapToBook);
    }

    /**
     * Gets a book by id.
     *
     * @param id The id of the book.
     * @return Book
     */
    public Book getBookById(int id) {
        return jdbcTemplate.queryForObject("SELECT * FROM books WHERE book_id = ?", this::mapToBook, id);
    }

    /**
     * Creates a new book.
     *
     * @param book The book to create.
     * @return Book The created book.
     */
    public Book createBook(Book book) {
        try {
            String title = book.getTitle();
            String author = book.getAuthor();
            String genre = book.getGenre();
            String username = book.getUsername();
            PreparedStatementCreator psc = con -> {
                PreparedStatement ps = con.prepareStatement("INSERT INTO books (title, author, genre, username) VALUES (?, ?, ?, ?)", new String[]{"book_id"});
                ps.setString(1, title);
                ps.setString(2, author);
                ps.setString(3, genre);
                ps.setString(4, username);
                return ps;
            };
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(psc, keyHolder);
            Number key = keyHolder.getKey();
            return getBookById(key.intValue());
        } catch (EmptyResultDataAccessException e) {
            throw new DaoException("Failed to create book.");
        }
    }

    /**
     * Updates a book.
     *
     * @param book The book to update.
     * @return The updated book.
     */
    public Book updateBook(Book book) {
        int id = book.getId();
        String title = book.getTitle();
        String author = book.getAuthor();
        String genre = book.getGenre();
        String username = book.getUsername();
        int rowsAffected = jdbcTemplate.update(
                "UPDATE books SET title = ?, author = ?, genre = ?, username = ? WHERE book_id  = ?",
                title,
                author,
                genre,
                username,
                id
                );
                if (rowsAffected == 0){
                    throw new DaoException("Zero rows affected, expected at least one.");
                } else {
                    return getBookById(id);
                }
    }

    /**
     * Deletes a book.
     *
     * @param id The id of the book to delete.
     * @return The number of rows affected (1 if an book was deleted, 0 if no book was found).
     */
    public int deleteBook(int id) {
        return jdbcTemplate.update("DELETE FROM books WHERE id = ?", id);
    }

    /**
     * Maps a row in the ResultSet to a Book object.
     *
     * @param rs The result set to map.
     * @param rowNum The row number.
     * @return Book The book object.
     * @throws SQLException If an error occurs while mapping the result set.
     */
    private Book mapToBook(ResultSet rs, int rowNum) throws SQLException {
        return new Book(
                rs.getInt("book_id"),
                rs.getString("title"),
                rs.getString("author"),
                rs.getString("genre"),
                rs.getString("username")
        );
    }
}



