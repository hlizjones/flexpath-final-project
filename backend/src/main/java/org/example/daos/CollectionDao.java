package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Collection;
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
import java.util.ArrayList;
import java.util.List;

/**
 * Data access object for collections.
 */
@Component
public class CollectionDao {
    /**
     * The JDBC template for querying the database.
     */
    private JdbcTemplate jdbcTemplate;

    /**
     * Creates a new collection data access object
     *
     * @param dataSource The data source for the DAO.
     */
    public CollectionDao(DataSource dataSource) {
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
     * Gets collections.
     *
     * @param collection A collection object.
     * @return List of Collection.
     */
    public List<Collection> getCollections(Collection collection, String authenticatedUser) {
        QueryBuilder qb = new QueryBuilder();
        List<String> where = new ArrayList<>();
        List<String> values = new ArrayList<>();

        qb.select("*").from("collections");

        if (collection.getName() != null) {
            where.add("name");
            values.add(collection.getName());
        } else if (collection.getUsername() != null) {
            where.add("username");
            values.add(collection.getUsername());
        }

        List<String> likeValues = new ArrayList<>();
        List<String> orderByValues = new ArrayList<>();
        for (String value : values) {
            likeValues.add("%" + value + "%");
            orderByValues.add(value);
            orderByValues.add(value + "%");
        }

        List<String> orderByClauses = new ArrayList<>();
        for (String condition : where) {
            orderByClauses.add("CASE WHEN " + condition + " = ? THEN 1 WHEN " + condition + " LIKE ? THEN 2 ELSE 3 END");
        }

        orderByClauses.add("CASE WHEN username = ? THEN 1 ELSE 2 END");
        orderByValues.add(authenticatedUser); 

        qb.whereLike(where.toArray(new String[0]))
                .likeValues(likeValues.toArray(new String[0]))
                .orderByClauses(orderByClauses.toArray(new String[0]))
                .orderByValues(orderByValues.toArray(new String[0]));

        if(!collection.getIsAdmin()) {
            qb.whereComplex("(privacy = false OR (privacy = true AND username = ?))");
            qb.complexValues(authenticatedUser);
        }

        PreparedStatementCreator psc = qb.build();

        return jdbcTemplate.query(psc, this::mapToCollection);
    }

    /**
     * Gets a collection.
     *
     * @param id The id of the collection
     * @return Collection
     */
    public Collection getCollectionById(int id) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM collections WHERE collection_id = ?", this::mapToCollection, id);
        } catch (DataAccessException e) {
            return null;
        }
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
                PreparedStatement ps = con.prepareStatement("INSERT INTO collections (name, description, favorite, privacy, username) VALUES (?, ?, ?, ?, ? )", new String[]{"collection_id"});
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
            System.out.println(key);
            assert key != null;
            return getCollectionById(key.intValue());
        } catch (DataAccessException e) {
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
        String username = collection.getUsername();
        int rowsAffected = jdbcTemplate.update(
                "UPDATE collections SET name= ?, description =?, favorite = ?, privacy = ?, username = ? WHERE collection_id = ?",
                name,
                description,
                favorite,
                privacy,
                username,
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
        return jdbcTemplate.update("DELETE FROM collections WHERE collection_id = ?", id);
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
