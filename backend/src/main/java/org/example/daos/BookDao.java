package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Book;
import org.example.utils.QueryBuilder;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

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
        QueryBuilder qb = new QueryBuilder();
        List<String> where = new ArrayList<>();
        List<String> values = new ArrayList<>();

        qb.select("*").from("books");

        if (book.getTitle() != null) {
            where.add("title");
            values.add(book.getTitle());
        } else if (book.getAuthor() != null) {
            where.add("author");
            values.add(book.getAuthor());
        }  else if (book.getGenre() != null) {
            where.add("genre");
            values.add(book.getGenre());
        }

        if (countNonNullFields(book) == 1) {
            qb.whereLike(where.toArray(new String[0]))
                    .likeValues("%" + values.get(0) + "%")
                    .orderByClauses("CASE WHEN " + where.get(0) + " = ? THEN 1 WHEN " + where.get(0) + " LIKE ? THEN 2 ELSE 3 END")
                    .orderByValues(values.get(0), "%" + values.get(0));
        } else if (countNonNullFields(book) > 1) {
            qb.whereEqual(where.toArray(new String[0]))
                    .equalValues(values.toArray(new Object[0]))
                    .orderByClauses(where.get(0) + " ASC");
        }
        PreparedStatementCreator psc = qb.build();
        return jdbcTemplate.query(psc, this::mapToBook);
    }

    /**
     * Gets a book by id.
     *
     * @param id The id of the book.
     * @return Book
     */
    public Book getBookById(int id) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM books WHERE book_id = ?", this::mapToBook, id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
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
            PreparedStatementCreator psc = con -> {
                PreparedStatement ps = con.prepareStatement("INSERT INTO books (title, author, genre) VALUES (?, ?, ?)", new String[]{"book_id"});
                ps.setString(1, title);
                ps.setString(2, author);
                ps.setString(3, genre);
                return ps;
            };
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(psc, keyHolder);
            Number key = keyHolder.getKey();
            assert key != null;
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
        int rowsAffected = jdbcTemplate.update(
                "UPDATE books SET title = ?, author = ?, genre = ? WHERE book_id  = ?",
                title,
                author,
                genre,
                id
                );
                if (rowsAffected == 0){
                    throw new DaoException("Failed to update book.");
                } else {
                    return getBookById(id);
                }
    }

    /**
     * Deletes a book.
     *
     * @param id The id of the book to delete.
     * @return The number of rows affected (1 if a book was deleted, 0 if no book was found).
     */
    public int deleteBook(int id) {
        return jdbcTemplate.update("DELETE FROM books WHERE book_id = ?", id);
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

    /**
     * Counts the nonnull fields in the book object.
     *
     * @param book A book object.
     * @return The number of nonnull fields in the book object.
     */
    private long countNonNullFields(Book book) {
        return Stream.of(book.getTitle(), book.getAuthor(), book.getGenre()).filter(Objects::nonNull).count();
    }
}



