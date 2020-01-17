package com.mbohdan.projects.osharing.repository.osh;

import com.mbohdan.projects.osharing.domain.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OshLocationRepository extends JpaRepository<Location, Long> {
    @Query("select location from Location location where location.user.login = ?#{principal.username}")
    List<Location> findByUserIsCurrentUser();
}
