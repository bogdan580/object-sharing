package com.mbohdan.projects.osharing.service.osh;

import com.mbohdan.projects.osharing.domain.Article;
import com.mbohdan.projects.osharing.repository.osh.OshArticlesRepository;
import com.mbohdan.projects.osharing.service.dto.osh.ArticlesFilterDTO;
import com.mbohdan.projects.osharing.service.dto.osh.OshArticlesDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OshArticlesService {
    private final Logger log = LoggerFactory.getLogger(OshArticlesService.class);
    private final OshArticlesRepository oshArticlesRepository;

    public OshArticlesService(OshArticlesRepository oshArticlesRepository) {
        this.oshArticlesRepository = oshArticlesRepository;
    }

    public List<Article> searchArticles(ArticlesFilterDTO filterDTO) {
        log.debug("OshArticlesService.searchArticles({})", filterDTO);
        return this.oshArticlesRepository.searchArticles(null, filterDTO.category, null,null,null,null,null,null);
    }
}
