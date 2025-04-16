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
     * The genre of the book.
     */
    private String genre;

    /**
     * Creates a new book.
     */
    public Book() {}

    /**
     * Creates a new book.
     *
     * @param id The id of the book.
     * @param title  The title of the book.
     * @param author  The author of the book.
     * @param genre The genre of the book.
     * */
    public Book(int id, String title, String author, String genre) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
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
}

