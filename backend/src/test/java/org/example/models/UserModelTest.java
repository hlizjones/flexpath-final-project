package org.example.models;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests the User Model.
 */
public class UserModelTest {

    @Test
    public void testUserConstructorAndGetters() {
        User user = new User("Test Username", "Test Password");

        assertEquals("Test Username", user.getUsername());
        assertEquals("Test Password", user.getPassword());
    }

    @Test
    public void testSetters() {
        User user = new User("Test Username", "Test Password");

        user.setUsername("New Test Username");
        user.setPassword("New Test Password");

        assertEquals("New Test Username", user.getUsername());
        assertEquals("New Test Password", user.getPassword());
    }

}
