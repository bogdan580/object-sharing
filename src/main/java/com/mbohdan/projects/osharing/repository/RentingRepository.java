package com.mbohdan.projects.osharing.repository;
import com.mbohdan.projects.osharing.domain.Renting;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Renting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RentingRepository extends JpaRepository<Renting, Long> {

    @Query("select renting from Renting renting where renting.user.login = ?#{principal.username}")
    List<Renting> findByUserIsCurrentUser();

}
