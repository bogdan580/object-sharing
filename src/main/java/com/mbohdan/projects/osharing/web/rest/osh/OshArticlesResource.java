package com.mbohdan.projects.osharing.web.rest.osh;

import com.mbohdan.projects.osharing.domain.Article;
import com.mbohdan.projects.osharing.domain.Renting;
import com.mbohdan.projects.osharing.domain.Reservation;
import com.mbohdan.projects.osharing.domain.enumeration.ObjectStatus;
import com.mbohdan.projects.osharing.repository.osh.OshReservationRepository;
import com.mbohdan.projects.osharing.security.SecurityUtils;
import com.mbohdan.projects.osharing.service.dto.osh.ArticlesFilterDTO;
import com.mbohdan.projects.osharing.service.dto.osh.OshArticleDTO;
import com.mbohdan.projects.osharing.service.dto.osh.OshArticleInfoDTO;
import com.mbohdan.projects.osharing.service.osh.OshArticlesService;
import com.mbohdan.projects.osharing.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


@RestController
@RequestMapping("/api/proxy")
public class OshArticlesResource {
    private final Logger log = LoggerFactory.getLogger(OshArticlesResource.class);
    private static final String ENTITY_NAME = "article";
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    private final OshArticlesService oshArticlesService;
    private final OshReservationRepository oshReservationRepository;

    public OshArticlesResource(OshArticlesService oshArticlesService, OshReservationRepository oshReservationRepository) {
        this.oshArticlesService = oshArticlesService;
        this.oshReservationRepository = oshReservationRepository;
    }

    /**
     * Search by category, name, location(city, postalCode, ?lat/lon)
     *
     * @param filterDTO - filter object
     * @return - List<OshArticleDTO>
     */
    @PostMapping("/articles/search")
    public ResponseEntity<List<OshArticleDTO>> searchArticles(@Valid @RequestBody ArticlesFilterDTO filterDTO) throws URISyntaxException {
        log.debug("REST request to search Articles : {}", filterDTO);

        if (filterDTO.getPage() == null || filterDTO.getItems() == null) {
            throw new BadRequestAlertException("A search parameters are wrong", ENTITY_NAME, "request error");
        }
        List<OshArticleDTO> results = oshArticlesService.searchArticles(filterDTO);
        log.debug("OshArticlesService.searchArticles() {}", results);
        return ResponseEntity.ok(results);
    }

    /**
     * Get Article info by ID
     * @param id - article id
     * @return - OshArticleInfoDTO
     */
    @GetMapping("/articles/{id}/info")
    public ResponseEntity<OshArticleInfoDTO> getArticleInfo(@PathVariable("id") Long id) {
        log.debug("REST request to get userInfo, images, active reserves and renting for selected article id: {}", id);
        if (id == null ) {
            throw new BadRequestAlertException("ID is NULL", ENTITY_NAME, "request error");
        }
        OshArticleInfoDTO oshArticleInfoDTO = oshArticlesService.getArticleInfo(id);
        log.debug("OshArticlesService.getArticleInfo() {}", oshArticleInfoDTO);
        return ResponseEntity.ok(oshArticleInfoDTO);
    }

    /**
     * Get my active/disactive/rented articles
     * @return List<Article> - list of articles
     */
    @GetMapping("/articles/my")
    public ResponseEntity<List<Article>> getMyArticles() throws URISyntaxException {
        log.debug("REST request to get My Articles");
        List<Article> results = oshArticlesService.getUserArticles();
        return ResponseEntity.ok(results);
    }

    /**
     * Getting my reservations
     * @return List<Reservation> - list of reservations
     */
    @GetMapping("/articles/my/reserves")
    public ResponseEntity<List<Reservation>> getMyReservedArticles() throws URISyntaxException {
        log.debug("REST request to get My Reservations");
        List<Reservation> results = oshArticlesService.getUserReservations();
        return ResponseEntity.ok(results);
    }

    /**
     * Getting active reservations of my articles
     * @return List<Reservation> - list of reservations
     */
    @GetMapping("/reserves/myarticles")
    public ResponseEntity<List<Reservation>> getActiveReservesByArticleOwner() throws URISyntaxException {
        log.debug("REST request to get My Article reserves");
        List<Reservation> results = oshArticlesService.getActiveReservesByArticleOwner();
        return ResponseEntity.ok(results);
    }

