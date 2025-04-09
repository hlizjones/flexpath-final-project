package org.example.daos;

import org.example.models.Book;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;

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
     * @param dataSource The sata source for the DAO.
     */
    public BookDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
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
                rs.getInt("id"),
                rs.getString("title"),
                rs.getString("author"),
                rs.getString("review"),
                rs.getInt("rating"),
                rs.getString("genre"),
                rs.getString("mood)"),
                rs.getBoolean("privacy"),
                rs.getString("username")
        );
    }
}

