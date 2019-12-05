package com.mbohdan.projects.osharing.web.rest.osh;

import com.mbohdan.projects.osharing.service.dto.osh.ArticlesFilterDTO;
import com.mbohdan.projects.osharing.service.dto.osh.OshArticleDTO;
import com.mbohdan.projects.osharing.service.osh.OshArticlesService;
import com.mbohdan.projects.osharing.web.rest.errors.BadRequestAlertException;
import com.mbohdan.projects.osharing.web.rest.facades.ResourcesFacede;
import io.github.jhipster.web.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/proxy")
public class OshArticlesResource {
    private final Logger log = LoggerFactory.getLogger(OshArticlesResource.class);
    private static final String ENTITY_NAME = "oshArticleDTO";
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    private final OshArticlesService articlesService;
    private final ResourcesFacede resourcesFacede;

    public OshArticlesResource(OshArticlesService articlesService, ResourcesFacede resourcesFacede) {
        this.articlesService = articlesService;
        this.resourcesFacede = resourcesFacede;
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
    @PostMapping("/articles/add")
    public ResponseEntity<OshArticleDTO> addArticle(@Valid @RequestBody OshArticleDTO newArticle) throws URISyntaxException {

        return ResponseEntity.created(new URI("/api/articles/" + "must be result.id"))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, "must be article name"))
            .body(null);
    }

    //TODO get all user articles
    @GetMapping("/articles/my")
    public ResponseEntity<List<OshArticleDTO>> getMyArticles() throws URISyntaxException {
        ArrayList<OshArticleDTO> articleDTOS = new ArrayList<>();
        resourcesFacede
            .getArticleRepository()
            .findByUserIsCurrentUser()
            .forEach(x -> articleDTOS.add(new OshArticleDTO(x)));
        log.debug("OshArticlesService.getMyArticles() {}", articleDTOS);
        return ResponseEntity.ok(articleDTOS);
    }

    //TODO get all articles reserve or rent by user
    @GetMapping("/articles/reserves")
    public ResponseEntity<List<OshArticleDTO>> getMyReservedArticles() throws URISyntaxException {
        ArrayList<OshArticleDTO> articleDTOS = new ArrayList<>();
        resourcesFacede.
            getReservationRepository()
            .findByUserIsCurrentUser()
            .forEach(x->articleDTOS
                .add(new OshArticleDTO(resourcesFacede
                    .getArticleResource()
                    .getArticle(x.getUser().getId()).getBody())));
        log.debug("OshArticlesService.getMyReservedArticles() {}", articleDTOS);
        return ResponseEntity.ok(articleDTOS);
    }

    //TODO SORT PAGABLE

    @GetMapping("/articles/rented")
    public ResponseEntity<List<OshArticleDTO>> getMyRentedArticles() throws URISyntaxException {
        ArrayList<OshArticleDTO> articleDTOS = new ArrayList<>();
        resourcesFacede.
            getRentingRepository()
            .findByUserIsCurrentUser()
            .forEach(x->articleDTOS
                .add(new OshArticleDTO(resourcesFacede
                    .getArticleResource()
                    .getArticle(x.getUser().getId()).getBody())));
        log.debug("OshArticlesService.getMyRentedArticles() {}", articleDTOS);
        return ResponseEntity.ok(articleDTOS);
    }

    //TODO SORT PAGABLE
}
