package com.mbohdan.projects.osharing.service.osh;

import com.mbohdan.projects.osharing.domain.Renting;
import com.mbohdan.projects.osharing.domain.Reservation;
import com.mbohdan.projects.osharing.repository.RentingRepository;
import com.mbohdan.projects.osharing.repository.ReservationRepository;
import com.mbohdan.projects.osharing.repository.osh.OshArticlesRepository;
import com.mbohdan.projects.osharing.service.dto.osh.ArticlesFilterDTO;
import com.mbohdan.projects.osharing.service.dto.osh.OshArticleDTO;
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
    private final ReservationRepository reservationRepository;
    private final RentingRepository rentingRepository;
    private final RestTemplate restTemplate;
    public OshArticlesService(OshArticlesRepository oshArticlesRepository, ReservationRepository reservationRepository,
                              RentingRepository rentingRepository) {
        ClientHttpRequestFactory factory = new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory());
        this.restTemplate = new RestTemplate(factory);
        this.restTemplate.getMessageConverters().add(new ByteArrayHttpMessageConverter());
        this.restTemplate.setInterceptors(Collections.singletonList(new RequestResponseLoggingInterceptor()));

        this.oshArticlesRepository = oshArticlesRepository;
        this.reservationRepository = reservationRepository;
        this.rentingRepository = rentingRepository;
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
        return this.oshArticlesRepository.searchArticles(
            text,
            filterDTO.getCategory(),
            postalCode,
            city,
            pagebleSortParam
        );
    }

    public List<OshArticleDTO> getUserArticles() {
        return this.oshArticlesRepository.findByUserIsCurrentUser();
    }

    public List<Reservation> getUserReservations() {
        return this.reservationRepository.findByUserIsCurrentUser();
    }

    public List<Renting> getUserRentings() {
        return this.rentingRepository.findByUserIsCurrentUser();
    }
}
