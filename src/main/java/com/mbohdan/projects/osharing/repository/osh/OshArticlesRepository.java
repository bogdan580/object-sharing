package com.mbohdan.projects.osharing.repository.osh;

import com.mbohdan.projects.osharing.domain.Article;
import com.mbohdan.projects.osharing.service.dto.osh.OshArticleDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface OshArticlesRepository extends JpaRepository<Article, Long> {

    @Query("SELECT new com.mbohdan.projects.osharing.service.dto.osh.OshArticleDTO("
                           + "a.id, a.name, a.desc, a.status, a.addTime, a.price, a.mainImage, a.rentPeriod,"
                           + "a.currency, a.user.id, c.categoryName, l.streetAddress, l.postalCode, l.city, l.stateProvince,"
                           + "l.lat, l.lon) "
          + "FROM Article a JOIN a.category c JOIN a.location l ON (:category IS NULL OR c.categoryName = :category) AND (:postalCode IS NULL OR l.postalCode = :postalCode) AND (:city IS NULL OR l.city = :city) "
          + "WHERE a.name LIKE :text"
    )
    List<OshArticleDTO> searchArticles(
        @Param("text") String text,
        @Param("category") String category,
        @Param("postalCode") String postalCode,
        @Param("city") String city,
        Pageable pageable
    );

    @Query("SELECT new com.mbohdan.projects.osharing.service.dto.osh.OshArticleDTO("
                            + "a.id, a.name, a.desc, a.status, a.addTime, a.price, a.mainImage, a.rentPeriod,"
                            + "a.currency, a.user.id, c.categoryName, l.streetAddress, l.postalCode, l.city, l.stateProvince,"
                            + "l.lat, l.lon)"
        + "FROM Article a JOIN a.category c INNER JOIN a.location l "
        + "WHERE a.user.login = ?#{principal.username} ORDER BY a.status")
    List<OshArticleDTO> findByUserIsCurrentUser();
}
