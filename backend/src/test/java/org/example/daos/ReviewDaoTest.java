package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Review;
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
 * Tests the Review Dao.
 */
@ExtendWith(MockitoExtension.class)
public class ReviewDaoTest {
    @Mock
    JdbcTemplate jdbcTemplate;
    @Mock
    DataSource dataSource;

    ReviewDao reviewDao;

    @BeforeEach
    public void setUp () {
        reviewDao = new ReviewDao(dataSource);
        reviewDao.setJdbcTemplate(jdbcTemplate);
    }

    @Test
    public void ReviewDao_getReviewsForAdmin_ReturnsListOfReviews () {
        Review review1 = new Review(1, 1, 5, "Great book!", true, "user");
        Review review2 = new Review(1, 1, 3, "Not my favorite", false, "admin");
        List<Review> expectedReviews = new ArrayList<>();
        expectedReviews.add(review1);
        expectedReviews.add(review2);

       Review review = new Review();
        review.setIsAdmin(true);

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedReviews);

        List<Review> actualReviews = reviewDao.getReviews(review);

        assertEquals(expectedReviews, actualReviews);
        assertEquals(2, actualReviews.size());
    }

    @Test
    public void ReviewDao_getReviews_ReturnsListOfReviews () {
        Review review1 = new Review(1, 1, 5, "Great book!", true, "user");
        Review review2 = new Review(1, 1, 3, "Not my favorite", false, "admin");
        List<Review> expectedReviews = new ArrayList<>();
        expectedReviews.add(review1);
        expectedReviews.add(review2);

        Review review = new Review();
        review.setIsAdmin(false);

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedReviews);

        List<Review> actualReviews = reviewDao.getReviews(review);

        assertEquals(expectedReviews, actualReviews);
        assertEquals(2, actualReviews.size());
    }

    @Test
    public void ReviewDao_getReviews_ReturnsEmptyArray () {
        List<Review> expectedReviews = new ArrayList<>();

        Review review = new Review();
        review.setIsAdmin(false);

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedReviews);

        List<Review> actualReviews = reviewDao.getReviews(review);

        assertTrue(actualReviews.isEmpty());
    }

    @Test
    public void ReviewDao_getReviewById_ReturnsReview () {
        Review expectedReview = new Review(1, 1, 5, "Great book!", true, "user");

        Mockito.when(jdbcTemplate.queryForObject(eq("SELECT * FROM reviews WHERE review_id = ?"), any(RowMapper.class), anyInt()))
                .thenReturn(expectedReview);

        Review actualReview = reviewDao.getReviewById(1);

        assertEquals(expectedReview, actualReview);
    }

    @Test
    public void ReviewDao_getReviewById_ReturnsNull () {
        Mockito.when(jdbcTemplate.queryForObject(eq("SELECT * FROM reviews WHERE review_id = ?"), any(RowMapper.class), anyInt()))
                .thenReturn(null);

        Review actualReview = reviewDao.getReviewById(1);

        assertNull(actualReview);
    }

    @Test
    public void reviewDao_createReview_ReturnsReview () {
        Review expectedReview = new Review(1, 1, 5, "Great book!", true, "user");

        doAnswer(invocation -> {
            KeyHolder keyHolder = invocation.getArgument(1);
            Map<String, Object> keyMap = new HashMap<String, Object>();
            keyMap.put("review_id", 1L);
            List<Map<String, Object>> generatedKeys = keyHolder.getKeyList();
            generatedKeys.clear();
            generatedKeys.add(keyMap);
            return 1;

        }).when(jdbcTemplate).update(any(PreparedStatementCreator.class), any(KeyHolder.class));

        ReviewDao reviewDao1 = Mockito.spy(reviewDao);
        Mockito.doReturn(expectedReview).when(reviewDao1).getReviewById(1);

        Review actualReview = reviewDao1.createReview(expectedReview);

        assertEquals(expectedReview, actualReview);
    }

    @Test
    public void reviewDao_createReview_ThrowsNewDaoExceptionWhenKeyIsNull () {
        Review review = new Review();

        doAnswer(invocation -> {
            KeyHolder keyHolder = invocation.getArgument(1);
            Map<String, Object> keyMap = new HashMap<String, Object>();
            keyMap.put("review_id", null);
            List<Map<String, Object>> generatedKeys = keyHolder.getKeyList();
            generatedKeys.clear();
            generatedKeys.add(keyMap);
            return 0;

        }).when(jdbcTemplate).update(any(PreparedStatementCreator.class), any(KeyHolder.class));

        assertThrows(DaoException.class,
                () -> {
                    reviewDao.createReview(review);
                });
    }

    @Test
    public void reviewDao_createReview_ThrowsNewDaoException () {
        Review review = new Review();

        Mockito.when(jdbcTemplate.update(any(PreparedStatementCreator.class), any(KeyHolder.class)))
                .thenThrow(new DataAccessException("..."){ });

        assertThrows(DaoException.class,
                () -> {
                    reviewDao.createReview(review);
                });
    }

    @Test
    public void ReviewDao_updateReview_ReturnsReview () {
        Review expectedReview = new Review(1, 1, 5, "Great book!", true, "user");

        Mockito.when(jdbcTemplate.update(eq("UPDATE reviews SET rating = ?, content = ?, privacy =? WHERE review_id = ?"), anyInt(), anyString(), anyBoolean(), anyInt()))
                .thenReturn(1);

        ReviewDao reviewDao1 = Mockito.spy(reviewDao);
        Mockito.doReturn(expectedReview).when(reviewDao1).getReviewById(1);

        Review actualReview = reviewDao1.updateReview(expectedReview);

        assertEquals(expectedReview, actualReview);
    }

    @Test
    public void ReviewDao_updateReview_ThrowsNewDaoException () {
        Review review = new Review(1, 1, 5, "Great book!", true, "user");

        Mockito.when(jdbcTemplate.update(eq("UPDATE reviews SET rating = ?, content = ?, privacy =? WHERE review_id = ?"), anyInt(), anyString(), anyBoolean(), anyInt()))
                .thenReturn(0);

        assertThrows(DaoException.class,
                () -> {
                    reviewDao.updateReview(review);
                });
    }

    @Test
    public void ReviewDao_deleteReview_ReturnsInt () {
        Mockito.when(jdbcTemplate.update(eq("DELETE FROM reviews WHERE review_id = ?"), anyInt()))
                .thenReturn(1);

        int numberReturned = reviewDao.deleteReview(5);

        assertEquals(1, numberReturned);
        assertInstanceOf(Integer.class, numberReturned);
    }
}
