package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Collection;
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
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

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
        QueryBuilder qb = new QueryBuilder();
        PreparedStatementCreator psc;
        List<String> where = new ArrayList<>();
        List<String> values = new ArrayList<>();
        List<String> complexWhere = new ArrayList<>();
        List<String> complexValues = new ArrayList<>();
        List<String> orderBy = new ArrayList<>();

        if (collection.getName() != null) {
            where.add("name");
            values.add(collection.getName());
        } else if (collection.getUsername() != null) {
            where.add("username");
            values.add(collection.getUsername());
        }

        if(!collection.getIsAdmin()) {
            complexWhere.add("(privacy = false OR (privacy = true AND username = ?))");
            complexValues.add(collection.getUsername());
        }

        if (collection.getIsAdmin() && countNonNullFields(collection) == 0) {
                psc = qb.select("*")
                        .from("collections")
                        .build();
        } else if (countNonNullFields(collection) == 1) {
            psc = qb.select("*")
                    .from("collections")
                    .whereLike(where.toArray(new String[0]))
                    .likeValues(values.toArray(new Object[0]))
                    .whereComplex(complexWhere.toArray(new String[0]))
                    .complexValues(complexValues.toArray(new Object[0]))
                    .orderByClauses("CASE WHEN " + where.get(0) + " = '%" + values.get(0) + "%' THEN 1 WHEN " + where.get(0) + " = '%" + values.get(0) + "' THEN 2 ELSE 3 END")
                    .build();
        } else {
            psc = qb.select("*")
                    .from("collections")
                    .whereEqual(where.toArray(new String[0]))
                    .equalValues(values.toArray(new Object[0]))
                    .whereComplex(complexWhere.toArray(new String[0]))
                    .complexValues(complexValues.toArray(new Object[0]))
                    .orderByClauses(where.get(0) + "ASC")
                    .build();
        }

        return jdbcTemplate.query(psc, this::mapToCollection);
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
            assert key != null;
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

    /**
     * Counts the nonnull fields in the collection object.
     *
     * @param collection A collection object.
     * @return The number of nonnull fields in the collection object.
     */
    private long countNonNullFields(Collection collection) {
        return Stream.of(collection.getName(), collection.getUsername()).filter(Objects::nonNull).count();
    }
}
