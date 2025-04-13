package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Collection;
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
 * Data access object for collections.
 */
@Component
public class CollectionDao {
    /**
     * The JDBC template for querying the database.
     */
    private final JdbcTemplate jdbcTemplate;

    /**
     * Creates a new collection data access object
     *
     * @param dataSource The data source for the DAO.
     */
    public CollectionDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    /**
     * Gets collections.
     *
     * @param collection A collection object.
     * @return List of Collection.
     */
    public List<Collection> getCollections(Collection collection) {
        // write code to use query builder here
        return jdbcTemplate.query(query, this::mapToCollection);
    }

    /**
     * Gets a collection.
     *
     * @param id The id of the collection
     * @return Collection
     */
    public Collection getCollectionById(int id) {
        return jdbcTemplate.queryForObject("SELECT * FROM collections WHERE collection_id = ?", this::mapToCollection, id);
    }

    /**
     * Creates a new collection.
     *
     * @param collection The collection to create.
     * @return Collection The created collection.
     */
    public Collection createCollection(Collection collection) {
        try {
            String name = collection.getName();
            String description = collection.getDescription();
            Boolean favorite = collection.getFavorite();
            Boolean privacy = collection.getPrivacy();
            String username = collection.getUsername();
            PreparedStatementCreator psc = con -> {
                PreparedStatement ps = con.prepareStatement("INSERT INTO collections (name, description, favorite, privacy) VALUES (?, ?, ?, ?, ? )", new String[]{"collection_id}"});
                ps.setString(1, name);
                ps.setString(2, description);
                ps.setBoolean(3, favorite);
                ps.setBoolean(4, privacy);
                ps.setString(5, username);
                return ps;
            };
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(psc, keyHolder);
            Number key = keyHolder.getKey();
            return getCollectionById(key.intValue());
        } catch (EmptyResultDataAccessException e) {
            throw new DaoException("Failed to create collection.");
        }
    }

    /**
     * Updates a collection.
     *
     * @param collection The collection to update.
     * @return The updated collection.
     */
    public Collection updateCollection(Collection collection) {
        int id = collection.getId();
        String name = collection.getName();
        String description = collection.getDescription();
        Boolean favorite = collection.getFavorite();
        Boolean privacy = collection.getPrivacy();
        int rowsAffected = jdbcTemplate.update(
                "UPDATE collections SET name= ?, description =?, favorite = ?, privacy = ? WHERE collection_id = ?",
                name,
                description,
                favorite,
                privacy,
                id
        );
        if (rowsAffected == 0){
            throw new DaoException("Zero rows affected, expected at least one.");
        } else {
            return getCollectionById(id);
        }
    }

    /**
     * Deletes a collection.
     *
     * @param id The id of the collection to delete.
     * @return The number of rows affected (1 if a collection was deleted, 0 if no collection was found).
     */
    public int deleteCollection(int id) {
        return jdbcTemplate.update("DELETE FROM collections WHERE id = ?", id);
    }

    /**
     * Maps a row in the ResultSet to a Collection object.
     *
     * @param rs The result set to map.
     * @param rowNum The row number.
     * @return Collection The collection object.
     * @throws SQLException If an error occurs while mapping the result set.
     */
    private Collection mapToCollection(ResultSet rs, int rowNum) throws SQLException {
        return new Collection(
                rs.getInt("collection_id"),
                rs.getString("name"),
                rs.getString("description"),
                rs.getBoolean("favorite"),
                rs.getBoolean("privacy"),
                rs.getString("username")
        );
    }
}
