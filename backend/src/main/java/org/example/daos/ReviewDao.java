package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Review;
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
import java.util.Arrays;
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
        QueryBuilder qb = new QueryBuilder();
        List<String> where = new ArrayList<>();
        List<Object> values = new ArrayList<>();
        List<String> orderBy = new ArrayList<>();

        if (review.getIsAdmin() && review.getBookId() != 0) {
            where.add("book_id");
            values.add(review.getBookId());
        } else if (!review.getIsAdmin() && review.getBookId() != 0) {
            where.addAll(Arrays.asList("book_id", "(privacy = false OR (privacy = true AND username = ?))"));
            values.addAll(Arrays.asList(review.getBookId(), review.getUsername()));
            orderBy.add("CASE WHEN username = " + review.getUsername() + " THEN 1 WHEN rating = 5 THEN 2 WHEN rating = 4 THEN 3 WHEN rating = 3 THEN 4 WHEN rating = 2 THEN 5 ELSE 6 END");
        }

        PreparedStatementCreator psc = qb.select("*")
                .from("reviews")
                .whereEqual(where.toArray(new String[0]))
                .equalValues(values.toArray(new Object[0]))
                .orderByClauses(orderBy.toArray(new String[0]))
                .build();

        return jdbcTemplate.query(psc, this::mapToReview);
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
            assert key != null;
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
