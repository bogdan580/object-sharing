package com.mbohdan.projects.osharing.service.dto.osh;

import com.mbohdan.projects.osharing.domain.Image;
import com.mbohdan.projects.osharing.domain.Renting;
import com.mbohdan.projects.osharing.domain.Reservation;
import com.mbohdan.projects.osharing.domain.UserInfo;

import java.io.Serializable;
import java.util.List;

public class OshArticleInfoDTO implements Serializable {
    private UserInfo userInfo;
    private List<Reservation> reservations;
    private List<Renting> rentings;
    private List<Image> images;

    public OshArticleInfoDTO(UserInfo userInfo, List<Reservation> reservations, List<Renting> rentings) {
        this.userInfo = userInfo;
        this.reservations = reservations;
        this.rentings = rentings;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    public List<Renting> getRentings() {
        return rentings;
    }

    public void setRentings(List<Renting> rentings) {
        this.rentings = rentings;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    @Override
    public String toString() {
        return "OshArticleInfoDTO{" +
            "userInfo=" + userInfo +
            ", reservations=" + reservations +
            ", rentings=" + rentings +
            ", images=" + images +
            '}';
    }
}
