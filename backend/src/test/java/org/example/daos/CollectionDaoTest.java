package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Collection;
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
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doAnswer;

/**
 * Tests the Collection Dao.
 */
@ExtendWith(MockitoExtension.class)
public class CollectionDaoTest {
    @Mock
            JdbcTemplate jdbcTemplate;
    @Mock
            DataSource dataSource;

    CollectionDao collectionDao;

    @BeforeEach
    public void setUp () {
        collectionDao = new CollectionDao(dataSource);
        collectionDao.setJdbcTemplate(jdbcTemplate);
    }

    @Test
    public void CollectionDao_getCollectionsWithNullFields_ReturnsListOfCollections () {
        //Arrange
        Collection collection1 = new Collection(1, "To Read", "Books to Read", false, false, "admin");
        Collection collection2 = new Collection(2, "Favorites", "My favorites", true, true, "user");
        List<Collection> expectedCollections = new ArrayList<>();
        expectedCollections.add(collection1);
        expectedCollections.add(collection2);

        Collection collection = new Collection();
        collection.setIsAdmin(false);


        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedCollections);

        //Act
        List<Collection> actualCollections = collectionDao.getCollections(collection, "user");

        //Assert
        assertEquals(expectedCollections, actualCollections);
        assertEquals(2, actualCollections.size());
    }

    @Test
    public void CollectionDao_getCollectionsForAdminWithNullFields_ReturnsListOfCollections () {
        //Arrange
        Collection collection1 = new Collection(1, "To Read", "Books to Read", false, false, "admin");
        Collection collection2 = new Collection(2, "Favorites", "My favorites", true, true, "user");
        List<Collection> expectedCollections = new ArrayList<>();
        expectedCollections.add(collection1);
        expectedCollections.add(collection2);

        Collection collection = new Collection();
        collection.setIsAdmin(true);


        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedCollections);

        //Act
        List<Collection> actualCollections = collectionDao.getCollections(collection, "admin");

        //Assert
        assertEquals(expectedCollections, actualCollections);
        assertEquals(2, actualCollections.size());
    }

    @Test
    public void CollectionDao_getCollectionsWithNameField_ReturnsListOfCollections () {
        //Arrange
        Collection collection1 = new Collection(2, "Favorites", "My favorites", true, true, "user");
        List<Collection> expectedCollections = new ArrayList<>();
        expectedCollections.add(collection1);

        Collection collection = new Collection();
        collection.setName("Favorites");
        collection.setIsAdmin(false);

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedCollections);

        //Act
        List<Collection> actualCollections = collectionDao.getCollections(collection, "user");

        //Assert
        assertEquals(expectedCollections, actualCollections);
        assertEquals(1, actualCollections.size());
    }

    @Test
    public void CollectionDao_getCollectionsWithUsernameField_ReturnsListOfCollections () {
        //Arrange
        Collection collection1 = new Collection(2, "Favorites", "My favorites", true, true, "user");
        List<Collection> expectedCollections = new ArrayList<>();
        expectedCollections.add(collection1);

        Collection collection = new Collection();
        collection.setUsername("user");
        collection.setIsAdmin(false);

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedCollections);

        //Act
        List<Collection> actualCollections = collectionDao.getCollections(collection, "user");

        //Assert
        assertEquals(expectedCollections, actualCollections);
        assertEquals(1, actualCollections.size());
    }

    @Test
    public void CollectionDao_getCollectionsWithNameAndUsernameField_ReturnsListOfCollections () {
        //Arrange
        Collection collection1 = new Collection(1, "To Read", "Books to Read", false, false, "admin");
        List<Collection> expectedCollections = new ArrayList<>();
        expectedCollections.add(collection1);

        Collection collection = new Collection();
        collection.setName("To Read");
        collection.setUsername("false");
        collection.setIsAdmin(true);

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedCollections);

        //Act
        List<Collection> actualCollections = collectionDao.getCollections(collection, "user");

        //Assert
        assertEquals(expectedCollections, actualCollections);
        assertEquals(1, actualCollections.size());
    }

    @Test
    public void CollectionDao_getCollectionsForAdminWithNameAndUsernameField_ReturnsListOfCollections () {
        //Arrange
        Collection collection1 = new Collection(1, "To Read", "Books to Read", false, false, "admin");
        List<Collection> expectedCollections = new ArrayList<>();
        expectedCollections.add(collection1);

        Collection collection = new Collection();
        collection.setName("To Read");
        collection.setUsername("admin");
        collection.setIsAdmin(true);

        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(expectedCollections);

        //Act
        List<Collection> actualCollections = collectionDao.getCollections(collection, "admin");

        //Assert
        assertEquals(expectedCollections, actualCollections);
        assertEquals(1, actualCollections.size());
    }


    @Test
    public void CollectionDao_getCollections_ReturnsEmptyArray () {
        //Arrange
        List<Collection> emptyList = new ArrayList<>();

        Collection collection = new Collection();
        collection.setIsAdmin(false);


        Mockito.when(jdbcTemplate.query(any(PreparedStatementCreator.class), any(RowMapper.class)))
                .thenReturn(emptyList);

        //Act
        List<Collection> actualCollections = collectionDao.getCollections(collection, "user");

        //Assert
        assertTrue(actualCollections.isEmpty());
    }

    @Test
    public void CollectionDao_getCollectionById_ReturnsCollection () {
        //Arrange
        Collection expectedCollection = new Collection(1, "To Read", "Books to Read", false, false, "admin");

        Mockito.when(jdbcTemplate.queryForObject(eq("SELECT * FROM collections WHERE collection_id = ?"), any(RowMapper.class), anyInt()))
                .thenReturn(expectedCollection);

        //Act
        Collection actualCollection = collectionDao.getCollectionById(1);

        //Assert
        assertEquals(expectedCollection, actualCollection);
    }

    @Test
    public void CollectionDao_getCollectionById_ReturnsNull () {
        //Arrange
    Mockito.when(jdbcTemplate.queryForObject(eq("SELECT * FROM collections WHERE collection_id = ?"), any(RowMapper.class), anyInt()))
                .thenReturn(null);

        //Act
        Collection actualCollection = collectionDao.getCollectionById(1);

        //Assert
        assertNull(actualCollection);
    }

    @Test
    public void CollectionDao_createCollection_ReturnsCollection () {
        //Arrange
        Collection expectedCollection = new Collection(1, "To Read", "Books to Read", false, false, "admin");

        doAnswer(invocation -> {
            KeyHolder keyHolder = invocation.getArgument(1);
            Map<String, Object> keyMap = new HashMap<String, Object>();
            keyMap.put("collection_id", 1L);
            List<Map<String, Object>> generatedKeys = keyHolder.getKeyList();
            generatedKeys.clear();
            generatedKeys.add(keyMap);
            return 1;

        }).when(jdbcTemplate).update(any(PreparedStatementCreator.class), any(KeyHolder.class));

        CollectionDao collectionDao1 = Mockito.spy(collectionDao);
        Mockito.doReturn(expectedCollection).when(collectionDao1).getCollectionById(1);

        //Act
        Collection actualCollection = collectionDao1.createCollection(expectedCollection);

        //Assert
        assertEquals(expectedCollection, actualCollection);
    }

    @Test
    public void CollectionDao_createCollection_ThrowsNewDaoExceptionWhenKeyIsNull () {
        //Arrange
        Collection collection = new Collection(1, "To Read", "Books to Read", false, false, "admin");

        doAnswer(invocation -> {
            KeyHolder keyHolder = invocation.getArgument(1);
            Map<String, Object> keyMap = new HashMap<String, Object>();
            keyMap.put("collection_id", null);
            List<Map<String, Object>> generatedKeys = keyHolder.getKeyList();
            generatedKeys.clear();
            generatedKeys.add(keyMap);
            return 0;

        }).when(jdbcTemplate).update(any(PreparedStatementCreator.class), any(KeyHolder.class));

        //Act and Assert
        assertThrows(DaoException.class,
                () -> {
                    collectionDao.createCollection(collection);
                });
    }

    @Test
    public void CollectionDao_createCollection_ThrowsNewDaoException () {
        //Arrange
        Collection collection = new Collection(1, "To Read", "Books to Read", false, false, "admin");

        Mockito.when(jdbcTemplate.update(any(PreparedStatementCreator.class), any(KeyHolder.class)))
                .thenThrow(new DataAccessException("..."){ });

        //Act and Assert
        assertThrows(DaoException.class,
                () -> {
                    collectionDao.createCollection(collection);
                });
    }

    @Test
    public void CollectionDao_updateCollection_ReturnsCollection () {
        //Arrange
        Collection expectedCollection = new Collection(1, "To Read", "Books to Read", false, false, "admin");

        Mockito.when(jdbcTemplate.update(eq("UPDATE collections SET name= ?, description =?, favorite = ?, privacy = ?, username = ? WHERE collection_id = ?"), anyString(), anyString(), anyBoolean(), anyBoolean(), anyString(), anyInt()))
                .thenReturn(1);

        CollectionDao collectionDao1 = Mockito.spy(collectionDao);
        Mockito.doReturn(expectedCollection).when(collectionDao1).getCollectionById(1);

        //Act
        Collection actualCollection = collectionDao1.updateCollection(expectedCollection);

        //Assert
        assertEquals(expectedCollection, actualCollection);
    }

    @Test
    public void CollectionDao_updateCollection_ThrowsNewDaoException () {
        //Arrange
        Collection expectedCollection = new Collection(1, "To Read", "Books to Read", false, false, "admin");

        Mockito.when(jdbcTemplate.update(eq("UPDATE collections SET name= ?, description =?, favorite = ?, privacy = ?, username = ? WHERE collection_id = ?"), anyString(), anyString(), anyBoolean(), anyBoolean(), anyString(), anyInt()))
                .thenReturn(0);

        //Act and Assert
        assertThrows(DaoException.class,
                () -> {
                    collectionDao.updateCollection(expectedCollection);
                });
    }

    @Test
    public void CollectionDao_deleteCollection_ReturnsInt () {
        //Arrange
        Mockito.when(jdbcTemplate.update(eq("DELETE FROM collections WHERE collection_id = ?"), anyInt()))
                .thenReturn(1);

        //Act
        int numberReturned = collectionDao.deleteCollection(5);

        //Assert
        assertEquals(1, numberReturned);
        assertInstanceOf(Integer.class, numberReturned);
    }
}
