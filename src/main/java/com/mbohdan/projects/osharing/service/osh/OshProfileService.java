package com.mbohdan.projects.osharing.service.osh;

import com.mbohdan.projects.osharing.domain.*;
import com.mbohdan.projects.osharing.repository.osh.*;
import com.mbohdan.projects.osharing.service.dto.osh.OshHistoryData;
import com.mbohdan.projects.osharing.service.dto.osh.OshProfileData;
import com.mbohdan.projects.osharing.service.util.osh.RequestResponseLoggingInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class OshProfileService {
    private final Logger log = LoggerFactory.getLogger(OshProfileService.class);
    private final OshUserInfoRepository oshUserInfoRepository;
    private final OshLocationRepository oshLocationRepository;
    private final OshUserRepository oshUserRepository;
    private final OshReservationRepository oshReservationRepository;
    private final OshRentingRepository oshRentingRepository;

    public OshProfileService(OshUserInfoRepository oshUserInfoRepository, OshLocationRepository oshLocationRepository,
                             OshUserRepository oshUserRepository, OshReservationRepository oshReservationRepository,
                             OshRentingRepository oshRentingRepository) {
        ClientHttpRequestFactory factory = new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory());
        RestTemplate restTemplate = new RestTemplate(factory);
        restTemplate.getMessageConverters().add(new ByteArrayHttpMessageConverter());
        restTemplate.setInterceptors(Collections.singletonList(new RequestResponseLoggingInterceptor()));

        this.oshUserInfoRepository = oshUserInfoRepository;
        this.oshLocationRepository = oshLocationRepository;
        this.oshUserRepository = oshUserRepository;
        this.oshReservationRepository = oshReservationRepository;
        this.oshRentingRepository = oshRentingRepository;
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

    public ArrayList<OshHistoryData> getUserHistory() {
        Pageable pagebleSortParam = PageRequest.of(0, 5, Sort.by("startTime").descending());
        List<Reservation> lastReservation = oshReservationRepository.getLastReservations(pagebleSortParam);
        List<Renting> lastRents = oshRentingRepository.getLastRentings(pagebleSortParam);
        ArrayList<OshHistoryData> historyData = new ArrayList<OshHistoryData>();
//        log.debug("lastReservation", lastReservation);
//        log.debug("lastRents", lastRents);
        if (lastReservation != null && lastReservation.size() > 0) {
            for (Reservation res : lastReservation) {
                historyData.add(new OshHistoryData("Reservation", res.getStartTime(), res.getEndTime(), res.getArticle()));
            }
        }
        if (lastRents != null && lastRents.size() > 0) {
            for (Renting rent : lastRents) {
                historyData.add(new OshHistoryData("Rent", rent.getStartTime(), rent.getEndTime(),rent.getArticle(), rent.getPrice(), rent.getRentPeriod(), rent.getCurrency()));
            }
        }
        // sort
        log.debug("before sort" ,historyData.toString());
        Collections.sort(historyData);
        log.debug("after sort" ,historyData.toString());
        return  historyData;
    }
}
