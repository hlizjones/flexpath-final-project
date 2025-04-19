package org.example.controllers;

import org.example.daos.ReviewDao;
import org.example.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Objects;

/**
 * Controller for reviews.
 *
 */
@RestController
@RequestMapping("api/reviews")
@PreAuthorize("permitAll()")
public class ReviewController {
    /**
     * The review data access object.
     */
    @Autowired
    private ReviewDao reviewDao;

    /**
     * Gets reviews.
     *
     * @param bookId The book id of the review.
     * @return List of Review.
     */
    @GetMapping
    public List<Review> getReviews(@RequestParam(required = false) Integer bookId) {
        Review review = new Review();
        if (bookId != null) {
            review.setBookId(bookId);
        }
        if (isAdmin()) {
            review.setIsAdmin(true);
        }
        return reviewDao.getReviews(review);
    }

    /**
     * Gets a review by id.
     *
     * @param id The id of the review.
     * @return The review with the given id.
     */
    @GetMapping(path = "/{id}")
    @PreAuthorize("permitAll()")
    public Review get(@PathVariable int id, Principal principal) {
        Review review = reviewDao.getReviewById(id);
        if (review == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found");
        }
        if (isAdmin() || Objects.equals(review.getUsername(), principal.getName()) || !review.getPrivacy()) {
            return review;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
    }

    /**
     * Creates a new review.
     *
     * @param review The book to create.
     * @param principal The authenticated user.
     * @return The review created.
     */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Review create(@RequestBody Review review, Principal principal) {
        review.setUsername(principal.getName());
        return reviewDao.createReview(review);
    }

    /**
     * Updates a review.
     *
     * @param review The new review.
     * @param id The id of the review.
     * @param principal The authenticated review.
     * @return The updated review.
     */
    @PutMapping(path = "/{id}")
    public Review update(@RequestBody Review review, @PathVariable int id, Principal principal) {

        if (reviewDao.getReviewById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found");
        }

        if (isAdmin()) {
            review.setId(id);
            return reviewDao.updateReview(review);
        } else {
            if (!Objects.equals(reviewDao.getReviewById(id).getUsername(), principal.getName())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
            } else {
                review.setId(id);
                return reviewDao.updateReview(review);
            }
        }
    }

    /**
     * Deletes a review.
     *
     * @param id The id of the review.
     * @return Review deletion status.
     */
    @DeleteMapping(path = "/{id}")
    public String delete(@PathVariable int id, Principal principal) {

        if (reviewDao.getReviewById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found");
        }

        int rowsAffected;
        if (isAdmin()) {
            rowsAffected = reviewDao.deleteReview(id);
        } else {
            if (!Objects.equals(reviewDao.getReviewById(id).getUsername(), principal.getName())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
            } else {
                rowsAffected = reviewDao.deleteReview(id);
            }
        }

        if (rowsAffected == 1) {
            return ("Review deleted.");
        } else {
            return ("Failed to delete review.");
        }
    }

    /**
     * Checks if user has admin role
     * @return boolean (True if user is admin, false if user is not admin).
     */
    private boolean isAdmin() {
        return SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities().stream().anyMatch(a ->
                        a.getAuthority().equals("ADMIN"));
    }
}
