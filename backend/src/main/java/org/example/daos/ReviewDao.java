package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Review;
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
public class ReviewDao {
    /**
     * The JDBC template for querying the database.
     */
    private final JdbcTemplate jdbcTemplate;

    /**
     * Creates a new review data access object
     *
     * @param dataSource The data source for the DAO.
     */
    public ReviewDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    /**
     * Gets reviews.
     *
     * @param review A review object.
     * @return List of Review.
     */
    public List<Review> getReviews(Review review) {
        // write code to use query builder here
        return jdbcTemplate.query(query, this::mapToReview);
    }

    /**
     * Gets a review by id.
     *
     * @param id The id of the review.
     * @return Review
     */
    public Review getReviewById(int id) {
        return jdbcTemplate.queryForObject("SELECT * FROM reviews WHERE review_id = ?", this::mapToReview, id);
    }

    /**
     * Created a new review.
     *
     * @param review The review to create.
     * @return Review The created review.
     */
    public Review createReview(Review review) {
        try {
            int bookId = review.getBookId();
            int rating = review.getRating();
            String content = review.getContent();
            Boolean privacy = review.getPrivacy();
            String username = review.getUsername();
            PreparedStatementCreator psc = con -> {
                PreparedStatement ps = con.prepareStatement("INSERT INTO reviews (book_id, rating, content, privacy, username) VALUES (?, ?, ?, ?, ?)", new String[]{"review_id"});
                ps.setInt(1, bookId);
                ps.setInt(2, rating);
                ps.setString(3, content);
                ps.setBoolean(4, privacy);
                ps.setString(5, username);
                return ps;
            };
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(psc, keyHolder);
            Number key = keyHolder.getKey();
            return getReviewById(key.intValue());
        } catch (EmptyResultDataAccessException e) {
            throw new DaoException("Failed to create review.");
        }
    }

    /**
     * Updates a review.
     *
     * @param review The review to update.
     * @return The updated review.
     */
    public Review updateReview(Review review) {
        int id = review.getId();
        int rating = review.getRating();
        String content = review.getContent();
        Boolean privacy = review.getPrivacy();
        int rowsAffected = jdbcTemplate.update(
                "UPDATE reviews SET rating = ?, content = ?, privacy =? WHERE id = ?",
                rating,
                content,
                privacy,
                id
        );
        if (rowsAffected == 0){
            throw new DaoException("Zero rows affected, expected at least one.");
        } else {
            return getReviewById(id);
        }
    }

    /**
     * Deletes a review.
     *
     * @param id The id of the review to delete.
     * @return The number of rows affected (1 if a review was deleted, 0 if no review was found).
     */
    public int deleteReview(int id) {
        return jdbcTemplate.update("DELETE FROM review WHERE id = ?", id);
    }

    /**
     * Maps a row in the ResultSet to a Review object.
     *
     * @param rs The result set to map.
     * @param rowNum The row number.
     * @return Review The review object.
     * @throws SQLException If an error occurs while mapping the result set.
     */
    private Review mapToReview(ResultSet rs, int rowNum) throws SQLException {
        return new Review(
                rs.getInt("review_id"),
                rs.getInt("book_id"),
                rs.getInt("rating"),
                rs.getString("content"),
                rs.getBoolean("privacy"),
                rs.getString("username")
        );
    }
}
