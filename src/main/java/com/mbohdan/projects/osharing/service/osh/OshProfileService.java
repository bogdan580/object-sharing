package com.mbohdan.projects.osharing.service.osh;

import com.mbohdan.projects.osharing.domain.Location;
import com.mbohdan.projects.osharing.domain.User;
import com.mbohdan.projects.osharing.domain.UserInfo;
import com.mbohdan.projects.osharing.repository.osh.*;
import com.mbohdan.projects.osharing.service.dto.osh.OshProfileData;
import com.mbohdan.projects.osharing.service.util.osh.RequestResponseLoggingInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class OshProfileService {
    private final Logger log = LoggerFactory.getLogger(OshProfileService.class);
    private final OshUserInfoRepository oshUserInfoRepository;
    private final OshLocationRepository oshLocationRepository;
    private final OshUserRepository oshUserRepository;

    public OshProfileService(OshUserInfoRepository oshUserInfoRepository, OshLocationRepository oshLocationRepository,
                             OshUserRepository oshUserRepository) {
        ClientHttpRequestFactory factory = new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory());
        RestTemplate restTemplate = new RestTemplate(factory);
        restTemplate.getMessageConverters().add(new ByteArrayHttpMessageConverter());
        restTemplate.setInterceptors(Collections.singletonList(new RequestResponseLoggingInterceptor()));

        this.oshUserInfoRepository = oshUserInfoRepository;
        this.oshLocationRepository = oshLocationRepository;
        this.oshUserRepository = oshUserRepository;
    }

    public OshProfileData getProfileData() {
        UserInfo info = oshUserInfoRepository.getUserInfo();
        Location location = oshLocationRepository.findByUserIsCurrentUser().get(0);
        return new OshProfileData(info, location);
    }

    public OshProfileData updateProfileData(OshProfileData data) {
        User user = oshUserRepository.findByUserIsCurrentUser();
        if (data.getUserInfo().getUser() == null) {
            data.getUserInfo().setUser(user);
        }
        oshUserInfoRepository.save(data.getUserInfo());
        if (data.getLocation().getUser() == null) {
            data.getLocation().setUser(user);
        }
        oshLocationRepository.save(data.getLocation());
        return data;
    }
}
