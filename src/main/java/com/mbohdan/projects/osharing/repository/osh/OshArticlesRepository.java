package com.mbohdan.projects.osharing.repository.osh;

import com.mbohdan.projects.osharing.domain.Article;
import com.mbohdan.projects.osharing.service.dto.osh.OshArticlesDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface OshArticlesRepository extends JpaRepository<Article, Long> {

    //    SELECT * FROM article a JOIN category c ON (a.category_id = c.id ) JOIN location l ON (a.user_id = l.user_id) JOIN user_info i ON(a.user_id = i.user_id) ORDER BY a.price DESC
//    WHERE l.city LIKE '%Kie%'
//    WHERE c.CATEGORY_NAME = 'Sport'
    @Query("select new com.mbohdan.projects.osharing.service.dto.osh.OshArticlesDTO(a.id, c.categoryName) FROM Category c INNER JOIN c.articles a on c.categoryName = :category")
    List<OshArticlesDTO> searchArticles(@Param("category") String category);
}
