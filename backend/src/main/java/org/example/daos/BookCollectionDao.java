package org.example.daos;

import org.example.models.Book;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Data access object for books.
 */
@Component
public class BookCollectionDao {
    /**
     * The JDBC template for querying the database.
     */
    private JdbcTemplate jdbcTemplate;

    /**
     * Creates a new book data access object
     *
     * @param dataSource The data source for the DAO.
     */
    public BookCollectionDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    /**
     * Sets the JdbcTemplate.
     *
     * @param jdbcTemplate The JdbcTemplate.
     */
    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    };

    /**
     * Gets books in a collection.
     *
     * @param id The id of the collection.
     * @return List of Book.
     */
    public List<Book> getBooksByCollectionId(int id) {
        return jdbcTemplate.query("SELECT * FROM books LEFT JOIN book_collections on book_collections.book_id = books.book_id WHERE book_collections.collection_id = ? ORDER BY books.title ASC", this::mapToBook, id);
    }

    /**
     * Gets the username of a collection.
     *
     * @param id The id of the collection
     * @return String The username of the collection.
     */
    public String getCollectionUsername(int id) {
        try {
            return jdbcTemplate.queryForObject("SELECT username FROM collections WHERE collection_id = ?", String.class, id);
        } catch (DataAccessException e) {
            return null;
        }
    }

    /**
     * Adds book to a collection.
     *
     * @param bookId The id of the book.
     * @param collectionId The id of the collection.
     * @return The number of rows affected (1 if a review was added, 0 if no review was found).
     */
    public int addBookToCollection(int bookId, int collectionId) {
        return jdbcTemplate.update("INSERT INTO book_collections (book_id, collection_id) VALUES (?, ?)", bookId, collectionId);
    }

    /**
     * Deletes book from a collection.
     *
     * @param bookId The id of the book.
     * @param collectionId The id of the collection.
     * @return The number of rows affected (1 if a review was deleted, 0 if no review was found).
     */
    public int deleteBookFromCollection(int bookId, int collectionId) {
        return jdbcTemplate.update("DELETE FROM book_collections WHERE book_id = ? AND collection_id = ?", bookId, collectionId);
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
                rs.getString("genre")
        );
    }
}
