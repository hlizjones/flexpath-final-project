package org.example.models;

/**
 * Model class for collections.
 */
public class Collection {
    /**
     * The id of the collection.
     */
    private int id;

    /**
     * The name of the collection.
     */
    private String name;

    /**
     * The description of the collection.
     */
    private String description;

    /**
     * The favorite status of the collection.
     */
    private Boolean favorite;

    /**
     * The privacy of the collection.
     */
    private Boolean privacy;

    /**
     * The username of the collection.
     */
    private String username;

    /**
     * Creates new collection.
     *
     * @param id The id of the collection.
     * @param name The name of the collection.
     * @param description The description of the collection.
     * @param favorite The favorite status of the collection.
     * @param privacy The privacy of the collection.
     * @param username The username of the collection.
     */
    public Collection(int id, String name, String description, Boolean favorite, Boolean privacy, String username) {
        this.name = name;
        this.description = description;
        this.favorite = favorite;
        this.privacy = privacy;
        this.username = username;
    }

    /**
     * Gets the id of the collection.
     *
     * @return The id of the collection.
     */
    public int getId() {
        return id;
    }

    /**
     * Sets the id of the collection.
     *
     * @param id The id of the collection.
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Gets the name of the collection.
     *
     * @return The name of the collection.
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the collection.
     *
     * @param name The name of the collection.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the description of the collection.
     *
     * @return The description of the collection.
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets the description of the collection.
     *
     * @param description The description of the collection.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Gets the favorite status of the collection.
     *
     * @return The favorite status of the collection.
     */
    public Boolean getFavorite() {
        return favorite;
    }

    /**
     * Sets the favorite status of the collection.
     *
     * @param favorite The favorite status of the collection.
     */
    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    /**
     * Gets the privacy of the collection.
     *
     * @return The privacy of the collection.
     */
    public Boolean getPrivacy() {
        return privacy;
    }

    /**
     * Sets the privacy of the collection.
     *
     * @param privacy The privacy of the collection.
     */
    public void setPrivacy(Boolean privacy) {
        this.privacy = privacy;
    }

    /**
     * Gets the username of the collection.
     *
     * @return The username of the collection.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username of the collection.
     *
     * @param username The username of the collection.
     */
    public void setUsername(String username) {
        this.username = username;
    }
}
