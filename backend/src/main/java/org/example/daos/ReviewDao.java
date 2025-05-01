package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Review;
import org.example.utils.QueryBuilder;
import org.springframework.dao.DataAccessException;
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
    private JdbcTemplate jdbcTemplate;

    /**
     * Creates a new review data access object
     *
     * @param dataSource The data source for the DAO.
     */
    public ReviewDao(DataSource dataSource) {
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
     * Gets reviews.
     *
     * @param review A review object.
     * @return List of Review.
     */
    public List<Review> getReviews(Review review) {
        QueryBuilder qb = new QueryBuilder();

        qb.select("*").from("reviews");

        if (review.getIsAdmin() && review.getBookId() != 0) {
            qb.whereEqual("book_id")
                .equalValues(review.getBookId())
                .orderByClauses("rating DESC");
        } else if (!review.getIsAdmin() && review.getBookId() != 0) {
            qb.whereEqual("book_id")
                    .equalValues(review.getBookId())
                    .whereComplex("(privacy = false OR (privacy = true AND username = ?))")
                    .complexValues(review.getUsername())
                    .orderByClauses("CASE WHEN username = ? THEN 1 ELSE 2 END")
                    .orderByValues(review.getUsername())
                    .orderByClauses("rating DESC");
        }

        PreparedStatementCreator psc = qb.build();

        return jdbcTemplate.query(psc, this::mapToReview);
    }

    /**
     * Gets a review by id.
     *
     * @param id The id of the review.
     * @return Review
     */
    public Review getReviewById(int id) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM reviews WHERE review_id = ?", this::mapToReview, id);
        } catch (DataAccessException e) {
            return null;
        }
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
            assert key != null;
            return getReviewById(key.intValue());
        } catch (DataAccessException e) {
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
                "UPDATE reviews SET rating = ?, content = ?, privacy =? WHERE review_id = ?",
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
        return jdbcTemplate.update("DELETE FROM reviews WHERE review_id = ?", id);
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
        Review review = new Review(
                rs.getInt("review_id"),
                rs.getInt("book_id"),
                rs.getInt("rating"),
                rs.getString("content"),
                rs.getBoolean("privacy"),
                rs.getString("username")
        );
        return review;
    }
}
