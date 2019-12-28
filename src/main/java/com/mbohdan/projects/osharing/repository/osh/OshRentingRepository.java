package com.mbohdan.projects.osharing.repository.osh;

import com.mbohdan.projects.osharing.domain.Renting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OshRentingRepository extends JpaRepository<Renting, Long> {

    @Query("select renting from Renting renting where (renting.endTime IS NULL OR renting.endTime > :cur_time ) AND renting.article.id = :id")
    List<Renting> findActiveRentingsByArticle(@Param("id") Long id,
                                              @Param("cur_time") Long cur_time);

    @Query("select renting from Renting renting where renting.user.login = ?#{principal.username}")
    List<Renting> findByUserIsCurrentUser();


    @Query("select renting from Renting renting where (renting.endTime IS NULL OR renting.endTime > :cur_time)  AND renting.article.user.login = ?#{principal.username}")
    List<Renting> findActiveRentsByArticleOwner(@Param("cur_time") Long cur_time);

//    @Query("select renting from Renting renting where renting.id = :id AND renting.user.login = ?#{principal.username}")
//    Renting findByIdAndUser(@Param("id") Long id);

    @Query("select renting from Renting renting where renting.id = :id AND renting.article.user.login = ?#{principal.username}")
    Renting findRentByArticleOwner(@Param("id") Long id);
}
