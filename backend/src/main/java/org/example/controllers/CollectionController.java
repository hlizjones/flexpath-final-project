package org.example.controllers;

import org.example.daos.CollectionDao;
import org.example.models.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Objects;

/**
 * Controller for collections.
 *
 */
@RestController
@RequestMapping("api/collections")
@PreAuthorize("permitAll()")
public class CollectionController {
    /**
     * The collection data access object.
     */
    @Autowired
    private CollectionDao collectionDao;

    /**
     * Gets collections.
     *
     * @param name The name of the collection.
     * @param username The username of the collection
     * @return List of Collection.
     */
    @GetMapping
    public List<Collection> getCollections(@RequestParam(required = false) String name,
                                   @RequestParam(required = false) String username) {

        Collection collection = new Collection();
        if (name != null) {
            collection.setName(name);
        } if (username != null) {
            collection.setUsername(username);
        }
        if (isAdmin()) {
            collection.setIsAdmin(true);
        }

        return collectionDao.getCollections(collection);
    }

    /**
     * Gets a collection by id.
     *
     * @param id The id of the collection.
     * @return The collection with the given id.
     */
    @GetMapping(path = "/{id}")
    @PreAuthorize("permitAll()")
    public Collection get(@PathVariable int id) {
        Collection collection = collectionDao.getCollectionById(id);
        if (collection == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Collection not found");
        }
        return collection;
    }

    /**
     * Creates a new collection.
     *
     * @param collection The collection to create.
     * @param principal The authenticated collection.
     * @return The collection created.
     */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Collection create(@RequestBody Collection collection, Principal principal) {
        collection.setUsername(principal.getName());
        return collectionDao.createCollection(collection);
    }

    /**
     * Updates a collection.
     *
     * @param collection The new collection.
     * @param id The id of the collection.
     * @param principal The authenticated collection.
     * @return The updated collection.
     */
    @PutMapping(path = "/{id}")
    public Collection update(@RequestBody Collection collection, @PathVariable int id, Principal principal) {

        if (collectionDao.getCollectionById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Collection not found");
        }

        if (isAdmin()) {
            collection.setId(id);
            return collectionDao.updateCollection(collection);
        } else {
            if (!Objects.equals(collectionDao.getCollectionById(id).getUsername(), principal.getName())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
            } else {
                collection.setId(id);
                return collectionDao.updateCollection(collection);
            }
        }
    }

    /**
     * Deletes a collection.
     *
     * @param id The id of the collection.
     * @return Collection deletion status.
     */
    @DeleteMapping(path = "/{id}")
    public String delete(@PathVariable int id, Principal principal) {

        if (collectionDao.getCollectionById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Collection not found");
        }

        int rowsAffected;
        if (isAdmin()) {
            rowsAffected = collectionDao.deleteCollection(id);
        } else {
            if (!Objects.equals(collectionDao.getCollectionById(id).getUsername(), principal.getName())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
            } else {
                rowsAffected = collectionDao.deleteCollection(id);
            }
        }

        if (rowsAffected == 1) {
            return ("Collection deleted.");
        } else {
            return ("Failed to delete collection.");
        }
    }

    /**
     * Checks if user has admin role
     * @return boolean (True if user is admin, false if user is not admin).
     */
    private boolean isAdmin() {
        return SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities().stream().anyMatch(a ->
                        a.getAuthority().equals("ROLE_ADMIN"));
    }
}
