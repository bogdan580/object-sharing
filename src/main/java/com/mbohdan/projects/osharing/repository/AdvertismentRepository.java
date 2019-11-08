package com.mbohdan.projects.osharing.repository;
import com.mbohdan.projects.osharing.domain.Advertisment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Advertisment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdvertismentRepository extends JpaRepository<Advertisment, Long> {

}
