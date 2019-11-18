package com.mbohdan.projects.osharing.web.rest.osh;

import com.mbohdan.projects.osharing.domain.Article;
import com.mbohdan.projects.osharing.service.dto.osh.ArticlesFilterDTO;
import com.mbohdan.projects.osharing.service.dto.osh.OshArticlesDTO;
import com.mbohdan.projects.osharing.service.osh.OshArticlesService;
import com.mbohdan.projects.osharing.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
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

    // TODO search by category, name, location(city, postalCode, ?lat/lon)

    /** First search by locations in userInfo
     * next
     *
     * @param filterDTO
     * @return
     * @throws URISyntaxException
     */
    @PostMapping("/search/articles")
    public ResponseEntity<List<OshArticlesDTO>> searchArticles(@Valid @RequestBody ArticlesFilterDTO filterDTO) throws URISyntaxException {
        log.debug("REST request to search Articles : {}", filterDTO);

        if (filterDTO.getPage() == null || filterDTO.getItems() == null) {
            throw new BadRequestAlertException("A search parameters are wrong", ENTITY_NAME, "request error");
        }
        List<OshArticlesDTO> results = articlesService.searchArticles(filterDTO);
        log.debug("OshArticlesService.searchArticles() {}", results);
        return  ResponseEntity.created(new URI("/api/proxy/search/articles"))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, "/search/articles"))
            .body(results);
    }
}
