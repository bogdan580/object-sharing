package com.mbohdan.projects.osharing.web.rest;

import com.mbohdan.projects.osharing.domain.Advertisment;
import com.mbohdan.projects.osharing.repository.AdvertismentRepository;
import com.mbohdan.projects.osharing.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mbohdan.projects.osharing.domain.Advertisment}.
 */
@RestController
@RequestMapping("/api")
public class AdvertismentResource {

    private final Logger log = LoggerFactory.getLogger(AdvertismentResource.class);

    private static final String ENTITY_NAME = "advertisment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AdvertismentRepository advertismentRepository;

    public AdvertismentResource(AdvertismentRepository advertismentRepository) {
        this.advertismentRepository = advertismentRepository;
    }

    /**
     * {@code POST  /advertisments} : Create a new advertisment.
     *
     * @param advertisment the advertisment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new advertisment, or with status {@code 400 (Bad Request)} if the advertisment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/advertisments")
    public ResponseEntity<Advertisment> createAdvertisment(@Valid @RequestBody Advertisment advertisment) throws URISyntaxException {
        log.debug("REST request to save Advertisment : {}", advertisment);
        if (advertisment.getId() != null) {
            throw new BadRequestAlertException("A new advertisment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Advertisment result = advertismentRepository.save(advertisment);
        return ResponseEntity.created(new URI("/api/advertisments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /advertisments} : Updates an existing advertisment.
     *
     * @param advertisment the advertisment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated advertisment,
     * or with status {@code 400 (Bad Request)} if the advertisment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the advertisment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/advertisments")
    public ResponseEntity<Advertisment> updateAdvertisment(@Valid @RequestBody Advertisment advertisment) throws URISyntaxException {
        log.debug("REST request to update Advertisment : {}", advertisment);
        if (advertisment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Advertisment result = advertismentRepository.save(advertisment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, advertisment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /advertisments} : get all the advertisments.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of advertisments in body.
     */
    @GetMapping("/advertisments")
    public List<Advertisment> getAllAdvertisments() {
        log.debug("REST request to get all Advertisments");
        return advertismentRepository.findAll();
    }

    /**
     * {@code GET  /advertisments/:id} : get the "id" advertisment.
     *
     * @param id the id of the advertisment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the advertisment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/advertisments/{id}")
    public ResponseEntity<Advertisment> getAdvertisment(@PathVariable Long id) {
        log.debug("REST request to get Advertisment : {}", id);
        Optional<Advertisment> advertisment = advertismentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(advertisment);
    }

    /**
     * {@code DELETE  /advertisments/:id} : delete the "id" advertisment.
     *
     * @param id the id of the advertisment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/advertisments/{id}")
    public ResponseEntity<Void> deleteAdvertisment(@PathVariable Long id) {
        log.debug("REST request to delete Advertisment : {}", id);
        advertismentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
