package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;

/**
 * Tests the User Dao.
 */
@ExtendWith(MockitoExtension.class)
public class UserDaoTest {
    @Mock
    JdbcTemplate jdbcTemplate;
    @Mock
    DataSource dataSource;
    @Mock
    PasswordEncoder passwordEncoder;

    UserDao userDao;

    @BeforeEach
    public void setUp () {
        userDao = new UserDao(dataSource, passwordEncoder);
        userDao.setJdbcTemplate(jdbcTemplate);
    }

    @Test
    public void UserDao_getUsers_ReturnsListOfUsers () {
        User user1 = new User("admin", "admin");
        User user2 = new User("user", "1234");
        List<User> expectedUsers = new ArrayList<>();
        expectedUsers.add(user1);
        expectedUsers.add(user2);

        Mockito.when(jdbcTemplate.query(eq("SELECT * FROM users ORDER BY username;"), any(RowMapper.class)))
                .thenReturn(expectedUsers);

        List<User> actualUsers = userDao.getUsers();

        assertEquals(expectedUsers, actualUsers);
    }

    @Test
    public void UserDao_getUsers_ReturnsEmptyArray () {
        List<User> emptyArray = new ArrayList<>();

        Mockito.when(jdbcTemplate.query(eq("SELECT * FROM users ORDER BY username;"), any(RowMapper.class)))
                .thenReturn(emptyArray);

        List<User> actualUsers = userDao.getUsers();

        assertTrue(actualUsers.isEmpty());
    }

    @Test
    public void UserDao_getUserByUsername_ReturnsUser () {
        User expectedUser = new User("admin", "admin");

        Mockito.when(jdbcTemplate.queryForObject(eq("SELECT * FROM users WHERE username = ?"), any(RowMapper.class), anyString()))
                .thenReturn(expectedUser);

        User actualUser = userDao.getUserByUsername("admin");

        assertEquals(expectedUser, actualUser);
    }

    @Test
    public void UserDao_getUserByUsername_ReturnsNull () {
        Mockito.when(jdbcTemplate.queryForObject(eq("SELECT * FROM users WHERE username = ?"), any(RowMapper.class), anyString()))
                .thenReturn(null);

        User actualUser = userDao.getUserByUsername("admin");

        assertNull(actualUser);
    }

    @Test
    public void UserDao_createUser_ReturnsUser () {
        User expectedUser = new User("admin", "admin");

        User user = new User("admin", "admin");

        Mockito.when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword");

        Mockito.when(jdbcTemplate.update(anyString(), anyString(), anyString()))
                .thenReturn(1);

        UserDao userDao1 = Mockito.spy(userDao);
        Mockito.doReturn(expectedUser).when(userDao1).getUserByUsername(anyString());

        User actualUser = userDao1.createUser(user);

        assertEquals(expectedUser, actualUser);
    }

    @Test
    public void UserDao_createUser_ThrowsNewDaoException () {
        User user = new User("admin", "admin");

        Mockito.when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword");

        Mockito.when(jdbcTemplate.update(anyString(), anyString(), anyString()))
                .thenThrow(new DataAccessException("..."){ });

        assertThrows(DaoException.class,
                () -> {
                    userDao.createUser(user);
                });
    }

    @Test
    public void UserDao_updatePassword_ReturnsUser () {
        User expectedUser = new User("admin", "admin");

        User user = new User("admin", "admin");

        Mockito.when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword");

        Mockito.when(jdbcTemplate.update(anyString(), anyString(), anyString()))
                .thenReturn(1);

        UserDao userDao1 = Mockito.spy(userDao);
        Mockito.doReturn(expectedUser).when(userDao1).getUserByUsername(anyString());

        User actualUser = userDao1.createUser(user);

        assertEquals(expectedUser, actualUser);
    }

    @Test
    public void UserDao_updatePassword_ThrowsNewDaoException () {
        User user = new User("admin", "admin");

        Mockito.when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword");

        Mockito.when(jdbcTemplate.update(anyString(), anyString(), anyString()))
                .thenReturn(0);

        assertThrows(DaoException.class,
                () -> {
                    userDao.updatePassword(user);
                });
    }

    @Test
    public void UserDao_deleteUser_ReturnsInt () {
        Mockito.when(jdbcTemplate.update(anyString(), anyString()))
                .thenReturn(1);

        int numberReturned = userDao.deleteUser("admin");

        assertEquals(1, numberReturned);
        assertInstanceOf(Integer.class, numberReturned);
    }

    @Test
    public void UserDao_getRoles_ReturnsListOfRoles () {
        List<String> expectedRoles = new ArrayList<>();
        expectedRoles.add("admin");

        Mockito.when(jdbcTemplate.queryForList(eq("SELECT role FROM roles WHERE username = ?;"), eq(String.class), anyString()))
                .thenReturn(expectedRoles);

        List<String> actualRoles = userDao.getRoles("admin");

        assertEquals(expectedRoles, actualRoles);
    }

    @Test
    public void UserDao_getRoles_ReturnsEmptyArray () {
        List<String> emptyArray = new ArrayList<>();

        Mockito.when(jdbcTemplate.queryForList(eq("SELECT role FROM roles WHERE username = ?;"), eq(String.class), anyString()))
                .thenReturn(emptyArray);

        List<String> actualUsers = userDao.getRoles("admin");

        assertTrue(actualUsers.isEmpty());
    }

    @Test
    public void UserDao_addRole_ReturnsUser () {
        List<String> expectedUsername = new ArrayList<>();
        expectedUsername.add("admin");

        Mockito.when(jdbcTemplate.update(anyString(), anyString(), anyString()))
                .thenReturn(1);

        UserDao userDao1 = Mockito.spy(userDao);
        Mockito.doReturn(expectedUsername).when(userDao1).getRoles(anyString());

        List<String> actualUsername = userDao1.addRole("admin", "admin");

        assertEquals(expectedUsername, actualUsername);
    }

    @Test
    public void UserDao_addRole_ThrowsNewDaoException () {
        Mockito.when(jdbcTemplate.update(anyString(), anyString(), anyString()))
                .thenThrow(new DataAccessException("..."){ });

        assertThrows(DaoException.class,
                () -> {
                    userDao.addRole("admin", "admin");
                });
    }

    @Test
    public void UserDao_deleteRole_ReturnsInt () {
        Mockito.when(jdbcTemplate.update(anyString(), anyString(), anyString()))
                .thenReturn(1);

        int numberReturned = userDao.deleteRole("admin", "admin");

        assertEquals(1, numberReturned);
        assertInstanceOf(Integer.class, numberReturned);
    }
}
