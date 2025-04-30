package org.example.models;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests the Review Model.
 */
public class ReviewModelTest {

    @Test
    public void testReviewConstructorAndGetters() {
        Review review = new Review(1, 10, 5, "Test Content", true,"Test Username");

        assertEquals(1, review.getId());
        assertEquals(10, review.getBookId());
        assertEquals(5, review.getRating());
        assertEquals("Test Content", review.getContent());
        assertEquals(true, review.getPrivacy());
        assertEquals("Test Username", review.getUsername());
    }

    @Test
    public void testReviewConstructorWithoutContent() {
        Review review = new Review(1, 10, 5,  true,"Test Username");

        assertEquals(1, review.getId());
        assertEquals(10, review.getBookId());
        assertEquals(5, review.getRating());
        assertEquals(true, review.getPrivacy());
        assertEquals("Test Username", review.getUsername());
    }

    @Test
    public void testSetters() {
        Review review = new Review();

        review.setId(1);
        review.setBookId(10);
        review.setRating(5);
        review.setContent("Test Content");
        review.setPrivacy(true);
        review.setUsername("Test Username");
        review.setIsAdmin(true);

        assertEquals(1, review.getId());
        assertEquals(10, review.getBookId());
        assertEquals(5, review.getRating());
        assertEquals(true, review.getPrivacy());
        assertEquals("Test Username", review.getUsername());
        assertEquals(true, review.getIsAdmin());
    }
}
