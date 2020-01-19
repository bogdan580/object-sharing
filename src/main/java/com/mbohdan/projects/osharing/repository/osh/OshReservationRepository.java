package com.mbohdan.projects.osharing.repository.osh;

import com.mbohdan.projects.osharing.domain.Reservation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Reservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OshReservationRepository extends JpaRepository<Reservation, Long> {

//    @Query("select reservation from Reservation reservation where reservation.user.login = ?#{principal.username}")
//    List<Reservation> findByUserIsCurrentUser();

    @Query("select reservation from Reservation reservation where reservation.startTime < reservation.endTime AND reservation.user.login = ?#{principal.username}")
    List<Reservation> findActiveReservesByCurrentUser();

    @Query("select reservation from Reservation reservation where reservation.endTime > :cur_time  AND reservation.article.user.login = ?#{principal.username}")
    List<Reservation> findActiveReservesByArticleOwner(@Param("cur_time") Long cur_time);

    @Query("select reservation from Reservation reservation where reservation.endTime > :cur_time  AND reservation.article.id = :id")
    List<Reservation> findActiveReservesByArticle(@Param("id") Long id,
                                                  @Param("cur_time") Long cur_time);

    @Query("select reservation from Reservation reservation where reservation.id = :id AND reservation.user.login = ?#{principal.username}")
    Reservation findByIdAndUser(@Param("id") Long id);

    @Query("select reservation from Reservation reservation where reservation.id = :id")
    Reservation findByReserveId(@Param("id") Long id);

    @Query("select reservation from Reservation reservation where reservation.user.login = ?#{principal.username}")
    List<Reservation> getLastReservations(Pageable pageable);
}
