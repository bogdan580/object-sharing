package com.mbohdan.projects.osharing.service.osh;

import com.mbohdan.projects.osharing.domain.*;
import com.mbohdan.projects.osharing.domain.enumeration.ObjectStatus;
import com.mbohdan.projects.osharing.repository.ArticleRepository;
import com.mbohdan.projects.osharing.repository.LocationRepository;
import com.mbohdan.projects.osharing.repository.RentingRepository;
import com.mbohdan.projects.osharing.repository.ReservationRepository;
import com.mbohdan.projects.osharing.repository.osh.*;
import com.mbohdan.projects.osharing.service.dto.osh.ArticlesFilterDTO;
import com.mbohdan.projects.osharing.service.dto.osh.OshArticleDTO;
import com.mbohdan.projects.osharing.service.dto.osh.OshArticleInfoDTO;
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

import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class OshArticlesService {
    private final Logger log = LoggerFactory.getLogger(OshArticlesService.class);
    private final OshArticlesRepository oshArticlesRepository;
    private final OshReservationRepository oshReservationRepository;
    private final OshRentingRepository oshRentingRepository;
    private final OshUserRepository oshUserRepository;
    private final OshUserInfoRepository oshUserInfoRepository;
    private final LocationRepository locationRepository;

    public OshArticlesService(OshArticlesRepository oshArticlesRepository, OshReservationRepository oshReservationRepository,
                               OshRentingRepository oshRentingRepository, OshUserRepository oshUserRepository,
                              OshUserInfoRepository oshUserInfoRepository, LocationRepository locationRepository ) {
        ClientHttpRequestFactory factory = new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory());
        RestTemplate restTemplate = new RestTemplate(factory);
        restTemplate.getMessageConverters().add(new ByteArrayHttpMessageConverter());
        restTemplate.setInterceptors(Collections.singletonList(new RequestResponseLoggingInterceptor()));

        this.oshArticlesRepository = oshArticlesRepository;
        this.oshReservationRepository = oshReservationRepository;
        this.oshRentingRepository = oshRentingRepository;
        this.oshUserRepository = oshUserRepository;
        this.oshUserInfoRepository = oshUserInfoRepository;
        this.locationRepository = locationRepository;
    }

    public List<OshArticleDTO> searchArticles(ArticlesFilterDTO filterDTO) {
        log.debug("OshArticlesService.searchArticles({})", filterDTO);
        String text = (filterDTO.getText()!=null) ? "%" + filterDTO.getText() + "%" : null;
        String city = null;
        String postalCode = null;
        String regexPostalCode = "^[0-9]{2}(?:-[0-9]{3})?$";
        String regexCity = "^[a-zA-Z]+(?:[\\s-][a-zA-Z]+)*$";
        if (filterDTO.getCity()!=null) {
            Pattern zipPattern = Pattern.compile(regexPostalCode);
            Matcher zipMatcher = zipPattern.matcher(filterDTO.getCity());
            if (zipMatcher.find()) {
                log.debug("zip: " + zipMatcher.group());
                postalCode = zipMatcher.group();
            }
            Pattern cityPattern = Pattern.compile(regexCity);
            Matcher cityMatcher = cityPattern.matcher(filterDTO.getCity());
            if (cityMatcher.find()) {
                log.debug("city: " + cityMatcher.group());
                city = cityMatcher.group();
            }
        }
        Sort sort = Sort.by("addTime").descending();
        switch (filterDTO.getSort()){
            case PRISE_ASC:
                sort = Sort.by("price");
                break;
            case PRISE_DESK:
                sort = Sort.by("price").descending();
                break;
            case ADDTIME_ASK:
                sort = Sort.by("addTime");
                break;
            case ADDTIME_DESK:
                sort = Sort.by("addTime").descending();
                break;
        }
        Pageable pagebleSortParam =
            PageRequest.of(filterDTO.getPage(), filterDTO.getItems(), sort);
        return oshArticlesRepository.searchArticles(
            text,
            filterDTO.getCategory(),
            postalCode,
            city,
            pagebleSortParam
        );
    }

    public OshArticleInfoDTO getArticleInfo(Long id) {
        Long currentTime = System.currentTimeMillis();
        log.debug("currentTime: " + currentTime);
        Article article = oshArticlesRepository.findArticleById(id);
        UserInfo userInfo = oshUserInfoRepository.findByUserLogin(article.getUser().getLogin());
        List<Reservation> reservations = oshReservationRepository.findActiveReservesByArticle(article.getId(), currentTime);
        List<Renting> rentings = oshRentingRepository.findActiveRentingsByArticle(article.getId(), currentTime);
        // TODO add fet images
        return new OshArticleInfoDTO(userInfo, reservations, rentings);
    }

    public List<Article> getUserArticles() {
        return this.oshArticlesRepository.findByUserIsCurrentUser();
    }

    public List<Reservation> getUserReservations() {
        return this.oshReservationRepository.findActiveReservesByCurrentUser();
    }

    public List<Reservation> getActiveReservesByArticleOwner() {
        Long currentTime = System.currentTimeMillis();
        log.debug("currentTime: " + currentTime);
        return this.oshReservationRepository.findActiveReservesByArticleOwner(currentTime);
    }

    public List<Renting> getActiveRentsByArticleOwner() {
        Long currentTime = System.currentTimeMillis();
        log.debug("currentTime: " + currentTime);
        return this.oshRentingRepository.findActiveRentsByArticleOwner(currentTime);
    }

    public Reservation addReservation(Reservation reservation) {
        User current_user = oshUserRepository.findByUserIsCurrentUser();
        reservation.setUser(current_user);
        log.debug("Reservation: {}", reservation);
        return oshReservationRepository.save(reservation);
    }

    public Reservation closeReservation( Long id) {
        Reservation reservation = oshReservationRepository.findByReserveId(id);
        if (reservation != null) {
            reservation.setEndTime(System.currentTimeMillis());
            oshReservationRepository.save(reservation);
        }
        log.debug("Reservation: {}", reservation);
        return reservation;
    }

    public List<Renting> getUserRentings() {
        return this.oshRentingRepository.findByUserIsCurrentUser();
    }

    public Article saveArticle(Article article) {
        article.setStatus(ObjectStatus.ACTIVE);
        article.setAddTime(System.currentTimeMillis());
        if (article.getUser() == null) {
            User current_user = oshUserRepository.findByUserIsCurrentUser();
            log.debug("Current user: {}", current_user);
            article.setUser(current_user);
        }
        if (article.getLocation() == null) {
            Location user_location =  locationRepository.findByUserIsCurrentUser().get(0);
            log.debug("User Location: {}", user_location);
            article.setLocation(user_location);
        };
        log.debug("Article: {}", article);
        return oshArticlesRepository.save(article);
    }

    public Article changeArticleStatus(Long id, ObjectStatus newStatus) {
        Article article = oshArticlesRepository.findArticleById(id);
        article.setStatus(newStatus);
        return oshArticlesRepository.save(article);
    }

    public Renting makeRentFromReservation(Long reservationId) {
        Reservation reservation = closeReservation(reservationId);
        Renting newRent = new Renting();
        newRent.setArticle(changeArticleStatus(reservation.getArticle().getId(),ObjectStatus.INRENT));
        newRent.setCurrency(reservation.getArticle().getCurrency());
        newRent.setPrice(reservation.getArticle().getPrice());
        newRent.setRentPeriod(reservation.getArticle().getRentPeriod());
        newRent.setUser(reservation.getUser());
        newRent.setStartTime(System.currentTimeMillis());
        return oshRentingRepository.save(newRent);
    }

    public Renting closeRenting(Long id) {
        Renting rent = oshRentingRepository.findRentByArticleOwner(id);
        if (rent != null) {
            rent.setEndTime(System.currentTimeMillis());
            rent.setArticle(changeArticleStatus(rent.getArticle().getId(),ObjectStatus.ACTIVE));
            oshRentingRepository.save(rent);
        }
        log.debug("Rent: {}", rent);
        return rent;
    }
}
