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
        } if (book.getAuthor() != null) {
            where.add("author");
            values.add(book.getAuthor());
        } if (book.getGenre() != null) {
            where.add("genre");
            values.add(book.getGenre());
        }

        List<String> likeValues = new ArrayList<>();
        List<String> orderByValues = new ArrayList<>();
        for (String value : values) {
            likeValues.add("%" + value + "%");
            orderByValues.add(value);
            orderByValues.add(value + "%");
        }

        List<String> orderByClauses = new ArrayList<>();
        for (String condition : where) {
            orderByClauses.add("CASE WHEN " + condition + " = ? THEN 1 WHEN " + condition + " LIKE ? THEN 2 ELSE 3 END");
        }

        qb.whereLike(where.toArray(new String[0]))
                .likeValues(likeValues.toArray(new String[0]))
                .orderByClauses(orderByClauses.toArray(new String[0]))
                .orderByValues(orderByValues.toArray(new String[0]));

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

}



