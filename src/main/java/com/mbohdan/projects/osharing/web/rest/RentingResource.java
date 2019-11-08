package com.mbohdan.projects.osharing.web.rest;

import com.mbohdan.projects.osharing.domain.Renting;
import com.mbohdan.projects.osharing.repository.RentingRepository;
import com.mbohdan.projects.osharing.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mbohdan.projects.osharing.domain.Renting}.
 */
@RestController
@RequestMapping("/api")
public class RentingResource {

    private final Logger log = LoggerFactory.getLogger(RentingResource.class);

    private static final String ENTITY_NAME = "renting";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RentingRepository rentingRepository;

    public RentingResource(RentingRepository rentingRepository) {
        this.rentingRepository = rentingRepository;
    }

    /**
     * {@code POST  /rentings} : Create a new renting.
     *
     * @param renting the renting to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new renting, or with status {@code 400 (Bad Request)} if the renting has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rentings")
    public ResponseEntity<Renting> createRenting(@RequestBody Renting renting) throws URISyntaxException {
        log.debug("REST request to save Renting : {}", renting);
        if (renting.getId() != null) {
            throw new BadRequestAlertException("A new renting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Renting result = rentingRepository.save(renting);
        return ResponseEntity.created(new URI("/api/rentings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rentings} : Updates an existing renting.
     *
     * @param renting the renting to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated renting,
     * or with status {@code 400 (Bad Request)} if the renting is not valid,
     * or with status {@code 500 (Internal Server Error)} if the renting couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rentings")
    public ResponseEntity<Renting> updateRenting(@RequestBody Renting renting) throws URISyntaxException {
        log.debug("REST request to update Renting : {}", renting);
        if (renting.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Renting result = rentingRepository.save(renting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, renting.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /rentings} : get all the rentings.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rentings in body.
     */
    @GetMapping("/rentings")
    public List<Renting> getAllRentings() {
        log.debug("REST request to get all Rentings");
        return rentingRepository.findAll();
    }

    /**
     * {@code GET  /rentings/:id} : get the "id" renting.
     *
     * @param id the id of the renting to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the renting, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rentings/{id}")
    public ResponseEntity<Renting> getRenting(@PathVariable Long id) {
        log.debug("REST request to get Renting : {}", id);
        Optional<Renting> renting = rentingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(renting);
    }

    /**
     * {@code DELETE  /rentings/:id} : delete the "id" renting.
     *
     * @param id the id of the renting to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rentings/{id}")
    public ResponseEntity<Void> deleteRenting(@PathVariable Long id) {
        log.debug("REST request to delete Renting : {}", id);
        rentingRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
