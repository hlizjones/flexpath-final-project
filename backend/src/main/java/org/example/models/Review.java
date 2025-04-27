package org.example.models;

/**
 * Model class for reviews.
 */
public class Review {
    /**
     * The id of the review.
     */
    private int id;

    /**
     * The id of the book reviewed.
     */
    private int bookId;

    /**
     * The rating of the review.
     */
    private int rating;

    /**
     * The review of the review.
     */
    private String content;

    /**
     * The privacy of the review.
     */
    private Boolean privacy;

    /**
     * The username of the review.
     */
    private String username;

    /**
     * The role of user accessing the review.
     */
    private Boolean isAdmin;

    /**
     * Creates a new review.
     */
    public Review() {}

    /**
     * Creates a new review.
     *
     * @param id The id of the review.
     * @param bookId The id of the book reviewed.
     * @param rating The rating of the review.
     * @param content The review.
     * @param privacy The privacy of the review.
     * @param username The username of the review.
     */
    public Review(int id, int bookId, int rating, String content, Boolean privacy, String username) {
        this.id = id;
        this.bookId = bookId;
        this.rating = rating;
        this.content = content;
        this.privacy = privacy;
        this.username = username;
    }

    /**
     * Creates a new review.
     *
     * @param id The id of the review.
     * @param bookId The id of the book reviewed.
     * @param rating The rating of the review.
     * @param privacy The privacy of the review.
     * @param username The username of the review.
     */
    public Review(int id, int bookId, int rating, Boolean privacy, String username) {
        this.id = id;
        this.bookId = bookId;
        this.rating = rating;
        this.privacy = privacy;
        this.username = username;

    }

    /**
     * Gets the id of the review.
     *
     * @return The id of the review.
     */
    public int getId() {
        return id;
    }

    /**
     * Sets the id of the review.
     *
     * @param id The id of the review.
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Gets the id of the book reviewed.
     *
     * @return The id of the book reviewed
     */
    public int getBookId() {
        return bookId;
    }

    /**
     * Sets the id of the book reviewed.
     *
     * @param bookId The id of the book reviewed
     */
    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    /**
     * Gets the rating of the review.
     *
     * @return The rating of the review.
     */
    public int getRating() {
        return rating;
    }

    /**
     * Sets the rating of the review.
     *
     * @param rating The rating of the review.
     */
    public void setRating(int rating) {
        this.rating = rating;
    }

    /**
     * Gets the content of the review.
     *
     * @return The content of the review.
     */
    public String getContent() {
        return content;
    }

    /**
     * Sets the content of the review.
     *
     * @param content The content of the review.
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * Gets the privacy of the review.
     *
     * @return The privacy of the review.
     */
    public Boolean getPrivacy() {
        return privacy;
    }

    /**
     * Sets the privacy of the review.
     *
     * @param privacy The privacy of the review.
     */
    public void setPrivacy(Boolean privacy) {
        this.privacy = privacy;
    }

    /**
     * Gets the username of the review.
     *
     * @return The username of the review.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username of the review.
     *
     * @param username The username of the review.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Gets the role of user accessing the review.
     *
     * @return The role of user accessing the review.
     */
    public Boolean getIsAdmin() {
        return isAdmin;
    }

    /**
     * Sets the role of user accessing the review.
     *
     * @param admin The role of user accessing the review.
     */
    public void setIsAdmin(Boolean admin) {
        this.isAdmin = admin;
    }
}
