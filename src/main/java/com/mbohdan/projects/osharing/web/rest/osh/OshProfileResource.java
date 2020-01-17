package com.mbohdan.projects.osharing.web.rest.osh;

import com.mbohdan.projects.osharing.service.dto.osh.OshProfileData;
import com.mbohdan.projects.osharing.service.osh.OshProfileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api/proxy")
public class OshProfileResource {
    private final Logger log = LoggerFactory.getLogger(OshProfileResource.class);
    private static final String ENTITY_NAME = "profile";
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    private final OshProfileService oshProfileService;

    public OshProfileResource(OshProfileService oshProfileService) {
        this.oshProfileService = oshProfileService;
    }

    @GetMapping("/profile/data")
    public ResponseEntity<OshProfileData> getProfileData() throws URISyntaxException {
        log.debug("REST request to get profile data");
        OshProfileData results = oshProfileService.getProfileData();
        log.debug("OshProfileResource.getProfileData() {}", results);
        return ResponseEntity.ok(results);
    }

    @PostMapping("/profile/data")
    public ResponseEntity<OshProfileData> updateProfileData(@Valid @RequestBody OshProfileData data) throws URISyntaxException {
        log.debug("REST request to update profile data");
        OshProfileData results = oshProfileService.updateProfileData(data);
        log.debug("OshProfileResource.updateProfileData() {}", results);
        return ResponseEntity.ok(results);
    }
}