    /**
     * Getting active rents of my articles
     * @return List<Renting> - list of rents
     */
    @GetMapping("/rent/myarticles")
    public ResponseEntity<List<Renting>> getActiveRentByArticleOwner() throws URISyntaxException {
        log.debug("REST request to get My Article rents");
        List<Renting> results = oshArticlesService.getActiveRentsByArticleOwner();
        return ResponseEntity.ok(results);
    }

    /**
     * Creating new reservation
     * @param reservation - body of new reservation
     * @return Reservation - created reservation
     */
    @PostMapping("/reserves")
    public ResponseEntity<Reservation> addReservation(@RequestBody Reservation reservation) {
        log.debug("REST request to add new reservation");
        Reservation result = oshArticlesService.addReservation(reservation);
        return ResponseEntity.ok(result);
    }

    /**
     * Getting my rents
     * @return List<Renting> - list of rents
     */
    @GetMapping("/articles/my/rented")
    public ResponseEntity<List<Renting>> getMyRentedArticles() throws URISyntaxException {
        log.debug("REST request to get My Rented Articles");
        List<Renting> results = oshArticlesService.getUserRentings();
        return ResponseEntity.ok(results);
    }

    /**
     * Creating new article
     * @param article - body of new article
     * @return Article - created article
     */
    @PostMapping("/articles/save")
    public ResponseEntity<Article> saveArticle(@RequestBody Article article) throws URISyntaxException {
        if (article.getId() != null) {
            log.debug("REST create Article: {}", article);
        } else{
            log.debug("REST update Article: {}", article);
        }
        Article result = oshArticlesService.saveArticle(article);
        return ResponseEntity.created(new URI("/api/articles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * Change article status
     * @param id - article id
     * @param newStatus - new status
     * @return updated article
     */
    @PutMapping("articles/{id}/status/{newStatus}")
    public ResponseEntity<Article> changeArticleStatus(@PathVariable("id") Long id,
                                                       @PathVariable("newStatus") String newStatus) {
        log.debug("REST request to change article:" + id + " status:" + newStatus);
        Article result = oshArticlesService.changeArticleStatus(id, ObjectStatus.valueOf(newStatus.toUpperCase()));
        return ResponseEntity.ok(result);
    }

    /**
     * Close reservation
     * @param id - reservation id
     * @return - Reservation
     */
    @PutMapping("/reserves/{id}/close")
    public ResponseEntity<Reservation> closeReservation(@PathVariable("id") Long id) throws URISyntaxException {
        log.debug("REST request to close reservation:" + id);
        Reservation reservation = oshReservationRepository.findByReserveId(id);
        if (SecurityUtils.getCurrentUserLogin().isPresent() && !reservation.getArticle().getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin().get()))
            throw new BadRequestAlertException("You do not have access to modify this reservation", ENTITY_NAME, "request error");
        Reservation result = oshArticlesService.closeReservation(reservation.getId());
        if (result == null) throw new BadRequestAlertException("Reservation not found", ENTITY_NAME, "request error");

        return ResponseEntity.ok(result);
    }

    /**
     * Create rent from active reservation
     * @param reservation - active reservation
     * @return Renting
     */
    @PostMapping("/rent")
    public ResponseEntity<Renting> makeRentFromReservation(@RequestBody Reservation reservation)
        throws URISyntaxException{
        log.debug("REST request to create rent from reservation:" + reservation.getId());
        if (SecurityUtils.getCurrentUserLogin().isPresent() && !reservation.getArticle().getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin().get()))
            throw new BadRequestAlertException("You do not have access to modify this reservation", ENTITY_NAME, "request error");
        else if (reservation.getArticle().getStatus() == ObjectStatus.INRENT) {
            throw new BadRequestAlertException("This article actually is in rent", ENTITY_NAME, "article.inrent");
        }

        Renting result = oshArticlesService.makeRentFromReservation(reservation.getId());
        if (result == null) throw new BadRequestAlertException("Reservation not found", ENTITY_NAME, "request error");

        return ResponseEntity.ok(result);
    }

    /**
     * Close rent
     * @param id - rent id
     * @return - Renting
     */
    @PutMapping("/rent/{id}/close")
    public ResponseEntity<Renting> closeRent(@PathVariable("id") Long id) throws URISyntaxException{
        log.debug("REST request to close rent:" + id);
        Renting result = oshArticlesService.closeRenting(id);
        if (result == null) throw new BadRequestAlertException("Renting not found", ENTITY_NAME, "request error");

        return ResponseEntity.ok(result);
    }
}
