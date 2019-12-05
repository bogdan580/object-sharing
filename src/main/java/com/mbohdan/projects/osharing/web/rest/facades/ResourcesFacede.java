package com.mbohdan.projects.osharing.web.rest.facades;

import com.mbohdan.projects.osharing.repository.ArticleRepository;
import com.mbohdan.projects.osharing.repository.RentingRepository;
import com.mbohdan.projects.osharing.repository.ReservationRepository;
import com.mbohdan.projects.osharing.web.rest.ArticleResource;
import org.springframework.stereotype.Component;

@Component
public class ResourcesFacede {

    private final ArticleRepository articleRepository;
    private final ReservationRepository reservationRepository;
    private final ArticleResource articleResource;
    private final RentingRepository rentingRepository;

    public ResourcesFacede(ArticleRepository articleRepository, ReservationRepository reservationRepository, ArticleResource articleResource, RentingRepository rentingRepository) {
        this.articleRepository = articleRepository;
        this.reservationRepository = reservationRepository;
        this.articleResource = articleResource;
        this.rentingRepository = rentingRepository;
    }

    public ArticleRepository getArticleRepository() {
        return articleRepository;
    }

    public ReservationRepository getReservationRepository() {
        return reservationRepository;
    }

    public ArticleResource getArticleResource() {
        return articleResource;
    }

    public RentingRepository getRentingRepository() {
        return rentingRepository;
    }
}
