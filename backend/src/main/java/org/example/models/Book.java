package org.example.models;

/**
 * Model class for books.
 */
public class Book {
    /**
     * The id of the book.
     */
    private int id;

    /**
     * The title of the book.
     */
    private String title;

    /**
     * The author of the book.
     */
    private String author;

    /**
     * The review of the book.
     */
    private String review;

    /**
     * The rating of the book.
     */
    private int rating;

    /**
     * The genre of the book.
     */
    private String genre;

    /**
     * The mood of the book.
     */
    private String mood;

    /**
     * The privacy of the book.
     */
    private Boolean privacy;

    /**
     * The username of the book.
     */
    private String username;

    /**
     * Creates a new book.
     *
     * @param id The id of the book.
     * @param title  The title of the book.
     * @param author  The author of the book.
     * @param review The review of the book.
     * @param rating The rating of the book.
     * @param genre The genre of the book.
     * @param mood The mood of the book.
     * @param privacy The privacy of the book.
     * @param username The username of the book.
     * */
    public Book(int id, String title, String author, String review, int rating, String genre, String mood, Boolean privacy, String username) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.review = review;
        this.rating = rating;
        this.genre = genre;
        this.mood = mood;
        this.privacy = privacy;
        this.username = username;
    }

    /**
     * Creates a new book.
     *
     * @param id The id of the book.
     * @param title  The title of the book.
     * @param author  The author of the book.
     * @param review The review of the book.
     * @param rating The rating of the book.
     * @param genre The genre of the book.
     * @param privacy The privacy of the book.
     * @param username The username of the book.
     * */
    public Book(int id, String title, String author, String review, int rating, String genre, Boolean privacy, String username) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.review = review;
        this.rating = rating;
        this.genre = genre;
        this.privacy = privacy;
        this.username = username;
    }

    /**
     * Creates a new book.
     *
     * @param id The id of the book.
     * @param title  The title of the book.
     * @param author  The author of the book.
     * @param rating The rating of the book.
     * @param genre The genre of the book.
     * @param mood The mood of the book.
     * @param privacy The privacy of the book.
     * @param username The username of the book.
     * */
    public Book(int id, String title, String author, int rating, String genre, String mood, Boolean privacy, String username) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.rating = rating;
        this.genre = genre;
        this.mood = mood;
        this.privacy = privacy;
        this.username = username;
    }

    /**
     * Creates a new book.
     *
     * @param id The id of the book.
     * @param title  The title of the book.
     * @param author  The author of the book.
     * @param rating The rating of the book.
     * @param genre The genre of the book.
     * @param privacy The privacy of the book.
     * @param username The username of the book.
     * */
    public Book(int id, String title, String author, int rating, String genre, Boolean privacy, String username) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.rating = rating;
        this.genre = genre;
        this.privacy = privacy;
        this.username = username;
    }

    /**
     * Gets the id of the book.
     *
     * @return The id of the book.
     */
    public int getId() {
        return id;
    }

    /**
     * Sets the id of the book.
     *
     * @param id The id of the book.
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Gets the title of the book.
     *
     * @return The title of the book.
     */
    public String getTitle() {
        return title;
    }

    /**
     * Sets the title of the book.
     *
     * @param title The title of the book.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Gets the author of the book.
     *
     * @return The author of the book.
     */
    public String getAuthor() {
        return author;
    }

    /**
     * Sets the author of the book.
     *
     * @param author The author of the book.
     */
    public void setAuthor(String author) {
        this.author = author;
    }

    /**
     * Gets the review of the book.
     *
     * @return The review of the book.
     */
    public String getReview() {
        return review;
    }

    /**
     * Sets the review of the book.
     *
     * @param review The review of the book.
     */
    public void setReview(String review) {
        this.review = review;
    }

    /**
     * Gets the rating of the book.
     *
     * @return The rating of the book.
     */
    public int getRating() {
        return rating;
    }

    /**
     * Sets the rating of the book.
     *
     * @param rating The rating of the book.
     */
    public void setRating(int rating) {
        this.rating = rating;
    }

    /**
     * Gets the genre of the book.
     *
     * @return The genre of the book.
     */
    public String getGenre() {
        return genre;
    }

    /**
     * Sets the genre of the book.
     *
     * @param genre The genre of the book.
     */
    public void setGenre(String genre) {
        this.genre = genre;
    }

    /**
     * Gets the mood of the book.
     *
     * @return The mood of the book.
     */
    public String getMood() {
        return mood;
    }

    /**
     * Sets the mood of the book.
     *
     * @param mood The mood of the book.
     */
    public void setMood(String mood) {
        this.mood = mood;
    }

    /**
     * Gets the privacy of the book.
     *
     * @return The privacy of the book.
     */
    public Boolean getPrivacy() {
        return privacy;
    }

    /**
     * Sets the privacy of the book.
     *
     * @param privacy The privacy of the book.
     */
    public void setPrivacy(Boolean privacy) {
        this.privacy = privacy;
    }

    /**
     * Gets the username of the book.
     *
     * @return The username of the book.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username of the book.
     *
     * @param username The username of the book.
     */
    public void setUsername(String username) {
        this.username = username;
    }
}

