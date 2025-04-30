package org.example.models;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests the Collection Model.
 */
public class CollectionModelTest {

    @Test
    public void testCollectionConstructorAndGetters() {
        Collection collection = new Collection(1,"Test Collection", "Test Description", true, true, "Test Username");

        assertEquals(1, collection.getId());
        assertEquals("Test Collection", collection.getName());
        assertEquals("Test Description", collection.getDescription());
        assertEquals(true, collection.getFavorite());
        assertEquals(true, collection.getPrivacy());
        assertEquals("Test Username", collection.getUsername());
    }

    @Test
    public void testCollectionSetters() {
        Collection collection = new Collection();

        collection.setId(1);
        collection.setName("Test Collection");
        collection.setDescription("Test Description");
        collection.setFavorite(true);
        collection.setPrivacy(true);
        collection.setUsername("Test Username");
        collection.setIsAdmin(true);

        assertEquals(1, collection.getId());
        assertEquals("Test Collection", collection.getName());
        assertEquals("Test Description", collection.getDescription());
        assertEquals(true, collection.getFavorite());
        assertEquals(true, collection.getPrivacy());
        assertEquals("Test Username", collection.getUsername());
        assertEquals(true, collection.getIsAdmin());
    }
}
