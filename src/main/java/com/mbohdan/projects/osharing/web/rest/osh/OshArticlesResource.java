package com.mbohdan.projects.osharing.web.rest.osh;

import com.mbohdan.projects.osharing.domain.Renting;
import com.mbohdan.projects.osharing.domain.Reservation;
import com.mbohdan.projects.osharing.service.dto.osh.ArticlesFilterDTO;
import com.mbohdan.projects.osharing.service.dto.osh.OshArticleDTO;
import com.mbohdan.projects.osharing.service.osh.OshArticlesService;
import com.mbohdan.projects.osharing.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.List;


@RestController
@RequestMapping("/api/proxy")
public class OshArticlesResource {
    private final Logger log = LoggerFactory.getLogger(OshArticlesResource.class);
    private static final String ENTITY_NAME = "oshArticleDTO";
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    private final OshArticlesService articlesService;

    public OshArticlesResource(OshArticlesService articlesService) {
        this.articlesService = articlesService;
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
        List<OshArticleDTO> results = articlesService.searchArticles(filterDTO);
        log.debug("OshArticlesService.searchArticles() {}", results);
        return ResponseEntity.ok(results);
    }

    // TODO get userInfo, images, active reserves and renting for selected article

    // TODO add new article
//    @PostMapping("/articles/add")
//    public ResponseEntity<OshArticleDTO> addArticle(@Valid @RequestBody OshArticleDTO newArticle) throws URISyntaxException {
//
//        resourcesFacede.getArticleResource().createArticle(newArticle.getArticleFromOshArticleDTO());
//        return ResponseEntity.created(new URI("/api/articles/" + "must be result.id"))
//            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, "must be article name"))
//            .body(null);
//    }

    @GetMapping("/articles/my")
    public ResponseEntity<List<OshArticleDTO>> getMyArticles() throws URISyntaxException {
        log.debug("REST request to get My Articles");
        List<OshArticleDTO> results = articlesService.getUserArticles();
        return ResponseEntity.ok(results);
    }

    @GetMapping("/articles/reserves")
    public ResponseEntity<List<Reservation>> getMyReservedArticles() throws URISyntaxException {
        log.debug("REST request to get My Reservations");
        List<Reservation> results = articlesService.getUserReservations();
        return ResponseEntity.ok(results);
    }

    @GetMapping("/articles/rented")
    public ResponseEntity<List<Renting>> getMyRentedArticles() throws URISyntaxException {
        log.debug("REST request to get My Rented Articles");
        List<Renting> results = articlesService.getUserRentings();
        return ResponseEntity.ok(results);
    }
}
